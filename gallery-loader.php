<?php
class GalleryLoader {
    private $galleryPath;
    private $premiumPath;

    public function __construct() {
        $this->galleryPath = 'assets/img/gallery/public/';
        $this->premiumPath = 'assets/img/gallery/premium/';
    }

    public function getImages($isPremium = false) {
        $directory = $isPremium ? $this->premiumPath : $this->galleryPath;
        $images = [];
        $allowed_types = ['jpg', 'jpeg', 'png', 'gif'];
        
        if ($handle = opendir($directory)) {
            while (false !== ($file = readdir($handle))) {
                $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                if ($file != "." && $file != ".." && in_array($extension, $allowed_types)) {
                    $images[] = [
                        'path' => $directory . $file,
                        'name' => pathinfo($file, PATHINFO_FILENAME),
                        'isPremium' => $isPremium
                    ];
                }
            }
            closedir($handle);
        }
        
        return $images;
    }
}
?>