import type { GuidedStep } from "@/features/turing/GuidedExample";
import type { Metadata } from "next";

import Link from "next/link";

import Arrow from "@/components/Arrow";
import Markdown from "@/components/Markdown";
import MathHtml from "@/components/MathHtml";
import OpenOnHash from "@/components/OpenOnHash";
import { EXERCISES } from "@/data/turing/exercises";
import { MACHINES } from "@/data/turing/machines";
import { goRightNote, MDT_BODY, MDT_METHOD, tracesOf } from "@/data/turing/solutions";
import GuidedExample from "@/features/turing/GuidedExample";
import SolutionLab from "@/features/turing/SolutionLab";
import { ui } from "@/lib/tokens";

export const metadata: Metadata = { title: "Macchine di Turing: metodo e soluzioni" };

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
                    "Per aggiungere 1 a un numero binario si parte da destra: ogni 1 finale diventa 0 e il primo 0 diventa 1. Prima, però, la macchina deve arrivare all'ultima cifra, quindi scorre l'input fino alla prima cella vuota e torna indietro di una posizione. È quello che fanno le prime tre righe."
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
                    "Lo stato $q$ ricorda una cosa sola: c'è ancora un riporto da sommare. Se legge 1 scrive 0 e continua verso sinistra; se legge 0 scrive 1, il riporto è sistemato e la macchina termina in $h$."
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
                    "Se il numero è fatto solo di 1, il riporto arriva fino a $\\triangleright$ e serve una cifra in più: la macchina scrive 1 all'inizio e aggiunge uno 0 in coda, come in $111 + 1 = 1000$. Per le combinazioni di stato e simbolo che non hanno una regola, la macchina rifiuta."
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
                    "La tabella è completa. Con «Un passo» segui una transizione alla volta, con «Esegui» la simulazione va avanti da sola. Con input 11 il risultato deve essere 100 ($3 + 1 = 4$). Poi prova 1011 e 0, oppure un numero binario a tua scelta."
                }
            </Markdown>
        ),
    },
];

