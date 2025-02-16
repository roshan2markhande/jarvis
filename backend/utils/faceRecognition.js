import * as faceapi from "face-api.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import canvas from "canvas";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Monkey-patch face-api.js with Node.js Canvas
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Path to models
const MODEL_PATH = path.join(__dirname, "../models");

// ✅ Load models function
async function loadModels() {
  try {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
    console.log("✅ FaceAPI models loaded successfully!");
  } catch (error) {
    console.error("❌ Error loading models:", error);
  }
}

// ✅ Face Detection Function
async function faceDetection(imagePath) {
  try {
    // Ensure models are loaded
    await loadModels();

    // Read image file
    const imgBuffer = await fs.promises.readFile(imagePath);

    // Load image into Canvas
    const img = await canvas.loadImage(imgBuffer);
    const myCanvas = new Canvas(img.width, img.height);
    const ctx = myCanvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Perform face detection
    const detection = await faceapi.detectSingleFace(myCanvas)
      .withFaceLandmarks()
      .withFaceDescriptor();

    return detection ? detection.descriptor : null;
  } catch (error) {
    console.error("❌ Face Detection Error:", error);
    return null;
  }
}

// ✅ Export functions correctly
export { loadModels, faceDetection };

// ✅ Load models on startup
loadModels();
