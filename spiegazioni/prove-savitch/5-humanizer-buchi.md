# Teorema di Savitch (Teorema 7.5)

_Versione 5: la versione 4 con i buchi colmati._

## Enunciato

$\mathrm{REACHABILITY} \in \mathrm{SPACE}(\log^2 n)$, dove $n$ è il numero di nodi del grafo.

Lo spazio conta solo le celle dei nastri di lavoro. Il grafo sta sul nastro di input, che la macchina legge e basta, per questo lo spazio può essere molto più piccolo dell'input.

## Intuizione

Un cammino da $x$ a $y$ lungo al più $2^i$ passa per un nodo di mezzo $z$. La macchina prova un $z$ alla volta e verifica ricorsivamente le due metà, riusando lo stesso spazio a ogni tentativo.

Il $\log^2 n$ è il prodotto di due logaritmi con origini diverse. Il primo conta i livelli della ricorsione: a ogni livello la lunghezza massima del cammino si dimezza, e da $n$ si arriva a 1 in $\log n$ dimezzamenti. Il secondo è lo spazio di un livello: il nome di un nodo scritto in binario occupa $\log n$ bit, e ogni livello ne ricorda un numero costante.

## A cosa serve all'esame

Da Savitch seguono i corollari $\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$ e $\mathrm{PSPACE} = \mathrm{NPSPACE}$.

## Frase da esame

Per il teorema di Savitch $\mathrm{REACHABILITY} \in \mathrm{SPACE}(\log^2 n)$: si cerca ricorsivamente il punto di mezzo del cammino, con ricorsione profonda $\log n$ e $O(\log n)$ bit per livello.

## Dimostrazione

1. Sia $G$ un grafo con $n$ nodi, $x$ e $y$ due nodi e $i \ge 0$. Il predicato $\mathrm{PATH}(x, y, i)$ vale se in $G$ c'è un cammino da $x$ a $y$ lungo al più $2^i$.

    Il parametro $i$ conta quanti dimezzamenti restano. Una lunghezza massima $2^i$ si dimezza in $2^{i-1}$ senza arrotondamenti, e dopo $i$ dimezzamenti si arriva a $2^0 = 1$, il caso base. Per questo si usa $2^i$: la profondità della ricorsione coincide con $i$, che scende di 1 a ogni chiamata.

    Si dice "al più" perché le due metà di un cammino non sono sempre uguali. Un cammino di 5 archi si spezza in 3 e 2, ed entrambi sono lunghi al più 4.

2. Il valore iniziale di $i$ viene da qui. Se $y$ è raggiungibile da $x$, esiste anche un cammino senza nodi ripetuti: se un nodo compare due volte, si toglie il giro fra le due occorrenze. Un cammino così tocca al più $n$ nodi, quindi ha meno di $n$ archi. Basta allora un $i$ con $2^i \ge n$, e il più piccolo è $i = \lceil \log n \rceil$ (per $n = 1000$, $i = 10$). Decidere REACHABILITY equivale a decidere $\mathrm{PATH}(x, y, \lceil \log n \rceil)$.
3. Caso base, $i = 0$. Un cammino lungo al più $2^0 = 1$ esiste se $x = y$ oppure se $(x, y)$ è un arco, e la macchina lo verifica leggendo una casella della matrice di adiacenza sul nastro di input.
4. Passo ricorsivo, $i \ge 1$. $\mathrm{PATH}(x, y, i)$ vale se e solo se esiste un nodo $z$ con $\mathrm{PATH}(x, z, i-1)$ e $\mathrm{PATH}(z, y, i-1)$. Il nodo di mezzo $z$ divide un cammino lungo al più $2^i$ in due pezzi lunghi al più $2^{i-1}$; viceversa, due cammini lunghi al più $2^{i-1}$ attaccati formano un cammino lungo al più $2 \cdot 2^{i-1} = 2^i$.
5. La macchina ha il nastro di input, con la matrice di $G$ in sola lettura, e due nastri di lavoro. Il primo è la pila dei record di attivazione: contiene triple $(x, y, i)$ scritte in binario, con il problema corrente più a destra. Il secondo dà $O(\log n)$ celle di appoggio per il contatore che enumera i nodi.
6. La macchina prova i nodi $z$ uno dopo l'altro. Per ciascuno aggiunge in cima alla pila la tripla $(x, z, i-1)$ e la risolve ricorsivamente. Se la risposta è no, cancella la tripla e passa allo $z$ successivo. Se è sì, la sovrascrive con $(z, y, i-1)$, leggendo $y$ dalla tripla a sinistra, e risolve anche questa. Se la seconda risposta è no, cancella e passa allo $z$ successivo. Se è sì, il confronto con la tripla a sinistra le dice che era la seconda chiamata: cancella e risponde sì a $\mathrm{PATH}(x, y, i)$. Se nessuno $z$ funziona, risponde no.

    Per passare allo $z$ successivo la macchina legge $z$ dalla tripla appena risolta e scrive quella con $z + 1$, quindi non tiene un elenco dei nodi già provati.

