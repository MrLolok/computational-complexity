"use client";

import { useState } from "react";

import Tex from "@/components/Tex";
import { ui } from "@/lib/tokens";

export default function GroverDemo() {
    const [bits, setBits] = useState(128);
    const [double, setDouble] = useState(false);
    const current = double ? 2 * bits : bits;
    return (
        <div className={ui.card}>
            <label htmlFor="key-bits" className="flex flex-col gap-2 text-sm">
                Lunghezza iniziale della chiave: <b>{bits} bit</b>
                <input
                    id="key-bits"
                    type="range"
                    min={8}
                    max={256}
                    step={8}
                    value={bits}
                    onChange={(e) => setBits(Number(e.target.value))}
                    className="accent-accent w-full"
                />
            </label>
            <label className="flex min-h-11 items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    className="accent-accent size-4"
                    checked={double}
                    onChange={(e) => setDouble(e.target.checked)}
                />
                Raddoppia la chiave contro Grover ({2 * bits} bit)
            </label>
            <div aria-live="polite" className="grid gap-3 sm:grid-cols-2">
                <div className="bg-sunk rounded-lg p-4">
                    <p className={ui.eyebrow}>Classico · chiave iniziale</p>
                    <p className="mt-3 text-3xl">
                        <Tex>{`2^{${bits}}`}</Tex>
                    </p>
                    <p className="text-muted mt-2 text-xs">Ordine dei tentativi di ricerca</p>
                </div>
                <div className="bg-accent-soft/30 rounded-lg p-4">
                    <p className={ui.eyebrow}>Grover · chiave di {current} bit</p>
                    <p className="text-accent mt-3 text-3xl">
                        <Tex>{`2^{${current / 2}}`}</Tex>
                    </p>
                    <p className="text-muted mt-2 text-xs">Ordine delle interrogazioni quantistiche</p>
                </div>
            </div>
            <p className="text-muted text-sm">
                {double ? (
                    <>
                        Il raddoppio ripristina l’esponente iniziale: <Tex>{"2n / 2 = n"}</Tex>.
                    </>
                ) : (
                    <>
                        Il vantaggio è quadratico: <Tex>{String.raw`\sqrt{2^n} = 2^{n/2}`}</Tex>. La ricerca resta
                        esponenziale.
                    </>
                )}{" "}
                Modello teorico di ricerca non strutturata usato all&apos;esame.
            </p>
        </div>
    );
}
