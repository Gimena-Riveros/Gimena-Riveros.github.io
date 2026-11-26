document.addEventListener("DOMContentLoaded", () => {
  // 1. Lista de días festivos (Formato: "MM-DD")
  const diasFestivos = {
    "01-01": {
      titulo: "Happy New Year! 🎇🕛",
      mensaje: "¡Feliz Año Nuevo!\nTe deseamos un excelente inicio de año."
    },
    "02-14": {
      titulo: "Valentine's Day! 😍🍫",
      mensaje: "Hoy celebramos el amor."
    },
    "03-08": {
      titulo: "International Women's Day! 💪💜",
      mensaje: "Hoy celebramos el Día Internacional de la Mujer."
    },
    "03-14": {
      titulo: "International Day of Mathematics! 🥧♾️",
      mensaje: "Hoy celebramos el PI de todos los sabores."
    },
    "03-28": {
      titulo: "Easter Sunday! 🕊️🐰",
      mensaje: "Hoy celebramos Pascuas."
    },
    "05-25": {
      titulo: "¡Feliz Día de la Patria!",
      mensaje: "Hoy celebramos nuestra historia."
    },
    "07-09": {
      titulo: "¡Feliz Día de la Independencia!",
      mensaje: "Nuestras oficinas permanecerán cerradas hoy."
    },
    "11-19": {
      titulo: "International Men's Day! 💪💙",
      mensaje: "Hoy celebramos el Día Internacional del Varón.\nNuestras oficinas permanecerán cerradas hoy."
    },
    "11-26": {
      titulo: "Thanksgiving Day! 🦃",
      mensaje: "Feliz Día de Acción de Gracias!\nNuestras oficinas permanecerán cerradas hoy."
    },
    "12-25": {
      titulo: "¡Merry Christmas! 🎄✨",
      mensaje: "Que pases unas excelentes fiestas junto a tus seres queridos."
    },
    "12-31": {
      titulo: "New Year's Eve! 🎆🍾",
      mensaje: "Hoy celebramos la noche vieja que se va!\nNuestras oficinas permanecerán cerradas hoy."
    }
  };

  // 2. Obtener la fecha de hoy en formato "MM-DD"
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const dia = String(hoy.getDate()).padStart(2, '0');
  const fechaActual = `${mes}-${dia}`;

  // 3. Verificar si hoy es festivo
  const festivoHoy = diasFestivos[fechaActual];

  if (festivoHoy) {
    // Creamos una clave única para guardar en el navegador (ej: "popup_visto_12-25")
    const claveStorage = `popup_visto_${fechaActual}`;

    // 4. Comprobar si ya se mostró antes
    // Usa 'sessionStorage' si quieres que salga 1 vez por pestaña abierta.
    // Usa 'localStorage' si quieres que salga 1 sola vez en todo el día (aunque cierre el navegador).
    if (!sessionStorage.getItem(claveStorage)) {
    //if (true) {
      
      // Rellenar el contenido del pop-up
      document.getElementById("modal-titulo").textContent = festivoHoy.titulo;
      document.getElementById("modal-mensaje").textContent = festivoHoy.mensaje;

      // Mostrar el pop-up
      const modal = document.getElementById("festivo-modal");
      modal.classList.remove("modal-oculto");
      modal.classList.add("modal-visible");

      // Guardar en memoria que ya se mostró
      localStorage.setItem(claveStorage, "true");
    }
  }

  // 5. Lógica para cerrar el pop-up
  const modal = document.getElementById("festivo-modal");
  const btnCerrar = document.getElementById("cerrar-modal");

  btnCerrar.addEventListener("click", () => {
    modal.classList.remove("modal-visible");
    modal.classList.add("modal-oculto");
  });

  // Cerrar también si hacen clic fuera de la caja blanca
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("modal-visible");
      modal.classList.add("modal-oculto");
    }
  });
});
