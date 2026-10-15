# Complemento di HAMILTON PATH: coNP-completo, $\Pi_2^{\mathrm{P}}$-completo solo se $\mathrm{NP} = \mathrm{coNP}$

## Prima di leggere

1. Se $L$ è NP-completo, perché il suo complemento è coNP-completo?
2. Che rapporto c'è fra coNP e $\Pi_2^{\mathrm{P}}$?

<details><summary>Risposte</summary>

1. Se $R$ riduce un problema $A \in \mathrm{NP}$ a $L$, vale $x \in A \iff R(x) \in L$, cioè anche $x \notin A \iff R(x) \notin L$: la stessa $R$ riduce il complemento di $A$ al complemento di $L$. Al variare di $A$ in NP, il complemento di $A$ percorre tutta coNP.
2. $\mathrm{coNP} = \Pi_1^{\mathrm{P}} \subseteq \Pi_2^{\mathrm{P}}$: ogni livello della gerarchia contiene quelli sotto.

</details>

## Il problema

Il complemento di HAMILTON PATH chiede, dato un grafo, se non esiste nessun cammino che visiti tutti i nodi una volta sola. HAMILTON PATH è NP-completo (il certificato è il cammino), quindi il complemento è coNP-completo.

Stare in $\Pi_2^{\mathrm{P}}$ è gratis, perché $\mathrm{coNP} \subseteq \Pi_2^{\mathrm{P}}$. Essere $\Pi_2^{\mathrm{P}}$-completo chiede di più: ogni problema di $\Pi_2^{\mathrm{P}}$ dovrebbe ridursi a lui. La proposizione dice che questo succede esattamente quando $\mathrm{NP} = \mathrm{coNP}$.

## L'idea

Supponiamo che il complemento di HAMILTON PATH sia $\Pi_2^{\mathrm{P}}$-completo. Allora ogni problema di $\Pi_2^{\mathrm{P}}$ si riduce a un problema di coNP. coNP è chiusa rispetto alle riduzioni, quindi

$$\Pi_2^{\mathrm{P}} \subseteq \mathrm{coNP} \subseteq \Pi_2^{\mathrm{P}}, \quad \text{cioè } \Pi_2^{\mathrm{P}} = \mathrm{coNP}.$$

Da qui si arriva a $\mathrm{NP} = \mathrm{coNP}$. Si ha $\mathrm{NP} \subseteq \Pi_2^{\mathrm{P}} = \mathrm{coNP}$, e complementando entrambi i lati $\mathrm{coNP} \subseteq \mathrm{NP}$. La gerarchia collassa al primo livello.

Il viceversa: se $\mathrm{NP} = \mathrm{coNP}$, PH collassa al primo livello e $\Pi_2^{\mathrm{P}} = \mathrm{coNP}$. Allora ogni problema coNP-completo è anche $\Pi_2^{\mathrm{P}}$-completo, compreso il complemento di HAMILTON PATH.

## Le riduzioni con QSAT

| Riduzione                           | Esiste?                                   | Perché                                                             |
| ----------------------------------- | ----------------------------------------- | ------------------------------------------------------------------ |
| complemento di HAMILTON PATH → QSAT | sì                                        | $\mathrm{coNP} \subseteq \mathrm{PSPACE}$ e QSAT è PSPACE-completo |
| QSAT → complemento di HAMILTON PATH | solo se $\mathrm{PSPACE} = \mathrm{coNP}$ | QSAT è PSPACE-completo                                             |

La seconda riga porterebbe PSPACE dentro coNP. PSPACE è chiusa per complemento, quindi anche $\mathrm{PSPACE} \subseteq \mathrm{NP}$, e si avrebbe $\mathrm{PH} = \mathrm{PSPACE} = \mathrm{NP} = \mathrm{coNP}$: PH collasserebbe al primo livello.

## Dove si inciampa di solito

Che il complemento di HAMILTON PATH non sia $\Pi_2^{\mathrm{P}}$-completo non è dimostrato. Equivale a $\mathrm{NP} \neq \mathrm{coNP}$, che si crede vero ma resta una domanda aperta.

Lo stesso vale per HAMILTON PATH, con cui il complemento viene spesso scambiato. Se HAMILTON PATH fosse $\Pi_2^{\mathrm{P}}$-completo, $\Pi_2^{\mathrm{P}}$ starebbe in NP; allora $\mathrm{coNP} \subseteq \Pi_2^{\mathrm{P}} \subseteq \mathrm{NP}$, e di nuovo $\mathrm{NP} = \mathrm{coNP}$.
