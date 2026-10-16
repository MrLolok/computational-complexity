/* Riduzioni tra problemi completi dei piani di PH. */
/** classe di cui un problema è completo */
export type RClass = { t: "P" | "DP" | "PSPACE" } | { t: "S" | "Pi"; l: number };
export type RProblem = { id: string; label: string; cls: RClass };
export const RP: RProblem[] = [
    { id: "MAXFLOW", label: "MAX FLOW (P-completo)", cls: { t: "P" } },
    { id: "SAT", label: "$\\mathrm{SAT} = \\mathrm{QSAT}_1$ (NP-completo)", cls: { t: "S", l: 1 } },
    { id: "CLIQUE", label: "CLIQUE (NP-completo)", cls: { t: "S", l: 1 } },
    {
        id: "COSAT",
        label: "$\\mathrm{co\\text{-}SAT} = \\mathrm{co\\text{-}QSAT}_1$ (coNP-completo)",
        cls: { t: "Pi", l: 1 },
    },
    { id: "VALIDITY", label: "VALIDITY (coNP-completo)", cls: { t: "Pi", l: 1 } },
    { id: "SATUNSAT", label: "SAT-UNSAT (DP-completo)", cls: { t: "DP" } },
    { id: "QSAT2", label: "$\\mathrm{QSAT}_2$ ($\\Sigma_2^{\\mathrm{P}}$-completo)", cls: { t: "S", l: 2 } },
    { id: "CIRCSAT", label: "CIRC SAT ($\\Sigma_2^{\\mathrm{P}}$-completo)", cls: { t: "S", l: 2 } },
    { id: "COQSAT2", label: "$\\mathrm{co\\text{-}QSAT}_2$ ($\\Pi_2^{\\mathrm{P}}$-completo)", cls: { t: "Pi", l: 2 } },
    { id: "CIRCVAL", label: "CIRC VALIDITY ($\\Pi_2^{\\mathrm{P}}$-completo)", cls: { t: "Pi", l: 2 } },
    { id: "QSAT3", label: "$\\mathrm{QSAT}_3$ ($\\Sigma_3^{\\mathrm{P}}$-completo)", cls: { t: "S", l: 3 } },
    { id: "COQSAT3", label: "$\\mathrm{co\\text{-}QSAT}_3$ ($\\Pi_3^{\\mathrm{P}}$-completo)", cls: { t: "Pi", l: 3 } },
    { id: "QSAT4", label: "$\\mathrm{QSAT}_4$ ($\\Sigma_4^{\\mathrm{P}}$-completo)", cls: { t: "S", l: 4 } },
    { id: "COQSAT4", label: "$\\mathrm{co\\text{-}QSAT}_4$ ($\\Pi_4^{\\mathrm{P}}$-completo)", cls: { t: "Pi", l: 4 } },
    { id: "QSAT5", label: "$\\mathrm{QSAT}_5$ ($\\Sigma_5^{\\mathrm{P}}$-completo)", cls: { t: "S", l: 5 } },
    { id: "COQSAT5", label: "$\\mathrm{co\\text{-}QSAT}_5$ ($\\Pi_5^{\\mathrm{P}}$-completo)", cls: { t: "Pi", l: 5 } },
    { id: "QSAT", label: "QSAT (PSPACE-completo)", cls: { t: "PSPACE" } },
];
export const RP_DEFAULT: [string, string] = ["QSAT4", "QSAT2"];

/** esercizi della dispensa (cap. 17.2.1): [da, a] */
export const RQUICK: [string, string][] = [
    ["QSAT2", "QSAT4"],
    ["QSAT4", "QSAT2"],
    ["QSAT3", "COQSAT3"],
    ["CLIQUE", "SAT"],
    ["CLIQUE", "QSAT2"],
    ["QSAT2", "CLIQUE"],
    ["CLIQUE", "COSAT"],
    ["CLIQUE", "COQSAT2"],
    ["COQSAT2", "CLIQUE"],
    ["SATUNSAT", "QSAT3"],
    ["QSAT3", "SATUNSAT"],
    ["SATUNSAT", "COQSAT3"],
    ["COQSAT3", "SATUNSAT"],
];
