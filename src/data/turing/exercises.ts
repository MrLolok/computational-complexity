/* Esercizi sulla macchina di Turing in più rispetto alle tracce, dello stesso tipo della domanda 8.
   Solo testo e soluzione svolta: non hanno una macchina da eseguire nel simulatore. */
import raw from "./exercises.json";

export type Exercise = {
    id: string;
    title: string;
    kind: "funzione" | "decisione";
    tapes: number;
    nondet?: boolean;
    oracle?: "SAT" | "CLIQUE";
    /** testo dell'esercizio, come nelle tracce */
    text: string;
    /** soluzione: idea, tabella δ, traccia su un input, casi limite */
    body: string;
};

export const EXERCISES = raw as Exercise[];
