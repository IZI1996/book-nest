<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE, OPTIONS,POST");

include('connexion.php');

$data = json_decode(file_get_contents("php://input"), true);
$itemId = $data['itemId'];

$query = "DELETE FROM cart WHERE id = $itemId";
$result = mysqli_query($conn, $query);

if ($result) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}

mysqli_close($conn);
?>