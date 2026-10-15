# Corollario: $\mathrm{PSPACE} = \mathrm{NPSPACE}$

## Prima di leggere, una domanda di controllo

Che cosa dice il corollario di Savitch, e quali ipotesi chiede sulla funzione $f$?

<details><summary>Risposta</summary>

$\mathrm{NSPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)^2)$, per ogni funzione propria $f(n) \ge \log n$.

</details>

Se non ti tornava, rileggi il corollario di Savitch prima di proseguire: qui lo si applica e basta.

## Le due inclusioni

PSPACE è l'unione degli $\mathrm{SPACE}(n^k)$ e NPSPACE l'unione degli $\mathrm{NSPACE}(n^k)$, per tutti i $k$.

$\mathrm{PSPACE} \subseteq \mathrm{NPSPACE}$ viene dal Teorema 7.4 (a): una macchina deterministica è una nondeterministica con una sola scelta per passo, quindi $\mathrm{SPACE}(n^k) \subseteq \mathrm{NSPACE}(n^k)$ per ogni $k$.

Per $\mathrm{NPSPACE} \subseteq \mathrm{PSPACE}$ prendi $L \in \mathrm{NPSPACE}$. Allora $L \in \mathrm{NSPACE}(n^k)$ per qualche $k$. La funzione $n^k$ è propria e vale $n^k \ge \log n$, quindi il corollario di Savitch si applica:

$$\mathrm{NSPACE}(n^k) \subseteq \mathrm{SPACE}((n^k)^2) = \mathrm{SPACE}(n^{2k}).$$

$n^{2k}$ è ancora un polinomio, quindi $L \in \mathrm{PSPACE}$. Le due inclusioni insieme danno l'uguaglianza.

## Perché il quadrato non fa uscire dalla classe

Togliere il nondeterminismo costa un quadrato nello spazio, e la famiglia dei polinomi assorbe il quadrato: l'esponente raddoppia, e una macchina nondeterministica in spazio $n^3$ si simula con una deterministica in spazio $n^6$.

Per il tempo non c'è un risultato simile. La simulazione deterministica nota di una macchina nondeterministica costa un esponenziale nel tempo, e un esponenziale non resta polinomiale. Così lo stesso argomento non dice niente su P e NP, e la domanda se $\mathrm{P} = \mathrm{NP}$ resta aperta.

Una conseguenza: un problema è PSPACE-completo se e solo se è NPSPACE-completo, perché le due classi sono la stessa.

## Dove si inciampa di solito

Lo stesso ragionamento non dà $\mathrm{L} = \mathrm{NL}$. Con $f(n) = \log n$ il corollario di Savitch dà $\mathrm{NL} \subseteq \mathrm{SPACE}(\log^2 n)$, e $\log^2 n$ non è $O(\log n)$.
