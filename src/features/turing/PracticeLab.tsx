"use client";

import type { MdtRow } from "@/store/progressSlice";

import { useMemo, useRef, useState } from "react";

import { MACHINE_BY, MACHINES } from "@/data/turing/machines";
import { ui } from "@/lib/tokens";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { saveMdtDraft, submitMdt } from "@/store/progressSlice";
import { check, lint } from "./diagnose";
import MachineRunner from "./MachineRunner";
import SolutionDiff from "./SolutionDiff";
import TransitionTable, { compile, fit, rowsFrom } from "./TransitionTable";

/** Compila la tabella della tua macchina, provala passo per passo e confrontala con i risultati attesi.
    In una traccia (code) la verifica è la consegna: il risultato resta salvato per la macchina. */
export default function PracticeLab({ id, draftKey, code }: { id?: string; draftKey: string; code?: string }) {
    const dispatch = useAppDispatch();
    const saved = useAppSelector((s) => s.progress.mdtDrafts?.[draftKey]);
    const delivered = useAppSelector((s) => (id ? s.progress.mdtResults?.[id] : undefined));
    const [preset, setPreset] = useState(id ?? "");
    const m = preset ? MACHINE_BY[preset] : undefined;
    const rows = useMemo(
        () => (Array.isArray(saved) ? saved : rowsFrom(saved ?? m?.skeleton ?? EMPTY, m?.tapes)),
        [saved, m],
    );
    const tapes = m?.tapes ?? rows[0]?.read.length ?? 1;
    const { source, program, errors } = useMemo(() => compile(rows), [rows]);
    const warnings = useMemo(() => (program ? lint(program, m) : []), [program, m]);
    const [report, setReport] = useState<ReturnType<typeof check> | null>(null);
    /** input di un caso fallito, caricato nel simulatore */
    const [probe, setProbe] = useState<string | null>(null);
    const runner = useRef<HTMLDivElement>(null);
    const samples = m?.samples ?? ["1011"];
    const [compare, setCompare] = useState(false);
    const set = (value: MdtRow[] | null) => {
        setReport(null);
        dispatch(saveMdtDraft({ key: draftKey, rows: value }));
    };
    const verify = () => {
        if (!m || !program) return;
        const r = check(program, m);
        setReport(r);
        if (code) dispatch(submitMdt({ id: m.id, code, ok: r.ok, tot: r.tot }));
    };
    const follow = (input: string) => {
        setProbe(input);
        requestAnimationFrame(() => runner.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    };

    return (
        <div className="flex min-w-0 flex-col gap-3">
            {!id && (
                <div className="flex flex-wrap gap-3">
                    <label className="font-ui text-muted flex min-w-0 flex-1 basis-56 flex-col gap-1 text-sm">
                        Scegli un esercizio
                        <select
                            className={ui.select}
                            value={preset}
                            onChange={(e) => {
                                const next = MACHINE_BY[e.target.value];
                                setPreset(e.target.value);
                                set(next ? rowsFrom(next.skeleton, next.tapes) : null);
                            }}
                        >
                            <option value="">Programma libero</option>
                            {MACHINES.map((x) => (
                                <option key={x.id} value={x.id}>
                                    {x.title}
                                </option>
                            ))}
                        </select>
                    </label>
                    {!m && (
                        <label className="font-ui text-muted flex flex-col gap-1 text-sm">
                            Nastri
                            <select
                                className={ui.select}
                                value={tapes}
                                onChange={(e) => {
                                    const k = Number(e.target.value);
                                    set(
                                        rows.map((r) => ({
                                            ...r,
                                            read: fit(r.read, k),
                                            write: fit(r.write, k),
                                            move: fit(r.move, k),
                                        })),
                                    );
                                }}
                            >
                                {[1, 2, 3].map((k) => (
                                    <option key={k}>{k}</option>
                                ))}
                            </select>
                        </label>
                    )}
                </div>
            )}
            <TransitionTable
                rows={rows}
                tapes={tapes}
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
                    <p className="font-semibold">Da controllare</p>
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
                {m && (
                    <button
                        type="button"
                        className={ui.btnPrimary}
                        onClick={verify}
                        disabled={!program}
                        title={code && delivered ? "La nuova consegna sostituisce quella di prima" : undefined}
                    >
                        {!code ? "Verifica i casi di prova" : delivered ? "Consegna di nuovo" : "Consegna"}
                    </button>
                )}
                {m && (
                    <button
                        type="button"
                        className={ui.btn}
                        aria-expanded={compare}
                        onClick={() => setCompare((c) => !c)}
                    >
                        {compare ? "Nascondi il confronto" : "Confronta con la soluzione"}
                    </button>
                )}
                <button
                    type="button"
                    className={`${ui.linkBtn} text-muted ml-auto`}
                    onClick={() => confirm("Cancellare la tabella e ripartire dal modello?") && set(null)}
                >
                    Ricomincia da capo
                </button>
            </div>
            {m && compare && <SolutionDiff program={program} m={m} />}
            {report && (
                <div className={report.ok === report.tot ? ui.noteOk : ui.note} aria-live="polite">
                    <p className="font-semibold">
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
                        kind={m?.kind ?? "funzione"}
                        oracle={m?.oracle}
                        samples={probe === null ? samples : [...new Set([probe, ...samples])]}
                        inputHint={m?.inputHint ?? "una stringa di simboli"}
                        numbered
                    />
                </div>
            )}
        </div>
    );
}

const EMPTY = "s ▷ -> s ▷ R";
