import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PermissionsModel from "../models/Permissions.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function generatePermissionTypes(){
  try {
  // 1. Ruta hacia donde quieres que aparezca el archivo en tu FRONTEND

  const outputPath = path.resolve(__dirname, '../../../client/types/permissions.ts');

    const permissions = await PermissionsModel.findOne().lean();
    if (!permissions) throw new Error("Permissions document not found");
    
  // 2. Extraer las llaves de las acciones
  const actionKeys = Object.keys(permissions.actions);
  const actionValues = Object.values(permissions.actions);

  // 3. Crear el contenido del archivo TypeScript
  const typeContent = `
  /** * ARCHIVO GENERADO AUTOMÁTICAMENTE POR EL BACKEND
   * NO EDITAR MANUALMENTE */
 
  export type ActionId =
   ${actionKeys.map(key => `"${key}"`).join(' | ')};

  export type ActionType =
  ${actionValues.map(key => `"${key.required}"`).join('\n  | ')};

  export const PERMISSIONS_ROLES = ${JSON.stringify(permissions.roles, null, 2)} as const;
  
  export const PERMISSIONS_LINKS = ${JSON.stringify(permissions.actions, null, 2)} as const;
  `.trim();
  
    // Crear la carpeta si no existe
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    fs.writeFileSync(outputPath, typeContent);
    console.log('✅ Tipos de permisos sincronizados con el Frontend');
  } catch (error) {
    console.error('❌ Error generando tipos de permisos:', error);
  }
};