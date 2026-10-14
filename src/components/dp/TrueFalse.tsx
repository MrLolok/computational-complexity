"use client";

import { useState } from "react";

type Key = "si" | "no" | "altro";
/** [affermazione, risposta giusta, spiegazione] */
const TF: [string, Key, string][] = [
  ["SAT sta in DP.", "si", "SÌ: NP ⊆ DP. Si prende L₁ = SAT e L₂ = tutte le stringhe, che sta in coNP."],
  ["UNSAT sta in DP.", "si", "SÌ: coNP ⊆ DP, con L₁ = tutte le stringhe e L₂ = UNSAT."],
  [
    "DP e NP ∩ coNP sono la stessa classe.",
    "altro",
    "Non si sa, ma le definizioni sono diverse e si crede che le classi lo siano. Si sa che NP ∩ coNP ⊆ NP ⊆ DP: l'uguaglianza darebbe NP ⊆ NP ∩ coNP, cioè NP ⊆ coNP e quindi NP = coNP. All'esame: «altro: solo se NP = coNP».",
  ],
  ["EXACT TSP sta in NP.", "altro", "Altro: solo se NP = coNP. EXACT TSP è DP-completo: se stesse in NP, tutto DP starebbe in NP, quindi coNP ⊆ NP."],
  [
    "SAT-UNSAT si risolve in P^NP.",
    "si",
    "SÌ: DP ⊆ P^NP. Si chiede all'oracolo SAT se φ è soddisfacibile e se φ′ lo è, poi si combinano le risposte (è la MdT con oracolo della dispensa cap. 16).",
  ],
  ["DP ha problemi completi, NP ∩ coNP no (per quanto si sa).", "si", "SÌ: SAT-UNSAT è DP-completo; per NP ∩ coNP non se ne conoscono."],
];
const OPTS: [Key, string][] = [
  ["si", "Vero"],
  ["no", "Falso"],
  ["altro", "Non si sa"],
];
const base = "cursor-pointer rounded-lg border px-[0.75rem] py-[0.3rem] font-ui text-[0.82rem] font-semibold";

function Item({ t }: { t: [string, Key, string] }) {
  const [picked, setPicked] = useState<Key | null>(null);
  return (
    <div className="flex flex-col gap-[0.45rem] rounded-[10px] border border-line px-[0.85rem] py-[0.7rem]">
      <div>{t[0]}</div>
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
      {picked !== null && <div className="text-[0.92rem]">{t[2]}</div>}
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
