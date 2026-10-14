/* Classi Tailwind ricorrenti delle schede DP e Piani di PH. */
import { ui } from "@/lib/ui";

/** card della griglia (wide: occupa tutta la riga) */
export const card = ui.card;
export const cardWide = `${card} col-span-full`;
/** griglia di card a una o due colonne */
export const cardGrid = "grid grid-cols-1 gap-4 lg:grid-cols-2";
export const h3 = ui.h3;
/** intestazione a fascia con bordo colorato a sinistra (colore da --c) */
export const hero = "flex flex-col gap-2.5 border-l-2 border-(--c) pt-1 pb-4 pl-4";
export const heroBig = "font-head text-2xl font-semibold leading-snug";
/** bottoni con una formula (aria-pressed = scelto) */
export const formulaBtn =
  "min-h-11 font-mono text-sm border border-line rounded-lg px-3 py-2 text-ink cursor-pointer aria-pressed:border-c-DP aria-pressed:bg-c-DP/14 disabled:opacity-40 disabled:cursor-default";
/** fonte in piccolo */
export const src = "text-sm text-muted [&_b]:font-ui [&_b]:font-semibold";
/** tabelle: prima colonna come etichetta */
export const table =
  "w-full border-collapse text-base [&_td]:border-b [&_td]:border-line [&_td]:p-2 [&_td]:text-left [&_td]:align-top [&_th]:border-b [&_th]:border-line [&_th]:p-2 [&_th]:text-left [&_th]:align-top [&_th]:font-ui [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-muted [&_th_a]:normal-case [&_th_a]:tracking-normal [&_td:first-child]:w-1/4 [&_td:first-child]:font-ui [&_td:first-child]:text-sm [&_td:first-child]:font-medium [&_td:first-child]:text-muted";
/** esito finale sì / no */
export const final = (yes: boolean) =>
  `rounded-lg px-3 py-2 font-ui font-semibold ${yes ? "bg-ok-soft text-ok" : "bg-proved-soft text-proved"}`;
