import { getApps, initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwrmQ1JKtGcBSI19pbLfez9LenQhfz7yg",
  authDomain: "e-come-9d908.firebaseapp.com",
  projectId: "e-come-9d908",
  storageBucket: "e-come-9d908.firebasestorage.app",
  messagingSenderId: "49339314001",
  appId: "1:49339314001:web:43f3606dde067a3b202d70"
};

const app =  initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

const signUp = async (name,email,password)=>{
    try{
      const res = await createUserWithEmailAndPassword(auth,email,password)

       const user = res.user;

       await setDoc(doc(db,"users",user.uid),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        cart:[],
        comment: []
       });

       return user;
    }catch(err){
      console.log(err)
      alert(err)
      return null;
    }
}

const login = async (email, password) =>{
    try{
        const res =  await signInWithEmailAndPassword(auth,email,password);
        return res.user
    }catch(err){
        console.log(err)
        alert(err)
        return null; 
    }
}

const logout = () =>{
    signOut(auth);
}

// Function to save cart data to Firestore
const saveCartToFirestore = async (userId, cartItems) => {
  try {
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Create items object with productId as key and quantity as value
    const items = {};
    cartItems.forEach(item => {
      items[item.id] = item.quantity;
    });
    
    // Create cart data object
    const cartData = {
      date: new Date(),
      items: items,
      totalPrice: totalPrice
    };
    
    // Save to Firestore under user's carts collection
    const cartRef = collection(db, "users", userId, "carts");
    const docRef = await addDoc(cartRef, cartData);
    
    return docRef.id;
  } catch (error) {
    console.error("Error saving cart to Firestore:", error);
    return null;
  }
};

// Function to fetch user's cart history from Firestore
const getUserCartHistory = async (userId) => {
  try {
    const cartsRef = collection(db, "users", userId, "carts");
    const q = query(cartsRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    
    const cartHistory = [];
    querySnapshot.forEach((doc) => {
      cartHistory.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return cartHistory;
  } catch (error) {
    console.error("Error fetching cart history:", error);
    return [];
  }
};

// Function to submit a comment/review to Firestore
const submitComment = async (commentData) => {
  try {
    const commentRef = await addDoc(collection(db, "comments"), {
      username: commentData.username,
      userId: commentData.userId,
      description: commentData.description,
      rating: commentData.rating,
      date: serverTimestamp(),
    });
    
    return commentRef.id;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};

// Function to fetch all comments from Firestore
const getAllComments = async () => {
  try {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    
    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export {auth,db,login,signUp,logout,saveCartToFirestore,getUserCartHistory,submitComment,getAllComments}