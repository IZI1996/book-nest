import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom"; // ✅ أضيفي Outlet هنا
import { MdPerson, MdAccountCircle, MdLogout, MdSettings, MdDashboard } from 'react-icons/md';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import '../../Dashboard.css';
import CartIcon from '../pages/buyer/CartIcon'
import axios from "axios";

function Bayer() {
  const [books, setBooks] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");  
  const [refreshCart, setRefreshCart] = useState(false);
  const [username, setUsername] = useState(""); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-icon">
            <i className="fas fa-book"></i>
          </div>
          <span className="logo-text">BookStore</span>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <i className={`fas fa-${isSidebarCollapsed ? 'angle-double-right' : 'angle-double-left'}`}></i>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section-title">Main</div>
          <a 
            href="/buyer" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/buyer');
            }}
          >
            <i className="fas fa-home"></i>
            <span className="nav-text">Dashboard</span>
          </a>
          
          <div className="nav-section-title">User</div>
          <a 
            href="/buyer/categories" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/buyer/categories');
            }}
          >
            <i className="fas fa-user"></i>
            <span className="nav-text">Category</span>
          </a>
          
          <a 
            href="/buyer/fav" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/buyer/fav');
            }}
          >
            <i className="fas fa-cog"></i>
            <span className="nav-text">Wishlist</span>
          </a>

          <a 
            href="/buyer/List" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/buyer/List');
            }}
          >
            <i className="fas fa-list"></i>
            <span className="nav-text">Books List</span>
          </a>

          <a 
            href="/buyer/checklist" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/buyer/checklist');
            }}
          >
            <i className="fas fa-check"></i>
            <span className="nav-text">Checklist</span>
          </a>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="user-details">
              <div className="user-name">{username}</div>
              <div className="user-role">User</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="navbar-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <i className="fas fa-bars"></i>
            </button>
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search books..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <div className="navbar-right">
            <CartIcon />

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
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      navigate('/buyer');
                      setIsMenuOpen(false);
                    }}
                  >
                    <MdDashboard size={18} />
                    <span>Dashboard</span>
                  </button>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      navigate('/buyer/fav');
                      setIsMenuOpen(false);
                    }}
                  >
                    <MdSettings size={18} />
                    <span>Wishlist</span>
                  </button>
                  
                  <div className="menu-divider"></div>
                  
                  <button className="menu-item logout-item" onClick={handleLogout}>
                    <MdLogout size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>
          {/* ✅ هذا هو المكان السحري - المحتوى يتغير حسب الرابط */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Bayer;