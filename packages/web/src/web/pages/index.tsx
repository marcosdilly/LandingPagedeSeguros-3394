import { FaWhatsapp } from "react-icons/fa";
import { ShieldCheck, Clock3, BadgePercent, Car, Wrench, Siren, Flame, Glasses, Truck } from "lucide-react";
import { LeadForm } from "../components/landing/lead-form";
import { INSURERS, SITE, waLink } from "../lib/config";

const COVERAGES = [
  { icon: Siren, title: "Roubo e furto", text: "Indenização pela tabela FIPE ou recuperação com rastreamento." },
  { icon: Car, title: "Colisão e perda total", text: "Cobertura compreensiva para batidas, capotamento e danos parciais." },
  { icon: Flame, title: "Incêndio e fenômenos naturais", text: "Alagamento, granizo, queda de árvore e incêndio." },
  { icon: ShieldCheck, title: "Danos a terceiros", text: "Proteção para danos materiais e corporais causados a outras pessoas." },
  { icon: Glasses, title: "Vidros, faróis e retrovisores", text: "Troca rápida em rede credenciada, sem burocracia." },
  { icon: Truck, title: "Assistência 24h", text: "Guincho, chaveiro, pane seca e carro reserva em todo o Brasil." },
];

const STEPS = [
  { n: "01", title: "Preencha", text: "Nome, nascimento, telefone e e-mail. Leva menos de 1 minuto." },
  { n: "02", title: "Comparamos", text: "Cotamos com seguradoras e associações de proteção veicular parceiras." },
  { n: "03", title: "Você escolhe", text: "Receba as opções no WhatsApp e feche o melhor custo-benefício." },
];

