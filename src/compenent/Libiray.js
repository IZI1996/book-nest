import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is included

const Library = () => {
    const [books, setBooks] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");  // To hold the selected book type
    const navigate = useNavigate(); // To navigate to other pages

    // Fetch books and types when the component mounts
    useEffect(() => {
        const fetchBooksAndTypes = async () => {
            try {
                const booksRes = await fetch("http://localhost/bookBack/select.php"); // Adjust URL as needed
                const booksData = await booksRes.json();
                setBooks(booksData);

                const typesRes = await fetch("http://localhost/bookBack/types.php"); // Adjust URL as needed
                const typesData = await typesRes.json();
                setTypes(typesData);
            } catch (error) {
                console.error("Error fetching books or types:", error);
            }
        };

        fetchBooksAndTypes();
    }, []);

    // Handle the type filter change
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);  // Update selected type
    };

    // Filter the books based on the selected type
    const filteredBooks = selectedType
        ? books.filter((book) => book.type_name === selectedType)  // Filter by selected type
        : books;  // If no type is selected, show all books

    // Navigate to Edit Book page
    const handleEditClick = (bookId) => {
        navigate(`/edit/${bookId}`); // Navigate to edit page with the book ID
    };

    // Navigate to Add Book page
    const handleAddBookClick = () => {
        navigate("/add"); // Navigate to add book page
    };

    return (
        <div className="container mt-5">
            {/* Add Book button at the top-right of the page */}
            <div className="text-end mt-4 mb-4">
                <button 
                    onClick={handleAddBookClick}
                    className="btn btn-primary btn-lg"
                    style={{ marginTop: "70px" ,backgroundColor:'#f9525a'}}  // Added margin for spacing
                >
                    Add Book
                </button>
            </div>

            {/* Title and Dropdown aligned to the left */}
            <div className="row">
                <div className="col-md-4">
                    <div className="mb-4">
                        <label htmlFor="typeFilter" className="form-label ">Filter by Type:</label>
                        <select
                            id="typeFilter"
                            value={selectedType}
                            onChange={handleTypeChange}
                            className="form-select"
                        >
                            <option value="">All</option>
                            {types.map((type) => (
                                <option key={type.id} value={type.name}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Display the filtered books */}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredBooks.map((book, index) => (
                    <div className="col" key={index}>
                        <div className="card shadow-sm">
                            <div className="card-img-top">
                                {/* Display image if available */}
                                {book.image_url ? (
                                    <img
                                        src={`http://localhost/bookBack/${book.image_url}`}  // Correct image URL reference
                                        alt={book.title}
                                        className="card-img-top"
                                        style={{ height: "250px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <p className="text-center mt-3">No image available</p>
                                )}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">Author: {book.author}</p>
                                <p className="card-text">Year: {book.year}</p>
                                <p className="card-text">Type: {book.type_name}</p>
                                {/* Edit button */}
                                <button 
                                    onClick={() => handleEditClick(book.id)}
                                    className="btn btn-warning w-100" style={{backgroundColor:'#f9525a'}}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
