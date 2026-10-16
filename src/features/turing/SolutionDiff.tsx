"use client";

import type { MachineSpec } from "@/data/turing/machines";
import type { DiffRow } from "./diff";
import type { Program } from "./machine";

import { useMemo } from "react";

import Arrow from "@/components/Arrow";
import { ui } from "@/lib/tokens";
import { cellsOf, diffRules } from "./diff";
import { parseProgram } from "./machine";
import TransitionTable, { rowsFrom } from "./TransitionTable";

const MOVE: Record<string, string> = { "1": "→", "-1": "←", "0": "−" };
const SUB = "₁₂₃";
const KIND = { same: "=", changed: "≠", missing: "manca", extra: "in più" } as const;
const ROW = {
    same: "text-muted",
    changed: "",
    missing: "bg-ok-soft text-ok",
    extra: "bg-proved-soft text-proved",
} as const;
const TH = "px-2 py-2 text-center font-medium whitespace-nowrap";
const TD = "px-2 py-2 text-center whitespace-nowrap";

/** La tua tabella confrontata con la soluzione, riga per riga: celle diverse, righe che mancano, righe in più. */
export default function SolutionDiff({ program, m }: { program: Program | null; m: MachineSpec }) {
    const sol = useMemo(() => parseProgram(m.source).program!, [m]);
    const diff = useMemo(
        () => (program && program.tapes === sol.tapes ? diffRules(program, sol, m) : null),
        [program, sol, m],
    );
    if (!program) return <p className={ui.hint}>Correggi gli errori della tabella per vedere le differenze.</p>;
    if (!diff)
        return (
            <div className="flex min-w-0 flex-col gap-2">
                <p className={ui.hint}>
                    La tua macchina usa {program.tapes} nastri, la soluzione {sol.tapes}: le righe non si possono
                    confrontare. Ecco la soluzione.
                </p>
                <TransitionTable rows={rowsFrom(m.source, m.tapes)} tapes={m.tapes} />
            </div>
        );

    const k = sol.tapes;
    const tapes = Array.from({ length: k }, (_, t) => t);
    const sub = (t: number) => (k > 1 ? SUB[t] : "");
    /* indici in cellsOf: stato 0, letti 1…k, nuovo stato k+1, scritti k+2…, mosse 2k+2… */
    const cols: (number | "arrow")[] = [
        0,
        ...tapes.map((t) => 1 + t),
        "arrow",
        k + 1,
        ...tapes.flatMap((t) => [2 + k + t, 2 + 2 * k + t]),
    ];
    const show = (i: number, v: string) => (i >= 2 + 2 * k ? MOVE[v] : v);
    const count = (kind: DiffRow["kind"]) => diff.rows.filter((r) => r.kind === kind).length;

    return (
        <div className="flex min-w-0 flex-col gap-2">
            <p className="font-ui text-sm">
                <b>{count("same")}</b> righe uguali · <b>{count("changed")}</b> diverse · <b>{count("missing")}</b>{" "}
                mancano nella tua · <b>{count("extra")}</b> solo nella tua
            </p>
            <p className="font-ui text-muted text-sm">
                Nelle celle diverse, sopra <del className="text-proved">la tua</del> e sotto{" "}
                <ins className="text-ok font-semibold no-underline">la soluzione</ins>.
                {diff.renamed.length > 0 &&
                    ` Stati con un altro nome: ${diff.renamed.map(([u, s]) => `${u} = ${s}`).join(", ")}.`}{" "}
                Una riga diversa o in più non è per forza sbagliata: la prova vera sono i casi di prova.
            </p>
            <div className="border-line-strong bg-bg overflow-x-auto rounded-lg border">
                <table className="w-full border-collapse font-mono text-base">
                    <thead className="bg-sunk font-ui text-muted text-xs">
                        <tr className="divide-line divide-x">
                            <td className="w-px" />
                            <th scope="col" className={`${TH} w-px`}>
                                Tua
                            </th>
                            <th scope="col" className={`${TH} w-px`}>
                                Sol.
                            </th>
                            <th scope="col" className={`${TH} w-px`}>
                                Stato
                            </th>
                            {tapes.map((t) => (
                                <th key={t} scope="col" className={`${TH} w-px`}>
                                    Legge{sub(t)}
                                </th>
                            ))}
                            <td className="w-px" />
                            <th scope="col" className={`${TH} w-px`}>
                                Nuovo stato
                            </th>
                            {tapes.map((t) => [
                                <th key={`w${t}`} scope="col" className={`${TH} w-px`}>
                                    Scrive{sub(t)}
                                </th>,
                                <th key={`m${t}`} scope="col" className={`${TH} w-px`}>
                                    Mossa{sub(t)}
                                </th>,
                            ])}
                            <th scope="col" className={`${TH} text-left`}>
                                Commento della soluzione
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {diff.rows.map((r, n) => {
                            const mine = r.kind === "missing" ? null : cellsOf(r.mine);
                            const named = r.kind === "missing" ? null : cellsOf(r.mine, diff.name);
                            const want = r.kind === "extra" ? null : cellsOf(r.sol);
                            return (
                                <tr key={n} className={`border-line divide-line divide-x border-t ${ROW[r.kind]}`}>
                                    <td className="font-ui px-2 text-center text-xs font-semibold whitespace-nowrap">
                                        {KIND[r.kind]}
                                    </td>
                                    <td className="font-ui text-muted px-2 text-center text-xs">
                                        {r.kind !== "missing" && r.mine.line}
                                    </td>
                                    <td className="font-ui text-muted px-2 text-center text-xs">
                                        {r.kind !== "extra" && r.sol.line}
                                    </td>
                                    {cols.map((i) => {
                                        if (i === "arrow")
                                            return (
                                                <td key={i} className="text-accent px-1">
                                                    <Arrow />
                                                </td>
                                            );
                                        if (!mine || !named || !want)
                                            return (
                                                <td key={i} className={TD}>
                                                    {show(i, (mine ?? want)![i])}
                                                </td>
                                            );
                                        return named[i] === want[i] ? (
                                            <td key={i} className={TD}>
                                                {show(i, mine[i])}
                                            </td>
                                        ) : (
                                            <td key={i} className={`${TD} bg-open-soft`}>
                                                <span className="flex flex-col leading-tight">
                                                    <del className="text-proved text-sm">{show(i, mine[i])}</del>
                                                    <ins className="text-ok font-semibold no-underline">
                                                        {show(i, want[i])}
                                                    </ins>
                                                </span>
                                            </td>
                                        );
                                    })}
                                    <td className="font-ui min-w-48 px-2 text-left text-sm">
                                        {r.kind === "extra" ? r.mine.note : r.sol.note}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
