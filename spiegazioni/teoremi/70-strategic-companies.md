# STRATEGIC COMPANIES è $\Sigma_2^{\mathrm{P}}$-completo

## Prima di leggere

Prova a rispondere a mente prima di andare avanti.

1. Come si scrive un problema di $\Sigma_2^{\mathrm{P}}$ con i quantificatori? E con gli oracoli?
2. Che cosa chiede $\mathrm{QSAT}_2$?

<details><summary>Risposte</summary>

1. $x$ sta nel linguaggio se esiste un $y_1$ tale che per ogni $y_2$ la tripla $(x, y_1, y_2)$ passa un controllo polinomiale, con $y_1$ e $y_2$ di lunghezza polinomiale. Con gli oracoli, $\Sigma_2^{\mathrm{P}} = \mathrm{NP}^{\mathrm{NP}}$.
2. Data $\exists X\, \forall Y\, \varphi$, chiede se c'è un'assegnazione di $X$ tale che ogni assegnazione di $Y$ renda vera $\varphi$. È $\Sigma_2^{\mathrm{P}}$-completo (Teorema 17.10).

</details>

Se non ti tornavano, rileggi la definizione della gerarchia polinomiale: qui servono tutte e due le forme.

## Il problema

Ci sono un insieme $C$ di società e un insieme $G$ di merci, e ogni società produce alcune merci. Un insieme di controllo $O_j(c)$ è un gruppo di società che, prese tutte insieme, controllano la società $c$. Un sottoinsieme $C' \subseteq C$ va bene se:

1. le sue società, insieme, producono ogni merce di $G$;
2. è chiuso rispetto al controllo: se un $O_j(c)$ sta tutto in $C'$, anche $c$ sta in $C'$.

Una società è strategica se appartiene a un $C'$ che va bene ed è minimo per inclusione: nessun sottoinsieme proprio di $C'$ va bene, anche se magari un altro insieme che va bene ha meno società. La definizione ha già la forma $\exists\forall$: esiste un $C'$, e per ogni suo sottoinsieme proprio quel sottoinsieme non va bene. I sottoinsiemi da escludere sono esponenzialmente tanti.

## Appartenenza

"$C'$ non è minimo" sta in NP: il certificato è un $C'' \subsetneq C'$ che va bene, e le condizioni 1 e 2 si controllano in tempo polinomiale. La macchina per STRATEGIC COMPANIES indovina un $C'$ che contiene la società data, verifica 1 e 2, chiede all'oracolo se $C'$ non è minimo e accetta se la risposta è "no". È una macchina NP con oracolo NP: il problema sta in $\mathrm{NP}^{\mathrm{NP}} = \Sigma_2^{\mathrm{P}}$.

## La riduzione da $\mathrm{QSAT}_2$

