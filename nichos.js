// Base de datos de personalización por nichos
const NICHOS_DATA = {
  "veterinarias": {
    "nombre": "Veterinarias",
    "emoji": "🐾",
    "titular_variable": "consultorio veterinario",
    "mockup_persona": "Dra. Ana Torres, Veterinaria",
    "dolores": [
      "\"Los dueños de mascotas se pierden buscando la dirección y llegan tarde a las consultas de urgencia.\"",
      "\"Pasas horas respondiendo las mismas preguntas por WhatsApp sobre horarios en lugar de atender pacientes.\"",
      "\"Pierdes citas de control porque tus clientes no tienen un sistema fácil para agendar online al instante.\""
    ],
    "demo_url": "", // Fallback a la demo por defecto
    "whatsapp_frase": "mi consultorio veterinario",
    "seo_titulo": "Centro Digital de Negocios para Veterinarias | miTapCard",
    "seo_descripcion": "Digitaliza tu clínica o consultorio veterinario. Centraliza tu agenda, ubicación y catálogo de servicios en una sola app de presentación."
  },
  "abogados": {
    "nombre": "Abogados",
    "emoji": "⚖️",
    "titular_variable": "despacho de abogados",
    "mockup_persona": "Dr. Juan Martínez, Abogado Civil",
    "dolores": [
      "\"Los clientes potenciales dudan de tu experiencia al no encontrar tu trayectoria y especialidades profesionales organizadas.\"",
      "\"Explicar tu portafolio de servicios legales por chat te quita horas valiosas de análisis para tus casos activos.\"",
      "\"Pierdes clientes potenciales porque no tienes una agenda digital disponible 24/7 para programar la consulta inicial.\""
    ],
    "demo_url": "https://juan-martinez-abogado.vercel.app/",
    "whatsapp_frase": "mi despacho de abogados",
    "seo_titulo": "Centro Digital de Negocios para Abogados y Firmas | miTapCard",
    "seo_descripcion": "Digitaliza tu práctica legal. Comparte tu tarjeta digital vCard, especialidades y agenda de citas online con un solo toque."
  },
  "contadores": {
    "nombre": "Contadores",
    "emoji": "📊",
    "titular_variable": "consultorio contable",
    "mockup_persona": "Dra. Elena Gómez, Contadora Pública",
    "dolores": [
      "\"Tus clientes te envían documentos desordenados a cualquier chat, perdiendo el control de la información tributaria.\"",
      "\"Pasas horas cotizando servicios de asesoría contable o declaración de renta de forma manual por WhatsApp.\"",
      "\"Proyectas una imagen informal al enviar tus datos bancarios y tarifas en mensajes de texto planos y desorganizados.\""
    ],
    "demo_url": "https://juan-martinez-abogado.vercel.app/", // Usa la demo de servicios profesionales
    "whatsapp_frase": "mi consultorio contable",
    "seo_titulo": "Centro Digital de Negocios para Contadores | miTapCard",
    "seo_descripcion": "Presenta tus servicios contables de forma premium. Gestiona clientes, cotizaciones y comparte tu contacto en un instante."
  },
  "restaurantes": {
    "nombre": "Restaurantes",
    "emoji": "🍔",
    "titular_variable": "restaurante",
    "mockup_persona": "Esteban Vargas, Burger Street",
    "dolores": [
      "\"Tus comensales se frustran al descargar PDFs pesados de tu menú que tardan una eternidad en cargar en su celular.\"",
      "\"Pierdes pedidos en horas pico porque el chat de WhatsApp se satura y tardas demasiado en responder con precios.\"",
      "\"Los clientes no encuentran fácilmente tu ubicación GPS en Google Maps ni tus horarios al buscar dónde comer hoy.\""
    ],
    "demo_url": "https://burgerstreet.vercel.app/",
    "whatsapp_frase": "mi restaurante",
    "seo_titulo": "Centro Digital de Negocios para Restaurantes y Cafés | miTapCard",
    "seo_descripcion": "Tu menú interactivo, pedidos por WhatsApp y ubicación en Google Maps en un solo enlace veloz que se instala en el celular."
  },
  "hoteles": {
    "nombre": "Hoteles",
    "emoji": "🏨",
    "titular_variable": "hotel",
    "mockup_persona": "Hotel Mirador, Alojamiento",
    "dolores": [
      "\"Los huéspedes prefieren reservar por Booking u otras plataformas externas que te cobran altas comisiones por noche.\"",
      "\"Pierdes reservas directas porque tu proceso de WhatsApp requiere que confirmes tarifas y disponibilidad a mano.\"",
      "\"Los turistas no encuentran de forma directa tus fotos, servicios, tarifas ni el mapa exacto para llegar a tu hotel.\""
    ],
    "demo_url": "", // Fallback a la demo por defecto
    "whatsapp_frase": "mi hotel",
    "seo_titulo": "Centro Digital de Negocios para Hoteles y Hostales | miTapCard",
    "seo_descripcion": "Incrementa tus reservas directas de hotel sin pagar comisiones. Centraliza ubicación, fotos y contacto de WhatsApp."
  },
  "constructoras": {
    "nombre": "Constructoras",
    "emoji": "🏗️",
    "titular_variable": "constructora",
    "mockup_persona": "Ing. Carlos Ruiz, Constructora Andes",
    "dolores": [
      "\"Los inversionistas no pueden ver tus proyectos terminados ni tus avances de obra de manera organizada en su celular.\"",
      "\"Pierdes leads interesados en cotizar acabados o remodelaciones porque tu portafolio no está disponible al instante.\"",
      "\"Te cuesta transmitir la solidez y seriedad que exige el sector al compartir enlaces rotos o información informal.\""
    ],
    "demo_url": "", // Fallback a la demo por defecto
    "whatsapp_frase": "mi constructora",
    "seo_titulo": "Centro Digital de Negocios para Constructoras y Arquitectura | miTapCard",
    "seo_descripcion": "Digitaliza el portafolio de tu constructora. Presenta proyectos, acabados y canales directos de cotización de forma profesional."
  }
};
