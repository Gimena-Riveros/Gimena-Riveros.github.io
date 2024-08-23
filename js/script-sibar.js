const sidebar = document.querySelector('.sidebar');
const toggleBTNmenu = document.querySelector('.toggle-btn-menu');

toggleBTNmenu.addEventListener('click', () => {
    sidebar.classList.toggle('active');
} );