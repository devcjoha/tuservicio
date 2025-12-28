import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/validationSchemas";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import z from "zod";
import { FormField } from "../ui/FormFields";

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { registerAuth } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<RegisterData>({
      resolver: zodResolver(registerSchema),
    });

  const onSubmit = async (data: RegisterData) => {

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      await registerAuth(data);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Register: Error en el servidor");
    }
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">

      <FormField
        name="name"
        label="Nombre"
        register={register("name")}
        error={errors.name}
        fieldType="input"
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
        name="password"
        label="Password"
        type="password"
        register={register("password")}
        error={errors.password}
        fieldType="input"
      />

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