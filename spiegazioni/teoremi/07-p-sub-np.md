# Proposizione $\mathrm{P} \subseteq \mathrm{NP}$

## Prima di leggere

Quando una MdT nondeterministica $N$ decide $L$ in tempo $f(n)$?

<details><summary>Risposta</summary>

Quando, per ogni input $x$, vale $x \in L$ se e solo se almeno una computazione di $N$ su $x$ arriva in "yes", e nessuna computazione dura più di $f(|x|)$ passi. Le mosse possibili sono date da una relazione $\Delta$: per una stessa coppia (stato, simbolo) possono essercene anche più di una.

</details>

## Perché è vero

Una MdT deterministica è una MdT nondeterministica in cui, in ogni situazione, c'è esattamente una mossa possibile.

Sia $L \in \mathrm{P}$, deciso da $M = (K, \Sigma, \delta, s)$ entro $n^k$ passi. Si costruisce $N = (K, \Sigma, \Delta, s)$ mettendo in $\Delta$, per ogni coppia (stato $q$, simbolo $\sigma$), solo la mossa $\delta(q, \sigma)$. Per esempio, se $\delta(q, 0) = (p, 1, \rightarrow)$, allora $\Delta$ contiene la coppia $((q, 0), (p, 1, \rightarrow))$ e nessun'altra mossa per $(q, 0)$. La definizione di MdT nondeterministica chiede solo che $\Delta$ sia una relazione, e una funzione è una relazione particolare: $N$ è una MdT nondeterministica.

Su ogni input $N$ ha una sola computazione, identica a quella di $M$. Allora:

- $N$ accetta $x$ se e solo se quella computazione arriva in "yes", cioè se e solo se $M(x) = \text{yes}$, cioè se e solo se $x \in L$;
- quella computazione dura quanto quella di $M$, al più $|x|^k$ passi.

Quindi $L \in \mathrm{NTIME}(n^k) \subseteq \mathrm{NP}$. Siccome $L$ era un problema qualsiasi di P, $\mathrm{P} \subseteq \mathrm{NP}$.

## Dove si inciampa di solito

Il simbolo è $\subseteq$. Se l'inclusione sia stretta è proprio la domanda aperta $\mathrm{P} = \mathrm{NP}$.

Il viceversa non si dimostra con lo stesso trucco. Togliere a $N$ le mosse in più, per renderla deterministica, cambia il linguaggio che decide: una computazione accettante potrebbe usare proprio una delle mosse tolte.
