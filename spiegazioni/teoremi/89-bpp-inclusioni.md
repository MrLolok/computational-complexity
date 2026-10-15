# Proposizioni $\mathrm{P} \subseteq \mathrm{BPP}$ e $\mathrm{BPP} \subseteq \mathrm{PP}$

## Prima di leggere, una domanda di controllo

Che cosa chiedono BPP e PP quando $x \in L$, e che cosa quando $x \notin L$?

<details><summary>Risposta</summary>

Tutte e due usano una MdT nondeterministica polinomiale standardizzata, con i run equiprobabili. BPP chiede che, se $x \in L$, almeno $3/4$ dei run accettino, e se $x \notin L$ almeno $3/4$ dei run rifiutino: un run scelto a caso sbaglia con probabilità al più $1/4$. PP chiede solo che $x \in L$ sse più della metà dei run accetta.

</details>

Se non ricordavi le soglie, la tabella qui sotto le mette in fila.

## L'idea: la stessa macchina, soglie più larghe

In entrambe le inclusioni la macchina resta la stessa, e si controlla solo che soddisfi la definizione della classe più grande.

| classe | frazione di run "yes" se $x \in L$ | frazione di run "yes" se $x \notin L$ |
| ------ | ---------------------------------- | ------------------------------------- |
| P      | 1                                  | 0                                     |
| BPP    | almeno $3/4$                       | al più $1/4$                          |
| PP     | più di $1/2$                       | al più $1/2$                          |

Ogni riga soddisfa la condizione della riga sotto.

## $\mathrm{P} \subseteq \mathrm{BPP}$

Una MdT deterministica polinomiale $M$ è un caso particolare di MdT nondeterministica, con un solo run. Se $x \in L$ quel run accetta, quindi accetta il 100% dei run, che è almeno $3/4$. Se $x \notin L$ il run rifiuta, e rifiuta il 100%. $M$ rispetta quindi la definizione di BPP. (Se si vuole che ogni run faccia $p(n)$ scelte, $M$ le fa e le ignora: i $2^{p(n)}$ run danno tutti la stessa risposta.)

## $\mathrm{BPP} \subseteq \mathrm{PP}$

Sia $N$ la macchina di BPP per $L$. Se $x \in L$, almeno $3/4$ dei run accettano, e $3/4 \gt 1/2$: c'è la maggioranza. Se $x \notin L$, almeno $3/4$ dei run rifiutano, quindi accettano al più $1/4$ dei run, meno della metà, e la maggioranza non c'è. Dunque $x \in L$ sse $N$ accetta $x$ a maggioranza, nello stesso tempo polinomiale, e $L \in \mathrm{PP}$.

## Dove si inciampa di solito

Il contrario non segue. In PP la maggioranza può essere di un solo run sopra la metà, lontanissima da $3/4$.

In altri testi BPP è definito con $2/3$ e $1/3$ invece di $3/4$ e $1/4$. Il ragionamento è identico, perché $2/3 \gt 1/2$ e $1/3 \lt 1/2$.
