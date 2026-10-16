/* Dati della scheda "Piani di PH": la torre dei piani, le ipotesi di collasso, le QBF d'esempio e le riduzioni tra problemi dei piani. */
import type { ClassId } from "@/data/classes/classes";

export const TOWER_IDS = [
    "L0",
    "S1",
    "P1",
    "DP",
    "D2",
    "S2",
    "P2",
    "D3",
    "S3",
    "P3",
    "D4",
    "S4",
    "P4",
    "PH",
    "PSPACE",
] as const;
export type TowerId = (typeof TOWER_IDS)[number];
export const DEFAULT_TOWER: TowerId = "S2";
export const isTowerId = (s: string): s is TowerId => (TOWER_IDS as readonly string[]).includes(s);

export type TowerNode = {
    lv?: number;
    k?: "S" | "Pi" | "D";
    x: number;
    y: number;
    /** etichetta del nodo (Σ₂ᴾ…) */
    lab: string;
    /** riga piccola sotto l'etichetta; "^" introduce un esponente */
    sub: string;
    /** classe che dà il colore */
    c: ClassId;
    /** scheda della classe da aprire */
    map?: ClassId;
};

export const TW: Record<TowerId, TowerNode> = {
    L0: { x: 260, y: 790, lab: "P", sub: "Δ₀ᴾ = Σ₀ᴾ = Π₀ᴾ", c: "P", map: "P" },
    S1: { lv: 1, k: "S", x: 130, y: 700, lab: "NP", sub: "Σ₁ᴾ", c: "NP", map: "NP" },
    P1: { lv: 1, k: "Pi", x: 390, y: 700, lab: "coNP", sub: "Π₁ᴾ", c: "coNP", map: "coNP" },
    DP: { x: 260, y: 630, lab: "DP", sub: "tra piano 1 e 2", c: "DP", map: "DP" },
    D2: { lv: 2, k: "D", x: 260, y: 560, lab: "Δ₂ᴾ", sub: "P^NP", c: "DELTA2", map: "DELTA2" },
    S2: { lv: 2, k: "S", x: 130, y: 490, lab: "Σ₂ᴾ", sub: "NP^NP", c: "SIGMA2", map: "SIGMA2" },
    P2: { lv: 2, k: "Pi", x: 390, y: 490, lab: "Π₂ᴾ", sub: "coNP^NP", c: "PI2", map: "PI2" },
    D3: { lv: 3, k: "D", x: 260, y: 420, lab: "Δ₃ᴾ", sub: "P^Σ₂ᴾ", c: "DELTA2" },
    S3: { lv: 3, k: "S", x: 130, y: 350, lab: "Σ₃ᴾ", sub: "NP^Σ₂ᴾ", c: "SIGMAi", map: "SIGMAi" },
    P3: { lv: 3, k: "Pi", x: 390, y: 350, lab: "Π₃ᴾ", sub: "coNP^Σ₂ᴾ", c: "PIi", map: "PIi" },
    D4: { lv: 4, k: "D", x: 260, y: 280, lab: "Δ₄ᴾ", sub: "P^Σ₃ᴾ", c: "DELTA2" },
    S4: { lv: 4, k: "S", x: 130, y: 210, lab: "Σ₄ᴾ", sub: "NP^Σ₃ᴾ", c: "SIGMAi", map: "SIGMAi" },
    P4: { lv: 4, k: "Pi", x: 390, y: 210, lab: "Π₄ᴾ", sub: "coNP^Σ₃ᴾ", c: "PIi", map: "PIi" },
    PH: { x: 260, y: 110, lab: "PH", sub: "unione dei piani", c: "PH", map: "PH" },
    PSPACE: { x: 260, y: 36, lab: "PSPACE", sub: "QSAT completo", c: "PSPACE", map: "PSPACE" },
};

/** inclusioni della torre, dal basso verso l'alto */
export const TE: [TowerId, TowerId][] = [
    ["L0", "S1"],
    ["L0", "P1"],
    ["S1", "DP"],
    ["P1", "DP"],
    ["DP", "D2"],
    ["D2", "S2"],
    ["D2", "P2"],
    ["S2", "D3"],
    ["P2", "D3"],
    ["D3", "S3"],
    ["D3", "P3"],
    ["S3", "D4"],
    ["P3", "D4"],
    ["D4", "S4"],
    ["D4", "P4"],
    ["S4", "PH"],
    ["P4", "PH"],
    ["PH", "PSPACE"],
];

/** nodo della torre per ogni classe della mappa (per i link /piani#<nodo>) */
export const TOWER_OF: Partial<Record<ClassId, TowerId>> = {
    P: "L0",
    NP: "S1",
    coNP: "P1",
    DP: "DP",
    DELTA2: "D2",
    SIGMA2: "S2",
    PI2: "P2",
    SIGMAi: "S3",
    PIi: "P3",
    PH: "PH",
    PSPACE: "PSPACE",
};

