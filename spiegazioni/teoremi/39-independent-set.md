# INDEPENDENT SET è NP-completo

## Prima di leggere

1. Nel grafo con nodi $A, B, C, D$ e archi $AB$, $BC$, $CD$, qual è un insieme indipendente di 2 nodi? Ce n'è uno di 3?
2. Che cosa serve per dimostrare che un problema è NP-completo?

<details><summary>Risposte</summary>

1. $\{A, C\}$, $\{A, D\}$ o $\{B, D\}$: nessuna coppia scelta è collegata da un arco. Di 3 nodi non ce ne sono, perché tre nodi su quattro contengono sempre due nodi consecutivi del cammino.
2. Che il problema stia in NP e che un problema NP-completo già noto si riduca a lui in spazio logaritmico.

</details>

## Il problema

Un insieme indipendente è un insieme di nodi senza archi fra loro. Che INDEPENDENT SET stia in NP è immediato: il certificato è l'insieme $I$ di $K$ nodi, e si controllano le al più $K^2$ coppie. Per la difficoltà si riduce 3SAT.

Soddisfare una formula 3SAT vuol dire scegliere in ogni clausola un letterale vero, senza mai scegliere insieme $x$ e $\neg x$. La riduzione traduce questa scelta in una scelta di nodi.

## La costruzione

Sia $\varphi$ una formula con $m$ clausole $C_1, \dots, C_m$, dove $C_i = (\alpha_{i1} \lor \alpha_{i2} \lor \alpha_{i3})$. Il grafo $G$ ha un nodo $v_{ij}$ per ogni letterale di ogni clausola, quindi $3m$ nodi, e due tipi di archi:

- (a) i tre nodi della stessa clausola formano un triangolo;
- (b) due nodi di clausole diverse sono collegati se i loro letterali sono opposti, come $x$ e $\neg x$.

L'obiettivo è $K = m$.

Gli archi (a) impongono "uno per clausola", gli archi (b) "senza contraddizioni". In un triangolo ogni nodo è collegato agli altri due, quindi un insieme indipendente ne prende al più uno; con $m$ triangoli, un insieme indipendente di $m$ nodi ne prende esattamente uno da ciascuno.

## Perché funziona

Se $G$ ha un insieme indipendente $I$ di $m$ nodi, si rendono veri i letterali dei nodi di $I$; le variabili che non vi compaiono prendono un valore qualsiasi. L'assegnazione è coerente, perché due letterali opposti sono collegati da un arco (b) e non possono stare entrambi in $I$. Soddisfa $\varphi$, perché $I$ ha un nodo in ogni triangolo, cioè un letterale vero in ogni clausola.

Viceversa, se $\varphi$ è soddisfacibile, si fissa un'assegnazione che la soddisfa e in ogni clausola si sceglie un letterale vero. I nodi scelti sono $m$, uno per triangolo, quindi fra loro non ci sono archi (a). Non ci sono nemmeno archi (b), perché due letterali opposti non sono mai veri insieme.

## Un esempio

Prendi $\varphi = (x \lor y \lor z) \land (\neg x \lor \neg y \lor z) \land (x \lor \neg y \lor \neg z)$, con $m = 3$.

| clausola | nodi del triangolo      |
| -------- | ----------------------- |
| $C_1$    | $x$, $y$, $z$           |
| $C_2$    | $\neg x$, $\neg y$, $z$ |
| $C_3$    | $x$, $\neg y$, $\neg z$ |

Gli archi (b) sono sei: $\neg x$ di $C_2$ con $x$ di $C_1$ e con $x$ di $C_3$; $y$ di $C_1$ con $\neg y$ di $C_2$ e con $\neg y$ di $C_3$; $\neg z$ di $C_3$ con $z$ di $C_1$ e con $z$ di $C_2$. Con i 9 archi dei triangoli fanno 15 archi.

L'assegnazione con $x$ vera, $y$ falsa e $z$ vera soddisfa $\varphi$. Scegliendo $x$ in $C_1$, $z$ in $C_2$ e $x$ in $C_3$ si ottengono 3 nodi senza archi fra loro: i due nodi $x$ non sono collegati, perché lo stesso letterale in clausole diverse non dà nessun arco. Prendere $x$ in $C_1$ e $\neg x$ in $C_2$ invece non si può, per l'arco (b) fra i due.

## Il conto

Il grafo ha $3m$ nodi, 3 archi per triangolo e al più un arco (b) per ogni coppia di nodi. Per scriverlo bastano due contatori che scorrono le coppie di occorrenze di letterali e un confronto fra i due letterali: spazio logaritmico.

## Dove si inciampa di solito

Gli archi (b) collegano solo letterali opposti. Due nodi con lo stesso letterale restano scollegati e si possono scegliere insieme, perché un letterale vero può servire a più clausole.

$K$ è il numero di clausole, non di variabili: si sceglie un letterale per clausola.

$I$ non descrive tutta l'assegnazione. Sceglie un letterale vero per clausola, ma gli altri due letterali della clausola possono essere veri anch'essi, e le variabili che non compaiono in $I$ si completano a piacere.
