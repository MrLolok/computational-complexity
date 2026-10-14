"use client";

import { useSyncExternalStore } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetExercises } from "@/store/progressSlice";
import { ui } from "@/lib/ui";
import ExamQuiz from "./ExamQuiz";
import ProblemQuiz from "./ProblemQuiz";
import Flashcards from "./Flashcards";

type Sub = "tracce" | "quiz" | "flash";
const SUBS: [Sub, string][] = [
  ["tracce", "Tracce d'esame"],
  ["quiz", "Quiz sui problemi"],
  ["flash", "Flashcard"],
];
/* la sottoscheda sta nell'#hash: /esercizi, /esercizi#quiz, /esercizi#flash */
const EVENT = "esercizi:sub";
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  window.addEventListener("popstate", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener("popstate", cb);
    window.removeEventListener(EVENT, cb);
  };
};
const getSub = (): Sub => {
  const h = window.location.hash.slice(1);
  return h === "quiz" || h === "flash" ? h : "tracce";
};
const getServerSub = (): Sub => "tracce";

export default function ExercisesView() {
  const sub = useSyncExternalStore(subscribe, getSub, getServerSub);
  const dispatch = useAppDispatch();
  const empty = useAppSelector(
    ({ progress: p }) => !Object.keys(p.examQuiz).length && !p.problemQuiz.tot && !Object.keys(p.flashKnown).length,
  );
  const show = (s: Sub) => {
    window.history.replaceState(null, "", s === "tracce" ? window.location.pathname : `#${s}`);
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <section className="flex flex-col">
      <h1 className={`${ui.h2} mb-5`}>Esercitati, un concetto alla volta</h1>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Tipo di esercizio"
          className="inline-flex max-w-full gap-0.5 overflow-x-auto rounded-[10px] bg-sunk p-[3px] [scrollbar-width:none]"
        >
          {SUBS.map(([s, label]) => (
            <button
              key={s}
              role="tab"
              type="button"
              aria-selected={sub === s}
              onClick={() => show(s)}
              className={`flex-none cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 font-ui text-[0.88rem] ${sub === s ? "bg-surface font-semibold text-ink ring-1 ring-line" : "font-medium text-muted"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`${ui.linkBtn} disabled:cursor-default disabled:opacity-35`}
          disabled={empty}
          onClick={() => confirm("Azzerare quiz e flashcard di Esercitati?") && dispatch(resetExercises())}
        >
          Azzera statistiche
        </button>
      </div>
      <div hidden={sub !== "tracce"}>
        <ExamQuiz />
      </div>
      <div hidden={sub !== "quiz"}>
        <ProblemQuiz />
      </div>
      <div hidden={sub !== "flash"}>
        <Flashcards />
      </div>
    </section>
  );
}
