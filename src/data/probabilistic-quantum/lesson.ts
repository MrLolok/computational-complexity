/* Lezione 6 · Algoritmi probabilistici e calcolo quantistico, esportata (in sola lettura) dalla pagina Notion degli appunti.
   Spiegazione semplificata (parte C), domande guida, esercizi e collegamenti con l'esame. Testi in Markdown con formule $…$. */
import raw from "./lesson.json";

export type LessonTopic = {
    id: string;
    title: string;
    /** "· non chiesto all'esame" negli appunti */
    notAsked: boolean;
    /** paragrafo della parte B degli appunti, es. "§7" */
    ref: string;
    idea: string;
    esempio: string;
    /** manca nei concetti che negli appunti non hanno la versione formale */
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
