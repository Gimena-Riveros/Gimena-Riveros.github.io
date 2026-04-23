// ==============================
// APP INIT (orquestador)
// ==============================

function initDolar() {
  console.log("Inicializando...");

  getDolarData((data) => {
    renderDolares(data);
  }, renderError);
}

// 🔥 iniciar animación UNA sola vez
document.addEventListener("DOMContentLoaded", () => {
  initDolar();
  initMarquee();

  // 🔄 actualización de datos (NO animación)
  setInterval(initDolar, 7 * 60 * 1000);
});