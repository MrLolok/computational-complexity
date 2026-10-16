"use client";

import type { TraceAnswer, TraceRef } from "@/data/traces/traces";
import type { Choice } from "@/lib/answer";
import type { ReactNode } from "react";

import { useState } from "react";
import Link from "next/link";

import { CHOICES } from "@/lib/answer";
import { texHtml } from "@/lib/tex";
import { ui } from "@/lib/tokens";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { answerTraceQuestion, completeTrace, restartTrace, setTraceQ8Done } from "@/store/progressSlice";

export type RunnerQuestion = {
    n: number;
    label?: string;
    answer: TraceAnswer;
    repeatOf: string | null;
    seeAlso: TraceRef[];
    /** teoremi della pagina /teoremi usati nella risposta (vuoto se nessuno) */
    theorems: { id: string; nome: string }[];
    /** testo e spiegazione già resi dal server (Markdown + KaTeX) */
    text: ReactNode;
    explanation: ReactNode;
    answerNode: ReactNode;
};
export type RunnerQ8 = { title: ReactNode; body: ReactNode; practice: ReactNode };

type Mode = "end" | "now";

export default function TraceRunner({
    code,
    questions,
    q8,
}: {
    code: string;
    questions: RunnerQuestion[];
    q8: RunnerQ8 | null;
}) {
    const dispatch = useAppDispatch();
    const p = useAppSelector((s) => s.progress.traces[code]);
    const [mode, setMode] = useState<Mode>("now");
    const [confirming, setConfirming] = useState(false);

    const answers = p?.answers ?? {};
    const done = Boolean(p?.completedAt);
    const answered = questions.filter((q) => answers[q.n]).length;
    const ok = questions.filter((q) => answers[q.n]?.correct).length;
    const missing = questions.length - answered;

    const choose = (q: RunnerQuestion, choice: Choice) => {
        if (done || (mode === "now" && answers[q.n])) return;
        dispatch(answerTraceQuestion({ code, n: q.n, choice, correct: choice === q.answer }));
    };
    const deliver = () => {
        if (missing > 0 && !confirming) return setConfirming(true);
        setConfirming(false);
        dispatch(completeTrace({ code, ok, tot: questions.length }));
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="bg-bg/95 sticky top-[calc(env(safe-area-inset-top,0px)+var(--spacing)*12)] z-10 -mx-1 flex flex-wrap items-center gap-x-4 gap-y-2 px-1 py-2 backdrop-blur">
                <div className="flex min-w-40 flex-1 items-center gap-3">
                    <div
                        className="bg-sunk h-1.5 flex-1 overflow-hidden rounded-full"
                        role="progressbar"
                        aria-label="Domande risposte"
                        aria-valuemin={0}
                        aria-valuemax={questions.length}
                        aria-valuenow={answered}
                    >
                        <div
                            className="bg-accent h-full rounded-full transition-[width]"
                            style={{ width: `${(100 * answered) / questions.length}%` }}
                        />
                    </div>
                    <span className="font-ui text-muted text-sm whitespace-nowrap">
                        {answered}/{questions.length}
                    </span>
                </div>
                {!done && (
                    <div
                        role="group"
                        aria-label="Quando correggere"
                        className="border-line font-ui flex gap-1 rounded-lg border p-0.5 text-xs"
                    >
                        {(
                            [
                                ["end", "Correggi alla consegna"],
                                ["now", "Correggi subito"],
                            ] as [Mode, string][]
                        ).map(([m, label]) => (
                            <button
                                key={m}
                                type="button"
                                aria-pressed={mode === m}
                                onClick={() => setMode(m)}
                                className={`min-h-11 cursor-pointer rounded-md px-3 py-2 ${mode === m ? "bg-accent-soft text-accent" : "text-muted hover:text-ink"}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {done && p && (
                <div className="border-ok/40 bg-ok-soft flex flex-wrap items-center gap-4 rounded-xl border px-4 py-3">
                    <p className="font-head text-2xl font-semibold">
                        {ok} giuste su {questions.length}
                    </p>
                    <p className="font-ui text-muted text-sm">
                        Miglior risultato {p.best ? `${p.best.ok}/${p.best.tot}` : "—"} · svolta {p.runs}{" "}
                        {p.runs === 1 ? "volta" : "volte"}
                    </p>
                    <button type="button" className={`${ui.btn} ml-auto`} onClick={() => dispatch(restartTrace(code))}>
                        Rifai la traccia
                    </button>
                </div>
            )}

            <ol className="flex flex-col gap-4">
                {questions.map((q) => {
                    const a = answers[q.n];
                    const reveal = done || (mode === "now" && Boolean(a));
                    return (
                        <li key={q.n} id={`d${q.n}`} className={`${ui.card} scroll-mt-44 sm:scroll-mt-32`}>
                            <div className="flex items-baseline gap-3">
                                <span className="font-head text-accent text-2xl font-semibold">{q.label ?? q.n}</span>
                                <div className="min-w-0 flex-1 text-lg">{q.text}</div>
                            </div>
                            <div
                                role="group"
                                aria-label={`Risposta alla domanda ${q.label ?? q.n}`}
                                className="flex flex-wrap gap-2 sm:pl-8"
                            >
                                {CHOICES.map(([c, label]) => {
                                    const picked = a?.choice === c;
                                    const right = reveal && q.answer === c;
                                    const wrong = reveal && picked && q.answer !== c;
                                    return (
                                        <button
                                            key={c}
                                            type="button"
                                            aria-pressed={picked}
                                            disabled={done || (mode === "now" && Boolean(a))}
                                            onClick={() => choose(q, c)}
                                            className={`font-ui min-h-11 min-w-16 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-default ${
                                                right
                                                    ? "border-ok bg-ok-soft text-ok"
                                                    : wrong
                                                      ? "border-proved bg-proved-soft text-proved line-through"
                                                      : picked
                                                        ? "border-accent bg-accent text-accent-ink"
                                                        : "border-line-strong text-ink enabled:hover:border-accent enabled:hover:text-accent cursor-pointer"
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                                {reveal && a && (
                                    <span
                                        className={`font-ui self-center text-sm ${a.correct ? "text-ok" : "text-proved"}`}
                                    >
                                        {a.correct ? "✓ Corretta" : "Da rivedere"}
                                    </span>
                                )}
                                {done && !a && (
                                    <span className="font-ui text-muted self-center text-sm">Senza risposta</span>
                                )}
                            </div>
                            {reveal && (
                                <div className="border-line flex flex-col gap-4 border-t pt-4 sm:pl-8">
                                    <div className="bg-accent-soft/50 font-ui text-accent inline-flex w-fit max-w-full flex-wrap items-baseline gap-x-2 gap-y-1 rounded-lg px-3 py-2 text-sm font-semibold">
                                        <span>Risposta:</span>
                                        <div className="min-w-0 [&_p]:inline [&>div]:inline">{q.answerNode}</div>
                                    </div>
                                    <div className="max-w-prose text-base leading-relaxed">{q.explanation}</div>
                                    {(q.seeAlso.length > 0 || q.repeatOf || q.theorems.length > 0) && (
                                        <div className="border-line font-ui text-muted flex flex-col gap-1 border-t pt-3 text-sm">
                                            {(q.seeAlso.length > 0 || q.repeatOf) && (
                                                <p>
                                                    Vedi anche:{" "}
                                                    {q.seeAlso.map((r, i) => (
                                                        <span key={`${r.code}-${r.n}`}>
                                                            {i > 0 && " · "}
                                                            <Link
                                                                className="text-accent underline underline-offset-2"
                                                                href={`/tracce/${r.code}#d${r.n}`}
                                                            >
                                                                {r.code}, domanda {r.n}
                                                            </Link>
                                                        </span>
                                                    ))}
                                                    {q.repeatOf && !q.seeAlso.some((r) => r.code === q.repeatOf) && (
                                                        <>
                                                            <span>{q.seeAlso.length > 0 ? " · " : ""}</span>
                                                            <Link
                                                                className="text-accent underline underline-offset-2"
                                                                href={`/tracce/${q.repeatOf}`}
                                                            >
                                                                {q.repeatOf}
                                                            </Link>
                                                        </>
                                                    )}
                                                </p>
                                            )}
                                            {q.theorems.length > 0 && (
                                                <p>
                                                    Riferimenti:{" "}
                                                    {q.theorems.map((t, i) => (
                                                        <span key={t.id}>
                                                            {i > 0 && " · "}
                                                            <Link
                                                                className="text-accent underline underline-offset-2"
                                                                href={`/teoremi#teorema-${t.id}`}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: texHtml(t.nome, false),
                                                                }}
                                                            />
                                                        </span>
                                                    ))}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ol>

            {!done && (
                <div className="flex flex-wrap items-center gap-3">
                    <button type="button" className={ui.btnPrimary} onClick={deliver}>
                        {confirming ? `Consegna comunque (${missing} senza risposta)` : "Consegna"}
                    </button>
                    {confirming ? (
                        <button type="button" className={ui.linkBtn} onClick={() => setConfirming(false)}>
                            Torna alle domande
                        </button>
                    ) : (
                        missing > 0 && <span className={ui.hint}>Mancano {missing} risposte.</span>
                    )}
                </div>
            )}

            {q8 && (
                <Q8 code={code} q8={q8} done={Boolean(p?.q8Done)} num={questions.some((q) => q.label) ? "MdT" : "8"} />
            )}
        </div>
    );
}

function Q8({ code, q8, done, num }: { code: string; q8: RunnerQ8; done: boolean; num: string }) {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<"prova" | "soluzione" | null>(null);
    const toggle = (v: "prova" | "soluzione") => setOpen((o) => (o === v ? null : v));
    return (
        <section id="d8" className={`${ui.card} scroll-mt-44 sm:scroll-mt-32`}>
            <div className="flex items-baseline gap-3">
                <span className="font-head text-accent text-2xl font-semibold">{num}</span>
                <div className="min-w-0 flex-1">
                    <span className={ui.eyebrow}>Macchina di Turing</span>
                    <div className="text-lg">{q8.title}</div>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:pl-8">
                <button
                    type="button"
                    className={open === "prova" ? ui.btnPrimary : ui.btn}
                    aria-expanded={open === "prova"}
                    onClick={() => toggle("prova")}
                >
                    Provala tu
                </button>
                <button
                    type="button"
                    className={open === "soluzione" ? ui.btnPrimary : ui.btn}
                    aria-expanded={open === "soluzione"}
                    onClick={() => toggle("soluzione")}
                >
                    {open === "soluzione" ? "Nascondi la soluzione" : "Mostra la soluzione"}
                </button>
                <label className="font-ui flex cursor-pointer items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        className="size-4 accent-(--color-accent)"
                        checked={done}
                        onChange={(e) => dispatch(setTraceQ8Done({ code, done: e.target.checked }))}
                    />
                    L&apos;ho svolta
                </label>
                <Link href="/mdt" className={ui.linkBtn}>
                    Il metodo, passo per passo
                </Link>
            </div>
            {open === "prova" && <div className="border-line min-w-0 border-t pt-3 sm:pl-8">{q8.practice}</div>}
            {open === "soluzione" && <div className="border-line min-w-0 border-t pt-3 sm:pl-8">{q8.body}</div>}
        </section>
    );
}
