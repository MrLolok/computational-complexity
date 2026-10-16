/* Notazione LaTeX dei piani di PH: le formule vanno tra $…$ e si rendono con texHtml / RichHtml / Tex. */
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
export const quant = (q: "E" | "A") => (q === "E" ? "\\exists " : "\\forall ");
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
