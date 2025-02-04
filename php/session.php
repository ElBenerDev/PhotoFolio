<?php
session_start();

// Función para verificar si el usuario está logueado
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Función para cerrar sesión
function logout() {
    session_destroy();
    header('Location: ../index.html');
    exit();
}
?>