<?php
$servername = "localhost"; // MySQL server (usually 'localhost')
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password (empty)
$dbname = "books"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>
