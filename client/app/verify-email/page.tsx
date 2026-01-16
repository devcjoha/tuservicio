"use client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoadingCard } from "@/components/feedbacks/LoadingCard";
import { useModal } from "@/hooks/useModal";

export default function VerifyEmailPage() {
  const { user, error: errorApi, checkSession, resendVerifyEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { open } = useModal();
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (counter <= 0) return;

    const timer = setInterval(() => {
      setCounter(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (user && user?.emailVerificationExpires) {
      const expires = new Date(user.emailVerificationExpires).
        getTime();

      const now = Date.now();
      const seconds = Math.floor((expires - now) / 1000);
      if (expires > now) {
        setCounter(seconds);
      } else {
        setCounter(0);
      }
    };
  }, [user])

  useEffect(() => {
    try {
      const errorType = searchParams.get("error")
      const success = searchParams.get("success");
      if (success === "true") {
        checkSession();
        router.replace("/verify-email");
        return;
      }
      if (user && user.isEmailVerified) {

        open({
          title: "Verificación de email",
          message: "Email verificado con éxito, ya puedes iniciar sessión",
          variant: "success", // O la acción que prefieras
          onClose: () => setIsModalOpen(false),

        });
        router.push("/login");
        <LoadingCard message={"Redirigiendo..."} />
      }
      if (errorType) {
        const errorConfigs: Record<string, { title: string; message: string }> = {
          no_token: {
            title: "Enlace Expirado o inválido",
            message: "Tu enlace no existe o ha vencido."
          },
          no_user: {
            title: "Enlace Inválido",
            message: "El código de verificación no es correcto o ya se usó."
          },
          server_error: {
            title: "Error al verificar el correo",
            message: "El código de verificación no es correcto o ya se usó."
          }
        };
        const config = errorConfigs[errorType] || {
          title: "Error de Verificación",
          message: "Ocurrió un error inesperado."
        };

        open({
          title: config.title,
          message: config.message,
          variant: "error",
          // O la acción que prefieras
        });
        router.push("/verify-email")
      }
    } catch (error) {
      console.log(error);
      router.push("/register");
    }
  }, [user?.isEmailVerified, router, searchParams]);


  const handleCheckStatus = async () => {
    try {
      await checkSession(); // Esto disparará el refresh si es necesario
    } catch (err: any) {
      if (err.status === 401) {
        sessionStorage.removeItem("session_active");
        router.push("/login");
      }
    }
  };
  const formatTime = (counter: number) => {
    const minutes = Math.floor(counter / 60);
    const remainingSeconds = counter % 60;

    // padStart añade un "0" a la izquierda si el número tiene menos de 2 dígitos
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Si la pestaña vuelve a estar visible y el usuario existe pero no está verificado
      if (document.visibilityState === "visible" && user && !user.isEmailVerified) {
        console.log("Sincronizando estado...");
        checkSession();
      }
    };

    // Escuchar el evento de cambio de visibilidad
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [user, checkSession]);

  const handleResendClick = async () => {
    const res = await resendVerifyEmail();
    if (res?.success) {
      if (res.message.includes("Su email ya fue verificado.")) {
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setCounter(600);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">

      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">¡Casi listo, {user?.name}! 📧</h1>
        <p className="text-gray-600 mb-6">
          Hemos enviado un enlace de verificación a: <br />
          <span className="font-semibold text-primary">{user?.email}</span>
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Por favor, revisa tu bandeja de entrada (y la carpeta de spam).
          Una vez que hagas clic en el enlace, podrás acceder a tu panel.
        </p>

        <div className="space-y-4 flex flex-col items-center">

          <Button onClick={handleCheckStatus} className="w-full h-10">
            Ya hice clic en el enlace
          </Button>

          <div className=" flex  flex-col h-20 w-full justify-between items-center">
            <p className="text-[.8rem] h-5">¿No recibiste el correo?</p>
            <Button onClick={handleResendClick} className="w-full" disabled={counter > 0}>
              {counter > 0
                ? `Reenviar en ${formatTime(counter)}`
                : "Reenviar"}
            </Button>
            <p className="text-[.7rem] text-accent font-medium"> {counter > 0
              ? ``
              : "Enlace vencido"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};