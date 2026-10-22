# KNAPSACK è NP-completo

## Prima di leggere

1. Che cosa chiede EXACT COVER BY 3-SETS?
2. Quanti bit servono per scrivere in binario un numero che vale $N$?

<details><summary>Risposte</summary>

1. Dati un universo $U = \{1, \dots, 3m\}$ e una famiglia di insiemi $S_1, \dots, S_n$, ognuno con 3 elementi di $U$, chiede se si possono scegliere alcuni insiemi in modo che ogni elemento di $U$ stia in esattamente uno di quelli scelti. È NP-completo.
2. Circa $\log N$: un numero che vale $2^{100}$ si scrive con 101 bit.

</details>

Se la seconda risposta ti sorprende, fermati lì: tutta la prova gioca sulla differenza fra quanto vale un numero e quanto è lungo.

## Che cosa va dimostrato

KNAPSACK dà $n$ oggetti, ognuno con un peso $w_i$ e un valore $v_i$ interi, un limite di peso $W$ e un obiettivo $K$, e chiede se si possono scegliere oggetti con peso totale $\le W$ e valore totale $\ge K$.

Stare in NP è facile: il certificato è l'insieme degli oggetti scelti, e la verifica somma pesi e valori e fa due confronti, in tempo polinomiale.

Per la difficoltà, l'istanza di arrivo contiene solo numeri: una somma deve fare il lavoro di un vincolo combinatorio come "ogni elemento coperto una volta".

## Primo passo: basta un caso particolare

Si guardano solo le istanze con $v_i = w_i$ per ogni oggetto e $K = W$. Peso e valore sono allora la stessa somma, e le due condizioni diventano "somma $\le K$" e "somma $\ge K$": la somma degli oggetti scelti deve essere esattamente $K$.

Basta perché queste sono istanze di KNAPSACK. Se un problema NP-completo si riduce a questo caso particolare, la stessa riduzione finisce dentro KNAPSACK, che quindi è NP-difficile.

## L'idea: un insieme diventa un numero

Si parte da un'istanza di EXACT COVER BY 3-SETS con insiemi $S_1, \dots, S_n$ su $U = \{1, \dots, 3m\}$. Ogni $S_i$ diventa un numero di $3m$ cifre, con la cifra in posizione $j$ uguale a 1 se $j \in S_i$ e a 0 altrimenti. L'obiettivo $K$ è il numero con $3m$ cifre tutte uguali a 1, cioè l'intero universo. Leggendo le cifre in base $n + 1$:

$$w_i = \sum_{j \in S_i} (n+1)^{3m-j}, \qquad K = (n+1)^0 + (n+1)^1 + \dots + (n+1)^{3m-1}.$$

Se si sommano alcuni di questi numeri cifra per cifra, la cifra in posizione $j$ conta quanti insiemi scelti contengono $j$. La somma è $K$ quando ogni cifra vale 1, cioè quando ogni elemento è coperto una volta sola: è una copertura esatta.

Il ragionamento regge solo se la somma cifra per cifra coincide con la somma vera, cioè se non ci sono riporti. Da qui viene la base $n + 1$: una cifra della somma conta insiemi scelti, che sono al più $n$, quindi resta sotto la base e non riporta mai.

## Un esempio in base 5 e in base 2

Prendi $m = 2$, $U = \{1, \dots, 6\}$ e quattro insiemi, quindi $n = 4$ e base 5.

```
posizione        1 2 3 4 5 6
S1 = {1,2,3}     1 1 1 0 0 0
S2 = {4,5,6}     0 0 0 1 1 1
S3 = {1,4,6}     1 0 0 1 0 1
S4 = {2,5,6}     0 1 0 0 1 1
K                1 1 1 1 1 1
```

$S_1$ e $S_2$ formano una copertura esatta, e infatti $S_1 + S_2 = K$ cifra per cifra.

Ora somma $S_2$, $S_3$ e $S_4$. Cifra per cifra viene $1\,1\,0\,2\,2\,3$: l'elemento 3 non è coperto, il 4 e il 5 lo sono due volte, il 6 tre volte. In base 5 questo numero è diverso da $K$, come deve essere.

In base 2 invece le cifre 2 e 3 riportano. In posizione 6 il 3 scrive 1 e riporta 1; in posizione 5 si ha $2 + 1 = 3$, che scrive 1 e riporta 1; lo stesso succede in posizione 4; in posizione 3 il riporto trasforma lo 0 in 1. Il risultato è $111111$, cioè $7 + 37 + 19 = 63 = K$: una falsa soluzione, fatta di tre insiemi che si sovrappongono e lasciano scoperto il 3.

## Il conto della dimensione

Ogni numero ha $3m$ cifre in base $n + 1$ e ogni cifra occupa circa $\log(n+1)$ bit, quindi $O(m \log n)$ bit per numero. I numeri diversi sono $n + 1$ ($w_1, \dots, w_n$ e $K$; i valori $v_i$ e il limite $W$ ne sono copie), quindi l'output ha lunghezza polinomiale e la riduzione si calcola in tempo polinomiale, anzi in spazio logaritmico.

Il valore dei numeri invece è esponenziale: $K$ è circa $(n+1)^{3m-1}$.

## Dove si inciampa di solito

Viene da pensare che basti una base piccola, visto che gli insiemi hanno 3 elementi. Il 3 limita quante cifre di un singolo numero valgono 1. Nella somma una cifra conta quanti insiemi scelti contengono quell'elemento, e un elemento può stare in tutti gli $n$ insiemi della famiglia.

Il teorema sembra in conflitto con l'algoritmo che risolve KNAPSACK in tempo $O(nW)$. Su queste istanze però $W = K$ ha valore esponenziale, e quell'algoritmo impiega tempo esponenziale. Per la stessa ragione la prova non dice niente sulle istanze in cui i numeri sono piccoli.
