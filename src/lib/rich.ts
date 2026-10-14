import { NAME, type ClassId } from "@/data/classes";
import { ui } from "./ui";

/** HTML del gettone di una classe, con link alla sua scheda. */
export const chipHtml = (id: ClassId) =>
  `<a href="/classi/${id}" class="${ui.chip}" style="--c:var(--color-c-${id})">${NAME[id]}</a>`;

/** Sostituisce i segnaposto {{ID}} dei testi con i gettoni delle classi. */
export const fillChips = (html: string) =>
  html.replace(/\{\{(\w+)\}\}/g, (m, id: string) => (id in NAME ? chipHtml(id as ClassId) : m));
