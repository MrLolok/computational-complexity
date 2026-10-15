# Proposizione (oracoli NP-completi equivalenti)

## Prima di leggere

1. Che cosa fa una macchina della classe $\mathrm{P}^A$?
2. Se $L$ è NP-completo, quali riduzioni esistono fra $L$ e SAT?

<details><summary>Risposte</summary>

1. È una macchina deterministica con budget di tempo polinomiale che può scrivere una stringa $w$ su un nastro speciale e sapere in un passo se $w \in A$.
2. Due, una per verso. $L$ sta in NP e SAT è NP-completo, quindi c'è una riduzione $R$ da $L$ a SAT. SAT sta in NP e $L$ è NP-completo, quindi c'è una riduzione $R'$ da SAT a $L$.

</details>

## L'idea

La proposizione dice che $\mathrm{P}^L = \mathrm{P}^{\mathrm{SAT}}$ per ogni $L$ NP-completo. Una domanda all'oracolo $L$ si traduce in una domanda a SAT con la stessa risposta, perché $w \in L \iff R(w) \in \mathrm{SAT}$.

Data $M$ con oracolo $L$, si costruisce $M'$ con oracolo SAT che fa esattamente le stesse mosse. Quando $M$ sta per chiedere "$w \in L$?", $M'$ calcola $R(w)$, lo scrive sul nastro delle domande e chiede a SAT. Riceve la stessa risposta che avrebbe ricevuto $M$ e prosegue nello stesso modo, quindi accetta gli stessi input.

L'inclusione opposta $\mathrm{P}^{\mathrm{SAT}} \subseteq \mathrm{P}^L$ è lo stesso argomento con $R'$ al posto di $R$.

## Il conto

Sia $p(n)$ il budget di $M$ e $q(m)$ il tempo di $R$ su una stringa lunga $m$. In $p(n)$ passi $M$ fa al più $p(n)$ domande, e ognuna è lunga al più $p(n)$, perché una macchina non può scrivere più simboli dei passi che fa. Tradurre una domanda costa quindi al più $q(p(n))$: la riduzione lavora sulla domanda, non sull'input $x$. In totale

$$p(n) + p(n) \cdot q(p(n)),$$

un polinomio, perché prodotti e composizioni di polinomi sono polinomi. Con $p(n) = n^2$ e $q(m) = m^3$, per esempio, si ottiene $n^2 + n^8$.

## Dove si inciampa di solito

Le due inclusioni usano ipotesi diverse. $\mathrm{P}^L \subseteq \mathrm{P}^{\mathrm{SAT}}$ richiede solo $L \in \mathrm{NP}$; l'inclusione opposta richiede che $L$ sia NP-difficile. Per questo serve un $L$ NP-completo.

La conseguenza è una questione di notazione: si scrive $\mathrm{P}^{\mathrm{NP}}$ invece di $\mathrm{P}^{\mathrm{SAT}}$ o $\mathrm{P}^{\mathrm{CLIQUE}}$, perché conta solo la classe dell'oracolo. Lo stesso ragionamento vale per $\mathrm{NP}^L$, $\mathrm{EXP}^L$ e ogni classe il cui budget assorbe il costo delle traduzioni. Per EXP le domande possono essere lunghe un esponenziale, e tradurle costa ancora un esponenziale.
