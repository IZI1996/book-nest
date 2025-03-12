<?php
require_once "connexion.php"; // Include your DB connection file

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    // Define the directory where you want to store the images
    $uploadDirectory = "images/";  // Assuming "images/" folder exists

    // Get the file details
    $fileName = $_FILES['image']['name'];
    $fileTmpName = $_FILES['image']['tmp_name'];
    $fileSize = $_FILES['image']['size'];
    $fileError = $_FILES['image']['error'];
    $fileType = $_FILES['image']['type'];

    // Check for errors
    if ($fileError === 0) {
        // Define a unique name for the file to avoid overwriting existing files
        $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
        $newFileName = uniqid('', true) . '.' . $fileExtension;
        $fileDestination = $uploadDirectory . $newFileName;

        // Move the file to the destination folder
        if (move_uploaded_file($fileTmpName, $fileDestination)) {
            // Insert the file path into the database
            $query = "INSERT INTO bookshelf (title, author, year, type_id, image_url) 
                      VALUES ('Title Here', 'Author Here', 2021, 1, '$newFileName')";
            $conn->query($query);

            echo "File uploaded successfully!";
        } else {
            echo "Error moving the file!";
        }
    } else {
        echo "Error uploading the file!";
    }
} else {
    echo "No file uploaded or wrong request method!";
}
?>
