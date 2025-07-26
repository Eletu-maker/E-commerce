
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB7znu65F8Ekh2_MVHHU-aEbzsrmNsnTug",
  authDomain: "e-commerce-2fa30.firebaseapp.com",
  projectId: "e-commerce-2fa30",
  storageBucket: "e-commerce-2fa30.firebasestorage.app",
  messagingSenderId: "857147895345",
  appId: "1:857147895345:web:55d3d51004748cb0046f10"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const db = getFirestore(app)


const signUp = async (name,email,password)=>{
    try{
      const res = await createUserWithEmailAndPassword(auth,email,password)

       const user = res.user;

       await addDoc(collection(db, "users"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        cart:[]
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
    }
}

const logout = () =>{
    signOut(auth);
}

 
export {auth,db,login,signUp,logout}
