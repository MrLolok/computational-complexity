# Proposizione (KNAPSACK in tempo $O(nW)$)

## Prima di leggere

Un algoritmo è polinomiale se il suo tempo è polinomiale nella lunghezza dell'input. Quanto è lunga un'istanza di KNAPSACK con $n$ oggetti e limite di peso $W$?

<details><summary>Risposta</summary>

I numeri si scrivono in binario, quindi $W$ occupa circa $\log W$ bit, e lo stesso vale per pesi e valori. La lunghezza è circa $n \log W$ (supponendo che nessun numero superi di molto $W$). Il valore $W$ non compare nella lunghezza, compare solo il suo logaritmo.

</details>

## L'idea: una tabella di sottoproblemi

Per $0 \le i \le n$ e $0 \le w \le W$ si definisce $V(w, i)$: il massimo valore ottenibile scegliendo fra i primi $i$ oggetti con peso totale al più $w$.

Senza oggetti il valore è 0, quindi $V(w, 0) = 0$ per ogni $w$. Per aggiungere l'oggetto $i + 1$ si guardano le due sole possibilità:

$$V(w, i+1) = \max\{V(w, i),\ v_{i+1} + V(w - w_{i+1}, i)\},$$

dove il secondo termine conta solo se $w_{i+1} \le w$. Una scelta ottima fra i primi $i + 1$ oggetti o lascia fuori l'oggetto $i + 1$, e allora è una scelta ottima fra i primi $i$ con lo stesso limite $w$; oppure lo prende, e allora il resto è una scelta fra i primi $i$ con il peso rimasto $w - w_{i+1}$, che conviene sia ottima.

Si riempie la tabella per $i$ crescente: ogni casella usa due caselle della riga precedente, già calcolate. L'istanza ha risposta sì se e solo se $V(W, n) \ge K$.

## Un esempio

Due oggetti, il primo con peso 2 e valore 3, il secondo con peso 3 e valore 4; $W = 5$ e $K = 7$.

```
                        w = 0  1  2  3  4  5
i = 0                       0  0  0  0  0  0
i = 1 (peso 2, valore 3)    0  0  3  3  3  3
i = 2 (peso 3, valore 4)    0  0  3  4  4  7
```

Per esempio $V(5, 2) = \max\{V(5, 1),\ 4 + V(2, 1)\} = \max\{3, 7\} = 7$: si prendono entrambi gli oggetti, peso 5 e valore 7. Siccome $V(5, 2) \ge K$, la risposta è sì.

## Il conto

Le caselle sono $(n + 1)(W + 1)$ e ognuna costa un numero costante di operazioni, quindi il tempo è $O(nW)$.

## Dove si inciampa di solito

$O(nW)$ sembra un polinomio, ma lo è nel valore di $W$, non nella lunghezza dell'input. Siccome $W = 2^{\log W}$, il tempo è esponenziale nei circa $\log W$ bit con cui si scrive $W$. Con $W = 2^{60}$ l'istanza resta corta, perché $W$ occupa 61 bit, ma la tabella ha più di $10^{18}$ colonne. Un algoritmo di questo tipo si chiama pseudopolinomiale.

Per questo l'algoritmo non dimostra $\mathrm{P} = \mathrm{NP}$, anche se KNAPSACK è NP-completo: le istanze difficili sono quelle con numeri di valore esponenziale.
