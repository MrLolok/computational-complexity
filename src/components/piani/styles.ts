/* Classi Tailwind ricorrenti delle schede DP e Piani di PH. */

/** bottoni con una formula (aria-pressed = scelto) */
export const formulaBtn =
    "min-h-11 font-mono text-sm border border-line rounded-lg px-3 py-2 text-ink cursor-pointer aria-pressed:border-c-DP aria-pressed:bg-c-DP/14 disabled:opacity-40 disabled:cursor-default";
/** esito finale sì / no */
export const final = (yes: boolean) =>
    `rounded-lg px-3 py-2 font-ui font-semibold ${yes ? "bg-ok-soft text-ok" : "bg-proved-soft text-proved"}`;
