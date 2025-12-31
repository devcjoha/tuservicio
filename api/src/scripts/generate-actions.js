import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ruta al permissions.json del backend
const permissionsPath = path.resolve(__dirname, "../config/permissions.json");
// SALIDA dentro de api: api/src/lib/actions.ts
const outPath = path.resolve(__dirname, "../lib/actions.ts");

function generate() {
  if (!fs.existsSync(permissionsPath)) {
    console.error("No se encontró permissions.json:", permissionsPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(permissionsPath, "utf8");
  let json;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    console.error("Error parseando permissions.json:", err.message);
    process.exit(1);
  }

  const actions = json.actions || {};
  const keys = Object.keys(actions);

  const lines = [];
  lines.push("// AUTO-GENERADO desde permissions.json — no editar manualmente");
  lines.push("// Ejecuta: node src/scripts/generate-actions.js");
  lines.push("");
  lines.push("export const ACTIONS = {");
  keys.forEach((k) => lines.push(`  ${k}: "${k}",`));
  lines.push("} as const;");
  lines.push("");
  lines.push("export type ActionId = keyof typeof ACTIONS;");
  lines.push("");

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log("Generado:", outPath);
}

generate();