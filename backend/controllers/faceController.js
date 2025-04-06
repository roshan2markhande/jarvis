  import User from "../models/User.js";
  import fs from "fs";
  import multer from "multer";
  import { faceDetection } from "../utils/faceRecognition.js";

  // ✅ Configure Multer (File Upload)
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = "./uploads/";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `face_${Date.now()}.png`);
    },
  });

  const upload = multer({ storage }).single("image");

  // ✅ Face Signup (Register a new user with face data)
  export const faceSignup = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ message: "File upload failed", error: err });

      try {
        const imagePath = req.file.path;
        const faceDescriptor = await faceDetection(imagePath);

        if (!faceDescriptor) return res.status(400).json({ message: "No face detected!" });

        console.log("Saved Image Path:", imagePath);

        const newUser = new User({ faceData: Array.from(faceDescriptor) }); // ✅ Convert to array
        await newUser.save();

        res.json({ success: true, message: "Signup successful" });
      } catch (err) {
        res.status(500).json({ message: "Error signing up", error: err });
      }
    });
  };

  // ✅ Face Login (Authenticate user using face)
  export const faceLogin = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ message: "File upload failed", error: err });

      try {
        const imagePath = req.file.path;
        console.log("Uploaded Image for Login:", imagePath);

        let uploadedFaceDescriptor = await faceDetection(imagePath);
        if (!uploadedFaceDescriptor) return res.status(400).json({ message: "No face detected!" });

        uploadedFaceDescriptor = new Float32Array(uploadedFaceDescriptor); // ✅ Ensure correct format

        const users = await User.find({ faceData: { $exists: true, $ne: null } });
        if (users.length === 0) return res.status(404).json({ message: "No users with stored face data" });

        // ✅ Compare in parallel for speed
        const matches = await Promise.all(
          users.map(async (user) => {
            if (!user.faceData || user.faceData.length !== uploadedFaceDescriptor.length) return null;

            const storedDescriptor = new Float32Array(user.faceData);
            const similarity = cosineSimilarity(storedDescriptor, uploadedFaceDescriptor);

            return similarity > 0.6 ? { user, similarity } : null; // ✅ Lowered threshold for better matching
          })
        );

        // ✅ Get the best match
        const bestMatch = matches.filter((match) => match !== null).sort((a, b) => b.similarity - a.similarity)[0];

        if (!bestMatch) return res.status(401).json({ message: "Face not recognized" });

        res.json({ success: true, message: "Login successful", user: bestMatch.user });
      } catch (err) {
        console.error("❌ Face login error:", err);
        res.status(500).json({ message: "Error processing face login", error: err });
      }
    });
  };

  // ✅ Optimized Cosine Similarity Function (Faster & More Accurate)
  function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0.0, normA = 0.0, normB = 0.0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB)); // ✅ Cosine Similarity Formula
  }
