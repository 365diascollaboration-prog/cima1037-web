/* ═══════════════════════════════════════════════════════════
   CIMA 103.7 · DATOS REALES — fuente de verdad de la web
   Fuente: data/datos-reales.md (verificado con fuentes públicas)
   REGLA: solo entra aquí lo confirmado. Nada inventado.
   ═══════════════════════════════════════════════════════════ */
const CIMA = {
  marca: {
    nombre: "Cima 103.7 FM",
    identidad: "La Mundial Cadena Cima",
    slogan: "Rompiendo la radio"
  },

  generos: ["Merengue", "Bachata", "Salsa", "Urbano", "Música del ayer"],

  contacto: {
    tel: "+1-787-787-1600",
    whatsapp: "17877871600",
    email: "cima103.7fm@gmail.com",
    estudio: "Calle Jade NZ8, Santa Juanita, Bayamón, PR"
  },

  social: { facebook: 28000, instagram: 1691 },

  frecuencias: [
    { f: "103.7", banda: "FM", ciudad: "San Juan", flagship: true },
    { f: "96.1",  banda: "FM", ciudad: "Bayamón" },
    { f: "101.3", banda: "FM", ciudad: "Vega Alta" },
    { f: "1600",  banda: "AM", ciudad: "WCMA · Bayamón" },
    { f: "97.9",  banda: "FM", ciudad: "Arecibo" },
    { f: "99.1",  banda: "FM", ciudad: "Aguadilla" },
    { f: "960",   banda: "AM", ciudad: "Quebradillas" },
    { f: "1250",  banda: "AM", ciudad: "Sabana" }
  ],

  shows: [
    {
      nombre: "Conexión Semanal",
      horario: "Sáb 9 a 11 AM",
      dias: [6],
      conductora: "Alexandra Pérez",
      cast: [
        "Elvin Santana",
        "Jimmy Zorrilla",
        "Carlos «Dichoso» Hernández",
        "Dr. Mario Paulino",
        "Manny Cueto",
        "Claudio Pérez"
      ],
      descripcion: "La revista de la comunidad dominicana en Puerto Rico: actualidad, deportes, salud y la conexión RD↔PR.",
      confirmado: true
    }
    // La parrilla de lunes a viernes se añade SOLO cuando La Mundial la confirma (redes o cliente).
  ],

  transmisionContinua: {
    nombre: "La Mundial 24/7",
    descripcion: "Variedad tropical sin parar: merengue, bachata, salsa, urbano y la música del ayer.",
    fuente: "Página oficial: 'Siempre abierto' · IG: 'la mayor variedad musical en Puerto Rico'"
  }
};