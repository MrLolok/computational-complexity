"use client";

import type { Problem, Trap } from "@/data/problems";
import type { TraceRef } from "@/data/traces";

import Link from "next/link";

import LearningSlideshow from "@/components/learning/LearningSlideshow";
import Rich from "@/components/Rich";
import { PROBLEM_BY, PROBLEMS } from "@/data/problems";
import walkthroughs from "@/data/problemWalkthroughs.json";
import { ansKey, classLabel, colorId, plain, REL, trapAnswer } from "@/lib/problems";
import { theoremsForProblem } from "@/lib/theorems";
import { classColor, ui } from "@/lib/ui";
import { codeCls, Html, YesNo } from "./bits";
import { texHtml } from "@/lib/tex";

function ProblemButton({ id, onGo }: { id: string; onGo: (id: string) => void }) {
    return (
        <button
            type="button"
            onClick={() => onGo(id)}
            data-term={`problem:${id}`}
            className="text-accent cursor-pointer underline underline-offset-4"
        >
            <Html html={PROBLEM_BY[id].name} />
        </button>
    );
}
function TrapItem({ t }: { t: Trap }) {
    return (
        <li className="border-line flex flex-col gap-2 border-l-2 pl-3 text-sm">
            {t.c && <span className={codeCls}>{t.c}</span>}
            {t.n ? (
                <Rich html={t.n} />
            ) : (
                <>
                    <Rich html={t.q || ""} />
                    <p>
                        <YesNo k={ansKey(t.a)}>{trapAnswer(t)}</YesNo>
                        <Rich as="span" html={t.e || ""} />
                    </p>
                </>
            )}
        </li>
    );
}
export default function ProblemDetail({
    p,
    onGo,
    traceRefs,
    previousId,
    nextId,
}: {
    p: Problem;
    onGo: (id: string) => void;
    traceRefs: TraceRef[];
    previousId?: string;
    nextId?: string;
}) {
    const index = PROBLEMS.findIndex((item) => item.id === p.id);
    const previous = previousId ? PROBLEM_BY[previousId] : undefined;
    const next = nextId ? PROBLEM_BY[nextId] : undefined;
    const clsName = classLabel(p);
    const related = (REL[p.id] || []).filter(([id]) => id !== p.cpl);
    const theorems = theoremsForProblem(p.id);
    const disclosure =
        "rounded-lg border border-line px-4 py-3 text-sm [&>summary]:cursor-pointer [&>summary]:font-semibold";
    return (
        <div style={classColor(colorId(p))} className="flex min-w-0 flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className={ui.eyebrow}>
                    Problema {index + 1} di {PROBLEMS.length}
                </p>
                <nav aria-label="Navigazione tra problemi" className="flex gap-2">
                    <button
                        type="button"
                        className={ui.btn}
                        disabled={!previous}
                        onClick={() => previous && onGo(previous.id)}
                    >
                        ← Precedente
                    </button>
                    <button
                        type="button"
                        className={ui.btnPrimary}
                        disabled={!next}
                        onClick={() => next && onGo(next.id)}
                    >
                        Prossimo →
                    </button>
                </nav>
            </div>
            <header className="flex flex-col gap-3">
                <h2
                    className="font-head text-2xl sm:text-3xl leading-tight font-semibold"
                    dangerouslySetInnerHTML={{ __html: p.name }}
                />
                <Rich as="p" html={p.def} />
                <div className="flex flex-wrap gap-2">
                    <Link
                        href={`/classi/${p.c || p.b}`}
                        className={ui.pill}
                        dangerouslySetInnerHTML={{ __html: texHtml(clsName, false) }}
                    />
                    {p.full && (
                        <span className={ui.pillOk} dangerouslySetInnerHTML={{ __html: texHtml(`${clsName}-completo`) }} />
                    )}
                </div>
            </header>
            {traceRefs.length > 0 && (
                <details className={disclosure}>
                    <summary className="text-accent">Nelle tracce · {traceRefs.length} domande</summary>
                    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                        {traceRefs.map((r) => (
                            <Link
                                key={`${r.code}-${r.n}`}
                                href={`/tracce/${r.code}#d${r.n}`}
                                className="text-accent underline underline-offset-4"
                            >
                                {r.code}, domanda {r.n}
                            </Link>
                        ))}
                    </p>
                </details>
            )}
            <LearningSlideshow
                key={p.id}
                lesson={walkthroughs[p.id as keyof typeof walkthroughs]}
                name={plain(p.name)}
                title="Un esempio, passo dopo passo"
            />
            <Rich className="text-muted flex flex-col gap-3 leading-relaxed" html={/^\s*<(p|ul|ol|div)\b/.test(p.why) ? p.why : `<p>${p.why}</p>`} />
            <details className={disclosure}>
                <summary>Complemento e collegamenti</summary>
                <div className="mt-3 flex flex-col gap-3">
                    {p.cpl ? (
                        <p>
                            Complemento: <ProblemButton id={p.cpl} onGo={onGo} />
                        </p>
                    ) : (
                        <Rich html={p.compl || "Nessun complemento associato."} />
                    )}
                    {related.length > 0 && (
                        <ul className="flex flex-col gap-2">
                            {related.map(([id, text]) => (
                                <li key={id}>
                                    <ProblemButton id={id} onGo={onGo} />
                                    <Html className="text-muted ml-2" html={text} />
                                </li>
                            ))}
                        </ul>
                    )}
                    {theorems.length > 0 && (
                        <p className="flex flex-wrap gap-x-4 gap-y-2">
                            {theorems.map((t) => (
                                <Link
                                    key={t.id}
                                    href={`/teoremi#teorema-${t.id}`}
                                    className="text-accent underline underline-offset-4"
                                    dangerouslySetInnerHTML={{ __html: texHtml(t.nome, false) }}
                                />
                            ))}
                        </p>
                    )}
                </div>
            </details>
            {p.traps.length > 0 && (
                <details className={disclosure}>
                    <summary>Domande e trappole d&apos;esame</summary>
                    <ul className="mt-3 flex flex-col gap-4">
                        {p.traps.map((t, i) => (
                            <TrapItem key={i} t={t} />
                        ))}
                    </ul>
                </details>
            )}
            {next && (
                <button type="button" className={`${ui.btn} w-full`} onClick={() => onGo(next.id)}>
                    Prossimo: <span className="ml-1" dangerouslySetInnerHTML={{ __html: next.name }} /> →
                </button>
            )}
        </div>
    );
}
