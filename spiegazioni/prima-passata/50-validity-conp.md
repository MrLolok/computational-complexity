# VALIDITY è coNP-completo

## Prima di leggere

1. Quando un linguaggio $L$ sta in coNP?
2. Che differenza c'è fra una formula valida e una formula soddisfacibile?

<details><summary>Risposte</summary>

1. Quando il suo complemento $\overline{L}$, cioè l'insieme delle stringhe che non stanno in $L$, sta in NP.
2. Una formula è soddisfacibile se almeno un'assegnazione la rende vera, valida se tutte la rendono vera. Per esempio $x \lor \neg x$ è valida, $x$ è soddisfacibile ma non valida.

</details>

## L'idea: VALIDITY è SAT al negativo

Una formula $\varphi$ è valida se e solo se $\neg \varphi$ è insoddisfacibile: dire che ogni assegnazione rende vera $\varphi$ equivale a dire che nessuna rende vera $\neg \varphi$. Quindi una riduzione verso SAT, seguita da una negazione, diventa una riduzione verso VALIDITY.

## VALIDITY sta in coNP

Il suo complemento, le formule non valide, sta in NP: il certificato è un'assegnazione che rende falsa la formula, e si controlla in tempo polinomiale valutando la formula. Una formula valida non ha un certificato del genere.

## Ogni problema di coNP si riduce a VALIDITY

Sia $L$ un linguaggio qualsiasi di coNP. Il suo complemento $\overline{L}$ sta in NP e SAT è NP-completo, quindi esiste una riduzione $R$ da $\overline{L}$ a SAT: $x \in \overline{L}$ se e solo se $R(x)$ è soddisfacibile.

La nuova riduzione è $R'(x) = \neg R(x)$: si calcola $R(x)$ e si aggiungono una negazione e una coppia di parentesi, cosa che si fa ancora in spazio logaritmico. Funziona perché

$$x \in L \iff x \notin \overline{L} \iff R(x) \text{ insoddisfacibile} \iff \neg R(x) \text{ valida}.$$

VALIDITY sta in coNP e ogni problema di coNP vi si riduce, quindi è coNP-completo.

## HAMILTON PATH COMPLEMENT

Il ragionamento si ripete con HAMILTON PATH al posto di SAT, e qui non serve nemmeno la negazione. HAMILTON PATH COMPLEMENT sta in coNP perché il suo complemento, HAMILTON PATH, sta in NP. Se $L \in \mathrm{coNP}$, allora $\overline{L}$ si riduce a HAMILTON PATH con una riduzione $R$: $x \in \overline{L}$ se e solo se $R(x)$ ha un cammino hamiltoniano. Negando entrambi i lati, $x \in L$ se e solo se $R(x)$ non ne ha. La stessa $R$ riduce quindi $L$ a HAMILTON PATH COMPLEMENT.

Con SAT serviva la negazione perché VALIDITY non è il complemento di SAT; qui il problema di arrivo è già il complemento di HAMILTON PATH.

## Dove si inciampa di solito

VALIDITY e UNSAT non sono lo stesso problema. UNSAT è il complemento di SAT (le formule insoddisfacibili); VALIDITY contiene le formule la cui negazione è insoddisfacibile. Per passare dall'uno all'altro si nega la formula.

Una riduzione da SAT a VALIDITY esiste solo se $\mathrm{NP} = \mathrm{coNP}$. VALIDITY sta in coNP e coNP è chiusa rispetto alle riduzioni, quindi SAT starebbe in coNP, e un problema NP-completo in coNP porta a $\mathrm{NP} = \mathrm{coNP}$.
