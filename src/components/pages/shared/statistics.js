// components/shared/Statistics.js
import React from 'react';
import { 
  FaBook,
  FaSmile,
  FaFolderOpen,
  FaHeadset
} from 'react-icons/fa';

const Statistics = () => {
  const stats = [
    {
      number: '10,000+',
      title: 'Books Available',
      icon: <FaBook className="stat-icon" />
    },
    {
      number: '5,000+',
      title: 'Happy Customers',
      icon: <FaSmile className="stat-icon" />
    },
    {
      number: '50+',
      title: 'Categories',
      icon: <FaFolderOpen className="stat-icon" />
    },
    {
      number: '24/7',
      title: 'Support',
      icon: <FaHeadset className="stat-icon" />
    }
  ];

  return (
    <section className="statistics-section">
      <div className="container">
        <div className="row">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6">
              <div className="stat-card">
                <div className="stat-icon-wrapper">
                  {stat.icon}
                </div>
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-title">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;