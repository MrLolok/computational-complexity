"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode, type SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { GLOSSARY } from "@/lib/glossary";

/** Un solo popup per tutti i termini: hover e focus col mouse, tocco sugli schermi touch; Escape e clic esterno lo chiudono.
 *  Al tocco non c'è hover: il primo tocco apre il popup e lo lascia aperto, il secondo sullo stesso termine lo chiude
 *  (o segue il link, se il termine è un link); un tocco fuori lo chiude. */
export default function ContextHelp({ children }: { children: ReactNode }) {
  const id = useId();
  const [tip, setTip] = useState<{ key: string; left: number; top?: number; bottom?: number; maxWidth: number; maxHeight: number } | null>(null);
  const anchor = useRef<HTMLElement | null>(null);
  const popup = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* ultima pressione: se era un dito e quando, per distinguere il tocco dal mouse e dalla tastiera */
  const press = useRef({ touch: false, at: 0 });
  const touched = () => press.current.touch && Date.now() - press.current.at < 1000;
  const pressed = () => Date.now() - press.current.at < 600;
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
    const safe = getComputedStyle(document.body);
    const left = parseFloat(safe.paddingLeft) + 12;
    const right = window.innerWidth - parseFloat(safe.paddingRight) - 12;
    const top = Math.max(parseFloat(safe.paddingTop) + 12, r.bottom + 8);
    const bottom = Math.max(parseFloat(safe.paddingBottom) + 12, window.innerHeight - r.top + 8);
    const below = window.innerHeight - parseFloat(safe.paddingBottom) - top - 12;
    const above = window.innerHeight - parseFloat(safe.paddingTop) - bottom - 12;
    const width = Math.min(21 * parseFloat(getComputedStyle(document.documentElement).fontSize), right - left);
    setTip({
      key,
      left: Math.max(left, Math.min(r.left, right - width)),
      maxWidth: width,
      maxHeight: Math.min(320, Math.max(below, above)),
      ...(below >= above ? { top } : { bottom }),
    });
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
    <div className="flex min-w-0 flex-col gap-6" onClickCapture={e => {
      /* in cattura, prima del Link: il primo tocco su un termine-link apre il popup invece di navigare */
      const term = (e.target as HTMLElement).closest<HTMLElement>("[data-term]");
      if (term && touched() && !popup.current?.contains(term)) {
        /* secondo tocco: un link porta alla sua pagina, un termine semplice chiude e basta */
        if (anchor.current === term && term.matches("a[href]")) { close(); return; }
        e.preventDefault();
        if (anchor.current === term) { close(); return; }
        show(e);
        return;
      }
      const details = (e.target as HTMLElement).closest("summary")?.parentElement;
      if (!(details instanceof HTMLDetailsElement) || details.open) return;
      requestAnimationFrame(() => {
        if (details.open) details.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      });
    }} onPointerDownCapture={e => {
      press.current = { touch: e.pointerType === "touch", at: Date.now() };
    }} onPointerOver={e => {
      if (e.pointerType !== "touch") show(e);
    }} onPointerOut={e => {
      if (e.pointerType === "touch") return;
      if (anchor.current?.contains(e.relatedTarget as Node) || popup.current?.contains(e.relatedTarget as Node)) keep();
      else later();
    }} onFocusCapture={e => {
      if (!touched()) show(e);
    }} onBlurCapture={e => {
      /* dopo un tocco o un clic decide la pressione (tocco fuori, sul termine o nel popup), non la perdita del focus */
      if (pressed() || anchor.current?.contains(e.relatedTarget as Node) || popup.current?.contains(e.relatedTarget as Node)) keep();
      else later();
    }} onClick={e => {
      if (!touched() && (e.target as HTMLElement).closest('[data-term][role="button"]')) show(e);
    }} onKeyDown={e => {
      if ((e.key === "Enter" || e.key === " ") && (e.target as HTMLElement).matches('[data-term][role="button"]')) { e.preventDefault(); show(e); }
    }}>
      {children}
      {tip && createPortal(
        <div ref={popup} id={id} role="dialog" aria-label={`Ripasso: ${GLOSSARY[tip.key].name}`} onPointerEnter={keep} onPointerLeave={e => { if (e.pointerType !== "touch") later(); }} onFocusCapture={keep} onBlurCapture={e => { if (!pressed() && !popup.current?.contains(e.relatedTarget as Node)) later(); }}
          className="fixed z-50 w-84 overflow-auto overscroll-contain rounded-xl border border-line-strong bg-surface p-4 text-sm leading-relaxed shadow-xl"
          style={{ left: tip.left, top: tip.top, bottom: tip.bottom, maxWidth: tip.maxWidth, maxHeight: tip.maxHeight }}>
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
