# Corollario: CLIQUE e NODE COVER sono NP-completi

## Prima di leggere

1. Che cosa chiede INDEPENDENT SET, e che cosa sappiamo della sua complessità?
2. Dato un grafo $G$, che cos'è il grafo complementare $\bar G$?

<details><summary>Risposte</summary>

1. Dati un grafo $G$ e un intero $K$, chiede se ci sono $K$ nodi senza archi fra loro. È NP-completo, per riduzione da 3SAT.
2. Ha gli stessi nodi di $G$, e ha l'arco $[i, j]$ fra due nodi distinti esattamente quando $G$ non ce l'ha.

</details>

## Il problema

CLIQUE chiede se $G$ ha $K$ nodi collegati a due a due. NODE COVER chiede se $G$ ha al più $B$ nodi che toccano tutti gli archi, cioè tali che ogni arco ha almeno un estremo fra loro. Entrambi stanno in NP: il certificato è l'insieme di nodi, e si controllano le coppie nel primo caso, gli archi nel secondo. Per la difficoltà basta riscrivere un'istanza di INDEPENDENT SET, senza costruire gadget nuovi a partire da 3SAT.

## Le due riduzioni

Per CLIQUE si cambiano gli archi e si tiene lo stesso insieme. $I$ è indipendente in $G$ se nessuna coppia di nodi di $I$ è un arco di $G$, cioè se ogni coppia di nodi di $I$ è un arco di $\bar G$, cioè se $I$ è una cricca di $\bar G$. La riduzione manda $(G, K)$ in $(\bar G, K)$. Si calcola in spazio logaritmico: per ogni coppia di nodi si legge un bit della matrice di adiacenza e lo si nega.

Per NODE COVER si tiene lo stesso grafo e si cambia l'insieme. $I$ è indipendente se e solo se $V - I$ è una copertura: un arco $[i, j]$ resta scoperto da $V - I$ esattamente quando $i$ e $j$ stanno entrambi in $I$, cioè quando $I$ non è indipendente. Con $n$ nodi la riduzione manda $(G, K)$ in $(G, B)$ con $B = n - K$.

Il budget di NODE COVER è un "al più". Se una copertura $C$ ha meno di $n - K$ nodi, le si aggiungono nodi fino ad averne esattamente $n - K$, perché aggiungere nodi non scopre nessun arco; allora $V - C$ ha $K$ nodi ed è indipendente. Se $K > n$ la risposta è no, e la riduzione produce un'istanza no fissa.

## Un esempio

$G$ ha nodi $A, B, C, D$ e archi $AB$, $BC$, $CD$. I suoi insiemi indipendenti di 2 nodi sono $\{A, C\}$, $\{A, D\}$ e $\{B, D\}$.

- Il complementare $\bar G$ ha gli archi $AC$, $AD$, $BD$, cioè esattamente le coppie indipendenti di $G$. Le cricche di 2 nodi di $\bar G$ sono quindi le stesse tre coppie.
- In $G$, $V - \{A, C\} = \{B, D\}$ tocca $AB$, $BC$ e $CD$: è una copertura di $4 - 2 = 2$ nodi.

## Dove si inciampa di solito

Si confondono i due complementi. Per NODE COVER il grafo resta $G$: nell'esempio $\{B, D\}$ copre tutti gli archi di $G$, ma in $\bar G$ lascia scoperto l'arco $AC$. Per CLIQUE, al contrario, l'insieme resta $I$ e $K$ resta $K$; solo per NODE COVER il numero diventa $n - K$.
