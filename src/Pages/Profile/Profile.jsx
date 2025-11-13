import React, { useEffect, useState } from 'react';
import './Profile.css';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import { useUser } from '../../UserContext';
import { getUserCartHistory, getAllComments } from '../../firebase';
import { logout } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useUser();
  const [cartHistory, setCartHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartHistory = async () => {
      if (user) {
        try {
          const history = await getUserCartHistory(user.uid);
          setCartHistory(history);
          
          // Fetch product details for all items in cart history
          await fetchProductDetails(history);
        } catch (error) {
          console.error("Error fetching cart history:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCartHistory();
  }, [user]);

  const fetchProductDetails = async (cartHistory) => {
    try {
      // Collect all unique product IDs from cart history
      const productIds = new Set();
      cartHistory.forEach(cart => {
        Object.keys(cart.items || {}).forEach(productId => {
          productIds.add(productId);
        });
      });

      // Fetch product details for each ID
      const productDetailsMap = {};
      for (const productId of productIds) {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
          if (response.ok) {
            const product = await response.json();
            productDetailsMap[productId] = product;
          }
        } catch (error) {
          console.error(`Error fetching product ${productId}:`, error);
        }
      }
      
      setProductDetails(productDetailsMap);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/Login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <h1>User Profile</h1>
          
          <div className="user-info">
            <h2>User Information</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>

          <div className="cart-history">
            <h2>Order History</h2>
            {loading ? (
              <p>Loading order history...</p>
            ) : cartHistory.length > 0 ? (
              <div className="cart-history-list">
                {cartHistory.map((cart) => (
                  <div className="cart-item" key={cart.id}>
                    <p><strong>Date:</strong> {cart.date?.toDate ? cart.date.toDate().toLocaleString() : 'N/A'}</p>
                    <p><strong>Total Price:</strong> ${cart.totalPrice?.toFixed(2) || '0.00'}</p>
                    <div className="cart-items">
                      <strong>Items:</strong>
                      <ul>
                        {Object.entries(cart.items || {}).map(([productId, quantity]) => (
                          <li key={productId}>
                            {productDetails[productId] ? (
                              <div className="product-details">
                                <img src={productDetails[productId].image} alt={productDetails[productId].title} className="product-image" />
                                <div className="product-info">
                                  <p><strong>{productDetails[productId].title}</strong></p>
                                  <p>Product ID: {productId}</p>
                                  <p>Quantity: {quantity}</p>
                                  <p>Price: ${productDetails[productId].price}</p>
                                </div>
                              </div>
                            ) : (
                              <span>Product ID: {productId} - Quantity: {quantity} (Loading...)</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No order history found.</p>
            )}
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;