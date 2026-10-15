# Teorema di gerarchia per il tempo (Teorema 7.1)

## Prima di leggere

1. Che cosa dicono il Lemma 1 e il Lemma 2 sul linguaggio $H_f = \{M;x : M \text{ accetta } x \text{ in al più } f(|x|) \text{ passi}\}$?
2. Quali proprietà di una funzione propria servono qui?

<details><summary>Risposte</summary>

1. Per $f(n) \ge n$ propria, il Lemma 1 dice che $H_f \in \mathrm{TIME}(f(n)^3)$: una macchina universale con la sveglia lo decide. Il Lemma 2 dice che $H_f \notin \mathrm{TIME}(f(\lfloor n/2 \rfloor))$: una macchina più veloce permetterebbe di costruire una macchina diagonale contraddittoria.
2. Che $f$ non decresce e che il suo valore si può calcolare come metro, con la macchina $M_f$, in tempo $O(n + f(n))$.

</details>

Se i due lemmi non ti tornano, guardali prima: il teorema li mette insieme e non aggiunge altre costruzioni.

## Il problema

Che più tempo permetta di risolvere più problemi non è scontato. Per il Gap Theorem esistono funzioni $f$, ricorsive ma "strane", per cui $\mathrm{TIME}(f(n)) = \mathrm{TIME}(2^{f(n)})$: un tempo esponenzialmente più grande senza nessun problema nuovo. Il teorema dice che con $f$ propria e $f(n) \ge n$ questo non succede:

$$\mathrm{TIME}(f(n)) \subsetneq \mathrm{TIME}(f(2n+1)^3).$$

L'inclusione è facile. $f$ non decresce e $f(2n+1) \ge 2n+1 \ge 1$, quindi $f(n) \le f(2n+1) \le f(2n+1)^3$, e una macchina che sta nel budget piccolo sta anche in quello grande. Il lavoro è trovare un linguaggio che stia nella classe grande e non in quella piccola.

## L'idea: cambiare la funzione

I due lemmi applicati a $f$ mettono $H_f$ dentro $\mathrm{TIME}(f(n)^3)$ e fuori da $\mathrm{TIME}(f(\lfloor n/2 \rfloor))$. La classe esclusa però è più piccola di $\mathrm{TIME}(f(n))$, perché $f(\lfloor n/2 \rfloor) \le f(n)$, quindi escludere $H_f$ da lì non basta.

Si applicano allora i lemmi a una funzione $g$ scelta in modo che $g(\lfloor n/2 \rfloor)$ sia almeno $f(n)$:

$$g(n) = f(2n+1).$$

Anche $g$ è propria (si calcola $2n+1$ e poi si usa $M_f$) e $g(n) \ge 2n+1 \ge n$, quindi i lemmi valgono per $g$:

- Lemma 1: $H_g \in \mathrm{TIME}(g(n)^3) = \mathrm{TIME}(f(2n+1)^3)$;
- Lemma 2: $H_g \notin \mathrm{TIME}(g(\lfloor n/2 \rfloor))$.

Resta da vedere che $\mathrm{TIME}(f(n))$ sta dentro $\mathrm{TIME}(g(\lfloor n/2 \rfloor))$, cioè che $g(\lfloor n/2 \rfloor) = f(2\lfloor n/2 \rfloor + 1) \ge f(n)$. Siccome $f$ non decresce, basta che $2\lfloor n/2 \rfloor + 1 \ge n$:

| $n$ | $\lfloor n/2 \rfloor$ | $2\lfloor n/2 \rfloor + 1$ |
|---|---|---|
| 6 | 3 | 7 |
| 7 | 3 | 7 |
| 8 | 4 | 9 |

Con $n$ pari si ottiene $n+1$, con $n$ dispari esattamente $n$, quindi sempre almeno $n$.

Se $H_g$ stesse in $\mathrm{TIME}(f(n))$, starebbe anche in $\mathrm{TIME}(g(\lfloor n/2 \rfloor))$, contro il Lemma 2. Quindi $H_g$ sta nella classe grande e non in quella piccola, e l'inclusione è stretta.

## Un esempio: $f(n) = n$

Con $f(n) = n$ si ha $g(n) = 2n+1$, e il linguaggio che separa le due classi è

$$H_g = \{M;x : M \text{ accetta } x \text{ in al più } 2|x|+1 \text{ passi}\}.$$

Il teorema dà $\mathrm{TIME}(n) \subsetneq \mathrm{TIME}((2n+1)^3)$, cioè, a meno di costanti, $\mathrm{TIME}(n) \subsetneq \mathrm{TIME}(n^3)$.

## Il conto: da dove viene $f(2n+1)^3$

I due pezzi del gradino vengono da due lemmi diversi. Il cubo è il costo della simulazione universale del Lemma 1: passi simulati per lunghezza dei nastri per sovraccarico della codifica. Il $2n+1$ viene dalla diagonalizzazione del Lemma 2, dove la macchina diagonale lavora sull'input $M;M$, lungo il doppio più uno; per compensare il $\lfloor n/2 \rfloor$ si deve valutare $f$ in $2n+1$.

## Dove si inciampa di solito

Si crede che il teorema separi due polinomi qualsiasi, per esempio $\mathrm{TIME}(n)$ da $\mathrm{TIME}(n^2)$. Con un gradino da $f(n)$ a $f(2n+1)^3$ non ci arriva. Ci arriva il risultato più forte $\mathrm{TIME}(f(n)) \subsetneq \mathrm{TIME}(f(n) \cdot \log^2 f(n))$, citato senza prova, perché $n \log^2 n$ cresce meno di $n^2$.
