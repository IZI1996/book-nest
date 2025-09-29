import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FavoritePage = () => {
    const [FavoriteItems, setFavoriteItems] = useState([]);

    useEffect(() => {
        fetchFavoriteItems();
    }, []);


const fetchFavoriteItems = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost/bookBack/favoriteitms.php", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        const items = Array.isArray(data.favoriteItems) ? data.favoriteItems : [];
        console.log(data.favoriteItems)
        setFavoriteItems(items);
    } catch (error) {
        console.error("Error fetching Favorite items:", error);
        setFavoriteItems([]);
    }
};




    return (
        <div className="container " style={{marginTop:"120px"}}>
            <h2 className="mb-4 text-center">Shopping Favorite</h2>

            {FavoriteItems.length === 0 ? (
                <div className="alert alert-info text-center">
                    Your Favorite is empty. <Link to="/store">Browse Store</Link>
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
                                </tr>
                            </thead>
                            <tbody>
                                {FavoriteItems.map((item) => (
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
                                        
                                      
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            
                </>
            )}
        </div>
    );
};

export default FavoritePage;
