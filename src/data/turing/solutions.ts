/* Domanda 8 delle tracce: programmare una macchina di Turing.
   Testi delle soluzioni (senza rimandi alle lezioni) e macchina usata da ogni traccia. */
import raw from "./solutions.json";

export type MethodSection = { id: string; title: string; body: string };
const data = raw as { method: MethodSection[]; bodies: Record<string, string> };

export const MDT_METHOD = data.method;
/** spiegazione completa della soluzione: idea, tabella δ, tracce passo passo, casi limite */
export const MDT_BODY = data.bodies;

/** macchina della domanda 8 di ogni traccia (le tracce ripetute puntano alla stessa) */
export const TRACE_MACHINE: Record<string, string> = {
    F01: "dispari",
    F02: "resto-2",
    F03: "palindrome-nd",
    F04: "resto-2",
    F05: "diviso-2",
    F06: "resto-2",
    F07: "diviso-2",
    F08: "sat-unsat",
    G16: "sat-unsat",
    F12: "palindrome",
    F13: "per-2",
    F14: "incremento",
    G17: "palindrome",
    L18: "meno-x",
    G20v1: "resto-2",
    G20v2: "per-4",
    G20v3: "confronto",
    G20v4: "non-palindrome",
    G20v5: "diviso-4",
    MZ22: "confronto",
    LU22: "somma",
    GE23: "confronto",
    FE23: "non-palindrome",
    MA23: "non-palindrome",
    SE23: "chiave",
    LU24: "chiave",
    E26: "sat-unsat",
    ND: "sat-unsat",
    SP: "independent-set",
};
/** note proprie di una traccia, prima della soluzione */
export const TRACE_NOTE: Record<string, string> = {
    G17: "La soluzione del file di questa traccia aggiunge all'inizio un controllo per la stringa vuota: non serve, perché la macchina qui sotto accetta già la stringa vuota.",
};

/** macchine la cui tabella sottintende il blocco "vai in fondo" */
const GO_RIGHT = new Set(["incremento", "per-2", "diviso-2", "resto-2", "meno-x"]);
export const goRightNote = (id: string) =>
    GO_RIGHT.has(id)
        ? "Nella tabella sono sottintese le righe del blocco «vai in fondo»: $\\delta(s, \\triangleright) = (s, \\triangleright, \\rightarrow)$ e $\\delta(s, b) = (s, b, \\rightarrow)$. La macchina va in fondo all'input e, sulla prima cella vuota, comincia la parte propria di ogni esercizio."
        : null;

export const tracesOf = (id: string) => Object.keys(TRACE_MACHINE).filter((c) => TRACE_MACHINE[c] === id);
