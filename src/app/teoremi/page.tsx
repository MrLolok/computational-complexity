import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";

import { TRACES } from "@/data/traces/traces";
import TheoremsView from "@/features/theorems/TheoremsView";
import { plainMath } from "@/lib/mathNotation";

export const metadata: Metadata = { title: "Teoremi" };

/* una spiegazione in Markdown per teorema, spiegazioni/teoremi/NN-id.md: la pagina è statica, i file si leggono alla build.
   La lettura sta in Page e non nel modulo: in dev Page gira a ogni richiesta, e una modifica ai file si vede ricaricando */
const DIR = join(process.cwd(), "spiegazioni/teoremi");
/* solo i titoli delle tracce: così i dati delle tracce non finiscono nel bundle del browser */
const TRACE_TITLES = Object.fromEntries(TRACES.map((t) => [t.code, plainMath(t.title)]));

export default function Page() {
    const explanations = Object.fromEntries(
        readdirSync(DIR)
            .filter((f) => f.endsWith(".md"))
            .map((f) => [f.slice(3, -3), readFileSync(join(DIR, f), "utf8")]),
    );
    return <TheoremsView explanations={explanations} traceTitles={TRACE_TITLES} />;
}
