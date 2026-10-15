import type { Lez6Group } from "@/data/lezione6";

import Link from "next/link";

import Markdown from "@/components/Markdown";
import { LEZ6 } from "@/data/lezione6";
import { TRACES } from "@/data/traces";
import { ui } from "@/lib/ui";
import LearningFigure from "./LearningFigure";
import OpenOnHash from "./OpenOnHash";

const PARTS = [
    ["idea", "In breve"],
    ["esempio", "Esempio"],
    ["formale", "Definizione e formule"],
] as const;

/** Spiegazione semplificata degli appunti: un riquadro per concetto, con idea, esempio e versione formale. */
export function Lez6Topics({ groups }: { groups: Lez6Group[] }) {
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
                                <span
                                    aria-hidden="true"
                                    className="text-muted transition-transform group-open:rotate-90"
                                >
                                    ›
                                </span>
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
                                            {key === "esempio" && t.id === "voto" && <LearningFigure kind="maggioranza" sizes="(width < 80rem) 90vw, 1200px" />}
                                            {key === "esempio" && t.id === "ampiezze" && <LearningFigure kind="interferenza" sizes="(width < 80rem) 90vw, 1200px" />}
                                        </div>
                                    ) : null,
                                )}
                                <p className="text-muted text-xs">Negli appunti: {t.ref}</p>
                            </div>
                        </details>
                    ))}
                </section>
            ))}
        </div>
    );
}

/** Domande guida della lezione (parte A degli appunti). */
export function Lez6Questions({ only }: { only?: number[] }) {
    const qs = LEZ6.questions.filter((_, i) => !only || only.includes(i));
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

export function Lez6Exercises({ only }: { only: number[] }) {
    return (
        <div className="flex flex-col gap-2 [&_p]:max-w-none!">
            {only
                .map((i) => LEZ6.exercises[i])
                .map((e) => (
                    <details key={e.q} name="lezione-6" className="group border-line rounded-xl border">
                        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 px-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                            <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-90">
                                ›
                            </span>
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
export function Lez6Exam({ bullets, notes = [], test }: { bullets: number[]; notes?: number[]; test: RegExp }) {
    const questions = TRACES.flatMap((trace) =>
        trace.questions.filter((q) => test.test(q.text)).map((q) => ({ code: trace.code, n: q.n, label: q.label })),
    );
    return (
        <section className="border-line flex flex-col gap-3 border-t pt-6">
            <h3 className={ui.h3}>Collegamenti con l&apos;esame</h3>
            <Markdown>{LEZ6.exam.intro}</Markdown>
            <Markdown>{bullets.map((i) => `- ${LEZ6.exam.bullets[i]}`).join("\n")}</Markdown>
            {notes.map((i) => (
                <div key={i} className={ui.noteInfo}>
                    <Markdown>{LEZ6.exam.notes[i]}</Markdown>
                </div>
            ))}
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

export function Lez6Source() {
    return (
        <p className="text-muted text-xs">
            Fonte: appunti della Lezione 6 · Algoritmi probabilistici e calcolo quantistico (slide lezione-6.pdf,
            Bonatti; Papadimitriou cap. 11). La dispensa non ha un capitolo dedicato.
        </p>
    );
}
