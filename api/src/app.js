import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { frontend_url } from "../config.js";
import authRoutes from "./auth/index.js";
import userRoutes from "./user/index.js";
import permissionsRoute from "./config/index.js";
import companyRoutes from "./company/index.js";
import serviceRoutes from "./service/index.js";

import requestRoutes from "./request/index.js";
import employeeRoutes from "./employees/index.js";
import statsRoutes from "./stats/index.js";
import supportRoutes from "./support/index.js";

import path from "path";
import { fileURLToPath } from "url";

import systemRoutes from "./system/index.js";

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
app.use("/api/permissions", permissionsRoute);
app.use("/api/companies", companyRoutes);
app.use("/api/services", serviceRoutes);

app.use("/api/request", requestRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/system", systemRoutes);

// ... después de tus middlewares de express.json()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

export default app;
