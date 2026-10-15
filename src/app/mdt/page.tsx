import type { GuidedStep } from "@/components/mdt/GuidedExample";
import type { Metadata } from "next";

import Link from "next/link";

import OpenOnHash from "@/components/learning/OpenOnHash";
import Markdown from "@/components/Markdown";
import GuidedExample from "@/components/mdt/GuidedExample";
import { PracticeLab, SolutionLab } from "@/components/mdt/MachineLab";
import { goRightNote, MACHINES, MDT_BODY, MDT_METHOD, tracesOf } from "@/data/mdt";
import { ui } from "@/lib/ui";

export const metadata: Metadata = { title: "Programmare una MdT" };

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
        title: "L'idea",
        source: GO,
        added: 3,
        body: (
            <Markdown>
                {
                    "**Incremento di 1.** Dal fondo verso sinistra: ogni 1 diventa 0 (riporto), il primo 0 diventa 1 e si termina. In binario si lavora dalla cifra meno significativa, che sta a destra: la macchina parte quindi con il blocco «vai in fondo» e, sulla prima cella vuota, torna indietro di una cella."
                }
            </Markdown>
        ),
    },
    {
        title: "Gli stati",
        source: GO + CARRY,
        added: 2,
        body: (
            <Markdown>
                {
                    'Uno stato per ogni cosa da ricordare. Qui basta **q** = "sto portando un riporto": su un 1 scrive 0 e il riporto continua verso sinistra; sul primo 0 scrive 1, il riporto è assorbito e la macchina si ferma in $h$.'
                }
            </Markdown>
        ),
    },
    {
        title: "I casi limite",
        source: GO + CARRY + OVERFLOW,
        added: 4,
        body: (
            <Markdown>
                {
                    "Se il riporto arriva fino a $\\triangleright$ c'è **overflow**: l'input era $1\\dots1$ e ora il nastro contiene $0\\dots0$. Si mette 1 nella prima cella e si aggiunge uno 0 in coda ($111 + 1 = 1000$). Tutte le coppie (stato, simbolo) che non compaiono nella tabella rigettano."
                }
            </Markdown>
        ),
    },
    {
        title: "La simulazione",
        source: GO + CARRY + OVERFLOW,
        added: 0,
        body: (
            <Markdown>
                {
                    "Simula la macchina su un input piccolo, un passo alla volta: con **11** deve lasciare sul nastro **100** ($3 + 1 = 4$). Prova anche 1011 e 0, poi scrivi un input tuo."
                }
            </Markdown>
        ),
    },
];

const SYNTAX = `Nel simulatore una riga della tabella $\\delta$ è una riga di testo: \`q 1 -> q 0 L\` vuol dire $\\delta(q, 1) = (q, 0, \\leftarrow)$.

- **Mosse**: \`R\` (destra, $\\rightarrow$), \`L\` (sinistra, $\\leftarrow$), \`S\` (ferma, $-$).
- **Simboli speciali**: \`▷\` (o \`>\`) per l'inizio del nastro e \`⊔\` (o \`_\`) per la cella vuota. Ogni altro carattere è un simbolo del nastro.
- **Jolly**: \`b\` e \`b'\` sono un bit qualsiasi, \`b̄\` (o \`!b\`) è il bit opposto a \`b\`, \`σ\` (o \`*\`) è un simbolo qualsiasi tranne $\\triangleright$. Scritti a destra della freccia ripetono il simbolo letto.
- **Più nastri**: a sinistra lo stato e un simbolo letto per nastro; a destra il nuovo stato e una coppia (simbolo scritto, mossa) per nastro, per esempio \`s 0 ⊔ -> s 0 R 0 R\`.
- **Stati**: si parte da \`s\`; \`h\`, \`yes\` e \`no\` sono finali. Con l'oracolo la macchina chiede nello stato \`q?\`, l'oracolo legge l'ultimo nastro (quello di query) e la macchina passa in \`qYES\` o \`qNO\`.
- **Commenti**: tutto ciò che segue \`#\` sulla riga.

Due regole del simulatore: se per una coppia (stato, simboli letti) non c'è nessuna riga, la macchina rigetta; se ce ne sono più di una, vince quella con più simboli esatti, e se restano più righe la macchina è nondeterministica e ogni riga è una scelta.`;

export default function Page() {
    return (
        <section className="flex flex-col gap-8">
            <OpenOnHash />
            <header className="flex flex-col gap-3">
                <p className={ui.eyebrow}>Domanda 8 delle tracce</p>
                <h1 className={ui.h1}>Programmare una macchina di Turing, passo per passo</h1>
                <p className={ui.lede}>
                    Il metodo per scrivere la tabella δ, un esempio guidato, un simulatore dove provare le tue macchine
                    e le soluzioni di tutte le tracce da eseguire un passo alla volta.
                </p>
                <nav aria-label="In questa pagina" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {[
                        ["metodo", "Il metodo"],
                        ["esempio", "Esempio guidato"],
                        ["formato", "Come si scrive qui"],
                        ["laboratorio", "Laboratorio"],
                        ["macchine", "Le macchine delle tracce"],
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
                    I quattro passi del metodo, uno alla volta. In ogni passo le righe nuove della tabella sono
                    evidenziate.
                </p>
                <GuidedExample steps={STEPS} samples={["11", "1011", "0"]} inputHint="un numero binario" />
            </section>

            <section id="formato" className="border-line flex scroll-mt-16 flex-col gap-3 border-t pt-6">
                <h2 className={ui.h2}>Come si scrive una macchina qui</h2>
                <Markdown>{SYNTAX}</Markdown>
            </section>

            <section id="laboratorio" className="border-line flex scroll-mt-16 flex-col gap-3 border-t pt-6">
                <h2 className={ui.h2}>Laboratorio</h2>
                <p className={ui.hint}>
                    Scegli un esercizio delle tracce e scrivi la tua tabella: il pulsante Verifica la prova su tutti gli
                    input di prova. Quello che scrivi resta salvato in questo browser.
                </p>
                <PracticeLab draftKey="laboratorio" />
            </section>

            <section id="macchine" className="border-line flex scroll-mt-16 flex-col gap-3 border-t pt-6">
                <h2 className={ui.h2}>Le macchine delle tracce</h2>
                <p className={ui.hint}>
                    Ogni soluzione con l&apos;idea, la tabella, le tracce passo passo e il simulatore.
                </p>
                {MACHINES.map((m) => (
                    <details
                        key={m.id}
                        id={m.id}
                        className="group border-line bg-surface open:border-line-strong scroll-mt-20 rounded-xl border"
                    >
                        <summary className="flex min-h-11 cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 [&::-webkit-details-marker]:hidden">
                            <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-90">
                                ›
                            </span>
                            <span className="min-w-0 flex-1 font-semibold">{m.title}</span>
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
                            <Markdown>{MDT_BODY[m.id]}</Markdown>
                            {goRightNote(m.id) && (
                                <div className={ui.noteInfo}>
                                    <Markdown>{goRightNote(m.id)!}</Markdown>
                                </div>
                            )}
                            <h3 className={ui.h3}>Eseguila</h3>
                            <SolutionLab id={m.id} />
                        </div>
                    </details>
                ))}
            </section>
        </section>
    );
}
