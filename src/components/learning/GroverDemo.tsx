"use client";
import { useState } from "react";
import { ui } from "@/lib/ui";
export default function GroverDemo() {
  const [bits, setBits] = useState(128);
  const [double, setDouble] = useState(false);
  const current = double ? 2 * bits : bits;
  return <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-5">
    <label htmlFor="key-bits" className="flex flex-col gap-2 text-sm">Lunghezza iniziale della chiave: <b>{bits} bit</b><input id="key-bits" type="range" min={8} max={256} step={8} value={bits} onChange={e => setBits(Number(e.target.value))} className="w-full accent-accent" /></label>
    <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" className="size-4 accent-accent" checked={double} onChange={e => setDouble(e.target.checked)} />Raddoppia la chiave contro Grover ({2 * bits} bit)</label>
    <div aria-live="polite" className="grid gap-3 sm:grid-cols-2"><div className="rounded-lg bg-sunk p-4"><p className={ui.eyebrow}>Classico · chiave iniziale</p><p className="mt-3 font-mono text-3xl">2<sup>{bits}</sup></p><p className="mt-2 text-xs text-muted">Ordine dei tentativi di ricerca</p></div><div className="rounded-lg bg-accent-soft/30 p-4"><p className={ui.eyebrow}>Grover · chiave di {current} bit</p><p className="mt-3 font-mono text-3xl text-accent">2<sup>{current / 2}</sup></p><p className="mt-2 text-xs text-muted">Ordine delle interrogazioni quantistiche</p></div></div>
    <p className="text-sm text-muted">{double ? "Il raddoppio ripristina l’esponente iniziale: 2n / 2 = n." : "Il vantaggio è quadratico: √(2ⁿ) = 2ⁿ⁄². La ricerca resta esponenziale."} Modello teorico di ricerca non strutturata usato all&apos;esame.</p>
  </div>;
}
