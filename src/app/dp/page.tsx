import type { Metadata } from "next";
import ClassChip from "@/components/ClassChip";
import ExactTsp from "@/components/dp/ExactTsp";
import SatUnsat from "@/components/dp/SatUnsat";
import TrueFalse from "@/components/dp/TrueFalse";
import { ExamQA, QA } from "@/components/piani/ExamQA";
import { card, cardGrid, cardWide, h3, hero, heroBig, src, table } from "@/components/piani/styles";
import { EXAM_QUESTIONS } from "@/data/examQuestions";
import type { ClassId } from "@/data/classes";
import { readit } from "@/lib/piani";
import { classColor, ui } from "@/lib/ui";

export const metadata: Metadata = { title: "DP" };

/** nodo del disegno "Dove sta DP" */
function Box({ id, x, y, w, h = 30, label, strong, small }: { id: ClassId; x: number; y: number; w: number; h?: number; label: string; strong?: boolean; small?: boolean }) {
  return (
    <g style={classColor(id)}>
      <rect x={x} y={y} width={w} height={h} rx={8} className={`stroke-(--c) ${strong ? "fill-(--c)/30 stroke-[2.5]" : "fill-(--c)/14"}`} />
      <text x={x + w / 2} y={y + (small ? 18 : 20)} textAnchor="middle" className={`fill-ink ${small ? "text-[13px]" : ""}`}>
        {label}
      </text>
    </g>
  );
}

