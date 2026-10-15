# Proposizione D (un $C$-completo in $\mathrm{co}C$)

## Prima di leggere

Che cosa dicono le Proposizioni A e C?

<details><summary>Risposta</summary>

A: una riduzione da $L$ a $L'$ è anche una riduzione dal complemento di $L$ al complemento di $L'$. C: se $\mathcal{C}$ è chiusa rispetto alle riduzioni, lo è anche $\mathrm{co}\mathcal{C}$.

</details>

## L'idea

Un problema $\mathcal{C}$-completo $L$ "trascina" con sé tutta la classe: ogni problema di $\mathcal{C}$ si riduce a lui. Se $L$ sta anche in $\mathrm{co}\mathcal{C}$, e $\mathrm{co}\mathcal{C}$ è chiusa rispetto alle riduzioni, tutto $\mathcal{C}$ finisce in $\mathrm{co}\mathcal{C}$. L'inclusione opposta si ottiene passando ai complementi.

## La dimostrazione

Le ipotesi sono: $\mathcal{C}$ è chiusa rispetto alle riduzioni, $L$ è $\mathcal{C}$-completo e $L \in \mathrm{co}\mathcal{C}$. Per la Proposizione C anche $\mathrm{co}\mathcal{C}$ è chiusa.

Prima inclusione, $\mathcal{C} \subseteq \mathrm{co}\mathcal{C}$. Sia $L' \in \mathcal{C}$. Siccome $L$ è $\mathcal{C}$-completo, $L'$ si riduce a $L$; siccome $L \in \mathrm{co}\mathcal{C}$ e $\mathrm{co}\mathcal{C}$ è chiusa, $L' \in \mathrm{co}\mathcal{C}$.

Seconda inclusione, $\mathrm{co}\mathcal{C} \subseteq \mathcal{C}$. Sia $L' \in \mathrm{co}\mathcal{C}$, cioè $\overline{L'} \in \mathcal{C}$. Siccome $L$ è $\mathcal{C}$-completo, c'è una riduzione $R$ da $\overline{L'}$ a $L$, e per la Proposizione A la stessa $R$ riduce $L'$ a $\overline{L}$. Dall'ipotesi $L \in \mathrm{co}\mathcal{C}$ segue $\overline{L} \in \mathcal{C}$, e $\mathcal{C}$ è chiusa, quindi $L' \in \mathcal{C}$.

Le due inclusioni danno $\mathcal{C} = \mathrm{co}\mathcal{C}$.

## Un esempio

NP è chiusa rispetto alle riduzioni. Se un problema NP-completo, come SAT, stesse in coNP, si avrebbe $\mathrm{NP} = \mathrm{coNP}$. Lo stesso vale se un problema coNP-completo, come VALIDITY, stesse in NP.

## Dove si inciampa di solito

Serve l'ipotesi di chiusura. È lei che permette di dire che un problema che si riduce a $L$ sta nella classe di $L$; senza, la completezza di $L$ non direbbe niente sugli altri problemi.

Nella seconda inclusione si usa la completezza di $L$ su $\overline{L'}$, che sta in $\mathcal{C}$, non su $L'$, che sta in $\mathrm{co}\mathcal{C}$ e a priori non si riduce a $L$.
