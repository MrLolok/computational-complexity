import type { Qbf, Quant, RClass, TowerId } from "@/data/piani";

import { QCOMP, QEX, TE, TW } from "@/data/piani";
import { arrowSvg, ui } from "./ui";

/* Logica pura della scheda "Piani di PH": notazione, torre, schede dei nodi, prefissi, alberi delle QBF, riduzioni. */

/* ---------- notazione (LaTeX: le formule vanno tra $…$ e si rendono con texHtml / Rich / Tex) ---------- */
/** pedice LaTeX: _2, oppure _{10} */
const ix = (i: number | string) => (String(i).length === 1 ? `_${i}` : `_{${i}}`);
/** formula in linea */
export const m = (tex: string) => `$${tex}$`;
export const hS = (i: number | string) => `\\Sigma${ix(i)}^{\\mathrm{P}}`;
export const hPi = (i: number | string) => `\\Pi${ix(i)}^{\\mathrm{P}}`;
export const hD = (i: number | string) => `\\Delta${ix(i)}^{\\mathrm{P}}`;
/** QSAT_i oppure co-QSAT_i */
export const qsat = (i: number | string, co = false) => `\\mathrm{${co ? "co\\text{-}" : ""}QSAT}${ix(i)}`;
export const npT = (k: number) => {
    let s = "\\mathrm{NP}";
    for (let j = 1; j < k; j++) s = `\\mathrm{NP}^{${s}}`;
    return s;
};
export const ys = (i: number) => "y" + ix(i);
const quant = (q: "E" | "A") => (q === "E" ? "\\exists " : "\\forall ");
export function qform(first: "E" | "A", i: number) {
    const out: string[] = [];
    for (let j = 1; j <= i; j++) {
        const ex = (j % 2 === 1) === (first === "E");
        out.push(quant(ex ? "E" : "A") + ys(j));
    }
    return out.join("\\ ");
}
const GREEK: Record<string, string> = { Σ: "\\Sigma", Π: "\\Pi", Δ: "\\Delta" };
/** etichetta Unicode di un nodo (Σ₂ᴾ) come testo con formula ($\Sigma_2^{\mathrm{P}}$); i nomi semplici restano testo */
export const labTex = (lab: string) => {
    const mm = lab.match(/^([ΣΠΔ])([₀-₉])ᴾ$/);
    return mm ? m(`${GREEK[mm[1]]}_${"₀₁₂₃₄₅₆₇₈₉".indexOf(mm[2])}^{\\mathrm{P}}`) : lab;
};

/** testo secondario delle schede */
export const readit = "text-base text-muted";

/* ---------- torre ---------- */
/** classi della torre raggiungibili da id seguendo le inclusioni verso l'alto o verso il basso */
function reach(id: TowerId, up: boolean): Set<TowerId> {
    const out = new Set<TowerId>(),
        st: TowerId[] = [id];
    while (st.length) {
        const a = st.pop();
        TE.forEach(([x, y]) => {
            const [from, to] = up ? [x, y] : [y, x];
            if (from === a && !out.has(to)) {
                out.add(to);
                st.push(to);
            }
        });
    }
    return out;
}
/** classi della torre che contengono id (tutte quelle sopra) */
export const tUp = (id: TowerId) => reach(id, true);
/** classi della torre contenute in id (tutte quelle sotto) */
export const tDown = (id: TowerId) => reach(id, false);
export type NodeState = "sel" | "sub" | "sup" | "far";
export function nodeState(id: TowerId, sel: TowerId, up: Set<TowerId>, dn: Set<TowerId>): NodeState {
    if (id === sel) return "sel";
    if (dn.has(id)) return "sub";
    if (up.has(id)) return "sup";
    return "far";
}
/** l'arco a→b è sulla catena del nodo selezionato */
export function edgeHot(a: TowerId, b: TowerId, sel: TowerId, up: Set<TowerId>, dn: Set<TowerId>) {
    return (
        ((a === sel || dn.has(a)) && (b === sel || dn.has(b))) || ((a === sel || up.has(a)) && (b === sel || up.has(b)))
    );
}
export const nodeWidth = (id: TowerId) => (id === "PSPACE" ? 132 : 120);
/** rettangolo che racchiude i nodi fusi da un'ipotesi */
export function mergeBox(ids: TowerId[]) {
    let x0 = 1e9,
        y0 = 1e9,
        x1 = -1e9,
        y1 = -1e9;
    ids.forEach((id) => {
        const n = TW[id];
        const w = nodeWidth(id) / 2;
        x0 = Math.min(x0, n.x - w);
        x1 = Math.max(x1, n.x + w);
        y0 = Math.min(y0, n.y - 22);
        y1 = Math.max(y1, n.y + 22);
    });
    return { x: x0 - 12, y: y0 - 24, width: x1 - x0 + 24, height: y1 - y0 + 36, lx: x0 - 4, ly: y0 - 9 };
}

