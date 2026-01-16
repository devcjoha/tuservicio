import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 4000;
export const mongodb_uri_key = process.env.MONGODB_URI;
export const db_name = process.env.DB_NAME;
export const frontend_url = process.env.FRONTEND_URL;
export const backend_url = process.env.BACKEND_URL;
export const front_host = process.env.FRONT_HOST;
export const jwt_secret = process.env.JWT_SECRET;
export const isProduction = process.env.NODE_ENV === "production";
export const cloud_name= process.env.CLOUD_NAME;
export const api_key= process.env.API_KEY;
export const api_secret = process.env.API_SECRET;
export const email_user = process.env.EMAIL_USER;
export const email_pass = process.env.EMAIL_PASS;