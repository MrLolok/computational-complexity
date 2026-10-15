# Proposizione C (chiusura dei complementi)

## Prima di leggere

Che cosa vuol dire che una classe $C$ è chiusa rispetto alle riduzioni? E che cos'è $\mathrm{co}C$?

<details><summary>Risposte</summary>

$C$ è chiusa rispetto alle riduzioni se, quando $L \in C$ e $L'$ si riduce a $L$, anche $L' \in C$: un problema che si riduce a uno di $C$ non è più difficile di lui e resta in $C$. Per esempio P e NP sono chiuse.

$\mathrm{co}C$ è la classe dei complementi dei linguaggi di $C$: $L \in \mathrm{co}C$ se $\overline{L} \in C$.

</details>

## Che cosa dice

Se $C$ è chiusa rispetto alle riduzioni, lo è anche $\mathrm{co}C$. Il caso che si usa di più: NP è chiusa, quindi coNP è chiusa.

Non è immediato, perché l'ipotesi parla dei linguaggi di $C$ e la tesi dei linguaggi di $\mathrm{co}C$, che sono i loro complementi. La prova passa ai complementi, usa lì la chiusura di $C$ e torna indietro.

## La prova

Prendi $L \in \mathrm{co}C$ e una riduzione $R$ da $L'$ a $L$. Va mostrato che $L' \in \mathrm{co}C$.

1. $L \in \mathrm{co}C$ vuol dire $\overline{L} \in C$.
2. Per la Proposizione A, $R$ è anche una riduzione da $\overline{L'}$ a $\overline{L}$.
3. $\overline{L} \in C$, $\overline{L'}$ vi si riduce e $C$ è chiusa, quindi $\overline{L'} \in C$.
4. Il complemento di $L'$ sta in $C$, cioè $L' \in \mathrm{co}C$.

## Un esempio

Con $C = \mathrm{NP}$: se $L'$ si riduce a UNSAT, che sta in coNP, la stessa riduzione porta il complemento di $L'$ in SAT. Il complemento di $L'$ sta quindi in NP, e $L'$ sta in coNP.

## Dove si inciampa di solito

$\mathrm{co}C$ non è l'insieme dei linguaggi che stanno fuori da $C$. Contiene i complementi dei linguaggi di $C$, e può sovrapporsi a $C$: tutto P sta sia in NP sia in coNP.

"Chiusa rispetto alle riduzioni" e "chiusa per complemento" sono proprietà diverse. La prima dice che la classe contiene tutto ciò che si riduce ai suoi problemi; la seconda che $C = \mathrm{co}C$. La Proposizione C riguarda solo la prima: NP e coNP sono entrambe chiuse rispetto alle riduzioni, e non si sa se siano uguali.
