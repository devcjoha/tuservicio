"use client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { FormField } from "../ui/FormFields";
import { resetPasswordSchema } from "@/utils/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useModal } from "@/hooks/useModal";
import { useEffect } from "react";

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
    const { open } = useModal();
    
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<ResetPasswordData>({
      resolver: zodResolver(resetPasswordSchema),
      mode: "onChange"
    });
  
 
  
  const onSubmit = async (data: ResetPasswordData) => {
    const token = searchParams.get("token");
    const userId = searchParams.get("id");
      
    if (!token || !userId) {
      open({
        title: "Error",
        message: "Enlace de recuperación inválido o incompleto.",
        variant: "error",
      });
      return;
      }  
    try {
      const { password } = data;
      // 2. Construimos el objeto cumpliendo con la interfaz
      const payload: Record<string, any> = {
        password,
        token,
        userId
      };
      const res = await resetPassword(payload as any)
     
      if (res && res.success) {
        open({
          title: `Reestablecer Contraseña`,
          message: res.message,
          variant: "success",
          onClose: () => router.push("/login")
        });
        setTimeout(() => {
          router.push("/login")
        }, 2000);
      }
    } catch (error: any) {
      open({
        title: "Reestablecer Contraseña",
        message: error.message,
        variant: "error",
      });
      setTimeout(() => {
        router.push("/login")
      }, 2000);
    } finally {
      reset();
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">

      <div>
            <FormField
              name="password"
              label="Nueva Contraseña"
              type="password"
              register={register("password")}
              error={errors.password}
              fieldType="input"
            /><span className="text-[.7rem] text-gray-400 italic space-y-0">(8 min, @$!%*?&, Mayúscula)</span>
          
    
          <FormField
            name="confirmPassword"
            label="Confirmar nueva Contraseña"
            type="password"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
            fieldType="input"
      />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Reestableciendo..." : "Restablecer Contraseña"}
      </Button>
    </form >
  );
};