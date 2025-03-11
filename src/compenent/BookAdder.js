import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const BookAdder = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        year: "",
        type: ""
    });

    const [types, setTypes] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');

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

        const postData = new FormData();
        postData.append('title', formData.title);
        postData.append('author', formData.author);
        postData.append('year', formData.year);
        postData.append('type', formData.type);
        if (imageFile) postData.append('profileImage', imageFile);

        try {
            const response = await axios.post(
                'http://localhost/bookBack/insert.php', 
                postData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setResponseMessage(response.data.message);
            setFormData({ title: "", author: "", year: "", type: "" });
            setImageFile(null);
        } catch (error) {
            setResponseMessage(error.response?.data?.message || "Error connecting to the server.");
        }
    };

    return (
        <div className="container" >
            <section className="d-flex align-items-center justify-content-between text-lg-start" style={{ marginTop: "110px" }}>
                {/* Form Section */}
                <div className="card shadow p-4 " style={{ width: "50%" }}>
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

                        {/* Year Input */}
                        <div className="mb-3">
                            <label className="form-label">Publication Year</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="year"
                                placeholder="Enter publication year"
                                value={formData.year}
                                onChange={handleChange}
                                required
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
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor:'#f9525a' }} >
                            <i className="fas fa-upload"></i> Submit Book
                        </button>
                    </form>

                    {/* Response Message */}
                    {responseMessage && (
                        <div className="alert mt-3 text-center">
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
                        style={{ height: "500px", objectFit: "cover",color:'#f9525a' }} 
                    />
                </div>
            </section>
        </div>
    );
};

export default BookAdder;
