/* =====================================================
   💰 DOLAR TICKER COMPONENT

   - Scroll infinito con duplicado de nodos
   - Tarjetas con tamaño uniforme (width/height fijo)
   - Sparkline persistente con localStorage
   - Colores dinámicos (up/down)
   - Hover pausa animación

   Requiere:
   - dolarService.js (data + cache)
   - dolarUI.js (render)
   - sparkline.js (gráfico)

   Notas:
   - NO usar innerHTML += (rompe canvas/eventos)
   - El duplicado es necesario para scroll infinito
   - localStorage mantiene historial y fallback

===================================================== */
function getTrend(current, previous) {
  if (!previous) return "neutral";
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "neutral";
}

function timeAgo(timestamp) {
  const diff = Math.floor((Date.now() - timestamp) / 60000);
  return `Hace ${diff} min`;
}
// ==============================
// DOLAR UI (render)
// ==============================

function renderDolares(data) {
  const container = document.getElementById("dolar-container");
  const lastUpdate = document.getElementById("last-update");

  if (!container) return;

  container.innerHTML = "";

  // ============================
  // 1. CREAR ITEMS (UNA SOLA VEZ)
  // ============================
  const items = data.map(d => createDolarItem(d));

  // ============================
  // 2. RENDER ORIGINAL
  // ============================
  items.forEach(el => container.appendChild(el));

  // ============================
  // 3. DUPLICADO PARA LOOP INFINITO
  // ⚠️ IMPORTANTE: NO usar cloneNode
  // porque canvas pierde estado
  // ============================
  data.forEach(d => {
    const clone = createDolarItem(d); // recrear, no clonar
    container.appendChild(clone);
  });

  // ============================
  // 4. TIMESTAMP FORMATEADO
  // ============================
  if (lastUpdate) {
    const now = new Date();

    const formatted = now.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit"
    });

    lastUpdate.textContent = `ACTUALIZADO ${formatted}`;
  }
}
// ==============================
// ERROR UI
// ==============================

function renderError() {
    const container = document.getElementById("dolar-container");
    if (!container) return;

    container.innerHTML = `<div class="error">Error cargando datos</div>`;
}
// ==============================
// CREATE DOLAR ITEM 
// ==============================
function createDolarItem(dolar) {
  const el = document.createElement("div");
  el.classList.add("dolar-item");

  el.innerHTML = `
    <span>${dolar.nombre}</span>
    <span>$${dolar.venta}</span>
    <canvas class="sparkline" width="120" height="30"></canvas>
  `;

  // 🔥 ahora sí existe
  const canvas = el.querySelector("canvas");

  if (canvas) {
    drawSparkline(canvas, dolar.casa, dolar.venta);
  }

  // tendencia
  if (dolar.variacion > 0) el.classList.add("up");
  else if (dolar.variacion < 0) el.classList.add("down");

  return el;
}