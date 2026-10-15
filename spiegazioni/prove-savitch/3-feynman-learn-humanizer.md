# Teorema di Savitch

*Versione 3 del test: struttura della skill feynman, approccio della skill learn, revisione con humanizer.*

Concetto: perché una macchina deterministica decide REACHABILITY usando solo $O(\log^2 n)$ celle di memoria, e che cosa ne segue per le classi di spazio.

Prima di cominciare, una domanda di controllo: sai dire perché REACHABILITY sta in NL? Se la risposta è "la macchina indovina il cammino un nodo alla volta e ricorda solo il nodo corrente e un contatore", sei pronto. Se no, ripassa NL prima di leggere il resto.

## 1. Spiegato semplice

Hai una mappa di città collegate da strade a senso unico e vuoi sapere se da Aosta si arriva a Lecce. Il problema è la memoria: hai un taccuino minuscolo, dove non c'è posto per segnare tutte le città già visitate.

Allora ragioni così. Se da Aosta a Lecce c'è un percorso di al più 16 tappe, deve esserci una città a metà strada, raggiungibile da Aosta in al più 8 tappe e da cui Lecce è raggiungibile in al più 8. Non sai quale sia, quindi provi le città una alla volta. Per ogni candidata ti fai la stessa domanda sulle due metà, con 8 tappe al posto di 16, poi 4, poi 2, poi 1. Con una tappa sola basta guardare la mappa: o la strada c'è o non c'è.

Il trucco per il taccuino è risolvere una domanda alla volta e cancellarla appena hai la risposta. In ogni momento sul taccuino ci sono solo le domande ancora aperte, una per ogni dimezzamento, e ciascuna occupa una riga.

### Analogia

È come cercare una parola nel dizionario aprendolo a metà, poi a metà della metà, e così via. Il numero di aperture cresce pochissimo anche se il dizionario è enorme: per 1000 pagine ne bastano una decina. Nel teorema di Savitch il numero di dimezzamenti è $\log n$.

## 2. Dove la spiegazione semplice zoppica

| | Che cosa ho detto | Che cosa resta da chiarire |
|---|---|---|
| 1 | "Un percorso di al più 16 tappe" | Da quale lunghezza si parte, per un grafo qualsiasi? |
| 2 | "Una riga per ogni dimezzamento" | Quanto è lunga una riga, misurata in bit? |
| 3 | "Provi le città una alla volta" | Provarle tutte richiede molto tempo. Quanto? |
| 4 | L'analogia del dizionario | La ricerca nel dizionario butta via una metà; Savitch deve controllarle entrambe. |
| 5 | Il titolo parla di classi di spazio | Che cosa c'entra un grafo di città con NSPACE e PSPACE? |

