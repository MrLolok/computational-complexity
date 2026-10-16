/* Lezione 6 · Algoritmi probabilistici e calcolo quantistico, esportata (in sola lettura) dalla pagina Notion degli appunti.
   Spiegazione semplificata (parte C), domande guida, esercizi e collegamenti con l'esame. Testi in Markdown con formule $…$. */
import raw from "./lesson.json";

export type Lez6Topic = {
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
export type Lez6Group = { id: string; title: string; topics: Lez6Topic[] };
export type Lez6 = {
    intro: string;
    questions: { q: string; a: string }[];
    howTo: string;
    groups: Lez6Group[];
    exercises: { q: string; a: string }[];
    exam: { intro: string; bullets: string[]; notes: string[] };
    mapCaption: string;
    remember: string;
};

export const LEZ6 = raw as Lez6;
export const lez6Groups = (...ids: string[]) => ids.map((id) => LEZ6.groups.find((g) => g.id === id)!).filter(Boolean);
