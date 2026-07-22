// ===== TapCard Landing =====
const WHATSAPP_NUMBER = "573150453133";
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

document.addEventListener("DOMContentLoaded", () => {
  // Attach WhatsApp links to all CTAs with data-msg dynamically
  document.querySelectorAll(".wa-cta").forEach((el) => {
    el.setAttribute("href", "#"); // Provide a fallback
    
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const currentMsg = el.getAttribute("data-msg") || el.dataset.msg || "Hola 👋, quiero información sobre los Centros Digitales.";
      window.open(waLink(currentMsg), "_blank", "noopener");
    });
  });

  // QR pointing directly to a live demo
  const qr = document.getElementById("qr-img");
  if (qr) {
    // Read dynamic URL updated by nicho.js or fallback to default
    const url = qr.getAttribute("data-url") || qr.dataset.url || "https://burgerstreet.vercel.app/";
    // TODO: mover a subdominio propio
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

  // Video Modal Lightbox
  const videoCard = document.getElementById("video-demo-card");
  const videoModal = document.getElementById("video-modal");
  const closeVideoModal = document.getElementById("close-video-modal");
  const modalVideoPlayer = document.getElementById("modal-video-player");

  if (videoCard && videoModal && closeVideoModal && modalVideoPlayer) {
    videoCard.addEventListener("click", () => {
      videoModal.style.display = "flex";
      modalVideoPlayer.play();
    });

    const closeModal = () => {
      modalVideoPlayer.pause();
      modalVideoPlayer.currentTime = 0;
      videoModal.style.display = "none";
    };

    closeVideoModal.addEventListener("click", closeModal);

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && videoModal.style.display === "flex") {
        closeModal();
      }
    });
  }
});