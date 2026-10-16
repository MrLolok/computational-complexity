"use client";

import { useMemo } from "react";

import { MACHINE_BY } from "@/data/turing/machines";
import { parseProgram } from "./machine";
import MachineRunner from "./MachineRunner";

/** La soluzione di una traccia, da eseguire passo per passo. */
export default function SolutionLab({ id }: { id: string }) {
    const m = MACHINE_BY[id];
    const program = useMemo(() => parseProgram(m.source).program!, [m]);
    return (
        <div className="flex flex-col gap-3">
            <MachineRunner
                program={program}
                kind={m.kind}
                oracle={m.oracle}
                samples={m.samples}
                inputHint={m.inputHint}
            />
            <details className="border-line rounded-lg border p-3 text-sm">
                <summary className="text-accent cursor-pointer">Mostra il codice della soluzione</summary>
                <pre className="bg-sunk mt-3 overflow-x-auto rounded-lg p-3 font-mono text-sm leading-relaxed">
                    {m.source}
                </pre>
            </details>
        </div>
    );
}
