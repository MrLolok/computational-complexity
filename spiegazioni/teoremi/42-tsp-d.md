# TSP(D) è NP-completo

## Prima di leggere

1. Che differenza c'è fra TSP e TSP(D)?
2. Un giro che visita $n$ città e torna alla prima quante tratte ha?

<details><summary>Risposte</summary>

1. TSP chiede il giro più corto, ed è un problema di ottimizzazione. TSP(D) è la versione di decisione: dato un budget $B$, chiede se esiste un giro di costo al più $B$, e la risposta è sì o no.
2. $n$: $n - 1$ tratte fra città consecutive più quella di ritorno.

</details>

Tieni a mente la seconda risposta, perché tutta la prova è un conto sulle $n$ tratte.

## Il problema

Un'istanza di TSP(D) è una matrice delle distanze $d_{ij}$ fra $n$ città e un budget $B$. Il problema sta in NP: il certificato è un giro, cioè un ordine delle città, e si controlla che ogni città compaia una volta e che la somma delle $n$ distanze, ritorno compreso, sia al più $B$.

Per la difficoltà si parte da HAMILTON CYCLE: c'è un ciclo che passa per ogni nodo una volta e torna all'inizio? HAMILTON CYCLE è NP-completo. Sta in NP come HAMILTON PATH, e HAMILTON PATH vi si riduce aggiungendo a $G$ un nodo nuovo $u$ collegato a tutti i nodi. Se $G$ ha un cammino hamiltoniano $v_1, \dots, v_n$, allora $u, v_1, \dots, v_n, u$ è un ciclo hamiltoniano del nuovo grafo; togliendo $u$ da un ciclo hamiltoniano del nuovo grafo resta un cammino che tocca tutti i nodi di $G$ usando solo archi di $G$.

## La costruzione

Dato $G$ con $n$ nodi, si crea una città per nodo e si pone

$$d_{ij} = \begin{cases} 1 & \text{se } [i, j] \text{ è un arco di } G, \\ 2 & \text{altrimenti,} \end{cases}$$

con budget $B = n$.

Un giro di $n$ città ha $n$ tratte, ognuna di costo almeno 1, quindi costa almeno $n$. Da questo limite dal basso segue

$$\text{costo} \le n \iff \text{costo} = n \iff \text{ogni tratta costa } 1 \iff \text{ogni tratta è un arco di } G.$$

Se $G$ ha un ciclo hamiltoniano, percorrerlo come giro costa $n$. Se c'è un giro di costo al più $n$, tutte le sue tratte sono archi di $G$, e quel giro è un ciclo hamiltoniano. Ogni casella della matrice dipende da un solo arco, quindi la riduzione si calcola in spazio logaritmico.

Il valore 2 non ha niente di speciale: andrebbe bene qualunque intero maggiore di 1, perché basta che una tratta fuori dal grafo faccia sforare il budget. Con 2 i numeri restano piccoli, quindi TSP(D) è difficile anche quando le distanze sono piccole: è NP-completo in senso forte.

## Un esempio

$G$ ha nodi 1, 2, 3, 4 e archi $[1, 2]$, $[2, 3]$, $[3, 4]$, $[4, 1]$, $[1, 3]$. La matrice è:

|   | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 1 | 0 | 1 | 1 | 1 |
| 2 | 1 | 0 | 1 | 2 |
| 3 | 1 | 1 | 0 | 1 |
| 4 | 1 | 2 | 1 | 0 |

Il giro $1, 2, 3, 4, 1$ costa $1 + 1 + 1 + 1 = 4 = B$: è il ciclo hamiltoniano di $G$. Il giro $1, 3, 2, 4, 1$ costa $1 + 1 + 2 + 1 = 5$, perché usa la coppia $[2, 4]$, che non è un arco.

Togli ora l'arco $[4, 1]$. Il nodo 4 resta con il solo arco $[3, 4]$. In ogni giro la città 4 ha due tratte, e al più una costa 1, quindi ogni giro costa almeno 5 e la risposta è no, come per HAMILTON CYCLE su questo grafo.

## Dove si inciampa di solito

Si parte da HAMILTON CYCLE, non da HAMILTON PATH, perché il giro torna alla prima città. Ridurre direttamente da HAMILTON PATH obbligherebbe a gestire la tratta di ritorno, che nel cammino non c'è.

"Costo al più $B$" e "costo uguale a $B$" qui coincidono solo perché nessun giro costa meno di $n$. In generale TSP(D) chiede "al più".
