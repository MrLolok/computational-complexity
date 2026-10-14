/* Classi Tailwind ricorrenti delle schede DP e Piani di PH. */

/** card della griglia (wide: occupa tutta la riga) */
export const card = "bg-surface border border-line rounded-xl p-[18px] flex flex-col gap-[0.7rem] min-w-0";
export const cardWide = `${card} col-span-full`;
/** griglia di card a una o due colonne */
export const cardGrid = "grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-[18px]";
export const h3 = "font-head text-[1.28rem] font-semibold leading-tight text-balance";
/** intestazione a fascia con bordo colorato a sinistra (colore da --c) */
export const hero = "flex flex-col gap-[0.6rem] border-l-2 border-(--c) pt-1 pb-[18px] pl-[18px]";
export const heroBig = "font-head text-[1.45rem] font-semibold leading-snug";
/** bottoni con una formula (aria-pressed = scelto) */
export const formulaBtn =
  "font-mono text-[0.86rem] border border-line rounded-lg px-[0.55rem] py-[0.3rem] text-ink cursor-pointer aria-pressed:border-c-DP aria-pressed:bg-c-DP/14 disabled:opacity-40 disabled:cursor-default";
/** fonte in piccolo */
export const src = "text-[0.82rem] text-muted [&_b]:font-ui [&_b]:font-semibold";
/** tabelle: prima colonna come etichetta */
export const table =
  "w-full border-collapse text-[0.92rem] [&_td]:border-b [&_td]:border-line [&_td]:px-[0.6rem] [&_td]:py-[0.55rem] [&_td]:text-left [&_td]:align-top [&_th]:border-b [&_th]:border-line [&_th]:px-[0.6rem] [&_th]:py-[0.55rem] [&_th]:text-left [&_th]:align-top [&_th]:font-ui [&_th]:text-[0.72rem] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.08em] [&_th]:text-muted [&_th_a]:normal-case [&_th_a]:tracking-normal [&_td:first-child]:w-[22%] [&_td:first-child]:font-ui [&_td:first-child]:text-[0.85rem] [&_td:first-child]:font-medium [&_td:first-child]:text-muted";
/** esito finale sì / no */
export const final = (yes: boolean) =>
  `rounded-lg px-[0.7rem] py-2 font-ui font-semibold ${yes ? "bg-ok-soft text-ok" : "bg-proved-soft text-proved"}`;
