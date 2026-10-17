/* QBF da valutare con l'albero nella scheda "Piani di PH". */
export type Quant = "∃" | "∀";
/** src: dove sta la formula nelle slide; vuoto per gli esempi costruiti per l'esercizio */
export type Qbf = { f: string; q: Quant[]; v: string[]; ev: (a: boolean[]) => boolean; src: string };
/** QBF da valutare con l'albero (∃ = OR, ∀ = AND) */
export const QBF: Qbf[] = [
    {
        f: "$\\exists p\\ \\exists q.\\ (p \\lor q) \\land \\neg p$",
        q: ["∃", "∃"],
        v: ["p", "q"],
        ev: (a) => (a[0] || a[1]) && !a[0],
        src: "",
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
        src: "",
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
        src: "",
    },
    {
        f: "$\\forall p\\ \\exists q\\ \\forall r.\\ (p \\lor q \\lor r) \\land (\\neg p \\lor \\neg q \\lor r)$",
        q: ["∀", "∃", "∀"],
        v: ["p", "q", "r"],
        ev: (a) => (a[0] || a[1] || a[2]) && (!a[0] || !a[1] || a[2]),
        src: "",
    },
];
export const QBF_DEFAULT = 2;
