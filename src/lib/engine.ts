import type { ClassId } from "@/data/classes";

import { CO, HASSE_STRICT, IDS, INC, PLAIN, STRICT, TEX } from "@/data/classes";

/* Motore delle inclusioni tra le classi (puro, senza DOM): chiusura transitiva con le regole del corso,
   separazioni dimostrate e risposte "A ⊆ B?" come all'esame. Portato dalla pagina "Gerarchia delle classi" (v9). */

/** nome di una classe in una frase: testo semplice, o formula se ha pedici o operatori (Σ₂ᴾ, NP ∩ coNP) */
export const nm = (x: ClassId) => (/[_^]|\\cap/.test(TEX[x]) ? `$${TEX[x]}$` : PLAIN[x]);

export type EdgeKind = "base" | "hyp" | "der";
/** un passo A ⊆ B, con il motivo e la fonte */
export type Edge = { a: ClassId; b: ClassId; why: string; kind: EdgeKind; src: string };
/** riga di STRICT: [A, B, motivo, fonte, ricavata] */
export type StrictRow = (typeof STRICT)[number];

export type Closure = {
    E: Map<string, Edge>;
    reach: Record<ClassId, Set<ClassId>>;
    /** A ⊆ B segue dalle inclusioni (A ≠ B) */
    R: (a: ClassId, b: ClassId) => boolean;
    /** catena di passi da A a B (BFS, preferisce gli archi base), null se non c'è */
    path: (a: ClassId, b: ClassId) => Edge[] | null;
};

export const STRICTMAP: Record<string, StrictRow> = Object.fromEntries(STRICT.map((s) => [s[0] + ">" + s[1], s]));

/** il passo A → B è un'inclusione stretta (dimostrata o ricavata) */
export const isStrictStep = (a: ClassId, b: ClassId) => {
    const k = a + ">" + b;
    return k in STRICTMAP || HASSE_STRICT.has(k);
};

const rank = (k: EdgeKind) => (k === "base" ? 0 : k === "hyp" ? 1 : 2);

