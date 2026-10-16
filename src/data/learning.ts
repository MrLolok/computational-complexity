/** Sintesi allineate alla Lezione 6 degli appunti (tabella delle conclusioni, §11) e alle domande delle tracce. */
export const RANDOM_CLASSES = [
    {
        id: "BPP",
        name: "BPP",
        brief: "Maggioranza netta, errore riducibile",
        definition:
            "Tempo polinomiale, run equiprobabili: almeno 3/4 dei run dà la risposta giusta (soglia convenzionale). Ripetendo e votando a maggioranza l'errore scende sotto qualunque soglia con poche ripetizioni. $\\mathrm{P} \\subseteq \\mathrm{BPP} \\subseteq \\mathrm{BQP}$; $\\mathrm{BPP} \\subseteq \\mathrm{PP}$.",
    },
    {
        id: "PP",
        name: "PP",
        brief: "Basta la maggioranza semplice",
        definition:
            'Tempo polinomiale: si accetta se più della metà dei run dice "yes". La maggioranza può essere di un solo run, quindi non si sa ridurre l\'errore in tempo polinomiale. $\\mathrm{NP} \\subseteq \\mathrm{PP} \\subseteq \\mathrm{PSPACE}$; MAJSAT è completo.',
    },
] as const;
export const QUANTUM_CLASSES = [
    {
        id: "BQP",
        name: "BQP",
        brief: "BPP con le monete quantistiche",
        definition:
            "Una QTM in tempo polinomiale risponde giusto con probabilità almeno 2/3 su ogni input. $\\mathrm{BPP} \\subseteq \\mathrm{BQP} \\subseteq \\mathrm{PP} \\subseteq \\mathrm{PSPACE}$ e $\\mathrm{BQP} \\subsetneq 2\\text{-}\\mathrm{EXP}$; si congettura che NP e BQP siano incomparabili.",
    },
] as const;
export const SPECIAL_TERMS = [
    {
        id: "qtm",
        name: "Macchina di Turing quantistica",
        aliases: [
            "MdT quantistica",
            "macchina di Turing quantistica",
            "algoritmo quantistico",
            "calcolatore quantistico",
        ],
        definition:
            "Una MdT probabilistica in cui ogni ramo ha un'ampiezza: le ampiezze si sommano e possono cancellarsi. La risposta si legge solo alla fine, misurando. È il modello della classe BQP.",
        href: "/classi#quantistiche",
    },
    {
        id: "grover",
        name: "Algoritmo di Grover",
        aliases: ["Grover"],
        definition:
            "Cerca in una lista non ordinata di $m$ elementi in circa $\\sqrt{m}$ passi. Sui problemi NP l'esponente della forza bruta si dimezza: $2^n$ diventa $2^{n/2}$. Il problema resta esponenziale.",
        href: "/quantistico#grover-np",
    },
    {
        id: "symmetric",
        name: "Crittografia simmetrica e quantistico",
        aliases: ["crittografia simmetrica", "attacchi a forza bruta"],
        definition:
            "Con Grover la forza bruta su una chiave di $n$ bit passa da circa $2^n$ a $2^{n/2}$ tentativi. Raddoppiare la lunghezza della chiave ripristina la complessità classica.",
        href: "/quantistico#grover-np",
    },
    {
        id: "owf",
        name: "One-way functions",
        aliases: [
            "one-way functions",
            "one-way function",
            "funzioni one-way",
            "funzione one-way",
            "one-way",
            "esponenziazione modulare",
        ],
        definition:
            "Facili da calcolare, difficili da invertire (Lezione 10). $\\mathrm{P} = \\mathrm{NP}$ ne escluderebbe l’esistenza; $\\mathrm{P} \\neq \\mathrm{NP}$ da solo non basta.",
        href: "/tracce/F01#d3",
    },
    {
        id: "oracle",
        name: "Oracolo",
        aliases: ["oracolo", "oracoli"],
        definition:
            "Una subroutine ideale che risponde in un passo a una domanda di decisione. P con oracolo NP può fare un numero polinomiale di domande, anche adattive.",
        href: "/classi/DELTA2",
    },
    {
        id: "hard",
        name: "Hard e completo",
        aliases: ["hard", "completo", "completezza"],
        definition:
            "Un problema è $C$-hard se ogni problema di $C$ si riduce a esso. È $C$-completo se inoltre appartiene a $C$. Specifica sempre il tipo di riduzione.",
        href: "/problemi",
    },
    {
        id: "amplification",
        name: "Amplificazione dell’affidabilità",
        aliases: ["probabilità di errore", "errore limitato", "voto di maggioranza"],
        definition:
            "In BPP si ripete $2k + 1$ volte e si vota a maggioranza: con soglia 3/4, per avere errore al più $\\delta$ basta $k = \\lceil -8 \\ln \\delta \\rceil$ (stima di Chernoff). In PP la maggioranza può essere di un solo run: non si sa ridurre l’errore in tempo polinomiale.",
        href: "/classi#probabilistiche",
    },
    {
        id: "disqualifier",
        name: "Disqualifier",
        aliases: ["disqualifiers", "disqualifier"],
        definition:
            "Un certificato breve che dimostra una risposta no, verificabile in tempo polinomiale. È la caratterizzazione di coNP.",
        href: "/classi/coNP",
    },
    {
        id: "collapse",
        name: "Collasso della gerarchia",
        aliases: ["collasso", "collassa"],
        definition:
            "Se $\\Sigma_i^{\\mathrm{P}} = \\Pi_i^{\\mathrm{P}}$ a un livello finito, tutti i livelli superiori coincidono con quel livello. $\\mathrm{PH} = \\Sigma_i^{\\mathrm{P}}$.",
        href: "/piani",
    },
    {
        id: "proper",
        name: "Funzione propria",
        aliases: ["funzione propria", "funzioni proprie", "funzioni di complessità proprie"],
        definition:
            "Una $f$ non decrescente per cui una MdT $M_f$, su ogni input $x$, scrive esattamente $f(|x|)$ simboli in tempo $O(|x| + f(|x|))$ e spazio $O(f(|x|))$. È l'ipotesi dei teoremi di gerarchia.",
        href: "/teoremi#teorema-soluzioni-precise",
    },
] as const;
