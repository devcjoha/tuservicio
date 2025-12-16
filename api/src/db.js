import mongoose from "mongoose";
import { mongodb_uri_key, db_name } from "../config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_uri_key, {
      dbName: db_name,
    });
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};