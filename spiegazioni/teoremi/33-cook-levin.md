# Teorema di Cook-Levin

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Che cosa bisogna dimostrare per dire che SAT è NP-completo?
2. Come si scrive l'implicazione $(A \land B) \Rightarrow C$ come una clausola, cioè come un "or" di letterali?

<details><summary>Risposte</summary>

1. Due cose: $\mathrm{SAT} \in \mathrm{NP}$, e ogni linguaggio di NP si riduce a SAT con una riduzione in spazio logaritmico.
2. $(\neg A \lor \neg B \lor C)$. L'implicazione è falsa solo quando $A$ e $B$ sono vere e $C$ è falsa, e la clausola è falsa esattamente in quel caso.

</details>

Se la seconda risposta non ti tornava, rifalla con la tabella di verità: tutta la costruzione è fatta di regole "se succede questo, allora quest'altro" scritte in questa forma.

## Il problema

$\mathrm{SAT} \in \mathrm{NP}$ è la parte facile: una macchina nondeterministica sceglie un valore per ogni variabile e controlla in tempo polinomiale che ogni clausola abbia un letterale vero.

La parte difficile è ridurre a SAT ogni $L \in \mathrm{NP}$. Di $L$ si sa solo che esiste una MdT nondeterministica $M$, a un nastro, che lo decide con budget di tempo polinomiale $p(n)$. La riduzione deve quindi partire dalla descrizione di $M$ e di $x$ e scrivere una formula $R(x)$ che sia soddisfacibile se e solo se $M$ ha una computazione che accetta $x$.

## L'idea: la computazione come tabella

Sia $T = p(n)$. Una computazione di $M$ su $x$ si scrive in una tabella: la riga $t$ è la configurazione al tempo $t$, la colonna $s$ è la cella $s$ del nastro. Bastano $T$ colonne perché la testina parte dalla cella 1 e a ogni passo si sposta di al più una cella, quindi nelle $T$ righe non va oltre la cella $T$. Si suppone che $M$, arrivata in "yes", ci resti fino al tempo $T$ (si aggiungono a $\Delta$ mosse che non cambiano nulla): così "accetta" vuol dire "è nello stato yes al tempo $T$", anche se $M$ accetta prima.

Le variabili descrivono le caselle:

- $P^i_{s,t}$: al tempo $t$ la cella $s$ contiene il simbolo $\sigma_i$;
- $Q^i_t$: al tempo $t$ lo stato è $q_i$;
- $S_{s,t}$: al tempo $t$ la testina è sulla cella $s$.

