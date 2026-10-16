import type { Trap } from "@/data/problems/problems";

import { CLASSIFICATION_ORDER, PROBLEM_BY, PROBLEMS } from "@/data/problems/problems";
import { shuffle } from "@/lib/shuffle";

/* Quiz sui problemi: domande casuali, da creare solo in gestori di eventi o effetti. */

function distractors(correct: string, n: number) {
    const i = CLASSIFICATION_ORDER.indexOf(correct);
    const near = CLASSIFICATION_ORDER.filter((o) => o !== correct).sort(
        (a, b) => Math.abs(CLASSIFICATION_ORDER.indexOf(a) - i) - Math.abs(CLASSIFICATION_ORDER.indexOf(b) - i),
    );
    return shuffle(near.slice(0, 6)).slice(0, n);
}

export type QuizMode = "mix" | "cls" | "cpl" | "exam";
export const QUIZ_MODES: [QuizMode, string][] = [
    ["mix", "Misto"],
    ["cls", "In quale classe?"],
    ["cpl", "Il complemento"],
    ["exam", "Trappole d'esame"],
];
export const EXAM_TRAPS = PROBLEMS.flatMap((p) => p.traps.filter((t) => t.q).map((t) => ({ ...t, pid: p.id })));

export type QuizQuestion =
    | { type: "exam"; pid: string; trap: Trap; opts: string[]; right: string }
    | { type: "cpl"; pid: string; opts: string[]; right: string; name: string }
    | { type: "cls"; pid: string; opts: string[]; right: string };

export function newQuestion(qmode: QuizMode): QuizQuestion {
    const mode = qmode === "mix" ? shuffle(["cls", "cls", "cpl", "exam", "exam"] as const)[0] : qmode;
    if (mode === "exam") {
        const t = shuffle(EXAM_TRAPS)[0];
        return { type: "exam", pid: t.pid, trap: t, opts: ["SÌ", "NO", "altro"], right: t.a! };
    }
    if (mode === "cpl") {
        const p = shuffle(PROBLEMS.filter((x) => x.cpl || x.complLab))[0];
        const right = p.cpl ? PROBLEM_BY[p.cpl].lab : p.complLab!;
        const name = p.cpl ? PROBLEM_BY[p.cpl].name : "il suo complemento";
        return { type: "cpl", pid: p.id, opts: shuffle([right, ...distractors(right, 3)]), right, name };
    }
    const p = shuffle(PROBLEMS)[0];
    return { type: "cls", pid: p.id, opts: shuffle([p.lab, ...distractors(p.lab, 3)]), right: p.lab };
}
