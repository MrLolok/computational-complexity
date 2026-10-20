import Arrow from "@/components/Arrow";
import Markdown from "@/components/Markdown";

/** Come i PDF delle tracce scrivono simboli e nomi, accanto a come li scrive il sito. */
const LEGEND = String.raw`
| Nel PDF | Sul sito |
|---|---|
| $\Sigma_2\mathbf{P}$, $\Pi_4\mathsf{P}$: pedice in basso, la P sulla riga | $\Sigma_2^{\mathrm{P}}$, $\Pi_4^{\mathrm{P}}$: la P in apice |
| $\overline{\mathrm{QSAT}}_3$, con la barra sopra | $\mathrm{co\text{-}QSAT}_3$ |
| qsat₄, sat, primes, tsp(d), circ sat in maiuscoletto; max_flow con il trattino basso | $\mathrm{QSAT}_4$, SAT, PRIMES, TSP(D), CIRC SAT, MAX FLOW |
| 2-Sat, Tsp(D), Max Flow, Hamilton Path nelle soluzioni della Raccolta | 2-SAT, TSP(D), MAX FLOW, HAMILTON PATH |
| schoenfinkel-bernays sat | SCHÖNFINKEL-BERNAYS SAT |
| $\subset$ vuol dire contenuto strettamente | $\subset$ nel testo delle domande, $\subsetneq$ nelle spiegazioni |
| «$L_1$ è riducibile a $L_2$», a parole | $L_1 \le L_2$ |
| PNP, NPNP, PSAT nelle slide, con l'oracolo sulla riga | $\mathrm{P}^{\mathrm{NP}}$, $\mathrm{NP}^{\mathrm{NP}}$, $\mathrm{P}^{\mathrm{SAT}}$, con l'oracolo in apice; $\Delta_2^{\mathrm{P}} = \mathrm{P}^{\mathrm{NP}}$ |
| «MdT con oracolo sat» | MdT con oracolo SAT, cioè una macchina di $\mathrm{P}^{\mathrm{SAT}} = \Delta_2^{\mathrm{P}}$ |
| $\mathsf{TIME}(2n+1)^9$ | $\mathrm{TIME}((2n+1)^9)$ |
| 4EXP, «PSPACE completo», 4–EXP | $4\text{-}\mathrm{EXP}$, PSPACE-completo |
| $\epsilon = \frac{1}{345}$, $\frac{1}{345}f(n) + 2$ | $\varepsilon$, $\frac{1}{345} f(n) + 2$ |
| $\delta$ per la MdT deterministica, $\Delta$ per quella nondeterministica | sempre $\delta$ |
| «nondeterministicamente in spazio $\log n$ … deterministicamente in spazio $(\log n)^2$» | a volte abbreviato: «Nondet. spazio $\log n \Rightarrow$ det. spazio $(\log n)^2$» |
| Sì / No / altro | SÌ / NO / altro |
| Prova n.1 (stesso numero su prove diverse) | un codice per traccia (F01, G16, E26…) con la data |

coNP, $\subseteq$, $\neq$, $\triangleright$ e $\sqcup$ si scrivono allo stesso modo. Se copi il testo da un PDF puoi trovare ⌃, ⇧, ✓, ⇢ e 6=: sono $\Sigma$, $\Pi$, $\subseteq$, $\subset$ e $\neq$ copiati con il font sbagliato.
`;

/** Legenda chiusa di default: si apre solo quando serve confrontare con i PDF. */
export default function NotationLegend() {
    return (
        <details className="group border-line bg-surface open:border-line-strong rounded-xl border">
            <summary className="font-ui text-muted flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 py-2 text-sm [&::-webkit-details-marker]:hidden">
                <Arrow shape="chevron" className="transition-transform group-open:rotate-90" />
                Legenda: come i PDF delle tracce scrivono simboli e nomi
            </summary>
            <div className="border-line flex min-w-0 flex-col gap-3 border-t px-4 pt-3 pb-4">
                <Markdown>{LEGEND}</Markdown>
            </div>
        </details>
    );
}
