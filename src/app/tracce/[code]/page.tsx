import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import { PracticeLab, SolutionLab } from "@/components/mdt/MachineLab";
import { goRightNote, MDT_BODY, TRACE_MACHINE, TRACE_NOTE } from "@/data/mdt";
import TraceRunner, { type RunnerQuestion } from "@/components/traces/TraceRunner";
import { TRACES, TRACE_BY, plainText } from "@/data/traces";
import { ui } from "@/lib/ui";

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

  const questions: RunnerQuestion[] = t.questions.map((q) => ({
    n: q.n,
    label: q.label,
    answer: q.answer,
    answerText: q.answerText,
    confirmed: q.confirmed,
    fileWrong: q.fileWrong,
    repeatOf: q.repeatOf,
    seeAlso: q.seeAlso,
    text: <Markdown>{q.text}</Markdown>,
    explanation: <Markdown>{q.explanation}</Markdown>,
    answerNode: <Markdown className="[&_p]:inline">{q.answerText}</Markdown>,
  }));

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Percorso" className="flex flex-wrap items-center gap-x-2 font-ui text-sm text-muted">
        <Link href="/tracce" className="hover:text-accent">
          Tracce d&apos;esame
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">{t.code}</span>
      </nav>
      <header className="flex flex-col gap-2">
        <span className={ui.eyebrow}>Traccia {t.code}</span>
        <h1 className={ui.h2}>{t.dateLabel || t.title}</h1>
        <p className={ui.hint}>Rispondi prima di leggere la spiegazione. I termini sottolineati offrono un aiuto rapido.</p>
      </header>

      <TraceRunner
        code={t.code}
        questions={questions}
        q8={
          t.q8 && {
            title: <Markdown>{t.q8.title}</Markdown>,
            body: <Q8Solution code={t.code} />,
            practice: <PracticeLab id={TRACE_MACHINE[t.code]} draftKey={`traccia:${t.code}`} />,
            repeatOf: t.q8.repeatOf,
          }
        }
      />

      <nav aria-label="Altre tracce" className="flex flex-wrap justify-between gap-3 border-t border-line pt-4 font-ui text-sm">
        {prev ? (
          <Link href={`/tracce/${prev.code}`} className="text-muted hover:text-accent">
            ← {prev.code} · {plainText(prev.dateLabel || prev.title)}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/tracce/${next.code}`} className="text-muted hover:text-accent">
            {next.code} · {plainText(next.dateLabel || next.title)} →
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
