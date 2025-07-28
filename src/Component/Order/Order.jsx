import React, { useEffect, useState } from 'react'
import './Order.css'
import { useUser } from '../../UserContext'
import { db } from '../../firebase'
import { doc, documentId, setDoc, updateDoc } from 'firebase/firestore'


const Order = ({ theProduct }) => {
 const { user, setUser } = useUser();
  const [apiData, setApiData] = useState(null)
  const [count, setCount] = useState(1)
   const [image,setImage] = useState(null)
  
     useEffect(() => {
    fetch(`https://dummyjson.com/products/${theProduct}`)
      .then(res => res.json())
      .then(res => {setApiData(res) ; setImage(res.images[0])})
  
      .catch(err => console.error(err))
  }, [theProduct])



const updateCartInFirestore = async (uid, newCart) => {
  const userRef = doc(db, "users", uid);
  try {
    await setDoc(userRef, { cart: newCart }, { merge: true }); 
    console.log("Cart updated in Firestore");
  } catch (err) {
    console.error("Failed to update cart:", err);
  }
};
 
  const addToCart = async () => {
  const product = {
    good: `https://dummyjson.com/products/${theProduct}`,
    num: count
  };

  const updatedCart = [...user.cart, product];
console.log("Updating Firestore with cart:", updatedCart);
  try {
    
    
   await updateCartInFirestore(user.uid, updatedCart);
   setUser({ ...user, cart: updatedCart });
    alert("Product added successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to update cart. Try again.");
  }
};

console.log(user)

  

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count > 1 ? count - 1 : count)

  
  if (!apiData) return <p>Loading...</p>

  

  return (
    <div className="oder">
      <div className="order-display">
        <div className="small-display">
          {apiData.images.slice(0, apiData.images.length).map((img, idx) => (
            <div key={idx}><img src={img} alt={`product-thumb-${idx}`}n onClick={() => setImage(img)} className="small-image" /></div>
          ))}
        </div>
        <div className="big-display">
          <img src={image} alt={apiData.title} />
        </div>
      </div>

      <div className="order-details">
        <h1 className='order-details-name'>{apiData.title}</h1>
        <p className='order-details-rating'>Rating: {apiData.rating}</p>
        <p className='order-details-price'>Price: ${apiData.price}</p>
        <p className='order-details-description'>{apiData.description}</p>

        <hr />
        <p className="order-details-choice">Select Colors</p>
        <div className="color">
          <div className="blue"></div>
          <div className="blue"></div>
          <div className="blue"></div>
        </div>

        <hr />
        <p className="order-details-choice">Choose Size</p>
        <div className="size">
          <p className="order-details-size">Small</p>
          <p className="order-details-size">Medium</p>
          <p className="order-details-size">Large</p>
          <p className="order-details-size">X-Large</p>
        </div>

        <div className="the-cart">
          <div className="count">
            <p className='decrement' onClick={decrement}>-</p>
            <p className='value'>{count}</p>
            <p className='increment' onClick={increment}>+</p>
          </div>
          <div className="add-cart" onClick={addToCart}>
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
