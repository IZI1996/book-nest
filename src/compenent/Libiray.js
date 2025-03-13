import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

const Library = () => {
    const [books, setBooks] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [username, setUsername] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooksAndTypes();
        const storedUsername = localStorage.getItem("name");
        if (storedUsername) {
            setUsername(storedUsername);
        }
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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter books based on both name and type
    const filteredBooks = books.filter((book) => {
        const isTypeMatch = selectedType ? book.type_name === selectedType : true;
        const isSearchMatch =
            (book.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            book.type_name?.toLowerCase().includes(searchTerm.toLowerCase()));
        return isTypeMatch && isSearchMatch;
    });

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
                    setBooks(books.filter(book => book.id !== bookId));
                } else {
                    alert("Failed to delete the book.");
                }
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        }
    };

    return (
        <div className="container " >
  
            <div className="text-end mt-4 mb-4">
                <button 
                    onClick={handleAddBookClick}
                    className="btn btn-secondary"
                    style={{ marginTop: "140px" }} 
                >
                    Add Book
                </button>
            </div>

            <div className="row">
            <div className="text-start mb-4">
                <h2>Welcome, {username}!</h2>
            </div>

                <div className="col-md-4">
          
                    <div className="mb-4 text-lg-start">
                        <label htmlFor="typeFilter" className="form-label">Filter by Type:</label>
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

                <div className="col-md-4">
                    <div className="mb-4 text-lg-start">
                        <label htmlFor="searchBar" className="form-label">Search Books:</label>
                        <input
                            id="searchBar"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control"
                            placeholder="Search by name or type..."
                        />
                    </div>
                </div>
            </div>

            <div className="card-library row row-cols-1 row-cols-md-3" style={{rowGap: '9rem'}}>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <div className="col" key={book.id}>
                            <div 
                                className="shadow-lg position-relative d-flex flex-column align-items-center"
                                style={{
                                    backgroundImage: book.image_url ? `url(http://localhost/bookBack/${book.image_url})` : 'none',
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "400px",
                                    width: "250px",
                                    borderRadius: "10px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                    margin: "auto",
                                    paddingBottom: "60px"
                                }}
                            >
                                <div className="position-absolute  w-100 p-3 text-center rounded-bottom" style={{marginTop:'400px'}} >
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text">{book.type_name}</p>
                                    <button 
                                        onClick={() => handleEditClick(book.id)}
                                        className="btn btn-outline-secondary btn-sm me-2 w-45"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(book.id)}
                                        className="btn btn-outline-danger btn-sm w-45"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No books found</p>
                )}
            </div>
        </div>
    );
};

export default Library;
