document.addEventListener('DOMContentLoaded', function() {
    // Asegurarse de que el usuario está autenticado
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Usuario autenticado, galería accesible');
            // No necesitamos hacer nada más aquí, las imágenes se cargarán normalmente desde el HTML
        }
    });
});