export function closure(extra: [ClassId, ClassId, string][] = []): Closure {
    const E = new Map<string, Edge>();
    const add = (a: ClassId, b: ClassId, why: string, kind: EdgeKind, src: string) => {
        const k = a + ">" + b;
        if (a === b || E.has(k)) return false;
        E.set(k, { a, b, why, kind, src });
        return true;
    };
    INC.forEach(([a, b, w, s]) => add(a, b, w, "base", s));
    extra.forEach(([a, b, w]) => add(a, b, w, "hyp", ""));

    let reach = {} as Record<ClassId, Set<ClassId>>;
    const compute = () => {
        const next = {} as Record<ClassId, Set<ClassId>>;
        for (const x of IDS) {
            const seen = new Set<ClassId>([x]);
            const st: ClassId[] = [x];
            while (st.length) {
                const u = st.pop()!;
                for (const e of E.values())
                    if (e.a === u && !seen.has(e.b)) {
                        seen.add(e.b);
                        st.push(e.b);
                    }
            }
            next[x] = seen;
        }
        reach = next;
    };
    const R = (a: ClassId, b: ClassId) => reach[a].has(b);
    const path = (a: ClassId, b: ClassId): Edge[] | null => {
        const prev = new Map<ClassId, Edge | null>([[a, null]]);
        const q: ClassId[] = [a];
        while (q.length) {
            const u = q.shift()!;
            if (u === b) break;
            const out = [...E.values()].filter((e) => e.a === u).sort((x, y) => rank(x.kind) - rank(y.kind));
            for (const e of out)
                if (!prev.has(e.b)) {
                    prev.set(e.b, e);
                    q.push(e.b);
                }
        }
        if (!prev.has(b)) return null;
        const steps: Edge[] = [];
        let c = b;
        for (let e = prev.get(c); e; e = prev.get(c)) {
            steps.unshift(e);
            c = e.a;
        }
        return steps;
    };
    /** catena A ⊆ … ⊆ B come formula $…$ */
    const ptxt = (a: ClassId, b: ClassId) => {
        const st = path(a, b);
        return "$" + (st ? [TEX[a], ...st.map((e) => TEX[e.b])] : [TEX[a], TEX[b]]).join(" \\subseteq ") + "$";
    };

    for (let it = 0; it < 20; it++) {
        compute();
        let ch = false;
        for (const a of IDS)
            for (const b of IDS) {
                if (a === b || !R(a, b)) continue;
                const ca = CO[a],
                    cb = CO[b];
                if (ca && cb && !R(ca, cb))
                    ch =
                        add(
                            ca,
                            cb,
                            `vale ${ptxt(a, b)}; passando ai complementi, $${TEX[ca]} \\subseteq ${TEX[cb]}$`,
                            "der",
                            "dispensa cap. 14, Prop. A",
                        ) || ch;
            }
        for (const x of IDS) {
            if (R(x, "NP") && R(x, "coNP") && !R(x, "NPcapcoNP"))
                ch = add(x, "NPcapcoNP", `${nm(x)} sta sia in NP sia in coNP`, "der", "") || ch;
            if (R(x, "RE") && R(x, "coRE") && !R(x, "R"))
                ch =
                    add(
                        x,
                        "R",
                        `${nm(x)} sta sia in RE sia in coRE, e $\\mathrm{R} = \\mathrm{RE} \\cap \\mathrm{coRE}$`,
                        "der",
                        "Lez. 10 §7",
                    ) || ch;
        }
        if (R("NP", "coNP"))
            ch =
                add(
                    "PH",
                    "NP",
                    `vale ${ptxt("NP", "coNP")}, cioè $\\mathrm{NP} = \\mathrm{coNP}$, e questo fa collassare PH al primo livello (Teorema 17.9)`,
                    "der",
                    "dispensa cap. 17",
                ) || ch;
        if (R("SIGMA2", "PI2"))
            ch =
                add(
                    "PH",
                    "SIGMA2",
                    `vale ${ptxt("SIGMA2", "PI2")}, cioè $\\Sigma_2^{\\mathrm{P}} = \\Pi_2^{\\mathrm{P}}$, e PH collassa al secondo livello (Teorema 17.9)`,
                    "der",
                    "dispensa cap. 17",
                ) || ch;
        if (R("SIGMAi", "PIi"))
            ch =
                add(
                    "PH",
                    "SIGMAi",
                    `vale ${ptxt("SIGMAi", "PIi")}, cioè $\\Sigma_i^{\\mathrm{P}} = \\Pi_i^{\\mathrm{P}}$, e PH collassa al livello $i$ (Teorema 17.9)`,
                    "der",
                    "dispensa cap. 17",
                ) || ch;
        if (R("NP", "P"))
            ch =
                add(
                    "NEXP",
                    "EXP",
                    `vale ${ptxt("NP", "P")}, cioè $\\mathrm{P} = \\mathrm{NP}$, e per il padding $\\mathrm{EXP} = \\mathrm{NEXP}$ (Teorema 20.1)`,
                    "der",
                    "Lez. 10 §5",
                ) || ch;
        if (!ch) break;
    }
    compute();
    return { E, R, path, reach };
}

/** le inclusioni note, senza ipotesi */
export const BASE = closure();

export type StrictHit = { s: StrictRow; p1: Edge[]; p2: Edge[]; len: number };

/** esiste X ⊊ Y con a ⊆ X e Y ⊆ b: la più corta */
export function strictOf(a: ClassId, b: ClassId, K: Closure = BASE): StrictHit | null {
    let best: StrictHit | null = null;
    for (const s of STRICT) {
        const [x, y] = s;
        if ((a === x || K.R(a, x)) && (y === b || K.R(y, b))) {
            const p1 = a === x ? [] : K.path(a, x)!,
                p2 = y === b ? [] : K.path(y, b)!;
            const len = p1.length + p2.length;
            if (!best || len < best.len) best = { s, p1, p2, len };
        }
    }
    return best;
}

