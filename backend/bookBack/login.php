<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "vendor/autoload.php";
require_once "connexion.php"; 

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        if (empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "password or email not correct "
            ]);
            exit();
        }

        $email = $conn->real_escape_string($data['email']);
        $password = $data['password'];

        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user && password_verify($password, $user['password'])) {
            $secretKey = "your_very_strong_secret_key_123!@#";
            $payload = [
                "iat" => time(),
                "exp" => time() + 3600, // 1 hour
                "userId" => $user['id'],
                "username"=>$user['name']

            ];

            $token = JWT::encode($payload, $secretKey, 'HS256');

            http_response_code(200);
            echo json_encode([
                "success" => true,
                "token" => $token,
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['name'],
                    "email" => $user['email']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "data invalid"
            ]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "error in server " . $e->getMessage()
        ]);
    }
    $stmt->close();
    $conn->close();
    exit();
}
?>