<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Definir la ruta base correctamente
$baseDir = __DIR__ . '/../../img/gallery/';

function getImagesFromDirectory($dir) {
    $images = [];
    $valid_extensions = ['jpg', 'jpeg', 'png', 'gif'];
    
    if (!is_dir($dir)) {
        return ['error' => "Directory not found: $dir"];
    }

    try {
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($files as $file) {
            if ($file->isFile()) {
                $extension = strtolower(pathinfo($file->getFilename(), PATHINFO_EXTENSION));
                if (in_array($extension, $valid_extensions)) {
                    // Obtener la ruta relativa
                    $relativePath = str_replace('\\', '/', substr($file->getPathname(), strlen($dir)));
                    $images[] = $relativePath;
                }
            }
        }
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
    
    return $images;
}

// Verificar que los directorios existen
$publicDir = $baseDir . 'public';
$premiumDir = $baseDir . 'premium';

if (!is_dir($baseDir)) {
    die(json_encode(['error' => "Base directory not found: $baseDir"]));
}

$result = [
    'status' => 'success',
    'baseDir' => $baseDir,
    'images' => getImagesFromDirectory($publicDir),
    'premium_images' => getImagesFromDirectory($premiumDir)
];

echo json_encode($result);