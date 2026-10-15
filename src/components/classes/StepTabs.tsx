"use client";

import type { ReactNode } from "react";

import { useState } from "react";

import { ui } from "@/lib/ui";
import { usePanelScroll } from "./ClassMap";

const STEPS = ["Intuizione", "Definizione", "Esempio", "All'esame"];

/** spiegazione per gradi della classe: Intuizione → Definizione → Esempio → All'esame */
export default function StepTabs({ bodies }: { bodies: ReactNode[] }) {
    const [step, setStep] = useState(0);
    usePanelScroll();
    const last = STEPS.length - 1;
    return (
        <>
            <div
                className="border-line mt-5 mb-4 grid grid-cols-2 border-b sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
                role="tablist"
                aria-label="Spiegazione per gradi"
            >
                {STEPS.map((l, i) => {
                    const on = i === step;
                    return (
                        <button
                            key={l}
                            role="tab"
                            type="button"
                            aria-selected={on}
                            onClick={() => setStep(i)}
                            className={`font-ui -mb-px flex min-h-11 min-w-0 cursor-pointer items-center gap-2 border-b-2 px-3 py-2 text-left text-sm ${
                                on ? "text-ink border-(--c) font-semibold" : "text-muted border-transparent font-medium"
                            }`}
                        >
                            <span
                                className={`inline-grid size-5 flex-none place-items-center rounded-full border font-mono text-xs ${
                                    on ? "text-surface border-(--c) bg-(--c)" : "border-line-strong text-muted"
                                }`}
                            >
                                {i + 1}
                            </span>
                            {l}
                        </button>
                    );
                })}
            </div>
            <div role="tabpanel" className="flex min-h-36 flex-col gap-3 [&_p]:max-w-prose">
                {bodies[step]}
            </div>
            <div className="mt-4 flex justify-between gap-2">
                <button
                    className={ui.btn}
                    type="button"
                    disabled={step === 0}
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                    ← Indietro
                </button>
                <button
                    className={ui.btnPrimary}
                    type="button"
                    disabled={step === last}
                    onClick={() => setStep((s) => Math.min(last, s + 1))}
                >
                    Avanti →
                </button>
            </div>
        </>
    );
}
