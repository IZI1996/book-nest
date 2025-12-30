import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdPerson, MdAccountCircle, MdLogout, MdSettings, MdDashboard } from 'react-icons/md';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import './../../../Dashboard.css';
import CartIcon from './../buyer/CartIcon'
import axios from "axios";

function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogsRes = await axios.post("http://localhost/bookBack/blog/listBlog.php");
      console.log("Blogs response:", blogsRes.data);
      
      if (blogsRes.data.success) {
        setBlogs(blogsRes.data.blogs);
      } else {
        console.error("Error fetching blogs:", blogsRes.data.error);
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    }
  };

  // دالة للحصول على رابط الصورة
// دالة للحصول على رابط الصورة
const getBlogImageUrl = (imagePath) => {
    console.log("Original image path:", imagePath);
    
    if (!imagePath) {
        console.log("No image path, using default");
        return '/default-blog-image.jpg';
    }
    
    // إذا كان الرابط كاملاً
    if (imagePath.startsWith('http')) {
        console.log("Full URL:", imagePath);
        return imagePath;
    }
    
    // إذا كان base64
    if (imagePath.startsWith('data:image')) {
        console.log("Base64 image");
        return imagePath;
    }
    
    // إذا كان مساراً محلياً - جرب عدة احتمالات
    const baseUrl = 'http://localhost/bookBack/';
    
    // الاحتمال 1: المسار كما هو
    const url1 = baseUrl + imagePath;
    console.log("Trying URL 1:", url1);
    
    return url1;
};

  // دالة للتنقل إلى المدونة



   const handleBlogClick = (blogId) => {
        navigate(`/blog/${blogId}`);
    };

  return (
<div className="blogs-cards-container">


    <div className="p-8 bg-red-500 text-white text-xl font-bold">
      إذا رأيت هذا النص باللون الأبيض على خلفية حمراء، فإن Tailwind يعمل!
    </div>


export default TestTailwind;
    <div className="blogs-grid">
        {blogs.map(blog => (
            <div key={blog.id} className="blog-card">
                {/* Blog Image - باستخدام نفس طريقة الكتب */}
                <div className="blog-image-container">
                    <div 
                        className="blog-image"
                        style={{
                            backgroundImage: `url(http://localhost/bookBack/${blog.profile_image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "200px",
                            width: "100%",
                            borderRadius: "10px 10px 0 0"
                        }}
                        onError={(e) => {
                            // إذا فشلت الصورة، استخدم الصورة الافتراضية
                            e.target.style.backgroundImage = "url('/default-blog-image.jpg')";
                        }}
                    ></div>
                    <div className="blog-overlay">
                        <span className="blog-specialization">{blog.specialization}</span>
                    </div>
                </div>

                <div className="card-content">
                    <div className="card-header">
                        <h3 className="blog-title">
                            {blog.name}
                        </h3>
                        <div className="blog-meta">
                            <span className="author-badge">
                                👤 {blog.author_name || 'Unknown Author'}
                            </span>
                        </div>
                    </div>
                    
                    <p className="blog-description">
                        {blog.description || 'No description available'}
                    </p>

                    <div className="blog-stats">
                        <div className="stat-item">
                             <span>{blog.view_count || 0}</span>
                        </div>
                        <div className="stat-item">
                             <span>{blog.like_count || 0}</span>
                        </div>
                        <div className="stat-item">
                             <span>{blog.article_count || 0}</span>
                        </div>
                    </div>
                    
                    <div className="card-footer">
                        <div className="blog-date">
                             {new Date(blog.created_at).toLocaleDateString('en-US')}
                        </div>
                        <button 
                            className="view-blog-btn"
                                                            onClick={() => handleBlogClick(blog.id)}
                        >
                            🔗 Visit Blog
                        </button>
                                        
                    </div>
                </div>
            </div>
        ))}
    </div>

    {blogs.length === 0 && (
        <div className="no-blogs">
            
            <p>No blogs available at the moment</p>
            <button 
                className="create-blog-btn"
                onClick={() => navigate('/create-blog')}
            >
                Create First Blog
            </button>
        </div>
    )}
</div>
  );
}

export default BlogsList;