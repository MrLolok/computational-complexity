import type { Qbf, Quant } from "@/data/hierarchy/qbf";

/* Alberi di valutazione delle QBF. */
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
