<?php
require_once "connexion.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $imageUrl = null;
    
    if (isset($_FILES['profileImage']) && $_FILES['profileImage']['error'] == 0) {
        $image = $_FILES['profileImage']['tmp_name'];
        $targetDir = "images/";
        $targetFile = $targetDir . basename($_FILES['profileImage']['name']);
        
        if (move_uploaded_file($image, $targetFile)) {
            // Save full URL to image
            $imageUrl = "http://localhost" . $targetFile; // Adjust this URL if necessary
        } else {
            echo json_encode(["success" => false, "message" => "Error uploading image"]);
            exit();
        }
    }

    $book_id = intval($_POST['id']);
    $title = trim($_POST['title']);
    $author = trim($_POST['author']);
    $price = intval($_POST['price']);
    $type_id = intval($_POST['type_id']);

    // Update book with or without image URL
    if ($imageUrl) {
        $query = "UPDATE bookshelf SET title = ?, author = ?, price = ?, type_id = ?, image_url = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssiiis", $title, $author, $price, $type_id, $imageUrl, $book_id);
    } else {
        $query = "UPDATE bookshelf SET title = ?, author = ?, price = ?, type_id = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ssiii", $title, $author, $price, $type_id, $book_id);
    }

    if ($stmt->execute()) {
        // Return updated book data
        $selectQuery = "SELECT * FROM bookshelf WHERE id = ?";
        $selectStmt = $conn->prepare($selectQuery);
        $selectStmt->bind_param("i", $book_id);
        $selectStmt->execute();
        $result = $selectStmt->get_result();
        $updatedBook = $result->fetch_assoc();

        echo json_encode(["success" => true, "book" => $updatedBook]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating book: " . $conn->error]);
    }

    $stmt->close();
    $selectStmt->close();
}
?>