/* ---------- scheda di un nodo ---------- */
/** title, sub, i titoli e i testi dei blocchi e le voci di contains/inside sono HTML con formule $…$ */
export type TowerInfo = {
    title: string;
    sub: string;
    blocks: [string, string][];
    contains: string[];
    inside: string[];
};

export function infoOf(id: TowerId): TowerInfo {
    const n = TW[id],
        lv = n.lv ?? 0;
    const contains = [...tDown(id)].map((x) => labTex(TW[x].lab)),
        inside = [...tUp(id)].map((x) => labTex(TW[x].lab));
    const F = ui.formula;
    if (n.k === "S" || n.k === "Pi") {
        const isS = n.k === "S",
            name = isS ? hS(lv) : hPi(lv),
            other = isS ? hPi(lv) : hS(lv);
        const def = isS
            ? `${name} = \\mathrm{NP}^{${hS(lv - 1)}}${lv >= 2 ? ` = ${npT(lv)}` : " = \\mathrm{NP}^{\\mathrm{P}} = \\mathrm{NP}"}`
            : `${name} = \\mathrm{coNP}^{${hS(lv - 1)}} = \\mathrm{co}${hS(lv)}${lv === 1 ? " = \\mathrm{coNP}" : ""}`;
        const mach = isS
            ? lv === 1
                ? "Macchina <b>nondeterministica</b> polinomiale. L'oracolo P non serve: ogni domanda si risolve sul posto ($\\mathrm{NP}^{\\mathrm{P}} = \\mathrm{NP}$)."
                : `Macchina <b>nondeterministica</b> polinomiale che può fare domande a un oracolo per un problema di ${m(hS(lv - 1))} (basta un problema completo, per esempio ${m(qsat(lv - 1))}).`
            : `I <b>complementi</b> dei problemi di ${m(hS(lv))}: la macchina è la stessa di ${m(hS(lv))}, ma si guarda la risposta opposta. Per questo $\\Pi_i^{\\mathrm{P}} = \\mathrm{co}\\Sigma_i^{\\mathrm{P}}$.`;
        const ex = QEX[id] ?? { f: "", w: "" };
        return {
            title: m(name + (lv === 1 ? (isS ? " = \\mathrm{NP}" : " = \\mathrm{coNP}") : "")),
            sub: `Piano ${lv}, lato ${isS ? "$\\exists$ ($\\Sigma$)" : "$\\forall$ ($\\Pi$)"}`,
            contains,
            inside,
            blocks: [
                [
                    "Intuizione",
                    isS
                        ? `La risposta <b>sì</b> si descrive con ${lv} blocc${lv === 1 ? "o" : "hi"} di quantificatori alternati che comincia${lv === 1 ? "" : "no"} con <b>esiste</b>: ${lv === 1 ? "«esiste un certificato» che si controlla in tempo polinomiale." : lv === 2 ? "«esiste una scelta tale che, per ogni contromossa, il controllo passa»." : "«esiste … per ogni … esiste …», seguito da un controllo polinomiale."}`
                        : `La risposta <b>sì</b> si descrive con ${lv} blocc${lv === 1 ? "o" : "hi"} alternati che comincia${lv === 1 ? "" : "no"} con <b>per ogni</b>: ${lv === 1 ? "«per ogni candidato il controllo passa». Il no ha un certificato corto (un controesempio)." : lv === 2 ? "«per ogni scelta dell'avversario esiste una risposta che fa passare il controllo»." : "«per ogni … esiste … per ogni …», seguito da un controllo polinomiale."}`,
                ],
                ["Definizione con gli oracoli", `<div class="${F}">${m(def)}</div><p>${mach}</p>`],
                [
                    "Definizione con i quantificatori",
                    `<div class="${F}">${m(`L \\in ${name} \\iff L = \\{\\, x : ${qform(isS ? "E" : "A", lv)}\\ (x, ${[...Array(lv)].map((_, j) => ys(j + 1)).join(", ")}) \\in R \\,\\}`)}</div><p class="${readit}">$R$ si decide in tempo polinomiale ed è bilanciata (ogni $y$ lungo al più $|x|^k$). È il Corollario 2 del Teorema 17.8 (dispensa cap. 17): ogni oracolo vale un blocco di quantificatori in più.</p>`,
                ],
                [
                    "Esempio",
                    `<div class="${F}">${ex.f}</div><p>È ${ex.w}</p>${id === "S2" ? `<p><b>Come la decide una macchina $\\mathrm{NP}^{\\mathrm{NP}}$.</b> Indovina $p$, poi chiede all'oracolo SAT: «esiste un $q$ che rende falsa la formula?», cioè «$\\neg(p \\lor q)$ è soddisfacibile?». Sul ramo con $p$ vera la risposta è no, e il ramo accetta. Sul ramo con $p$ falsa resta $\\neg q$, soddisfacibile, e il ramo rifiuta. Basta un ramo che accetta: la risposta è sì (appunti Lez. 9 §3).</p>` : ""}`,
                ],
                [
                    "Problemi completi",
                    `<p>${QCOMP[lv][isS ? 0 : 1]}.</p>${lv >= 3 ? `<p class="${readit}">${m(qsat(lv))} ${isS ? "" : "(complemento) "}è completo per ${m(name)} per il Teorema 17.10.</p>` : ""}`,
                ],
                [
                    `Uguale a ${m(other)}?`,
                    `<p>Non si sa. Se ${m(`${name} = ${other}`)}, PH collasserebbe al piano ${lv} (Teorema 17.9)${lv === 1 ? ": è la domanda $\\mathrm{NP} = \\mathrm{coNP}$" : ""}. Prova l'ipotesi nel menu sopra la torre.</p>`,
                ],
            ],
        };
    }
    if (n.k === "D") {
        return {
            title: m(hD(lv)),
            sub: `Piano ${lv}, lato deterministico ($\\Delta$)`,
            contains,
            inside,
            blocks: [
                [
                    "Intuizione",
                    `Un algoritmo <b>deterministico</b> polinomiale che può fare domande a un oracolo del piano ${lv - 1}: tante domande quante vuole (un numero polinomiale), e può decidere la domanda successiva in base alle risposte precedenti.`,
                ],
                [
                    "Definizione",
                    `<div class="${F}">${m(`${hD(lv)} = \\mathrm{P}^{${hS(lv - 1)}}${lv === 2 ? " = \\mathrm{P}^{\\mathrm{NP}}" : ` = \\mathrm{P}^{${npT(lv - 1)}}`}`)}</div><p>Non ha una forma a quantificatori sua: sta <b>tra due piani</b>, perché ${m(`${hS(lv - 1)} \\cup ${hPi(lv - 1)} \\subseteq ${hD(lv)} \\subseteq ${hS(lv)} \\cap ${hPi(lv)}`)}. È chiusa per complemento: una macchina deterministica può scambiare yes e no.</p>`,
                ],
                [
                    "Perché sta tra due piani",
                    `<p><b>${m(`${hS(lv - 1)} \\subseteq ${hD(lv)}`)}</b>: si fa una sola domanda all'oracolo e si copia la risposta.</p><p><b>${m(`${hPi(lv - 1)} \\subseteq ${hD(lv)}`)}</b>: si chiede all'oracolo il complemento e si inverte la risposta.</p><p><b>${m(`${hD(lv)} \\subseteq ${hS(lv)}`)}</b>: ${m(`${hS(lv)} = \\mathrm{NP}^{${hS(lv - 1)}}`)} ha lo stesso oracolo, e una macchina deterministica è una nondeterministica che non usa le scelte.</p><p><b>${m(`${hD(lv)} \\subseteq ${hPi(lv)}`)}</b>: se ${m(`L \\in ${hD(lv)}`)}, anche ${m(`\\mathrm{co}\\text{-}L \\in ${hD(lv)} \\subseteq ${hS(lv)}`)}, quindi ${m(`L \\in ${hPi(lv)}`)}.</p>`,
                ],
                [
                    "Esempio",
                    lv === 2
                        ? `<p>«Il giro ottimo costa un numero pari?» Si trova il costo ottimo per bisezione, chiedendo a TSP(D) «c'è un giro di costo $\\le B$?» con $B$ dimezzato a ogni passo; le domande sono logaritmiche nel costo massimo, quindi polinomiali. Poi si guarda se è pari (appunti Lez. 9 §2).</p><p>Anche DP sta qui: per SAT-UNSAT bastano due domande a SAT (dispensa cap. 16).</p>`
                        : `<p>Un algoritmo polinomiale che fa domande a ${m(qsat(lv - 1))}. Il corso non presenta problemi completi per ${m(hD(lv))}: all'esame serve sapere dove sta.</p>`,
                ],
                [
                    "All'esame",
                    `<p>Serve come gradino: grazie a $\\Delta$, una classe di un piano sta in tutte le classi dei piani sopra, sia $\\Sigma$ sia $\\Pi$.</p><p>${lv === 2 ? "«SAT-UNSAT si riduce a $\\mathrm{co\\text{-}QSAT}_3$?» SÌ: $\\mathrm{SAT\\text{-}UNSAT} \\in \\mathrm{DP} \\subseteq \\Delta_2^{\\mathrm{P}} \\subseteq \\Pi_2^{\\mathrm{P}} \\subseteq \\Delta_3^{\\mathrm{P}} \\subseteq \\Pi_3^{\\mathrm{P}}$, e $\\mathrm{co\\text{-}QSAT}_3$ è $\\Pi_3^{\\mathrm{P}}$-completo, quindi ogni problema di $\\Pi_3^{\\mathrm{P}}$ si riduce a lui (dispensa, es. 17.2.1)" : `«${m(qsat(lv - 1))} si riduce a ${m(qsat(lv, true))}?» SÌ: ${m(`${qsat(lv - 1)} \\in ${hS(lv - 1)} \\subseteq ${hD(lv)} \\subseteq ${hPi(lv)}`)}, e ${m(qsat(lv, true))} è ${m(hPi(lv))}-completo`}.</p>`,
                ],
            ],
        };
    }
    if (id === "L0")
        return {
            title: "P",
            sub: "Piano 0",
            contains,
            inside,
            blocks: [
                [
                    "Intuizione",
                    "Il pavimento della torre: i problemi risolubili in tempo polinomiale deterministico. Al piano 0 le tre classi coincidono.",
                ],
                [
                    "Definizione",
                    `<div class="${F}">$\\Delta_0^{\\mathrm{P}} = \\Sigma_0^{\\mathrm{P}} = \\Pi_0^{\\mathrm{P}} = \\mathrm{P}$</div><p>Come oracolo P è inutile: $\\mathrm{P}^{\\mathrm{P}} = \\mathrm{P}$ e $\\mathrm{NP}^{\\mathrm{P}} = \\mathrm{NP}$, perché ogni domanda si può risolvere sul posto in tempo polinomiale (slide Lez. 9, «Oracoli inutili»). Per questo il piano 1 ridà P, NP e coNP.</p>`,
                ],
                [
                    "All'esame",
                    "Se un problema completo di un piano qualsiasi stesse in P, PH crollerebbe a P (passando per $\\mathrm{P} = \\mathrm{NP}$).",
                ],
            ],
        };
    if (id === "DP")
        return {
            title: "DP",
            sub: "Tra il piano 1 e il piano 2",
            contains,
            inside,
            blocks: [
                [
                    "Intuizione",
                    "Le domande «sì per una parte NP e no per una parte coNP», come «la prima formula è soddisfacibile e la seconda no» (SAT-UNSAT).",
                ],
                [
                    "Dove sta",
                    `<div class="${F}">$\\mathrm{NP} \\cup \\mathrm{coNP} \\subseteq \\mathrm{DP} \\subseteq \\mathrm{P}^{\\mathrm{NP}} = \\Delta_2^{\\mathrm{P}}$</div><p>Una macchina $\\mathrm{P}^{\\mathrm{NP}}$ decide SAT-UNSAT con due domande a SAT (dispensa cap. 16). DP non è un piano della torre: è uno scalino in mezzo.</p>`,
                ],
                [
                    "Approfondisci",
                    `<p><a href="/dp" class="inline-block no-underline ${ui.btn}">Apri il Focus DP ${arrowSvg()}</a></p>`,
                ],
            ],
        };
    if (id === "PH")
        return {
            title: "PH",
            sub: "La torre intera",
            contains,
            inside,
            blocks: [
                [
                    "Definizione",
                    `<div class="${F}">$\\mathrm{PH} = \\bigcup_{i \\ge 0} \\Sigma_i^{\\mathrm{P}}$</div><p>Un problema sta in PH se sta in <b>qualche</b> piano. Il numero di alternanze può essere grande quanto si vuole, ma è fissato per ogni problema e non dipende dall'input.</p>`,
                ],
                [
                    "Problemi completi",
                    "<p>Ogni piano ne ha ($\\mathrm{QSAT}_i$), ma per PH intera non se ne conoscono. Se ce ne fosse uno, PH collasserebbe a un piano finito (Teorema 17.11). Le QBF con alternanze illimitate (QSAT) non sono PH-complete: sono PSPACE-complete.</p>",
                ],
                [
                    "Sopra PH",
                    `<p>$\\mathrm{PH} \\subseteq \\mathrm{PSPACE}$ (Proposizione 17.1). Se siano uguali è aperto; se lo fossero, PH collasserebbe (corollario del 17.11).</p>`,
                ],
            ],
        };
    return {
        title: "PSPACE",
        sub: "Il tetto sopra la torre",
        contains,
        inside,
        blocks: [
            [
                "Perché contiene PH",
                `<p>Un problema di $\\Sigma_i^{\\mathrm{P}}$ si decide provando tutti i certificati $y_1, \\ldots, y_i$ uno alla volta, riusando lo stesso spazio: i certificati sono polinomiali, quindi basta spazio polinomiale (Proposizione 17.1).</p>`,
            ],
            [
                "Il problema completo",
                `<p><b>QSAT</b>: QBF con un numero qualsiasi di alternanze. L'algoritmo Truth delle slide la valuta ricorsivamente in spazio $O(n^2)$: per $\\exists$ restituisce $b_0 \\lor b_1$, per $\\forall$ restituisce $b_0 \\land b_1$.</p>`,
            ],
            [
                "All'esame",
                "«$\\mathrm{QSAT} \\in \\Pi_2^{\\mathrm{P}}$?» altro: solo se $\\mathrm{PSPACE} = \\Pi_2^{\\mathrm{P}}$, e allora PH collasserebbe al piano 2.",
            ],
        ],
    };
}

