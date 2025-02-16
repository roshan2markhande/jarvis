import express from "express";
import Chat from "../models/Chat.js";
import { chatController } from "../controllers/chatController.js";

const router = express.Router();
router.post("/", chatController);


// Route to get chat history
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: 1 }); // Sort by timestamp
    res.json(chats);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export default router;

