import MathHtml from "@/components/MathHtml";
import SourceBadge from "@/components/SourceBadge";
import Tex from "@/components/Tex";
import { SOURCE_CHECKS } from "@/data/problems/problems";
import { ui } from "@/lib/tokens";

const prose =
    "flex max-w-prose flex-col gap-3 [&_ul]:m-0 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5";

export default function SourcesView() {
    return (
        <section className="flex flex-col">
            <header className="mb-5">
                <h1 className={ui.h2}>Fonti e verifiche</h1>
                <p className={`${ui.lede} mt-3`}>
                    I riferimenti del corso e le integrazioni, raccolti qui per consultazione.
                </p>
            </header>
            <div className="flex max-w-prose flex-col gap-4">
                <details open className={`${prose} border-line rounded-xl border p-4 sm:p-5`}>
                    <summary className="cursor-pointer font-medium">Fonti del corso</summary>
                    <p>
                        Dispensa <i>Computational Complexity</i> (M. Mignogna, 2025): cap. 1 (R, RE), 2.6 (L), 5–11
                        (classi, gerarchie, Savitch), 12–13 (NP-completezza), 14 (coNP), 15 (DP), 16 (oracoli), 17 (PH),
                        19 (giochi), 21–22 (NEXP, riepilogo). Slide di P. A. Bonatti, Lezioni 1–9. Appunti delle Lezioni
                        3–11 su Notion e pagine delle tracce risolte.
                    </p>
                    <p className="flex flex-wrap items-center gap-2">
                        <SourceBadge kind="d">Dispensa</SourceBadge>
                        <SourceBadge kind="s">Slide</SourceBadge>
                        <SourceBadge kind="a">Appunti</SourceBadge>
                        <SourceBadge kind="x">Fuori dalle fonti</SourceBadge> sono le etichette usate nelle schede dei
                        problemi.
                    </p>
                    <p>
                        Ogni affermazione è stata controllata su queste fonti. Quando un&apos;affermazione non c&apos;è,
                        è separata e marcata con ✱ o con l&apos;etichetta <span className={ui.pillExt}>esterno</span>.
                    </p>
                </details>
                <details className={`${prose} border-line rounded-xl border p-4 sm:p-5`}>
                    <summary className="cursor-pointer font-medium">Aggiunte esterne e conseguenze ricavate</summary>
                    <ul>
                        <li>
                            <span className={ui.pillExt}>esterno</span> Il significato della D di DP
                            (&quot;differenza&quot;) viene dal libro di Papadimitriou, non da dispensa o slide.
                        </li>
                        <li>
                            <span className={ui.pillExt}>esterno</span> Il promemoria «
                            <Tex>{String.raw`\Sigma = \text{somma} = \text{OR} = \exists`}</Tex>,{" "}
                            <Tex>{String.raw`\Pi = \text{prodotto} = \text{AND} = \forall`}</Tex>» e l&apos;origine
                            della notazione dalla gerarchia aritmetica (scheda Piani di PH): dispensa e slide non
                            spiegano le lettere. Che <Tex>{String.raw`\exists`}</Tex> si valuti come OR e{" "}
                            <Tex>{String.raw`\forall`}</Tex> come AND invece è nelle slide (algoritmo Truth).
                        </li>
                        <li>
                            <span className={ui.pillExt}>esterno</span> Il nome Immerman–Szelepcsényi per{" "}
                            <Tex>{String.raw`\mathrm{NL} = \mathrm{coNL}`}</Tex>: le slide della Lez. 4 dicono solo che
                            per lo spazio nondeterministico la chiusura per complemento si dimostra.
                        </li>
                        <li>
                            <span className={ui.pillExt}>✱ solo appunti</span> NL-completezza di REACHABILITY e 2-SAT,
                            P-completezza di CIRCUIT VALUE, HORNSAT e LINEAR PROGRAMMING, 2-COL in L, il nome AKS: sono
                            negli appunti o nella letteratura, non in dispensa o nelle slide disponibili.
                        </li>
                        <li>
                            <span className={ui.pillExt}>✱ solo appunti</span>{" "}
                            <Tex>{String.raw`\mathrm{NP} \subsetneq \mathrm{NEXP}`}</Tex>: dispensa (cap. 8) e slide
                            danno la gerarchia di tempo nondeterministico solo tra polinomi,{" "}
                            <Tex>{String.raw`\mathrm{NTIME}(n^c) \subsetneq \mathrm{NTIME}(n^d)`}</Tex>. La separazione{" "}
                            <Tex>{String.raw`\mathrm{NP} \subsetneq \mathrm{NEXP}`}</Tex>, usata nelle risposte NO,
                            viene dagli appunti (Lez. 5 §7, dal Papadimitriou).
                        </li>
                        <li>
                            <span className={ui.pillOk}>ricavata</span>{" "}
                            <Tex>{String.raw`\mathrm{NEXP} \subsetneq \mathrm{R}`}</Tex> e{" "}
                            <Tex>{String.raw`\mathrm{RE} \neq \mathrm{coRE}`}</Tex> non sono scritte così nelle fonti:
                            seguono da risultati del corso (Lez. 10 §4 e §7), con il ragionamento mostrato nella scheda.
                        </li>
                    </ul>
                </details>
                <details className={`${prose} border-line rounded-xl border p-4 sm:p-5`}>
                    <summary className="cursor-pointer font-medium">Precisazioni sui materiali del corso</summary>
                    <ul>
                        <li>
                            <b>Barre di complemento perse.</b> Nel riepilogo della dispensa (cap. 22) e nel cap. 17
                            &quot;HAMILTON PATH is coNP-complete&quot;, &quot;TSP(D) is coNP-complete&quot;, &quot;
                            <Tex>{String.raw`\mathrm{QSAT}_i`}</Tex> is <Tex>{String.raw`\Pi_i^{\mathrm{P}}`}</Tex>
                            -complete&quot; e &quot;STRATEGIC COMPANIES is <Tex>{String.raw`\Pi_2^{\mathrm{P}}`}</Tex>
                            -complete&quot; hanno una barra sopra il nome, cioè parlano del complemento. Sono giusti; la
                            barra sparisce solo se si copia il testo dal PDF.
                        </li>
                    </ul>
                </details>
            </div>

            <details className={`${prose} border-line mt-4 max-w-none rounded-xl border p-4 sm:p-5`}>
                <summary className="cursor-pointer font-medium">Verifica della tabella dei problemi</summary>
                <p className={ui.hint}>
                    Ogni riga della tabella di partenza della mappa dei problemi, controllata su dispensa, slide delle
                    Lezioni 1–9 e pagine delle tracce risolte.
                </p>
                <div className="border-line overflow-x-auto border-t">
                    <table className="w-full min-w-160 border-collapse text-base">
                        <thead>
                            <tr>
                                {["Riga della tabella", "Esito", "Cosa dicono le fonti"].map((h) => (
                                    <th
                                        key={h}
                                        className="border-line font-ui text-muted border-b p-2 text-left align-bottom text-xs font-medium tracking-wider uppercase"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {SOURCE_CHECKS.map(([r, v, t]) => (
                                <tr key={r}>
                                    <td className="border-line border-b p-2 align-top">
                                        <MathHtml html={r} />
                                    </td>
                                    <td
                                        className={`border-line border-b p-2 align-top font-mono text-sm font-medium whitespace-nowrap ${v === "ok" ? "text-ok" : "text-open"}`}
                                    >
                                        {v === "ok" ? "✔ confermata" : "◐ in parte"}
                                    </td>
                                    <td className="border-line border-b p-2 align-top">
                                        <MathHtml html={t} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </details>
        </section>
    );
}
