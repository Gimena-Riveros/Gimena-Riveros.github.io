function drawSparkline(canvas, key, value) {
  const ctx = canvas.getContext("2d");

  const STORAGE_KEY = "spark_" + key;

  // obtener historial
  let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  // agregar nuevo valor
  history.push(value);

  // limitar tamaño
  if (history.length > 20) history.shift();

  // guardar
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));

  // limpiar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (history.length < 2) return;

  const max = Math.max(...history);
  const min = Math.min(...history);
  const range = max - min || 1;

  ctx.beginPath();

  history.forEach((v, i) => {
    const x = (i / (history.length - 1)) * canvas.width;
    const y = canvas.height - ((v - min) / range) * canvas.height;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.lineWidth = 2;
  // detectar tendencia
  // const first = history[0];
  const first = history[Math.max(0, history.length - 5)];
  const last = history[history.length - 1];

  let color = "#94a3b8"; // neutro (gris)

  if (last > first) {
    color = "#00e676"; // verde (bullish)
  } else if (last < first) {
    color = "#ff5252"; // rojo (bearish)
  }
  // glow suave
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;

  ctx.strokeStyle = color;
  ctx.stroke();
}