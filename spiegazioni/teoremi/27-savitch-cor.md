# Corollario di Savitch (spazio nondeterministico)

## Prima di leggere, due domande di controllo

1. Quanto spazio usa l'algoritmo di Savitch su un grafo con $m$ nodi, e da dove vengono i due fattori?
2. Quante configurazioni ha, al massimo, una macchina che usa spazio $f(n)$ su un input lungo $n$?

<details><summary>Risposte</summary>

1. $O(\log^2 m)$. La pila ha circa $\log m$ triple, una per livello di ricorsione, e ogni tripla contiene due nomi di nodo e un intero, $O(\log m)$ bit.
2. Al più $c^{\log n + f(n)}$ per una costante $c$ che dipende dalla macchina: il $\log n$ viene dalle $n + 1$ posizioni della testina sull'input, $f(n)$ dal contenuto dei nastri di lavoro.

</details>

Se una delle due non ti tornava, rileggi il Teorema di Savitch o il Teorema 7.4 (c): il corollario mette insieme i due.

## Che cosa dice

Per ogni funzione propria $f(n) \ge \log n$: $\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$. Con $f(n) = \log n$ dà $\mathrm{NL} \subseteq \mathrm{SPACE}(\log^2 n)$.

## L'idea

Sia $N$ una macchina nondeterministica che decide $L$ in spazio $f(n)$. $N$ accetta $x$ se e solo se nel grafo delle configurazioni $G(N, x)$ c'è un cammino dalla configurazione iniziale $C_0$ a una configurazione che accetta. Decidere $x$ diventa un problema di REACHABILITY da $C_0$ a $C_{\text{yes}}$, e lo si risolve con Savitch.

$G(N, x)$ però ha un numero di nodi esponenziale in $f(n)$, e scriverlo costerebbe molto più di $f(n)^2$ celle. Savitch non ha bisogno di vederlo scritto: gli servono solo i candidati $z$ per il punto di mezzo e, nel caso base, sapere se c'è un arco.

I candidati $z$ sono tutte le stringhe lunghe $O(f(n))$. Per scorrerle la macchina deve conoscere $f(n)$, e lo calcola in spazio $O(f(n))$ perché $f$ è propria.

Per sapere se $(C, C')$ è un arco, invece di leggere una casella della matrice di adiacenza, la macchina controlla se $C'$ segue da $C$ consultando $\Delta$, in spazio $O(f(n))$.

<details><summary>Confronto tra Savitch e il corollario</summary>

|                       | Savitch su REACHABILITY    | il corollario                        |
| --------------------- | -------------------------- | ------------------------------------ |
| nodi                  | $n$                        | al più $(c^2)^{f(n)}$ configurazioni |
| scrivere un nodo      | $\log n$ bit               | $O(f(n))$ simboli                    |
| profondità della pila | $\lceil \log n \rceil + 1$ | $O(f(n))$                            |
| "c'è l'arco?"         | una casella della matrice  | simulare una mossa di $N$            |
| spazio                | $O(\log^2 n)$              | $O(f(n)^2)$                          |

</details>

## Il conto

Poiché ogni configurazione occupa spazio $O(f(n))$ e le configurazioni sono un numero esponenziale su $f(n)$, la ricorsione di Savitch ha profondità $O(f(n))$ e ogni chiamata occupa spazio $O(f(n))$; quindi lo spazio totale è $O(f(n)^2)$, da cui $\operatorname{NSPACE}(f(n))\subseteq\operatorname{SPACE}(f(n)^2)$.

## Dove si inciampa di solito

Una visita normale del grafo, come quella del Teorema 7.4 (c), esce dal budget di spazio: l'elenco dei nodi già visitati può contenere un numero di configurazioni esponenziale in $f(n)$. La macchina tiene sulla pila soltanto le configurazioni delle triple aperte e calcola gli archi quando servono.

Con $f(n)$ più piccolo di $\log n$ la sola posizione sull'input costa più di tutto il resto della configurazione, e lo spazio diventa $O((\log n + f(n))^2)$, più di $O(f(n)^2)$.
