"use client";

import type { QuizMode, QuizQuestion } from "./quiz";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AnswerTag from "@/components/AnswerTag";
import MathHtml from "@/components/MathHtml";
import RichHtml from "@/components/RichHtml";
import SourceBadge from "@/components/SourceBadge";
import { PROBLEM_BY } from "@/data/problems/problems";
import { colorId, trapAnswer } from "@/features/problems/problems";
import { toChoice } from "@/lib/answer";
import { classColor, ui } from "@/lib/tokens";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { recordProblemQuiz, resetProblemQuiz } from "@/store/progressSlice";
import { newQuestion, QUIZ_MODES } from "./quiz";

const opt =
    "min-h-11 cursor-pointer rounded-lg border px-3 py-2 text-left font-ui text-sm font-semibold disabled:cursor-default";

function QuestionText({ q }: { q: QuizQuestion }) {
    const p = PROBLEM_BY[q.pid];
    if (q.type === "exam")
        return (
            <>
                <RichHtml as="span" html={q.trap.q || ""} /> <span className={ui.code}>{q.trap.c}</span>
            </>
        );
    if (q.type === "cpl")
        return (
            <>
                Com&apos;è classificato il complemento di <MathHtml as="strong" className="font-bold" html={p.name} />?
            </>
        );
    return (
        <>
            <MathHtml as="strong" className="font-bold" html={p.name} />: in quale classe sta, ed è completo?
            <RichHtml as="span" className="font-body text-muted mt-1.5 block text-base font-normal" html={p.def} />
        </>
    );
}

function Explanation({ q }: { q: QuizQuestion }) {
    const p = PROBLEM_BY[q.pid];
    if (q.type === "exam")
        return (
            <span>
                <AnswerTag k={toChoice(q.trap.a)}>{trapAnswer(q.trap)}</AnswerTag>
                <RichHtml as="span" html={q.trap.e || ""} />
            </span>
        );
    if (q.type === "cpl") {
        const cp = p.cpl ? PROBLEM_BY[p.cpl] : null;
        return <RichHtml as="span" html={`${p.name} è ${p.lab}; ${q.name} è ${q.right}. ${cp ? cp.why : p.compl}`} />;
    }
    return (
        <span>
            <RichHtml as="span" html={p.brief} />
            {p.ext && (
                <>
                    {" "}
                    <SourceBadge kind="x">✱ completezza fuori dalle fonti</SourceBadge>
                </>
            )}
        </span>
    );
}

export default function ProblemQuiz() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const score = useAppSelector((s) => s.progress.problemQuiz);
    const [mode, setMode] = useState<QuizMode>("mix");
    const [q, setQ] = useState<QuizQuestion | null>(null);
    const [pick, setPick] = useState<number | null>(null);

    const ask = (m: QuizMode) => {
        setQ(newQuestion(m));
        setPick(null);
    };
    /* la prima domanda è casuale: si sceglie solo nel browser */
    useEffect(() => {
        const r = requestAnimationFrame(() => ask("mix"));
        return () => cancelAnimationFrame(r);
    }, []);

    const choose = (i: number) => {
        if (!q || pick !== null) return;
        setPick(i);
        dispatch(recordProblemQuiz({ correct: q.opts[i] === q.right }));
    };
    const ok = q && pick !== null ? q.opts[pick] === q.right : false;

    return (
        <div className="flex max-w-4xl flex-col gap-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-ui text-muted text-base">Tipo di domanda</span>
                <div className="flex flex-wrap gap-1.5">
                    {QUIZ_MODES.map(([k, t]) => (
                        <button
                            key={k}
                            type="button"
                            aria-pressed={k === mode}
                            onClick={() => {
                                setMode(k);
                                ask(k);
                            }}
                            className={`font-ui text-ink inline-flex min-h-11 cursor-pointer items-center rounded-full border px-3 py-2 text-sm ${k === mode ? "border-accent bg-accent/14 font-semibold" : "border-line"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>
            <div
                style={q ? classColor(colorId(PROBLEM_BY[q.pid])) : undefined}
                className={`${ui.card} border-t-2 ${q ? "border-t-(--c)" : "border-t-accent"}`}
            >
                {q && (
                    <>
                        <div className="font-head text-2xl leading-snug font-medium">
                            <QuestionText q={q} />
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {q.opts.map((o, i) => {
                                const state =
                                    pick === null
                                        ? ""
                                        : o === q.right
                                          ? "border-ok bg-ok-soft text-ok"
                                          : i === pick
                                            ? "border-proved bg-proved-soft text-proved"
                                            : "";
                                return (
                                    <button
                                        key={o}
                                        type="button"
                                        disabled={pick !== null}
                                        onClick={() => choose(i)}
                                        className={`${opt} ${state || "border-line-strong text-ink enabled:hover:border-accent bg-transparent"}`}
                                    >
                                        {q.type === "exam" && o === "altro" ? (
                                            "altro (solo se…)"
                                        ) : (
                                            <MathHtml html={o} />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        {pick !== null && (
                            <div className="flex flex-col gap-1.5 text-base">
                                <span className={`font-ui font-bold ${ok ? "text-ok" : "text-proved"}`}>
                                    {ok ? "Giusto." : "Non è così."}
                                </span>
                                <Explanation q={q} />
                            </div>
                        )}
                    </>
                )}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <button className={ui.btnPrimary} type="button" onClick={() => ask(mode)}>
                        Prossima
                    </button>
                    <button
                        className={ui.linkBtn}
                        type="button"
                        disabled={!q}
                        onClick={() => q && router.push(`/problemi/${q.pid}`)}
                    >
                        Apri la scheda
                    </button>
                    <span className="text-muted ml-auto font-mono text-sm tabular-nums">
                        {score.ok} / {score.tot} giuste
                    </span>
                    <button
                        className={ui.linkBtn}
                        type="button"
                        disabled={!score.tot}
                        onClick={() => dispatch(resetProblemQuiz())}
                    >
                        Azzera
                    </button>
                </div>
            </div>
        </div>
    );
}
