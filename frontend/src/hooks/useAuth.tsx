import { useState } from "react";
import { loginUser, registerUser } from "../services/authAPI";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizeErr = (err: any, fallback: string) =>
    typeof err === "string" ? err : err?.message || fallback;

  const login = async (correo: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(correo, password);
      localStorage.setItem("token", data.token);
      return true;
    } catch (err: any) {
      setError(normalizeErr(err, "Error al iniciar sesión"));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: {
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(payload);
      if (data) {
        return true;
      }
      return false;
    } catch (err: any) {
      setError(normalizeErr(err, "Error al registrar"));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return { login, register, logout, loading, error };
}
