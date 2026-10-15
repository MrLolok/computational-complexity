# Teorema 19.3 (GEOGRAPHY è PSPACE-completo)

## Prima di leggere

1. Che cos'è una strategia vincente in un gioco a due giocatori?
2. In una QBF, perché si può supporre che i quantificatori alternino $\exists\forall\exists\dots$ e che l'ultimo sia $\exists$?

<details><summary>Risposte</summary>

1. Un modo di scegliere le proprie mosse, in funzione di quelle già fatte dall'avversario, che fa vincere qualunque cosa l'avversario risponda. "Il primo giocatore ha una strategia vincente" si scrive: esiste una mia mossa tale che per ogni tua risposta esiste una mia mossa tale che...
2. Fra due $\exists$ consecutivi si può inserire un $\forall$ su una variabile nuova che non compare nella formula, e lo stesso per due $\forall$; in testa e in fondo, se serve, si aggiunge un $\exists$ fittizio. Il valore di verità non cambia.

</details>

## Il gioco

C'è un grafo orientato $G = (V, E)$ e si parte dal nodo 1. A turno ogni giocatore sceglie un nodo non ancora usato, collegato da un arco all'ultimo nodo detto. Chi non può muovere perde. La domanda è se il primo giocatore ha una strategia vincente.

Il divieto di ripetere i nodi (una città non si dice due volte) fa durare ogni partita al più $|V|$ mosse.

## Appartenenza a PSPACE

Il giocatore di turno vince se esiste una mossa verso un nodo libero $v$ tale che l'avversario, ripartendo da $v$, non vince. È la forma "esiste una mossa tale che per ogni risposta..." di una QBF, e si valuta allo stesso modo, in profondità. La ricorsione è profonda al più $|V|$ e ogni livello ricorda il nodo scelto e il prossimo successore da provare. I nodi già usati sono quelli della partita in corso, cioè quelli sulla pila, quindi non serve un elenco a parte. Lo spazio è $O(|V| \log |V|)$.

## Difficoltà: una partita che valuta una formula

Si riduce QSAT. Sia $\varphi = \exists x_1\, \forall x_2\, \exists x_3 \dots \exists x_n\, \psi$ con $\psi$ in forma normale congiuntiva. Il grafo ha un rombo per ogni variabile, i rombi in catena, e in fondo le clausole:

```
        T1               si parte da qui (nodo 1)
       /  \
     V1    F1            x1 vera / x1 falsa
       \  /
        B1
        |
        T2               rombo di x2, e così via
        ...
        Bn
        |
        R                raccordo
      / | \
    C1 C2 ... Ck         un nodo per clausola
     |
   nodi-letterale        ognuno con un solo arco, verso V o F del suo rombo
```

Nel rombo $i$, dal nodo in alto si scende a $V_i$ ($x_i$ vera) o a $F_i$ ($x_i$ falsa), poi si arriva in fondo $B_i$ e da lì al rombo successivo. Ogni rombo dura tre mosse, e siccome tre è dispari chi sceglie il lato cambia da un rombo all'altro: il primo giocatore sceglie $x_1$, il secondo $x_2$, il primo $x_3$. Percorrere la catena vuol dire scegliere un'assegnazione nell'ordine dei quantificatori.

Dopo l'ultimo rombo il nodo di raccordo $R$ fa sì che la mossa successiva tocchi al secondo giocatore, che va su un nodo-clausola $C_j$ (sostiene: "questa clausola è falsa"). Il primo risponde con un nodo-letterale di $C_j$ ("questo letterale è vero"). Il nodo-letterale $x_i$ ha un solo arco, verso $V_i$; quello di $\neg x_i$ verso $F_i$.

A questo punto tocca al secondo. Se il letterale è vero, il suo nodo nel rombo è già stato usato: il secondo non può muovere e perde. Se è falso, il secondo ci va, ma da lì l'unica uscita porta a $B_i$, già usato: il primo non può muovere e perde. Quindi il primo vince il finale se e solo se ogni clausola ha un letterale vero, cioè se $\psi$ è vera con l'assegnazione scelta. Il primo giocatore ha una strategia vincente se e solo se esiste un valore di $x_1$ tale che per ogni valore di $x_2$... $\psi$ è vera, cioè se $\varphi$ è vera.

Il grafo ha dimensione lineare in $\varphi$ e si costruisce in spazio logaritmico; siccome QSAT è PSPACE-completo, lo è anche GEOGRAPHY.

## Un esempio

$\varphi = \exists x_1\, \forall x_2\, \exists x_3\, (x_1 \lor x_2) \land (\neg x_2 \lor x_3)$ è vera: il primo prende $x_1$ vera e poi $x_3$ vera. In questa partita il secondo prova $x_2$ vera:

| Mossa | Chi | Nodo | Significato |
|---|---|---|---|
| 1 | primo | $V_1$ | $x_1$ vera |
| 2 | secondo | $B_1$ | |
| 3 | primo | $T_2$ | |
| 4 | secondo | $V_2$ | $x_2$ vera |
| 5 | primo | $B_2$ | |
| 6 | secondo | $T_3$ | |
| 7 | primo | $V_3$ | $x_3$ vera |
| 8 | secondo | $B_3$ | |
| 9 | primo | $R$ | |
| 10 | secondo | $C_2$ | "$\neg x_2 \lor x_3$ è falsa" |
| 11 | primo | letterale $x_3$ | "$x_3$ è vero" |
| 12 | secondo | nessuna | l'unico arco porta a $V_3$, già usato: perde |

Se alla mossa 10 il secondo avesse scelto $C_1$, il primo avrebbe risposto con il letterale $x_1$, che porta a $V_1$, già usato. Se invece alla mossa 1 il primo avesse scelto $F_1$, il secondo avrebbe preso $F_2$ e poi $C_1$: entrambi i letterali di $C_1$ sono falsi, e qualunque scelga il primo, il secondo entra nel lato libero del rombo e lascia il primo senza mosse.

## Dove si inciampa di solito

Il divieto di ripetere i nodi viene spesso preso per un dettaglio delle regole. Senza, una partita può non finire, e il finale della riduzione non funziona più: il controllo sui letterali si basa proprio sul fatto che un nodo del rombo sia già stato usato.

GEOGRAPHY non sta in un livello fisso di PH, a meno di collassi. Le alternanze corrispondono alle mosse, e il loro numero cresce con il grafo.
