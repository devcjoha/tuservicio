"use client";

import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { loginSchema } from "@/utils/validationSchemas";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormField } from "../ui/FormField";


type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();


  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit = async (data: LoginData) => {
    try {
      await login(data);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login: Error al contactar con el servidor");
    }
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
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

      <Button
        type="submit"
        variant="primary"
        size="lg"
      >
        Iniciar Sesión
      </Button>
    </form>
  );
};