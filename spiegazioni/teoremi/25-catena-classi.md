# Corollario (catena $\mathrm{L} \subseteq \mathrm{NL} \subseteq \mathrm{P} \subseteq \mathrm{NP} \subseteq \mathrm{PSPACE}$)

## Prima di leggere, una domanda di controllo

Come si scrivono L, NL, P, NP e PSPACE usando TIME, NTIME, SPACE e NSPACE?

<details><summary>Risposta</summary>

$\mathrm{L} = \mathrm{SPACE}(\log n)$ e $\mathrm{NL} = \mathrm{NSPACE}(\log n)$. Le altre tre sono unioni su tutti i polinomi: $\mathrm{P} = \bigcup_j \mathrm{TIME}(n^j)$, $\mathrm{NP} = \bigcup_j \mathrm{NTIME}(n^j)$, $\mathrm{PSPACE} = \bigcup_j \mathrm{SPACE}(n^j)$.

</details>

Se non ti tornava, ripassa le definizioni delle classi: ogni anello della catena si ottiene sostituendo un budget in un teorema.

## Quattro anelli dal Teorema 7.4

| inclusione | parte del Teorema 7.4 | budget |
|---|---|---|
| $\mathrm{L} \subseteq \mathrm{NL}$ | (a) | spazio $\log n$ |
| $\mathrm{NL} \subseteq \mathrm{P}$ | (c) | spazio $\log n$ |
| $\mathrm{P} \subseteq \mathrm{NP}$ | (a) | tempo $n^j$ |
| $\mathrm{NP} \subseteq \mathrm{PSPACE}$ | (b) | tempo $n^j$ |

Le due righe con (a) sono gratis: una macchina deterministica è una nondeterministica che a ogni passo ha una sola scelta, con lo stesso tempo e lo stesso spazio.

La riga con (b) dice $\mathrm{NTIME}(n^j) \subseteq \mathrm{SPACE}(n^j)$. Una macchina deterministica prova i rami uno alla volta e riusa lo stesso spazio; un ramo di $n^j$ passi tocca al più $n^j$ celle.

Per P e NP basta lavorare su un esponente alla volta. Un problema di P sta in qualche $\mathrm{TIME}(n^j)$, che è contenuto in $\mathrm{NTIME}(n^j)$ e quindi in NP. Lo stesso vale per il passaggio da NP a PSPACE.

Per la riga con (c) serve un passaggio in più. Con $f(n) = \log n$ il Teorema 7.4 (c) dà $\mathrm{NSPACE}(\log n) \subseteq \mathrm{TIME}(k^{\log n + \log n})$, e

$$k^{2 \log n} = (2^{\log k})^{2 \log n} = n^{2 \log k}.$$

Il tempo sembra esponenziale perché $n$ compare all'esponente, ma ci compare sotto un logaritmo. L'esponente $2 \log k$ non dipende da $n$, perché $k$ è una costante della macchina: con $k = 8$, per esempio, il tempo è $n^6$.

## Dove si inciampa di solito

Per $\mathrm{NL} \subseteq \mathrm{P}$ va citato il Teorema 7.4 (c). Il corollario di Savitch dà $\mathrm{NL} \subseteq \mathrm{SPACE}(\log^2 n)$, che parla di spazio e non dice niente sul tempo polinomiale.

La catena non dice quali inclusioni siano strette. Per il teorema di gerarchia di spazio $\mathrm{L} \subsetneq \mathrm{PSPACE}$, quindi almeno una delle quattro è stretta, ma non si sa quale.
