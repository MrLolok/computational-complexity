import type { Metadata } from "next";

import Link from "next/link";

import Arrow from "@/components/Arrow";
import Tex from "@/components/Tex";
import HierarchyTower from "@/features/hierarchy/HierarchyTower";
import PhLevels from "@/features/hierarchy/PhLevels";
import PrefixBuilder from "@/features/hierarchy/PrefixBuilder";
import QbfEval from "@/features/hierarchy/QbfEval";
import Reductions from "@/features/hierarchy/Reductions";
import TowerDisclosure from "@/features/hierarchy/TowerDisclosure";
import { ui } from "@/lib/tokens";

export const metadata: Metadata = { title: "Gerarchia polinomiale" };
export default function Page() {
    return (
        <section className="flex flex-col gap-6">
            <header>
                <p className={`${ui.eyebrow} mb-2`}>Esiste · per ogni · esiste</p>
                <h1 className={ui.h2}>La gerarchia polinomiale, un piano alla volta</h1>
                <p className={`${ui.lede} mt-3`}>
                    Parti da NP: «esiste una soluzione verificabile». Ogni nuovo livello aggiunge un&apos;alternanza tra
                    «esiste» e «per ogni».
                </p>
            </header>
            <PhLevels />
            <section className="flex flex-col gap-3">
                <h2 className={ui.h3}>2. Prova con i quantificatori</h2>
                <p className={ui.hint}>Scegli un esercizio: prima costruisci il prefisso, poi valuta una formula.</p>
                <details className={ui.card}>
                    <summary className="cursor-pointer font-semibold">
                        Costruisci un prefisso e trova il livello
                    </summary>
                    <PrefixBuilder />
                </details>
                <details className={ui.card}>
                    <summary className="cursor-pointer font-semibold">
                        Valuta una QBF: <Tex>{String.raw`\exists`}</Tex> è OR, <Tex>{String.raw`\forall`}</Tex> è AND
                    </summary>
                    <QbfEval />
                </details>
            </section>
            <section className="flex flex-col gap-3">
                <h2 className={ui.h3}>3. Collega i livelli</h2>
                <details className={ui.card}>
                    <summary className="cursor-pointer font-semibold">
                        Che cosa significa <Tex>{String.raw`\Delta`}</Tex>? E dove sta DP?
                    </summary>
                    <p>
                        <Tex>{String.raw`\Delta_{i+1}^{\mathrm{P}} = \mathrm{P}^{\Sigma_i^{\mathrm{P}}}`}</Tex>: tempo
                        polinomiale <b>deterministico</b> con un oracolo <Tex>{String.raw`\Sigma`}</Tex> del piano
                        sotto. Al piano 1{" "}
                        <Tex>{String.raw`\Delta_1^{\mathrm{P}} = \mathrm{P}^{\mathrm{P}} = \mathrm{P}`}</Tex>; al piano
                        2 <Tex>{String.raw`\Delta_2^{\mathrm{P}} = \mathrm{P}^{\mathrm{NP}}`}</Tex>. Non ha
                        quantificatori suoi: sta tra due piani.
                    </p>
                    <div className={ui.formula}>
                        <Tex>{String.raw`\Sigma_i^{\mathrm{P}} \cup \Pi_i^{\mathrm{P}} \subseteq \Delta_{i+1}^{\mathrm{P}} \subseteq \Sigma_{i+1}^{\mathrm{P}} \cap \Pi_{i+1}^{\mathrm{P}}`}</Tex>
                    </div>
                    <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm">
                        <li>
                            <b>
                                <Tex>{String.raw`\Sigma_i^{\mathrm{P}} \subseteq \Delta_{i+1}^{\mathrm{P}}`}</Tex>
                            </b>
                            : una domanda all&apos;oracolo, e si copia la risposta.
                        </li>
                        <li>
                            <b>
                                <Tex>{String.raw`\Pi_i^{\mathrm{P}} \subseteq \Delta_{i+1}^{\mathrm{P}}`}</Tex>
                            </b>
                            : una domanda sul complemento, e si inverte la risposta.
                        </li>
                        <li>
                            <b>
                                <Tex>{String.raw`\Delta_{i+1}^{\mathrm{P}} \subseteq \Sigma_{i+1}^{\mathrm{P}} = \mathrm{NP}^{\Sigma_i^{\mathrm{P}}}`}</Tex>
                            </b>
                            : stesso oracolo; una macchina deterministica è una nondeterministica che non usa le scelte.
                        </li>
                        <li>
                            <b>
                                <Tex>{String.raw`\Delta_{i+1}^{\mathrm{P}} \subseteq \Pi_{i+1}^{\mathrm{P}}`}</Tex>
                            </b>
                            : <Tex>{String.raw`\Delta`}</Tex> è chiusa per complemento, quindi se{" "}
                            <Tex>{String.raw`L \in \Delta_{i+1}^{\mathrm{P}}`}</Tex> anche{" "}
                            <Tex>{String.raw`\mathrm{co}\text{-}L \in \Sigma_{i+1}^{\mathrm{P}}`}</Tex>.
                        </li>
                    </ul>
                    <p>
                        DP sta sotto <Tex>{String.raw`\Delta_2^{\mathrm{P}}`}</Tex>: bastano due domande
                        all&apos;oracolo, una per la parte NP e una per la parte coNP. Non è un piano autonomo della
                        gerarchia.
                    </p>
                    <div className={ui.formula}>
                        <Tex>{String.raw`\mathrm{NP} \cup \mathrm{coNP} \subseteq \mathrm{DP} \subseteq \Delta_2^{\mathrm{P}} \subseteq \Sigma_2^{\mathrm{P}} \cap \Pi_2^{\mathrm{P}}`}</Tex>
                    </div>
                    <p className="text-muted text-sm">
                        Esempio (F07): SAT-UNSAT si riduce a <Tex>{String.raw`\mathrm{co\text{-}QSAT}_3`}</Tex>? SÌ:{" "}
                        <Tex>{String.raw`\mathrm{SAT\text{-}UNSAT} \in \mathrm{DP} \subseteq \Delta_2^{\mathrm{P}} \subseteq \Pi_2^{\mathrm{P}} \subseteq \Delta_3^{\mathrm{P}} \subseteq \Pi_3^{\mathrm{P}}`}</Tex>
                        , e <Tex>{String.raw`\mathrm{co\text{-}QSAT}_3`}</Tex> è{" "}
                        <Tex>{String.raw`\Pi_3^{\mathrm{P}}`}</Tex>-completo.
                    </p>
                    <Link href="/classi/DP" className="text-accent self-start underline">
                        La scheda sintetica di DP <Arrow />
                    </Link>
                </details>
                <TowerDisclosure>
                    <HierarchyTower />
                </TowerDisclosure>
                <details className={ui.card}>
                    <summary className="cursor-pointer font-semibold">Come riconoscere un collasso</summary>
                    <p>
                        Se <Tex>{String.raw`\Sigma_i^{\mathrm{P}} = \Pi_i^{\mathrm{P}}`}</Tex> per un{" "}
                        <Tex>{String.raw`i \ge 1`}</Tex>, allora{" "}
                        <Tex>{String.raw`\mathrm{PH} = \Sigma_i^{\mathrm{P}}`}</Tex>: i livelli superiori non aggiungono
                        potenza (Teorema 17.9).
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="bg-sunk rounded-lg p-4">
                            <b>
                                <Tex>{String.raw`\mathrm{P} = \mathrm{NP} \Rightarrow \mathrm{PH} = \mathrm{P}`}</Tex>
                            </b>
                            <p className="text-muted mt-2 text-sm">
                                Il controllo deterministico basta per tutti i livelli.
                            </p>
                        </div>
                        <div className="bg-sunk rounded-lg p-4">
                            <b>
                                <Tex>{String.raw`\mathrm{NP} = \mathrm{coNP} \Rightarrow \mathrm{PH} = \mathrm{NP}`}</Tex>
                            </b>
                            <p className="text-muted mt-2 text-sm">
                                Collassa al primo livello; non implica da solo{" "}
                                <Tex>{String.raw`\mathrm{P} = \mathrm{NP}`}</Tex>.
                            </p>
                        </div>
                    </div>
                    <p className="text-muted text-sm">
                        Se un problema completo per un livello superiore entra in un livello inferiore, scrivi prima
                        l&apos;inclusione che ne segue. Poi cerca l&apos;uguaglianza{" "}
                        <Tex>{String.raw`\Sigma_i^{\mathrm{P}} = \Pi_i^{\mathrm{P}}`}</Tex>.
                    </p>
                    <Link href="/teoremi#teorema-t17-9" className="text-accent underline">
                        Cerca i teoremi sul collasso <Arrow />
                    </Link>
                </details>
                <details className={ui.card}>
                    <summary className="cursor-pointer font-semibold">Riduzioni tra problemi dei livelli</summary>
                    <Reductions />
                </details>
            </section>
            <p className="text-muted text-xs">Fonti: dispensa cap. 16–17; slide Lez. 9; appunti Lez. 9 e 11.</p>
        </section>
    );
}
