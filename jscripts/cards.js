// Obtener todos los botones de alternancia
const toggleButtons = document.querySelectorAll('.button-basic');

// Agregar un evento de clic a cada botón
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const carta = button.closest('.carta'); // Obtener la tarjeta contenedora
        carta.classList.toggle('flipped'); // Alternar clase para girar
    });
});
