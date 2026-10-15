# 2-SAT è P-completo se e solo se $\mathrm{P} = \mathrm{NL}$

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Che cosa vuol dire che un problema è P-completo, e con che tipo di riduzioni?
2. Perché NL è chiuso per riduzioni in spazio logaritmico?

<details><summary>Risposte</summary>

1. Sta in P, e ogni problema di P si riduce a lui con una riduzione in spazio logaritmico. Le riduzioni in tempo polinomiale renderebbero la nozione vuota: una riduzione polinomiale può risolvere da sola il problema di partenza e poi scrivere un'istanza sì o un'istanza no fissata, quindi ogni problema di P si ridurrebbe a qualunque altro che abbia almeno un'istanza sì e una no.
2. Se $A$ si riduce a $B$ in spazio logaritmico e $B$ sta in NL, la macchina per $A$ esegue quella per $B$ senza scrivere l'istanza ridotta, che potrebbe essere lunga polinomialmente: quando le serve un simbolo, lo ricalcola con la riduzione. Tutto resta in spazio logaritmico.

</details>

Se la prima risposta non ti tornava, ripassa la definizione di P-completezza: il teorema dipende dal tipo di riduzione.

## Il problema

2-SAT sta in P. Ci si chiede se sia anche tra i problemi più difficili di P, cioè P-completo. Il teorema risponde che non lo sappiamo, e che saperlo equivale a risolvere un'altra questione aperta, $\mathrm{P} = \mathrm{NL}$.

## Quello che si sa: 2-SAT sta in NL

Ogni clausola $(a \lor b)$ dice "se $a$ è falso allora $b$ è vero, e se $b$ è falso allora $a$ è vero", cioè dà gli archi $\neg a \to b$ e $\neg b \to a$ in un grafo delle implicazioni. La formula è insoddisfacibile sse per qualche variabile $x$ c'è un cammino da $x$ a $\neg x$ e uno da $\neg x$ a $x$.

Con le quattro clausole $(x \lor y)$, $(\neg x \lor y)$, $(x \lor \neg y)$, $(\neg x \lor \neg y)$ gli archi sono questi:

```
(x ∨ y)     ¬x → y    ¬y → x
(¬x ∨ y)     x → y    ¬y → ¬x
(x ∨ ¬y)    ¬x → ¬y    y → x
(¬x ∨ ¬y)    x → ¬y    y → ¬x
```

C'è il cammino $x \to y \to \neg x$ e c'è il cammino $\neg x \to y \to x$, quindi la formula è insoddisfacibile. Lo si vede anche direttamente: ogni clausola esclude uno dei quattro assegnamenti di $x$ e $y$.

Cercare un cammino è REACHABILITY, che sta in NL. Una macchina nondeterministica indovina $x$ e i due cammini, e così decide in NL l'insoddisfacibilità; per 2-SAT, che ne è il complemento, si usa $\mathrm{NL} = \mathrm{coNL}$. 2-SAT è anche NL-completo.

## L'equivalenza

Se 2-SAT è P-completo, ogni $L \in \mathrm{P}$ si riduce a 2-SAT in spazio logaritmico. 2-SAT sta in NL, e NL è chiuso per queste riduzioni, quindi $L \in \mathrm{NL}$. Allora $\mathrm{P} \subseteq \mathrm{NL}$, e siccome $\mathrm{NL} \subseteq \mathrm{P}$ vale sempre (il grafo delle configurazioni di una macchina in spazio logaritmico ha un numero polinomiale di nodi), $\mathrm{P} = \mathrm{NL}$.

Viceversa, se $\mathrm{P} = \mathrm{NL}$, ogni problema di P sta in NL e quindi si riduce a 2-SAT, che è NL-completo. Insieme a $2\text{-}\mathrm{SAT} \in \mathrm{P}$, questo rende 2-SAT P-completo.

PRIMES, per esempio, sta in P. Si riduce a 2-SAT in spazio logaritmico solo se $\mathrm{PRIMES} \in \mathrm{NL}$, e questo non si sa.

## Dove si inciampa di solito

Negli esercizi 2-SAT viene usato come bersaglio di una riduzione da un problema qualsiasi di P, del tipo "MAX FLOW si riduce a 2-SAT". Non è garantito: di 2-SAT si sa che sta in P, anzi in NL. L'errore nasce spesso dal pensare alle riduzioni polinomiali, per le quali vale il motivo banale visto all'inizio; la domanda aperta riguarda le riduzioni in spazio logaritmico.
