"use client";

import { useState } from "react";
import { analyzePrefix, readit, type QLetter } from "@/lib/piani";
import { ui } from "@/lib/ui";
import { formulaBtn } from "./styles";
import { selectTower } from "./towerSelection";

/** costruttore di prefissi: blocchi di quantificatori davanti a R → classe della torre */
export default function PrefixBuilder() {
  const [QB, setQB] = useState<QLetter[]>(["E", "A"]);
  const P = analyzePrefix(QB);
  const full = QB.length >= 7;

  const show = () => {
    if (!P.tid) return;
    selectTower(P.tid);
    document.getElementById("towercard")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        <button type="button" className={formulaBtn} disabled={full} onClick={() => setQB([...QB, "E"])}>
          + ∃
        </button>
        <button type="button" className={formulaBtn} disabled={full} onClick={() => setQB([...QB, "A"])}>
          + ∀
        </button>
        <button type="button" className={formulaBtn} disabled={!QB.length} onClick={() => setQB(QB.slice(0, -1))}>
          ⌫ togli l&apos;ultimo
        </button>
        <button type="button" className={formulaBtn} onClick={() => setQB([])}>
          azzera
        </button>
      </div>
      <div className="flex flex-col gap-[0.6rem]" aria-live="polite">
        <div className={ui.formula}>
          {P.raw ? P.raw + " " : ""}R(x{P.args})
        </div>
        {P.merged && (
          <>
            <div className={ui.formula}>{P.merged} R(…)</div>
            <p className={ui.noteOk}>
              <b className="font-ui font-semibold">Blocchi uguali vicini si fondono.</b> «∃y ∃z» vuol dire «esiste la coppia (y, z)»: un solo
              certificato, ancora di lunghezza polinomiale. È il passo chiave della prova del Teorema 17.9. Conta quindi il numero di{" "}
              <b>alternanze</b>, non di quantificatori.
            </p>
          </>
        )}
        <p className="[&_sub]:text-[0.7em] [&_sup]:text-[0.7em]" dangerouslySetInnerHTML={{ __html: P.expl }} />
        <p className={readit}>{P.comp}</p>
        {P.tid ? (
          <p>
            <button type="button" className={ui.btn} onClick={show}>
              Mostrala nella torre ↑
            </button>
          </p>
        ) : (
          <p className={ui.hint}>Il piano {P.k} non è disegnato nella torre (si ferma al 4), ma funziona allo stesso modo.</p>
        )}
      </div>
    </>
  );
}
