# Teorema $\mathrm{FP} = \mathrm{FNP} \iff \mathrm{P} = \mathrm{NP}$

## Prima di leggere

1. Che cosa sono FP e FNP, e perché $\mathrm{FP} \subseteq \mathrm{FNP}$?
2. Che cosa dicono le due proposizioni su FSAT?

<details><summary>Risposte</summary>

1. FNP contiene i function problems associati a un $L \in \mathrm{NP}$: dato $x$, trovare un certificato $y$ oppure rispondere "no". FP contiene quelli che si risolvono in tempo polinomiale deterministico. Un problema di FP è un problema di FNP che si sa anche risolvere velocemente, quindi $\mathrm{FP} \subseteq \mathrm{FNP}$ vale sempre.
2. FSAT è FNP-completo, rispetto a riduzioni $(R, S)$ calcolabili in spazio logaritmico. E FSAT si risolve in tempo polinomiale se e solo se SAT si risolve in tempo polinomiale.

</details>

Se la seconda risposta non ti tornava, rileggi quelle due proposizioni: questo teorema le mette insieme.

## L'idea: FSAT fa da ponte

```
FP = FNP  ⇒  FSAT ∈ FP  ⇒  SAT ∈ P  ⇒  P = NP
P = NP    ⇒  SAT ∈ P    ⇒  FSAT ∈ FP  ⇒  FNP ⊆ FP
```

Nella prima riga si parte da FSAT, che sta in FNP e quindi, per ipotesi, in FP. Per la proposizione su FSAT e SAT, allora SAT sta in P: basta ignorare l'assegnazione trovata e rispondere "sì". SAT è NP-completo, quindi ogni $L \in \mathrm{NP}$ si riduce a SAT; la riduzione è in spazio logaritmico e quindi in tempo polinomiale, e componendola con l'algoritmo per SAT si decide $L$ in tempo polinomiale. Allora $\mathrm{P} = \mathrm{NP}$.

Nella seconda riga si parte da $\mathrm{P} = \mathrm{NP}$: SAT sta in P e, per la stessa proposizione, FSAT si risolve in tempo polinomiale. Sia $F_L$ un problema qualsiasi di FNP. Siccome FSAT è FNP-completo, c'è una riduzione $(R, S)$ da $F_L$ a FSAT. L'algoritmo per $F_L$ calcola $R(x)$ e risolve FSAT su $R(x)$: se la risposta è "no" risponde "no", se è un'assegnazione $T$ restituisce $S(T)$. I tre passi sono polinomiali: $R(x)$ e $T$ hanno lunghezza polinomiale in $|x|$, e $R$ e $S$ lavorano in spazio logaritmico, quindi in tempo polinomiale. Allora $F_L \in \mathrm{FP}$, cioè $\mathrm{FNP} \subseteq \mathrm{FP}$, e con l'inclusione opposta $\mathrm{FP} = \mathrm{FNP}$.

## Dove si inciampa di solito

Le due righe usano FSAT in modi diversi, e chi le ripete tende a confonderli. Nella prima basta che FSAT sia un problema di FNP: da lui si arriva a SAT, e da SAT, che è NP-completo, a tutta NP. Nella seconda serve che FSAT sia FNP-completo, perché è la coppia $(R, S)$ a trasferire l'algoritmo da FSAT a ogni altro problema di FNP. Senza $S$ non si saprebbe tradurre l'assegnazione trovata in una soluzione del problema di partenza.
