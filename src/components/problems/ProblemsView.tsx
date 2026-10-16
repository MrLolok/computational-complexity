"use client";

import type { LadderId } from "@/data/problems";
import type { TraceRef } from "@/data/traces";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Arrow from "@/components/Arrow";
import { LADDER, PROBLEM_BY, PROBLEMS } from "@/data/problems";
import { stripHtml } from "@/lib/glossary";
import { BANDS, classLabel, matches } from "@/lib/problems";
import { texHtml } from "@/lib/tex";
import { ui } from "@/lib/ui";
import ProblemDetail from "./ProblemDetail";

function selectedFrom(path: string | null) {
    const id = path?.match(/^\/problemi\/([^/]+)/)?.[1];
    return id && PROBLEM_BY[id] ? id : null;
}
export default function ProblemsView({ traceRefs }: { traceRefs: Record<string, TraceRef[]> }) {
    const sel = selectedFrom(usePathname());
    const shown = sel ? PROBLEM_BY[sel] : null;
    const [cls, setCls] = useState<LadderId | "all">("all");
    const [query, setQuery] = useState("");
    const [onlyC, setOnlyC] = useState(false);
    const [onlyTraces, setOnlyTraces] = useState(false);
    const [showCatalog, setShowCatalog] = useState(false);
    const catalog = useRef<HTMLDivElement>(null);
    const detail = useRef<HTMLElement>(null);
    const items = PROBLEMS.filter(
        (p) =>
            matches(p, query, new Set(cls === "all" ? [] : [cls]), onlyC) &&
            (!onlyTraces || traceRefs[p.id]?.length > 0),
    );
    const selectedIndex = items.findIndex((p) => p.id === sel);
    const scroll = () => {
        const el = detail.current;
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };
    const select = (id: string) => {
        if (!PROBLEM_BY[id]) return;
        setShowCatalog(false);
        window.history.pushState(null, "", `/problemi/${id}`);
        requestAnimationFrame(() => {
            scroll();
            document.getElementById("problem-detail")?.focus({ preventScroll: true });
        });
    };
    const initial = useRef(sel);
    useEffect(() => {
        if (initial.current) scroll();
    }, []);
    useEffect(() => {
        const list = catalog.current;
        const row = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
        if (!list || !row || !window.matchMedia("(min-width: 64rem)").matches) return;
        const bounds = list.getBoundingClientRect();
        const selected = row.getBoundingClientRect();
        if (selected.top < bounds.top) list.scrollTop += selected.top - bounds.top;
        else if (selected.bottom > bounds.bottom) list.scrollTop += selected.bottom - bounds.bottom;
    }, [sel, cls, query, onlyC, onlyTraces]);

    return (
        <section className="flex flex-col gap-5">
            <header>
                <h1 className={ui.h2}>Problemi del corso</h1>
                <p className={`${ui.lede} mt-3`}>
                    Scegli un problema, segui l&apos;esempio illustrato e passa al prossimo.
                </p>
            </header>
            <div className="flex flex-wrap items-center gap-3">
                <label className={ui.search} htmlFor="pbq">
                    <span aria-hidden="true">⌕</span>
                    <input
                        id="pbq"
                        aria-label="Cerca un problema"
                        type="search"
                        className={ui.input}
                        placeholder="Cerca SAT, CLIQUE, QSAT…"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowCatalog(true);
                        }}
                    />
                </label>
                <label className="text-muted flex items-center gap-2 text-sm">
                    Classe
                    <select
                        className={ui.select}
                        value={cls}
                        onChange={(e) => {
                            setCls(e.target.value as LadderId | "all");
                            setShowCatalog(true);
                        }}
                    >
                        <option value="all">Tutte le classi</option>
                        {BANDS.map((id) => (
                            <option key={id} value={id}>
                                {LADDER[id].t || stripHtml(LADDER[id].n)}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="text-muted flex min-h-11 items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        className="accent-accent size-4"
                        checked={onlyC}
                        onChange={(e) => {
                            setOnlyC(e.target.checked);
                            setShowCatalog(true);
                        }}
                    />
                    Solo completi
                </label>
                <label className="text-muted flex min-h-11 items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        className="accent-accent size-4"
                        checked={onlyTraces}
                        onChange={(e) => {
                            setOnlyTraces(e.target.checked);
                            setShowCatalog(true);
                        }}
                    />
                    Solo nelle tracce
                </label>
                {(query || cls !== "all" || onlyC || onlyTraces) && (
                    <button
                        type="button"
                        className={ui.linkBtn}
                        onClick={() => {
                            setQuery("");
                            setCls("all");
                            setOnlyC(false);
                            setOnlyTraces(false);
                        }}
                    >
                        Azzera filtri
                    </button>
                )}
            </div>
            <p role="status" className="text-muted text-sm">
                {items.length} problemi
                {sel && !items.some((p) => p.id === sel) ? " · la scheda aperta è fuori dai filtri" : ""}
            </p>
            {shown && (
                <button
                    type="button"
                    className={`${ui.btn} lg:hidden`}
                    aria-expanded={showCatalog}
                    aria-controls="problem-list"
                    onClick={() => setShowCatalog(!showCatalog)}
                >
                    {showCatalog ? "Nascondi elenco" : "Mostra elenco dei problemi"}
                </button>
            )}
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                <div
                    ref={catalog}
                    id="problem-list"
                    role="region"
                    aria-label="Elenco dei problemi"
                    tabIndex={0}
                    className={`${shown && !showCatalog ? "hidden" : "flex"} min-w-0 [scrollbar-gutter:stable] flex-col gap-2 lg:sticky lg:top-[calc(env(safe-area-inset-top)+var(--spacing)*16)] lg:flex lg:max-h-[calc(100svh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-var(--spacing)*24)] lg:overflow-y-auto lg:overscroll-y-contain lg:pr-2`}
                >
                    {items.length === 0 && (
                        <p className={ui.hint}>Nessun problema trovato. Prova un altro nome o azzera i filtri.</p>
                    )}
                    {items.map((p) => (
                        <button
                            key={p.id}
                            type="button"
                            aria-pressed={p.id === sel}
                            aria-controls="problem-detail"
                            onClick={() => select(p.id)}
                            className={`hover:border-accent flex min-w-0 cursor-pointer items-baseline gap-3 rounded-lg border p-3 text-left ${p.id === sel ? "border-accent bg-accent-soft/20" : "border-line bg-surface"}`}
                        >
                            <span className="text-muted min-w-6 font-mono text-xs">
                                {String(PROBLEMS.indexOf(p) + 1).padStart(2, "0")}
                            </span>
                            <span className="flex min-w-0 flex-1 flex-col gap-2">
                                <span className="font-semibold" dangerouslySetInnerHTML={{ __html: p.name }} />
                                <span className="flex flex-wrap items-center gap-1.5">
                                    <span
                                        className={ui.pill}
                                        dangerouslySetInnerHTML={{ __html: texHtml(classLabel(p), false) }}
                                    />
                                    {p.full && <span className={ui.pillOk}>Completo</span>}
                                    {traceRefs[p.id]?.length > 0 && (
                                        <span className="text-accent text-xs">Nelle tracce</span>
                                    )}
                                </span>
                            </span>
                            <span className="text-muted" aria-hidden="true">
                                <Arrow />
                            </span>
                        </button>
                    ))}
                </div>
                <aside
                    ref={detail}
                    id="problem-detail"
                    tabIndex={-1}
                    className={`${ui.card} scroll-mt-16 lg:col-span-2`}
                >
                    {shown ? (
                        <div className="flex flex-col gap-4">
                            <ProblemDetail
                                p={shown}
                                onGo={select}
                                previousId={items[selectedIndex - 1]?.id}
                                nextId={items[selectedIndex + 1]?.id}
                                traceRefs={traceRefs[shown.id] ?? []}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 py-6">
                            <span className={ui.eyebrow}>Una domanda concreta</span>
                            <h2 className={ui.h3}>Scegli un problema</h2>
                            <p className="text-muted">
                                Qui troverai formulazione, appartenenza alla classe, completezza e collegamenti con
                                l&apos;esame.
                            </p>
                            <p className="text-muted text-sm">
                                Per iniziare:{" "}
                                <Link href="/problemi/SAT" className="text-accent underline">
                                    SAT
                                </Link>{" "}
                                per i certificati,{" "}
                                <Link href="/problemi/CLIQUE" className="text-accent underline">
                                    CLIQUE
                                </Link>{" "}
                                per i grafi.
                            </p>
                        </div>
                    )}
                </aside>
            </div>
        </section>
    );
}
