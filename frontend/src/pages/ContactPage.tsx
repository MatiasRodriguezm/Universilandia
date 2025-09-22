import { useState, useEffect } from "react";
import PublicLayout from "../layouts/PublicLayout";
import DefaultInput from "../components/forms/DefaultInput";
import {
  institutionSchema,
  guardianSchema,
  studentSchema,
} from "../validation/contactSchemas";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import PaperPlane from "../assets/sgv/contact/PaperPlane.svg";

type Persona = "institucion" | "apoderado" | "estudiante";
type Errors = Record<string, string | undefined>;

const alianzasOpts = [
  "Charlas o talleres",
  "Acceso al test vocacional",
  "Licencias o membresías",
  "Alianzas de contenido",
  "Otro",
];

const interesesGuardian = [
  "Ayuda para elegir una carrera",
  "Escuchar experiencias reales",
  "Acceso al contenido premium",
  "Postular a entrevista en el podcast",
  "Otro",
];

const buscandoEstudiante = [
  "Escuchar el podcast",
  "Hacer el test vocacional",
  "Obtener orientación personalizada",
  "Compartir mi historia en el podcast",
  "Otro",
];

export default function ContactPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const resolvePersona = (raw?: string | null): Persona => {
    const v = (raw || "").toLowerCase();
    return (
      v === "institucion" || v === "apoderado" || v === "estudiante"
        ? v
        : "institucion"
    ) as Persona;
  };

  const [persona, setPersona] = useState<Persona>(
    resolvePersona(searchParams.get("tipo"))
  );

  // 2) Si alguien cambia la URL (o llega con ?tipo=), sincroniza el estado
  useEffect(() => {
    const incoming = resolvePersona(searchParams.get("tipo"));
    setPersona(prev => (prev !== incoming ? incoming : prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 3) Cuando el usuario cambia el chip, escribe ?tipo= en la URL (preserva otros params)
  useEffect(() => {
    const current = resolvePersona(searchParams.get("tipo"));
    if (persona !== current) {
      const next = new URLSearchParams(searchParams);
      next.set("tipo", persona);
      setSearchParams(next, { replace: true }); // replace para no llenar el historial
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persona]);

  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // --- Institución
  const [nombreInstitucion, setNombreInstitucion] = useState("");
  const [nombreContacto, setNombreContacto] = useState("");
  const [ciudadRegionInst, setCiudadRegionInst] = useState("");
  const [cargo, setCargo] = useState("");
  const [correoInst, setCorreoInst] = useState("");
  const [telefono, setTelefono] = useState("");
  const [alianza, setAlianza] = useState("");
  const [comentarios, setComentarios] = useState("");

  // --- Apoderado
  const [nombresG, setNombresG] = useState("");
  const [apellidosG, setApellidosG] = useState("");
  const [ciudadRegionG, setCiudadRegionG] = useState("");
  const [correoG, setCorreoG] = useState("");
  const [edadEstudiante, setEdadEstudiante] = useState<string>("");
  const [intereses, setIntereses] = useState<string[]>([]);
  const [otroInteres, setOtroInteres] = useState("");
  const [mensajeG, setMensajeG] = useState("");

  // --- Estudiante
  const [nombresE, setNombresE] = useState("");
  const [apellidosE, setApellidosE] = useState("");
  const [ciudadRegionE, setCiudadRegionE] = useState("");
  const [correoE, setCorreoE] = useState("");
  const [edad, setEdad] = useState<string>("");
  const [buscando, setBuscando] = useState<string[]>([]);
  const [mensajeE, setMensajeE] = useState("");

  const toggleInArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(false);
    setErrors({});

    try {
      if (persona === "institucion") {
        await institutionSchema.validate(
          {
            nombreInstitucion,
            nombreContacto,
            ciudadRegion: ciudadRegionInst,
            cargo,
            correoInst,
            telefono,
            alianza,
            comentarios,
          },
          { abortEarly: false }
        );
        console.log("contacto_institucion", {
          persona,
          nombreInstitucion,
          nombreContacto,
          ciudadRegion: ciudadRegionInst,
          cargo,
          correo: correoInst,
          telefono,
          alianza,
          comentarios,
        });
      }

      if (persona === "apoderado") {
        await guardianSchema.validate(
          {
            nombres: nombresG,
            apellidos: apellidosG,
            ciudadRegion: ciudadRegionG,
            correo: correoG,
            edadEstudiante: Number(edadEstudiante),
            intereses,
            otroInteres,
            mensaje: mensajeG,
          },
          { abortEarly: false }
        );
        console.log("contacto_apoderado", {
          persona,
          nombres: nombresG,
          apellidos: apellidosG,
          ciudadRegion: ciudadRegionG,
          correo: correoG,
          edadEstudiante: Number(edadEstudiante),
          intereses,
          otroInteres: intereses.includes("Otro") ? otroInteres : undefined,
          mensaje: mensajeG,
        });
      }

      if (persona === "estudiante") {
        await studentSchema.validate(
          {
            nombres: nombresE,
            apellidos: apellidosE,
            ciudadRegion: ciudadRegionE,
            correo: correoE,
            edad: Number(edad),
            buscando,
            mensaje: mensajeE,
          },
          { abortEarly: false }
        );
        console.log("contacto_estudiante", {
          persona,
          nombres: nombresE,
          apellidos: apellidosE,
          ciudadRegion: ciudadRegionE,
          correo: correoE,
          edad: Number(edad),
          buscando,
          mensaje: mensajeE,
        });
      }

      setSent(true);
    } catch (err: any) {
      if (err?.inner?.length) {
        const collected: Errors = {};
        err.inner.forEach((e: any) => {
          if (e?.path && !collected[e.path]) collected[e.path] = e.message;
        });
        setErrors(collected);
      }
    }
  };

  return (
    <PublicLayout>
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-4xl font-bold">Contáctanos</h1>
          <img
            src={PaperPlane}
            alt="Avion de Papel"
            className="
      shrink-0
      w-16 h-16 -mt-6          /* mobile */
      sm:w-28 sm:h-28 sm:-mt-8 /* ≥640px */
      md:w-32 md:h-32 md:-mt-10/* ≥768px */
      lg:w-40 lg:h-40 lg:-mt-14/* ≥1024px (tu desktop actual) */
    "
          />
        </div>

        <section className="bg-[#F5F1EE] rounded-2xl p-6 mb-8 border border-black/10">
          <h2 className="text-2xl font-semibold mb-4">Formulario</h2>

          {/* ¿Quién eres? */}
          <div className="mb-6">
            <p className="font-semibold text-[18px] mb-2">¿Quién eres?</p>
            <div className="flex flex-wrap gap-4">
              {[
                {
                  key: "institucion",
                  label: "Colegio o Institución educativa",
                },
                { key: "apoderado", label: "Padre, madre o apoderado" },
                { key: "estudiante", label: "Estudiante" },
              ].map(opt => (
                <label
                  key={opt.key}
                  className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm ${
                    persona === opt.key
                      ? "bg-black text-white border-black"
                      : "border-black hover:bg-black/5"
                  }`}
                >
                  <input
                    type="radio"
                    name="persona"
                    value={opt.key}
                    className="hidden"
                    checked={persona === (opt.key as Persona)}
                    onChange={() => setPersona(opt.key as Persona)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* INSTITUCIÓN */}
            {persona === "institucion" && (
              <div className="bg-white rounded-2xl p-6 border border-black/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <DefaultInput
                      label="Nombre de la institución"
                      type="text"
                      value={nombreInstitucion}
                      onChange={e => setNombreInstitucion(e.target.value)}
                      maxLength={120}
                    />
                    {errors.nombreInstitucion && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.nombreInstitucion}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Nombre del contacto"
                      type="text"
                      value={nombreContacto}
                      onChange={e => setNombreContacto(e.target.value)}
                      maxLength={120}
                    />
                    {errors.nombreContacto && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.nombreContacto}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Ciudad y región"
                      type="text"
                      value={ciudadRegionInst}
                      onChange={e => setCiudadRegionInst(e.target.value)}
                    />
                    {errors.ciudadRegion && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.ciudadRegion}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Cargo"
                      type="text"
                      value={cargo}
                      onChange={e => setCargo(e.target.value)}
                    />
                    {errors.cargo && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.cargo}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="¿Qué tipo de alianza les interesa?"
                      type="text"
                      value={alianza}
                      onChange={e => setAlianza(e.target.value)}
                    />
                    {errors.alianza && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.alianza}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Correo electrónico institucional"
                      type="email"
                      value={correoInst}
                      onChange={e => setCorreoInst(e.target.value)}
                    />
                    {errors.correoInst && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.correoInst}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Comentarios adicionales o dudas"
                      type="text"
                      value={comentarios}
                      onChange={e => setComentarios(e.target.value)}
                    />
                  </div>
                  <div>
                    <DefaultInput
                      label="Teléfono del contacto (opcional)"
                      type="tel"
                      inputMode="tel"
                      value={telefono}
                      onChange={e => setTelefono(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* APODERADO */}
            {persona === "apoderado" && (
              <div className="bg-white rounded-2xl p-6 border border-black/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <DefaultInput
                      label="Nombres"
                      type="text"
                      value={nombresG}
                      onChange={e => setNombresG(e.target.value)}
                    />
                    {errors.nombres && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.nombres}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Apellidos"
                      type="text"
                      value={apellidosG}
                      onChange={e => setApellidosG(e.target.value)}
                    />
                    {errors.apellidos && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.apellidos}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Ciudad y región"
                      type="text"
                      value={ciudadRegionG}
                      onChange={e => setCiudadRegionG(e.target.value)}
                    />
                    {errors.ciudadRegion && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.ciudadRegion}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Correo electrónico"
                      type="email"
                      value={correoG}
                      onChange={e => setCorreoG(e.target.value)}
                    />
                    {errors.correo && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.correo}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Edad de tu hija/o estudiante"
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min={1}
                      value={edadEstudiante}
                      onChange={e => setEdadEstudiante(e.target.value)}
                    />
                    {errors.edadEstudiante && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.edadEstudiante}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <p className="font-semibold text-[18px] mb-2">
                      ¿Qué te interesa de Universilandia?
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {interesesGuardian.map(opt => (
                        <label key={opt} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={intereses.includes(opt)}
                            onChange={() =>
                              setIntereses(prev => toggleInArray(prev, opt))
                            }
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                    {errors.intereses && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.intereses}
                      </p>
                    )}

                    {intereses.includes("Otro") && (
                      <div className="mt-3">
                        <DefaultInput
                          label="¿Cuál?"
                          type="text"
                          value={otroInteres}
                          onChange={e => setOtroInteres(e.target.value)}
                        />
                        {errors.otroInteres && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.otroInteres}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <DefaultInput
                      label="Mensaje o pregunta"
                      type="text"
                      value={mensajeG}
                      onChange={e => setMensajeG(e.target.value)}
                      placeholder="Escribe tu mensaje"
                      maxLength={200}
                    />
                    {errors.mensaje && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.mensaje}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ESTUDIANTE */}
            {persona === "estudiante" && (
              <div className="bg-white rounded-2xl p-6 border border-black/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <DefaultInput
                      label="Nombres"
                      type="text"
                      value={nombresE}
                      onChange={e => setNombresE(e.target.value)}
                    />
                    {errors.nombres && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.nombres}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Apellidos"
                      type="text"
                      value={apellidosE}
                      onChange={e => setApellidosE(e.target.value)}
                    />
                    {errors.apellidos && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.apellidos}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Ciudad y región"
                      type="text"
                      value={ciudadRegionE}
                      onChange={e => setCiudadRegionE(e.target.value)}
                    />
                    {errors.ciudadRegion && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.ciudadRegion}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Correo electrónico"
                      type="email"
                      value={correoE}
                      onChange={e => setCorreoE(e.target.value)}
                    />
                    {errors.correo && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.correo}
                      </p>
                    )}
                  </div>
                  <div>
                    <DefaultInput
                      label="Edad"
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min={10}
                      value={edad}
                      onChange={e => setEdad(e.target.value)}
                    />
                    {errors.edad && (
                      <p className="text-red-600 text-sm mt-1">{errors.edad}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <p className="font-semibold text-[18px] mb-2">
                      ¿Qué estás buscando?
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {buscandoEstudiante.map(opt => (
                        <label key={opt} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={buscando.includes(opt)}
                            onChange={() =>
                              setBuscando(prev => toggleInArray(prev, opt))
                            }
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                    {errors.buscando && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.buscando}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <DefaultInput
                      label="Mensaje o pregunta"
                      type="text"
                      value={mensajeE}
                      onChange={e => setMensajeE(e.target.value)}
                      placeholder="Escribe tu mensaje"
                      maxLength={200}
                    />
                    {errors.mensaje && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.mensaje}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-full font-semibold text-[18px]"
              >
                Enviar
              </button>
              {sent && (
                <span className="text-green-700 font-medium">
                  ¡Gracias! Te contactaremos pronto.
                </span>
              )}
            </div>
          </form>
        </section>
      </main>
    </PublicLayout>
  );
}
