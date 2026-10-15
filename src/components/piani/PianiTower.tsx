"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Rich from "@/components/Rich";
import { CLASS_PROBLEMS } from "@/data/classes";
import { BANDS, HYP, TE, TOWER_IDS, TW, type TowerId } from "@/data/piani";
import { edgeHot, infoOf, mergeBox, nodeState, nodeWidth, tDown, tUp, type NodeState } from "@/lib/piani";
import { classColor, ui } from "@/lib/ui";
import { selectTower, useTowerSel } from "./towerSelection";
import { texHtml } from "@/lib/tex";
import Tex from "@/components/Tex";

const NODE_RECT: Record<NodeState, string> = {
  sel: "fill-[color-mix(in_srgb,var(--c)_22%,var(--color-surface))] stroke-3",
  sub: "fill-[color-mix(in_srgb,var(--c)_11%,var(--color-surface))] stroke-1.5 group-hover:stroke-2",
  sup: "fill-surface stroke-2",
  far: "fill-surface stroke-1.5 group-hover:stroke-2",
};
const h4 = "font-ui text-xs uppercase tracking-widest text-muted font-semibold mb-1.5";

/** etichetta di un nodo: Σ₂ᴾ diventa Σ con pedice e apice veri */
function NodeLabel({ lab }: { lab: string }) {
  const mm = lab.match(/^([ΣΠΔ])([₀-₉])ᴾ$/);
  if (!mm) return <>{lab}</>;
  return (
    <>
      {mm[1]}
      <tspan dy="4" fontSize="12">
        {"₀₁₂₃₄₅₆₇₈₉".indexOf(mm[2])}
      </tspan>
      <tspan dy="-11" fontSize="11">
        P
      </tspan>
    </>
  );
}
/** "NP^NP": la parte dopo ^ va in apice */
function SvgSup({ str }: { str: string }) {
  const i = str.indexOf("^");
  if (i < 0) return <>{str}</>;
  return (
    <>
      {str.slice(0, i)}
      <tspan dy="-5" fontSize="9">
        {str.slice(i + 1)}
      </tspan>
    </>
  );
}

