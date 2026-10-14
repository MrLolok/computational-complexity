"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PROBLEM_BY } from "@/data/problems";
import Rich from "@/components/Rich";
import { Html, SourceBadge, YesNo, codeCls } from "@/components/problems/bits";
import { QMODES, ansKey, colorId, newQuestion, trapAnswer, type QuizMode, type QuizQuestion } from "@/lib/problems";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { recordProblemQuiz, resetProblemQuiz } from "@/store/progressSlice";
import { classColor, ui } from "@/lib/ui";

const opt = "cursor-pointer rounded-[9px] border px-3 py-2.5 text-left font-ui font-semibold disabled:cursor-default";

function QuestionText({ q }: { q: QuizQuestion }) {
  const p = PROBLEM_BY[q.pid];
  if (q.type === "exam")
    return (
      <>
        <Rich as="span" html={q.trap.q || ""} /> <span className={codeCls}>{q.trap.c}</span>
      </>
    );
  if (q.type === "cpl")
    return (
      <>
        Com&apos;è classificato il complemento di <strong className="font-bold">{p.name}</strong>?
      </>
    );
  return (
    <>
      <strong className="font-bold">{p.name}</strong>: in quale classe sta, ed è completo?
      <Rich as="span" className="mt-1.5 block font-body text-[0.95rem] font-normal text-muted" html={p.def} />
    </>
  );
}

function Explanation({ q }: { q: QuizQuestion }) {
  const p = PROBLEM_BY[q.pid];
  if (q.type === "exam")
    return (
      <span>
        <YesNo k={ansKey(q.trap.a)}>{trapAnswer(q.trap)}</YesNo>
        <Rich as="span" html={q.trap.e || ""} />
      </span>
    );
  if (q.type === "cpl") {
    const cp = p.cpl ? PROBLEM_BY[p.cpl] : null;
    return <Rich as="span" html={`${p.name} è ${p.lab}; ${q.name} è ${q.right}. ${cp ? cp.why : p.compl}`} />;
  }
  return (
    <span>
      <Rich as="span" html={p.brief} />
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
    <div className="flex max-w-[780px] flex-col gap-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-ui text-[0.95rem] text-muted">Tipo di domanda</span>
        <div className="flex flex-wrap gap-1.5">
          {QMODES.map(([k, t]) => (
            <button
              key={k}
              type="button"
              aria-pressed={k === mode}
              onClick={() => {
                setMode(k);
                ask(k);
              }}
              className={`inline-flex cursor-pointer items-center rounded-full border px-2.5 py-[3px] font-ui text-[0.84rem] text-ink ${k === mode ? "border-accent bg-accent/14 font-semibold" : "border-line"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div
        style={q ? classColor(colorId(PROBLEM_BY[q.pid])) : undefined}
        className={`flex flex-col gap-4 rounded-xl border border-t-[3px] border-line bg-surface p-[22px] ${q ? "border-t-(--c)" : "border-t-accent"}`}
      >
        {q && (
          <>
            <div className="font-head text-[1.4rem] font-medium leading-[1.3]">
              <QuestionText q={q} />
            </div>
            <div className="grid grid-cols-1 gap-2 min-[561px]:grid-cols-2">
              {q.opts.map((o, i) => {
                const state = pick === null ? "" : o === q.right ? "border-ok bg-ok-soft text-ok" : i === pick ? "border-proved bg-proved-soft text-proved" : "";
                return (
                  <button
                    key={o}
                    type="button"
                    disabled={pick !== null}
                    onClick={() => choose(i)}
                    className={`${opt} ${state || "border-line-strong bg-transparent text-ink enabled:hover:border-accent"}`}
                  >
                    {q.type === "exam" && o === "altro" ? "altro (solo se…)" : <Html html={o} />}
                  </button>
                );
              })}
            </div>
            {pick !== null && (
              <div className="flex flex-col gap-1.5 text-[0.95rem]">
                <span className={`font-ui font-bold ${ok ? "text-ok" : "text-proved"}`}>{ok ? "Giusto." : "Non è così."}</span>
                <Explanation q={q} />
              </div>
            )}
          </>
        )}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <button className={ui.btnPrimary} type="button" onClick={() => ask(mode)}>
            Prossima
          </button>
          <button className={ui.linkBtn} type="button" disabled={!q} onClick={() => q && router.push(`/problemi/${q.pid}`)}>
            Apri la scheda
          </button>
          <span className="ml-auto font-mono text-[0.84rem] tabular-nums text-muted">
            {score.ok} / {score.tot} giuste
          </span>
          <button className={ui.linkBtn} type="button" disabled={!score.tot} onClick={() => dispatch(resetProblemQuiz())}>
            Azzera
          </button>
        </div>
      </div>
    </div>
  );
}
