import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    subcategory: {
      type: String,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      index: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    pricing: {
      type: {
        type: String,
        enum: ["hourly", "fixed", "negotiable", "free"],
      },
      amount: Number,
      currency: {
        type: String,
        default: "USD",
        uppercase: true,
        minlength: 3,
        maxlength: 3,
      },
      unit: String, // por hora, por proyecto, etc.
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      }, // [long, lat]
    },
    serviceArea: {
      type: [String],
    }, // Zonas donde trabaja
    availability: {
      days: {
        type: [String],
        enum: [
          "lunes",
          "martes",
          "miércoles",
          "jueves",
          "viernes",
          "sábado",
          "domingo",
        ],
        default: [],
      }, // ['monday', 'tuesday']
      hours: {
        start: String,
        end: String,
      },
      emergency: {
        type: Boolean,
        default: false,
      },
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "paused"],
      default: "active",
    },
    tags: [String],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

serviceSchema.index({ location: "2dsphere" });
serviceSchema.index({ category: 1, featured: -1 });

export default mongoose.model("Service", serviceSchema);
