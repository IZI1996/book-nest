import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // تأكد من أنك قد قمت بتثبيت react-icons
import { Link } from "react-router-dom";

const CartIcon = ({ refresh }) => {
    const [cartCount, setCartCount] = useState(0); 

    useEffect(() => {
        fetchCartCount();
    }, [ refresh ]);

    const fetchCartCount = async () => {
        try {
            const response = await fetch("http://localhost/bookBack/cartcount.php");
            const data = await response.json();
            setCartCount(data.cartCount); // استخدام القيمة الصحيحة من الرد
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <Link to="/cart">
                <FaShoppingCart size={30} />
            </Link>
            
            {cartCount > 0 && (
                <span
                style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#ff4444",
                    color: "white",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    border: "2px solid white",
                    animation: cartCount > 0 ? "bounce 0.5s ease" : "none",
                    transition: "all 0.3s ease",
                }}
            >
          
                    {cartCount}
                </span>
            )}
        </div>
    );
};
export default CartIcon;
