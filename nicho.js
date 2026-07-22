/**
 * ============================================================================
 * MÓDULO DE PERSONALIZACIÓN E INTELIGENCIA (nicho.js)
 * ============================================================================
 * Módulo encargado de:
 * 1. Lectura y procesamiento de parámetros URL (?nicho=, ?origen=, ?asesor=).
 * 2. Asignación de valores por defecto (asesor: "0000", origen: "directo", nicho: "general").
 * 3. Creación y almacenamiento del objeto 'sessionData' en sessionStorage.
 * 4. Configuración de Nichos y Orígenes (ampliable y extensible fácilmente).
 * 5. Actualización dinámica de la Interfaz (Hero, Dolores, Mockup, WhatsApp CTAs, SEO).
 * 6. Garantía de compatibilidad total cuando se accede sin parámetros.
 * ============================================================================
 */

(function () {
  "use strict";

  // ==========================================================================
  // 1. VALORES POR DEFECTO
  // ==========================================================================
  const DEFAULT_SESSION_DATA = {
    asesor: "0000",
    origen: "directo",
    nicho: "general"
  };

  // ==========================================================================
  // 2. CONFIGURACIÓN DE ORIGENES
  // ==========================================================================
  /**
   * Configuración de textos para el Hero según el parámetro 'origen'.
   * Se pueden agregar fácilmente nuevos orígenes agregando una clave aquí.
   * Soporta plantillas dinámicas usando {nicho_palabra} para combinar con 'nicho'.
   */
  const ORIGENES_DATA = {
    "maps": {
      "titulo_template": "Estuve revisando tu {nicho_palabra} y encontré una forma sencilla de facilitar que tus clientes encuentren toda su información desde un solo lugar.",
      "subtitulo": "Convierte cada presentación en una oportunidad de negocio. La herramienta inteligente que centraliza tu WhatsApp, redes, catálogo y agenda, para que tus clientes puedan contactarte y comprarte desde cualquier lugar."
    },
    "estado": {
      "titulo_template": "Gracias por responder a mi estado. Como te prometí, aquí encontrarás una forma sencilla de organizar toda la información de tu {nicho_palabra}.",
      "subtitulo": "Convierte cada presentación en una oportunidad de negocio. La herramienta inteligente que centraliza tu WhatsApp, redes, catálogo y agenda, para que tus clientes puedan contactarte y comprarte desde cualquier lugar."
    },
    "instagram": {
      "titulo_template": "Gracias por visitar nuestro perfil. Aquí descubrirás cómo un Centro Digital puede ayudarte a presentar tu {nicho_palabra} de una forma mucho más profesional.",
      "subtitulo": "Convierte cada presentación en una oportunidad de negocio. La herramienta inteligente que centraliza tu WhatsApp, redes, catálogo y agenda, para que tus clientes puedan contactarte y comprarte desde cualquier lugar."
    }
  };

  // ==========================================================================
  // 3. LECTURA DE PARÁMETROS DE LA URL
  // ==========================================================================
  /**
   * Lee los parámetros de la URL de forma segura y libre de errores.
   * @returns {Object} Parámetros sanitizados.
   */
  function parseUrlParameters() {
    const params = {
      nicho: null,
      origen: null,
      asesor: null
    };

    try {
      const urlParams = new URLSearchParams(window.location.search);
      
      const rawNicho = urlParams.get("nicho");
      if (rawNicho && rawNicho.trim() !== "") {
        params.nicho = rawNicho.toLowerCase().trim();
      }

      const rawOrigen = urlParams.get("origen");
      if (rawOrigen && rawOrigen.trim() !== "") {
        params.origen = rawOrigen.toLowerCase().trim();
      }

      const rawAsesor = urlParams.get("asesor");
      if (rawAsesor && rawAsesor.trim() !== "") {
        params.asesor = rawAsesor.trim();
      }
    } catch (error) {
      console.warn("[miTapCard Personalización] Error leyendo parámetros URL:", error);
    }

    return params;
  }

  // ==========================================================================
  // 4. CREACIÓN Y ALMACENAMIENTO DEL OBJETO DE SESIÓN (sessionData)
  // ==========================================================================
  /**
   * Crea el objeto sessionData combinando defaults con parámetros recibidos
   * y lo almacena exclusivamente en sessionStorage.
   * @param {Object} parsedParams 
   * @returns {Object} sessionData final
   */
  function createAndSaveSessionData(parsedParams) {
    const sessionData = {
      asesor: parsedParams.asesor || DEFAULT_SESSION_DATA.asesor,
      origen: parsedParams.origen || DEFAULT_SESSION_DATA.origen,
      nicho: parsedParams.nicho || DEFAULT_SESSION_DATA.nicho
    };

    try {
      sessionStorage.setItem("sessionData", JSON.stringify(sessionData));
    } catch (e) {
      console.warn("[miTapCard Personalización] No se pudo guardar en sessionStorage:", e);
    }

    // Exponer globalmente en window para fácil acceso técnico
    window.sessionData = sessionData;

    return sessionData;
  }

  // ==========================================================================
  // 5. ACTUALIZACIÓN DE LA INTERFAZ DE USUARIO (UI)
  // ==========================================================================
  
  /**
   * Aplica la personalización de Nicho si existe en NICHOS_DATA.
   * Manteniendo toda la personalización preexistente intacta.
   * @param {string} nichoKey 
   */
  function applyNichoCustomization(nichoKey) {
    if (!nichoKey || typeof NICHOS_DATA === "undefined" || !NICHOS_DATA[nichoKey]) {
      // Fallback genérico para nicho no encontrado o no especificado
      const mockupText = document.getElementById("mockup-persona-text");
      if (mockupText) {
        mockupText.textContent = "Carlos Mendoza, Asesor de Seguros";
      }
      const qrImg = document.getElementById("qr-img");
      if (qrImg && !qrImg.getAttribute("data-url")) {
        qrImg.setAttribute("data-url", "https://burgerstreet.vercel.app/");
      }
      return;
    }

    const nicho = NICHOS_DATA[nichoKey];
    console.log(`[miTapCard Personalización] Nicho aplicado: ${nicho.nombre}`);

    // Reemplazar titular H1 cuando el origen no lo sobrescriba
    const titularNicho = document.getElementById("titular-nicho");
    if (titularNicho && nicho.titular_variable) {
      titularNicho.textContent = nicho.titular_variable;
    }

    // Reemplazar ejemplo de persona en el mockup
    const mockupText = document.getElementById("mockup-persona-text");
    if (mockupText && nicho.mockup_persona) {
      mockupText.textContent = nicho.mockup_persona;
    }

    // Reemplazar dolores en "El Problema"
    if (nicho.dolores && nicho.dolores.length >= 3) {
      for (let i = 0; i < 3; i++) {
        const dolorEl = document.getElementById(`dolor-titulo-${i + 1}`);
        if (dolorEl) {
          dolorEl.textContent = nicho.dolores[i];
        }
      }
    }

    // Reemplazar la demo interactiva principal y QR
    const qrImg = document.getElementById("qr-img");
    if (nicho.demo_url) {
      if (qrImg) qrImg.setAttribute("data-url", nicho.demo_url);
      
      const demoLink1 = document.getElementById("demo-link-1");
      const demoTitle1 = document.getElementById("demo-title-1");
      const demoDesc1 = document.getElementById("demo-desc-1");
      const demoIcon1 = document.getElementById("demo-icon-1");
      
      if (demoLink1) {
        demoLink1.href = nicho.demo_url;
        if (demoTitle1) demoTitle1.textContent = `Demo para ${nicho.nombre}`;
        if (demoDesc1) demoDesc1.textContent = `Ejemplo interactivo en vivo`;
        if (demoIcon1) demoIcon1.textContent = nicho.emoji || "📱";
      }
    } else {
      if (qrImg) qrImg.setAttribute("data-url", "https://burgerstreet.vercel.app/");
    }

    // Reemplazar frases en CTAs de WhatsApp
    const waFrase = nicho.whatsapp_frase;
    if (waFrase) {
      document.querySelectorAll(".wa-cta").forEach((el) => {
        let msg = el.getAttribute("data-msg");
        if (msg) {
          msg = msg.replace(/mi Centro Digital de Negocios/g, `el Centro Digital para ${waFrase}`);
          msg = msg.replace(/mi Centro Digital/g, `el Centro Digital para ${waFrase}`);
          msg = msg.replace(/mi propio Centro Digital de Negocios/g, `el Centro Digital para ${waFrase}`);
          msg = msg.replace(/en el Centro Digital Impulso/g, `en el Centro Digital Impulso para ${waFrase}`);
          msg = msg.replace(/en el Centro Digital Crecimiento/g, `en el Centro Digital Crecimiento para ${waFrase}`);
          msg = msg.replace(/en el Centro Digital Empresarial/g, `en el Centro Digital Empresarial para ${waFrase}`);
          msg = msg.replace(/en el Centro Digital Elite/g, `en el Centro Digital Elite para ${waFrase}`);
          msg = msg.replace(/en la web del Centro Digital/g, `en la web del Centro Digital para ${waFrase}`);
          el.setAttribute("data-msg", msg);
        }
      });
    }

    // Modificar SEO (Title y Meta description)
    if (nicho.seo_titulo) {
      document.title = nicho.seo_titulo;
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", nicho.seo_titulo);
    }
    if (nicho.seo_descripcion) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", nicho.seo_descripcion);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", nicho.seo_descripcion);
    }
  }

  /**
   * Aplica la personalización del Hero según el parámetro 'origen' y combina con 'nicho'.
   * @param {string} origenKey 
   * @param {string} nichoKey 
   */
  function applyOrigenCustomization(origenKey, nichoKey) {
    if (!origenKey || !ORIGENES_DATA[origenKey]) {
      // Si origen no existe o no es reconocido, se mantiene el Hero original
      return;
    }

    const origenConfig = ORIGENES_DATA[origenKey];
    console.log(`[miTapCard Personalización] Origen aplicado: ${origenKey}`);

    // Determinar la palabra sustituta del nicho para combinar en el título del Hero
    let nichoPalabra = "negocio";
    if (nichoKey) {
      if (typeof NICHOS_DATA !== "undefined" && NICHOS_DATA[nichoKey]) {
        nichoPalabra = NICHOS_DATA[nichoKey].titular_variable || NICHOS_DATA[nichoKey].nombre.toLowerCase();
      } else {
        nichoPalabra = nichoKey;
      }
    }

    // Construir título personalizado combinando Origen + Nicho
    const tituloPersonalizado = origenConfig.titulo_template.replace("{nicho_palabra}", nichoPalabra);

    // Actualizar el H1 del Hero
    const heroTitle = document.getElementById("hero-title");
    if (heroTitle) {
      heroTitle.textContent = tituloPersonalizado;
    }

    // Actualizar el subtítulo si está definido en la configuración del origen
    if (origenConfig.subtitulo) {
      const heroLead = document.getElementById("hero-lead");
      if (heroLead) {
        heroLead.textContent = origenConfig.subtitulo;
      }
    }
  }

  // ==========================================================================
  // 6. INICIALIZACIÓN PRINCIPAL
  // ==========================================================================
  function init() {
    try {
      // 1. Parsear parámetros
      const params = parseUrlParameters();

      // 2. Crear y guardar sessionData
      const sessionData = createAndSaveSessionData(params);

      // 3. Aplicar personalización de Nicho (si aplica)
      if (params.nicho) {
        applyNichoCustomization(params.nicho);
      } else {
        applyNichoCustomization(null);
      }

      // 4. Aplicar personalización de Origen (Hero) (si aplica)
      if (params.origen) {
        applyOrigenCustomization(params.origen, params.nicho);
      }

      // El parámetro 'asesor' ya queda almacenado en sessionData para estadísticas / CRM futuros.

    } catch (e) {
      console.error("[miTapCard Personalización] Error durante la inicialización:", e);
    }
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
