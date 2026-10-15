# Corollario (collasso al primo livello)

## Prima di leggere, una domanda di controllo

Prova a rispondere a mente prima di andare avanti.

Che cosa dice il Teorema 17.9, e quali classi sono $\Sigma_1^{\mathrm{P}}$ e $\Pi_1^{\mathrm{P}}$?

<details><summary>Risposta</summary>

Il Teorema 17.9 dice che se $\Sigma_i^{\mathrm{P}} = \Pi_i^{\mathrm{P}}$ per un certo $i \ge 1$, allora tutti i livelli sopra coincidono con $\Sigma_i^{\mathrm{P}}$: la gerarchia collassa al livello $i$. Al primo livello $\Sigma_1^{\mathrm{P}} = \mathrm{NP}$ e $\Pi_1^{\mathrm{P}} = \mathrm{coNP}$.

</details>

## Che cosa dice

Se $\mathrm{NP} = \mathrm{coNP}$, la gerarchia polinomiale collassa al primo livello: $\mathrm{PH} = \mathrm{NP}$. Lo stesso succede se $\mathrm{P} = \mathrm{NP}$, che è un'ipotesi più forte. Il corollario dice "anche solo $\mathrm{NP} = \mathrm{coNP}$" perché da $\mathrm{P} = \mathrm{NP}$ segue $\mathrm{NP} = \mathrm{coNP}$, mentre il viceversa non si sa.

## Caso $\mathrm{NP} = \mathrm{coNP}$

L'ipotesi dice $\Sigma_1^{\mathrm{P}} = \Pi_1^{\mathrm{P}}$, che è l'ipotesi del Teorema 17.9 con $i = 1$. Il teorema dà, per ogni $j \gt 1$,

$$\Sigma_j^{\mathrm{P}} = \Pi_j^{\mathrm{P}} = \Delta_j^{\mathrm{P}} = \mathrm{NP},$$

quindi tutta la gerarchia è uguale a NP.

## Caso $\mathrm{P} = \mathrm{NP}$

P è chiusa per complemento: una macchina deterministica che si ferma sempre si complementa scambiando gli stati di accettazione e di rifiuto, e il tempo resta lo stesso. Quindi $\mathrm{coP} = \mathrm{P}$, e

$$\mathrm{coNP} = \mathrm{coP} = \mathrm{P} = \mathrm{NP}.$$

La prima uguaglianza viene dall'ipotesi letta sui complementi. Vale quindi $\mathrm{NP} = \mathrm{coNP}$, e si ricade nel caso precedente. Qui la gerarchia collassa ancora più in basso: $\mathrm{PH} = \mathrm{NP} = \mathrm{P}$.

## Che cosa ne segue

Letto al contrario, il corollario dice che una gerarchia con i livelli davvero distinti richiede $\mathrm{NP} \neq \mathrm{coNP}$, e di conseguenza anche $\mathrm{P} \neq \mathrm{NP}$. Dimostrare che PH è una vera gerarchia vorrebbe dire dimostrare anche queste due disuguaglianze, che sono aperte.

## Dove si inciampa di solito

Da $\mathrm{NP} = \mathrm{coNP}$ non si sa ricavare $\mathrm{P} = \mathrm{NP}$. Sotto quella sola ipotesi il corollario dà $\mathrm{PH} = \mathrm{NP}$, e $\mathrm{PH} = \mathrm{P}$ resta aperto.

La chiusura per complemento di P usa il determinismo. Per una macchina nondeterministica scambiare accettazione e rifiuto non dà il complemento, perché accetta quando almeno un ramo accetta: è per questo che NP e coNP potrebbero essere diverse.
