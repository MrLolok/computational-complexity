"use client";

import type { QLetter } from "@/lib/piani";

import { useState } from "react";

import Arrow from "@/components/Arrow";
import Tex from "@/components/Tex";
import { analyzePrefix, readit } from "@/lib/piani";
import { texHtml } from "@/lib/tex";
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
                <button
                    type="button"
                    className={formulaBtn}
                    disabled={!QB.length}
                    onClick={() => setQB(QB.slice(0, -1))}
                >
                    ⌫ togli l&apos;ultimo
                </button>
                <button type="button" className={formulaBtn} onClick={() => setQB([])}>
                    azzera
                </button>
            </div>
            <div className="flex flex-col gap-2.5" aria-live="polite">
                <div className={ui.formula}>
                    <Tex>{`${P.raw ? P.raw + "\\ " : ""}R(x${P.args})`}</Tex>
                </div>
                {P.merged && (
                    <>
                        <div className={ui.formula}>
                            <Tex>{`${P.merged}\\ R(\\ldots)`}</Tex>
                        </div>
                        <p className={ui.noteOk}>
                            <b className="font-ui font-semibold">Blocchi uguali vicini si fondono.</b> «
                            <Tex>{String.raw`\exists y\ \exists z`}</Tex>» vuol dire «esiste la coppia{" "}
                            <Tex>{"(y, z)"}</Tex>»: un solo certificato, ancora di lunghezza polinomiale. È il passo
                            chiave della prova del Teorema 17.9. Conta quindi il numero di <b>alternanze</b>, non di
                            quantificatori.
                        </p>
                    </>
                )}
                <p dangerouslySetInnerHTML={{ __html: texHtml(P.expl) }} />
                <p className={readit} dangerouslySetInnerHTML={{ __html: texHtml(P.comp) }} />
                {P.tid ? (
                    <p>
                        <button type="button" className={ui.btn} onClick={show}>
                            Mostrala nella torre <Arrow shape="up" />
                        </button>
                    </p>
                ) : (
                    <p className={ui.hint}>
                        Il piano {P.k} non è disegnato nella torre (si ferma al 4), ma funziona allo stesso modo.
                    </p>
                )}
            </div>
        </>
    );
}
