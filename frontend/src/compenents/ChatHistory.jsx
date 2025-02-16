import { useState, useEffect } from "react";
import axios from "axios";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Fetch chat history on load
  useEffect(() => {
    axios.get("http://localhost:5000/api/chat")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching chat history:", err));
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { message: input, sender: "user" };
    setMessages([...messages, userMessage]); // Update UI immediately

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message: input });

      const botMessage = { message: res.data.reply, sender: "bot" };
      setMessages([...messages, userMessage, botMessage]); // Add bot reply
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput(""); // Clear input field
  };

  return (
    <div className="p-4 bg-gray-900 text-white">
      <div className="h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.sender === "user" ? "bg-blue-500" : "bg-gray-700"} rounded-md mb-2`}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 mt-2 border rounded text-black"
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="p-2 mt-2 bg-blue-600 rounded">
        Send
      </button>
    </div>
  );
}
