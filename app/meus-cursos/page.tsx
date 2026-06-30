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
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setNome(
      user.user_metadata?.nome ??
      user.email?.split("@")[0] ??
      "Guardiã"
    );

    const { data: cliente } = await supabase
      .from("club_clients")
      .select("id")
      .eq("email", user.email)
      .single();

    if (!cliente) {
      setLoading(false);
      return;
    }

    const { data: aluno } = await supabase
      .from("course_students")
      .select("course_id")
      .eq("club_client_id", cliente.id)
      .single();

    if (!aluno) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("courses")
      .select("id,titulo,descricao,imagem_url")
      .eq("id", aluno.course_id);

    setCursos(data ?? []);
    setLoading(false);
  }

  async function sair() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#140B1D] flex items-center justify-center text-white">
        Carregando...
      </main>
    );
  }
    return (
    <main className="min-h-screen bg-[#140B1D] text-white">
      <div className="flex min-h-screen">

        <aside className="w-72 bg-[#1A0E25] border-r border-yellow-600/20 p-8">

          <h1 className="text-3xl font-bold text-yellow-400">
            ÁREA DO ALUNO
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Área de Estudos
          </p>

          <div className="mt-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 p-5">
            <p className="text-sm text-gray-300">
              Bem-vinda
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {nome}
            </h2>
          </div>

          <nav className="mt-12">
            <div className="rounded-xl bg-yellow-500 text-[#140B1D] px-5 py-4 font-bold">
              📚 Meus Cursos
            </div>
          </nav>

          <button
            onClick={sair}
            className="mt-16 w-full rounded-xl bg-red-600 py-4 font-bold hover:bg-red-500"
          >
            Sair
          </button>

        </aside>

        <section className="flex-1 overflow-auto">

          <div className="mx-auto max-w-7xl px-12 py-12">

            <div
              id="nova-versao-meus-cursos"
              className="mb-8 rounded-xl bg-red-600 p-4 text-center text-2xl font-bold"
            >
              NOVA VERSÃO MEUS CURSOS
            </div>

            <h1 className="text-6xl font-black text-yellow-400">
              Meus Cursos
            </h1>

            <p className="mt-4 text-xl text-gray-300">
              O conhecimento liberta.
            </p>

            <div className="mt-12">
              {cursos.length === 0 ? (
                <div className="rounded-3xl border border-yellow-500/20 bg-[#241236] p-16 text-center">
                  <h2 className="text-3xl font-bold text-yellow-400">
                    Nenhum curso liberado
                  </h2>

                  <p className="mt-4 text-lg text-gray-400">
                    Assim que um curso for liberado ele aparecerá aqui.
                  </p>
                </div>
              ) : (
                cursos.map((curso) => (
                  <Link
                    key={curso.id}
                    href="/cursos/pombagira"
                    className="block mb-10"
                  >
                    <div className="rounded-3xl bg-[#241236] p-10 border border-yellow-500/20 hover:border-yellow-500/60 transition">

                      <h2 className="text-4xl font-bold text-yellow-400">
                        {curso.titulo}
                      </h2>

                      <p className="mt-6 text-lg text-gray-300">
                        {curso.descricao}
                      </p>

                      <div className="mt-10 rounded-xl bg-yellow-500 py-4 text-center font-bold text-[#140B1D]">
                        Continuar Curso →
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