# REACHABILITY in spazio logaritmico nondeterministico

## Prima di leggere

1. Che cosa chiede REACHABILITY?
2. Quante celle servono per scrivere in binario un numero fra 1 e $n$?

<details><summary>Risposte</summary>

1. Dato un grafo orientato con $n$ nodi e due nodi, se esiste un cammino dal primo al secondo. Qui i nodi sono $1, \ldots, n$, il grafo è dato con la matrice di adiacenza e la domanda è se c'è un cammino da 1 a $n$.
2. Circa $\log n$: con $b$ bit si scrivono $2^b$ numeri diversi. Per $n = 1\,000\,000$ bastano 20 bit.

</details>

Se la seconda risposta non ti torna, rileggila: tutto lo spazio della macchina viene da lì.

## Il problema

Una visita del grafo decide REACHABILITY in tempo polinomiale, ma tiene un segno per ogni nodo già visitato: $n$ bit. Per stare in NL, una macchina nondeterministica deve usare $O(\log n)$ celle sui nastri di lavoro, cioè un numero costante di nomi di nodo. Il nastro di input, con la matrice, non si conta: è in sola lettura.

## L'idea: indovinare un nodo alla volta

La macchina $N$ ha tre nastri. Il primo contiene la matrice. Il secondo contiene il nodo corrente $i$, all'inizio 1. Il terzo contiene il prossimo nodo $j$ del cammino. Se $1 = n$, $N$ risponde subito "yes". Altrimenti ripete:

1. sceglie nondeterministicamente $j$ fra 1 e $n$ e lo scrive in binario sul terzo nastro;
2. legge nella matrice il bit in posizione $(i, j)$;
3. se il bit è 0, l'arco da $i$ a $j$ non c'è e si ferma in "no";
4. se il bit è 1 e $j = n$, si ferma in "yes";
5. altrimenti copia $j$ sul secondo nastro, al posto di $i$, e torna al punto 1.

$N$ non scrive mai il cammino: controlla un arco alla volta e poi dimentica il nodo da cui è partita.

La macchina decide REACHABILITY. Se c'è un cammino $1, v_1, \ldots, v_k = n$, la computazione che sceglie proprio $v_1, v_2, \ldots$ trova sempre il bit 1 e arriva in "yes", e per accettare basta una computazione. Viceversa, una computazione che arriva in "yes" ha controllato ogni arco fra due nodi scelti di fila, quindi quei nodi formano un cammino da 1 a $n$. Se il cammino non c'è, nessuna computazione accetta.

Alcune computazioni possono girare per sempre in un ciclo del grafo. La definizione di decisione nondeterministica lo permette. Volendo, si aggiunge un contatore che fa rifiutare dopo $n$ giri: un cammino senza nodi ripetuti ha meno di $n$ archi, perché se un nodo compare due volte si toglie il giro fra le due occorrenze.

## Un esempio

Grafo con 5 nodi e archi $1 \to 2$, $2 \to 1$, $1 \to 3$, $3 \to 4$, $4 \to 5$. I nomi dei nodi occupano 3 bit. La computazione che accetta:

| giro | nastro 2 ($i$) | scelta $j$ (nastro 3) | bit $(i, j)$ | cosa succede         |
| ---- | -------------- | --------------------- | ------------ | -------------------- |
| 1    | 001            | 011                   | 1            | copia 3 sul nastro 2 |
| 2    | 011            | 100                   | 1            | copia 4 sul nastro 2 |
| 3    | 100            | 101                   | 1            | $j = n$: "yes"       |

Una computazione che al primo giro sceglie $j = 4$ trova il bit 0 e si ferma in "no". Una che sceglie 2, poi 1, poi 2, e così via, gira per sempre fra 1 e 2; con il contatore si ferma in "no" dopo 5 giri. Nessuna delle due cambia la risposta, perché la prima computazione accetta.

## Il conto dello spazio

Il secondo e il terzo nastro contengono sempre un numero fra 1 e $n$ in binario, circa $\log n$ celle ciascuno; il contatore, se c'è, ne aggiunge altrettante. In tutto $O(\log n)$. L'input è lungo circa $n^2$, ma $\log(n^2) = 2 \log n$, quindi lo spazio è logaritmico anche rispetto alla lunghezza dell'input. Con un milione di nodi la matrice ha $10^{12}$ caselle e i nastri di lavoro usano circa 60 bit, contatore compreso.

## Dove si inciampa di solito

Una computazione che finisce in "no" non dice che il cammino manca: ha solo scelto male.

Viene spontaneo far ricordare a $N$ i nodi già visitati, per non girare in tondo. Non serve, e costerebbe $n$ bit: un ramo che gira a vuoto al più non accetta, e il contatore basta a fermarlo.
