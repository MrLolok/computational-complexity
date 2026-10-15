"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { IDS, PLAIN, NAME } from "@/data/classes";
import { PROBLEM_BY } from "@/data/problems";
import { THEOREMS, type Theorem } from "@/data/theorems";
import { PRIORITY, PROOF, PROOF_KIND } from "@/data/theoremProofs";
import { TRACE_BY } from "@/data/traces";
import ClassChip from "@/components/ClassChip";
import Rich from "@/components/Rich";
import { chapterTitle, filterTheorems, groupByChapter, groupByPriority, thProblems, whereText } from "@/lib/theorems";
import { ui } from "@/lib/ui";
import LearningFigure from "@/components/learning/LearningFigure";

const PREFIX = "#teorema-";
const CLASS_OPTIONS = IDS.filter((id) => THEOREMS.some((t) => (t.classi || []).includes(id)));
const h4 = "mb-0.5 font-ui text-xs font-semibold uppercase tracking-widest text-muted";
/* evidenziazione del teorema aperto da un indirizzo: si accende e poi sfuma */
const HL_ON = ["bg-accent-soft/70"];
const HL_FADE = ["transition-colors", "duration-1500", "ease-out"];
/* testo HTML delle dimostrazioni: paragrafi ed elenchi numerati */
const proofText = "flex flex-col gap-2 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-1.5 [&_ol]:pl-6 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-1 [&_ul]:pl-6";

const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  window.addEventListener("popstate", cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener("popstate", cb);
  };
};
const getHash = () => {
  try {
    return decodeURIComponent(window.location.hash);
  } catch {
    return window.location.hash;
  }
};
const getServerHash = () => "";

function TheoremRow({ t }: { t: Theorem }) {
  const cls = (t.classi || []).filter((c) => NAME[c]);
  const pr = thProblems(t);
  const pf = PROOF[t.id];
  return (
    <details id={`teorema-${t.id}`} className={`${ui.card} group mt-3 scroll-mt-20 open:border-line-strong`}>
      <summary className="grid cursor-pointer list-none grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[minmax(0,1fr)_auto] [&::-webkit-details-marker]:hidden">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="font-ui text-xs font-semibold uppercase tracking-widest text-muted">{t.tipo || "teorema"}</span>
          <h3 className="font-head text-lg font-semibold" dangerouslySetInnerHTML={{ __html: t.nome }} />
        </div>
        <div className="flex flex-wrap items-center justify-start gap-1.5 sm:justify-end">
          {pf && pf.frequenza > 0 && (
            <span className={pf.priorita === "alta" ? ui.pillOk : ui.pill} title={PRIORITY[pf.priorita].hint}>
              {pf.priorita === "alta" ? "★ " : ""}chiesto in {pf.frequenza} {pf.frequenza === 1 ? "domanda" : "domande"}
            </span>
          )}
          {pf?.priorita === "orale" && <span className={ui.pill} title={PRIORITY.orale.hint}>per l&apos;orale</span>}
          {t.correzione && <span className={ui.pillOpen}>correzione</span>}
          {t.prova === "nel corso" && <span className={ui.pill}>dimostrato nel corso</span>}
        </div>
        <p className="col-span-full max-w-prose" dangerouslySetInnerHTML={{ __html: t.enunciato }} />
        <span className="col-span-full font-ui text-sm text-accent"><span className="group-open:hidden">Idea, frase per l&apos;esame e dimostrazione +</span><span className="hidden group-open:inline">Chiudi approfondimento −</span></span>
      </summary>
      <div className="flex max-w-prose flex-col gap-3 pb-4">
        {t.id === "savitch" && <LearningFigure kind="savitch" />}
        {t.intuizione && (
          <div>
            <h4 className={h4}>Intuizione</h4>
            <Rich as="p" html={t.intuizione} />
          </div>
        )}
        {t.uso_esame && (
          <div>
            <h4 className={h4}>All&apos;esame</h4>
            <Rich as="p" html={t.uso_esame} />
          </div>
        )}
        {pf?.frase_esame && (
          <div className={ui.noteOk}>
            <h4 className={h4}>Da scrivere all&apos;esame</h4>
            <Rich as="p" html={pf.frase_esame} />
          </div>
        )}
        {t.correzione && <Rich className={ui.note} html={`<b class="font-ui font-semibold">Correzione.</b> ${t.correzione}`} />}
        {pf?.dimostrazione && (
          <details className="rounded-lg border border-line px-4 open:pb-4">
            <summary className="flex min-h-11 cursor-pointer items-center font-ui text-sm font-semibold text-accent">
              {PROOF_KIND[pf.tipo_dimostrazione]}
            </summary>
            <Rich className={proofText} html={pf.dimostrazione} />
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
                    title={TRACE_BY[d.traccia]?.title}
                    className="whitespace-nowrap text-accent underline decoration-1 underline-offset-2"
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
                  <Link href={`/problemi/${id}`} data-term={`problem:${id}`} className="whitespace-nowrap text-accent underline decoration-1 underline-offset-2">
                    {PROBLEM_BY[id].name}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        )}
        <p className="text-sm text-muted">
          <b className="font-ui font-semibold">Dove:</b> {whereText(t)}
          {t.nota_fonte && <Rich as="span" html={`. ${t.nota_fonte}`} />}
        </p>
      </div>
    </details>
  );
}

