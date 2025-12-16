export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-brand-primary">Iniciar Sesión</h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo"
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border p-2 rounded"
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