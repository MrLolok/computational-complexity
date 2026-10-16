import { texHtml } from "@/lib/tex";

type Tag = "span" | "p" | "div" | "li" | "td" | "h2" | "strong";

/** testo dei dati con solo marcatura (pedici, corsivi, formule $…$): niente link interni; terms={false} dentro un pulsante */
export default function MathHtml({
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
