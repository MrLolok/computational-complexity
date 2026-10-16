import type { ReductionClass } from "@/data/hierarchy/reductions";

import { deltaP, inlineMath, piP, sigmaP } from "./notation";

/* Riduzioni tra problemi completi dei piani. */
const lvl = (X: ReductionClass) => ("l" in X ? X.l : 0);
/** nome LaTeX (senza $) della classe */
export const classTex = (X: ReductionClass) =>
    X.t === "P"
        ? "\\mathrm{P}"
        : X.t === "DP"
          ? "\\mathrm{DP}"
          : X.t === "PSPACE"
            ? "\\mathrm{PSPACE}"
            : X.t === "S"
              ? sigmaP(lvl(X))
              : piP(lvl(X));

/** A completo per X si riduce a B completo per Y? → ["si" | "altro", perché (HTML con formule $…$)] */
export function reduces(X: ReductionClass, Y: ReductionClass): ["si" | "altro", string] {
    if (X.t === "P")
        return [
            "si",
            `P è contenuta in ogni classe della torre, quindi ${inlineMath(`\\mathrm{P} \\subseteq ${classTex(Y)}`)}.`,
        ];
    if (Y.t === "PSPACE")
        return [
            "si",
            `${inlineMath(`${classTex(X)} \\subseteq \\mathrm{PH} \\subseteq \\mathrm{PSPACE}`)}${X.t === "PSPACE" ? " (stessa classe)" : ""}.`,
        ];
    if (X.t === "PSPACE")
        return [
            "altro",
            Y.t === "P"
                ? "solo se $\\mathrm{P} = \\mathrm{PSPACE}$ (e allora anche $\\mathrm{PH} = \\mathrm{P}$)."
                : `solo se ${inlineMath(`\\mathrm{PSPACE} \\subseteq ${classTex(Y)}`)}, cioè ${inlineMath(`\\mathrm{PSPACE} = \\mathrm{PH} = ${classTex(Y)}`)}: PH avrebbe un problema completo (QSAT) e collasserebbe a un piano finito (corollario del Teorema 17.11).`,
        ];
    if (Y.t === "P")
        return [
            "altro",
            `solo se $\\mathrm{PH} = \\mathrm{P}$ (collasso al piano 0): ${inlineMath(classTex(X))} contiene NP o coNP, quindi ${inlineMath(`${classTex(X)} \\subseteq \\mathrm{P}`)} darebbe $\\mathrm{P} = \\mathrm{NP}$, e allora $\\mathrm{PH} = \\mathrm{P}$ (corollario del Teorema 17.9).`,
        ];
    if (X.t === "DP" && Y.t === "DP") return ["si", "stessa classe."];
    if (X.t === "DP")
        return lvl(Y) >= 2
            ? [
                  "si",
                  `${inlineMath(`\\mathrm{DP} \\subseteq \\Delta_2^{\\mathrm{P}} \\subseteq \\Sigma_2^{\\mathrm{P}} \\cap \\Pi_2^{\\mathrm{P}} \\subseteq ${classTex(Y)}`)}.`,
              ]
            : [
                  "altro",
                  `solo se $\\mathrm{NP} = \\mathrm{coNP}$, cioè PH collassa al piano 1: DP contiene ${Y.t === "S" ? "coNP" : "NP"}, quindi ${inlineMath(`\\mathrm{DP} \\subseteq ${classTex(Y)}`)} darebbe ${Y.t === "S" ? "$\\mathrm{coNP} \\subseteq \\mathrm{NP}$" : "$\\mathrm{NP} \\subseteq \\mathrm{coNP}$"}.`,
              ];
    if (Y.t === "DP")
        return lvl(X) === 1
            ? ["si", "$\\mathrm{NP} \\cup \\mathrm{coNP} \\subseteq \\mathrm{DP}$."]
            : [
                  "altro",
                  `solo se PH collassa (almeno) al piano 2: ${inlineMath(`${classTex(X)} \\subseteq \\mathrm{DP} \\subseteq \\Delta_2^{\\mathrm{P}} \\subseteq \\Sigma_2^{\\mathrm{P}} \\cap \\Pi_2^{\\mathrm{P}}`)}, e ${inlineMath(classTex(X))} contiene ${lvl(X) === 2 ? inlineMath(X.t === "S" ? sigmaP(2) : piP(2)) : `${inlineMath(sigmaP(2))} e ${inlineMath(piP(2))}`}, quindi ${inlineMath(`${sigmaP(2)} = ${piP(2)}`)}. Non si sa se scenderebbe fino al piano 1 (dispensa, es. 17.2.1).`,
              ];
    const a = lvl(X),
        b = lvl(Y);
    if (a < b)
        return [
            "si",
            `${inlineMath(`${classTex(X)} \\subseteq ${deltaP(a + 1)} \\subseteq ${sigmaP(a + 1)} \\cap ${piP(a + 1)}${a + 1 < b ? " \\subseteq \\ldots" : ""} \\subseteq ${classTex(Y)}`)}: ogni piano contiene i precedenti.`,
        ];
    if (a === b && X.t === Y.t) return ["si", "stessa classe."];
    if (a === b)
        return [
            "altro",
            `solo se ${inlineMath(`${sigmaP(a)} = ${piP(a)}`)}, cioè PH collassa al piano ${a} (Teorema 17.9). La riduzione darebbe ${inlineMath(`${classTex(X)} \\subseteq ${classTex(Y)}`)}, e passando ai complementi anche l'inclusione opposta.`,
        ];
    return [
        "altro",
        `solo se PH collassa al piano ${b}: ${inlineMath(classTex(X))} contiene sia ${inlineMath(sigmaP(b))} sia ${inlineMath(piP(b))} (perché ${inlineMath(`${classTex(X)} \\supseteq ${deltaP(b + 1)} \\supseteq ${sigmaP(b)} \\cup ${piP(b)}`)}); se fosse ${inlineMath(`${classTex(X)} \\subseteq ${classTex(Y)}`)}, anche l'altro lato del piano ${b} starebbe in ${inlineMath(classTex(Y))}, quindi ${inlineMath(`${sigmaP(b)} = ${piP(b)}`)} (Teorema 17.9).`,
    ];
}
/** nome del problema senza la parentesi sulla classe */
export const shortName = (label: string) => label.replace(/ \(.*/, "");
