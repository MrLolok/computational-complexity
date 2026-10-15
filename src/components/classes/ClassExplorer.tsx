"use client";

import { useEffect, useId, useState, useSyncExternalStore, type ReactNode } from "react";

const TABS = ["Mappa completa", "Probabilistiche", "Quantistiche"];
const subscribe = (cb: () => void) => { window.addEventListener("hashchange", cb); window.addEventListener("popstate", cb); return () => { window.removeEventListener("hashchange", cb); window.removeEventListener("popstate", cb); }; };
/* #probabilistiche, #quantistiche e le #ancore delle spiegazioni (es. #def-bpp) aprono la scheda giusta */
const tabOf = (hash: string, anchors: Record<string, number>) => ({ "#probabilistiche": 1, "#quantistiche": 2 }[hash] ?? anchors[hash.slice(1)] ?? 0);
const serverHash = () => "";
export default function ClassExplorer({ children, random, quantum, anchors }: { children: ReactNode; random: ReactNode; quantum: ReactNode; anchors: Record<string, number> }) {
  const [tab, setTab] = useState<number | null>(null);
  const hash = tabOf(useSyncExternalStore(subscribe, () => window.location.hash, serverHash), anchors);
  /* un link interno a un'#ancora (es. dalla mappa) vince sulla scheda scelta a mano */
  useEffect(() => { const reset = () => setTab(null); window.addEventListener("hashchange", reset); return () => window.removeEventListener("hashchange", reset); }, []);
  const active = tab ?? hash;
  const id = useId();
  const choose = (i: number) => { setTab(i); window.history.replaceState(window.history.state, "", i === 1 ? "#probabilistiche" : i === 2 ? "#quantistiche" : window.location.pathname); };
  return (
    <div>
      <div role="tablist" aria-label="Viste delle classi" className="mb-6 flex flex-wrap gap-1 border-b border-line">
        {TABS.map((label, i) => <button key={label} type="button" role="tab" id={`${id}-tab-${i}`} aria-controls={`${id}-panel`} aria-selected={active === i} tabIndex={active === i ? 0 : -1}
          onClick={() => choose(i)} onKeyDown={e => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
            e.preventDefault(); const next = e.key === "Home" ? 0 : e.key === "End" ? TABS.length - 1 : (active + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
            choose(next); document.getElementById(`${id}-tab-${next}`)?.focus();
          }} className={`min-h-11 cursor-pointer border-b-2 px-3 py-2 text-sm ${active === i ? "border-accent font-semibold text-accent" : "border-transparent text-muted hover:text-ink"}`}>{label}</button>)}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`}>
        {active === 0 && children}
        {active === 1 && random}
        {active === 2 && quantum}
      </div>
    </div>
  );
}
