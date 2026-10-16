"use client";

import type { Config, Program, Rule } from "./machine";

import { useEffect, useRef, useState } from "react";

import Arrow from "@/components/Arrow";
import { ui } from "@/lib/tokens";
import { applicable, apply, ask, BLANK, content, halted, initial, ORACLES, QUERY, run } from "./machine";

const ARROW = { "1": "→", "-1": "←", "0": "−" } as const;
/** una riga del programma nella notazione δ(p, σ) = (q, ρ, D) */
export function ruleText(r: Rule) {
    const right = r.write.flatMap((w, t) => [w, ARROW[String(r.move[t]) as keyof typeof ARROW]]);
    return `δ(${[r.from, ...r.read].join(", ")}) = (${[r.to, ...right].join(", ")})`;
}

type Props = {
    program: Program;
    kind: "funzione" | "decisione";
    oracle?: "SAT" | "CLIQUE";
    samples: string[];
    inputHint: string;
    /** le righe del programma sono quelle di una tabella numerata: mostra il numero di riga */
    numbered?: boolean;
};

/** Esegue una macchina passo per passo: nastri, stato, riga usata, scelte nondeterministiche e oracolo. */
export default function MachineRunner({ program, kind, oracle, samples, inputHint, numbered }: Props) {
    const orc = oracle ? ORACLES[oracle] : undefined;
    const [input, setInput] = useState(samples[0] ?? "");
    const [history, setHistory] = useState<{ config: Config; rule: Rule | null; note?: string }[]>(() => [
        { config: initial(program, samples[0] ?? ""), rule: null },
    ]);
    const [playing, setPlaying] = useState(false);
    const cur = history[history.length - 1];
    const c = cur.config;
    const end = halted(program, c, orc);
    const options = end || c.state === QUERY ? [] : applicable(program, c);
    const choice = options.length > 1;
    /* prima del passo la transizione che sta per scattare; a macchina ferma quella che l'ha fermata */
    const shown = end ? cur.rule : options.length === 1 ? options[0] : null;

    const restart = (value = input) => {
        setPlaying(false);
        setHistory([{ config: initial(program, value), rule: null }]);
    };
    const step = (rule?: Rule) => {
        if (end) return false;
        if (c.state === QUERY && orc) {
            const next = ask(c, orc);
            const q = content(c.tapes[c.tapes.length - 1]);
            setHistory((h) => [
                ...h,
                {
                    config: next,
                    rule: null,
                    note: `L'oracolo ${orc.name} risponde ${next.state === "qYES" ? "sì" : "no"} su «${q}»`,
                },
            ]);
            return true;
        }
        const r = rule ?? (options.length === 1 ? options[0] : null);
        if (!r) return false;
        setHistory((h) => [...h, { config: apply(r, c), rule: r }]);
        return true;
    };
    const findAccepting = () => {
        setPlaying(false);
        const o = run(program, input, { oracle: orc });
        if (!o.path.length) return;
        setHistory(
            o.path.map((s, i) => ({
                config: s.config,
                rule: s.rule,
                note: i && !s.rule ? `L'oracolo risponde ${s.config.state === "qYES" ? "sì" : "no"}` : undefined,
            })),
        );
    };

    useEffect(() => {
        if (!playing) return;
        if (end || choice) {
            const t = setTimeout(() => setPlaying(false), 0);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => step(), 900);
        return () => clearTimeout(t);
    });

    const output = content(c.tapes[c.tapes.length - 1]);
    return (
        <div className="border-line bg-surface flex min-w-0 flex-col gap-4 rounded-xl border p-4">
            <form
                className="flex flex-wrap items-end gap-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    restart();
                }}
            >
                <label className="font-ui text-muted flex min-w-0 flex-1 basis-56 flex-col gap-1 text-sm">
                    Input ({inputHint})
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        spellCheck={false}
                        autoCapitalize="off"
                        autoComplete="off"
                        className="border-line-strong bg-bg text-ink focus:border-accent min-h-11 rounded-lg border px-3 font-mono outline-none"
                    />
                </label>
                <button type="submit" className={ui.btn}>
                    Carica input
                </button>
            </form>
            <div className="flex flex-wrap gap-2">
                {samples.map((s) => (
                    <button
                        key={s}
                        type="button"
                        className={`${ui.pill} hover:text-accent cursor-pointer font-mono`}
                        onClick={() => {
                            setInput(s);
                            restart(s);
                        }}
                    >
                        {s || "Stringa vuota"}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-2">
                {c.tapes.map((tape, t) => (
                    <Tape
                        key={t}
                        tape={tape}
                        head={c.heads[t]}
                        label={
                            c.tapes.length > 1
                                ? `Nastro ${t + 1}${oracle && t === c.tapes.length - 1 ? " (query)" : ""}`
                                : "Nastro"
                        }
                    />
                ))}
            </div>

            <div className="font-ui flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" aria-live="polite">
                <span>
                    Stato <b className="text-accent font-mono">{c.state}</b>
                </span>
                <span className="text-muted">Passo {c.steps}</span>
                {end && (
                    <span className={end.result === "no" ? ui.pillProved : ui.pillOk}>
                        {end.result === "yes"
                            ? "yes: accetta"
                            : end.result === "no"
                              ? "no: rigetta"
                              : `h: risultato ${output || "(nastro vuoto)"}`}
                    </span>
                )}
            </div>
            {(shown || cur.note || end?.reason) && (
                <p className="text-muted font-mono text-sm">
                    {cur.note && <span className="font-ui block">{cur.note}</span>}
                    {shown && (
                        <>
                            <span className="font-ui">
                                {end ? "Ultima transizione" : "Prossima transizione"}
                                {numbered && ` (riga ${shown.line})`}:{" "}
                            </span>
                            <span className="text-ink">{ruleText(shown)}</span>
                            {shown.note && <span className="font-ui"> · {shown.note}</span>}
                        </>
                    )}
                    {end?.reason && <span className="font-ui block">{end.reason}</span>}
                </p>
            )}
            {end?.result === "h" && kind === "decisione" && (
                <p className={ui.noteTrap}>Una macchina di decisione deve terminare in yes o in no, non in h.</p>
            )}

            {choice && (
                <div className="border-open/50 flex flex-col gap-2 rounded-lg border p-3">
                    <p className="font-ui text-open text-sm">
                        Ci sono più transizioni possibili. Scegli il ramo da seguire.
                    </p>
                    {options.map((r, i) => (
                        <button
                            key={r.line}
                            type="button"
                            className={`${ui.btn} justify-start text-left font-mono`}
                            onClick={() => step(r)}
                        >
                            {i + 1}. {ruleText(r)}
                            {r.note && <span className="font-ui text-muted ml-2">{r.note}</span>}
                        </button>
                    ))}
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                <button type="button" className={ui.btn} onClick={() => restart()} disabled={history.length === 1}>
                    ⟲ Riparti dall&apos;input
                </button>
                <button
                    type="button"
                    className={ui.btn}
                    onClick={() => setHistory((h) => h.slice(0, -1))}
                    disabled={history.length === 1}
                >
                    <Arrow shape="left" /> Un passo indietro
                </button>
                <button
                    type="button"
                    className={ui.btnPrimary}
                    onClick={() => step()}
                    disabled={Boolean(end) || choice}
                >
                    {c.state === QUERY ? (
                        "Chiedi all'oracolo"
                    ) : (
                        <>
                            Un passo <Arrow />
                        </>
                    )}
                </button>
                <button
                    type="button"
                    className={ui.btn}
                    onClick={() => setPlaying((p) => !p)}
                    disabled={Boolean(end) || choice}
                >
                    {playing ? "⏸ Pausa" : "▶ Esegui"}
                </button>
                {(program.rules.some((r, i) =>
                    program.rules.some((q, j) => j !== i && q.from === r.from && q.read.join() === r.read.join()),
                ) ||
                    choice) && (
                    <button type="button" className={ui.btn} onClick={findAccepting}>
                        Trova un ramo che accetta
                    </button>
                )}
            </div>
        </div>
    );
}

function Tape({ tape, head, label }: { tape: string[]; head: number; label: string }) {
    const box = useRef<HTMLDivElement>(null);
    const cells = Math.max(tape.length + 2, head + 3, 8);
    useEffect(() => {
        const bx = box.current;
        const el = bx?.children[head] as HTMLElement | undefined;
        if (bx && el) bx.scrollLeft = Math.max(0, el.offsetLeft - bx.clientWidth / 2);
    }, [head]);
    return (
        <div className="flex min-w-0 flex-col gap-1">
            <span className={ui.label}>{label}</span>
            <div ref={box} className="relative flex overflow-x-auto pt-4 pb-1">
                {Array.from({ length: cells }, (_, i) => {
                    const s = tape[i] ?? BLANK;
                    const on = i === head;
                    return (
                        <span
                            key={i}
                            aria-current={on ? "true" : undefined}
                            className={`relative grid h-10 w-9 flex-none place-items-center border font-mono text-base ${on ? "border-accent bg-accent-soft text-ink z-10" : "border-line text-muted"} ${i ? "-ml-px" : ""}`}
                        >
                            {on && (
                                <span aria-hidden="true" className="text-accent absolute -top-4 text-xs">
                                    ▼
                                </span>
                            )}
                            {s === BLANK ? <span className="opacity-50">{s}</span> : s}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
