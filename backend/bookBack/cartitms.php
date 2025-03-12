<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include('connexion.php');

$userId = 1; 

$query = "SELECT 
            c.id, 
            b.title, 
            b.price, 
            b.image_url, 
            t.name as type_name 
          FROM cart c
          JOIN bookshelf b ON c.book_id = b.id
          JOIN types t ON b.type_id = t.id
          WHERE c.user_id = $userId";

$result = mysqli_query($conn, $query);
$items = [];

while ($row = mysqli_fetch_assoc($result)) {
    $items[] = $row;
}

echo json_encode($items);
mysqli_close($conn);
?>