import type { Metadata } from "next";

import Link from "next/link";

import ClassesView from "@/components/classes/ClassesView";
import Tex from "@/components/Tex";
import { ui } from "@/lib/ui";

export const metadata: Metadata = { title: "Inizia il ripasso" };
const PATHS = [
    {
        n: "01",
        href: "/classi",
        title: "Capisci le classi",
        text: "Dalla verifica di un certificato ai limiti di tempo e spazio.",
        tag: "Il punto di partenza",
    },
    {
        n: "02",
        href: "/problemi",
        title: "Collega i concetti",
        text: "Problemi concreti, riduzioni e teoremi: dai un significato alla mappa.",
        tag: "Dalla teoria agli esempi",
    },
    {
        n: "03",
        href: "/tracce",
        title: "Mettiti alla prova",
        text: "Rispondi alle domande d’esame e usa le spiegazioni per il ripasso.",
        tag: "Preparati all’esame",
    },
];
export default function Page() {
    return (
        <>
            <section className="grid grid-cols-1 items-center gap-10 py-5 sm:py-10 lg:grid-cols-2">
                <div className="flex flex-col items-start gap-5">
                    <h1 className="font-head max-w-md text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                        La complessità,
                        <br />
                        <span className="text-accent">un concetto alla volta.</span>
                    </h1>
                    <p className={ui.lede}>
                        Una dispensa da esplorare: scopri che cosa significa una classe, riconosci i suoi problemi e
                        allenati sulle tracce d&apos;esame.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/classi/NP" className={ui.btnPrimary}>
                            Inizia da NP →
                        </Link>
                        <Link href="/tracce" className={ui.btn}>
                            Apri una traccia
                        </Link>
                    </div>
                </div>
                <div className={ui.card}>
                    <p className={ui.eyebrow}>Una prima bussola</p>
                    <div className="my-6 flex flex-col items-start gap-3">
                        {[
                            ["P", "Risolvere in tempo polinomiale"],
                            ["NP", "Verificare un sì in tempo polinomiale"],
                            ["PSPACE", "Risolvere con spazio polinomiale"],
                        ].map(([id, text], i) => (
                            <div key={id} className="w-full" style={{ paddingLeft: `${i * 16}px` }}>
                                {i > 0 && (
                                    <span className="text-muted mb-2 block pl-3 font-mono" aria-label="è contenuta in">
                                        ↓ <Tex>{String.raw`\subseteq`}</Tex>
                                    </span>
                                )}
                                <Link
                                    href={`/classi/${id}`}
                                    className="border-line-strong hover:border-accent flex items-center gap-4 rounded-lg border px-4 py-3"
                                >
                                    <span className="text-accent min-w-16 font-mono font-semibold">{id}</span>
                                    <span className="text-muted text-sm">{text}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <p className="text-muted text-sm">
                        <Tex>{String.raw`\mathrm{P} \subseteq \mathrm{NP} \subseteq \mathrm{PSPACE}`}</Tex>. Le
                        inclusioni sono note; non sappiamo se sono strette.
                    </p>
                </div>
            </section>
            <section aria-labelledby="percorso" className="border-line border-t pt-8">
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                    <h2 id="percorso" className={ui.h2}>
                        Un percorso per il ripasso
                    </h2>
                    <span className="text-muted text-sm">Scegli da dove iniziare</span>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {PATHS.map((p) => (
                        <Link
                            key={p.n}
                            href={p.href}
                            className={`${ui.card} group hover:border-accent transition-colors`}
                        >
                            <span className="text-accent font-mono text-sm">
                                {p.n}
                                <span className="float-right" aria-hidden="true">
                                    ↗
                                </span>
                            </span>
                            <h3 className={ui.h3}>{p.title}</h3>
                            <p className="text-muted text-sm leading-relaxed">{p.text}</p>
                            <span className="text-muted mt-auto pt-3 text-xs">{p.tag}</span>
                        </Link>
                    ))}
                </div>
            </section>
            <section className="border-line flex flex-wrap items-center gap-x-8 gap-y-3 rounded-lg border-y py-5 text-sm">
                <h2 className="font-semibold">Come si usa</h2>
                <ol className="text-muted flex flex-wrap gap-x-7 gap-y-2">
                    <li>1. Scegli un concetto.</li>
                    <li>2. Apri un esempio.</li>
                    <li>3. Prova una domanda.</li>
                </ol>
                <p className="text-muted">I termini sottolineati offrono un aiuto al passaggio, al focus o al tocco.</p>
            </section>
            <ClassesView sel={null} embedded />
            <section className="border-line grid gap-4 border-t pt-7 sm:grid-cols-2">
                <Link href="/confronta" className={ui.card}>
                    <h2 className={ui.h3}>Come si collegano due classi? →</h2>
                    <p className="text-muted text-sm">
                        Scegli una coppia e distingui inclusioni note, separazioni e questioni aperte.
                    </p>
                </Link>
                <Link href="/quantistico" className={ui.card}>
                    <h2 className={ui.h3}>Algoritmi quantistici →</h2>
                    <p className="text-muted text-sm">
                        Grover, Shor e quando conviene il calcolo quantistico, come nella Lezione 6.
                    </p>
                </Link>
            </section>
        </>
    );
}
