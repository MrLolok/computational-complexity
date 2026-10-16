import type { TowerId } from "@/data/hierarchy/tower";

import { TOWER_EDGES, TOWER_NODES } from "@/data/hierarchy/tower";

/* Torre dei piani: catene di inclusioni del nodo scelto e misure del disegno. */
/** classi della torre raggiungibili da id seguendo le inclusioni verso l'alto o verso il basso */
function reach(id: TowerId, up: boolean): Set<TowerId> {
    const out = new Set<TowerId>(),
        st: TowerId[] = [id];
    while (st.length) {
        const a = st.pop();
        TOWER_EDGES.forEach(([x, y]) => {
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
export const towerAbove = (id: TowerId) => reach(id, true);
/** classi della torre contenute in id (tutte quelle sotto) */
export const towerBelow = (id: TowerId) => reach(id, false);
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
        const n = TOWER_NODES[id];
        const w = nodeWidth(id) / 2;
        x0 = Math.min(x0, n.x - w);
        x1 = Math.max(x1, n.x + w);
        y0 = Math.min(y0, n.y - 22);
        y1 = Math.max(y1, n.y + 22);
    });
    return { x: x0 - 12, y: y0 - 24, width: x1 - x0 + 24, height: y1 - y0 + 36, lx: x0 - 4, ly: y0 - 9 };
}