/** fasce dei piani: [piano, y iniziale, y finale] */
export const BANDS: [number, number, number][] = [
    [0, 760, 820],
    [1, 672, 728],
    [2, 462, 588],
    [3, 322, 448],
    [4, 182, 308],
];

export type Hypothesis = { id: string; label: string; merged: TowerId[]; tag: string; note: string };
export const HYP: Hypothesis[] = [
    { id: "none", label: "Nessuna ipotesi: com'è oggi", merged: [], tag: "", note: "" },
    {
        id: "PNP",
        label: "P = NP",
        merged: ["L0", "S1", "P1", "DP", "D2", "S2", "P2", "D3", "S3", "P3", "D4", "S4", "P4", "PH"],
        tag: "tutto = P = PH",
        note: "$\\mathrm{P} = \\mathrm{NP}$ implica $\\mathrm{NP} = \\mathrm{coNP}$, quindi PH collassa al primo piano; e il primo piano è P stesso: $\\mathrm{PH} = \\mathrm{P}$ (corollario del Teorema 17.9).",
    },
    {
        id: "S1",
        label: "NP = coNP (Σ₁ᴾ = Π₁ᴾ)",
        merged: ["S1", "P1", "DP", "D2", "S2", "P2", "D3", "S3", "P3", "D4", "S4", "P4", "PH"],
        tag: "tutto = NP = PH",
        note: "Teorema 17.9 con $i = 1$: tutti i piani sopra il primo coincidono con NP. Anche DP crolla su NP, perché $\\mathrm{NP} \\subseteq \\mathrm{DP} \\subseteq \\Delta_2^{\\mathrm{P}} = \\mathrm{NP}$. P resta fuori: $\\mathrm{P} = \\mathrm{NP}$ rimane aperto.",
    },
    {
        id: "S2",
        label: "Σ₂ᴾ = Π₂ᴾ",
        merged: ["S2", "P2", "D3", "S3", "P3", "D4", "S4", "P4", "PH"],
        tag: "tutto = Σ₂ᴾ = PH",
        note: "Teorema 17.9 con $i = 2$: per ogni $j \\gt 2$, $\\Sigma_j^{\\mathrm{P}} = \\Pi_j^{\\mathrm{P}} = \\Delta_j^{\\mathrm{P}} = \\Sigma_2^{\\mathrm{P}}$. I piani 0 e 1, DP e $\\Delta_2^{\\mathrm{P}}$ restano dove sono.",
    },
    {
        id: "S3",
        label: "Σ₃ᴾ = Π₃ᴾ",
        merged: ["S3", "P3", "D4", "S4", "P4", "PH"],
        tag: "tutto = Σ₃ᴾ = PH",
        note: "Teorema 17.9 con $i = 3$: la torre smette di crescere al piano 3.",
    },
    {
        id: "S4",
        label: "Σ₄ᴾ = Π₄ᴾ",
        merged: ["S4", "P4", "PH"],
        tag: "tutto = Σ₄ᴾ = PH",
        note: "Teorema 17.9 con $i = 4$.",
    },
    {
        id: "PHC",
        label: "Esiste un problema PH-completo",
        merged: ["PH"],
        tag: "= Σₖᴾ per un k finito",
        note: "Teorema 17.11: il problema sta in qualche piano $\\Sigma_k^{\\mathrm{P}}$, e ogni problema di $\\Sigma_{k+1}^{\\mathrm{P}}$ si riduce a lui; i piani sono chiusi per riduzioni, quindi $\\Sigma_{k+1}^{\\mathrm{P}} = \\Sigma_k^{\\mathrm{P}}$ e PH collassa al piano $k$. Quale $k$ sia non si sa.",
    },
    {
        id: "PHPS",
        label: "PH = PSPACE",
        merged: ["PH", "PSPACE"],
        tag: "PH = PSPACE = Σₖᴾ",
        note: "Corollario del Teorema 17.11: PSPACE ha problemi completi (QSAT), quindi anche PH ne avrebbe uno e collasserebbe a un piano finito. Per questo si pensa che $\\mathrm{PH} \\neq \\mathrm{PSPACE}$.",
    },
];

