document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtener la fecha de hoy en formato "MM-DD"
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  const fechaActual = `${mes}-${dia}`;

  // 2. Evitar que salga en cada recarga (Comprobar si ya se vio hoy)
  // Usa 'sessionStorage' si quieres que salga 1 vez por pestaña abierta.
  // Usa 'localStorage' si quieres que salga 1 sola vez en todo el día (aunque cierre el navegador).
  const ultimaVisita = localStorage.getItem("popup_visto_fecha");
  if (ultimaVisita === fechaActual) {
    return; // Detiene la ejecución si ya se mostró hoy
  }

  // 3. Lista de días festivos
  const diasFestivos = {
    "01-01": { titulo: "Happy New Year! 🎇🕛", mensaje: "¡Feliz Año Nuevo!\nTe deseamos un excelente inicio de año." },

    "02-14": { titulo: "Valentine's Day! 😍🍫", mensaje: "Hoy celebramos el amor." },

    "03-08": { titulo: "International Women's Day! 💪💜", mensaje: "Hoy celebramos el Día Internacional de la Mujer." },
    "03-14": { titulo: "International Day of Mathematics! 🥧♾️", mensaje: "Hoy celebramos el PI de todos los sabores." },
    "03-28": { titulo: "Easter Sunday! 🕊️🐰", mensaje: "Hoy celebramos Pascuas." },

    "05-25": { titulo: "¡Feliz Día de la Patria!", mensaje: "Hoy celebramos nuestra historia." },

    "07-09": { titulo: "¡Feliz Día de la Independencia!", mensaje: "Nuestras oficinas permanecerán cerradas hoy." },
    "11-19": { titulo: "International Men's Day! 💪💙", mensaje: "Hoy celebramos el Día Internacional del Varón.\nNuestras oficinas permanecerán cerradas hoy." },
    "11-26": { titulo: "¡Thanksgiving Day! 🦃", mensaje: "Feliz Día de Acción de Gracias!\nQue pases unas excelentes fiestas junto a tus seres queridos." },
    "11-27": { titulo: "¡Happy Black Friday deals! 🛍️✨", mensaje: "Que consigas muchas ofertas, rebajas y promociones especiales." },
    
    "12-25": { titulo: "¡Merry Christmas! 🎄✨", mensaje: "Que pases unas excelentes fiestas junto a tus seres queridos." },
    "12-31": { titulo: "New Year's Eve! 🎆🍾", mensaje: "Hoy celebramos la noche vieja que se va!\nNuestras oficinas permanecerán cerradas hoy." }
  };

  // 4. Mensaje por defecto para días SIN festividad
  const mensajeNormal = {
    titulo: "¡ Amor Fati ❤️‍🔥 !",
    mensaje: "Hoy es un excelente día Memento Mori\n⏳💀🌹\nNuestras oficinas están abiertas en horario habitual."
  };

  // 5. Seleccionar qué mostrar (si existe en la lista, usa el festivo; si no, usa el normal)
  const contenidoMostrar = diasFestivos[fechaActual] || mensajeNormal;

  // 6. Inyectar textos y mostrar el modal
  const modal = document.getElementById("modal-festivo");
  const tituloEl = document.getElementById("modal-titulo");
  const mensajeEl = document.getElementById("modal-mensaje");
  const btnCerrar = document.getElementById("cerrar-modal");

  tituloEl.textContent = contenidoMostrar.titulo;
  mensajeEl.textContent = contenidoMostrar.mensaje;
  modal.classList.add("modal-mostrar");

  // 7. Guardar en el navegador que hoy ya se mostró
  localStorage.setItem("popup_visto_fecha", fechaActual);

  // 8. Eventos para cerrar el pop-up (botón X o clic afuera)
  btnCerrar.addEventListener("click", () => {
    modal.classList.remove("modal-mostrar");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("modal-mostrar");
    }
  });
});
