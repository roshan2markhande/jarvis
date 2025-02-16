import React, { useRef, useState } from "react";

const FaceRecognition = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert canvas to Blob and create File object
    canvas.toBlob((blob) => {
      const file = new File([blob], "face_capture.png", { type: "image/png" });
      setImageFile(file);
      onCapture(file); // Send the file to parent component
    }, "image/png");
  };

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>
    </div>
  );
};

export default FaceRecognition;
