"use client";

import { useState } from "react";
import Link from "next/link";
import { IDS, PLAIN } from "@/data/classes";
import { EXAM_QUESTIONS, type ExamQuestion } from "@/data/examQuestions";
import ClassChip from "@/components/ClassChip";
import Rich from "@/components/Rich";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { answerExamQuestion, CHOICES, resetExamQuiz, type Choice } from "@/store/progressSlice";
import { ui } from "@/lib/ui";

const ansKey = (t: ExamQuestion): Choice => {
  const a = t.a.replace(/<[^>]+>/g, "");
  return /^SÌ/.test(a) ? "SI" : /^NO/.test(a) ? "NO" : "ALTRO";
};
const ALL = EXAM_QUESTIONS.map((q, i) => ({ q, i }));
const FILTERS = IDS.filter((id) => EXAM_QUESTIONS.some((t) => t.c.includes(id)));

const optBase = "min-h-11 cursor-pointer rounded-lg border px-3 py-2 font-ui text-sm font-semibold disabled:cursor-default";
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
    dispatch(answerExamQuestion({ index: cur.i, choice, correct: choice === ansKey(cur.q) }));
  };
  const next = () => {
    if (last) {
      dispatch(resetExamQuiz(list.map(({ i }) => i)));
      setQi(0);
    } else setQi(qi + 1);
  };

  const rec = cur ? answers[cur.i] : undefined;
  const k = cur ? ansKey(cur.q) : "ALTRO";

  return (
    <div>
      <div className="mb-3.5 flex flex-wrap items-end justify-between gap-x-5 gap-y-2.5">
        <div className="flex flex-col gap-1">
          <h2 className={ui.h2}>Le domande vere delle tracce</h2>
          <p className={ui.hint}>Risposta e spiegazione sono già verificate negli appunti. Scegli SÌ, NO o altro, poi leggi il perché.</p>
          <Link href="/tracce" className={ui.linkBtn}>
            Tutte le tracce d&apos;esame, una per una
          </Link>
        </div>
        <label className="flex flex-col gap-1 font-ui text-base text-muted" htmlFor="quizFilter">
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
            <div className="font-mono text-sm tabular-nums text-muted">
              Domanda {qi + 1} di {list.length} · giuste {ok} su {answered.length}
            </div>
            <Rich className="font-head text-2xl font-medium leading-snug" html={cur.q.q} />
            <div className="flex flex-wrap gap-2">
              {CHOICES.map(([kk, l]) => {
                const cls = !rec ? optIdle : kk === k ? optRight : kk === rec.choice ? optWrong : optIdle;
                return (
                  <button key={kk} type="button" disabled={!!rec} onClick={() => choose(kk)} className={`${optBase} ${cls}`}>
                    {l}
                  </button>
                );
              })}
            </div>
            {rec && (
              <div className="flex flex-col items-start gap-4 border-t border-line pt-4">
                <Rich className="w-fit max-w-full rounded-lg bg-accent-soft/50 px-3 py-2 text-sm font-semibold text-accent" html={`<span>Risposta:</span> ${cur.q.a}`} />
                <Rich as="p" className="max-w-prose leading-relaxed" html={cur.q.e} />
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
              <button className={ui.btn} type="button" disabled={qi === 0} onClick={() => setQi(Math.max(0, qi - 1))}>
                ← Precedente
              </button>
              <button className={ui.btnPrimary} type="button" onClick={next}>
                {last ? "Ricomincia" : "Prossima →"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
