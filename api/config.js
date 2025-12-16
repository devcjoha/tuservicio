import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT;
export const mongodb_uri_key = process.env.MONGODB_URI;
export const db_name = process.env.DB_NAME;
export const frontend_url = process.env.FRONTEND_URL;
export const jwt_secret = process.env.JWT_SECRET;
export const isProduction = process.env.NODE_ENV === "production";