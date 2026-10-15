"use client";

import Link from "next/link";
import { useEffect, useId, useState, useSyncExternalStore, type ReactNode } from "react";
import { C, IDS, NAME, type ClassId } from "@/data/classes";
import { ui } from "@/lib/ui";

const TABS = ["Le basi", "Mappa completa", "Probabilistiche", "Quantistiche"];
const subscribe = (cb: () => void) => { window.addEventListener("hashchange", cb); window.addEventListener("popstate", cb); return () => { window.removeEventListener("hashchange", cb); window.removeEventListener("popstate", cb); }; };
/* #probabilistiche, #quantistiche e le #ancore delle spiegazioni (es. #def-bpp) aprono la scheda giusta */
const tabOf = (hash: string, anchors: Record<string, number>) => ({ "#probabilistiche": 2, "#quantistiche": 3 }[hash] ?? anchors[hash.slice(1)] ?? -1);
const serverHash = () => "";
const BASICS: { id: ClassId; text: string }[] = [
  { id: "P", text: "Un algoritmo trova la risposta in tempo polinomiale." },
  { id: "NP", text: "Una risposta sì ha un certificato verificabile in tempo polinomiale." },
  { id: "coNP", text: "Una risposta no ha un certificato verificabile in tempo polinomiale." },
  { id: "DP", text: "Due controlli insieme: uno NP e uno coNP. Non è NP ∩ coNP." },
  { id: "PH", text: "Livelli di quantificatori alternati: esiste, per ogni, esiste…" },
  { id: "PSPACE", text: "Conta lo spazio utilizzato, che deve essere polinomiale." },
];
export default function ClassExplorer({ selected, children, random, quantum, anchors }: { selected: boolean; children: ReactNode; random: ReactNode; quantum: ReactNode; anchors: Record<string, number> }) {
  const [tab, setTab] = useState<number | null>(null);
  const hash = tabOf(useSyncExternalStore(subscribe, () => window.location.hash, serverHash), anchors);
  /* un link interno a un'#ancora (es. dalla mappa) vince sulla scheda scelta a mano */
  useEffect(() => { const reset = () => setTab(null); window.addEventListener("hashchange", reset); return () => window.removeEventListener("hashchange", reset); }, []);
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{BASICS.map(c => <Link key={c.id} href={`/classi/${c.id}`} className={`${ui.card} hover:border-accent`}><span className="font-mono text-lg font-semibold text-accent">{c.id}<span className="float-right text-sm" aria-hidden="true">↗</span></span><p className="text-sm leading-relaxed text-muted">{c.text}</p></Link>)}</div>
          <details className="mt-5 border-t border-line pt-4"><summary className="cursor-pointer text-sm text-muted">Altre classi: spazio logaritmico, tempo esponenziale e calcolabilità</summary><div className="mt-4 grid gap-2 sm:grid-cols-2">{IDS.filter(c => !BASICS.some(b => b.id === c)).map(c => <Link key={c} href={`/classi/${c}`} className="rounded-lg border border-line p-3 text-sm hover:border-accent"><span className="mr-3 font-mono text-accent" dangerouslySetInnerHTML={{ __html: NAME[c] }} />{C[c].full}</Link>)}</div></details>
        </>}
        {active === 1 && children}
        {active === 2 && random}
        {active === 3 && quantum}
      </div>
    </div>
  );
}
