import type { GuidedStep } from "@/components/mdt/GuidedExample";
import type { Metadata } from "next";

import Link from "next/link";

import OpenOnHash from "@/components/learning/OpenOnHash";
import Markdown from "@/components/Markdown";
import GuidedExample from "@/components/mdt/GuidedExample";
import { PracticeLab, SolutionLab } from "@/components/mdt/MachineLab";
import { goRightNote, MACHINES, MDT_BODY, MDT_METHOD, tracesOf } from "@/data/mdt";
import { ui } from "@/lib/ui";

export const metadata: Metadata = { title: "Macchine di Turing: guida ed esercizi" };

const GO = `s ▷ -> s ▷ R      # supera l'inizio del nastro
s b -> s b R      # vai in fondo
s ⊔ -> q ⊔ L      # fine input, inizia il riporto
`;
const CARRY = `q 1 -> q 0 L      # 1 + riporto = 0, il riporto continua
q 0 -> h 1 S      # riporto assorbito, fine
`;
const OVERFLOW = `q ▷ -> o ▷ R      # overflow
o 0 -> o' 1 R     # la prima cifra diventa 1
o' 0 -> o' 0 R    # scorre le altre cifre
o' ⊔ -> h 0 S     # aggiunge lo 0 in coda
`;
const STEPS: GuidedStep[] = [
    {
        title: "Parti dall'idea",
        source: GO,
        added: 3,
        body: (
            <Markdown>
                {
                    "**Aggiungere 1 a un numero binario.** Parti da destra: trasforma ogni 1 finale in 0, poi cambia il primo 0 in 1. Per raggiungere l'ultima cifra, la macchina scorre l'input fino alla prima cella vuota e torna indietro di una posizione. Queste prime tre righe fanno proprio questo."
                }
            </Markdown>
        ),
    },
    {
        title: "Scegli gli stati",
        source: GO + CARRY,
        added: 2,
        body: (
            <Markdown>
                {
                    'Lo stato **q** ricorda una sola cosa: «devo ancora sommare il riporto». Se legge 1, scrive 0 e continua a sinistra. Se legge 0, scrive 1: il riporto è risolto e la macchina termina in $h$.'
                }
            </Markdown>
        ),
    },
    {
        title: "Gestisci i casi limite",
        source: GO + CARRY + OVERFLOW,
        added: 4,
        body: (
            <Markdown>
                {
                    "**E se il numero contiene solo 1?** Il riporto arriva fino a $\\triangleright$: serve una cifra in più. La macchina scrive 1 all'inizio e aggiunge uno 0 in coda: $111 + 1 = 1000$. Le combinazioni di stato e simbolo senza una regola portano al rifiuto."
                }
            </Markdown>
        ),
    },
    {
        title: "Prova la macchina",
        source: GO + CARRY + OVERFLOW,
        added: 0,
        body: (
            <Markdown>
                {
                    "La tabella è completa. Usa **Un passo** per seguire ogni transizione oppure **Esegui** per avviare la simulazione. Con input **11** il risultato deve essere **100** ($3 + 1 = 4$). Prova poi **1011** e **0**, o inserisci un altro numero binario."
                }
            </Markdown>
        ),
    },
];

const SYNTAX = `Scrivi **una transizione per riga**. Per esempio, \`q 1 -> q 0 L\` significa: «se sei in q e leggi 1, scrivi 0, spostati a sinistra e resta in q». In formule: $\\delta(q, 1) = (q, 0, \\leftarrow)$.

- **Movimenti:** \`R\` = destra, \`L\` = sinistra, \`S\` = testina ferma.
- **Celle speciali:** \`▷\` (oppure \`>\`) segna l'inizio del nastro; \`⊔\` (oppure \`_\`) indica una cella vuota.
- **Jolly:** \`b\` indica un bit; \`b'\` un altro bit indipendente; \`b̄\` (oppure \`!b\`) il bit opposto a \`b\`. \`σ\` (oppure \`*\`) indica un simbolo qualsiasi tranne \`▷\`. A destra della freccia, \`b\`, \`b'\` e \`σ\` riscrivono il simbolo letto; \`b̄\` scrive il bit opposto a \`b\`.
- **Stati finali:** parti da \`s\`; termina in \`h\` per restituire un risultato, in \`yes\` per accettare o in \`no\` per rifiutare.
- **Commenti:** usa \`#\`; il resto della riga non viene eseguito.

**Con più nastri**, scrivi a sinistra un simbolo letto per ciascun nastro. A destra, dopo il nuovo stato, scrivi una coppia «simbolo, movimento» per ciascuno. Esempio: \`s 0 ⊔ -> s 0 R 0 R\`.

**Con un oracolo**, scrivi la domanda sull'ultimo nastro ed entra in \`q?\`. La risposta porta la macchina in \`qYES\` oppure \`qNO\`.

**Se manca una regola**, la macchina rifiuta. Se più righe sono applicabili, hanno precedenza quelle con più simboli esatti. A parità di precedenza, ogni riga è un ramo nondeterministico.`;

