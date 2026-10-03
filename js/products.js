/*
 * Configuración de la tienda y catálogo de NEXOPARTS.
 * Edita este archivo para cambiar datos de contacto, categorías y productos.
 * Precios en pesos chilenos (CLP), IVA incluido.
 */

const STORE_CONFIG = {
  name: "NEXOPARTS",
  domain: "nexoparts.cl",
  // Número de WhatsApp en formato internacional sin "+" ni espacios (REEMPLAZAR por el real).
  whatsapp: "56900000000",
  phoneDisplay: "+56 9 0000 0000",
  email: "ventas@nexoparts.cl",
  address: "Santiago, Región Metropolitana, Chile",
  // Hora límite (hora de Chile) para despacho el mismo día.
  cutoffHour: 12,
};

// Marcas disponibles en el selector "Selecciona tu vehículo".
const VEHICLE_BRANDS = {
  tracto: ["Volvo", "Scania", "Mercedes-Benz", "Freightliner", "International", "Kenworth", "Iveco", "MAN"],
  semi: ["Randon", "Goldhofer", "Krone", "Schmitz", "Facchini", "Librelato", "Otra marca"],
};

const CATEGORIES = [
  { id: "frenos",        name: "Frenos",             icon: "brake",  desc: "Balatas, tambores, pulmones y válvulas", subs: ["Balatas", "Tambor", "Pulmón de freno", "Chicharra", "Válvula relé", "Pastillas"] },
  { id: "suspension",    name: "Suspensión",         icon: "spring", desc: "Pulmones de aire, amortiguadores y bujes", subs: ["Pulmón de suspensión", "Amortiguador", "Bujes", "Válvula niveladora"] },
  { id: "motor",         name: "Motor",              icon: "engine", desc: "Bombas, turbos, termostatos y correas", subs: ["Bomba de agua", "Turbo", "Correa", "Termostato"] },
  { id: "filtros",       name: "Filtros",            icon: "filter", desc: "Aceite, aire, combustible y secador", subs: ["Filtro de aceite", "Filtro de aire", "Filtro combustible", "Secador"] },
  { id: "transmision",   name: "Transmisión",        icon: "gear",   desc: "Embragues, crucetas y cardanes", subs: ["Embrague", "Cruceta", "Soporte de cardán"] },
  { id: "electrico",     name: "Eléctrico",          icon: "bulb",   desc: "Focos LED, espirales y alternadores", subs: ["Foco", "Plafón", "Espiral", "Alternador"] },
  { id: "acople",        name: "Quinta rueda",       icon: "hitch",  desc: "Quinta rueda, kingpin y manitos", subs: ["Quinta rueda", "Kingpin", "Manitos"] },
  { id: "semirremolque", name: "Semirremolque",      icon: "axle",   desc: "Ejes, mazas, rodamientos y patas", subs: ["Patas de apoyo", "Maza", "Rodamientos", "Eje completo"] },
];

/*
 * vehicle: "tracto" | "semi" | "ambos"
 * fits: marcas compatibles; vacío = universal / multimarca.
 * sub: texto corto bajo el nombre (aplicación · fabricante).
 */