/* ---------- costruttore di prefissi ---------- */
export type QLetter = "E" | "A";
/** raw, args e merged sono LaTeX (senza $); expl e comp sono HTML con formule $…$ */
export type PrefixInfo = {
    raw: string;
    args: string;
    merged: string | null;
    k: number;
    expl: string;
    comp: string;
    tid: TowerId | null;
};
export function analyzePrefix(QB: QLetter[]): PrefixInfo {
    const raw = QB.map((q, j) => quant(q) + ys(j + 1)).join("\\ ");
    const blocks: { q: QLetter; v: number[] }[] = [];
    QB.forEach((q, j) => {
        if (blocks.length && blocks[blocks.length - 1].q === q) blocks[blocks.length - 1].v.push(j + 1);
        else blocks.push({ q, v: [j + 1] });
    });
    const k = blocks.length,
        isMerged = blocks.some((b) => b.v.length > 1);
    let expl: string, comp: string, tid: TowerId | null;
    if (!k) {
        expl = "Nessun quantificatore: resta solo il controllo polinomiale $R(x)$.";
        comp = "—";
        tid = "L0";
    } else {
        const isS = blocks[0].q === "E",
            cls = isS ? hS(k) : hPi(k);
        tid = k <= 4 ? (`${isS ? "S" : "P"}${k}` as TowerId) : null;
        expl = `${k} blocc${k === 1 ? "o" : "hi"} alternat${k === 1 ? "o" : "i"}, il primo è ${isS ? "$\\exists$" : "$\\forall$"}: la classe è ${m(cls + (k === 1 ? (isS ? " = \\mathrm{NP}" : " = \\mathrm{coNP}") : ""))}. Una macchina che lo decide: ${isS ? "nondeterministica" : "il complemento di una nondeterministica"} polinomiale con oracolo ${k === 1 ? "P (cioè nessun oracolo utile)" : m(hS(k - 1))}.`;
        comp = `${m(qsat(k, !isS) + (k === 1 && isS ? " = \\mathrm{SAT}" : ""))}${k === 1 && !isS ? " ($= \\mathrm{co\\text{-}SAT}$)" : ""} è completo per questa classe.`;
    }
    return {
        raw,
        args: QB.length ? ", " + QB.map((_, j) => ys(j + 1)).join(", ") : "",
        merged: isMerged
            ? blocks
                  .map((b) => quant(b.q) + (b.v.length > 1 ? "(" + b.v.map(ys).join(", ") + ")" : ys(b.v[0])))
                  .join("\\ ")
            : null,
        k,
        expl,
        comp,
        tid,
    };
}

