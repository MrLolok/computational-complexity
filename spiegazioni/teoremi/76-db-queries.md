# Teorema (complessità delle query ai database relazionali)

## Prima di leggere

1. Perché QSAT sta in PSPACE?
2. Che cosa ci sta in $O(\log n)$ celle di memoria?

<details><summary>Risposte</summary>

1. Si valuta la formula ricorsivamente: per ogni quantificatore si prova un valore, poi l'altro, nello stesso spazio. La profondità è il numero di variabili e ogni livello ricorda poco.
2. Un numero costante di contatori o di puntatori all'input, ognuno con valori fino a un polinomio in $n$. Non ci sta una copia dell'input.

</details>

## Tre modi di misurare

Una query booleana risponde sì o no su un database. L'input può contenere la query, il database o entrambi, e a seconda di che cosa varia si parla di:

- combined complexity, se variano sia la query sia il database;
- expression complexity, se il database è fisso e varia la query;
- data complexity, se la query è fissa e varia il database.

|            | algebra relazionale | query congiuntive        |
| ---------- | ------------------- | ------------------------ |
| combined   | PSPACE-completa     | NP-completa              |
| expression | PSPACE-completa     | NP-completa              |
| data       | L-completa          | $\mathrm{AC}^0$-completa |

$\mathrm{AC}^0$ è la classe dei problemi risolti da circuiti di profondità costante e dimensione polinomiale, con porte "e" e "oppure" che accettano un numero qualsiasi di ingressi e porte di negazione; sta dentro L.

Una query booleana in algebra relazionale equivale a una formula del primo ordine (con $\exists$, $\forall$, $\neg$, $\land$, $\lor$) in cui i quantificatori scorrono sugli elementi del database. Da questa corrispondenza vengono tutte le righe della tabella. Le prove sono solo abbozzate.

## Algebra relazionale

La combined complexity sta in PSPACE. Si valuta la formula come l'algoritmo Truth per QSAT, ma ogni quantificatore prova uno alla volta gli elementi del database invece di falso e vero. La profondità è al più la lunghezza della query e ogni livello ricorda un elemento, quindi lo spazio è polinomiale.

È PSPACE-difficile già con il database fisso. Si prende il database con dominio $\{0, 1\}$ e una relazione $T = \{1\}$, da leggere come "è vero", e si trasforma una QBF in una query sostituendo ogni variabile $p$ con l'atomo $T(p)$:

$$\forall p\, \exists q\, (p \lor q) \land (\neg p \lor \neg q) \quad \longmapsto \quad \forall p\, \exists q\, (T(p) \lor T(q)) \land (\neg T(p) \lor \neg T(q)).$$

I quantificatori scorrono su $\{0, 1\}$ e $T(p)$ è vero solo per $p = 1$, quindi la query è vera sul database se e solo se la QBF è vera. Il database resta sempre lo stesso: è difficile già l'expression complexity, e a maggior ragione la combined.

La data complexity sta in L. Con la query fissa, il numero $k$ di variabili è una costante. I quantificatori diventano $k$ cicli annidati sugli elementi del database, cioè $k$ contatori di $O(\log n)$ bit, con $n$ la dimensione del database, e ogni atomo si controlla scorrendo l'input. Per la query "c'è un nodo collegato a tutti", $\exists x\, \forall y\, E(x, y)$, bastano due contatori. Lo schema dà il limite superiore. La completezza dipende dal tipo di riduzioni: con quelle in spazio logaritmico è L-completo ogni problema di L che abbia almeno un'istanza sì e una no, perché la riduzione può risolvere da sola il problema di partenza e scrivere un'istanza sì o un'istanza no fissata. Il dato che conta è quindi l'appartenenza a L.

## Query congiuntive

Una query congiuntiva è $\exists x_1 \dots x_k$ seguito da una congiunzione di atomi, senza $\forall$, negazioni o "oppure".

La combined complexity sta in NP: il certificato è un valore per ogni variabile, e si controlla in tempo polinomiale che ogni atomo stia nel database.

È NP-difficile già con il database fisso, per riduzione da 3-COLORING. Il database contiene la relazione $E$ formata dalle 6 coppie di colori diversi presi da $\{r, g, b\}$. A un grafo con nodi $1, \dots, n$ si associa la query $\exists x_1 \dots x_n \bigwedge E(x_i, x_j)$, con un atomo per ogni arco $[i, j]$: una scelta dei valori è una colorazione, e gli atomi chiedono colori diversi sui nodi adiacenti. Per un triangolo la query $\exists x_1 x_2 x_3\, E(x_1, x_2) \land E(x_2, x_3) \land E(x_1, x_3)$ è vera con $x_1 = r$, $x_2 = g$, $x_3 = b$. Per quattro nodi tutti collegati fra loro è falsa, perché due nodi prendono per forza lo stesso colore.

La data complexity sta in $\mathrm{AC}^0$. Con la query fissa, la risposta è un grande "oppure" sulle $n^k$ scelte dei valori delle variabili, e ogni scelta è un "e" di un numero costante di controlli sul database. Il circuito ha profondità costante e dimensione polinomiale, perché $k$ non dipende dal database.

## Dove si inciampa di solito

Expression e data complexity si scambiano facilmente. Nella data complexity è fissa la query; nelle prove di difficoltà qui sopra è fisso il database e varia la query.

La difficoltà viene dalla query, e c'è chi la attribuisce alla grandezza del database. Con $k$ variabili le scelte sono $n^k$, polinomiali finché $k$ è costante. Quando la query fa parte dell'input, $k$ cresce con lei, e anche le query congiuntive, senza $\forall$ né negazioni, diventano NP-complete.
