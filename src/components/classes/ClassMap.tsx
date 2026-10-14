"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { ALIAS, HASSE_STRICT, IDS, INC, NAME, NOBADGE, NODE_H as H, NODE_W, PLAIN, POS, SEP_DRAW, type ClassId } from "@/data/classes";
import { BASE } from "@/lib/engine";
import { classColor, ui } from "@/lib/ui";

/* Opzioni della mappa (Separazioni dimostrate / Questioni aperte): restano tra una classe e l'altra. */
type Opts = { sep: boolean; open: boolean };
const DEFAULT_OPTS: Opts = { sep: false, open: false };
let opts = DEFAULT_OPTS;
const subs = new Set<() => void>();
const setOpts = (p: Partial<Opts>) => {
  opts = { ...opts, ...p };
  subs.forEach((f) => f());
};
const subscribe = (f: () => void) => {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
};
const useOpts = () => useSyncExternalStore(subscribe, () => opts, () => DEFAULT_OPTS);

/* Su schermi stretti, dopo un tocco sulla mappa la scheda scorre in vista (come nella pagina). */
const panelScroll = { pending: false };
const requestPanelScroll = () => {
  panelScroll.pending = true;
};
export function usePanelScroll() {
  useEffect(() => {
    if (!panelScroll.pending) return;
    panelScroll.pending = false;
    if (window.innerWidth < 900) document.getElementById("panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
}

const BANDS: [string, number, number][] = [
  ["Calcolabilità", 15, 195],
  ["Esponenziale", 195, 360],
  ["Spazio pol.", 360, 440],
  ["Gerarchia polinomiale", 440, 1000],
  ["Tempo pol.", 1000, 1080],
  ["Spazio logaritmico", 1080, 1240],
];
const EQQ: [ClassId, ClassId][] = [
  ["NP", "coNP"],
  ["SIGMA2", "PI2"],
  ["SIGMAi", "PIi"],
];
const badgeText = "font-bold [text-anchor:middle] [dominant-baseline:central]";

/** nome nel riquadro: pedice e apice come tspan */
function NodeName({ id }: { id: ClassId }) {
  const m = NAME[id].match(/^(.*?)<sub>(.*?)<\/sub><sup>(.*?)<\/sup>(.*)$/);
  if (!m) return <>{NAME[id]}</>;
  return (
    <>
      {m[1]}
      <tspan baselineShift="sub" fontSize="11">
        {m[2]}
      </tspan>
      <tspan dx="-6" baselineShift="super" fontSize="11">
        {m[3]}
      </tspan>
      {m[4]}
    </>
  );
}

export default function ClassMap({ sel }: { sel: ClassId | null }) {
  const router = useRouter();
  const { sep: showSep, open: showOpen } = useOpts();
  const [hover, setHover] = useState<ClassId | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bx = box.current;
    if (bx && bx.scrollWidth > bx.clientWidth) bx.scrollLeft = (bx.scrollWidth - bx.clientWidth) / 2;
  }, []);

  const cur = hover ?? sel;
  const inSub = (x: ClassId) => !!cur && (x === cur || BASE.R(x, cur));
  const inSup = (x: ClassId) => !!cur && (x === cur || BASE.R(cur, x));

  const go = (id: ClassId | null) => {
    const next = id && id !== sel ? id : null;
    if (next) requestPanelScroll();
    setHover(null);
    router.push(next ? `/classi/${next}` : "/classi", { scroll: false });
  };
  const onKey = (id: ClassId) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go(id);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1.5 pb-2.5 pt-1 font-ui text-[0.84rem] text-muted">
        <label className="flex cursor-pointer items-center gap-1.5">
          <input type="checkbox" className="accent-accent" checked={showSep} onChange={(e) => setOpts({ sep: e.target.checked })} />{" "}
          Separazioni dimostrate
        </label>
        <label className="flex cursor-pointer items-center gap-1.5">
          <input type="checkbox" className="accent-accent" checked={showOpen} onChange={(e) => setOpts({ open: e.target.checked })} />{" "}
          Questioni aperte
        </label>
        <button className={ui.linkBtn} type="button" onClick={() => go(null)}>
          Togli la selezione
        </button>
      </div>
      <p className={`${ui.hint} hidden px-1.5 pb-1.5 max-[560px]:block`}>Su schermi stretti la mappa scorre di lato.</p>
      <div ref={box} className="overflow-x-auto">
        <svg
          className="block h-auto w-full min-w-[480px] font-ui"
          viewBox="0 0 760 1250"
          role="group"
          aria-label="Diagramma delle inclusioni tra le classi di complessità"
        >
          {BANDS.map(([t, y1, y2], i) => (
            <g key={t}>
              <rect x={0} y={y1} width={760} height={y2 - y1} className={i % 2 ? "fill-band-b" : "fill-band-a"} />
              <text
                x={22}
                y={(y1 + y2) / 2}
                transform={`rotate(-90 22 ${(y1 + y2) / 2})`}
                textAnchor="middle"
                className="fill-muted text-[10px] font-semibold uppercase tracking-[0.09em]"
              >
                {t}
              </text>
            </g>
          ))}

          <g>
            {INC.map(([a, b]) => {
              const [x1, y1] = POS[a],
                [x2, y2] = POS[b];
              const strict = HASSE_STRICT.has(a + ">" + b);
              const hot = !!cur && ((inSub(a) && inSub(b)) || (inSup(a) && inSup(b)));
              return (
                <line
                  key={a + ">" + b}
                  x1={x1}
                  y1={y1 - H / 2}
                  x2={x2}
                  y2={y2 + H / 2}
                  className={`fill-none ${strict ? "stroke-proved" : hot ? "stroke-ink" : "stroke-line-strong"} ${
                    hot ? "[stroke-width:2]" : strict ? "[stroke-width:1.8]" : "[stroke-width:1.4]"
                  } ${cur && !hot ? "opacity-[.18]" : ""}`}
                />
              );
            })}
          </g>

          <g>
            {INC.map(([a, b]) => {
              const k = a + ">" + b;
              if (NOBADGE.has(k)) return null;
              const strict = HASSE_STRICT.has(k);
              if (!strict && !showOpen) return null;
              const [x1, y1] = POS[a],
                [x2, y2] = POS[b];
              const mx = (x1 + x2) / 2,
                my = (y1 - H / 2 + y2 + H / 2) / 2;
              return (
                <g key={k}>
                  <circle cx={mx} cy={my} r={strict ? 8 : 7} className={`fill-surface [stroke-width:1] ${strict ? "stroke-proved" : "stroke-open"}`} />
                  <text x={mx} y={my + 0.5} className={`${badgeText} ${strict ? "fill-proved text-[11px]" : "fill-open text-[10px]"}`}>
                    {strict ? "⊊" : "?"}
                  </text>
                  <title>
                    {strict
                      ? `${PLAIN[a]} ⊊ ${PLAIN[b]}: inclusione stretta ${k === "NEXP>R" ? "ricavata dai risultati del corso" : "dimostrata"}`
                      : `${PLAIN[a]} ⊆ ${PLAIN[b]}: dimostrata; se sia stretta non si sa`}
                  </title>
                </g>
              );
            })}
            {showOpen &&
              EQQ.map(([a, b]) => {
                const x = (POS[a][0] + POS[b][0]) / 2,
                  y = POS[a][1];
                return (
                  <g key={a + "=" + b}>
                    <circle cx={x} cy={y} r={9.5} className="fill-surface stroke-open [stroke-width:1]" />
                    <text x={x} y={y + 0.5} className={`${badgeText} fill-open text-[10px]`}>
                      =?
                    </text>
                    <title>{`${PLAIN[a]} e ${PLAIN[b]}: non si sa se siano uguali, né se una contenga l'altra`}</title>
                  </g>
                );
              })}
            {(() => {
              const x = (POS.RE[0] + POS.coRE[0]) / 2,
                y = POS.RE[1];
              return (
                <g>
                  <circle cx={x} cy={y} r={9.5} className="fill-surface stroke-proved [stroke-width:1]" />
                  <text x={x} y={y + 0.5} className={`${badgeText} fill-proved text-[11px]`}>
                    ≠
                  </text>
                  <title>RE ≠ coRE (ricavata dalla validità del primo ordine)</title>
                </g>
              );
            })()}
          </g>

          {showSep && (
            <g>
              {SEP_DRAW.map(([a, b, side, x, dA, dB]) => {
                const ex = (id: ClassId) => (side === "left" ? POS[id][0] - NODE_W[id] / 2 : POS[id][0] + NODE_W[id] / 2);
                const y1 = POS[a][1] + dA,
                  y2 = POS[b][1] + dB;
                const my = (y1 + y2) / 2,
                  tx = x + (side === "left" ? -5 : 5);
                const faded = !!cur && !(inSub(a) || inSup(a)) && !(inSub(b) || inSup(b));
                return (
                  <g key={a + ">" + b} className={faded ? "opacity-15" : ""}>
                    <path d={`M${ex(a)} ${y1} H${x} V${y2} H${ex(b)}`} strokeLinejoin="round" className="fill-none stroke-proved [stroke-width:1.6]" />
                    <text
                      x={tx}
                      y={my}
                      textAnchor="middle"
                      transform={`rotate(-90 ${tx} ${my})`}
                      className="fill-proved stroke-surface font-mono text-[11.5px] font-semibold [paint-order:stroke] [stroke-width:5]"
                    >
                      {`${PLAIN[a]} ⊊ ${PLAIN[b]}`}
                    </text>
                    <title>{`${PLAIN[a]} ⊊ ${PLAIN[b]}: separazione dimostrata`}</title>
                  </g>
                );
              })}
            </g>
          )}

          <g>
            {IDS.map((id) => {
              const [cx, cy] = POS[id];
              const w = NODE_W[id];
              const state = !cur ? "" : id === cur ? "sel" : BASE.R(id, cur) ? "sub" : BASE.R(cur, id) ? "sup" : "far";
              const rect =
                state === "sel"
                  ? "fill-[color-mix(in_srgb,var(--c)_22%,var(--color-surface))] [stroke-width:2.6]"
                  : state === "sub"
                    ? "fill-[color-mix(in_srgb,var(--c)_11%,var(--color-surface))] [stroke-width:1.3] group-hover:[stroke-width:2.2]"
                    : state === "sup"
                      ? "fill-surface [stroke-width:2.2]"
                      : "fill-surface [stroke-width:1.3] group-hover:[stroke-width:2.2]";
              return (
                <g
                  key={id}
                  className={`group cursor-pointer outline-none transition-opacity duration-200 focus-visible:[&>rect]:stroke-accent ${state === "far" ? "opacity-30" : ""}`}
                  style={classColor(id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Classe ${PLAIN[id]}`}
                  aria-pressed={id === sel}
                  onClick={() => go(id)}
                  onKeyDown={onKey(id)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setHover(id);
                  }}
                  onPointerLeave={() => setHover((h) => (h === id ? null : h))}
                >
                  <rect x={cx - w / 2} y={cy - H / 2} width={w} height={H} rx={10} className={`stroke-(--c) transition-[stroke-width,fill] duration-200 ${rect}`} />
                  <text x={cx} y={cy - 3} textAnchor="middle" className="fill-(--c) font-mono text-[16px] font-semibold">
                    <NodeName id={id} />
                  </text>
                  <text x={cx} y={cy + 15} textAnchor="middle" className="fill-muted text-[11px]">
                    {ALIAS[id] ?? ""}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </>
  );
}
