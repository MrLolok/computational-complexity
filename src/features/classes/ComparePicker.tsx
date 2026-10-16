"use client";

import type { ClassId } from "@/data/classes/classes";
import type { ReactNode } from "react";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Arrow from "@/components/Arrow";
import Tex from "@/components/Tex";
import { IDS, PLAIN, QUICK_PAIRS } from "@/data/classes/classes";
import { ui } from "@/lib/tokens";

export default function ComparePicker({ a, b, children }: { a?: ClassId; b?: ClassId; children?: ReactNode }) {
    const router = useRouter();
    const [pa, setPa] = useState(a ?? "");
    const [pb, setPb] = useState(b ?? "");
    const [pending, startTransition] = useTransition();
    const valid = pa && pb && pa !== pb;
    const changed = pa !== a || pb !== b;
    return (
        <section className="flex flex-col gap-6">
            <header>
                <p className={`${ui.eyebrow} mb-2`}>Collega i concetti</p>
                <h1 className={ui.h2}>Confronta due classi</h1>
                <p className={`${ui.lede} mt-3`}>
                    Una classe contiene l&apos;altra? Sono diverse? Scegli una coppia per vedere che cosa sappiamo e che
                    cosa resta aperto.
                </p>
            </header>
            <form
                className={ui.card}
                onSubmit={(e) => {
                    e.preventDefault();
                    if (valid) startTransition(() => router.push(`/confronta/${pa}/${pb}`, { scroll: false }));
                }}
            >
                <div className="flex flex-wrap items-end gap-3">
                    <label className="flex min-w-0 flex-1 basis-48 flex-col gap-2 text-sm font-medium" htmlFor="cmpA">
                        1. Prima classe
                        <select
                            id="cmpA"
                            required
                            className={ui.select}
                            value={pa}
                            onChange={(e) => setPa(e.target.value)}
                        >
                            <option value="" disabled>
                                Scegli una classe…
                            </option>
                            {IDS.map((id) => (
                                <option key={id} value={id}>
                                    {PLAIN[id]}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button
                        className={ui.btn}
                        type="button"
                        aria-label="Scambia le due classi"
                        disabled={!pa || !pb}
                        onClick={() => {
                            setPa(pb);
                            setPb(pa);
                        }}
                    >
                        ⇄
                    </button>
                    <label className="flex min-w-0 flex-1 basis-48 flex-col gap-2 text-sm font-medium" htmlFor="cmpB">
                        2. Seconda classe
                        <select
                            id="cmpB"
                            required
                            className={ui.select}
                            value={pb}
                            onChange={(e) => setPb(e.target.value)}
                        >
                            <option value="" disabled>
                                Scegli una classe…
                            </option>
                            {IDS.map((id) => (
                                <option key={id} value={id}>
                                    {PLAIN[id]}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit" className={ui.btnPrimary} disabled={!valid || pending}>
                        {pending ? (
                            "Confronto…"
                        ) : (
                            <>
                                Confronta <Arrow />
                            </>
                        )}
                    </button>
                </div>
                {pa && pa === pb && (
                    <p role="status" className="text-open mt-3 text-sm">
                        Scegli due classi diverse per confrontarle.
                    </p>
                )}
                <div className="border-line mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 text-sm">
                    <span className="text-muted">Oppure prova:</span>
                    {[["P", "NP"], ["NP", "coNP"], ...QUICK_PAIRS.slice(0, 1)].map(([x, y]) => (
                        <Link
                            key={`${x}-${y}`}
                            href={`/confronta/${x}/${y}`}
                            className="text-accent underline underline-offset-4"
                        >
                            {PLAIN[x as ClassId]} / {PLAIN[y as ClassId]}
                        </Link>
                    ))}
                </div>
            </form>
            {!changed && children}
            {changed && children && (
                <p className={ui.hint}>Premi “Confronta” per leggere il risultato della nuova coppia.</p>
            )}
            {!children && (
                <p className="text-muted max-w-prose text-sm">
                    Il risultato distingue <Tex>{String.raw`\subseteq`}</Tex> (inclusione),{" "}
                    <Tex>{String.raw`\subsetneq`}</Tex> (inclusione stretta) e rapporto non noto. Troverai anche la
                    motivazione da usare all&apos;esame.
                </p>
            )}
        </section>
    );
}
