"use client";

import type { ReactNode } from "react";

import { useId } from "react";

import { setHash, useHash } from "@/lib/useHash";

const TABS = ["Mappa completa", "Probabilistiche", "Quantistiche"];
/* #probabilistiche, #quantistiche e le #ancore delle spiegazioni (es. #def-bpp) aprono la scheda giusta */
const tabOf = (hash: string, anchors: Record<string, number>) =>
    ({ probabilistiche: 1, quantistiche: 2 })[hash] ?? anchors[hash] ?? 0;
export default function ClassExplorer({
    children,
    random,
    quantum,
    anchors,
}: {
    children: ReactNode;
    random: ReactNode;
    quantum: ReactNode;
    anchors: Record<string, number>;
}) {
    const active = tabOf(useHash(), anchors);
    const id = useId();
    const choose = (i: number) => setHash(i === 1 ? "probabilistiche" : i === 2 ? "quantistiche" : "");
    return (
        <div>
            <div
                role="tablist"
                aria-label="Viste delle classi"
                className="border-line mb-6 flex flex-wrap gap-1 border-b"
            >
                {TABS.map((label, i) => (
                    <button
                        key={label}
                        type="button"
                        role="tab"
                        id={`${id}-tab-${i}`}
                        aria-controls={`${id}-panel`}
                        aria-selected={active === i}
                        tabIndex={active === i ? 0 : -1}
                        onClick={() => choose(i)}
                        onKeyDown={(e) => {
                            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
                            e.preventDefault();
                            const next =
                                e.key === "Home"
                                    ? 0
                                    : e.key === "End"
                                      ? TABS.length - 1
                                      : (active + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
                            choose(next);
                            document.getElementById(`${id}-tab-${next}`)?.focus();
                        }}
                        className={`min-h-11 cursor-pointer border-b-2 px-3 py-2 text-sm ${active === i ? "border-accent text-accent font-semibold" : "text-muted hover:text-ink border-transparent"}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`}>
                {active === 0 && children}
                {active === 1 && random}
                {active === 2 && quantum}
            </div>
        </div>
    );
}
