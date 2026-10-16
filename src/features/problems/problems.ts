import type { ClassId } from "@/data/classes/classes";
import type { LadderId, Problem, Trap } from "@/data/problems/problems";

import { TEX } from "@/data/classes/classes";
import { LADDER, LINKS, ORDER, PROBLEM_BY, PROBLEMS, ROWS } from "@/data/problems/problems";

/* Logica della scheda Problemi, del quiz sui problemi e delle flashcard (dal modulo PB della pagina). */

/** classificazione del problema da mostrare con texHtml: la classe precisa (Σ₂ᴾ, Π₂ᴾ) o il gradino */
export const classLabel = (p: Problem) => (p.c ? `$${TEX[p.c as ClassId]}$` : LADDER[p.b].n);

/** gradini della scala nell'ordine delle righe (dal basso) */
export const BANDS: LadderId[] = ROWS.flat();

/** collegamenti tra problemi, nei due versi, più il complemento quando non è già tra i collegamenti */
export const REL: Record<string, [string, string][]> = {};
LINKS.forEach(([a, b, t]) => {
    (REL[a] ||= []).push([b, t]);
    (REL[b] ||= []).push([a, t]);
});
PROBLEMS.forEach((p) => {
    if (p.cpl && !(REL[p.id] || []).some((r) => r[0] === p.cpl)) (REL[p.id] ||= []).push([p.cpl, "complemento"]);
});

export const plain = (h: string) => h.replace(/<[^>]+>/g, "");
export const norm = (s: string) =>
    plain(s)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]/g, "");

/** classe che dà il colore al problema: quella precisa (Σ₂ᴾ, Π₂ᴾ) o il gradino */
export const colorId = (p: Problem) => (p.c || p.b) as ClassId;

/** risposta SÌ / NO / altro → chiave delle classi di colore */
export const ansKey = (a: Trap["a"]) => (a === "SÌ" ? "SI" : a === "NO" ? "NO" : "ALTRO");
export const trapAnswer = (t: Trap) => (t.a === "altro" ? "altro: " + t.ac : t.a);

export function matches(p: Problem, query: string, filt: Set<string>, onlyComplete: boolean) {
    const q = norm(query);
    const okQ = !q || norm(p.name).includes(q) || norm(p.al || "").includes(q);
    const okF = !filt.size || filt.has(p.b);
    return okQ && okF && (!onlyComplete || !!p.full);
}

/* ---- casualità: da usare solo in gestori di eventi o effetti ---- */
export const shuffle = <T>(a: readonly T[]) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
};

export function distractors(correct: string, n: number) {
    const i = ORDER.indexOf(correct);
    const near = ORDER.filter((o) => o !== correct).sort(
        (a, b) => Math.abs(ORDER.indexOf(a) - i) - Math.abs(ORDER.indexOf(b) - i),
    );
    return shuffle(near.slice(0, 6)).slice(0, n);
}

/* ---- quiz sui problemi ---- */
export type QuizMode = "mix" | "cls" | "cpl" | "exam";
export const QMODES: [QuizMode, string][] = [
    ["mix", "Misto"],
    ["cls", "In quale classe?"],
    ["cpl", "Il complemento"],
    ["exam", "Trappole d'esame"],
];
export const EXAMQ = PROBLEMS.flatMap((p) => p.traps.filter((t) => t.q).map((t) => ({ ...t, pid: p.id })));

export type QuizQuestion =
    | { type: "exam"; pid: string; trap: Trap; opts: string[]; right: string }
    | { type: "cpl"; pid: string; opts: string[]; right: string; name: string }
    | { type: "cls"; pid: string; opts: string[]; right: string };

export function newQuestion(qmode: QuizMode): QuizQuestion {
    const mode = qmode === "mix" ? shuffle(["cls", "cls", "cpl", "exam", "exam"] as const)[0] : qmode;
    if (mode === "exam") {
        const t = shuffle(EXAMQ)[0];
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

/** mazzo di flashcard: tutti i problemi o quelli di un gradino, eventualmente senza le carte sapute */
export function deckIds(deck: string, onlyToReview: boolean, known: Record<string, true>) {
    return shuffle(
        PROBLEMS.filter((p) => (deck === "all" || p.b === deck) && (!onlyToReview || !known[p.id])).map((p) => p.id),
    );
}
