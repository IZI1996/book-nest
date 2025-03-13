<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "connexion.php";
require_once "vendor/autoload.php";

use Firebase\JWT\JWT;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$secretKey = $_ENV['JWT_SECRET_KEY'];

$data = json_decode(file_get_contents("php://input"), true);


$email = $data["email"];
$password = $data["password"];

$stmt = $conn->prepare("SELECT * FROM users WHERE email = $email");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user["password"])) {
        $payload = [
            'iat' => time(),
            'exp' => time() + 3600,
            'data' => [
                'user_id' => $user["id"],
                'email' => $user["email"],
                'name' => $user["name"]
            ]
        ];
        
        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        echo json_encode([
            "success" => true,
            "token" => $jwt,
            "user" => ["id" => $user["id"],
             "name" => $user["name"],
             "email" => $user["email"]
             
             ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$conn->close();
?>