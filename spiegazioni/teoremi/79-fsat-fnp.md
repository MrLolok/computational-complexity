# FSAT è FNP-completo

## Prima di leggere

1. Quando un function problem sta in FNP?
2. Che cosa costruisce la prova di Cook-Levin?

<details><summary>Risposte</summary>

1. Quando è associato a un $L \in \mathrm{NP}$ tramite una relazione $R_L$ di coppie istanza-certificato, polinomialmente bilanciata (i certificati sono lunghi al più un polinomio dell'istanza) e decidibile in tempo polinomiale. Il problema $F_L$ chiede, dato $x$, un $y$ con $(x, y) \in R_L$, oppure la risposta "no" se non ce ne sono.
2. Data una macchina che lavora in tempo polinomiale e un input, scrive una formula che descrive la tabella della computazione: una variabile per ogni coppia (cella della tabella, simbolo). La formula è soddisfacibile se e solo se la macchina accetta.

</details>

## Riduzioni fra function problems

Per i problemi di decisione una riduzione trasforma l'istanza e basta. Per i function problems serve anche il ritorno, perché una soluzione del problema di arrivo è fatta in un altro modo: una soluzione di FSAT è un'assegnazione, una soluzione di un problema su grafi è magari un cammino. Una riduzione da $A$ a $B$ è quindi una coppia $(R, S)$ di funzioni calcolabili in spazio logaritmico:

- $R$ manda un'istanza $x$ di $A$ in un'istanza $R(x)$ di $B$;
- se $z$ è una soluzione di $R(x)$, allora $S(z)$ è una soluzione di $x$;
- $R(x)$ non ha soluzioni se e solo se $x$ non ne ha, così anche il "no" si trasferisce.

La prova, qui per sommi capi, ha due parti: FSAT sta in FNP, e ogni problema di FNP si riduce a FSAT con una coppia $(R, S)$.

## FSAT sta in FNP

La relazione contiene le coppie $(\varphi, T)$ in cui $T$ è un'assegnazione che rende vera $\varphi$. È bilanciata, perché $T$ ha un bit per variabile e le variabili non sono più dei simboli di $\varphi$. Si decide in tempo polinomiale valutando $\varphi$ con i valori di $T$.

## Ogni problema di FNP si riduce a FSAT

Sia $F_L \in \mathrm{FNP}$, con certificati lunghi al più $p(|x|)$ e una macchina deterministica $M$ che decide $R_L$ in tempo polinomiale.

Data $x$, la funzione $R$ scrive la formula $\varphi_x$ di Cook-Levin per la computazione di $M$ sull'input $(x, y)$, con i simboli di $x$ fissati e quelli di $y$ lasciati come variabili libere $y_1, \dots, y_{p(|x|)}$. $\varphi_x$ è soddisfacibile se e solo se esiste un $y$ che $M$ accetta, cioè se $x$ ha una soluzione; quindi anche il "no" coincide. Come in Cook-Levin, la tabella è regolare e $\varphi_x$ si scrive in spazio logaritmico.

Un'assegnazione $T$ che soddisfa $\varphi_x$ descrive una computazione accettante di $M$ su $(x, y)$ per un certo $y$. $S$ legge in $T$ i valori di $y_1, \dots, y_{p(|x|)}$ e li scrive in uscita; basta un contatore, quindi spazio logaritmico. Siccome $M$ accetta, $(x, S(T)) \in R_L$.

|           | $F_L$                                  | FSAT                         |
| --------- | -------------------------------------- | ---------------------------- |
| istanza   | $x$                                    | $\varphi_x = R(x)$           |
| soluzione | $y$ con $(x, y) \in R_L$               | $T$ che soddisfa $\varphi_x$ |
| ritorno   | $S(T)$: i valori di $y_1, \dots, y_{p( | x                            | )}$ in $T$ |     |

Per esempio, se $F_L$ chiede un cammino hamiltoniano, $M$ è il verificatore che controlla una sequenza di nodi, $y$ è quella sequenza scritta in bit, e $S$ la ritrova leggendo in $T$ i valori delle variabili di $y$.

## Dove si inciampa di solito

La NP-completezza di SAT da sola non basta: dice che $x$ ha soluzione se e solo se $\varphi_x$ è soddisfacibile, ma non come passare da una soluzione all'altra. La costruzione di Cook-Levin dà anche questo, perché il certificato è scritto dentro l'assegnazione, nelle variabili $y_i$.

$T$ contiene molto più di $y$, perché descrive tutta la tabella della computazione. $S$ tiene solo la parte che serve e scarta il resto.

La $M$ di questa prova viene confusa con la macchina nondeterministica della prova di Cook-Levin. Qui $M$ è deterministica e verifica un certificato dato; il ruolo del nondeterminismo lo prendono le variabili libere $y_i$.
