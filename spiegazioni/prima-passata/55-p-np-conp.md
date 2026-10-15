# Se $\mathrm{P} = \mathrm{NP}$ allora $\mathrm{NP} = \mathrm{coNP}$

## Prima di leggere

Se una macchina deterministica decide $L$ in tempo polinomiale, come si decide il complemento $\overline{L}$?

<details><summary>Risposta</summary>

Con la stessa macchina, scambiando le risposte SÌ e NO. La macchina si ferma sempre, quindi la nuova risponde SÌ esattamente quando la vecchia rispondeva NO, con lo stesso tempo.

</details>

## L'idea

P è chiusa per complemento: $\mathrm{coP} = \mathrm{P}$, per lo scambio delle risposte. Se $\mathrm{P} = \mathrm{NP}$, basta sostituire classi uguali:

$$\mathrm{NP} = \mathrm{P} = \mathrm{coP} = \mathrm{coNP}.$$

L'ultimo passaggio vale perché, se due classi coincidono, coincidono anche le classi dei loro complementi.

## La dimostrazione, passo per passo

Si suppone $\mathrm{P} = \mathrm{NP}$.

Per $\mathrm{coNP} \subseteq \mathrm{NP}$: se $L \in \mathrm{coNP}$, allora $\overline{L} \in \mathrm{NP} = \mathrm{P}$; P è chiusa per complemento, quindi $L \in \mathrm{P} = \mathrm{NP}$.

Per $\mathrm{NP} \subseteq \mathrm{coNP}$: se $L \in \mathrm{NP} = \mathrm{P}$, allora $\overline{L} \in \mathrm{P} = \mathrm{NP}$, e per definizione $L \in \mathrm{coNP}$.

## Dove si inciampa di solito

Lo scambio delle risposte non funziona per una macchina nondeterministica. Lì SÌ vuol dire "almeno un ramo accetta", e la sua negazione è "tutti i rami rifiutano": scambiando le risposte di ogni ramo si ottiene "almeno un ramo rifiuta", che è un'altra cosa. Per questo non si sa se NP sia chiusa per complemento.

Il viceversa non è noto. Potrebbe valere $\mathrm{NP} = \mathrm{coNP}$ anche con $\mathrm{P} \neq \mathrm{NP}$.
