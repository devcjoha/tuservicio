"use client";
import LoginForm from "@/components/forms/LoginForm";
import Logo from "@/components/icons/Logo";

export default function LoginPage() {

  return (
    <div className="login-page min-h-screen flex flex-col items-center justify-center bg-background gap-10">
      <div className="flex flex-col items-start space-y-6 lg:w-100 w-screen p-4">
        <Logo />
        <h1 className="font-bold text-size-title ">Iniciar Sesión</h1>
        <LoginForm />
      </div>

    </div>
  );
};