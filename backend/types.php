<?php
require_once "connexion.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$sql = "SELECT id, name FROM types";
$result = $conn->query($sql);

$genres = [];
while ($row = $result->fetch_assoc()) {
    $genres[] = $row;
}

echo json_encode($genres);

$conn->close();
?>
