import { getApps, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { showError } from "./utils/notification"; // optional: if you prefer consistent alerts

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// --- Initialize App (safe for hot reloads) ---
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- SIGN UP ---
const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Update user profile (so displayName is available everywhere)
    await updateProfile(user, { displayName: name });

    // Save to Firestore users collection
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      createdAt: serverTimestamp(),
    });

    return user;
  } catch (err) {
    console.error("Signup error:", err);
    showError?.(err.message || "Sign-up failed"); // optional unified notification
    return null;
  }
};

// --- LOGIN ---
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    console.error("Login error:", err);
    showError?.(err.message || "Login failed");
    return null;
  }
};

// --- LOGOUT ---
const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Logout error:", err);
  }
};

// --- SAVE CART ---
const saveCartToFirestore = async (userId, cartItems) => {
  try {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const items = {};
    cartItems.forEach((item) => {
      items[item.id] = item.quantity;
    });

    const cartData = {
      date: serverTimestamp(), // use Firestore timestamp
      items,
      totalPrice,
    };

    const cartRef = collection(db, "users", userId, "carts");
    const docRef = await addDoc(cartRef, cartData);
    return docRef.id;
  } catch (error) {
    console.error("Error saving cart to Firestore:", error);
    return null;
  }
};

// --- GET USER CART HISTORY ---
const getUserCartHistory = async (userId) => {
  try {
    const cartsRef = collection(db, "users", userId, "carts");
    const q = query(cartsRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);

    const cartHistory = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return cartHistory;
  } catch (error) {
    console.error("Error fetching cart history:", error);
    return [];
  }
};

// --- SUBMIT COMMENT ---
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

// --- GET ALL COMMENTS ---
const getAllComments = async () => {
  try {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);

    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export {
  auth,
  db,
  login,
  signUp,
  logout,
  saveCartToFirestore,
  getUserCartHistory,
  submitComment,
  getAllComments,
};
