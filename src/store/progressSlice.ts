import type { Choice } from "@/lib/answer";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

export type AnswerRecord = { choice: Choice; correct: boolean; at: number };

/** una riga della tabella δ: stato e simboli letti, nuovo stato, simboli scritti e mosse (uno per nastro) */
export type MdtRow = { from: string; read: string[]; to: string; write: string[]; move: string[]; note: string };
/** casi di prova superati alla consegna e traccia in cui è stata consegnata */
export type MdtResult = { ok: number; tot: number; at: number; code: string };

export type TraceProgress = {
    /** risposte per numero di domanda (1–7) */
    answers: Record<number, AnswerRecord>;
    startedAt: number;
    completedAt?: number;
    /** migliori risultati delle esecuzioni concluse: giuste su totale */
    best?: { ok: number; tot: number };
    runs: number;
};

export type ProgressState = {
    traces: Record<string, TraceProgress>;
    /** domande delle tracce nel quiz per classi, per id della domanda in EXAM_QUESTIONS ("F04-2") */
    examQuiz: Record<string, AnswerRecord>;
    problemQuiz: { ok: number; tot: number };
    /** flashcard dei problemi segnate come sapute */
    flashKnown: Record<string, true>;
    /** tabelle δ scritte dall'utente, per traccia (stringa: bozza in testo, di prima della tabella) */
    mdtDrafts?: Record<string, MdtRow[] | string>;
    /** ultima consegna di ogni macchina, per id: una MdT che torna in un'altra traccia risulta già consegnata */
    mdtResults?: Record<string, MdtResult>;
};

export const initialProgress: ProgressState = {
    traces: {},
    examQuiz: {},
    problemQuiz: { ok: 0, tot: 0 },
    flashKnown: {},
};

const progressSlice = createSlice({
    name: "progress",
    initialState: initialProgress,
    reducers: {
        hydrate(_state, action: PayloadAction<ProgressState>) {
            const p = { ...initialProgress, ...action.payload };
            /* le risposte salvate per posizione nel vecchio elenco di 56 domande non corrispondono più a nulla */
            const examQuiz = Object.fromEntries(Object.entries(p.examQuiz).filter(([id]) => !/^\d+$/.test(id)));
            return { ...p, examQuiz };
        },
        answerTraceQuestion(
            state,
            action: PayloadAction<{ code: string; n: number; choice: Choice; correct: boolean }>,
        ) {
            const { code, n, choice, correct } = action.payload;
            const t = (state.traces[code] ??= { answers: {}, startedAt: Date.now(), runs: 0 });
            t.answers[n] = { choice, correct, at: Date.now() };
        },
        completeTrace(state, action: PayloadAction<{ code: string; ok: number; tot: number }>) {
            const { code, ok, tot } = action.payload;
            const t = state.traces[code];
            if (!t) return;
            t.completedAt = Date.now();
            t.runs += 1;
            if (!t.best || ok / tot > t.best.ok / t.best.tot) t.best = { ok, tot };
        },
        /** ricomincia la traccia: cancella le risposte, tiene il miglior risultato */
        restartTrace(state, action: PayloadAction<string>) {
            const t = state.traces[action.payload];
            if (!t) return;
            t.answers = {};
            t.completedAt = undefined;
            t.startedAt = Date.now();
        },
        answerExamQuestion(state, action: PayloadAction<{ id: string; choice: Choice; correct: boolean }>) {
            const { id, choice, correct } = action.payload;
            state.examQuiz[id] = { choice, correct, at: Date.now() };
        },
        resetExamQuiz(state, action: PayloadAction<string[]>) {
            action.payload.forEach((i) => delete state.examQuiz[i]);
        },
        recordProblemQuiz(state, action: PayloadAction<{ correct: boolean }>) {
            state.problemQuiz.tot += 1;
            if (action.payload.correct) state.problemQuiz.ok += 1;
        },
        resetProblemQuiz(state) {
            state.problemQuiz = { ok: 0, tot: 0 };
        },
        saveMdtDraft(state, action: PayloadAction<{ key: string; rows: MdtRow[] | null }>) {
            const drafts = (state.mdtDrafts ??= {});
            if (action.payload.rows === null) delete drafts[action.payload.key];
            else drafts[action.payload.key] = action.payload.rows;
        },
        /** la nuova consegna sostituisce la precedente, anche se va peggio */
        submitMdt(state, action: PayloadAction<{ id: string; code: string; ok: number; tot: number }>) {
            const { id, ...result } = action.payload;
            (state.mdtResults ??= {})[id] = { ...result, at: Date.now() };
        },
        setFlashKnown(state, action: PayloadAction<{ id: string; known: boolean }>) {
            if (action.payload.known) state.flashKnown[action.payload.id] = true;
            else delete state.flashKnown[action.payload.id];
        },
        resetTraces(state) {
            state.traces = {};
        },
        /** cancella le consegne delle MdT, non le tabelle scritte */
        resetMdtResults(state) {
            state.mdtResults = {};
        },
        /** azzera tutto Esercitati: quiz delle tracce, quiz sui problemi, flashcard */
        resetExercises(state) {
            state.examQuiz = {};
            state.problemQuiz = { ok: 0, tot: 0 };
            state.flashKnown = {};
        },
    },
});

export const {
    hydrate,
    answerTraceQuestion,
    completeTrace,
    restartTrace,
    answerExamQuestion,
    resetExamQuiz,
    recordProblemQuiz,
    resetProblemQuiz,
    setFlashKnown,
    saveMdtDraft,
    submitMdt,
    resetTraces,
    resetMdtResults,
    resetExercises,
} = progressSlice.actions;
export default progressSlice.reducer;
