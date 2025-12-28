import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      required: true,
    },

    address: {
      type: String,
      trim: true,
      required: true,
    },

    rif: {
      type: String,
      required: true,
      trim: true,
    },

    logo: {
      type: String,
      trim: true,
      default: "",
    },

    active: {
      type: Boolean,
      default: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Institution", institutionSchema);
