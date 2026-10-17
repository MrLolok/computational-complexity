const SB = "font-ui text-xs font-medium uppercase tracking-wide px-1.5 py-px rounded-sm box-decoration-clone border";
const sbClass = {
    d: `${SB} text-ok border-ok/50`,
    s: `${SB} text-c-NP border-c-NP/50`,
    x: `${SB} text-accent border-accent border-dashed`,
    fix: `${SB} text-open border-open/50`,
} as const;

/** fonte di un'affermazione: d dispensa, s slide, x fuori dalle fonti, fix correzione */
export default function SourceBadge({ kind, children }: { kind: keyof typeof sbClass; children: React.ReactNode }) {
    return <span className={sbClass[kind]}>{children}</span>;
}
