import PublicLayout from "../layouts/PublicLayout";
import Title from "../components/auth/Title";
import DefaultInput from "../components/forms/DefaultInput";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../validation/authSchemas";

type RegErrors = {
  nombre?: string;
  apellido?: string;
  correo?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formErrors, setFormErrors] = useState<RegErrors>({});
  const { register: registerFn, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación Yup
    try {
      await registerSchema.validate(
        { nombre, apellido, correo, password, confirmPassword },
        { abortEarly: false }
      );
      setFormErrors({});
    } catch (err: any) {
      if (err?.inner?.length) {
        const collected: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          if (e?.path && !collected[e.path]) collected[e.path] = e.message;
        });
        setFormErrors(collected as RegErrors);
      }
      return;
    }

    const ok = await registerFn({ nombre, apellido, correo, password });
    if (ok) {
      navigate("/login");
    }
  };

  return (
    <PublicLayout>
      <main className="min-h-screen flex items-start justify-center overflow-y-auto py-8">
        <div className="flex flex-col xl:flex-row items-center justify-center gap-[60px] px-4 xl:px-6">
          <div className="w-full sm:w-96 flex flex-col justify-center">
            <Title title="Registro" subtitle="Crea tu cuenta" />

            <form
              onSubmit={handleRegister}
              className="w-full max-w-[580px] mx-auto"
            >
              <div className="mb-4">
                <DefaultInput
                  label="Nombre"
                  type="text"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
                {formErrors.nombre && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.nombre}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <DefaultInput
                  label="Apellido"
                  type="text"
                  value={apellido}
                  onChange={e => setApellido(e.target.value)}
                />
                {formErrors.apellido && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.apellido}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <DefaultInput
                  label="Email"
                  type="email"
                  value={correo}
                  onChange={e => setCorreo(e.target.value)}
                />
                {formErrors.correo && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.correo}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <DefaultInput
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                {formErrors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <DefaultInput
                  label="Confirma Contraseña"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                {formErrors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>

              {error && (
                <div className="text-red-600 font-medium mb-4 text-center">
                  {error}
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="max-w-44 w-full p-3 bg-black text-white rounded-full font-semibold text-[20px]"
                >
                  {loading ? "Creando..." : "Crear cuenta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
