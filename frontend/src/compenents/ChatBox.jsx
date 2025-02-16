import { useState ,useEffect} from "react";
import "../styles/ChatBox.css"; 
import axios from 'axios'
export default function ChatBox({ onSend }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
    // Fetch chat history when the component loads
    useEffect(() => {
      fetchChatHistory();
    }, []);
  
    const fetchChatHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat");
        setMessages(res.data); // Update chat history
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
  
    const sendMessage = async () => {
      if (!input.trim()) return;
  
      // Add user message immediately
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: "user" }]);
  
      try {
        const res = await axios.post("http://localhost:5000/api/chat", { message: input });
  
        const botMessage = { text: res.data.reply, sender: "bot" };
  
        // Update state with bot message
        setMessages((prevMessages) => [...prevMessages, botMessage]);
  
        // Fetch updated chat history
        fetchChatHistory();
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Error with AI response.");
      }
  
      setInput(""); // Clear input field
    };
  
    return (
      <div className="chatbox-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
  
        <input
          type="text"
          placeholder="Message Jarvis..."
          className="chatbox-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-btn" onClick={sendMessage}>➤</button>
      </div>
    );
  }
  