<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Authorization");

require_once "vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$secretKey = $_ENV['JWT_SECRET_KEY'];

function verifyJWT() {
    global $secretKey;
    
    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["message" => "Authorization header missing"]);
        exit;
    }

    $jwt = JWT::encode($payload, $secretKey, 'HS256');

    try {
        $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["message" => "Invalid token: " . $e->getMessage()]);
        exit;
    }
}


verifyJWT(); 
?>