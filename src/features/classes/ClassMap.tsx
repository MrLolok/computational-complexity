"use client";

import type { ClassId } from "@/data/classes/classes";
import type { KeyboardEvent } from "react";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { ALIAS, HASSE_STRICT, IDS, INCLUSIONS, NAME, PLAIN } from "@/data/classes/classes";
import { classColor, NODE_RECT, ui } from "@/lib/tokens";
import { BASE_CLOSURE } from "./inclusions";
import { NODE_H as H, NOBADGE, NODE_W, POS, SEP_DRAW } from "./mapLayout";
import { requestPanelScroll } from "./usePanelScroll";

/* Opzioni della mappa (Separazioni dimostrate / Questioni aperte): restano tra una classe e l'altra. */
type Opts = { sep: boolean; open: boolean };
const DEFAULT_OPTS: Opts = { sep: true, open: false };
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
const useOpts = () =>
    useSyncExternalStore(
        subscribe,
        () => opts,
        () => DEFAULT_OPTS,
    );

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
const badgeText = "font-medium [text-anchor:middle] [dominant-baseline:central]";

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
    const inSub = (x: ClassId) => !!cur && (x === cur || BASE_CLOSURE.subset(x, cur));
    const inSup = (x: ClassId) => !!cur && (x === cur || BASE_CLOSURE.subset(cur, x));

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
            <div className="font-ui text-muted flex flex-wrap items-center gap-x-4 gap-y-2 px-1.5 pt-1 pb-2.5 text-sm">
                <label className="flex cursor-pointer items-center gap-1.5">
                    <input
                        type="checkbox"
                        className="accent-accent"
                        checked={showSep}
                        onChange={(e) => setOpts({ sep: e.target.checked })}
                    />{" "}
                    Separazioni dimostrate
                </label>
                <label className="flex cursor-pointer items-center gap-1.5">
                    <input
                        type="checkbox"
                        className="accent-accent"
                        checked={showOpen}
                        onChange={(e) => setOpts({ open: e.target.checked })}
                    />{" "}
                    Questioni aperte
                </label>
                <button className={ui.linkBtn} type="button" onClick={() => go(null)}>
                    Togli la selezione
                </button>
            </div>
            <p className={`${ui.hint} hidden px-1.5 pb-1.5 max-sm:block`}>
                Su schermi stretti la mappa scorre di lato.
            </p>
            <div ref={box} className="overflow-x-auto">
                <svg
                    className="font-ui block h-auto w-full min-w-120"
                    viewBox="0 0 760 1250"
                    role="group"
                    aria-label="Diagramma delle inclusioni tra le classi di complessità"
                >
                    {BANDS.map(([t, y1, y2], i) => (
                        <g key={t}>
                            <rect
                                x={0}
                                y={y1}
                                width={760}
                                height={y2 - y1}
                                className={i % 2 ? "fill-band-b" : "fill-band-a"}
                            />
                            <text
                                x={22}
                                y={(y1 + y2) / 2}
                                transform={`rotate(-90 22 ${(y1 + y2) / 2})`}
                                textAnchor="middle"
                                className="fill-muted text-xs font-medium tracking-wide uppercase"
                            >
                                {t}
                            </text>
                        </g>
                    ))}

                    <g>
                        {INCLUSIONS.map(([a, b]) => {
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
                                        hot ? "stroke-2" : strict ? "stroke-2" : "stroke-1.5"
                                    } ${cur && !hot ? "opacity-20" : ""}`}
                                />
                            );
                        })}
                    </g>

                    <g>
                        {INCLUSIONS.map(([a, b]) => {
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
                                    <circle
                                        cx={mx}
                                        cy={my}
                                        r={strict ? 8 : 7}
                                        className={`fill-surface stroke-1 ${strict ? "stroke-proved" : "stroke-open"}`}
                                    />
                                    <text
                                        x={mx}
                                        y={my + 0.5}
                                        className={`${badgeText} ${strict ? "fill-proved text-xs" : "fill-open text-xs"}`}
                                    >
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
                                        <circle cx={x} cy={y} r={9.5} className="fill-surface stroke-open stroke-1" />
                                        <text x={x} y={y + 0.5} className={`${badgeText} fill-open text-xs`}>
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
                                    <circle cx={x} cy={y} r={9.5} className="fill-surface stroke-proved stroke-1" />
                                    <text x={x} y={y + 0.5} className={`${badgeText} fill-proved text-xs`}>
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
                                const ex = (id: ClassId) =>
                                    side === "left" ? POS[id][0] - NODE_W[id] / 2 : POS[id][0] + NODE_W[id] / 2;
                                const y1 = POS[a][1] + dA,
                                    y2 = POS[b][1] + dB;
                                const my = (y1 + y2) / 2,
                                    tx = x + (side === "left" ? -5 : 5);
                                const faded = !!cur && !(inSub(a) || inSup(a)) && !(inSub(b) || inSup(b));
                                return (
                                    <g key={a + ">" + b} className={faded ? "opacity-15" : ""}>
                                        <path
                                            d={`M${ex(a)} ${y1} H${x} V${y2} H${ex(b)}`}
                                            strokeLinejoin="round"
                                            className="stroke-proved stroke-1.5 fill-none"
                                        />
                                        <text
                                            x={tx}
                                            y={my}
                                            textAnchor="middle"
                                            transform={`rotate(-90 ${tx} ${my})`}
                                            className="fill-proved stroke-surface stroke-5 font-mono text-xs font-medium [paint-order:stroke]"
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
                            const state = !cur
                                ? ""
                                : id === cur
                                  ? "sel"
                                  : BASE_CLOSURE.subset(id, cur)
                                    ? "sub"
                                    : BASE_CLOSURE.subset(cur, id)
                                      ? "sup"
                                      : "far";
                            const rect = NODE_RECT[state || "far"];
                            return (
                                <g
                                    key={id}
                                    className={`group focus-visible:[&>rect]:stroke-accent cursor-pointer transition-opacity duration-200 outline-none ${state === "far" ? "opacity-30" : ""}`}
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
                                    <rect
                                        x={cx - w / 2}
                                        y={cy - H / 2}
                                        width={w}
                                        height={H}
                                        rx={10}
                                        className={`stroke-(--c) transition-[stroke-width,fill] duration-200 ${rect}`}
                                    />
                                    <text
                                        x={cx}
                                        y={cy - 3}
                                        textAnchor="middle"
                                        className="fill-(--c) font-mono text-base font-medium"
                                    >
                                        <NodeName id={id} />
                                    </text>
                                    <text x={cx} y={cy + 15} textAnchor="middle" className="fill-muted text-xs">
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
