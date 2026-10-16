/** Risposta data a una domanda SÌ / NO / altro. */
export type Choice = "SI" | "NO" | "ALTRO";
/** i tre bottoni di risposta, con la loro etichetta */
export const CHOICES: [Choice, string][] = [
    ["SI", "SÌ"],
    ["NO", "NO"],
    ["ALTRO", "altro"],
];

/** risposta scritta nei dati ("SÌ", "<b>NO</b>, perché…", "altro") come Choice */
export const toChoice = (answer = ""): Choice => {
    const a = answer.replace(/<[^>]+>/g, "");
    return a.startsWith("SÌ") ? "SI" : a.startsWith("NO") ? "NO" : "ALTRO";
};
