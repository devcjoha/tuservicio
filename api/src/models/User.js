import mongoose from "mongoose";
import bcrypt from "bcrypt";

const sessionSchema = new mongoose.Schema({
  device: String, // Ej: Chrome en Windows
  ip: String, // La dirección IP
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false, // Por defecto al registrarse es falso
    },
    emailVerificationToken: {type: String},
    emailVerificationExpires: {type: Date},
    identity: {
      documentType: {
        type: String,
        enum: ["DNI", "Cédula", "Pasaporte", "RIF"],
        required: true,
      },
      documentNumber: {
        type: String,
        unique: true,
        sparse: true, // Permite que sea null hasta que se verifique
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "verified", "rejected", "unsubmitted"],
        default: "unsubmitted",
      },
      verifiedAt: Date,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false, // Por defecto nadie está verificado hasta que pase la prueba
    },
    phoneVerificationCode: {type: String},
    role: {
      type: String,
      enum: ["user", "owner", "admin", "superadmin"],
      default: "user",
    },
    biometrics: {
      face: {
        faceId: String,
        isEnrolled: { type: Boolean, default: false },
        lastCheck: Date,
      },
      fingerprint: {
        credentialId: String, // ID único generado por el dispositivo
        publicKey: String, // Clave para verificar la firma
        isEnrolled: { type: Boolean, default: false },
        counter: Number, // Para prevenir ataques de replay
      },
      status: {
        type: String,
        enum: ["not_set", "active", "locked"],
        default: "not_set",
      },
    },
    permissions: {
      type: [String],
      default: [],
    },
    avatar: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dkjixw8hv/image/upload/v1768047844/icon-tuservicio-light_trov12.webp",
      },
      public_id: {
        type: String,
        default: null,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "paused"],
      default: "active",
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
    sessions: {type: [sessionSchema]}
  },
  {
    timestamps: true,
  }
);

// Hash automático antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
