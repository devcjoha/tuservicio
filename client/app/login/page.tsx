"use client";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { LoginData } from "@/context/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";


export default function LoginPage() {

  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {setForm({ ...form, [e.target.name]: e.target.value });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Hubo un error al registrarte");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-brand-primary">Iniciar Sesión</h1>
        {error && (
          <p className="text-error text-sm mb-2">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="email@email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
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
    </div>
  );
};