# Corollario (catena $\mathrm{L} \subseteq \mathrm{NL} \subseteq \mathrm{P} \subseteq \mathrm{NP} \subseteq \mathrm{PSPACE}$)

## Prima di leggere

Sai scrivere le cinque classi in termini di $\mathrm{TIME}$, $\mathrm{NTIME}$, $\mathrm{SPACE}$ e $\mathrm{NSPACE}$?

<details><summary>Risposta</summary>

$\mathrm{L} = \mathrm{SPACE}(\log n)$ e $\mathrm{NL} = \mathrm{NSPACE}(\log n)$. P è l'unione dei $\mathrm{TIME}(n^j)$, NP l'unione degli $\mathrm{NTIME}(n^j)$ e PSPACE l'unione degli $\mathrm{SPACE}(n^j)$, al variare di $j$.

</details>

## L'idea

Ogni anello della catena è un caso particolare di uno dei tre pezzi del Teorema 7.4, con il limite scelto nel modo giusto:

- (a) $\mathrm{TIME}(f(n)) \subseteq \mathrm{NTIME}(f(n))$ e $\mathrm{SPACE}(f(n)) \subseteq \mathrm{NSPACE}(f(n))$, perché una macchina deterministica è una nondeterministica con una sola scelta a ogni passo;
- (b) $\mathrm{NTIME}(f(n)) \subseteq \mathrm{SPACE}(f(n))$;
- (c) $\mathrm{NSPACE}(f(n)) \subseteq \mathrm{TIME}(k^{\log n + f(n)})$.

## I quattro anelli

$\mathrm{L} \subseteq \mathrm{NL}$ è (a) con $f(n) = \log n$.

$\mathrm{NL} \subseteq \mathrm{P}$ viene da (c) con $f(n) = \log n$: il tempo è $k^{2 \log n} = (2^{\log k})^{2 \log n} = n^{2 \log k}$. L'esponente $2 \log k$ è una costante perché $k$ lo è, quindi il tempo è un polinomio; per $k = 8$ è $n^6$.

$\mathrm{P} \subseteq \mathrm{NP}$ è (a) applicato a ciascun $\mathrm{TIME}(n^j)$: ogni pezzo dell'unione che definisce P sta nel pezzo corrispondente dell'unione che definisce NP.

$\mathrm{NP} \subseteq \mathrm{PSPACE}$ è (b) applicato a ciascun $\mathrm{NTIME}(n^j)$, che finisce in $\mathrm{SPACE}(n^j) \subseteq \mathrm{PSPACE}$. L'idea di (b): ogni computazione dura al più $n^j$ passi, quindi tocca al più $n^j$ celle, e la macchina deterministica prova le sequenze di scelte una alla volta riusando lo stesso spazio.

## Dove si inciampa di solito

$\mathrm{NL} \subseteq \mathrm{P}$ non si ottiene provando tutte le scelte della macchina nondeterministica: le computazioni sono troppe. Si ottiene contando le configurazioni, che in spazio logaritmico sono un numero polinomiale, e visitando il grafo che formano.

Gli estremi della catena sono diversi: per il Teorema di gerarchia per lo spazio $\mathrm{SPACE}(\log n) \subsetneq \mathrm{SPACE}(\log n \cdot \log \log n)$, e quest'ultima classe sta in PSPACE, quindi $\mathrm{L} \subsetneq \mathrm{PSPACE}$. Almeno una delle quattro inclusioni è perciò stretta, ma non si sa quale.
