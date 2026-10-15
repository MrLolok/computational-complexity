# HORN-SAT in tempo lineare

## Prima di leggere

1. Riscrivi la clausola $(\neg a \lor \neg b \lor c)$ come implicazione. Che cosa dice invece $(\neg a \lor \neg b)$?
2. Quale fra $(\neg a \lor b)$, $(a \lor b)$ e $(\neg a \lor \neg b)$ non è una clausola di Horn?

<details><summary>Risposte</summary>

1. $(\neg a \lor \neg b \lor c)$ equivale a $(a \land b) \Rightarrow c$: se $a$ e $b$ sono vere, deve esserlo anche $c$. $(\neg a \lor \neg b)$ vieta che $a$ e $b$ siano vere insieme.
2. $(a \lor b)$, che ha due letterali positivi. Le altre due ne hanno al più uno.

</details>

## Il problema

SAT è NP-completo. Una formula di Horn è una CNF in cui ogni clausola ha al più un letterale positivo, e per queste formule la soddisfacibilità si decide in tempo lineare. Quando la formula è soddisfacibile, l'algoritmo restituisce anche un'assegnazione che la soddisfa.

Le clausole di Horn sono di tre tipi.

| tipo    | forma                                        | lettura                                     |
| ------- | -------------------------------------------- | ------------------------------------------- |
| fatto   | $(y)$                                        | $y$ è vera                                  |
| regola  | $(\neg x_1 \lor \dots \lor \neg x_k \lor y)$ | $(x_1 \land \dots \land x_k) \Rightarrow y$ |
| divieto | $(\neg x_1 \lor \dots \lor \neg x_k)$        | le $x_i$ non sono tutte vere                |

Il fatto è una regola senza premesse, cioè con $k = 0$.

## L'idea: rendere vero solo ciò che è obbligato

Con tutte le variabili false, le regole con almeno una premessa e i divieti sono già soddisfatti, perché contengono un letterale negativo vero. Restano violati solo i fatti. L'algoritmo parte da lì:

1. pone tutte le variabili false;
2. finché c'è una regola con tutte le premesse vere e la conclusione $y$ falsa, rende vera $y$;
3. controlla i divieti: se sono tutti soddisfatti risponde "soddisfacibile" con l'assegnazione trovata, altrimenti "insoddisfacibile".

Il ciclo termina perché ogni giro rende vera una variabile nuova e nessuna torna falsa: con $n$ variabili, al più $n$ giri.

Partire da tutto falso conviene perché una variabile falsa crea un problema solo quando un fatto o una regola la obbliga a essere vera, mentre ogni variabile vera in più può violare un divieto o far scattare altre regole.

La correttezza si regge su un invariante: ogni variabile resa vera è vera in ogni assegnazione che soddisfa $\varphi$. Si vede per induzione sui giri. La conclusione $y$ diventa vera solo quando le premesse sono già vere; per induzione le premesse sono vere in ogni assegnazione che soddisfa $\varphi$, e in quelle assegnazioni la regola obbliga anche $y$.

Se alla fine un divieto risulta violato, le sue variabili sono tutte vere in ogni assegnazione che soddisfa $\varphi$, quindi quel divieto sarebbe violato in ogni caso e $\varphi$ è insoddisfacibile. Se invece i divieti reggono, l'assegnazione soddisfa tutto: le regole perché il ciclo si è fermato, i divieti per il controllo finale.

## Un esempio

Prendi $\varphi = (x) \land (\neg x \lor y) \land (\neg x \lor \neg y \lor z) \land (\neg w \lor x) \land (\neg y \lor \neg w)$.

| giro | regola che scatta           | variabili vere |
| ---- | --------------------------- | -------------- |
| 0    | nessuna                     | nessuna        |
| 1    | $(x)$                       | $x$            |
| 2    | $x \Rightarrow y$           | $x, y$         |
| 3    | $(x \land y) \Rightarrow z$ | $x, y, z$      |

Dopo il terzo giro non scatta più niente: $w \Rightarrow x$ ha la premessa $w$ falsa. Il divieto $(\neg y \lor \neg w)$ è soddisfatto perché $w$ è falsa, quindi la risposta è "soddisfacibile", con $x$, $y$, $z$ vere e $w$ falsa.

Aggiungi il divieto $(\neg x \lor \neg z)$. Le regole scattano come prima, $x$ e $z$ finiscono vere e il divieto è violato: la formula è insoddisfacibile.

## Il conto

Così com'è, l'algoritmo fa al più $n$ giri e a ogni giro scorre la formula: tempo $O(n \cdot |\varphi|)$, già polinomiale. Per scendere a tempo lineare servono due strutture:

- per ogni regola, un contatore delle premesse ancora false;
- per ogni variabile, l'elenco delle regole in cui compare come premessa.

Quando una variabile diventa vera, l'algoritmo decrementa i contatori delle sole regole del suo elenco; una regola il cui contatore arriva a zero rende vera la sua conclusione, che entra in una coda. L'algoritmo tocca ogni letterale della formula un numero costante di volte, quindi il tempo totale è $O(|\varphi|)$.

## Dove si inciampa di solito

Davanti a un divieto violato viene da provare un'altra assegnazione, ma è inutile: per l'invariante le variabili del divieto sono vere in ogni assegnazione che soddisfa i fatti e le regole.

L'assegnazione trovata è la minima: le sue variabili vere lo sono anche in ogni altra assegnazione che soddisfa $\varphi$, e le altre possono averne di più.

Horn e 2-SAT sono restrizioni diverse di SAT, facili per motivi diversi. $(a \lor b)$ sta in 2-SAT ma non è di Horn; $(\neg a \lor \neg b \lor \neg c \lor d)$ è di Horn ma ha quattro letterali.
