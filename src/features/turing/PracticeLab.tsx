"use client";

import type { MdtRow } from "@/store/progressSlice";

import { useMemo, useState } from "react";

import { MACHINE_BY, MACHINES } from "@/data/turing/machines";
import { ui } from "@/lib/tokens";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { saveMdtDraft, submitMdt } from "@/store/progressSlice";
import { ORACLES, run } from "./machine";
import MachineRunner from "./MachineRunner";
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
    const [report, setReport] = useState<{ ok: number; tot: number; fails: string[] } | null>(null);
    const [compare, setCompare] = useState(false);
    const solution = useMemo(() => (m ? rowsFrom(m.source, m.tapes) : []), [m]);
    const set = (value: MdtRow[] | null) => {
        setReport(null);
        dispatch(saveMdtDraft({ key: draftKey, rows: value }));
    };
    const verify = () => {
        if (!m || !program) return;
        const tests = m.tests();
        const fails: string[] = [];
        let ok = 0;
        for (const x of tests) {
            const e = m.expected(x)!;
            const o = run(program, x, { oracle: m.oracle ? ORACLES[m.oracle] : undefined });
            const good = e.result === "h" ? o.result === "h" && o.output === e.output : o.result === e.result;
            if (good) ok++;
            else if (fails.length < 4) {
                const want = e.result === "h" ? `output ${e.output}` : e.result;
                const got =
                    o.result === "h"
                        ? `output ${o.output || "(vuoto)"}`
                        : o.result === "limit"
                          ? "limite di esecuzione raggiunto"
                          : o.result;
                fails.push(`Input ${x || "(stringa vuota)"}: atteso ${want}; ottenuto ${got}`);
            }
        }
        setReport({ ok, tot: tests.length, fails });
        if (code) dispatch(submitMdt({ id: m.id, code, ok, tot: tests.length }));
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
            <TransitionTable rows={rows} tapes={tapes} bad={new Set(errors.map((e) => e.line - 1))} onChange={set} />
            {errors.length > 0 && (
                <ul className={`${ui.noteTrap} flex flex-col gap-1 text-sm`}>
                    {errors.slice(0, 5).map((e, i) => (
                        <li key={i}>{e.line ? `Riga ${e.line}: ${e.message}` : e.message}</li>
                    ))}
                </ul>
            )}
            <div className="flex flex-wrap gap-2">
                {m && (
                    <button type="button" className={ui.btnPrimary} onClick={verify} disabled={!program}>
                        {!code ? "Verifica i casi di prova" : delivered ? "Consegna di nuovo" : "Consegna"}
                    </button>
                )}
                <button type="button" className={ui.btn} onClick={() => set(null)}>
                    Riparti dal modello
                </button>
                {m && (
                    <button
                        type="button"
                        className={ui.btn}
                        aria-expanded={compare}
                        onClick={() => setCompare((c) => !c)}
                    >
                        {compare ? "Nascondi la soluzione" : "Confronta con la soluzione"}
                    </button>
                )}
                {code && delivered && !report && (
                    <span className={`${ui.hint} self-center text-sm`}>
                        La nuova consegna sostituisce quella di prima.
                    </span>
                )}
            </div>
            {m && compare && (
                <div className="flex min-w-0 flex-col gap-2">
                    <p className={ui.label}>La soluzione</p>
                    <TransitionTable rows={solution} tapes={m.tapes} />
                </div>
            )}
            {report && (
                <div className={report.ok === report.tot ? ui.noteOk : ui.note} aria-live="polite">
                    <p className="font-semibold">
                        {report.ok === report.tot
                            ? `Tutti i ${report.tot} casi di prova superati.`
                            : `Casi di prova superati: ${report.ok} su ${report.tot}.`}
                    </p>
                    {report.fails.length > 0 && (
                        <ul className="mt-1 list-disc pl-5 font-mono text-sm">
                            {report.fails.map((f) => (
                                <li key={f}>{f}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            {program && (
                <MachineRunner
                    key={source}
                    program={program}
                    kind={m?.kind ?? "funzione"}
                    oracle={m?.oracle}
                    samples={m?.samples ?? ["1011"]}
                    inputHint={m?.inputHint ?? "una stringa di simboli"}
                />
            )}
        </div>
    );
}

const EMPTY = "s ▷ -> s ▷ R";
