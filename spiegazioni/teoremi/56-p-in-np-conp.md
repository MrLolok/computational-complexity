# Proposizione $\mathrm{P} \subseteq \mathrm{NP} \cap \mathrm{coNP}$

## Che cosa dice

Ogni problema risolvibile in tempo polinomiale sta sia in NP sia in coNP. Servono due fatti, uno per classe.

## Perché sta in NP

Una macchina deterministica è una macchina nondeterministica che a ogni passo ha una sola scelta. Ha quindi un solo ramo, che accetta esattamente quando accetta la macchina deterministica: $\mathrm{P} \subseteq \mathrm{NP}$.

Con i certificati è lo stesso: la verifica ignora il certificato e risolve il problema da sé, in tempo polinomiale.

## Perché sta in coNP

Sia $L \in \mathrm{P}$. Va mostrato che il complemento $\overline{L}$ sta in NP. P è chiusa per complemento: la macchina deterministica che decide $L$ si ferma sempre, e scambiando SÌ e NO decide $\overline{L}$ nello stesso tempo. Quindi $\overline{L} \in \mathrm{P} \subseteq \mathrm{NP}$, e per definizione $L \in \mathrm{coNP}$.

## Dove si inciampa di solito

Il teorema non dice che l'inclusione sia stretta. Se $\mathrm{NP} \cap \mathrm{coNP}$ contenga problemi fuori da P non si sa.

$\mathrm{NP} \cap \mathrm{coNP}$ e DP si confondono facilmente. Nella prima è lo stesso problema a stare in entrambe le classi; in DP un problema è l'intersezione di due linguaggi diversi, uno di NP e uno di coNP.

Lo scambio di SÌ e NO funziona solo per macchine deterministiche. Per una macchina nondeterministica SÌ vuol dire "almeno un ramo accetta", e scambiando le risposte si ottiene "almeno un ramo rifiuta", che non è il complemento. Per questo la prova passa da P.
