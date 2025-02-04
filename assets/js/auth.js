// Configuración de las constantes para mensajes de error
const AUTH_ERRORS = {
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/invalid-email': 'Email inválido',
    'auth/email-already-in-use': 'Email ya registrado',
    'default': 'Error de autenticación'
};

// Verificar estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
    const loginRegisterDiv = document.querySelector('.header-login-register');
    const authElements = document.querySelectorAll('.auth-required');
    const authHideElements = document.querySelectorAll('.auth-hide');

    // Función para aplicar transiciones suaves
    const fadeElement = (element, show) => {
        if (show) {
            element.style.opacity = '0';
            element.style.display = '';
            setTimeout(() => element.style.opacity = '1', 10);
        } else {
            element.style.opacity = '0';
            setTimeout(() => element.style.display = 'none', 300);
        }
    };

    if (user) {
        // Usuario logueado - Mostrar menú de usuario y elementos auth-required
        authHideElements.forEach(element => {
            fadeElement(element, false);
        });

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
            fadeElement(element, true);
        });

        // Configurar el botón de logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    await firebase.auth().signOut();
                    window.location.href = 'index.html';
                } catch (error) {
                    handleAuthError(error);
                }
            });
        }

        // Configurar el menú dropdown con mejoras de usabilidad
        const userButton = document.querySelector('.user-button');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        if (userButton && dropdownMenu) {
            let timeoutId;

            const showDropdown = () => {
                clearTimeout(timeoutId);
                dropdownMenu.classList.add('show');
            };

            const hideDropdown = () => {
                timeoutId = setTimeout(() => {
                    dropdownMenu.classList.remove('show');
                }, 150);
            };

            userButton.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });

            userButton.addEventListener('mouseenter', showDropdown);
            userButton.addEventListener('mouseleave', hideDropdown);
            dropdownMenu.addEventListener('mouseenter', showDropdown);
            dropdownMenu.addEventListener('mouseleave', hideDropdown);

            // Cerrar al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!userButton.contains(e.target)) {
                    dropdownMenu.classList.remove('show');
                }
            });
        }

        // Verificación de acceso a gallery
        if (window.location.pathname.includes('gallery.html')) {
            console.log('Usuario autenticado accediendo a la galería');
        }

    } else {
        // Usuario no logueado
        authHideElements.forEach(element => {
            fadeElement(element, true);
        });
        
        loginRegisterDiv.innerHTML = `
            <a href="login.html" class="btn btn-primary">Log in</a>
            <a href="register.html" class="btn btn-secondary">Sign up</a>
        `;

        // Ocultar elementos auth-required
        authElements.forEach(element => {
            fadeElement(element, false);
        });

        // Redirigir si intenta acceder a gallery sin autenticación
        if (window.location.pathname.includes('gallery.html')) {
            window.location.href = 'login.html';
        }
    }

    // Manejar navegación al gallery
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

// Función mejorada para manejar errores de autenticación
function handleAuthError(error) {
    console.error('Error de autenticación:', error);
    
    const errorMessage = AUTH_ERRORS[error.code] || AUTH_ERRORS.default;
    
    // Mostrar mensaje de error al usuario
    const errorDiv = document.createElement('div');
    errorDiv.className = 'auth-error-message';
    errorDiv.textContent = errorMessage;
    
    document.body.appendChild(errorDiv);
    
    // Remover mensaje después de 3 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Función para validar el estado de autenticación
function checkAuth() {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe(); // Importante: desuscribirse para evitar memory leaks
            if (user) {
                resolve(user);
            } else {
                reject(new Error('Usuario no autenticado'));
            }
        }, (error) => {
            unsubscribe();
            reject(error);
        });
    });
}

// Función auxiliar para verificar si el usuario está en una página protegida
function checkProtectedPage() {
    const protectedPages = ['gallery.html', 'profile.html', 'settings.html'];
    return protectedPages.some(page => window.location.pathname.includes(page));
}

// Agregar estilos necesarios
const style = document.createElement('style');
style.textContent = `
    .auth-hide {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }
    
    .auth-error-message {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #ff4444;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .dropdown-menu {
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .dropdown-menu.show {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);