/* ============================================================
   SL Transit Tracker – Main Application Logic
   ============================================================ */

"use strict";

// ── Map Tile Providers (no API key required by default) ──────
const TILE_LAYERS = {
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    label: "Dark",
    requiresKey: true,
    keyParam: "apikey",
  },
  osm: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    label: "Street Map (Free)",
    requiresKey: false,
  },
  topo: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    label: "Topographic (Free)",
    requiresKey: false,
  },
  esri_dark: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    label: "ESRI Dark (Free)",
    requiresKey: false,
  },
  esri_imagery: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    label: "Satellite (Free)",
    requiresKey: false,
  },
};

let currentTileLayer = null;
let currentTileId = "esri_dark"; // Default: free dark ESRI
let mapboxApiKey = localStorage.getItem("sl_transit_mapbox_key") || "";

// ── State ────────────────────────────────────────────────────
const State = {
  mode: null,            // 'bus' | 'train'
  selectedRoute: null,   // route object
  liveTracking: false,
  vehicles: [],
  vehicleMarkers: {},
  routePolyline: null,
  stopMarkers: [],
  animFrame: null,
  map: null,
  busFilter: "",
  categoryFilter: "All",
};

// ── DOM helpers ──────────────────────────────────────────────
const $ = id => document.getElementById(id);
const show = id => { const el = $(id); if (el) el.style.display = ""; };
const hide = id => { const el = $(id); if (el) el.style.display = "none"; };

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const s = $(id);
  if (s) { s.classList.add("active"); }
}

function toast(msg, type = "info") {
  const c = document.querySelector(".toast-container");
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  if (type === "success") t.style.borderColor = "var(--accent)";
  if (type === "error")   t.style.borderColor = "var(--danger)";
  c.appendChild(t);
  setTimeout(() => t.remove(), 3100);
}

// ── Screen: Welcome ──────────────────────────────────────────
function initWelcome() {
  $("btn-select-bus").addEventListener("click",   () => enterMode("bus"));
  $("btn-select-train").addEventListener("click", () => enterMode("train"));
}

function enterMode(mode) {
  State.mode = mode;
  if (mode === "bus") {
    showScreen("screen-bus");
    initBusScreen();
  } else {
    showScreen("screen-train");
    initTrainScreen();
  }
}

// ── Bus Screen ───────────────────────────────────────────────
let busTab = "browse";

function initBusScreen() {
  renderBusTabs();
  renderCategoryFilter();
  renderBusList(BUS_ROUTES);
  initJourneyPlanner();

  $("bus-back").addEventListener("click", () => {
    resetTracking();
    showScreen("screen-welcome");
  });

  $("bus-search").addEventListener("input", e => {
    busTab = "browse";
    setTab("browse");
    applyBusFilters();
  });
}

function renderCategoryFilter() {
  const wrap = $("bus-category-filter");
  if (!wrap) return;
  const cats = ["All", ...BUS_CATEGORIES];
  wrap.innerHTML = cats.map(c => `
    <button class="cat-chip ${c === State.categoryFilter ? 'active' : ''}" data-cat="${c}">${c}</button>
  `).join("");
  wrap.querySelectorAll(".cat-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      State.categoryFilter = btn.dataset.cat;
      wrap.querySelectorAll(".cat-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyBusFilters();
    });
  });
}

function applyBusFilters() {
  const q = ($("bus-search")?.value || "").toLowerCase();
  const cat = State.categoryFilter;
  const filtered = BUS_ROUTES.filter(r => {
    const matchCat = cat === "All" || r.category === cat;
    const matchQ = !q || r.id.includes(q) || r.from.toLowerCase().includes(q) ||
      r.to.toLowerCase().includes(q) || r.label.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
  renderBusList(filtered);
}

function renderBusTabs() {
  document.querySelectorAll(".tab-btn[data-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      busTab = btn.dataset.tab;
      setTab(busTab);
    });
  });
}