/* ---------- alberi delle QBF ---------- */
export type QbfNode =
    | { leaf: true; a: boolean[]; val: boolean; x: number; y: number; key?: boolean }
    | { leaf: false; q: Quant; v: string; ch: [QbfNode, QbfNode]; val: boolean; x: number; y: number; key?: boolean };

/** albero di valutazione: ramo sinistro = vero, destro = falso */
export function qbfTree(F: Qbf): QbfNode {
    const n = F.v.length;
    function rec(d: number, a: boolean[]): QbfNode {
        if (d === n) return { leaf: true, a: a.slice(), val: !!F.ev(a), x: 0, y: 0 };
        const ch = [true, false].map((b) => rec(d + 1, a.concat([b]))) as [QbfNode, QbfNode];
        const val = F.q[d] === "∃" ? ch[0].val || ch[1].val : ch[0].val && ch[1].val;
        return { leaf: false, q: F.q[d], v: F.v[d], ch, val, x: 0, y: 0 };
    }
    return rec(0, []);
}
/** numero di blocchi di quantificatori uguali */
export function blocksOf(qs: Quant[]) {
    let k = 0,
        prev: Quant | null = null;
    qs.forEach((q) => {
        if (q !== prev) {
            k++;
            prev = q;
        }
    });
    return k;
}
/** albero con le coordinate e i rami che giustificano il valore (key) */
export function qbfLayout(F: Qbf) {
    const T = qbfTree(F),
        n = F.v.length,
        L = 1 << n,
        W = Math.max(360, L * 82),
        H = 70 + n * 78;
    let leafX = 0;
    (function place(nd: QbfNode, d: number) {
        if (nd.leaf) {
            nd.x = ((leafX + 0.5) * W) / L;
            leafX++;
        } else {
            nd.ch.forEach((c) => place(c, d + 1));
            nd.x = (nd.ch[0].x + nd.ch[1].x) / 2;
        }
        nd.y = 30 + d * 78;
    })(T, 0);
    (function just(nd: QbfNode) {
        if (nd.leaf) return;
        const pick = (nd.q === "∃") === nd.val ? [nd.ch.find((c) => c.val === nd.val)!] : nd.ch;
        pick.forEach((c) => {
            c.key = true;
            just(c);
        });
    })(T);
    const all: QbfNode[] = [];
    (function walk(nd: QbfNode) {
        all.push(nd);
        if (!nd.leaf) nd.ch.forEach(walk);
    })(T);
    return { T, W, H, all };
}

/* ---------- riduzioni ---------- */
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