const SYNTAX = `Nella domanda 8 di ogni traccia la macchina si scrive in una tabella, con una riga per ogni transizione. La riga con stato \`q\`, legge \`1\`, nuovo stato \`q\`, scrive \`0\` e mossa ← vuol dire: se sei in q e leggi 1, scrivi 0, spostati a sinistra e resta in q. In formule, $\\delta(q, 1) = (q, 0, \\leftarrow)$.

Le mosse sono → (destra), ← (sinistra) e − (testina ferma). \`▷\` segna l'inizio del nastro e \`⊔\` una cella vuota: puoi scriverli come \`>\` e \`_\`, oppure inserirli nella cella selezionata con la barra «Inserisci» sotto la tabella.

Nelle celle puoi usare dei jolly. \`b\` è un bit qualsiasi e \`b'\` un secondo bit, indipendente dal primo; \`b̄\` (oppure \`!b\`) è il bit opposto a \`b\`; \`σ\` (oppure \`*\`) è un simbolo qualsiasi tranne \`▷\`. Scritti a destra della freccia, \`b\`, \`b'\` e \`σ\` valgono il simbolo letto con quel nome, quindi su un altro nastro lo copiano; \`b̄\` scrive il bit opposto a \`b\`.

La macchina parte da \`s\`. Termina in \`h\` quando restituisce un risultato, in \`yes\` per accettare e in \`no\` per rifiutare. La colonna del commento è facoltativa e non viene eseguita.

Con più nastri ogni riga ha, per ciascun nastro, un simbolo letto, un simbolo scritto e una mossa. Con un oracolo scrivi la domanda sull'ultimo nastro ed entra in \`q?\`: la risposta porta la macchina in \`qYES\` oppure in \`qNO\`. Per questi stati, e per \`yes\` e \`no\`, maiuscole e minuscole sono indifferenti.

Se per lo stato e i simboli letti non c'è nessuna riga, la macchina rifiuta. Se le righe applicabili sono più di una, vincono quelle con più simboli esatti; a parità, ogni riga è un ramo nondeterministico.`;

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
                    Qui trovi il metodo per scrivere la tabella delle transizioni, un esempio costruito un passo alla
                    volta, le soluzioni di tutte le macchine uscite nelle tracce e altri esercizi svolti dello stesso
                    tipo. La tua macchina la scrivi e la consegni nella domanda 8 di ogni{" "}
                    <Link href="/tracce" className="text-accent underline underline-offset-4">
                        traccia
                    </Link>
                    .
                </p>
                <nav aria-label="In questa pagina" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {[
                        ["metodo", "Il metodo"],
                        ["esempio", "Esempio guidato"],
                        ["formato", "Sintassi"],
                        ["macchine", "Soluzioni delle tracce"],
                        ["esercizi", "Altri esercizi svolti"],
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
                    La tabella si costruisce in quattro passi, e a ogni passo le righe nuove sono evidenziate.
                    All&apos;ultimo passo puoi eseguire la macchina.
                </p>
                <GuidedExample steps={STEPS} samples={["11", "1011", "0"]} inputHint="un numero binario" />
            </section>

            <section id="formato" className="border-line flex scroll-mt-16 flex-col gap-3 border-t pt-6">
                <h2 className={ui.h2}>Come scrivere le transizioni</h2>
                <Markdown>{SYNTAX}</Markdown>
            </section>

            <section id="macchine" className="border-line flex scroll-mt-16 flex-col gap-3 border-t pt-6">
                <h2 className={ui.h2}>Soluzioni delle tracce</h2>
                <p className={ui.hint}>
                    Apri un esercizio per leggere come si risolve e per eseguire la soluzione nel simulatore.
                </p>
                {MACHINES.map((m) => (
                    <details
                        key={m.id}
                        id={m.id}
                        name="mdt-solutions"
                        className="group border-line bg-surface open:border-line-strong scroll-mt-20 rounded-xl border"
                    >
                        <summary className="flex min-h-11 cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 [&::-webkit-details-marker]:hidden">
                            <Arrow shape="chevron" className="text-muted transition-transform group-open:rotate-90" />
                            <span className="min-w-0 flex-1 basis-52 font-medium wrap-normal">{m.title}</span>
                            <span className={ui.pill}>
                                {tracesOf(m.id).length === 1 ? "1 traccia" : `${tracesOf(m.id).length} tracce`}
                            </span>
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

            <section id="esercizi" className="border-line flex scroll-mt-16 flex-col gap-3 border-t pt-6">
                <h2 className={ui.h2}>Altri esercizi svolti</h2>
                <p className={ui.hint}>
                    Esercizi nuovi, dello stesso tipo della domanda 8 ma non usciti nelle tracce. Ognuno ha il testo e
                    la soluzione completa: l&apos;idea, la tabella delle transizioni e una simulazione su un input.
                </p>
                {EXERCISES.map((e) => (
                    <details
                        key={e.id}
                        id={`es-${e.id}`}
                        name="mdt-exercises"
                        className="group border-line bg-surface open:border-line-strong scroll-mt-20 rounded-xl border"
                    >
                        <summary className="flex min-h-11 cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 [&::-webkit-details-marker]:hidden">
                            <Arrow shape="chevron" className="text-muted transition-transform group-open:rotate-90" />
                            <MathHtml
                                html={e.title}
                                terms={false}
                                className="min-w-0 flex-1 basis-52 font-medium wrap-normal"
                            />
                            <span className={ui.pill}>
                                {e.kind} · {e.tapes === 1 ? "1 nastro" : `${e.tapes} nastri`}
                                {e.nondet ? " · nondeterministica" : ""}
                                {e.oracle ? ` · oracolo ${e.oracle}` : ""}
                            </span>
                        </summary>
                        <div className="border-line flex min-w-0 flex-col gap-4 border-t px-4 pt-4 pb-5">
                            <div className={ui.noteInfo}>
                                <Markdown>{`**Testo.** ${e.text}`}</Markdown>
                            </div>
                            <Markdown className={TABLE}>{e.body}</Markdown>
                        </div>
                    </details>
                ))}
            </section>
        </section>
    );
}
