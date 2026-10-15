"use client";

import { useState } from "react";
import { texHtml } from "@/lib/tex";

type Key = "si" | "no" | "altro";
/** [affermazione, risposta giusta, spiegazione]: HTML con formule $…$ */
const TF: [string, Key, string][] = [
  ["SAT sta in DP.", "si", "SÌ: $\\mathrm{NP} \\subseteq \\mathrm{DP}$. Si prende $L_1 = \\mathrm{SAT}$ e $L_2$ = tutte le stringhe, che sta in coNP."],
  ["UNSAT sta in DP.", "si", "SÌ: $\\mathrm{coNP} \\subseteq \\mathrm{DP}$, con $L_1$ = tutte le stringhe e $L_2 = \\mathrm{UNSAT}$."],
  [
    "DP e $\\mathrm{NP} \\cap \\mathrm{coNP}$ sono la stessa classe.",
    "altro",
    "Non si sa, ma le definizioni sono diverse e si crede che le classi lo siano. Si sa che $\\mathrm{NP} \\cap \\mathrm{coNP} \\subseteq \\mathrm{NP} \\subseteq \\mathrm{DP}$: l'uguaglianza darebbe $\\mathrm{NP} \\subseteq \\mathrm{NP} \\cap \\mathrm{coNP}$, cioè $\\mathrm{NP} \\subseteq \\mathrm{coNP}$ e quindi $\\mathrm{NP} = \\mathrm{coNP}$. All'esame: «altro: solo se $\\mathrm{NP} = \\mathrm{coNP}$».",
  ],
  ["EXACT TSP sta in NP.", "altro", "Altro: solo se $\\mathrm{NP} = \\mathrm{coNP}$. EXACT TSP è DP-completo: se stesse in NP, tutto DP starebbe in NP, quindi $\\mathrm{coNP} \\subseteq \\mathrm{NP}$."],
  [
    "SAT-UNSAT si risolve in $\\mathrm{P}^{\\mathrm{NP}}$.",
    "si",
    "SÌ: $\\mathrm{DP} \\subseteq \\mathrm{P}^{\\mathrm{NP}}$. Si chiede all'oracolo SAT se $\\varphi$ è soddisfacibile e se $\\varphi'$ lo è, poi si combinano le risposte (è la MdT con oracolo della dispensa cap. 16).",
  ],
  ["DP ha problemi completi, $\\mathrm{NP} \\cap \\mathrm{coNP}$ no (per quanto si sa).", "si", "SÌ: SAT-UNSAT è DP-completo; per $\\mathrm{NP} \\cap \\mathrm{coNP}$ non se ne conoscono."],
];
const OPTS: [Key, string][] = [
  ["si", "Vero"],
  ["no", "Falso"],
  ["altro", "Non si sa"],
];
const base = "min-h-11 cursor-pointer rounded-lg border px-3 py-2 font-ui text-sm font-semibold";

function Item({ t }: { t: [string, Key, string] }) {
  const [picked, setPicked] = useState<Key | null>(null);
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-line px-3 py-3">
      <div dangerouslySetInnerHTML={{ __html: texHtml(t[0]) }} />
      <div className="flex flex-wrap gap-1.5">
        {OPTS.map(([k, l]) => {
          const right = picked !== null && k === t[1],
            wrong = picked === k && k !== t[1];
          return (
            <button
              key={k}
              type="button"
              onClick={() => setPicked(k)}
              className={`${base} ${right ? "border-ok bg-ok-soft text-ok" : wrong ? "border-proved bg-proved-soft text-proved" : "border-line-strong text-ink"}`}
            >
              {l}
            </button>
          );
        })}
      </div>
      {picked !== null && <div className="text-base" dangerouslySetInnerHTML={{ __html: texHtml(t[2]) }} />}
    </div>
  );
}

/** vero, falso o non si sa? sei affermazioni su DP */
export default function TrueFalse() {
  return (
    <div className="flex flex-col gap-2.5">
      {TF.map((t) => (
        <Item key={t[0]} t={t} />
      ))}
    </div>
  );
}
