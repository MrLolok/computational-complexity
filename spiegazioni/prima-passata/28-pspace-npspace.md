# Corollario: $\mathrm{PSPACE} = \mathrm{NPSPACE}$

## Prima di leggere

Che cosa dice il corollario di Savitch, e quali ipotesi chiede sulla funzione $f$?

<details><summary>Risposta</summary>

$\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$, per ogni funzione propria $f$ con $f(n) \ge \log n$.

</details>

## L'idea

Servono due inclusioni.

$\mathrm{PSPACE} \subseteq \mathrm{NPSPACE}$ è immediata. PSPACE è l'unione degli $\mathrm{SPACE}(n^k)$ e NPSPACE l'unione degli $\mathrm{NSPACE}(n^k)$; per il Teorema 7.4 (a) $\mathrm{SPACE}(n^k) \subseteq \mathrm{NSPACE}(n^k)$, perché una macchina deterministica è una nondeterministica con una sola scelta a ogni passo.

Per $\mathrm{NPSPACE} \subseteq \mathrm{PSPACE}$ si prende $L \in \mathrm{NPSPACE}$: allora $L \in \mathrm{NSPACE}(n^k)$ per qualche $k$. La funzione $n^k$ soddisfa le ipotesi del corollario di Savitch: è propria, perché un polinomio si calcola con poco spazio, e $n^k \ge n \ge \log n$. Quindi

$$\mathrm{NSPACE}(n^k) \subseteq \mathrm{SPACE}((n^k)^2) = \mathrm{SPACE}(n^{2k}) \subseteq \mathrm{PSPACE}.$$

Tutto il corollario sta nel fatto che il quadrato di un polinomio è ancora un polinomio: un problema in $\mathrm{NSPACE}(n^3)$ finisce in $\mathrm{SPACE}(n^6)$, che è ancora spazio polinomiale.

## Dove si inciampa di solito

L'uguaglianza vale per l'intera classe, non per un singolo limite di spazio. Il corollario di Savitch non dice che $\mathrm{NSPACE}(n) = \mathrm{SPACE}(n)$, ma solo che $\mathrm{NSPACE}(n) \subseteq \mathrm{SPACE}(n^2)$; l'unione su tutti i polinomi assorbe il quadrato.

Per il tempo non si conosce un risultato simile: se $\mathrm{P} = \mathrm{NP}$ è una domanda aperta. Lo spazio si può riusare fra un tentativo e l'altro, e su questo si basa l'algoritmo di Savitch; il tempo speso in un tentativo fallito invece è perso.

Una conseguenza diretta: un problema è PSPACE-completo se e solo se è NPSPACE-completo, perché le due classi sono la stessa.
