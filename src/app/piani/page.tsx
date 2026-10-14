import type { Metadata } from "next";
import { EXAM_QUESTIONS } from "@/data/examQuestions";
import { PH_CLASSES } from "@/data/piani";
import { readit } from "@/lib/piani";
import { classColor, ui } from "@/lib/ui";
import { ExamQA } from "@/components/piani/ExamQA";
import PianiTower from "@/components/piani/PianiTower";
import PrefixBuilder from "@/components/piani/PrefixBuilder";
import QbfEval from "@/components/piani/QbfEval";
import Reductions from "@/components/piani/Reductions";
import { card, cardGrid, cardWide, h3, hero, heroBig, src, table } from "@/components/piani/styles";

export const metadata: Metadata = { title: "Piani di PH" };

const S = (i: string) => (
  <>
    Σ<sub>{i}</sub>
    <sup>P</sup>
  </>
);
const Pi = (i: string) => (
  <>
    Π<sub>{i}</sub>
    <sup>P</sup>
  </>
);
const D = (i: string) => (
  <>
    Δ<sub>{i}</sub>
    <sup>P</sup>
  </>
);

export default function Page() {
  const phQuestions = EXAM_QUESTIONS.filter((t) => t.c.some((c) => PH_CLASSES.includes(c)));
  return (
    <section aria-labelledby="piani-title" className="flex flex-col">
      <div className={`${hero} mb-[18px]`} style={classColor("PH")}>
        <span id="piani-title" className={ui.eyebrow}>
          Gerarchia polinomiale, piano per piano
        </span>
        <div className={heroBig}>
          Ogni piano ha tre classi: Δᵢᴾ (deterministica), Σᵢᴾ (comincia con «esiste») e Πᵢᴾ (comincia con «per ogni»). Ogni piano usa come
          oracolo la classe Σ del piano sotto.
        </div>
        <p>
          Al piano 1 ci sono P, NP e coNP; al piano 2 le stesse tre macchine con un oracolo NP; e così via. La stessa torre si legge anche con i
          quantificatori: <b>ogni oracolo vale un blocco di quantificatori in più</b> (Teorema 17.8). PH è l&apos;unione di tutti i piani.
        </p>
      </div>

      <PianiTower />

      <div className={`${cardGrid} mt-[18px]`}>
        <div className={card}>
          <h3 className={h3}>Σ, Π e Δ: che cosa vogliono dire</h3>
          <table className={table}>
            <tbody>
              <tr>
                <td>{S("i")}</td>
                <td>
                  la risposta sì è «<b>esiste</b> … per ogni … esiste …» con i blocchi, poi un controllo polinomiale. Macchina NP con oracolo{" "}
                  {S("i−1")}.
                </td>
              </tr>
              <tr>
                <td>{Pi("i")}</td>
                <td>
                  la stessa forma, ma comincia con «<b>per ogni</b>». Sono i complementi dei problemi di {S("i")}.
                </td>
              </tr>
              <tr>
                <td>{D("i")}</td>
                <td>
                  algoritmo <b>deterministico</b> polinomiale con oracolo {S("i−1")}. Non ha forma a quantificatori: sta tra il piano i−1 e il
                  piano i.
                </td>
              </tr>
              <tr>
                <td>la P in alto</td>
                <td>ricorda che si parla di tempo polinomiale; alcuni testi scrivono Σ<sub>i</sub><sup>p</sup>.</td>
              </tr>
            </tbody>
          </table>
          <p>
            Nella valutazione di una QBF (algoritmo Truth delle slide) ∃ si calcola come un <b>OR</b> dei due rami e ∀ come un <b>AND</b>: lo
            vedi nell&apos;albero qui accanto.
          </p>
          <div className={ui.noteExt}>
            <b className="font-ui font-semibold">Esterno al corso: perché proprio «somma» e «prodotto».</b> Dispensa e slide non spiegano le
            lettere. Un modo comune di ricordarle: Σ è il simbolo della sommatoria e Π quello della produttoria. Nell&apos;algebra di Boole
            l&apos;OR si scrive come una somma e l&apos;AND come un prodotto, e «esiste y» è un grande OR su tutti gli y, «per ogni y» un grande
            AND. Quindi Σ = comincia con ∃ (somma, OR), Π = comincia con ∀ (prodotto, AND). La notazione è presa dalla gerarchia aritmetica
            della logica matematica.
          </div>
        </div>

        <div className={card}>
          <h3 className={h3}>Valuta una QBF: ∃ è un OR, ∀ è un AND</h3>
          <QbfEval />
        </div>

        <div className={card}>
          <h3 className={h3}>Costruisci il prefisso e trova il piano</h3>
          <p>Aggiungi blocchi di quantificatori davanti a un controllo polinomiale R e guarda in che classe finisce il problema.</p>
          <PrefixBuilder />
          <p className={src}>
            <b>Fonte:</b> Corollario 2 del Teorema 17.8 e prova del Teorema 17.9 (dispensa cap. 17); appunti Lez. 9 §3.
          </p>
        </div>

        <div className={card}>
          <h3 className={h3}>Le inclusioni, una per una</h3>
          <div className={ui.formula}>
            {S("i")} ∪ {Pi("i")} ⊆ {D("i+1")} ⊆ {S("i+1")} ∩ {Pi("i+1")}
          </div>
          <div className="overflow-x-auto">
            <table className={table}>
              <thead>
                <tr>
                  <th>Inclusione</th>
                  <th>Perché vale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {S("i")} ⊆ {D("i+1")}
                  </td>
                  <td>una macchina P con oracolo {S("i")} chiede «x ∈ L?» una volta e copia la risposta.</td>
                </tr>
                <tr>
                  <td>
                    {Pi("i")} ⊆ {D("i+1")}
                  </td>
                  <td>come sopra, chiedendo del complemento (che sta in {S("i")}) e invertendo la risposta.</td>
                </tr>
                <tr>
                  <td>
                    {D("i+1")} ⊆ {S("i+1")}
                  </td>
                  <td>una macchina deterministica è una nondeterministica con una sola scelta a ogni passo.</td>
                </tr>
                <tr>
                  <td>
                    {D("i+1")} ⊆ {Pi("i+1")}
                  </td>
                  <td>
                    {D("i+1")} è chiusa per complemento, quindi anche il complemento di L sta in {S("i+1")}, e L sta in co{S("i+1")} ={" "}
                    {Pi("i+1")}.
                  </td>
                </tr>
                <tr>
                  <td>piano i ⊆ piano i+1</td>
                  <td>segue dalle righe sopra passando per {D("i+1")}.</td>
                </tr>
                <tr>
                  <td>PH ⊆ PSPACE</td>
                  <td>si provano tutti i certificati uno alla volta riusando lo spazio (Proposizione 17.1).</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={readit}>
            Al piano 2: NP ∪ coNP ⊆ DP ⊆ Δ₂ᴾ ⊆ Σ₂ᴾ ∩ Π₂ᴾ. <b>Nessuna</b> di queste inclusioni è dimostrata stretta, anche se si crede che lo siano
            tutte.
          </p>
          <p className={src}>
            <b>Fonti:</b> dispensa cap. 17 («the three classes at each level are related by the same inclusions»); appunti Lez. 9 §3.
          </p>
        </div>

        <div className={cardWide}>
          <h3 className={h3}>Riduzioni tra problemi dei piani</h3>
          <Reductions />
        </div>

        <div className={cardWide}>
          <h3 className={h3}>Ricette per i collassi</h3>
          <div className="overflow-x-auto">
            <table className={table}>
              <thead>
                <tr>
                  <th>Se sai che…</th>
                  <th>allora…</th>
                  <th>perché</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {S("i")} = {Pi("i")} per qualche i ≥ 1
                  </td>
                  <td>PH = {S("i")}: collasso al piano i</td>
                  <td>Teorema 17.9</td>
                </tr>
                <tr>
                  <td>
                    {S("i+1")} = {S("i")}, oppure {S("i+1")} ⊆ {Pi("i")}
                  </td>
                  <td>collasso al piano i</td>
                  <td>
                    {S("i")} ⊆ {S("i+1")} ⊆ {Pi("i")}, e passando ai complementi {Pi("i")} ⊆ {S("i")}
                  </td>
                </tr>
                <tr>
                  <td>P = NP, o anche solo NP = coNP</td>
                  <td>collasso al piano 1 (con P = NP, PH = P)</td>
                  <td>corollario del Teorema 17.9</td>
                </tr>
                <tr>
                  <td>
                    un problema {S("i+1")}-completo sta in {S("i")}
                  </td>
                  <td>collasso al piano i</td>
                  <td>ogni piano è chiuso rispetto alle riduzioni</td>
                </tr>
                <tr>
                  <td>
                    QSAT<sub>i</sub> si riduce a co-QSAT<sub>i</sub>
                  </td>
                  <td>collasso al piano i</td>
                  <td>
                    dà {S("i")} ⊆ {Pi("i")}, e passando ai complementi l&apos;inclusione opposta
                  </td>
                </tr>
                <tr>
                  <td>PH ha un problema completo, oppure PH = PSPACE (o PH = EXP, che lo implica)</td>
                  <td>PH collassa a un piano finito</td>
                  <td>Teorema 17.11 e corollario</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={readit}>Esempio (F07): se Π₁ᴾ = Π₄ᴾ, allora NP ⊆ Σ₂ᴾ ⊆ Π₄ᴾ = coNP, quindi NP = coNP e PH = NP.</p>
          <p className={src}>
            <b>Fonti:</b> dispensa cap. 17; appunti Lez. 9 §3 e Lez. 11 §3.
          </p>
        </div>

        <div className={cardWide}>
          <h3 className={h3}>Domande d&apos;esame sui piani</h3>
          <div className="flex flex-col gap-2">
            <p className={ui.hint}>
              {phQuestions.length} domande delle tracce toccano i piani di PH. Apri una domanda per vedere risposta e motivo.
            </p>
            {phQuestions.map((t, i) => (
              <ExamQA key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
