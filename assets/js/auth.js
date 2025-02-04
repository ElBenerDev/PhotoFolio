// assets/js/auth.js
firebase.auth().onAuthStateChanged((user) => {
    const loginRegisterDiv = document.querySelector('.header-login-register');
    
    if (user) {
        // Usuario está logueado
        loginRegisterDiv.innerHTML = `
            <div class="user-menu">
                <button class="user-button">
                    <i class="bi bi-person-circle"></i>
                    <span>${user.email}</span>
                </button>
                <div class="dropdown-menu">
                    <a href="#" class="profile-link">Mi Perfil</a>
                    <a href="#" class="settings-link">Configuración</a>
                    <a href="#" id="logout-btn">Cerrar Sesión</a>
                </div>
            </div>
        `;

        // Evento para cerrar sesión
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            firebase.auth().signOut().then(() => {
                window.location.href = 'index.html';
            }).catch((error) => {
                console.error('Error al cerrar sesión:', error);
            });
        });

        // Toggle del menú dropdown
        const userButton = document.querySelector('.user-button');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        userButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!userButton.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    } else {
        // Usuario no está logueado
        loginRegisterDiv.innerHTML = `
            <a href="login.html" class="btn btn-primary">Log in</a>
            <a href="register.html" class="btn btn-secondary">Sign up</a>
        `;
    }
});