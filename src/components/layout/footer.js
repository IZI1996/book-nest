// components/shared/ContactFooter.js
import React from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeart
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer 
      className="contact-footer" 
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/bgfooter.jpg)`
      }}
    >
      {/* Overlay */}
      <div className="footer-overlay"></div>
      
      <div className="container">
        <div className="row">
          {/* Contact Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="footer-section">
              <div className="footer-brand">
                <h3>BookNest</h3>
                <p>Your trusted partner in discovering amazing books and connecting readers worldwide.</p>
              </div>
              <div className="contact-info">
                <div className="contact-item">
                </div>
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <span>+212 600 000 000</span>
                </div>
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <span>info@booknest.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/books">Books</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-section">
              <h4>Follow Us</h4>
              <p>Stay connected with our community</p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <FaFacebookF />
                </a>
                <a href="#" className="social-link">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="footer-section">
              <h4>Newsletter</h4>
              <p>Subscribe to get updates on new books and offers</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="form-control"
                />
                <button className="btn btn-primary btn-subscribe">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="row">
            <div className="col-12 text-center">
              <p>
                &copy; 2025 BookNest. All rights reserved. 
                Made with <FaHeart className="heart-icon" /> for readers
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;