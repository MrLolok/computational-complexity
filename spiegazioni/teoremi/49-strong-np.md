# NP-completezza in senso forte

## Prima di leggere

Perché l'algoritmo $O(nW)$ per KNAPSACK non è polinomiale?

<details><summary>Risposta</summary>

$W$ è scritto in binario con circa $\log W$ bit, quindi un tempo proporzionale a $W$ è esponenziale nella lunghezza dell'input. È polinomiale solo se lo si misura rispetto al valore di $W$.

</details>

## Due definizioni

Un algoritmo è pseudopolinomiale se impiega tempo $q(|x|, M)$, con $q$ polinomio, dove $|x|$ è la lunghezza dell'istanza e $M$ il valore del numero più grande che contiene. L'algoritmo $O(nW)$ per KNAPSACK è di questo tipo.

Un problema $L$ è NP-completo in senso forte se, per un polinomio $p$, resta NP-completo la sua restrizione $L_p$ alle istanze con numeri di valore al più $p(|x|)$. In parole: è difficile anche quando nessun numero è enorme.

## L'argomento

Supponiamo che $L$ sia NP-completo in senso forte e abbia un algoritmo pseudopolinomiale $A$.

Per decidere $L_p$ si controlla prima che tutti i numeri dell'istanza siano $\le p(|x|)$, in tempo polinomiale, e poi si esegue $A$. Su queste istanze $M \le p(|x|)$, quindi $A$ impiega tempo $q(|x|, p(|x|))$. Un polinomio calcolato in un polinomio è ancora un polinomio: se per esempio $q(a, b) = a \cdot b$ e $p(n) = n^2$, il tempo è dell'ordine di $|x|^3$. Dunque $L_p \in \mathrm{P}$.

Ma $L_p$ è NP-completo, quindi ogni problema di NP vi si riduce, e P è chiusa rispetto alle riduzioni: $\mathrm{NP} \subseteq \mathrm{P}$, cioè $\mathrm{P} = \mathrm{NP}$.

Letto al contrario: se $\mathrm{P} \ne \mathrm{NP}$, un problema NP-completo in senso forte non ha algoritmi pseudopolinomiali.

## Chi è forte e chi no

In SAT, CLIQUE, HAMILTON PATH e TRIPARTITE MATCHING i numeri sono solo nomi di nodi o indici di variabili, quindi valgono al più la lunghezza dell'istanza, e la restrizione con $p(n) = n$ non toglie nessuna istanza. TSP(D) ha distanze vere, ma è NP-completo già con distanze 1 e 2. Le riduzioni che dimostrano la loro NP-completezza producono solo numeri piccoli.

KNAPSACK fa eccezione. La sua riduzione da EXACT COVER BY 3-SETS crea numeri di valore esponenziale, e KNAPSACK ha l'algoritmo $O(nW)$: se fosse NP-completo in senso forte, l'argomento sopra darebbe $\mathrm{P} = \mathrm{NP}$.

## Dove si inciampa di solito

"In senso forte" fa pensare a una difficoltà maggiore, come una classe sopra NP. I problemi di cui si parla sono tutti NP-completi, e la definizione dice solo se restano tali con numeri piccoli.

L'eccezione di KNAPSACK si legge facilmente come "KNAPSACK non è NP-completo". Lo è, ma con numeri piccoli diventa facile, perché l'algoritmo $O(nW)$ è polinomiale quando lo è $W$. Che non sia NP-completo in senso forte invece dipende da un'ipotesi: vale a meno che $\mathrm{P} = \mathrm{NP}$.
