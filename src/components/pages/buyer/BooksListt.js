import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CartIcon from './../buyer/CartIcon'
import { MdPerson, MdAccountCircle, MdLogout, MdSettings, MdDashboard,FiHeart,  } from 'react-icons/md';
import { FaShoppingCart,FaHeart } from 'react-icons/fa';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");  
  const [refreshCart, setRefreshCart] = useState(false);
  const [username, setUsername] = useState(""); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooksAndTypes();
    const storedUsername = localStorage.getItem("userName");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo-icon">◆</span> 
          <span className="logo-text">Mantis</span>
        </div>
        
        <nav className="sidebar-nav">
          <p className="nav-section-title">Navigation</p>
          <a href="#" className="nav-link active">
            Dashboard
          </a>

          <p className="nav-section-title">Authentication</p>
          <a href="#" className="nav-link">
            Login
          </a>
          <a href="#" className="nav-link">
            Register
          </a>

          <p className="nav-section-title">Utilities</p>
          <a href="#" className="nav-link">
            Typography
          </a>
          <a href="#" className="nav-link">
            Color
          </a>
          <a href="#" className="nav-link">
            Shadow
          </a>

          <p className="nav-section-title">Support</p>
          <a href="#" className="nav-link active">
            Sample Page
          </a>
          <a href="#" className="nav-link">
            Documentation
          </a>
        </nav>
        
        <footer className="sidebar-footer">
          © All rights reserved <span className="footer-highlight">CodedThemes</span>
        </footer>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="navbar-left">
            <button className="menu-toggle">
              <span>☰</span>
            </button>
            <div className="search-box">
              <input
                type="text"
                placeholder="Ctrl + K"
                className="search-input"
              />
            </div>
          </div>
          
          <div className="navbar-right">
            <CartIcon refresh={refreshCart} />

            <div className="user-menu-container" ref={menuRef}>
              <button className="user-trigger" onClick={toggleMenu}>
                <div className="user-profile">
                  <MdAccountCircle size={28} />
                  <span className="user-name">{username}</span>
                  <span className={`dropdown-arrow ${isMenuOpen ? 'open' : ''}`}>▼</span>
                </div>
              </button>

              {isMenuOpen && (
                <div className="dropdown-menu">
                  <div className="menu-header">
                    <MdPerson size={24} />
                    <span>{username}</span>
                  </div>
                  
                  <div className="menu-divider"></div>
                  
                  <button className="menu-item">
                    <MdDashboard size={18} />
                    <span>لوحة التحكم</span>
                  </button>
                  
                  <button className="menu-item">
                    <MdSettings size={18} />
                    <span>الإعدادات</span>
                  </button>
                  
                  <div className="menu-divider"></div>
                  
                  <button className="menu-item logout-item" onClick={handleLogout}>
                    <MdLogout size={18} />
                    <span>تسجيل خروج</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
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
<div className="card-library row row-cols-1 row-cols-md-4 g-5">
  {filteredBooks.length > 0 ? (
    filteredBooks.map((book) => (
      <div className="col" key={book.id}>
        {/* حاوية الكتاب الرئيسية */}
        <div className="book-card-container d-flex flex-column align-items-center">
            <div className="book-image-wrapper position-relative">
          {/* صورة الكتاب فقط */}
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
          
          {/* معلومات الكتاب تحت الصورة */}
          <div className="book-info-under   text-center ">
            <h5 className="card-title text-dark fw-bold ">{book.title}</h5> 
            <p className="card-text ">{book.type_name}</p>  
            <p className="card-text  ">{book.price} DH</p>  
            <button 
              onClick={() => handleAddToCart(book.id)}
              className="btn  btn-sm" 
            >
       <FaShoppingCart className="me-2" color="red" />
   </button>
       <FaHeart className="me-2" color="red" />
            <button 
          className="hover-detail-button"
        >
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
        </main>
      </div>
    </div>
  );
}

export default Dashboard;