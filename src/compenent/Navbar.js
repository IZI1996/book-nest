import React from "react";
import { Link } from "react-router-dom"; // If using React Router

const Header = () => {
  return (
    <header id="header" className="header fixed-top">
      <div className="container d-flex justify-content-between">
        <div className="logo d-flex align-items-center">
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`}  />
        </div>

        {/* Navbar */}
        <nav id="navbar" className="navbar mx-ml">
          <ul>
            <li>
              <Link className="active" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/libiray">Library</Link>
            </li>
            <li>
              <Link to="/navigation">La</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
