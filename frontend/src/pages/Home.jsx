import React, { useState } from "react";
import ChatBox from "../compenents/ChatBox";  // Fixed typo in path
import ChatHistory from "../compenents/ChatHistory"; // Fixed typo in path
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    // Update ChatHistory with user message
    setMessages((prev) => [...prev, { text, sender: "user" }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "AI Response...", sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <h2>Jarvis AI</h2>
        <button className="logout-btn" onClick={() => navigate("/login")}>
          Logout
        </button>
      </header>

      {/* Chat History with messages passed as props */}
      <ChatHistory messages={messages} />

      {/* Chat Box to send messages */}
      <ChatBox onSend={handleSendMessage} />
    </div>
  );
};

export default Home;
