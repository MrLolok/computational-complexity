# Proposizioni $\mathrm{P} \subseteq \mathrm{BPP}$ e $\mathrm{BPP} \subseteq \mathrm{PP}$

## Che cosa affermano

Le due proposizioni affermano che

$$
\mathrm{P} \subseteq \mathrm{BPP} \subseteq \mathrm{PP}.
$$

P contiene i linguaggi decidibili in tempo deterministico polinomiale. BPP e PP usano macchine polinomiali standardizzate, con tutti i rami di computazione equiprobabili. Chiamiamo $a_N(x)$ la frazione dei rami della macchina $N$ che accettano l'input $x$.

BPP richiede una risposta corretta con probabilità almeno $3/4$: se $x \in L$, allora $a_N(x) \ge 3/4$; se $x \notin L$, allora $a_N(x) \le 1/4$. PP chiede soltanto che **più della metà dei rami accetti esattamente quando $x \in L$**.

## Da P a BPP: possiamo ignorare le scelte casuali

Prendiamo un linguaggio $L \in \mathrm{P}$ e un algoritmo deterministico polinomiale $M$ che lo decide. Per ottenere una macchina standardizzata $N$ possiamo aggiungere lo stesso numero polinomiale di scelte binarie su ogni ramo e ignorarne l'esito: ogni ramo esegue lo stesso algoritmo $M$.

Se $x \in L$, tutti i rami accettano, quindi $a_N(x) = 1 \ge 3/4$. Se $x \notin L$, tutti rifiutano, quindi $a_N(x) = 0 \le 1/4$. La risposta è sempre corretta e rispetta quindi anche il margine di errore ammesso da BPP. Le scelte aggiunte costano tempo polinomiale: dunque $L \in \mathrm{BPP}$.

## Da BPP a PP: tre quarti sono già una maggioranza

Prendiamo ora un linguaggio $L \in \mathrm{BPP}$ e la sua macchina $N$. Possiamo usare la stessa macchina per PP, senza modificare i rami o il tempo di esecuzione.

Se $x \in L$, almeno $3/4$ dei rami accettano e $3/4 > 1/2$: la maggioranza richiesta da PP c'è. Se $x \notin L$, accetta al più $1/4$ dei rami e $1/4 < 1/2$: la maggioranza non c'è. Quindi

$$
x \in L \iff a_N(x) > \frac{1}{2},
$$

che è proprio la condizione di PP. Abbiamo così dimostrato $\mathrm{BPP} \subseteq \mathrm{PP}$.

<details><summary>Esempio: contiamo i rami che accettano</summary>

Immaginiamo una macchina di BPP con quattro rami equiprobabili. Su un input che appartiene a $L$, devono accettare almeno tre rami: sono anche più della metà, come richiede PP. Su un input che non appartiene a $L$, può accettare al massimo un ramo: la maggioranza manca.

Il ragionamento non funziona al contrario: una macchina con 16 rami, di cui 9 accettanti, supera la metà e soddisfa la soglia di PP per un input in $L$, ma non raggiunge i 12 rami richiesti dalla soglia di BPP. Perciò usare la stessa macchina non dimostra l'inclusione inversa.

</details>
