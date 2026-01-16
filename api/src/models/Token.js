// api/src/models/Token.js
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["VERIFY_EMAIL", "PASSWORD_RESET"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600, // 10minutos. MongoDB borrará el documento automáticamente.
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Token", tokenSchema);
