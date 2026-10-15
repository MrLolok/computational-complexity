# Teorema 11.3 ($\mathrm{NP} \subseteq \mathrm{PP}$)

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Che cos'è una MdT nondeterministica standardizzata, e quanti run ha?
2. Quando una macchina accetta $x$ a maggioranza? E se esattamente metà dei run dice "yes"?

<details><summary>Risposte</summary>

1. È una macchina in cui ogni run fa esattamente $p(n)$ scelte binarie, con $p$ polinomio. I run sono quindi esattamente $2^{p(n)}$, e contarli equivale a misurare probabilità: facendo le scelte a caso, ogni run ha probabilità $2^{-p(n)}$.
2. Quando più della metà dei run termina con "yes". Esattamente metà non è maggioranza.

</details>

Se la seconda risposta non ti tornava, rileggila: il caso "esattamente metà" è quello in cui la nuova macchina rifiuta.

## Il problema

In NP basta un run accettante: $x \in L$ sse almeno uno dei $2^{p(n)}$ run dice "yes", e quel run può essere uno solo, una frazione minuscola del totale. In PP serve più della metà dei run. Bisogna trasformare "almeno uno" in "più della metà".

## L'idea: un blocco di "yes" che riempie esattamente metà

Sia $L \in \mathrm{NP}$, decisa da $N$ standardizzata in tempo $p(n)$. La nuova macchina $N'$ comincia con una scelta tra due rami:

- (a) esegue $N$;
- (b) fa $p(n)$ scelte binarie a vuoto e termina sempre con "yes".

Ciascun ramo produce $2^{p(n)}$ run, quindi $N'$ ne ha $2^{p(n)+1}$, e la maggioranza vuol dire più di $2^{p(n)}$ "yes", cioè almeno $2^{p(n)} + 1$. Il ramo (b) ne fornisce esattamente $2^{p(n)}$, la metà. La maggioranza c'è quindi sse il ramo (a) aggiunge almeno un "yes", cioè sse almeno un run di $N$ accetta, cioè sse $x \in L$.

$N'$ fa una scelta in più di $N$ e lavora in tempo $p(n) + 1$, polinomiale. Allora $L \in \mathrm{PP}$, e siccome $L$ era un problema qualsiasi di NP, $\mathrm{NP} \subseteq \mathrm{PP}$.

## Un esempio con $p(n) = 3$

$N$ ha 8 run, $N'$ ne ha 16, e il ramo (b) contribuisce 8 "yes".

| caso | "yes" dal ramo (a) | "yes" totali su 16 | maggioranza? |
|---|---|---|---|
| $x \notin L$ | 0 | 8 | no, è esattamente metà |
| $x \in L$, un run accettante | 1 | 9 | sì |
| $x \in L$, tre run accettanti | 3 | 11 | sì |

## Dove si inciampa di solito

Perché il blocco debba essere esattamente metà non è ovvio. Con più della metà $N'$ accetterebbe sempre, anche quando $x \notin L$; con meno, un solo run accettante di $N$ potrebbe non bastare a superare la soglia.

C'è chi pensa che questa macchina permetta di risolvere SAT lanciando monete. Con un solo run accettante la probabilità di "yes" è $9/16$ nell'esempio, e in generale $1/2 + 1/2^{p(n)+1}$: supera $1/2$ di una quantità esponenzialmente piccola, che nessun numero ragionevole di prove riesce a distinguere da $1/2$. PP contiene NP proprio perché accetta maggioranze così sottili.

Il contrario non segue. Che PP sia contenuto in NP non è dimostrato, e si pensa che non valga.
