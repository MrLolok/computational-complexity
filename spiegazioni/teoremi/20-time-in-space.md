# Tempo dato lo spazio (Hopcroft, Paul e Valiant)

## Prima di leggere

Quando una macchina usa spazio $f(n)$, quali celle stiamo contando?

<details><summary>Risposta</summary>

Le celle dei nastri di lavoro su cui la testina è passata almeno una volta. Una cella entra nel conto quando la testina ci arriva sopra, come una variabile che esiste solo dopo che il programma l'ha allocata.

</details>

Se la risposta non ti tornava, rileggila: la prima parte del teorema è solo un conto delle celle toccate.

## L'idea: una cella nuova costa un passo

La prima parte dell'enunciato, $\mathrm{TIME}(f(n)) \subseteq \mathrm{SPACE}(f(n))$, non richiede nessuna costruzione: va bene la stessa macchina.

Sia $M$ una MdT deterministica che decide $L$ in al più $f(n)$ passi. Su ogni nastro la testina parte dalla prima cella e a ogni passo si sposta di al più una posizione, quindi dopo $t$ passi ha toccato al più $t+1$ celle. Con al più $f(n)$ passi, ogni nastro di lavoro usa al più $f(n)+1$ celle, e con un numero costante di nastri lo spazio totale è $O(f(n))$. Per la compressione lineare dello spazio la costante non conta, quindi $L \in \mathrm{SPACE}(f(n))$.

Il caso estremo è una macchina che va sempre a destra scrivendo: in 50 passi tocca 51 celle. Ogni passo in cui la testina torna su una cella già usata non porta spazio nuovo.

## Il raffinamento $f(n)/\log f(n)$

La seconda parte dice di più: $\mathrm{TIME}(f(n)) \subseteq \mathrm{SPACE}(f(n)/\log f(n))$.

1. Si divide il tempo in intervalli di $b$ passi e ogni nastro in blocchi di $b$ celle. In $b$ passi una testina si sposta al più di $b$ celle, quindi durante un intervallo resta nel suo blocco o in uno vicino.
2. Per questo il contenuto di un blocco alla fine di un intervallo dipende solo da un numero costante di blocchi alla fine degli intervalli precedenti. Le dipendenze formano un grafo con circa $f(n)/b$ nodi.
3. Un argomento sul "gioco dei sassolini" (pebbling) mostra che il nodo finale si può calcolare tenendo in memoria contemporaneamente solo $O\big((f(n)/b)/\log(f(n)/b)\big)$ nodi. Gli altri si ricalcolano quando servono, invece di conservarli.
4. Ogni nodo è un blocco di $b$ celle. Lo spazio è $b \cdot \frac{f(n)/b}{\log(f(n)/b)} = \frac{f(n)}{\log(f(n)/b)}$, e scegliendo $b$ in modo che $\log(f(n)/b)$ resti dell'ordine di $\log f(n)$ si ottiene $O(f(n)/\log f(n))$.

Il $\log$ del risultato viene dal punto 3: il gioco dei sassolini su un grafo di $N$ nodi richiede circa $N/\log N$ sassolini. Il risparmio si paga in tempo, perché la macchina ricalcola molte volte gli stessi blocchi.

## Dove si inciampa di solito

Si legge l'inclusione al contrario. Lo spazio non limita il tempo allo stesso modo, perché una macchina può ripassare sulle stesse celle per un numero enorme di passi: un contatore binario su 10 celle passa per tutti i $2^{10} = 1024$ valori senza mai uscire da quelle 10 celle. Con spazio $f(n)$ il tempo può arrivare all'ordine di $c^{f(n)}$, con $c$ costante.
