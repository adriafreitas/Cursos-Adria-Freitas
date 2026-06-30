"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

 async function entrar(e: React.FormEvent) {
  e.preventDefault();

  alert("1 - Entrou na função");

  setErro("");
  setLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  alert("2 - Voltou do Supabase");

  console.log(data);
  console.log(error);

  setLoading(false);

  if (error) {
    alert(error.message);
    setErro(error.message);
    return;
  }

  alert("3 - Login OK");

  router.push("/meus-cursos");
}
  return (
    <main className="min-h-screen bg-[#140B1D] flex items-center justify-center px-6">

      <form
  onSubmit={(e) => {
    e.preventDefault();
    alert("FORM SUBMIT");
    entrar(e);
  }}
  className="w-full max-w-md rounded-2xl bg-[#241236] p-8 shadow-2xl"
>

        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          CURSOS ÁDRIA FREITAS
        </h1>

        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-[#140B1D] border border-gray-700 p-4 text-white mb-5"
          required
        />

        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full rounded-lg bg-[#140B1D] border border-gray-700 p-4 text-white mb-6"
          required
        />

        {erro && (
          <p className="text-red-400 mb-5 text-sm">
            {erro}
          </p>
        )}

      <button
  type="submit"
  disabled={loading}
  className="w-full rounded-xl bg-yellow-500 py-4 font-bold text-black hover:bg-yellow-400"
>
  {loading ? "Entrando..." : "Entrar"}
</button>

      </form>

    </main>
  );
}