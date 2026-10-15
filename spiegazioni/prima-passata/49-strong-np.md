# NP-completezza in senso forte

## Prima di leggere

Perché l'algoritmo per KNAPSACK in tempo $O(nW)$ non è polinomiale?

<details><summary>Risposta</summary>

Perché $W$ si scrive con circa $\log W$ bit, e $O(nW)$ è esponenziale in quei bit. Il tempo è polinomiale nel valore dei numeri, non nella lunghezza dell'input.

</details>

## Le due definizioni

Un algoritmo è pseudopolinomiale se impiega tempo $q(|x|, M)$ con $q$ polinomio, dove $|x|$ è la lunghezza dell'istanza e $M$ il valore del numero più grande che contiene. L'algoritmo $O(nW)$ per KNAPSACK è di questo tipo.

Un problema $L$ è NP-completo in senso forte se esiste un polinomio $p$ tale che resta NP-completo anche la sua restrizione $L_p$ alle istanze in cui ogni numero vale al più $p(|x|)$. In altre parole, la difficoltà non dipende dall'avere numeri enormi.

## L'idea

Su istanze con numeri piccoli, polinomiale nel valore e polinomiale nella lunghezza sono la stessa cosa. Quindi un algoritmo pseudopolinomiale per un problema NP-completo in senso forte diventa un algoritmo polinomiale per un problema NP-completo.

In dettaglio: se $L$ ha un algoritmo pseudopolinomiale $A$, per decidere $L_p$ si controlla prima che i numeri siano $\le p(|x|)$, confronto che costa tempo polinomiale, poi si esegue $A$. Su queste istanze $M \le p(|x|)$, quindi il tempo è $q(|x|, p(|x|))$, un polinomio in $|x|$. Dunque $L_p \in \mathrm{P}$. Ma $L_p$ è NP-completo, ogni problema di NP vi si riduce e P è chiusa rispetto alle riduzioni: ne segue $\mathrm{P} = \mathrm{NP}$.

Per esempio, se KNAPSACK restasse NP-completo con $W \le n^2$, l'algoritmo $O(nW)$ lo risolverebbe in tempo $O(n^3)$.

## Quali problemi sono forti

In SAT, CLIQUE, HAMILTON PATH, TRIPARTITE MATCHING e negli altri NP-completi visti, i numeri sono solo nomi di nodi o indici di variabili, e il loro valore non supera la lunghezza dell'istanza. Anche TSP(D) è NP-completo già con distanze 1 e 2. Le loro riduzioni producono solo numeri piccoli, quindi restano NP-completi ristretti a numeri polinomiali.

KNAPSACK è l'eccezione. La sua riduzione da EXACT COVER BY 3-SETS crea numeri di valore esponenziale, e KNAPSACK ha un algoritmo pseudopolinomiale: se fosse NP-completo in senso forte, per l'argomento qui sopra si avrebbe $\mathrm{P} = \mathrm{NP}$.

## Dove si inciampa di solito

"In senso forte" non vuol dire "più difficile". Dice dove sta la difficoltà: nella struttura combinatoria dell'istanza, anche con numeri piccoli, invece che nella grandezza dei numeri.

L'affermazione su KNAPSACK è condizionale: KNAPSACK non è NP-completo in senso forte a meno che $\mathrm{P} = \mathrm{NP}$.
