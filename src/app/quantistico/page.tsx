import type { Metadata } from "next";

import Link from "next/link";

import Markdown from "@/components/Markdown";
import { LEZ6, lez6Groups } from "@/data/probabilistic-quantum/lesson";
import GroverDemo from "@/features/probabilistic-quantum/GroverDemo";
import { Lez6Exam, Lez6Exercises, Lez6Source, Lez6Topics } from "@/features/probabilistic-quantum/LessonSections";
import { ui } from "@/lib/tokens";

export const metadata: Metadata = { title: "Algoritmi quantistici" };

/* Lezione 6, §9–§11: speedup quantistici, crittografia e conclusioni. Qubit, QTM e BQP stanno nella scheda Quantistiche di /classi. */
export default function Page() {
    const [speedup, crypto, end] = lez6Groups("speedup", "crittografia", "conclusioni");
    return (
        <section className="flex flex-col gap-7">
            <header>
                <p className={`${ui.eyebrow} mb-2`}>Lezione 6 · calcolo quantistico</p>
                <h1 className={ui.h2}>Algoritmi quantistici: che cosa diventa facile</h1>
                <div className={`${ui.lede} mt-3`}>
                    <Markdown>{LEZ6.questions[3].a}</Markdown>
                </div>
                <p className="text-muted mt-3 text-sm">
                    Qubit, macchina di Turing quantistica e la classe BQP sono nella{" "}
                    <Link href="/classi#quantistiche" className="text-accent underline underline-offset-4">
                        scheda Quantistiche delle classi
                    </Link>
                    , con la mappa.
                </p>
            </header>
            <Lez6Topics groups={[speedup]} />
            <section className="flex flex-col gap-3">
                <h3 className={ui.h3}>Prova: Grover contro una chiave simmetrica</h3>
                <GroverDemo />
            </section>
            <Lez6Topics groups={[crypto, end]} />
            <section className="flex flex-col gap-3">
                <h3 className={ui.h3}>Esercizi</h3>
                <Lez6Exercises only={[0, 1, 2]} />
            </section>
            <Lez6Exam bullets={[3]} test={/crittografia simmetrica|algoritmo quantistico(?! a errore)/} />
            <Lez6Source />
        </section>
    );
}
