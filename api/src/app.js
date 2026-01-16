import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { front_host, frontend_url } from "../config.js";
import authRoutes from "./auth/index.js";
import userRoutes from "./user/index.js";
import companyRoutes from "./company/index.js";
import serviceRoutes from "./service/index.js";

import requestRoutes from "./request/index.js";
import employeeRoutes from "./employees/index.js";
import statsRoutes from "./stats/index.js";
import supportRoutes from "./support/index.js";

import systemRoutes from "./system/index.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

const allowedOrigins = [
  frontend_url, front_host, // tu IP local 'http://tu-dominio.com' 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
app.use("/api/companies", companyRoutes);
app.use("/api/services", serviceRoutes);

app.use("/api/request", requestRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/system", systemRoutes);

app.use(errorHandler);

export default app;
