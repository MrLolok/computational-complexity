import { PLAIN } from "@/data/classes/classes";
import { plainMath } from "./mathNotation";

/* Testi dei dati (HTML o Markdown con formule) ridotti a testo semplice, per ricerca, titoli e etichette. */

/** HTML dei dati → testo semplice: formule in Unicode, niente tag, {{ID}} → nome della classe, entità → spazio */
export const htmlToPlain = (s: string) =>
    plainMath(s)
        .replace(/<[^>]*>/g, "")
        .replace(/\{\{(\w+)\}\}/g, (_, id: string) => (id in PLAIN ? PLAIN[id as keyof typeof PLAIN] : id))
        .replace(/&[a-z]+;/g, " ")
        .replace(/\s+/g, " ")
        .trim();

/** Markdown con LaTeX (testi delle tracce) → testo semplice, senza marcatura né comandi */
export const markdownToPlain = (md: string) =>
    md
        .replace(/\\(mathrm|text|mathcal|operatorname)\{([^}]*)\}/g, "$2")
        .replace(/\\[a-zA-Z]+/g, " ")
        .replace(/[$*_`#>|{}^\\]/g, "")
        .replace(/\s+/g, " ")
        .trim();

/** taglia a fine parola oltre max caratteri */
export const shorten = (s: string, max = 260) => (s.length > max ? s.slice(0, s.lastIndexOf(" ", max)) + "…" : s);

/** chiave di confronto per la ricerca: minuscole e senza accenti */
export const searchKey = (s: string) =>
    s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
