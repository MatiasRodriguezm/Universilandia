import Headphones from "../../assets/sgv/home/headphones.svg";
import Monitor from "../../assets/sgv/home/monitor.svg";
import Tasks from "../../assets/sgv/home/tasks.svg";

const blocks = [
  {
    title: "Escucha historias reales",
    content:
      "Accede a episodios donde profesionales de distintas áreas comparten su experiencia, desafíos y consejos.",
    img: Headphones,
    alt: "Audífonos",
  },
  {
    title: "Explora la plataforma a tu ritmo",
    content:
      "Navega por entrevistas, videos y artículos organizados por áreas de estudio para encontrar lo que más resuene contigo.",
    img: Monitor,
    alt: "Monitor",
  },
  {
    title: "Obtén la información que necesitas",
    content:
      "Encontrarás información precisa y útil, además de herramientas que te ayudarán a planificar tu camino universitario.",
    img: Tasks,
    alt: "Lista de Tareas",
  },
];

export default function HowItWorks() {
  return (
    <section className="p-16">
      <div className="border rounded-2xl bg-[#E5E5E5] p-12 text-center">
        {/* Titulo y Descripción */}
        <h1 className="font-semibold text-3xl">¿Cómo Funciona?</h1>
        <p className="mt-14 text-lg">
          Universilandia es una plataforma de suscripción donde eliges y
          escuchas el contenido que realmente te interesa. Puedes acceder gratis
          a dos episodios de tu elección y, si quieres más, desbloquear todo
          nuestro catálogo con un plan mensual.
        </p>

        {/* Bloques de iconos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-32">
          {blocks.map(block => (
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center h-auto">
              <div className="bg-white -mt-12 sm:-mt-20 rounded-full p-4 sm:p-6">
                <img
                  src={block.img}
                  alt={block.alt}
                  className="w-16 sm:w-16 md:w-18 max-w-full"
                />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-center">
                {block.title}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-center">
                {block.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
