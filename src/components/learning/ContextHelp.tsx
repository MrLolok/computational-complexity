"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode, type SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { GLOSSARY } from "@/lib/glossary";

/** Un solo popup per tutti i termini: hover, focus, tocco; Escape e clic esterno lo chiudono. */
export default function ContextHelp({ children }: { children: ReactNode }) {
  const id = useId();
  const [tip, setTip] = useState<{ key: string; left: number; top?: number; bottom?: number } | null>(null);
  const anchor = useRef<HTMLElement | null>(null);
  const popup = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keep = () => { if (timer.current) clearTimeout(timer.current); };
  const close = () => {
    keep();
    anchor.current?.removeAttribute("aria-describedby");
    anchor.current = null;
    setTip(null);
  };
  const later = () => { keep(); timer.current = setTimeout(close, 180); };
  const show = (e: SyntheticEvent) => {
    if (popup.current?.contains(e.target as Node)) { keep(); return; }
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-term]");
    const key = el?.dataset.term;
    if (!el || !key || !GLOSSARY[key]) return;
    keep();
    anchor.current?.removeAttribute("aria-describedby");
    anchor.current = el;
    el.setAttribute("aria-describedby", id);
    const r = el.getBoundingClientRect();
    const width = Math.min(336, window.innerWidth - 24);
    setTip({ key, left: Math.max(12, Math.min(r.left, window.innerWidth - width - 12)), ...(r.bottom + 270 < window.innerHeight ? { top: r.bottom + 8 } : { bottom: Math.max(12, window.innerHeight - r.top + 8) }) });
  };
  useEffect(() => {
    if (!tip) return;
    const outside = (e: PointerEvent) => {
      if (!anchor.current?.contains(e.target as Node) && !popup.current?.contains(e.target as Node)) close();
    };
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const scroll = (e: Event) => { if (!popup.current?.contains(e.target as Node)) close(); };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    document.addEventListener("scroll", scroll, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      document.removeEventListener("scroll", scroll, true);
      window.removeEventListener("resize", close);
    };
  }, [tip]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { keep(); anchor.current?.removeAttribute("aria-describedby"); }, []);

  return (
    <div className="flex min-w-0 flex-col gap-6" onPointerOver={show} onPointerOut={e => {
      if (anchor.current?.contains(e.relatedTarget as Node) || popup.current?.contains(e.relatedTarget as Node)) keep();
      else later();
    }} onFocusCapture={show} onBlurCapture={e => {
      if (anchor.current?.contains(e.relatedTarget as Node) || popup.current?.contains(e.relatedTarget as Node)) keep();
      else later();
    }} onClick={e => {
      if ((e.target as HTMLElement).closest('[data-term][role="button"]')) show(e);
    }} onKeyDown={e => {
      if ((e.key === "Enter" || e.key === " ") && (e.target as HTMLElement).matches('[data-term][role="button"]')) { e.preventDefault(); show(e); }
    }}>
      {children}
      {tip && createPortal(
        <div ref={popup} id={id} role="dialog" aria-label={`Ripasso: ${GLOSSARY[tip.key].name}`} onPointerEnter={keep} onPointerLeave={later} onFocusCapture={keep} onBlurCapture={e => { if (!popup.current?.contains(e.relatedTarget as Node)) later(); }}
          className="fixed z-50 w-[336px] max-w-[calc(100vw-24px)] max-h-[min(320px,80vh)] overflow-auto rounded-xl border border-line-strong bg-surface p-4 text-sm leading-relaxed shadow-xl"
          style={{ left: tip.left, top: tip.top, bottom: tip.bottom }}>
          <div className="mb-2 flex items-start justify-between gap-3">
            <strong className="text-base text-ink">{GLOSSARY[tip.key].name}</strong>
            <button type="button" aria-label="Chiudi spiegazione" className="min-h-8 min-w-8 cursor-pointer px-2 text-muted" onClick={close}>×</button>
          </div>
          <p className="text-muted">{GLOSSARY[tip.key].definition}</p>
          <Link href={GLOSSARY[tip.key].href} className="mt-3 inline-block text-accent underline underline-offset-4" onClick={close}>Approfondisci →</Link>
        </div>, document.body
      )}
    </div>
  );
}
