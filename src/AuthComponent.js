import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Handle sign-up
  const handleSignUp = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError(""); // Clear any previous errors
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    }
  };

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError(""); // Clear any previous errors
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(error.message);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(""); // Clear any previous errors
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error.message);
      setError(error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{user ? `Welcome, ${user.email}` : "Please Sign Up or Log In"}</h2>

      {/* Display error message if there's an error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ margin: "10px 0" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", width: "200px", marginRight: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "200px" }}
        />
      </div>

      <div style={{ margin: "20px 0" }}>
        <button onClick={handleSignUp} style={{ padding: "10px 20px", marginRight: "10px" }}>
          Sign Up
        </button>
        <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
          Login
        </button>
      </div>

      {/* Display logout button only if the user is logged in */}
      {user && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
