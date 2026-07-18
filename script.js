// ===== TapCard Landing =====
const WHATSAPP_NUMBER = "573150453133";
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// Attach WhatsApp links to all CTAs with data-msg dynamically
document.querySelectorAll(".wa-cta").forEach((el) => {
  const baseMsg = el.dataset.msg || "Hola 👋, quiero información sobre los Centros Digitales.";
  el.setAttribute("href", "#"); // Provide a fallback
  
  el.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(waLink(baseMsg), "_blank", "noopener");
  });
});

// QR pointing directly to a live demo
const qr = document.getElementById("qr-img");
if (qr) {
  const url = "https://burgerstreet.vercel.app/";
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