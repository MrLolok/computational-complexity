# Teorema di Savitch (Teorema 7.5)

Testo attuale del sito (`theorems.ts`, `theoremProofs.json`, `theoremWalkthroughs.json`), senza modifiche.

## Enunciato

$\mathrm{REACHABILITY} \in \mathrm{SPACE}(\log^2 n)$.

## Intuizione

Un cammino lungo al più $2^i$ da $x$ a $y$ ha un punto di mezzo $z$: si prova ogni $z$ ricorsivamente riusando lo spazio; la ricorsione è profonda $\log n$ e ogni livello usa $O(\log n)$ celle.

## A cosa serve all'esame

È la base dei corollari $\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$ e $\mathrm{PSPACE} = \mathrm{NPSPACE}$.

## Frase da esame

Per il teorema di Savitch $\mathrm{REACHABILITY} \in \mathrm{SPACE}(\log^2 n)$: si cerca ricorsivamente il punto di mezzo del cammino, con ricorsione profonda $\log n$ e $O(\log n)$ bit per livello.

## Dimostrazione

Idea: un cammino da $x$ a $y$ lungo al più $2^i$ ha un nodo di mezzo $z$, da cui $x$ e $y$ distano al più $2^{i-1}$. Si prova ogni $z$, uno alla volta, risolvendo ricorsivamente le due metà e riusando lo spazio. La ricorsione è profonda $\log n$ e ogni livello ricorda solo $O(\log n)$ bit.


1. **Il predicato.** Sia $G$ un grafo con $n$ nodi, $x$ e $y$ due nodi, $i \ge 0$. $\mathrm{PATH}(x, y, i)$ vale se in $G$ c'è un cammino da $x$ a $y$ lungo al più $2^i$. Se $y$ è raggiungibile da $x$, c'è un cammino senza nodi ripetuti, quindi lungo al più $n \le 2^{\lceil \log n \rceil}$. Perciò REACHABILITY equivale a decidere $\mathrm{PATH}(x, y, \lceil \log n \rceil)$.
1. **Caso base $i = 0$.** Un cammino lungo al più $2^0 = 1$ esiste se $x = y$ oppure se $(x, y)$ è un arco: basta guardare una casella della matrice di adiacenza sul nastro di input.
1. **Passo ricorsivo $i \ge 1$.** $\mathrm{PATH}(x, y, i)$ vale se e solo se esiste un nodo $z$ con $\mathrm{PATH}(x, z, i-1)$ e $\mathrm{PATH}(z, y, i-1)$. Perché: se c'è un cammino lungo al più $2^i$, il nodo $z$ a metà lo divide in due pezzi lunghi al più $2^{i-1}$; viceversa, attaccando due cammini lunghi al più $2^{i-1}$ si ottiene un cammino lungo al più $2 \cdot 2^{i-1} = 2^i$.
1. **La macchina.** Ha il nastro di input (la matrice di $G$, solo lettura) e due nastri di lavoro. Il primo fa da pila dei record di attivazione: contiene triple $(x, y, i)$ scritte in binario, con il problema corrente più a destra. Il secondo è spazio di appoggio di $O(\log n)$ celle (contatore per enumerare i nodi).
1. **Come si esegue la ricorsione.** Per ogni nodo $z$, uno dopo l'altro: si aggiunge in cima la tripla $(x, z, i-1)$ e la si risolve ricorsivamente. Se la risposta è no, si cancella la tripla e si passa allo $z$ successivo. Se è sì, si sovrascrive con $(z, y, i-1)$ ($y$ si legge dalla tripla a sinistra) e la si risolve. Se è no, si cancella e si passa allo $z$ successivo; se è sì, confrontando con la tripla a sinistra la macchina capisce che era la seconda chiamata, cancella e risponde sì a $\mathrm{PATH}(x, y, i)$. Se nessuno $z$ funziona, risponde no.
1. **Correttezza.** Per induzione su $i$: per $i = 0$ vale il passo 2; se la macchina risponde bene per $i-1$, allora per il passo 3 risponde bene per $i$.
1. **Spazio.** Ogni chiamata ricorsiva abbassa $i$ di 1 partendo da $\lceil \log n \rceil$, quindi sulla pila ci sono al più $\lceil \log n \rceil$ ($+1$) triple. Ogni tripla contiene due nodi ($\log n$ bit ciascuno) e $i \le \log n$: al più $3 \log n$ simboli. Quando una chiamata finisce la sua tripla viene cancellata, così lo spazio per i vari $z$ è riusato. Totale: $\lceil \log n \rceil \cdot 3 \log n + \log n = O(\log^2 n)$.

Quindi $\mathrm{REACHABILITY} \in \mathrm{SPACE}(\log^2 n)$. Attenzione: il tempo è circa $n^{\log n}$, non polinomiale; Savitch risparmia spazio, non tempo.

## Storyboard (slideshow)

1. **Dimezza il cammino.** Per cercare un cammino da x a y di lunghezza al più $2^i$, prova un possibile punto intermedio z.
2. **Controlla entrambe le metà.** Servono un cammino x→z e uno z→y, ciascuno lungo al più $2^{i-1}$. Se una metà fallisce, prova un altro z.
3. **Ferma la ricorsione.** Quando i = 0, basta verificare x = y oppure un arco diretto. Questo rende il test di base esatto.
4. **Dimostra la correttezza.** Un cammino si può spezzare a metà; due metà valide si possono concatenare. L’induzione su i giustifica la ricorsione.
5. **Riusa la memoria.** Risolvi le chiamate una dopo l’altra e cancella i dati delle chiamate terminate. Non memorizzare tutti i rami contemporaneamente.
6. **Conta pila e record.** Su v vertici bastano O(log v) livelli, ognuno con O(log v) bit. Il prodotto è O(log² v): il risparmio riguarda lo spazio.

Su v vertici bastano O(log v) livelli, ognuno con O(log v) bit. Il prodotto è O(log² v): il risparmio riguarda lo spazio.

## Corollario

Per ogni funzione propria $f(n) \ge \log n$: $\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$.

Si applica l'algoritmo di Savitch al grafo delle configurazioni, che ha $c^{f(n)}$ nodi: $\log^2(c^{f(n)}) = O(f(n)^2)$.

Togliere il nondeterminismo costa solo un quadrato nello spazio, mentre nel tempo (per quanto si sa) costa un esponenziale.