/** gruppi di classi uguali (che si contengono a vicenda) */
export function eqGroups(K: Closure): ClassId[][] {
    const seen = new Set<ClassId>(),
        groups: ClassId[][] = [];
    for (const a of IDS) {
        if (seen.has(a)) continue;
        const g = IDS.filter((b) => b === a || (K.R(a, b) && K.R(b, a)));
        g.forEach((x) => seen.add(x));
        if (g.length > 1) groups.push(g);
    }
    return groups;
}

export type AnswerYes = { ans: "si"; text: string; chain: Edge[]; strict: StrictHit | null; revNo: boolean };
export type AnswerNo = { ans: "no"; text: string; contra: { s: StrictRow; p: Edge[] } };
export type AnswerOther = { ans: "altro"; text: string; reverse: boolean; groups: ClassId[][]; flags: string[] };
export type Answer = AnswerYes | AnswerNo | AnswerOther;

const memo = new Map<string, Answer>();

/** A ⊆ B? Risposta SÌ (con la catena), NO (con la separazione contraddetta) o altro (questione aperta). */
export function askSubset(a: ClassId, b: ClassId): Answer {
    const key = a + ">" + b;
    const hit = memo.get(key);
    if (hit) return hit;
    const r = computeSubset(a, b);
    memo.set(key, r);
    return r;
}

function computeSubset(a: ClassId, b: ClassId): Answer {
    if (a === b) return { ans: "si", text: "È la stessa classe.", chain: [], strict: null, revNo: false };
    if (BASE.R(a, b)) {
        const st = strictOf(a, b);
        const rev = !st && !BASE.R(b, a) ? askSubset(b, a) : null;
        const revNo = !!(rev && rev.ans === "no");
        return {
            ans: "si",
            chain: BASE.path(a, b) ?? [],
            strict: st,
            revNo,
            text: st || revNo ? "Inclusione dimostrata, ed è stretta." : "Inclusione dimostrata.",
        };
    }
    const hyp = closure([[a, b, `ipotesi: $${TEX[a]} \\subseteq ${TEX[b]}$`]]);
    let best: { s: StrictRow; p: Edge[] } | null = null;
    for (const s of STRICT) {
        const [x, y] = s;
        if (hyp.R(y, x)) {
            const p = hyp.path(y, x)!;
            if (!best || p.length < best.p.length) best = { s, p };
        }
    }
    if (best) return { ans: "no", contra: best, text: "Contraddirebbe una separazione dimostrata." };
    const before = eqGroups(BASE).map((g) => g.join());
    const after = eqGroups(hyp).filter((g) => !before.includes(g.join()));
    const reverse = BASE.R(b, a);
    const flags: string[] = [];
    if (hyp.R("PSPACE", "PH") && !BASE.R("PSPACE", "PH"))
        flags.push("$\\mathrm{PH} = \\mathrm{PSPACE}$: per il Teorema 17.11 PH collasserebbe a un livello finito.");
    if (hyp.R("NP", "coNP") && !BASE.R("NP", "coNP"))
        flags.push(
            hyp.R("NP", "P")
                ? "$\\mathrm{P} = \\mathrm{NP}$: PH collasserebbe al piano 0 ($\\mathrm{PH} = \\mathrm{P}$) ed $\\mathrm{EXP} = \\mathrm{NEXP}$ per il padding."
                : "$\\mathrm{NP} = \\mathrm{coNP}$: PH collasserebbe al primo livello ($\\mathrm{PH} = \\mathrm{NP}$).",
        );
    else if (hyp.R("SIGMA2", "PI2") && !BASE.R("SIGMA2", "PI2"))
        flags.push("$\\Sigma_2^{\\mathrm{P}} = \\Pi_2^{\\mathrm{P}}$: PH collasserebbe al secondo livello.");
    return {
        ans: "altro",
        reverse,
        groups: after,
        flags,
        text: reverse
            ? `Si sa che $${TEX[b]} \\subseteq ${TEX[a]}$: l'inclusione richiesta varrebbe solo se le due classi fossero uguali, e non si sa.`
            : "Né dimostrata né esclusa: è una questione aperta.",
    };
}

