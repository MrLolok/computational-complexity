/* Mappa delle classi della Lezione 6 (appunti §8 e §11): solo inclusioni, congetture ed esempi riportati negli appunti. */
export type MapNode = "P" | "BPP" | "NP" | "BQP" | "PP" | "PSPACE" | "EXP" | "EXP2";

export const MAP_NODES: MapNode[] = ["EXP2", "EXP", "PSPACE", "PP", "BQP", "NP", "BPP", "P"];
export const MAP_NAME: Record<MapNode, string> = {
    P: "P",
    BPP: "BPP",
    NP: "NP",
    BQP: "BQP",
    PP: "PP",
    PSPACE: "PSPACE",
    EXP: "EXP",
    EXP2: "2-EXP",
};
export const MAP_POS: Record<MapNode, [number, number]> = {
    EXP2: [215, 50],
    EXP: [215, 136],
    PSPACE: [215, 222],
    PP: [215, 308],
    BQP: [95, 404],
    NP: [335, 404],
    BPP: [95, 494],
    P: [215, 584],
};
/** a ⊆ b, dimostrate */
export const MAP_INC: [MapNode, MapNode][] = [
    ["P", "BPP"],
    ["P", "NP"],
    ["BPP", "BQP"],
    ["BQP", "PP"],
    ["NP", "PP"],
    ["PP", "PSPACE"],
    ["PSPACE", "EXP"],
    ["EXP", "EXP2"],
];
/** inclusioni strette dimostrate */
export const MAP_STRICT = new Set(["EXP>EXP2"]);
/** inclusioni che si congettura siano strette */
export const MAP_CONJ: Record<string, string> = {
    "BPP>BQP": "BPP ⊆ BQP è dimostrata; si congettura BPP ≠ BQP (domanda aperta)",
    "PP>PSPACE": "PP ⊆ PSPACE è dimostrata; si congettura PP ⊊ PSPACE",
};
/** esempi accanto alla classe, come nella figura degli appunti (una riga per elemento) */
export const MAP_EXAMPLES: Partial<Record<MapNode, string[]>> = {
    EXP2: ["ontologie OWL2:", "2-EXP-difficile"],
    PSPACE: ["QSAT, GO:", "PSPACE-completi"],
    PP: ["MAJSAT: PP-completo"],
    NP: ["SAT, KNAPSACK, TSP:", "NP-completi"],
    P: ["SORT"],
};

export type NodeInfo = {
    full: string;
    /** il significato, in una riga */
    idea: string;
    /** condizione di accettazione (tabella delle conclusioni, §11) */
    accept?: string;
    /** errore riducibile in tempo polinomiale? */
    error?: string;
    proved: string[];
    conjectured: string[];
    examples?: string;
    /** dove continuare: scheda della classe, o #ancora di una spiegazione nella stessa pagina */
    more: { href: string; label: string };
};

