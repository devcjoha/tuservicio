const mongoose = require("mongoose");
const PermissionsModel = require("./models/Permissions");
const permissionsData = require("./permissions.json");

async function seedPermissions() {
  await mongoose.connect(process.env.MONGO_URI);

  // Borra cualquier documento previo
  await PermissionsModel.deleteMany({});

  // Inserta el JSON completo
  await PermissionsModel.create(permissionsData);

  console.log("✅ Permisos insertados en MongoAtlas");
  process.exit(0);
}

seedPermissions();;