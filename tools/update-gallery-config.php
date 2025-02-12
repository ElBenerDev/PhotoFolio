<?php
$galleryBaseDir = '../assets/img/gallery/';
$publicDir = $galleryBaseDir . 'public/';
$premiumDir = $galleryBaseDir . 'premium/';

function getImagesFromDir($dir) {
    $images = [];
    if (is_dir($dir)) {
        foreach (scandir($dir) as $file) {
            if ($file !== '.' && $file !== '..' && 
                in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), 
                ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                $images[] = $file;
            }
        }
    }
    return $images;
}

// Asegurarse de que existan las carpetas
if (!is_dir($publicDir)) mkdir($publicDir, 0755, true);
if (!is_dir($premiumDir)) mkdir($premiumDir, 0755, true);

$config = [
    'public_images' => getImagesFromDir($publicDir),
    'premium_images' => getImagesFromDir($premiumDir)
];

file_put_contents('../assets/js/gallery-config.json', 
    json_encode($config, JSON_PRETTY_PRINT));
echo "Gallery configuration updated successfully!\n";