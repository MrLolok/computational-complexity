# Teorema di Savitch (Teorema 7.5)

_Versione 4 del test: testo attuale del sito, revisione con humanizer._

## Enunciato

$\mathrm{REACHABILITY} \in \mathrm{SPACE}(\log^2 n)$.

## Intuizione

Un cammino da $x$ a $y$ lungo al più $2^i$ passa per un nodo di mezzo $z$. La macchina prova un $z$ alla volta e verifica ricorsivamente le due metà, riusando lo stesso spazio a ogni tentativo. La ricorsione è profonda $\log n$ e ogni livello usa $O(\log n)$ celle.

## A cosa serve all'esame

Da Savitch seguono i corollari $\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$ e $\mathrm{PSPACE} = \mathrm{NPSPACE}$.

## Frase da esame

Per il teorema di Savitch $\mathrm{REACHABILITY} \in \mathrm{SPACE}(\log^2 n)$: si cerca ricorsivamente il punto di mezzo del cammino, con ricorsione profonda $\log n$ e $O(\log n)$ bit per livello.

## Dimostrazione

1. Sia $G$ un grafo con $n$ nodi, $x$ e $y$ due nodi e $i \ge 0$. Il predicato $\mathrm{PATH}(x, y, i)$ vale se in $G$ c'è un cammino da $x$ a $y$ lungo al più $2^i$. Se $y$ è raggiungibile da $x$, c'è anche un cammino senza nodi ripetuti, lungo al più $n \le 2^{\lceil \log n \rceil}$. Decidere REACHABILITY equivale quindi a decidere $\mathrm{PATH}(x, y, \lceil \log n \rceil)$.
2. Caso base, $i = 0$. Un cammino lungo al più $2^0 = 1$ esiste se $x = y$ oppure se $(x, y)$ è un arco, e la macchina lo verifica leggendo una casella della matrice di adiacenza sul nastro di input.
3. Passo ricorsivo, $i \ge 1$. $\mathrm{PATH}(x, y, i)$ vale se e solo se esiste un nodo $z$ con $\mathrm{PATH}(x, z, i-1)$ e $\mathrm{PATH}(z, y, i-1)$. Il nodo di mezzo $z$ divide un cammino lungo al più $2^i$ in due pezzi lunghi al più $2^{i-1}$; viceversa, due cammini lunghi al più $2^{i-1}$ attaccati formano un cammino lungo al più $2 \cdot 2^{i-1} = 2^i$.
4. La macchina ha il nastro di input, con la matrice di $G$ in sola lettura, e due nastri di lavoro. Il primo è la pila dei record di attivazione: contiene triple $(x, y, i)$ scritte in binario, con il problema corrente più a destra. Il secondo dà $O(\log n)$ celle di appoggio per il contatore che enumera i nodi.
5. La macchina prova i nodi $z$ uno dopo l'altro. Per ciascuno aggiunge in cima alla pila la tripla $(x, z, i-1)$ e la risolve ricorsivamente. Se la risposta è no, cancella la tripla e passa allo $z$ successivo. Se è sì, la sovrascrive con $(z, y, i-1)$, leggendo $y$ dalla tripla a sinistra, e risolve anche questa. Se la seconda risposta è no, cancella e passa allo $z$ successivo. Se è sì, il confronto con la tripla a sinistra le dice che era la seconda chiamata: cancella e risponde sì a $\mathrm{PATH}(x, y, i)$. Se nessuno $z$ funziona, risponde no.
6. Correttezza, per induzione su $i$. Per $i = 0$ vale il punto 2. Se la macchina risponde correttamente per $i-1$, per il punto 3 risponde correttamente anche per $i$.
7. Spazio. Ogni chiamata ricorsiva abbassa $i$ di 1 partendo da $\lceil \log n \rceil$, quindi la pila contiene al più $\lceil \log n \rceil$ triple, più una. Ogni tripla contiene due nodi di $\log n$ bit ciascuno e $i \le \log n$, quindi al più $3 \log n$ simboli. Una chiamata finita cancella la sua tripla, e lo spazio torna disponibile per lo $z$ successivo. In totale $\lceil \log n \rceil \cdot 3 \log n + \log n = O(\log^2 n)$.

Quindi $\mathrm{REACHABILITY} \in \mathrm{SPACE}(\log^2 n)$. Il tempo invece è circa $n^{\log n}$, più che polinomiale: Savitch risparmia solo spazio.

## Storyboard (slideshow)

1. Dimezza il cammino. Per cercare un cammino da x a y lungo al più $2^i$, prova un nodo intermedio z.
2. Controlla entrambe le metà. Servono un cammino x→z e uno z→y, ciascuno lungo al più $2^{i-1}$. Se una metà fallisce, prova un altro z.
3. Ferma la ricorsione. Con i = 0 basta verificare che x = y o che ci sia un arco diretto.
4. Dimostra la correttezza. Un cammino si spezza a metà e due metà valide si concatenano; l'induzione su i giustifica la ricorsione.
5. Riusa la memoria. Risolvi le chiamate una dopo l'altra e cancella i dati di quelle terminate, così in memoria resta un ramo alla volta.
6. Conta pila e record. Su v vertici bastano O(log v) livelli, ognuno con O(log v) bit, per un totale di O(log² v).

## Corollario

Per ogni funzione propria $f(n) \ge \log n$: $\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$.

L'algoritmo di Savitch, applicato al grafo delle configurazioni, che ha $c^{f(n)}$ nodi, usa spazio $\log^2(c^{f(n)}) = O(f(n)^2)$.

Togliere il nondeterminismo costa quindi un quadrato nello spazio, mentre nel tempo, per quanto si sa, costa un esponenziale.
