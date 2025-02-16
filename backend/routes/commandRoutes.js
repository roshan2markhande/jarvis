import express from "express";
import { executeCommand } from "../controllers/commandController.js";

const router = express.Router();
router.post("/", executeCommand);

export default router;
