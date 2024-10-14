function abrirModal(elemento) {
    var modal = document.getElementById("modalImagenes");
    var modalImg = document.getElementById("imgModal");
    modal.style.display = "flex";  // Muestra la modal centrada
    modalImg.src = elemento.src;   // Asigna la imagen a la modal
}

function cerrarModal() {
    var modal = document.getElementById("modalImagenes");
    modal.style.display = "none";  // Oculta la modal
}
