import React from "react";
import "../styles/ChatHistory.css";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5"; // Importing logout icon

export default function ChatHistory({ messages }) {
  const navigate = useNavigate();
  return (
    <div className="chat-history-container">
      <div className="history-header">
        <h2 className="history-title">Jarvis Smart Assistant</h2>
        <button className="icon-btn1" onClick={() => navigate("/login")}>
          <IoLogOutOutline />
        </button>
      </div>
      <div className="chat-history-messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <div className="message-content">{msg.text}</div>
              {msg.sender === "user" && <IoCheckmarkDoneSharp className="read-tick" />}
            </div>
          ))
        ) : (
          <p className="no-history">No previous conversations.</p>
        )}
      </div>
    </div>
  );
}
