/* ============================================================
   SL Transit Tracker – Complete Sri Lanka Transport Data
   Compiled from official NTC & Sri Lanka Railways sources
   ============================================================ */

const SL_CENTER = { lat: 7.8731, lng: 80.7718 };

// ── Shared Stop Coordinates ──────────────────────────────────
const STOPS = {
  // Colombo Core
  "Pettah Bus Stand":    [6.9388, 79.8507],
  "Colombo Fort":        [6.9344, 79.8428],
  "Kotahena":            [6.9480, 79.8584],
  "Maradana":            [6.9312, 79.8630],
  "Borella":             [6.9271, 79.8745],
  "Slave Island":        [6.9198, 79.8514],
  "Kollupitiya":         [6.9097, 79.8490],
  "Bambalapitiya":       [6.8887, 79.8579],
  "Wellawatta":          [6.8710, 79.8629],
  "Kirillapone":         [6.8793, 79.8878],
  "Narahenpita":         [6.9081, 79.8752],
  "Town Hall":           [6.9153, 79.8697],
  "Eye Hospital":        [6.9186, 79.8655],
  "Grandpass":           [6.9500, 79.8620],
  "Panchikawatta":       [6.9470, 79.8608],
  // South Colombo
  "Dehiwala":            [6.8553, 79.8659],
  "Mt. Lavinia":         [6.8395, 79.8673],
  "Ratmalana":           [6.8210, 79.8820],
  "Moratuwa":            [6.7730, 79.8814],
  "Panadura":            [6.7150, 79.9037],
  "Katubedda":           [6.8050, 79.9050],
  "Attidiya":            [6.8300, 79.9050],
  // South / SE Colombo
  "Nugegoda":            [6.8722, 79.8965],
  "Maharagama":          [6.8489, 79.9284],
  "Kottawa":             [6.8289, 80.0289],
  "Piliyandala":         [6.8050, 79.9180],
  "Pepiliyana":          [6.8589, 79.9120],
  "Nedimale":            [6.8620, 79.8800],
  "Pitakotte":           [6.9050, 79.9280],
  "Beddagana":           [6.9050, 79.9280],
  "Battaramulla":        [6.9060, 79.9317],
  "Kaduwela":            [6.9379, 79.9986],
  "Malabe":              [6.9079, 79.9718],
  "Mulleriyawa":         [6.9240, 79.9680],
  "Kohilawatta":         [6.9000, 79.9500],
  "Hettiyawatta":        [6.9000, 79.9400],
  // East Colombo / Kandy Road
  "Rajagiriya":          [6.9129, 79.8964],
  "Wellampitiya":        [6.9410, 79.9060],
  "Kelaniya":            [6.9554, 79.9204],
  "Kiribathgoda":        [6.9820, 79.9268],
  "Kadawatha":           [7.0022, 79.9508],
  "Sapugaskanda":        [6.9600, 79.9000],
  "Delgoda":             [7.0200, 79.9550],
  "Makola":              [7.0150, 79.9550],
  "Ragama":              [7.0296, 79.9218],
  "Gampaha":             [7.0857, 79.9990],
  "Veyangoda":           [7.1430, 80.1150],
  "Weyangoda":           [7.1430, 80.1150],
  "Nittambuwa":          [7.1490, 80.1780],
  "Weliveriya":          [7.1000, 80.0200],
  "Pugoda":              [6.9790, 79.9910],
  "Malwana":             [6.9900, 80.0200],
  "Biyagama":            [6.9800, 79.9600],
  // West / North Colombo
  "Wattala":             [6.9876, 79.8907],
  "Ja-Ela":              [7.0769, 79.8935],
  "Negombo":             [7.2090, 79.8354],
  "Mattakuliya":         [6.9620, 79.8680],
  "Thotalanga":          [6.9500, 79.8530],
  // Makumbura circuit
  "Makumbura":           [6.8250, 80.0180],
  // Kandy direction
  "Kegalle":             [7.2513, 80.3463],
  "Mawanella":           [7.2523, 80.4511],
  "Peradeniya":          [7.2653, 80.5954],
  "Kandy":               [7.2906, 80.6337],
  "Gampola":             [7.1640, 80.5760],
  "Nawalapitiya":        [7.0510, 80.5350],
  "Hatton":              [6.8950, 80.5940],
  "Nanu Oya":            [6.9020, 80.7640],
  "Badulla":             [6.9934, 81.0550],
  "Matale":              [7.4700, 80.6230],
  "Peradeniya Junction": [7.2680, 80.5940],
  // South
  "Kalutara":            [6.5844, 80.0000],
  "Aluthgama":           [6.4333, 80.0000],
  "Ambalangoda":         [6.2310, 80.0590],
  "Hikkaduwa":           [6.1390, 80.0990],
  "Galle":               [6.0535, 80.2210],
  "Weligama":            [5.9736, 80.4280],
  "Matara":              [5.9549, 80.5550],
  "Beliatta":            [6.0480, 80.7220],
  "Baduraliya":          [6.5200, 80.1200],
  "Pelawatta":           [6.8790, 79.9400],
  // North
  "Kurunegala":          [7.4867, 80.3647],
  "Polgahawela":         [7.3293, 80.3154],
  "Maho":                [7.9010, 80.3050],
  "Anuradhapura":        [8.3350, 80.4108],
  "Vavuniya":            [8.7514, 80.4971],
  "Kilinochchi":         [9.3944, 80.3940],
  "Jaffna":              [9.6615, 80.0255],
  "Kankesanthurai":      [9.8171, 80.0374],
  "Medawachchiya":       [8.5100, 80.4900],
  "Mannar":              [8.9767, 79.9083],
  "Mihintale":           [8.3500, 80.5100],
  // East
  "Batticaloa":          [7.7170, 81.6920],
  "Galoya Junction":     [7.8800, 81.1700],
  "Trincomalee":         [8.5667, 81.2333],
  // West
  "Puttalam":            [8.0304, 79.8281],
  "Chilaw":              [7.5769, 79.7956],
  // Kelani Valley
  "Avissawella":         [6.9503, 80.2144],
  "Padukka":             [6.8500, 80.1600],
  "Awissawella":         [6.9503, 80.2144],
  // Jaffna area
  "Atchuwely":           [9.7100, 80.0500],
  "Chundakuli":          [9.6700, 80.0200],
  "Punmalaikuduwan":     [9.7400, 80.0600],
  "Mavado":              [9.6900, 80.0400],
  "Kokila kandy":        [9.6500, 80.0600],
  "Kodikanam":           [9.6400, 80.0300],
  "Manipe":              [9.6600, 80.0000],
};

