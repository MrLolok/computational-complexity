import type { Metadata } from "next";
import Link from "next/link";
import ClassesView from "@/components/classes/ClassesView";
import { ui } from "@/lib/ui";

export const metadata: Metadata = { title: "Inizia il ripasso" };
const PATHS = [
  {
    n: "01",
    href: "/classi",
    title: "Capisci le classi",
    text: "Dalla verifica di un certificato ai limiti di tempo e spazio.",
    tag: "Il punto di partenza",
  },
  {
    n: "02",
    href: "/problemi",
    title: "Collega i concetti",
    text: "Problemi concreti, riduzioni e teoremi: dai un significato alla mappa.",
    tag: "Dalla teoria agli esempi",
  },
  {
    n: "03",
    href: "/tracce",
    title: "Mettiti alla prova",
    text: "Rispondi alle domande d’esame e usa le spiegazioni per il ripasso.",
    tag: "Preparati all’esame",
  },
];
export default function Page() {
  return (
    <>
      <section className="grid items-center gap-10 py-5 sm:py-10 min-[900px]:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <h1 className="max-w-[17ch] font-head text-[clamp(2.6rem,5.5vw,4.4rem)] font-bold leading-[1.08] tracking-[-0.045em] text-balance">
            La complessità,
            <br />
            <span className="text-accent">un concetto alla volta.</span>
          </h1>
          <p className={ui.lede}>
            Una dispensa da esplorare: scopri che cosa significa una classe,
            riconosci i suoi problemi e allenati sulle tracce d&apos;esame.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/classi/NP" className={ui.btnPrimary}>
              Inizia da NP →
            </Link>
            <Link href="/tracce" className={ui.btn}>
              Apri una traccia
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-surface px-6 py-7 sm:px-8">
          <p className={ui.eyebrow}>Una prima bussola</p>
          <div className="my-6 flex flex-col items-start gap-3">
            {[
              ["P", "Risolvere in tempo polinomiale"],
              ["NP", "Verificare un sì in tempo polinomiale"],
              ["PSPACE", "Risolvere con spazio polinomiale"],
            ].map(([id, text], i) => (
              <div
                key={id}
                className="w-full"
                style={{ paddingLeft: `${i * 16}px` }}
              >
                {i > 0 && (
                  <span
                    className="mb-2 block pl-3 font-mono text-muted"
                    aria-label="è contenuta in"
                  >
                    ↓ ⊆
                  </span>
                )}
                <Link
                  href={`/classi/${id}`}
                  className="flex items-center gap-4 rounded-lg border border-line-strong px-4 py-3 hover:border-accent"
                >
                  <span className="min-w-16 font-mono font-semibold text-accent">
                    {id}
                  </span>
                  <span className="text-sm text-muted">{text}</span>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted">
            P ⊆ NP ⊆ PSPACE. Le inclusioni sono note; non sappiamo se sono
            strette.
          </p>
        </div>
      </section>
      <section aria-labelledby="percorso" className="border-t border-line pt-8">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="percorso" className={ui.h2}>
            Un percorso per il ripasso
          </h2>
          <span className="text-sm text-muted">Scegli da dove iniziare</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PATHS.map((p) => (
            <Link
              key={p.n}
              href={p.href}
              className="group flex flex-col gap-3 rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent"
            >
              <span className="font-mono text-sm text-accent">
                {p.n}
                <span className="float-right" aria-hidden="true">
                  ↗
                </span>
              </span>
              <h3 className={ui.h3}>{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{p.text}</p>
              <span className="mt-auto pt-3 text-xs text-muted">{p.tag}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-lg border-y border-line py-5 text-sm">
        <h2 className="font-semibold">Come si usa</h2>
        <ol className="flex flex-wrap gap-x-7 gap-y-2 text-muted">
          <li>1. Scegli un concetto.</li>
          <li>2. Apri un esempio.</li>
          <li>3. Prova una domanda.</li>
        </ol>
        <p className="text-muted">
          I termini sottolineati offrono un aiuto al passaggio, al focus o al
          tocco.
        </p>
      </section>
      <ClassesView sel={null} embedded />
      <section className="grid gap-4 border-t border-line pt-7 sm:grid-cols-2">
        <Link
          href="/confronta"
          className="flex flex-col gap-2 rounded-xl bg-surface p-5"
        >
          <h2 className={ui.h3}>Come si collegano due classi? →</h2>
          <p className="text-sm text-muted">
            Scegli una coppia e distingui inclusioni note, separazioni e
            questioni aperte.
          </p>
        </Link>
        <Link
          href="/quantistico"
          className="flex flex-col gap-2 rounded-xl bg-surface p-5"
        >
          <h2 className={ui.h3}>Quantistico, senza perdersi →</h2>
          <p className="text-sm text-muted">
            BQP, Grover e crittografia: i concetti che ricorrono nelle tracce.
          </p>
        </Link>
      </section>
    </>
  );
}
