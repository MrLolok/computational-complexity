# Proposizione (un problema completo per due classi)

## Prima di leggere, una domanda di controllo

Che cosa vuol dire che $L$ è $C$-completo? E che $C$ è chiusa rispetto alle riduzioni?

<details><summary>Risposta</summary>

$L$ è $C$-completo se sta in $C$ (appartenenza) e ogni linguaggio di $C$ si riduce a $L$ (difficoltà). $C$ è chiusa rispetto alle riduzioni se, quando $L \in C$ e $L'$ si riduce a $L$, anche $L' \in C$.

</details>

Se una delle due definizioni non ti tornava, rileggila: la dimostrazione usa solo queste.

## Che cosa dice

Se $C_1$ e $C_2$ sono chiuse rispetto alle riduzioni e un linguaggio $L$ è completo per entrambe, allora $C_1 = C_2$.

## La dimostrazione

Si dimostrano le due inclusioni.

Per $C_1 \subseteq C_2$ prendi $L' \in C_1$. $L$ è $C_1$-completo, quindi $L'$ si riduce a $L$. Ma $L$ è anche $C_2$-completo, e in particolare sta in $C_2$. Siccome $C_2$ è chiusa, $L' \in C_2$.

Per $C_2 \subseteq C_1$ si scambiano i ruoli: ogni $L' \in C_2$ si riduce a $L$, $L$ sta in $C_1$, e la chiusura di $C_1$ porta $L'$ in $C_1$.

Ogni inclusione usa la difficoltà rispetto a una classe e l'appartenenza all'altra:

| per dimostrare | difficoltà rispetto a | appartenenza a | chiusura di |
|---|---|---|---|
| $C_1 \subseteq C_2$ | $C_1$ | $C_2$ | $C_2$ |
| $C_2 \subseteq C_1$ | $C_2$ | $C_1$ | $C_1$ |

## Un esempio

NP e coNP sono chiuse rispetto alle riduzioni. Se un problema fosse sia NP-completo sia coNP-completo, si avrebbe $\mathrm{NP} = \mathrm{coNP}$. Siccome si crede che le due classi siano diverse, si crede anche che nessun problema sia completo per entrambe.

## Dove si inciampa di solito

Sapere che $L'$ si riduce a $L$ e che $L \in C_2$ porta $L'$ in $C_2$ solo se $C_2$ è chiusa. Con una classe non chiusa, come $\mathrm{TIME}(n^2)$, il ragionamento si ferma lì.
