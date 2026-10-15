"use client";

import { useState } from "react";

import { final } from "@/components/piani/styles";
import Tex from "@/components/Tex";
import { ui } from "@/lib/ui";
import { CheckRow } from "./CheckRow";

const TOURS = [10, 12, 15];

/** EXACT TSP: il giro più corto costa esattamente B? (controllo NP + controllo coNP) */
export default function ExactTsp() {
    const [B, setB] = useState(10);
    const opt = Math.min(...TOURS);
    const l1 = TOURS.some((t) => t <= B),
        l2 = !TOURS.some((t) => t < B);
    return (
        <>
            <label htmlFor="dpB" className={ui.hint}>
                <Tex>{`B = \\mathbf{${B}}`}</Tex>
            </label>
            <input
                id="dpB"
                type="range"
                min={8}
                max={16}
                value={B}
                onChange={(e) => setB(+e.target.value)}
                className="accent-c-DP w-full"
            />
            <div className="flex flex-wrap gap-2.5">
                {TOURS.map((t) => (
                    <span
                        key={t}
                        className={`bg-sunk rounded-lg border px-2.5 py-1 font-mono ${t < B ? "border-proved text-proved" : t <= B ? "border-ok text-ok" : "border-line"}`}
                    >
                        giro da {t}
                    </span>
                ))}
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2.5 gap-y-1.5 text-base">
                <CheckRow tag="NP" ok={l1}>
                    esiste un giro di costo <Tex>{`\\le ${B}`}</Tex>?
                </CheckRow>
                <CheckRow tag="coNP" ok={l2}>
                    nessun giro costa meno di {B}?
                </CheckRow>
            </div>
            <div className={final(l1 && l2)}>
                {l1 && l2
                    ? `Sì: l'ottimo vale esattamente ${B}.`
                    : l1
                      ? `No: c'è un giro da ${opt}, che costa meno di ${B}.`
                      : `No: nessun giro costa ${B} o meno.`}
            </div>
        </>
    );
}
