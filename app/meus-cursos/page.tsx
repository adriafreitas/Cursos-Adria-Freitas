"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  imagem_url: string;
}

export default function MeusCursosPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [nome, setNome] = useState("Guardiã");

  useEffect(() => {
    carregarCursos();
  }, []);

  async function carregarCursos() {
 
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

console.log("SLUG:", slug);

  if (!slug) {
    window.location.href = "https://www.magiaoriente.com.br";
    return;
  }

  const { data: cliente } = await supabase
  .from("club_clients")
  .select("id, nome, email")
  .eq("slug", slug)
  .single();

if (!cliente) {
  setLoading(false);
  return;
}

const primeiroNome = cliente.nome.split(" ")[0];

setNome(
  primeiroNome.charAt(0).toUpperCase() +
  primeiroNome.slice(1).toLowerCase()
);

  const { data: alunos, error: erroAlunos } = await supabase
  .from("course_students")
  .select("*")
  .or(`club_client_id.eq.${cliente.id},email.eq.${cliente.email}`);

console.log("CLIENTE:", cliente);
console.log("ALUNOS:", alunos);
console.log("ERRO ALUNOS:", erroAlunos);

if (!alunos || alunos.length === 0) {
  setCursos([]);
  setLoading(false);
  return;
}

  const ids = alunos
  .map((item) => item.course_id)
  .filter(Boolean);

const { data: cursos, error } = await supabase
  .from("courses")
  .select("*")
  .in("id", ids);

if (error) {
  console.error(error);
}

setCursos(cursos ?? []);
setLoading(false);

console.log("CLIENTE:", cliente);
console.log("ALUNOS:", alunos);
console.log("IDS:", ids);
console.log("CURSOS:", cursos);

setCursos(cursos || []);
setLoading(false);
setCursos(cursos || []);
setLoading(false);
}

  function voltarPortal() {
  const slug = new URLSearchParams(window.location.search).get("slug");

  if (slug) {
    window.location.href = `https://www.magiaoriente.com.br/cliente/${slug}`;
    return;
  }

  window.location.href = "https://www.magiaoriente.com.br";
}

  return (
    <main className="min-h-screen bg-[#140B1D] text-white">
      <div className="flex min-h-screen">
        <aside className="w-72 bg-[#1A0E25] border-r border-yellow-600/20 p-8">
          <h1 className="text-3xl font-bold text-yellow-400">ÁREA DO ALUNO</h1>
          <p className="mt-2 text-sm text-gray-400">Área de Estudos</p>

          <div className="mt-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 p-5">
            <p className="text-sm text-gray-300">Bem-vinda</p>
            <h2 className="mt-2 text-2xl font-bold">{nome}</h2>
          </div>

          <button
  onClick={voltarPortal}
  className="mt-16 w-full rounded-xl border border-yellow-500 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-[#140B1D]"
>
  ← Voltar ao Portal
</button>
        </aside>

        <section className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-12 py-12">
            <h1 className="text-6xl font-black text-yellow-400">Meus Cursos</h1>
            <p className="mt-5 text-xl text-gray-300">
              O conhecimento liberta.
            </p>

            <div className="mt-12">
              {cursos.length === 0 ? (
                <div className="rounded-3xl border border-yellow-500/20 bg-[#241236] p-16 text-center">
                  <h2 className="text-3xl font-bold text-yellow-400">
                    Nenhum curso liberado
                  </h2>
                </div>
              ) : (
                cursos.map((curso) => (
                  <Link
                    key={curso.id}
                    href="/cursos/pombogira"
                    className="block mb-10"
                  >
                    <div className="overflow-hidden rounded-[32px] border border-yellow-500/20 bg-[#241236] shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-yellow-500/60">
                      <div className="relative">
                        <img
                          src={curso.imagem_url}
                          alt={curso.titulo}
                          className="h-[420px] w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#140B1D] via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8">
                          <span className="rounded-full bg-yellow-500 px-5 py-2 text-sm font-bold text-[#140B1D]">
                            CURSO LIBERADO
                          </span>
                        </div>
                      </div>

                      <div className="grid gap-10 p-12 lg:grid-cols-[1fr_260px]">
                        <div>
                          <p className="uppercase tracking-[0.3em] text-purple-300">
                            Desenvolvimento Espiritual
                          </p>

                          <h2 className="mt-4 text-5xl font-black text-yellow-400">
                            {curso.titulo}
                          </h2>

                          <p className="mt-8 max-w-3xl text-xl leading-9 text-gray-300">
                            {curso.descricao}
                          </p>
                        </div>

                        <div className="flex flex-col justify-center">
                          <div className="rounded-2xl border border-yellow-500/20 bg-[#1A0E25] p-8">
                            <p className="text-gray-400">Status</p>
                            <h3 className="mt-3 text-3xl font-bold text-green-400">
                              Liberado
                            </h3>

                            <div className="mt-10 w-full rounded-2xl bg-yellow-500 py-5 text-center text-lg font-bold text-[#140B1D]">
                              Continuar Curso →
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