export default function Page() {
  const dpQuestions = EXAM_QUESTIONS.filter((t) => t.c.includes("DP"));
  return (
    <section aria-labelledby="dp-title" className="flex flex-col">
      <div className={`${hero} mb-[18px]`} style={classColor("DP")}>
        <span className={ui.eyebrow}>Focus · Lezione 9 §1</span>
        <h2 id="dp-title" className={ui.h2}>
          DP: due controlli sulla stessa istanza
        </h2>
        <p className={heroBig}>
          DP non vuol dire &quot;deterministic polynomial&quot;. Un problema sta in DP se la risposta sì richiede di superare insieme un controllo NP
          e un controllo coNP.
        </p>
        <div className={ui.formula}>L ∈ DP ⇔ L = L₁ ∩ L₂ con L₁ ∈ NP e L₂ ∈ coNP</div>
        <p className={readit}>
          L₁ chiede &quot;esiste qualcosa?&quot; (un certificato corto), L₂ chiede &quot;non esiste qualcosa?&quot; (nessuna squalifica corta).
          Fonte: dispensa cap. 15, slide Lez. 9.
        </p>
        <div className={ui.noteExt}>
          <b className="font-ui font-semibold">Aggiunta esterna: perché &quot;D&quot;.</b> Nel libro di Papadimitriou la D sta per
          &quot;differenza&quot;: L₁ ∩ L₂ è uguale a L₁ ∖ L₃, dove L₃ è il complemento di L₂ e sta in NP. Quindi DP raccoglie le differenze di due
          linguaggi NP. Dispensa e slide non spiegano il nome.
        </div>
      </div>

      <div className={cardGrid}>
        <div className={card}>
          <h3 className={h3}>Prova tu: EXACT TSP</h3>
          <p>
            Una mappa ha tre giri possibili, di costo 10, 12 e 15. EXACT TSP chiede: <b>il giro più corto costa esattamente B?</b>
          </p>
          <ExactTsp />
          <p className={readit}>
            L₁ è TSP(D), in NP: il certificato è un giro di costo ≤ B. L₂ è il complemento di TSP(D) con soglia B − 1, in coNP. Esempio degli
            appunti Lez. 9 §1.
          </p>
        </div>

        <div className={card}>
          <h3 className={h3}>Prova tu: SAT-UNSAT</h3>
          <p>
            Date due formule φ e φ′, la risposta è sì se <b>φ è soddisfacibile e φ′ non lo è</b>.
          </p>
          <SatUnsat />
          <p className={readit}>
            È DP-completo: ogni problema DP diventa &quot;una formula da soddisfare&quot; (perché SAT è NP-completo) e &quot;una formula che non
            deve essere soddisfacibile&quot; (perché UNSAT è coNP-completo). Dispensa cap. 15, Teorema.
          </p>
        </div>

        <div className={cardWide}>
          <h3 className={h3}>Dove sta DP</h3>
          <div className="overflow-x-auto">
            <svg
              viewBox="0 0 760 250"
              role="img"
              aria-label="Posizione di DP rispetto a NP, coNP, NP ∩ coNP e P^NP"
              className="mx-auto block h-auto w-full max-w-[760px] min-w-[480px]"
            >
              <g className="font-mono text-[14px] font-semibold">
                <g className="stroke-muted stroke-[1.5]">
                  <line x1="320" y1="214" x2="320" y2="186" />
                  <line x1="300" y1="156" x2="220" y2="130" />
                  <line x1="340" y1="156" x2="420" y2="130" />
                  <line x1="220" y1="100" x2="300" y2="74" />
                  <line x1="420" y1="100" x2="340" y2="74" />
                  <line x1="320" y1="44" x2="320" y2="26" />
                </g>
                <Box id="P" x={270} y={214} w={100} label="P" />
                <Box id="NPcapcoNP" x={250} y={156} w={140} label="NP ∩ coNP" />
                <Box id="NP" x={170} y={100} w={100} label="NP" />
                <Box id="coNP" x={370} y={100} w={100} label="coNP" />
                <Box id="DP" x={270} y={44} w={100} label="DP" strong />
                <Box id="DELTA2" x={270} y={0} w={100} h={26} label="P^NP" small />
              </g>
              <g className="fill-muted font-ui text-[12px]">
                <text x="390" y="56">
                  sopra NP e coNP: le contiene
                </text>
                <text x="390" y="72">
                  entrambe (NP ∪ coNP ⊆ DP)
                </text>
                <text x="80" y="168">
                  sotto NP e coNP: è la
                </text>
                <text x="80" y="184">
                  loro parte comune
                </text>
                <text x="390" y="17">
                  DP ⊆ P^NP: bastano 2 domande
                </text>
              </g>
            </svg>
          </div>
          <p>
            La catena:{" "}
            <span className="font-mono text-[0.86em]">
              P ⊆ NP ∩ coNP ⊆ NP, coNP ⊆ DP ⊆ P<sup>NP</sup> = Δ₂ᴾ ⊆ Σ₂ᴾ ∩ Π₂ᴾ
            </span>
            . Nessuna di queste inclusioni è dimostrata stretta. Le slide aggiungono che è plausibile che esistano problemi in DP che non stanno
            nemmeno in NP ∪ coNP.
          </p>
          <p>Se NP = coNP, tutto collassa: DP = NP, e un problema DP-completo come EXACT TSP diventerebbe anche Σ₂ᴾ-completo (traccia F14).</p>
        </div>

        <div className={cardWide}>
          <h3 className={h3}>DP, NP ∩ coNP e NP ∪ coNP</h3>
          <div className="overflow-x-auto">
            <table className={table}>
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <ClassChip id="DP" />
                  </th>
                  <th>
                    <ClassChip id="NPcapcoNP" />
                  </th>
                  <th>NP ∪ coNP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Che cosa si interseca</td>
                  <td>
                    due <b>linguaggi</b>: le istanze sì stanno sia in L₁ ∈ NP sia in L₂ ∈ coNP
                  </td>
                  <td>
                    due <b>classi</b>: il problema stesso sta in NP e in coNP
                  </td>
                  <td>non si interseca: il problema sta in almeno una delle due</td>
                </tr>
                <tr>
                  <td>Quante prove</td>
                  <td>
                    <b>due controlli</b> su ogni istanza sì: un certificato per L₁ e nessuna squalifica per L₂
                  </td>
                  <td>
                    <b>una</b> prova per istanza: certificato se sì, squalifica se no
                  </td>
                  <td>una prova, in un solo verso</td>
                </tr>
                <tr>
                  <td>Dove sta</td>
                  <td>sopra NP e coNP</td>
                  <td>sotto NP e coNP</td>
                  <td>tra le due: NP ∩ coNP ⊆ NP ∪ coNP ⊆ DP</td>
                </tr>
                <tr>
                  <td>Problemi completi</td>
                  <td>sì: SAT-UNSAT, EXACT TSP</td>
                  <td>non se ne conoscono</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Esempio</td>
                  <td>EXACT TSP: &quot;esiste un giro ≤ B&quot; e &quot;nessun giro &lt; B&quot;</td>
                  <td>2-COLORING: colorazione oppure ciclo dispari</td>
                  <td>SAT (sta in NP), VALIDITY (sta in coNP)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={src}>
            <b>Fonti:</b> dispensa cap. 15 («DP is not NP ∩ coNP»); slide Lez. 9; appunti Lez. 9 §1. La riga NP ∪ coNP è ricavata da NP ⊆ DP e
            coNP ⊆ DP.
          </p>
        </div>

        <div className={card}>
          <h3 className={h3}>Vero, falso o non si sa?</h3>
          <TrueFalse />
        </div>

        <div className={card}>
          <h3 className={h3}>DP nelle tracce</h3>
          <>
            {dpQuestions.map((t, i) => (
              <ExamQA key={i} t={t} />
            ))}
            <QA q="Esiste una riduzione da SAT-UNSAT a QSAT₃? (dispensa, esercizio 17.2.1)">
              <div>
                <b>SÌ</b>
              </div>
              <div>
                SAT-UNSAT è DP-completo e QSAT₃ è Σ₃ᴾ-completo; DP ⊆ Δ₂ᴾ ⊆ Σ₃ᴾ. Nel verso opposto: non si sa, e varrebbe solo se Σ₃ᴾ = DP, con
                collasso di PH almeno al secondo livello.
              </div>
            </QA>
            <QA q="Altri problemi DP-completi (non chiesti all'esame)">
              <div>
                CRITICAL SAT: φ è insoddisfacibile, ma togliendo una qualunque clausola diventa soddisfacibile. CRITICAL HAMILTON PATH e CRITICAL
                3-COLORING seguono lo stesso schema. UNIQUE SAT (esattamente un assegnamento) sta in DP, non si sa se sia completo.
              </div>
              <div className={src}>Dispensa cap. 15; appunti Lez. 9 §1.</div>
            </QA>
          </>
        </div>
      </div>
    </section>
  );
}
