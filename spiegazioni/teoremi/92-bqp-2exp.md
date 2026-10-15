# Teorema $\mathrm{BQP} \subsetneq 2\text{-}\mathrm{EXP}$

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Che cos'è 2-EXP?
2. Che cosa dice il teorema di gerarchia del tempo?

<details><summary>Risposte</summary>

1. La classe dei problemi decisi in tempo doppiamente esponenziale: $2\text{-}\mathrm{EXP} = \bigcup_{k \gt 0} \mathrm{TIME}(2^{2^{n^k}})$.
2. Per ogni funzione propria $f(n) \ge n$ vale $\mathrm{TIME}(f(n)) \subsetneq \mathrm{TIME}(f(2n+1)^3)$: con un budget di tempo abbastanza più grande si decidono problemi nuovi.

</details>

Se la seconda risposta non ti tornava, ripassa il teorema di gerarchia del tempo: è l'unico ingrediente nuovo.

## Che cosa dice

Esiste un problema in 2-EXP che nessun algoritmo quantistico con errore limitato risolve in tempo polinomiale. Il risultato è dimostrato, e la prova non usa nessuna proprietà del calcolo quantistico: mette in fila inclusioni già note e una separazione.

$$\mathrm{BQP} \subseteq \mathrm{PP} \subseteq \mathrm{PSPACE} \subseteq \mathrm{EXP} \subsetneq 2\text{-}\mathrm{EXP}.$$

## Le inclusioni una per una

$\mathrm{BQP} \subseteq \mathrm{PP} \subseteq \mathrm{PSPACE}$ viene dai teoremi $\mathrm{BPP} \subseteq \mathrm{BQP} \subseteq \mathrm{PP}$ e $\mathrm{PP} \subseteq \mathrm{PSPACE}$: un algoritmo quantistico con errore limitato si simula in spazio polinomiale.

$\mathrm{PSPACE} \subseteq \mathrm{EXP}$. Una macchina con spazio $n^k$ ha al più $c^{n^k}$ configurazioni diverse. Se si ferma, lo fa entro quel numero di passi, perché una macchina deterministica che ripassa per la stessa configurazione rifà gli stessi passi e gira per sempre. Il tempo è quindi al più esponenziale.

$\mathrm{EXP} \subsetneq 2\text{-}\mathrm{EXP}$. Ogni problema di EXP sta in $\mathrm{TIME}(2^{n^k})$ per qualche $k$, e $n^k \le 2^n$ da un certo $n$ in poi: per $k = 3$ succede da $n = 10$, dove $10^3 = 1000 \le 2^{10} = 1024$. Quindi $\mathrm{EXP} \subseteq \mathrm{TIME}(2^{2^n})$. La gerarchia del tempo con $f(n) = 2^{2^n}$ dà

$$\mathrm{TIME}(2^{2^n}) \subsetneq \mathrm{TIME}(f(2n+1)^3), \qquad f(2n+1)^3 = 2^{3 \cdot 2^{2n+1}},$$

e $2^{3 \cdot 2^{2n+1}}$ è ancora doppiamente esponenziale, quindi sta in 2-EXP. C'è dunque un problema di 2-EXP che non sta in $\mathrm{TIME}(2^{2^n})$, e nemmeno in EXP.

## La conclusione

Se fosse $\mathrm{BQP} = 2\text{-}\mathrm{EXP}$, la catena darebbe $2\text{-}\mathrm{EXP} \subseteq \mathrm{EXP}$, contro la separazione. Quindi $\mathrm{BQP} \subsetneq 2\text{-}\mathrm{EXP}$.

Ne segue che un problema 2-EXP-completo non sta in BQP. Se ci stesse, ogni problema di 2-EXP si ridurrebbe a lui in tempo polinomiale; componendo la riduzione con l'algoritmo quantistico, tutto 2-EXP starebbe in BQP, che è impossibile.

## Dove si inciampa di solito

Questo risultato viene confuso con la domanda su NP. Che i problemi NP-completi non stiano in BQP è solo una congettura; qui si parla di problemi molto più difficili, fuori da EXP.

La catena ha una sola inclusione stretta dimostrata, l'ultima, $\mathrm{EXP} \subsetneq 2\text{-}\mathrm{EXP}$. Se BQP sia diverso da PSPACE o da EXP non si sa.