/** A ⊆ B è stretta: lo dice una separazione, o l'inclusione opposta è esclusa */
export const isStrictYes = (r: Answer) => r.ans === "si" && !!(r.strict || r.revNo);

/** dove sta una classe: chi la contiene, chi contiene, con chi il rapporto non è noto */
export function relGroups(id: ClassId) {
    const sup: [ClassId, boolean][] = [],
        sub: [ClassId, boolean][] = [],
        open: [ClassId, "≠" | "?"][] = [];
    for (const o of IDS) {
        if (o === id) continue;
        if (BASE.R(id, o)) sup.push([o, isStrictYes(askSubset(id, o))]);
        else if (BASE.R(o, id)) sub.push([o, isStrictYes(askSubset(o, id))]);
        else {
            const r = askSubset(id, o),
                r2 = askSubset(o, id);
            open.push([o, r.ans === "no" && r2.ans === "no" ? "≠" : "?"]);
        }
    }
    return { sup, sub, open };
}

export type Verdict = {
    ab: Answer;
    ba: Answer;
    /** relazione in testa: [sinistra, simbolo, destra] */
    head: [ClassId, "=" | "⊊" | "⊆" | "≠" | "?", ClassId];
    pill: { tone: "ok" | "proved" | "open"; text: string };
    eq: { ans: "si" | "no" | "altro"; text: string; why: string };
};

/** confronto di due classi diverse, come nella scheda Confronta */
export function compare(a: ClassId, b: ClassId): Verdict {
    const ab = askSubset(a, b),
        ba = askSubset(b, a);
    const incl = (st: boolean) =>
        st
            ? ({ tone: "proved", text: "inclusione stretta dimostrata" } as const)
            : ({ tone: "open", text: "inclusione dimostrata, uguaglianza aperta" } as const);
    let head: Verdict["head"], pill: Verdict["pill"];
    if (ab.ans === "si" && ba.ans === "si") {
        head = [a, "=", b];
        pill = { tone: "ok", text: "uguaglianza dimostrata" };
    } else if (ab.ans === "si") {
        const st = isStrictYes(ab);
        head = [a, st ? "⊊" : "⊆", b];
        pill = incl(st);
    } else if (ba.ans === "si") {
        const st = isStrictYes(ba);
        head = [b, st ? "⊊" : "⊆", a];
        pill = incl(st);
    } else if (ab.ans === "no" && ba.ans === "no") {
        head = [a, "≠", b];
        pill = { tone: "proved", text: "diverse, nessuna contiene l'altra" };
    } else {
        head = [a, "?", b];
        pill = { tone: "open", text: "rapporto non noto" };
    }
    const eqAns = ab.ans === "si" && ba.ans === "si" ? "si" : ab.ans === "no" || ba.ans === "no" ? "no" : "altro";
    const eq = {
        ans: eqAns,
        text: { si: "SÌ", no: "NO", altro: "altro: non si sa" }[eqAns],
        why:
            eqAns === "no"
                ? "un'inclusione tra le due è esclusa, quindi non possono essere uguali"
                : eqAns === "si"
                  ? "sono la stessa classe"
                  : "nessuna delle due inclusioni mancanti è dimostrata o esclusa",
    } as const;
    return { ab, ba, head, pill, eq };
}

/** etichetta della risposta a "A ⊆ B?" (HTML con formule $…$) */
export const answerLabel = (r: Answer, a: ClassId, b: ClassId) =>
    r.ans === "si"
        ? "SÌ"
        : r.ans === "no"
          ? "NO"
          : r.reverse
            ? `altro: solo se $${TEX[a]} = ${TEX[b]}$`
            : `altro: solo se $${TEX[a]} \\subseteq ${TEX[b]}$`;

/** l'indirizzo nomina una classe della mappa */
export const isClassId = (s: string): s is ClassId => (IDS as readonly string[]).includes(s);