const PRODUCTS = [
  // Frenos
  { id: "NX-FR-001", name: "Juego de balatas freno tambor 4707", cat: "frenos", vehicle: "ambos", fits: [], sub: "Multimarca · Meritor compatible", price: 48990, stock: 40, featured: true },
  { id: "NX-FR-002", name: "Tambor de freno 16,5\" x 7\"", cat: "frenos", vehicle: "semi", fits: [], sub: "Eje 10 pernos · Balanceado", price: 129990, stock: 12 },
  { id: "NX-FR-003", name: "Pulmón de freno doble 30/30", cat: "frenos", vehicle: "ambos", fits: [], sub: "Servicio y estacionamiento · TSE compatible", price: 54990, stock: 25, featured: true },
  { id: "NX-FR-004", name: "Chicharra ajustador automático", cat: "frenos", vehicle: "ambos", fits: [], sub: "28 dientes 1-1/2\" · Haldex compatible", price: 42990, stock: 30 },
  { id: "NX-FR-005", name: "Válvula relé de freno", cat: "frenos", vehicle: "semi", fits: [], sub: "Sistema neumático · WABCO compatible", price: 38990, stock: 18 },
  { id: "NX-FR-006", name: "Pastillas de freno de disco", cat: "frenos", vehicle: "tracto", fits: ["Volvo", "Scania"], sub: "Volvo FH / Scania R · Knorr compatible", price: 89990, stock: 14 },

  // Suspensión
  { id: "NX-SU-001", name: "Pulmón de suspensión semirremolque", cat: "suspension", vehicle: "semi", fits: [], sub: "Con pistón · Firestone compatible", price: 69990, stock: 22, featured: true },
  { id: "NX-SU-002", name: "Pulmón de suspensión de cabina", cat: "suspension", vehicle: "tracto", fits: ["Volvo"], sub: "Volvo FH / FM · Contitech compatible", price: 59990, stock: 16 },
  { id: "NX-SU-003", name: "Amortiguador eje trasero", cat: "suspension", vehicle: "ambos", fits: [], sub: "Uso pesado · Monroe compatible", price: 46990, stock: 28 },
  { id: "NX-SU-004", name: "Válvula niveladora de altura", cat: "suspension", vehicle: "ambos", fits: [], sub: "Incluye varilla · Haldex compatible", price: 52990, stock: 10 },
  { id: "NX-SU-005", name: "Kit bujes brazo de torque", cat: "suspension", vehicle: "semi", fits: [], sub: "Goma / metal · Multimarca", price: 24990, stock: 35 },

  // Motor
  { id: "NX-MO-001", name: "Bomba de agua motor D13", cat: "motor", vehicle: "tracto", fits: ["Volvo"], sub: "Volvo D13 · Con empaquetadura", price: 189990, stock: 6, featured: true },
  { id: "NX-MO-002", name: "Correa poly-V alternador", cat: "motor", vehicle: "tracto", fits: [], sub: "Multicanal · Gates compatible", price: 32990, stock: 40 },
  { id: "NX-MO-003", name: "Turbo cargador DC13", cat: "motor", vehicle: "tracto", fits: ["Scania"], sub: "Scania DC13 · Holset remanufacturado", price: 1249990, stock: 2 },
  { id: "NX-MO-004", name: "Termostato motor OM457", cat: "motor", vehicle: "tracto", fits: ["Mercedes-Benz"], sub: "Actros / Axor · Behr compatible", price: 39990, stock: 15 },

  // Filtros
  { id: "NX-FI-001", name: "Filtro de aceite premium", cat: "filtros", vehicle: "tracto", fits: ["Volvo"], sub: "Volvo D12 / D13 · Mann compatible", price: 18990, stock: 80, featured: true },
  { id: "NX-FI-002", name: "Filtro de aire primario", cat: "filtros", vehicle: "tracto", fits: ["Scania"], sub: "Scania R / G / P · Donaldson compatible", price: 64990, stock: 24 },
  { id: "NX-FI-003", name: "Filtro combustible separador de agua", cat: "filtros", vehicle: "tracto", fits: [], sub: "Diésel multimarca · Fleetguard compatible", price: 26990, stock: 50 },
  { id: "NX-FI-004", name: "Cartucho secador de aire", cat: "filtros", vehicle: "tracto", fits: [], sub: "Sistema neumático · WABCO compatible", price: 44990, stock: 20 },

  // Transmisión
  { id: "NX-TR-001", name: "Kit de embrague 430 mm", cat: "transmision", vehicle: "tracto", fits: ["Volvo", "Scania", "Mercedes-Benz", "MAN", "Iveco"], sub: "Disco, prensa y rodamiento · Sachs compatible", price: 699990, stock: 4, featured: true },
  { id: "NX-TR-002", name: "Cruceta cardán serie 1810", cat: "transmision", vehicle: "tracto", fits: [], sub: "Con graseras · Spicer compatible", price: 54990, stock: 18 },
  { id: "NX-TR-003", name: "Soporte central de cardán", cat: "transmision", vehicle: "tracto", fits: [], sub: "Con rodamiento · Multimarca", price: 72990, stock: 9 },

  // Eléctrico
  { id: "NX-EL-001", name: "Foco trasero LED 24V 3 funciones", cat: "electrico", vehicle: "ambos", fits: [], sub: "Posición, freno y viraje · IP67", price: 29990, stock: 60, featured: true },
  { id: "NX-EL-002", name: "Plafón lateral LED ámbar 24V", cat: "electrico", vehicle: "semi", fits: [], sub: "Luz de gálibo · Multimarca", price: 5990, stock: 200 },
  { id: "NX-EL-003", name: "Espiral eléctrico 7 polos", cat: "electrico", vehicle: "ambos", fits: [], sub: "4,5 m · Enchufes metálicos", price: 34990, stock: 30 },
  { id: "NX-EL-004", name: "Alternador 28V 80A", cat: "electrico", vehicle: "tracto", fits: [], sub: "Sistema 24V · Bosch compatible", price: 349990, stock: 5 },

  // Quinta rueda y acople
  { id: "NX-AC-001", name: "Quinta rueda 2\" completa", cat: "acople", vehicle: "tracto", fits: [], sub: "Con placa de montaje · Jost compatible", price: 1189990, stock: 3, featured: true },
  { id: "NX-AC-002", name: "Kit reparación quinta rueda", cat: "acople", vehicle: "tracto", fits: [], sub: "Mandíbula y cierre · Jost compatible", price: 149990, stock: 10 },
  { id: "NX-AC-003", name: "Kingpin perno rey 2\"", cat: "acople", vehicle: "semi", fits: [], sub: "Acero forjado · Multimarca", price: 119990, stock: 8 },
  { id: "NX-AC-004", name: "Manitos de aire rojo / azul (par)", cat: "acople", vehicle: "ambos", fits: [], sub: "Gladhands con sellos · Multimarca", price: 15990, stock: 70 },

  // Semirremolque
  { id: "NX-SE-001", name: "Patas de apoyo 24 t (par)", cat: "semirremolque", vehicle: "semi", fits: [], sub: "Dos velocidades · SAF-Holland compatible", price: 529990, stock: 4, featured: true },
  { id: "NX-SE-002", name: "Maza de rueda eje semirremolque", cat: "semirremolque", vehicle: "semi", fits: [], sub: "10 pernos con rodamientos · BPW compatible", price: 159990, stock: 8 },
  { id: "NX-SE-003", name: "Kit rodamientos de rueda", cat: "semirremolque", vehicle: "ambos", fits: [], sub: "Interior, exterior y retén · Timken compatible", price: 49990, stock: 26 },
  { id: "NX-SE-004", name: "Eje completo 13 t con frenos", cat: "semirremolque", vehicle: "semi", fits: [], sub: "Frenos de tambor y mazas · Randon compatible", price: 1899990, stock: 2 },
];
