<?php
header('Content-Type: application/json');

// Tu API key de CoinGate
$apiKey = 'TU_API_KEY_DE_COINGATE';

// Verificar la firma del webhook
$signature = $_SERVER['HTTP_COINGATE_SIGNATURE'] ?? '';
$payload = file_get_contents('php://input');

// Verificar que el pago sea válido
$data = json_decode($payload, true);

if ($data && isset($data['status']) && $data['status'] === 'paid') {
    // Aquí puedes agregar código para:
    // 1. Verificar que el monto sea correcto
    // 2. Activar el acceso premium para el usuario
    // 3. Guardar el registro en tu base de datos
    
    http_response_code(200);
    echo json_encode(['status' => 'success']);
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error']);
}