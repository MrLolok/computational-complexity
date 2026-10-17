/* Tutte le domande SÌ / NO / altro delle tracce, ognuna una volta sola, etichettate per classe (q, a ed e in HTML). */
import type { TraceQuestion, TraceRef } from "@/data/traces/traces";
import type { ClassId } from "./classes";

import { TRACES } from "@/data/traces/traces";
import { mdHtml } from "@/lib/mdHtml";
import { IDS } from "./classes";

export type ExamQuestion = {
    /** codice e numero della prima traccia in cui è uscita, es. "F04-2" */
    id: string;
    q: string;
    a: string;
    e: string;
    c: ClassId[];
    /** tutte le tracce in cui è uscita, la prima per data in testa; label solo nelle domande sparse (a, b, c…) */
    refs: (TraceRef & { label?: string })[];
};

const key = (r: TraceRef) => `${r.code}-${r.n}`;

/* Gruppi di domande uguali a meno di costanti, indici o polarità: una domanda ripetuta (♻️) rimanda con
   seeAlso alla sua gemella; i rimandi tra due domande nuove sono solo collegamenti e non uniscono. */
function groups() {
    const all = TRACES.flatMap((t) => t.questions.map((q) => ({ ref: { code: t.code, n: q.n }, q })));
    const byKey = new Map(all.map((x) => [key(x.ref), x]));
    const parent = new Map(all.map((x) => [key(x.ref), key(x.ref)]));
    const root = (k: string): string => (parent.get(k) === k ? k : root(parent.get(k)!));
    for (const { ref, q } of all)
        for (const r of q.seeAlso)
            if (byKey.has(key(r)) && (q.repeatOf || byKey.get(key(r))!.q.repeatOf))
                parent.set(root(key(ref)), root(key(r)));
    const out = new Map<string, { ref: TraceRef; q: TraceQuestion }[]>();
    for (const x of all) out.set(root(key(x.ref)), [...(out.get(root(key(x.ref))) ?? []), x]);
    return [...out.values()];
}

/* Classi citate dal testo (nomi e formule) e classi dei problemi nominati: QSAT_i sta in Σ_i, co-QSAT_i in Π_i. */
const level = (k: number, pi: boolean): ClassId =>
    k === 1 ? (pi ? "coNP" : "NP") : k === 2 ? (pi ? "PI2" : "SIGMA2") : pi ? "PIi" : "SIGMAi";
const WORD = (w: string) => new RegExp(`(?<![\\w-])${w}(?!\\w)`);
const NAMES: [RegExp, ClassId][] = [
    [WORD("L"), "L"],
    [WORD("NL"), "NL"],
    [WORD("P"), "P"],
    [WORD("NP"), "NP"],
    [WORD("coNP"), "coNP"],
    [WORD("DP"), "DP"],
    [WORD("PH"), "PH"],
    [WORD("N?PSPACE"), "PSPACE"],
    [WORD("(?:\\d-)?EXP"), "EXP"],
    [WORD("NEXP"), "NEXP"],
    [WORD("RE"), "RE"],
    [WORD("coRE"), "coRE"],
    [WORD("(?:CLIQUE|3-COL|3-SAT|HAMILTON PATH|TSP\\(D\\))"), "NP"],
    [/(?<![\w-]|CIRC |BERNAYS )SAT(?![\w-])/, "NP"],
    [WORD("2-SAT"), "NL"],
    [WORD("(?:2-COL|MAX FLOW|PRIMES)"), "P"],
    [WORD("(?:co-)?QSAT(?!_)"), "PSPACE"],
    [WORD("GEOGRAPHY"), "PSPACE"],
    [WORD("VALIDITY"), "coNP"],
    [WORD("(?:SAT-UNSAT|EXACT TSP)"), "DP"],
    [WORD("(?:CIRC SAT|STRATEGIC COMPANIES)"), "SIGMA2"],
    [/SCHÖNFINKEL-BERNAYS/, "NEXP"],
];
function classesOf(text: string): ClassId[] {
    const found = new Set<ClassId>();
    const add = (k: string, pi: boolean) => found.add(level(Number(k), pi));
    /* nelle formule contano solo i nomi in \mathrm e i piani Σ/Π: le lettere in corsivo ($L$, $f(n)$) sono variabili */
    const s = text.replace(/\bSia L\b/g, "Sia").replace(/\$([^$]*)\$/g, (_, m: string) => {
        for (const [, g, k] of m.matchAll(/\\(Sigma|Pi)_\{?(\d)\}?/g)) add(k, g === "Pi");
        const names = [
            ...m.replace(/\^\{?\\mathrm\{P\}\}?/g, "").matchAll(/\\mathrm\{((?:[^{}]|\{[^{}]*\})*)\}(?:_\{?(\d)\}?)?/g),
        ].map(([, n, k]) => n.replace(/\\text\{([^{}]*)\}/g, "$1") + (k ? `_${k}` : ""));
        return ` ${names.join(" ")} `;
    });
    for (const [, co, k] of s.matchAll(/(?<![\w-])(co-)?QSAT_(\d)/g)) add(k, !!co);
    for (const [re, id] of NAMES) if (re.test(s)) found.add(id);
    return IDS.filter((id) => found.has(id));
}

const answerHtml = (answer: string) => answer.replace(/^(SÌ|NO|altro)/, "<b>$1</b>");

export const EXAM_QUESTIONS: ExamQuestion[] = groups().map((g) => {
    const first = g.find((x) => !x.q.repeatOf) ?? g[0];
    return {
        id: key(first.ref),
        q: mdHtml(first.q.text),
        a: answerHtml(first.q.answerText),
        e: mdHtml(first.q.explanation),
        c: classesOf(first.q.text),
        refs: [first, ...g.filter((x) => x !== first)].map((x) => ({ ...x.ref, label: x.q.label })),
    };
});

/** le tracce di una domanda come testo breve, es. "F04, F07" */
export const refCodes = (q: ExamQuestion) => [...new Set(q.refs.map((r) => r.code))].join(", ");
