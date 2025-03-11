import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true); 
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<header id="header" className={`header fixed-top ${isSticky ? "sticky" : "" }`}>

      <div className="container d-flex justify-content-between align-items-center ixed">
        
        {/* Logo */}
        <div className="logo d-flex align-items-center">
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" />
        </div>

        {/* Navbar */}
        <nav className="navbar ms-auto">
          <ul className="d-flex gap-4 mb-0">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/libiray">Library</Link></li>
          </ul>
        </nav>

        {/* Buttons */}
        <div className="d-flex gap-4 ms-5">
          <Link to="/reg">
            <button className="btn btn-primary px-4" style={{ backgroundColor: '#f9525a' }}>Register</button>
          </Link>
          <Link to="/log">
            <button className="btn btn-outline-primary px-4" style={{ border: 'solid #f9525a 2px' }}>Login</button>
          </Link>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