function setTab(id) {
  document.querySelectorAll(".tab-btn[data-tab]").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === id);
  });
  document.querySelectorAll(".tab-panel[data-panel]").forEach(p => {
    p.classList.toggle("active", p.dataset.panel === id);
  });
}

function renderBusList(routes) {
  const container = $("bus-route-list");
  if (!routes.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🚌</div>No routes found.</div>`;
    return;
  }
  container.innerHTML = routes.map(r => `
    <div class="route-card fade-in" data-id="${r.id}"
         style="--card-color:${r.color}; --card-color-dim:${r.color}22;"
         onclick="selectBusRoute('${r.id}')">
      <div class="route-num">${r.id}</div>
      <div class="route-info">
        <div class="route-name-label">${r.label}</div>
        <div class="route-from-to">📍 ${r.from} → ${r.to}</div>
        <div class="route-meta">
          <span class="meta-chip">🕒 ${r.frequency}</span>
          <span class="meta-chip">🚌 ${r.type}</span>
        </div>
      </div>
      <span style="color:var(--text-3);font-size:1.2rem;">›</span>
    </div>
  `).join("");
}

function selectBusRoute(id) {
  const route = BUS_ROUTES.find(r => r.id === id);
  if (!route) return;
  State.selectedRoute = route;
  document.querySelectorAll(".route-card").forEach(c =>
    c.classList.toggle("selected", c.dataset.id === id));
  renderSelectedRouteInfo(route, "bus");
  showRouteOnMap(route, "bus");
}

// ── Journey planner ──────────────────────────────────────────
function initJourneyPlanner() {
  const fromInput = $("jp-from");
  const toInput   = $("jp-to");
  const resultsDiv = $("jp-results");
  const findBtn   = $("jp-find-btn");

  // Populate datalist
  const dl = $("stops-datalist");
  ALL_STOPS.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    dl.appendChild(opt);
  });

  findBtn.addEventListener("click", () => {
    const from = fromInput.value.trim();
    const to   = toInput.value.trim();
    if (!from || !to) { toast("Please enter both From and To stops.", "error"); return; }
    const results = findRoutes(from, to);
    renderJourneyResults(results, resultsDiv);
  });
}

function renderJourneyResults(results, container) {
  if (!results.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🗺️</div>No direct routes found. Try nearby stops.</div>`;
    return;
  }
  container.innerHTML = results.map(({ route, fromIdx, toIdx }) => {
    const fromStop = route.stops[fromIdx].name;
    const toStop   = route.stops[toIdx].name;
    return `
      <div class="journey-result fade-in" onclick="selectBusRoute('${route.id}')">
        <div class="jr-route-num">${route.id}</div>
        <div class="jr-label">Route ${route.id} – ${route.label}</div>
        <div class="jr-stops">📍 ${fromStop} → ${toStop}</div>
        <div class="route-meta" style="margin-top:6px;">
          <span class="meta-chip">🕒 ${route.frequency}</span>
          <span class="meta-chip">🚌 ${route.type}</span>
        </div>
      </div>`;
  }).join("");
}

// ── Train Screen ─────────────────────────────────────────────
function initTrainScreen() {
  const container = $("train-route-list");
  container.innerHTML = TRAIN_ROUTES.map(r => `
    <div class="route-card fade-in" data-id="${r.id}"
         style="--card-color:${r.color}; --card-color-dim:${r.color}22;"
         onclick="selectTrainRoute('${r.id}')">
      <div class="route-num" style="font-size:0.75rem; padding: 4px;">🚂</div>
      <div class="route-info">
        <div class="route-name-label">${r.name}</div>
        <div class="route-from-to">📍 ${r.from} → ${r.to}</div>
        <div class="route-meta">
          <span class="meta-chip">🕒 ${r.frequency}</span>
          <span class="meta-chip">🚆 ${r.type}</span>
        </div>
      </div>
      <span style="color:var(--text-3);font-size:1.2rem;">›</span>
    </div>
  `).join("");

  $("train-back").addEventListener("click", () => {
    resetTracking();
    showScreen("screen-welcome");
  });
}

