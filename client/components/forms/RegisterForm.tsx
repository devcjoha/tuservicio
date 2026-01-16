import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/validationSchemas";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import z from "zod";
import { FormField } from "../ui/FormFields";
import { useModal } from "@/hooks/useModal";

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { registerAuth, user } = useAuth();
  const router = useRouter();
  const { close } = useModal();

  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } =
    useForm<RegisterData>({
      resolver: zodResolver(registerSchema),
    });

  const onSubmit = async (data: RegisterData) => {

    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        identity: {
          documentType: data.documentType,
          documentNumber: data.documentNumber
        } 
      };
     
      await registerAuth(payload);
      setTimeout(() => { close(); }, 1000);
   
        router.push("/verify-email");
   
    } catch (err) {
      console.error("Register:", err);
      setTimeout(() => { close(); }, 5000);
    }
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">

      <FormField
        name="name"
        label="Nombre y Apellido"
        register={register("name")}
        error={errors.name}
        fieldType="input"
        placeholder="Nombre y Apellido"
      />

      <FormField
        name="email"
        label="Email"
        type="email"
        register={register("email")}
        error={errors.email}
        fieldType="input"
      />
      <FormField
        name="phone"
        label="Teléfono"
        register={register("phone")}
        error={errors.phone}
        fieldType="input"
      />
      <FormField
        register={register("documentType")}
        name="documentType"
        label="Documento de Indentificación"
        fieldType="select-custom"
        control={control} // <-- aquí debe ir control 
        error={errors.documentType}
        options={[
          { value: "Cédula", label: "Cédula" },
          { value: "Pasaporte", label: "Pasaporte" },
          { value: "RIF", label: "RIF" },
        ]}
      />
      <FormField
        name="documentNumber"
        label="Numero de documento"
        register={register("documentNumber")}
        error={errors.documentNumber}
        fieldType="input"
      />
      <div>
        <FormField
          name="password"
          label="Password"
          type="password"
          register={register("password")}
          error={errors.password}
          fieldType="input"
        /><span className="text-[.7rem] text-gray-400 italic space-y-0">(8 min, @$!%*?&, Mayúscula)</span>
      </div>

      <FormField
        name="confirmPassword"
        label="Confirmar Password"
        type="password"
        register={register("confirmPassword")}
        error={errors.confirmPassword}
        fieldType="input"
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrar"}
      </Button>
    </form>
  );
};