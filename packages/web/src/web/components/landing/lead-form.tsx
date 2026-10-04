import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowRight, CheckCircle2, Loader2, Lock } from "lucide-react";
import { useCreateLead } from "../../queries/leads";
import { waLink } from "../../lib/config";

type FormValues = {
  name: string;
  birthDate: string; // DD/MM/AAAA
  phone: string;
  email: string;
};

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function maskDate(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

function toIso(br: string) {
  const [dd, mm, yyyy] = br.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

function validBirth(br: string) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(br)) return "Use o formato DD/MM/AAAA";
  const [dd, mm, yyyy] = br.split("/").map(Number);
  const dt = new Date(yyyy, mm - 1, dd);
  if (dt.getFullYear() !== yyyy || dt.getMonth() !== mm - 1 || dt.getDate() !== dd) return "Data inválida";
  const age = (Date.now() - dt.getTime()) / (365.25 * 24 * 3600 * 1000);
  if (age < 18) return "É preciso ter 18 anos ou mais";
  if (age > 110) return "Data inválida";
  return true;
}

const fieldCls =
  "peer w-full rounded-none border-0 border-b border-white/15 bg-transparent px-0 pb-2.5 pt-6 text-[15px] text-paper placeholder-transparent outline-none transition-colors focus:border-amber";
const labelCls =
  "pointer-events-none absolute left-0 top-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-[14px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-amber";

export function LeadForm() {
  const create = useCreateLead();
  const [sentName, setSentName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });

  const onSubmit = (v: FormValues) => {
    create.mutate(
      {
        name: v.name.trim(),
        birthDate: toIso(v.birthDate),
        phone: v.phone,
        email: v.email.trim(),
      },
      { onSuccess: () => setSentName(v.name.trim().split(" ")[0]) },
    );
  };

  if (sentName) {
    return (
      <div className="flex min-h-[460px] flex-col items-start justify-center gap-5 py-6">
        <CheckCircle2 className="h-12 w-12 text-amber" strokeWidth={1.5} />
        <h3 className="font-display text-4xl font-extrabold uppercase italic leading-none">
          Pronto, {sentName}!
        </h3>
        <p className="text-sm leading-relaxed text-white/65">
          Recebemos seus dados. Um consultor vai comparar as melhores opções e falar com você em instantes.
          Quer agilizar? Chame a gente agora no WhatsApp.
        </p>
        <a
          href={waLink(`Olá! Sou ${sentName}, acabei de pedir uma cotação de seguro pelo site.`)}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex w-full items-center justify-center gap-2.5 bg-wa px-6 py-4 text-sm font-semibold uppercase tracking-wider text-ink transition hover:brightness-110"
        >
          <FaWhatsapp className="h-5 w-5" /> Falar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="relative">
        <input
          id="name"
          placeholder="Nome completo"
          autoComplete="name"
          className={fieldCls}
          {...register("name", {
            required: "Informe seu nome",
            validate: (v) => v.trim().split(/\s+/).length >= 2 || "Informe nome e sobrenome",
          })}
        />
        <label htmlFor="name" className={labelCls}>Nome completo</label>
        {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
      </div>

      <div className="relative">
        <input
          id="birthDate"
          placeholder="Data de nascimento"
          inputMode="numeric"
          autoComplete="bday"
          className={fieldCls}
          {...register("birthDate", {
            required: "Informe sua data de nascimento",
            validate: validBirth,
            onChange: (e) => setValue("birthDate", maskDate(e.target.value)),
          })}
        />
        <label htmlFor="birthDate" className={labelCls}>Data de nascimento (DD/MM/AAAA)</label>
        {errors.birthDate && <p className="mt-1.5 text-xs text-red-400">{errors.birthDate.message}</p>}
      </div>

      <div className="relative">
        <input
          id="phone"
          placeholder="Telefone / WhatsApp"
          inputMode="tel"
          autoComplete="tel-national"
          className={fieldCls}
          {...register("phone", {
            required: "Informe seu telefone",
            validate: (v) => v.replace(/\D/g, "").length >= 10 || "Telefone incompleto",
            onChange: (e) => setValue("phone", maskPhone(e.target.value)),
          })}
        />
        <label htmlFor="phone" className={labelCls}>Telefone / WhatsApp</label>
        {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>}
      </div>

      <div className="relative">
        <input
          id="email"
          type="email"
          placeholder="E-mail"
          autoComplete="email"
          className={fieldCls}
          {...register("email", {
            required: "Informe seu e-mail",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "E-mail inválido" },
          })}
        />
        <label htmlFor="email" className={labelCls}>E-mail</label>
        {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      {create.isError && (
        <p className="text-xs text-red-400">Não foi possível enviar agora. Tente novamente ou chame no WhatsApp.</p>
      )}

      <button
        type="submit"
        disabled={create.isPending}
        className="group mt-3 inline-flex items-center justify-between gap-3 bg-amber px-6 py-4 text-left font-display text-xl font-extrabold uppercase italic tracking-wide text-ink transition hover:bg-amber-deep disabled:opacity-70"
      >
        {create.isPending ? "Enviando..." : "Quero minha cotação grátis"}
        {create.isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        )}
      </button>

      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2.5 border border-wa/40 px-6 py-3.5 text-sm font-medium text-wa transition hover:bg-wa hover:text-ink"
      >
        <FaWhatsapp className="h-5 w-5" /> Prefiro cotar pelo WhatsApp
      </a>

      <p className="flex items-center gap-2 text-[11px] text-white/40">
        <Lock className="h-3 w-3" /> Seus dados estão protegidos conforme a LGPD. Sem spam.
      </p>
    </form>
  );
}
