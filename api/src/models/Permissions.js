// models/Permissions.js
import mongoose from "mongoose";

const ActionSchema = new mongoose.Schema(
  {
    required: { type: String, required: true },
    name: String,
    label: String,
    href: String,
    category: String,
    icon: String,
    description: String,
    order: Number,
  },
  { _id: false }
);

const PermissionsSchema = new mongoose.Schema(
  {
    actions: { type: Map, of: ActionSchema, required: true },
    roles: { type: Map, of: [String], required: true },
  },
  { collection: "permissions" }
);

const PermissionsModel = mongoose.model("Permissions", PermissionsSchema);

export default PermissionsModel;

// import mongoose from "mongoose";

// const permissionsSchema = new mongoose.Schema(
//   {
//     actions: {
//       type: Map,
//       of: Object, // Esto mapea las llaves "101", "202", etc., a sus objetos
//     },
//     roles: {
//       user: [String],
//       owner: [String],
//       admin: [String],
//       superadmin: [String],
//     },
//   },
//   {
//     collection: "permissions",
//     timestamps: true,
//   }
// );

// export default mongoose.model("Permissions", permissionsSchema);
