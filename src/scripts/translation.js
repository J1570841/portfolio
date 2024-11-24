selectLanguage = function(languageCode, languageName, flagClass) {
    const selectedLanguageElement = document.getElementById('selected-language');
    selectedLanguageElement.innerHTML = `<span class="${flagClass}"></span> ${languageName}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const selectedLanguageElement = document.getElementById("selected-language");

    // Función para cargar el JSON de traducción
    async function loadTranslations(language) {
        try {
            const response = await fetch(`/portfolio/src/assets/locales/${language}.json`);
            const translations = await response.json();
            applyTranslations(translations);
            // Actualizar el idioma visualmente después de cargar las traducciones
            const languageData = {
                en: { name: "English", flagUrl: "fi fi-gb" },
                es: { name: "Español", flagUrl: "fi fi-es" },
                cat: { name: "Català", flagUrl: "fi fi-es-ct" }
            };
            const cvs = {
                es: "CV.pdf",
                en: "",
                cat: "cv catala.pdf"
            };
            // Obtén el elemento <a>
            const link = document.getElementById("cv-link");
            const linkHome = document.getElementById("cv-link-home");

            // Extraer la ruta actual del href
            let basePath = link.href.substring(0, link.href.lastIndexOf("/") + 1); // "src/assets/pdfs/"
            let fileName = cvs[language];

            // Actualizar el href con el nuevo archivo
            link.href = basePath + fileName;

            if (linkHome !== null) {
                linkHome.href = basePath + fileName;
            }

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

            // Divide la clave jerárquica por puntos para acceder a las propiedades anidadas
            const keys = key.split(".");
            let translation = translations;

            // Recorre las claves en el objeto `translations` para encontrar el valor correcto
            for (const part of keys) {
                translation = translation[part];
                if (!translation) break;  // Si no existe, termina el bucle
            }

            // Si se encontró una traducción válida, reemplaza el contenido del elemento
            if (translation) {
                element.innerHTML = translation;
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
