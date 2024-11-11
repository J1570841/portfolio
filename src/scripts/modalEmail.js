// Enlaces predefinidos para Gmail y Outlook
const gmailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=jan.codinagarcia@hotmail.es&su=Contacto%20Portfolio&body=Escribe%20tu%20mensaje%20aquí";
const outlookLink = "https://outlook.live.com/mail/0/deeplink/compose?to=jan.codinagarcia@hotmail.es&subject=Contacto%20Portfolio&body=Escribe%20tu%20mensaje%20aquí";

let selectedEmailService = '';

// Función para abrir el modal
function openModal() {
    document.getElementById('email-modal').style.display = 'flex';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('email-modal').style.display = 'none';
}

// Función para seleccionar el servicio de correo
function selectService(service) {
    selectedEmailService = service;
}

// Función para enviar el correo
function sendEmail() {
    if (selectedEmailService === 'gmail') {
        window.location.href = gmailLink;
    } else if (selectedEmailService === 'outlook') {
        window.location.href = outlookLink;
    }
    closeModal(); // Cerrar el modal después de enviar
}

// Cerrar modal si se hace clic fuera del contenido
window.addEventListener('click', function(event) {
    const modal = document.getElementById('email-modal');
    if (event.target === modal) {
        closeModal();
    }
});
