import Arrow from "../../assets/sgv/home/arrow.svg";

export default function TermsAndConditions() {
  return (
    <section className="p-10 text-center">
      <h1 className="font-semibold text-3xl mb-8">
        Términos, Condiciones y Política de Privacidad
      </h1>
      <p className="mb-8 text-xl">
        Aquí encontrarás las reglas de uso de Universilandia y cómo cuidamos tu
        información.
      </p>

      <div className="space-y-4">
        {["Términos y Condiciones", "Políticas de Privacidad y Seguridad"].map(
          (question, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-3xl p-4 flex justify-between items-center cursor-pointer"
            >
              <p className="text-lg">{question}</p>
              <img src={Arrow} alt="Flecha" className="w-6 mr-4" />
            </div>
          )
        )}
      </div>
    </section>
  );
}
