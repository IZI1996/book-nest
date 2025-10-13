// components/pages/buyer/DashboardContent.jsx
import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import BookDetailModal from './bookDetails'; 

function Dashboard() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");  
  const [username, setUsername] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (!token) {
      alert('Please login first');
      return;
    }

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
      alert('Book added to cart successfully!');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddToFav = async (bookId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost/bookBack/favorite.php',
        { bookId },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      console.log(response);
      alert('Book added to favorites!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
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
                
                {/* حاوية الصورة مع تأثير Hover */}
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
                    }}
                  ></div>
                  
                  {/* زر التفاصيل الذي يظهر عند Hover */}
                  <button 
                    className="hover-detail-button"
                    onClick={() => handleViewDetails(book)}
                  >
                    <span>View Details</span>
                  </button>
                </div>
                
                {/* معلومات الكتاب تحت الصورة */}
  <div className="book-info-under text-center w-100 p-3 rounded-bottom shadow-sm">
<h6 className="card-title text-dark fw-bold mb-2" style={{ fontSize: "0.9rem" }}>
                    {book.title}
                  </h6> 
                  <p className="card-text text-muted small mb-2">{book.type_name}</p>
                  <p className="card-text text-success fw-bold mb-3">{book.price} DH</p>  
                  
                  <div className="d-flex justify-content-center gap-2">
                    <button 
                      onClick={() => handleAddToCart(book.id)}
                      className="btn btn-outline-primary btn-sm"
                      title="Add to Cart"
                    >
                      <FaShoppingCart />
                    </button>
                    
                    <button 
                      onClick={() => handleAddToFav(book.id)}
                      className="btn btn-outline-danger btn-sm"
                      title="Add to Favorites"
                    >
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-muted text-center w-100 py-5">No books found</p>
          </div>
        )}
      </div>

      {/* الـ Modal لتفاصيل الكتاب */}
      <BookDetailModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}

export default Dashboard;