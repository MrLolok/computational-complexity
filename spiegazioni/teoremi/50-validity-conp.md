# VALIDITY è coNP-completo

## Prima di leggere

1. Quando un linguaggio $L$ sta in coNP?
2. Che cosa deve valere perché $R$ sia una riduzione da $L$ a $L'$?

<details><summary>Risposte</summary>

1. Quando il suo complemento $\overline{L}$ (le stringhe che non stanno in $L$) sta in NP. Con i certificati: le risposte NO hanno un certificato corto, verificabile in tempo polinomiale.
2. $R$ si calcola in spazio logaritmico e, per ogni stringa $x$, $x \in L \iff R(x) \in L'$.

</details>

## Il problema

VALIDITY chiede se una formula booleana è vera per ogni assegnamento delle variabili, cioè se è una tautologia. Bisogna mostrare che sta in coNP e che ogni problema di coNP vi si riduce.

Stare in coNP è la parte facile. Una formula non valida ha un testimone, un assegnamento che la rende falsa, e lo si controlla in tempo polinomiale: il complemento di VALIDITY sta in NP. Per una formula valida, invece, nessun singolo assegnamento basta come prova: con $k$ variabili il controllo diretto deve guardarli tutti e $2^k$.

## L'idea: negare la formula

VALIDITY e SAT sono collegati da un'equivalenza:

$$\varphi \text{ è valida} \iff \neg\varphi \text{ è insoddisfacibile}.$$

Infatti $\varphi$ è vera per ogni assegnamento se e solo se $\neg\varphi$ è falsa per ogni assegnamento.

Ora prendi un linguaggio $L$ qualsiasi di coNP. Il suo complemento $\overline{L}$ sta in NP e SAT è NP-completo, quindi esiste una riduzione $R$ da $\overline{L}$ a SAT. La nuova riduzione è

$$R'(x) = \neg R(x).$$

La catena di equivalenze:

$$x \in L \iff x \notin \overline{L} \iff R(x) \text{ è insoddisfacibile} \iff \neg R(x) \text{ è valida} \iff R'(x) \in \mathrm{VALIDITY}.$$

$R'$ si calcola in spazio logaritmico senza spazio in più: la macchina scrive $\neg($, poi esegue $R$, che produce il suo output un simbolo alla volta, poi chiude la parentesi.

## Un esempio

Prendi come $L$ il problema UNSAT delle formule insoddisfacibili. Il suo complemento è SAT, e la riduzione da SAT a SAT è l'identità, $R(\varphi) = \varphi$. Allora $R'(\varphi) = \neg\varphi$: una formula è insoddisfacibile se e solo se la sua negazione è valida.

Con $\varphi = x \land \neg x$, insoddisfacibile, si ottiene $\neg(x \land \neg x)$, vera sia per $x$ vero sia per $x$ falso. Con $\varphi = x \land y$, soddisfacibile, si ottiene $\neg(x \land y)$, che diventa falsa con $x$ e $y$ entrambi veri.

## HAMILTON PATH COMPLEMENT

Il secondo problema dell'enunciato chiede se un grafo non ha cammini hamiltoniani. È il complemento di HAMILTON PATH, che sta in NP, quindi sta in coNP.

Qui la riduzione non va nemmeno modificata. Se $L \in \mathrm{coNP}$, il complemento $\overline{L}$ si riduce a HAMILTON PATH con una riduzione $R$: $x \in \overline{L} \iff R(x)$ ha un cammino hamiltoniano. Negando entrambi i lati, $x \in L \iff R(x)$ non ne ha, quindi la stessa $R$ riduce $L$ a HAMILTON PATH COMPLEMENT.

## Dove si inciampa di solito

Viene spontaneo prendere VALIDITY per il complemento di SAT. Il complemento di SAT sono le formule insoddisfacibili, e la formula $x$ non sta in nessuno dei due: non è valida (è falsa per $x$ falso) e non è insoddisfacibile (è vera per $x$ vero). Per questo con VALIDITY bisogna negare la formula, mentre con HAMILTON PATH COMPLEMENT, che è davvero il complemento di HAMILTON PATH, la riduzione resta com'è.

$R(x)$ è in CNF e $\neg R(x)$ non lo è più. VALIDITY però accetta formule qualsiasi, quindi non c'è niente da sistemare.

Da questo teorema non segue che VALIDITY stia fuori da NP: non lo si sa. Se ci stesse, un problema coNP-completo starebbe in NP e si avrebbe $\mathrm{NP} = \mathrm{coNP}$, che si crede falso ma nessuno ha dimostrato.
