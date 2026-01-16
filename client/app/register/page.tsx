"use client";
import RegisterForm from "@/components/forms/RegisterForm";
import Logo from "@/components/icons/Logo";
import Link from "next/link";
// import { useAuth } from "@/hooks/useAuth";
// import { LoadingDots } from "@/components/feedbacks/LoadingDots";

export default function RegisterPage() {
// const { loading } = useAuth();
  
//   if (loading) return <LoadingDots />
  return (
    <div className="register-page min-h-screen flex flex-col items-center lg:justify-center bg-background gap-10">
      <div className="flex flex-col items-start space-y-6 lg:w-100 w-screen p-4">
      <div className="logo mt-3">
        <Logo />
      </div>
       <h1 className="font-bold text-size-title ">Registro</h1>
        <RegisterForm />
         <div className="flex flex-row w-full justify-center gap-5 text-[.8rem]">
         <Link href={"/login"} className="register-page hover:text-success hover:font-medium">Iniciar sesión</Link><span>-</span>
         <Link href={"/"} className="register-page hover:text-success hover:font-medium">¿Olvidaste tu contraseña?</Link>
      </div>
      </div>
    </div>
  );
}