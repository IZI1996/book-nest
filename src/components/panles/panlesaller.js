import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { MdPerson, MdAccountCircle, MdLogout, MdSettings, MdDashboard } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

      const handleAddBookClick = () => {
        navigate("/seller/add-book");
    };

  // Cart Icon Component
  const CartIcon = () => {
    const [cartCount, setCartCount] = useState(0);
    
    useEffect(() => {
      const fetchCartCount = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const response = await fetch("http://localhost/bookBack/cart_count.php", {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            });
            const data = await response.json();
            setCartCount(data.count || 0);
          } catch (error) {
            console.error("Error fetching cart count:", error);
          }
        }
      };
      
      fetchCartCount();
    }, []);
    
    return (
      <div className="cart-icon">
        <FaShoppingCart size={20} />
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </div>
    );
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
              <button 
                        onClick={handleAddBookClick}
                        className="btn btn-primary "style={{marginLeft:'17px'}}
                    >
                        + Add New Book
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
            <i className="fas fa-book"></i>
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
            <i className="fas fa-plus"></i>
            <span className="nav-text">Add Book</span>
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
            <i className="fas fa-user"></i>
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
            <i className="fas fa-cog"></i>
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
          {/* ✅ هنا سيظهر Library والمحتوى الآخر */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Saller;