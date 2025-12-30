// components/pages/buyer/Bloger.js
import { useEffect, useState } from "react";
import {useParams , Link } from "react-router-dom";
import axios from "axios";
import { 
  Search, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Calendar, 
  MessageCircle, 
  Clock, 
  User,
  Tag,
  ChevronRight,
  Grid,
  Filter,
  TrendingUp,
  Bookmark,
  Heart,
  Share2,
  Eye,
  Mail,
  Star
} from 'lucide-react';

const API_URL = "http://localhost";
const Bloger = () => {
  const {id}= useParams()

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Categories
  const categories = [
    'All', 'Design', 'Technology', 'Lifestyle', 'Travel', 'Creativity', 'Programming'
  ];

  // Fetch blog data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching blog articles...");
const blogsRes = await axios.post(`${API_URL}/bookBack/blog/listBlog.php?id=${id}`);     
   const blogsData = blogsRes.data;
        
        
        
        // Set main articles
    setBlogs({
            ...blogsData,
            profileImageUrl: blogsData.profile_image ? `${API_URL}/bookBack/${blogsData.profile_image}` : "", 
          });
        console.log("Blog data:", blogsData);



        
        // Set featured posts
        setFeaturedPosts([
          {
            id: 1,
            title: 'The Future of Design in the AI World',
            excerpt: 'How artificial intelligence is changing the world of design and designers',
            image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
            category: 'Design',
            date: 'January 28, 2024',
            readTime: '8 min read'
          },
          {
            id: 2,
            title: 'Best Design Tools for 2024',
            excerpt: 'Comprehensive guide to the latest and best design tools',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
            category: 'Technology',
            date: 'January 25, 2024',
            readTime: '6 min read'
          },
          {
            id: 3,
            title: 'How to Organize Your Time for Work and Creativity',
            excerpt: 'Time management secrets for creatives and remote workers',
            image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&h=600&fit=crop',
            category: 'Lifestyle',
            date: 'January 22, 2024',
            readTime: '5 min read'
          }
        ]);

      } catch (error) {
        console.error("Error fetching blog data:", error);
        
        // Mock data for display
        const mockBlogs = Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          title: `Sample Article ${i + 1}`,
          excerpt: 'This is sample text describing the article content. It may contain important information about the topic.',
          image: `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop&random=${i}`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          category: categories[Math.floor(Math.random() * categories.length)],
          readTime: `${Math.floor(Math.random() * 10) + 1} min read`,
          commentsCount: Math.floor(Math.random() * 50),
          author: "Fatima",
          authorImage: `https://i.pravatar.cc/150?img=${i + 1}`,
          tags: ['Design', 'Creativity', 'Technology'].slice(0, Math.floor(Math.random() * 3) + 1),
          isFeatured: i < 3,
          likes: Math.floor(Math.random() * 100),
          views: Math.floor(Math.random() * 1000)
        }));
        
        setBlogs(mockBlogs);
        setFeaturedPosts(mockBlogs.slice(0, 3));
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter articles by category



  // Change page

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-pink" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Header with special effect */}
      <header className="fixed-top bg-white shadow-sm py-3" style={{ zIndex: 1050, backdropFilter: 'blur(10px)' }}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="fs-3 fw-bold text-gradient">
                <Link to="/" className="text-decoration-none text-dark">
                  <span className="text-pink"></span>
                  <span className="text-dark"> Blog</span>
                </Link>
              </div>
              <div className="vr mx-4 d-none d-md-block"></div>
              <p className="mb-0 text-muted small d-none d-md-block">
                A world of creativity, design, and technology
              </p>
            </div>
            
            <div className="d-flex align-items-center gap-4">
              <ul className="d-none d-md-flex align-items-center gap-4 mb-0">
                <li><Link to="/" className="text-decoration-none text-dark hover-pink fw-medium">Home</Link></li>
                <li><Link to="#" className="text-decoration-none text-dark hover-pink fw-medium">Articles</Link></li>
                <li><Link to="#" className="text-decoration-none text-dark hover-pink fw-medium">Categories</Link></li>
                <li><Link to="#" className="text-decoration-none text-dark hover-pink fw-medium">About</Link></li>
              </ul>
              
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                  <Search className="position-absolute start-3 top-50 translate-middle-y text-muted" size={20} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search blog..." 
                    className="form-control form-control-sm ps-5 border-0 bg-light rounded-pill"
                    style={{ width: '180px' }}
                  />
                </div>
                
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-pink btn-sm rounded-pill">
                    <User size={16} />
                  </button>
                  <button className="btn btn-pink btn-sm rounded-pill">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Featured Articles */}
      <section className="pt-5 mt-5">
        <div className="container py-5">
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <h1 className="display-5 fw-bold text-dark mb-3">
                Welcome to <span className="text-gradient">My Blog </span>
              </h1>
              <p className="text-muted fs-5 mb-4">

