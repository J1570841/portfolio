// Obtener el botón de modo y el estado actual del modo
const modeToggle = document.getElementById('mode-toggle');

// Función para cargar la preferencia del usuario desde LocalStorage
function loadThemePreference() {
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode !== null) {
        if (darkMode === 'enabled') {
            document.body.classList.add('dark-mode');
            modeToggle.checked = false; // Marca el checkbox
        } else {
            document.body.classList.remove('dark-mode');
            modeToggle.checked = true; // Desmarca el checkbox
        }
    } else {
        const prefiereModoOscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (prefiereModoOscuro) {
            document.body.classList.add('dark-mode');
            modeToggle.checked = false;
        } else {
            document.body.classList.remove('dark-mode');
            modeToggle.checked = true;
        }
    }
}

// Cargar la preferencia al cargar la página
loadThemePreference();

// Función para guardar la preferencia en LocalStorage
function setThemePreference() {
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
}

// Alternar el modo y guardar la preferencia cuando se hace clic en el toggle
modeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    setThemePreference();
});

const modoOscuroListener = window.matchMedia('(prefers-color-scheme: dark)');
modoOscuroListener.addEventListener('change', event => {
    if (event.matches) {
        document.body.classList.add('dark-mode');
        modeToggle.checked = false;
    } else {
        document.body.classList.remove('dark-mode');
        modeToggle.checked = true;
    }
    
    setThemePreference();
});
