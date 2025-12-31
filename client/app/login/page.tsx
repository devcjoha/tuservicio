"use client";
import LoginForm from "@/components/forms/LoginForm";
import Logo from "@/components/icons/Logo";
import Link from "next/link";



export default function LoginPage() {

  return (
    <div className="login-page min-h-screen flex flex-col items-center lg:justify-center bg-background gap-10">

      <div className="login-page flex flex-col items-start space-y-8 lg:w-100 w-screen p-4">
        <div className="logo mt-3">
          <Logo />
        </div>
        <h1 className="font-bold text-size-title ">Iniciar Sesión</h1>
        <LoginForm />
        <div className="flex flex-row w-full justify-center gap-5 lg:text-[.8rem] text-[.8rem]">
          <Link href={"/register"} className="login-page hover:text-success hover:font-medium">Registrarme</Link><span>-</span>
          <Link href={"/"} className="login-page hover:text-success hover:font-medium">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>

    </div>
  );
};