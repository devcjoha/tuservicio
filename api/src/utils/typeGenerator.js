import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import permissions from '../config/permissions.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generatePermissionTypes = () => {
  // 1. Ruta hacia donde quieres que aparezca el archivo en tu FRONTEND
  // Ajusta la cantidad de "../" según tu estructura de carpetas
  const outputPath = path.resolve(__dirname, '../../../client/types/permissions.ts');

  // 2. Extraer las llaves de las acciones
  const actionKeys = Object.keys(permissions.actions);
  
  // 3. Crear el contenido del archivo TypeScript
  const typeContent = `
/** * ARCHIVO GENERADO AUTOMÁTICAMENTE POR EL BACKEND
 * NO EDITAR MANUALMENTE */

export type ActionType = 
  | ${actionKeys.map(key => `"${key}"`).join('\n  | ')};

export const PERMISSIONS_LIST = ${JSON.stringify(permissions, null, 2)} as const;
  `.trim();

  try {
    // Crear la carpeta si no existe
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(outputPath, typeContent);
    console.log('✅ Tipos de permisos sincronizados con el Frontend');
  } catch (error) {
    console.error('❌ Error generando tipos de permisos:', error);
  }
};