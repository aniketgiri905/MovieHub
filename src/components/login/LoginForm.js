import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router";

const LoginForm = ({ userNavigateToLoginSignup, setIsUserLoggedIn }) => {
  const [activeTab, setActiveTab] = useState(userNavigateToLoginSignup);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState(""); // To display login error message
  const [signupError, setSignupError] = useState(""); // To display signup error message
  const navigate = useNavigate();

  // Track the previous page the user was on
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    // Check if the user is trying to go to a restricted page before login (like Watchlist)
    const intendedPage = localStorage.getItem("redirectTo");
    if (intendedPage) {
      setRedirectTo(intendedPage); // Store that page if found
    }
    setActiveTab(userNavigateToLoginSignup);
  }, [userNavigateToLoginSignup]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSignupUsername = (e) => {
    setSignupUsername(e.target.value);
  };
  const handleSignupPassword = (e) => {
    setSignupPassword(e.target.value);
  };
  const handleSignupConfirmPassword = (e) => {
    setSignupConfirmPassword(e.target.value);
  };

  const handleLoginUsername = (e) => {
    setLoginUsername(e.target.value);
  };
  const handleLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  // Function to handle login
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === loginUsername && u.password === loginPassword
    );

    if (user) {
      setLoginError("");
      alert("Login Successful");

      setIsUserLoggedIn(true);

      // After login, redirect to the intended page (if any)
      if (redirectTo) {
        navigate(redirectTo);
        localStorage.removeItem("redirectTo"); // Clear redirect after use
      } else {
        navigate("/"); // Default home page
      }
    } else {
      setLoginError("Invalid username or password");
    }
  };

  // Function to handle signup
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.username === signupUsername);

    if (existingUser) {
      setSignupError("Username already exists");
      return;
    }

    // Add new user to localStorage
    users.push({
      username: signupUsername,
      password: signupPassword,
    });
    localStorage.setItem("users", JSON.stringify(users));

    setSignupError(""); // Clear any previous error
    alert("Signup Successful");
    setActiveTab("login"); // Switch to login tab after signup
  };

  return (
    <div className="auth-form-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "login" ? "active" : ""}`}
          onClick={() => handleTabClick("login")}
        >
          Login
        </button>
        <button
          className={`tab-button ${activeTab === "signup" ? "active" : ""}`}
          onClick={() => handleTabClick("signup")}
        >
          Sign Up
        </button>
      </div>
      <div className="form-content">
        {activeTab === "login" ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <h2>Login</h2>
            <input
              type="text"
              value={loginUsername}
              placeholder="Enter your username"
              required
              onChange={handleLoginUsername}
            />
            <input
              type="password"
              value={loginPassword}
              placeholder="Enter your password"
              required
              onChange={handleLoginPassword}
            />
            {loginError && <p className="error-message">{loginError}</p>}
            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignupSubmit}>
            <h2>Sign Up</h2>
            <input
              type="text"
              value={signupUsername}
              placeholder="Enter username"
              required
              onChange={handleSignupUsername}
            />
            <input
              type="password"
              value={signupPassword}
              placeholder="Enter password"
              required
              onChange={handleSignupPassword}
            />
            <input
              type="password"
              value={signupConfirmPassword}
              placeholder="Confirm Password"
              required
              onChange={handleSignupConfirmPassword}
            />
            {signupError && <p className="error-message">{signupError}</p>}
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
