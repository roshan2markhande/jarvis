import express from "express";
import { faceSignup, faceLogin } from "../controllers/faceController.js";

const router = express.Router();

router.post("/signup", faceSignup);
router.post("/login", faceLogin);

export default router;
