# EXACT TSP è NP-hard (varianti di TSP)

## Prima di leggere

1. Che cosa chiede HAMILTON CYCLE, e in che cosa differisce da HAMILTON PATH?
2. Come si riduce HAMILTON CYCLE a TSP(D)?

<details><summary>Risposte</summary>

1. Chiede se il grafo ha un ciclo che passa una volta per ogni nodo e torna al punto di partenza. HAMILTON PATH chiede solo un cammino che tocchi ogni nodo una volta, senza tornare. Sono entrambi NP-completi.
2. I nodi diventano città, a distanza 1 se c'è l'arco e 2 se non c'è, con budget $B = n$. Un giro ha $n$ tratte di costo almeno 1, quindi costa $\le n$ solo se usa soltanto archi del grafo.

</details>

Se la seconda risposta non ti torna, rileggi la prova che TSP(D) è NP-completo: qui si riusa la stessa costruzione.

## Quattro domande sullo stesso problema

| variante | domanda | risposta |
|---|---|---|
| TSP(D) | esiste un giro di costo $\le B$? | sì o no |
| EXACT TSP | il giro ottimo costa esattamente $B$? | sì o no |
| TSP COST | quanto costa il giro ottimo? | un numero |
| TSP | qual è un giro ottimo? | un giro |

Ognuna si riduce alla successiva. Gli ultimi due passaggi sono banali. Chi sa trovare un giro ottimo somma le sue $n$ tratte e ne ha il costo; chi conosce il costo ottimo $c$ risponde a EXACT TSP confrontando $c$ con $B$.

Il primo passaggio, da TSP(D) a EXACT TSP, non lo è. Sapere se l'ottimo è esattamente $B$ non dice se esiste un giro di costo $\le B$: quando la risposta è no, l'ottimo può essere sopra $B$ oppure sotto. Per questo si passa da HAMILTON CYCLE.

## La riduzione da HAMILTON CYCLE

Dato $G$ con $n$ nodi, si costruiscono $n$ città con $d_{ij} = 1$ se $[i, j]$ è un arco di $G$ e $d_{ij} = 2$ altrimenti, e si pone $B = n$.

Ogni giro ha $n$ tratte, ognuna di costo almeno 1, quindi il giro ottimo costa almeno $n$. Costa esattamente $n$ se e solo se esiste un giro con tutte le tratte di costo 1, cioè fatto solo di archi di $G$: un ciclo hamiltoniano. Quindi

$$G \text{ ha un ciclo hamiltoniano} \iff \text{il giro ottimo costa esattamente } n.$$

Il valore 2 serve solo a rendere ogni coppia senza arco più cara di un arco: andrebbe bene qualunque valore maggiore di 1.

## Un esempio con 4 nodi

Prendi due grafi sui nodi 1, 2, 3, 4. $G_1$ ha gli archi $\{1,2\}$, $\{2,3\}$, $\{3,4\}$, $\{4,1\}$; $G_2$ ha solo i primi tre. Su 4 città ci sono tre giri diversi:

| giro | costo in $G_1$ | costo in $G_2$ |
|---|---|---|
| 1, 2, 3, 4, 1 | $1+1+1+1 = 4$ | $1+1+1+2 = 5$ |
| 1, 2, 4, 3, 1 | $1+2+1+2 = 6$ | $1+2+1+2 = 6$ |
| 1, 3, 2, 4, 1 | $2+1+2+1 = 6$ | $2+1+2+2 = 7$ |

In $G_1$ l'ottimo è 4, uguale a $n$: c'è il ciclo hamiltoniano 1, 2, 3, 4, 1. In $G_2$ l'ottimo è 5, perché manca l'arco $\{4,1\}$ e nessun giro si chiude usando solo archi.

Gli stessi due grafi spiegano perché si parte da HAMILTON CYCLE. Entrambi hanno il cammino hamiltoniano 1, 2, 3, 4, eppure i loro ottimi sono 4 e 5: con HAMILTON PATH nessun valore di $B$ andrebbe bene per tutti i grafi con risposta SÌ.

## Perché EXACT TSP è NP-hard

HAMILTON CYCLE è NP-completo: HAMILTON PATH vi si riduce aggiungendo un nodo nuovo collegato a tutti gli altri. Ogni problema di NP si riduce quindi a HAMILTON CYCLE e, componendo con la riduzione appena vista, a EXACT TSP, perché una composizione di riduzioni è ancora una riduzione. In particolare ci si riduce TSP(D), ed è il primo anello della catena.

## Dove si inciampa di solito

Il teorema dice NP-hard, e la differenza da NP-completo è voluta: la prova dà solo la difficoltà. Per mettere EXACT TSP in NP servirebbe un certificato del fatto che l'ottimo è esattamente $B$. Un giro di costo $B$ mostra che l'ottimo è al più $B$, ma non che manchino giri più economici, e quella seconda metà è una condizione di tipo coNP.
