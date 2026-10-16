"use client";

import { useState } from "react";

import Arrow from "@/components/Arrow";
import Tex from "@/components/Tex";
import { RP, RP_DEFAULT, RQUICK } from "@/data/piani";
import { plainMath } from "@/lib/mathNotation";
import { readit, rSub, shortName } from "@/lib/piani";
import { texHtml } from "@/lib/tex";
import { ui } from "@/lib/ui";

const byId = (id: string) => RP.find((r) => r.id === id) ?? RP[0];
const label = "flex min-w-0 max-w-full flex-col gap-1 font-ui text-xs font-semibold text-muted";

/** riduzioni tra problemi completi dei piani: esiste A → B? */
export default function Reductions() {
    const [a, setA] = useState(RP_DEFAULT[0]);
    const [b, setB] = useState(RP_DEFAULT[1]);
    const A = byId(a),
        B = byId(b);
    const [r, why] = rSub(A.cls, B.cls);

    return (
        <>
            <div className="border-line flex flex-wrap items-end gap-3 border-b p-3">
                <label className={label}>
                    Da (problema A)
                    <select className={ui.select} value={a} onChange={(e) => setA(e.target.value)}>
                        {RP.map((x) => (
                            <option key={x.id} value={x.id}>
                                {plainMath(x.label)}
                            </option>
                        ))}
                    </select>
                </label>
                <span className={`${ui.mono} pb-2.5`}>
                    <Arrow />
                </span>
                <label className={label}>
                    A (problema B)
                    <select className={ui.select} value={b} onChange={(e) => setB(e.target.value)}>
                        {RP.map((x) => (
                            <option key={x.id} value={x.id}>
                                {plainMath(x.label)}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <p className={ui.hint}>Gli esercizi della dispensa (cap. 17.2.1):</p>
            <div className="flex flex-wrap gap-1.5">
                {RQUICK.map(([x, y]) => (
                    <button
                        key={x + y}
                        type="button"
                        className="border-line text-ink hover:border-accent hover:text-accent min-h-11 cursor-pointer rounded-full border px-3 py-2 font-mono text-sm"
                        onClick={() => {
                            setA(x);
                            setB(y);
                        }}
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: texHtml(`${shortName(byId(x).label)} → ${shortName(byId(y).label)}`, false),
                            }}
                        />
                    </button>
                ))}
            </div>
            <div className="mt-3 flex flex-col gap-4" aria-live="polite">
                <div className="font-head flex flex-wrap items-center gap-2.5 text-2xl font-semibold">
                    <span
                        dangerouslySetInnerHTML={{ __html: texHtml(`${shortName(A.label)} → ${shortName(B.label)}`) }}
                    />
                    <span className={r === "si" ? "text-ok" : "text-open"}>{r === "si" ? "SÌ" : "altro"}</span>
                </div>
                <p>
                    {r === "si" ? "Esiste: " : "Non si sa; esisterebbe "}
                    <span dangerouslySetInnerHTML={{ __html: texHtml(why) }} />
                </p>
                <p className={readit}>
                    Regola usata: se A è completo per X e B per Y, A si riduce a B esattamente quando{" "}
                    <Tex>{String.raw`X \subseteq Y`}</Tex>, perché le classi sono chiuse per riduzioni.
                </p>
            </div>
        </>
    );
}
