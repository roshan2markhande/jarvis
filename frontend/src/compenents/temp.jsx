// import React, { useState } from "react";
// import "../styles/ChatBox.css";

// export default function ChatBox({ onSend }) {
//   const [input, setInput] = useState("");

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     onSend(input);
//     setInput(""); // Clear input after sending
//   };

//   const startListening = () => {
//     const recognition = new window.webkitSpeechRecognition();
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
//           <button className="mic-button" onClick={startListening}>🎤</button>
//         </div>
//       </div>
//     </div>
//   );
// }
// -------------
// import React from "react";
// import "../styles/ChatHistory.css";
// import { IoCheckmarkDoneSharp } from "react-icons/io5";

// export default function ChatHistory({ messages }) {
//   return (
//     <div className="chat-history-container">
//       <h2 className="history-title">Chat History</h2>

//       <div className="chat-history-messages">
//         {messages.length > 0 ? (
//           messages.map((msg, index) => (
//             <div key={index} className={`message ${msg.sender}`}>
//               <div className="message-content">{msg.text}</div>
//               {msg.sender === "user" && <IoCheckmarkDoneSharp className="read-tick" />}
//             </div>
//           ))
//         ) : (
//           <p className="no-history">No previous conversations.</p>
//         )}
//       </div>
//     </div>
//   );
// }
// ----------
// import "../styles/Home.css"; 
// export default function MicButton({ onVoiceInput }) {
//   const startListening = () => {
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.onresult = (event) => onVoiceInput(event.results[0][0].transcript);
//     recognition.start();
//   };

//   return (
//     <button onClick={startListening} className="mic-button">
//       🎤
//     </button>
//   );
// }
