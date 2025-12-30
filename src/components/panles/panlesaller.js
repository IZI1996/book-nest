import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { 
  MdPerson, 
  MdAccountCircle, 
  MdLogout, 
  MdSettings, 
  MdDashboard,
  MdAdd,
  MdBook,
  MdLibraryBooks,
  MdSearch,
  MdMenu,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';
import { FaBook, FaUser, FaCog } from 'react-icons/fa';
import '../../Dashboard.css';

function Saller() {
  const [searchTerm, setSearchTerm] = useState("");  
  const [username, setUsername] = useState(""); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
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
    localStorage.removeItem('userName');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
                localStorage.removeItem('userRole');

  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddBookClick = () => {
    navigate("/seller/add-book");
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
          <button 
            onClick={handleAddBookClick}
            className="btn btn-primary add-book-btn"
          >
            <MdAdd className="btn-icon" />
            Add New Book
          </button>
          
          <div className="nav-section-title">Seller</div>

          <a 
            href="/seller/store" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/seller/store');
            }}
          >
            <MdLibraryBooks className="nav-icon" />
            <span className="nav-text">My Library</span>
          </a>

          <a 
            href="/seller/add-book" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/seller/add-book');
            }}
          >
            <MdAdd className="nav-icon" />
            <span className="nav-text">Add Book</span>
          </a>

                 <a 
            href="/seller/add-book" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/seller/blog');
            }}
          >
            <MdAdd className="nav-icon" />
            <span className="nav-text"> Blog</span>
          </a>


          <div className="nav-section-title">Account</div>
          <a 
            href="/seller/profile" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/seller/profile');
            }}
          >
            <FaUser className="nav-icon" />
            <span className="nav-text">Profile</span>
          </a>
          
          <a 
            href="/seller/settings" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/seller/settings');
            }}
          >
            <FaCog className="nav-icon" />
            <span className="nav-text">Settings</span>
          </a>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="user-details">
              <div className="user-name">{username}</div>
              <div className="user-role">Seller</div>
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
                    <MdPerson size={24} />
                    <span>{username}</span>
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
                      navigate('/seller/store');
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

export default Saller;