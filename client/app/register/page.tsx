"use client";

import RegisterForm from "@/components/forms/RegisterForm";
import Logo from "@/components/icons/Logo";

export default function RegisterPage() {


  return (
    <main className="register-page min-h-screen flex flex-col items-center justify-center bg-background gap-10">
      <div className="flex flex-col items-start space-y-6 lg:w-100 w-screen p-4">
      <Logo />
       <h1 className="font-bold text-size-title ">Registro</h1>
      <RegisterForm />
      </div>
    </main>
  );
}