function selectTrainRoute(id) {
  const route = TRAIN_ROUTES.find(r => r.id === id);
  if (!route) return;
  State.selectedRoute = route;
  document.querySelectorAll("#screen-train .route-card").forEach(c =>
    c.classList.toggle("selected", c.dataset.id === id));
  renderSelectedRouteInfo(route, "train");
  showRouteOnMap(route, "train");
}

// ── Shared: Selected Route Info ──────────────────────────────
function renderSelectedRouteInfo(route, type) {
  const panelId = type === "bus" ? "bus-route-detail" : "train-route-detail";
  const panel = $(panelId);
  if (!panel) return;

  const icon = type === "bus" ? "🚌" : "🚂";
  const stops = route.stops;
  const stopsHtml = stops.map((s, i) => {
    const isFirst = i === 0;
    const isLast  = i === stops.length - 1;
    const isTerminal = isFirst || isLast;
    const hasLine = i < stops.length - 1;
    return `
      <div class="stop-item" style="--stop-color:${route.color};">
        <div class="stop-dot-col">
          <div class="stop-dot ${isTerminal ? 'terminal' : ''}"></div>
          ${hasLine ? `<div class="stop-line"></div>` : ""}
        </div>
        <div class="stop-name">${s.name}</div>
      </div>`;
  }).join("");

  panel.innerHTML = `
    <div class="route-detail-panel">
      <div class="rdp-header">
        <div class="rdp-color-dot" style="background:${route.color};"></div>
        <div>
          <div class="rdp-name">${icon} ${route.name}</div>
          <div class="rdp-label">${route.label}</div>
        </div>
      </div>
      <div class="rdp-stats">
        <div class="stat-box">
          <div class="stat-label">Frequency</div>
          <div class="stat-val">${route.frequency}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Type</div>
          <div class="stat-val">${route.type}</div>
        </div>
        <div class="stat-box" style="grid-column:span 2;">
          <div class="stat-label">Operating Hours</div>
          <div class="stat-val">${route.operatingHours}</div>
        </div>
      </div>
      <div class="section-label">Stops (${stops.length})</div>
      <div class="stops-scroll stops-timeline">${stopsHtml}</div>
    </div>
    <div class="live-confirm" id="${panelId}-live">
      <div class="live-confirm-title">
        <div class="pulse-dot"></div>
        Enable Live Tracking?
      </div>
      <p>See real-time locations of all ${icon} vehicles on this route on the map.</p>
      <div class="confirm-btns">
        <button class="btn-primary ${type === 'train' ? 'train-btn' : ''}"
                onclick="enableLiveTracking()">
          📡 Yes, Track Live
        </button>
        <button class="btn-secondary" onclick="dismissLiveConfirm('${panelId}-live')">
          No thanks
        </button>
      </div>
    </div>`;
  panel.classList.add("fade-in");
}

function dismissLiveConfirm(id) {
  const el = $(id);
  if (el) el.style.display = "none";
}

// ── Map: Initialise ──────────────────────────────────────────
let mapInitialized = false;

function initMap() {
  if (mapInitialized) return;
  mapInitialized = true;

  State.map = L.map("map", {
    center: [7.8731, 80.7718],
    zoom: 8,
    zoomControl: false,
  });

  // Load saved or default tile layer
  applyTileLayer(currentTileId);

  // Zoom control bottom-left
  L.control.zoom({ position: "bottomleft" }).addTo(State.map);
}