function Logo({ src, name, dark }: { src: string; name: string; dark?: boolean }) {
  return (
    <div
      className={`flex h-24 w-52 shrink-0 items-center justify-center px-7 ${dark ? "bg-[#0b2a6b]" : "bg-white"}`}
      title={name}
    >
      <img src={src} alt={name} loading="lazy" className="max-h-14 max-w-full object-contain" />
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-paper">
      {/* HERO */}
      <section className="grain relative isolate min-h-[100svh]">
        <img
          src="/images/hero-car.jpg"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[35%_60%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-ink/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="pointer-events-none absolute left-0 top-[58%] -z-10 h-px w-1/2 overflow-hidden">
          <div className="streak h-px w-1/2 bg-gradient-to-r from-transparent via-amber to-transparent" />
        </div>

        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center bg-amber text-ink">
              <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="font-display text-2xl font-extrabold uppercase italic tracking-wide">{SITE.brand}</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#seguradoras" className="hover:text-amber">Seguradoras</a>
            <a href="#coberturas" className="hover:text-amber">Coberturas</a>
            <a href="#como-funciona" className="hover:text-amber">Como funciona</a>
          </nav>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm font-medium transition hover:border-wa hover:text-wa"
          >
            <FaWhatsapp className="h-4 w-4" /> <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-16">
          <div className="lg:col-span-7 lg:pr-8">
            <p className="rise text-xs font-medium uppercase tracking-[0.3em] text-amber" style={{ animationDelay: ".05s" }}>
              Seguro auto & proteção veicular
            </p>
            <h1
              className="rise mt-5 font-display text-[clamp(3.2rem,7.5vw,7rem)] font-extrabold uppercase italic leading-[0.86] tracking-tight"
              style={{ animationDelay: ".15s" }}
            >
              Seu carro <br />
              <span className="text-amber">blindado</span> contra <br />
              imprevistos.
            </h1>
            <p className="rise mt-7 max-w-lg text-base font-light leading-relaxed text-white/75 md:text-lg" style={{ animationDelay: ".3s" }}>
              Comparamos APVS, Loovi, Porto Seguro, Allianz, Bradesco e as principais seguradoras do Brasil
              para encontrar a proteção certa pelo menor preço.
            </p>

            <div className="rise mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-7" style={{ animationDelay: ".45s" }}>
              {[
                { icon: BadgePercent, k: "até 40%", v: "de economia" },
                { icon: Clock3, k: "5 min", v: "para cotar" },
                { icon: Wrench, k: "24h", v: "assistência" },
              ].map(({ icon: Icon, k, v }) => (
                <div key={k}>
                  <Icon className="mb-2 h-4 w-4 text-amber" />
                  <p className="font-display text-3xl font-bold italic leading-none">{k}</p>
                  <p className="mt-1 text-xs text-white/50">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="cotacao" className="rise lg:col-span-5" style={{ animationDelay: ".35s" }}>
            <div className="relative border border-white/10 bg-steel/85 p-7 shadow-2xl shadow-black/60 backdrop-blur-xl md:p-9">
              <div className="absolute -top-px left-0 h-[3px] w-24 bg-amber" />
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">Cotação gratuita</p>
              <h2 className="mt-2 font-display text-[2.6rem] font-extrabold uppercase italic leading-[0.9]">
                Simule agora
              </h2>
              <p className="mb-4 mt-2 text-sm text-white/55">Sem compromisso. Resposta rápida.</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* SEGURADORAS */}
      <section id="seguradoras" className="bg-paper py-20 text-ink">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-end md:justify-between lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-deep">Parceiras</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase italic leading-[0.9] md:text-6xl">
              As melhores do Brasil,<br />em uma só cotação.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            Seguradoras tradicionais e associações de proteção veicular lado a lado, para você comparar preço e cobertura com transparência.
          </p>
        </div>
        <div className="relative mt-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
          <div className="marquee flex w-max gap-4">
            {[...INSURERS, ...INSURERS].map((i, idx) => (
              <Logo key={idx} {...i} />
            ))}
          </div>
        </div>
      </section>

      {/* COBERTURAS */}
      <section id="coberturas" className="relative py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber">Coberturas</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase italic leading-[0.9] md:text-6xl">
              Proteção de ponta a ponta.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Monte o plano ideal para seu perfil. Do básico contra roubo até a cobertura completa com carro reserva.
            </p>
            <a
              href="#cotacao"
              className="mt-8 inline-flex items-center gap-2 bg-amber px-6 py-3.5 font-display text-lg font-extrabold uppercase italic text-ink transition hover:bg-amber-deep"
            >
              Cotar agora
            </a>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
            {COVERAGES.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="group grid grid-cols-[3rem_1fr] items-start gap-5 py-6 md:grid-cols-[4rem_2.2rem_1fr_1.4fr] md:items-center">
                <span className="font-display text-2xl font-bold italic text-white/25 transition group-hover:text-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="hidden h-5 w-5 text-amber md:block" />
                <h3 className="font-display text-2xl font-bold uppercase italic">{title}</h3>
                <p className="col-start-2 text-sm text-white/55 md:col-start-auto">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="border-t border-white/10 bg-steel py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber">Como funciona</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase italic leading-[0.9] md:text-6xl">
            Três passos. Zero burocracia.
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`relative md:px-8 ${i > 0 ? "md:border-l md:border-white/10" : "md:pl-0"}`}>
                <span className="font-display text-7xl font-extrabold italic leading-none text-amber/90">{s.n}</span>
                <h3 className="mt-4 font-display text-3xl font-bold uppercase italic">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/55">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative isolate overflow-hidden py-24">
        <img src="/images/hero-car.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-extrabold uppercase italic leading-[0.88]">
            Não saia por aí <span className="text-amber">desprotegido.</span>
          </h2>
          <p className="mt-5 max-w-lg text-white/65">Fale com um consultor agora e receba sua cotação personalizada no WhatsApp.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-wa px-8 py-4 text-sm font-semibold uppercase tracking-wider text-ink transition hover:brightness-110"
            >
              <FaWhatsapp className="h-5 w-5" /> Chamar no WhatsApp
            </a>
            <a
              href="#cotacao"
              className="inline-flex items-center justify-center border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-wider transition hover:border-amber hover:text-amber"
            >
              Preencher formulário
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-xs text-white/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} {SITE.brand} · CNPJ {SITE.cnpj} · {SITE.email}</p>
          <p className="max-w-xl md:text-right">
            As marcas exibidas pertencem aos seus respectivos titulares. Coberturas e condições sujeitas à análise e aceitação de cada seguradora ou associação.
          </p>
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="wa-pulse fixed bottom-20 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-lg shadow-black/40 transition hover:scale-105 md:bottom-20 md:right-6 md:h-16 md:w-16"
      >
        <FaWhatsapp className="h-8 w-8" />
      </a>
    </div>
  );
}

export default Index;
