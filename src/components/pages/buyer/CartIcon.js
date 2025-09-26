import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const CartIcon = ({ refresh }) => {
    const [cartCount, setCartCount] = useState(0); 

    useEffect(() => {
        fetchCartCount();
    }, [ refresh ]);




    

    const fetchCartCount = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost/bookBack/cartcount.php", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await response.json();
 setCartCount(data.cartCount);
};

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <Link to="/cart">
                <FaShoppingCart size={20} />
            </Link>
            
            {cartCount > 0 && (
                <span
                style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#b40f0fff",
                    color: "white",
                    borderRadius: "50%",
                    width: "21px",
                    height: "21px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    boxShadow: "0 2px 4px rgba(216, 40, 40, 0.2)",
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
