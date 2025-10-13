import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);


const fetchCartItems = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost/bookBack/cartitms.php", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        // إذا رجعت API object فيه cartItems
        const items = Array.isArray(data.cartItems) ? data.cartItems : [];
        setCartItems(items);
        calculateTotal(items);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]);
        setTotalPrice(0);
    }
};


    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + parseFloat(item.price), 0);
        setTotalPrice(total.toFixed(2));
    };



    return (
        <div className="container " style={{marginTop:"120px"}}>
            <h2 className="mb-4 text-center">Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="alert alert-info text-center">
                    Your cart is empty. <Link to="/store">Browse Store</Link>
                </div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Image</th>
                                    <th>Book Name</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <img 
                                                src={`http://localhost/bookBack/${item.image_url}`} 
                                                alt={item.name} 
                                                className="img-fluid rounded" 
                                                style={{ width: "60px", height: "60px" }}
                                            />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.type_name}</td>
                                        <td className="fw-bold text-primary">{item.price}dh</td>
                                        
                                      
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="mt-4 p-3 bg-light rounded shadow d-flex justify-content-between align-items-center">
                        <h4 className="fw-bold">Total: {totalPrice} dh</h4>
                        <div>
                            <button className="btn btn-success btn-lg me-2">Checkout</button>
                            <Link to="/buyer/categories" className="btn btn-outline-primary btn-lg">Continue Shopping</Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
