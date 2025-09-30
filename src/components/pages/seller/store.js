import { useState, useEffect } from "react";
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
        const storedUsername = localStorage.getItem("userName");
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
        navigate(`/seller/edit-book/${bookId}`);
    };


    const handleDelete = async (bookId) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                const response = await fetch(`http://localhost/bookBack/delete.php`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: bookId }),
                });
    
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
                }
    
                const result = await response.json();
    
                if (result.success) {
                    alert("Book deleted successfully!");
                    fetchBooksAndTypes();
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error("Delete error:", error);
                alert("Error: " + error.message); 
            }
        }
    };

    return (
        <div className="page-content">
            <div className="container">
         
                <div className="row">
                    <div className="text-start mb-4">
                        <h2>My Library, {username}!</h2>
                        <p className="text-muted">Manage your book collection</p>
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
                                <option value="">All Types</option>
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
                                placeholder="Search by title or type..."
                            />
                        </div>
                    </div>
                </div>

                {/* تصميم مشابه لـ Dashboard */}
                <div className="card-library row row-cols-1 row-cols-md-4 g-4">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <div className="col" key={book.id}>
                                <div className="book-card-container d-flex flex-column align-items-center">
                                    <div className="book-image-wrapper position-relative">
                                        <div 
                                            className="book-image shadow-lg"
                                            style={{
                                                backgroundImage: book.image_url ? `url(http://localhost/bookBack/${book.image_url})` : 'none',
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                height: "300px",
                                                width: "200px",
                                                borderRadius: "10px 10px 0 0",
                                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                            }}
                                        ></div>
                                        
                                        <div className="book-info-under text-center p-3">
                                            <h5 className="card-title text-dark fw-bold mb-2">{book.title}</h5> 
                                            <p className="card-text text-muted mb-1">{book.type_name}</p>  
                                            <p className="card-text text-primary fw-bold mb-3">{book.price} DH</p>  
                                            
                                            <div className="d-flex justify-content-center gap-2">
                                                <button 
                                                    onClick={() => handleEditClick(book.id)}
                                                    className="btn btn-outline-primary btn-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(book.id)}
                                                    className="btn btn-outline-danger btn-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted">No books found in your library</p>
                          
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Library;