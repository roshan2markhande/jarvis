import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FaceRecognition from "../compenents/FaceRecognition";
import "../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null);

  const handleFaceCapture = (file) => {
    setCapturedImage(file);
  };

  const handleFaceSignup = async () => {
    if (!capturedImage) {
      alert("Please capture your face first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", capturedImage);
  
    try {
      const response = await fetch("http://localhost:5000/api/face/signup", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        navigate("/login");
      } else {
        alert("Face registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  
  return (
    <div className="signup-container">
      <h2>Register Face</h2>
      <FaceRecognition onCapture={handleFaceCapture} />
      <button onClick={handleFaceSignup}>Sign Up</button>
      <p>Already have an account? <span onClick={() => navigate("/login")} className="login-link">Login</span></p>
    </div>
  );
};

export default Signup;
