// components/pages/shared/Services.js
import React from 'react';
import { 
  FaBook, 
  FaShippingFast, 
  FaSearch, 
  FaGift, 
  FaStar,
  FaExchangeAlt
} from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FaBook className="service-react-icon" />,
      title: 'Book Sales',
      description: 'Wide selection of books across all genres and categories.'
    },
    {
      id: 2,
      icon: <FaShippingFast className="service-react-icon" />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep.'
    },
    {
      id: 3,
      icon: <FaSearch className="service-react-icon" />,
      title: 'Book Search',
      description: 'Advanced search to find your perfect book.'
    },
    {
      id: 4,
      icon: <FaGift className="service-react-icon" />,
      title: 'Gift Services',
      description: 'Perfect book recommendations for gifts.'
    },
    {
      id: 5,
      icon: <FaStar className="service-react-icon" />,
      title: 'Book Reviews',
      description: 'Honest reviews from our community.'
    },
    {
      id: 6,
      icon: <FaExchangeAlt className="service-react-icon" />,
      title: 'Share or Sell Your Old Books',
      description: 'Your Old Library, A New Opportunity for Others. Share your books or sell them easily and help spread knowledge!'
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive services to enhance your reading experience</p>
        </div>

        <div className="row">
          {services.map(service => (
            <div key={service.id} className="col-lg-4 col-md-6 mb-4">
              <div className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;