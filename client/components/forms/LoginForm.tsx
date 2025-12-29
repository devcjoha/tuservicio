"use client";

import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { loginSchema } from "@/utils/validationSchemas";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormField } from "../ui/FormFields";
import { ErrorBanner } from "@/components/ui/ErrorBanner";

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login, error, clearError } = useAuth();
  const router = useRouter();


  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit = async (data: LoginData) => {
    clearError();
    try {
      const formData = new FormData();
      console.log("LOGIN", formData);

      // 2. Agregar campos de texto
      formData.append("email", data.email);
      formData.append("password", data.password);
      await login(data);
      router.push("/dashboard");
    } catch (err) {
      console.error("Error capturado en el Loginform:", err);
    }
    reset()
  };

  return (
    <div className="w-full">
      {/* 4. Muestra el banner si existe un error en el contexto */}
      <ErrorBanner message={error || ""} />
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
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

      <Button
        type="submit"
        variant="primary"
        size="lg"
      >
        Iniciar Sesión
      </Button>
      </form>
    </div>
  );
};