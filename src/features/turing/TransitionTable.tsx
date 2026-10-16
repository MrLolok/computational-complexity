"use client";

import type { MdtRow } from "@/store/progressSlice";
import type { ParseError } from "./machine";

import { useRef } from "react";

import Arrow from "@/components/Arrow";
import { MOVES, parseProgram, sym } from "./machine";

const PALETTE = ["▷", "⊔", "b", "b'", "b̄", "σ", "yes", "no", "h"];
const MOVE_OPTIONS = [
    ["R", "→"],
    ["L", "←"],
    ["S", "−"],
] as const;
const MOVE_NAME: Record<string, string> = { 1: "R", [-1]: "L", 0: "S" };
const SUB = "₁₂₃";

const fit = (a: string[], k: number) => Array.from({ length: k }, (_, t) => a[t] ?? "");
const blank = (k: number): MdtRow => ({
    from: "",
    read: fit([], k),
    to: "",
    write: fit([], k),
    move: fit([], k),
    note: "",
});

/** righe della tabella da un programma in testo (soluzioni, modelli, vecchie bozze); senza k, i nastri della prima riga */
export function rowsFrom(source: string, k?: number): MdtRow[] {
    return source
        .split("\n")
        .map((raw) => raw.split("#"))
        .filter(([code]) => code.trim())
        .map(([code, ...rest]) => {
            const [left = "", right = ""] = code.split("->");
            const l = left.trim().split(/\s+/);
            const r = right.trim().split(/\s+/);
            const tapes = (k ??= Math.max(1, l.length - 1));
            const pairs = Array.from({ length: tapes }, (_, t) => [r[1 + 2 * t] ?? "", r[2 + 2 * t] ?? ""]);
            return {
                from: l[0],
                read: fit(l.slice(1), tapes).map(sym),
                to: r[0],
                write: pairs.map(([w]) => sym(w)),
                move: pairs.map(([, m]) => MOVE_NAME[MOVES[m]] ?? ""),
                note: rest.join("#").trim(),
            };
        });
}

/** il programma per il simulatore: una riga di testo per riga della tabella, così «Riga n» indica la riga giusta */
export function compile(rows: MdtRow[]) {
    const holes: ParseError[] = [];
    const source = rows
        .map((r, i) => {
            const cells = [r.from, ...r.read, r.to, ...r.write, ...r.move];
            if (cells.every(Boolean)) {
                const right = r.write.map((w, t) => `${w} ${r.move[t]}`).join(" ");
                return `${r.from} ${r.read.join(" ")} -> ${r.to} ${right}${r.note ? ` # ${r.note}` : ""}`;
            }
            if (cells.some(Boolean))
                holes.push({ line: i + 1, message: "completa tutte le celle (il commento è facoltativo)" });
            return "";
        })
        .join("\n");
    const parsed = parseProgram(source);
    const errors = [...holes, ...parsed.errors.filter((e) => e.line || !holes.length)].sort((a, b) => a.line - b.line);
    return { source, program: errors.length ? null : parsed.program, errors };
}

type Field = "from" | "read" | "to" | "write" | "move" | "note";
const TH = "px-2 py-2 text-center font-medium whitespace-nowrap";
const CELL =
    "h-10 bg-transparent px-2 text-center outline-none focus:bg-accent-soft focus:shadow-[inset_0_0_0_2px_var(--color-accent)]";

/** La tabella δ da compilare: una riga per transizione, una colonna per ogni simbolo letto, scritto e mossa.
    Senza onChange è in sola lettura (la soluzione da confrontare). */
