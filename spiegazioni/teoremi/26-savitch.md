# Teorema di Savitch (Teorema 7.5)

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Che cosa chiede il problema REACHABILITY?
2. Quando diciamo che una macchina usa spazio $O(\log n)$, che cosa stiamo contando? E che cosa ci sta in $\log n$ celle?

<details><summary>Risposte</summary>

1. Dati un grafo orientato $G$ con $n$ nodi e due nodi $x$ e $y$, chiede se esiste un cammino da $x$ a $y$.
2. Contiamo solo le celle dei nastri di lavoro. L'input si può leggere ma non scrivere, e non entra nel conto. In $\log n$ celle ci sta il nome di un nodo scritto in binario, oppure un contatore che va da 1 a $n$. Con spazio logaritmico puoi quindi tenere a mente un numero costante di nodi, mai l'elenco di quelli già visitati.

</details>

Se la seconda risposta non ti tornava, rileggila prima di proseguire. Tutto il teorema è un conto di quante etichette di nodo la macchina tiene in memoria nello stesso momento.

## Il problema che Savitch risolve

La visita in profondità o in ampiezza decide REACHABILITY in tempo polinomiale, ma deve segnarsi quali nodi ha già visitato: $n$ bit, cioè spazio lineare. Una macchina nondeterministica se la cava con $O(\log n)$: indovina il cammino un nodo alla volta e ricorda solo il nodo corrente e un contatore di passi. Per questo REACHABILITY sta in NL.

Savitch si chiede quanto spazio serva a una macchina deterministica, che non può indovinare. Gli bastano $O(\log^2 n)$ celle, molto meno di $n$.

## L'idea: cercare il punto di mezzo

Si aggiunge un parametro al problema:

> $\mathrm{PATH}(x, y, i)$ è vero se in $G$ c'è un cammino da $x$ a $y$ lungo al più $2^i$.

Il parametro $i$ conta quanti dimezzamenti restano. Una lunghezza massima $2^i$ si dimezza in $2^{i-1}$ senza arrotondamenti, e dopo $i$ dimezzamenti si arriva a $2^0 = 1$, il caso base. Si dice "al più" perché le due metà di un cammino non sono sempre uguali: un cammino di 5 archi si spezza in 3 e 2, entrambi lunghi al più 4.

Se un cammino da $x$ a $y$ esiste, ne esiste anche uno senza nodi ripetuti: se un nodo compare due volte, si toglie il giro fra le due occorrenze. Un cammino così tocca al più $n$ nodi, quindi ha meno di $n$ archi. Siccome $2^{\lceil \log n \rceil} \ge n$, REACHABILITY si riduce a calcolare $\mathrm{PATH}(x, y, \lceil \log n \rceil)$.

Il caso base è $i = 0$, cioè cammini lunghi al più 1. Vale se $x = y$ oppure se c'è l'arco $(x, y)$, e lo si controlla leggendo una casella della matrice di adiacenza.

Per $i \ge 1$ basta un'osservazione. Un cammino lungo al più $2^i$ ha un nodo $z$ a metà strada, e le due metà sono lunghe al più $2^{i-1}$. Viceversa, se trovi un $z$ con un cammino corto da $x$ a $z$ e uno corto da $z$ a $y$, attaccandoli ottieni un cammino lungo al più $2 \cdot 2^{i-1} = 2^i$. Quindi

$$\mathrm{PATH}(x, y, i) \iff \exists z : \mathrm{PATH}(x, z, i-1) \land \mathrm{PATH}(z, y, i-1).$$

La macchina non sa quale sia $z$, così li prova tutti, uno dopo l'altro. Per ogni $z$ controlla ricorsivamente la prima metà; se va bene controlla la seconda; se una delle due fallisce passa al nodo successivo.

## Un esempio su un grafo con 8 nodi

Prendi il cammino $1 \to 2 \to 3 \to \dots \to 8$ e chiediti se 8 è raggiungibile da 1. Con $n = 8$ si parte da $\mathrm{PATH}(1, 8, 3)$: c'è un cammino da 1 a 8 lungo al più 8?

La macchina prova $z = 1, 2, 3$ e ogni volta la seconda metà fallisce, perché per esempio da 3 a 8 servono 5 archi e ne sono permessi 4. Con $z = 4$ le due metà funzionano (3 archi e 4 archi). Mentre verifica la prima metà, la pila delle chiamate scende fino a quattro righe:

```
livello 0   (1, 8, 3)   cammino 1 → 8 lungo ≤ 8?
livello 1   (1, 4, 2)   provo z = 4: cammino 1 → 4 lungo ≤ 4?
livello 2   (1, 2, 1)   provo z = 2: cammino 1 → 2 lungo ≤ 2?
livello 3   (1, 1, 0)   provo z = 1: 1 = 1, vero
```

Ogni riga contiene tre numeri. Quando una chiamata risponde, la sua riga viene cancellata e quello spazio torna libero per il tentativo successivo. In nessun momento la pila ha più di $\lceil \log n \rceil + 1$ righe, qui 4.

## Il conto dello spazio

Ogni chiamata ricorsiva abbassa $i$ di uno partendo da $\lceil \log n \rceil$, quindi sulla pila stanno al più $\lceil \log n \rceil + 1$ triple. Una tripla contiene due nomi di nodo e il valore di $i$, circa $3 \log n$ bit. Un nastro di appoggio di $O(\log n)$ celle basta per scorrere i candidati. Moltiplicando profondità per dimensione:

$$O(\log n) \cdot O(\log n) = O(\log^2 n).$$

I due fattori $\log n$ hanno origini diverse. Il primo conta i livelli, cioè quante volte si dimezza la lunghezza partendo da $n$. Il secondo è la lunghezza in bit del nome di un nodo.

## Dove si inciampa di solito

Le due metà si controllano una dopo l'altra, sulla stessa porzione di nastro. Se la macchina tenesse aperte entrambe le chiamate, o un elenco degli $z$ già scartati, lo spazio crescerebbe. Un tentativo fallito invece non lascia niente in memoria: per sapere da dove ripartire basta il nome dell'ultimo $z$ provato, che sta già nella tripla.

Il tempo è pessimo. Ogni livello prova fino a $n$ candidati e per ognuno fa due chiamate, quindi il tempo cresce come $(2n)^{\log n} = n^{O(\log n)}$, più di qualunque polinomio. Savitch risparmia spazio pagando in tempo.

