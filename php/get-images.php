<?php
header('Content-Type: application/json');

// Configurar CORS si es necesario
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Directorios de imágenes
$publicDir = '../img/gallery/public/';
$premiumDir = '../img/gallery/premium/';

// Función para obtener archivos de imagen de un directorio
function getImagesFromDir($dir) {
    $images = [];
    if (is_dir($dir)) {
        $files = scandir($dir);
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..' && !is_dir($dir . $file)) {
                // Verificar si es una imagen
                $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif'])) {
                    $images[] = $file;
                }
            }
        }
    }
    return $images;
}

try {
    $response = [
        'images' => getImagesFromDir($publicDir),
        'premium_images' => getImagesFromDir($premiumDir)
    ];
    echo json_encode($response);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}