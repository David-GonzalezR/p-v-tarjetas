// Lógica de personalización por nicho de mercado
(function() {
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Obtener el parámetro ?nicho= de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const nichoKey = urlParams.get("nicho") ? urlParams.get("nicho").toLowerCase().trim() : null;

    // Verificar si el nicho existe en los datos locales
    if (nichoKey && typeof NICHOS_DATA !== "undefined" && NICHOS_DATA[nichoKey]) {
      const nicho = NICHOS_DATA[nichoKey];
      console.log(`[miTapCard Niche] Aplicando personalización para: ${nicho.nombre}`);

      // 2. Reemplazar titular H1 en el Hero
      const titularNicho = document.getElementById("titular-nicho");
      if (titularNicho && nicho.titular_variable) {
        titularNicho.textContent = nicho.titular_variable;
      }

      // 3. Reemplazar ejemplo de persona en el mockup del celular
      const mockupText = document.getElementById("mockup-persona-text");
      if (mockupText && nicho.mockup_persona) {
        mockupText.textContent = nicho.mockup_persona;
      }

      // 4. Reemplazar los 3 dolores en la sección "El Problema"
      if (nicho.dolores && nicho.dolores.length >= 3) {
        for (let i = 0; i < 3; i++) {
          const dolorEl = document.getElementById(`dolor-titulo-${i + 1}`);
          if (dolorEl) {
            dolorEl.textContent = nicho.dolores[i];
          }
        }
      }

      // 5. Reemplazar la demo interactiva principal y el QR
      const qrImg = document.getElementById("qr-img");
      if (nicho.demo_url) {
        // Actualizar el data-url para que script.js regenere el QR correcto
        if (qrImg) {
          qrImg.setAttribute("data-url", nicho.demo_url);
        }
        
        // Personalizar la primera demo en la galería interactiva
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
        // Si va vacío, usar la demo genérica actual en el QR
        if (qrImg) {
          qrImg.setAttribute("data-url", "https://burgerstreet.vercel.app/");
        }
      }

      // 6. Reemplazar la frase insertada en los 7 mensajes de WhatsApp
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

      // 7. Modificar el título SEO y la meta descripción si aplica
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
    } else {
      console.log("[miTapCard Niche] Ejecutando con valores genéricos por defecto.");
      // Asegurarse de que el badge del mockup muestre el valor por defecto
      const mockupText = document.getElementById("mockup-persona-text");
      if (mockupText) {
        mockupText.textContent = "Carlos Mendoza, Asesor de Seguros";
      }
      const qrImg = document.getElementById("qr-img");
      if (qrImg && !qrImg.getAttribute("data-url")) {
        qrImg.setAttribute("data-url", "https://burgerstreet.vercel.app/");
      }
    }
  });
})();