function applyTileLayer(id) {
  const provider = TILE_LAYERS[id];
  if (!provider) return;
  currentTileId = id;

  // If Mapbox dark and we have a key, build URL
  let url = provider.url;
  if (id === "dark" && mapboxApiKey) {
    url = `https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxApiKey}`;
  } else if (id === "dark" && !mapboxApiKey) {
    // Fallback to ESRI dark if no key
    url = TILE_LAYERS.esri_dark.url;
  }

  if (currentTileLayer) State.map.removeLayer(currentTileLayer);
  currentTileLayer = L.tileLayer(url, {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
  }).addTo(State.map);

  // Update tile switcher buttons
  document.querySelectorAll(".tile-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.tile === id)
  );
  localStorage.setItem("sl_transit_tile", id);
}

// ── Map: Show route ──────────────────────────────────────────
function showRouteOnMap(route, type) {
  initMap();
  clearMapLayers();

  const map = State.map;
  const pts = route.waypoints.map(([lat, lng]) => [lat, lng]);

  // Draw polyline
  State.routePolyline = L.polyline(pts, {
    color: route.color,
    weight: 5,
    opacity: 0.85,
    dashArray: type === "train" ? "12 6" : null,
  }).addTo(map);

  // Draw stop markers
  route.stops.forEach((stop, i) => {
    const isTerminal = i === 0 || i === route.stops.length - 1;
    const marker = L.circleMarker([stop.lat, stop.lng], {
      radius: isTerminal ? 8 : 5,
      fillColor: route.color,
      color: "#000",
      weight: 1.5,
      opacity: 1,
      fillOpacity: isTerminal ? 1 : 0.7,
    }).addTo(map);
    marker.bindPopup(`
      <div class="vp-inner">
        <div class="vp-header"><span class="vp-icon">📍</span><span class="vp-id">${stop.name}</span></div>
        <div class="vp-stat"><span>Stop ${i + 1} of ${route.stops.length}</span></div>
      </div>`);
    State.stopMarkers.push(marker);
  });

  // Fit map
  map.fitBounds(State.routePolyline.getBounds(), { padding: [40, 40] });

  // Show map status
  updateMapStatus(`${type === "bus" ? "🚌" : "🚂"} Route loaded — click "Track Live" to see vehicles`);
}

// ── Live Tracking ────────────────────────────────────────────
function enableLiveTracking() {
  if (!State.selectedRoute) return;
  State.liveTracking = true;

  const route = State.selectedRoute;
  const vehicleCount = route.id === "main_line" || route.id === "northern_line" ? 3 : 5;
  State.vehicles = generateVehicles(route, vehicleCount);

  placeVehicleMarkers(route);
  renderVehicleList(route);
  startAnimation(route);

  toast(`🟢 Live tracking started for Route ${route.id}`, "success");
  updateMapStatus(`📡 Live — ${State.vehicles.filter(v => v.deviceOn).length} vehicles active`);

  // Hide confirm dialog
  const panelId = State.mode === "bus" ? "bus-route-detail-live" : "train-route-detail-live";
  dismissLiveConfirm(panelId);
}

function placeVehicleMarkers(route) {
  const map = State.map;
  const isBus = State.mode === "bus";

  State.vehicles.forEach(v => {
    const icon = createVehicleIcon(route.color, isBus ? "🚌" : "🚂", v.deviceOn);
    const marker = L.marker([v.lat, v.lng], { icon })
      .addTo(map)
      .bindPopup(vehiclePopupHtml(v, route));
    State.vehicleMarkers[v.id] = marker;
  });
}

function createVehicleIcon(color, emoji, active) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        position:relative;
        width:38px;height:38px;
        background:${active ? color : "#444"};
        border-radius:50%;
        border:2px solid ${active ? "#fff" : "#666"};
        display:flex;align-items:center;justify-content:center;
        font-size:18px;
        box-shadow:0 2px 8px rgba(0,0,0,0.5)${active ? `,0 0 12px ${color}88` : ""};
        transition:all 0.3s;">
        ${emoji}
        ${active ? `<div style="position:absolute;top:-3px;right:-3px;width:10px;height:10px;background:#00C896;border-radius:50%;border:2px solid #000;"></div>` : ""}
      </div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -22],
  });
}

