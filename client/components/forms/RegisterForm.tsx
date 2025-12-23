import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/validationSchemas";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import z from "zod";
import { FormField } from "./FormField";

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
        label="Nombre"
        register={register("name")}
        error={errors.name}
      />

      <FormField
        label="Email"
        type="email"
        register={register("email")}
        error={errors.email}
      />

      <FormField
        label="Password"
        type="password"
        register={register("password")}
        error={errors.password}
      />

      <FormField
        label="Confirmar Password"
        type="password"
        register={register("confirmPassword")}
        error={errors.confirmPassword}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrar"}
      </Button>
    </form>
  );
};