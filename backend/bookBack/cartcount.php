<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include('connexion.php');

$userId = 1; 

$query = "SELECT COUNT(*) as cart_count FROM cart WHERE user_id = $userId";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);

echo json_encode(['cartCount' => $row['cart_count']]);

mysqli_close($conn);
?>