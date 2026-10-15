# Corollario (classe piccola con un problema completo per la grande)

## Prima di leggere, una domanda di controllo

Che cosa vuol dire che una classe è chiusa rispetto alle riduzioni?

<details><summary>Risposta</summary>

Che se $L$ sta nella classe e $L'$ si riduce a $L$, anche $L'$ sta nella classe. P, NP, coNP, L, NL, PSPACE ed EXP lo sono.

</details>

Se non ti tornava, rileggi la chiusura delle classi rispetto alle riduzioni prima di proseguire.

## Che cosa dice

Se $C_1 \subseteq C_2$, $C_1$ è chiusa rispetto alle riduzioni e contiene un problema $L$ che è $C_2$-completo, allora $C_1 = C_2$.

## La dimostrazione

L'inclusione $C_1 \subseteq C_2$ è un'ipotesi. Resta $C_2 \subseteq C_1$.

Prendi $L' \in C_2$. $L$ è $C_2$-completo, quindi $L'$ si riduce a $L$; e siccome $L \in C_1$ e $C_1$ è chiusa, anche $L' \in C_1$. Quindi ogni problema di $C_2$ sta in $C_1$, e insieme all'ipotesi $C_1 = C_2$.

Rispetto alla proposizione sul problema completo per due classi qui basta una sola completezza: l'altra inclusione, che lì veniva dalla seconda completezza, qui è data come ipotesi.

## Esempi

$\mathrm{P} \subseteq \mathrm{NP}$ e P è chiusa: un problema NP-completo sta in P solo se $\mathrm{P} = \mathrm{NP}$.

$\mathrm{NP} \subseteq \mathrm{PSPACE}$ e NP è chiusa: QSAT, che è PSPACE-completo, sta in NP solo se $\mathrm{NP} = \mathrm{PSPACE}$.

Letto al contrario: se $\mathrm{P} \neq \mathrm{NP}$, nessun problema NP-completo sta in P.

## Dove si inciampa di solito

La chiusura che serve è quella della classe piccola, $C_1$, perché è dentro $C_1$ che bisogna portare i problemi. La chiusura di $C_2$ non entra nella dimostrazione.

La lettura al contrario parte da $\mathrm{P} \neq \mathrm{NP}$, che non è dimostrato. Alla domanda "un problema NP-completo sta in P?" la risposta giusta è quindi "solo se $\mathrm{P} = \mathrm{NP}$", non un no.
