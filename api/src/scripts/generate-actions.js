// scripts/generate-actions.js
import { existsSync, readFileSync, mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";

const permissionsPath = resolve(__dirname, "../permissions.json");
const outPath = resolve(__dirname, "../src/lib/actions.ts");

function generate() {
  if (!existsSync(permissionsPath)) {
    console.error("No se encontró permissions.json en la raíz del repo.");
    process.exit(1);
  }

  const raw = readFileSync(permissionsPath, "utf8");
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
  lines.push("// Ejecuta: node scripts/generate-actions.js");
  lines.push("");
  lines.push("export const ACTIONS = {");
  keys.forEach((k) => {
    lines.push(`  ${k}: "${k}",`);
  });
  lines.push("} as const;");
  lines.push("");
  lines.push("export type ActionId = keyof typeof ACTIONS;");
  lines.push("");

  const content = lines.join("\n");

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, content, "utf8");
  console.log("Generado:", outPath);
}

generate();