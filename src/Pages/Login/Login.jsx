import React, { useState } from 'react'
import "./Login.css"
import Loading from "../../assets/Loading_icon.gif"
import { signUp, login, db } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';


const Login = () => {
const navigate = useNavigate();

  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState("");
    const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
const { setUser } = useUser();

  const auth_user = async (event) => {
  event.preventDefault();
  console.log("Form submitted:", signState);
setLoading(true);
try{
  let user;
  if (signState === "Sign In") {
    console.log("Logging in with:", userEmail);
   user = await login(userEmail, password);
  } else {
    console.log("Signing up with:", name, userEmail);
   user = await signUp(name, userEmail, password);
     
  }
    if (!user) {
      alert("Authentication failed.");
      return;
    }
  
  const q = query(collection(db,"users"), where("uid","==",user.uid));
  const querySnapshot = await getDocs(q);
  if(!querySnapshot.empty){
    const userDoc = querySnapshot.docs[0].data();
    console.log("Fetched User Data:",userDoc)
    console.log("Setting user after login", userDoc);
    setUser(userDoc);
  }else {
      alert("No user document found.");
    }


  navigate("/Home")

}catch(err){
  alert(err)
}finally{
  setLoading(false);
}
};


  return (
    loading?<div className="login-spinner">
      <img src={Loading} alt='loading' />
    </div>:
    <div className='login'>
      
      <div className='login-form'>
        <h1>{signState}</h1>
        <form onSubmit={auth_user}>
  {signState === "Sign Up" && (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      type="text"
      placeholder="your name"
    />
  )}

  <input
    value={userEmail}
    onChange={(e) => setUserEmail(e.target.value)}
    type="email"
    placeholder="Email"
  />
  <input
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    type="password"
    placeholder="Password"
  />
  <button type="submit">{signState}</button>
</form>

        <div className='form-switch'>
          {signState === "Sign In"?<p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>
          :<p>Already have account? <span onClick={()=>{setSignState("Sign In")}}>Sign in Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login
