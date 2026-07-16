// ===== TapCard Landing =====
const WHATSAPP_NUMBER = "573156349313";
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// Countdown 48h persistent
const CD_KEY = "tapcard_cd_target";
let target = localStorage.getItem(CD_KEY);
if (!target) {
  target = Date.now() + 48 * 3600 * 1000;
  localStorage.setItem(CD_KEY, target);
} else {
  target = parseInt(target, 10);
}

const getDiff = () => Math.max(0, target - Date.now());
const pad = (n) => n.toString().padStart(2, "0");

function tick() {
  const diff = getDiff();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = pad(v); };
  set("cd-h", h); set("cd-m", m); set("cd-s", s);
  set("cd-h2", h); set("cd-m2", m); set("cd-s2", s);
}
tick();
setInterval(tick, 1000);

// Attach WhatsApp links to all CTAs with data-msg dynamically
document.querySelectorAll(".wa-cta").forEach((el) => {
  const baseMsg = el.dataset.msg || "Hola 👋, quiero información sobre las Tarjetas Digitales.";
  el.setAttribute("href", "#"); // Provide a fallback
  
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const isPromoActive = getDiff() > 0;
    const statusText = isPromoActive ? "\n\n*(Estado: Descuento Activo 🎁)*" : "\n\n*(Estado: Descuento Inactivo ⏳)*";
    const finalMsg = baseMsg + statusText;
    window.open(waLink(finalMsg), "_blank", "noopener");
  });
});

// QR pointing to WhatsApp demo message
const qr = document.getElementById("qr-img");
if (qr) {
  const url = waLink("Hola 👋, acabo de ver la DEMO de la Tarjeta Digital y me interesa. ¿Me cuentas los planes?");
  qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=${encodeURIComponent(url)}`;
}

// Year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
    }
  });
});