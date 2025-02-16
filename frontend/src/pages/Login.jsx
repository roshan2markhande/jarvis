import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FaceRecognition from "../compenents/FaceRecognition";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null);

  const handleFaceCapture = (file) => {
    setCapturedImage(file);
  };

  const handleFaceLogin = async () => {
    if (!capturedImage) {
      alert("Please capture your face first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", capturedImage);
  
    try {
      const response = await fetch("http://localhost:5000/api/face/login", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        navigate("/home");
      } else {
        alert("Face not recognized. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  

  return (
    <div className="login-container">
      <h2>Face Recognition Login</h2>
      <FaceRecognition onCapture={handleFaceCapture} />
      <button onClick={handleFaceLogin}>Login</button>
      <p>Don't have an account? <span onClick={() => navigate("/signup")} className="signup-link">Sign up</span></p>
    </div>
  );
};

export default Login;
