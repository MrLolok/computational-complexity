import { tex } from "@/lib/tex";

/** Una formula LaTeX scritta nel codice: <Tex>{String.raw`\mathrm{P} \subseteq \mathrm{NP}`}</Tex>. */
export default function Tex({
    children,
    display = false,
    className,
}: {
    children: string;
    display?: boolean;
    className?: string;
}) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: tex(children, display) }} />;
}
