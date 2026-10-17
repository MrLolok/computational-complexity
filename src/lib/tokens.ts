/* Classi Tailwind condivise: un solo posto per lo stile ricorrente (niente CSS scritto a mano). */
export const ui = {
    eyebrow: "font-ui text-xs uppercase tracking-widest text-muted font-medium",
    label: "font-ui text-xs uppercase tracking-widest text-muted font-medium",
    h1: "font-head text-4xl sm:text-5xl font-medium leading-tight tracking-tight text-balance",
    h2: "font-head text-2xl font-medium leading-tight text-balance",
    h3: "font-head text-xl font-medium leading-tight text-balance",
    lede: "text-muted text-base leading-relaxed max-w-prose",
    hint: "text-muted text-base",
    card: "bg-surface border border-line rounded-xl p-4 sm:p-5 flex flex-col gap-3 min-w-0",
    sec: "mt-5 pt-4 border-t border-line flex flex-col gap-2",
    btn: "inline-flex items-center justify-center gap-1.5 min-h-11 font-ui text-sm border border-line-strong rounded-lg px-3 py-2 text-ink hover:border-accent hover:text-accent disabled:opacity-35 disabled:cursor-default transition-colors cursor-pointer",
    btnPrimary:
        "inline-flex items-center justify-center gap-1.5 min-h-11 font-ui text-sm rounded-lg px-3 py-2 bg-accent text-accent-ink border border-accent hover:opacity-90 disabled:opacity-35 cursor-pointer",
    linkBtn: "font-ui text-sm text-accent underline underline-offset-2 cursor-pointer",
    pill: "inline-block font-ui text-xs font-medium rounded-full px-2.5 py-0.5 bg-sunk text-ink whitespace-nowrap",
    pillProved:
        "inline-block font-ui text-xs font-medium rounded-full px-2.5 py-0.5 bg-proved-soft text-proved whitespace-nowrap",
    pillOpen:
        "inline-block font-ui text-xs font-medium rounded-full px-2.5 py-0.5 bg-open-soft text-open whitespace-nowrap",
    pillOk: "inline-block font-ui text-xs font-medium rounded-full px-2.5 py-0.5 bg-ok-soft text-ok whitespace-nowrap",
    pillExt:
        "inline-block font-ui text-xs font-medium rounded-full px-2.5 py-0.5 bg-accent-soft text-accent whitespace-nowrap",
    note: "border-l-2 border-open bg-open-soft px-3 py-2 rounded-r-lg text-base",
    noteTrap: "border-l-2 border-proved bg-proved-soft px-3 py-2 rounded-r-lg text-base",
    noteOk: "border-l-2 border-ok bg-ok-soft px-3 py-2 rounded-r-lg text-base",
    noteInfo: "border-l-2 border-line-strong bg-sunk px-3 py-2 rounded-r-lg text-base",
    formula: "font-mono bg-sunk rounded-lg px-3 py-2 text-sm overflow-x-auto whitespace-nowrap",
    mono: "font-mono text-sm",
    /** codice della traccia accanto a una domanda */
    code: "font-mono text-xs text-muted",
    select: "study-select min-h-11 min-w-0 font-ui text-base rounded-lg border border-line-strong bg-surface text-ink pl-3 pr-10 py-2 max-w-full cursor-pointer hover:border-accent focus-visible:border-accent transition-colors",
    input: "w-full min-w-0 bg-transparent font-ui text-base text-ink placeholder:text-muted outline-none py-2",
    search: "flex flex-1 basis-60 min-w-0 items-center gap-2 bg-surface border border-line-strong rounded-lg px-2.5 text-muted focus-within:border-accent",
    /** risposte SÌ / NO / altro */
    yn: { SI: "bg-ok-soft text-ok", NO: "bg-proved-soft text-proved", ALTRO: "bg-open-soft text-open" },
    /** gettone di una classe; il colore arriva dalla variabile --c */
    chip: "font-mono font-medium text-sm border border-(--c)/45 text-(--c) rounded-md px-1 whitespace-nowrap no-underline hover:bg-(--c)/12 cursor-pointer",
} as const;

/** rettangolo di un nodo nelle mappe (classi e torre), rispetto al nodo scelto; il colore arriva da --c */
export const NODE_RECT = {
    sel: "fill-[color-mix(in_srgb,var(--c)_22%,var(--color-surface))] stroke-3",
    sub: "fill-[color-mix(in_srgb,var(--c)_11%,var(--color-surface))] stroke-1.5 group-hover:stroke-2",
    sup: "fill-surface stroke-2",
    far: "fill-surface stroke-1.5 group-hover:stroke-2",
} as const;

export const classColor = (id: string) => ({ "--c": `var(--color-c-${id})` }) as React.CSSProperties;

/** frecce SVG (tracciati su 24×24) al posto dei glifi → ← ↑ ↓ ↗ ›: colore e corpo li prendono dal testo */
export const ARROWS = {
    right: "M5 12h14M13 6l6 6-6 6",
    left: "M19 12H5M11 6l-6 6 6 6",
    up: "M12 19V5M6 11l6-6 6 6",
    down: "M12 5v14M6 13l6 6 6-6",
    "up-right": "M7 17 17 7M8 7h9v9",
    chevron: "M9 6l6 6-6 6",
} as const;
export const ARROW_CLASS = "inline-block size-[1.1em] shrink-0 align-[-0.2em]";

/** la stessa freccia per l'HTML scritto come stringa */
export const arrowSvg = (shape: keyof typeof ARROWS = "right") =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${ARROW_CLASS}"><path d="${ARROWS[shape]}"/></svg>`;

/* usati dalle schede DP e Piani di PH */

/** bottoni con una formula (aria-pressed = scelto) */
export const formulaBtn =
    "min-h-11 font-mono text-sm border border-line rounded-lg px-3 py-2 text-ink cursor-pointer aria-pressed:border-c-DP aria-pressed:bg-c-DP/14 disabled:opacity-40 disabled:cursor-default";
/** esito finale sì / no */
export const outcomeClass = (yes: boolean) =>
    `rounded-lg px-3 py-2 font-ui font-medium ${yes ? "bg-ok-soft text-ok" : "bg-proved-soft text-proved"}`;
