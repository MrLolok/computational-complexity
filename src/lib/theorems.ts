/* Collegamenti tra teoremi, problemi e classi (dal modulo TEOREMI della pagina). */
import type { ClassId } from "@/data/classes";
import type { Theorem } from "@/data/theorems";

import { PROBLEM_BY, PROBLEMS } from "@/data/problems";
import { PRIORITY_ORDER, PROOF } from "@/data/theoremProofs";
import { THEOREMS } from "@/data/theorems";
import { plainMath } from "./mathNotation";

export const thPlain = (h: string | null | undefined) => plainMath(String(h || "")).replace(/<[^>]+>/g, "");
export const thNorm = (s: string) => thPlain(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/* problemi citati nell'enunciato: il nome deve comparire intero, non dentro un altro nome (SAT non dentro SAT-UNSAT) */
const TH_ALIAS: Record<string, string[]> = {
    COL2: ["2-COLORING"],
    COL3: ["3-COLORING"],
    MAXFLOW: ["MAX-FLOW"],
    HORN: ["HORN-SAT"],
};
const TH_EXTRA: Record<string, string[]> = {
    "t17-10": ["COQSATi"],
    "strategic-companies": ["COSC"],
    "fo-indecidibile": ["FOV", "FOS"],
    "validity-conp": ["COHP"],
    "co-hamilton-pi2": ["COHP"],
    "tsp-d": ["HP"],
    "exact-tsp-np-hard": ["HP"],
    "grover-np": ["KNAP"],
};
const TH_SKIP: Record<string, string[]> = { "validity-conp": ["HP"], "co-hamilton-pi2": ["HP"] };

const TH_PROB: Record<string, string[]> = {};

/* pedici Unicode delle formule ($\mathrm{QSAT}_i$ → QSATᵢ) riportati a lettere e cifre, come nei nomi HTML (QSAT<sub>i</sub> → QSATi) */
const flat = (h: string) =>
    thPlain(h)
        .replace(/[₀-₉]/g, (c) => String(c.charCodeAt(0) - 0x2080))
        .replace(/ᵢ/g, "i");

/** id dei problemi citati da un teorema */
export function thProblems(t: Theorem): string[] {
    if (TH_PROB[t.id]) return TH_PROB[t.id];
    const txt = " " + flat(t.nome + " · " + t.enunciato) + " ";
    const esc = (x: string) => flat(x).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const hit = (n: string) => new RegExp(`(^|[^A-Za-z0-9-])${esc(n)}(?![A-Za-z0-9₀-₉ᵢ-])`).test(txt);
    const out = PROBLEMS.filter((p) => [p.name, ...(TH_ALIAS[p.id] || [])].some(hit))
        .map((p) => p.id)
        .filter((id) => !(TH_SKIP[t.id] || []).includes(id));
    (TH_EXTRA[t.id] || []).forEach((id) => {
        if (PROBLEM_BY[id] && !out.includes(id)) out.push(id);
    });
    return (TH_PROB[t.id] = out);
}

export const theoremsForProblem = (pid: string) => THEOREMS.filter((t) => thProblems(t).includes(pid));

const chapNum = (c: string) => {
    const m = String(c || "").match(/^\s*(\d+)/);
    return m ? +m[1] : 999;
};

/** teoremi raggruppati per capitolo, in ordine di capitolo */
export function groupByChapter(list: Theorem[]) {
    const groups: { k: string; items: Theorem[] }[] = [];
    list.forEach((t) => {
        const k = String(t.capitolo || "Altro");
        let g = groups.find((x) => x.k === k);
        if (!g) groups.push((g = { k, items: [] }));
        g.items.push(t);
    });
    return groups.sort((a, b) => chapNum(a.k) - chapNum(b.k));
}

/** teoremi raggruppati per quanto servono nelle tracce, i più chiesti per primi */
export function groupByPriority(list: Theorem[]) {
    return PRIORITY_ORDER.map((k) => ({
        k: k as string,
        items: list
            .filter((t) => (PROOF[t.id]?.priorita ?? "fuori") === k)
            .sort((a, b) => (PROOF[b.id]?.frequenza ?? 0) - (PROOF[a.id]?.frequenza ?? 0)),
    })).filter((g) => g.items.length);
}

export const chapterTitle = (k: string) => (/^\d/.test(k) ? "Capitolo " + k : k);

/** dove si trova: fonti, oppure capitolo e lezione */
export const whereText = (t: Theorem) =>
    (t.fonti || []).length
        ? t.fonti.join("; ")
        : [
              t.capitolo ? `dispensa cap. ${t.capitolo}${t.pagina ? `, p. ${t.pagina}` : ""}` : "",
              t.lezione ? `Lezione ${t.lezione}` : "",
          ]
              .filter(Boolean)
              .join(" · ");

/* testo di ricerca di ogni teorema, calcolato una volta sola */
const SEARCH = new Map(
    THEOREMS.map((t) => [
        t,
        thNorm(t.nome + " " + t.enunciato + " " + (t.intuizione || "") + " " + (t.capitolo || "")),
    ]),
);

export function filterTheorems(q: string, cls: string, provedOnly = false) {
    const nq = thNorm(q).trim();
    return THEOREMS.filter(
        (t) =>
            (!provedOnly || t.prova === "nel corso") &&
            (cls === "all" || (t.classi || []).includes(cls as ClassId)) &&
            (!nq || SEARCH.get(t)!.includes(nq)),
    );
}
