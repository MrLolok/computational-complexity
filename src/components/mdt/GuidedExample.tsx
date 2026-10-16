"use client";

import type { ReactNode } from "react";

import { useMemo, useState } from "react";

import Arrow from "@/components/Arrow";
import { parseProgram } from "@/lib/tm";
import { ui } from "@/lib/ui";
import Runner, { ruleText } from "./Runner";

export type GuidedStep = { title: string; body: ReactNode; source: string; added: number };

/** Esempio guidato: la tabella cresce un passo del metodo alla volta, e alla fine si esegue. */
export default function GuidedExample({
    steps,
    samples,
    inputHint,
}: {
    steps: GuidedStep[];
    samples: string[];
    inputHint: string;
}) {
    const [i, setI] = useState(0);
    const s = steps[i];
    const program = useMemo(() => parseProgram(s.source).program, [s.source]);
    const last = i === steps.length - 1;
    return (
        <div className="flex flex-col gap-4">
            <ol className="flex flex-wrap gap-2" aria-label="Passi del metodo">
                {steps.map((x, k) => (
                    <li key={x.title}>
                        <button
                            type="button"
                            aria-current={k === i ? "step" : undefined}
                            onClick={() => setI(k)}
                            className={`font-ui min-h-11 rounded-lg border px-3 py-2 text-sm ${k === i ? "border-accent text-accent" : k < i ? "border-line-strong text-ink" : "border-line text-muted"}`}
                        >
                            {k + 1}. {x.title}
                        </button>
                    </li>
                ))}
            </ol>
            <div className="flex flex-col gap-3">{s.body}</div>
            {program && !last && (
                <div className="border-line bg-surface flex flex-col gap-1 rounded-xl border p-4">
                    <p className={ui.label}>Transizioni scritte finora</p>
                    <ul className="flex flex-col gap-1 font-mono text-sm">
                        {program.rules.map((r, k) => (
                            <li
                                key={r.line}
                                className={k >= program.rules.length - s.added ? "text-accent" : "text-muted"}
                            >
                                {ruleText(r)}
                                {r.note && <span className="font-ui text-muted ml-2 text-xs">{r.note}</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {program && last && <Runner program={program} kind="funzione" samples={samples} inputHint={inputHint} />}
            <div className="flex gap-2">
                <button type="button" className={ui.btn} disabled={i === 0} onClick={() => setI(i - 1)}>
                    <Arrow shape="left" /> Passo precedente
                </button>
                <button type="button" className={ui.btnPrimary} disabled={last} onClick={() => setI(i + 1)}>
                    Passo successivo <Arrow />
                </button>
            </div>
        </div>
    );
}
