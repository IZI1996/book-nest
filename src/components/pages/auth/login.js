import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [responseMessage, setResponseMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage("");
    
    try {
        const response = await axios.post(
            "http://localhost/bookBack/login.php",
            JSON.stringify(formData),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data.token) {
            // حفظ البيانات في localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('userRole', response.data.user.role_id.toString());
            
            // 🔥 إرسال event لإعلام كل التطبيق بالبيانات الجديدة
            window.dispatchEvent(new CustomEvent('userDataUpdated', {
                detail: {
                    token: response.data.token,
                    user: response.data.user
                }
            }));
            
            setResponseMessage("Login successful! Redirecting...");
            
            // التوجيه بعد ثانية
            setTimeout(() => {
                const roleId = response.data.user.role_id;
                if (roleId === 2) {
                    navigate("/buyer/List");
                } else if (roleId === 3) {
                    navigate("/seller/store");
                } else {
                    navigate("/");
                }
            }, 1000);
        }
    } catch (error) {
        // ... handle error
    } finally {
        setIsLoading(false);
    }
};
    return (
        <div className="container" >
            <section className="d-flex align-items-center justify-content-between text-lg-start">
                
                {/* Form Section */}
                <div className="card shadow p-4" style={{ width: "50%"  ,marginLeft:'180px' }}>
                    <h2 className="text-center mb-4">Log In</h2>

                    {responseMessage && (
                        <div className={`alert ${
                            responseMessage.includes("success") ? "alert-success" : 
                            responseMessage.includes("Redirecting") ? "alert-info" : "alert-danger"
                        } text-center`}>
                            {responseMessage}
                        </div>
                    )}

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
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-100" 
                            style={{ backgroundColor: '#f9525a' }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>

                        {/* روابط إضافية */}
                        <div className="mt-3 text-center">
                            <p className="mb-1">
                                Don't have an account? 
                                <a 
                                    href="/auth/register" 
                                    className="text-decoration-none ms-1"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/auth/register');
                                    }}
                                    style={{ color: '#f9525a' }}
                                >
                                    Sign up
                                </a>
                            </p>
                            <small className="text-muted">
                                Buyer? You'll be redirected to the store.<br />
                                Seller? You'll be redirected to your dashboard.
                            </small>
                        </div>
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