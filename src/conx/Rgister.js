import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/bookBack/register.php", formData);
            setResponseMessage(response.data.message || "Account created successfully!");

            // Redirect to login page after successful registration
            setTimeout(() => navigate("/log"), 2000);
        } catch (error) {
            setResponseMessage("Error registering. Try again.");
        }
    };

    return (
        <div className="container" >
            <section className="d-flex align-items-center justify-content-around text-lg-start" style={{marginTop:'100PX'}} >
                      {/* Image Section */}
                      <div className="cardi" style={{ width: "45%" }}>
                    <img 
                        src="/images/reg.png" 
                        alt="Register" 
                        className="img-fluid" 
                        style={{ height: "500px", objectFit: "cover" }} 
                    />
                </div>
                {/* Form Section */}
                <div className="card shadow p-4 " style={{ width: "50%" }}>
                    <h2 className="text-center mb-4">Create Account</h2>
                    {responseMessage && <div className="alert alert-info text-center">{responseMessage}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

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

                        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor:'#f9525a' }}>
                            Sign Up
                        </button>
                    </form>

                    {/* Login Redirect Button */}
                    <div className="text-center mt-3">
                        <Link to="/log">
                            <button className="btn btn-secondary w-100">Login</button>
                        </Link>
                    </div>
                </div>

          
            </section>
        </div>
    );
};

export default Register;
