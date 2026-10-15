# $\mathrm{2\text{-}SAT} \in \mathrm{P}$

## Prima di leggere

1. Quando è vera la clausola $(a \lor b)$? Se sai che $a$ è falso, che cosa puoi dire di $b$?
2. In quanto tempo si decide se in un grafo orientato c'è un cammino da un nodo $u$ a un nodo $v$?

<details><summary>Risposte</summary>

1. È vera quando almeno uno dei due letterali è vero. Se $a$ è falso, $b$ deve essere vero: la clausola dice la stessa cosa dell'implicazione $\neg a \Rightarrow b$, e anche di $\neg b \Rightarrow a$.
2. In tempo lineare nel numero di nodi e di archi, con una visita in ampiezza o in profondità che parte da $u$. È il problema REACHABILITY.

</details>

Se la prima risposta non ti tornava, scrivi la tabella di verità di $(a \lor b)$ e quella di $\neg a \Rightarrow b$: coincidono riga per riga, e tutta la costruzione parte da qui.

## Il problema

3-SAT è NP-completo. 2-SAT, lo stesso problema con clausole di al più due letterali, si decide in tempo polinomiale, anche se le assegnazioni possibili restano $2^n$.

Con due letterali per clausola, appena un letterale diventa falso l'altro è obbligato. Le scelte si propagano a catena, e la catena si segue su un grafo.

## L'idea: il grafo delle implicazioni

Data $\varphi$ con $n$ variabili, il grafo $G(\varphi)$ ha $2n$ nodi, uno per ogni letterale $x_i$ e $\neg x_i$. Ogni clausola $(a \lor b)$ dà due archi, $\neg a \to b$ e $\neg b \to a$, con la convenzione $\neg\neg x = x$. Una clausola con un solo letterale $(a)$ si legge come $(a \lor a)$ e dà l'arco $\neg a \to a$.

- Gli archi propagano la verità. In un'assegnazione che soddisfa $\varphi$, se c'è un cammino $\ell \leadsto \ell'$ e $\ell$ è vero, allora è vero anche $\ell'$, perché ogni arco è un'implicazione.
- Gli archi vengono a coppie: c'è $u \to v$ se e solo se c'è $\neg v \to \neg u$, perché i due archi di una clausola sono uno il contronominale dell'altro. Quindi da $\ell \leadsto \ell'$ segue $\neg \ell' \leadsto \neg \ell$.
- Se per una variabile valgono sia $x \leadsto \neg x$ sia $\neg x \leadsto x$, la formula è insoddisfacibile: con $x$ vero il primo cammino rende vero $\neg x$, con $x$ falso il secondo rende vero $x$.

Il teorema dice che vale anche il viceversa: se nessuna variabile ha entrambi i cammini, un'assegnazione esiste. Per costruirla, finché resta una variabile senza valore, l'algoritmo sceglie un suo letterale $\ell$ senza cammino $\ell \leadsto \neg \ell$ (esiste, perché per ipotesi i due cammini non ci sono insieme), rende veri $\ell$ e tutti i letterali raggiungibili da $\ell$, e falsi i loro opposti.

La propagazione non crea contraddizioni. Se da $\ell$ si raggiungessero sia $y$ sia $\neg y$, per la simmetria da $y$ si arriverebbe a $\neg \ell$, e quindi $\ell \leadsto y \leadsto \neg \ell$, contro la scelta di $\ell$. Se invece da $\ell$ si raggiungesse un letterale $m$ già reso falso in un giro precedente, per simmetria varrebbe $\neg m \leadsto \neg \ell$. Ma $\neg m$ era stato reso vero insieme a tutto ciò che raggiunge, quindi $\neg \ell$ sarebbe già vero e $\ell$ avrebbe già un valore. Alla fine ogni clausola $(a \lor b)$ è vera: se $a$ è falso, $\neg a$ è vero e l'arco $\neg a \to b$ ha reso vero anche $b$.

## Un esempio

Prendi $\varphi = (x \lor y) \land (\neg x \lor z) \land (\neg y \lor z) \land (\neg z \lor \neg x)$. Gli archi sono:

| clausola | archi |
|---|---|
| $(x \lor y)$ | $\neg x \to y$, $\neg y \to x$ |
| $(\neg x \lor z)$ | $x \to z$, $\neg z \to \neg x$ |
| $(\neg y \lor z)$ | $y \to z$, $\neg z \to \neg y$ |
| $(\neg z \lor \neg x)$ | $z \to \neg x$, $x \to \neg z$ |

C'è il cammino $x \to z \to \neg x$: se $x$ fosse vera, sarebbe vero anche $\neg x$, quindi $x$ deve essere falsa. Da $\neg x$ si raggiungono solo $y$, $z$ e di nuovo $\neg x$, mai $x$. La costruzione sceglie allora $\ell = \neg x$ e rende veri $\neg x$, $y$ e $z$. L'assegnazione con $x$ falsa e $y$, $z$ vere soddisfa le quattro clausole.

Aggiungi ora la clausola $(x \lor \neg y)$, che porta gli archi $\neg x \to \neg y$ e $y \to x$. Adesso c'è anche il cammino $\neg x \to y \to x$, e con $x \to z \to \neg x$ la formula è insoddisfacibile. A parole: $x$ falsa obbliga $y$ vera per la prima clausola, e $y$ vera obbliga $x$ vera per l'ultima.

## Il conto

Il grafo ha $2n$ nodi e due archi per clausola, quindi dimensione lineare in $\varphi$. Per ogni variabile servono due visite, una da $x$ e una da $\neg x$: in tutto $2n$ visite, ognuna in tempo lineare nel grafo, e il totale è polinomiale.

Le due condizioni insieme dicono che $x$ e $\neg x$ stanno nella stessa componente fortemente connessa; calcolando le componenti si scende a tempo lineare.

## Dove si inciampa di solito

Un solo cammino $x \leadsto \neg x$ non rende la formula insoddisfacibile: dice soltanto che $x$ deve essere falsa, come nell'esempio prima dell'ultima clausola.

La stessa idea non funziona con tre letterali. Da $(a \lor b \lor c)$, sapere che $a$ è falso non obbliga niente: solo con $a$ e $b$ entrambi falsi la clausola obbliga $c$. Un'implicazione con due premesse non è un arco, quindi il grafo non la rappresenta e il metodo non si estende a 3-SAT.
