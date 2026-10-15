# Teorema (separazione di P ed EXP)

## Prima di leggere

Come sono definite P ed EXP?

<details><summary>Risposta</summary>

$\mathrm{P} = \bigcup_{k \gt 0} \mathrm{TIME}(n^k)$ ed $\mathrm{EXP} = \bigcup_{k \gt 0} \mathrm{TIME}(2^{n^k})$. Sono entrambe unioni infinite di classi di tempo.

</details>

Se non ricordavi le definizioni, fissale prima di proseguire: la prova gira attorno al fatto che sono unioni.

## Il problema

$\mathrm{P} \subseteq \mathrm{EXP}$ è facile, perché ogni polinomio prima o poi sta sotto $2^n$. Il teorema dice che l'inclusione è stretta: in EXP c'è un linguaggio che non sta in P.

Il teorema di gerarchia separa due classi singole, $\mathrm{TIME}(f(n))$ e $\mathrm{TIME}(f(2n+1)^3)$. Applicato a $f(n) = n^k$ dà solo $\mathrm{TIME}(n^k) \subsetneq \mathrm{TIME}((2n+1)^{3k})$, due classi che stanno entrambe dentro P, e nessun $\mathrm{TIME}(n^k)$ contiene tutto P. Serve una classe sola che contenga tutto P e il cui gradino stia ancora in EXP: $\mathrm{TIME}(2^n)$.

## La catena

$$\mathrm{P} \subseteq \mathrm{TIME}(2^n) \subsetneq \mathrm{TIME}(2^{6n+3}) \subseteq \mathrm{TIME}(2^{n^2}) \subseteq \mathrm{EXP}.$$

1. $\mathrm{P} \subseteq \mathrm{TIME}(2^n)$. Ogni $n^k$ da un certo punto in poi sta sotto $2^n$. Per $n^3$:

    | $n$ | $n^3$ | $2^n$ |
    | --- | ----- | ----- |
    | 9   | 729   | 512   |
    | 10  | 1000  | 1024  |

    Da $n = 10$ in poi $2^n$ raddoppia a ogni passo, mentre $n^3$ cresce di un fattore $(11/10)^3 \approx 1{,}33$ e poi meno. Sui finiti $n$ più piccoli la differenza è una costante, che lo speedup lineare assorbe. Quindi ogni $\mathrm{TIME}(n^k)$ sta in $\mathrm{TIME}(2^n)$, e così la loro unione P.

2. $\mathrm{TIME}(2^n) \subsetneq \mathrm{TIME}(2^{6n+3})$. $f(n) = 2^n$ è propria e $2^n \ge n$, quindi vale il teorema di gerarchia, con $(2^{2n+1})^3 = 2^{6n+3}$.
3. $\mathrm{TIME}(2^{6n+3}) \subseteq \mathrm{TIME}(2^{n^2})$. Vale $6n + 3 \le n^2$ per $n \ge 7$ ($n = 6$: $39 > 36$; $n = 7$: $45 \le 49$), e per gli $n$ più piccoli conta di nuovo solo una costante.
4. $\mathrm{TIME}(2^{n^2}) \subseteq \mathrm{EXP}$: è il termine con $k = 2$ nella definizione.

Il passo 2 dà un linguaggio $L$ in $\mathrm{TIME}(2^{6n+3})$, quindi in EXP, che non sta in $\mathrm{TIME}(2^n)$. Se $L$ stesse in P, per il passo 1 starebbe in $\mathrm{TIME}(2^n)$. Quindi $L \notin \mathrm{P}$, e $\mathrm{P} \subsetneq \mathrm{EXP}$.

## Dove si inciampa di solito

Si crede che il teorema dica qualcosa su NP. Dalla catena $\mathrm{P} \subseteq \mathrm{NP} \subseteq \mathrm{EXP}$ si ricava solo che almeno una delle due inclusioni è stretta; quale delle due non si sa.
