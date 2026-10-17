"use client";

import type { MapNode } from "@/data/probabilistic-quantum/map";
import type { KeyboardEvent } from "react";

import { useState } from "react";
import Link from "next/link";

import Arrow from "@/components/Arrow";
import MathHtml from "@/components/MathHtml";
import Tex from "@/components/Tex";
import {
    MAP_CONJ,
    MAP_EXAMPLES,
    MAP_INC,
    MAP_INFO,
    MAP_NAME,
    MAP_NODES,
    MAP_POS,
    MAP_STRICT,
} from "@/data/probabilistic-quantum/map";
import { classColor, ui } from "@/lib/tokens";

const W = 104,
    H = 44;
const badgeText = "font-bold [text-anchor:middle] [dominant-baseline:central]";
/** a ⊆ b, chiusura transitiva delle inclusioni dimostrate */
const below = (a: MapNode, b: MapNode): boolean => MAP_INC.some(([x, y]) => x === a && (y === b || below(y, b)));
const width = (id: MapNode) => (id === "PSPACE" ? 116 : W);

/** Mappa delle classi probabilistiche e quantistiche: un clic su una classe mostra significato, condizione di accettazione e relazioni. */
export default function ProbabilisticQuantumMap({ initial }: { initial: MapNode }) {
    const [sel, setSel] = useState<MapNode>(initial);
    const [hover, setHover] = useState<MapNode | null>(null);
    const cur = hover ?? sel;
    const near = (x: MapNode) => x === cur || below(x, cur) || below(cur, x);
    const info = MAP_INFO[sel];
    const onKey = (id: MapNode) => (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSel(id);
        }
    };
    const [bx, by] = MAP_POS.BQP,
        [nx] = MAP_POS.NP;

    return (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            <div className="border-line bg-surface min-w-0 rounded-xl border p-2.5">
                <div className="overflow-x-auto">
                    <svg
                        className="font-ui mx-auto block h-auto max-h-[580px] w-full min-w-[330px]"
                        viewBox="0 0 470 632"
                        role="group"
                        aria-label="Mappa delle classi probabilistiche e quantistiche"
                    >
                        <g>
                            {MAP_INC.map(([a, b]) => {
                                const [x1, y1] = MAP_POS[a],
                                    [x2, y2] = MAP_POS[b];
                                const k = `${a}>${b}`;
                                const strict = MAP_STRICT.has(k);
                                const hot = near(a) && near(b);
                                return (
                                    <line
                                        key={k}
                                        x1={x1}
                                        y1={y1 - H / 2}
                                        x2={x2}
                                        y2={y2 + H / 2}
                                        className={`${strict ? "stroke-proved [stroke-width:1.8]" : hot ? "stroke-ink [stroke-width:2]" : "stroke-line-strong [stroke-width:1.4]"} ${hot ? "" : "opacity-30"}`}
                                    />
                                );
                            })}
                            <line
                                x1={bx + W / 2}
                                y1={by}
                                x2={nx - W / 2}
                                y2={by}
                                strokeDasharray="6 5"
                                className="stroke-open [stroke-width:1.6]"
                            />
                        </g>
                        <g>
                            {MAP_INC.map(([a, b]) => {
                                const k = `${a}>${b}`;
                                const strict = MAP_STRICT.has(k);
                                if (!strict && !MAP_CONJ[k]) return null;
                                const [x1, y1] = MAP_POS[a],
                                    [x2, y2] = MAP_POS[b];
                                const mx = (x1 + x2) / 2,
                                    my = (y1 - H / 2 + y2 + H / 2) / 2;
                                return (
                                    <g key={k}>
                                        <circle
                                            cx={mx}
                                            cy={my}
                                            r={strict ? 8 : 7}
                                            className={`fill-surface [stroke-width:1] ${strict ? "stroke-proved" : "stroke-open"}`}
                                        />
                                        <text
                                            x={mx}
                                            y={my + 0.5}
                                            className={`${badgeText} ${strict ? "fill-proved text-[11px]" : "fill-open text-[10px]"}`}
                                        >
                                            {strict ? "⊊" : "?"}
                                        </text>
                                        <title>
                                            {strict
                                                ? "EXP ⊊ 2-EXP: inclusione stretta dimostrata (teorema di gerarchia del tempo)"
                                                : MAP_CONJ[k]}
                                        </title>
                                    </g>
                                );
                            })}
                            <g>
                                <text
                                    x={(bx + nx) / 2}
                                    y={by - 11}
                                    textAnchor="middle"
                                    className="fill-open text-[12px] font-semibold"
                                >
                                    incomparabili?
                                </text>
                                <text
                                    x={(bx + nx) / 2}
                                    y={by + 14}
                                    textAnchor="middle"
                                    className="fill-muted text-[11px]"
                                >
                                    fattorizzazione
                                    <tspan x={(bx + nx) / 2} dy={13}>
                                        in entrambe
                                    </tspan>
                                </text>
                                <title>
                                    NP e BQP: si congettura che siano incomparabili (NP ⊄ BQP e BQP ⊄ NP). La
                                    fattorizzazione sta in entrambe.
                                </title>
                            </g>
                        </g>
                        <g>
                            {MAP_NODES.map((id) => {
                                const [cx, cy] = MAP_POS[id];
                                const w = width(id);
                                const ex = MAP_EXAMPLES[id];
                                const right = id !== "NP";
                                return (
                                    <g
                                        key={id}
                                        className={`group focus-visible:[&>rect]:stroke-accent cursor-pointer transition-opacity duration-200 outline-none ${near(id) ? "" : "opacity-30"}`}
                                        style={classColor(id)}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`Classe ${MAP_NAME[id]}`}
                                        aria-pressed={id === sel}
                                        onClick={() => setSel(id)}
                                        onKeyDown={onKey(id)}
                                        onPointerEnter={(e) => {
                                            if (e.pointerType === "mouse") setHover(id);
                                        }}
                                        onPointerLeave={() => setHover((h) => (h === id ? null : h))}
                                    >
                                        <rect
                                            x={cx - w / 2}
                                            y={cy - H / 2}
                                            width={w}
                                            height={H}
                                            rx={10}
                                            className={`stroke-(--c) transition-[stroke-width,fill] duration-200 ${id === sel ? "fill-[color-mix(in_srgb,var(--c)_22%,var(--color-surface))] [stroke-width:2.6]" : "fill-surface [stroke-width:1.3] group-hover:[stroke-width:2.2]"}`}
                                        />
                                        <text
                                            x={cx}
                                            y={cy + 6}
                                            textAnchor="middle"
                                            className="fill-(--c) font-mono text-[18px] font-semibold"
                                        >
                                            {MAP_NAME[id]}
                                        </text>
                                        {ex && (
                                            <text
                                                x={right ? cx + w / 2 + 10 : cx + 10}
                                                y={right ? cy + 5 - (ex.length - 1) * 7.5 : cy + H / 2 + 18}
                                                className="fill-muted stroke-surface [stroke-width:4] text-[12px] [paint-order:stroke]"
                                            >
                                                {ex.map((line, i) => (
                                                    <tspan
                                                        key={line}
                                                        x={right ? cx + w / 2 + 10 : cx + 10}
                                                        dy={i ? 15 : 0}
                                                    >
                                                        {line}
                                                    </tspan>
                                                ))}
                                            </text>
                                        )}
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                </div>
                <div className="border-line font-ui text-muted mt-1.5 flex flex-wrap gap-x-5 gap-y-2 border-t px-1.5 pt-2.5 pb-0.5 text-sm [&>span]:flex [&>span]:items-center [&>span]:gap-2">
                    <span>
                        <svg width="30" height="10" aria-hidden="true">
                            <line x1="2" y1="5" x2="28" y2="5" className="stroke-line-strong [stroke-width:1.6]" />
                        </svg>
                        inclusione dimostrata
                    </span>
                    <span>
                        <svg width="30" height="10" aria-hidden="true">
                            <line x1="2" y1="5" x2="28" y2="5" className="stroke-proved [stroke-width:1.8]" />
                        </svg>
                        stretta dimostrata (<Tex>{String.raw`\subsetneq`}</Tex>)
                    </span>
                    <span>
                        <svg width="30" height="10" aria-hidden="true">
                            <line
                                x1="2"
                                y1="5"
                                x2="28"
                                y2="5"
                                strokeDasharray="6 5"
                                className="stroke-open [stroke-width:1.6]"
                            />
                        </svg>
                        relazione congetturata (?)
                    </span>
                </div>
            </div>
            <aside
                aria-live="polite"
                className="border-line flex min-w-0 flex-col gap-3 border-t pt-5 lg:border-t-0 lg:border-l lg:py-1 lg:pl-6"
                style={classColor(sel)}
            >
                <p className={ui.eyebrow}>Classe scelta sulla mappa</p>
                <h3 className="font-mono text-2xl font-semibold text-(--c)">{MAP_NAME[sel]}</h3>
                <MathHtml className="text-muted block text-sm" html={info.full} />
                <MathHtml className="block leading-relaxed" html={info.idea} />
                {info.accept && (
                    <dl className="bg-sunk grid grid-cols-1 gap-x-4 gap-y-1 rounded-lg p-3 text-sm sm:grid-cols-[auto_minmax(0,1fr)]">
                        <dt className="text-muted">Si accetta se</dt>
                        <dd>
                            <MathHtml html={info.accept} />
                        </dd>
                        <dt className="text-muted">Errore riducibile in tempo pol.?</dt>
                        <dd className="font-semibold">{info.error}</dd>
                    </dl>
                )}
                <div className="flex flex-col gap-1.5 text-sm">
                    <p className={ui.label}>Dimostrato</p>
                    <ul className="flex flex-wrap gap-2">
                        {info.proved.map((r) => (
                            <li key={r} className={ui.pillOk}>
                                <MathHtml html={r} />
                            </li>
                        ))}
                    </ul>
                    {info.conjectured.length > 0 && (
                        <>
                            <p className={`${ui.label} mt-2`}>Congetturato</p>
                            <ul className="flex flex-wrap gap-2">
                                {info.conjectured.map((r) => (
                                    <li key={r} className={`${ui.pillOpen} whitespace-normal`}>
                                        <MathHtml html={r} />
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                {info.examples && <MathHtml className="text-muted block text-sm" html={info.examples} />}
                {info.more.href.startsWith("#") ? (
                    /* stessa pagina: un'ancora vera fa scattare hashchange, che apre la scheda e il riquadro giusti */
                    <a href={info.more.href} className={`${ui.linkBtn} self-start`}>
                        {info.more.label} <Arrow />
                    </a>
                ) : (
                    <Link href={info.more.href} className={`${ui.linkBtn} self-start`}>
                        {info.more.label} <Arrow />
                    </Link>
                )}
            </aside>
        </div>
    );
}
