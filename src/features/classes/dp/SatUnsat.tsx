"use client";

import { useState } from "react";

import Tex from "@/components/Tex";
import { texHtml } from "@/lib/tex";
import { formulaBtn, outcomeClass, ui } from "@/lib/tokens";
import { CheckRow } from "./CheckRow";

/** formule tra cui scegliere: [LaTeX, soddisfacibile] */
const F: [string, boolean][] = [
    [String.raw`p \lor q`, true],
    [String.raw`(p \lor q) \land \neg p`, true],
    [String.raw`p \land \neg p`, false],
    [String.raw`(p \lor q) \land \neg p \land \neg q`, false],
];
/** assegnamento che soddisfa la formula (certificato o squalifica), HTML con formule $…$ */
const WIT: Record<number, string> = { 0: "$p$ vera", 1: "$p$ falsa, $q$ vera" };

function Picker({ sel, onPick }: { sel: number; onPick: (i: number) => void }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {F.map((f, i) => (
                <button
                    key={f[0]}
                    type="button"
                    aria-pressed={i === sel}
                    className={formulaBtn}
                    onClick={() => onPick(i)}
                >
                    <Tex>{f[0]}</Tex>
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
                <div className={ui.hint}>
                    <Tex>{String.raw`\varphi`}</Tex> (deve essere soddisfacibile)
                </div>
                <Picker sel={f1} onPick={setF1} />
            </div>
            <div>
                <div className={ui.hint}>
                    <Tex>{String.raw`\varphi'`}</Tex> (deve essere insoddisfacibile)
                </div>
                <Picker sel={f2} onPick={setF2} />
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2.5 gap-y-1.5 text-base">
                <CheckRow tag="NP" ok={s1}>
                    <Tex>{`\\varphi = ${F[f1][0]}`}</Tex> è soddisfacibile?
                    {s1 && (
                        <span
                            className={ui.hint}
                            dangerouslySetInnerHTML={{ __html: texHtml(` (certificato: ${WIT[f1]})`) }}
                        />
                    )}
                </CheckRow>
                <CheckRow tag="coNP" ok={u2}>
                    <Tex>{`\\varphi' = ${F[f2][0]}`}</Tex> è insoddisfacibile?
                    {!u2 && (
                        <span
                            className={ui.hint}
                            dangerouslySetInnerHTML={{ __html: texHtml(` (squalifica: ${WIT[f2]})`) }}
                        />
                    )}
                </CheckRow>
            </div>
            <div className={outcomeClass(s1 && u2)}>
                {s1 && u2 ? "Sì: la coppia sta in SAT-UNSAT." : "No: almeno uno dei due controlli fallisce."}
            </div>
        </>
    );
}