7. Correttezza, per induzione su $i$. Per $i = 0$ vale il punto 3. Se la macchina risponde correttamente per $i-1$, per il punto 4 risponde correttamente anche per $i$.
8. Spazio, dove compaiono i due logaritmi dell'intuizione. Ogni chiamata ricorsiva abbassa $i$ di 1 partendo da $\lceil \log n \rceil$, quindi la pila contiene al più $\lceil \log n \rceil$ triple, più una. Ogni tripla contiene due nodi di $\log n$ bit ciascuno e $i \le \log n$, quindi al più $3 \log n$ simboli. Una chiamata finita cancella la sua tripla, e lo spazio torna disponibile per lo $z$ successivo. In totale $\lceil \log n \rceil \cdot 3 \log n + \log n = O(\log^2 n)$. Per $n = 1024$ sono al più 11 triple da 30 bit, circa 330 bit, mentre una visita in profondità deve segnare 1024 nodi visitati.

Quindi $\mathrm{REACHABILITY} \in \mathrm{SPACE}(\log^2 n)$. Il tempo invece è circa $n^{\log n}$, più che polinomiale: ogni livello prova fino a $n$ nodi $z$ e per ciascuno fa due chiamate, quindi il tempo si moltiplica per $2n$ a ogni livello e arriva a $(2n)^{\log n}$. Savitch risparmia solo spazio.

## Storyboard (slideshow)

1. Dimezza il cammino. Per cercare un cammino da x a y lungo al più $2^i$, prova un nodo intermedio z.
2. Controlla entrambe le metà. Servono un cammino x→z e uno z→y, ciascuno lungo al più $2^{i-1}$. Se una metà fallisce, prova un altro z.
3. Ferma la ricorsione. Con i = 0 basta verificare che x = y o che ci sia un arco diretto.
4. Dimostra la correttezza. Un cammino si spezza a metà e due metà valide si concatenano; l'induzione su i giustifica la ricorsione.
5. Riusa la memoria. Risolvi le chiamate una dopo l'altra e cancella i dati di quelle terminate, così in memoria resta un ramo alla volta.
6. Conta pila e record. Su n nodi bastano O(log n) livelli, ognuno con O(log n) bit, per un totale di O(log² n).

## Corollario

Per ogni funzione propria $f(n) \ge \log n$: $\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$.

Si prende una macchina nondeterministica $N$ che usa spazio $f(n)$ e si guarda il suo grafo delle configurazioni: i nodi sono le configurazioni, e c'è un arco da $C$ a $C'$ se $N$ passa da $C$ a $C'$ in un passo. $N$ accetta se dalla configurazione iniziale si raggiunge una configurazione accettante, cioè se una certa istanza di REACHABILITY ha risposta sì.

Il grafo ha al più $c^{f(n)}$ nodi, per una costante $c$. Una configurazione è fatta dallo stato, dal contenuto dei nastri di lavoro ($f(n)$ celle ciascuno) e dalla posizione delle testine. Il contenuto dei nastri dà un fattore esponenziale in $f(n)$; la testina di input ha $n + 1$ posizioni, e questo fattore sta sotto $c^{f(n)}$ solo se $f(n) \ge \log n$, per cui l'ipotesi serve.

Il grafo non viene scritto su nastro, perché sarebbe troppo grande. Quando l'algoritmo di Savitch chiede se $(C, C')$ è un arco, la macchina lo calcola al volo dalla funzione di transizione di $N$. Il nome di un nodo ora è una configurazione, lunga $O(f(n))$ invece di $\log n$, e lo spazio diventa $\log^2(c^{f(n)}) = O(f(n)^2)$. L'ipotesi che $f$ sia propria serve a calcolare $f(n)$ all'inizio e sapere quanto spazio riservare a ogni configurazione.

Con $f$ polinomiale anche $f^2$ è un polinomio, quindi $\mathrm{NPSPACE} \subseteq \mathrm{PSPACE}$. L'altra inclusione è immediata e dà $\mathrm{PSPACE} = \mathrm{NPSPACE}$.

Togliere il nondeterminismo costa quindi un quadrato nello spazio, mentre nel tempo, per quanto si sa, costa un esponenziale.
