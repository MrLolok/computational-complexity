# QSAT è PSPACE-completo

## Prima di leggere

1. Nel Teorema di Savitch, che cosa vuol dire $\mathrm{PATH}(x, y, i)$ e come si spezza?
2. Una macchina che usa spazio $n^c$ quante configurazioni diverse può avere?

<details><summary>Risposte</summary>

1. È vero se c'è un cammino da $x$ a $y$ lungo al più $2^i$. Si spezza cercando un punto di mezzo: $\mathrm{PATH}(x, y, i) \iff \exists z : \mathrm{PATH}(x, z, i-1) \land \mathrm{PATH}(z, y, i-1)$.
2. Una configurazione (contenuto dei nastri, posizioni delle testine, stato) si scrive con $m = O(n^c)$ bit, quindi le configurazioni sono al più $2^m$: un numero esponenziale.

</details>

Se la prima risposta non ti tornava, rileggi il Teorema di Savitch: la parte difficile di questa prova è il suo trucco riscritto come formula.

## Il problema

QSAT chiede se è vera una formula booleana quantificata (QBF) con un numero qualsiasi di alternanze di quantificatori. Il teorema ha due metà: QSAT sta in PSPACE, e ogni problema di PSPACE si riduce a QSAT.

## Appartenenza: provare falso e poi vero nello stesso spazio

L'algoritmo Truth valuta $Q_1 p_1 \dots Q_n p_n\, \varphi$ così. Se non ci sono quantificatori valuta $\varphi$. Altrimenti calcola $b_0$, il valore del resto con $p_1$ falsa, poi $b_1$, il valore con $p_1$ vera, riusando lo stesso spazio; restituisce $b_0 \lor b_1$ se $Q_1 = \exists$ e $b_0 \land b_1$ se $Q_1 = \forall$.

Su $\forall p\, \exists q\, (p \lor q) \land (\neg p \lor \neg q)$:

```
p = falso:  q = falso → falsa,  q = vero → vera     ∃: vera
p = vero:   q = falso → vera,   q = vero → falsa    ∃: vera
∀ su p: tutti e due veri                              vera
```

La ricorsione è profonda $n$ e ogni livello ricorda due bit e i valori già assegnati. Anche copiando a ogni livello tutta l'assegnazione si sta in $O(n^2)$, più lo spazio per valutare $\varphi$: polinomiale. Il tempo arriva a $2^n$, una foglia per ogni assegnazione.

## Difficoltà: l'accettazione come raggiungibilità

Sia $L \in \mathrm{PSPACE}$, deciso da una macchina $M$ con budget di spazio $n^c$. Supponiamo che $M$, prima di accettare, cancelli i nastri: così c'è una sola configurazione accettante $C_{\mathrm{acc}}$, che si può scrivere come costante. $M$ accetta $x$ se e solo se nel grafo delle configurazioni c'è un cammino dalla configurazione iniziale $C_0$ a $C_{\mathrm{acc}}$. Un cammino che non ripete configurazioni ne attraversa al più $2^m$, quindi basta cercare cammini lunghi al più $2^m$.

Si costruiscono formule $\psi_i(X, Y)$, dove $X$ e $Y$ sono blocchi di $m$ variabili che codificano due configurazioni, vere quando da $X$ si arriva a $Y$ in al più $2^i$ passi.

$\psi_0(X, Y)$ dice che $X$ e $Y$ sono uguali o che $Y$ segue $X$ in un passo. Si scrive come nel Teorema di Cook-Levin, con una tabella di due righe sole, e ha dimensione polinomiale in $m$.

Il passo ricorsivo naturale è quello di Savitch:

$$\psi_{i+1}(X, Y) = \exists Z\, [\psi_i(X, Z) \land \psi_i(Z, Y)].$$

È corretto, perché un cammino lungo al più $2^{i+1}$ ha un punto di mezzo $Z$. Però $\psi_i$ compare due volte, quindi la lunghezza raddoppia a ogni livello e $\psi_m$ contiene $2^m$ copie di $\psi_0$. Savitch non ha questo problema perché le due chiamate si eseguono una dopo l'altra sullo stesso nastro; una formula invece va scritta tutta, e le due copie occupano spazio tutte e due.

## Il trucco: un $\forall$ per scrivere una copia sola

$$\psi_{i+1}(X, Y) = \exists Z\, \forall A\, \forall B\, \big[((A = X \land B = Z) \lor (A = Z \land B = Y)) \to \psi_i(A, B)\big].$$

Il $\forall$ fa variare $(A, B)$ su tutte le coppie di configurazioni, ma l'implicazione con premessa falsa è vera, quindi conta solo per due coppie:

| $(A, B)$          | premessa | che cosa impone |
| ----------------- | -------- | --------------- |
| $(X, Z)$          | vera     | $\psi_i(X, Z)$  |
| $(Z, Y)$          | vera     | $\psi_i(Z, Y)$  |
| ogni altra coppia | falsa    | niente          |

La formula è vera se e solo se esiste $Z$ con $\psi_i(X, Z) \land \psi_i(Z, Y)$, come quella ingenua, ma $\psi_i$ compare una volta sola. "$A = X$" è un'abbreviazione per $\bigwedge_{k=1}^{m} (a_k \leftrightarrow x_k)$, lunga $O(m)$.

La riduzione manda $x$ in $\psi_m(C_0, C_{\mathrm{acc}})$, con $X$ e $Y$ sostituiti dai bit delle due configurazioni, e porta tutti i quantificatori in testa, cosa possibile perché le variabili sono tutte diverse. La QBF è vera se e solo se $x \in L$. La costruzione è ripetitiva e usa solo contatori per gli indici delle variabili, quindi si fa in spazio logaritmico.

## Il conto della dimensione

Ogni livello aggiunge a $\psi_i$ i quantificatori su $Z$, $A$, $B$ e le uguaglianze, cioè $O(m)$ simboli: $|\psi_{i+1}| = |\psi_i| + O(m)$. I livelli sono $m$, quindi

$$|\psi_m| = |\psi_0| + m \cdot O(m) = |\psi_0| + O(m^2),$$

polinomiale perché $m = O(n^c)$.

## Dove si inciampa di solito

C'è chi legge $\forall A\, \forall B$ come "$\psi_i$ vale per tutte le coppie". Allora la formula chiederebbe che ogni configurazione porti a ogni altra in al più $2^i$ passi, e sarebbe quasi sempre falsa. L'implicazione rende vacuo il vincolo su tutte le coppie tranne $(X, Z)$ e $(Z, Y)$.

Viene anche da concludere che QSAT stia in PH, perché ogni istanza ha un numero finito di alternanze. Per stare in un livello di PH il numero di alternanze deve essere fissato una volta per tutte, mentre qui ogni livello aggiunge un $\exists$ seguito da un $\forall$: circa $2m$ alternanze, che crescono con l'input. Per questo QSAT non sta in un livello fisso di PH, a meno di collassi.
