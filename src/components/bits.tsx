/* Piccoli pezzi condivisi da Problemi, Esercitati e Fonti (nessuno stato: vanno bene anche nei server component). */
import type { ClassId } from "@/data/classes/classes";
import type { Choice } from "@/store/progressSlice";

import { nm } from "@/features/classes/inclusions";
import { texHtml } from "@/lib/tex";
import { ui } from "@/lib/tokens";

type Tag = "span" | "p" | "div" | "li" | "td" | "h2" | "strong";

/** testo dei dati con solo marcatura (pedici, corsivi, formule $…$): niente link interni; terms={false} dentro un pulsante */
export function Html({
    html,
    className,
    as: T = "span",
    terms = true,
}: {
    html: string;
    className?: string;
    as?: Tag;
    terms?: boolean;
}) {
    return <T className={className} dangerouslySetInnerHTML={{ __html: texHtml(html, terms) }} />;
}

/** nome di una classe nella frase: testo, o formula se ha pedici o operatori (Σ₂ᴾ, NP ∩ coNP) */
export const ClassName = ({ id }: { id: ClassId }) => <Html html={nm(id)} />;

const SB = "font-ui text-xs font-semibold uppercase tracking-wide px-1.5 py-px rounded-sm box-decoration-clone border";
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
export function YesNo({ k, children }: { k: Choice; children?: string }) {
    return (
        <span
            className={`mr-1.5 rounded-sm box-decoration-clone px-2 py-px font-mono text-xs font-semibold ${ui.yn[k]}`}
        >
            <Html html={children ?? ""} terms={false} />
        </span>
    );
}

/** classificazione del problema, nel colore della sua classe (variabile --c) */
export function LabPill({ html }: { html: string }) {
    return (
        <span
            className="inline-block rounded-full border border-(--c)/40 bg-(--c)/13 px-2.5 py-0.5 font-mono text-sm font-semibold text-(--c)"
            dangerouslySetInnerHTML={{ __html: texHtml(html) }}
        />
    );
}

export const codeCls = "font-mono text-xs text-muted";
