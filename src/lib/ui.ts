/* Classi Tailwind condivise: un solo posto per lo stile ricorrente (niente CSS scritto a mano). */
export const ui = {
  eyebrow: "font-ui text-xs uppercase tracking-widest text-muted font-medium",
  label: "font-ui text-xs uppercase tracking-widest text-muted font-medium",
  h1: "font-head text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-balance",
  h2: "font-head text-2xl font-semibold leading-tight tracking-tight text-balance",
  h3: "font-head text-xl font-semibold leading-tight tracking-tight text-balance",
  lede: "text-muted text-base leading-relaxed max-w-prose",
  hint: "text-muted text-base",
  card: "bg-surface border border-line rounded-xl p-4 sm:p-5 flex flex-col gap-3 min-w-0",
  sec: "mt-5 pt-4 border-t border-line flex flex-col gap-2",
  btn: "inline-flex items-center justify-center min-h-11 font-ui text-sm border border-line-strong rounded-lg px-3 py-2 text-ink hover:border-accent hover:text-accent disabled:opacity-35 disabled:cursor-default transition-colors cursor-pointer",
  btnPrimary: "inline-flex items-center justify-center min-h-11 font-ui text-sm rounded-lg px-3 py-2 bg-accent text-accent-ink border border-accent hover:opacity-90 disabled:opacity-35 cursor-pointer",
  linkBtn: "font-ui text-sm text-accent underline underline-offset-2 cursor-pointer",
  pill: "inline-block font-ui text-xs font-semibold rounded-full px-2.5 py-0.5 bg-sunk text-ink whitespace-nowrap",
  pillProved: "inline-block font-ui text-xs font-semibold rounded-full px-2.5 py-0.5 bg-proved-soft text-proved whitespace-nowrap",
  pillOpen: "inline-block font-ui text-xs font-semibold rounded-full px-2.5 py-0.5 bg-open-soft text-open whitespace-nowrap",
  pillOk: "inline-block font-ui text-xs font-semibold rounded-full px-2.5 py-0.5 bg-ok-soft text-ok whitespace-nowrap",
  pillExt: "inline-block font-ui text-xs font-semibold rounded-full px-2.5 py-0.5 bg-accent-soft text-accent whitespace-nowrap",
  note: "border-l-2 border-open bg-open-soft px-3 py-2 rounded-r-lg text-base",
  noteTrap: "border-l-2 border-proved bg-proved-soft px-3 py-2 rounded-r-lg text-base",
  noteExt: "border-l-2 border-accent bg-accent-soft/50 px-3 py-2 rounded-r-lg text-base",
  noteOk: "border-l-2 border-ok bg-ok-soft px-3 py-2 rounded-r-lg text-base",
  noteInfo: "border-l-2 border-line-strong bg-sunk px-3 py-2 rounded-r-lg text-base",
  formula: "font-mono bg-sunk rounded-lg px-3 py-2 text-sm overflow-x-auto whitespace-nowrap",
  mono: "font-mono text-sm",
  select: "study-select min-h-11 min-w-0 font-ui text-base rounded-lg border border-line-strong bg-surface text-ink pl-3 pr-10 py-2 max-w-full cursor-pointer hover:border-accent focus-visible:border-accent transition-colors",
  input: "w-full min-w-0 bg-transparent font-ui text-base text-ink placeholder:text-muted outline-none py-2",
  search: "flex flex-1 basis-60 min-w-0 items-center gap-2 bg-surface border border-line-strong rounded-lg px-2.5 text-muted focus-within:border-accent",
  /** risposte SÌ / NO / altro */
  yn: { SI: "bg-ok-soft text-ok", NO: "bg-proved-soft text-proved", ALTRO: "bg-open-soft text-open" },
  /** gettone di una classe; il colore arriva dalla variabile --c */
  chip: "font-mono font-semibold text-sm border border-(--c)/45 text-(--c) rounded-md px-1 whitespace-nowrap no-underline hover:bg-(--c)/12 cursor-pointer",
} as const;

export const classColor = (id: string) => ({ "--c": `var(--color-c-${id})` }) as React.CSSProperties;
