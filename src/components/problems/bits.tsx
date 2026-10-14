/* Piccoli pezzi condivisi da Problemi, Esercitati e Fonti (nessuno stato: vanno bene anche nei server component). */
import type { Choice } from "@/store/progressSlice";
import { ui } from "@/lib/ui";

type Tag = "span" | "p" | "div" | "li" | "td" | "h2" | "strong";

/** testo dei dati con solo marcatura (pedici, corsivi): niente link interni */
export function Html({ html, className, as: T = "span" }: { html: string; className?: string; as?: Tag }) {
  return <T className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

const SB = "font-ui text-[0.64rem] font-semibold uppercase tracking-[0.08em] px-1.5 py-px rounded whitespace-nowrap border";
export const sbClass = {
  d: `${SB} text-ok border-ok/50`,
  s: `${SB} text-c-NP border-c-NP/50`,
  a: `${SB} text-muted border-line-strong`,
  x: `${SB} text-accent border-accent border-dashed`,
  fix: `${SB} text-open border-open/50`,
} as const;

export function SourceBadge({ kind, children }: { kind: keyof typeof sbClass; children: React.ReactNode }) {
  return <span className={sbClass[kind]}>{children}</span>;
}

/** etichetta SÌ / NO / altro di una risposta */
export function YesNo({ k, children }: { k: Choice; children: React.ReactNode }) {
  return (
    <span className={`mr-1.5 whitespace-nowrap rounded-[5px] px-[7px] py-px font-mono text-[0.74rem] font-semibold ${ui.yn[k]}`}>
      {children}
    </span>
  );
}

/** classificazione del problema, nel colore della sua classe (variabile --c) */
export function LabPill({ html }: { html: string }) {
  return (
    <span
      className="inline-block rounded-full border border-(--c)/40 bg-(--c)/13 px-2.5 py-0.5 font-mono text-[0.8rem] font-semibold text-(--c)"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export const codeCls = "font-mono text-[0.72rem] text-muted";
