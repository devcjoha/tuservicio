"use client";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
export default function LoginPage() {
  const { theme } = useTheme();
  const { login, user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  console.log("LOGIN", form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(form);
      router.push("/dashboard"); // luego redirigimos según rol
    } catch (err: any) {
      setError("Hubo un error al registrarte");
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-brand-primary">Iniciar Sesión</h1>
        {error && (
          <p className="text-error text-sm mb-2">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-brand-primary text-white py-2 rounded hover:bg-brand-secondary transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
};