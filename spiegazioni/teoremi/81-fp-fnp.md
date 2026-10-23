# Teorema $\mathrm{FP} = \mathrm{FNP} \iff \mathrm{P} = \mathrm{NP}$

## Che cosa afferma

P e NP riguardano problemi di decisione; FNP riguarda la ricerca di certificati, con risposta "no" se non esistono. FP contiene i problemi di ricerca risolvibili in tempo deterministico polinomiale.

Il teorema afferma che **tutti i problemi di FNP si risolvono in tempo polinomiale se e solo se $\mathrm{P} = \mathrm{NP}$**. Il collegamento passa da SAT e FSAT.

## Da $\mathrm{FP} = \mathrm{FNP}$ a $\mathrm{P} = \mathrm{NP}$

Supponiamo che $\mathrm{FP} = \mathrm{FNP}$. Poiché FSAT appartiene a FNP, possiamo risolverlo in tempo polinomiale. Possiamo allora decidere SAT: eseguiamo FSAT e rispondiamo "sì" se restituisce un'assegnazione, "no" altrimenti. Dunque $\mathrm{SAT} \in \mathrm{P}$.

Ma SAT è NP-completo: per ogni $L \in \mathrm{NP}$, $x \in L \iff R(x) \in \mathrm{SAT}$. Trasformare l'input e decidere SAT richiedono tempo polinomiale, quindi ogni $L \in \mathrm{NP}$ appartiene a P. Poiché $\mathrm{P} \subseteq \mathrm{NP}$ vale sempre, otteniamo $\mathrm{P} = \mathrm{NP}$.

## Da $\mathrm{P} = \mathrm{NP}$ a $\mathrm{FP} = \mathrm{FNP}$

Supponiamo ora che $\mathrm{P} = \mathrm{NP}$. SAT è quindi polinomiale e, per la proposizione su FSAT e SAT, possiamo trovare un'assegnazione fissando una variabile alla volta in tempo polinomiale. Dunque $\mathrm{FSAT} \in \mathrm{FP}$.

Poiché **FSAT è FNP-completo**, ogni problema $F_L \in \mathrm{FNP}$ si riduce a FSAT con una coppia $(R,S)$: $R$ trasforma l'input $x$ in una formula e $S$ traduce un'assegnazione soddisfacente in un certificato valido per $x$.

$$
x \xrightarrow{R} R(x) \xrightarrow{\mathrm{FSAT}} T \xrightarrow{S} S(T).
$$

## Perché il tempo resta polinomiale

Le funzioni $R$ e $S$ sono calcolabili in tempo polinomiale. Anche $R(x)$ e $T$ hanno lunghezza polinomiale in $|x|$: insieme all'algoritmo polinomiale per FSAT, questo rende polinomiale l'intera procedura.

Ogni problema di FNP appartiene così a FP. Otteniamo $\mathrm{FNP} \subseteq \mathrm{FP}$ e, insieme a $\mathrm{FP} \subseteq \mathrm{FNP}$, concludiamo $\mathrm{FP} = \mathrm{FNP}$.

<details><summary>Esempio: dall'esistenza di una clique ai suoi nodi</summary>

Trovare una clique di $K$ nodi è un problema di FNP: ricevuti i nodi, possiamo controllare in tempo polinomiale che siano $K$ e tutti collegati fra loro.

La funzione $R$ costruisce una formula che descrive le scelte valide dei nodi. Se $\mathrm{P} = \mathrm{NP}$, FSAT trova un'assegnazione $T$ che la soddisfa e $S(T)$ restituisce i nodi della clique. Se la formula è insoddisfacibile, la clique non esiste.

</details>