export default function TransitionTable({
    rows,
    tapes,
    bad,
    warn,
    onChange,
}: {
    rows: MdtRow[];
    tapes: number;
    /** righe con un errore e righe da controllare, da 0 */
    bad?: Set<number>;
    warn?: Set<number>;
    onChange?: (rows: MdtRow[]) => void;
}) {
    const readOnly = !onChange;
    const box = useRef<HTMLDivElement>(null);
    const active = useRef<{ i: number; f: Field; t: number; el: HTMLInputElement } | null>(null);
    const sub = (t: number) => (tapes > 1 ? SUB[t] : "");
    const put = (i: number, f: Field, t: number, v: string) =>
        onChange?.(
            rows.map((r, j) => {
                if (j !== i) return r;
                const x = r[f];
                return { ...r, [f]: typeof x === "string" ? v : x.map((y, u) => (u === t ? v : y)) };
            }),
        );
    const pick = (s: string) => {
        const a = active.current;
        if (!a || a.f === "note") return;
        put(a.i, a.f, a.t, s);
        a.el.focus();
    };
    /** riga vuota in posizione at, con il cursore già sulla sua prima cella */
    const insert = (at: number) => {
        onChange?.([...rows.slice(0, at), blank(tapes), ...rows.slice(at)]);
        requestAnimationFrame(() =>
            box.current?.querySelector<HTMLInputElement>(`tbody tr:nth-child(${at + 1}) input`)?.focus(),
        );
    };
    const input = (i: number, f: Exclude<Field, "move">, t: number, label: string) => {
        const x = rows[i][f];
        const width =
            f === "note"
                ? "w-full min-w-48 text-left font-ui text-sm"
                : f === "read" || f === "write"
                  ? "w-14"
                  : "w-20";
        return (
            <input
                value={typeof x === "string" ? x : x[t]}
                onFocus={(e) => (active.current = { i, f, t, el: e.currentTarget })}
                onChange={(e) => {
                    const v = f === "note" ? e.target.value : e.target.value.replace(/[\s#]/g, "");
                    put(i, f, t, f === "read" || f === "write" ? sym(v) : v);
                }}
                readOnly={readOnly}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                aria-label={`Riga ${i + 1}: ${label}`}
                className={`${CELL} ${width}`}
            />
        );
    };

    return (
        <div className="border-line-strong bg-bg flex min-w-0 flex-col rounded-lg border">
            <div ref={box} className="overflow-x-auto rounded-t-lg">
                <table className="w-full border-collapse font-mono text-base">
                    <thead className="bg-sunk font-ui text-muted text-xs">
                        <tr className="divide-line divide-x">
                            <th scope="col" className={`${TH} w-px`}>
                                #
                            </th>
                            <th scope="col" className={`${TH} w-px`}>
                                Stato
                            </th>
                            {Array.from({ length: tapes }, (_, t) => (
                                <th key={t} scope="col" className={`${TH} w-px`}>
                                    Legge{sub(t)}
                                </th>
                            ))}
                            <td className="w-px" />
                            <th scope="col" className={`${TH} w-px`}>
                                Nuovo stato
                            </th>
                            {Array.from({ length: tapes }, (_, t) => [
                                <th key={`w${t}`} scope="col" className={`${TH} w-px`}>
                                    Scrive{sub(t)}
                                </th>,
                                <th key={`m${t}`} scope="col" className={`${TH} w-px`}>
                                    Mossa{sub(t)}
                                </th>,
                            ])}
                            <th scope="col" className={`${TH} text-left`}>
                                Commento
                            </th>
                            {!readOnly && <td className="w-px" />}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr
                                key={i}
                                className={`group border-line divide-line divide-x border-t ${bad?.has(i) ? "bg-proved-soft" : warn?.has(i) ? "bg-open-soft" : ""}`}
                            >
                                <td className="font-ui text-muted px-2 text-center text-xs whitespace-nowrap">
                                    {i + 1}
                                </td>
                                <td className="p-0">{input(i, "from", 0, "stato")}</td>
                                {r.read.map((_, t) => (
                                    <td key={t} className="p-0">
                                        {input(i, "read", t, `simbolo letto${sub(t)}`)}
                                    </td>
                                ))}
                                <td className="text-accent px-1">
                                    <Arrow />
                                </td>
                                <td className="p-0">{input(i, "to", 0, "nuovo stato")}</td>
                                {r.write.map((_, t) => [
                                    <td key={`w${t}`} className="p-0">
                                        {input(i, "write", t, `simbolo scritto${sub(t)}`)}
                                    </td>,
                                    <td key={`m${t}`} className="p-0">
                                        <select
                                            value={r.move[t]}
                                            onChange={(e) => put(i, "move", t, e.target.value)}
                                            disabled={readOnly}
                                            aria-label={`Riga ${i + 1}: mossa${sub(t)}`}
                                            className={`${CELL} disabled:text-ink w-16 cursor-pointer disabled:cursor-default disabled:appearance-none disabled:opacity-100`}
                                        >
                                            <option value="" />
                                            {MOVE_OPTIONS.map(([v, label]) => (
                                                <option key={v} value={v}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>,
                                ])}
                                <td className="p-0">{input(i, "note", 0, "commento")}</td>
                                {!readOnly && (
                                    <td className="px-1 whitespace-nowrap transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:hover)]:opacity-0">
                                        <button
                                            type="button"
                                            aria-label={`Inserisci una riga sotto la riga ${i + 1}`}
                                            title="Inserisci una riga sotto"
                                            onClick={() => insert(i + 1)}
                                            className="text-muted hover:text-accent inline-grid size-9 cursor-pointer place-items-center rounded-md text-lg"
                                        >
                                            +
                                        </button>
                                        <button
                                            type="button"
                                            aria-label={`Elimina la riga ${i + 1}`}
                                            title="Elimina la riga"
                                            disabled={rows.length === 1}
                                            onClick={() => onChange?.(rows.filter((_, j) => j !== i))}
                                            className="text-muted hover:text-proved inline-grid size-9 cursor-pointer place-items-center rounded-md text-lg disabled:cursor-default disabled:opacity-30"
                                        >
                                            ×
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {!readOnly && (
                /* sotto la tabella e fermo in fondo allo schermo finché la tabella è in vista */
                <div className="bg-sunk border-line sticky bottom-0 z-20 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-b-lg border-t px-2 py-1">
                    <button
                        type="button"
                        className="font-ui text-muted hover:bg-bg hover:text-accent min-h-9 cursor-pointer rounded-md px-2 text-sm"
                        onClick={() => insert(rows.length)}
                    >
                        + Aggiungi una riga
                    </button>
                    <div
                        role="group"
                        aria-label="Inserisci un simbolo nella cella selezionata"
                        className="flex flex-wrap items-center gap-0.5"
                    >
                        <span aria-hidden="true" className="font-ui text-muted mr-1 text-xs">
                            Inserisci
                        </span>
                        {PALETTE.map((s) => (
                            <button
                                key={s}
                                type="button"
                                className="hover:bg-bg hover:text-accent min-h-9 min-w-9 cursor-pointer rounded-md px-2 font-mono text-sm"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => pick(s)}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
