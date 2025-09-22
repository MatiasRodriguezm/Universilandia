import * as yup from "yup";

export const loginSchema = yup.object({
  correo: yup
    .string()
    .trim()
    .email("Email inválido")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .max(20, "Maximo 20 caracteres")
    .required("La contraseña es obligatoria"),
});

export const registerSchema = yup.object({
  nombre: yup
    .string()
    .trim()
    .min(2, "Mínimo 2 caracteres")
    .max(60, "Maximo 60 caracteres")
    .required("El nombre es obligatorio"),
  apellido: yup
    .string()
    .trim()
    .min(2, "Mínimo 2 caracteres")
    .max(60, "Maximo 60 caracteres")
    .required("El apellido es obligatorio"),
  correo: yup
    .string()
    .trim()
    .email("Email inválido")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .max(20, "Maximo 20 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: yup
    .string()
    .max(20, "Maximo 20 caracteres")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});