/** esempio di QBF per ogni nodo Σ/Π della torre */
export const QEX: Partial<Record<TowerId, { f: string; w: string }>> = {
    S1: {
        f: "$\\exists p\\ \\exists q.\\ (p \\lor q) \\land \\neg p$",
        w: "vera: con $p$ falsa e $q$ vera la formula vale vero (appunti Lez. 9 §3).",
    },
    P1: {
        f: "$\\forall p\\ \\forall q.\\ \\neg p \\lor p \\lor q$",
        w: "vera: $\\neg p \\lor p \\lor q$ è valida, cioè vera con ogni valore di $p$ e $q$ (slide Lez. 9, QBF).",
    },
    S2: {
        f: "$\\exists p\\ \\forall q.\\ p \\lor q$",
        w: "vera: si sceglie $p$ vera, e allora $p \\lor q$ è vera per ogni $q$.",
    },
    P2: {
        f: "$\\forall p\\ \\exists q.\\ \\neg p \\lor q$",
        w: "vera: qualunque sia $p$, basta prendere $q$ vera (slide Lez. 9).",
    },
    S3: {
        f: "$\\exists p\\ \\forall q\\ \\exists r.\\ p \\land (q \\lor r) \\land (\\neg q \\lor \\neg r)$",
        w: "vera: si sceglie $p$ vera e, per ogni $q$, si prende $r$ opposta a $q$ (appunti Lez. 9 §3).",
    },
    P3: {
        f: "$\\forall p\\ \\exists q\\ \\forall r.\\ (p \\lor q \\lor r) \\land (\\neg p \\lor \\neg q \\lor r)$",
        w: "vera: per ogni $p$ si sceglie $q$ opposta a $p$, e allora le due clausole sono vere per ogni $r$ (appunti Lez. 9 §3).",
    },
    S4: {
        f: "$\\exists \\vec{p}_1\\ \\forall \\vec{p}_2\\ \\exists \\vec{p}_3\\ \\forall \\vec{p}_4.\\ \\varphi$",
        w: "un'istanza di $\\mathrm{QSAT}_4$: quattro blocchi di variabili, il primo con $\\exists$.",
    },
    P4: {
        f: "$\\forall \\vec{p}_1\\ \\exists \\vec{p}_2\\ \\forall \\vec{p}_3\\ \\exists \\vec{p}_4.\\ \\varphi$",
        w: "un'istanza di $\\mathrm{co\\text{-}QSAT}_4$: quattro blocchi, il primo con $\\forall$.",
    },
};

/** problemi completi per piano: [lato Σ, lato Π] */
export const QCOMP: Record<number, [string, string]> = {
    1: [
        "$\\mathrm{SAT} = \\mathrm{QSAT}_1$, CLIQUE, TSP(D), 3-COLORING e gli altri NP-completi",
        "VALIDITY, $\\mathrm{co\\text{-}SAT} = \\mathrm{co\\text{-}QSAT}_1$, i complementi di HAMILTON PATH e TSP(D)",
    ],
    2: [
        "$\\mathrm{QSAT}_2$, CIRC SAT, STRATEGIC COMPANIES",
        "$\\mathrm{co\\text{-}QSAT}_2$, CIRC VALIDITY, il complemento di STRATEGIC COMPANIES",
    ],
    3: ["$\\mathrm{QSAT}_3$", "$\\mathrm{co\\text{-}QSAT}_3$"],
    4: ["$\\mathrm{QSAT}_4$", "$\\mathrm{co\\text{-}QSAT}_4$"],
};

export type Quant = "∃" | "∀";
export type Qbf = { f: string; q: Quant[]; v: string[]; ev: (a: boolean[]) => boolean; src: string };
/** QBF da valutare con l'albero (∃ = OR, ∀ = AND) */
export const QBF: Qbf[] = [
    {
        f: "$\\exists p\\ \\exists q.\\ (p \\lor q) \\land \\neg p$",
        q: ["∃", "∃"],
        v: ["p", "q"],
        ev: (a) => (a[0] || a[1]) && !a[0],
        src: "appunti Lez. 9 §3",
    },
    {
        f: "$\\forall p\\ \\forall q.\\ p \\lor q$",
        q: ["∀", "∀"],
        v: ["p", "q"],
        ev: (a) => a[0] || a[1],
        src: "slide Lez. 9 (QBF false)",
    },
    {
        f: "$\\exists p\\ \\forall q.\\ p \\lor q$",
        q: ["∃", "∀"],
        v: ["p", "q"],
        ev: (a) => a[0] || a[1],
        src: "appunti Lez. 9 §3",
    },
    {
        f: "$\\forall p\\ \\exists q.\\ \\neg p \\lor q$",
        q: ["∀", "∃"],
        v: ["p", "q"],
        ev: (a) => !a[0] || a[1],
        src: "slide Lez. 9 (QBF vere)",
    },
    {
        f: "$\\forall p\\ \\exists q.\\ \\neg p \\lor (q \\land \\neg q)$",
        q: ["∀", "∃"],
        v: ["p", "q"],
        ev: (a) => !a[0] || (a[1] && !a[1]),
        src: "slide Lez. 9 (QBF false)",
    },
    {
        f: "$\\exists p\\ \\forall q\\ \\exists r.\\ p \\land (q \\lor r) \\land (\\neg q \\lor \\neg r)$",
        q: ["∃", "∀", "∃"],
        v: ["p", "q", "r"],
        ev: (a) => a[0] && (a[1] || a[2]) && (!a[1] || !a[2]),
        src: "appunti Lez. 9 §3",
    },
    {
        f: "$\\forall p\\ \\exists q\\ \\forall r.\\ (p \\lor q \\lor r) \\land (\\neg p \\lor \\neg q \\lor r)$",
        q: ["∀", "∃", "∀"],
        v: ["p", "q", "r"],
        ev: (a) => (a[0] || a[1] || a[2]) && (!a[0] || !a[1] || a[2]),
        src: "appunti Lez. 9 §3",
    },
];
export const QBF_DEFAULT = 2;

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
