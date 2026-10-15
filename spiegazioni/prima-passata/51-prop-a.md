# Proposizione A (riduzioni e complementi)

## Prima di leggere

Che cos'è una riduzione da $L$ a $L'$?

<details><summary>Risposta</summary>

Una funzione $R$ calcolabile in spazio logaritmico tale che, per ogni stringa $x$, $x \in L$ se e solo se $R(x) \in L'$.

</details>

## L'idea

La definizione di riduzione è un "se e solo se", e un "se e solo se" resta vero se si negano tutti e due i lati. Da

$$x \in L \iff R(x) \in L'$$

segue

$$x \notin L \iff R(x) \notin L'.$$

Il complemento $\overline{L}$ è l'insieme delle stringhe che non stanno in $L$, quindi $x \notin L$ vuol dire $x \in \overline{L}$, e $R(x) \notin L'$ vuol dire $R(x) \in \overline{L'}$. La seconda equivalenza diventa $x \in \overline{L} \iff R(x) \in \overline{L'}$.

La funzione $R$ è la stessa di prima, quindi si calcola ancora in spazio logaritmico: è una riduzione da $\overline{L}$ a $\overline{L'}$.

## Un esempio

La riduzione da HAMILTON CYCLE a TSP(D) costruisce, dato un grafo con $n$ nodi, $n$ città a distanza 1 se sono collegate da un arco e 2 altrimenti, con budget $B = n$. Un grafo ha un ciclo hamiltoniano se e solo se le città hanno un giro di costo al più $n$. Per la Proposizione A la stessa costruzione manda i grafi senza cicli hamiltoniani esattamente nelle istanze di TSP(D) in cui ogni giro costa più di $n$.

## Dove si inciampa di solito

La riduzione per i complementi è la stessa $R$, senza modifiche: cambia solo come si legge la condizione.

Il complemento di $L$ contiene anche le stringhe che non codificano nessuna istanza. Non serve trattarle a parte: la definizione di riduzione vale per ogni stringa $x$, quindi $R$ le manda già fuori da $L'$, cioè dentro $\overline{L'}$.
