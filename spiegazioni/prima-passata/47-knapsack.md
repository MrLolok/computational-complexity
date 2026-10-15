# KNAPSACK è NP-completo

## Prima di leggere

Prova a rispondere a mente prima di andare avanti.

1. Che cosa chiede EXACT COVER BY 3-SETS?
2. Quanti bit servono per scrivere il numero 1000? E il numero $2^{100}$?

<details><summary>Risposte</summary>

1. Dati un universo $U = \{1, \dots, 3m\}$ e una famiglia di insiemi di 3 elementi $S_1, \dots, S_n$, chiede se se ne possono scegliere alcuni che coprono ogni elemento di $U$ esattamente una volta.
2. In binario 1000 occupa 10 bit e $2^{100}$ ne occupa 101. Il valore di un numero può essere esponenziale nella sua lunghezza, e tutta la dimostrazione gira intorno a questa differenza.

</details>

## Il problema

Ci sono $n$ oggetti, ognuno con un peso $w_i$ e un valore $v_i$ interi, un limite di peso $W$ e un obiettivo $K$. KNAPSACK chiede se si possono scegliere oggetti di peso totale $\le W$ e valore totale $\ge K$.

Che stia in NP è facile: il certificato è l'insieme degli oggetti scelti, e le due somme si controllano in tempo polinomiale. Il lavoro sta tutto nella NP-difficoltà.

## L'idea: basta la somma esatta

Si guarda un caso particolare, in cui ogni oggetto ha valore uguale al peso ($v_i = w_i$) e $K = W$. Allora "peso $\le K$" e "valore $\ge K$" riguardano la stessa somma, e insieme dicono che la somma dei numeri scelti vale esattamente $K$. Il caso particolare chiede quindi: dati dei numeri, se ne possono scegliere alcuni con somma $K$?

Le sue istanze sono già istanze di KNAPSACK, quindi se il caso particolare è NP-difficile lo è anche KNAPSACK.

## La riduzione da EXACT COVER BY 3-SETS

Ogni insieme $S_i$ diventa un numero con $3m$ cifre, una per elemento di $U$: la cifra $j$ vale 1 se $j \in S_i$ e 0 altrimenti. L'obiettivo $K$ è il numero con $3m$ cifre tutte uguali a 1, cioè l'universo intero. Se le cifre si sommassero colonna per colonna, scegliere numeri con somma $K$ vorrebbe dire scegliere insiemi che coprono ogni elemento una volta sola.

Il guaio sono i riporti. In base 2 vale $0011 + 0101 + 0111 = 1111$, anche se gli insiemi $\{3, 4\}$, $\{2, 4\}$ e $\{2, 3, 4\}$ si sovrappongono: due 1 nella stessa colonna producono un riporto che finge di coprire la colonna a sinistra.

Per questo i numeri si leggono in base $n + 1$:

$$w_i = \sum_{j \in S_i} (n+1)^{3m-j}, \qquad K = \sum_{k=0}^{3m-1} (n+1)^k.$$

Gli insiemi sono $n$, quindi in qualunque scelta la cifra $j$ della somma conta quanti insiemi scelti contengono $j$, e vale al più $n$. Resta sotto la base $n + 1$ e non genera riporti. Senza riporti la somma è $K$ se e solo se ogni cifra vale esattamente 1, cioè se e solo se ogni elemento sta in uno e un solo insieme scelto: è una copertura esatta.

## Un esempio

Con $U = \{1, \dots, 6\}$ ($m = 2$) e gli insiemi $S_1 = \{1, 2, 3\}$, $S_2 = \{4, 5, 6\}$, $S_3 = \{2, 3, 4\}$ si usa la base 4, perché gli insiemi sono 3.

```
elementi     1 2 3 4 5 6
w1           1 1 1 0 0 0
w2           0 0 0 1 1 1
w3           0 1 1 1 0 0
K            1 1 1 1 1 1

w1 + w2      1 1 1 1 1 1    uguale a K: S1 e S2 sono una copertura esatta
w1 + w3      1 2 2 1 0 0    diverso da K: gli elementi 2 e 3 sono coperti due volte
```

In base 4 la cifra 2 resta un 2 e si vede la sovrapposizione. In base 2 sarebbe diventata un riporto.

## Il conto della dimensione

Ogni numero ha $3m$ cifre in base $n + 1$ e ogni cifra occupa $O(\log n)$ bit, quindi un numero occupa $O(m \log n)$ bit: la riduzione è polinomiale, e si calcola anche in spazio logaritmico. Il valore dei numeri invece arriva a circa $(n+1)^{3m}$, esponenziale nella dimensione dell'istanza.

## Dove si inciampa di solito

Molti pensano che numeri così grandi rendano la riduzione esponenziale. Conta la lunghezza in bit dell'output, che è polinomiale; il valore può essere enorme.

Scrivere i numeri in base 2 sembra più naturale, ma i riporti rompono l'equivalenza, come nell'esempio $0011 + 0101 + 0111$.

L'algoritmo di programmazione dinamica in tempo $O(nW)$ non contraddice il teorema. Sulle istanze prodotte dalla riduzione $W = K$ vale circa $(n+1)^{3m}$, quindi $O(nW)$ è esponenziale; la dimostrazione non dice niente sulle istanze con numeri piccoli, che quell'algoritmo risolve in tempo polinomiale.
