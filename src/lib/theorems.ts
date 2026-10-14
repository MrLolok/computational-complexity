/* Collegamenti tra teoremi, problemi e classi (dal modulo TEOREMI della pagina). */
import type { ClassId } from "@/data/classes";
import { PROBLEMS, PROBLEM_BY } from "@/data/problems";
import { THEOREMS, type Theorem } from "@/data/theorems";

export const thPlain = (h: string | null | undefined) => String(h || "").replace(/<[^>]+>/g, "");
export const thNorm = (s: string) =>
  thPlain(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/* problemi citati nell'enunciato: il nome deve comparire intero, non dentro un altro nome (SAT non dentro SAT-UNSAT) */
const TH_ALIAS: Record<string, string[]> = { COL2: ["2-COLORING"], COL3: ["3-COLORING"], MAXFLOW: ["MAX-FLOW"], HORN: ["HORN-SAT"] };
const TH_EXTRA: Record<string, string[]> = {
  "t17-10": ["COQSATi"],
  "strategic-companies": ["COSC"],
  "fo-indecidibile": ["FOV", "FOS"],
  "godel-completezza": ["FOV"],
  "validity-conp": ["COHP"],
  "co-hamilton-pi2": ["COHP"],
};
const TH_SKIP: Record<string, string[]> = { "validity-conp": ["HP"], "co-hamilton-pi2": ["HP"] };

const TH_PROB: Record<string, string[]> = {};

/** id dei problemi citati da un teorema */
export function thProblems(t: Theorem): string[] {
  if (TH_PROB[t.id]) return TH_PROB[t.id];
  const txt = " " + thPlain(t.nome + " · " + t.enunciato + " " + (t.correzione || "")) + " ";
  const esc = (x: string) => thPlain(x).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
export const theoremsForClass = (cls: ClassId) => THEOREMS.filter((t) => (t.classi || []).includes(cls));

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

export const chapterTitle = (k: string) => (/^\d/.test(k) ? "Capitolo " + k : k);

/** dove si trova: fonti, oppure capitolo e lezione */
export const whereText = (t: Theorem) =>
  (t.fonti || []).length
    ? t.fonti.join("; ")
    : [t.capitolo ? `dispensa cap. ${t.capitolo}${t.pagina ? `, p. ${t.pagina}` : ""}` : "", t.lezione ? `Lezione ${t.lezione}` : ""]
        .filter(Boolean)
        .join(" · ");

export function filterTheorems(q: string, cls: string) {
  const nq = thNorm(q).trim();
  return THEOREMS.filter(
    (t) =>
      (cls === "all" || (t.classi || []).includes(cls as ClassId)) &&
      (!nq || thNorm(t.nome + " " + t.enunciato + " " + (t.intuizione || "") + " " + (t.capitolo || "")).includes(nq)),
  );
}
