/* Logica pura della scheda "Piani di PH": notazione, torre, schede dei nodi, prefissi, alberi delle QBF, riduzioni. */
import { QCOMP, QEX, TE, TW, type Qbf, type Quant, type RClass, type TowerId } from "@/data/piani";
import { ui } from "./ui";

/* ---------- notazione ---------- */
export const SUBD = (n: number | string) =>
  String(n)
    .split("")
    .map((d) => "₀₁₂₃₄₅₆₇₈₉"[+d])
    .join("");
export const hS = (i: number | string) => `Σ<sub>${i}</sub><sup>P</sup>`;
export const hPi = (i: number | string) => `Π<sub>${i}</sub><sup>P</sup>`;
export const hD = (i: number | string) => `Δ<sub>${i}</sub><sup>P</sup>`;
export const uS = (i: number) => "Σ" + SUBD(i) + "ᴾ";
export const uPi = (i: number) => "Π" + SUBD(i) + "ᴾ";
export const uD = (i: number) => "Δ" + SUBD(i) + "ᴾ";
export const npT = (k: number) => {
  let s = "NP";
  for (let j = 1; j < k; j++) s = `NP<sup>${s}</sup>`;
  return s;
};
export const ys = (i: number) => "y" + SUBD(i);
export function qform(first: "E" | "A", i: number) {
  const out: string[] = [];
  for (let j = 1; j <= i; j++) {
    const ex = (j % 2 === 1) === (first === "E");
    out.push((ex ? "∃" : "∀") + ys(j));
  }
  return out.join(" ");
}

/** testo secondario delle schede */
export const readit = "text-base text-muted";

