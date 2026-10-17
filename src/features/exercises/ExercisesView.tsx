"use client";

import { ui } from "@/lib/tokens";
import { setHash, useHash } from "@/lib/useHash";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetExercises } from "@/store/progressSlice";
import ExamQuiz from "./ExamQuiz";
import Flashcards from "./Flashcards";
import ProblemQuiz from "./ProblemQuiz";

type Sub = "tracce" | "quiz" | "flash";
const SUBS: [Sub, string][] = [
    ["tracce", "Tracce d'esame"],
    ["quiz", "Quiz sui problemi"],
    ["flash", "Flashcard"],
];
/* la sottoscheda sta nell'#hash: /esercizi, /esercizi#quiz, /esercizi#flash */
const subOf = (h: string): Sub => (h === "quiz" || h === "flash" ? h : "tracce");

export default function ExercisesView() {
    const sub = subOf(useHash());
    const dispatch = useAppDispatch();
    const empty = useAppSelector(
        ({ progress: p }) => !Object.keys(p.examQuiz).length && !p.problemQuiz.tot && !Object.keys(p.flashKnown).length,
    );
    const show = (s: Sub) => setHash(s === "tracce" ? "" : s);

    return (
        <section className="flex flex-col">
            <h1 className={`${ui.h2} mb-5`}>Esercitati, un concetto alla volta</h1>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div
                    role="tablist"
                    aria-label="Tipo di esercizio"
                    className="bg-sunk inline-flex max-w-full [scrollbar-width:none] gap-0.5 overflow-x-auto rounded-lg p-1"
                >
                    {SUBS.map(([s, label]) => (
                        <button
                            key={s}
                            role="tab"
                            type="button"
                            aria-selected={sub === s}
                            onClick={() => show(s)}
                            className={`font-ui min-h-11 flex-none cursor-pointer rounded-lg px-3 py-2 text-sm whitespace-nowrap ${sub === s ? "bg-surface text-ink ring-line font-medium ring-1" : "text-muted font-medium"}`}
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
