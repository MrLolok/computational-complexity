"use client";
import { useState } from "react";
import Link from "next/link";
import { ui } from "@/lib/ui";

const LEVELS = [
  { n: 1, sigma: "NP", pi: "coNP", quantifiers: "∃", example: "Esiste un assegnamento che rende vera la formula?", problem: "SAT", id: "SAT", text: "Un solo blocco esistenziale: basta trovare un certificato. Cambiando ∃ in ∀ ottieni la famiglia complementare." },
  { n: 2, sigma: "Σ₂ᴾ", pi: "Π₂ᴾ", quantifiers: "∃ ∀", example: "Esiste una scelta x che funziona per ogni scelta y?", problem: "QSAT₂", id: "QSATi", text: "Due blocchi alternati. Fissi x, poi il controllo deve riuscire per tutte le y. Non basta verificare una singola coppia." },
  { n: 3, sigma: "Σ₃ᴾ", pi: "Π₃ᴾ", quantifiers: "∃ ∀ ∃", example: "Esiste x tale che, per ogni y, esiste z che fa riuscire il controllo?", problem: "QSAT₃", id: "QSATi", text: "Tre blocchi alternati. L’ultima scelta z può dipendere da y. Continua con la stessa regola per i livelli successivi." },
];
export default function PhLevels() {
  const [level, setLevel] = useState(0);
  const l = LEVELS[level];
  return <section className={ui.card}>
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className={ui.h3}>1. Aggiungi un’alternanza</h2><div role="group" aria-label="Livello di PH" className="flex gap-2">{LEVELS.map((x, i) => <button key={x.n} type="button" aria-pressed={i === level} className={i === level ? ui.btnPrimary : ui.btn} onClick={() => setLevel(i)}>Piano {x.n}</button>)}</div></div>
    <div aria-live="polite" className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2">
      <div className="flex flex-col justify-center gap-3 rounded-lg bg-sunk p-4 sm:p-5"><span className={ui.eyebrow}>Parte da «esiste»</span><span className="font-mono text-4xl text-accent">{l.quantifiers}</span><p className="font-mono text-lg">{l.sigma}</p><p className="text-sm text-muted">Partendo da ∀: {l.pi}</p></div>
      <div className="flex flex-col justify-center gap-3"><h3 className={ui.h3}>{l.example}</h3><p className="text-muted">{l.text}</p><Link href={`/problemi/${l.id}`} data-term={`problem:${l.id}`} className="self-start text-sm text-accent underline underline-offset-4">Esempio: {l.problem} →</Link></div>
    </div>
    <p className="border-t border-line pt-3 text-sm text-muted">Conta i <b className="text-ink">blocchi alternati</b>, non le variabili. ∃x ∃y è un solo blocco. PH raccoglie tutti i livelli finiti; PH ⊆ PSPACE.</p>
  </section>;
}
