/* Quanto serve ogni teorema nelle tracce (domande 1–7 delle 29 tracce) e la frase da esame, in HTML. La spiegazione è in spiegazioni/teoremi. */
import raw from "./proofs.json";

export type Priority = "alta" | "media" | "bassa" | "orale" | "fuori";
export type ProofKind = "completa" | "schema" | "non dimostrabile";
export type TheoremProof = {
    priorita: Priority;
    /** domande delle tracce (doppioni compresi) la cui risposta usa il teorema: è una stima */
    frequenza: number;
    domande: { traccia: string; n: number }[];
    tipo_dimostrazione: ProofKind;
    /** la motivazione da scrivere in una risposta SÌ/NO */
    frase_esame: string;
};

export const PROOF: Record<string, TheoremProof> = raw as Record<string, TheoremProof>;

export const PRIORITY_ORDER: Priority[] = ["alta", "media", "bassa", "orale", "fuori"];

export const PRIORITY: Record<Priority, { label: string; hint: string }> = {
    alta: {
        label: "Più chiesto",
        hint: "serve in 8 domande o più",
    },
    media: { label: "Chiesto spesso", hint: "serve in 4–7 domande" },
    bassa: { label: "Chiesto a volte", hint: "serve in 1–3 domande" },
    orale: { label: "Per l'orale", hint: "mai usato nelle tracce, ma dimostrato nel corso" },
    fuori: { label: "Non chiesto", hint: "mai usato nelle tracce e senza prova nel corso" },
};

export const PROOF_KIND: Record<ProofKind, string> = {
    completa: "Dimostrazione",
    schema: "Schema della dimostrazione",
    "non dimostrabile": "Perché non si dimostra",
};
