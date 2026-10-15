# Proposizione D (un $C$-completo in $\mathrm{co}C$)

## Prima di leggere

Che cosa vuol dire che $L$ è $C$-completo? E che cosa dice la Proposizione C?

<details><summary>Risposte</summary>

$L$ sta in $C$ e ogni linguaggio di $C$ si riduce a $L$. La Proposizione C dice che se $C$ è chiusa rispetto alle riduzioni, lo è anche $\mathrm{co}C$.

</details>

## Che cosa dice

Se $C$ è chiusa rispetto alle riduzioni e un problema $C$-completo sta anche in $\mathrm{co}C$, allora $C = \mathrm{co}C$.

Il caso che interessa è $C = \mathrm{NP}$: se un problema NP-completo stesse in coNP, allora $\mathrm{NP} = \mathrm{coNP}$. Per SAT questo vorrebbe dire che le formule insoddisfacibili hanno un certificato corto.

## Prima inclusione: $C \subseteq \mathrm{co}C$

Sia $L$ il problema $C$-completo che sta in $\mathrm{co}C$, e sia $L'$ un problema qualsiasi di $C$.

1. $L$ è $C$-completo, quindi $L'$ si riduce a $L$.
2. $L \in \mathrm{co}C$, e $\mathrm{co}C$ è chiusa rispetto alle riduzioni per la Proposizione C.
3. Quindi $L' \in \mathrm{co}C$.

Qui entra l'ipotesi che $C$ sia chiusa. Senza, la Proposizione C non si applica, e la riduzione da $L'$ a $L$ non basterebbe a portare $L'$ dentro $\mathrm{co}C$.

## Seconda inclusione: $\mathrm{co}C \subseteq C$

Viene dalla prima, applicata ai complementi. Sia $L' \in \mathrm{co}C$. Allora $\overline{L'} \in C$, e per la prima inclusione $\overline{L'} \in \mathrm{co}C$, cioè il complemento di $\overline{L'}$ sta in $C$. Quel complemento è $L'$, quindi $L' \in C$.

Le due inclusioni danno $C = \mathrm{co}C$.

## Dove si inciampa di solito

La proposizione non dimostra che $\mathrm{NP} \ne \mathrm{coNP}$. Dice che cosa succederebbe se un NP-completo stesse in coNP, e nessuno sa se succede.

Vale solo per un problema completo. $\mathrm{NP} \cap \mathrm{coNP}$ contiene molti problemi, per esempio tutti quelli di P, e la loro presenza non fa crollare niente: perché la prima inclusione funzioni, tutta la classe deve ridursi a quel problema.
