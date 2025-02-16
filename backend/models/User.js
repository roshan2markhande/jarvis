import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  faceData:{ type: [Number], required: true },
  name: { type: String, required: false },
  chatHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
});

export default mongoose.model("User", UserSchema);