import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdPerson, MdAccountCircle, MdLogout, MdSettings, MdDashboard } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css"; 

const Library = () => {
    const [books, setBooks] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [username, setUsername] = useState(""); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activePage, setActivePage] = useState("dashboard");
    const [refreshCart, setRefreshCart] = useState(false);
    
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
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handlePageChange = (pageId) => {
        setActivePage(pageId);
        if (window.innerWidth <= 768) {
            setIsSidebarCollapsed(true);
        }
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

    // Filter books based on both name and type
    const filteredBooks = books.filter((book) => {
        const isTypeMatch = selectedType ? book.type_name === selectedType : true;
        const isSearchMatch =
            (book.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            book.type_name?.toLowerCase().includes(searchTerm.toLowerCase()));
        return isTypeMatch && isSearchMatch;
    });

    const handleEditClick = (bookId) => {
        navigate(`/edit/${bookId}`);
    };

    const handleAddBookClick = () => {
        navigate("/add");
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
        }, [refreshCart]);
        
        return (
            <div className="cart-icon">
                <FaShoppingCart size={20} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
        );
    };

    const renderPageContent = () => {
        switch(activePage) {
            case "dashboard":
                return (
                    <div className="page-content">
                        <div className="container">
                            <div className="text-end mt-4 mb-4">
                                <button 
                                    onClick={handleAddBookClick}
                                    className="btn btn-secondary"
                                    style={{ marginTop: "140px" }} 
                                >
                                    Add Book
                                </button>
                            </div>

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

                            <div className="card-library row row-cols-1 row-cols-md-3" style={{rowGap: '9rem'}}>
                                {filteredBooks.length > 0 ? (
                                    filteredBooks.map((book) => (
                                        <div className="col" key={book.id}>
                                            <div 
                                                className="shadow-lg position-relative d-flex flex-column align-items-center"
                                                style={{
                                                    backgroundImage: book.image_url ? `url(http://localhost/bookBack/${book.image_url})` : 'none',
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
                                                <div className="position-absolute w-100 p-3 text-center rounded-bottom" style={{marginTop:'400px'}}>
                                                    <h5 className="card-title">{book.title}</h5>
                                                    <p className="card-text">{book.type_name}</p>
                                                    <button 
                                                        onClick={() => handleEditClick(book.id)}
                                                        className="btn btn-outline-secondary btn-sm me-2 w-45"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(book.id)}
                                                        className="btn btn-outline-danger btn-sm w-45"
                                                    >
                                                        Delete
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
                    </div>
                );
            
            case "profile":
                return (
                    <div className="page-content">
                        <h2>User Profile</h2>
                        <div className="card">
                            <div className="card-body">
                                <p>Profile information will be displayed here.</p>
                            </div>
                        </div>
                    </div>
                );
            
            case "settings":
                return (
                    <div className="page-content">
                        <h2>Settings</h2>
                        <div className="card">
                            <div className="card-body">
                                <p>Application settings will be displayed here.</p>
                            </div>
                        </div>
                    </div>
                );
            
            default:
                return (
                    <div className="page-content">
                        <h2>Dashboard</h2>
                        <div className="card">
                            <div className="card-body">
                                <p>Select an option from the sidebar to get started.</p>
                            </div>
                        </div>
                    </div>
                );
        }
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
                        href="#!" 
                        className={`nav-link ${activePage === "dashboard" ? "active" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange("dashboard");
                        }}
                    >
                        <i className="fas fa-home"></i>
                        <span className="nav-text">Dashboard</span>
                    </a>
                    
                    <div className="nav-section-title">User</div>
                    <a 
                        href="#!" 
                        className={`nav-link ${activePage === "profile" ? "active" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange("profile");
                        }}
                    >
                        <i className="fas fa-user"></i>
                        <span className="nav-text">Profile</span>
                    </a>
                    
                    <a 
                        href="#!" 
                        className={`nav-link ${activePage === "settings" ? "active" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange("settings");
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
                                            handlePageChange("dashboard");
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        <MdDashboard size={18} />
                                        <span>Dashboard</span>
                                    </button>
                                    
                                    <button 
                                        className="menu-item"
                                        onClick={() => {
                                            handlePageChange("settings");
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        <MdSettings size={18} />
                                        <span>Settings</span>
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
                    {renderPageContent()}
                </main>
            </div>
        </div>
    );
};

export default Library;