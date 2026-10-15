import katex from "katex";

import { termKey } from "./glossary";
import { MATH } from "./mathNotation";

const GREEK: Record<string, string> = { Sigma: "Σ", Pi: "Π", Delta: "Δ" };
const ENTITIES: Record<string, string> = { lt: "<", gt: ">", amp: "&", quot: '"', "#39": "'", nbsp: " " };

/** Classi e problemi dentro una formula ($\mathrm{NP}$, $\Sigma_2^{\mathrm{P}}$) aprono la stessa spiegazione del testo. */
function withTerms(expr: string) {
    return expr.replace(
        /\\(Sigma|Pi|Delta)_\{?(\d)\}?\^\{?(?:\\mathrm\{P\}|P)\}?|(?:(\d)\\text\{-\})?\\mathrm\{((?:[^{}]|\{[^{}]*\})+)\}/g,
        (m, greek?: string, n?: string, level?: string, name?: string) => {
            const plain = greek
                ? `${GREEK[greek]}${"₀₁₂₃₄₅₆₇₈₉"[Number(n)]}ᴾ`
                : `${level ? `${level}-` : ""}${name!.replace(/\\text\{([^{}]*)\}/g, "$1").replace(/\\ /g, " ")}`;
            const key = termKey(plain);
            return key ? `\\htmlData{term=${key}}{${m}}` : m;
        },
    );
}

/* le formule dei dati sono poche centinaia e si ripetono tra le pagine: si rendono una volta sola */
const cache = new Map<string, string>();

/** HTML KaTeX di una formula LaTeX; dentro un link terms = false toglie i popup, così il tocco apre il link. */
export function tex(expr: string, displayMode = false, terms = true) {
    const key = `${+displayMode}${+terms}${expr}`;
    let html = cache.get(key);
    if (html === undefined) {
        html = katex
            .renderToString(terms ? withTerms(expr) : expr, {
                displayMode,
                throwOnError: false,
                trust: (c) => c.command === "\\htmlData",
                /* \htmlData è voluto (link del glossario): niente avviso a ogni formula */
                strict: (code: string) => (code === "htmlExtension" ? "ignore" : "warn"),
            })
            .replace(/<span data-term="([^"]+)"/g, '<span data-term="$1" role="button" tabindex="0"');
        cache.set(key, html);
    }
    return html;
}

/** Rende le formule $…$ e $$…$$ di un testo HTML dei dati. */
export const texHtml = (html: string, terms = true) =>
    html.includes("$")
        ? html.replace(MATH, (_, display?: string, inline?: string) =>
              tex(
                  (display ?? inline!).replace(/&(lt|gt|amp|quot|#39|nbsp);/g, (_e, k: string) => ENTITIES[k]),
                  display !== undefined,
                  terms,
              ),
          )
        : html;
