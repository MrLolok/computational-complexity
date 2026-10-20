/* Premessa del professore all'esame: regole generali e dimostrazioni da sapere assolutamente, abbinate ai teoremi del sito per contenuto. */

/** le regole generali della premessa, come le scrive il professore */
export const PREMISE_RULES = [
    "Bisogna conoscere tutte le definizioni formali e tutti gli enunciati dei teoremi.",
    "A volte il libro contiene più dettagli, a volte se ne trovano di più nelle slide. Bisogna conoscere l'unione di tutti i dettagli.",
    "Mi aspetto che siano conosciute tutte le dimostrazioni banali, anche se non indicate qui sotto (ad es. il contenimento di una classe deterministica nella corrispondente classe nondeterministica, la Prop. 2.1, la chiusura delle classi deterministiche rispetto al complemento, ecc.)",
];

/** le dimostrazioni da sapere assolutamente, nell'ordine della premessa: una voce può coprire più teoremi */
export const PREMISE_PROOFS: { label: string; ids: string[] }[] = [
    { label: "Teorema dello speedup multinastro", ids: ["speedup-multinastro"] },
    {
        label: "Da nondeterministico a deterministico: $\\mathrm{NTIME}(f(n)) \\subseteq \\mathrm{TIME}(k^{f(n)})$",
        ids: ["ndet-det"],
    },
    { label: "Terminazione delle MdT space-bounded", ids: ["terminazione-space"] },
    { label: "Teorema di Savitch e i suoi due corollari", ids: ["savitch", "savitch-cor", "pspace-npspace"] },
    { label: "Proposizione 8.4 (un problema completo per due classi)", ids: ["completo-per-due-classi"] },
    { label: "Teorema di Cook (SAT è NP-completo)", ids: ["cook-levin"] },
    { label: "Proposizione 9.1 (certificati succinti)", ids: ["prop-9-1"] },
    { label: "Proposizioni A–D (riduzioni, complementi e completezza)", ids: ["prop-a", "prop-b", "prop-c", "prop-d"] },
    { label: "Teorema 17.11 e il suo corollario", ids: ["t17-11", "cor-ph-pspace"] },
    { label: "Relazione tra FSAT e SAT", ids: ["fsat-sat"] },
    { label: "Teorema 10.2 ($\\mathrm{FP} = \\mathrm{FNP} \\iff \\mathrm{P} = \\mathrm{NP}$)", ids: ["fp-fnp"] },
    {
        label: "Le due proposizioni $\\mathrm{P} \\subseteq \\mathrm{BPP}$ e $\\mathrm{BPP} \\subseteq \\mathrm{PP}$",
        ids: ["bpp-inclusioni"],
    },
    { label: "Teorema 20.1 (padding)", ids: ["t20-1"] },
];

/** gli esempi di dimostrazioni banali che la premessa cita */
export const PREMISE_TRIVIAL = ["p-sub-np", "ricorsivo-re", "chiusura-det-complemento"];

const REQUIRED = new Set(PREMISE_PROOFS.flatMap((p) => p.ids));
export const isRequiredProof = (id: string) => REQUIRED.has(id);
export const REQUIRED_PROOF_COUNT = REQUIRED.size;
