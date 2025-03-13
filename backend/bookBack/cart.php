<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');
include('connexion.php');

$data = json_decode(file_get_contents('php://input'), true);
$bookId = $data['bookId'];

$userId = 1; 

$query = "INSERT INTO cart (user_id, book_id) VALUES ('$userId', '$bookId')";
$result = mysqli_query($conn, $query);

if ($result) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error adding to cart"]);
}

mysqli_close($conn);
?>
