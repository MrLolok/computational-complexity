# Gerarchie nondeterministiche

## Prima di leggere

1. Perché scambiare "yes" e "no" in una macchina nondeterministica non dà una macchina per il complemento?
2. Che cosa dice il teorema di Immerman e Szelepcsényi?

<details><summary>Risposte</summary>

1. La macchina scambiata accetta quando almeno un ramo della macchina originale rifiuta. Per il complemento servirebbe accettare quando tutti i rami rifiutano.
2. Lo spazio nondeterministico, almeno logaritmico, è chiuso per complemento: $\mathrm{NSPACE}(f(n)) = \mathrm{coNSPACE}(f(n))$ per $f(n) \ge \log n$.

</details>

La prima risposta descrive l'ostacolo che il teorema deve aggirare; la seconda spiega perché per lo spazio l'ostacolo sparisce.

## Che cosa dice

Per il tempo: $\mathrm{NTIME}(n^c) \subsetneq \mathrm{NTIME}(n^d)$ per ogni coppia di costanti $1 \le c < d$, per esempio $\mathrm{NTIME}(n) \subsetneq \mathrm{NTIME}(n^{3/2})$. Per lo spazio, con $h$ crescente qualsiasi, anche lentissima:

$$\mathrm{NSPACE}(\log n) \subsetneq \mathrm{NSPACE}(\log n \cdot h(n)), \qquad \mathrm{NSPACE}(n^k) \subsetneq \mathrm{NSPACE}(n^k \cdot h(n)),$$
$$\mathrm{NSPACE}(2^n) \subsetneq \mathrm{NSPACE}(2^n \cdot h(n)), \qquad \mathrm{NSPACE}(2^{2^n}) \subsetneq \mathrm{NSPACE}(2^{2^{n+1}}).$$

I gradini sono molto più piccoli di quelli dei teoremi di gerarchia deterministici, $f(2n+1)^3$ per il tempo e $f(n) \log f(n)$ per lo spazio.

## Tempo: perché la diagonalizzazione solita non funziona

Nelle gerarchie deterministiche la macchina diagonale simula una macchina e rovescia la risposta. Una macchina nondeterministica, per rovesciare la risposta di $M_i$, dovrebbe decidere il complemento del suo linguaggio, e non si sa se il complemento di un linguaggio di $\mathrm{NTIME}(n^c)$ stia in $\mathrm{NTIME}(n^d)$: è la stessa domanda di NP contro coNP. Simulare $M_i$ in modo deterministico, provando tutti i rami, costa invece un tempo esponenziale.

## Tempo: la diagonalizzazione ritardata

La macchina diagonale $D$ lavora su input della forma $1^n$. A ogni macchina $M_i$ dell'elenco assegna un intervallo di lunghezze da $a_i$ a $b_i$, con $b_i$ esponenzialmente più grande di $a_i$:

- per $a_i \le n < b_i$, $D$ su $1^n$ copia la risposta di $M_i$ su $1^{n+1}$: sceglie un ramo di $M_i$, lo simula per $(n+1)^c$ passi, il budget di $M_i$ su un input lungo $n+1$, e accetta se il ramo accetta. Copiare è facile anche per una macchina nondeterministica, perché accettare quando esiste un ramo che accetta è la sua regola;
- per $n = b_i$, $D$ su $1^{b_i}$ calcola in modo deterministico, provando tutti i rami, la risposta di $M_i$ su $1^{a_i}$, e la rovescia.

Il rovesciamento costa circa $2^{a_i^c}$ passi. Con $n = b_i$ enorme quel numero è polinomiale in $b_i$, e $D$ resta nel budget $n^d$: è il motivo per cui $b_i$ deve essere esponenzialmente più grande di $a_i$.

## La catena, su un intervallo giocattolo

Supponiamo che $M_i$ decida $L(D)$ in tempo $n^c$, cioè $M_i(1^m) = D(1^m)$ per ogni $m$. Con un intervallo giocattolo da $a_i = 3$ a $b_i = 7$ (quello vero sarebbe enorme):

```
D(1^3) = M(1^4)       D copia
       = D(1^4)       M decide L(D)
       = M(1^5)       D copia
       = D(1^5)
       = M(1^6)
       = D(1^6)
       = M(1^7)
       = D(1^7)       M decide L(D)
       = non M(1^3)   D rovescia, all'estremo b_i
       = non D(1^3)   M decide L(D)
```

Si arriva a $D(1^3) = \text{non } D(1^3)$. Dei passaggi che dipendono da $D$, tutti tranne uno sono copie, che una macchina nondeterministica sa fare; gli altri vengono dall'ipotesi che $M_i$ decida $L(D)$. L'unico rovesciamento sta all'estremo dell'intervallo, dove c'è tempo per farlo in modo deterministico.

Resta la costante della simulazione: simulare $M_i$ costa un fattore che dipende da $M_i$. Il margine $n^{d-c}$ supera qualunque costante quando $n$ è grande, e ogni macchina compare infinite volte nell'elenco, quindi riceve anche intervalli che cominciano da lunghezze grandi quanto serve.

## Spazio: il complemento si fa

Per il teorema di Immerman e Szelepcsényi una macchina nondeterministica può decidere, nello stesso ordine di spazio, il complemento del linguaggio di $M_i$. La macchina diagonale può quindi rovesciare la risposta, e la prova della gerarchia di spazio deterministica si ripete con un gradino più fitto: se $f(n)/g(n)$ tende a 0 e $f(n+1) = O(g(n))$, allora $\mathrm{NSPACE}(f(n)) \subsetneq \mathrm{NSPACE}(g(n))$.

Gli esempi dell'enunciato soddisfano le due condizioni. Una $h$ crescente è illimitata, quindi il rapporto $f/g = 1/h(n)$ tende a 0 nei primi tre casi; per la seconda condizione $\log(n+1) = O(\log n)$, $(n+1)^k \le 2^k n^k$ e $2^{n+1} = 2 \cdot 2^n$. L'ultimo caso è diverso:

| $f(n)$    | $f(n+1)$                    | gradino $g(n)$ |
| --------- | --------------------------- | -------------- |
| $2^{2^n}$ | $2^{2^{n+1}} = (2^{2^n})^2$ | $2^{2^{n+1}}$  |

Con $g(n) = 2^{2^n} \cdot h(n)$ la seconda condizione fallirebbe, perché $f(n+1)$ è il quadrato di $f(n)$ e supera di molto $2^{2^n} \cdot h(n)$. Il gradino scelto è quindi $2^{2^{n+1}}$: $f(n+1) = g(n)$, e $f(n)/g(n) = 1/2^{2^n}$ tende a 0.

## Dove si inciampa di solito

Si legge "gerarchie più fitte" come un confronto fra nondeterminismo e determinismo. Il teorema confronta classi nondeterministiche fra loro: non dice niente, per esempio, su $\mathrm{NTIME}(n)$ rispetto a $\mathrm{TIME}(n^2)$.
