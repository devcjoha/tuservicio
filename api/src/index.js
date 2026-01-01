import app from "./app.js";
import { port } from "../config.js";
import { connectDB } from "./db.js";
import { generatePermissionTypes } from "./utils/typeGenerator.js";

const startServer = async () => {
  try {
    await connectDB();
     generatePermissionTypes();
    app.listen(port, () => {
      console.log("🚀 Servidor corriendo en el puerto", port);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
};

startServer();