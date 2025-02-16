import axios from "axios";

export default function CommandExecutor() {
  const executeCommand = async (command, selector, value) => {
    const res = await axios.post("http://localhost:5000/api/command", { command, selector, value });
    eval(res.data.script); // Executes the returned script
  };

  return (
    <div>
      <button onClick={() => executeCommand("click", "#login-btn")}>Click Login</button>
      <button onClick={() => executeCommand("type", "#search-bar", "Hello")}>Type in Search</button>
    </div>
  );
}
