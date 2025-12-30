import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const BookAdder = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        price: "",
        type: ""
    });

    const [types, setTypes] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetch("http://localhost/bookBack/types.php") 
            .then(response => response.json())
            .then(data => setTypes(data))
            .catch(error => console.error("Error fetching genres:", error));
    }, []);

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

    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('author', formData.author);
    postData.append('price', formData.price);
    postData.append('type', formData.type);
    if (imageFile) postData.append('profileImage', imageFile);

    console.log('=== SENDING REQUEST ===');
    console.log('User Role:', localStorage.getItem('userRole'));

    try {
        const response = await axios.post(
            'http://localhost/bookBack/insert.php', 
            postData,
            { 
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                timeout: 30000 
            }
        );
        
        console.log('=== RESPONSE SUCCESS ===');
        console.log('Response:', response.data);
        
        setResponseMessage(response.data.message);
        
        if (response.data.message.includes("successfully")) {
            setFormData({ title: "", author: "", price: "", type: "" });
            setImageFile(null);
            
            setTimeout(() => {
                navigate("/seller/store");
            }, 1500);
        }
        
    } catch (error) {
        console.log('=== RESPONSE ERROR ===');
        
        if (error.response) {
            const errorMessage = error.response.data.message || 'Unknown error';
            console.error('Error response:', error.response.data);
            setResponseMessage(`Error: ${errorMessage}`);
        } else if (error.request) {
            console.error('No response received');
            setResponseMessage("No response from server. Please check if the server is running.");
        } else {
            console.error('Request setup error:', error.message);
            setResponseMessage("Request error: " + error.message);
        }
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <div className="container">
            <section className="d-flex align-items-center justify-content-between text-lg-start" style={{ marginTop: "110px" }}>
                {/* Form Section */}
                <div className="card shadow p-4" style={{ width: "50%" }}>
                    <h2 className="text-center mb-4">Add a New Book</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Title Input */}
                        <div className="mb-3">
                            <label className="form-label">Book Title</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="title"
                                placeholder="Enter book title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Author Input */}
                        <div className="mb-3">
                            <label className="form-label">Author Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="author"
                                placeholder="Enter author name"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Price Input */}
                        <div className="mb-3">
                            <label className="form-label">Book Price</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="price"
                                placeholder="Enter book price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Genre Select Dropdown */}
                        <div className="mb-3">
                            <label className="form-label">Book Genre</label>
                            <select 
                                className="form-select" 
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Genre</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* File Upload */}
                        <div className="mb-3">
                            <label className="form-label">Upload Cover Image</label>
                            <input 
                                type="file" 
                                className="form-control"
                                name="profileImage" 
                                onChange={handleFileChange}
                                accept="image/jpeg, image/jpg, image/png"
                                required
                            />
                            <div className="form-text">Allowed formats: JPG, JPEG, PNG</div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100" 
                            style={{ backgroundColor: '#f9525a' }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Adding Book...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-upload me-2"></i> 
                                    Submit Book
                                </>
                            )}
                        </button>
                    </form>

                    {/* Response Message */}
                    {responseMessage && (
                        <div className={`alert mt-3 text-center ${
                            responseMessage.includes("successfully") ? "alert-success" : "alert-danger"
                        }`}>
                            {responseMessage}
                        </div>
                    )}
                </div>

                {/* Image Section */}
                <div className="cardi" style={{ width: "45%" }}>
                    <img 
                        src="/images/print.png" 
                        alt="Add Book" 
                        className="img-fluid" 
                        style={{ height: "500px", objectFit: "cover" }} 
                    />
                </div>
            </section>
        </div>
    );
};

export default BookAdder;