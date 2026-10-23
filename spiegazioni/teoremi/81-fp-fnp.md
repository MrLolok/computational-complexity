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

## Da $\mathrm{FP} = \mathrm{FNP}$ a $\mathrm{P} = \mathrm{NP}$

FSAT sta in FNP, quindi per ipotesi sta in FP. Per la proposizione su FSAT e SAT, allora SAT sta in P: si esegue l'algoritmo per FSAT, si ignora l'assegnazione trovata e si risponde "sì".

Sia ora $L$ un linguaggio qualsiasi di NP. SAT è NP-completo, quindi c'è una riduzione $R$ da $L$ a SAT, calcolabile in spazio logaritmico e quindi in tempo polinomiale. Per decidere $x$ si calcola $R(x)$ e si decide SAT su $R(x)$. $R(x)$ è lunga un polinomio in $|x|$, e un polinomio applicato a un polinomio è ancora un polinomio, quindi $L \in \mathrm{P}$. Questo dà $\mathrm{NP} \subseteq \mathrm{P}$, e con $\mathrm{P} \subseteq \mathrm{NP}$, che vale sempre, $\mathrm{P} = \mathrm{NP}$.

## Da $\mathrm{P} = \mathrm{NP}$ a $\mathrm{FP} = \mathrm{FNP}$

SAT sta in NP, quindi per ipotesi in P, e per la stessa proposizione FSAT si risolve in tempo polinomiale.

Sia $F_L$ un problema qualsiasi di FNP. Siccome FSAT è FNP-completo, c'è una riduzione $(R, S)$ da $F_L$ a FSAT. Su input $x$, l'algoritmo per $F_L$:

1. calcola la formula $R(x)$;
2. risolve FSAT su $R(x)$;
3. se la risposta è "no" risponde "no", se è un'assegnazione $T$ restituisce $S(T)$.

$R$ e $S$ lavorano in spazio logaritmico, quindi in tempo polinomiale. $R(x)$ è lunga un polinomio in $|x|$, e così il tempo per risolvere FSAT su $R(x)$ e la lunghezza di $T$. Tutti e tre i passi sono quindi polinomiali in $|x|$, e $F_L \in \mathrm{FP}$. Questo dà $\mathrm{FNP} \subseteq \mathrm{FP}$, e con $\mathrm{FP} \subseteq \mathrm{FNP}$, che vale sempre, $\mathrm{FP} = \mathrm{FNP}$.

## Dove si inciampa di solito

Le due direzioni usano FSAT in modi diversi, e capita di confonderli. Nella prima basta che FSAT stia in FNP: da lui si arriva a SAT, e da SAT, che è NP-completo, a tutta NP. Nella seconda serve che FSAT sia FNP-completo, perché è la coppia $(R, S)$ a trasferire l'algoritmo da FSAT a ogni altro problema di FNP. Senza $S$ non si saprebbe tradurre l'assegnazione trovata in una soluzione del problema di partenza.
