import "server-only";

import type { TraceRef } from "@/data/traces/traces";

import { PROBLEMS } from "@/data/problems/problems";
import { TRACES } from "@/data/traces/traces";
import { searchKey } from "@/lib/plainText";

const normalize = (text: string) => {
    let value = text.replace(/<[^>]+>/g, "");
    for (let i = 0; i < 3; i++) value = value.replace(/\\(?:mathrm|text)\{([^{}]*)\}/g, "$1");
    return searchKey(
        value
            .replace(/[₀-₉ᵢ]/g, (c) => (c === "ᵢ" ? "i" : String("₀₁₂₃₄₅₆₇₈₉".indexOf(c))))
            .replace(/_/g, "")
            .replace(/\\ /g, " ")
            .replace(/\\[a-zA-Z]+/g, " "),
    )
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
};
const extra: Record<string, string[]> = {
    SAT2: ["2SAT"],
    SAT3: ["3SAT"],
    COL2: ["2-COLORING"],
    COL3: ["3-COLORING"],
    MAXFLOW: ["MAXFLOW"],
    HORN: ["HORN-SAT"],
    COSAT: ["UNSAT"],
    SB: ["SB-SAT", "SCHOENFINKEL-BERNAYS SAT"],
    FOV: ["FIRST ORDER VALIDITY"],
    FOS: ["FIRST ORDER SAT"],
};
const names = new Map<string, string>();
for (const p of PROBLEMS) for (const name of [p.name, ...(extra[p.id] ?? [])]) names.set(normalize(name), p.id);
for (let i = 1; i <= 9; i++) {
    names.set(`qsat${i}`, "QSATi");
    names.set(`qsat ${i}`, "QSATi");
    names.set(`co qsat${i}`, "COQSATi");
    names.set(`co qsat ${i}`, "COQSATi");
}
// Consuma prima i nomi lunghi: SAT non viene contato dentro 3-SAT o SAT-UNSAT.
const pattern = new RegExp(
    `(?<![a-z0-9])(${[...names.keys()].sort((a, b) => b.length - a.length).join("|")})(?![a-z0-9])`,
    "g",
);
export const PROBLEM_TRACE_REFS: Record<string, TraceRef[]> = Object.fromEntries(
    PROBLEMS.map((p) => [p.id, [] as TraceRef[]]),
);
for (const trace of TRACES) {
    for (const question of [
        ...trace.questions.map((q) => ({ n: q.n, text: q.text })),
        ...(trace.q8 ? [{ n: 8, text: trace.q8.title }] : []),
    ]) {
        const text = normalize(question.text);
        const ids = new Set([...text.matchAll(pattern)].map((m) => names.get(m[0])!));
        if (text.includes("primo ordine")) {
            if (text.includes("validita")) ids.add("FOV");
            if (text.includes("soddisfacibil") || text.includes("soddisfacibile")) ids.add("FOS");
        }
        for (const id of ids) PROBLEM_TRACE_REFS[id].push({ code: trace.code, n: question.n });
    }
}
