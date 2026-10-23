# Proposizioni $\mathrm{P} \subseteq \mathrm{BPP}$ e $\mathrm{BPP} \subseteq \mathrm{PP}$

$$
\mathrm{P} \subseteq \mathrm{BPP} \subseteq \mathrm{PP}.
$$

Indichiamo con $a_N(x)$ la frazione dei rami equiprobabili di $N$ che accettano $x$.

## Da P a BPP: possiamo ignorare le scelte casuali

Sia $M$ un decisore per $L \in \mathrm{P}$ che termina entro $p(n)$ passi. Per standardizzarlo, a ogni passo introduciamo due scelte equivalenti, entrambe con lo stesso effetto della mossa di $M$. Se $M$ termina prima, conserviamo la risposta e proseguiamo con mosse fittizie, sempre binarie, fino a $p(n)$ passi. Otteniamo così una macchina $N$ con $2^{p(n)}$ rami equiprobabili, tutti della stessa durata e con lo stesso esito.

Quindi $a_N(x) = 1$ se $x \in L$ e $a_N(x) = 0$ altrimenti. L'errore è nullo e il tempo resta polinomiale, dunque $L \in \mathrm{BPP}$.

## Da BPP a PP: basta la stessa macchina

Per la macchina $N$ di un linguaggio $L \in \mathrm{BPP}$, se $x \in L$ vale $a_N(x) \ge 3/4 > 1/2$; altrimenti $a_N(x) \le 1/4 < 1/2$. Quindi, senza modifiche,

$$
x \in L \iff a_N(x) > \frac{1}{2}.
$$

La stessa macchina soddisfa la condizione di PP, dunque $L \in \mathrm{PP}$.

<details><summary>Esempio: perché la stessa macchina non basta nel verso opposto</summary>

Su un input in $L$, 9 rami accettanti su 16 superano la soglia di PP, ma non i 12 richiesti da BPP. Questo impedisce di dedurre l'inclusione inversa usando la stessa macchina.

</details>
