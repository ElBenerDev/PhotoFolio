// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAwztkMXlDiwxGycs1Yy2CqOALqXnONuxs",
    authDomain: "photofolio-cadf9.firebaseapp.com",
    projectId: "photofolio-cadf9",
    storageBucket: "photofolio-cadf9.firebasestorage.app",
    messagingSenderId: "102949490418",
    appId: "1:102949490418:web:c6f98ae8f22c746c164a6b"
  };
  
  // Inicializa Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Obtener elementos del formulario
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  // Agregar un evento al formulario de login
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = emailInput.value;
    const password = passwordInput.value;
  
    // Intentar iniciar sesión con Firebase
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Usuario ha iniciado sesión correctamente
        const user = userCredential.user;
        console.log('Usuario logueado:', user);
  
        // Redirigir a la página principal después del login
        window.location.href = 'index.html';
      })
      .catch(error => {
        // Manejo de errores
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión. Intenta de nuevo.');
      });
  });
  