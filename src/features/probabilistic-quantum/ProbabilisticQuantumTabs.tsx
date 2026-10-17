import Link from "next/link";

import Arrow from "@/components/Arrow";
import Markdown from "@/components/Markdown";
import { LESSON, lessonGroups } from "@/data/probabilistic-quantum/lesson";
import { ui } from "@/lib/tokens";
import { LessonExam, LessonExercises, LessonQuestions, LessonSource, LessonTopics } from "./LessonSections";
import ProbabilisticQuantumMap from "./ProbabilisticQuantumMap";

/* Le schede Probabilistiche e Quantistiche di /classi seguono le slide della Lez. 6; gli algoritmi quantistici stanno in /quantistico. */
export const RANDOM_GROUPS = ["probabilistici", "pp", "bpp"];
export const QUANTUM_GROUPS = ["quantistico", "bqp"];
/** #ancora di ogni spiegazione → indice della scheda che la contiene */
export const LESSON_ANCHORS: Record<string, number> = Object.fromEntries([
    ...lessonGroups(...RANDOM_GROUPS).flatMap((g) => g.topics.map((t) => [t.id, 1])),
    ...lessonGroups(...QUANTUM_GROUPS).flatMap((g) => g.topics.map((t) => [t.id, 2])),
]);
const HOW_TO = "Apri un argomento per leggere l'idea, un esempio e la definizione formale.";

export function RandomTab() {
    return (
        <div className="flex flex-col gap-7">
            <LessonQuestions only={[0, 1]} />
            <section className="flex flex-col gap-3">
                <h3 className={ui.h3}>Dove stanno nella gerarchia</h3>
                <p className={ui.hint}>
                    Tocca una classe per leggerne il significato, la condizione di accettazione e le relazioni con le
                    altre.
                </p>
                <ProbabilisticQuantumMap initial="BPP" />
            </section>
            <section className="flex flex-col gap-3">
                <h2 className={ui.h2}>Spiegazione semplificata</h2>
                <p className={ui.hint}>{HOW_TO}</p>
                <LessonTopics groups={lessonGroups(...RANDOM_GROUPS)} />
            </section>
            <section className="flex flex-col gap-3">
                <h3 className={ui.h3}>Esercizio</h3>
                <LessonExercises only={[3]} />
            </section>
            <LessonExam bullets={[0, 1, 2]} test={/\b(?:BPP|PP)\b/} />
            <LessonSource />
        </div>
    );
}

export function QuantumTab() {
    return (
        <div className="flex flex-col gap-7">
            <LessonQuestions only={[2, 3]} />
            <section className="flex flex-col gap-3">
                <h3 className={ui.h3}>Dove sta BQP</h3>
                <ProbabilisticQuantumMap initial="BQP" />
                <div className={ui.note}>
                    <Markdown>{LESSON.remember}</Markdown>
                </div>
            </section>
            <section className="flex flex-col gap-3">
                <h2 className={ui.h2}>Spiegazione semplificata</h2>
                <p className={ui.hint}>{HOW_TO}</p>
                <LessonTopics groups={lessonGroups(...QUANTUM_GROUPS)} />
            </section>
            <Link href="/quantistico" className={`${ui.btn} self-start`}>
                Algoritmi quantistici: Grover, Shor e quando conviene <Arrow />
            </Link>
            <LessonExam bullets={[4]} test={/\bBQP\b|MdT quantistica|quantistico a errore limitato/} />
            <LessonSource />
        </div>
    );
}
