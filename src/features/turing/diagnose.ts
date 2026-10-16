/* Dove sbaglia una macchina: avvisi sulle righe (prima di eseguirla) e, sui casi di prova falliti,
   la riga in cui la macchina si ferma con il risultato sbagliato o la riga che manca. */
import type { MachineSpec } from "@/data/turing/machines";
import type { ParseError, Program } from "./machine";

import { BLANK, HALT, ORACLES, QUERY, run } from "./machine";

const BITS = new Set(["b", "b'"]);
const JOLLY = new Set(["b", "b'", "b̄", "σ"]);

/** righe sospette: non sono errori di sintassi, ma di solito sono sbagli */
export function lint(program: Program, m?: MachineSpec): ParseError[] {
    const out: ParseError[] = [];
    const { rules } = program;
    const has = (state: string) => rules.some((r) => r.from === state);
    const asks = rules.some((r) => r.to === QUERY);
    const reached = (state: string) =>
        state === "s" || rules.some((r) => r.to === state) || (asks && (state === "qYES" || state === "qNO"));
    const seen = new Map<string, number>();
    const warned = new Set<string>();
    for (const r of rules) {
        r.write.forEach((w, t) => {
            const read = r.read[t];
            if (BITS.has(w) && BITS.has(read) && w !== read)
                out.push({
                    line: r.line,
                    message: `sul nastro ${t + 1} leggi ${read} ma scrivi ${w}: così ci copi il bit letto sull'altro nastro. Per lasciarlo com'è scrivi ${read}`,
                });
        });
        const left = `${r.from} ${r.read.join(" ")}`;
        if (m && !m.nondet && seen.has(left))
            out.push({
                line: r.line,
                message: `stato e simboli letti uguali alla riga ${seen.get(left)}: la macchina diventa nondeterministica`,
            });
        else seen.set(left, r.line);
        if (!HALT.has(r.to) && r.to !== QUERY && !has(r.to) && !warned.has(`to ${r.to}`)) {
            warned.add(`to ${r.to}`);
            out.push({
                line: r.line,
                message: `lo stato ${r.to} non ha righe: lì la macchina si blocca e rigetta`,
            });
        }
        if (!reached(r.from) && !warned.has(`from ${r.from}`)) {
            warned.add(`from ${r.from}`);
            out.push({ line: r.line, message: `nessuna riga porta nello stato ${r.from}: questa riga non si usa mai` });
        }
        if (m?.kind === "decisione" && r.to === "h")
            out.push({ line: r.line, message: "una macchina di decisione termina in yes o in no, non in h" });
    }
    return out.sort((a, b) => a.line - b.line);
}

/** un errore emerso dai casi di prova: la riga coinvolta (null se manca) e il primo input che lo mostra */
export type Issue = { row: number | null; text: string; example: string; count: number };

/** esegue i casi di prova e raggruppa i fallimenti per riga, dal più frequente */
export function check(program: Program, m: MachineSpec) {
    const oracle = m.oracle ? ORACLES[m.oracle] : undefined;
    const tests = m.tests();
    const issues = new Map<string, Issue>();
    /** per ogni stato, le combinazioni di simboli letti per cui manca una riga */
    const gaps = new Map<string, Map<string, string[]>>();
    let ok = 0;
    for (const x of tests) {
        const e = m.expected(x)!;
        const o = run(program, x, { oracle });
        if (e.result === "h" ? o.result === "h" && o.output === e.output : o.result === e.result) {
            ok++;
            continue;
        }
        const want = e.result === "h" ? `il risultato ${e.output}` : e.result;
        const last = o.path.at(-1);
        let row = last?.rule?.line ?? null;
        let key: string, text: string;
        if (o.result === "limit") {
            key = "limit";
            text = "la macchina non si ferma (oltre 5000 passi): è l'ultima riga usata";
        } else if (m.nondet && e.result === "yes") {
            key = "nondet";
            row = null;
            text = "nessun ramo accetta, ma la risposta giusta è yes";
        } else if (o.reason && last && o.reason.startsWith("nessuna riga")) {
            const c = last.config;
            const read = c.tapes.map((tape, t) => tape[c.heads[t]] ?? BLANK);
            key = `manca ${c.state}`;
            row = null;
            if (!gaps.has(c.state)) gaps.set(c.state, new Map());
            gaps.get(c.state)!.set(read.join(" "), read);
            text = `serve ${want}`;
        } else if (o.reason) {
            key = `fuori ${row}`;
            text = "porta la testina a sinistra di ▷";
        } else {
            const got = o.result === "h" ? `il risultato ${o.output || "vuoto"}` : o.result;
            key = `fine ${row} ${o.result}`;
            text = `termina in ${o.result === "h" ? `h con ${got}` : got}, ma la risposta giusta è ${want}`;
        }
        const issue = issues.get(key);
        if (issue) issue.count++;
        else issues.set(key, { row, text, example: x, count: 1 });
    }
    /* una sola voce per stato, con tutte le combinazioni che mancano */
    for (const [state, combos] of gaps) {
        const issue = issues.get(`manca ${state}`)!;
        const reads = [...combos.values()];
        const k = reads[0].length;
        const list = reads
            .slice(0, 6)
            .map((r) => r.map((x) => `«${x}»`).join(" e "))
            .join(", ");
        issue.text =
            `nello stato ${state} nessuna riga copre ${list}${reads.length > 6 ? "…" : ""}` +
            `${k === 2 ? " (nastro 1 e nastro 2)" : k > 2 ? " (un simbolo per nastro)" : ""}` +
            `: la macchina si blocca e rigetta, ma ${issue.text}${k > 1 ? fixedTape(program, state, reads) : ""}`;
    }
    return { ok, tot: tests.length, issues: [...issues.values()].sort((a, b) => b.count - a.count) };
}

/** con più nastri: se le righe dello stato leggono tutte lo stesso simbolo su un nastro e lì c'è altro, la testina non è dove si pensa */
function fixedTape(program: Program, state: string, reads: string[][]) {
    const rules = program.rules.filter((r) => r.from === state);
    for (let t = 0; rules.length && t < reads[0].length; t++) {
        const used = new Set(rules.map((r) => r.read[t]));
        const [only] = used;
        if (used.size === 1 && !JOLLY.has(only) && reads.some((r) => r[t] !== only))
            return `. Tutte le righe dello stato ${state} leggono «${only}» sul nastro ${t + 1}, ma qui la testina del nastro ${t + 1} è su un altro simbolo: se va bene qualsiasi simbolo usa σ (o b per un bit)`;
    }
    return "";
}
