let marqueeRunning = false;

function initMarquee() {
  if (marqueeRunning) return;
  marqueeRunning = true;

  const container = document.getElementById("dolar-container");
  if (!container) return;

  let speed = 0.5;
  let isPaused = false;
  let offset = 0;

  container.addEventListener("mouseenter", () => isPaused = true);
  container.addEventListener("mouseleave", () => isPaused = false);

  function animate() {
    if (!isPaused) {
      offset -= speed;

      container.style.transform = `translateX(${offset}px)`;

      const first = container.firstElementChild;
      if (!first) return;

      const firstWidth = first.offsetWidth + 48; // gap aprox

      if (Math.abs(offset) >= firstWidth) {
        container.appendChild(first);
        offset += firstWidth; // 🔥 reajuste sin salto
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}