export const MAP_INFO: Record<MapNode, NodeInfo> = {
    P: {
        full: "Tempo polinomiale deterministico",
        idea: "Una MdT deterministica ha un solo run: la risposta giusta ha il 100% dei voti, quindi P sta sia in BPP sia in NP.",
        proved: ["$\\mathrm{P} \\subseteq \\mathrm{BPP} \\subseteq \\mathrm{BQP}$", "$\\mathrm{P} \\subseteq \\mathrm{NP} \\subseteq \\mathrm{PP}$"],
        conjectured: [],
        examples: "SORT, in tempo $O(n \\log n)$: un computer quantistico non serve.",
        more: { href: "/classi/P", label: "Scheda della classe P" },
    },
    BPP: {
        full: "Bounded-error Probabilistic Polynomial time",
        idea: "Gli algoritmi randomizzati usabili davvero: serve una maggioranza netta, e ripetendo e votando l'errore scende con poche ripetizioni.",
        accept: 'almeno 3/4 dei run dice "yes" (e almeno 3/4 dice "no" se la risposta è no); la soglia è una convenzione',
        error: "sì",
        proved: ["$\\mathrm{P} \\subseteq \\mathrm{BPP} \\subseteq \\mathrm{BQP}$", "$\\mathrm{BPP} \\subseteq \\mathrm{PP}$"],
        conjectured: ["$\\mathrm{BPP} \\neq \\mathrm{BQP}$ (domanda aperta)"],
        more: { href: "#def-bpp", label: "Spiegazione di BPP" },
    },
    NP: {
        full: "Tempo polinomiale nondeterministico",
        idea: 'Basta che almeno un run dica "yes": come se un oracolo guidasse sempre sulla strada giusta.',
        proved: ["$\\mathrm{P} \\subseteq \\mathrm{NP}$", "$\\mathrm{NP} \\subseteq \\mathrm{PP}$ (Teorema 11.3)"],
        conjectured: ["$\\mathrm{NP} \\not\\subseteq \\mathrm{BQP}$ e $\\mathrm{BQP} \\not\\subseteq \\mathrm{NP}$: NP e BQP incomparabili", "quindi nessun problema NP-completo in BQP"],
        examples: "SAT, KNAPSACK, TSP sono NP-completi. La fattorizzazione sta in NP e in BQP.",
        more: { href: "/classi/NP", label: "Scheda della classe NP" },
    },
    BQP: {
        full: "Bounded-error Quantum Polynomial time",
        idea: '"BPP con le monete quantistiche": le probabilità vengono dalle ampiezze di una QTM, misurata solo alla fine.',
        accept: "$P(\\text{yes}) \\ge 2/3$ (e $\\le 1/3$ se la risposta è no)",
        error: "sì",
        proved: ["$\\mathrm{BPP} \\subseteq \\mathrm{BQP} \\subseteq \\mathrm{PP} \\subseteq \\mathrm{PSPACE}$", "$\\mathrm{BQP} \\subsetneq 2\\text{-}\\mathrm{EXP}$"],
        conjectured: ["NP e BQP incomparabili", "$\\mathrm{BQP} \\subsetneq \\mathrm{PSPACE}$"],
        examples: "La fattorizzazione (algoritmo di Shor), che si ritiene né NP-completa né in P.",
        more: { href: "#def-bqp", label: "Spiegazione di BQP" },
    },
    PP: {
        full: "Probabilistic Polynomial time",
        idea: 'Basta la maggioranza semplice: più della metà dei run dice "yes". La maggioranza può essere di un solo run.',
        accept: 'più della metà dei run dice "yes"',
        error: "non noto: il margine può essere esponenzialmente piccolo",
        proved: ["$\\mathrm{NP} \\subseteq \\mathrm{PP} \\subseteq \\mathrm{PSPACE}$", "$\\mathrm{BQP} \\subseteq \\mathrm{PP}$"],
        conjectured: ["$\\mathrm{PP} \\subsetneq \\mathrm{PSPACE}$"],
        examples: "MAJSAT è completo per PP.",
        more: { href: "#def-pp", label: "Spiegazione di PP" },
    },
    PSPACE: {
        full: "Spazio polinomiale",
        idea: 'Una macchina deterministica esegue i run di PP uno alla volta, riusando lo spazio, e conta i "yes": così $\\mathrm{PP} \\subseteq \\mathrm{PSPACE}$, e un computer classico simula un computer quantistico in spazio polinomiale.',
        proved: ["$\\mathrm{PP} \\subseteq \\mathrm{PSPACE}$", "$\\mathrm{BQP} \\subseteq \\mathrm{PSPACE}$"],
        conjectured: ["$\\mathrm{BQP} \\subsetneq \\mathrm{PSPACE}$: nessun problema PSPACE-completo in BQP"],
        examples: "QSAT e le strategie vincenti in GO o GEOGRAPHY sono PSPACE-completi.",
        more: { href: "/classi/PSPACE", label: "Scheda della classe PSPACE" },
    },
    EXP: {
        full: "Tempo esponenziale",
        idea: "PSPACE sta in EXP, che sta strettamente dentro 2-EXP per il teorema di gerarchia del tempo (Lezione 5).",
        proved: ["$\\mathrm{PSPACE} \\subseteq \\mathrm{EXP}$", "$\\mathrm{EXP} \\subsetneq 2\\text{-}\\mathrm{EXP}$"],
        conjectured: [],
        more: { href: "/classi/EXP", label: "Scheda della classe EXP" },
    },
    EXP2: {
        full: "Tempo doppiamente esponenziale, del tipo $2^{2^{n^k}}$",
        idea: "BQP sta strettamente sotto 2-EXP: i problemi 2-EXP-completi non si risolvono in tempo polinomiale su un computer quantistico. È un risultato certo, non una congettura.",
        proved: ["$\\mathrm{BQP} \\subseteq \\mathrm{PSPACE} \\subseteq \\mathrm{EXP} \\subsetneq 2\\text{-}\\mathrm{EXP}$"],
        conjectured: [],
        examples:
            "Il ragionamento su ontologie scritte in OWL2 (Semantic Web) è almeno difficile quanto ogni problema di 2-EXP.",
        more: { href: "#bqp-risultati", label: "Dove sta BQP" },
    },
};
