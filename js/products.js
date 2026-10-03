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
};

// vehicle: "tracto" | "semi" | "ambos"
const CATEGORIES = [
  { id: "frenos",       name: "Frenos",                  icon: "🛑", desc: "Balatas, tambores, pulmones y válvulas" },
  { id: "suspension",   name: "Suspensión",              icon: "🧰", desc: "Pulmones de aire, amortiguadores y bujes" },
  { id: "motor",        name: "Motor",                   icon: "⚙️", desc: "Kits de motor, bombas, turbos y correas" },
  { id: "filtros",      name: "Filtros y lubricantes",   icon: "🛢️", desc: "Filtros de aceite, aire, combustible" },
  { id: "transmision",  name: "Transmisión y embrague",  icon: "🔩", desc: "Kits de embrague, crucetas y cardanes" },
  { id: "electrico",    name: "Eléctrico e iluminación", icon: "💡", desc: "Focos LED, conectores y alternadores" },
  { id: "acople",       name: "Quinta rueda y acople",   icon: "🔗", desc: "Quinta rueda, kingpin y manitos" },
  { id: "semirremolque",name: "Ejes y semirremolque",    icon: "🚛", desc: "Ejes, patas de apoyo y mazas" },
];

const PRODUCTS = [
  // Frenos
  { id: "NX-FR-001", name: "Juego de balatas freno tambor 4707", cat: "frenos", vehicle: "ambos", brand: "Meritor compatible", price: 48990, stock: 40, featured: true,
    desc: "Juego de balatas para freno de tambor tipo 4707 (16,5\" x 7\"). Uso en ejes de tracto y semirremolque." },
  { id: "NX-FR-002", name: "Tambor de freno 16,5\" x 7\"", cat: "frenos", vehicle: "semi", brand: "Genérico premium", price: 129990, stock: 12,
    desc: "Tambor de freno balanceado para ejes de semirremolque estándar 10 pernos." },
  { id: "NX-FR-003", name: "Pulmón de freno doble 30/30", cat: "frenos", vehicle: "ambos", brand: "TSE / compatible", price: 54990, stock: 25, featured: true,
    desc: "Cámara de freno de servicio y estacionamiento tipo 30/30 con resorte." },
  { id: "NX-FR-004", name: "Chicharra (ajustador) automático", cat: "frenos", vehicle: "ambos", brand: "Haldex compatible", price: 42990, stock: 30,
    desc: "Ajustador automático de freno para leva estriada de 28 dientes 1-1/2\"." },
  { id: "NX-FR-005", name: "Válvula relé de freno", cat: "frenos", vehicle: "semi", brand: "WABCO compatible", price: 38990, stock: 18,
    desc: "Válvula relé para sistema de freno neumático de semirremolque." },
  { id: "NX-FR-006", name: "Pastillas de freno disco Volvo FH / Scania R", cat: "frenos", vehicle: "tracto", brand: "Knorr compatible", price: 89990, stock: 14,
    desc: "Juego de pastillas para freno de disco delantero, alta resistencia térmica." },

  // Suspensión
  { id: "NX-SU-001", name: "Pulmón de suspensión semirremolque", cat: "suspension", vehicle: "semi", brand: "Firestone compatible", price: 69990, stock: 22, featured: true,
    desc: "Fuelle de aire con pistón para suspensión neumática de semirremolque." },
  { id: "NX-SU-002", name: "Pulmón de suspensión cabina tracto", cat: "suspension", vehicle: "tracto", brand: "Contitech compatible", price: 59990, stock: 16,
    desc: "Cojín de aire para suspensión de cabina. Compatible Volvo FH/FM." },
  { id: "NX-SU-003", name: "Amortiguador eje trasero", cat: "suspension", vehicle: "ambos", brand: "Monroe compatible", price: 46990, stock: 28,
    desc: "Amortiguador hidráulico de alto rendimiento para uso pesado." },
  { id: "NX-SU-004", name: "Válvula niveladora de altura", cat: "suspension", vehicle: "ambos", brand: "Haldex compatible", price: 52990, stock: 10,
    desc: "Válvula de nivelación para suspensión neumática con varilla incluida." },
  { id: "NX-SU-005", name: "Kit bujes brazo de torque", cat: "suspension", vehicle: "semi", brand: "Genérico premium", price: 24990, stock: 35,
    desc: "Juego de bujes de goma/metal para brazo de torque de suspensión." },

  // Motor
  { id: "NX-MO-001", name: "Bomba de agua Volvo D13", cat: "motor", vehicle: "tracto", brand: "Volvo compatible", price: 189990, stock: 6, featured: true,
    desc: "Bomba de agua con empaquetadura para motor Volvo D13." },
  { id: "NX-MO-002", name: "Correa poly-V alternador", cat: "motor", vehicle: "tracto", brand: "Gates compatible", price: 32990, stock: 40,
    desc: "Correa multicanal de accesorios. Consultar largo según motor." },
  { id: "NX-MO-003", name: "Turbo cargador Scania DC13", cat: "motor", vehicle: "tracto", brand: "Holset compatible", price: 1249990, stock: 2,
    desc: "Turbocompresor remanufacturado con garantía para motor Scania DC13." },
  { id: "NX-MO-004", name: "Termostato Mercedes-Benz OM457", cat: "motor", vehicle: "tracto", brand: "Behr compatible", price: 39990, stock: 15,
    desc: "Termostato con sello para motor Mercedes-Benz OM457 (Actros/Axor)." },

  // Filtros
  { id: "NX-FI-001", name: "Filtro de aceite Volvo FH", cat: "filtros", vehicle: "tracto", brand: "Mann compatible", price: 18990, stock: 80, featured: true,
    desc: "Filtro de aceite de flujo total para motores Volvo D12/D13." },
  { id: "NX-FI-002", name: "Filtro de aire primario Scania", cat: "filtros", vehicle: "tracto", brand: "Donaldson compatible", price: 64990, stock: 24,
    desc: "Elemento filtrante de aire primario para Scania serie R/G/P." },
  { id: "NX-FI-003", name: "Filtro de combustible separador de agua", cat: "filtros", vehicle: "tracto", brand: "Fleetguard compatible", price: 26990, stock: 50,
    desc: "Filtro separador de agua para sistema de combustible diésel." },
  { id: "NX-FI-004", name: "Cartucho secador de aire", cat: "filtros", vehicle: "tracto", brand: "WABCO compatible", price: 44990, stock: 20,
    desc: "Filtro secador de aire para sistema neumático de frenos." },

  // Transmisión
  { id: "NX-TR-001", name: "Kit de embrague 430 mm", cat: "transmision", vehicle: "tracto", brand: "Sachs compatible", price: 699990, stock: 4, featured: true,
    desc: "Kit de embrague completo (disco, prensa y rodamiento) de 430 mm." },
  { id: "NX-TR-002", name: "Cruceta cardán serie 1810", cat: "transmision", vehicle: "tracto", brand: "Spicer compatible", price: 54990, stock: 18,
    desc: "Cruceta para eje cardán serie 1810 con graseras." },
  { id: "NX-TR-003", name: "Soporte central de cardán", cat: "transmision", vehicle: "tracto", brand: "Genérico premium", price: 72990, stock: 9,
    desc: "Soporte central con rodamiento para eje cardán." },

  // Eléctrico
  { id: "NX-EL-001", name: "Foco trasero LED 24V 3 funciones", cat: "electrico", vehicle: "ambos", brand: "LED Pro", price: 29990, stock: 60, featured: true,
    desc: "Farol trasero LED: posición, freno y viraje. Sellado IP67." },
  { id: "NX-EL-002", name: "Plafón lateral LED ámbar 24V", cat: "electrico", vehicle: "semi", brand: "LED Pro", price: 5990, stock: 200,
    desc: "Luz de gálibo lateral LED ámbar para semirremolque." },
  { id: "NX-EL-003", name: "Espiral eléctrico 7 polos", cat: "electrico", vehicle: "ambos", brand: "Genérico premium", price: 34990, stock: 30,
    desc: "Cable espiral de 7 polos con enchufes metálicos, 4,5 m." },
  { id: "NX-EL-004", name: "Alternador 28V 80A", cat: "electrico", vehicle: "tracto", brand: "Bosch compatible", price: 349990, stock: 5,
    desc: "Alternador para sistema eléctrico 24V. Consultar compatibilidad." },

  // Acople
  { id: "NX-AC-001", name: "Quinta rueda 2\" completa", cat: "acople", vehicle: "tracto", brand: "Jost compatible", price: 1189990, stock: 3, featured: true,
    desc: "Quinta rueda para kingpin de 2\", con placa de montaje." },
  { id: "NX-AC-002", name: "Kit reparación quinta rueda", cat: "acople", vehicle: "tracto", brand: "Jost compatible", price: 149990, stock: 10,
    desc: "Kit de reparación de mandíbula y mecanismo de cierre." },
  { id: "NX-AC-003", name: "Kingpin (perno rey) 2\"", cat: "acople", vehicle: "semi", brand: "Genérico premium", price: 119990, stock: 8,
    desc: "Perno rey de 2\" para placa de semirremolque, acero forjado." },
  { id: "NX-AC-004", name: "Manitos de aire (par) rojo/azul", cat: "acople", vehicle: "ambos", brand: "Genérico premium", price: 15990, stock: 70,
    desc: "Par de acoples de manguera de aire (gladhands) con sellos." },

  // Semirremolque
  { id: "NX-SE-001", name: "Pata de apoyo (par) 24 t", cat: "semirremolque", vehicle: "semi", brand: "SAF-Holland compatible", price: 529990, stock: 4, featured: true,
    desc: "Juego de patas de apoyo de dos velocidades, capacidad 24 toneladas." },
  { id: "NX-SE-002", name: "Maza de rueda eje semirremolque", cat: "semirremolque", vehicle: "semi", brand: "BPW compatible", price: 159990, stock: 8,
    desc: "Maza completa con rodamientos para eje de semirremolque 10 pernos." },
  { id: "NX-SE-003", name: "Kit rodamientos de rueda", cat: "semirremolque", vehicle: "ambos", brand: "Timken compatible", price: 49990, stock: 26,
    desc: "Rodamientos interior y exterior con retén para maza de eje." },
  { id: "NX-SE-004", name: "Eje completo 13 t con frenos", cat: "semirremolque", vehicle: "semi", brand: "Randon compatible", price: 1899990, stock: 2,
    desc: "Eje de semirremolque de 13 toneladas con frenos de tambor y mazas." },
];
