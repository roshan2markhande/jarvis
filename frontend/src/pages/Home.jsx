import React, { useState } from "react";
import ChatBox from "../compenents/ChatBox";
import ChatHistory from "../compenents/ChatHistory";
import MicButton from "../compenents/MicButton";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, sender: "user" }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "AI Response...", sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="home-container">
      {/* ✅ Header (Like ChatGPT) */}
      <header className="header">
        <h1>Jarvis AI</h1>
        <button className="logout-btn" onClick={() => navigate("/login")}>Logout</button>
      </header>

      {/* ✅ Separate Chat History Component */}
      <ChatHistory />

      {/* ✅ Chat Input & Mic at Bottom */}
      <div className="chat-input">
        <ChatBox onSend={handleSendMessage} />
        <MicButton onVoiceInput={handleSendMessage} />
      </div>
    </div>
  );
};

export default Home;
