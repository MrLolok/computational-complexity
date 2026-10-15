# Proposizione $C^D = C^{\mathrm{co}D}$

## Prima di leggere

Come risponde un oracolo a una macchina?

<details><summary>Risposta</summary>

La macchina scrive una stringa $w$ sul nastro delle domande ed entra nello stato di domanda. Al passo successivo si trova nello stato $q_{\mathrm{YES}}$ se $w$ sta nel linguaggio dell'oracolo, nello stato $q_{\mathrm{NO}}$ altrimenti. Da lì prosegue secondo la sua tabella di transizione.

</details>

## L'idea

Chiedere "$w \in A$?" o "$w \in \overline{A}$?" dà la stessa informazione, letta al contrario. Basta allora scambiare $q_{\mathrm{YES}}$ e $q_{\mathrm{NO}}$ nella tabella della macchina.

Sia $L \in C^D$, deciso da una macchina $M$ con oracolo $A \in D$. Si costruisce $M'$ uguale a $M$, salvo che ciò che $M$ fa dopo $q_{\mathrm{YES}}$ la nuova macchina lo fa dopo $q_{\mathrm{NO}}$, e viceversa. A $M'$ si dà l'oracolo $\overline{A}$, che sta in $\mathrm{co}D$. Per ogni domanda $w$, $w \in A \iff w \notin \overline{A}$: quando $M$ riceve $q_{\mathrm{YES}}$, $M'$ riceve $q_{\mathrm{NO}}$ e per lo scambio fa la stessa mossa. Le due computazioni coincidono passo per passo.

Un esempio: una macchina NP che chiede a UNSAT "$\varphi$ è insoddisfacibile?" e accetta se la risposta è no può chiedere invece a SAT "$\varphi$ è soddisfacibile?" e accettare se la risposta è sì. Per questo $\mathrm{NP}^{\mathrm{coNP}} = \mathrm{NP}^{\mathrm{NP}} = \Sigma_2^{\mathrm{P}}$.

## Perché le risorse non cambiano

$M'$ è dello stesso tipo di $M$ (deterministica o no), fa gli stessi passi e usa le stesse celle, quindi rispetta il budget di $C$. Dunque $C^D \subseteq C^{\mathrm{co}D}$. Per il verso opposto si ripete l'argomento partendo da $\mathrm{co}D$: il complemento di un linguaggio di $\mathrm{co}D$ sta in $D$.

## Dove si inciampa di solito

Il trucco scambia le risposte dell'oracolo, non l'accettazione della macchina. Una macchina nondeterministica non si complementa scambiando accettazione e rifiuto: accetta se almeno un ramo accetta, e dopo lo scambio accetterebbe se almeno un ramo rifiuta, che è un'altra condizione. La risposta dell'oracolo invece è un singolo evento deterministico, uguale su ogni ramo, e si legge al contrario senza problemi.

Per lo stesso motivo la proposizione non dice nulla su $C$ contro $\mathrm{co}C$: da $\mathrm{NP}^{\mathrm{coNP}} = \mathrm{NP}^{\mathrm{NP}}$ non segue che $\Sigma_2^{\mathrm{P}} = \Pi_2^{\mathrm{P}}$.
