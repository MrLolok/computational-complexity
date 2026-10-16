"use client";

import type { MdtResult, TraceProgress } from "@/store/progressSlice";

import { useMemo, useState } from "react";
import Link from "next/link";

import { searchKey } from "@/lib/plainText";
import { ui } from "@/lib/tokens";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetMdtResults, resetTraces } from "@/store/progressSlice";

export type TraceSummary = {
    code: string;
    title: string;
    dateLabel: string;
    group: string;
    total: number;
    repeated: number;
    q8: string | null;
    /** id della macchina della domanda 8 */
    machine: string | null;
    /** testo semplice delle domande, per la ricerca */
    search: string;
};

type Status = "todo" | "doing" | "done";
const FILTERS: [Status | "all", string][] = [
    ["all", "Tutte"],
    ["todo", "Da fare"],
    ["doing", "In corso"],
    ["done", "Svolte"],
];

function statusOf(p: TraceProgress | undefined): Status {
    if (!p) return "todo";
    if (p.completedAt) return "done";
    return Object.keys(p.answers).length ? "doing" : p.best ? "done" : "todo";
}

export default function TraceLibrary({ traces }: { traces: TraceSummary[] }) {
    const dispatch = useAppDispatch();
    const progress = useAppSelector((s) => s.progress.traces);
    const mdt = useAppSelector((s) => s.progress.mdtResults);
    const [q, setQ] = useState("");
    const [filter, setFilter] = useState<Status | "all">("all");

    const stats = useMemo(() => {
        let done = 0,
            answered = 0,
            ok = 0;
        for (const t of traces) {
            const p = progress[t.code];
            if (!p) continue;
            if (statusOf(p) === "done") done += 1;
            const a = Object.values(p.answers);
            answered += a.length;
            ok += a.filter((x) => x.correct).length;
        }
        /* una MdT che compare in più tracce conta una volta */
        const machines = [...new Set(traces.flatMap((t) => (t.machine ? [t.machine] : [])))];
        const delivered = machines.flatMap((id) => (mdt?.[id] ? [mdt[id]] : []));
        const solved = delivered.filter((r) => r.ok === r.tot).length;
        return { done, answered, ok, machines: machines.length, delivered: delivered.length, solved };
    }, [traces, progress, mdt]);

    const shown = useMemo(() => {
        const k = searchKey(q.trim());
        return traces.filter(
            (t) =>
                (filter === "all" || statusOf(progress[t.code]) === filter) &&
                (!k || searchKey(`${t.code} ${t.title} ${t.dateLabel} ${t.q8 ?? ""} ${t.search}`).includes(k)),
        );
    }, [traces, progress, q, filter]);

    const groups = useMemo(() => {
        const out: { name: string; items: TraceSummary[] }[] = [];
        for (const t of shown) {
            let g = out.find((x) => x.name === t.group);
            if (!g) out.push((g = { name: t.group, items: [] }));
            g.items.push(t);
        }
        return out;
    }, [shown]);

    return (
        <div className="flex flex-col gap-5">
            <div className="font-ui text-muted flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <span>
                    <b className="font-head text-ink text-2xl">{stats.done}</b> di {traces.length} tracce svolte
                </span>
                <span>
                    <b className="font-head text-ink text-2xl">{stats.answered}</b> risposte date
                </span>
                <span>
                    <b className="font-head text-ink text-2xl">
                        {stats.answered ? Math.round((100 * stats.ok) / stats.answered) : 0}%
                    </b>{" "}
                    giuste
                </span>
                <span>
                    <b className="font-head text-ink text-2xl">{stats.delivered}</b> di {stats.machines} MdT consegnate
                </span>
                <span>
                    <b className="font-head text-ink text-2xl">
                        {stats.delivered ? Math.round((100 * stats.solved) / stats.delivered) : 0}%
                    </b>{" "}
                    risolte
                </span>
                <div className="ml-auto flex gap-4 self-center">
                    <button
                        type="button"
                        className={`${ui.linkBtn} disabled:cursor-default disabled:opacity-35`}
                        disabled={!Object.keys(progress).length}
                        onClick={() =>
                            confirm("Azzerare risposte e risultati delle domande di tutte le tracce?") &&
                            dispatch(resetTraces())
                        }
                    >
                        Azzera domande
                    </button>
                    <button
                        type="button"
                        className={`${ui.linkBtn} disabled:cursor-default disabled:opacity-35`}
                        disabled={!Object.keys(mdt ?? {}).length}
                        onClick={() =>
                            confirm("Azzerare le consegne di tutte le MdT? Le tabelle scritte restano.") &&
                            dispatch(resetMdtResults())
                        }
                    >
                        Azzera MdT
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <label className={ui.search}>
                    <span aria-hidden="true">⌕</span>
                    <input
                        type="search"
                        aria-label="Cerca nelle tracce"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Cerca nelle domande (es. qsat, one-way, 2016)"
                        className={ui.input}
                        autoComplete="off"
                    />
                </label>
                <div role="group" aria-label="Filtra per stato" className="flex flex-wrap gap-1.5">
                    {FILTERS.map(([k, label]) => (
                        <button
                            key={k}
                            type="button"
                            aria-pressed={filter === k}
                            onClick={() => setFilter(k)}
                            className={`font-ui min-h-11 cursor-pointer rounded-full border px-3 py-2 text-sm transition-colors ${
                                filter === k
                                    ? "border-accent bg-accent text-accent-ink"
                                    : "border-line-strong text-muted hover:text-ink"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {groups.length === 0 && <p className={ui.hint}>Nessuna traccia con questi filtri.</p>}

            {groups.map((g) => (
                <section key={g.name} className="flex flex-col gap-3">
                    <h2 className={ui.h3}>{g.name}</h2>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {g.items.map((t) => (
                            <li key={t.code} className="min-w-0">
                                <TraceCard t={t} p={progress[t.code]} mdt={t.machine ? mdt?.[t.machine] : undefined} />
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}

function TraceCard({ t, p, mdt }: { t: TraceSummary; p: TraceProgress | undefined; mdt?: MdtResult }) {
    const st = statusOf(p);
    const answered = p ? Object.keys(p.answers).length : 0;
    return (
        <Link href={`/tracce/${t.code}`} className={`${ui.card} group hover:border-accent h-full transition-colors`}>
            <div className="flex items-baseline justify-between gap-2">
                <span className="text-accent font-mono text-sm font-semibold">{t.code}</span>
                {st === "done" && p?.best ? (
                    <span className={ui.pillOk}>
                        {p.best.ok}/{p.best.tot}
                    </span>
                ) : st === "doing" ? (
                    <span className={ui.pillOpen}>
                        {answered}/{t.total}
                    </span>
                ) : (
                    <span className={ui.pill}>da fare</span>
                )}
            </div>
            <span className="font-head group-hover:text-accent text-lg leading-snug font-semibold text-balance">
                {t.dateLabel || t.title}
            </span>
            <span className="font-ui text-muted text-xs">
                {t.total} domande{t.repeated ? ` · ${t.repeated} ripetute ♻` : ""}
                {t.q8 ? " · MdT" : ""}
                {mdt &&
                    (mdt.ok === mdt.tot ? (
                        <span className="text-ok"> ✓</span>
                    ) : (
                        <span className="text-open">
                            {" "}
                            {mdt.ok}/{mdt.tot}
                        </span>
                    ))}
            </span>
            {t.q8 && <span className="text-muted line-clamp-2 text-sm">Domanda 8: {t.q8}</span>}
        </Link>
    );
}
