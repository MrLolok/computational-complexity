"use client";

import { useState } from "react";
import Link from "next/link";

import Arrow from "@/components/Arrow";
import Tex from "@/components/Tex";
import { tex, texHtml } from "@/lib/tex";
import { ui } from "@/lib/ui";

/** quantifiers, sigma, pi e problem sono LaTeX; example e text sono HTML con formule $…$ */
const LEVELS = [
    {
        n: 1,
        sigma: String.raw`\mathrm{NP}`,
        pi: String.raw`\mathrm{coNP}`,
        quantifiers: String.raw`\exists`,
        example: "Esiste un assegnamento che rende vera la formula?",
        problem: String.raw`\mathrm{SAT}`,
        id: "SAT",
        text: "Un solo blocco esistenziale: basta trovare un certificato. Cambiando $\\exists$ in $\\forall$ ottieni la famiglia complementare.",
    },
    {
        n: 2,
        sigma: String.raw`\Sigma_2^{\mathrm{P}}`,
        pi: String.raw`\Pi_2^{\mathrm{P}}`,
        quantifiers: String.raw`\exists\ \forall`,
        example: "Esiste una scelta $x$ che funziona per ogni scelta $y$?",
        problem: String.raw`\mathrm{QSAT}_2`,
        id: "QSATi",
        text: "Due blocchi alternati. Fissi $x$, poi il controllo deve riuscire per tutte le $y$. Non basta verificare una singola coppia.",
    },
    {
        n: 3,
        sigma: String.raw`\Sigma_3^{\mathrm{P}}`,
        pi: String.raw`\Pi_3^{\mathrm{P}}`,
        quantifiers: String.raw`\exists\ \forall\ \exists`,
        example: "Esiste $x$ tale che, per ogni $y$, esiste $z$ che fa riuscire il controllo?",
        problem: String.raw`\mathrm{QSAT}_3`,
        id: "QSATi",
        text: "Tre blocchi alternati. L’ultima scelta $z$ può dipendere da $y$. Continua con la stessa regola per i livelli successivi.",
    },
];
export default function PhLevels() {
    const [level, setLevel] = useState(0);
    const l = LEVELS[level];
    return (
        <section className={ui.card}>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className={ui.h3}>1. Aggiungi un’alternanza</h2>
                <div role="group" aria-label="Livello di PH" className="flex gap-2">
                    {LEVELS.map((x, i) => (
                        <button
                            key={x.n}
                            type="button"
                            aria-pressed={i === level}
                            className={i === level ? ui.btnPrimary : ui.btn}
                            onClick={() => setLevel(i)}
                        >
                            Piano {x.n}
                        </button>
                    ))}
                </div>
            </div>
            <div aria-live="polite" className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2">
                <div className="bg-sunk flex flex-col justify-center gap-3 rounded-lg p-4 sm:p-5">
                    <span className={ui.eyebrow}>Parte da «esiste»</span>
                    <Tex className="text-accent text-4xl">{l.quantifiers}</Tex>
                    <p className="text-lg">
                        <Tex>{l.sigma}</Tex>
                    </p>
                    <p className="text-muted text-sm">
                        Partendo da <Tex>{String.raw`\forall`}</Tex>: <Tex>{l.pi}</Tex>
                    </p>
                </div>
                <div className="flex flex-col justify-center gap-3">
                    <h3 className={ui.h3} dangerouslySetInnerHTML={{ __html: texHtml(l.example) }} />
                    <p className="text-muted" dangerouslySetInnerHTML={{ __html: texHtml(l.text) }} />
                    <Link
                        href={`/problemi/${l.id}`}
                        data-term={`problem:${l.id}`}
                        className="text-accent self-start text-sm underline underline-offset-4"
                    >
                        Esempio: <span dangerouslySetInnerHTML={{ __html: tex(l.problem, false, false) }} /> <Arrow />
                    </Link>
                </div>
            </div>
            <p className="border-line text-muted border-t pt-3 text-sm">
                Conta i <b className="text-ink">blocchi alternati</b>, non le variabili.{" "}
                <Tex>{String.raw`\exists x\ \exists y`}</Tex> è un solo blocco. PH raccoglie tutti i livelli finiti;{" "}
                <Tex>{String.raw`\mathrm{PH} \subseteq \mathrm{PSPACE}`}</Tex>.
            </p>
        </section>
    );
}
