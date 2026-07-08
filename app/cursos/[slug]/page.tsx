import Link from "next/link";

const aulas = [
  { dia: 1 },
  { dia: 2 },
  { dia: 3 },
  { dia: 4 },
  { dia: 5 },
  { dia: 6 },
  { dia: 7 },
];

export default function CursoPage() {
  return (
    <main className="min-h-screen bg-[#140B1D] text-white">

     {/* Desktop */}
<img
  src="/images/courses/desafio-pombagira/banner-desafio.png"
  alt="Desafio da Pombagira"
  className="hidden md:block w-full h-80 object-cover"
/>

{/* Mobile */}
<img
  src="/images/courses/desafio-pombagira/banner-desafio-mob.png"
  alt="Desafio da Pombagira"
  className="block md:hidden w-full object-cover"
/>
      
      <div className="max-w-6xl mx-auto px-8 pt-6 flex justify-end">

        <Link
          href="/meus-cursos"
                 >
          ← Voltar 
        </Link>

      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 md:py-10">

        <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-yellow-400 leading-tight">
          Desafio do Poder da Sua Pombagira
        </h1>

        <p className="mt-4 text-base md:text-lg lg:text-xl leading-7 text-gray-300 max-w-3xl">
          Bem-vinda ao desafio. Cada dia foi preparado para conduzir você em uma jornada de fortalecimento espiritual.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mt-10 lg:mt-14 mb-6 lg:mb-8 text-yellow-400">
          Aulas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">

         {aulas.map((aula) => (
  <Link
    key={aula.dia}
    href={`/aula/${aula.dia}`}
  >
    <div className="rounded-2xl bg-[#241236] overflow-hidden hover:scale-[1.02] transition cursor-pointer">

      <img
        src={`/images/courses/desafio-pombagira/dia${aula.dia}.png`}
        alt={`Dia ${aula.dia}`}
        className="w-full h-auto object-cover"
      />

      <div className="p-4 md:p-5">

        <h3 className="text-xl md:text-2xl font-bold text-yellow-400">
          Dia {aula.dia}
        </h3>

        <p className="mt-2 text-sm md:text-base text-gray-300 leading-6">
          Clique para assistir esta aula.
        </p>

      </div>

    </div>
  </Link>
))}

        </div>

      </div>

    </main>
  );
}