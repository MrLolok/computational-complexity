import type { ClassId } from "@/data/classes/classes";

import MathHtml from "@/components/MathHtml";
import { nm } from "./inclusions";

/** nome di una classe nella frase: testo, o formula se ha pedici o operatori (Σ₂ᴾ, NP ∩ coNP) */
export default function ClassName({ id }: { id: ClassId }) {
    return <MathHtml html={nm(id)} />;
}
