import React from "react";
import { Link } from "react-router-dom"; // If using React Router

const Header = () => {
  return (
    <header id="header" className="header fixed-top">
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Logo */}
        <div className="logo d-flex align-items-center">
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" />
        </div>

        {/* Navbar with margin-right for spacing */}
        <nav id="navbar" className="navbar ms-auto">
          <ul className="d-flex gap-4 mb-0">
            <li><Link className="active" to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/libiray">Library</Link></li>
          
          </ul>
        </nav>

        {/* Buttons for Register & Login with more spacing */}
        <div className="d-flex gap-4 ms-5">
          <Link to="/reg">
            <button className="btn btn-primary px-4" style={{backgroundColor:'#f9525a'}}>Register</button>
          </Link>
          <Link to="/log">
            <button className="btn btn-outline-primary px-4" style={{border:'solid #f9525a 2px'}}>Login</button>
          </Link>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
