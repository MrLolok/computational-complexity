# Proposizione B (complemento di un NP-completo)

## Prima di leggere

1. Quando un linguaggio sta in coNP?
2. Che cosa dice la Proposizione A?

<details><summary>Risposte</summary>

1. Quando il suo complemento sta in NP.
2. Una riduzione $R$ da $L$ a $L'$ è anche una riduzione dal complemento di $L$ al complemento di $L'$.

</details>

## L'idea

I problemi di coNP sono esattamente i complementi dei problemi di NP, e la Proposizione A trasforma le riduzioni verso $L$ in riduzioni verso $\overline{L}$. Mettendo insieme le due cose, la completezza di $L$ per NP passa a $\overline{L}$ per coNP.

## La dimostrazione

Sia $L$ NP-completo. Allora $L \in \mathrm{NP}$, e per definizione $\overline{L} \in \mathrm{coNP}$.

Resta da mostrare che ogni problema di coNP si riduce a $\overline{L}$. Sia $L'$ un problema qualsiasi di coNP. Il suo complemento $\overline{L'}$ sta in NP, quindi si riduce a $L$ con una riduzione $R$, perché $L$ è NP-completo. Per la Proposizione A, $R$ riduce anche il complemento di $\overline{L'}$ al complemento di $L$. Il complemento del complemento è il linguaggio di partenza, quindi $R$ riduce $L'$ a $\overline{L}$.

Ogni $L' \in \mathrm{coNP}$ si riduce a $\overline{L}$, che sta in coNP: $\overline{L}$ è coNP-completo.

Il viceversa si ottiene con lo stesso ragionamento scambiando i ruoli di NP e coNP: se $\overline{L}$ è coNP-completo, $L$ è NP-completo.

## Esempi

SAT è NP-completo, quindi il suo complemento UNSAT è coNP-completo. Allo stesso modo sono coNP-completi HAMILTON PATH COMPLEMENT e il complemento di TSP(D).

## Dove si inciampa di solito

Il complemento di un problema NP-completo è coNP-completo, e non si sa se sia anche NP-completo. Per esserlo dovrebbe stare in NP, e un problema coNP-completo in NP porterebbe a $\mathrm{NP} = \mathrm{coNP}$.
