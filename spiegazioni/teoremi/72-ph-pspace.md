# Proposizione 17.1 ($\mathrm{PH} \subseteq \mathrm{PSPACE}$)

## Prima di leggere

1. Come si scrive con i quantificatori un problema di $\Sigma_i^{\mathrm{P}}$?
2. Una macchina che lavora in tempo $t(n)$ quante celle può usare al più?

<details><summary>Risposte</summary>

1. $L = \{x : \exists y_1\, \forall y_2 \dots Q y_i\, (x, y_1, \dots, y_i) \in R\}$, dove $R$ si decide in tempo polinomiale, ogni $|y_j|$ è al più $|x|^k$, e $Q$ è $\exists$ se $i$ è dispari, $\forall$ se è pari.
2. Al più $t(n)$ celle per nastro, più quella di partenza: a ogni passo la testina si sposta di una posizione sola. Quindi una computazione in tempo polinomiale usa anche spazio polinomiale.

</details>

Se la seconda risposta non ti tornava, rileggila: serve alla fine, per lo spazio della verifica.

## Il problema

PH ha infiniti livelli, e ognuno aggiunge un blocco di quantificatori. Ci si può chiedere se, salendo, si arrivi a problemi che richiedono più di spazio polinomiale. La proposizione dice di no: tutta la torre sta dentro PSPACE, perché lo spazio usato per un certificato si può riusare per il successivo.

## L'idea: provare tutti i certificati, uno alla volta

Sia $L \in \mathrm{PH}$, quindi $L \in \Sigma_i^{\mathrm{P}}$ per un certo $i$. Se $i = 0$, $L \in \mathrm{P} \subseteq \mathrm{PSPACE}$ e non c'è niente da fare. Altrimenti si usa la forma con i quantificatori.

Una macchina deterministica prova tutti i valori di $y_1$: scrive $y_1 = 00\dots0$, valuta il resto della formula, poi incrementa $y_1$ come un contatore binario e ripete, fino a $11\dots1$. Su un $\exists$ risponde sì appena un valore funziona; su un $\forall$ risponde sì solo se funzionano tutti. Valutare il resto vuol dire fare lo stesso con $y_2$, poi con $y_3$, fino all'ultimo livello, dove si controlla $(x, y_1, \dots, y_i) \in R$.

## Un esempio

Prendi $i = 2$ e certificati di 2 bit, con $(x, y_1, y_2) \in R$ se e solo se $y_1 \ge y_2$ come numeri binari. La domanda è se esiste un $y_1$ maggiore o uguale a ogni $y_2$.

```
y1 = 00   y2 = 00 sì, 01 no                → 00 scartato
y1 = 01   y2 = 00 sì, 01 sì, 10 no         → 01 scartato
y1 = 10   y2 = 00, 01, 10 sì, 11 no        → 10 scartato
y1 = 11   y2 = 00, 01, 10, 11 sì           → accetta
```

La macchina fa 13 controlli di $R$, ma sul nastro tiene sempre e solo i 4 bit di $y_1$ e $y_2$, più lo spazio della verifica in corso.

## Il conto dello spazio

In ogni momento la macchina tiene:

- i valori correnti di $y_1, \dots, y_i$, al più $i \cdot |x|^k$ simboli;
- per ogni livello un'informazione di stato: se sta cercando un valore buono (su un $\exists$) o controllando che vadano bene tutti (su un $\forall$);
- lo spazio della verifica di $R$, polinomiale perché $R$ si decide in tempo polinomiale e una macchina non usa più celle dei passi che fa. Ogni verifica riusa la stessa porzione di nastro.

$i$ è una costante fissata da $L$, quindi il totale è $O(i \cdot |x|^k)$ più un polinomio, e $L \in \mathrm{PSPACE}$. Il tempo invece è esponenziale, perché ogni livello può provare fino a $2^{|x|^k}$ valori.

## Dove si inciampa di solito

Viene da pensare che la macchina debba ricordare i certificati già provati, e allora servirebbe spazio esponenziale. Basta l'ultimo: l'ordine è quello di un contatore, e il valore successivo si ricava dal corrente. Un certificato scartato non lascia niente sul nastro.

La proposizione non dice che l'inclusione sia stretta: se $\mathrm{PH} = \mathrm{PSPACE}$ è una domanda aperta.
