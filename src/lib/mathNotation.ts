/* $$…$$ (formula centrale) oppure $…$ (formula nel testo); un \$ resta un dollaro */
export const MATH = /(?<!\\)\$\$([\s\S]+?)\$\$|(?<![\\$])\$(?!\$)([^$\n]+?)(?<!\\)\$/g;

const SUB: Record<string, string> = {
    0: "₀",
    1: "₁",
    2: "₂",
    3: "₃",
    4: "₄",
    5: "₅",
    6: "₆",
    7: "₇",
    8: "₈",
    9: "₉",
    i: "ᵢ",
    "+": "₊",
    "-": "₋",
};
const SUP: Record<string, string> = {
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
    n: "ⁿ",
    k: "ᵏ",
    i: "ⁱ",
    P: "ᴾ",
    "+": "⁺",
    "-": "⁻",
};
const SYMBOLS: Record<string, string> = {
    subsetneq: "⊊",
    subseteq: "⊆",
    subset: "⊂",
    supsetneq: "⊋",
    supseteq: "⊇",
    neq: "≠",
    ne: "≠",
    notin: "∉",
    in: "∈",
    cup: "∪",
    cap: "∩",
    iff: "⇔",
    implies: "⇒",
    Rightarrow: "⇒",
    Leftrightarrow: "⇔",
    to: "→",
    rightarrow: "→",
    leftarrow: "←",
    le: "≤",
    leq: "≤",
    ge: "≥",
    geq: "≥",
    lnot: "¬",
    neg: "¬",
    land: "∧",
    wedge: "∧",
    lor: "∨",
    vee: "∨",
    exists: "∃",
    forall: "∀",
    times: "×",
    cdot: "·",
    ldots: "…",
    dots: "…",
    emptyset: "∅",
    varnothing: "∅",
    infty: "∞",
    log: "log",
    lt: "<",
    gt: ">",
    nearrow: "↗",
    mid: "|",
    varphi: "φ",
    phi: "φ",
    psi: "ψ",
    delta: "δ",
    epsilon: "ε",
    varepsilon: "ε",
    ell: "ℓ",
    sqrt: "√",
    lceil: "⌈",
    rceil: "⌉",
    lfloor: "⌊",
    rfloor: "⌋",
    prime: "′",
    oplus: "⊕",
    bigcup: "⋃",
    circ: "∘",
    leadsto: "⇝",
    sum: "∑",
    mapsto: "↦",
    triangleright: "▷",
    sqcup: "⊔",
    setminus: "∖",
    bmod: "mod",
    pmod: "mod",
    Sigma: "Σ",
    Pi: "Π",
    Delta: "Δ",
    sigma: "σ",
    alpha: "α",
    beta: "β",
    gamma: "γ",
    theta: "θ",
    lambda: "λ",
    langle: "⟨",
    rangle: "⟩",
    ",": " ",
    ";": " ",
    " ": " ",
    quad: " ",
};
const script = (s: string, map: Record<string, string>, mark: string) =>
    [...s].every((c) => map[c]) ? [...s].map((c) => map[c]).join("") : `${mark}${s.length > 1 ? `(${s})` : s}`;

/** Una formula LaTeX scritta come testo semplice (per ricerche, popup e attributi). */
export function texPlain(expr: string) {
    let s = expr;
    for (let i = 0; i < 3; i++)
        s = s.replace(/\\(?:mathrm|text|mathit|mathbf|mathsf|mathcal|operatorname)\{([^{}]*)\}/g, "$1");
    s = s
        .replace(/\\(?:left|right|big|Big|displaystyle)\b/g, "")
        .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2")
        .replace(/\\(?:overline|bar)\{([^{}]*)\}|\\bar\s*([A-Za-z])/g, (_, a?: string, b?: string) => `${a ?? b}\u0304`)
        .replace(/\\not\s*\\(subseteq|in)\b/g, (_, c: string) => (c === "in" ? "∉" : "⊈"))
        .replace(/\\([A-Za-z]+|[,; ])/g, (m, c: string) => SYMBOLS[c] ?? (/^[{}]$/.test(c) ? c : m.slice(1)))
        .replace(/\\([{}$%&_#|])/g, "$1")
        .replace(/_\{([^{}]*)\}|_(.)/g, (_, a?: string, b?: string) => script(a ?? b!, SUB, "_"))
        .replace(/\^\{([^{}]*)\}|\^(.)/g, (_, a?: string, b?: string) => script(a ?? b!, SUP, "^"))
        .replace(/[{}]/g, "")
        .replace(/\s+/g, " ");
    return s.trim();
}

/** Toglie i delimitatori $ da un testo, lasciando le formule come testo semplice. */
export const plainMath = (text: string) =>
    text.includes("$")
        ? text.replace(MATH, (_, display?: string, inline?: string) => texPlain(display ?? inline!))
        : text;
