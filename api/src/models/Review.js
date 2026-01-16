import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      // Opcional: Solo se llena si el cliente está calificando el servicio recibido
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    type: {
      type: String,
      enum: ["client-to-provider", "provider-to-client"],
      required: true,
    },
  },
  { timestamps: true }
);

// Índice para evitar que un usuario califique dos veces la misma reserva
reviewSchema.index({ booking: 1, reviewer: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);