import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true); 
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInternalNavigation = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <header id="header" className={`header fixed-top ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* اللوجو */}
        <div className="logo d-flex align-items-center">
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" />
        </div>

        {/* التنقل */}
        <nav className="navbar ms-auto">
          <ul className="d-flex gap-4 mb-0 list-unstyled">
            <li className="nav-item">
              <span 
                className="nav-text-link"
                onClick={() => handleInternalNavigation('hero')}
              >
                Home
              </span>
            </li>
            <li className="nav-item">
              <span 
                className="nav-text-link"
                onClick={() => handleInternalNavigation('about')}
              >
                About
              </span>
            </li>
            <li className="nav-item">
              <span 
                className="nav-text-link"
                onClick={() => handleInternalNavigation('services')}
              >
                Services
              </span>
            </li>
            <li className="nav-item">
              <span 
                className="nav-text-link"
                onClick={() => handleInternalNavigation('contact')}
              >
                Contact Us
              </span>
            </li>
          </ul>
        </nav>

        {/* الأزرار */}
        <div className="d-flex gap-4 ms-5">
          <Link to="/auth/register">
            <button className="btn btn-primary px-4" style={{ backgroundColor: '#f9525a', border: 'none' }}>
              Register
            </button>
          </Link>
          <Link to="/auth/login">
            <button className={`btn px-4 ${isScrolled ? 'btn-outline-primary' : 'btn-outline-light'}`} 
              style={{ 
                border:'solid #f9525a 2px',
                color: '#f9525a',
                backgroundColor: 'transparent'
              }}>
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* إضافة CSS داخلي */}
      <style jsx>{`
        .nav-text-link {
          color: #000000; /* أسود */
          cursor: pointer;
          padding: 10px 0;
          font-family: "Nunito", sans-serif;
          font-size: 16px;
          font-weight: 700;
          transition: 0.3s;
          text-decoration: none;
          display: block;
          background: none;
          border: none;
        }

        .nav-text-link:hover {
          color: #f9525a;
        }

        /* عندما الـ Header ليس scrolled */
        .header:not(.header-scrolled) .nav-text-link {
          color: #000000; /* يبقى أسود */
        }

        .header:not(.header-scrolled) .nav-text-link:hover {
          color: #f9525a;
        }

        /* عندما الـ Header scrolled */
        .header.header-scrolled .nav-text-link {
          color: #000000; /* يبقى أسود */
        }

        .header.header-scrolled .nav-text-link:hover {
          color: #f9525a;
        }

        /* تحسين responsive */
        @media (max-width: 768px) {
          .nav-text-link {
            font-size: 14px;
            padding: 8px 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;