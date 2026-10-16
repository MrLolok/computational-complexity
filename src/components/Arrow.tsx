import { ARROW_CLASS, ARROWS } from "@/lib/tokens";

/** freccia in linea col testo; decorativa, il significato sta nell'etichetta accanto */
export default function Arrow({
    shape = "right",
    className = "",
}: {
    shape?: keyof typeof ARROWS;
    className?: string;
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${ARROW_CLASS} ${className}`}
        >
            <path d={ARROWS[shape]} />
        </svg>
    );
}
