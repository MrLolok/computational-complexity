# Proposizione (oracoli NP-completi equivalenti)

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Che cosa fa una macchina con oracolo $A$ quando lo interroga, e quanto le costa?
2. Se $L$ è NP-completo, quali riduzioni esistono tra $L$ e SAT?

<details><summary>Risposte</summary>

1. Scrive una stringa $w$ sul nastro di query ed entra nello stato di domanda. Al passo successivo si trova in $q_{\mathrm{YES}}$ se $w \in A$ e in $q_{\mathrm{NO}}$ altrimenti. La risposta costa un passo; scrivere $w$ costa un passo per simbolo.
2. Le riduzioni vanno in tutte e due le direzioni. $L$ sta in NP e SAT è NP-completo, quindi c'è una riduzione $R$ da $L$ a SAT. SAT sta in NP e $L$ è NP-completo, quindi c'è una riduzione $R'$ da SAT a $L$. Entrambe si calcolano in tempo polinomiale.

</details>

Se la seconda risposta non ti tornava, ripassa la definizione di NP-completo: la proposizione usa entrambe le metà, "sta in NP" e "ogni problema di NP si riduce a lui".

## Che cosa dice

Una macchina polinomiale con oracolo CLIQUE e una con oracolo SAT hanno davanti scatole nere diverse. La proposizione dice che decidono gli stessi linguaggi: $\mathrm{P}^L = \mathrm{P}^{\mathrm{SAT}}$ per ogni $L$ NP-completo. Per questo si scrive $\mathrm{P}^{\mathrm{NP}}$ senza dire quale oracolo NP-completo si usa.

## L'idea: tradurre ogni domanda

Sia $M^L$ una macchina deterministica con oracolo $L$ e budget di tempo $p(n)$. La nuova macchina $M'$ ha oracolo SAT e copia $M$ passo per passo. Quando $M$ sta per chiedere "$w \in L$?", $M'$ calcola $R(w)$, lo scrive sul nastro di query e chiede a SAT. La risposta coincide, perché $w \in L \iff R(w) \in \mathrm{SAT}$. Da lì in poi le due macchine fanno le stesse mosse e accettano gli stessi input.

Il verso opposto, $\mathrm{P}^{\mathrm{SAT}} \subseteq \mathrm{P}^L$, è lo stesso argomento con $R'$ al posto di $R$.

## Il conto

Sia $q(m)$ il budget di tempo di $R$ su una stringa lunga $m$.

- In $p(n)$ passi $M$ fa al più $p(n)$ domande, perché ogni domanda costa almeno un passo.
- Ogni domanda è lunga al più $p(n)$, perché una macchina non può scrivere più simboli dei passi che fa.
- Tradurre una domanda costa al più $q(p(n))$ passi. L'argomento di $q$ è $p(n)$ e non $n$: $R$ lavora sulla domanda, che può essere più lunga dell'input.

In totale $M'$ fa al più $p(n) + p(n) \cdot q(p(n))$ passi. Con $p(n) = n^2$ e $q(m) = m^3$ viene $n^2 + n^2 \cdot n^6 = n^8 + n^2$: l'esponente cresce, ma resta un polinomio, perché prodotti e composizioni di polinomi sono polinomi.

Lo stesso ragionamento vale per $\mathrm{NP}^L$, $\mathrm{EXP}^L$ e ogni classe il cui budget assorbe il costo delle riduzioni.

## Dove si inciampa di solito

Serve che $L$ sia NP-completo, non solo che stia in NP. Se $L$ sta in P, $\mathrm{P}^L = \mathrm{P}$, perché la macchina può calcolare da sé le risposte. Se $L$ sta solo in NP, la riduzione $R$ dà $\mathrm{P}^L \subseteq \mathrm{P}^{\mathrm{SAT}}$, ma per il verso opposto manca $R'$.
