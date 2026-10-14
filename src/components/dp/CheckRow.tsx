import type { ReactNode } from "react";

const TAG = {
  NP: "bg-c-NP/16 text-c-NP",
  coNP: "bg-c-coNP/16 text-c-coNP",
};

/** una riga del controllo: etichetta NP/coNP, domanda, esito sì/no (va dentro una griglia a 3 colonne) */
export function CheckRow({ tag, ok, children }: { tag: keyof typeof TAG; ok: boolean; children: ReactNode }) {
  return (
    <>
      <span className={`justify-self-start rounded-md px-2 py-0.5 font-ui text-xs font-semibold ${TAG[tag]}`}>{tag}</span>
      <span>{children}</span>
      <span className={`font-ui font-bold ${ok ? "text-ok" : "text-proved"}`}>{ok ? "sì" : "no"}</span>
    </>
  );
}
