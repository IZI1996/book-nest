import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const BlogCreator = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        description: "",

    });

    const [imageFile, setImageFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("token");
        if (!token) {
            setResponseMessage("Please login first");
            return;
        }

        setIsSubmitting(true);

        // استخدم FormData مع القيم الصحيحة من state
        const postData = new FormData();
        postData.append('name', formData.name); // القيمة من state
        postData.append('description', formData.description); // القيمة من state
        
        if (imageFile) {
            postData.append('profile_image', imageFile);
        }

        console.log('📤 Sending FormData:');
        console.log('name:', formData.name);
        console.log('description:', formData.description);
        console.log('imageFile:', imageFile);

        try {
            const response = await axios.post(
                'http://localhost/bookBack/blog/newBlog.php', 
                postData,
                { 
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            console.log('✅ Response:', response.data);
            setResponseMessage(response.data.message);
            
            if (response.data.success) {
                setFormData({ name: "", description: ""});
                setImageFile(null);
                
                setTimeout(() => {
                    navigate("/blogs");
                }, 1500);
            }
            
        } catch (error) {
            console.error('❌ Error:', error);
            if (error.response) {
                setResponseMessage(`Error: ${error.response.data.error}`);
            } else {
                setResponseMessage("Request error: " + error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

   

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Create New Blog</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Blog Name *</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="name"
                                        placeholder="Enter blog name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description *</label>
                                    <textarea 
                                        className="form-control" 
                                        name="description"
                                        placeholder="Describe your blog..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div className="mb-3">


                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Blog Image</label>
                                    <input 
                                        type="file" 
                                        className="form-control"
                                        name="profile_image" 
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <div className="form-text">Optional: JPG, PNG, WebP</div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100" 
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Creating..." : "Create Blog"}
                                </button>
                            </form>

                            {responseMessage && (
                                <div className={`alert mt-3 ${
                                    responseMessage.includes("success") ? "alert-success" : "alert-danger"
                                }`}>
                                    {responseMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCreator;