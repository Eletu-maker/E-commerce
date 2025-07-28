import React, { useEffect, useState } from 'react'
import './Cart.css'
import Navbar from '../../Component/Navbar/Navbar'
import Footer from '../../Component/Footer/Footer'
import item from '../../assets/item2.png'
import del from '../../assets/delete.png'
import { useUser } from '../../UserContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
const Cart = () => {

  
  const { user, updateUserCart,setUser } = useUser();
  
  const [cartItems, setCartItems] = useState(user.cart || []);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responses = await Promise.all(
          cartItems.map(item => fetch(item.good).then(res => res.json()))
        );
        const enriched = responses.map((product, index) => ({
          ...product,
          num: cartItems[index].num
        }));
        setProducts(enriched);
      } catch (err) {
        console.error("Error fetching cart products:", err);
      }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [cartItems]);

  const updateCartInFirestore = async (uid, newCart) => {
  const userRef = doc(db, "users", uid);
  try {
    await setDoc(userRef, { cart: newCart }, { merge: true }); 
    console.log("Cart updated in Firestore");
  } catch (err) {
    console.error("Failed to update cart:", err);
  }
};
  
  const handleDelete = async (indexToRemove) => {
    const newCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(newCart);

     try {
    
    
    await updateCartInFirestore(user.uid, newCart);
   setUser({ ...user, cart: newCart });
   if (updateUserCart) updateUserCart(newCart);
    alert("Product removed successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to update cart. Try again.");
  }

    
  };

  console.log(products)

  const amount =  () =>{
    let subtotal = 0
    let Discount = 0
    products.map((data,index)=>{
      subtotal += data.price * data.num;
      Discount += data.discountPercentage;

    })
    return ({
      subtotal: subtotal,
      Discount: Discount,
      total: subtotal - Discount -25
    })
  }

  console.log(amount())
  return (
    <div>
      <Navbar/>
      <div className="cart">
      <p className="direction"><span>Home -</span><span>Cart</span></p>
      <h1 className="title">YOUR CART</h1>
      <div className="cart-details">
        <div className="cart-product">
          {products.map((data,index)=>{
            
            return(
              <div className='display' key={index}>
                <div className="product-image">
            <img src={data.images[0]} alt="" />
          </div>
          <div className="product-info">
            <h2>{data.title}</h2>
            <h2>Price: $ {data.price}</h2>
            <p> Discount: $ {data.discountPercentage}</p>
          </div>
          <div className="num">
            <img src={del} alt="" onClick={() => handleDelete(index)} style={{ cursor: 'pointer' }}/>

             <div className="count">
            <p className='decrement' >-</p>
            <p className='value'>{data.num}</p>
            <p className='increment'>+</p>
          </div>
          </div>
          </div>
            )
          })

          }

          
        </div>
        <div className="cart-price">
          
          <h2>Order Summary</h2>
          <p>Subtotal: <span>$ {amount().subtotal}</span></p>
          <p>Discount -20%: <span className='red'>- ${amount().Discount}</span></p>
          <p>Delivery Fee: <span>$25</span></p>
          <hr />
          <p className='total'>Total: <span>$ {amount().total}</span></p>
          <button>Go to Checkout </button>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Cart
