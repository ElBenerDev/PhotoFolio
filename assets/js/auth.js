// Verificar estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
    const loginRegisterDiv = document.querySelector('.header-login-register');
    const authElements = document.querySelectorAll('.auth-required');
    
    if (user) {
        // Usuario logueado - Mostrar menú de usuario y elementos auth-required
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

        // Mostrar elementos auth-required (incluyendo Gallery)
        authElements.forEach(element => {
            element.style.display = '';
        });

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

        // Redirigir si el usuario intenta acceder a gallery.html sin estar autenticado
        if (window.location.pathname.includes('gallery.html')) {
            // El usuario está autenticado, puede ver la galería
            console.log('Usuario autenticado accediendo a la galería');
        }

    } else {
        // Usuario no logueado - Mostrar botones de login/registro y ocultar elementos auth-required
        loginRegisterDiv.innerHTML = `
            <a href="login.html" class="btn btn-primary">Log in</a>
            <a href="register.html" class="btn btn-secondary">Sign up</a>
        `;

        // Ocultar elementos auth-required (incluyendo Gallery)
        authElements.forEach(element => {
            element.style.display = 'none';
        });

        // Redirigir si el usuario intenta acceder a gallery.html sin estar autenticado
        if (window.location.pathname.includes('gallery.html')) {
            window.location.href = 'login.html';
        }
    }

    // Función para manejar la navegación al gallery
    const galleryLinks = document.querySelectorAll('a[href*="gallery.html"]');
    galleryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!user) {
                e.preventDefault();
                window.location.href = 'login.html';
            }
        });
    });
});

// Función para manejar errores de autenticación
function handleAuthError(error) {
    console.error('Error de autenticación:', error);
    // Aquí puedes agregar lógica para mostrar mensajes de error al usuario
}

// Función para validar el estado de autenticación
function checkAuth() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                reject(new Error('Usuario no autenticado'));
            }
        });
    });
}