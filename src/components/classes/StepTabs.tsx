"use client";

import { useState, type ReactNode } from "react";
import { usePanelScroll } from "./ClassMap";
import { ui } from "@/lib/ui";

const STEPS = ["Intuizione", "Definizione", "Esempio", "All'esame"];

/** spiegazione per gradi della classe: Intuizione → Definizione → Esempio → All'esame */
export default function StepTabs({ bodies }: { bodies: ReactNode[] }) {
  const [step, setStep] = useState(0);
  usePanelScroll();
  const last = STEPS.length - 1;
  return (
    <>
      <div className="mb-4 mt-[1.2rem] flex flex-wrap border-b border-line" role="tablist" aria-label="Spiegazione per gradi">
        {STEPS.map((l, i) => {
          const on = i === step;
          return (
            <button
              key={l}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setStep(i)}
              className={`-mb-px flex min-w-24 flex-[1_1_0] cursor-pointer items-center gap-[7px] border-b-2 px-1 py-2 text-left font-ui text-[0.84rem] ${
                on ? "border-(--c) font-semibold text-ink" : "border-transparent font-medium text-muted"
              }`}
            >
              <span
                className={`inline-grid size-[19px] flex-none place-items-center rounded-full border font-mono text-[0.7rem] ${
                  on ? "border-(--c) bg-(--c) text-surface" : "border-line-strong text-muted"
                }`}
              >
                {i + 1}
              </span>
              {l}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="flex min-h-36 flex-col gap-[0.7rem] [&_p]:max-w-[66ch]">
        {bodies[step]}
      </div>
      <div className="mt-[0.9rem] flex justify-between gap-2">
        <button className={ui.btn} type="button" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          ← Indietro
        </button>
        <button className={ui.btnPrimary} type="button" disabled={step === last} onClick={() => setStep((s) => Math.min(last, s + 1))}>
          Avanti →
        </button>
      </div>
    </>
  );
}