/* ---------- torre ---------- */
/** classi della torre che contengono id (tutte quelle sopra) */
export function tUp(id: TowerId): Set<TowerId> {
  const out = new Set<TowerId>(),
    st: TowerId[] = [id];
  while (st.length) {
    const a = st.pop();
    TE.forEach(([x, y]) => {
      if (x === a && !out.has(y)) {
        out.add(y);
        st.push(y);
      }
    });
  }
  return out;
}
/** classi della torre contenute in id (tutte quelle sotto) */
export function tDown(id: TowerId): Set<TowerId> {
  const out = new Set<TowerId>(),
    st: TowerId[] = [id];
  while (st.length) {
    const a = st.pop();
    TE.forEach(([x, y]) => {
      if (y === a && !out.has(x)) {
        out.add(x);
        st.push(x);
      }
    });
  }
  return out;
}
export type NodeState = "sel" | "sub" | "sup" | "far";
export function nodeState(id: TowerId, sel: TowerId, up: Set<TowerId>, dn: Set<TowerId>): NodeState {
  if (id === sel) return "sel";
  if (dn.has(id)) return "sub";
  if (up.has(id)) return "sup";
  return "far";
}
/** l'arco a→b è sulla catena del nodo selezionato */
export function edgeHot(a: TowerId, b: TowerId, sel: TowerId, up: Set<TowerId>, dn: Set<TowerId>) {
  return ((a === sel || dn.has(a)) && (b === sel || dn.has(b))) || ((a === sel || up.has(a)) && (b === sel || up.has(b)));
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
export type TowerInfo = { title: string; sub: string; blocks: [string, string][]; contains: string[]; inside: string[] };

export function infoOf(id: TowerId): TowerInfo {
  const n = TW[id],
    lv = n.lv ?? 0;
  const contains = [...tDown(id)].map((x) => TW[x].lab),
    inside = [...tUp(id)].map((x) => TW[x].lab);
  const F = ui.formula;
  if (n.k === "S" || n.k === "Pi") {
    const isS = n.k === "S",
      name = isS ? hS(lv) : hPi(lv),
      other = isS ? hPi(lv) : hS(lv);
    const def = isS
      ? `${name} = NP<sup>${hS(lv - 1)}</sup>${lv >= 2 ? ` = ${npT(lv)}` : " = NP<sup>P</sup> = NP"}`
      : `${name} = coNP<sup>${hS(lv - 1)}</sup> = co${hS(lv)}${lv === 1 ? " = coNP" : ""}`;
    const mach = isS
      ? lv === 1
        ? "Macchina <b>nondeterministica</b> polinomiale. L'oracolo P non serve: ogni domanda si risolve sul posto (NP<sup>P</sup> = NP)."
        : `Macchina <b>nondeterministica</b> polinomiale che può fare domande a un oracolo per un problema di ${hS(lv - 1)} (basta un problema completo, per esempio QSAT${SUBD(lv - 1)}).`
      : `I <b>complementi</b> dei problemi di ${hS(lv)}: la macchina è la stessa di ${hS(lv)}, ma si guarda la risposta opposta. Per questo Π<sub>i</sub><sup>P</sup> = coΣ<sub>i</sub><sup>P</sup>.`;
    const ex = QEX[id] ?? { f: "", w: "" };
    return {
      title: name + (lv === 1 ? (isS ? " = NP" : " = coNP") : ""),
      sub: `Piano ${lv}, lato ${isS ? "∃ (Σ)" : "∀ (Π)"}`,
      contains,
      inside,
      blocks: [
        [
          "Intuizione",
          isS
            ? `La risposta <b>sì</b> si descrive con ${lv} blocc${lv === 1 ? "o" : "hi"} di quantificatori alternati che comincia${lv === 1 ? "" : "no"} con <b>esiste</b>: ${lv === 1 ? "«esiste un certificato» che si controlla in tempo polinomiale." : lv === 2 ? "«esiste una scelta tale che, per ogni contromossa, il controllo passa»." : "«esiste … per ogni … esiste …», seguito da un controllo polinomiale."}`
            : `La risposta <b>sì</b> si descrive con ${lv} blocc${lv === 1 ? "o" : "hi"} alternati che comincia${lv === 1 ? "" : "no"} con <b>per ogni</b>: ${lv === 1 ? "«per ogni candidato il controllo passa». Il no ha un certificato corto (un controesempio)." : lv === 2 ? "«per ogni scelta dell'avversario esiste una risposta che fa passare il controllo»." : "«per ogni … esiste … per ogni …», seguito da un controllo polinomiale."}`,
        ],
        ["Definizione con gli oracoli", `<div class="${F}">${def}</div><p>${mach}</p>`],
        [
          "Definizione con i quantificatori",
          `<div class="${F}">L ∈ ${name} ⇔ L = { x : ${qform(isS ? "E" : "A", lv)}  (x, ${[...Array(lv)].map((_, j) => ys(j + 1)).join(", ")}) ∈ R }</div><p class="${readit}">R si decide in tempo polinomiale ed è bilanciata (ogni y lungo al più |x|<sup>k</sup>). È il Corollario 2 del Teorema 17.8 (dispensa cap. 17): ogni oracolo vale un blocco di quantificatori in più.</p>`,
        ],
        [
          "Esempio",
          `<div class="${F}">${ex.f}</div><p>È ${ex.w}</p>${id === "S2" ? `<p><b>Come la decide una macchina NP<sup>NP</sup>.</b> Indovina p, poi chiede all'oracolo SAT: «esiste un q che rende falsa la formula?», cioè «¬(p ∨ q) è soddisfacibile?». Sul ramo con p vera la risposta è no, e il ramo accetta. Sul ramo con p falsa resta ¬q, soddisfacibile, e il ramo rifiuta. Basta un ramo che accetta: la risposta è sì (appunti Lez. 9 §3).</p>` : ""}`,
        ],
        [
          "Problemi completi",
          `<p>${QCOMP[lv][isS ? 0 : 1]}.</p>${lv >= 3 ? `<p class="${readit}">QSAT${SUBD(lv)} ${isS ? "" : "(complemento) "}è completo per ${name} per il Teorema 17.10.</p>` : ""}`,
        ],
        [
          `Uguale a ${other}?`,
          `<p>Non si sa. Se ${name} = ${other}, PH collasserebbe al piano ${lv} (Teorema 17.9)${lv === 1 ? ": è la domanda NP = coNP" : ""}. Prova l'ipotesi nel menu sopra la torre.</p>`,
        ],
      ],
    };
  }
  if (n.k === "D") {
    return {
      title: hD(lv),
      sub: `Piano ${lv}, lato deterministico (Δ)`,
      contains,
      inside,
      blocks: [
        [
          "Intuizione",
          `Un algoritmo <b>deterministico</b> polinomiale che può fare domande a un oracolo del piano ${lv - 1}: tante domande quante vuole (un numero polinomiale), e può decidere la domanda successiva in base alle risposte precedenti.`,
        ],
        [
          "Definizione",
          `<div class="${F}">${hD(lv)} = P<sup>${hS(lv - 1)}</sup>${lv === 2 ? " = P<sup>NP</sup>" : ` = P<sup>${npT(lv - 1)}</sup>`}</div><p>Non ha una forma a quantificatori sua: sta <b>tra due piani</b>, perché ${hS(lv - 1)} ∪ ${hPi(lv - 1)} ⊆ ${hD(lv)} ⊆ ${hS(lv)} ∩ ${hPi(lv)}. È chiusa per complemento: una macchina deterministica può scambiare yes e no.</p>`,
        ],
        [
          "Perché sta tra due piani",
          `<p><b>${hS(lv - 1)} ⊆ ${hD(lv)}</b>: si fa una sola domanda all'oracolo e si copia la risposta.</p><p><b>${hPi(lv - 1)} ⊆ ${hD(lv)}</b>: si chiede all'oracolo il complemento e si inverte la risposta.</p><p><b>${hD(lv)} ⊆ ${hS(lv)}</b>: ${hS(lv)} = NP<sup>${hS(lv - 1)}</sup> ha lo stesso oracolo, e una macchina deterministica è una nondeterministica che non usa le scelte.</p><p><b>${hD(lv)} ⊆ ${hPi(lv)}</b>: se L ∈ ${hD(lv)}, anche co-L ∈ ${hD(lv)} ⊆ ${hS(lv)}, quindi L ∈ ${hPi(lv)}.</p>`,
        ],
        [
          "Esempio",
          lv === 2
            ? `<p>«Il giro ottimo costa un numero pari?» Si trova il costo ottimo per bisezione, chiedendo a TSP(D) «c'è un giro di costo ≤ B?» con B dimezzato a ogni passo; le domande sono logaritmiche nel costo massimo, quindi polinomiali. Poi si guarda se è pari (appunti Lez. 9 §2).</p><p>Anche DP sta qui: per SAT-UNSAT bastano due domande a SAT (dispensa cap. 16).</p>`
            : `<p>Un algoritmo polinomiale che fa domande a QSAT${SUBD(lv - 1)}. Il corso non presenta problemi completi per ${hD(lv)}: all'esame serve sapere dove sta.</p>`,
        ],
        [
          "All'esame",
          `<p>Serve come gradino: grazie a Δ, una classe di un piano sta in tutte le classi dei piani sopra, sia Σ sia Π.</p><p>${lv === 2 ? "«SAT-UNSAT si riduce a co-QSAT₃?» SÌ: SAT-UNSAT ∈ DP ⊆ Δ₂ᴾ ⊆ Π₂ᴾ ⊆ Δ₃ᴾ ⊆ Π₃ᴾ, e co-QSAT₃ è Π₃ᴾ-completo, quindi ogni problema di Π₃ᴾ si riduce a lui (dispensa, es. 17.2.1)" : `«QSAT${SUBD(lv - 1)} si riduce a co-QSAT${SUBD(lv)}?» SÌ: QSAT${SUBD(lv - 1)} ∈ ${uS(lv - 1)} ⊆ ${uD(lv)} ⊆ ${uPi(lv)}, e co-QSAT${SUBD(lv)} è ${uPi(lv)}-completo`}.</p>`,
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
        ["Intuizione", "Il pavimento della torre: i problemi risolubili in tempo polinomiale deterministico. Al piano 0 le tre classi coincidono."],
        [
          "Definizione",
          `<div class="${F}">Δ<sub>0</sub><sup>P</sup> = Σ<sub>0</sub><sup>P</sup> = Π<sub>0</sub><sup>P</sup> = P</div><p>Come oracolo P è inutile: P<sup>P</sup> = P e NP<sup>P</sup> = NP, perché ogni domanda si può risolvere sul posto in tempo polinomiale (slide Lez. 9, «Oracoli inutili»). Per questo il piano 1 ridà P, NP e coNP.</p>`,
        ],
        ["All'esame", "Se un problema completo di un piano qualsiasi stesse in P, PH crollerebbe a P (passando per P = NP)."],
      ],
    };
  if (id === "DP")
    return {
      title: "DP",
      sub: "Tra il piano 1 e il piano 2",
      contains,
      inside,
      blocks: [
        ["Intuizione", "Le domande «sì per una parte NP e no per una parte coNP», come «la prima formula è soddisfacibile e la seconda no» (SAT-UNSAT)."],
        [
          "Dove sta",
          `<div class="${F}">NP ∪ coNP ⊆ DP ⊆ P<sup>NP</sup> = Δ<sub>2</sub><sup>P</sup></div><p>Una macchina P<sup>NP</sup> decide SAT-UNSAT con due domande a SAT (dispensa cap. 16). DP non è un piano della torre: è uno scalino in mezzo.</p>`,
        ],
        ["Approfondisci", `<p><a href="/dp" class="inline-block no-underline ${ui.btn}">Apri il Focus DP →</a></p>`],
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
          `<div class="${F}">PH = ⋃<sub>i≥0</sub> Σ<sub>i</sub><sup>P</sup></div><p>Un problema sta in PH se sta in <b>qualche</b> piano. Il numero di alternanze può essere grande quanto si vuole, ma è fissato per ogni problema e non dipende dall'input.</p>`,
        ],
        [
          "Problemi completi",
          "<p>Ogni piano ne ha (QSATᵢ), ma per PH intera non se ne conoscono. Se ce ne fosse uno, PH collasserebbe a un piano finito (Teorema 17.11). Le QBF con alternanze illimitate (QSAT) non sono PH-complete: sono PSPACE-complete.</p>",
        ],
        ["Sopra PH", `<p>PH ⊆ PSPACE (Proposizione 17.1). Se siano uguali è aperto; se lo fossero, PH collasserebbe (corollario del 17.11).</p>`],
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
        `<p>Un problema di Σ<sub>i</sub><sup>P</sup> si decide provando tutti i certificati y₁, …, yᵢ uno alla volta, riusando lo stesso spazio: i certificati sono polinomiali, quindi basta spazio polinomiale (Proposizione 17.1).</p>`,
      ],
      [
        "Il problema completo",
        `<p><b>QSAT</b>: QBF con un numero qualsiasi di alternanze. L'algoritmo Truth delle slide la valuta ricorsivamente in spazio O(n²): per ∃ restituisce b₀ ∨ b₁, per ∀ restituisce b₀ ∧ b₁.</p>`,
      ],
      ["All'esame", "«QSAT ∈ Π₂ᴾ?» altro: solo se PSPACE = Π₂ᴾ, e allora PH collasserebbe al piano 2."],
    ],
  };
}

/* ---------- costruttore di prefissi ---------- */
export type QLetter = "E" | "A";
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
  const raw = QB.map((q, j) => (q === "E" ? "∃" : "∀") + ys(j + 1)).join(" ");
  const blocks: { q: QLetter; v: number[] }[] = [];
  QB.forEach((q, j) => {
    if (blocks.length && blocks[blocks.length - 1].q === q) blocks[blocks.length - 1].v.push(j + 1);
    else blocks.push({ q, v: [j + 1] });
  });
  const k = blocks.length,
    isMerged = blocks.some((b) => b.v.length > 1);
  let expl: string, comp: string, tid: TowerId | null;
  if (!k) {
    expl = "Nessun quantificatore: resta solo il controllo polinomiale R(x).";
    comp = "—";
    tid = "L0";
  } else {
    const isS = blocks[0].q === "E",
      cls = isS ? hS(k) : hPi(k);
    tid = k <= 4 ? (`${isS ? "S" : "P"}${k}` as TowerId) : null;
    expl = `${k} blocc${k === 1 ? "o" : "hi"} alternat${k === 1 ? "o" : "i"}, il primo è ${isS ? "∃" : "∀"}: la classe è ${cls}${k === 1 ? (isS ? " = NP" : " = coNP") : ""}. Una macchina che lo decide: ${isS ? "nondeterministica" : "il complemento di una nondeterministica"} polinomiale con oracolo ${k === 1 ? "P (cioè nessun oracolo utile)" : hS(k - 1)}.`;
    comp = `${isS ? "QSAT" : "co-QSAT"}${SUBD(k)}${k === 1 ? (isS ? " = SAT" : " (= co-SAT)") : ""} è completo per questa classe.`;
  }
  return {
    raw,
    args: QB.length ? ", " + QB.map((_, j) => ys(j + 1)).join(", ") : "",
    merged: isMerged
      ? blocks.map((b) => (b.q === "E" ? "∃" : "∀") + (b.v.length > 1 ? "(" + b.v.map(ys).join(", ") + ")" : ys(b.v[0]))).join(" ")
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
export const cN = (X: RClass) =>
  X.t === "P" ? "P" : X.t === "DP" ? "DP" : X.t === "PSPACE" ? "PSPACE" : X.t === "S" ? hS(lvl(X)) : hPi(lvl(X));

/** A completo per X si riduce a B completo per Y? → ["si" | "altro", perché] */
export function rSub(X: RClass, Y: RClass): ["si" | "altro", string] {
  if (X.t === "P") return ["si", `P è contenuta in ogni classe della torre, quindi P ⊆ ${cN(Y)}.`];
  if (Y.t === "PSPACE") return ["si", `${cN(X)} ⊆ PH ⊆ PSPACE${X.t === "PSPACE" ? " (stessa classe)" : ""}.`];
  if (X.t === "PSPACE")
    return [
      "altro",
      Y.t === "P"
        ? "solo se P = PSPACE (e allora anche PH = P)."
        : `solo se PSPACE ⊆ ${cN(Y)}, cioè PSPACE = PH = ${cN(Y)}: PH avrebbe un problema completo (QSAT) e collasserebbe a un piano finito (corollario del Teorema 17.11).`,
    ];
  if (Y.t === "P")
    return ["altro", `solo se PH = P (collasso al piano 0): ${cN(X)} contiene NP o coNP, quindi ${cN(X)} ⊆ P darebbe P = NP, e allora PH = P (corollario del Teorema 17.9).`];
  if (X.t === "DP" && Y.t === "DP") return ["si", "stessa classe."];
  if (X.t === "DP")
    return lvl(Y) >= 2
      ? ["si", `DP ⊆ Δ₂ᴾ ⊆ Σ₂ᴾ ∩ Π₂ᴾ ⊆ ${cN(Y)}.`]
      : ["altro", `solo se NP = coNP, cioè PH collassa al piano 1: DP contiene ${Y.t === "S" ? "coNP" : "NP"}, quindi DP ⊆ ${cN(Y)} darebbe ${Y.t === "S" ? "coNP ⊆ NP" : "NP ⊆ coNP"}.`];
  if (Y.t === "DP")
    return lvl(X) === 1
      ? ["si", "NP ∪ coNP ⊆ DP."]
      : ["altro", `solo se PH collassa (almeno) al piano 2: ${cN(X)} ⊆ DP ⊆ Δ₂ᴾ ⊆ Σ₂ᴾ ∩ Π₂ᴾ, e ${cN(X)} contiene ${lvl(X) === 2 ? (X.t === "S" ? "Σ₂ᴾ" : "Π₂ᴾ") : "Σ₂ᴾ e Π₂ᴾ"}, quindi Σ₂ᴾ = Π₂ᴾ. Non si sa se scenderebbe fino al piano 1 (dispensa, es. 17.2.1).`];
  const a = lvl(X),
    b = lvl(Y);
  if (a < b) return ["si", `${cN(X)} ⊆ ${hD(a + 1)} ⊆ ${hS(a + 1)} ∩ ${hPi(a + 1)}${a + 1 < b ? " ⊆ …" : ""} ⊆ ${cN(Y)}: ogni piano contiene i precedenti.`];
  if (a === b && X.t === Y.t) return ["si", "stessa classe."];
  if (a === b)
    return ["altro", `solo se ${hS(a)} = ${hPi(a)}, cioè PH collassa al piano ${a} (Teorema 17.9). La riduzione darebbe ${cN(X)} ⊆ ${cN(Y)}, e passando ai complementi anche l'inclusione opposta.`];
  return [
    "altro",
    `solo se PH collassa al piano ${b}: ${cN(X)} contiene sia ${hS(b)} sia ${hPi(b)} (perché ${cN(X)} ⊇ ${hD(b + 1)} ⊇ ${hS(b)} ∪ ${hPi(b)}); se fosse ${cN(X)} ⊆ ${cN(Y)}, anche l'altro lato del piano ${b} starebbe in ${cN(Y)}, quindi ${hS(b)} = ${hPi(b)} (Teorema 17.9).`,
  ];
}
/** nome del problema senza la parentesi sulla classe */
export const shortName = (label: string) => label.replace(/ \(.*/, "");
