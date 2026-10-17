"use client";

import type { Choice } from "@/lib/answer";

import { useState } from "react";
import Link from "next/link";

import Arrow from "@/components/Arrow";
import ClassChip from "@/components/ClassChip";
import RichHtml from "@/components/RichHtml";
import { IDS, PLAIN } from "@/data/classes/classes";
import { EXAM_QUESTIONS } from "@/data/classes/examQuestions";
import { CHOICES, toChoice } from "@/lib/answer";
import { ui } from "@/lib/tokens";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { answerExamQuestion, resetExamQuiz } from "@/store/progressSlice";

const ALL = EXAM_QUESTIONS.map((q) => ({ q, i: q.id }));
const REPEATED = EXAM_QUESTIONS.filter((q) => q.refs.length > 1).length;
const FILTERS = IDS.filter((id) => EXAM_QUESTIONS.some((t) => t.c.includes(id)));

const optBase =
    "min-h-11 cursor-pointer rounded-lg border px-3 py-2 font-ui text-sm font-medium disabled:cursor-default";
const optIdle = "border-line-strong bg-transparent text-ink enabled:hover:border-accent";
const optRight = "border-ok bg-ok-soft text-ok";
const optWrong = "border-proved bg-proved-soft text-proved";

/** le domande vere delle tracce, filtrate per classe; le risposte restano nel progresso */
export default function ExamQuiz() {
    const dispatch = useAppDispatch();
    const answers = useAppSelector((s) => s.progress.examQuiz);
    const [filter, setFilter] = useState("all");
    const [qi, setQi] = useState(0);

    const list = ALL.filter(({ q }) => filter === "all" || q.c.includes(filter as (typeof IDS)[number]));
    const answered = list.filter(({ i }) => answers[i]);
    const ok = answered.filter(({ i }) => answers[i].correct).length;
    const cur = list[Math.min(qi, list.length - 1)];
    const last = qi >= list.length - 1;

    const choose = (choice: Choice) => {
        if (!cur || answers[cur.i]) return;
        dispatch(answerExamQuestion({ id: cur.i, choice, correct: choice === toChoice(cur.q.a) }));
    };
    const next = () => {
        if (last) {
            dispatch(resetExamQuiz(list.map(({ i }) => i)));
            setQi(0);
        } else setQi(qi + 1);
    };

    const rec = cur ? answers[cur.i] : undefined;
    const k = cur ? toChoice(cur.q.a) : "ALTRO";

    return (
        <div>
            <div className="mb-3.5 flex flex-wrap items-end justify-between gap-x-5 gap-y-2.5">
                <div className="flex flex-col gap-1">
                    <h2 className={ui.h2}>Le domande vere delle tracce</h2>
                    <p className={ui.hint}>
                        Tutte le domande SÌ / NO / altro delle tracce, ognuna una volta sola: {REPEATED} sono uscite in
                        più tracce, anche con una costante, un indice o la negazione cambiati, e qui trovi la prima
                        versione. Scegli SÌ, NO o altro, poi leggi il perché.
                    </p>
                    <Link href="/tracce" className={ui.linkBtn}>
                        Tutte le tracce d&apos;esame, una per una
                    </Link>
                </div>
                <label className="font-ui text-muted flex flex-col gap-1 text-base" htmlFor="quizFilter">
                    Classe
                    <select
                        id="quizFilter"
                        className={ui.select}
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setQi(0);
                        }}
                    >
                        <option value="all">Tutte ({EXAM_QUESTIONS.length})</option>
                        {FILTERS.map((id) => (
                            <option key={id} value={id}>
                                {PLAIN[id]} ({EXAM_QUESTIONS.filter((t) => t.c.includes(id)).length})
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className={`${ui.card} max-w-4xl`}>
                {!cur ? (
                    <p>Nessuna domanda per questa classe.</p>
                ) : (
                    <>
                        <div className="text-muted font-mono text-sm tabular-nums">
                            Domanda {qi + 1} di {list.length} · giuste {ok} su {answered.length}
                        </div>
                        <RichHtml className="font-head text-2xl leading-snug font-medium" html={cur.q.q} />
                        <p className={ui.hint}>
                            {cur.q.refs.length > 1 ? "Uscita nelle tracce " : "Uscita nella traccia "}
                            {cur.q.refs.map((r, j) => (
                                <span key={`${r.code}-${r.n}`}>
                                    {j > 0 && " · "}
                                    <Link className="text-accent underline" href={`/tracce/${r.code}#d${r.n}`}>
                                        {r.code}, domanda {r.label ?? r.n}
                                    </Link>
                                </span>
                            ))}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {CHOICES.map(([kk, l]) => {
                                const cls = !rec
                                    ? optIdle
                                    : kk === k
                                      ? optRight
                                      : kk === rec.choice
                                        ? optWrong
                                        : optIdle;
                                return (
                                    <button
                                        key={kk}
                                        type="button"
                                        disabled={!!rec}
                                        onClick={() => choose(kk)}
                                        className={`${optBase} ${cls}`}
                                    >
                                        {l}
                                    </button>
                                );
                            })}
                        </div>
                        {rec && (
                            <div className="border-line flex flex-col items-start gap-4 border-t pt-4">
                                <RichHtml
                                    className="bg-accent-soft/50 text-accent w-fit max-w-full rounded-lg px-3 py-2 text-sm font-medium"
                                    html={`<span>Risposta:</span> ${cur.q.a}`}
                                />
                                <RichHtml
                                    className="flex max-w-prose flex-col gap-2 leading-relaxed [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5"
                                    html={cur.q.e}
                                />
                                {cur.q.c.length > 0 && (
                                    <p className={`${ui.hint} mt-2`}>
                                        Classi coinvolte:{" "}
                                        {cur.q.c.map((c, j) => (
                                            <span key={c}>
                                                {j > 0 && " "}
                                                <ClassChip id={c} />
                                            </span>
                                        ))}
                                    </p>
                                )}
                            </div>
                        )}
                        <div className="mt-3.5 flex justify-between gap-2">
                            <button
                                className={ui.btn}
                                type="button"
                                disabled={qi === 0}
                                onClick={() => setQi(Math.max(0, qi - 1))}
                            >
                                <Arrow shape="left" /> Precedente
                            </button>
                            <button className={ui.btnPrimary} type="button" onClick={next}>
                                {last ? (
                                    "Ricomincia"
                                ) : (
                                    <>
                                        Prossima <Arrow />
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
