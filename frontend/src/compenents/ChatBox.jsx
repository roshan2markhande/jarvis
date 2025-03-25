import React, { useState } from "react";
import "../styles/ChatBox.css";

export default function ChatBox({ onSend }) {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput(""); // Clear input after sending
  };

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onSend(transcript);
    };
    recognition.start();
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-input-wrapper">
        <input
          type="text"
          placeholder="Message Jarvis..."
          className="chatbox-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <div className="chatbox-buttons">
          <button className="send-btn" onClick={sendMessage}>➤</button>
          <button className="mic-button" onClick={startListening}>🎤</button>
        </div>
      </div>
    </div>
  );
}
