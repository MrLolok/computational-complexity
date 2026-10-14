"use client";

import { useState } from "react";
import { final, formulaBtn } from "@/components/piani/styles";
import { ui } from "@/lib/ui";
import { CheckRow } from "./CheckRow";

/** formule tra cui scegliere: [testo, soddisfacibile] */
const F: [string, boolean][] = [
  ["p ∨ q", true],
  ["(p ∨ q) ∧ ¬p", true],
  ["p ∧ ¬p", false],
  ["(p ∨ q) ∧ ¬p ∧ ¬q", false],
];
/** assegnamento che soddisfa la formula (certificato o squalifica) */
const WIT: Record<number, string> = { 0: "p vera", 1: "p falsa, q vera" };

function Picker({ sel, onPick }: { sel: number; onPick: (i: number) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {F.map((f, i) => (
        <button key={f[0]} type="button" aria-pressed={i === sel} className={formulaBtn} onClick={() => onPick(i)}>
          {f[0]}
        </button>
      ))}
    </div>
  );
}

/** SAT-UNSAT: φ soddisfacibile e φ′ insoddisfacibile */
export default function SatUnsat() {
  const [f1, setF1] = useState(0);
  const [f2, setF2] = useState(2);
  const s1 = F[f1][1],
    u2 = !F[f2][1];
  return (
    <>
      <div>
        <div className={ui.hint}>φ (deve essere soddisfacibile)</div>
        <Picker sel={f1} onPick={setF1} />
      </div>
      <div>
        <div className={ui.hint}>φ′ (deve essere insoddisfacibile)</div>
        <Picker sel={f2} onPick={setF2} />
      </div>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2.5 gap-y-1.5 text-base">
        <CheckRow tag="NP" ok={s1}>
          φ = {F[f1][0]} è soddisfacibile?{s1 && <span className={ui.hint}> (certificato: {WIT[f1]})</span>}
        </CheckRow>
        <CheckRow tag="coNP" ok={u2}>
          φ′ = {F[f2][0]} è insoddisfacibile?{!u2 && <span className={ui.hint}> (squalifica: {WIT[f2]})</span>}
        </CheckRow>
      </div>
      <div className={final(s1 && u2)}>{s1 && u2 ? "Sì: la coppia sta in SAT-UNSAT." : "No: almeno uno dei due controlli fallisce."}</div>
    </>
  );
}
