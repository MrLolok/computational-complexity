import { MATH } from "./mathNotation";

const inline = (s: string) =>
    s
        .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
        .replace(/\*(.+?)\*/g, "<i>$1</i>")
        .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');

const LIST = /^(\d+\.|[-*])\s+/;

/**
 * Markdown dei testi delle tracce (paragrafi, elenchi, **grassetto**, *corsivo*, [link](url)) → HTML dei dati.
 * Le formule $…$ restano com'erano: le rende texHtml. Un solo paragrafo resta senza <p>, come gli altri testi brevi.
 */
export function mdHtml(md: string) {
    const math: string[] = [];
    const safe = md.replace(MATH, (m) => `\u0000${math.push(m) - 1}\u0000`);
    const blocks = safe.trim().split(/\n{2,}/);
    const html =
        blocks.length === 1 && !LIST.test(blocks[0])
            ? inline(blocks[0].replace(/\n/g, "<br>"))
            : blocks
                  .map((block) => {
                      const lines = block.split("\n");
                      if (!lines.every((l) => LIST.test(l))) return `<p>${inline(lines.join("<br>"))}</p>`;
                      const tag = /^\d/.test(lines[0]) ? "ol" : "ul";
                      return `<${tag}>${lines.map((l) => `<li>${inline(l.replace(LIST, ""))}</li>`).join("")}</${tag}>`;
                  })
                  .join("");
    return html.replace(/\u0000(\d+)\u0000/g, (_, i: string) => math[Number(i)]);
}
