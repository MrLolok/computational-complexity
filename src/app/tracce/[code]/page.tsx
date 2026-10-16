import type { RunnerQuestion } from "@/features/traces/TraceRunner";
import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import Arrow from "@/components/Arrow";
import Markdown from "@/components/Markdown";
import { PROOF } from "@/data/theorems/proofs";
import { THEOREMS } from "@/data/theorems/theorems";
import { TRACE_BY, TRACES } from "@/data/traces/traces";
import { goRightNote, MDT_BODY, TRACE_MACHINE, TRACE_NOTE } from "@/data/turing/solutions";
import TraceRunner from "@/features/traces/TraceRunner";
import PracticeLab from "@/features/turing/PracticeLab";
import SolutionLab from "@/features/turing/SolutionLab";
import { markdownToPlain } from "@/lib/plainText";
import { ui } from "@/lib/tokens";

/** schede di /teoremi che dicono dove sta un problema (es. PRIMES ∈ P, SAT NP-completo): non vanno nei Riferimenti */
const PROBLEM_RESULTS = new Set([
    "reach-nl",
    "cook-levin",
    "3sat",
    "2sat-p",
    "horn-sat",
    "max2sat",
    "independent-set",
    "clique-nodecover",
    "hamilton-path",
    "tsp-d",
    "3-coloring",
    "tripartite-matching",
    "set-problems",
    "integer-programming",
    "knapsack",
    "knapsack-pseudopoly",
    "validity-conp",
    "exact-tsp-np-hard",
    "sat-unsat-dp",
    "altri-dp-completi",
    "circ",
    "t17-10",
    "strategic-companies",
    "qsat-pspace",
    "co-hamilton-pi2",
    "db-queries",
    "geography",
    "go",
    "fsat-fnp",
    "fsat-sat",
    "nexp-completi",
    "fo-indecidibile",
    "2sat-p-completo",
    "riepilogo-p",
]);

export function generateStaticParams() {
    return TRACES.map((t) => ({ code: t.code }));
}

export async function generateMetadata({ params }: PageProps<"/tracce/[code]">): Promise<Metadata> {
    const { code } = await params;
    const t = TRACE_BY[code];
    return { title: t ? `Traccia ${t.code}` : "Traccia" };
}

export default async function Page({ params }: PageProps<"/tracce/[code]">) {
    const { code } = await params;
    const t = TRACE_BY[code];
    if (!t) notFound();
    const i = TRACES.indexOf(t);
    const prev = TRACES[i - 1];
    const next = TRACES[i + 1];

    /** teoremi la cui scheda in /teoremi elenca questa domanda tra quelle che lo usano, senza i risultati sui singoli problemi */
    const theoremsFor = (n: number) =>
        THEOREMS.filter(
            (th) => !PROBLEM_RESULTS.has(th.id) && PROOF[th.id]?.domande.some((d) => d.traccia === t.code && d.n === n),
        ).map((th) => ({ id: th.id, nome: th.nome }));

    const questions: RunnerQuestion[] = t.questions.map((q) => ({
        n: q.n,
        label: q.label,
        answer: q.answer,
        repeatOf: q.repeatOf,
        seeAlso: q.seeAlso,
        theorems: theoremsFor(q.n),
        text: <Markdown>{q.text}</Markdown>,
        explanation: <Markdown>{q.explanation}</Markdown>,
        answerNode: <Markdown className="[&_p]:inline">{q.answerText}</Markdown>,
    }));

    return (
        <div className="flex flex-col gap-6">
            <nav aria-label="Percorso" className="font-ui text-muted flex flex-wrap items-center gap-x-2 text-sm">
                <Link href="/tracce" className="hover:text-accent">
                    Tracce d&apos;esame
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-ink">{t.code}</span>
            </nav>
            <header className="flex flex-col gap-2">
                <span className={ui.eyebrow}>Traccia {t.code}</span>
                <h1 className={ui.h2}>{t.dateLabel || t.title}</h1>
                <p className={ui.hint}>
                    Rispondi prima di leggere la spiegazione. I termini sottolineati offrono un aiuto rapido.
                </p>
            </header>

            <TraceRunner
                code={t.code}
                questions={questions}
                q8={
                    t.q8 && {
                        machine: TRACE_MACHINE[t.code],
                        title: <Markdown>{t.q8.title}</Markdown>,
                        body: <Q8Solution code={t.code} />,
                        practice: (
                            <PracticeLab id={TRACE_MACHINE[t.code]} draftKey={`traccia:${t.code}`} code={t.code} />
                        ),
                    }
                }
            />

            <nav
                aria-label="Altre tracce"
                className="border-line font-ui flex flex-wrap justify-between gap-3 border-t pt-4 text-sm"
            >
                {prev ? (
                    <Link href={`/tracce/${prev.code}`} className="text-muted hover:text-accent">
                        <Arrow shape="left" /> {prev.code} · {markdownToPlain(prev.dateLabel || prev.title)}
                    </Link>
                ) : (
                    <span />
                )}
                {next && (
                    <Link href={`/tracce/${next.code}`} className="text-muted hover:text-accent">
                        {next.code} · {markdownToPlain(next.dateLabel || next.title)} <Arrow />
                    </Link>
                )}
            </nav>
        </div>
    );
}

/** Soluzione completa della domanda 8: note della traccia, idea, tabella e simulatore. */
function Q8Solution({ code }: { code: string }) {
    const id = TRACE_MACHINE[code];
    const note = goRightNote(id);
    return (
        <div className="flex flex-col gap-4">
            {TRACE_NOTE[code] && (
                <div className={ui.noteInfo}>
                    <Markdown>{TRACE_NOTE[code]}</Markdown>
                </div>
            )}
            <Markdown>{MDT_BODY[id]}</Markdown>
            {note && (
                <div className={ui.noteInfo}>
                    <Markdown>{note}</Markdown>
                </div>
            )}
            <h3 className={ui.h3}>Eseguila passo per passo</h3>
            <SolutionLab id={id} />
        </div>
    );
}
