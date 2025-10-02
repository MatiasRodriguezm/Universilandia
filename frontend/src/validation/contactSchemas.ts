import * as yup from "yup";

export const institutionSchema = yup.object({
  nombreInstitucion: yup.string().trim().required("El nombre de la institución es obligatorio"),
  nombreContacto: yup.string().trim().required("El nombre del contacto es obligatorio"),
  ciudadRegion: yup.string().trim().required("Ciudad y región es obligatorio"),
  cargo: yup.string().trim().required("El cargo es obligatorio"),
  correoInst: yup.string().trim().email("Email inválido").required("El correo institucional es obligatorio"),
  telefono: yup.string().trim().optional(),
  alianza: yup.string().trim().required("La alianza es obligatoria."),
  comentarios: yup.string().trim().optional(),
});

export const guardianSchema = yup.object({
  nombres: yup.string().trim().required("Los nombres son obligatorios"),
  apellidos: yup.string().trim().required("Los apellidos son obligatorios"),
  ciudadRegion: yup.string().trim().required("Ciudad y región es obligatorio"),
  correo: yup.string().trim().email("Email inválido").required("El correo es obligatorio"),
  edadEstudiante: yup
    .number()
    .typeError("Ingresa una edad válida")
    .integer("Debe ser un número entero")
    .min(1, "Edad mínima 1")
    .max(100, "Edad inválida")
    .required("La edad es obligatoria"),
  intereses: yup.array(yup.string()).min(1, "Selecciona al menos un interés"),
  otroInteres: yup.string().trim().when("intereses", {
    is: (arr: string[]) => Array.isArray(arr) && arr.includes("Otro"),
    then: s => s.required("Indica el interés"),
    otherwise: s => s.optional(),
  }),
  mensaje: yup.string().trim().required("El mensaje es obligatorio"),
});

export const studentSchema = yup.object({
  nombres: yup.string().trim().required("Los nombres son obligatorios"),
  apellidos: yup.string().trim().required("Los apellidos son obligatorios"),
  ciudadRegion: yup.string().trim().required("Ciudad y región es obligatorio"),
  correo: yup.string().trim().email("Email inválido").required("El correo es obligatorio"),
  edad: yup
    .number()
    .typeError("Ingresa una edad válida")
    .integer("Debe ser un número entero")
    .min(10, "Edad mínima 10")
    .max(120, "Edad inválida")
    .required("La edad es obligatoria"),
  buscando: yup.array(yup.string()).min(1, "Selecciona al menos una opción"),
  mensaje: yup.string().trim().required("El mensaje es obligatorio"),
});
