import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
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
    categories: {
      type: [String], // Aquí le dices a Mongo: "esto es una lista de textos"
      enum: [
        "Plomería",
        "Electricidad",
        "Limpieza",
        "Albañilería",
        "Cerrajería",
      ],
      required: true,
      default: [], // Es buena práctica empezar con un array vacío
    },
    businessModel: {
      type: String,
      enum: [
        "Oficio-Independiente",
        "Empresa",
        "Cooperativa",
        "Profesional-independiente",
      ],
      default: "Independiente",
    },
    logo: {
      url: { type: String, default: "" },
      public_id: { type: String, default: null },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "paused"],
      default: "active",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", companySchema);
