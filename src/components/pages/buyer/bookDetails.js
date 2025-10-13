// src/components/BookDetailModal/BookDetailModal.jsx
import React from 'react';
import { FaTimes, FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';

const BookDetailModal = ({ book, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* رأس الـ Modal */}
        <div className="modal-header">
          <h2>Book Details</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* محتوى الـ Modal */}
        <div className="modal-body">
          
          {/* الصورة والمعلومات */}
          <div className="book-detail-grid">
            
            {/* قسم الصورة */}
            <div className="book-image-section">
              <img 
                src={`http://localhost/bookBack/${book.image_url}`} 
                alt={book.title}
                className="book-image"
              />
            </div>

            {/* قسم التفاصيل */}
            <div className="book-info-section">
              <h1 className="book-title">{book.title}</h1>
              <p className="book-author">By {book.author}</p>
              
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar 
                    key={star} 
                    className={star <= 4 ? 'star filled' : 'star'}
                  />
                ))}
                <span className="rating-text">(0 reviews)</span>
              </div>

              <div className="book-meta">
                <div className="meta-item">
                  <span className="label">Category:</span>
                  <span className="value">{book.type_name}</span>
                </div>
                <div className="meta-item">
                  <span className="label">Price:</span>
                  <span className="value price">{book.price} DH</span>
                </div>
              </div>

              <div className="book-description">
                <h3>Description</h3>
                <p>{book.description || 'No description available for this book.'}</p>
              </div>

              {/* أزرار الإجراءات */}
              <div className="action-buttons">
                <button 
                  onClick={() => {
                    onAddToCart(book.id);
                    onClose();
                  }}
                  className="add-to-cart-btn"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
                
                <button className="wishlist-btn">
                  <FaHeart />
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;