# Proposizione C (chiusura dei complementi)

## Prima di leggere

Che cosa vuol dire che una classe $\mathcal{C}$ è chiusa rispetto alle riduzioni?

<details><summary>Risposta</summary>

Che se $L \in \mathcal{C}$ e $L'$ si riduce a $L$, allora anche $L' \in \mathcal{C}$. Ciò che si riduce a un problema della classe resta nella classe.

</details>

## L'idea

Si passa ai complementi, dove vale la chiusura di $\mathcal{C}$, e poi si torna indietro. Il passaggio lo fa la Proposizione A, per cui una riduzione fra due linguaggi è anche una riduzione fra i loro complementi.

## La dimostrazione

Bisogna mostrare che, se $L \in \mathrm{co}\mathcal{C}$ e $R$ riduce $L'$ a $L$, allora $L' \in \mathrm{co}\mathcal{C}$.

1. $L \in \mathrm{co}\mathcal{C}$ significa, per definizione, che il complemento $\overline{L}$ sta in $\mathcal{C}$.
2. Per la Proposizione A, $R$ riduce anche $\overline{L'}$ a $\overline{L}$.
3. $\overline{L}$ sta in $\mathcal{C}$, $\overline{L'}$ vi si riduce e $\mathcal{C}$ è chiusa, quindi $\overline{L'} \in \mathcal{C}$.
4. Il complemento di $L'$ sta in $\mathcal{C}$, quindi per definizione $L' \in \mathrm{co}\mathcal{C}$.

## Un esempio

NP è chiusa rispetto alle riduzioni, quindi lo è anche coNP. È ciò che serve, per esempio, per dire che un problema che si riduce a VALIDITY sta in coNP.

## Dove si inciampa di solito

"Chiusa rispetto alle riduzioni" e "chiusa per complemento" sono proprietà diverse. La proposizione dice che se $\mathcal{C}$ ha la prima, ce l'ha anche $\mathrm{co}\mathcal{C}$; non dice che $\mathcal{C} = \mathrm{co}\mathcal{C}$. Per NP e coNP l'uguaglianza resta un problema aperto.
