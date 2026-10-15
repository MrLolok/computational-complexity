# 3-COLORING è NP-completo ($\mathrm{2\text{-}COLORING} \in \mathrm{P}$)

## Prima di leggere

1. Un triangolo si colora con 2 colori? E con 3? Quanti colori diversi compaiono in una sua 3-colorazione?
2. Il ciclo di 5 nodi si colora con 2 colori?

<details><summary>Risposte</summary>

1. Con 2 no, perché i tre nodi sono collegati a due a due. Con 3 sì, e i tre nodi hanno per forza tre colori diversi.
2. No. Alternando i colori lungo il ciclo, il quinto nodo deve essere diverso dal quarto, quindi uguale al primo, ma è collegato al primo.

</details>

Se la seconda risposta non ti tornava: con due colori ogni scelta obbliga i vicini, e un ciclo di lunghezza dispari torna al punto di partenza con il colore sbagliato.

## Il problema

2-COLORING sta in P. In ogni componente connessa si colora un nodo; i suoi vicini sono obbligati ad avere l'altro colore, i loro vicini il primo, e così via con una visita in ampiezza. Il grafo è 2-colorabile se e solo se questa colorazione obbligata non crea conflitti, e il controllo richiede tempo lineare.

Con 3 colori la propagazione si blocca subito: colorato un nodo, ogni vicino ha ancora due colori possibili e niente è obbligato. 3-COLORING sta in NP (il certificato è un colore per nodo, e si controlla ogni arco) ed è NP-completo per riduzione da 3SAT. La riduzione deve far esprimere valori di verità e clausole a un grafo che conosce un solo vincolo: estremi di colore diverso su ogni arco.

## Il primo gadget: i valori di verità

Si mette un triangolo di nodi $V$, $F$, $N$ (vero, falso, neutro). In ogni 3-colorazione hanno tre colori diversi, e ogni colore prende il nome del suo nodo: "il colore $V$" è il colore del nodo $V$, qualunque esso sia. I colori di per sé sono intercambiabili, e il triangolo dà loro un significato.

Per ogni variabile $x$ si mettono due nodi $x$ e $\neg x$, collegati fra loro e al nodo $N$. Nessuno dei due può essere $N$, e sono diversi fra loro: uno è $V$ e l'altro $F$. Colorare questi nodi equivale a scegliere un'assegnazione.

## Il secondo gadget: l'OR

Dati due nodi di ingresso $p$ e $q$, si aggiunge un triangolo $a, b, o$, con $a$ collegato a $p$ e $b$ collegato a $q$; $o$ è l'uscita.

- Se $p$ e $q$ sono entrambi $F$, allora $a$ e $b$ non sono $F$, quindi sono $V$ e $N$ in qualche ordine, e $o$ deve essere $F$.
- Se $p$ o $q$ è $V$, il gadget si può colorare con $o = V$. Con $p = V$ si pone $a = F$, $b = N$, $o = V$; con $q = V$, simmetricamente, $a = N$, $b = F$, $o = V$.

Per la clausola $(\ell_1 \lor \ell_2 \lor \ell_3)$ si mettono due OR in cascata: il primo ha ingressi $\ell_1$ e $\ell_2$, il secondo ha ingressi l'uscita del primo e $\ell_3$. L'uscita finale è collegata ai nodi $F$ e $N$, quindi deve essere $V$.

## Perché funziona

Se il grafo è 3-colorabile, si legge l'assegnazione dai nodi delle variabili. Una clausola con tre letterali $F$ è impossibile: il primo OR avrebbe due ingressi $F$ e quindi uscita $F$, il secondo OR avrebbe di nuovo due ingressi $F$ e uscita $F$, ma l'uscita finale deve essere $V$. Ogni clausola ha quindi un letterale vero.

Se $\varphi$ è soddisfacibile, si colorano $V$, $F$, $N$ e i letterali secondo l'assegnazione. In ogni clausola c'è un letterale $V$. Se è $\ell_1$ o $\ell_2$, il primo OR si colora con uscita $V$, e poi il secondo con uscita $V$. Altrimenti $\ell_1$ e $\ell_2$ sono $F$, il primo OR ha uscita $F$, e il secondo ha uscita $V$ perché $\ell_3$ è $V$.

## Un esempio

Prendi la clausola $(x \lor \neg y \lor z)$ con $x$ falsa, $y$ vera e $z$ vera. Indichiamo con $a_1, b_1, o_1$ il primo OR e con $a_2, b_2, o_2$ il secondo.

| nodo         | colore   | perché                               |
| ------------ | -------- | ------------------------------------ |
| $x$          | $F$      | $x$ è falsa                          |
| $\neg y$     | $F$      | $y$ è vera                           |
| $z$          | $V$      | $z$ è vera                           |
| $a_1$, $b_1$ | $V$, $N$ | vicini di nodi $F$, diversi fra loro |
| $o_1$        | $F$      | l'unico colore rimasto nel triangolo |
| $a_2$        | $N$      | vicino di $o_1 = F$                  |
| $b_2$        | $F$      | vicino di $z = V$                    |
| $o_2$        | $V$      | collegato ai nodi $F$ e $N$          |

Se anche $z$ fosse falsa, la clausola sarebbe falsa e il gadget non si completerebbe: $o_1$ sarebbe obbligato a $F$, poi $a_2$ e $b_2$ prenderebbero $V$ e $N$, e $o_2$ dovrebbe essere $F$, che è vietato.

## Il conto

Con $n$ variabili e $m$ clausole il grafo ha $3 + 2n + 6m$ nodi: il triangolo iniziale, due nodi per variabile, due triangoli per clausola. Gli archi sono $3 + 3n + 12m$: i tre del triangolo; per ogni variabile i tre archi fra $x$, $\neg x$ e $N$; per ogni clausola cinque archi per OR più i due che collegano l'uscita a $F$ e $N$. La dimensione è lineare in $\varphi$.

## Dove si inciampa di solito

Viene da leggere il gadget come una porta OR, ma garantisce solo due cose: due ingressi $F$ obbligano l'uscita $F$, e un ingresso $V$ permette l'uscita $V$. Con un ingresso $V$ l'uscita può anche essere un'altra: con $p = V$ e $q = F$ va bene anche $a = N$, $b = V$, $o = F$. Alla riduzione basta, perché l'uscita finale è costretta a $V$ dall'esterno.

Senza gli archi verso $N$ il primo gadget non funziona: un letterale colorato $N$ non sarebbe né vero né falso.
