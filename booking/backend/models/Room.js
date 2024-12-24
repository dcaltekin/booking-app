import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  type: { type: String, enum: ["Basic", "Premium", "Suite"], required: true },
  number: { type: Number, required: true, unique: true },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Room", roomSchema);
