import type { RClass } from "@/data/hierarchy/reductions";

import { hD, hPi, hS, m } from "./notation";

/* Riduzioni tra problemi completi dei piani. */
const lvl = (X: RClass) => ("l" in X ? X.l : 0);
/** nome LaTeX (senza $) della classe */
export const cN = (X: RClass) =>
    X.t === "P"
        ? "\\mathrm{P}"
        : X.t === "DP"
          ? "\\mathrm{DP}"
          : X.t === "PSPACE"
            ? "\\mathrm{PSPACE}"
            : X.t === "S"
              ? hS(lvl(X))
              : hPi(lvl(X));

/** A completo per X si riduce a B completo per Y? → ["si" | "altro", perché (HTML con formule $…$)] */
export function rSub(X: RClass, Y: RClass): ["si" | "altro", string] {
    if (X.t === "P")
        return ["si", `P è contenuta in ogni classe della torre, quindi ${m(`\\mathrm{P} \\subseteq ${cN(Y)}`)}.`];
    if (Y.t === "PSPACE")
        return [
            "si",
            `${m(`${cN(X)} \\subseteq \\mathrm{PH} \\subseteq \\mathrm{PSPACE}`)}${X.t === "PSPACE" ? " (stessa classe)" : ""}.`,
        ];
    if (X.t === "PSPACE")
        return [
            "altro",
            Y.t === "P"
                ? "solo se $\\mathrm{P} = \\mathrm{PSPACE}$ (e allora anche $\\mathrm{PH} = \\mathrm{P}$)."
                : `solo se ${m(`\\mathrm{PSPACE} \\subseteq ${cN(Y)}`)}, cioè ${m(`\\mathrm{PSPACE} = \\mathrm{PH} = ${cN(Y)}`)}: PH avrebbe un problema completo (QSAT) e collasserebbe a un piano finito (corollario del Teorema 17.11).`,
        ];
    if (Y.t === "P")
        return [
            "altro",
            `solo se $\\mathrm{PH} = \\mathrm{P}$ (collasso al piano 0): ${m(cN(X))} contiene NP o coNP, quindi ${m(`${cN(X)} \\subseteq \\mathrm{P}`)} darebbe $\\mathrm{P} = \\mathrm{NP}$, e allora $\\mathrm{PH} = \\mathrm{P}$ (corollario del Teorema 17.9).`,
        ];
    if (X.t === "DP" && Y.t === "DP") return ["si", "stessa classe."];
    if (X.t === "DP")
        return lvl(Y) >= 2
            ? [
                  "si",
                  `${m(`\\mathrm{DP} \\subseteq \\Delta_2^{\\mathrm{P}} \\subseteq \\Sigma_2^{\\mathrm{P}} \\cap \\Pi_2^{\\mathrm{P}} \\subseteq ${cN(Y)}`)}.`,
              ]
            : [
                  "altro",
                  `solo se $\\mathrm{NP} = \\mathrm{coNP}$, cioè PH collassa al piano 1: DP contiene ${Y.t === "S" ? "coNP" : "NP"}, quindi ${m(`\\mathrm{DP} \\subseteq ${cN(Y)}`)} darebbe ${Y.t === "S" ? "$\\mathrm{coNP} \\subseteq \\mathrm{NP}$" : "$\\mathrm{NP} \\subseteq \\mathrm{coNP}$"}.`,
              ];
    if (Y.t === "DP")
        return lvl(X) === 1
            ? ["si", "$\\mathrm{NP} \\cup \\mathrm{coNP} \\subseteq \\mathrm{DP}$."]
            : [
                  "altro",
                  `solo se PH collassa (almeno) al piano 2: ${m(`${cN(X)} \\subseteq \\mathrm{DP} \\subseteq \\Delta_2^{\\mathrm{P}} \\subseteq \\Sigma_2^{\\mathrm{P}} \\cap \\Pi_2^{\\mathrm{P}}`)}, e ${m(cN(X))} contiene ${lvl(X) === 2 ? m(X.t === "S" ? hS(2) : hPi(2)) : `${m(hS(2))} e ${m(hPi(2))}`}, quindi ${m(`${hS(2)} = ${hPi(2)}`)}. Non si sa se scenderebbe fino al piano 1 (dispensa, es. 17.2.1).`,
              ];
    const a = lvl(X),
        b = lvl(Y);
    if (a < b)
        return [
            "si",
            `${m(`${cN(X)} \\subseteq ${hD(a + 1)} \\subseteq ${hS(a + 1)} \\cap ${hPi(a + 1)}${a + 1 < b ? " \\subseteq \\ldots" : ""} \\subseteq ${cN(Y)}`)}: ogni piano contiene i precedenti.`,
        ];
    if (a === b && X.t === Y.t) return ["si", "stessa classe."];
    if (a === b)
        return [
            "altro",
            `solo se ${m(`${hS(a)} = ${hPi(a)}`)}, cioè PH collassa al piano ${a} (Teorema 17.9). La riduzione darebbe ${m(`${cN(X)} \\subseteq ${cN(Y)}`)}, e passando ai complementi anche l'inclusione opposta.`,
        ];
    return [
        "altro",
        `solo se PH collassa al piano ${b}: ${m(cN(X))} contiene sia ${m(hS(b))} sia ${m(hPi(b))} (perché ${m(`${cN(X)} \\supseteq ${hD(b + 1)} \\supseteq ${hS(b)} \\cup ${hPi(b)}`)}); se fosse ${m(`${cN(X)} \\subseteq ${cN(Y)}`)}, anche l'altro lato del piano ${b} starebbe in ${m(cN(Y))}, quindi ${m(`${hS(b)} = ${hPi(b)}`)} (Teorema 17.9).`,
    ];
}
/** nome del problema senza la parentesi sulla classe */
export const shortName = (label: string) => label.replace(/ \(.*/, "");
