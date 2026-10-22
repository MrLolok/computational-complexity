"use client";

import type { Theorem } from "@/data/theorems/theorems";

import { memo, useEffect, useState } from "react";
import Link from "next/link";

import ClassChip from "@/components/ClassChip";
import Markdown from "@/components/Markdown";
import RichHtml from "@/components/RichHtml";
import Walkthrough from "@/components/Walkthrough";
import { IDS, NAME, PLAIN } from "@/data/classes/classes";
import { PROBLEM_BY } from "@/data/problems/problems";
import {
    isRequiredProof,
    PREMISE_PROOFS,
    PREMISE_RULES,
    PREMISE_TRIVIAL,
    REQUIRED_PROOF_COUNT,
} from "@/data/theorems/premise";
import { PRIORITY, PROOF, PROOF_KIND } from "@/data/theorems/proofs";
import { THEOREMS } from "@/data/theorems/theorems";
import walkthroughs from "@/data/theorems/walkthroughs.json";
import { htmlToPlain } from "@/lib/plainText";
import { texHtml } from "@/lib/tex";
import { ui } from "@/lib/tokens";
import { setSearch, useHash, useSearch } from "@/lib/useHash";
import {
    chapterTitle,
    COMPLETENESS_COUNT,
    filterTheorems,
    groupByChapter,
    groupByPriority,
    isCompleteness,
    problemsInTheorem,
    whereText,
} from "./theorems";

const PREFIX = "teorema-";
const CLASS_OPTIONS = IDS.filter((id) => THEOREMS.some((t) => (t.classi || []).includes(id)));
const COMPLETENESS_HINT = "Dice che un problema specifico è completo o difficile per una classe";
const FREQ_HINT = "Domande delle tracce la cui risposta usa il teorema o si riferisce a lui";
const REQUIRED_HINT = "Il professore la mette tra le dimostrazioni da conoscere assolutamente";
/* valori dei filtri quando mancano dall'indirizzo: nella ?query finisce solo ciò che se ne discosta */
const FILTER_DEFAULTS = { q: "", classe: "all", ordine: "cap", dimostrati: "1", completezza: "1", richieste: "0" };
type FilterKey = keyof typeof FILTER_DEFAULTS;
const NAME_BY_ID = Object.fromEntries(THEOREMS.map((t) => [t.id, t.nome]));
const link = "text-accent underline decoration-1 underline-offset-2";
const h4 = "mb-0.5 font-ui text-xs font-medium uppercase tracking-widest text-muted";
/* evidenziazione del teorema aperto da un indirizzo: si accende e poi sfuma */
const HL_ON = ["bg-accent-soft/70"];
const HL_FADE = ["transition-colors", "duration-1500", "ease-out"];
const box = "rounded-lg border border-line px-4 open:pb-4";
const boxSummary = "flex min-h-11 cursor-pointer items-center font-ui text-sm font-medium text-accent";
/* i titoli di sezione delle spiegazioni diventano h4, con lo stile delle altre voci della scheda (le formule restano minuscole) */
const mdText =
    "[&_p]:max-w-none! [&_h4]:mt-2 [&_h4]:font-ui [&_h4]:text-xs [&_h4]:font-medium [&_h4]:uppercase [&_h4]:tracking-widest [&_h4]:text-muted [&_h4_.katex]:normal-case [&_h4_.katex]:tracking-normal";

/* spiegazione in Markdown senza il titolo (è già nella scheda); le risposte alle domande di controllo sono blocchi <details> scritti a mano,
   e la sezione finale «Dove si inciampa di solito» diventa un blocco chiuso allo stesso modo */
