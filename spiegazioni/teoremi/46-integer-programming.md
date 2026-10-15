# INTEGER PROGRAMMING è NP-completo

## Prima di leggere

1. Il sistema $2x \le 1$, $2x \ge 1$ ha soluzione? E soluzione intera?
2. Che cosa chiede SET COVERING?

<details><summary>Risposte</summary>

1. Ha la soluzione $x = 1/2$, ma nessuna soluzione intera. Il vincolo di interi può cambiare la risposta.
2. Dati una famiglia di sottoinsiemi $S_1, \dots, S_n$ di un universo $U$ e un budget $B$, chiede se esistono al più $B$ insiemi della famiglia la cui unione è $U$.

</details>

## Il problema

Un'istanza di INTEGER PROGRAMMING è un sistema di disuguaglianze lineari a coefficienti interi, e la domanda è se ha una soluzione intera. Senza il vincolo di interi il problema è LINEAR PROGRAMMING, che sta in P: lo si risolve con l'algoritmo dell'ellissoide, e qui il risultato si prende per buono. Con il vincolo di interi il problema è NP-completo.

Al contrario del solito, la difficoltà si dimostra quasi subito, mentre la parte delicata è l'appartenenza a NP, di cui qui si vede solo lo schema.

## La difficoltà: SET COVERING come sistema

Per ogni insieme $S_i$ si usa una variabile $x_i$ con $0 \le x_i \le 1$. Sugli interi $x_i$ può valere solo 0 o 1: 1 se $S_i$ è scelto, 0 altrimenti. Poi si scrive:

- per ogni elemento $u$ di $U$, la somma delle $x_i$ con $u \in S_i$ è almeno 1 ($u$ è coperto);
- $x_1 + \dots + x_n \le B$ (al più $B$ insiemi).

Le soluzioni intere sono esattamente i vettori di 0 e 1 che indicano al più $B$ insiemi con unione $U$. Il sistema ha una soluzione intera se e solo se l'istanza di SET COVERING ha risposta sì, e si scrive in spazio logaritmico.

Con $U = \{1, 2, 3, 4\}$, $S_1 = \{1, 2\}$, $S_2 = \{2, 3\}$, $S_3 = \{3, 4\}$ e $B = 2$ il sistema è

$$x_1 \ge 1, \quad x_1 + x_2 \ge 1, \quad x_2 + x_3 \ge 1, \quad x_3 \ge 1, \quad x_1 + x_2 + x_3 \le 2,$$

più $0 \le x_i \le 1$. La soluzione $x_1 = 1$, $x_2 = 0$, $x_3 = 1$ corrisponde alla scelta di $S_1$ e $S_3$. Con $B = 1$ il sistema non ha soluzioni intere: la prima e la quarta disuguaglianza chiedono già $x_1 + x_3 \ge 2$.

Lo stesso trucco traduce 3SAT: la clausola $x \lor \neg y \lor z$ diventa $x + (1 - y) + z \ge 1$.

## L'appartenenza a NP

L'idea naturale è indovinare una soluzione intera e controllarla. Il controllo è facile, perché basta sostituire i valori e fare i conti; il problema è la lunghezza del certificato. Le variabili non sono limitate a 0 e 1, e un sistema piccolo può obbligare a valori enormi:

$$x_1 \ge 1, \quad x_2 \ge 2x_1, \quad x_3 \ge 2x_2, \quad \dots, \quad x_n \ge 2x_{n-1}$$

obbliga $x_n \ge 2^{n-1}$. A priori potrebbero esistere sistemi le cui soluzioni intere hanno tutte più cifre di quante ne possa avere un certificato polinomiale.

Il risultato che serve esclude questo caso. Se un sistema a coefficienti interi ha una soluzione intera, ne ha anche una con componenti al più esponenziali nella dimensione dell'istanza. Il motivo, in breve, è che si può partire dai vertici della regione descritta dal sistema: per la regola di Cramer sono rapporti di determinanti, e hanno un numero polinomiale di cifre.

"Al più esponenziali" sembra troppo, ma si riferisce al valore: un numero minore di $2^p$ si scrive in binario con $p$ cifre, e nell'esempio sopra $x_n = 2^{n-1}$ ha $n$ cifre binarie. Il certificato è quella soluzione piccola, che ha un numero polinomiale di bit e si verifica in tempo polinomiale. Quindi $\mathrm{INTEGER\ PROGRAMMING} \in \mathrm{NP}$.

## Dove si inciampa di solito

Viene da pensare che l'appartenenza a NP sia ovvia. Per SAT o CLIQUE il certificato è corto per costruzione; qui la lunghezza della soluzione va dimostrata, ed è la parte difficile.

Risolvere LINEAR PROGRAMMING e arrotondare non basta, perché la soluzione frazionaria può non corrispondere a nessuna scelta. Con $U = \{1, 2, 3\}$ e gli insiemi $\{1, 2\}$, $\{2, 3\}$, $\{1, 3\}$, i valori $x_i = 1/2$ coprono ogni elemento con somma $3/2$, mentre con gli interi servono due insiemi. Arrotondando a 0 non si copre niente, arrotondando a 1 si prendono tre insiemi.
