// import React, { useState } from "react";
// import "../styles/ChatBox.css";

// export default function ChatBox({ onSend }) {
//   const [input, setInput] = useState("");
//   const [isListening, setIsListening] = useState(false);

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     onSend(input);
//     setInput("");
//   };

//   const startListening = () => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       alert("Speech Recognition not supported in this browser.");
//       return;
//     }

//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.onstart = () => setIsListening(true);
//     recognition.onend = () => setIsListening(false);
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       onSend(transcript);
//     };

//     recognition.start();
//   };

//   return (
//     <div className="chatbox-container">
//       <div className="chatbox-input-wrapper">
//         <input
//           type="text"
//           placeholder="Message Jarvis..."
//           className="chatbox-input"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <div className="chatbox-buttons">
//           <button className="send-btn" onClick={sendMessage}>➤</button>
//           <button 
//             className={`mic-button ${isListening ? "listening" : ""}`} 
//             onClick={startListening}
//             disabled={isListening}
//           >
//             🎤
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import "../styles/ChatBox.css";

export default function ChatBox({ onSend }) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    onSend(input); // Send chat message
    handleCommand(input); // Execute any command
    setInput("");
  };

  const handleCommand = async (command) => {
    try {
      alert('call done')
      const [cmd, ...args] = command.split(" ");
      let body = { command: "", selector: "", value: "", url: "" };

      if (cmd === "click") {
        body.command = "click";
        body.selector = args.join(" ");
      } else if (cmd === "type") {
        body.command = "type";
        body.selector = args[0];
        body.value = args.slice(1).join(" ");
      } else if (cmd === "navigate") {
        body.command = "navigate";
        body.url = args.join(" ");
      } else if (cmd === "open") {
        // Assuming this is for OS-level commands (like Paint or Notepad)
        body.command = "open";
        body.value = args.join(" "); // Value contains the application name
      } else {
        alert("Invalid command");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/execute-command", body);
      if (response.data.script) {
        eval(response.data.script); // Execute the returned script
      } else {
        alert(response.data.error || "Failed to execute command");
      }
    } catch (error) {
      console.error("Error executing command:", error);
      alert("Error executing command");
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onSend(transcript);
      handleCommand(transcript); // Execute command on voice input
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
          <button 
            className={`mic-button ${isListening ? "listening" : ""}`} 
            onClick={startListening}
            disabled={isListening}
          >
            🎤
          </button>
        </div>
      </div>
    </div>
  );
}
