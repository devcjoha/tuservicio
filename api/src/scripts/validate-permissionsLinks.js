// scripts/validate-permissionLinks.js
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const permissionsPath = resolve(__dirname, "../permissions.json");
const linksPath = resolve(__dirname, "../src/lib/permissionLinks.ts");

if (!existsSync(permissionsPath)) {
  console.error("No se encontró permissions.json");
  process.exit(1);
}
if (!existsSync(linksPath)) {
  console.error("No se encontró src/lib/permissionLinks.ts");
  process.exit(1);
}

const permissions = JSON.parse(readFileSync(permissionsPath, "utf8"));
const permissionKeys = new Set(Object.keys(permissions.actions || {}));

const file = readFileSync(linksPath, "utf8");

// Extrae claves tipo KEY: { ...label: ... } al inicio de cada entry
const regex = /([A-Z0-9_]+)\s*:\s*{[\s\S]*?label\s*:/g;
const used = new Set();
let m;
while ((m = regex.exec(file)) !== null) {
  used.add(m[1]);
}

const missing = Array.from(used).filter((k) => !permissionKeys.has(k));
if (missing.length) {
  console.error(
    "ERROR: Las siguientes keys en permissionLinks no existen en permissions.json:"
  );
  missing.forEach((k) => console.error(" -", k));
  process.exit(1);
}

console.log(
  "Validación OK: todos los actionIds de permissionLinks existen en permissions.json"
);