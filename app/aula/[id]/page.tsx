import Link from "next/link";
import { pombagira } from "../../../lib/courses/pombagira";
export default async function AulaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const aula = pombagira.aulas.find(
  (aula) => aula.id === Number(id)
);
  if (!aula) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#140B1D] text-white">
        Aula não encontrada.
      </main>
    );
  }

  const numero = Number(id);

console.log(aula.pdfs);

  return (
    <main className="min-h-screen bg-[#140B1D] text-white pt-8">

      <div className="px-5 md:px-8">

  {/* Desktop */}
  <img
    src={aula.banner}
    alt={aula.titulo}
    className="hidden md:block w-full h-80 object-cover rounded-2xl"
  />

  {/* Mobile */}
  <img
    src="/images/courses/desafio-pombagira/banner-desafio-mob.png"
    alt={aula.titulo}
    className="block md:hidden w-full rounded-2xl"
  />

</div>

     <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">

        <Link
          href="/cursos/pombagira"
          className="text-yellow-400 hover:underline"
        >
          ← Voltar ao Curso
        </Link>

        <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 leading-tight">
          {aula.titulo}
        </h1>

       <p className="mt-4 text-base md:text-lg lg:text-xl leading-7 text-gray-300 max-w-3xl">
          {aula.descricao}
        </p>

        <div className="mt-12 space-y-8">

          {aula.videos.map((video, index) => (
            <iframe
              key={index}
              src={video}
              title={`Vídeo ${index + 1}`}
              className="w-full aspect-video rounded-2xl"
              allowFullScreen
            />
          ))}

        </div>

        <div className="mt-10 space-y-4">
  {aula.pdfs.map((pdf, index) => (
    <a
      key={index}
      href={pdf.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black hover:bg-yellow-400"
    >
      📄 {pdf.titulo}
    </a>
  ))}
</div>

        <div className="flex justify-between mt-16">

          {numero > 1 ? (
            <Link
              href={`/aula/${numero - 1}`}
              className="text-yellow-400"
            >
              ← Aula Anterior
            </Link>
          ) : (
            <span />
          )}

          {numero < 7 && (
            <Link
              href={`/aula/${numero + 1}`}
              className="text-yellow-400"
            >
              Próxima Aula →
            </Link>
          )}

        </div>

      </div>

    </main>
  );
}