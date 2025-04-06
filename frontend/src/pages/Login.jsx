  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import FaceRecognition from "../compenents/FaceRecognition";
  import "../styles/login.css";

  const Login = () => {
    const navigate = useNavigate();
    const [useFace, setUseFace] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
    });

    const handleFaceCapture = async (file) => {
      setCapturedImage(file);
      handleFaceLogin(file);
    };

    const handleFaceLogin = async (imageFile) => {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await fetch("http://localhost:5000/api/face/login", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          navigate("/home");
        } else {
          alert("Face not recognized.");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    };

    const handleManualLogin = async () => {
      if (!credentials.email || !credentials.password) {
        alert("Enter email and password.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (data.success) {
          navigate("/home");
        } else {
          alert("Invalid credentials.");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    };

    return (
      <div className="auth-container">
        <h2>Login</h2>
        <div className="toggle">
          <button onClick={() => setUseFace(false)}>Use Email & Password</button>
          <button onClick={() => setUseFace(true)}>Use Face Recognition</button>
        </div>

        {useFace ? (
          <FaceRecognition onCapture={handleFaceCapture} />
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button onClick={handleManualLogin}>Login</button>
          </>
        )}

        <p>
          No account? <span onClick={() => navigate("/signup")} className="link">Sign up</span>
        </p>
      </div>
    );
  };

  export default Login;
