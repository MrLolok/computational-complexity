# Teorema 2.5 (le RAM si simulano con le MdT)

## Prima di leggere

Che cos'è una RAM, e come si conta il suo tempo?

<details><summary>Risposta</summary>

Una RAM ha un programma finito di istruzioni (lettura dell'input, LOAD, STORE, ADD, SUB, HALF, salti condizionati, HALT) e una fila di registri $r_0, r_1, \ldots$, ognuno dei quali contiene un intero grande a piacere. Il tempo è il numero di istruzioni eseguite: ogni istruzione conta un passo, anche quando somma due numeri di mille cifre.

</details>

Se l'ultima frase ti sembra strana, tienila a mente: un passo della RAM può lavorare su numeri lunghissimi, che una MdT deve pagare cifra per cifra. Il lemma sulla lunghezza dei numeri, più sotto, serve a controllare che non diventino troppo lunghi.

## Il problema

La RAM somiglia a un calcolatore vero: raggiunge qualunque registro con un'istruzione sola, mentre una MdT deve scorrere il nastro fino alla cella che le serve. Il teorema dice che la differenza costa poco: se la RAM calcola $\varphi$ in tempo $f(n)$, una MdT a 7 nastri calcola $\varphi$ in tempo $O(f(n)^3)$. Un problema polinomiale su RAM resta in P.

## I numeri non crescono troppo in fretta

Dopo $t$ passi ogni registro contiene un intero che in binario è lungo al più $t + \ell + b$ bit, dove $\ell$ è la lunghezza dell'input e $b$ quella della costante più grande del programma. Una somma o una sottrazione allunga un numero al più di un bit, il dimezzamento lo accorcia, un caricamento copia un numero che c'era già: a ogni passo la lunghezza massima cresce al più di 1.

Per questo nel modello manca la moltiplicazione. Partendo da 2 e raddoppiando con ADD dieci volte si arriva a $2^{11}$, che ha 12 bit. Partendo da 2 ed elevando al quadrato dieci volte si arriva a $2^{1024}$, che ne ha 1025. Con la moltiplicazione la lunghezza potrebbe crescere come $2^t$, e il nastro della MdT diventerebbe esponenziale.

## La simulazione

La MdT tiene l'input sul primo nastro. Sul secondo scrive i registri usati, come coppie "indirizzo : contenuto" in binario, una dopo l'altra. Se finora la RAM ha usato $r_0 = 6$, $r_2 = 3$ e $r_5 = 12$, il nastro contiene per esempio

```
0 : 110   10 : 11   101 : 1100
```

L'istruzione corrente la MdT la ricorda nello stato, perché il programma è finito. Gli altri nastri tengono l'indirizzo del registro cercato e fanno da appoggio per somme, sottrazioni e dimezzamenti in binario, fatti cifra per cifra come su carta. Il 7 è il numero di nastri che serve a questa costruzione; conta che sia fissato e non dipenda dall'input.

Per eseguire un'istruzione la MdT cerca sul secondo nastro la coppia con l'indirizzo giusto, legge il contenuto, fa l'operazione sui nastri di appoggio e riscrive il risultato. Le bastano un numero costante di passate sul nastro dei registri.

## Il conto

In $f(n)$ passi la RAM scrive al più $f(n)$ registri diversi, uno per passo, quindi sul secondo nastro ci sono al più $f(n)$ coppie. Per il lemma ogni contenuto è lungo $O(f(n))$ bit: $\ell \le n \le f(n)$, perché un budget di tempo è sempre almeno $n$, e $b$ è fissato. Lo stesso vale per gli indirizzi, perché con l'indirizzamento indiretto un indirizzo è un numero letto da un registro. Il nastro dei registri è lungo

$$f(n) \cdot O(f(n)) = O(f(n)^2).$$

Un'istruzione costa un numero costante di passate su questo nastro, cioè $O(f(n)^2)$ passi; le operazioni in binario su numeri di $O(f(n))$ cifre costano $O(f(n))$ e non cambiano il conto. Per $f(n)$ istruzioni:

$$f(n) \cdot O(f(n)^2) = O(f(n)^3).$$

I tre fattori $f(n)$ hanno origini diverse: quante istruzioni esegue la RAM, quante coppie ci sono sul nastro, quanto è lunga ciascuna. La MdT calcola la stessa $\varphi$ perché esegue le stesse istruzioni sugli stessi valori.

## Dove si inciampa di solito

Chi salta il lemma sulla lunghezza dei numeri tende a contare un registro come una cella del nastro. Ottiene un tempo più piccolo, ma il conto è sbagliato: un registro può contenere un numero di $O(f(n))$ bit, e la MdT lo legge un bit alla volta.
