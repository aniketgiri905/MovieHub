import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router";

const ForgotPassword = ({ setIsForgotPassword }) => {
  const [forgotUsername, setForgotUsername] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setForgotUsername(e.target.value);
  };

  const handleDateChange = (e) => {
    setDob(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating sending password reset link
    if (!forgotUsername) {
      setError("Please enter a valid username");
      return;
    }

    // Check if a valid date of birth is entered (ensure it's not a future date)
    const today = new Date().toISOString().split("T")[0];
    if (dob > today) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(
        (user) => user.username === forgotUsername && user.dob === dob
      );
      
      if (!userExists) {
        setError("No account found with that username and date of birth.");
        return;
      } else {
        setError("");
        window.alert(`Your password is: ${userExists.password}`); 
        navigate("/login");
      }
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    navigate("/login");
  };

  return (
    <div className="ForgotPassword forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={forgotUsername}
          onChange={handleUsernameChange}
          required
        />
        <input type="date" value={dob} onChange={handleDateChange} required />
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Get Password</button>
      </form>
      <button onClick={handleBackToLogin}>Back to Login</button>
    </div>
  );
};

export default ForgotPassword;
