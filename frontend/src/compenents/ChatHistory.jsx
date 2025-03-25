import React from "react";
import "../styles/ChatHistory.css";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

export default function ChatHistory({ messages }) {
  return (
    <div className="chat-history-container">
      <h2 className="history-title">Chat History</h2>

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
