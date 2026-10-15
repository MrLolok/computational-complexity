# Corollario di 17.11 ($\mathrm{PH} = \mathrm{PSPACE} \Rightarrow$ collasso)

## Prima di leggere

1. Che cosa dice il Teorema 17.11?
2. Perché ogni problema di PH si riduce a QSAT?

<details><summary>Risposte</summary>

1. Se esiste un problema PH-completo, la gerarchia polinomiale collassa a un livello finito.
2. $\mathrm{PH} \subseteq \mathrm{PSPACE}$ (Proposizione 17.1) e QSAT è PSPACE-completo, quindi ogni problema di PSPACE, e in particolare di PH, si riduce a QSAT.

</details>

## L'idea

PSPACE ha un problema completo, QSAT. Se PH fosse uguale a PSPACE, QSAT sarebbe completo anche per PH. Supponiamo $\mathrm{PH} = \mathrm{PSPACE}$:

1. $\mathrm{QSAT} \in \mathrm{PSPACE} = \mathrm{PH}$;
2. ogni $L \in \mathrm{PH}$ sta in PSPACE, quindi si riduce a QSAT;
3. allora QSAT è PH-completo, e per il Teorema 17.11 la gerarchia collassa a un livello finito $k$. In più $\mathrm{PSPACE} = \mathrm{PH} = \Sigma_k^{\mathrm{P}}$.

Il primo passo è quello che rende l'ipotesi difficile da credere. $\mathrm{QSAT} \in \mathrm{PH}$ vuol dire che QSAT sta in un livello fissato $\Sigma_k^{\mathrm{P}}$: formule con un numero qualsiasi di alternanze si deciderebbero con $k$ blocchi di quantificatori, sempre gli stessi, anche su istanze con mille alternanze.

## Dove si inciampa di solito

C'è chi legge nel corollario una prova di $\mathrm{PH} \neq \mathrm{PSPACE}$. Il corollario dice solo che l'uguaglianza avrebbe come prezzo il collasso; siccome si crede che i livelli di PH siano tutti distinti, si crede anche che $\mathrm{PH} \neq \mathrm{PSPACE}$.

L'inclusione e l'uguaglianza vanno tenute separate. $\mathrm{PH} \subseteq \mathrm{PSPACE}$ è dimostrata; aperta è solo l'uguaglianza.

Alla domanda "QSAT si riduce a $\mathrm{QSAT}_3$?" la risposta non è un no secco. La riduzione porterebbe QSAT in $\Sigma_3^{\mathrm{P}}$, quindi $\mathrm{PSPACE} \subseteq \Sigma_3^{\mathrm{P}}$ e $\mathrm{PH} = \mathrm{PSPACE} = \Sigma_3^{\mathrm{P}}$: esiste solo se PH collassa al terzo livello. Nella direzione opposta, $\mathrm{QSAT}_3$ si riduce a QSAT senza ipotesi.
