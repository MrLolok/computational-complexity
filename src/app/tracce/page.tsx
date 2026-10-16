import type { TraceSummary } from "@/features/traces/TraceLibrary";
import type { Metadata } from "next";

import { TRACES } from "@/data/traces/traces";
import { TRACE_MACHINE } from "@/data/turing/solutions";
import TraceLibrary from "@/features/traces/TraceLibrary";
import { markdownToPlain } from "@/lib/plainText";
import { ui } from "@/lib/tokens";

export const metadata: Metadata = { title: "Tracce d'esame" };

const groupOf = (date: string | null) => (date ? date.slice(0, 4) : "Senza data");

export default function Page() {
    const summaries: TraceSummary[] = TRACES.map((t) => ({
        code: t.code,
        title: t.title,
        dateLabel: t.dateLabel ?? "",
        group: groupOf(t.date),
        total: t.questions.length,
        repeated: t.questions.filter((q) => q.repeatOf).length,
        q8: t.q8 ? markdownToPlain(t.q8.title) : null,
        machine: TRACE_MACHINE[t.code] ?? null,
        search: t.questions.map((q) => markdownToPlain(q.text)).join(" "),
    }));
    const total = TRACES.reduce((n, t) => n + t.questions.length, 0);

    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-2">
                <span className={ui.eyebrow}>Libreria</span>
                <h1 className={ui.h2}>Tracce d&apos;esame</h1>
                <p className={ui.lede}>
                    {TRACES.length} tracce, {total} domande a risposta SÌ / NO / altro più la domanda 8 sulla macchina
                    di Turing. Apri una traccia, rispondi e consegna: le risposte restano salvate in questo browser.
                </p>
            </header>
            <TraceLibrary traces={summaries} />
        </div>
    );
}
