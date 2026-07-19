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

// ==============================
// THEME    LIGHT   DARK
// ==============================
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", (e) => {

  e.preventDefault();

  const html = document.documentElement;

  const current = html.getAttribute("data-theme");

  html.setAttribute(
    "data-theme",
    current === "dark" ? "light" : "dark"
  );

});


// ==============================
// FOOTER    YEAR   
// ==============================
document.getElementById("year").textContent =
new Date().getFullYear();