// Helper: build stops array from names
function S(...names) {
  return names.map(n => ({ name: n, lat: STOPS[n]?.[0] ?? 0, lng: STOPS[n]?.[1] ?? 0 }));
}
function W(...names) {
  return names.map(n => STOPS[n] ?? [0, 0]);
}

// ════════════════════════════════════════════════════════════
// BUS ROUTES
// ════════════════════════════════════════════════════════════
const BUS_ROUTES = [
  // ── Colombo Area ─────────────────────────────────────────
  {
    id: "100", name: "Route 100", label: "Pettah ↔ Panadura",
    from: "Pettah", to: "Panadura", color: "#00C896", category: "Colombo Area",
    stops: S("Pettah Bus Stand","Kollupitiya","Bambalapitiya","Wellawatta","Dehiwala","Mt. Lavinia","Ratmalana","Moratuwa","Panadura"),
    waypoints: W("Pettah Bus Stand","Kollupitiya","Bambalapitiya","Wellawatta","Dehiwala","Mt. Lavinia","Ratmalana","Moratuwa","Panadura"),
    frequency: "5–8 min", type: "Ordinary", operatingHours: "5:00 AM – 11:00 PM",
    description: "Main Galle Road corridor from Pettah to Panadura via southern suburbs."
  },
  {
    id: "101", name: "Route 101", label: "Pettah ↔ Moratuwa",
    from: "Pettah", to: "Moratuwa", color: "#06B6D4", category: "Colombo Area",
    stops: S("Pettah Bus Stand","Slave Island","Kollupitiya","Bambalapitiya","Wellawatta","Dehiwala","Mt. Lavinia","Moratuwa"),
    waypoints: W("Pettah Bus Stand","Slave Island","Kollupitiya","Bambalapitiya","Wellawatta","Dehiwala","Mt. Lavinia","Moratuwa"),
    frequency: "5–10 min", type: "Ordinary", operatingHours: "5:00 AM – 11:30 PM",
    description: "Via Malay St. and Galle Road to Moratuwa."
  },
  {
    id: "102", name: "Route 102", label: "Kotahena ↔ Moratuwa",
    from: "Kotahena", to: "Moratuwa", color: "#8B5CF6", category: "Colombo Area",
    stops: S("Kotahena","Pettah Bus Stand","Colombo Fort","Slave Island","Kollupitiya","Bambalapitiya","Dehiwala","Mt. Lavinia","Moratuwa"),
    waypoints: W("Kotahena","Pettah Bus Stand","Colombo Fort","Slave Island","Kollupitiya","Bambalapitiya","Dehiwala","Mt. Lavinia","Moratuwa"),
    frequency: "8–12 min", type: "Ordinary", operatingHours: "5:30 AM – 10:30 PM",
    description: "From Kotahena via Pettah, Fort and Galle Road to Moratuwa."
  },
  {
    id: "104", name: "Route 104", label: "Bambalapitiya ↔ Wattala",
    from: "Bambalapitiya", to: "Wattala", color: "#F59E0B", category: "Colombo Area",
    stops: S("Bambalapitiya","Kollupitiya","Slave Island","Colombo Fort","Pettah Bus Stand","Grandpass","Wattala"),
    waypoints: W("Bambalapitiya","Kollupitiya","Slave Island","Colombo Fort","Pettah Bus Stand","Grandpass","Wattala"),
    frequency: "10–15 min", type: "Ordinary", operatingHours: "5:00 AM – 10:00 PM",
    description: "Via Bauddhaloka Mawatha, linking south Colombo to Wattala."
  },
  {
    id: "117", name: "Route 117", label: "Ratmalana ↔ Nugegoda",
    from: "Ratmalana", to: "Nugegoda", color: "#EC4899", category: "Colombo Area",
    stops: S("Ratmalana","Dehiwala","Attidiya","Nugegoda"),
    waypoints: W("Ratmalana","Dehiwala","Attidiya","Nugegoda"),
    frequency: "10–15 min", type: "Ordinary", operatingHours: "5:30 AM – 10:00 PM",
    description: "Via Attidiya Road and Pepiliyana Road."
  },
  {
    id: "118", name: "Route 118", label: "Dehiwala ↔ Beddagana",
    from: "Dehiwala", to: "Beddagana", color: "#14B8A6", category: "Colombo Area",
    stops: S("Dehiwala","Nugegoda","Pitakotte","Beddagana"),
    waypoints: W("Dehiwala","Nugegoda","Pitakotte","Beddagana"),
    frequency: "15–20 min", type: "Ordinary", operatingHours: "5:30 AM – 9:30 PM",
    description: "Via Nugegoda and Pitakotte."
  },
  {
    id: "119", name: "Route 119", label: "Dehiwala ↔ Nugegoda",
    from: "Dehiwala", to: "Nugegoda", color: "#F97316", category: "Colombo Area",
    stops: S("Dehiwala","Maharagama","Nugegoda"),
    waypoints: W("Dehiwala","Maharagama","Nugegoda"),
    frequency: "10–15 min", type: "Ordinary", operatingHours: "5:00 AM – 10:30 PM",
    description: "Via Maharagama and Old Kottawa Road."
  },
  {
    id: "134", name: "Route 134", label: "Mt. Lavinia ↔ Mulleriyawa",
    from: "Mt. Lavinia", to: "Mulleriyawa", color: "#A78BFA", category: "Colombo Area",
    stops: S("Mt. Lavinia","Dehiwala","Ratmalana","Pettah Bus Stand","Maradana","Mulleriyawa"),
    waypoints: W("Mt. Lavinia","Dehiwala","Ratmalana","Pettah Bus Stand","Maradana","Mulleriyawa"),
    frequency: "15–20 min", type: "Ordinary", operatingHours: "5:30 AM – 9:30 PM",
    description: "Via Galle Road, Pettah and Maradana."
  },
  {
    id: "138", name: "Route 138", label: "Kottawa ↔ Pettah",
    from: "Kottawa", to: "Pettah", color: "#00C896", category: "Colombo Area",
    stops: S("Kottawa","Maharagama","Nugegoda","Borella","Maradana","Pettah Bus Stand"),
    waypoints: W("Kottawa","Maharagama","Nugegoda","Borella","Maradana","Pettah Bus Stand"),
    frequency: "5–10 min", type: "Ordinary", operatingHours: "5:00 AM – 11:00 PM",
    description: "One of Sri Lanka's busiest routes – Kottawa to Pettah via Maharagama and Nugegoda."
  },
  {
    id: "140", name: "Route 140", label: "Kollupitiya ↔ Wellampitiya",
    from: "Kollupitiya", to: "Wellampitiya", color: "#EF4444", category: "Colombo Area",
    stops: S("Kollupitiya","Eye Hospital","Maradana","Wellampitiya"),
    waypoints: W("Kollupitiya","Eye Hospital","Maradana","Wellampitiya"),
    frequency: "10–15 min", type: "Ordinary", operatingHours: "5:30 AM – 10:00 PM",
    description: "Via Eye Hospital and Maradana."
  },
  {
    id: "141", name: "Route 141", label: "Wellawatta ↔ Narahenpita",
    from: "Wellawatta", to: "Narahenpita", color: "#3B82F6", category: "Colombo Area",
    stops: S("Wellawatta","Kirillapone","Narahenpita"),
    waypoints: W("Wellawatta","Kirillapone","Narahenpita"),
    frequency: "10–15 min", type: "Ordinary", operatingHours: "5:30 AM – 10:00 PM",
    description: "Via Kirillapone."
  },
  {
    id: "154", name: "Route 154", label: "Mt. Lavinia ↔ Kiribathgoda",
    from: "Mt. Lavinia", to: "Kiribathgoda", color: "#10B981", category: "Colombo Area",
    stops: S("Mt. Lavinia","Dehiwala","Ratmalana","Pettah Bus Stand","Maradana","Borella","Kiribathgoda"),
    waypoints: W("Mt. Lavinia","Dehiwala","Ratmalana","Pettah Bus Stand","Maradana","Borella","Kiribathgoda"),
    frequency: "15–20 min", type: "Ordinary", operatingHours: "5:30 AM – 9:00 PM",
    description: "Via Galle Road, Borella."
  },
  {
    id: "155", name: "Route 155", label: "Ratmalana ↔ Mattakuliya",
    from: "Ratmalana", to: "Mattakuliya", color: "#F59E0B", category: "Colombo Area",
    stops: S("Ratmalana","Mt. Lavinia","Dehiwala","Kollupitiya","Pettah Bus Stand","Mattakuliya"),
    waypoints: W("Ratmalana","Mt. Lavinia","Dehiwala","Kollupitiya","Pettah Bus Stand","Mattakuliya"),
    frequency: "15–20 min", type: "Ordinary", operatingHours: "5:00 AM – 9:30 PM",
    description: "Via Galle Road."
  },
  {
    id: "156", name: "Route 156", label: "Dehiwala ↔ Nugegoda",
    from: "Dehiwala", to: "Nugegoda", color: "#6366F1", category: "Colombo Area",
    stops: S("Dehiwala","Nedimale","Nugegoda"),
    waypoints: W("Dehiwala","Nedimale","Nugegoda"),
    frequency: "15–20 min", type: "Ordinary", operatingHours: "5:30 AM – 9:30 PM",
    description: "Via Nedimale Road."
  },
  {
    id: "163", name: "Route 163", label: "Dehiwala ↔ Battaramulla",
    from: "Dehiwala", to: "Battaramulla", color: "#EC4899", category: "Colombo Area",
    stops: S("Dehiwala","Nugegoda","Pitakotte","Battaramulla"),
    waypoints: W("Dehiwala","Nugegoda","Pitakotte","Battaramulla"),
    frequency: "10–15 min", type: "Ordinary", operatingHours: "5:00 AM – 10:00 PM",
    description: "Via Nugegoda and Pitakotte."
  },
  {
    id: "167", name: "Route 167", label: "Dehiwala ↔ Thotalanga",
    from: "Dehiwala", to: "Thotalanga", color: "#84CC16", category: "Colombo Area",
    stops: S("Dehiwala","Kollupitiya","Pettah Bus Stand","Panchikawatta","Thotalanga"),
    waypoints: W("Dehiwala","Kollupitiya","Pettah Bus Stand","Panchikawatta","Thotalanga"),
    frequency: "15–20 min", type: "Ordinary", operatingHours: "5:30 AM – 9:30 PM",
    description: "Via Galle Road and Panchikawatta."
  },
  {
    id: "175", name: "Route 175", label: "Kollupitiya ↔ Kohilawatta",
    from: "Kollupitiya", to: "Kohilawatta", color: "#F97316", category: "Colombo Area",
    stops: S("Kollupitiya","Narahenpita","Kohilawatta"),
    waypoints: W("Kollupitiya","Narahenpita","Kohilawatta"),
    frequency: "15–20 min", type: "Ordinary", operatingHours: "6:00 AM – 9:00 PM",
    description: "Kollupitiya to Kohilawatta."
  },
  {
    id: "176", name: "Route 176", label: "Karagampitiya ↔ Hettiyawatta",
    from: "Karagampitiya", to: "Hettiyawatta", color: "#06B6D4", category: "Colombo Area",
    stops: S("Dehiwala","Nugegoda","Borella","Hettiyawatta"),
    waypoints: W("Dehiwala","Nugegoda","Borella","Hettiyawatta"),
    frequency: "15–20 min", type: "Ordinary", operatingHours: "5:30 AM – 9:30 PM",
    description: "Via Nugegoda and Borella."
  },
  {
    id: "177", name: "Route 177", label: "Kollupitiya ↔ Kaduwela",
    from: "Kollupitiya", to: "Kaduwela", color: "#A78BFA", category: "Colombo Area",
    stops: S("Kollupitiya","Narahenpita","Battaramulla","Kaduwela"),
    waypoints: W("Kollupitiya","Narahenpita","Battaramulla","Kaduwela"),
    frequency: "8–12 min", type: "Ordinary", operatingHours: "5:00 AM – 11:00 PM",
    description: "Via Battaramulla."
  },
  {
    id: "180", name: "Route 180", label: "Pettah ↔ Nittambuwa",
    from: "Pettah", to: "Nittambuwa", color: "#10B981", category: "Colombo Area",
    stops: S("Pettah Bus Stand","Kelaniya","Kiribathgoda","Kadawatha","Nittambuwa"),
    waypoints: W("Pettah Bus Stand","Kelaniya","Kiribathgoda","Kadawatha","Nittambuwa"),
    frequency: "10–15 min", type: "Ordinary", operatingHours: "5:00 AM – 10:00 PM",
    description: "Via Kandy Road to Nittambuwa."
  },
  {
    id: "193", name: "Route 193", label: "Town Hall ↔ Kadawatta",
    from: "Town Hall", to: "Kadawatta", color: "#EF4444", category: "Colombo Area",
    stops: S("Town Hall","Maradana","Kelaniya","Kiribathgoda","Kadawatha"),
    waypoints: W("Town Hall","Maradana","Kelaniya","Kiribathgoda","Kadawatha"),
    frequency: "10–15 min", type: "Ordinary", operatingHours: "5:30 AM – 10:00 PM",
    description: "Via Maradana."
  },
  {
    id: "200", name: "Route 200", label: "Pettah ↔ Gampaha",
    from: "Pettah", to: "Gampaha", color: "#F59E0B", category: "Colombo Area",
    stops: S("Pettah Bus Stand","Kelaniya","Kiribathgoda","Ragama","Gampaha"),
    waypoints: W("Pettah Bus Stand","Kelaniya","Kiribathgoda","Ragama","Gampaha"),
    frequency: "10–15 min", type: "Ordinary", operatingHours: "5:00 AM – 10:30 PM",
    description: "Via Kandy Road to Gampaha."
  },
  {
    id: "224", name: "Route 224", label: "Pettah ↔ Pugoda",
    from: "Pettah", to: "Pugoda", color: "#8B5CF6", category: "Colombo Area",
    stops: S("Pettah Bus Stand","Kelaniya","Malwana","Pugoda"),
    waypoints: W("Pettah Bus Stand","Kelaniya","Malwana","Pugoda"),
    frequency: "20–30 min", type: "Ordinary", operatingHours: "6:00 AM – 8:00 PM",
    description: "Via Kelaniya and Malwana."
  },
  {
    id: "228", name: "Route 228", label: "Pettah ↔ Weliveriya",
    from: "Pettah", to: "Weliveriya", color: "#14B8A6", category: "Colombo Area",
    stops: S("Pettah Bus Stand","Kelaniya","Biyagama","Weliveriya"),
    waypoints: W("Pettah Bus Stand","Kelaniya","Biyagama","Weliveriya"),
    frequency: "20–30 min", type: "Ordinary", operatingHours: "6:00 AM – 8:30 PM",
    description: "Via Biyagama Road."
  },
  {
    id: "230", name: "Route 230", label: "Fort ↔ Kiribathgoda",
    from: "Colombo Fort", to: "Kiribathgoda", color: "#3B82F6", category: "Colombo Area",
    stops: S("Colombo Fort","Maradana","Sapugaskanda","Kiribathgoda"),
    waypoints: W("Colombo Fort","Maradana","Sapugaskanda","Kiribathgoda"),
    frequency: "15–20 min", type: "Ordinary", operatingHours: "5:30 AM – 9:30 PM",
    description: "Via Sapugaskanda."
  },
  {
    id: "234", name: "Route 234", label: "Pettah ↔ Delgoda",
    from: "Pettah", to: "Delgoda", color: "#F97316", category: "Colombo Area",
    stops: S("Pettah Bus Stand","Kelaniya","Kiribathgoda","Makola","Delgoda"),
    waypoints: W("Pettah Bus Stand","Kelaniya","Kiribathgoda","Makola","Delgoda"),
    frequency: "20–30 min", type: "Ordinary", operatingHours: "6:00 AM – 8:00 PM",
    description: "Via Makola Road and Kiribathgoda."
  },
  {
    id: "235", name: "Route 235", label: "Pettah ↔ Kelaniya",
    from: "Pettah", to: "Kelaniya", color: "#00C896", category: "Colombo Area",
    stops: S("Pettah Bus Stand","Grandpass","Kelaniya"),
    waypoints: W("Pettah Bus Stand","Grandpass","Kelaniya"),
    frequency: "8–12 min", type: "Ordinary", operatingHours: "5:00 AM – 11:00 PM",
    description: "Via Kandy Road to Kelaniya Temple area."
  },
  {
    id: "255", name: "Route 255", label: "Mt. Lavinia ↔ Kottawa",
    from: "Mt. Lavinia", to: "Kottawa", color: "#EC4899", category: "Colombo Area",
    stops: S("Mt. Lavinia","Ratmalana","Katubedda","Piliyandala","Kottawa"),
    waypoints: W("Mt. Lavinia","Ratmalana","Katubedda","Piliyandala","Kottawa"),
    frequency: "15–20 min", type: "Ordinary", operatingHours: "5:30 AM – 9:30 PM",
    description: "Via Katubedda and Piliyandala."
  },
  {
    id: "356", name: "Route 356", label: "Fort ↔ Karabugas Handiya",
    from: "Colombo Fort", to: "Karabugas Handiya", color: "#6366F1", category: "Colombo Area",
    stops: S("Colombo Fort","Pettah Bus Stand","Maradana","Wellampitiya","Mulleriyawa"),
    waypoints: W("Colombo Fort","Pettah Bus Stand","Maradana","Wellampitiya","Mulleriyawa"),
    frequency: "20–30 min", type: "Ordinary", operatingHours: "6:00 AM – 8:30 PM",
    description: "Fort to Karabugas Handiya."
  },
  {
    id: "400", name: "Route 400", label: "Pettah ↔ Kalutara",
    from: "Pettah", to: "Kalutara", color: "#06B6D4", category: "Colombo Area",
    stops: S("Pettah Bus Stand","Moratuwa","Panadura","Kalutara"),
    waypoints: W("Pettah Bus Stand","Moratuwa","Panadura","Kalutara"),
    frequency: "20–30 min", type: "Express", operatingHours: "5:00 AM – 9:30 PM",
    description: "Via Galle Road to Kalutara."
  },
  // ── Suburban / Gampaha ───────────────────────────────────
  {
    id: "974", name: "Route 974", label: "Gampaha ↔ Ja-Ela",
    from: "Gampaha", to: "Ja-Ela", color: "#84CC16", category: "Suburban",
    stops: S("Gampaha","Ragama","Wattala","Ja-Ela"),
    waypoints: W("Gampaha","Ragama","Wattala","Ja-Ela"),
    frequency: "20–30 min", type: "Ordinary", operatingHours: "5:30 AM – 8:30 PM",
    description: "Gampaha to Ja-Ela suburban route."
  },
  {
    id: "980", name: "Route 980", label: "Weyangoda ↔ Keenawala",
    from: "Weyangoda", to: "Keenawala", color: "#F59E0B", category: "Suburban",
    stops: S("Weyangoda","Gampaha","Veyangoda"),
    waypoints: W("Weyangoda","Gampaha","Veyangoda"),
    frequency: "30–45 min", type: "Ordinary", operatingHours: "6:00 AM – 7:00 PM",
    description: "Weyangoda area suburban service."
  },
  {
    id: "982", name: "Route 982", label: "Gampaha ↔ Maradagahamula",
    from: "Gampaha", to: "Maradagahamula", color: "#A78BFA", category: "Suburban",
    stops: S("Gampaha","Veyangoda","Weliveriya"),
    waypoints: W("Gampaha","Veyangoda","Weliveriya"),
    frequency: "30–45 min", type: "Ordinary", operatingHours: "6:00 AM – 7:00 PM",
    description: "Gampaha local suburban route."
  },
  {
    id: "983", name: "Route 983", label: "Wattala ↔ Kiribathgoda",
    from: "Wattala", to: "Kiribathgoda", color: "#10B981", category: "Suburban",
    stops: S("Wattala","Ragama","Kiribathgoda"),
    waypoints: W("Wattala","Ragama","Kiribathgoda"),
    frequency: "20–30 min", type: "Ordinary", operatingHours: "5:30 AM – 9:00 PM",
    description: "Wattala to Kiribathgoda suburban service."
  },
  {
    id: "990", name: "Route 990", label: "Maharagama ↔ Vidyala Junction",
    from: "Maharagama", to: "Vidyala Junction", color: "#EF4444", category: "Suburban",
    stops: S("Maharagama","Nugegoda","Borella"),
    waypoints: W("Maharagama","Nugegoda","Borella"),
    frequency: "20–30 min", type: "Ordinary", operatingHours: "6:00 AM – 8:00 PM",
    description: "Maharagama local route."
  },
  {
    id: "993", name: "Route 993", label: "Maharagama ↔ Malabe",
    from: "Maharagama", to: "Malabe", color: "#3B82F6", category: "Suburban",
    stops: S("Maharagama","Nugegoda","Battaramulla","Malabe"),
    waypoints: W("Maharagama","Nugegoda","Battaramulla","Malabe"),
    frequency: "15–20 min", type: "Ordinary", operatingHours: "5:30 AM – 9:30 PM",
    description: "Maharagama to Malabe via Battaramulla."
  },
  // ── Long-Distance Routes ─────────────────────────────────
  {
    id: "2", name: "Route 2", label: "Colombo ↔ Matara (Expressway)",
    from: "Colombo", to: "Matara", color: "#F97316", category: "Long Distance",
    stops: S("Pettah Bus Stand","Moratuwa","Panadura","Kalutara","Aluthgama","Hikkaduwa","Galle","Weligama","Matara"),
    waypoints: W("Pettah Bus Stand","Moratuwa","Panadura","Kalutara","Aluthgama","Hikkaduwa","Galle","Weligama","Matara"),
    frequency: "30–45 min", type: "Express", operatingHours: "4:30 AM – 9:00 PM",
    description: "Southern Expressway service to Matara."
  },
  {
    id: "15", name: "Route 15", label: "Colombo ↔ Anuradhapura / Vavuniya",
    from: "Colombo", to: "Anuradhapura/Vavuniya", color: "#8B5CF6", category: "Long Distance",
    stops: S("Pettah Bus Stand","Kelaniya","Kurunegala","Maho","Anuradhapura","Vavuniya"),
    waypoints: W("Pettah Bus Stand","Kelaniya","Kurunegala","Maho","Anuradhapura","Vavuniya"),
    frequency: "60–90 min", type: "Express", operatingHours: "5:00 AM – 8:00 PM",
    description: "Long-distance express to the ancient capital Anuradhapura and beyond."
  },
  // ── Circular (C) Routes ──────────────────────────────────
  {
    id: "C001-CW", name: "Route C001 (CW)", label: "Makumbura Circuit (Clockwise)",
    from: "Makumbura", to: "Makumbura", color: "#00C896", category: "Suburban",
    stops: S("Makumbura","Nugegoda","Pettah Bus Stand","Battaramulla","Makumbura"),
    waypoints: W("Makumbura","Nugegoda","Pettah Bus Stand","Battaramulla","Makumbura"),
    frequency: "15–20 min", type: "Circular", operatingHours: "5:30 AM – 9:30 PM",
    description: "Clockwise suburban circular via Nugegoda and Pettah."
  },
  {
    id: "C001-ACW", name: "Route C001 (ACW)", label: "Makumbura Circuit (Anti-clockwise)",
    from: "Makumbura", to: "Makumbura", color: "#06B6D4", category: "Suburban",
    stops: S("Makumbura","Battaramulla","Pettah Bus Stand","Nugegoda","Makumbura"),
    waypoints: W("Makumbura","Battaramulla","Pettah Bus Stand","Nugegoda","Makumbura"),
    frequency: "15–20 min", type: "Circular", operatingHours: "5:30 AM – 9:30 PM",
    description: "Anti-clockwise suburban circular via Battaramulla and Pettah."
  },
  {
    id: "C002-CW", name: "Route C002 (CW)", label: "Narahenpita Circuit (Clockwise)",
    from: "Makumbura", to: "Makumbura", color: "#EC4899", category: "Suburban",
    stops: S("Makumbura","Nugegoda","Bambalapitiya","Narahenpita","Makumbura"),
    waypoints: W("Makumbura","Nugegoda","Bambalapitiya","Narahenpita","Makumbura"),
    frequency: "15–20 min", type: "Circular", operatingHours: "5:30 AM – 9:30 PM",
    description: "Clockwise via Narahenpita and Bambalapitiya."
  },
  // ── Northern Province School Routes ─────────────────────
  {
    id: "750", name: "Route 750 (Sisu Sariya)", label: "Atchuwely ↔ Jaffna",
    from: "Atchuwely", to: "Jaffna", color: "#FBBF24", category: "School Service",
    stops: S("Atchuwely","Jaffna"),
    waypoints: W("Atchuwely","Jaffna"),
    frequency: "School hours", type: "School Service", operatingHours: "6:30 AM / 1:00 PM",
    description: "Sisu Sariya school service – St. Johns College, Jaffna."
  },
  {
    id: "764", name: "Route 764 (Sisu Sariya)", label: "Punmalaikuduwan ↔ Chundakuli",
    from: "Punmalaikuduwan", to: "Chundakuli", color: "#FBBF24", category: "School Service",
    stops: S("Punmalaikuduwan","Chundakuli"),
    waypoints: W("Punmalaikuduwan","Chundakuli"),
    frequency: "School hours", type: "School Service", operatingHours: "6:30 AM / 1:00 PM",
    description: "Sisu Sariya – Chundikuli Girls College."
  },
  {
    id: "769", name: "Route 769 (Sisu Sariya)", label: "Jaffna ↔ Chundakuli",
    from: "Jaffna", to: "Chundakuli", color: "#FBBF24", category: "School Service",
    stops: S("Jaffna","Chundakuli"),
    waypoints: W("Jaffna","Chundakuli"),
    frequency: "School hours", type: "School Service", operatingHours: "6:30 AM / 1:00 PM",
    description: "Sisu Sariya – Union College, Jaffna."
  },
];