| gruppo | che cosa impone | una clausola del gruppo |
|---|---|---|
| esattamente uno | in ogni riga una sola posizione della testina, uno stato, un simbolo per cella | $(S_{1,t} \lor \dots \lor S_{T,t})$ e $(\neg S_{s,t} \lor \neg S_{s',t})$ |
| riga iniziale | la riga 1 è la configurazione iniziale su $x$ | $Q^1_1$, $S_{1,1}$, $P^{i_1}_{1,1}$ |
| celle lontane | una cella senza testina non cambia | $(S_{s,t} \lor \neg P^i_{s,t} \lor P^i_{s,t+1})$ |
| mosse lecite | ogni riga segue dalla precedente con una mossa di $\Delta$ | $(\neg Q^i_t \lor \neg S_{s,t} \lor \neg P^j_{s,t} \lor \neg Q^k_{t+1} \lor \neg P^m_{s,t+1} \lor \neg S_{s-1,t+1})$ |
| accettazione | lo stato finale è yes | $Q^{\text{yes}}_T$ |

La clausola delle celle lontane è l'implicazione $(\neg S_{s,t} \land P^i_{s,t}) \Rightarrow P^i_{s,t+1}$ scritta come nella seconda domanda di controllo.

Le mosse lecite si ottengono vietando quelle illecite. Per ogni combinazione $(q_i, \sigma_j, q_k, \sigma_m, \leftarrow)$ che non sta in $\Delta$, e per ogni $s$ e $t$, una clausola dice che non può succedere. Scrivere "almeno una delle mosse di $\Delta$" darebbe un "or" di "and", che non è in CNF; il "non" di un "and" invece è già una clausola. Lo stesso si fa per i movimenti $\rightarrow$ (con $S_{s+1,t+1}$) e $-$ (con $S_{s,t+1}$). Serve anche $(\neg S_{s,t} \lor S_{s-1,t+1} \lor S_{s,t+1} \lor S_{s+1,t+1})$: le clausole vietate guardano solo le celle $s-1$, $s$, $s+1$, e senza questa la testina potrebbe saltare di cinque celle senza violarne nessuna.

Il nondeterminismo passa all'assegnamento: la formula permette, a ogni passo, qualunque mossa di $\Delta$, e un assegnamento che la soddisfa sceglie un ramo.

## Un esempio

Prendi $x = ab$, quindi $n = 2$, e $T = 3$. In $\Delta$ ci sono $(q_1, a) \to (q_1, a, \rightarrow)$ e $(q_1, b) \to (\text{yes}, b, -)$. Il ramo che accetta riempie la tabella così (la testina è tra parentesi quadre):

```
t = 1   q1    [a]   b    ⊔
t = 2   q1     a   [b]   ⊔
t = 3   yes    a   [b]   ⊔
```

Scrivendo lo stato e il simbolo al posto dell'indice, l'assegnamento corrispondente rende vere $Q^{q_1}_1$, $S_{1,1}$, $P^a_{1,1}$, $P^b_{2,1}$, $P^{\sqcup}_{3,1}$ per la prima riga, e così via: 5 variabili vere per riga, 15 in tutto. Con 3 stati (q1, yes, no) e 3 simboli le variabili sono $27 + 9 + 9 = 45$.

La cella 3 al tempo 1 non ha la testina, e la clausola $(S_{3,1} \lor \neg P^{\sqcup}_{3,1} \lor P^{\sqcup}_{3,2})$ obbliga il blank a restare. Se $(q_1, a) \to (\text{yes}, a, -)$ non sta in $\Delta$, la clausola vietata corrispondente impedisce di saltare in yes al primo passo.

## I due versi e il conto

Se $x \in L$, si dà a ogni variabile il valore che descrive la computazione che accetta, prolungata fino a $T$ restando in yes: ogni clausola è vera per costruzione.

Se $R(x)$ è soddisfacibile, le clausole "esattamente uno" fanno di ogni riga una configurazione $C_t$; la riga iniziale dice che $C_1$ è quella di partenza su $x$; celle lontane e mosse lecite dicono che ogni $C_{t+1}$ segue da $C_t$ con una mossa di $\Delta$; l'ultima clausola dice che lo stato finale è yes. Quindi $C_1, \dots, C_T$ è una computazione che accetta $x$.

Le variabili sono $O(T^2)$. Le clausole sono $O(T^3)$: le più numerose sono quelle "non due posizioni", una per ogni coppia di celle a ogni tempo. Con $p(n) = n^2$ e $n = 10$ si ha $T = 100$ e un numero di clausole dell'ordine di $10^6$, grande ma polinomiale in $n$. La riduzione le stampa una alla volta con pochi contatori ($s$, $t$, indici di stati e simboli) che arrivano al più a $T = p(n)$, quindi ciascuno ha $O(\log p(n)) = O(\log n)$ bit.

## Dove si inciampa di solito

La riduzione non simula $M$ e non sa se $M$ accetta $x$: scrive la formula clausola dopo clausola, con gli stessi contatori qualunque sia la risposta.

Il teorema riduce ogni $L \in \mathrm{NP}$ a SAT. Una riduzione nel verso opposto, da SAT a un problema $B$, dimostra che $B$ è NP-hard e non aggiunge niente su SAT.
