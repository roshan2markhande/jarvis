import React, { useRef, useState, useEffect } from "react";
import "../styles/FaceReco.css";

const FaceRecognition = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("Starting camera...");
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStatus("Looking for face...");
      detectFace();
    } catch (error) {
      setStatus("Camera access denied.");
      console.error("Camera error:", error);
    }
  };

  const detectFace = () => {
    setIsDetecting(true);
    setTimeout(() => {
      captureImage();
    }, 3000); // Simulate face detection delay
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], "face_capture.png", { type: "image/png" });
      setStatus("Face detected! Processing...");
      setTimeout(() => {
        onCapture(file);
      }, 1000);
    }, "image/png");
  };

  return (
    <div className="face-container">
      <video ref={videoRef} autoPlay className="camera-view"></video>
      <p className="status-text">{status}</p>
    </div>
  );
};

export default FaceRecognition;
