# Teorema di Savitch (Teorema 7.5)

## Prima di leggere, due domande di controllo

1. Che cosa chiede il problema REACHABILITY?
2. Quando diciamo che una macchina usa spazio $O(\log n)$, che cosa stiamo contando? E che cosa ci sta in $\log n$ celle?

<details><summary>Risposte</summary>

1. Dati un grafo orientato $G$ con $n$ nodi e due nodi $x$ e $y$, chiede se esiste un cammino da $x$ a $y$.
2. Contiamo solo le celle dei nastri di lavoro. L'input si può leggere ma non scrivere, e non entra nel conto. In $\log n$ celle ci sta il nome di un nodo scritto in binario, oppure un contatore che va da 1 a $n$. Con spazio logaritmico puoi quindi tenere a mente un numero costante di nodi, mai l'elenco di quelli già visitati.

</details>

Se la seconda risposta non ti tornava, rileggila: il teorema è un conto di quante etichette di nodo la macchina tiene in memoria nello stesso momento.

## Il problema che Savitch risolve

La visita in profondità o in ampiezza decide REACHABILITY in tempo polinomiale, ma deve segnarsi i nodi già visitati: $n$ bit. Una macchina nondeterministica se la cava con $O(\log n)$: indovina il cammino un nodo alla volta e ricorda solo il nodo corrente e un contatore di passi. Per questo REACHABILITY sta in NL.

Savitch dimostra che a una macchina deterministica bastano $O(\log^2 n)$ celle.

## L'idea: cercare il punto di mezzo

Si aggiunge un parametro al problema:

> $\mathrm{PATH}(x, y, i)$ è vero se in $G$ c'è un cammino da $x$ a $y$ lungo al più $2^i$.

Il parametro $i$ conta quanti dimezzamenti restano: $2^i$ si dimezza in $2^{i-1}$ senza arrotondamenti, fino a $2^0 = 1$, il caso base. "Al più" serve perché le due metà di un cammino non sono sempre uguali: uno di 5 archi si spezza in 3 e 2.

Se un cammino da $x$ a $y$ esiste, ne esiste uno senza nodi ripetuti (si toglie il giro fra due occorrenze dello stesso nodo), quindi con meno di $n$ archi. Siccome $2^{\lceil \log n \rceil} \ge n$, REACHABILITY si riduce a calcolare $\mathrm{PATH}(x, y, \lceil \log n \rceil)$.

Il caso base $i = 0$ (cammini lunghi al più 1) vale se $x = y$ o se c'è l'arco $(x, y)$: basta leggere una casella della matrice di adiacenza.

Per $i \ge 1$, un cammino lungo al più $2^i$ ha un nodo $z$ a metà strada, e le due metà sono lunghe al più $2^{i-1}$. Viceversa, due cammini lunghi al più $2^{i-1}$, da $x$ a $z$ e da $z$ a $y$, formano un cammino lungo al più $2^i$. Quindi

$$\mathrm{PATH}(x, y, i) \iff \exists z : \mathrm{PATH}(x, z, i-1) \land \mathrm{PATH}(z, y, i-1).$$

La macchina prova tutti gli $z$ uno dopo l'altro: per ognuno controlla ricorsivamente la prima metà e, se va bene, la seconda; se una delle due fallisce passa al nodo successivo.

## Un esempio su un grafo con 8 nodi

Prendi il cammino $1 \to 2 \to 3 \to \dots \to 8$. Con $n = 8$ si parte da $\mathrm{PATH}(1, 8, 3)$: c'è un cammino da 1 a 8 lungo al più 8?

La macchina prova $z = 1, 2, 3$ e ogni volta la seconda metà fallisce, perché per esempio da 3 a 8 servono 5 archi e ne sono permessi 4. Con $z = 4$ funzionano entrambe (3 e 4 archi). Mentre verifica la prima metà, la pila delle chiamate scende fino a quattro righe:

```
livello 0   (1, 8, 3)   cammino 1 → 8 lungo ≤ 8?
livello 1   (1, 4, 2)   provo z = 4: cammino 1 → 4 lungo ≤ 4?
livello 2   (1, 2, 1)   provo z = 2: cammino 1 → 2 lungo ≤ 2?
livello 3   (1, 1, 0)   provo z = 1: 1 = 1, vero
```

Quando una chiamata risponde, la sua riga si cancella e lo spazio torna libero per il tentativo successivo. La pila non supera mai $\lceil \log n \rceil + 1$ righe, qui 4.

## Il conto dello spazio

La macchina usa due nastri di lavoro. Il primo fa da pila delle triple: ogni chiamata ricorsiva abbassa $i$ di uno partendo da $\lceil \log n \rceil$, quindi le triple aperte sono al più $\lceil \log n \rceil + 1$, e ognuna contiene due nomi di nodo e il valore di $i$, circa $3 \log n$ bit. La pila occupa quindi $O(\log n) \cdot O(\log n) = O(\log^2 n)$ celle. Il secondo nastro tiene il contatore che scorre i nodi candidati $z$: $O(\log n)$ celle, che non cambiano il totale.

## Dove si inciampa di solito

Le due metà si controllano una dopo l'altra, sulla stessa porzione di nastro. Se la macchina tenesse aperte entrambe le chiamate, o un elenco degli $z$ già scartati, lo spazio crescerebbe. Un tentativo fallito invece non lascia niente in memoria: per sapere da dove ripartire basta il nome dell'ultimo $z$ provato, che sta già nella tripla.

Il tempo è pessimo. Ogni livello prova fino a $n$ candidati e per ognuno fa due chiamate, quindi il tempo cresce come $(2n)^{\log n} = n^{O(\log n)}$, più di qualunque polinomio.
