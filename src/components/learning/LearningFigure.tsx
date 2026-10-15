import Image from "next/image";

import { texHtml } from "@/lib/tex";

const FIGURES = {
    clique: {
        src: "/illustrations/clique.webp",
        alt: "Grafo di sei vertici: tre vertici verdi formano un triangolo, collegati a coppie, e rappresentano una clique di dimensione 3.",
        caption:
            "Una clique di 3 vertici: ogni coppia è collegata. Il certificato è l’elenco dei tre vertici; controllarne gli archi è veloce.",
    },
    savitch: {
        src: "/illustrations/savitch.webp",
        alt: "Un cammino viene diviso in due sottocammini tramite il vertice centrale verde.",
        caption:
            "Per raggiungere $y$ da $x$ in al più $2^i$ passi, cerca un punto medio $z$ e verifica $x \\to z$ e $z \\to y$ in al più $2^{i-1}$ passi. Prova i punti medi uno alla volta, riusando lo spazio.",
    },
    maggioranza: {
        src: "/illustrations/maggioranza.webp",
        alt: "Tre esecuzioni con scelte casuali producono due sì verdi e un no rosso. Il voto a maggioranza restituisce sì.",
        caption:
            "Tre esecuzioni indipendenti danno due sì e un no: il voto restituisce sì. È un possibile esito; ripetere riduce l’errore, non lo elimina.",
    },
    interferenza: {
        src: "/illustrations/interferenza.webp",
        alt: "In alto due onde concordi si sommano in un’onda più ampia; in basso due onde opposte si cancellano e producono una linea piatta.",
        caption:
            "Analogia con le onde: ampiezze concordi si rinforzano, ampiezze opposte si cancellano. Nel calcolo quantistico si sommano le ampiezze prima di ricavare le probabilità.",
    },
};
export default function LearningFigure({
    kind,
    sizes = "(width < 64rem) 90vw, 480px",
}: {
    kind: keyof typeof FIGURES;
    sizes?: string;
}) {
    const f = FIGURES[kind];
    return (
        <figure className="border-line overflow-hidden rounded-lg border">
            <Image src={f.src} width={768} height={512} sizes={sizes} alt={f.alt} className="h-auto w-full" />
            <figcaption
                className="border-line text-muted border-t p-4 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: texHtml(f.caption) }}
            />
        </figure>
    );
}
