import type { ClassId } from "@/data/classes/classes";

/* Disegno della mappa delle classi: posizioni e misure dei riquadri, parentesi laterali, archi senza badge. */
/** posizione del centro del riquadro nella mappa SVG (viewBox 760 × 1250) */
export const POS: Record<ClassId, [number, number]> = {
    RE: [275, 60],
    coRE: [465, 60],
    R: [370, 150],
    NEXP: [370, 240],
    EXP: [370, 320],
    PSPACE: [370, 400],
    PH: [370, 480],
    SIGMAi: [285, 560],
    PIi: [455, 560],
    SIGMA2: [285, 640],
    PI2: [455, 640],
    DELTA2: [370, 720],
    DP: [370, 800],
    NP: [285, 880],
    coNP: [455, 880],
    NPcapcoNP: [370, 960],
    P: [370, 1040],
    NL: [370, 1120],
    L: [370, 1200],
};
/** larghezza del riquadro nella mappa */
export const NODE_W: Record<ClassId, number> = {
    L: 170,
    NL: 170,
    P: 170,
    NPcapcoNP: 170,
    NP: 150,
    coNP: 150,
    DP: 170,
    DELTA2: 170,
    SIGMA2: 150,
    PI2: 150,
    SIGMAi: 150,
    PIi: 150,
    PH: 170,
    PSPACE: 170,
    EXP: 170,
    NEXP: 170,
    R: 170,
    RE: 150,
    coRE: 150,
};
export const NODE_H = 52;
/** parentesi laterali nella mappa: [A, B, lato, x, dA, dB] */
export const SEP_DRAW: [ClassId, ClassId, "left" | "right", number, number, number][] = [
    ["L", "PSPACE", "left", 62, 0, 10],
    ["NL", "PSPACE", "left", 100, 0, -10],
    ["NP", "NEXP", "left", 150, 0, 0],
    ["P", "EXP", "right", 612, 0, 0],
];
/** archi della mappa senza il badge ⊆ / ⊊ */
export const NOBADGE = new Set<string>(["SIGMA2>PIi", "PI2>SIGMAi"]);
