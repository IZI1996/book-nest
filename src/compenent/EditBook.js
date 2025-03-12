import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost"; // Change this if needed

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    type_id: "",
    image_url: null, // Image file
  });
  const [types, setTypes] = useState([]);

  // Fetch book details and types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await fetch(`${API_URL}/bookBack/select.php?id=${id}`);
        const bookData = await bookRes.json();

        if (Array.isArray(bookData) && bookData.length > 0) {
          const book = bookData[0]; // Get the first book
          setBook({
            ...book,
            profileImageUrl: book.image_url ? `${API_URL}/bookBack/images/${book.image_url}` : "", // Assuming the image is stored in a folder
          });
        } else if (typeof bookData === "object") {
          setBook({
            ...bookData,
            profileImageUrl: bookData.image_url ? `${API_URL}/bookBack/images/${bookData.image_url}` : "", // Handle no image case
          });
        }
        console.log(bookData)

        // Fetch the types of books
        const typesRes = await fetch(`${API_URL}/bookBack/types.php`);
        const typesData = await typesRes.json();
        setTypes(typesData);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Handle image file change
  const handleFileChange = (e) => {
    setBook({ ...book, image_url: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", book.id);  // Include the book ID
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("price", book.price);
    formData.append("type_id", book.type_id);

    if (book.image_url) {
      formData.append("image_url", book.image_url);
    }

    try {
      const response = await fetch("http://localhost/bookBack/update.php", {
        method: "POST",
        body: formData,
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result); // Log the result for debugging

      if (result.success) {
        alert("Book updated successfully!");
        navigate("/libiray"); // Navigate to another page after success
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error); // Log the error for debugging
      alert("Error submitting form! Check the console for more details.");
    }
  };

  return (
    <div className="container d-flex justify-content-around text-lg-start " style={{marginTop:'120px'}} >
      <div className="w-50 shadow p-4"  >
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control form-control-sm"
              value={book.title || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="author" className="form-label">Author:</label>
            <input
              type="text"
              name="author"
              id="author"
              className="form-control form-control-sm"
              value={book.author || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">price:</label>
            <input
              type="number"
              name="price"
              id="price"
              className="form-control form-control-sm"
              value={book.price || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="type_id" className="form-label">Type:</label>
            <select
              name="type_id"
              id="type_id"
              className="form-select form-select-sm"
              value={book.type_id || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Display the current image */}
          {book.image_url && (
            <div className="mb-3">
              <label className="form-label">Current Image:</label>
              <img
                src={book.image_url}
                alt="Book"
                className="img-fluid"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Image upload */}
          <div className="mb-3">
            <label htmlFor="image_url" className="form-label">Change Image:</label>
            <input
              type="file"
              name="image_url"
              id="image_url"
              className="form-control form-control-sm"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-sm center" style={{backgroundColor:'#f9525a'}}>Update Book</button>
        </form>
               {/* Image Section */}
           
      </div>
      <div className="cardi" style={{ width: "45%" }}>
                    <img 
                        src="/images/edit.png" 
                        alt="Add Book" 
                        className="img-fluid" 
                        style={{ height: "500px", objectFit: "cover",color:'#f9525a' }} 
                    />
                </div>
    </div>
  );
};

export default EditBook;
