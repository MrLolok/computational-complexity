# Proposizione (KNAPSACK in tempo $O(nW)$)

## Prima di leggere

Un'istanza di KNAPSACK ha $n$ oggetti con pesi e valori, un limite $W$ e un obiettivo $K$, tutti scritti in binario. Quanto è lunga, all'incirca?

<details><summary>Risposta</summary>

Pesi e valori sono circa $2n$ numeri. Se sono al più $W$, ognuno occupa circa $\log W$ bit, quindi la lunghezza è dell'ordine di $n \log W$. Il tempo di un algoritmo si misura rispetto a questa lunghezza.

</details>

## Il problema

KNAPSACK è NP-completo, eppure lo risolve un algoritmo in tempo $O(nW)$, che a prima vista sembra polinomiale. Se lo fosse davvero, avremmo $\mathrm{P} = \mathrm{NP}$.

## L'idea: una tabella di sottoproblemi

Per $0 \le i \le n$ e $0 \le w \le W$ sia

> $V(w, i)$ il massimo valore che si ottiene scegliendo fra i primi $i$ oggetti con peso totale al più $w$.

Con zero oggetti il valore è 0: $V(w, 0) = 0$ per ogni $w$.

Per aggiungere l'oggetto $i+1$, di peso $w_{i+1}$ e valore $v_{i+1}$:

$$V(w, i+1) = \max\{V(w, i),\ v_{i+1} + V(w - w_{i+1}, i)\},$$

dove il secondo termine conta solo se $w_{i+1} \le w$. Le due voci sono i due casi possibili per una scelta ottima. Se non prende l'oggetto, è una scelta fra i primi $i$ con limite $w$. Se lo prende, restano $w - w_{i+1}$ unità di peso per gli altri oggetti, e conviene usarle nel modo migliore, che vale $V(w - w_{i+1}, i)$: un resto non ottimo si potrebbe sostituire con uno migliore, migliorando tutta la scelta.

La risposta è SÌ se e solo se $V(W, n) \ge K$.

## Un esempio

Tre oggetti, $W = 5$, $K = 7$:

| oggetto | peso | valore |
| ------- | ---- | ------ |
| 1       | 2    | 3      |
| 2       | 3    | 4      |
| 3       | 4    | 5      |

La tabella si riempie una riga alla volta, perché ogni riga usa solo quella sopra:

|         | $w = 0$ | 1   | 2   | 3   | 4   | 5   |
| ------- | ------- | --- | --- | --- | --- | --- |
| $i = 0$ | 0       | 0   | 0   | 0   | 0   | 0   |
| $i = 1$ | 0       | 0   | 3   | 3   | 3   | 3   |
| $i = 2$ | 0       | 0   | 3   | 4   | 4   | 7   |
| $i = 3$ | 0       | 0   | 3   | 4   | 5   | 7   |

Per esempio $V(5, 2) = \max\{V(5, 1),\ 4 + V(2, 1)\} = \max\{3, 7\} = 7$: prendere l'oggetto 2 lascia 2 unità di peso, che bastano per l'oggetto 1. In fondo a destra $V(5, 3) = 7 \ge K$, quindi la risposta è SÌ, con gli oggetti 1 e 2.

## Il conto

Le caselle sono $(n+1)(W+1)$ e ognuna costa una somma e un confronto fra numeri già calcolati: tempo $O(nW)$.

L'input però è lungo circa $n \log W$, mentre la tabella ha $W + 1$ colonne, e $W = 2^{\log W}$. Il tempo è polinomiale nel valore di $W$ ed esponenziale nella sua lunghezza. Un algoritmo così si chiama pseudopolinomiale.

Quindi l'algoritmo non dimostra $\mathrm{P} = \mathrm{NP}$. Diventa polinomiale solo sulle istanze in cui $W$ è piccolo, per esempio limitato da un polinomio nel numero di oggetti.

## Dove si inciampa di solito

$O(nW)$ sembra polinomiale perché $n$ e $W$ hanno lo stesso ruolo nella formula. Nella lunghezza dell'input però pesano in modo diverso: ogni oggetto in più allunga l'input, quindi $n$ cresce al più come la lunghezza, mentre $W$ contribuisce solo con i suoi $\log W$ bit.

Si può anche credere che l'algoritmo contraddica la NP-completezza di KNAPSACK. La riduzione che la dimostra produce numeri di valore esponenziale, cioè proprio le istanze su cui questa tabella diventa enorme.