/* Tabelle delle transizioni: la colonna delle note resta leggibile e lo stato resta visibile scorrendo. */
const TABLE =
    "[&_td:last-child]:min-w-48 [&_td:first-child]:sticky [&_td:first-child]:left-0 [&_td:first-child]:bg-surface [&_td:first-child]:z-10 [&_th:first-child]:sticky [&_th:first-child]:left-0 [&_th:first-child]:bg-surface [&_th:first-child]:z-10";

export default function Page() {
    return (
        <section className="flex flex-col gap-8">
            <OpenOnHash />
            <header className="flex flex-col gap-3">
                <p className={ui.eyebrow}>Domanda 8 delle tracce</p>
                <h1 className={ui.h1}>Impara a programmare una macchina di Turing</h1>
                <p className={ui.lede}>
                    Parti dall&apos;idea, scegli gli stati e scrivi le transizioni. Segui l&apos;esempio guidato,
                    poi prova la tua macchina nel simulatore o esplora le soluzioni delle tracce.
                </p>
                <nav aria-label="In questa pagina" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {[
                        ["metodo", "Il metodo"],
                        ["esempio", "Esempio guidato"],
                        ["formato", "Sintassi"],
                        ["laboratorio", "Prova tu"],
                        ["macchine", "Soluzioni delle tracce"],
                    ].map(([id, label]) => (
                        <a key={id} href={`#${id}`} className="text-accent underline underline-offset-4">
                            {label}
                        </a>
                    ))}
                </nav>
            </header>

            <section id="metodo" className="flex scroll-mt-16 flex-col gap-6">
                {MDT_METHOD.map((s) => (
                    <div key={s.id} className="flex flex-col gap-2">
                        <h2 className={ui.h3}>{s.title}</h2>
                        <Markdown>{s.body}</Markdown>
                    </div>
                ))}
            </section>

            <section id="esempio" className="border-line flex scroll-mt-16 flex-col gap-3 border-t pt-6">
                <h2 className={ui.h2}>Esempio guidato: l&apos;incremento di 1</h2>
                <p className={ui.hint}>
                    Costruisci la tabella in quattro passi. Le righe aggiunte a ogni passo sono evidenziate;
                    alla fine puoi eseguire la macchina.
                </p>
                <GuidedExample steps={STEPS} samples={["11", "1011", "0"]} inputHint="un numero binario" />
            </section>

            <section id="formato" className="border-line flex scroll-mt-16 flex-col gap-3 border-t pt-6">
                <h2 className={ui.h2}>Come scrivere le transizioni</h2>
                <Markdown>{SYNTAX}</Markdown>
            </section>

            <section id="laboratorio" className="border-line flex scroll-mt-16 flex-col gap-3 border-t pt-6">
                <h2 className={ui.h2}>Prova tu</h2>
                <p className={ui.hint}>
                    Scegli un esercizio e completa le transizioni. Usa «Verifica i casi di prova» per confrontare
                    i risultati con quelli attesi. Il programma si salva automaticamente in questo browser.
                </p>
                <PracticeLab draftKey="laboratorio" />
            </section>

            <section id="macchine" className="border-line flex scroll-mt-16 flex-col gap-3 border-t pt-6">
                <h2 className={ui.h2}>Soluzioni delle tracce</h2>
                <p className={ui.hint}>
                    Apri un esercizio per leggere il ragionamento, consultare la tabella ed eseguire la soluzione.
                </p>
                {MACHINES.map((m) => (
                    <details
                        key={m.id}
                        id={m.id}
                        name="mdt-solutions"
                        className="group border-line bg-surface open:border-line-strong scroll-mt-20 rounded-xl border"
                    >
                        <summary className="flex min-h-11 cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 [&::-webkit-details-marker]:hidden">
                            <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-90">
                                ›
                            </span>
                            <span className="min-w-0 flex-1 basis-52 font-semibold wrap-normal">{m.title}</span>
                            <span className={ui.pill}>
                                {m.kind} · {m.tapes === 1 ? "1 nastro" : `${m.tapes} nastri`}
                                {m.nondet ? " · nondeterministica" : ""}
                                {m.oracle ? ` · oracolo ${m.oracle}` : ""}
                            </span>
                        </summary>
                        <div className="border-line flex min-w-0 flex-col gap-4 border-t px-4 pt-4 pb-5">
                            <p className="font-ui text-muted text-sm">
                                Nelle tracce:{" "}
                                {tracesOf(m.id).map((c, i) => (
                                    <span key={c}>
                                        {i > 0 && ", "}
                                        <Link
                                            href={`/tracce/${c}#d8`}
                                            className="text-accent underline underline-offset-4"
                                        >
                                            {c}
                                        </Link>
                                    </span>
                                ))}
                            </p>
                            <Markdown className={TABLE}>{MDT_BODY[m.id]}</Markdown>
                            {goRightNote(m.id) && (
                                <div className={ui.noteInfo}>
                                    <Markdown>{goRightNote(m.id)!}</Markdown>
                                </div>
                            )}
                            <h3 className={ui.h3}>Prova la soluzione</h3>
                            <SolutionLab id={m.id} />
                        </div>
                    </details>
                ))}
            </section>
        </section>
    );
}
