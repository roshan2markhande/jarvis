import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FaceRecognition from "../compenents/FaceRecognition";


const Signup = () => {
  const navigate = useNavigate();
  const [useFace, setUseFace] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFaceCapture = async (file) => {
    setCapturedImage(file);
    handleFaceSignup(file);
  };

  const handleFaceSignup = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:5000/api/face/signup", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        navigate("/login");
      } else {
        alert("Face registration failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleManualSignup = async () => {
    if (!userData.name || !userData.email || !userData.password) {
      alert("Fill all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/login");
      } else {
        alert("Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <div className="toggle">
        <button onClick={() => setUseFace(false)}>Use Email & Password</button>
        <button onClick={() => setUseFace(true)}>Use Face Recognition</button>
      </div>

      {useFace ? (
        <FaceRecognition onCapture={handleFaceCapture} />
      ) : (
        <>
          <input type="text" placeholder="Full Name" onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
          <input type="email" placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
          <input type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
          <button onClick={handleManualSignup}>Sign Up</button>
        </>
      )}

      <p>
        Already registered? <span onClick={() => navigate("/login")} className="link">Login</span>
      </p>
    </div>
  );
};

export default Signup;
