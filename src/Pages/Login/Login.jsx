import React, { useState, useEffect } from 'react';
import "./Login.css";
import Loading from "../../assets/Loading_icon.gif";
import { signUp, login, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { showSuccess, showError } from '../../utils/notification';

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/Home");
    }
  }, [user, navigate]);

  const auth_user = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let userCredential;

      if (signState === "Sign In") {
        userCredential = await login(userEmail, password);
      } else {
        userCredential = await signUp(name, userEmail, password);
      }

      // ✅ Handle errors properly
      if (userCredential?.error) {
        console.log("error1")
        showError(userCredential.error.message || "Authentication failed.");
        setLoading(false);
        return;
      }

      if (!userCredential?.user) {
        console.log("error2")
        showError("Authentication failed.");
        setLoading(false);
        return;
      }

      const userData = userCredential.user;
      setUser(userData);

      // Fetch user document from Firestore
      const q = query(collection(db, "users"), where("uid", "==", userData.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        console.log("Fetched User Data:", userDoc);
      } else {
        console.warn("No user document found in Firestore.");
      }

      showSuccess(signState === "Sign In" ? "Login successful!" : "Account created successfully!");
      navigate("/Home");

    } catch (err) {
      showError(err.message || "An error occurred during authentication.");
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    loading ? (
      <div className="login-spinner">
        <img src={Loading} alt="loading" />
      </div>
    ) : (
      <div className="login">
        <div className="login-form">
          <h1>{signState}</h1>
          <form onSubmit={auth_user}>
            {signState === "Sign Up" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your name"
                required
              />
            )}

            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
            <button type="submit">{signState}</button>
          </form>

          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>
                New here?{" "}
                <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setSignState("Sign In")}>Sign In</span>
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
