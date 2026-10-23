# Teorema di Cook-Levin

## Che cosa afferma

Il teorema afferma che **SAT è NP-completo**. Dobbiamo quindi dimostrare che SAT appartiene a NP e che ogni linguaggio $L \in \mathrm{NP}$ si riduce a SAT.

Il primo punto è semplice: un'assegnazione delle variabili è un certificato di lunghezza polinomiale e possiamo controllare in tempo polinomiale che renda vera la formula.

Per il secondo punto, prendiamo una macchina nondeterministica $M$ a un nastro che decide $L$ in tempo polinomiale. Dato $x$, vogliamo costruire una formula $R(x)$ tale che

$$
x \in L \iff R(x) \text{ è soddisfacibile}.
$$

## L'idea: descrivere una computazione con una tabella

Una computazione di $M$ è una sequenza di configurazioni. Scriviamola come una tabella: ogni riga descrive il nastro, lo stato e la posizione della testina in un certo istante. La riga successiva descrive ciò che succede dopo una mossa.

Se $M$ lavora entro $T = p(|x|)$ passi, bastano $T+1$ righe e un numero polinomiale di colonne, perché la testina visita al più una nuova cella a ogni passo. Possiamo scegliere $p(n) \ge n$, così anche le celle dell'input rientrano in $O(T)$ colonne. Se la macchina accetta prima del tempo $T$, la facciamo restare nello stato "yes" senza cambiare il nastro fino all'ultima riga.

## Dalla tabella alla formula

Introduciamo variabili booleane per descrivere le caselle: $P^i_{s,t}$ significa «al tempo $t$ la cella $s$ contiene il simbolo $\sigma_i$», $Q^i_t$ significa «lo stato è $q_i$» e $S_{s,t}$ significa «la testina è sulla cella $s$».

Prendiamo $x = 01$ e una macchina che scorre l'input verso destra e accetta appena legge un 1. Con $T = 3$ la tabella è questa, con in grassetto la cella sotto la testina:

| $t$ | cella 0              | cella 1 | cella 2 | cella 3  | stato |
| --- | -------------------- | ------- | ------- | -------- | ----- |
| 0   | **$\triangleright$** | 0       | 1       | $\sqcup$ | $q_0$ |
| 1   | $\triangleright$     | **0**   | 1       | $\sqcup$ | $q_0$ |
| 2   | $\triangleright$     | 0       | **1**   | $\sqcup$ | $q_0$ |
| 3   | $\triangleright$     | 0       | **1**   | $\sqcup$ | "yes" |

Alla riga $t = 1$ sono vere $S_{1,1}$, $Q^0_1$ e, per ogni cella $s$, la $P^i_{s,1}$ del simbolo che contiene, come $P^i_{1,1}$ con $\sigma_i = 0$. Tutte le altre variabili della riga sono false. Ogni tabella corrisponde così a un'assegnazione delle variabili.

Un primo gruppo di clausole impone che ogni riga descriva una configurazione: esattamente un simbolo per cella, uno stato e una posizione della testina. Imporre "esattamente uno" significa chiedere che almeno una delle variabili corrispondenti sia vera e vietare che due siano vere insieme.

Altre clausole fissano la prima riga alla configurazione iniziale su $x$ e impongono lo stato "yes" nell'ultima. Restano da collegare le righe: le celle non visitate dalla testina devono mantenere il loro simbolo, mentre lo stato, la cella visitata e la posizione della testina devono cambiare secondo una mossa consentita da $M$. Imponiamo anche che la testina si sposti al più di una cella, senza uscire dal nastro rappresentato.

Queste condizioni si scrivono in CNF vietando le combinazioni non ammesse. Per esempio, vietare che siano vere insieme $A$, $B$ e $C$ significa aggiungere la clausola $(\neg A \lor \neg B \lor \neg C)$. Con lo stesso principio escludiamo ogni combinazione di stato, simbolo letto, nuovo stato, simbolo scritto e movimento che non corrisponde a una transizione di $M$.

<details><summary>Esempio: una cella senza testina non cambia</summary>

Se al tempo $t$ la testina non è sulla cella $s$ e quella cella contiene $\sigma_i$, al tempo successivo deve contenere ancora $\sigma_i$. In simboli:

$$
(\neg S_{s,t} \land P^i_{s,t}) \Rightarrow P^i_{s,t+1}.
$$

L'implicazione equivale alla clausola

$$
S_{s,t} \lor \neg P^i_{s,t} \lor P^i_{s,t+1}.
$$

Se la testina non è lì e il simbolo è $\sigma_i$, i primi due letterali sono falsi: per rendere vera la clausola deve essere vero il terzo. La formula obbliga così la cella a mantenere il simbolo, senza dover eseguire la macchina.

</details>

## Perché valgono entrambi i versi

Se $x \in L$, esiste un ramo di $M$ che accetta. Riempiamo la tabella con le sue configurazioni e assegniamo alle variabili i valori corrispondenti. Tutte le clausole sono soddisfatte: la computazione parte da $x$, segue mosse lecite e termina in "yes". Quindi $R(x)$ è soddisfacibile.

Viceversa, se $R(x)$ è soddisfacibile, un'assegnazione che la soddisfa descrive una tabella. Le clausole garantiscono che le righe siano configurazioni, che la prima sia quella iniziale su $x$, che ogni passaggio sia lecito e che l'ultima sia accettante. Leggendo le righe otteniamo dunque un ramo di $M$ che accetta $x$, quindi $x \in L$.

Il nondeterminismo è rappresentato dalle possibili assegnazioni: quando $M$ può scegliere fra più mosse, la formula permette tutte quelle lecite. Basta che una scelta porti all'accettazione perché la formula sia soddisfacibile.

## Perché la riduzione richiede solo spazio logaritmico

La tabella ha $O(T^2)$ caselle. Stati e simboli sono in numero costante, perché $M$ è fissata, e anche il numero totale di clausole è polinomiale: con questa codifica è $O(T^3)$.

Per stamparle non serve conservare tutta la tabella: basta scorrere tempi, celle, stati e simboli con un numero fisso di contatori. Ciascuno arriva al più a un polinomio in $|x|$ e occupa quindi $O(\log |x|)$ bit. La formula si stampa una clausola alla volta in spazio logaritmico. Abbiamo così ridotto ogni $L \in \mathrm{NP}$ a SAT e dimostrato la NP-completezza.
