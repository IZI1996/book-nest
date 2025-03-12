
<?php
require_once "connexion.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if (isset($_GET['id'])) {
    // Fetch a single book by ID
    $book_id = intval($_GET['id']); // Convert to integer for safety
    $query = "SELECT * , image_url FROM bookshelf WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $book_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $book = $result->fetch_assoc(); // Fetch only one book
        echo json_encode($book); // Return a single object
    } else {
        echo json_encode(["error" => "Book not found"]);
    }

    $stmt->close();
} else {
    // Fetch all books if no ID is provided
    $query = "SELECT 
    b.id, 
    b.title, 
    b.author, 
    b.year, 
    t.name AS type_name,
    b.image_url
FROM bookshelf b
JOIN types t ON b.type_id = t.id;";
    $result = $conn->query($query);
    
    $books = [];
    while ($row = $result->fetch_assoc()) {
        $books[] = $row; // Store all books in an array
    }
    
    echo json_encode($books); // Return the array of books
}

$conn->close();
?>