export default function TheoremsView() {
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("all");
  const [provedOnly, setProvedOnly] = useState(false);
  const [byFreq, setByFreq] = useState(false);
  const hash = useSyncExternalStore(subscribeHash, getHash, getServerHash);
  const target = hash.startsWith(PREFIX) ? hash.slice(PREFIX.length) : "";

  const list = filterTheorems(q, cls, provedOnly);
  const groups = byFreq ? groupByPriority(list) : groupByChapter(list);

  /* #teorema-<id> nell'indirizzo: se i filtri lo nascondono si azzerano, poi lo si apre e ci si scorre */
  const hidden = !!target && THEOREMS.some((t) => t.id === target) && !list.some((t) => t.id === target);
  useEffect(() => {
    if (!target) return;
    if (hidden) {
      const r = requestAnimationFrame(() => {
        setQ("");
        setCls("all");
        setProvedOnly(false);
      });
      return () => cancelAnimationFrame(r);
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
      <header className="mb-3"><p className={`${ui.eyebrow} mb-2`}>I risultati che collegano le classi</p><h1 className={ui.h2}>Teoremi del corso</h1></header>
      <p className={`${ui.lede} mb-4`}>
        Leggi l&apos;enunciato, poi apri la scheda: trovi l&apos;idea, la frase da scrivere nella risposta e la dimostrazione.
      </p>
      <p className={`${ui.noteOk} mb-4 max-w-prose`}>
        I 17 teoremi segnati con ★ servono in almeno 8 domande delle tracce ciascuno e da soli coprono circa due terzi delle citazioni: parti da quelli. Ordina per &laquo;Più chiesti&raquo; per vederli per primi.
      </p>
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
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <label htmlFor="thcls" className="inline-flex cursor-pointer items-center gap-2 font-ui text-sm text-muted">
          Classe
          <select id="thcls" className={ui.select} value={cls} onChange={(e) => setCls(e.target.value)}>
            <option value="all">Tutte</option>
            {CLASS_OPTIONS.map((id) => (
              <option key={id} value={id}>
                {PLAIN[id]}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="thsort" className="inline-flex cursor-pointer items-center gap-2 font-ui text-sm text-muted">
          Ordina
          <select id="thsort" className={ui.select} value={byFreq ? "freq" : "cap"} onChange={(e) => setByFreq(e.target.value === "freq")}>
            <option value="cap">Per capitolo</option>
            <option value="freq">Più chiesti</option>
          </select>
        </label>
        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-muted"><input type="checkbox" className="size-4 accent-accent" checked={provedOnly} onChange={e => setProvedOnly(e.target.checked)} />Solo dimostrati nel corso</label>
        <span role="status" className="font-ui text-sm text-muted">
          {list.length === THEOREMS.length ? `${THEOREMS.length} risultati` : `${list.length} di ${THEOREMS.length}`}
        </span>
      </div>
      <div>
        {groups.length ? (
          groups.map((g) => (
            <section key={g.k} className="mt-6">
              <h2 className="border-b border-line pb-2 font-ui text-xs font-semibold uppercase tracking-widest text-muted">
                {byFreq ? PRIORITY[g.k as keyof typeof PRIORITY].label : chapterTitle(g.k)}
                {byFreq && <span className="ml-2 font-normal normal-case tracking-normal">· {PRIORITY[g.k as keyof typeof PRIORITY].hint}</span>}
              </h2>
              {g.items.map((t) => (
                <TheoremRow key={t.id} t={t} />
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
