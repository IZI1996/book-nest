// components/shared/SiteHero.js
import React from 'react';

const SiteHero = () => {
  return (
    <section 
      className="site-hero-section"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero.png)`
      }}
    >
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <div className="hero-content">
              <h1 className="hero-title">Welcome to Our Book World</h1>
              <p className="hero-subtitle">
                Where stories come alive and knowledge finds its home. 
                Discover a universe of books that inspire, educate, and entertain.
              </p>
              <p className="hero-description">
                We believe in the power of books to transform lives. 
                Whether you're looking for the next bestseller, academic resources, 
                or timeless classics, we're here to guide your reading journey.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary btn-hero">Explore Books</button>
                <button className="btn btn-outline-light btn-hero">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteHero;