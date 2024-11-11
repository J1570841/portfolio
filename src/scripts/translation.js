document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("languageSelector");

    // Función para cargar el JSON de traducción
    async function loadTranslations(language) {
        try {
            const response = await fetch(`locale/${language}.json`);
            const translations = await response.json();
            applyTranslations(translations);
            languageSelector.value = language; // Actualiza el selector al idioma cargado
        } catch (error) {
            console.error("Error al cargar el archivo de traducción:", error);
        }
    }

    // Función para aplicar las traducciones a los elementos HTML
    function applyTranslations(translations) {
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }

    // Detectar el idioma del sistema y cargarlo
    function detectSystemLanguage() {
        const systemLanguage = navigator.language.slice(0, 2); // Extrae los dos primeros caracteres del idioma del sistema
        const supportedLanguages = ["en", "es"]; // Lista de idiomas soportados
        return supportedLanguages.includes(systemLanguage) ? systemLanguage : "es"; // Devuelve el idioma detectado o español como fallback
    }

    // Cambiar idioma al seleccionar una opción
    languageSelector.addEventListener("change", (event) => {
        const selectedLanguage = event.target.value;
        localStorage.setItem("preferredLanguage", selectedLanguage);
        loadTranslations(selectedLanguage);
    });

    // Cargar el idioma guardado, el del sistema o usar un valor predeterminado
    const savedLanguage = localStorage.getItem("preferredLanguage") || detectSystemLanguage();
    loadTranslations(savedLanguage);
});
