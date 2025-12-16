"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoLight from "@/public/logo/tuservicio-light.svg";
import logoDark from "@/public/logo/tuservicio-dark.svg";
import { useTheme } from "@/context/ThemeContext";

export default function RegisterPage() {
  const { theme } = useTheme();
  const { register, user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log("REGISTER", form);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register(form);
      router.push("/dashboard"); // luego redirigimos según rol
    } catch (err: any) {
      setError("Hubo un error al registrarte");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background gap-10">
      {/* LOGO */}
      <Image
        src={theme === "light" ? logoLight : logoDark}
        alt="logo-header"
        width={300}
        height={300}
        loading="eager"
        className="w-50 h-12 lg:w-70 lg:h-16" />
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-brand-primary">
          Crear cuenta
        </h1>

        {error && (
          <p className="text-error text-sm mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input
            name="name"
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

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
            className="bg-brand-secondary text-white py-2 rounded hover:bg-brand-secondary transition"
          >
            Registrarme
          </button>
        </form>
      </div>
    </main>
  );
}