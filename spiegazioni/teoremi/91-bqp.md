# Teoremi $\mathrm{BPP} \subseteq \mathrm{BQP} \subseteq \mathrm{PP}$

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. In una computazione quantistica due cammini arrivano alla stessa configurazione, uno con ampiezza $+1/2$ e l'altro con ampiezza $-1/2$. Con che probabilità si osserva quella configurazione?
2. Quando un linguaggio $L$ sta in BQP?

<details><summary>Risposte</summary>

1. Zero. L'ampiezza di una configurazione è la somma delle ampiezze dei cammini che ci arrivano, qui $1/2 - 1/2 = 0$, e la probabilità di osservarla è il quadrato del modulo dell'ampiezza. Prima si somma e poi si eleva al quadrato, ed è per questo che i cammini possono cancellarsi.
2. Quando una macchina di Turing quantistica (QTM) polinomiale, misurata alla fine, dà "yes" con probabilità almeno $2/3$ se $x \in L$ e al più $1/3$ se $x \notin L$. È l'errore limitato di BPP, ma le probabilità vengono dalle ampiezze e non da run equiprobabili.

</details>

Se la prima risposta non ti tornava, rileggila: la seconda inclusione conta proprio quelle somme con il segno.

## Che cosa dice

BQP sta tra il calcolo probabilistico con errore limitato e PP. Ne seguono $\mathrm{P} \subseteq \mathrm{BQP}$, perché $\mathrm{P} \subseteq \mathrm{BPP}$, e $\mathrm{BQP} \subseteq \mathrm{PSPACE}$, perché $\mathrm{PP} \subseteq \mathrm{PSPACE}$.

## $\mathrm{BPP} \subseteq \mathrm{BQP}$: una moneta fatta con un qubit

Sia $N$ la macchina standardizzata di BPP per $L$: ogni run fa $p(n)$ scelte binarie e i run sono equiprobabili. La QTM $Q$ esegue $N$, e a ogni scelta mette un qubit nello stato $(|0\rangle + |1\rangle)/\sqrt{2}$: ampiezza $1/\sqrt{2}$ per ciascun valore, quindi probabilità $|1/\sqrt{2}|^2 = 1/2$ di leggere 0 e $1/2$ di leggere 1. Le altre transizioni hanno ampiezza 1.

$Q$ tiene sul nastro le scelte fatte. Le servono per essere reversibile, come deve essere ogni QTM: con le scelte scritte ogni passo si può disfare. E con le scelte scritte run diversi finiscono in configurazioni diverse, quindi le loro ampiezze non si sommano e non si cancellano. Ogni configurazione finale ha probabilità $(1/2)^{p(n)}$, come un run di $N$, e la probabilità di "yes" è la frazione di run accettanti: almeno $3/4 \ge 2/3$ se $x \in L$, al più $1/4 \le 1/3$ se $x \notin L$. Quindi $L \in \mathrm{BQP}$.

## $\mathrm{BQP} \subseteq \mathrm{PP}$: contare i cammini con il segno

Questa parte è di Adleman, DeMarrais e Huang. Sia $Q$ la QTM per $L$. Per un risultato noto si può supporre che usi solo le ampiezze $0, \pm 1, \pm 1/\sqrt{2}$ e che ogni cammino abbia lo stesso numero $h$ di passi con ampiezza $\pm 1/\sqrt{2}$. Allora ogni cammino ha ampiezza $\pm (1/\sqrt{2})^h$, e una configurazione finale $c$ ha ampiezza

$$(1/\sqrt{2})^h \cdot (P_c - M_c),$$

dove $P_c$ e $M_c$ contano i cammini che arrivano in $c$ con segno $+$ e con segno $-$. Elevando al quadrato e sommando sulle configurazioni accettanti:

$$P(\text{yes}) = 2^{-h} \sum_{c\ \text{accettante}} (P_c - M_c)^2.$$

Il quadrato si legge come un conteggio di coppie ordinate di cammini verso $c$: $(P_c - M_c)^2 = P_c^2 + M_c^2 - 2 P_c M_c$, cioè le coppie con segni uguali meno le coppie con segni opposti. Con $P_c = 2$ e $M_c = 1$ le coppie sono $3 \cdot 3 = 9$, quelle con segni uguali $4 + 1 = 5$, quelle con segni opposti $2 \cdot 2 \cdot 1 = 4$, e $5 - 4 = 1 = (2 - 1)^2$.

Una MdT nondeterministica $N'$ fa questo conteggio. Indovina due cammini di $Q$, che sono polinomiali, e li calcola. Se finiscono nella stessa configurazione accettante, accetta se i segni sono uguali e rifiuta se sono opposti. Altrimenti fa un'ultima scelta e accetta su un ramo e rifiuta sull'altro, così quella coppia non sposta il conto. Il numero dei run "yes" meno quello dei run "no" risulta proporzionale a $P(\text{yes})$.

Resta il confronto con $1/2$. Come nella prova di $\mathrm{NP} \subseteq \mathrm{PP}$, si aggiunge un blocco di run con risposta fissata che sposta la soglia, e $N'$ accetta a maggioranza sse $P(\text{yes}) \gt 1/2$. Per la promessa di BQP la probabilità è almeno $2/3$ oppure al più $1/3$, mai vicina a $1/2$, quindi il confronto dà la risposta giusta e $L \in \mathrm{PP}$.

Lo scarto tra run "yes" e run "no" di $N'$ è però una frazione esponenzialmente piccola del numero totale di run, che conta tutte le coppie di cammini. La maggioranza di $N'$ è quindi sottilissima, ed è per questo che la costruzione porta BQP dentro PP e non dentro BPP.

## Dove si inciampa di solito

Il computer quantistico viene immaginato come una macchina che prova tutti i cammini in parallelo e legge quello giusto. La misura restituisce una sola configurazione, con probabilità pari al quadrato dell'ampiezza. Il guadagno viene dalle cancellazioni tra cammini con segni opposti, ed è proprio ciò che $N'$ deve contare con il segno.

$\mathrm{BQP} \subseteq \mathrm{PP}$ non vuol dire che il calcolo quantistico valga quanto quello probabilistico. PP contiene NP, e si pensa che sia molto più grande di BPP: l'inclusione limita BQP dall'alto, senza dire quanto in basso stia.

Nessuna di queste inclusioni è dimostrata stretta.
