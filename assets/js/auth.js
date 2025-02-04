// Verificar estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
    const loginRegisterDiv = document.querySelector('.header-login-register');
    
    if (user) {
        // Usuario logueado - Mostrar menú de usuario
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

        // Configurar el botón de logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                firebase.auth().signOut()
                    .then(() => {
                        window.location.href = 'index.html';
                    })
                    .catch((error) => {
                        console.error('Error al cerrar sesión:', error);
                    });
            });
        }

        // Configurar el menú dropdown
        const userButton = document.querySelector('.user-button');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        if (userButton && dropdownMenu) {
            userButton.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });

            // Cerrar al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!userButton.contains(e.target)) {
                    dropdownMenu.classList.remove('show');
                }
            });
        }
    } else {
        // Usuario no logueado - Mostrar botones de login/registro
        loginRegisterDiv.innerHTML = `
            <a href="login.html" class="btn btn-primary">Log in</a>
            <a href="register.html" class="btn btn-secondary">Sign up</a>
        `;
    }
});