{blogs.description}          

    </p>
              <div className="d-flex gap-3">
                <button className="btn btn-pink rounded-pill px-4">
                  Start Reading
                </button>
                <button className="btn btn-outline-dark rounded-pill px-4">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="col-md-6" style={{width:'auto'}}>
              <div className="position-relative">
                <div className="rounded-4 overflow-hidden shadow-lg">
                  <img 
                           src={blogs.profileImageUrl} 



                    alt="Hero"
                    className="img-fluid"
                    style={{ height: '300px', width:'auto',objectFit: 'cover' }}
                  />
                </div>
                <div className="position-absolute bottom-0 start-0 p-4 text-white">
                  <span className="badge bg-pink mb-2">Featured</span>
                  <h5 className="mb-0">{blogs.name}</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Articles */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold text-dark">
                <TrendingUp className="me-2" size={24} />
                Featured Articles
              </h3>
              <Link to="#" className="text-decoration-none text-pink d-flex align-items-center">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="row g-4">
              {featuredPosts.map(post => (
                <div key={post.id} className="col-md-4">
                  <div className="card border-0 shadow-sm h-100 hover-lift">
                    <div className="position-relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <span className="position-absolute top-0 start-0 m-3 badge bg-pink">
                        {post.category}
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">
                          <Calendar size={14} className="me-1" />
                          {post.date}
                        </small>
                        <small className="text-muted">
                          <Clock size={14} className="me-1" />
                          {post.readTime}
                        </small>
                      </div>
                      <h5 className="card-title fw-bold text-dark mb-2">{post.title}</h5>
                      <p className="card-text text-muted">{post.excerpt}</p>
                      <Link 
                        to={`/blog/${post.id}`} 
                        className="text-decoration-none text-pink fw-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <h4 className="fw-bold mb-3">
                <Link to="/" className="text-decoration-none text-white">
                  Fatima's Blog
                </Link>
              </h4>
              <p className="text-light opacity-75 mb-4">
                A blog specialized in design, technology, and creativity, where I share my passion and experiences with my readers.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="text-white opacity-75 hover-opacity-100">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-white opacity-75 hover-opacity-100">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-white opacity-75 hover-opacity-100">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-white opacity-75 hover-opacity-100">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
            
            <div className="col-lg-2 col-md-4">
              <h6 className="fw-bold mb-3">Articles</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Latest</Link></li>
                <li className="mb-2"><Link to="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Most Read</Link></li>
                <li className="mb-2"><Link to="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Featured</Link></li>
                <li><Link to="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">All Articles</Link></li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-md-4">
              <h6 className="fw-bold mb-3">Categories</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Design</Link></li>
                <li className="mb-2"><Link to="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Technology</Link></li>
                <li className="mb-2"><Link to="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Lifestyle</Link></li>
                <li><Link to="#" className="text-decoration-none text-light opacity-75 hover-opacity-100">Travel</Link></li>
              </ul>
            </div>
            
            <div className="col-lg-4 col-md-4">
              <h6 className="fw-bold mb-3">Subscribe to Newsletter</h6>
              <p className="text-light opacity-75 mb-3">
                Get the latest articles directly in your inbox
              </p>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                />
                <button className="btn btn-pink">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-top border-dark mt-4 pt-4 text-center">
            <p className="text-light opacity-75 mb-0">
              © 2024 Fatima's Blog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style>{`
        .text-gradient {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .bg-gradient-pink {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24) !important;
        }
        
        .bg-gradient-to-top {
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        }
        
        .btn-pink {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          border: none;
          color: white;
        }
        
        .btn-pink:hover {
          background: linear-gradient(45deg, #ff5252, #d84315);
          color: white;
        }
        
        .btn-outline-pink {
          border-color: #ff6b6b;
          color: #ff6b6b;
        }
        
        .btn-outline-pink:hover {
          background: #ff6b6b;
          color: white;
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
        
        .hover-opacity-100:hover {
          opacity: 1 !important;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .text-pink {
          color: #ff6b6b !important;
        }
        
        .bg-pink {
          background-color: #ff6b6b !important;
        }
        
        .border-pink {
          border-color: #ff6b6b !important;
        }
      `}</style>
    </div>
  );
};

export default Bloger;