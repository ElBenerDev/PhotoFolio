<header id="header" class="header d-flex align-items-center sticky-top">
    <div class="container-fluid position-relative d-flex align-items-center justify-content-between">
        <a href="index.html" class="logo d-flex align-items-center me-auto me-xl-0">
            <i class="bi bi-camera"></i>
            <h1 class="sitename">PhotoFolio</h1>
        </a>

        <nav id="navmenu" class="navmenu">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li class="auth-required" <?php echo !isset($_SESSION['user_id']) ? 'style="display: none;"' : ''; ?>>
                    <a href="gallery.php" class="active">Gallery</a>
                </li>
            </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <div class="header-social-links">
            <a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
            <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
        </div>

        <div class="header-login-register">
            <?php if (!isset($_SESSION['user_id'])): ?>
                <a href="login.php" class="btn btn-primary">Log in</a>
                <a href="register.php" class="btn btn-secondary">Sign up</a>
            <?php else: ?>
                <a href="logout.php" class="btn btn-primary">Log out</a>
            <?php endif; ?>
        </div>
    </div>
</header>