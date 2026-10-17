import type { LessonGroup } from "@/data/probabilistic-quantum/lesson";

import Link from "next/link";

import Arrow from "@/components/Arrow";
import Markdown from "@/components/Markdown";
import OpenOnHash from "@/components/OpenOnHash";
import { LESSON } from "@/data/probabilistic-quantum/lesson";
import { TRACES } from "@/data/traces/traces";
import { ui } from "@/lib/tokens";
import LessonFigure from "./LessonFigure";

const PARTS = [
    ["idea", "In breve"],
    ["esempio", "Esempio"],
    ["formale", "Definizione e formule"],
] as const;

/** Spiegazione semplificata: un riquadro per concetto, con idea, esempio e versione formale. */
export function LessonTopics({ groups }: { groups: LessonGroup[] }) {
    return (
        <div className="flex min-w-0 flex-col gap-7 [&_p]:max-w-none!">
            <OpenOnHash />
            {groups.map((g) => (
                <section key={g.id} className="flex flex-col gap-2">
                    <h3 className={`${ui.h3} mb-1`}>{g.title}</h3>
                    {g.topics.map((t) => (
                        <details
                            key={t.id}
                            id={t.id}
                            name="lezione-6"
                            className="group border-line bg-surface open:border-line-strong scroll-mt-20 rounded-xl border"
                        >
                            <summary className="flex min-h-11 cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 [&::-webkit-details-marker]:hidden">
                                <Arrow
                                    shape="chevron"
                                    className="text-muted transition-transform group-open:rotate-90"
                                />
                                <span className={`min-w-0 flex-1 font-semibold ${t.notAsked ? "text-muted" : ""}`}>
                                    {t.title}
                                </span>
                                {t.notAsked && <span className={ui.pill}>non chiesto all&apos;esame</span>}
                            </summary>
                            <div className="border-line flex min-w-0 flex-col gap-5 border-t px-4 pt-4 pb-5 leading-relaxed">
                                {PARTS.map(([key, label]) =>
                                    t[key] ? (
                                        <div key={key} className="flex min-w-0 flex-col gap-1.5">
                                            <p className={ui.label}>{label}</p>
                                            <Markdown>{t[key]}</Markdown>
                                            {key === "esempio" && t.id === "voto" && (
                                                <LessonFigure kind="maggioranza" sizes="(width < 80rem) 90vw, 1200px" />
                                            )}
                                            {key === "esempio" && t.id === "ampiezze" && (
                                                <LessonFigure
                                                    kind="interferenza"
                                                    sizes="(width < 80rem) 90vw, 1200px"
                                                />
                                            )}
                                        </div>
                                    ) : null,
                                )}
                                <p className="text-muted text-xs">Nelle slide: «{t.ref}»</p>
                            </div>
                        </details>
                    ))}
                </section>
            ))}
        </div>
    );
}

/** Domande guida sugli argomenti delle slide. */
export function LessonQuestions({ only }: { only?: number[] }) {
    const qs = LESSON.questions.filter((_, i) => !only || only.includes(i));
    return (
        <dl className="grid gap-3 sm:grid-cols-2">
            {qs.map((q) => (
                <div key={q.q} className="border-line flex flex-col gap-1.5 rounded-xl border p-4">
                    <dt className="font-semibold">{q.q}</dt>
                    <dd className="text-muted text-base">
                        <Markdown>{q.a}</Markdown>
                    </dd>
                </div>
            ))}
        </dl>
    );
}

export function LessonExercises({ only }: { only: number[] }) {
    return (
        <div className="flex flex-col gap-2 [&_p]:max-w-none!">
            {only
                .map((i) => LESSON.exercises[i])
                .map((e) => (
                    <details key={e.q} name="lezione-6" className="group border-line rounded-xl border">
                        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 px-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                            <Arrow shape="chevron" className="text-muted transition-transform group-open:rotate-90" />
                            <Markdown className="min-w-0 flex-1">{e.q}</Markdown>
                        </summary>
                        <div className="border-line border-t px-4 pt-3 pb-4">
                            <Markdown>{e.a}</Markdown>
                        </div>
                    </details>
                ))}
        </div>
    );
}

/** Collegamenti con l'esame: i punti scelti e le domande delle tracce che li usano. */
export function LessonExam({ bullets, test }: { bullets: number[]; test: RegExp }) {
    const questions = TRACES.flatMap((trace) =>
        trace.questions.filter((q) => test.test(q.text)).map((q) => ({ code: trace.code, n: q.n, label: q.label })),
    );
    return (
        <section className="border-line flex flex-col gap-3 border-t pt-6">
            <h3 className={ui.h3}>Collegamenti con l&apos;esame</h3>
            <Markdown>{LESSON.exam.intro}</Markdown>
            <Markdown>{bullets.map((i) => `- ${LESSON.exam.bullets[i]}`).join("\n")}</Markdown>
            {questions.length > 0 && (
                <details name="lezione-6" className="border-line rounded-lg border p-4 text-sm">
                    <summary className="text-accent cursor-pointer">
                        Prova nelle tracce · {questions.length} domande
                    </summary>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                        {questions.map((q) => (
                            <Link
                                key={`${q.code}-${q.n}-${q.label ?? ""}`}
                                href={`/tracce/${q.code}#d${q.n}`}
                                className="text-muted underline underline-offset-4"
                            >
                                {q.code}, domanda {q.label ?? q.n}
                            </Link>
                        ))}
                    </div>
                </details>
            )}
        </section>
    );
}

export function LessonSource() {
    return (
        <p className="text-muted text-xs">
            Fonte: slide Lez. 6 · Algoritmi probabilistici e calcolo quantistico (P. A. Bonatti). La dispensa non ha un
            capitolo dedicato.
        </p>
    );
}