// ════════════════════════════════════════════════════════════
// TRAIN ROUTES (All Official Lines)
// ════════════════════════════════════════════════════════════
const TRAIN_ROUTES = [
  {
    id: "main_line",
    name: "Main Line",
    label: "Colombo Fort ↔ Badulla",
    from: "Colombo Fort", to: "Badulla",
    color: "#F97316", lengthKm: 291,
    trains: ["Udarata Menike", "Podi Menike", "Night Mail", "Intercity Express"],
    stops: S("Colombo Fort","Maradana","Kelaniya","Ragama","Gampaha","Veyangoda","Nittambuwa","Kegalle","Peradeniya","Kandy","Gampola","Nawalapitiya","Hatton","Nanu Oya","Badulla"),
    waypoints: W("Colombo Fort","Maradana","Kelaniya","Ragama","Gampaha","Veyangoda","Nittambuwa","Kegalle","Peradeniya","Kandy","Gampola","Nawalapitiya","Hatton","Nanu Oya","Badulla"),
    frequency: "4–6 trains/day", type: "Intercity & Ordinary",
    operatingHours: "5:55 AM – 8:30 PM",
    description: "The iconic 291 km hill country railway – one of the world's most scenic train journeys through tea estates and highland vistas."
  },
  {
    id: "northern_line",
    name: "Northern Line",
    label: "Polgahawela ↔ Kankesanthurai",
    from: "Polgahawela", to: "Kankesanthurai",
    color: "#EF4444", lengthKm: 339,
    trains: ["Yal Devi", "Uttara Devi", "4017"],
    stops: S("Colombo Fort","Maradana","Polgahawela","Kurunegala","Maho","Anuradhapura","Vavuniya","Kilinochchi","Jaffna","Kankesanthurai"),
    waypoints: W("Colombo Fort","Maradana","Polgahawela","Kurunegala","Maho","Anuradhapura","Vavuniya","Kilinochchi","Jaffna","Kankesanthurai"),
    frequency: "2 trains/day", type: "Intercity Express",
    operatingHours: "5:30 AM & 6:00 PM departure",
    description: "Sri Lanka's longest railway corridor – 339 km from Polgahawela through Anuradhapura to Kankesanthurai in the far north."
  },
  {
    id: "coastal_line",
    name: "Coastal Line",
    label: "Colombo Fort ↔ Beliatta",
    from: "Colombo Fort", to: "Beliatta",
    color: "#3B82F6", lengthKm: 161,
    trains: ["Ruhunu Kumari", "Samudra Devi", "Galu Kumari", "Matara Express"],
    stops: S("Colombo Fort","Kollupitiya","Bambalapitiya","Wellawatta","Dehiwala","Mt. Lavinia","Moratuwa","Panadura","Aluthgama","Hikkaduwa","Galle","Weligama","Matara","Beliatta"),
    waypoints: W("Colombo Fort","Kollupitiya","Bambalapitiya","Wellawatta","Dehiwala","Mt. Lavinia","Moratuwa","Panadura","Aluthgama","Hikkaduwa","Galle","Weligama","Matara","Beliatta"),
    frequency: "8–10 trains/day", type: "Express & Intercity",
    operatingHours: "4:35 AM – 9:30 PM",
    description: "Scenic 161 km coastal railway hugging the Indian Ocean from Colombo south to Beliatta."
  },
  {
    id: "thalaimannar_line",
    name: "Thalaimannar Line",
    label: "Medawachchiya ↔ Mannar",
    from: "Medawachchiya", to: "Mannar",
    color: "#A78BFA", lengthKm: 106,
    trains: ["Mannar Mail"],
    stops: S("Medawachchiya","Mannar"),
    waypoints: W("Medawachchiya","Mannar"),
    frequency: "2 trains/day", type: "Ordinary",
    operatingHours: "7:00 AM – 4:00 PM",
    description: "106 km branch line from Medawachchiya to Mannar on the northwest coast."
  },
  {
    id: "batticaloa_line",
    name: "Batticaloa Line",
    label: "Maho ↔ Batticaloa",
    from: "Maho", to: "Batticaloa",
    color: "#FBBF24", lengthKm: 212,
    trains: ["Udaya Devi (6011)", "Pulathisi (6075)", "Meenagaya (6079)"],
    stops: S("Colombo Fort","Maradana","Maho","Galoya Junction","Batticaloa"),
    waypoints: W("Colombo Fort","Maradana","Maho","Galoya Junction","Batticaloa"),
    frequency: "3 trains/day", type: "Intercity",
    operatingHours: "6:05 AM / 3:15 PM / 11:00 PM departure",
    description: "212 km trans-island route connecting Colombo to Batticaloa on the east coast."
  },
  {
    id: "trincomalee_line",
    name: "Trincomalee Line",
    label: "Galoya Junction ↔ Trincomalee",
    from: "Galoya Junction", to: "Trincomalee",
    color: "#06B6D4", lengthKm: 70,
    trains: ["Trinco Express"],
    stops: S("Galoya Junction","Trincomalee"),
    waypoints: W("Galoya Junction","Trincomalee"),
    frequency: "2 trains/day", type: "Ordinary",
    operatingHours: "7:00 AM – 5:00 PM",
    description: "70 km branch from Galoya to the port city of Trincomalee."
  },
  {
    id: "mihintale_line",
    name: "Mihintale Line",
    label: "Anuradhapura ↔ Mihintale",
    from: "Anuradhapura", to: "Mihintale",
    color: "#10B981", lengthKm: 14,
    trains: ["Mihintale Local"],
    stops: S("Anuradhapura","Mihintale"),
    waypoints: W("Anuradhapura","Mihintale"),
    frequency: "4 trains/day", type: "Ordinary",
    operatingHours: "6:00 AM – 5:30 PM",
    description: "Short 14 km branch to the sacred Mihintale pilgrimage site."
  },
  {
    id: "puttalam_line",
    name: "Puttalam Line",
    label: "Ragama ↔ Puttalam",
    from: "Ragama", to: "Puttalam",
    color: "#84CC16", lengthKm: 120,
    trains: ["Puttalam Rajarata", "Chilaw Local"],
    stops: S("Colombo Fort","Maradana","Ragama","Negombo","Chilaw","Puttalam"),
    waypoints: W("Colombo Fort","Maradana","Ragama","Negombo","Chilaw","Puttalam"),
    frequency: "3 trains/day", type: "Ordinary",
    operatingHours: "6:00 AM – 5:00 PM",
    description: "120 km northwest coastal railway through Negombo and Chilaw to Puttalam."
  },
  {
    id: "kelani_valley_line",
    name: "Kelani Valley Line",
    label: "Maradana ↔ Avissawella",
    from: "Maradana", to: "Avissawella",
    color: "#EC4899", lengthKm: 59,
    trains: ["9271 Avissawella Express", "Kelani Valley Ordinary"],
    stops: S("Maradana","Colombo Fort","Padukka","Avissawella"),
    waypoints: W("Maradana","Colombo Fort","Padukka","Avissawella"),
    frequency: "5 trains/day", type: "Ordinary & Express",
    operatingHours: "5:30 AM – 8:00 PM",
    description: "Narrow-gauge 59 km line winding through the Kelani River valley to Avissawella."
  },
  {
    id: "matale_line",
    name: "Matale Line",
    label: "Peradeniya Junction ↔ Matale",
    from: "Peradeniya Junction", to: "Matale",
    color: "#F97316", lengthKm: 34,
    trains: ["Matale Local"],
    stops: S("Peradeniya Junction","Kandy","Matale"),
    waypoints: W("Peradeniya Junction","Kandy","Matale"),
    frequency: "4 trains/day", type: "Ordinary",
    operatingHours: "6:00 AM – 5:00 PM",
    description: "Short 34 km branch from Peradeniya Junction via Kandy to Matale."
  },
];

