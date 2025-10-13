// components/shared/CartIcon.js
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
    const [cartCount, setCartCount] = useState(0); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartCount();
        
        // الاستماع لحدث تحديث السلة
        const handleCartUpdate = () => {
            fetchCartCount();
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const fetchCartCount = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setCartCount(0);
            return;
        }

        try {
            const response = await fetch("http://localhost/bookBack/cartcount.php", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            if (response.ok) {

                const data = await response.json();
                setCartCount(data.cartCount || 0);
            // إرسال حدث تحديث السلة
            window.dispatchEvent(new Event('cartUpdated'));
    
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
            setCartCount(0);
        }
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        navigate('/buyer/checklist');
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <a 
                href="/buyer/checklist" 
                className="nav-link"
                onClick={handleCartClick}
                style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <FaShoppingCart size={24} />
                
                {cartCount > 0 && (
                    <span
                        style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            backgroundColor: "#b40f0f",
                            color: "white",
                            borderRadius: "50%",
                            width: "21px",
                            height: "21px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "bold",
                        }}
                    >
                        {cartCount > 99 ? '99+' : cartCount}
                    </span>
                )}
            </a>
        </div>
    );
};

export default CartIcon;