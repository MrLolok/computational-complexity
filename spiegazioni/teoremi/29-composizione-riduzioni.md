# Proposizione (composizione di riduzioni)

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Che cos'è una riduzione da $L_1$ a $L_2$?
2. Una macchina che lavora in spazio $O(\log n)$ quanti passi può fare prima di fermarsi?

<details><summary>Risposte</summary>

1. Una funzione $R$ calcolabile in spazio logaritmico tale che $x \in L_1 \iff R(x) \in L_2$ per ogni stringa $x$. Lo spazio si conta solo sui nastri di lavoro: l'input è di sola lettura e l'output di sola scrittura, e nessuno dei due entra nel conto.
2. Un numero polinomiale di passi. In spazio logaritmico le configurazioni sono polinomiali in $n$, e una macchina deterministica che si ferma non passa due volte dalla stessa configurazione.

</details>

Se la seconda risposta non ti tornava, rileggila: serve a dire quanto può essere lungo $R(x)$.

## Il problema

Se $R$ riduce $L_1$ a $L_2$ e $R'$ riduce $L_2$ a $L_3$, la funzione composta $R' \circ R$ dà la risposta giusta senza bisogno di conti:

$$x \in L_1 \iff R(x) \in L_2 \iff R'(R(x)) \in L_3.$$

Resta da controllare lo spazio. Siano $M_R$ e $M_{R'}$ le macchine che calcolano $R$ e $R'$. L'idea ingenua è scrivere $R(x)$ su un nastro di lavoro e poi eseguirci sopra $M_{R'}$. Ma $M_R$ si ferma in tempo polinomiale e scrive al più un simbolo per passo, quindi $|R(x)|$ può arrivare a $n^c$ per una costante $c$: tenerlo su un nastro di lavoro costerebbe spazio polinomiale.

L'output finale $R'(R(x))$ non dà problemi, perché va sul nastro di output, che non si conta. Il guaio è la stringa intermedia, che $M_{R'}$ deve poter leggere, anche tornando indietro.

## L'idea: ricalcolare i simboli di $R(x)$

La macchina composta $M$ non scrive mai $R(x)$. Simula $M_{R'}$ e tiene un contatore $i$ con la posizione della testina di input di $M_{R'}$, cioè l'indice del simbolo di $R(x)$ che $M_{R'}$ sta leggendo. A ogni mossa di quella testina:

- se va a destra, $i$ aumenta di 1 e $M$ fa proseguire $M_R$ su $x$, su nastri separati, finché produce il simbolo successivo;
- se resta ferma, $M$ ricorda il simbolo appena letto;
- se va a sinistra, $i$ diminuisce di 1 e $M$ riesegue $M_R$ da capo, contando i simboli prodotti senza scriverli, finché arriva all'$i$-esimo.

Per tornare indietro bisogna ripartire dall'inizio, perché $M_R$ produce l'output solo in avanti e non si può far girare al contrario.

## Un esempio

Supponi $R(x) = \texttt{abba}$ e che $M_{R'}$ legga le posizioni 1, 2, 3 e poi torni alla 2.

| testina di $M_{R'}$ | $i$ | che cosa fa $M$ | simbolo |
|---|---|---|---|
| inizio | 1 | avvia $M_R$ finché produce il primo simbolo | a |
| a destra | 2 | fa proseguire $M_R$ fino al simbolo successivo | b |
| a destra | 3 | fa proseguire $M_R$ ancora | b |
| a sinistra | 2 | riavvia $M_R$, scarta il primo simbolo, si ferma al secondo | b |

## Il conto

| che cosa | spazio |
|---|---|
| contatore $i$ e contatore dei simboli prodotti | $O(\log n^c) = O(\log n)$ |
| nastri di lavoro di $M_R$ | $O(\log n)$ |
| nastri di lavoro di $M_{R'}$ | $O(\log \lvert R(x) \rvert) = O(\log n)$ |

I contatori arrivano al più a $n^c$, e $\log n^c = c \log n$. $M_{R'}$ usa spazio logaritmico nella lunghezza del proprio input, che è $R(x)$, quindi $\log |R(x)| \le c \log n$. In totale $O(\log n)$: $R' \circ R$ è ancora una riduzione in spazio logaritmico.

Il tempo cresce per via dei ricalcoli, ma resta polinomiale e qui non conta.

La composizione si usa nelle prove di NP-completezza: per un nuovo problema $B$ basta mostrare $B \in \mathrm{NP}$ e ridurre a $B$ un problema già NP-completo $A$. Ogni problema di NP si riduce ad $A$, e componendo si riduce a $B$.

## Dove si inciampa di solito

Tenere in una memoria tampone gli ultimi simboli prodotti non basta, perché $M_{R'}$ può tornare indietro di quante posizioni vuole: o si ricorda tutto, o si ricalcola.
