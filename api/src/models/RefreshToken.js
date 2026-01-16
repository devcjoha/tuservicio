// models/RefreshToken.js
import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema(
  {
    refreshId: { type: String, required: true, unique: true, index: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    device: { type: String, required: true },
    ip: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true, index: true },
  },
  {
    timestamps: true,
  }
);

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
export default RefreshToken;
