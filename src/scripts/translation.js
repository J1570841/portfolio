selectLanguage = function(languageCode, languageName, flagClass) {
    const selectedLanguageElement = document.getElementById('selected-language');
    selectedLanguageElement.innerHTML = `<span class="${flagClass}"></span> ${languageName}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const selectedLanguageElement = document.getElementById("selected-language");

    // Función para cargar el JSON de traducción
    async function loadTranslations(language) {
        try {
            const response = await fetch(`/assets/locales/${language}.json`);
            const translations = await response.json();
            applyTranslations(translations);
            // Actualizar el idioma visualmente después de cargar las traducciones
            const languageData = {
                en: { name: "English", flagUrl: "fi fi-gb" },
                es: { name: "Español", flagUrl: "fi fi-es" },
                cat: { name: "Català", flagUrl: "fi fi-es-ct" }
            };
            const selectedLanguage = languageData[language];
            if (selectedLanguage) {
                selectLanguage(language, selectedLanguage.name, selectedLanguage.flagUrl);
            }
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
        const supportedLanguages = ["en", "es", "cat"]; // Lista de idiomas soportados
        return supportedLanguages.includes(systemLanguage) ? systemLanguage : "es"; // Devuelve el idioma detectado o español como fallback
    }

    // Cambiar idioma al seleccionar una opción en el menú
    document.querySelectorAll(".language-option").forEach(option => {
        option.addEventListener("click", () => {
            const languageCode = option.getAttribute("onclick").split("'")[1];
            localStorage.setItem("preferredLanguage", languageCode);
            loadTranslations(languageCode);
        });
    });

    // Cargar el idioma guardado, el del sistema o usar un valor predeterminado
    const savedLanguage = localStorage.getItem("preferredLanguage") || detectSystemLanguage();
    loadTranslations(savedLanguage);
});
