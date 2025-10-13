import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

const Library = () => {
    const [books, setBooks] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [username, setUsername] = useState(""); 
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooksAndTypes();
        const storedUsername = localStorage.getItem("userName");
        const storedUserId = localStorage.getItem("userId");
        
        if (storedUsername) {
            setUsername(storedUsername);
        }
        
        if (!storedUserId) {
            alert("Please login to view your library");
            navigate("/login");
        }
    }, []);

    const fetchBooksAndTypes = async () => {
        try {
            setLoading(true);
            const sellerId = localStorage.getItem("userId");
            console.log(sellerId)
            
            if (!sellerId) {
                alert("User ID not found");
                return;
            }

            // Fetch books by seller
            const booksRes = await fetch(`http://localhost/bookBack/selectbook.php?user_id=${sellerId}`);
            const booksData = await booksRes.json();
            setBooks(booksData);
          console.log(booksRes)
            // Fetch types for filter
            const typesRes = await fetch("http://localhost/bookBack/types.php");
            const typesData = await typesRes.json();
            setTypes(typesData);
        } catch (error) {
            console.error("Error fetching books or types:", error);
        } finally {
            setLoading(false);
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
             book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="page-content">
                <div className="container">
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading your library...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-content" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="container py-4">
                {/* Header Section */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body py-4">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <h2 className="card-title mb-2 text-primary">📚 My Library</h2>
                                        <p className="text-muted mb-0">Welcome back, <strong>{username}</strong>! Manage your book collection</p>
                                    </div>
                                    <div className="col-md-4 text-md-end">
                                        <span className="badge bg-primary fs-6">
                                            {filteredBooks.length} {filteredBooks.length === 1 ? 'Book' : 'Books'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <label htmlFor="typeFilter" className="form-label fw-semibold">Filter by Type:</label>
                                <select
                                    id="typeFilter"
                                    value={selectedType}
                                    onChange={handleTypeChange}
                                    className="form-select border-primary"
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
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <label htmlFor="searchBar" className="form-label fw-semibold">Search Books:</label>
                                <input
                                    id="searchBar"
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="form-control border-primary"
                                    placeholder="Search by title, author, or type..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm">
                         
                        </div>
                    </div>
                </div>

                {/* Books Table */}
                <div className="card border-0 shadow-lg ">
                    <div className="card-header  text-white py-3 " style={{backgroundColor:'#f9525a'}}>
                        <h5 className="card-title mb-0">📖 Your Book Collection</h5>
                    </div>
                    <div className="card-body p-0">
                        {filteredBooks.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col" className="ps-4">Book Cover</th>
                                            <th scope="col">Title & Author</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Added Date</th>
                                            <th scope="col" className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredBooks.map((book) => (
                                            <tr key={book.id} className="align-middle">
                                                <td className="ps-4">
                                                    <div 
                                                        className="book-cover rounded"
                                                        style={{
                                                            backgroundImage: book.image_url ? `url(http://localhost/bookBack/${book.image_url})` : 'url(/default-book-cover.jpg)',
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                            width: "60px",
                                                            height: "80px",
                                                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                                        }}
                                                    ></div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <h6 className="mb-1 text-dark fw-bold">{book.title}</h6>
                                                        <p className="mb-0 text-muted small">by {book.author}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge bg-info text-dark">{book.type_name}</span>
                                                </td>
                                                <td>
                                                    <span className="fw-bold text-success">{book.price} DH</span>
                                                </td>
                                                <td>
                                                    <small className="text-muted">
                                                        {formatDate(book.created_at)}
                                                    </small>
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group" role="group">
                                                        <button 
                                                            onClick={() => handleEditClick(book.id)}
                                                            className="btn btn-outline-primary btn-sm me-2"
                                                            title="Edit Book"
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(book.id)}
                                                            className="btn btn-outline-danger btn-sm"
                                                            title="Delete Book"
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <div className="mb-4">
                                    <i className="fas fa-book-open fa-3x text-muted"></i>
                                </div>
                                <h5 className="text-muted mb-3">No books found</h5>
                                <p className="text-muted mb-4">
                                    {books.length === 0 
                                        ? "You haven't added any books to your library yet." 
                                        : "No books match your search criteria."}
                                </p>
                                {books.length === 0 && (
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => navigate('/seller/add-book')}
                                    >
                                        Add Your First Book
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Statistics */}
                {filteredBooks.length > 0 && (
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body py-3">
                                    <div className="row text-center">
                                        <div className="col-md-3">
                                            <h6 className="text-primary mb-1">Total Books</h6>
                                            <p className="h4 mb-0">{filteredBooks.length}</p>
                                        </div>
                                        <div className="col-md-3">
                                            <h6 className="text-success mb-1">Total Value</h6>
                                            <p className="h4 mb-0">
                                                {filteredBooks.reduce((sum, book) => sum + parseFloat(book.price), 0)} DH
                                            </p>
                                        </div>
                                        <div className="col-md-3">
                                            <h6 className="text-info mb-1">Categories</h6>
                                            <p className="h4 mb-0">
                                                {new Set(filteredBooks.map(book => book.type_name)).size}
                                            </p>
                                        </div>
                                        <div className="col-md-3">
                                            <h6 className="text-warning mb-1">Latest Addition</h6>
                                            <p className="h6 mb-0">
                                                {filteredBooks.length > 0 ? formatDate(filteredBooks[filteredBooks.length - 1].created_at) : '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Library;