<?php
// cart.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');
include('connexion.php'); // Make sure to include your DB connection

// Get the book ID from the request
$data = json_decode(file_get_contents('php://input'), true);
$bookId = $data['bookId'];

// Assuming you have a session or a user ID system in place
$userId = 1; // For demo purposes, this could be dynamically set from a session or JWT token

// Add to cart query
$query = "INSERT INTO cart (user_id, book_id) VALUES ('$userId', '$bookId')";
$result = mysqli_query($conn, $query);

if ($result) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error adding to cart"]);
}

mysqli_close($conn);
?>
