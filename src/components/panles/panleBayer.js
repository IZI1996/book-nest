import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { 
  MdPerson, 
  MdAccountCircle, 
  MdLogout, 
  MdSettings, 
  MdDashboard,
  MdHome,
  MdCategory,
  MdFavorite,
  MdList,
  MdChecklist,
  MdMenu,
  MdSearch,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';
import { 
  FaShoppingCart, 
  FaHeart, 
  FaBook,
  FaUser,
  FaCog,
  FaList,
  FaCheck,
  FaBars
} from 'react-icons/fa';
import { 
  HiHome,
  HiUser,
  HiCog,
  HiViewList,
  HiCheckCircle
} from 'react-icons/hi';
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
        localStorage.removeItem('userId');
                localStorage.removeItem('userRole');


    setIsMenuOpen(false);
    navigate('/');
    setTimeout(() => {
      window.location.reload();
    }, 100);
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
            <FaBook className="icon" />
          </div>
          <span className="logo-text">BookStore</span>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarCollapsed ? (
              <MdChevronRight className="icon" />
            ) : (
              <MdChevronLeft className="icon" />
            )}
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
            <MdHome className="nav-icon" />
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
            <MdCategory className="nav-icon" />
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
            <MdFavorite className="nav-icon" />
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
            <MdList className="nav-icon" />
            <span className="nav-text">Books List</span>
          </a>


  <a 
            href="/buyer/ListBlogs" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/buyer/ListBlogs');
            }}
          >
            <MdList className="nav-icon" />
            <span className="nav-text">Blogs List</span>
          </a>



          <a 
            href="/buyer/checklist" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/buyer/checklist');
            }}
          >
            <MdChecklist className="nav-icon" />
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
              <MdMenu className="icon" />
            </button>
            <div className="search-box">
              <MdSearch className="search-icon" />
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
                <div className="dropdown-menu show">
                  <div className="menu-header">
                    <MdPerson size={20} />
                    <span>Signed in as</span>
                  </div>
                  <div className="menu-header">
                    <strong>{username}</strong>
                  </div>
                  
                  <div className="menu-divider"></div>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      navigate('/seller');
                      setIsMenuOpen(false);
                    }}
                  >
                    <MdDashboard size={18} />
                    <span>Dashboard</span>
                  </button>
                  
                  <button 
                    className="menu-item"
                    onClick={() => {
                      navigate('/seller/library');
                      setIsMenuOpen(false);
                    }}
                  >
                    <MdSettings size={18} />
                    <span>My Library</span>
                  </button>
                  
                  <div className="menu-divider"></div>
                  
                  <button 
                    className="menu-item logout-item" 
                    onClick={() => {
                      handleLogout();
                      navigate('/auth/login');
                    }}
                  >
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Bayer;