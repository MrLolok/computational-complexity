/** Le relazioni semplici tra classi sono testo Unicode; le formule composte restano a KaTeX. */
export function readableMath(markdown: string) {
  return markdown.replace(/(?<!\$)\$([^$\n]+)\$(?!\$)/g, (original, expression: string) => {
    if (!/\\(?:mathrm|Sigma|Pi|Delta)/.test(expression)) return original;
    let plain = expression;
    for (let i = 0; i < 3; i++) plain = plain.replace(/\\(?:mathrm|text)\{([^{}]*)\}/g, "$1");
    plain = plain.replace(/\\Sigma/g, "Σ").replace(/\\Pi/g, "Π").replace(/\\Delta/g, "Δ")
      .replace(/\^\{?P\}?/g, "ᴾ")
      .replace(/_\{?([0-9i])\}?/g, (_, n: string) => n === "i" ? "ᵢ" : "₀₁₂₃₄₅₆₇₈₉"[Number(n)])
      .replace(/\\(subsetneq|subseteq|supsetneq|supseteq|neq|notin|in|cup|cap|iff|implies)\b/g, (_, cmd: string) => ({ subsetneq: "⊊", subseteq: "⊆", supsetneq: "⊋", supseteq: "⊇", neq: "≠", notin: "∉", in: "∈", cup: "∪", cap: "∩", iff: "⇔", implies: "⇒" })[cmd] ?? cmd)
      .replace(/\\ /g, " ");
    if (/[\\{}^_]/.test(plain)) return original;
    return plain;
  });
}
