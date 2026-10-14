import Link from "next/link";
import { VER } from "@/data/problems";
import { THEOREMS } from "@/data/theorems";
import { Html, SourceBadge } from "@/components/problems/bits";
import { ui } from "@/lib/ui";

const prose = "flex max-w-[74ch] flex-col gap-3 [&_ul]:m-0 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-[7px] [&_ul]:pl-5";
const h2 = "mb-2.5 font-head text-[1.05rem] font-semibold leading-tight";
const h3 = "mt-2.5 font-head text-[1.28rem] font-semibold leading-tight";

/** riquadri "Correzione" dei teoremi */
function TheoremFixes() {
  const fix = THEOREMS.filter((t) => t.correzione);
  if (!fix.length) return null;
  return (
    <div>
      <h3 className={h3}>Nei teoremi</h3>
      <ul>
        {fix.map((t) => (
          <li key={t.id}>
            <Link href={`/teoremi#teorema-${t.id}`} className="text-accent underline decoration-1 underline-offset-2" dangerouslySetInnerHTML={{ __html: t.nome }} />
            : <Html html={t.correzione} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SourcesView() {
  return (
    <section className="flex flex-col">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-9 gap-y-7">
        <div className={prose}>
          <h2 className={h2}>Fonti del corso</h2>
          <p>
            Dispensa <i>Computational Complexity</i> (M. Mignogna, 2025): cap. 1 (R, RE), 2.6 (L), 5–11 (classi, gerarchie, Savitch), 12–13
            (NP-completezza), 14 (coNP), 15 (DP), 16 (oracoli), 17 (PH), 19 (giochi), 21–22 (NEXP, riepilogo). Slide di P. A. Bonatti, Lezioni 1–9.
            Appunti delle Lezioni 3–11 su Notion e pagine delle tracce risolte.
          </p>
          <p className="flex flex-wrap items-center gap-2">
            <SourceBadge kind="d">Dispensa</SourceBadge>
            <SourceBadge kind="s">Slide</SourceBadge>
            <SourceBadge kind="a">Appunti</SourceBadge>
            <SourceBadge kind="x">Fuori dalle fonti</SourceBadge> sono le etichette usate nelle schede dei problemi.
          </p>
          <p>
            Ogni affermazione è stata controllata su queste fonti. Quando un&apos;affermazione non c&apos;è, è separata e marcata con ✱ o con
            l&apos;etichetta <span className={ui.pillExt}>esterno</span>; le affermazioni delle fonti sbagliate o non dimostrate stanno nei riquadri{" "}
            <b>Correzione</b>.
          </p>
        </div>
        <div className={prose}>
          <h2 className={h2}>Aggiunte esterne e conseguenze ricavate</h2>
          <ul>
            <li>
              <span className={ui.pillExt}>esterno</span> Il significato della D di DP (&quot;differenza&quot;) viene dal libro di Papadimitriou, non
              da dispensa o slide.
            </li>
            <li>
              <span className={ui.pillExt}>esterno</span> Il promemoria «Σ = somma = OR = ∃, Π = prodotto = AND = ∀» e l&apos;origine della
              notazione dalla gerarchia aritmetica (scheda Piani di PH): dispensa e slide non spiegano le lettere. Che ∃ si valuti come OR e ∀ come
              AND invece è nelle slide (algoritmo Truth).
            </li>
            <li>
              <span className={ui.pillExt}>esterno</span> Il nome Immerman–Szelepcsényi per NL = coNL: le slide della Lez. 4 dicono solo che per lo
              spazio nondeterministico la chiusura per complemento si dimostra.
            </li>
            <li>
              <span className={ui.pillExt}>✱ solo appunti</span> NL-completezza di REACHABILITY e 2-SAT, P-completezza di CIRCUIT VALUE, HORNSAT e
              LINEAR PROGRAMMING, 2-COL in L, il nome AKS: sono negli appunti o nella letteratura, non in dispensa o nelle slide disponibili.
            </li>
            <li>
              <span className={ui.pillExt}>✱ solo appunti</span> NP ⊊ NEXP: dispensa (cap. 8) e slide danno la gerarchia di tempo
              nondeterministico solo tra polinomi, NTIME(n<sup>c</sup>) ⊊ NTIME(n<sup>d</sup>). La separazione NP ⊊ NEXP, usata nelle risposte
              NO, viene dagli appunti (Lez. 5 §7, dal Papadimitriou).
            </li>
            <li>
              <span className={ui.pillOk}>ricavata</span> NEXP ⊊ R e RE ≠ coRE non sono scritte così nelle fonti: seguono da risultati del corso
              (Lez. 10 §4 e §7), con il ragionamento mostrato nella scheda.
            </li>
          </ul>
        </div>
        <div className={prose}>
          <h2 className={h2}>Affermazioni delle fonti da non ripetere all&apos;esame</h2>
          <ul>
            <li>
              <b>&quot;2-SAT is P-complete&quot;</b> (dispensa, cap. 14 e 22) non è dimostrato. La dispensa stessa dice &quot;2-SAT is in P&quot;
              (cap. 12); che sia NL-completo viene dagli appunti ✱. Con le riduzioni in spazio logaritmico sarebbe P-completo solo se P = NL. Per lo
              stesso motivo la risposta della dispensa a &quot;PRIMES si riduce a 2-SAT?&quot; (sì) va letta come &quot;solo se PRIMES ∈ NL&quot;.
            </li>
            <li>
              <b>
                &quot;co-HAMILTON PATH è Π<sub>2</sub>
                <sup>P</sup>-completo&quot;
              </b>{" "}
              (dispensa, cap. 17.2.3) non è dimostrato: è coNP-completo, e sarebbe Π<sub>2</sub>
              <sup>P</sup>-completo solo se NP = coNP.
            </li>
            <li>
              <b>EXACT TSP NP-hard con B = n + 1</b> (dispensa, cap. 15): la riduzione da HAMILTON PATH non regge, perché se il grafo ha un ciclo
              hamiltoniano l&apos;ottimo vale n. Quella giusta parte da HAMILTON CYCLE con B = n (appunti Lez. 9).
            </li>
            <li>
              <b>Barre di complemento perse.</b> Nel riepilogo della dispensa (cap. 22) e nel cap. 17 &quot;HAMILTON PATH is coNP-complete&quot;,
              &quot;TSP(D) is coNP-complete&quot;, &quot;QSAT<sub>i</sub> is Π<sub>i</sub>
              <sup>P</sup>-complete&quot; e &quot;STRATEGIC COMPANIES is Π<sub>2</sub>
              <sup>P</sup>-complete&quot; hanno una barra sopra il nome, cioè parlano del complemento. Sono giusti; la barra sparisce solo se si
              copia il testo dal PDF.
            </li>
          </ul>
          <TheoremFixes />
        </div>
      </div>

      <div className={`${prose} mt-8 max-w-none`}>
        <h2 className={h2}>Verifica della tabella dei problemi</h2>
        <p className={ui.hint}>
          Ogni riga della tabella di partenza della mappa dei problemi, controllata su dispensa, slide delle Lezioni 1–9 e pagine delle tracce
          risolte.
        </p>
        <div className="overflow-x-auto border-t border-line">
          <table className="w-full min-w-[640px] border-collapse text-[0.92rem]">
            <thead>
              <tr>
                {["Riga della tabella", "Esito", "Cosa dicono le fonti"].map((h) => (
                  <th key={h} className="border-b border-line p-2 text-left align-bottom font-ui text-[0.72rem] font-medium uppercase tracking-wider text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VER.map(([r, v, t]) => (
                <tr key={r}>
                  <td className="border-b border-line p-2 align-top">{r}</td>
                  <td className={`whitespace-nowrap border-b border-line p-2 align-top font-mono text-[0.84rem] font-semibold ${v === "ok" ? "text-ok" : "text-open"}`}>
                    {v === "ok" ? "✔ confermata" : "◐ in parte"}
                  </td>
                  <td className="border-b border-line p-2 align-top">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
