import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** Risposta data a una domanda SÌ / NO / altro. */
export type Choice = "SI" | "NO" | "ALTRO";
export type AnswerRecord = { choice: Choice; correct: boolean; at: number };

export type TraceProgress = {
  /** risposte per numero di domanda (1–7) */
  answers: Record<number, AnswerRecord>;
  /** la domanda 8 (MdT) non ha una risposta chiusa: l'utente la segna come svolta */
  q8Done?: boolean;
  startedAt: number;
  completedAt?: number;
  /** migliori risultati delle esecuzioni concluse: giuste su totale */
  best?: { ok: number; tot: number };
  runs: number;
};

export type ProgressState = {
  traces: Record<string, TraceProgress>;
  /** domande delle tracce nel quiz per classi, per indice nell'elenco EXAM_QUESTIONS */
  examQuiz: Record<number, AnswerRecord>;
  problemQuiz: { ok: number; tot: number };
  /** flashcard dei problemi segnate come sapute */
  flashKnown: Record<string, true>;
};

export const initialProgress: ProgressState = { traces: {}, examQuiz: {}, problemQuiz: { ok: 0, tot: 0 }, flashKnown: {} };

const progressSlice = createSlice({
  name: "progress",
  initialState: initialProgress,
  reducers: {
    hydrate(_state, action: PayloadAction<ProgressState>) {
      return { ...initialProgress, ...action.payload };
    },
    answerTraceQuestion(state, action: PayloadAction<{ code: string; n: number; choice: Choice; correct: boolean }>) {
      const { code, n, choice, correct } = action.payload;
      const t = (state.traces[code] ??= { answers: {}, startedAt: Date.now(), runs: 0 });
      t.answers[n] = { choice, correct, at: Date.now() };
    },
    setTraceQ8Done(state, action: PayloadAction<{ code: string; done: boolean }>) {
      const t = (state.traces[action.payload.code] ??= { answers: {}, startedAt: Date.now(), runs: 0 });
      t.q8Done = action.payload.done;
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
      t.q8Done = false;
      t.completedAt = undefined;
      t.startedAt = Date.now();
    },
    answerExamQuestion(state, action: PayloadAction<{ index: number; choice: Choice; correct: boolean }>) {
      const { index, choice, correct } = action.payload;
      state.examQuiz[index] = { choice, correct, at: Date.now() };
    },
    resetExamQuiz(state, action: PayloadAction<number[] | undefined>) {
      if (!action.payload) state.examQuiz = {};
      else action.payload.forEach((i) => delete state.examQuiz[i]);
    },
    recordProblemQuiz(state, action: PayloadAction<{ correct: boolean }>) {
      state.problemQuiz.tot += 1;
      if (action.payload.correct) state.problemQuiz.ok += 1;
    },
    resetProblemQuiz(state) {
      state.problemQuiz = { ok: 0, tot: 0 };
    },
    setFlashKnown(state, action: PayloadAction<{ id: string; known: boolean }>) {
      if (action.payload.known) state.flashKnown[action.payload.id] = true;
      else delete state.flashKnown[action.payload.id];
    },
    resetTraces(state) {
      state.traces = {};
    },
    /** azzera tutto Esercitati: quiz delle tracce, quiz sui problemi, flashcard */
    resetExercises(state) {
      state.examQuiz = {};
      state.problemQuiz = { ok: 0, tot: 0 };
      state.flashKnown = {};
    },
    resetAll() {
      return initialProgress;
    },
  },
});

export const {
  hydrate, answerTraceQuestion, setTraceQ8Done, completeTrace, restartTrace,
  answerExamQuestion, resetExamQuiz, recordProblemQuiz, resetProblemQuiz, setFlashKnown,
  resetTraces, resetExercises, resetAll,
} = progressSlice.actions;
export default progressSlice.reducer;
