document.addEventListener('DOMContentLoaded', function() {
    const userButton = document.querySelector('.user-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if(userButton && dropdownMenu) {
        userButton.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Cerrar el menú cuando se hace clic fuera
        document.addEventListener('click', function(e) {
            if (!userButton.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
});