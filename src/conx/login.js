import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/bookBack/login.php", formData);
            if (response.data.token) {
                // Store token in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.token);

                
                // Set default Authorization header for axios
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                
                // Redirect to library
                navigate("/library"); 
            }
            setResponseMessage(response.data.message || "Login successful!");
        } catch (error) {
            setResponseMessage(error.response?.data?.message || "Invalid email or password.");
        }

    }

    const handleLogin = () => {
        navigate("/libiray"); 
    };
    return (
        <div className="container" style={{ marginTop: "92px" }}>
            <section className="d-flex align-items-center justify-content-between text-lg-start">
                {/* Form Section */}
                <div className="card shadow p-4 " style={{ width: "50%" }}>
                    <h2 className="text-center mb-4">Log In</h2>
                    {responseMessage && <div className="alert alert-danger text-center">{responseMessage}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100" onClick={handleLogin} style={{ backgroundColor:'#f9525a' }}>
                            Login
                        </button>
                    </form>
                </div>

                {/* Image Section */}
                <div className="cardi" style={{ width: "45%" }}>
                    <img 
                        src="/images/LOGIN.png" 
                        alt="Login" 
                        className="img-fluid" 
                        style={{ height: "500px", objectFit: "cover" }} 
                    />
                </div>
            </section>
        </div>
    );
};

export default Login;
