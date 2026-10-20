/* Collegamenti tra teoremi, problemi e classi (dal modulo TEOREMI della pagina). */
import type { ClassId } from "@/data/classes/classes";
import type { Theorem } from "@/data/theorems/theorems";

import { PROBLEM_BY, PROBLEMS } from "@/data/problems/problems";
import { isRequiredProof } from "@/data/theorems/premise";
import { PRIORITY_ORDER, PROOF } from "@/data/theorems/proofs";
import { THEOREMS } from "@/data/theorems/theorems";
import { htmlToPlain, searchKey } from "@/lib/plainText";

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
    htmlToPlain(h)
        .replace(/[₀-₉]/g, (c) => String(c.charCodeAt(0) - 0x2080))
        .replace(/ᵢ/g, "i");

/** id dei problemi citati da un teorema */
export function problemsInTheorem(t: Theorem): string[] {
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

export const theoremsForProblem = (pid: string) => THEOREMS.filter((t) => problemsInTheorem(t).includes(pid));

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

/** dove si trova: fonti, oppure capitolo e pagina della dispensa */
export const whereText = (t: Theorem) =>
    (t.fonti || []).length
        ? t.fonti.join("; ")
        : t.capitolo
          ? `dispensa cap. ${t.capitolo}${t.pagina ? `, p. ${t.pagina}` : ""}`
          : "";

/* teoremi che dicono che un problema specifico è completo o difficile per una classe (CLIQUE NP-completo, QSAT PSPACE-completo…);
   restano fuori i risultati generali sulla completezza (un completo per due classi, il complemento di un NP-completo) */
const COMPLETENESS = new Set([
    "cook-levin",
    "3sat",
    "max2sat",
    "independent-set",
    "clique-nodecover",
    "hamilton-path",
    "tsp-d",
    "3-coloring",
    "tripartite-matching",
    "set-problems",
    "integer-programming",
    "knapsack",
    "validity-conp",
    "exact-tsp-np-hard",
    "sat-unsat-dp",
    "altri-dp-completi",
    "circ",
    "t17-10",
    "strategic-companies",
    "qsat-pspace",
    "co-hamilton-pi2",
    "db-queries",
    "geography",
    "go",
    "nexp-completi",
    "2sat-p-completo",
    "riepilogo-p",
]);
export const isCompleteness = (t: Theorem) => COMPLETENESS.has(t.id);
export const COMPLETENESS_COUNT = THEOREMS.filter(isCompleteness).length;

/* testo di ricerca di ogni teorema, calcolato una volta sola */
const SEARCH = new Map(
    THEOREMS.map((t) => [
        t,
        searchKey(htmlToPlain(t.nome + " " + t.enunciato + " " + (t.intuizione || "") + " " + (t.capitolo || ""))),
    ]),
);

export function filterTheorems(
    q: string,
    cls: string,
    provedOnly = false,
    hideCompleteness = false,
    requiredOnly = false,
) {
    const nq = searchKey(htmlToPlain(q));
    return THEOREMS.filter(
        (t) =>
            (!provedOnly || t.prova === "nel corso") &&
            (!requiredOnly || isRequiredProof(t.id)) &&
            (!hideCompleteness || !isCompleteness(t)) &&
            (cls === "all" || (t.classi || []).includes(cls as ClassId)) &&
            (!nq || SEARCH.get(t)!.includes(nq)),
    );
}
