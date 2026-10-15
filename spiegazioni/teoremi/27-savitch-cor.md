# Corollario di Savitch (spazio nondeterministico)

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Quanto spazio usa l'algoritmo di Savitch su un grafo con $m$ nodi, e da dove vengono i due fattori?
2. Quante configurazioni ha, al massimo, una macchina che usa spazio $f(n)$ su un input lungo $n$?

<details><summary>Risposte</summary>

1. $O(\log^2 m)$. La pila ha circa $\log m$ triple, una per livello di ricorsione, e ogni tripla contiene due nomi di nodo e un intero, $O(\log m)$ bit.
2. Al più $c^{\log n + f(n)}$ per una costante $c$ che dipende dalla macchina: il $\log n$ viene dalle $n + 1$ posizioni della testina sull'input, $f(n)$ dal contenuto dei nastri di lavoro.

</details>

Se una delle due non ti tornava, rileggi il Teorema di Savitch o il Teorema 7.4 (c): il corollario mette insieme i due.

## Che cosa dice

Per ogni funzione propria $f(n) \ge \log n$:

$$\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2).$$

Il Teorema di Savitch parla di un grafo scritto sul nastro di input. Qui il grafo è quello delle configurazioni di una macchina nondeterministica $N$, e ha un numero di nodi esponenziale in $f(n)$: scriverlo costerebbe molto più di $f(n)^2$ celle, quindi la dimostrazione esegue Savitch senza scriverlo.

## L'idea

$x$ è accettato se e solo se nel grafo delle configurazioni $G(N, x)$ c'è un cammino dalla configurazione iniziale $C_0$ a una configurazione che accetta. Si può supporre che $N$, prima di accettare, cancelli i nastri e riporti le testine all'inizio. Così la configurazione che accetta è una sola, $C_{\text{yes}}$, ed è il nodo di arrivo che serve al predicato $\mathrm{PATH}$ di Savitch, che ne ha uno solo.

Si esegue Savitch con partenza $C_0$, arrivo $C_{\text{yes}}$ e $i = \lceil \log(\text{numero di configurazioni}) \rceil$. Rispetto al grafo dato in input cambiano i candidati per il punto di mezzo e il caso base.

I candidati $z$ per il punto di mezzo sono tutte le stringhe lunghe $O(f(n))$. Per scorrerle la macchina deve sapere quanto è lungo $f(n)$, e qui serve l'ipotesi: $f$ è propria, cioè si calcola in spazio $O(f(n))$.

Nel caso base non c'è una matrice di adiacenza da leggere. Per sapere se $(C, C')$ è un arco la macchina controlla se $C'$ segue da $C$ con una mossa di $N$: legge il simbolo di $x$ sotto la testina indicata da $C$ e consulta la relazione di transizione $\Delta$. Il controllo usa spazio $O(f(n))$.

| | Savitch su REACHABILITY | il corollario |
|---|---|---|
| nodi | $n$ | al più $(c^2)^{f(n)}$ configurazioni |
| scrivere un nodo | $\log n$ bit | $O(f(n))$ simboli |
| profondità della pila | $\lceil \log n \rceil + 1$ | $O(f(n))$ |
| "c'è l'arco?" | una casella della matrice | simulare una mossa di $N$ |
| spazio | $O(\log^2 n)$ | $O(f(n)^2)$ |

## Il conto

L'ipotesi $f(n) \ge \log n$ entra due volte. Una configurazione contiene la posizione della testina sull'input, $\log n$ bit, più il contenuto dei nastri di lavoro: in tutto $O(\log n + f(n)) = O(f(n))$ simboli. Il numero di configurazioni è al più $c^{\log n + f(n)} \le c^{2 f(n)} = (c^2)^{f(n)}$.

Allora $i = O(f(n))$, perché il logaritmo di $(c^2)^{f(n)}$ è $2 f(n) \log c$. La pila contiene $O(f(n))$ triple, e ognuna ha due configurazioni e un intero, $O(f(n))$ simboli. Moltiplicando:

$$O(f(n)) \cdot O(f(n)) = O(f(n)^2).$$

È la stessa cosa che si ottiene mettendo nel $\log^2 m$ di Savitch il numero di nodi: $\log^2(c^{f(n)}) = (f(n) \log c)^2 = O(f(n)^2)$. Lo spazio $O(f(n))$ per controllare gli archi si somma e non cambia l'ordine.

Con $f(n) = \log n$ si ottiene $\mathrm{NL} \subseteq \mathrm{SPACE}(\log^2 n)$.

## Dove si inciampa di solito

Una visita normale del grafo, come quella del Teorema 7.4 (c), esce dal budget di spazio: l'elenco dei nodi già visitati può contenere un numero di configurazioni esponenziale in $f(n)$. La macchina tiene sulla pila soltanto le configurazioni delle triple aperte e calcola gli archi quando servono.

Senza $f(n) \ge \log n$ il conto cambia. Con $f(n)$ più piccolo di $\log n$ la sola posizione sull'input costa più di tutto il resto della configurazione, e lo spazio diventa $O((\log n + f(n))^2)$, più di $O(f(n)^2)$.
