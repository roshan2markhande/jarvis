import Chat from "../models/Chat.js";
import { generateText } from "../services/huggingfaceService.js"; // Import the Hugging Face function

export const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    // Save user's message
    await Chat.create({ message, sender: "user" });

    // Generate AI response
    const botReply = await generateText(message) || "Sorry, I couldn't process that.";

    // Save AI response
    await Chat.create({ message: botReply, sender: "bot" });

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error in Hugging Face API:", error);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
};
