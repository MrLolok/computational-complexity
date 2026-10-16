import type { ClassId } from "@/data/classes/classes";
import type { LadderId, Problem, Trap } from "@/data/problems/problems";

import { TEX } from "@/data/classes/classes";
import { LADDER, LINKS, PROBLEMS, ROWS } from "@/data/problems/problems";

/* Logica della scheda Problemi (dal modulo PB della pagina). */

/** classificazione del problema da mostrare con texHtml: la classe precisa (Σ₂ᴾ, Π₂ᴾ) o il gradino */
export const classLabel = (p: Problem) => (p.c ? `$${TEX[p.c as ClassId]}$` : LADDER[p.b].n);

/** gradini della scala nell'ordine delle righe (dal basso) */
export const BANDS: LadderId[] = ROWS.flat();

/** collegamenti tra problemi, nei due versi, più il complemento quando non è già tra i collegamenti */
export const REL: Record<string, [string, string][]> = {};
LINKS.forEach(([a, b, t]) => {
    (REL[a] ||= []).push([b, t]);
    (REL[b] ||= []).push([a, t]);
});
PROBLEMS.forEach((p) => {
    if (p.cpl && !(REL[p.id] || []).some((r) => r[0] === p.cpl)) (REL[p.id] ||= []).push([p.cpl, "complemento"]);
});

export const plain = (h: string) => h.replace(/<[^>]+>/g, "");
export const norm = (s: string) =>
    plain(s)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]/g, "");

/** classe che dà il colore al problema: quella precisa (Σ₂ᴾ, Π₂ᴾ) o il gradino */
export const colorId = (p: Problem) => (p.c || p.b) as ClassId;

/** risposta SÌ / NO / altro → chiave delle classi di colore */
export const ansKey = (a: Trap["a"]) => (a === "SÌ" ? "SI" : a === "NO" ? "NO" : "ALTRO");
export const trapAnswer = (t: Trap) => (t.a === "altro" ? "altro: " + t.ac : t.a);

export function matches(p: Problem, query: string, filt: Set<string>, onlyComplete: boolean) {
    const q = norm(query);
    const okQ = !q || norm(p.name).includes(q) || norm(p.al || "").includes(q);
    const okF = !filt.size || filt.has(p.b);
    return okQ && okF && (!onlyComplete || !!p.full);
}
