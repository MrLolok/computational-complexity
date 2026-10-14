"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONN, LADDER, PROBLEMS, PROBLEM_BY, ROWS, type LadderId } from "@/data/problems";
import { BANDS, REL, colorId, matches } from "@/lib/problems";
import { classColor, ui } from "@/lib/ui";
import ProblemDetail from "./ProblemDetail";

const DEFAULT = "SAT2";
const MOBILE = "(max-width: 900px)";
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** su schermi stretti il dettaglio sta sotto la scala: ci si scende */
function scrollToDetail(el: HTMLElement | null) {
  if (el && window.matchMedia(MOBILE).matches) el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
}

/** id del problema scelto, letto dal percorso /problemi/<id> */
function selectedFrom(path: string | null) {
  const m = path?.match(/^\/problemi\/([^/]+)/);
  const id = m ? decodeURIComponent(m[1]) : null;
  return id && PROBLEM_BY[id] ? id : null;
}

export default function ProblemsView() {
  const pathname = usePathname();
  const sel = selectedFrom(pathname);
  const shown = PROBLEM_BY[sel ?? DEFAULT];
  const [filt, setFilt] = useState<Set<LadderId>>(() => new Set());
  const [query, setQuery] = useState("");
  const [onlyC, setOnlyC] = useState(false);
  const detRef = useRef<HTMLElement>(null);

  /* aperta da un indirizzo /problemi/<id>: su schermi stretti si scende al dettaglio */
  const firstSel = useRef(sel);
  useEffect(() => {
    if (firstSel.current) scrollToDetail(detRef.current);
  }, []);

  const select = (id: string, scroll: boolean) => {
    if (!PROBLEM_BY[id]) return;
    if (id === sel) window.history.replaceState(null, "", `/problemi/${id}`);
    else window.history.pushState(null, "", `/problemi/${id}`);
    if (scroll) requestAnimationFrame(() => scrollToDetail(detRef.current));
  };

  /* dai collegamenti del dettaglio: si torna in cima al dettaglio */
  const go = (id: string) => {
    select(id, false);
    requestAnimationFrame(() => {
      const d = detRef.current;
      if (!d) return;
      if (window.matchMedia(MOBILE).matches) d.scrollIntoView({ block: "start" });
      else d.scrollTop = 0;
    });
  };

  const toggle = (id: LadderId) =>
    setFilt((f) => {
      const n = new Set(f);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const reset = () => {
    setFilt(new Set());
    setQuery("");
    setOnlyC(false);
  };

  const rel = new Set((REL[shown.id] || []).map((r) => r[0]));
  const active = !!sel;

  return (
    <section className="flex flex-col">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 pb-3.5">
        <label className={ui.search} htmlFor="pbq">
          <span aria-hidden="true">⌕</span>
          <input
            id="pbq"
            type="search"
            className={ui.input}
            placeholder="Cerca un problema (es. tsp, qsat, unsat)"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="inline-flex cursor-pointer select-none items-center gap-2 font-ui text-[0.88rem] text-muted" htmlFor="pbonly">
          <input id="pbonly" type="checkbox" className="size-4 accent-accent" checked={onlyC} onChange={(e) => setOnlyC(e.target.checked)} />
          Solo problemi completi
        </label>
        <button className={ui.linkBtn} type="button" onClick={reset}>
          Azzera filtri
        </button>
        <div className="flex basis-full flex-wrap gap-1.5" aria-label="Filtra per classe">
          {BANDS.map((id) => {
            const on = filt.has(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(id)}
                style={classColor(id)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-[3px] font-mono text-[0.78rem] text-ink before:size-[7px] before:rounded-full before:bg-(--c) ${on ? "border-(--c) bg-(--c)/14 font-semibold" : "border-line"}`}
              >
                <span dangerouslySetInnerHTML={{ __html: LADDER[id].t || LADDER[id].n }} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid items-start gap-7 min-[901px]:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="min-w-0">
          <div className="flex flex-col-reverse">
            {ROWS.map((row, i) => (
              <Fragment key={row.join("-")}>
                <div className={`grid gap-2.5 ${row.length === 2 ? "min-[561px]:grid-cols-2" : ""}`}>
                  {row.map((bid) => {
                    const items = PROBLEMS.filter((p) => p.b === bid && matches(p, query, filt, onlyC));
                    const dim = filt.size > 0 && !filt.has(bid);
                    return (
                      <section
                        key={bid}
                        style={classColor(bid)}
                        className={`min-w-0 border-l-2 border-(--c) py-2 pl-3.5 pr-1 pb-2.5 transition-opacity ${dim ? "opacity-40" : ""}`}
                      >
                        <div className="mb-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                          <Link
                            href={`/classi/${bid}`}
                            title={`Apri ${LADDER[bid].t || LADDER[bid].n.replace(/<[^>]+>/g, "")} nella mappa delle classi`}
                            className="border-b border-dotted border-current font-mono text-base font-semibold text-(--c) no-underline hover:border-solid"
                            dangerouslySetInnerHTML={{ __html: LADDER[bid].n }}
                          />
                          <span className="min-w-0 font-ui text-[0.84rem] text-muted" dangerouslySetInnerHTML={{ __html: LADDER[bid].d }} />
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((p) => {
                            const on = active && p.id === shown.id;
                            const faded = active && !on && !rel.has(p.id);
                            return (
                              <button
                                key={p.id}
                                type="button"
                                title={p.lab.replace(/<[^>]+>/g, "")}
                                onClick={() => select(p.id, true)}
                                style={classColor(colorId(p))}
                                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-[7px] border px-[9px] py-1 font-ui text-[0.86rem] font-semibold text-ink transition-[opacity,box-shadow] hover:border-(--c) ${p.full ? "border-(--c)/70 bg-[color-mix(in_srgb,var(--c)_13%,var(--color-surface))]" : "border-[color-mix(in_srgb,var(--c)_40%,var(--color-line))] bg-surface"} ${faded ? "opacity-60" : ""} ${on ? "ring-2 ring-accent" : ""}`}
                              >
                                {p.lv && <span className="font-mono text-[0.7rem] font-semibold text-(--c)">{p.lv}</span>}
                                <span>{p.name}</span>
                                {p.full && <span className="text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-(--c)">compl.</span>}
                                {p.ext && (
                                  <span className="text-[0.75rem] text-accent" title="Completezza presa da fuori delle fonti">
                                    ✱
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {bid === "L" && (
                          <p className="text-[0.86rem] italic text-muted">
                            Nessun problema del corso è classificato qui dalle fonti. 2-COL starebbe qui secondo un risultato esterno al corso.
                          </p>
                        )}
                      </section>
                    );
                  })}
                </div>
                {CONN[i] && (
                  <div
                    className={`flex min-w-0 items-baseline gap-2.5 py-[5px] pl-4 pr-1.5 font-ui text-[0.8rem] text-muted ${CONN[i][2] ? "my-1.5 border-y border-dashed border-line-strong py-2" : ""}`}
                  >
                    <b className="font-mono text-base font-normal text-ink">{CONN[i][0]}</b>
                    <span dangerouslySetInnerHTML={{ __html: CONN[i][1] }} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 px-0.5 pt-3 font-ui text-[0.8rem] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block h-[13px] w-5 rounded border border-muted bg-muted/25" /> completo per la classe
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="inline-block h-[13px] w-5 rounded border border-muted" /> sta nella classe, non noto completo
            </span>
            <span className="inline-flex items-center gap-1.5">
              <b className="text-accent">✱</b> completezza presa da fuori delle fonti
            </span>
          </div>
        </div>

        <aside
          ref={detRef}
          aria-live="polite"
          style={classColor(colorId(shown))}
          className="flex min-w-0 scroll-mt-16 flex-col gap-3.5 border-t border-line pt-5 min-[901px]:sticky min-[901px]:top-16 min-[901px]:max-h-[calc(100vh-80px)] min-[901px]:overflow-auto min-[901px]:border-l min-[901px]:border-t-0 min-[901px]:py-1 min-[901px]:pl-6 min-[901px]:pr-0.5"
        >
          <ProblemDetail p={shown} onGo={go} />
        </aside>
      </div>
    </section>
  );
}
