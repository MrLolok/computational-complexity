import type { Metadata } from "next";

import Link from "next/link";

import Markdown from "@/components/Markdown";
import { LESSON, lessonGroups } from "@/data/probabilistic-quantum/lesson";
import GroverDemo from "@/features/probabilistic-quantum/GroverDemo";
import {
    LessonExam,
    LessonExercises,
    LessonSource,
    LessonTopics,
} from "@/features/probabilistic-quantum/LessonSections";
import { ui } from "@/lib/tokens";

export const metadata: Metadata = { title: "Algoritmi quantistici" };

/* Slide della Lez. 6, ultime sezioni: speedup quantistici, crittografia e conclusioni. Qubit, QTM e BQP stanno nella scheda Quantistiche di /classi. */
export default function Page() {
    const [speedup, crypto, end] = lessonGroups("speedup", "crittografia", "conclusioni");
    return (
        <section className="flex flex-col gap-7">
            <header>
                <p className={`${ui.eyebrow} mb-2`}>Calcolo quantistico</p>
                <h1 className={ui.h2}>Algoritmi quantistici: che cosa diventa facile</h1>
                <div className={`${ui.lede} mt-3`}>
                    <Markdown>{LESSON.questions[3].a}</Markdown>
                </div>
                <p className="text-muted mt-3 text-sm">
                    Qubit, macchina di Turing quantistica e la classe BQP sono nella{" "}
                    <Link href="/classi#quantistiche" className="text-accent underline underline-offset-4">
                        scheda Quantistiche delle classi
                    </Link>
                    , con la mappa.
                </p>
            </header>
            <LessonTopics groups={[speedup]} />
            <section className="flex flex-col gap-3">
                <h3 className={ui.h3}>Prova: Grover contro una chiave simmetrica</h3>
                <GroverDemo />
            </section>
            <LessonTopics groups={[crypto, end]} />
            <section className="flex flex-col gap-3">
                <h3 className={ui.h3}>Esercizi</h3>
                <LessonExercises only={[0, 1, 2]} />
            </section>
            <LessonExam bullets={[3]} test={/crittografia simmetrica|algoritmo quantistico(?! a errore)/} />
            <LessonSource />
        </section>
    );
}
