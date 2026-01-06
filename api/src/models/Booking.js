import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
      index: true
    },
    addressSnapshot: {
      street: String,
      city: String,
      state: String,
      details: String,
      postalCode: String,
      coordinates: {
        type: [Number], // [long, lat]
        default: undefined,
      },
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "completed",
        "cancelled",
        "disputed",
      ],
      default: "pending",
    },
    price: Number,
    currency: String,
    paymentMethod: {
      type: String,
      enum: ["cash", "transfer", "zelle", "binance", "paypal"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "confirmed", "refunded"],
      default: "pending",
    },
    clientNotes: String,
    providerNotes: String,
    cancellationReason: String,
    completedAt: Date,
    rating: {
      score: { type: Number, min: 1, max: 5 },
      comment: String,
      date: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);
// Índice compuesto útil para búsquedas por proveedor y rango de fecha
bookingSchema.index({ provider: 1, scheduledAt: 1 });
export default mongoose.model("Booking", bookingSchema);