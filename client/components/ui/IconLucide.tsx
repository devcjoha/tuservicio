import * as LucideIcons from "lucide-react";

const IconLucide = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};
export default IconLucide;


// const IconLucide = ({ name, className }: { name: string; className?: string }) => {
//   // 1. Función para convertir 'layout-dashboard' a 'LayoutDashboard'
//   const toPascalCase = (str: string) => {
//     if (!str) return "";
//     return str
//       .split("-")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join("");
//   };

//   const formattedName = toPascalCase(name);

//   // 2. Intentar obtener el componente
//   const IconComponent = (LucideIcons as any)[formattedName];

//   // 3. Log para depurar (mira tu consola del navegador)
//   if (!IconComponent) {
//     console.warn(`IconLucide: No se encontró el icono "${formattedName}" (original: "${name}")`);
//     return null;
//   }

//   return <IconComponent className={className} />;
// };

// export default IconLucide;
