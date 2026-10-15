# Proposizione $\mathrm{P} \subseteq \mathrm{NP} \cap \mathrm{coNP}$

## Prima di leggere

Quando un linguaggio sta in coNP?

<details><summary>Risposta</summary>

Quando il suo complemento sta in NP.

</details>

## L'idea

Sia $L \in \mathrm{P}$. Bisogna mostrare due cose, che $L \in \mathrm{NP}$ e che $L \in \mathrm{coNP}$.

$L$ sta in NP perché una macchina deterministica è una macchina nondeterministica che a ogni passo ha una sola scelta. Quindi $\mathrm{P} \subseteq \mathrm{NP}$.

$L$ sta in coNP perché P è chiusa per complemento. La macchina deterministica che decide $L$ si ferma sempre; scambiando le risposte SÌ e NO si decide $\overline{L}$ con lo stesso tempo. Quindi $\overline{L} \in \mathrm{P} \subseteq \mathrm{NP}$, e per definizione $L \in \mathrm{coNP}$.

Siccome $L$ era un linguaggio qualsiasi di P, $\mathrm{P} \subseteq \mathrm{NP} \cap \mathrm{coNP}$.

## In termini di certificati

Un problema di NP ha certificati succinti per le istanze sì, uno di coNP ha certificati succinti per le istanze no. Un problema di P li ha entrambi nel modo più semplice: il certificato può essere vuoto, perché il verificatore decide da solo l'istanza in tempo polinomiale.

## Dove si inciampa di solito

La proposizione dà un'inclusione e non dice se sia stretta. Non si sa se $\mathrm{P} = \mathrm{NP} \cap \mathrm{coNP}$: esistono problemi in $\mathrm{NP} \cap \mathrm{coNP}$ per cui non si conosce un algoritmo polinomiale.
