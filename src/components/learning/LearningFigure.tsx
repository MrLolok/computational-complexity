import Image from "next/image";

const FIGURES = {
  clique: { src: "/illustrations/clique.webp", alt: "Grafo di sei vertici: tre vertici verdi formano un triangolo, collegati a coppie, e rappresentano una clique di dimensione 3.", caption: "Una clique di 3 vertici: ogni coppia è collegata. Il certificato è l’elenco dei tre vertici; controllarne gli archi è veloce." },
  savitch: { src: "/illustrations/savitch.webp", alt: "Un cammino viene diviso in due sottocammini tramite il vertice centrale verde.", caption: "Per raggiungere y da x in al più 2ⁱ passi, cerca un punto medio z e verifica x → z e z → y in al più 2ⁱ⁻¹ passi. Prova i punti medi uno alla volta, riusando lo spazio." },
};
export default function LearningFigure({ kind }: { kind: keyof typeof FIGURES }) {
  const f = FIGURES[kind];
  return <figure className="overflow-hidden rounded-lg border border-line"><Image src={f.src} width={768} height={512} sizes="(width < 64rem) 90vw, 480px" alt={f.alt} className="h-auto w-full" /><figcaption className="border-t border-line p-4 text-sm leading-relaxed text-muted">{f.caption}</figcaption></figure>;
}