function vehiclePopupHtml(v, route) {
  return `
    <div class="vp-inner">
      <div class="vp-header">
        <span class="vp-icon">${State.mode === "bus" ? "🚌" : "🚂"}</span>
        <span class="vp-id">${v.id}</span>
      </div>
      <div class="vp-stat"><span>Status</span><span style="color:${v.deviceOn ? "#00C896" : "#EF4444"}">${v.deviceOn ? "● Active" : "● Idle"}</span></div>
      <div class="vp-stat"><span>Route</span><span>${route.id}</span></div>
      <div class="vp-stat"><span>Passengers</span><span>${v.passengers}</span></div>
      <div class="vp-stat"><span>Updated</span><span>${v.lastUpdate}</span></div>
    </div>`;
}

// ── Sidebar vehicle list ─────────────────────────────────────
function renderVehicleList(route) {
  const containerId = State.mode === "bus" ? "bus-vehicles-section" : "train-vehicles-section";
  const container = $(containerId);
  if (!container) return;

  const isBus = State.mode === "bus";
  const activeVehicles = State.vehicles.filter(v => v.deviceOn);
  const idleVehicles   = State.vehicles.filter(v => !v.deviceOn);

  container.innerHTML = `
    <div class="section-label">🟢 Active Vehicles (${activeVehicles.length})</div>
    ${activeVehicles.map(v => vehicleItemHtml(v, route.color, isBus)).join("")}
    ${idleVehicles.length ? `
      <div class="section-label" style="margin-top:6px;">🔴 Idle / Device Off (${idleVehicles.length})</div>
      ${idleVehicles.map(v => vehicleItemHtml(v, "#444", isBus)).join("")}
    ` : ""}`;
}

function vehicleItemHtml(v, color, isBus) {
  return `
    <div class="vehicle-item fade-in" onclick="focusVehicle('${v.id}')"
         style="--v-color:${color}; --v-color-dim:${color}22;">
      <div class="vehicle-icon">${isBus ? "🚌" : "🚂"}</div>
      <div class="vehicle-info">
        <div class="vehicle-id">${v.id}</div>
        <div class="vehicle-status">👥 ${v.passengers} passengers • ${v.lastUpdate}</div>
      </div>
      <span class="v-status-badge ${v.deviceOn ? "status-active" : "status-idle"}">
        ${v.deviceOn ? "LIVE" : "OFF"}
      </span>
    </div>`;
}

function focusVehicle(id) {
  const v = State.vehicles.find(x => x.id === id);
  const m = State.vehicleMarkers[id];
  if (!v || !m) return;
  State.map.setView([v.lat, v.lng], 14, { animate: true });
  m.openPopup();
}

// ── Animation loop ───────────────────────────────────────────
function startAnimation(route) {
  if (State.animFrame) cancelAnimationFrame(State.animFrame);
  let lastUpdate = 0;

  function tick(ts) {
    State.animFrame = requestAnimationFrame(tick);

    State.vehicles.forEach(v => {
      if (!v.deviceOn) return;
      const pts = route.waypoints;
      v.frac += v.speed;
      if (v.ptIdx + 1 >= pts.length) {
        // Reached end, bounce back or wrap
        v.ptIdx = 0;
        v.frac = 0;
      }
      if (v.frac >= 1) {
        v.frac -= 1;
        v.ptIdx = Math.min(v.ptIdx + 1, pts.length - 2);
      }

      const p1 = pts[v.ptIdx];
      const p2 = pts[Math.min(v.ptIdx + 1, pts.length - 1)];
      v.lat = p1[0] + (p2[0] - p1[0]) * v.frac;
      v.lng = p1[1] + (p2[1] - p1[1]) * v.frac;

      const marker = State.vehicleMarkers[v.id];
      if (marker) marker.setLatLng([v.lat, v.lng]);
    });

    // Update sidebar + status every 3 seconds
    if (ts - lastUpdate > 3000) {
      lastUpdate = ts;
      State.vehicles.forEach(v => {
        v.lastUpdate = new Date().toLocaleTimeString("en-LK");
        v.passengers = Math.max(0, v.passengers + Math.floor(Math.random() * 7) - 3);
        const m = State.vehicleMarkers[v.id];
        if (m) m.setPopupContent(vehiclePopupHtml(v, route));
      });
      const active = State.vehicles.filter(v => v.deviceOn).length;
      updateMapStatus(`📡 Live — ${active} vehicles active on Route ${route.id}`);
      if (State.liveTracking) renderVehicleList(route);
    }
  }

  State.animFrame = requestAnimationFrame(tick);
}

