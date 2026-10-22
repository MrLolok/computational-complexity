# Proposizione A (riduzioni e complementi)

## Che cosa dice

Una riduzione $R$ da $L$ a $L'$ è una funzione calcolabile in spazio logaritmico tale che, per ogni stringa $x$, $x \in L \iff R(x) \in L'$. La proposizione dice che la stessa $R$, senza cambiarla, è anche una riduzione dal complemento $\overline{L}$ al complemento $\overline{L'}$.

Le istanze SÌ di $\overline{L}$ sono le istanze NO di $L$, quindi sembrerebbe servire una trasformazione nuova. Invece basta $R$ perché una riduzione manda le istanze SÌ di $L$ in istanze SÌ di $L'$, e le istanze NO di $L$ in istanze NO di $L'$. Passando ai complementi, SÌ e NO si scambiano da entrambe le parti, e $R$ continua a mandare SÌ in SÌ e NO in NO.

## Perché è vera

Un "se e solo se" resta vero se si negano entrambi i lati. Da $x \in L \iff R(x) \in L'$ segue

$$x \notin L \iff R(x) \notin L'.$$

Le stringhe che non stanno in $L$ sono quelle di $\overline{L}$, e quelle che non stanno in $L'$ sono quelle di $\overline{L'}$, quindi la riga sopra si riscrive

$$x \in \overline{L} \iff R(x) \in \overline{L'}.$$

È la definizione di riduzione da $\overline{L}$ a $\overline{L'}$. Il costo resta lo spazio logaritmico, perché la funzione è la stessa.

## Un esempio

La riduzione da HAMILTON CYCLE a TSP(D) trasforma un grafo con $n$ nodi in $n$ città, a distanza 1 se c'è l'arco e 2 se non c'è, con budget $B = n$: il grafo ha un ciclo hamiltoniano se e solo se c'è un giro di costo $\le n$. La stessa trasformazione dice anche che il grafo non ha cicli hamiltoniani se e solo se nessun giro costa $\le n$. È quindi una riduzione dal complemento di HAMILTON CYCLE a co-TSP(D).

## Dove si inciampa di solito

Il verso della riduzione non si inverte. Da una riduzione di $L$ a $L'$ si ottiene una riduzione di $\overline{L}$ a $\overline{L'}$, e niente da $L'$ verso $L$ o da $L$ verso $\overline{L'}$.
