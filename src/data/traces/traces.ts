/* Tracce d'esame risolte (sola lettura). Testi in Markdown con formule $…$; le soluzioni della domanda 8 stanno in data/turing. */
import raw from "./traces.json";

export type TraceAnswer = "SI" | "NO" | "ALTRO";
export type TraceRef = { code: string; n: number };
export type TraceQuestion = {
    n: number;
    /** solo nelle domande sparse (SP): a, b, c… */
    label?: string;
    text: string;
    answer: TraceAnswer;
    /** risposta come è scritta, es. "altro: solo se P = NP" */
    answerText: string;
    explanation: string;
    /** ✔️ confermata dal correttore */
    confirmed: boolean;
    /** 🔁 la soluzione nel file d'origine è sbagliata */
    fileWrong: boolean;
    /** ♻️ domanda ripetuta da un'altra traccia */
    repeatOf: string | null;
    seeAlso: TraceRef[];
};
export type TraceQ8 = { title: string; repeatOf: string | null };
export type Trace = {
    code: string;
    title: string;
    date: string | null;
    dateLabel: string | null;
    intro: string;
    questions: TraceQuestion[];
    q8: TraceQ8 | null;
};

const data = raw as unknown as { source: string; traces: Trace[] };

export const TRACES: Trace[] = data.traces;
export const TRACE_BY: Record<string, Trace> = Object.fromEntries(TRACES.map((t) => [t.code, t]));
