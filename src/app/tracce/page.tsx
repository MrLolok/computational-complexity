import type { Metadata } from "next";
import TraceLibrary, { type TraceSummary } from "@/components/traces/TraceLibrary";
import Markdown from "@/components/Markdown";
import { TRACES, TRACE_LEGEND, plainText } from "@/data/traces";
import { ui } from "@/lib/ui";

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
    q8: t.q8 ? plainText(t.q8.title) : null,
    search: t.questions.map((q) => plainText(q.text)).join(" "),
  }));
  const total = TRACES.reduce((n, t) => n + t.questions.length, 0);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <span className={ui.eyebrow}>Libreria</span>
        <h1 className={ui.h2}>Tracce d&apos;esame</h1>
        <p className={ui.lede}>
          {TRACES.length} tracce, {total} domande a risposta SÌ / NO / altro più la domanda 8 sulla macchina di Turing. Apri
          una traccia, rispondi e consegna: le risposte restano salvate in questo browser.
        </p>
      </header>
      {TRACE_LEGEND && (
        <details className={ui.card}>
          <summary className="cursor-pointer font-ui text-sm text-muted">Legenda dei simboli</summary>
          <Markdown className="mt-2 text-base">{TRACE_LEGEND}</Markdown>
        </details>
      )}
      <TraceLibrary traces={summaries} />
    </div>
  );
}