function Explanation({ md }: { md: string }) {
    const parts = md
        .replace(/^# .*\n/, "")
        .replace(/^## (Dove si inciampa di solito)\n([\s\S]*)$/m, "<details><summary>$1</summary>\n$2\n</details>")
        .replace(/^## /gm, "#### ")
        .split(/<details><summary>(.*?)<\/summary>|<\/details>/);
    return (
        <div className="flex flex-col gap-3">
            {parts.map((p, i) =>
                i % 2 || !p.trim() ? null : parts[i - 1] ? (
                    <details key={i} className={box}>
                        <summary className={boxSummary}>{parts[i - 1]}</summary>
                        <Markdown className={mdText}>{p}</Markdown>
                    </details>
                ) : (
                    <Markdown key={i} className={mdText}>
                        {p}
                    </Markdown>
                ),
            )}
        </div>
    );
}

/* premessa del professore all'esame: le regole generali e l'elenco delle dimostrazioni, ognuna collegata alla sua scheda */
function Premise() {
    const th = (id: string) => (
        <a href={`#${PREFIX}${id}`} className={link} dangerouslySetInnerHTML={{ __html: texHtml(NAME_BY_ID[id]) }} />
    );
    return (
        <details className={`${box} mb-4`}>
            <summary className={boxSummary}>Premessa del professore: cosa bisogna sapere</summary>
            <div className="flex flex-col gap-3">
                {PREMISE_RULES.map((r) => (
                    <p key={r} className="text-base leading-relaxed">
                        {r}
                    </p>
                ))}
                <div>
                    <h4 className={h4}>Dimostrazioni da conoscere assolutamente</h4>
                    <ol className="list-decimal pl-6 text-base leading-relaxed">
                        {PREMISE_PROOFS.map((p) => (
                            <li key={p.label}>
                                {p.ids.length === 1 ? (
                                    <a
                                        href={`#${PREFIX}${p.ids[0]}`}
                                        className={link}
                                        dangerouslySetInnerHTML={{ __html: texHtml(p.label) }}
                                    />
                                ) : (
                                    <>
                                        <span dangerouslySetInnerHTML={{ __html: texHtml(p.label) }} />:{" "}
                                        {p.ids.map((id, i) => (
                                            <span key={id}>
                                                {i > 0 && " · "}
                                                {th(id)}
                                            </span>
                                        ))}
                                    </>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
                <p className="text-base leading-relaxed">
                    <b className="font-medium">Dimostrazioni banali citate come esempio:</b>{" "}
                    {PREMISE_TRIVIAL.map((id, i) => (
                        <span key={id}>
                            {i > 0 && " · "}
                            {th(id)}
                        </span>
                    ))}
                    .
                </p>
                <p className={ui.hint}>
                    Le {REQUIRED_PROOF_COUNT} schede di queste dimostrazioni hanno il bollino{" "}
                    <span className={ui.pillProved}>dimostrazione richiesta</span> e la spunta qui sotto mostra solo
                    quelle.
                </p>
            </div>
        </details>
    );
}

/* memo: a ogni tasto della ricerca si rifà solo l'elenco, non le schede già mostrate */
const TheoremRow = memo(function TheoremRow({
    t,
    md,
    traceTitles,
}: {
    t: Theorem;
    md?: string;
    traceTitles: Record<string, string>;
}) {
    const cls = (t.classi || []).filter((c) => NAME[c]);
    const pr = problemsInTheorem(t);
    const pf = PROOF[t.id];
    const lesson = walkthroughs[t.id as keyof typeof walkthroughs];
    /* le spiegazioni hanno migliaia di formule: si rendono solo quando la si apre */
    const [mdOpen, setMdOpen] = useState(false);
    return (
        <details id={`teorema-${t.id}`} className={`${ui.card} group open:border-line-strong mt-3 scroll-mt-20`}>
            <summary className="grid cursor-pointer list-none grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[minmax(0,1fr)_auto] [&::-webkit-details-marker]:hidden">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="font-ui text-muted text-xs font-medium tracking-widest uppercase">
                        {t.tipo || "teorema"}
                    </span>
                    <h3
                        className="font-head text-lg font-medium"
                        dangerouslySetInnerHTML={{ __html: texHtml(t.nome) }}
                    />
                </div>
                <div className="flex flex-wrap items-center justify-start gap-1.5 sm:justify-end">
                    {isRequiredProof(t.id) && (
                        <span className={ui.pillProved} title={REQUIRED_HINT}>
                            dimostrazione richiesta
                        </span>
                    )}
                    {pf && pf.frequenza > 0 && (
                        <span className={ui.pill} title={FREQ_HINT}>
                            chiesto in {pf.frequenza} {pf.frequenza === 1 ? "domanda" : "domande"}
                        </span>
                    )}
                    {isCompleteness(t) && (
                        <span className={ui.pillOpen} title={COMPLETENESS_HINT}>
                            completezza
                        </span>
                    )}
                    {t.prova === "nel corso" && <span className={ui.pill}>dimostrato nel corso</span>}
                </div>
                <RichHtml as="p" className="col-span-full" html={t.enunciato} />
                <span className="font-ui text-accent col-span-full text-sm">
                    <span className="group-open:hidden">Idea, frase per l&apos;esame e dimostrazione +</span>
                    <span className="hidden group-open:inline">Chiudi approfondimento −</span>
                </span>
            </summary>
            <div className="flex flex-col gap-3 pb-4">
                {t.intuizione && (
                    <div>
                        <h4 className={h4}>Intuizione</h4>
                        <RichHtml as="p" html={t.intuizione} />
                    </div>
                )}
                {t.uso_esame && (
                    <div>
                        <h4 className={h4}>All&apos;esame</h4>
                        <RichHtml as="p" html={t.uso_esame} />
                    </div>
                )}
                {pf?.frase_esame && (
                    <div className={ui.noteOk}>
                        <h4 className={h4}>Da scrivere all&apos;esame</h4>
                        <RichHtml as="p" html={pf.frase_esame} />
                    </div>
                )}
                {lesson && (
                    <Walkthrough
                        lesson={lesson}
                        name={htmlToPlain(t.nome)}
                        title={
                            lesson.kind === "conditional"
                                ? "Ragionamento illustrato"
                                : lesson.kind === "outline"
                                  ? "Schema illustrato"
                                  : "Dimostrazione illustrata"
                        }
                        heading="h4"
                        side
                    />
                )}
                {pf && md && (
                    <details className={box} onToggle={(e) => setMdOpen(e.currentTarget.open)}>
                        <summary className={boxSummary}>{PROOF_KIND[pf.tipo_dimostrazione]}</summary>
                        {mdOpen && <Explanation md={md} />}
                    </details>
                )}
                {pf && pf.domande.length > 0 && (
                    <div>
                        <h4 className={h4}>Dove serve nelle tracce</h4>
                        <p className="text-base leading-relaxed">
                            {pf.domande.map((d, i) => (
                                <span key={`${d.traccia}-${d.n}`}>
                                    {i > 0 && " · "}
                                    <Link
                                        href={`/tracce/${d.traccia}#d${d.n}`}
                                        title={traceTitles[d.traccia]}
                                        className="text-accent whitespace-nowrap underline decoration-1 underline-offset-2"
                                    >
                                        {d.traccia} n. {d.n}
                                    </Link>
                                </span>
                            ))}
                        </p>
                    </div>
                )}
                {cls.length > 0 && (
                    <div>
                        <h4 className={h4}>Classi</h4>
                        <p className="flex flex-wrap gap-1.5">
                            {cls.map((c) => (
                                <ClassChip key={c} id={c} />
                            ))}
                        </p>
                    </div>
                )}
                {pr.length > 0 && (
                    <div>
                        <h4 className={h4}>Problemi</h4>
                        <p className="text-base leading-relaxed">
                            {pr.map((id, i) => (
                                <span key={id}>
                                    {i > 0 && " · "}
                                    <Link
                                        href={`/problemi/${id}`}
                                        data-term={`problem:${id}`}
                                        className="text-accent whitespace-nowrap underline decoration-1 underline-offset-2"
                                        dangerouslySetInnerHTML={{ __html: texHtml(PROBLEM_BY[id].name) }}
                                    />
                                </span>
                            ))}
                        </p>
                    </div>
                )}
                <p className="text-muted text-sm">
                    <b className="font-ui font-medium">Dove:</b> {whereText(t)}
                    {t.nota_fonte && <RichHtml as="span" html={`. ${t.nota_fonte}`} />}
                </p>
            </div>
        </details>
    );
});

export default function TheoremsView({
    explanations,
    traceTitles,
}: {
    explanations: Record<string, string>;
    traceTitles: Record<string, string>;
}) {
    /* i filtri vivono nella ?query: restano al refresh e si condividono col link */
    const params = new URLSearchParams(useSearch());
    const get = (k: FilterKey) => params.get(k) ?? FILTER_DEFAULTS[k];
    const set = (k: FilterKey, v: string) => {
        const p = new URLSearchParams(location.search);
        if (v === FILTER_DEFAULTS[k]) p.delete(k);
        else p.set(k, v);
        setSearch(p);
    };
    const q = get("q");
    const cls = get("classe");
    const byFreq = get("ordine") === "freq";
    const provedOnly = get("dimostrati") === "1";
    const hideCompleteness = get("completezza") === "0";
    const requiredOnly = get("richieste") === "1";
    const hash = useHash();
    const target = hash.startsWith(PREFIX) ? hash.slice(PREFIX.length) : "";

    const list = filterTheorems(q, cls, provedOnly, hideCompleteness, requiredOnly);
    const groups = byFreq ? groupByPriority(list) : groupByChapter(list);

    /* #teorema-<id> nell'indirizzo: se i filtri lo nascondono si azzerano, poi lo si apre e ci si scorre */
    const hidden = !!target && THEOREMS.some((t) => t.id === target) && !list.some((t) => t.id === target);
    useEffect(() => {
        if (!target) return;
        if (hidden) {
            /* resta solo l'ordinamento, che non nasconde nulla */
            const p = new URLSearchParams(location.search);
            for (const k of ["q", "classe", "completezza", "richieste"]) p.delete(k);
            p.set("dimostrati", "0");
            setSearch(p);
            return;
        }
        const d = document.getElementById(`teorema-${target}`) as HTMLDetailsElement | null;
        if (!d) return;
        d.open = true;
        d.classList.remove(...HL_FADE);
        d.classList.add(...HL_ON);
        const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const r = requestAnimationFrame(() => {
            d.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "auto" });
            d.classList.add(...HL_FADE);
            d.classList.remove(...HL_ON);
        });
        return () => cancelAnimationFrame(r);
    }, [target, hidden]);

    return (
        <section className="flex flex-col">
            <header className="mb-3">
                <p className={`${ui.eyebrow} mb-2`}>I risultati che collegano le classi</p>
                <h1 className={ui.h2}>Teoremi del corso</h1>
            </header>
            <p className={`${ui.lede} mb-4`}>
                Leggi l&apos;enunciato, poi apri la scheda: trovi l&apos;idea, i passaggi illustrati e la dimostrazione
                in testo.
            </p>
            <Premise />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 pb-1.5">
                <label className={ui.search} htmlFor="thq">
                    <span aria-hidden="true">⌕</span>
                    <input
                        id="thq"
                        type="search"
                        className={ui.input}
                        placeholder="Cerca Savitch, collasso, Cook…"
                        aria-label="Cerca un teorema"
                        autoComplete="off"
                        value={q}
                        onChange={(e) => set("q", e.target.value)}
                    />
                </label>
                <label
                    htmlFor="thcls"
                    className="font-ui text-muted inline-flex cursor-pointer items-center gap-2 text-sm"
                >
                    Classe
                    <select
                        id="thcls"
                        className={ui.select}
                        value={cls}
                        onChange={(e) => set("classe", e.target.value)}
                    >
                        <option value="all">Tutte</option>
                        {CLASS_OPTIONS.map((id) => (
                            <option key={id} value={id}>
                                {PLAIN[id]}
                            </option>
                        ))}
                    </select>
                </label>
                <label
                    htmlFor="thsort"
                    className="font-ui text-muted inline-flex cursor-pointer items-center gap-2 text-sm"
                >
                    Ordina
                    <select
                        id="thsort"
                        className={ui.select}
                        value={byFreq ? "freq" : "cap"}
                        onChange={(e) => set("ordine", e.target.value)}
                    >
                        <option value="cap">Per capitolo</option>
                        <option value="freq">Più chiesti</option>
                    </select>
                </label>
                <label className="text-muted flex min-h-11 cursor-pointer items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        className="accent-accent size-4"
                        checked={provedOnly}
                        onChange={(e) => set("dimostrati", e.target.checked ? "1" : "0")}
                    />
                    Solo dimostrati nel corso
                </label>
                <label
                    className="text-muted flex min-h-11 cursor-pointer items-center gap-2 text-sm"
                    title={COMPLETENESS_HINT}
                >
                    <input
                        type="checkbox"
                        className="accent-accent size-4"
                        checked={hideCompleteness}
                        onChange={(e) => set("completezza", e.target.checked ? "0" : "1")}
                    />
                    Nascondi i teoremi di <span className={ui.pillOpen}>completezza</span> ({COMPLETENESS_COUNT})
                </label>
                <label
                    className="text-muted flex min-h-11 cursor-pointer items-center gap-2 text-sm"
                    title={REQUIRED_HINT}
                >
                    <input
                        type="checkbox"
                        className="accent-accent size-4"
                        checked={requiredOnly}
                        onChange={(e) => set("richieste", e.target.checked ? "1" : "0")}
                    />
                    Solo le <span className={ui.pillProved}>dimostrazioni richieste</span> ({REQUIRED_PROOF_COUNT})
                </label>
                <span role="status" className="font-ui text-muted text-sm">
                    {list.length === THEOREMS.length
                        ? `${THEOREMS.length} risultati`
                        : `${list.length} di ${THEOREMS.length}`}
                </span>
            </div>
            <div>
                {groups.length ? (
                    groups.map((g) => (
                        <section key={g.k} className="mt-6">
                            <h2 className="border-line font-ui text-muted border-b pb-2 text-xs font-medium tracking-widest uppercase">
                                {byFreq ? PRIORITY[g.k as keyof typeof PRIORITY].label : chapterTitle(g.k)}
                                {byFreq && (
                                    <span className="ml-2 font-normal tracking-normal normal-case">
                                        · {PRIORITY[g.k as keyof typeof PRIORITY].hint}
                                    </span>
                                )}
                            </h2>
                            {g.items.map((t) => (
                                <TheoremRow key={t.id} t={t} md={explanations[t.id]} traceTitles={traceTitles} />
                            ))}
                        </section>
                    ))
                ) : (
                    <p className={`${ui.hint} mt-4`}>Nessun teorema con questi filtri.</p>
                )}
            </div>
        </section>
    );
}
