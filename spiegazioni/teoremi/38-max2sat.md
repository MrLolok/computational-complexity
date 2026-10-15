# MAX2SAT è NP-completo

## Prima di leggere

1. Per dimostrare che MAX2SAT è NP-difficile, quale problema si riduce a quale?
2. 2-SAT sta in P. Perché questo non dice niente su MAX2SAT?

<details><summary>Risposte</summary>

1. Si riduce 3SAT, che è NP-completo, a MAX2SAT: ogni formula di 3SAT va trasformata in un'istanza di MAX2SAT con la stessa risposta.
2. 2-SAT chiede di soddisfare tutte le clausole. MAX2SAT chiede di soddisfarne almeno $K$ e permette di lasciarne alcune false. L'algoritmo di 2-SAT si basa sulle scelte obbligate, e una clausola che si può sacrificare non obbliga niente.

</details>

## Il problema

Un'istanza di MAX2SAT è un insieme di clausole con al più due letterali e un intero $K$; la domanda è se un'assegnazione rende vere almeno $K$ clausole. MAX2SAT sta in NP: il certificato è un'assegnazione, si contano le clausole vere e si confronta con $K$. Resta da dimostrare la difficoltà, riducendo 3SAT.

## L'idea: un gruppo di dieci clausole

Ogni clausola di 3SAT diventa un gruppo di dieci clausole sui suoi tre letterali $x, y, z$ e su una variabile nuova $w$:

$$(x)\,(y)\,(z)\,(w)$$
$$(\neg x \lor \neg y)\,(\neg y \lor \neg z)\,(\neg z \lor \neg x)$$
$$(x \lor \neg w)\,(y \lor \neg w)\,(z \lor \neg w)$$

Le clausole di un solo letterale contano come clausole di due: $(x)$ è la stessa cosa di $(x \lor x)$.

Il gruppo è simmetrico in $x, y, z$, quindi conta solo quante di queste tre sono vere; chiamiamo $t$ questo numero. Le clausole $(x)(y)(z)$ danno $t$ clausole vere. La seconda riga dà 3 meno il numero di coppie di letterali veri: 3, 3, 2, 0 per $t = 0, 1, 2, 3$. La variabile $w$ aggiunge $1 + t$ se è vera (la clausola $(w)$ e le clausole della terza riga con il letterale vero) e 3 se è falsa (tutta la terza riga). Scegliendo $w$ al meglio:

| vere fra $x, y, z$ | con $w$ vera | con $w$ falsa | massimo |
|---|---|---|---|
| 3 | 7 | 6 | 7 |
| 2 | 7 | 7 | 7 |
| 1 | 6 | 7 | 7 |
| 0 | 4 | 6 | 6 |

Il gruppo dà quindi al più 7 clausole vere: esattamente 7 se $(x \lor y \lor z)$ è vera, al più 6 se è falsa.

Senza $w$ e senza le clausole che la contengono, le prime due righe darebbero 3, 4, 4, 3 per $t = 0, 1, 2, 3$, e il caso con tre letterali veri varrebbe quanto quello con nessuno. La $w$ vera aggiunge $1 + t$, cioè premia i casi con molti letterali veri, e riporta $t = 3$ a 7.

## La riduzione

Data $\varphi$ con $m$ clausole $C_i = (\alpha \lor \beta \lor \gamma)$, per ogni $C_i$ si scrive il gruppo con $\alpha, \beta, \gamma$ al posto di $x, y, z$ e una variabile nuova $w_i$ al posto di $w$. Il risultato $R(\varphi)$ ha $10m$ clausole, e l'obiettivo è $K = 7m$.

- Se $\varphi$ è soddisfacibile, si prende un'assegnazione che la soddisfa. Ogni $C_i$ ha un letterale vero, quindi scegliendo bene $w_i$ ogni gruppo dà 7 clausole vere: $7m$ in tutto.
- Se un'assegnazione rende vere $7m$ clausole, nessun gruppo può darne più di 7 e i gruppi sono $m$, quindi ognuno ne dà esattamente 7. Un gruppo con $C_i$ falsa ne darebbe al più 6, dunque ogni $C_i$ è vera e la stessa assegnazione soddisfa $\varphi$.

Ogni clausola ha la sua $w_i$ perché il valore migliore di $w$ dipende dalla clausola. Con una sola $w$ condivisa, una clausola con tre letterali veri e una con un solo letterale vero chiederebbero valori opposti.

La riduzione si calcola in spazio logaritmico: i gruppi si scrivono uno alla volta, con un contatore $i$ di $O(\log n)$ bit.

## Un esempio

Prendi $\varphi = (x_1 \lor \neg x_2 \lor x_3) \land (\neg x_1 \lor x_2 \lor x_3)$: $m = 2$, quindi 20 clausole e $K = 14$. Il gruppo della prima clausola, con $\alpha = x_1$, $\beta = \neg x_2$, $\gamma = x_3$, è

$$(x_1)\,(\neg x_2)\,(x_3)\,(w_1)\,(\neg x_1 \lor x_2)\,(x_2 \lor \neg x_3)\,(\neg x_3 \lor \neg x_1)\,(x_1 \lor \neg w_1)\,(\neg x_2 \lor \neg w_1)\,(x_3 \lor \neg w_1).$$

Con $x_1$ e $x_2$ vere e $x_3$ falsa, ogni clausola di $\varphi$ ha esattamente un letterale vero ($x_1$ nella prima, $x_2$ nella seconda). Con $w_1$ e $w_2$ false ogni gruppo dà 7 clausole vere, e il totale è 14.

Con $x_1$ falsa, $x_2$ vera e $x_3$ falsa, invece, la prima clausola ha tutti i letterali falsi e il suo gruppo arriva al più a 6. La seconda ha due letterali veri e il suo gruppo dà 7, quindi il totale si ferma a 13.

## Dove si inciampa di solito

Un gruppo con la clausola falsa dà ancora 6 clausole vere, una sola in meno di un gruppo con la clausola vera. La riduzione funziona perché l'obiettivo $7m$ è il massimo possibile e non lascia margine: un punto perso in un gruppo non si recupera in un altro.
