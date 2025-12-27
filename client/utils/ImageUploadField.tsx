import { Input } from "@/components/ui/Input";
import { useState, useEffect } from "react";
import { FieldError } from "react-hook-form";

interface Props {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const ImageUploadField = ({ label, register, error }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="file"
        accept="image/*"
        {...register}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};
// type ImageUploadFieldProps = {
//   label: string;
//   register?: any; // si usas RHF
//   error?: FieldError;
//   onFileSelect?: (file: File) => void; // callback para backend
//   accept?: string;
//   fileList?: string; 
// };

// export function ImageUploadField({
//   label,
//   register,
//   error,
//   onFileSelect,
//   accept = "image/*",
// }: ImageUploadFieldProps) {

//   const [preview, setPreview] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//       onFileSelect?.(file); // lo mandas al backend o contexto
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [preview]);

//   return (
//     <div className="flex flex-col gap-2">
//       <Input
//         label={label}
//         type="file"
//         accept={accept}
//         {...(register || {})}
//         onChange={handleChange}
//         className="w-full border rounded-md px-3 py-2"
//       />
//       {error && <span className="text-sm text-red-600">{error.message}</span>}
//       {preview && (
//         <img
//           src={preview}
//           alt="Preview"
//           className="w-32 h-32 object-contain border rounded-md mt-2"
//         />
//       )}
//     </div>
//   );
// };