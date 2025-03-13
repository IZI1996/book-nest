import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import CartIcon from "./CartIcon";

const Store = () => {
    const [books, setBooks] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");  
    const [refreshCart, setRefreshCart] = useState(false);

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

    // Handle search input
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

    const handleAddToCart = async (bookId) => {
        try {
            const response = await fetch("http://localhost/bookBack/cart.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookId: bookId,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setRefreshCart(prev => !prev); 
                alert("Book added to cart!");
            
            } else {
                alert("Failed to add book to cart.");
            }
        } catch (error) {
            console.error("Error adding book to cart:", error);
        }
    };

    return (
        <div className="container mt-5"  >
            <div className="text-end mb-4">
    
                <div className="container "  style={{ marginTop: "140px" }}>
           
            <CartIcon refresh={refreshCart} />
        </div>
            </div>

            <div className="row"  >
                <div className="col-md-4" >
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

            <div className="card-libary row row-cols-1 row-cols-md-3">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <div className="col" key={book.id} style={{rowGap:'50px'}}>
                            <div 
                                className="shadow-lg position-relative d-flex flex-column align-items-center"
                                style={{
                                    backgroundImage: `url(http://localhost/bookBack/${book.image_url})`,
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
-                                    <button 
                                        onClick={() => handleAddToCart(book.id)}
                                        className="btn btn-outline-success btn-sm w-45"
                                    >
                                        Add to Cart
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

export default Store;
