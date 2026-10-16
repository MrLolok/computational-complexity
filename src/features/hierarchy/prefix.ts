import type { TowerId } from "@/data/hierarchy/tower";

import { hPi, hS, m, qsat, quant, ys } from "./notation";

/* Costruttore di prefissi: a quale piano porta una sequenza di quantificatori. */
export type QLetter = "E" | "A";
/** raw, args e merged sono LaTeX (senza $); expl e comp sono HTML con formule $…$ */
export type PrefixInfo = {
    raw: string;
    args: string;
    merged: string | null;
    k: number;
    expl: string;
    comp: string;
    tid: TowerId | null;
};
export function analyzePrefix(QB: QLetter[]): PrefixInfo {
    const raw = QB.map((q, j) => quant(q) + ys(j + 1)).join("\\ ");
    const blocks: { q: QLetter; v: number[] }[] = [];
    QB.forEach((q, j) => {
        if (blocks.length && blocks[blocks.length - 1].q === q) blocks[blocks.length - 1].v.push(j + 1);
        else blocks.push({ q, v: [j + 1] });
    });
    const k = blocks.length,
        isMerged = blocks.some((b) => b.v.length > 1);
    let expl: string, comp: string, tid: TowerId | null;
    if (!k) {
        expl = "Nessun quantificatore: resta solo il controllo polinomiale $R(x)$.";
        comp = "—";
        tid = "L0";
    } else {
        const isS = blocks[0].q === "E",
            cls = isS ? hS(k) : hPi(k);
        tid = k <= 4 ? (`${isS ? "S" : "P"}${k}` as TowerId) : null;
        expl = `${k} blocc${k === 1 ? "o" : "hi"} alternat${k === 1 ? "o" : "i"}, il primo è ${isS ? "$\\exists$" : "$\\forall$"}: la classe è ${m(cls + (k === 1 ? (isS ? " = \\mathrm{NP}" : " = \\mathrm{coNP}") : ""))}. Una macchina che lo decide: ${isS ? "nondeterministica" : "il complemento di una nondeterministica"} polinomiale con oracolo ${k === 1 ? "P (cioè nessun oracolo utile)" : m(hS(k - 1))}.`;
        comp = `${m(qsat(k, !isS) + (k === 1 && isS ? " = \\mathrm{SAT}" : ""))}${k === 1 && !isS ? " ($= \\mathrm{co\\text{-}SAT}$)" : ""} è completo per questa classe.`;
    }
    return {
        raw,
        args: QB.length ? ", " + QB.map((_, j) => ys(j + 1)).join(", ") : "",
        merged: isMerged
            ? blocks
                  .map((b) => quant(b.q) + (b.v.length > 1 ? "(" + b.v.map(ys).join(", ") + ")" : ys(b.v[0])))
                  .join("\\ ")
            : null,
        k,
        expl,
        comp,
        tid,
    };
}