Termini tecnici usati finora: REACHABILITY (dato un grafo orientato con $n$ nodi e due nodi $x$, $y$, esiste un cammino da $x$ a $y$?), spazio (le celle dei nastri di lavoro che la macchina usa; l'input si legge soltanto e non si conta), NL (i problemi decisi da una macchina nondeterministica in spazio $O(\log n)$).

## 3. Come si colmano i buchi

### Da quale lunghezza si parte

Si definisce $\mathrm{PATH}(x, y, i)$: vero se c'è un cammino da $x$ a $y$ lungo al più $2^i$. Se un cammino esiste, ne esiste uno senza nodi ripetuti, con al più $n$ archi, e $2^{\lceil \log n \rceil} \ge n$. Quindi REACHABILITY equivale a $\mathrm{PATH}(x, y, \lceil \log n \rceil)$, e da lì i dimezzamenti sono $\lceil \log n \rceil$. Il caso base $i = 0$ vale se $x = y$ oppure se c'è l'arco $(x, y)$. Il passo ricorsivo è

$$\mathrm{PATH}(x, y, i) \iff \exists z : \mathrm{PATH}(x, z, i-1) \land \mathrm{PATH}(z, y, i-1),$$

corretto in entrambe le direzioni: un cammino lungo si spezza a metà, e due cammini corti si attaccano. La correttezza dell'algoritmo segue per induzione su $i$.

### Quanto è lunga una riga

Una riga del taccuino è la tripla $(x, y, i)$: due nomi di nodo e un numero che non supera $\lceil \log n \rceil$, circa $3 \log n$ bit in tutto. Con al più $\lceil \log n \rceil + 1$ righe aperte lo spazio è $O(\log n) \cdot O(\log n) = O(\log^2 n)$. Il nome dello $z$ che si sta provando sta già nella tripla della chiamata in corso, quindi dopo un tentativo fallito la macchina sa da dove ripartire senza tenere un elenco dei candidati scartati.

Su un cammino $1 \to 2 \to \dots \to 8$, nel momento più profondo il taccuino contiene quattro righe:

```
(1, 8, 3)   cammino 1 → 8 lungo ≤ 8?    provo z = 4
(1, 4, 2)   cammino 1 → 4 lungo ≤ 4?    provo z = 2
(1, 2, 1)   cammino 1 → 2 lungo ≤ 2?    provo z = 1
(1, 1, 0)   1 = 1, vero
```

### Quanto tempo

Ogni livello prova fino a $n$ candidati e per ognuno fa due chiamate ricorsive. Il tempo cresce come $(2n)^{\log n} = n^{O(\log n)}$, più di qualunque polinomio. Savitch risparmia memoria e paga in tempo, per cui il teorema non dice niente su P contro NP.

### Dove l'analogia del dizionario si rompe

Nel dizionario, dopo ogni apertura scarti una metà. Qui le due metà vanno controllate entrambe, ma una dopo l'altra, sulla stessa porzione di taccuino. L'analogia regge per la profondità ($\log n$ livelli) e non per il lavoro totale, che è il motivo per cui il tempo esplode.

### Che cosa c'entrano le classi

Una macchina nondeterministica che usa spazio $f(n)$ ha al più $c^{f(n)}$ configurazioni. Accetta se nel grafo delle configurazioni dalla configurazione iniziale si raggiunge una accettante: è REACHABILITY su un grafo con $c^{f(n)}$ nodi. Savitch lo risolve in spazio $\log^2(c^{f(n)}) = O(f(n)^2)$, calcolando al volo, in spazio $O(f(n))$, se una configurazione segue da un'altra. Serve $f(n) \ge \log n$, perché una configurazione deve contenere la posizione della testina sull'input. Ne segue $\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$, e con $f$ polinomiale $\mathrm{PSPACE} = \mathrm{NPSPACE}$.

## 4. La spiegazione rifatta

Per sapere se da $x$ si arriva a $y$ in un grafo con $n$ nodi, la macchina di Savitch si chiede se c'è un cammino lungo al più $2^{\lceil \log n \rceil}$. Per rispondere prova ogni nodo $z$ come punto di mezzo e si fa due domande più piccole, con lunghezza dimezzata, una alla volta. Quando le lunghezze arrivano a 1 legge direttamente la matrice di adiacenza. Le domande aperte nello stesso momento sono al più $\lceil \log n \rceil + 1$, ognuna di $O(\log n)$ bit, e una domanda chiusa libera il suo spazio. Totale $O(\log^2 n)$ in spazio, $n^{O(\log n)}$ in tempo.

Applicato al grafo delle configurazioni di una macchina nondeterministica, lo stesso algoritmo dà $\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$ per $f(n) \ge \log n$, e quindi $\mathrm{PSPACE} = \mathrm{NPSPACE}$. Nello spazio togliere il nondeterminismo costa un quadrato; nel tempo, per quanto si sa, costa un esponenziale.

### Analogia rivista

Una pila di post-it sulla scrivania. Ogni post-it dice "da qui a là in al più tot passi?". Quando spezzi una domanda in due, scrivi un post-it per la prima metà e lo appoggi in cima; quando ha risposta lo stacchi e ne scrivi uno per la seconda metà. La pila non supera mai $\log n$ post-it più uno, e ognuno contiene tre numeri. Puoi riempire e staccare migliaia di post-it, ma la scrivania ne regge pochi alla volta, ed è la scrivania che conta come spazio.

### Le idee da ricordare

1. La ricorsione sul punto di mezzo ha profondità $\lceil \log n \rceil$.
2. Ogni livello ricorda una tripla di $O(\log n)$ bit, e i tentativi riusano lo stesso spazio.
3. Il prezzo è il tempo, $n^{O(\log n)}$.
4. Sul grafo delle configurazioni il teorema diventa $\mathrm{NSPACE}(f) \subseteq \mathrm{SPACE}(f^2)$ e $\mathrm{PSPACE} = \mathrm{NPSPACE}$.

## Prova a dirlo in 30 secondi

Prima di leggere la risposta, prova a spiegarlo a voce in mezzo minuto, come se fosse la prima domanda dell'orale.

<details><summary>Una versione possibile</summary>

> REACHABILITY sta in $\mathrm{SPACE}(\log^2 n)$. Un cammino da $x$ a $y$ lungo al più $2^i$ ha un punto di mezzo $z$: provo tutti gli $z$ uno alla volta e verifico ricorsivamente le due metà, riusando lo spazio. La ricorsione è profonda $\log n$ e ogni livello tiene una tripla di $O(\log n)$ bit. Applicato al grafo delle configurazioni, dà $\mathrm{NSPACE}(f) \subseteq \mathrm{SPACE}(f^2)$ e quindi $\mathrm{PSPACE} = \mathrm{NPSPACE}$.

</details>
