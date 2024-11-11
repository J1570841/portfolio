function copyEmail() {
    // Seleccionamos el texto del correo electrónico
    const email = document.getElementById("email").innerText;

    // Creamos un elemento de texto temporal para copiar
    const tempInput = document.createElement("input");
    tempInput.value = email;
    document.body.appendChild(tempInput);
    
    // Seleccionamos el contenido del input temporal
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Para móviles
    
    // Copiamos el texto al portapapeles
    document.execCommand("copy");
    
    // Removemos el input temporal
    document.body.removeChild(tempInput);

    // Mostrar mensaje de éxito
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";
    
    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 2000);
}