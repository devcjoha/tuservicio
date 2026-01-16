"use client";
import Logo from "@/components/icons/Logo";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { useSearchParams } from "next/navigation";


export default function ResetPasswordPage() {
  //   const searchParams = useSearchParams();
  // useEffect(() => {

  // }, [])
  return (
    <div className="register-page min-h-screen flex flex-col items-center lg:justify-center bg-background gap-10">
      <div className="flex flex-col items-start space-y-6 lg:w-100 w-screen p-4">
        <div className="logo mt-3">
          <Logo />
        </div>
        <h1 className="font-bold text-size-title ">Reestablecer Contraseña</h1>
        <ResetPasswordForm />
      </div>
    </div>

  );
};