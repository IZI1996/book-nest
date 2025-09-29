// components/pages/buyer/DashboardContent.jsx
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");  
  const [username, setUsername] = useState(""); 

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

  const filteredBooks = books.filter((book) => {
    const isTypeMatch = selectedType ? book.type_name === selectedType : true;
    const isSearchMatch =
      (book.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.type_name?.toLowerCase().includes(searchTerm.toLowerCase()));
    return isTypeMatch && isSearchMatch;
  });

  const handleAddToCart = async (bookId) => {
    const token = localStorage.getItem("token"); 
    try {
        const response = await fetch("http://localhost/bookBack/cart.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ bookId })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
  };

  return (
    <div className="page-content">
      <div className="row">
        <div className="text-start mb-4">
          <h2>Welcome, {username}!</h2>
          <p className="text-muted">Browse our collection of books</p>
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
      
      <div className="card-library row row-cols-1 row-cols-md-4 g-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="col" key={book.id}>
              <div className="book-card-container d-flex flex-column align-items-center">
                <div className="book-image-wrapper position-relative">
                  <div 
                    className="book-image shadow-lg"
                    style={{
                      backgroundImage: `url(http://localhost/bookBack/${book.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "300px",
                      width: "200px",
                      borderRadius: "10px 10px 0 0",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  ></div>
                  
                  <div className="book-info-under text-center">
                    <h5 className="card-title text-dark fw-bold">{book.title}</h5> 
                    <p className="card-text">{book.type_name}</p>  
                    <p className="card-text">{book.price} DH</p>  
                    <button 
                      onClick={() => handleAddToCart(book.id)}
                      className="btn btn-sm" 
                    >
                      <FaShoppingCart className="me-2" />
                    </button>
                    <FaHeart className="me-2" color="red" />
                    <button className="hover-detail-button">
                      <span>detail</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center w-100">No books found</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;