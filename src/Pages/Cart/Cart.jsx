import React from 'react'
import './Cart.css'
import Navbar from '../../Component/Navbar/Navbar'
import Footer from '../../Component/Footer/Footer'
import { useUser } from '../../UserContext'
import { saveCartToFirestore } from '../../firebase'
import { showSuccess, showError } from '../../utils/notification'
import deleteIcon from '../../assets/delete.svg'

const Cart = () => {
  const { cart, user, updateQuantity, removeFromCart, clearCart } = useUser()
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const discount = 0
  const delivery = subtotal > 0 ? 15 : 0
  const total = subtotal - discount + delivery

  const handleIncrement = (id) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrement = (id) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = async () => {
    if (!user) {
      showError("Please login to checkout");
      return;
    }
    
    if (cart.length === 0) {
      showError("Your cart is empty");
      return;
    }
    
    try {
      const result = await saveCartToFirestore(user.uid, cart);
      if (result) {
        showSuccess("Order placed successfully!");
        // Clear the cart after successful checkout
        clearCart();
      } else {
        showError("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      showError("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <Navbar/>
      <div className="cart">
        <p className="direction"><span>Home -</span><span>Cart</span></p>
        <h1 className="title">YOUR CART</h1>
        <div className="cart-details">
          <div className="cart-product">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div className="cart-product-details" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="cart-product-info">
                    <h3>{item.title}</h3>
                    <p>${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleDecrement(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item.id)}>+</button>
                    </div>
                  </div>
                  <div className="remove-item" onClick={() => handleRemove(item.id)}>
                    <img src={deleteIcon} alt="Remove" />
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is currently empty.</p>
            )}
          </div>
          <div className="cart-price">
            <h2>Order Summary</h2>
            <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
            <p>Discount: <span className='red'>- ${discount.toFixed(2)}</span></p>
            <p>Delivery: <span>${delivery.toFixed(2)}</span></p>
            <hr />
            <p>Total: <span>${total.toFixed(2)}</span></p>
            <button 
              className={cart.length > 0 ? '' : 'disabled'} 
              disabled={cart.length === 0}
              onClick={handleCheckout}
            >
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Cart