/* Confronto riga per riga tra la tabella dell'utente e la soluzione, come un diff.
   Gli stati possono avere nomi diversi: si abbinano eseguendo le due macchine in parallelo finché nastri e
   testine coincidono. Poi ogni riga della soluzione va con la riga dell'utente più simile (più di metà celle uguali). */
import type { MachineSpec } from "@/data/turing/machines";
import type { Config, Oracle, Program, Rule } from "./machine";

import { applicable, apply, ask, BLANK, halted, initial, ORACLES, QUERY } from "./machine";

export type DiffRow =
    | { kind: "same" | "changed"; mine: Rule; sol: Rule }
    | { kind: "missing"; sol: Rule }
    | { kind: "extra"; mine: Rule };

/** celle confrontabili di una riga: stato, letti, nuovo stato, scritti, mosse */
export const cellsOf = (r: Rule, name = (s: string) => s) => [
    name(r.from),
    ...r.read,
    name(r.to),
    ...r.write,
    ...r.move.map(String),
];

function next(p: Program, c: Config, oracle?: Oracle): Config | null {
    if (halted(p, c, oracle)) return null;
    if (c.state === QUERY && oracle) return ask(c, oracle);
    const options = applicable(p, c);
    return options.length === 1 ? apply(options[0], c) : null;
}
const trim = (tape: string[]) => {
    let n = tape.length;
    while (n > 0 && tape[n - 1] === BLANK) n--;
    return tape.slice(0, n).join(" ");
};
/** stati con un significato fisso: non si rinominano mai */
const FIXED = new Set(["s", "h", "yes", "no", QUERY, "qYES", "qNO"]);
const sameTapes = (a: Config, b: Config) =>
    a.heads.every((h, t) => h === b.heads[t]) && a.tapes.every((tape, t) => trim(tape) === trim(b.tapes[t]));

/** il nome nella soluzione di ogni stato dell'utente, dai passi in cui le due macchine sono nella stessa configurazione */
function stateMap(mine: Program, sol: Program, m: MachineSpec) {
    const votes = new Map<string, Map<string, number>>();
    const oracle = m.oracle ? ORACLES[m.oracle] : undefined;
    for (const x of mine.tapes === sol.tapes ? m.tests().slice(0, 200) : []) {
        let a: Config | null = initial(mine, x);
        let b: Config | null = initial(sol, x);
        for (let i = 0; a && b && i < 500 && sameTapes(a, b); i++) {
            if (!FIXED.has(a.state) && !FIXED.has(b.state)) {
                const v = votes.get(a.state) ?? new Map<string, number>();
                votes.set(a.state, v.set(b.state, (v.get(b.state) ?? 0) + 1));
            }
            a = next(mine, a, oracle);
            b = next(sol, b, oracle);
        }
    }
    const map = new Map<string, string>();
    for (const [u, v] of votes) map.set(u, [...v].sort((p, q) => q[1] - p[1])[0][0]);
    return map;
}

export function diffRules(mine: Program, sol: Program, m: MachineSpec) {
    const map = stateMap(mine, sol, m);
    const name = (s: string) => map.get(s) ?? s;
    const score = (a: Rule, b: Rule) => {
        const y = cellsOf(b);
        return cellsOf(a, name).filter((c, i) => c === y[i]).length;
    };
    const total = cellsOf(sol.rules[0]).length;
    const candidates = mine.rules
        .flatMap((a) => sol.rules.map((b) => ({ a, b, s: score(a, b) })))
        .filter((p) => 2 * p.s > total)
        .sort((p, q) => q.s - p.s || Math.abs(p.a.line - p.b.line) - Math.abs(q.a.line - q.b.line));
    const paired = new Map<Rule, Rule>();
    const used = new Set<Rule>();
    for (const { a, b } of candidates)
        if (!used.has(a) && !paired.has(b)) {
            used.add(a);
            paired.set(b, a);
        }
    const rows: DiffRow[] = sol.rules.map((b) => {
        const a = paired.get(b);
        return a ? { kind: score(a, b) === total ? "same" : "changed", mine: a, sol: b } : { kind: "missing", sol: b };
    });
    /* le righe solo dell'utente vanno dopo l'ultima riga dello stesso stato */
    for (const a of mine.rules) {
        if (used.has(a)) continue;
        const at = rows.findLastIndex((r) =>
            r.kind === "extra" ? r.mine.from === a.from : r.sol.from === name(a.from),
        );
        rows.splice(at < 0 ? rows.length : at + 1, 0, { kind: "extra", mine: a });
    }
    return { rows, name, renamed: [...map].filter(([u, s]) => u !== s) };
}
