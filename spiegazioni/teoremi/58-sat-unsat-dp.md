# SAT-UNSAT è DP-completo

## Prima di leggere

1. Quando un linguaggio sta in DP?
2. In che cosa DP differisce da $\mathrm{NP} \cap \mathrm{coNP}$?

<details><summary>Risposte</summary>

1. $L \in \mathrm{DP}$ se esistono $L_1 \in \mathrm{NP}$ e $L_2 \in \mathrm{coNP}$ con $L = L_1 \cap L_2$: una stringa sta in $L$ se supera due controlli, uno di tipo NP e uno di tipo coNP.
2. In $\mathrm{NP} \cap \mathrm{coNP}$ è lo stesso linguaggio a stare in entrambe le classi. In DP si intersecano due linguaggi diversi, uno per classe.

</details>

## Il problema

SAT-UNSAT riceve due formule $\varphi$ e $\varphi'$ in CNF con 3 letterali per clausola e chiede se $\varphi$ è soddisfacibile e $\varphi'$ no. Per la prima metà basta esibire un assegnamento che soddisfa $\varphi$. Per la seconda bisogna escludere tutti gli assegnamenti di $\varphi'$, e un certificato corto si conosce solo per il caso opposto, quando $\varphi'$ è soddisfacibile. Una risposta SÌ ha quindi bisogno di entrambe le cose, ed è la forma tipica di un problema di DP.

## Sta in DP

Si scrive SAT-UNSAT come intersezione di due linguaggi di coppie:

$$L_1 = \{(\varphi, \varphi') : \varphi \text{ è soddisfacibile}\}, \qquad L_2 = \{(\varphi, \varphi') : \varphi' \text{ è insoddisfacibile}\}.$$

$L_1$ è 3-SAT applicato alla prima formula, ignorando la seconda: sta in NP, con certificato un assegnamento che soddisfa $\varphi$. $L_2$ è il complemento di 3-SAT applicato alla seconda formula: sta in coNP. Una coppia sta in SAT-UNSAT esattamente quando sta in tutti e due.

## È DP-difficile

Sia $L$ un linguaggio qualsiasi di DP. Di lui si sa solo che $L = L_1 \cap L_2$ con $L_1 \in \mathrm{NP}$ e $L_2 \in \mathrm{coNP}$. Bisogna trasformare ogni $x$ in una coppia di formule.

Per $L_1$ è diretto: 3-SAT è NP-completo, quindi c'è una riduzione $R_1$ con $x \in L_1 \iff R_1(x)$ è soddisfacibile.

Per $L_2$ bisogna passare dal complemento, perché le riduzioni a 3-SAT esistono per i linguaggi di NP e $L_2$ sta in coNP. Il complemento $\overline{L_2}$ sta in NP, quindi c'è una riduzione $R_2$ con $x \in \overline{L_2} \iff R_2(x)$ è soddisfacibile. Negando entrambi i lati, $x \in L_2 \iff R_2(x)$ è insoddisfacibile: la seconda formula della coppia deve essere quella insoddisfacibile.

La riduzione mette le due formule in coppia:

$$R(x) = (R_1(x), R_2(x)).$$

Allora

$$R(x) \in \mathrm{SAT\text{-}UNSAT} \iff R_1(x) \text{ è soddisfacibile e } R_2(x) \text{ no} \iff x \in L_1 \text{ e } x \in L_2 \iff x \in L.$$

$R$ si calcola in spazio logaritmico: la macchina esegue $R_1$ e poi $R_2$ riusando lo stesso nastro di lavoro, e scrive le due formule una dopo l'altra sul nastro di output.

## Un esempio

EXACT TSP sta in DP: il giro ottimo costa esattamente $B$ se e solo se esiste un giro di costo $\le B$ (TSP(D), in NP) e nessun giro costa $\le B - 1$ (il complemento di TSP(D) con budget $B - 1$, in coNP). Applicata a un'istanza con budget $B$, la riduzione produce due formule: la prima è soddisfacibile se c'è un giro di costo $\le B$, la seconda se c'è un giro di costo $\le B - 1$. La coppia sta in SAT-UNSAT quando la prima formula è soddisfacibile e la seconda no, cioè quando l'ottimo è esattamente $B$.

## Dove si inciampa di solito

Le due condizioni riguardano lo stesso input, e questo spinge a mettere SAT-UNSAT in $\mathrm{NP} \cap \mathrm{coNP}$. Definiscono però due linguaggi diversi, e di SAT-UNSAT non si sa se stia in NP o in coNP.
