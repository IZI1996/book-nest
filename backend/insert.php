<?php

require_once "connexion.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if required form fields are present
    if (isset($_POST['title']) && isset($_POST['author']) && isset($_POST['year']) && isset($_POST['type']) && isset($_FILES['profileImage'])) {
        
        $title = $_POST['title'];
        $author = $_POST['author'];
        $year = $_POST['year'];
        $type_id = $_POST['type'];

        // Handle the image upload
        $image = $_FILES['profileImage'];
        $imageTmpName = $image['tmp_name'];
        $imageName = preg_replace("/[^a-zA-Z0-9.]/", "_", $image['name']);  // Sanitize the image name
        $imagePath = "images/" . basename($imageName); // Target folder for image upload

        // Allowed image extensions
        $allowedExtensions = ['jpg', 'jpeg', 'png'];
        $imageExtension = strtolower(pathinfo($imageName, PATHINFO_EXTENSION));

        // Check if file type is allowed
        if (!in_array($imageExtension, $allowedExtensions)) {
            echo json_encode(["message" => "Invalid image type. Allowed types are JPG, JPEG, and PNG."]);
            exit;
        }

        // Check if file is uploaded without error
        if ($image['error'] === UPLOAD_ERR_OK) {
            // Make sure the images folder exists
            if (!file_exists('images')) {
                mkdir('images', 0777, true); // Create the folder if it doesn't exist
            }

            // Move the uploaded image to the target folder
            if (move_uploaded_file($imageTmpName, $imagePath)) {
                // Prepare the SQL query to insert book details
                $query = "INSERT INTO bookshelf (title, author, year, image_url, type_id) VALUES (?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("ssisi", $title, $author, $year, $imagePath, $type_id);

                if ($stmt->execute()) {
                    echo json_encode(["message" => "Book was successfully registered."]);
                } else {
                    echo json_encode(["message" => "Unable to register the book.", "error" => $stmt->error]);
                }

                $stmt->close();
            } else {
                echo json_encode(["message" => "Error uploading image."]);
            }
        } else {
            echo json_encode(["message" => "Error uploading image."]);
        }
    } else {
        echo json_encode(["message" => "Missing required fields or image upload."]);
    }
} else {
    echo json_encode(["message" => "No data posted or invalid request method."]);
}

$conn->close();
?>
