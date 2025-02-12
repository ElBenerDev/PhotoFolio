<?php
require_once 'includes/GalleryManager.php';
$galleryManager = new GalleryManager();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery - PhotoFolio</title>
    
    <!-- Favicons -->
    <link rel="icon" href="assets/img/favicon.png">
    <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Vendor CSS -->
    <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/vendor/bootstrap-icons/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/vendor/aos/aos.css">
    <link rel="stylesheet" href="assets/vendor/glightbox/css/glightbox.min.css">

    <!-- Main CSS -->
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/header.css">
</head>

<body class="gallery-page">
    <?php include 'includes/header.php'; ?>

    <main class="main">
        <!-- Gallery Header -->
        <section class="page-header" style="padding-top: 120px;">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6 text-center">
                        <h2>Exclusive <span>Gallery</span></h2>
                        <p>Explore our premium collection of photos</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Gallery Section -->
        <section id="gallery" class="gallery section">
            <div class="container-fluid">
                <div class="row gy-4 justify-content-center">
                    <?php
                    // Mostrar imágenes públicas
                    $publicImages = $galleryManager->getPublicImages();
                    foreach ($publicImages as $image) {
                        echo $galleryManager->renderGalleryItem($image, false);
                    }

                    // Mostrar imágenes premium solo para usuarios autenticados
                    if ($galleryManager->isUserAuthenticated()) {
                        $premiumImages = $galleryManager->getPremiumImages();
                        foreach ($premiumImages as $image) {
                            echo $galleryManager->renderGalleryItem($image, true);
                        }
                    }
                    ?>
                </div>
            </div>
        </section>
    </main>

    <?php include 'includes/footer.php'; ?>

    <!-- Scripts -->
    <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="assets/vendor/aos/aos.js"></script>
    <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"></script>
    <script src="assets/js/firebase-config.js"></script>
    <script src="assets/js/auth.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>