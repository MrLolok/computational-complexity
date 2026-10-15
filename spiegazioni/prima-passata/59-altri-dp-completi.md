# Altri problemi DP-completi

## Prima di leggere

1. Che cos'è la classe DP?
2. Che cosa chiede SAT-UNSAT?

<details><summary>Risposte</summary>

1. DP contiene i linguaggi della forma $L_1 \cap L_2$ con $L_1 \in \mathrm{NP}$ e $L_2 \in \mathrm{coNP}$. Un'istanza sta in $L$ se supera due controlli: uno "sì" che ha un certificato corto e uno "no" che non ce l'ha.
2. Date due formule $\varphi$ e $\varphi'$, chiede se $\varphi$ è soddisfacibile e $\varphi'$ no. È il primo problema DP-completo, e le riduzioni di questa pagina partono da lì.

</details>

## Il problema

Alcune domande contengono per natura due controlli di segno opposto. "Il tour ottimo costa esattamente $B$?" chiede che esista un tour di costo $B$ e che non ne esista uno più economico. "La formula è critica?" chiede che sia insoddisfacibile e che diventi soddisfacibile appena si toglie una clausola. La proposizione dice che EXACT TSP, CRITICAL SAT, CRITICAL HAMILTON PATH e CRITICAL 3-COLORING sono DP-completi, mentre UNIQUE SAT ("$\varphi$ ha esattamente un assegnamento che la soddisfa?") sta in DP ma non si sa se sia DP-completo.

## Appartenenza: separare i due controlli

Per mettere un problema in DP basta scriverlo come "parte in NP" e "parte in coNP" sulla stessa istanza.

| Problema | Parte in NP | Parte in coNP |
|---|---|---|
| EXACT TSP | costo ottimo $\le B$ (certificato: un tour di costo $\le B$) | costo ottimo $\ge B$ (nessun tour costa meno di $B$) |
| CRITICAL SAT | togliendo una qualsiasi clausola, $\varphi$ diventa soddisfacibile | $\varphi$ è insoddisfacibile |
| CRITICAL HAMILTON PATH, CRITICAL 3-COLORING | dopo ogni modifica permessa del grafo la proprietà vale | il grafo non ha un cammino hamiltoniano (non è 3-colorabile) |
| UNIQUE SAT | almeno un assegnamento soddisfa $\varphi$ | al più un assegnamento soddisfa $\varphi$ |

Due righe meritano un perché. La parte NP di CRITICAL SAT contiene un "per ogni clausola", che sembra un controllo universale. Le clausole però sono $m$, quindi il certificato può essere una lista di $m$ assegnamenti, uno per ogni clausola tolta: è lunga un polinomio e si verifica in tempo polinomiale. Lo stesso vale per i grafi, dove le modifiche possibili sono al più $n^2$. La parte coNP di UNIQUE SAT si vede dal complemento: "almeno due assegnamenti" ha come certificato due assegnamenti diversi, quindi sta in NP.

## Difficoltà di EXACT TSP

Si riduce SAT-UNSAT. Si parte dalla riduzione da 3-SAT a HAMILTON PATH, modificata in modo che il grafo abbia sempre un cammino che salta un solo arco. Con distanza 1 sugli archi del grafo e 2 altrove, il costo ottimo del tour è $N$ se $\varphi$ è soddisfacibile e $N + 1$ se no. Per $\varphi'$ si fa la stessa costruzione raddoppiando le distanze: costo $2N'$ oppure $2N' + 2$. Si uniscono le due istanze in una sola, e il costo ottimo diventa la somma più una costante fissa per il collegamento.

| $\varphi$ | $\varphi'$ | costo ottimo |
|---|---|---|
| soddisfacibile | soddisfacibile | base $+ 0$ |
| insoddisfacibile | soddisfacibile | base $+ 1$ |
| soddisfacibile | insoddisfacibile | base $+ 2$ |
| insoddisfacibile | insoddisfacibile | base $+ 3$ |

Si sceglie $B$ = base $+ 2$, il caso di SAT-UNSAT. Il raddoppio serve a dare pesi diversi ai due "difetti": con pesi uguali le righe 2 e 3 darebbero lo stesso costo, e la domanda "costa esattamente $B$?" non saprebbe distinguere quale formula è insoddisfacibile.

Per gli altri problemi la difficoltà si ottiene con riduzioni da SAT-UNSAT più tecniche, costruite con la stessa logica: un'istanza la cui parte "sì" codifica $\varphi$ e la cui parte "no" codifica $\varphi'$.

## Dove si inciampa di solito

Un "per ogni" su un numero polinomiale di casi (le clausole, gli archi) resta dentro NP, perché si elencano i certificati di tutti i casi. Un "per ogni" su tutti gli assegnamenti, che sono $2^n$, è invece un controllo coNP.

Stare in DP non vuol dire essere DP-completo. UNIQUE SAT ha l'appartenenza, ma nessuno conosce una riduzione da SAT-UNSAT verso di esso.
