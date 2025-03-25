import "../styles/Home.css"; 
export default function MicButton({ onVoiceInput }) {
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => onVoiceInput(event.results[0][0].transcript);
    recognition.start();
  };

  return (
    <button onClick={startListening} className="mic-button">
      🎤
    </button>
  );
}