Si parte da $\Phi = \exists x_1 \dots x_n\, \forall y_1 \dots y_m\, \varphi$ con $\varphi$ in forma normale disgiuntiva: un "oppure" di termini, ognuno un "e" di tre letterali. In questa forma $\mathrm{QSAT}_2$ resta $\Sigma_2^{\mathrm{P}}$-difficile, perché è la negazione della forma $\forall\exists$ con $\varphi$ in CNF che esce dalla prova del Teorema 17.10, e negando una CNF si ottiene una DNF. La forma disgiuntiva ricalca la regola di chiusura: un insieme di controllo fa da "e" (se ci sono tutte queste società, c'è anche $c$), e più insiemi di controllo per la stessa società fanno da "oppure".

| Elemento                                       | Ruolo                                                      |
| ---------------------------------------------- | ---------------------------------------------------------- |
| società $x_i$, $\neg x_i$, $y_j$, $\neg y_j$   | una per letterale                                          |
| società $w$                                    | quella di cui si chiede se è strategica                    |
| merce $g_{x_i}$, merce $g_{y_j}$               | prodotte solo dai due letterali della loro variabile       |
| $\{w\}$ controlla $y_j$ e $\neg y_j$           | se $w$ è dentro, ci sono tutti i letterali delle $y$       |
| ogni termine $\{L_1, L_2, L_3\}$ controlla $w$ | se i tre letterali di un termine sono dentro, $w$ è dentro |

I letterali delle $x$ non sono vincolati dalla chiusura, e quelli che stanno in $C'$ descrivono l'assegnazione del blocco $\exists$. Il $\forall$ sulle $y$ si ritrova nella minimalità. Un $C'$ con $w$ contiene, per chiusura, tutti e due i letterali di ogni $y_j$. Un sottoinsieme senza $w$ può tenerne anche uno solo per variabile, cioè scegliere un'assegnazione delle $y$, e va bene se nessun termine ha tutti i letterali dentro.

Se $\Phi$ è vera, $w$ è strategica. Sia $T$ un'assegnazione delle $x$ che rende vera $\varphi$ per ogni scelta delle $y$, e sia $C'$ fatto dai letterali delle $x$ veri in $T$, da tutti i letterali delle $y$ e da $w$. $C'$ va bene. Un $C'' \subsetneq C'$ che andasse bene avrebbe gli stessi letterali delle $x$ (sono gli unici produttori rimasti delle merci $g_x$) e non conterrebbe $w$, altrimenti la chiusura lo riporterebbe a $C'$. Sia $T_y$ l'assegnazione con $y_j$ vera se e solo se $y_j \in C''$. Per le merci, se $y_j$ manca c'è $\neg y_j$, quindi ogni letterale vero in $T \cup T_y$ sta in $C''$. Per ipotesi un termine è vero, i suoi letterali stanno in $C''$ e la chiusura impone $w \in C''$: assurdo.

Se $w$ è strategica, $\Phi$ è vera. Sia $C'$ minimo con $w$ dentro. Contiene tutti i letterali delle $y$, e per minimalità un solo letterale per ogni $x_i$, perché il secondo si toglierebbe senza perdere merci e senza far scattare controlli. Sia $T$ l'assegnazione che ne risulta. Se una $T_y$ rendesse $\varphi$ falsa, il sottoinsieme fatto dai letterali delle $x$ di $C'$ e dai letterali delle $y$ veri in $T_y$, senza $w$, andrebbe bene: produce tutte le merci, le $y$ non sono vincolate perché $w$ è fuori, e ogni termine ha un letterale falso, che non sta dentro. La minimalità di $C'$ lo esclude.

La costruzione, con $2n + 2m + 1$ società e un controllo per termine, è lineare in $\Phi$. Il complemento è $\Pi_2^{\mathrm{P}}$-completo perché $\Pi_2^{\mathrm{P}} = \mathrm{co}\Sigma_2^{\mathrm{P}}$.

## Un esempio

Prendi $\Phi = \exists x\, \forall y\, [(x \land y) \lor (x \land \neg y)]$, con termini di due letterali per brevità. $\Phi$ è vera con $x$ vera. Le società sono $x, \neg x, y, \neg y, w$; $\{w\}$ controlla $y$ e $\neg y$; $\{x, y\}$ e $\{x, \neg y\}$ controllano $w$.

Con $x$ vera si prende $C' = \{x, y, \neg y, w\}$. Un sottoinsieme proprio che produce le merci tiene $x$ e almeno una fra $y$ e $\neg y$; se tiene $w$ deve tenerle entrambe, e allora è $C'$. Restano tre candidati senza $w$:

| $C''$              | termine tutto dentro | va bene?                   |
| ------------------ | -------------------- | -------------------------- |
| $\{x, y\}$         | $\{x, y\}$           | no, la chiusura chiede $w$ |
| $\{x, \neg y\}$    | $\{x, \neg y\}$      | no, la chiusura chiede $w$ |
| $\{x, y, \neg y\}$ | tutti e due          | no                         |

$C'$ è minimo e $w$ è strategica. Le prime due righe sono le due assegnazioni di $y$, e ognuna rende vero un termine. Con $x$ falsa, invece, dentro $\{\neg x, y, \neg y, w\}$ va bene il sottoinsieme $\{\neg x, y\}$, che corrisponde all'assegnazione $y$ vera, per la quale $\varphi$ è falsa.

## Dove si inciampa di solito

Si pensa di controllare la minimalità togliendo una società alla volta, ma la chiusura non è monotona. Con $\varphi = x \land y$ e $C' = \{x, y, \neg y, w\}$, togliere una sola società rompe sempre qualcosa: senza $w$ il termine $\{x, y\}$ richiama $w$, senza $y$ o $\neg y$ la chiusura le rimette perché $w$ è dentro, senza $x$ manca la merce $g_x$. Eppure $\{x, \neg y\}$ va bene, e lo si vede solo togliendo $w$ e $y$ insieme. La minimalità va controllata su tutti i sottoinsiemi, ed è per questo che serve l'oracolo.
