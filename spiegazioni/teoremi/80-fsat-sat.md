# Proposizione (FSAT e SAT)

## Prima di leggere

1. Che differenza c'è fra SAT e FSAT?

<details><summary>Risposta</summary>

1. SAT chiede se una formula è soddisfacibile e risponde sì o no. FSAT chiede di trovare un'assegnazione che la soddisfa, oppure di rispondere "no" se non esiste.

</details>

## Il problema

Trovare una soluzione sembra più difficile che dire se esiste. Per SAT le due cose costano uguale, a meno di un fattore polinomiale: FSAT si risolve in tempo polinomiale se e solo se SAT si risolve in tempo polinomiale.

## Da FSAT a SAT

Sia $M$ una macchina deterministica che risolve FSAT in tempo polinomiale. La macchina $M'$ fa come $M$; quando $M$ stampa un'assegnazione, $M'$ risponde "sì", e quando $M$ risponde "no", $M'$ risponde "no". $M$ stampa un'assegnazione esattamente quando la formula è soddisfacibile, e il tempo è quello di $M$.

## Da SAT a FSAT: fissare le variabili una alla volta

Sia $A$ un algoritmo deterministico polinomiale per SAT, e sia $\varphi(x_1, \dots, x_n)$ l'input. L'algoritmo $A'$ chiede ad $A$ se $\varphi$ è soddisfacibile; se no risponde "no". Altrimenti, per $i = 1, \dots, n$, chiede ad $A$ se $\varphi(T[1], \dots, T[i-1], \text{vero}, x_{i+1}, \dots, x_n)$ è soddisfacibile. Se sì pone $T[i] = \text{vero}$, altrimenti $T[i] = \text{falso}$. Alla fine restituisce $T$.

Quando $A$ risponde no, $A'$ mette $x_i$ falsa senza chiedere di nuovo. Lo può fare perché dopo ogni passo vale questa proprietà: con $x_1, \dots, x_i$ fissati ai valori di $T$, la formula è ancora soddisfacibile.

- Prima del passo 1 vale, perché $A$ ha detto che $\varphi$ è soddisfacibile.
- Supponi che valga dopo il passo $i - 1$. Se con $x_i$ vera la formula resta soddisfacibile, $A'$ sceglie vero e la proprietà vale. Se no, nessuna assegnazione con $x_i$ vera soddisfa la formula del passo prima, ma almeno un'assegnazione la soddisfa: quella ha $x_i$ falsa. Quindi con $x_i$ falsa la formula resta soddisfacibile, e la proprietà vale anche così.

Dopo il passo $n$ tutte le variabili sono fissate, e una formula senza variabili è soddisfacibile solo se è vera: $T$ soddisfa $\varphi$.

## Un esempio

$\varphi = (x_1 \lor x_2) \land (\neg x_1 \lor x_3) \land (\neg x_2 \lor \neg x_3)$.

| Chiamata | Formula chiesta ad $A$                           | Risposta                     | Scelta                |
| -------- | ------------------------------------------------ | ---------------------------- | --------------------- |
| 0        | $\varphi$                                        | sì                           |                       |
| 1        | $x_1$ vera: $x_3 \land (\neg x_2 \lor \neg x_3)$ | sì ($x_2$ falsa, $x_3$ vera) | $T[1] = \text{vero}$  |
| 2        | anche $x_2$ vera: $x_3 \land \neg x_3$           | no                           | $T[2] = \text{falso}$ |
| 3        | $x_2$ falsa e $x_3$ vera: tutte le clausole vere | sì                           | $T[3] = \text{vero}$  |

Il risultato è $T = (\text{vero}, \text{falso}, \text{vero})$, e infatti le tre clausole sono vere.

## Il conto del tempo

$A'$ chiama $A$ $n + 1$ volte, e $n \le |\varphi|$. Sostituire una variabile con una costante non allunga la formula, quindi ogni chiamata riceve una formula lunga al più $|\varphi|$ e costa al più $q(|\varphi|)$, se $q$ è il polinomio che limita il tempo di $A$. In tutto $(|\varphi| + 1) \cdot q(|\varphi|)$ passi, più il lavoro polinomiale per scrivere ogni formula: tempo polinomiale.

## Dove si inciampa di solito

Viene da fare due domande per variabile, una con vero e una con falso. Ne basta una, come alla chiamata 2 dell'esempio: se vero non va, falso va di sicuro, per la proprietà mantenuta.

La proposizione dice solo che FSAT è facile se SAT lo è. L'algoritmo $A'$ ha bisogno di un algoritmo polinomiale $A$ per SAT, e non si sa se esista.
