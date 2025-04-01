import React, { useState } from "react";
import "../styles/Home.css";

export default function MicButton({ onVoiceInput }) {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => onVoiceInput(event.results[0][0].transcript);

    recognition.start();
  };

  return (
    <button 
      onClick={startListening} 
      className={`mic-button ${isListening ? "listening" : ""}`}
      disabled={isListening}
    >
      🎤
    </button>
  );
}
