"use client";

import Link from "next/link";
import { useId, useState, useSyncExternalStore, type ReactNode } from "react";
import { C, IDS, NAME, type ClassId } from "@/data/classes";
import { RANDOM_CLASSES, QUANTUM_CLASSES } from "@/data/learning";
import { ui } from "@/lib/ui";

const TABS = ["Le basi", "Mappa completa", "Probabilistiche", "Quantistiche"];
const subscribe = (cb: () => void) => { window.addEventListener("hashchange", cb); window.addEventListener("popstate", cb); return () => { window.removeEventListener("hashchange", cb); window.removeEventListener("popstate", cb); }; };
const hashTab = () => ({ "#probabilistiche": 2, "#quantistiche": 3 }[window.location.hash] ?? -1);
const serverTab = () => -1;
const BASICS: { id: ClassId; text: string }[] = [
  { id: "P", text: "Un algoritmo trova la risposta in tempo polinomiale." },
  { id: "NP", text: "Una risposta sì ha un certificato verificabile in tempo polinomiale." },
  { id: "coNP", text: "Una risposta no ha un certificato verificabile in tempo polinomiale." },
  { id: "DP", text: "Due controlli insieme: uno NP e uno coNP. Non è NP ∩ coNP." },
  { id: "PH", text: "Livelli di quantificatori alternati: esiste, per ogni, esiste…" },
  { id: "PSPACE", text: "Conta lo spazio utilizzato, che deve essere polinomiale." },
];
export default function ClassExplorer({ selected, children }: { selected: boolean; children: ReactNode }) {
  const [tab, setTab] = useState<number | null>(null);
  const hash = useSyncExternalStore(subscribe, hashTab, serverTab);
  const active = tab ?? (hash >= 0 ? hash : selected ? 1 : 0);
  const id = useId();
  const choose = (i: number) => { setTab(i); window.history.replaceState(window.history.state, "", i === 2 ? "#probabilistiche" : i === 3 ? "#quantistiche" : window.location.pathname); };
  return (
    <div>
      <div role="tablist" aria-label="Viste delle classi" className="mb-6 flex flex-wrap gap-1 border-b border-line">
        {TABS.map((label, i) => <button key={label} type="button" role="tab" id={`${id}-tab-${i}`} aria-controls={`${id}-panel`} aria-selected={active === i} tabIndex={active === i ? 0 : -1}
          onClick={() => choose(i)} onKeyDown={e => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
            e.preventDefault(); const next = e.key === "Home" ? 0 : e.key === "End" ? 3 : (active + (e.key === "ArrowRight" ? 1 : -1) + 4) % 4;
            choose(next); document.getElementById(`${id}-tab-${next}`)?.focus();
          }} className={`min-h-11 cursor-pointer border-b-2 px-3 py-2 text-sm ${active === i ? "border-accent font-semibold text-accent" : "border-transparent text-muted hover:text-ink"}`}>{label}</button>)}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`}>
        {active === 0 && <>
          <p className={`${ui.hint} mb-4`}>Parti dall&apos;intuizione. Apri una classe per definizione, esempio e domande d&apos;esame.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{BASICS.map(c => <Link key={c.id} href={`/classi/${c.id}`} className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-5 hover:border-accent"><span className="font-mono text-lg font-semibold text-accent">{c.id}<span className="float-right text-sm" aria-hidden="true">↗</span></span><p className="text-sm leading-relaxed text-muted">{c.text}</p></Link>)}</div>
          <details className="mt-5 border-t border-line pt-4"><summary className="cursor-pointer text-sm text-muted">Altre classi: spazio logaritmico, tempo esponenziale e calcolabilità</summary><div className="mt-4 grid gap-2 sm:grid-cols-2">{IDS.filter(c => !BASICS.some(b => b.id === c)).map(c => <Link key={c} href={`/classi/${c}`} className="rounded-lg border border-line p-3 text-sm hover:border-accent"><span className="mr-3 font-mono text-accent" dangerouslySetInnerHTML={{ __html: NAME[c] }} />{C[c].full}</Link>)}</div></details>
        </>}
        {active === 1 && children}
        {active >= 2 && <div className="flex flex-col gap-5">
          <p className={ui.lede}>{active === 2 ? "La casualità cambia il tipo di garanzia: distingui dove può esserci errore e quanto è grande il margine." : "Il quantistico amplia il modello di calcolo. Nelle tracce la classe da conoscere è BQP."}</p>
          <div className={ui.formula}>{active === 2 ? "P ⊆ ZPP = RP ∩ coRP ⊆ BPP ⊆ PP ⊆ PSPACE" : "P ⊆ BPP ⊆ BQP ⊆ PP ⊆ PSPACE"}</div>
          <p className="text-sm text-muted">⊆ indica un&apos;inclusione dimostrata; non afferma che le classi siano diverse.{active === 2 && " RP e coRP sono entrambe contenute in BPP. Inoltre BPP ⊆ Σ₂ᴾ ∩ Π₂ᴾ."}</p>
          <div className="grid gap-3 sm:grid-cols-2">{(active === 2 ? RANDOM_CLASSES : QUANTUM_CLASSES).map(c => <article key={c.id} id={c.id} className={ui.card}><h3 className="font-mono text-xl text-accent" data-term={c.id} tabIndex={0} role="button">{c.name}</h3><p className="font-semibold">{c.brief}</p><p className="text-sm text-muted">{c.definition}</p></article>)}</div>
          <p className="text-sm text-muted">Da ricordare: {active === 2 ? "in BPP ripetere aiuta; in PP un margine troppo piccolo può richiedere troppe ripetizioni." : "BQP ⊆ PSPACE dà una simulazione classica in spazio polinomiale, senza garantire tempo polinomiale. NP ⊆ BQP e PH ⊆ BQP sono questioni aperte."}</p>
          <Link href={active === 2 ? "/tracce/F07#d3" : "/quantistico"} className={`${ui.btn} self-start`}>{active === 2 ? "Prova una domanda su BPP →" : "Macchine, Grover e domande d’esame →"}</Link>
          <details className="text-xs text-muted"><summary className="cursor-pointer">Fonti e integrazioni</summary><p className="mt-2">Lezioni 6 e 11 e tracce del corso. {active === 2 && "RP, coRP e ZPP sono un’integrazione di contesto ✱: "}<a href={active === 2 ? "https://www.cs.princeton.edu/courses/archive/spring16/cos522/" : "https://cs.uwaterloo.ca/~watrous/Papers/QuantumComputationalComplexity.pdf"} className="text-accent underline">{active === 2 ? "Arora, Computational Complexity" : "Watrous, Quantum Computational Complexity"}</a>.</p></details>
        </div>}
      </div>
    </div>
  );
}
