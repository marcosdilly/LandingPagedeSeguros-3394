import { useState } from "react";
import { Download, Lock } from "lucide-react";
import { useLeads } from "../queries/leads";

function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function Admin() {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState<string | null>(null);
  const leads = useLeads(password);

  const exportCsv = () => {
    if (!leads.data) return;
    const rows = [["Nome", "Nascimento", "Telefone", "E-mail", "Recebido em"]].concat(
      leads.data.map((l) => [l.name, fmtDate(l.birthDate), l.phone, l.email, new Date(l.createdAt).toLocaleString("pt-BR")]),
    );
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!password || leads.isError) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink px-6 text-paper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPassword(input);
          }}
          className="w-full max-w-sm border border-white/10 bg-steel p-8"
        >
          <Lock className="h-6 w-6 text-amber" />
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase italic">Painel de leads</h1>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Senha"
            aria-label="Senha"
            className="mt-6 w-full border-b border-white/20 bg-transparent py-3 outline-none focus:border-amber"
          />
          {leads.isError && <p className="mt-2 text-xs text-red-400">Senha inválida.</p>}
          <button className="mt-6 w-full bg-amber py-3 font-display text-lg font-extrabold uppercase italic text-ink">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink px-6 py-10 text-paper lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber">Painel</p>
            <h1 className="font-display text-5xl font-extrabold uppercase italic">
              Leads {leads.data && <span className="text-white/40">({leads.data.length})</span>}
            </h1>
          </div>
          <button onClick={exportCsv} className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm hover:border-amber hover:text-amber">
            <Download className="h-4 w-4" /> Exportar CSV
          </button>
        </div>
        <div className="mt-8 overflow-x-auto border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-steel text-xs uppercase tracking-wider text-white/50">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Nascimento</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Recebido em</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.isLoading && (
                <tr><td colSpan={5} className="px-4 py-6 text-white/50">Carregando...</td></tr>
              )}
              {leads.data?.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-6 text-white/50">Nenhum lead ainda.</td></tr>
              )}
              {leads.data?.map((l) => (
                <tr key={l.id} className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3 font-medium">{l.name}</td>
                  <td className="px-4 py-3">{fmtDate(l.birthDate)}</td>
                  <td className="px-4 py-3">
                    <a className="hover:text-wa" target="_blank" rel="noreferrer" href={`https://wa.me/55${l.phone.replace(/\D/g, "")}`}>{l.phone}</a>
                  </td>
                  <td className="px-4 py-3">{l.email}</td>
                  <td className="px-4 py-3 text-white/60">{new Date(l.createdAt).toLocaleString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