// ── Categories for filtering ──────────────────────────────────
const BUS_CATEGORIES = [...new Set(BUS_ROUTES.map(r => r.category))];

// ── STOPS INDEX for journey planner ──────────────────────────
const ALL_STOPS = (() => {
  const set = new Set();
  BUS_ROUTES.forEach(r => r.stops.forEach(s => { if (s.name) set.add(s.name); }));
  return [...set].sort();
})();

// ── Journey planner ───────────────────────────────────────────
function findRoutes(from, to) {
  const results = [];
  const fLower = from.toLowerCase();
  const tLower = to.toLowerCase();
  BUS_ROUTES.forEach(route => {
    const names = route.stops.map(s => s.name.toLowerCase());
    const fi = names.findIndex(n => n.includes(fLower));
    const ti = names.findIndex(n => n.includes(tLower));
    if (fi !== -1 && ti !== -1) {
      results.push({ route, fromIdx: fi, toIdx: ti });
    }
  });
  return results;
}

// ── Vehicle simulation ────────────────────────────────────────
function generateVehicles(route, count = 4) {
  const pts = route.waypoints.filter(p => p[0] !== 0);
  if (pts.length < 2) return [];
  const vehicles = [];
  for (let i = 0; i < count; i++) {
    const startFraction = i / count;
    const totalPts = pts.length;
    const ptIdx = Math.min(Math.floor(startFraction * (totalPts - 1)), totalPts - 2);
    const frac = (startFraction * (totalPts - 1)) - ptIdx;
    const p1 = pts[ptIdx], p2 = pts[ptIdx + 1];
    const lat = p1[0] + (p2[0] - p1[0]) * frac;
    const lng = p1[1] + (p2[1] - p1[1]) * frac;
    vehicles.push({
      id: `${route.id}-${String(i + 1).padStart(2, "0")}`,
      routeId: route.id,
      lat, lng, ptIdx, frac,
      speed: 0.00025 + Math.random() * 0.0003,
      status: i < count - 1 ? "active" : "idle",
      deviceOn: i < count - 1,
      passengers: Math.floor(Math.random() * 55) + 5,
      lastUpdate: new Date().toLocaleTimeString("en-LK"),
    });
  }
  return vehicles;
}
