# Teorema di Cook-Levin — SAT è NP-completo

## Dimostrazione

**1\. Dimostriamo che $SAT\in NP$:** Data una formula booleana $\varphi$, possiamo scegliere nondeterministicamente un'assegnazione di verità alle variabili e verificare in tempo polinomiale se soddisfa la formula. Quindi $SAT\in NP$.

**2\. Dimostriamo che SAT è NP-hard:** Sia $L\in NP$. Esiste una macchina nondeterministica $N$ che decide $L$ in tempo polinomiale $p(n)$, dove $n=|x|$.

Vogliamo costruire una formula booleana $\varphi_x$, in tempo polinomiale, tale che:

$$
\boxed{x\in L\iff\varphi_x\in SAT}
$$

**3\. Rappresentiamo la computazione:** Poiché $N$ esegue al più $p(n)$ passi, possiamo rappresentare una sua computazione mediante una tabella di dimensione polinomiale.

Ogni riga rappresenta una configurazione della macchina, mentre ogni colonna rappresenta una cella del nastro.

Introduciamo variabili booleane:

$$
X_{t,i,s}
$$

dove $X_{t,i,s}=1$ significa che, all'istante $t$, la posizione $i$ contiene il simbolo $s$.

Utilizziamo un alfabeto esteso che include anche lo stato e la posizione della testina, così da rappresentare l'intera configurazione in ogni riga.

**4\. Costruiamo la formula booleana:** Definiamo:

$$
\varphi_x= \varphi_{\text{cella}} \land\varphi_{\text{inizio}} \land\varphi_{\text{accetta}} \land\varphi_{\text{passo}}
$$

I quattro vincoli garantiscono che:

- Cella: ogni posizione della tabella contiene esattamente un simbolo.
- Inizio: la prima riga rappresenta la configurazione iniziale di $N$ su $x$.
- Accetta: la tabella contiene una configurazione accettante.
- Passo: ogni riga successiva rappresenta una transizione valida della macchina. La validità può essere espressa mediante vincoli locali su un numero costante di celle adiacenti.

Poiché la tabella ha dimensione polinomiale e ogni vincolo è esprimibile mediante formule di dimensione polinomiale, anche $\varphi_x$ ha dimensione polinomiale ed è costruibile in tempo polinomiale.

**5\. Dimostriamo la correttezza:** Se $x\in L$, esiste una computazione accettante di $N$. Possiamo quindi assegnare alle variabili i valori corrispondenti alla tabella di tale computazione, soddisfacendo tutti i vincoli: $x\in L\Rightarrow\varphi_x\in SAT$.

Viceversa, se $\varphi_x$ è soddisfacibile, esiste una tabella che rispetta tutti i vincoli e descrive una computazione accettante di $N$ su $x$: $\varphi_x\in SAT\Rightarrow x\in L$.

Pertanto:

$$
\boxed{x\in L\iff\varphi_x\in SAT}
$$
