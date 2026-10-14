"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetTraces, type TraceProgress } from "@/store/progressSlice";
import { ui } from "@/lib/ui";

export type TraceSummary = {
  code: string;
  title: string;
  dateLabel: string;
  group: string;
  total: number;
  repeated: number;
  q8: string | null;
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
  return Object.keys(p.answers).length || p.q8Done ? "doing" : p.best ? "done" : "todo";
}

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function TraceLibrary({ traces }: { traces: TraceSummary[] }) {
  const dispatch = useAppDispatch();
  const progress = useAppSelector((s) => s.progress.traces);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");

  const stats = useMemo(() => {
    let done = 0, answered = 0, ok = 0;
    for (const t of traces) {
      const p = progress[t.code];
      if (!p) continue;
      if (statusOf(p) === "done") done += 1;
      const a = Object.values(p.answers);
      answered += a.length;
      ok += a.filter((x) => x.correct).length;
    }
    return { done, answered, ok };
  }, [traces, progress]);

  const shown = useMemo(() => {
    const k = norm(q.trim());
    return traces.filter(
      (t) =>
        (filter === "all" || statusOf(progress[t.code]) === filter) &&
        (!k || norm(`${t.code} ${t.title} ${t.dateLabel} ${t.q8 ?? ""} ${t.search}`).includes(k)),
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
      <div className="flex flex-wrap gap-x-8 gap-y-2 font-ui text-sm text-muted">
        <span>
          <b className="font-head text-2xl text-ink">{stats.done}</b> di {traces.length} tracce svolte
        </span>
        <span>
          <b className="font-head text-2xl text-ink">{stats.answered}</b> risposte date
        </span>
        <span>
          <b className="font-head text-2xl text-ink">{stats.answered ? Math.round((100 * stats.ok) / stats.answered) : 0}%</b> giuste
        </span>
        <button
          type="button"
          className={`${ui.linkBtn} ml-auto self-center disabled:cursor-default disabled:opacity-35`}
          disabled={!Object.keys(progress).length}
          onClick={() => confirm("Azzerare risposte e risultati di tutte le tracce?") && dispatch(resetTraces())}
        >
          Azzera statistiche
        </button>
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
              className={`font-ui text-sm rounded-full border px-3 py-1 cursor-pointer transition-colors ${
                filter === k ? "border-accent bg-accent text-accent-ink" : "border-line-strong text-muted hover:text-ink"
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
          <ul className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(min(100%,17rem),1fr))]">
            {g.items.map((t) => (
              <li key={t.code} className="min-w-0">
                <TraceCard t={t} p={progress[t.code]} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function TraceCard({ t, p }: { t: TraceSummary; p: TraceProgress | undefined }) {
  const st = statusOf(p);
  const answered = p ? Object.keys(p.answers).length : 0;
  return (
    <Link
      href={`/tracce/${t.code}`}
      className="group flex h-full flex-col gap-2 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-sm font-semibold text-accent">{t.code}</span>
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
      <span className="font-head text-lg font-semibold leading-snug text-balance group-hover:text-accent">{t.dateLabel || t.title}</span>
      <span className="font-ui text-xs text-muted">
        {t.total} domande{t.repeated ? ` · ${t.repeated} ripetute ♻` : ""}
        {t.q8 ? " · MdT" : ""}
      </span>
      {t.q8 && <span className="text-sm text-muted line-clamp-2">Domanda 8: {t.q8}</span>}
    </Link>
  );
}
