# Proposizione B (complemento di un NP-completo)

## Prima di leggere

Che cosa vuol dire che $L$ è NP-completo? E che cosa dice la Proposizione A?

<details><summary>Risposte</summary>

$L$ sta in NP e ogni linguaggio di NP si riduce a $L$. La Proposizione A dice che una riduzione $R$ da $L_1$ a $L_2$ è anche, così com'è, una riduzione da $\overline{L_1}$ a $\overline{L_2}$.

</details>

## L'idea

coNP è fatta dei complementi dei problemi di NP. Se $L$ è fra i più difficili di NP, viene da pensare che il suo complemento $\overline{L}$ sia fra i più difficili di coNP. La Proposizione A permette di dimostrarlo, perché ogni riduzione verso $L$ diventa una riduzione verso $\overline{L}$.

## La prova

Bisogna mostrare che $\overline{L}$ sta in coNP e che ogni problema di coNP vi si riduce.

La prima parte è immediata. $L$ è NP-completo, quindi in particolare $L \in \mathrm{NP}$, e per definizione di coNP il suo complemento sta in coNP.

Per la seconda prendi $L' \in \mathrm{coNP}$. Il suo complemento $\overline{L'}$ sta in NP, quindi si riduce a $L$ con una riduzione $R$. Per la Proposizione A, la stessa $R$ riduce il complemento di $\overline{L'}$ al complemento di $L$. Il complemento del complemento è il linguaggio di partenza, quindi $R$ riduce $L'$ a $\overline{L}$.

Il viceversa segue dallo stesso ragionamento con NP e coNP scambiati: se $\overline{L}$ è coNP-completo, $L$ è NP-completo.

## Un esempio

SAT è NP-completo, quindi UNSAT, il problema delle formule insoddisfacibili, è coNP-completo. Per ridurre a UNSAT un problema $L'$ di coNP si prende la riduzione che porta $\overline{L'}$ in SAT e la si usa così com'è: le stringhe di $L'$ finiscono su formule insoddisfacibili. Allo stesso modo, da HAMILTON PATH NP-completo segue che HAMILTON PATH COMPLEMENT è coNP-completo.

## Dove si inciampa di solito

Non si sa se il complemento di un NP-completo sia NP-completo. Per esserlo dovrebbe stare in NP, e un problema coNP-completo in NP darebbe $\mathrm{NP} = \mathrm{coNP}$, che nessuno sa dimostrare.

coNP si legge facilmente come "i problemi che non stanno in NP". È invece la classe dei complementi dei problemi di NP, e le due classi si sovrappongono: ogni problema di P sta in entrambe.
