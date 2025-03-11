import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

const Library = () => {
    const [books, setBooks] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooksAndTypes();
    }, []);

    const fetchBooksAndTypes = async () => {
        try {
            const booksRes = await fetch("http://localhost/bookBack/select.php");
            const booksData = await booksRes.json();
            setBooks(booksData);

            const typesRes = await fetch("http://localhost/bookBack/types.php");
            const typesData = await typesRes.json();
            setTypes(typesData);
        } catch (error) {
            console.error("Error fetching books or types:", error);
        }
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const filteredBooks = selectedType
        ? books.filter((book) => book.type_name === selectedType)
        : books;

    const handleEditClick = (bookId) => {
        navigate(`/edit/${bookId}`);
    };

    const handleAddBookClick = () => {
        navigate("/add");
    };

    const handleDelete = async (bookId) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                const response = await fetch(`http://localhost/bookBack/delete.php?id=${bookId}`, {
                    method: "DELETE",
                });

                const result = await response.json();
                if (result.success) {
                    setBooks(books.filter(book => book.id !== bookId)); // Remove from UI
                } else {
                    alert("Failed to delete the book.");
                }
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="text-end mt-4 mb-4">
                <button 
                    onClick={handleAddBookClick}
                    className="btn btn-secondary"
                    style={{ marginTop: "90px" }} 
                >
                    Add Book
                </button>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="mb-4 text-lg-start ">
                        <label htmlFor="typeFilter" className="form-label  ">Filter by Type:</label>
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

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredBooks.map((book) => (
                    <div className="col" key={book.id}>
                        <div className="card shadow-sm">
                            {book.image_url ? (
                                <img
                                    src={`http://localhost/bookBack/${book.image_url}`}
                                    alt={book.title}
                                    className="card-img-top"
                                    style={{ height: "250px", objectFit: "cover" }}
                                />
                            ) : (
                                <p className="text-center mt-3">No image available</p>
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">Author: {book.author}</p>
                                <p className="card-text">Year: {book.year}</p>
                                <p className="card-text">Type: {book.type_name}</p>
                                
                                <div className="d-flex gap-2">
                                    <button 
                                        onClick={() => handleEditClick(book.id)}
                                        className="btn btn-secondary w-50"
                                        // style={{ backgroundColor: '#f9525a' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(book.id)}
                                        className="btn btn-danger w-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
