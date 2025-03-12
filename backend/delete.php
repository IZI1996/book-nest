<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once "connexion.php";

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $data);
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($id > 0) {
        $stmt = $conn->prepare("DELETE FROM bookshelf WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Book deleted successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error deleting book"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Invalid book ID"]);
    }
}

$conn->close();
?>
