# Proposizione $C^D = C^{\mathrm{co}D}$

## Prima di leggere, una domanda di controllo

Prova a rispondere a mente prima di andare avanti.

Se $D$ è una classe di linguaggi, che cos'è $\mathrm{co}D$? E come riceve la risposta una macchina che interroga un oracolo $A$?

<details><summary>Risposta</summary>

$\mathrm{co}D$ contiene i complementi dei linguaggi di $D$: $\overline{A} \in \mathrm{co}D$ se e solo se $A \in D$. Per esempio coNP contiene co-SAT, il complemento di SAT. La macchina scrive la domanda $w$ sul nastro di query e in un passo si ritrova nello stato $q_{\mathrm{YES}}$ se $w \in A$, nello stato $q_{\mathrm{NO}}$ altrimenti. Quello che fa dopo dipende dalla sua tabella di transizione.

</details>

## Che cosa dice

Dare a una macchina l'oracolo $A$ o l'oracolo $\overline{A}$ non cambia i linguaggi che si riescono a decidere. Quindi un oracolo coNP vale quanto un oracolo NP, e in generale $C^D = C^{\mathrm{co}D}$ per qualunque classe $C$ e qualunque classe di oracoli $D$.

## L'idea: leggere la risposta al contrario

Chiedere "$w \in A$?" e chiedere "$w \in \overline{A}$?" dà la stessa informazione, letta al contrario. Sia $M^A$ una macchina che decide $L$ con l'oracolo $A \in D$, rispettando il budget di $C$. Si costruisce $M'$ uguale a $M$, ma con $q_{\mathrm{YES}}$ e $q_{\mathrm{NO}}$ scambiati nella tabella di transizione, e le si dà l'oracolo $\overline{A}$. Su ogni domanda le due macchine fanno la stessa mossa:

| domanda $w$  | $M$ con oracolo $A$                              | $M'$ con oracolo $\overline{A}$                          |
| ------------ | ------------------------------------------------ | -------------------------------------------------------- |
| $w \in A$    | riceve $q_{\mathrm{YES}}$ e va nello stato $s_1$ | riceve $q_{\mathrm{NO}}$ e, per lo scambio, va in $s_1$  |
| $w \notin A$ | riceve $q_{\mathrm{NO}}$ e va nello stato $s_2$  | riceve $q_{\mathrm{YES}}$ e, per lo scambio, va in $s_2$ |

Così le due computazioni coincidono passo dopo passo, su ogni domanda. $M'$ ha lo stesso tipo di $M$ (deterministica o no) e usa gli stessi passi e le stesse celle, quindi rispetta il budget di $C$. Dunque $C^D \subseteq C^{\mathrm{co}D}$. Per l'altra inclusione si parte da un oracolo in $\mathrm{co}D$ e si ripete tutto, perché il complemento di un linguaggio di $\mathrm{co}D$ sta in $D$.

Lo scambio non costa niente perché l'oracolo è una scatola nera che risponde in un passo. Se la macchina dovesse calcolare da sé la risposta di un problema NP, passare al complemento vorrebbe dire decidere un problema coNP, e non si sa se una macchina NP possa farlo: è la domanda aperta NP contro coNP.

## Un esempio

Una macchina NP che deve sapere se una formula $\psi$ è insoddisfacibile potrebbe usare l'oracolo co-SAT, che sta in coNP. Con la proposizione chiede invece a SAT "$\psi$ è soddisfacibile?" e prosegue come se avesse ricevuto la risposta opposta. Per questo $\mathrm{NP}^{\mathrm{coNP}} = \mathrm{NP}^{\mathrm{NP}} = \Sigma_2^{\mathrm{P}}$, e non si scrivono $\mathrm{P}^{\mathrm{coNP}}$ o $\mathrm{NP}^{\mathrm{coNP}}$.

## Dove si inciampa di solito

Complementare l'oracolo e complementare la classe sono operazioni diverse. Lo scambio tocca solo le risposte dell'oracolo, e la macchina accetta e rifiuta come prima. Quindi $\mathrm{coNP}^{\mathrm{NP}}$ è $\Pi_2^{\mathrm{P}}$, la classe dei complementi dei problemi di $\Sigma_2^{\mathrm{P}}$, e non si sa se coincida con $\mathrm{NP}^{\mathrm{coNP}} = \Sigma_2^{\mathrm{P}}$.
