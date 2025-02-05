// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAwztkMXlDiwxGycs1Yy2CqOALqXnONuxs",
    authDomain: "photofolio-cadf9.firebaseapp.com",
    projectId: "photofolio-cadf9",
    storageBucket: "photofolio-cadf9.appspot.com",
    messagingSenderId: "102949490418",
    appId: "1:102949490418:web:c6f98ae8f22c746c164a6b"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();