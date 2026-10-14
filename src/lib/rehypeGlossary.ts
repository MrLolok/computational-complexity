import { glossaryParts, termKey } from "./glossary";

type Node = { type: string; tagName?: string; value?: string; properties?: Record<string, unknown>; children?: Node[] };
const textOf = (node: Node): string => node.value ?? node.children?.map(textOf).join("") ?? "";
const mark = (node: Node, key: string) => {
  node.properties = { ...node.properties, "data-term": key, tabIndex: 0, role: "button", "aria-label": `Spiega ${textOf(node)}` };
};

/** Dopo KaTeX: annota il testo e i suoi elementi visivi, lasciando intatto il MathML. */
export default function rehypeGlossary() {
  return (tree: unknown) => {
    const visit = (node: Node, math = false) => {
      if (["a", "code", "pre", "annotation", "math"].includes(node.tagName ?? "")) return;
      const classes = node.properties?.className as string[] | undefined;
      if (classes?.includes("katex-mathml")) return;
      const inMath = math || !!classes?.includes("katex");
      if (inMath && node.type === "element" && classes?.includes("mord")) {
        const plain = textOf(node).replace(/\s/g, "");
        const greek = plain.match(/^([ΣΠΔ])([1-4])P$/);
        const key = greek ? `${greek[1]}${greek[2]}` : termKey(textOf(node));
        if (key) { mark(node, key); return; }
      }
      if (!node.children) return;
      node.children = node.children.flatMap(child => {
        if (child.type === "text" && !inMath) return glossaryParts(child.value ?? "").map(part => {
          const n: Node = { type: "element", tagName: "span", children: [{ type: "text", value: part.text }] };
          if (part.key) { mark(n, part.key); return n; }
          return { type: "text", value: part.text };
        });
        visit(child, inMath);
        return child;
      });
    };
    visit(tree as Node);
  };
}
