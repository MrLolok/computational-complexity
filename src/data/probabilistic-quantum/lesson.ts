/* Algoritmi probabilistici e calcolo quantistico (slide Lez. 6): spiegazione semplificata, domande guida, esercizi
   e collegamenti con l'esame. Testi in Markdown con formule $…$. */
import raw from "./lesson.json";

export type LessonTopic = {
    id: string;
    title: string;
    /** argomento che le tracce non chiedono */
    notAsked: boolean;
    /** titolo della slide che tratta l'argomento, es. "La classe BQP" */
    ref: string;
    idea: string;
    esempio: string;
    /** manca nei concetti senza una versione formale */
    formale?: string;
};
export type LessonGroup = { id: string; title: string; topics: LessonTopic[] };
export type Lesson = {
    intro: string;
    questions: { q: string; a: string }[];
    howTo: string;
    groups: LessonGroup[];
    exercises: { q: string; a: string }[];
    exam: { intro: string; bullets: string[]; notes: string[] };
    mapCaption: string;
    remember: string;
};

export const LESSON = raw as Lesson;
export const lessonGroups = (...ids: string[]) =>
    ids.map((id) => LESSON.groups.find((g) => g.id === id)!).filter(Boolean);
