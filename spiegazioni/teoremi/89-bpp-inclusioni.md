# Proposizioni $\mathrm{P} \subseteq \mathrm{BPP}$ e $\mathrm{BPP} \subseteq \mathrm{PP}$

## Prima di leggere, una domanda di controllo

Che cosa chiedono BPP e PP quando $x \in L$, e che cosa quando $x \notin L$?

<details><summary>Risposta</summary>

Tutte e due usano una MdT nondeterministica polinomiale standardizzata, con i run equiprobabili. BPP chiede che, se $x \in L$, almeno $3/4$ dei run accettino, e se $x \notin L$ almeno $3/4$ dei run rifiutino: un run scelto a caso sbaglia con probabilità al più $1/4$. PP chiede solo che $x \in L$ sse più della metà dei run accetta.

</details>

## L'idea: la stessa macchina, soglie più larghe

In entrambe le inclusioni non si costruisce niente: si prende la macchina della classe più piccola e si controlla che rispetti già le soglie della classe più grande.

| classe | frazione di run "yes" se $x \in L$ | frazione di run "yes" se $x \notin L$ |
| ------ | ---------------------------------- | ------------------------------------- |
| P      | 1                                  | 0                                     |
| BPP    | almeno $3/4$                       | al più $1/4$                          |
| PP     | più di $1/2$                       | al più $1/2$                          |

Una macchina che rispetta una riga rispetta anche quella sotto, perché $1 \ge 3/4 \gt 1/2$ e $0 \le 1/4 \le 1/2$.

## $\mathrm{P} \subseteq \mathrm{BPP}$

Sia $M$ una MdT deterministica che decide $L$ in tempo polinomiale. La definizione di BPP chiede una macchina standardizzata, in cui ogni run fa lo stesso numero $p(n)$ di scelte binarie. $M$ diventa una macchina standardizzata in modo banale: facendo le $p(n)$ scelte e ignorandole perché i $2^{p(n)}$ run eseguono tutti lo stesso calcolo e danno la stessa risposta.

Se $x \in L$ accettano tutti i run il 100% delle volte, che è almeno $3/4$. Se $x \notin L$ rifiutano tutti, 0% delle volte, che è al più $1/4$. Il tempo è quello di $M$ più le $p(n)$ scelte, ancora polinomiale, quindi $L \in \mathrm{BPP}$.

## $\mathrm{BPP} \subseteq \mathrm{PP}$

Sia $N$ la macchina di BPP per $L$. Se $x \in L$, accettano almeno $3/4$ dei run, e $3/4 \gt 1/2$: c'è la maggioranza. Se $x \notin L$, rifiutano almeno $3/4$ dei run, quindi ne accetta al più $1/4$, e la maggioranza non c'è. Dunque $x \in L$ sse più della metà dei run di $N$ accetta, che è la condizione di PP, e il tempo non cambia: $L \in \mathrm{PP}$.

## Dove si inciampa di solito

Lo stesso argomento non dà $\mathrm{PP} \subseteq \mathrm{BPP}$. In PP la maggioranza può essere di un solo run sopra la metà, lontanissima da $3/4$.

In altri testi BPP è definito con $2/3$ e $1/3$ invece di $3/4$ e $1/4$. Il ragionamento è identico, perché $2/3 \gt 1/2$ e $1/3 \lt 1/2$.
