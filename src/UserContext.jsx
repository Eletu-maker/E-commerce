import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Additional user data from Firestore
  const [cart, setCart] = useState([]);
  const [newReview, setNewReview] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            // Combine Firebase Auth user with Firestore user data
            setUser({
              ...firebaseUser,
              name: userDoc.data().name,
              cart: userDoc.data().cart || [],
              comment: userDoc.data().comment || []
            });
          } else {
            setUser(firebaseUser);
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          setUser(firebaseUser);
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Function to add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // If item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        // If new item, add to cart
        return [...prevCart, item];
      }
    });
  };

  // Function to remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Function to update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Function to clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to add a new review
  const addNewReview = (review) => {
    setNewReview(review);
  };

  // Function to clear new review (on page reload)
  const clearNewReview = () => {
    setNewReview(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, userData, cart, addToCart, removeFromCart, updateQuantity, clearCart, newReview, addNewReview, clearNewReview }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);