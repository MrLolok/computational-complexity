/* Tracce d'esame risolte, esportate (in sola lettura) dalle pagine Notion "Tracce d'esame · domande risolte". Testi in Markdown con formule $…$. */
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
export type TraceQ8 = { title: string; body: string; lessonRef: string | null; repeatOf: string | null };
export type Trace = {
    code: string;
    title: string;
    date: string | null;
    dateLabel: string | null;
    notionUrl: string;
    intro: string;
    questions: TraceQuestion[];
    q8: TraceQ8 | null;
};

const data = raw as unknown as { source: string; legend?: string; traces: Trace[] };

export const TRACES: Trace[] = data.traces;
export const TRACE_LEGEND: string = data.legend ?? "";
export const TRACE_BY: Record<string, Trace> = Object.fromEntries(TRACES.map((t) => [t.code, t]));

/** testo semplice per la ricerca: senza Markdown né comandi LaTeX */
export const plainText = (md: string) =>
    md
        .replace(/\\(mathrm|text|mathcal|operatorname)\{([^}]*)\}/g, "$2")
        .replace(/\\[a-zA-Z]+/g, " ")
        .replace(/[$*_`#>|{}^\\]/g, "")
        .replace(/\s+/g, " ")
        .trim();
