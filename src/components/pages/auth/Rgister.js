import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
   const [roles, setRoles] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();
const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role:''
    });
    useEffect(() => {

fetch("http://localhost/bookBack/roles.php") 
            .then(response => response.json())
            .then(data => {
                setRoles(data)
            })
            
            .catch(error => console.error("Error fetching genres:", error));
     
    }, []);




    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        

    };
const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append("name", formData.name);
    postData.append("email", formData.email);
    postData.append("password", formData.password);
    postData.append("role", formData.role);

    try {
        const response = await axios.post(
            "http://localhost/bookBack/register.php",
            postData // خلي headers default → multipart/form-data
        );

        console.log(response.data.message);
        setFormData({ name: "", email: "", password: "", role: "" });
        setTimeout(() => navigate("/log"), 2000);

    } catch (error) {
        console.error(error.response?.data);
        setResponseMessage(error.response?.data?.message || "Error registering. Try again.");
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

            <div className="col-md-4">
          
                    <div className="mb-4 text-lg-start">
                        <label htmlFor="typeFilter" className="form-label">chose your role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">All</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
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
