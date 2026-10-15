# Chiusura delle classi rispetto alle riduzioni

## Prima di leggere, una domanda di controllo

Una riduzione $R$ si calcola in spazio logaritmico. Quanto tempo impiega, e quanto può essere lungo $R(x)$?

<details><summary>Risposta</summary>

In spazio logaritmico la macchina ha un numero polinomiale di configurazioni, quindi si ferma in tempo polinomiale. Scrive al più un simbolo per passo, quindi $|R(x)| \le n^c$ per una costante $c$.

</details>

Se non ti tornava, rileggi la composizione di riduzioni: lì c'è lo stesso conto.

## Che cosa dice

Una classe $C$ è chiusa rispetto alle riduzioni se, quando $L \in C$ e $L'$ si riduce a $L$, anche $L' \in C$. La proposizione dice che P, NP, coNP, L, NL, PSPACE ed EXP lo sono.

Per decidere $L'$ su un input $x$ si calcola $R(x)$ e si esegue su $R(x)$ l'algoritmo per $L$, perché $x \in L' \iff R(x) \in L$. Restano due costi da pagare: quello della riduzione e quello dell'algoritmo per $L$ su un input lungo $n^c$ invece di $n$. Una classe è chiusa se riesce a pagarli entrambi senza uscire dal proprio budget.

## Classe per classe

| classe | come si decide $L'$ | perché si resta nella classe |
|---|---|---|
| P, NP | si calcola $R(x)$, poi si esegue l'algoritmo per $L$ | $q(\lvert R(x) \rvert) \le q(n^c)$, un polinomio di un polinomio |
| EXP | come sopra | $2^{(n^c)^j} = 2^{n^{cj}}$, ancora esponenziale |
| PSPACE | si scrive $R(x)$ su $n^c$ celle, poi si esegue l'algoritmo | $q(n^c)$ celle |
| L, NL | $R(x)$ non si scrive: ogni simbolo si ricalcola quando serve | contatori e nastri da $O(\log n)$ |
| coNP | $R$ riduce anche il complemento di $L'$ al complemento di $L$ | il complemento di $L$ sta in NP |

Per esempio, se l'algoritmo per $L$ impiega $q(m) = m^2$ e $|R(x)| \le n^3$, il tempo su $R(x)$ è al più $n^6$.

Per L e NL il problema è che $R(x)$ è troppo lungo per lo spazio logaritmico. Si usa lo stesso trucco della composizione di riduzioni: si simula la macchina per $L$ e, quando legge l'$i$-esimo simbolo di $R(x)$, lo si ricalcola eseguendo $R$ da capo. Per NL la macchina per $L$ è nondeterministica e i ricalcoli di $R$ sono deterministici, quindi il tutto resta nondeterministico in spazio logaritmico.

Per coNP la stessa $R$ funziona anche sulle risposte no: $x \notin L' \iff R(x) \notin L$. Quindi il complemento di $L'$ si riduce al complemento di $L$, che sta in NP. Per la chiusura di NP il complemento di $L'$ sta in NP, cioè $L' \in \mathrm{coNP}$.

## A che cosa serve

Le risposte "solo se" usano la proposizione così: se $L$ è $C$-completo, $D$ è chiusa e $L \in D$, allora $C \subseteq D$. Ogni $L' \in C$ si riduce a $L$, $L$ sta in $D$, e la chiusura porta $L'$ dentro $D$. Per esempio, un problema NP-completo in P darebbe $\mathrm{NP} \subseteq \mathrm{P}$, cioè $\mathrm{P} = \mathrm{NP}$.

## Dove si inciampa di solito

Per $\mathrm{TIME}(n^2)$, che ha un budget fisso, questo ragionamento non funziona: nell'esempio sopra l'algoritmo quadratico per $L$, eseguito su $R(x)$, impiega $n^6$, fuori da $\mathrm{TIME}(n^2)$. P, NP, PSPACE ed EXP sono unioni su tutti i polinomi (o su tutti gli esponenziali di polinomi), e per questo assorbono la crescita dell'input.
