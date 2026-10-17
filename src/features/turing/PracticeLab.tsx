"use client";

import type { MdtRow } from "@/store/progressSlice";

import { useMemo, useRef, useState } from "react";

import { MACHINE_BY } from "@/data/turing/machines";
import { ui } from "@/lib/tokens";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { saveMdtDraft, submitMdt } from "@/store/progressSlice";
import { check, lint } from "./diagnose";
import MachineRunner from "./MachineRunner";
import SolutionDiff from "./SolutionDiff";
import TransitionTable, { compile, rowsFrom } from "./TransitionTable";

/** Compila la tabella della macchina di una traccia, provala passo per passo e consegnala:
    il risultato della consegna resta salvato per la macchina, anche nelle altre tracce che la ripropongono. */
export default function PracticeLab({ id, code }: { id: string; code: string }) {
    const dispatch = useAppDispatch();
    const m = MACHINE_BY[id];
    const key = `traccia:${code}`;
    const saved = useAppSelector((s) => s.progress.mdtDrafts?.[key]);
    const delivered = useAppSelector((s) => s.progress.mdtResults?.[id]);
    const rows = useMemo(() => (Array.isArray(saved) ? saved : rowsFrom(saved ?? m.skeleton, m.tapes)), [saved, m]);
    const { source, program, errors } = useMemo(() => compile(rows), [rows]);
    const warnings = useMemo(() => (program ? lint(program, m) : []), [program, m]);
    const [report, setReport] = useState<ReturnType<typeof check> | null>(null);
    /** input di un caso fallito, caricato nel simulatore */
    const [probe, setProbe] = useState<string | null>(null);
    const runner = useRef<HTMLDivElement>(null);
    const [compare, setCompare] = useState(false);
    const set = (value: MdtRow[] | null) => {
        setReport(null);
        dispatch(saveMdtDraft({ key, rows: value }));
    };
    const verify = () => {
        if (!program) return;
        const r = check(program, m);
        setReport(r);
        dispatch(submitMdt({ id, code, ok: r.ok, tot: r.tot }));
    };
    const follow = (input: string) => {
        setProbe(input);
        requestAnimationFrame(() => runner.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    };

    return (
        <div className="flex min-w-0 flex-col gap-3">
            <TransitionTable
                rows={rows}
                tapes={m.tapes}
                bad={
                    new Set([...errors.map((e) => e.line - 1), ...(report?.issues ?? []).map((i) => (i.row ?? 0) - 1)])
                }
                warn={new Set(warnings.map((w) => w.line - 1))}
                onChange={set}
            />
            {errors.length > 0 && (
                <ul className={`${ui.noteTrap} flex flex-col gap-1 text-sm`}>
                    {errors.slice(0, 5).map((e, i) => (
                        <li key={i}>{e.line ? `Riga ${e.line}: ${e.message}` : e.message}</li>
                    ))}
                </ul>
            )}
            {warnings.length > 0 && (
                <div className={`${ui.note} text-sm`}>
                    <p className="font-medium">Da controllare</p>
                    <ul className="mt-1 flex flex-col gap-1">
                        {warnings.map((w, i) => (
                            <li key={i}>
                                Riga {w.line}: {w.message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    className={ui.btnPrimary}
                    onClick={verify}
                    disabled={!program}
                    title={delivered ? "La nuova consegna sostituisce quella di prima" : undefined}
                >
                    {delivered ? "Consegna di nuovo" : "Consegna"}
                </button>
                <button type="button" className={ui.btn} aria-expanded={compare} onClick={() => setCompare((c) => !c)}>
                    {compare ? "Nascondi il confronto" : "Confronta con la soluzione"}
                </button>
                <button
                    type="button"
                    className={`${ui.linkBtn} text-muted ml-auto`}
                    onClick={() => confirm("Cancellare la tabella e ripartire dal modello?") && set(null)}
                >
                    Ricomincia da capo
                </button>
            </div>
            {compare && <SolutionDiff program={program} m={m} />}
            {report && (
                <div className={report.ok === report.tot ? ui.noteOk : ui.note} aria-live="polite">
                    <p className="font-medium">
                        {report.ok === report.tot
                            ? `Tutti i ${report.tot} casi di prova superati.`
                            : `Casi di prova superati: ${report.ok} su ${report.tot}.`}
                    </p>
                    {report.issues.length > 0 && (
                        <ul className="mt-2 flex flex-col gap-2 text-sm">
                            {report.issues.map((i) => (
                                <li key={`${i.row} ${i.text}`}>
                                    {i.row ? (
                                        <>
                                            <b>Riga {i.row}</b>: {i.text}
                                        </>
                                    ) : (
                                        i.text[0].toUpperCase() + i.text.slice(1)
                                    )}{" "}
                                    ({i.count} {i.count === 1 ? "caso" : "casi"}, per esempio{" "}
                                    <code className="font-mono">{i.example || "stringa vuota"}</code>).{" "}
                                    <button type="button" className={ui.linkBtn} onClick={() => follow(i.example)}>
                                        Seguilo passo per passo
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {report.issues.length > 0 && warnings.length > 0 && (
                        <p className="mt-2 text-sm">
                            Sistema prima le righe «da controllare»: spesso causano anche gli altri errori.
                        </p>
                    )}
                </div>
            )}
            {program && (
                <div ref={runner} className="scroll-mt-44 sm:scroll-mt-32">
                    <MachineRunner
                        key={`${source}|${probe}`}
                        program={program}
                        kind={m.kind}
                        oracle={m.oracle}
                        samples={probe === null ? m.samples : [...new Set([probe, ...m.samples])]}
                        inputHint={m.inputHint}
                        numbered
                    />
                </div>
            )}
        </div>
    );
}
