"use client";

import { useMemo, useRef, useState } from "react";

import { MACHINE_BY, MACHINES } from "@/data/mdtMachines";
import { ORACLES, parseProgram, run } from "@/lib/tm";
import { ui } from "@/lib/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { saveMdtDraft } from "@/store/progressSlice";
import Runner from "./Runner";

/** La soluzione di una traccia, da eseguire passo per passo. */
export function SolutionLab({ id }: { id: string }) {
    const m = MACHINE_BY[id];
    const program = useMemo(() => parseProgram(m.source).program!, [m]);
    return (
        <div className="flex flex-col gap-3">
            <Runner program={program} kind={m.kind} oracle={m.oracle} samples={m.samples} inputHint={m.inputHint} />
            <details className="border-line rounded-lg border p-3 text-sm">
                <summary className="text-accent cursor-pointer">Il programma nel formato del simulatore</summary>
                <pre className="bg-sunk mt-3 overflow-x-auto rounded-lg p-3 font-mono text-sm leading-relaxed">
                    {m.source}
                </pre>
            </details>
        </div>
    );
}

const SYMBOLS = ["▷", "⊔", "->", "b", "b̄", "σ", "R", "L", "S", "yes", "no", "h"];

/** Scrivi la tua macchina, provala passo per passo e confrontala con i risultati attesi. */
export function PracticeLab({ id, draftKey }: { id?: string; draftKey: string }) {
    const dispatch = useAppDispatch();
    const saved = useAppSelector((s) => s.progress.mdtDrafts?.[draftKey]);
    const [preset, setPreset] = useState(id ?? "");
    const m = preset ? MACHINE_BY[preset] : undefined;
    const fallback = m?.skeleton ?? EMPTY;
    const source = saved ?? fallback;
    const area = useRef<HTMLTextAreaElement>(null);
    const { program, errors } = useMemo(() => parseProgram(source), [source]);
    const [report, setReport] = useState<{ ok: number; tot: number; fails: string[] } | null>(null);
    const set = (value: string | null) => {
        setReport(null);
        dispatch(saveMdtDraft({ key: draftKey, source: value }));
    };
    const insert = (text: string) => {
        const el = area.current;
        if (!el) return;
        const pad = /^[a-z>-]/i.test(text) ? ` ${text} ` : text;
        el.setRangeText(pad, el.selectionStart, el.selectionEnd, "end");
        set(el.value);
        el.focus();
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
                          ? "non si ferma"
                          : o.result;
                fails.push(`${x || "(vuota)"}: atteso ${want}, la tua macchina dà ${got}`);
            }
        }
        setReport({ ok, tot: tests.length, fails });
    };

    return (
        <div className="flex min-w-0 flex-col gap-3">
            {!id && (
                <label className="font-ui text-muted flex flex-col gap-1 text-sm">
                    Parti da
                    <select
                        className={ui.select}
                        value={preset}
                        onChange={(e) => {
                            setPreset(e.target.value);
                            setReport(null);
                            set(e.target.value ? MACHINE_BY[e.target.value].skeleton : null);
                        }}
                    >
                        <option value="">un programma vuoto</option>
                        {MACHINES.map((x) => (
                            <option key={x.id} value={x.id}>
                                {x.title}
                            </option>
                        ))}
                    </select>
                </label>
            )}
            <div className="flex flex-wrap gap-1.5" aria-label="Inserisci un simbolo">
                {SYMBOLS.map((s) => (
                    <button
                        key={s}
                        type="button"
                        className="border-line-strong hover:border-accent hover:text-accent min-h-9 min-w-9 rounded-md border px-2 font-mono text-sm"
                        onClick={() => insert(s)}
                    >
                        {s}
                    </button>
                ))}
            </div>
            <textarea
                ref={area}
                value={source}
                onChange={(e) => set(e.target.value)}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                rows={Math.min(18, Math.max(8, source.split("\n").length + 1))}
                aria-label="Il programma della macchina"
                className="border-line-strong bg-bg text-ink focus:border-accent w-full min-w-0 rounded-lg border p-3 font-mono text-base leading-relaxed outline-none"
            />
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
                        Verifica su tutti gli input di prova
                    </button>
                )}
                <button type="button" className={ui.btn} onClick={() => set(null)}>
                    Ricomincia
                </button>
                {m && (
                    <button type="button" className={ui.btn} onClick={() => set(m.source)}>
                        Carica la soluzione
                    </button>
                )}
            </div>
            {report && (
                <div className={report.ok === report.tot ? ui.noteOk : ui.note} aria-live="polite">
                    <p className="font-semibold">
                        {report.ok === report.tot
                            ? `Corretta su tutti i ${report.tot} input di prova.`
                            : `Corretta su ${report.ok} input di prova su ${report.tot}.`}
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
                <Runner
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

const EMPTY = `# Una riga: stato letto -> nuovo_stato scritto mossa   (mosse: R, L, S)
# Con due nastri: stato letto1 letto2 -> nuovo_stato scritto1 mossa1 scritto2 mossa2
# Jolly: b = un bit qualsiasi, b̄ = il bit opposto, σ = un simbolo qualsiasi
s ▷ -> s ▷ R
`;
