# Proposizione (un problema completo per due classi)

## Prima di leggere, una domanda di controllo

Che cosa vuol dire che $L$ è $C$-completo? E che $C$ è chiusa rispetto alle riduzioni?

<details><summary>Risposta</summary>

$L$ è $C$-completo se sta in $C$ (appartenenza) e ogni linguaggio di $C$ si riduce a $L$ (difficoltà). $C$ è chiusa rispetto alle riduzioni se, quando $L \in C$ e $L'$ si riduce a $L$, anche $L' \in C$.

La chiusura è una proprietà di una sola classe e non parla di altre classi: tutto ciò che si riduce a un problema di $C$ resta dentro $C$. P per esempio è chiusa: se $L'$ si riduce a $L \in \mathrm{P}$, si risolve $L'$ applicando la riduzione e poi l'algoritmo polinomiale per $L$, e il totale resta polinomiale. $\mathrm{TIME}(n^2)$ invece non è chiusa: la riduzione può allungare l'input in modo polinomiale, e su un input più lungo $n^2$ passi non bastano più.

Messe insieme, le due definizioni danno questo: se tutti i problemi di $C$ si riducono a un problema che sta in $D$, e $D$ è chiusa, allora $C \subseteq D$. Serve la chiusura di $D$, la classe d'arrivo, non quella di $C$.

</details>

Se una delle due definizioni non ti tornava, rileggila: la dimostrazione usa solo queste.

## Che cosa dice

Se $C_1$ e $C_2$ sono chiuse rispetto alle riduzioni e un linguaggio $L$ è completo per entrambe, allora $C_1 = C_2$.

## La dimostrazione

Bisogna mostrare che ogni linguaggio di $C_1$ sta anche in $C_2$, e viceversa.

Prendiamo un linguaggio $L'$ qualsiasi di $C_1$. Siccome $L$ è $C_1$-completo, $L'$ si riduce a $L$. D'altra parte $L$ è anche $C_2$-completo. Allora $L'$ si riduce a un linguaggio di $C_2$, e siccome $C_2$ è chiusa rispetto alle riduzioni, anche $L'$ sta in $C_2$. Questo vale per ogni $L'$ di $C_1$, quindi $C_1 \subseteq C_2$.

Per l'altra inclusione si ripete lo stesso ragionamento scambiando le due classi: un $L'$ di $C_2$ si riduce a $L$, $L$ sta in $C_1$, e per la chiusura di $C_1$ anche $L'$ sta in $C_1$.

Ogni inclusione usa la difficoltà rispetto a una classe e l'appartenenza all'altra:

| per dimostrare      | difficoltà rispetto a | appartenenza a | chiusura di |
| ------------------- | --------------------- | -------------- | ----------- |
| $C_1 \subseteq C_2$ | $C_1$                 | $C_2$          | $C_2$       |
| $C_2 \subseteq C_1$ | $C_2$                 | $C_1$          | $C_1$       |

## Un esempio

NP e coNP sono chiuse rispetto alle riduzioni. Se un problema fosse sia NP-completo sia coNP-completo, si avrebbe $\mathrm{NP} = \mathrm{coNP}$. Siccome si crede che le due classi siano diverse, si crede anche che nessun problema sia completo per entrambe.

## Dove si inciampa di solito

Sapere che $L'$ si riduce a $L$ e che $L \in C_2$ porta $L'$ in $C_2$ solo se $C_2$ è chiusa. Con una classe non chiusa, come $\mathrm{TIME}(n^2)$, il ragionamento si ferma lì.
