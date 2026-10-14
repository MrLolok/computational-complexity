import { C, IDS, NAME, PLAIN } from "@/data/classes";
import { PROBLEMS } from "@/data/problems";
import { QUANTUM_CLASSES, RANDOM_CLASSES, SPECIAL_TERMS } from "@/data/learning";

export const stripHtml = (s: string) => s.replace(/<[^>]*>/g, "").replace(/\{\{(\w+)\}\}/g, (_, id: string) => id in PLAIN ? PLAIN[id as keyof typeof PLAIN] : id).replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();
export const shorten = (s: string, max = 260) => s.length > max ? s.slice(0, s.lastIndexOf(" ", max)) + "…" : s;
export type GlossaryEntry = { name: string; definition: string; href: string };
export const GLOSSARY: Record<string, GlossaryEntry> = Object.fromEntries([
  ...IDS.map(id => [id, { name: stripHtml(NAME[id]), definition: shorten(stripHtml(C[id].intu)), href: `/classi/${id}` }]),
  ...PROBLEMS.map(p => [`problem:${p.id}`, { name: p.name, definition: shorten(stripHtml(p.def)), href: `/problemi/${p.id}` }]),
  ...[...RANDOM_CLASSES, ...QUANTUM_CLASSES].map(c => [c.id, { name: c.name, definition: c.definition, href: `/classi#${c.id === "BQP" ? "quantistiche" : "probabilistiche"}` }]),
  ...SPECIAL_TERMS.map(t => [t.id, { name: t.name, definition: t.definition, href: t.href }]),
]);
const aliases: [string, string][] = [
  ...IDS.map(id => [stripHtml(NAME[id]), id] as [string, string]),
  ...PROBLEMS.flatMap(p => [p.name, ...(p.al ? [p.al] : [])].map(name => [name, `problem:${p.id}`] as [string, string])),
  ...[...RANDOM_CLASSES, ...QUANTUM_CLASSES].map(c => [c.name, c.id] as [string, string]),
  ...SPECIAL_TERMS.flatMap(t => t.aliases.map(a => [a, t.id] as [string, string])),
  ["2-SAT", "problem:SAT2"], ["3-SAT", "problem:SAT3"], ["3-COL", "problem:COL3"], ["2-COL", "problem:COL2"],
  ["UNSAT", "problem:COSAT"], ["QSAT", "problem:QSAT"], ["CIRC SAT", "problem:CIRC"], ["SCHÖNFINKEL-BERNAYS SAT", "problem:SB"],
];
for (let i = 1; i <= 4; i++) {
  for (const [letter, base, first] of [["Σ", "SIGMAi", "∃"], ["Π", "PIi", "∀"], ["Δ", "DELTA2", ""]]) {
    const name = `${letter}${"₀₁₂₃₄"[i]}ᴾ`;
    const key = `${letter}${i}`;
    GLOSSARY[key] = { name, definition: first ? `${i} blocch${i === 1 ? "o" : "i"} alternat${i === 1 ? "o" : "i"} di quantificatori, iniziando con ${first}, seguiti da un controllo polinomiale. ${i === 1 ? (letter === "Σ" ? "Coincide con NP." : "Coincide con coNP.") : "Un livello della gerarchia polinomiale."}` : `Tempo polinomiale deterministico con un oracolo Σ del livello ${i - 1}.`, href: `/piani#${letter === "Σ" ? "S" : letter === "Π" ? "P" : "D"}${i}` };
    aliases.push([name, key]);
    if (i === 1 && !first) GLOSSARY[key].href = "/classi/P";
    if (i > 2 && !first) GLOSSARY[key].href = `/classi/${base}`;
  }
}
const keys = new Map(aliases);
const escaped = [...keys.keys()].sort((a, b) => b.length - a.length).map(s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const terms = new RegExp(`(?<![\\p{L}\\p{N}_])(${escaped.join("|")})(?![\\p{L}\\p{N}_])`, "gu");
export const termKey = (text: string) => keys.get(text);
export function glossaryParts(text: string) {
  const parts: { text: string; key?: string }[] = [];
  let start = 0;
  for (const match of text.matchAll(terms)) {
    if (match.index > start) parts.push({ text: text.slice(start, match.index) });
    parts.push({ text: match[0], key: keys.get(match[0]) });
    start = match.index + match[0].length;
  }
  if (start < text.length) parts.push({ text: text.slice(start) });
  return parts;
}
