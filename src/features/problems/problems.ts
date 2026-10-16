import type { ClassId } from "@/data/classes/classes";
import type { LadderId, Problem, Trap } from "@/data/problems/problems";

import { TEX } from "@/data/classes/classes";
import { LADDER, LADDER_ROWS, LINKS, PROBLEMS } from "@/data/problems/problems";
import { htmlToPlain, searchKey } from "@/lib/plainText";

/* Logica della scheda Problemi (dal modulo PB della pagina). */

/** classificazione del problema da mostrare con texHtml: la classe precisa (Σ₂ᴾ, Π₂ᴾ) o il gradino */
export const classLabel = (p: Problem) => (p.c ? `$${TEX[p.c as ClassId]}$` : LADDER[p.b].n);

/** gradini della scala nell'ordine delle righe (dal basso) */
export const LADDER_BANDS: LadderId[] = LADDER_ROWS.flat();

/** collegamenti tra problemi, nei due versi, più il complemento quando non è già tra i collegamenti */
export const RELATED: Record<string, [string, string][]> = {};
LINKS.forEach(([a, b, t]) => {
    (RELATED[a] ||= []).push([b, t]);
    (RELATED[b] ||= []).push([a, t]);
});
PROBLEMS.forEach((p) => {
    if (p.cpl && !(RELATED[p.id] || []).some((r) => r[0] === p.cpl))
        (RELATED[p.id] ||= []).push([p.cpl, "complemento"]);
});

const norm = (s: string) => searchKey(htmlToPlain(s)).replace(/[^a-z0-9]/g, "");

/** classe che dà il colore al problema: quella precisa (Σ₂ᴾ, Π₂ᴾ) o il gradino */
export const colorId = (p: Problem) => (p.c || p.b) as ClassId;

export const trapAnswer = (t: Trap) => (t.a === "altro" ? "altro: " + t.ac : t.a);

export function matches(p: Problem, query: string, filt: Set<string>, onlyComplete: boolean) {
    const q = norm(query);
    const okQ = !q || norm(p.name).includes(q) || norm(p.al || "").includes(q);
    const okF = !filt.size || filt.has(p.b);
    return okQ && okF && (!onlyComplete || !!p.full);
}
