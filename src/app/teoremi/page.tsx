import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import TheoremsView from "@/components/theorems/TheoremsView";

export const metadata: Metadata = { title: "Teoremi" };

/* una spiegazione in Markdown per teorema, spiegazioni/teoremi/NN-id.md: la pagina è statica, i file si leggono alla build */
const DIR = join(process.cwd(), "spiegazioni/teoremi");
const EXPLANATIONS = Object.fromEntries(
  readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => [f.slice(3, -3), readFileSync(join(DIR, f), "utf8")]),
);

export default function Page() {
  return <TheoremsView explanations={EXPLANATIONS} />;
}
