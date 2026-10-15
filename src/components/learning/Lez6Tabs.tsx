import Link from "next/link";

import Markdown from "@/components/Markdown";
import { LEZ6, lez6Groups } from "@/data/lezione6";
import { ui } from "@/lib/ui";
import { Lez6Exam, Lez6Exercises, Lez6Questions, Lez6Source, Lez6Topics } from "./Lez6";
import Lez6Map from "./Lez6Map";

/* Le schede Probabilistiche e Quantistiche di /classi seguono la Lezione 6 degli appunti; gli algoritmi quantistici stanno in /quantistico. */
export const RANDOM_GROUPS = ["probabilistici", "pp", "bpp"];
export const QUANTUM_GROUPS = ["quantistico", "bqp"];
/** #ancora di ogni spiegazione → indice della scheda che la contiene */
export const LEZ6_ANCHORS: Record<string, number> = Object.fromEntries([
    ...lez6Groups(...RANDOM_GROUPS).flatMap((g) => g.topics.map((t) => [t.id, 1])),
    ...lez6Groups(...QUANTUM_GROUPS).flatMap((g) => g.topics.map((t) => [t.id, 2])),
]);
const HOW_TO = "Apri un argomento per leggere l'idea, un esempio e la definizione formale.";

export function RandomTab() {
    return (
        <div className="flex flex-col gap-7">
            <Lez6Questions only={[0, 1]} />
            <section className="flex flex-col gap-3">
                <h3 className={ui.h3}>Dove stanno nella gerarchia</h3>
                <p className={ui.hint}>
                    Tocca una classe per leggerne il significato, la condizione di accettazione e le relazioni con le
                    altre.
                </p>
                <Lez6Map initial="BPP" />
            </section>
            <section className="flex flex-col gap-3">
                <h2 className={ui.h2}>Spiegazione semplificata</h2>
                <p className={ui.hint}>{HOW_TO}</p>
                <Lez6Topics groups={lez6Groups(...RANDOM_GROUPS)} />
            </section>
            <section className="flex flex-col gap-3">
                <h3 className={ui.h3}>Esercizio</h3>
                <Lez6Exercises only={[3]} />
            </section>
            <Lez6Exam bullets={[0, 1, 2]} test={/\b(?:BPP|PP)\b/} />
            <Lez6Source />
        </div>
    );
}

export function QuantumTab() {
    return (
        <div className="flex flex-col gap-7">
            <Lez6Questions only={[2, 3]} />
            <section className="flex flex-col gap-3">
                <h3 className={ui.h3}>Dove sta BQP</h3>
                <Lez6Map initial="BQP" />
                <div className={ui.note}>
                    <Markdown>{LEZ6.remember}</Markdown>
                </div>
            </section>
            <section className="flex flex-col gap-3">
                <h2 className={ui.h2}>Spiegazione semplificata</h2>
                <p className={ui.hint}>{HOW_TO}</p>
                <Lez6Topics groups={lez6Groups(...QUANTUM_GROUPS)} />
            </section>
            <Link href="/quantistico" className={`${ui.btn} self-start`}>
                Algoritmi quantistici: Grover, Shor e quando conviene →
            </Link>
            <Lez6Exam bullets={[4]} test={/\bBQP\b|MdT quantistica|quantistico a errore limitato/} />
            <Lez6Source />
        </div>
    );
}
