// Toggle theme
document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = document.body.classList.contains('dark-mode') ? '🌜' : '🌞';
    updateThemeColors();
});

// Scroll to top
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show back to top button
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > window.innerHeight) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Toggle mobile menu
document.getElementById('menuToggle').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Update theme colors on load
window.addEventListener('load', updateThemeColors);

function updateThemeColors() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    document.documentElement.style.setProperty('--accent-color', isDarkMode ? '#8A2BE2' : '#4B0082');
    document.documentElement.style.setProperty('--hover-color', isDarkMode ? '#9370db' : '#6a5acd');
}