function stopAnimation() {
  if (State.animFrame) {
    cancelAnimationFrame(State.animFrame);
    State.animFrame = null;
  }
}

// ── Map helpers ──────────────────────────────────────────────
function clearMapLayers() {
  if (State.routePolyline) { State.map.removeLayer(State.routePolyline); State.routePolyline = null; }
  State.stopMarkers.forEach(m => State.map.removeLayer(m));
  State.stopMarkers = [];
  Object.values(State.vehicleMarkers).forEach(m => State.map.removeLayer(m));
  State.vehicleMarkers = {};
  stopAnimation();
  State.vehicles = [];
  State.liveTracking = false;
}

function resetTracking() {
  if (State.map) clearMapLayers();
  State.selectedRoute = null;
}

function updateMapStatus(msg) {
  const el = $("map-status-text");
  if (el) el.textContent = msg;
}

// ── Map controls wiring ──────────────────────────────────────
function initMapControls() {
  $("ctrl-fit").addEventListener("click", () => {
    if (State.routePolyline && State.map) {
      State.map.fitBounds(State.routePolyline.getBounds(), { padding: [40, 40] });
    }
  });
  $("ctrl-reset").addEventListener("click", () => {
    State.map.setView([7.8731, 80.7718], 8);
    toast("Map reset to Sri Lanka view");
  });

  // Tile switcher buttons
  document.querySelectorAll(".tile-btn").forEach(btn => {
    btn.addEventListener("click", () => applyTileLayer(btn.dataset.tile));
  });

  // Mapbox key save
  const keyInput = $("mapbox-key-input");
  const keySave  = $("mapbox-key-save");
  if (keyInput) keyInput.value = mapboxApiKey;
  if (keySave) {
    keySave.addEventListener("click", () => {
      mapboxApiKey = keyInput.value.trim();
      localStorage.setItem("sl_transit_mapbox_key", mapboxApiKey);
      if (mapboxApiKey) {
        applyTileLayer("dark");
        toast("✅ Mapbox API key saved – dark tiles activated!", "success");
      } else {
        toast("API key cleared.");
      }
    });
  }

  // Restore saved tile preference
  const saved = localStorage.getItem("sl_transit_tile");
  if (saved && TILE_LAYERS[saved]) currentTileId = saved;
}

// ── Ticker (simulated live feed) ─────────────────────────────
const TICKER_MESSAGES = [
  "🚌 Route 138 — operating normally",
  "🚂 Main Line — Udarata Menike on time",
  "🚌 Route 2 — slight delay at Bambalapitiya",
  "🚂 Coastal Line — Ruhunu Kumari departed Colombo",
  "🚌 Route 400 — Express service running",
  "🚂 Northern Line — Yal Devi en route to Jaffna",
  "📡 System update: 42 vehicles tracked",
];
let tickerIdx = 0;
function rotateTicker() {
  ["ticker-1","ticker-2","ticker-3"].forEach((id, i) => {
    const el = $(id);
    if (el) el.textContent = TICKER_MESSAGES[(tickerIdx + i) % TICKER_MESSAGES.length];
  });
  tickerIdx = (tickerIdx + 3) % TICKER_MESSAGES.length;
}

// ── Boot ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  showScreen("screen-welcome");
  initWelcome();
  initMapControls();
  rotateTicker();
  setInterval(rotateTicker, 5000);
});
