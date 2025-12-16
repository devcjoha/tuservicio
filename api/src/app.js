import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { frontend_url } from "../config.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import institutionRoutes from "./routes/institutionRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";


const app = express();

app.use(
  cors({
    origin: frontend_url,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/services", serviceRoutes);

export default app;