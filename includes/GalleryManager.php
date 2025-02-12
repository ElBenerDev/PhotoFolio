<?php
class GalleryManager {
    private $publicDir = 'assets/img/gallery/public/';
    private $premiumDir = 'assets/img/gallery/premium/';
    
    public function getPublicImages() {
        return $this->getImagesFromDirectory($this->publicDir);
    }
    
    public function getPremiumImages() {
        return $this->getImagesFromDirectory($this->premiumDir);
    }
    
    private function getImagesFromDirectory($directory) {
        $images = [];
        if (is_dir($directory)) {
            foreach (scandir($directory) as $file) {
                if ($file !== '.' && $file !== '..' && $this->isImage($file)) {
                    $images[] = [
                        'path' => $directory . $file,
                        'name' => pathinfo($file, PATHINFO_FILENAME),
                        'type' => strpos($directory, 'premium') !== false ? 'premium' : 'public'
                    ];
                }
            }
        }
        return $images;
    }
    
    public function isUserAuthenticated() {
        session_start();
        return isset($_SESSION['user_id']);
    }
    
    public function renderGalleryItem($image, $isPremium) {
        $premiumClass = $isPremium ? 'premium-content' : '';
        $path = htmlspecialchars($image['path']);
        $name = htmlspecialchars($image['name']);
        
        return <<<HTML
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="gallery-item h-100 {$premiumClass}">
                <img src="{$path}" 
                     class="img-fluid" 
                     alt="{$name}"
                     loading="lazy">
                <div class="gallery-links d-flex align-items-center justify-content-center">
                    <a href="{$path}" 
                       class="glightbox preview-link"
                       title="{$name}">
                        <i class="bi bi-arrows-angle-expand"></i>
                    </a>
                </div>
            </div>
        </div>
        HTML;
    }
    
    private function isImage($filename) {
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        return in_array($extension, $allowedExtensions);
    }
}