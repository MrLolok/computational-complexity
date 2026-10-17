import type { TowerId } from "@/data/hierarchy/tower";

import { COMPLETE_BY_LEVEL, QBF_BY_NODE, TOWER_NODES } from "@/data/hierarchy/tower";
import { arrowSvg, ui } from "@/lib/tokens";
import { deltaP, inlineMath, nodeLabelTex, npTower, piP, qsat, quantPrefix, sigmaP, yVar } from "./notation";
import { towerAbove, towerBelow } from "./tower";

/* Scheda di un nodo della torre, in HTML con formule $…$ (per questo usa le classi di stile). */
/** title, sub, i titoli e i testi dei blocchi e le voci di contains/inside sono HTML con formule $…$ */
export type TowerInfo = {
    title: string;
    sub: string;
    blocks: [string, string][];
    contains: string[];
    inside: string[];
};

export function towerInfo(id: TowerId): TowerInfo {
    const n = TOWER_NODES[id],
        lv = n.lv ?? 0;
    const contains = [...towerBelow(id)].map((x) => nodeLabelTex(TOWER_NODES[x].lab)),
        inside = [...towerAbove(id)].map((x) => nodeLabelTex(TOWER_NODES[x].lab));
    const F = ui.formula;
    if (n.k === "S" || n.k === "Pi") {
        const isS = n.k === "S",
            name = isS ? sigmaP(lv) : piP(lv),
            other = isS ? piP(lv) : sigmaP(lv);
        const def = isS
            ? `${name} = \\mathrm{NP}^{${sigmaP(lv - 1)}}${lv >= 2 ? ` = ${npTower(lv)}` : " = \\mathrm{NP}^{\\mathrm{P}} = \\mathrm{NP}"}`
            : `${name} = \\mathrm{coNP}^{${sigmaP(lv - 1)}} = \\mathrm{co}${sigmaP(lv)}${lv === 1 ? " = \\mathrm{coNP}" : ""}`;
        const mach = isS
            ? lv === 1
                ? "Macchina <b>nondeterministica</b> polinomiale. L'oracolo P non serve: ogni domanda si risolve sul posto ($\\mathrm{NP}^{\\mathrm{P}} = \\mathrm{NP}$)."
                : `Macchina <b>nondeterministica</b> polinomiale che può fare domande a un oracolo per un problema di ${inlineMath(sigmaP(lv - 1))} (basta un problema completo, per esempio ${inlineMath(qsat(lv - 1))}).`
            : `I <b>complementi</b> dei problemi di ${inlineMath(sigmaP(lv))}: la macchina è la stessa di ${inlineMath(sigmaP(lv))}, ma si guarda la risposta opposta. Per questo $\\Pi_i^{\\mathrm{P}} = \\mathrm{co}\\Sigma_i^{\\mathrm{P}}$.`;
        const ex = QBF_BY_NODE[id] ?? { f: "", w: "" };
        return {
            title: inlineMath(name + (lv === 1 ? (isS ? " = \\mathrm{NP}" : " = \\mathrm{coNP}") : "")),
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
                ["Definizione con gli oracoli", `<div class="${F}">${inlineMath(def)}</div><p>${mach}</p>`],
                [
                    "Definizione con i quantificatori",
                    `<div class="${F}">${inlineMath(`L \\in ${name} \\iff L = \\{\\, x : ${quantPrefix(isS ? "E" : "A", lv)}\\ (x, ${[...Array(lv)].map((_, j) => yVar(j + 1)).join(", ")}) \\in R \\,\\}`)}</div><p class="${ui.hint}">$R$ si decide in tempo polinomiale ed è bilanciata (ogni $y$ lungo al più $|x|^k$). È il Corollario 2 del Teorema 17.8 (dispensa cap. 17): ogni oracolo vale un blocco di quantificatori in più.</p>`,
                ],
                [
                    "Esempio",
                    `<div class="${F}">${ex.f}</div><p>È ${ex.w}</p>${id === "S2" ? `<p><b>Come la decide una macchina $\\mathrm{NP}^{\\mathrm{NP}}$.</b> Indovina $p$, poi chiede all'oracolo SAT: «esiste un $q$ che rende falsa la formula?», cioè «$\\neg(p \\lor q)$ è soddisfacibile?». Sul ramo con $p$ vera la risposta è no, e il ramo accetta. Sul ramo con $p$ falsa resta $\\neg q$, soddisfacibile, e il ramo rifiuta. Basta un ramo che accetta: la risposta è sì.</p>` : ""}`,
                ],
                [
                    "Problemi completi",
                    `<p>${COMPLETE_BY_LEVEL[lv][isS ? 0 : 1]}.</p>${lv >= 3 ? `<p class="${ui.hint}">${inlineMath(qsat(lv))} ${isS ? "" : "(complemento) "}è completo per ${inlineMath(name)} per il Teorema 17.10.</p>` : ""}`,
                ],
                [
                    `Uguale a ${inlineMath(other)}?`,
                    `<p>Non si sa. Se ${inlineMath(`${name} = ${other}`)}, PH collasserebbe al piano ${lv} (Teorema 17.9)${lv === 1 ? ": è la domanda $\\mathrm{NP} = \\mathrm{coNP}$" : ""}. Prova l'ipotesi nel menu sopra la torre.</p>`,
                ],
            ],
        };
    }
    if (n.k === "D") {
        return {
            title: inlineMath(deltaP(lv)),
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
                    `<div class="${F}">${inlineMath(`${deltaP(lv)} = \\mathrm{P}^{${sigmaP(lv - 1)}}${lv === 2 ? " = \\mathrm{P}^{\\mathrm{NP}}" : ` = \\mathrm{P}^{${npTower(lv - 1)}}`}`)}</div><p>Non ha una forma a quantificatori sua: sta <b>tra due piani</b>, perché ${inlineMath(`${sigmaP(lv - 1)} \\cup ${piP(lv - 1)} \\subseteq ${deltaP(lv)} \\subseteq ${sigmaP(lv)} \\cap ${piP(lv)}`)}. È chiusa per complemento: una macchina deterministica può scambiare yes e no.</p>`,
                ],
                [
                    "Perché sta tra due piani",
                    `<p><b>${inlineMath(`${sigmaP(lv - 1)} \\subseteq ${deltaP(lv)}`)}</b>: si fa una sola domanda all'oracolo e si copia la risposta.</p><p><b>${inlineMath(`${piP(lv - 1)} \\subseteq ${deltaP(lv)}`)}</b>: si chiede all'oracolo il complemento e si inverte la risposta.</p><p><b>${inlineMath(`${deltaP(lv)} \\subseteq ${sigmaP(lv)}`)}</b>: ${inlineMath(`${sigmaP(lv)} = \\mathrm{NP}^{${sigmaP(lv - 1)}}`)} ha lo stesso oracolo, e una macchina deterministica è una nondeterministica che non usa le scelte.</p><p><b>${inlineMath(`${deltaP(lv)} \\subseteq ${piP(lv)}`)}</b>: se ${inlineMath(`L \\in ${deltaP(lv)}`)}, anche ${inlineMath(`\\mathrm{co}\\text{-}L \\in ${deltaP(lv)} \\subseteq ${sigmaP(lv)}`)}, quindi ${inlineMath(`L \\in ${piP(lv)}`)}.</p>`,
                ],
                [
                    "Esempio",
                    lv === 2
                        ? `<p>«Il giro ottimo costa un numero pari?» Si trova il costo ottimo per bisezione, chiedendo a TSP(D) «c'è un giro di costo $\\le B$?» con $B$ dimezzato a ogni passo; le domande sono logaritmiche nel costo massimo, quindi polinomiali. Poi si guarda se è pari.</p><p>Anche DP sta qui: per SAT-UNSAT bastano due domande a SAT (dispensa cap. 16).</p>`
                        : `<p>Un algoritmo polinomiale che fa domande a ${inlineMath(qsat(lv - 1))}. Il corso non presenta problemi completi per ${inlineMath(deltaP(lv))}: all'esame serve sapere dove sta.</p>`,
                ],
                [
                    "All'esame",
                    `<p>Serve come gradino: grazie a $\\Delta$, una classe di un piano sta in tutte le classi dei piani sopra, sia $\\Sigma$ sia $\\Pi$.</p><p>${lv === 2 ? "«SAT-UNSAT si riduce a $\\mathrm{co\\text{-}QSAT}_3$?» SÌ: $\\mathrm{SAT\\text{-}UNSAT} \\in \\mathrm{DP} \\subseteq \\Delta_2^{\\mathrm{P}} \\subseteq \\Pi_2^{\\mathrm{P}} \\subseteq \\Delta_3^{\\mathrm{P}} \\subseteq \\Pi_3^{\\mathrm{P}}$, e $\\mathrm{co\\text{-}QSAT}_3$ è $\\Pi_3^{\\mathrm{P}}$-completo, quindi ogni problema di $\\Pi_3^{\\mathrm{P}}$ si riduce a lui (dispensa, es. 17.2.1)" : `«${inlineMath(qsat(lv - 1))} si riduce a ${inlineMath(qsat(lv, true))}?» SÌ: ${inlineMath(`${qsat(lv - 1)} \\in ${sigmaP(lv - 1)} \\subseteq ${deltaP(lv)} \\subseteq ${piP(lv)}`)}, e ${inlineMath(qsat(lv, true))} è ${inlineMath(piP(lv))}-completo`}.</p>`,
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
                    `<div class="${F}">$\\Delta_0^{\\mathrm{P}} = \\Sigma_0^{\\mathrm{P}} = \\Pi_0^{\\mathrm{P}} = \\mathrm{P}$</div><p>Come oracolo P è inutile: $\\mathrm{P}^{\\mathrm{P}} = \\mathrm{P}$ e $\\mathrm{NP}^{\\mathrm{P}} = \\mathrm{NP}$, perché ogni domanda si può risolvere sul posto in tempo polinomiale (slide, «Oracoli inutili»). Per questo il piano 1 ridà P, NP e coNP.</p>`,
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
                    `<p><a href="/classi/DP" class="inline-block no-underline ${ui.btn}">Apri la scheda di DP ${arrowSvg()}</a></p>`,
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
