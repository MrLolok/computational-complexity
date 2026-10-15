# Se $\mathrm{P} = \mathrm{NP}$ allora $\mathrm{NP} = \mathrm{coNP}$

## Prima di leggere

Quando un linguaggio sta in coNP?

<details><summary>Risposta</summary>

Quando il suo complemento sta in NP. coNP non è "ciò che sta fuori da NP": un problema può stare in entrambe le classi.

</details>

## L'idea

La prova si regge su un fatto: P è chiusa per complemento, cioè $\mathrm{coP} = \mathrm{P}$. Se $\mathrm{P} = \mathrm{NP}$, anche NP diventa chiusa per complemento, e questo vuol dire proprio $\mathrm{NP} = \mathrm{coNP}$. In una riga:

$$\mathrm{NP} = \mathrm{P} = \mathrm{coP} = \mathrm{coNP}.$$

Il primo uguale è l'ipotesi. L'ultimo viene dalla stessa ipotesi, perché se due classi coincidono coincidono anche le classi dei loro complementi. Quello in mezzo è la chiusura di P.

## Perché P è chiusa per complemento

Se $L \in \mathrm{P}$, una macchina deterministica $M$ decide $L$ in tempo polinomiale e si ferma sempre con SÌ o NO. Scambiando le due risposte si ottiene una macchina che decide $\overline{L}$ nello stesso tempo.

Serve che $M$ si fermi sempre: su un input dove non si fermasse, scambiare le risposte non cambierebbe niente. Il limite di tempo polinomiale lo garantisce.

## Perché lo stesso trucco non funziona per NP

Una macchina nondeterministica accetta se almeno un ramo accetta. Scambiando le risposte su ogni ramo si ottiene una macchina che accetta se almeno un ramo rifiuta, mentre per il complemento servirebbe "tutti i rami rifiutano".

Prendi la macchina per SAT che indovina un assegnamento e accetta se soddisfa la formula. Con le risposte scambiate accetta quando l'assegnamento indovinato rende falsa la formula, quindi riconosce le formule non valide, e non quelle insoddisfacibili. La formula $x$, per esempio, viene accettata da tutte e due le macchine.

## Dove si inciampa di solito

Il teorema va in un verso solo: da $\mathrm{NP} = \mathrm{coNP}$ non si sa ricavare $\mathrm{P} = \mathrm{NP}$, e potrebbe valere $\mathrm{NP} = \mathrm{coNP}$ anche con $\mathrm{P} \ne \mathrm{NP}$. Di solito lo si usa per contrapposizione: se $\mathrm{NP} \ne \mathrm{coNP}$, allora $\mathrm{P} \ne \mathrm{NP}$.
