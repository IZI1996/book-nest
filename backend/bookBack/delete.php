<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: لContent-Type, Authorization");
header("Access-Control-Max-Age: 3600");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "connexion.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = isset($data['id']) ? intval($data['id']) : 0;

    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid book ID"]);
        exit();
    }

    try {
        $checkStmt = $conn->prepare("SELECT id FROM bookshelf WHERE id = ?");
        $checkStmt->bind_param("i", $id);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();

        if ($checkResult->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Book not found"]);
            exit();
        }
        $checkStmt->close();

        $deleteCartStmt = $conn->prepare("DELETE FROM cart WHERE book_id = ?");
        $deleteCartStmt->bind_param("i", $id);
        if (!$deleteCartStmt->execute()) {
            throw new Exception("Failed to delete cart items: " . $conn->error);
        }
        $deleteCartStmt->close();

        $deleteStmt = $conn->prepare("DELETE FROM bookshelf WHERE id = ?");
        $deleteStmt->bind_param("i", $id);
        if (!$deleteStmt->execute()) {
            throw new Exception("Failed to delete book: " . $conn->error);
        }

        if ($deleteStmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Book deleted"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Deletion failed"]);
        }

        $deleteStmt->close();
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Server error: " . $e->getMessage() 
        ]);
    } finally {
        $conn->close();
    }
    exit();
}
?>