// Obtener el botón y el estado actual del modo
const modeToggle = document.getElementById('mode-toggle');

// Función para cargar la preferencia del usuario desde LocalStorage
function loadThemePreference() {
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
    modeToggle.textContent = 'Cambiar a Modo Claro';
    } else {
    document.body.classList.remove('dark-mode');
    modeToggle.textContent = 'Cambiar a Modo Oscuro';
    }
}

// Cargar la preferencia al cargar la página
loadThemePreference();

// Función para guardar la preferencia en LocalStorage
function setThemePreference() {
    if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode', 'enabled');
    modeToggle.textContent = 'Cambiar a Modo Claro';
    } else {
    localStorage.setItem('dark-mode', 'disabled');
    modeToggle.textContent = 'Cambiar a Modo Oscuro';
    }
}

// Alternar el modo y guardar la preferencia cuando se hace clic en el botón
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    setThemePreference();
});