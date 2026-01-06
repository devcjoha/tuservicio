"use client";

import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { loginSchema } from "@/utils/validationSchemas";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormField } from "../ui/FormFields";
import { useModal } from "@/hooks/useModal";

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login, clearError } = useAuth();
  const router = useRouter();
  const { close } = useModal();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    clearError();
    try {
      const formData = new FormData();
      
      // 2. Agregar campos de texto
      formData.append("email", data.email);
      formData.append("password", data.password);
      await login(data);
      console.log("LOGIN", );

      router.push("/dashboard");
      setTimeout(() => { close(); }, 1000);
    } catch (err) {
      console.error("Login Form:", err);
      setTimeout(() => { close(); }, 5000);
    }
    reset()
  };

  return (
    <div className="w-full">
     
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