export default function PianiTower() {
  const sel = useTowerSel();
  const [hyp, setHyp] = useState("none");
  const boxRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLElement>(null);

  // su schermi stretti il disegno scorre di lato: lo si centra all'apertura
  useEffect(() => {
    const bx = boxRef.current;
    if (bx && bx.scrollWidth > bx.clientWidth) bx.scrollLeft = (bx.scrollWidth - bx.clientWidth) / 2;
  }, []);

  const up = tUp(sel),
    dn = tDown(sel);
  const h = HYP.find((x) => x.id === hyp) ?? HYP[0];
  const M = new Set<TowerId>(h.merged);
  const box = M.size ? mergeBox(h.merged) : null;

  const go = (id: TowerId) => {
    selectTower(id);
    if (!window.matchMedia("(min-width: 64rem)").matches) infoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const onKey = (id: TowerId) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go(id);
    }
  };

  const n = TW[sel],
    I = infoOf(sel);
  const probs = n.map ? CLASS_PROBLEMS[n.map] : undefined;

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
      <div id="towercard" className={`${ui.card} scroll-mt-20`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1.5 pt-1 pb-2.5 font-ui text-sm text-muted">
          <label htmlFor="hyp">Ipotesi</label>
          <select id="hyp" className={`${ui.select} min-w-0`} value={hyp} onChange={(e) => setHyp(e.target.value)}>
            {HYP.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
              </option>
            ))}
          </select>
        </div>
        <div className="px-1.5 pb-2">
          {h.note ? (
            <div className={ui.note}>
              <b className="font-ui font-semibold">Se fosse vero.</b> <span dangerouslySetInnerHTML={{ __html: texHtml(h.note) }} />
            </div>
          ) : (
            <p className={ui.hint}>
              Nessuna di queste uguaglianze è dimostrata, e nessuna inclusione della torre è dimostrata stretta. Scegli un&apos;ipotesi per
              vedere fin dove crollerebbe la torre.
            </p>
          )}
        </div>
        <p className={`${ui.hint} hidden px-1.5 pb-1.5 max-sm:block`}>Scorri il disegno di lato per vederlo tutto.</p>
        <div ref={boxRef} className="overflow-x-auto">
          <svg
            viewBox="0 0 520 830"
            role="group"
            aria-label="Torre dei piani di PH"
            className="block h-auto w-full min-w-120 font-ui"
          >
            {BANDS.map(([lv, a, b], k) => (
              <g key={lv}>
                <rect x={0} y={a} width={520} height={b - a} rx={8} className={k % 2 ? "fill-band-a" : "fill-band-b"} />
                <text x={8} y={(a + b) / 2 + 4} className="fill-muted text-xs font-semibold uppercase tracking-wide">
                  piano {lv}
                </text>
              </g>
            ))}
            {box && (
              <g>
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.width}
                  height={box.height}
                  rx={14}
                  className="fill-accent-soft/60 stroke-accent stroke-1.5 [stroke-dasharray:6_4]"
                />
                <text x={box.lx} y={box.ly} className="fill-accent font-ui text-xs font-semibold">
                  {h.tag}
                </text>
              </g>
            )}
            {TE.map(([a, b]) => {
              const A = TW[a],
                B = TW[b];
              const dashed = a === "S4" || a === "P4";
              const hot = edgeHot(a, b, sel, up, dn);
              return (
                <line
                  key={a + ">" + b}
                  x1={A.x}
                  y1={A.y - 22}
                  x2={B.x}
                  y2={B.y + 22}
                  strokeDasharray={dashed ? "4 4" : undefined}
                  className={hot ? "stroke-ink stroke-2" : "stroke-line-strong stroke-1.5"}
                />
              );
            })}
            {[130, 390].map((x) => (
              <text key={x} x={x} y={160} textAnchor="middle" className="fill-muted text-2xl">
                ⋮
              </text>
            ))}
            <g>
              <circle cx={260} cy={73} r={9} className="fill-surface stroke-open stroke-1" />
              <text x={260} y={73} textAnchor="middle" dominantBaseline="central" className="fill-open text-xs font-bold">
                ?
              </text>
            </g>
            {[1, 2, 3, 4].map((i) => (
              <g key={i} className={M.has(`S${i}` as TowerId) ? "opacity-12" : undefined}>
                <text x={260} y={TW[`S${i}` as TowerId].y + 4} textAnchor="middle" className="fill-open font-mono text-sm font-bold">
                  =?
                </text>
              </g>
            ))}
            {TOWER_IDS.map((id) => {
              const t = TW[id];
              const st = nodeState(id, sel, up, dn);
              const w = nodeWidth(id);
              return (
                <g
                  key={id}
                  tabIndex={0}
                  role="button"
                  aria-label={t.lab + " — " + t.sub.replace("^", " con oracolo ")}
                  aria-pressed={id === sel}
                  style={classColor(t.c)}
                  className={`group cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-accent ${st === "far" ? "opacity-38" : ""}`}
                  onClick={() => go(id)}
                  onKeyDown={onKey(id)}
                >
                  <rect
                    x={t.x - w / 2}
                    y={t.y - 22}
                    width={w}
                    height={44}
                    rx={9}
                    className={`stroke-(--c) transition-[opacity,stroke-width] duration-200 ${NODE_RECT[st]} ${M.has(id) ? "[stroke-dasharray:5_3]" : ""}`}
                  />
                  <text x={t.x} y={t.y - 3} textAnchor="middle" className="fill-(--c) font-mono text-base font-semibold">
                    <NodeLabel lab={t.lab} />
                  </text>
                  <text x={t.x} y={t.y + 14} textAnchor="middle" className="fill-muted text-xs">
                    <SvgSup str={t.sub} />
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="mt-1.5 grid grid-cols-1 gap-x-4 gap-y-2 border-t border-line pt-3 font-ui text-sm text-muted">
          <div className="flex items-center gap-2">
            <svg width="34" height="14" className="flex-none" aria-hidden="true">
              <line x1="2" y1="7" x2="32" y2="7" className="stroke-muted stroke-1.5" />
            </svg>
            inclusione dimostrata (dal basso verso l&apos;alto), non si sa se stretta
          </div>
          <div className="flex items-center gap-2">
            <span className={`${ui.mono} font-bold text-open`}>=?</span><span>non si sa se <Tex>{String.raw`\Sigma_i^{\mathrm{P}} = \Pi_i^{\mathrm{P}}`}</Tex></span>
          </div>
        </div>
      </div>

      <aside
        ref={infoRef}
        id="tinfo"
        aria-live="polite"
        style={classColor(n.c)}
        className={`${ui.card} scroll-mt-20 lg:sticky lg:top-[calc(env(safe-area-inset-top)+var(--spacing)*16)] lg:max-h-[calc(100svh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-var(--spacing)*20)] lg:overflow-auto`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3.5">
          <div>
            <div
              className="font-mono text-3xl font-semibold leading-tight text-(--c)"
              dangerouslySetInnerHTML={{ __html: texHtml(I.title) }}
            />
            <div className="mt-1 font-ui text-base font-medium text-muted" dangerouslySetInnerHTML={{ __html: texHtml(I.sub) }} />
          </div>
          {n.map && (
            <Link href={`/classi/${n.map}`} className={`${ui.btn} no-underline`}>
              Scheda della classe →
            </Link>
          )}
        </div>
        {I.blocks.map(([title, body]) => (
          <div key={title} className="mt-4 flex flex-col gap-2">
            <h4 className={h4} dangerouslySetInnerHTML={{ __html: texHtml(title) }} />
            <Rich
              html={body.startsWith("<") ? body : `<p>${body}</p>`}
              className="flex flex-col gap-2 [&_p]:max-w-prose"
            />
          </div>
        ))}
        <div className="mt-4 flex flex-col gap-2">
          <h4 className={h4}>Dove sta nella torre</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <h4 className={h4}>Contiene</h4>
              <div
                className={ui.hint}
                dangerouslySetInnerHTML={{ __html: texHtml(I.contains.length ? I.contains.join(", ") : "nessuna classe della torre") }}
              />
            </div>
            <div>
              <h4 className={h4}>È contenuta in</h4>
              <div className={ui.hint} dangerouslySetInnerHTML={{ __html: texHtml(I.inside.join(", ")) }} />
            </div>
          </div>
        </div>
        {probs && (
          <p className="mt-2.5 text-base leading-relaxed">
            <b className="font-ui font-semibold">Problemi:</b>{" "}
            {probs.map(([k, t], i) => (
              <span key={k + i}>
                {i > 0 && " · "}
                <Link href={`/problemi/${k}`} className="whitespace-nowrap text-accent underline underline-offset-2" dangerouslySetInnerHTML={{ __html: texHtml(t, false) }} />
              </span>
            ))}
          </p>
        )}
        <p className="mt-4 text-sm text-muted">
          <b className="font-ui font-semibold">Fonti:</b> dispensa cap. 16–17; slide Lez. 9; appunti Lez. 9 §2–§6.
        </p>
      </aside>
    </div>
  );
}
