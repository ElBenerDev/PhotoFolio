<?php
session_start();
?>
<header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid d-flex align-items-center justify-content-between">
        <!-- Logo existente -->
        <nav id="navbar" class="navbar">
            <!-- Menú existente -->
            <div class="auth-section">
                <?php if(isset($_SESSION['user_id'])): ?>
                    <div class="user-menu">
                        <button class="user-button">
                            <i class="bi bi-person"></i>
                            <span><?php echo htmlspecialchars($_SESSION['username']); ?></span>
                        </button>
                        <div class="dropdown-menu">
                            <a href="profile.php">Mi Perfil</a>
                            <a href="settings.php">Configuración</a>
                            <a href="php/logout.php">Cerrar Sesión</a>
                        </div>
                    </div>
                <?php else: ?>
                    <a href="login.html" class="login-btn">Login</a>
                <?php endif; ?>
            </div>
        </nav>
    </div>
</header>