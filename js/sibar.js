// ==============================
// SIDEBAR MODULE
// ==============================
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggleBTNmenu = document.querySelector('.toggle-btn-menu');

  if (!sidebar || !toggleBTNmenu) return; // 🔥 clave

  toggleBTNmenu.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// ==============================
// PASSWORD MODULE
// ==============================
function initPasswordToggle() {
  const passwordInput = document.getElementById('password');
  const toggle = document.getElementById('btnToggleEye');
  const icon = document.getElementById('eyeIcon');

  if (!passwordInput || !toggle || !icon) return; // 🔥 clave

  function togglePassword() {
    const isPassword = passwordInput.type === 'password';

    passwordInput.type = isPassword ? 'text' : 'password';
    icon.classList.toggle("fa-eye-slash", isPassword);
  }

  function checkInput() {
    // opcional (lo dejás listo para UX futuro)
  }

  toggle.addEventListener('click', togglePassword);
  passwordInput.addEventListener('keyup', checkInput);
}

// ==============================
// LOGIN MODULE
// ==============================
function initLogin() {
  const form = document.querySelector('login.form');

  if (!form) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const guessValue = "SILENCE";
    const password = document.getElementById("password")?.value;

    if (password === guessValue) {
      window.location.replace("myBlog.html");
    } else {
      alert("Don't guess :( ");
    }
  });
}

// ==============================
// GLOBAL INIT
// ==============================
function initApp() {
  initSidebar();
  initPasswordToggle();
  initLogin();

  // seguridad (opcional)
  document.oncontextmenu = () => false;
}

// 🔥 IMPORTANTE: esperar DOM
document.addEventListener("DOMContentLoaded", initApp);