import type { ClassId } from "@/data/classes";

import { NAME } from "@/data/classes";
import { texHtml } from "./tex";
import { ui } from "./ui";

/** HTML del gettone di una classe, con link alla sua scheda. */
export const chipHtml = (id: ClassId) =>
    `<a href="/classi/${id}" data-term="${id}" class="${ui.chip}" style="--c:var(--color-c-${id})">${NAME[id]}</a>`;

/** Sostituisce i segnaposto {{ID}} dei testi con i gettoni delle classi e rende le formule $…$. */
export const fillChips = (html: string) =>
    texHtml(html)
        .replace(/\{\{(\w+)\}\}/g, (m, id: string) => (id in NAME ? chipHtml(id as ClassId) : m))
        .replace(/href="\/problemi\/([^"#]+)"/g, '$& data-term="problem:$1"');
