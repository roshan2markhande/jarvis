import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import faceRoutes from "./routes/faceRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import commandRoutes from "./routes/commandRoutes.js";

dotenv.config();
const app = express();
connectDB();
app.use(cors());

// Increase payload size limit to handle large images
app.use(bodyParser.json({ limit: "50mb" })); // Default is 100kb, increase as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/face", faceRoutes);
app.use("/api/chat", chatRoutes);
app.use(commandRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
