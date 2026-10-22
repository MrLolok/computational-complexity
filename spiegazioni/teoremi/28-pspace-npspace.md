# Corollario: $\mathrm{PSPACE} = \mathrm{NPSPACE}$

## Prima di leggere, una domanda di controllo

Che cosa dice il corollario di Savitch, e quali ipotesi chiede sulla funzione $f$?

<details><summary>Risposta</summary>

$\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$, per ogni funzione propria $f(n) \ge \log n$.

</details>

Se non ti tornava, rileggi il corollario di Savitch: qui lo si applica e basta.

## Le due inclusioni

PSPACE è l'unione degli $\mathrm{SPACE}(n^k)$ e NPSPACE l'unione degli $\mathrm{NSPACE}(n^k)$, per tutti i $k$.

$\mathrm{PSPACE} \subseteq \mathrm{NPSPACE}$ viene dal Teorema 7.4 (a): una macchina deterministica è una nondeterministica con una sola scelta per passo, quindi $\mathrm{SPACE}(n^k) \subseteq \mathrm{NSPACE}(n^k)$ per ogni $k$.

Per $\mathrm{NPSPACE} \subseteq \mathrm{PSPACE}$ sia $L \in \mathrm{NSPACE}(n^k)$ per qualche $k$. La funzione $n^k$ è propria e $n^k \ge \log n$, quindi per il corollario di Savitch $L \in \mathrm{SPACE}((n^k)^2) = \mathrm{SPACE}(n^{2k}) \subseteq \mathrm{PSPACE}$.

## Perché il quadrato non fa uscire dalla classe

Togliere il nondeterminismo costa un quadrato nello spazio, e la famiglia dei polinomi assorbe il quadrato: l'esponente raddoppia.

Per il tempo non c'è un risultato simile: la simulazione deterministica nota di una macchina nondeterministica costa un esponenziale, che non resta polinomiale, quindi l'argomento non dice niente su P e NP.

Ne segue che un problema è PSPACE-completo se e solo se è NPSPACE-completo.

## Dove si inciampa di solito

Lo stesso ragionamento non dà $\mathrm{L} = \mathrm{NL}$. Con $f(n) = \log n$ il corollario di Savitch dà $\mathrm{NL} \subseteq \mathrm{SPACE}(\log^2 n)$, e $\log^2 n$ non è $O(\log n)$.
