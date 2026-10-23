# Teorema $\mathrm{FP} = \mathrm{FNP} \iff \mathrm{P} = \mathrm{NP}$

## Che cosa afferma

P e NP riguardano problemi di decisione; FNP riguarda la ricerca di certificati, con risposta "no" se non esistono. FP contiene i problemi di ricerca risolvibili in tempo deterministico polinomiale.

Il teorema afferma che **tutti i problemi di ricerca di FNP si risolvono in tempo polinomiale se e solo se $\mathrm{P} = \mathrm{NP}$**. Usiamo SAT e FSAT per passare dalla decisione alla ricerca e viceversa.

## Da $\mathrm{FP} = \mathrm{FNP}$ a $\mathrm{P} = \mathrm{NP}$

Supponiamo che $\mathrm{FP} = \mathrm{FNP}$. FSAT appartiene a FNP, quindi per ipotesi possiamo risolverlo in tempo polinomiale.

Questo ci permette anche di decidere SAT in tempo polinomiale: eseguiamo FSAT e rispondiamo "sì" se restituisce un'assegnazione, "no" altrimenti. Dunque $\mathrm{SAT} \in \mathrm{P}$.

Ma SAT è NP-completo: per ogni $L \in \mathrm{NP}$ possiamo trasformare un input $x$ in una formula $R(x)$ tale che

$$
x \in L \iff R(x) \in \mathrm{SAT}.
$$

La trasformazione è polinomiale e ora anche decidere SAT lo è. Possiamo quindi decidere ogni $L \in \mathrm{NP}$ in tempo polinomiale. Otteniamo $\mathrm{NP} \subseteq \mathrm{P}$ e, poiché l'inclusione opposta vale sempre, $\mathrm{P} = \mathrm{NP}$.

## Da $\mathrm{P} = \mathrm{NP}$ a $\mathrm{FP} = \mathrm{FNP}$

Supponiamo ora che $\mathrm{P} = \mathrm{NP}$. Poiché SAT appartiene a NP, possiamo deciderlo in tempo polinomiale. Per la proposizione su FSAT e SAT, possiamo anche trovare un'assegnazione in tempo polinomiale, fissando una variabile alla volta. Dunque $\mathrm{FSAT} \in \mathrm{FP}$.

Resta da passare da FSAT a tutti i problemi di FNP. Qui usiamo il fatto che **FSAT è FNP-completo**: ogni problema $F_L \in \mathrm{FNP}$ si riduce a FSAT con una coppia di funzioni $(R,S)$. La funzione $R$ trasforma l'input $x$ in una formula; la funzione $S$ trasforma un'assegnazione soddisfacente di quella formula in un certificato valido per $x$.

Per risolvere $F_L$, calcoliamo quindi $R(x)$ ed eseguiamo FSAT. Se la formula è insoddisfacibile, per la riduzione non esiste un certificato per $x$ e rispondiamo "no". Se FSAT restituisce un'assegnazione $T$, restituiamo $S(T)$. Il percorso è

$$
x \xrightarrow{R} R(x) \xrightarrow{\mathrm{FSAT}} T \xrightarrow{S} S(T).
$$

## Perché il tempo resta polinomiale

Le funzioni $R$ e $S$ sono calcolabili in spazio logaritmico, quindi in tempo polinomiale. La formula $R(x)$ e l'assegnazione $T$ hanno lunghezza polinomiale in $|x|$, e anche FSAT è polinomiale per quanto appena dimostrato. Tutto il procedimento richiede quindi tempo polinomiale in $|x|$.

Ogni problema di FNP appartiene così a FP. Otteniamo $\mathrm{FNP} \subseteq \mathrm{FP}$ e, insieme a $\mathrm{FP} \subseteq \mathrm{FNP}$, concludiamo $\mathrm{FP} = \mathrm{FNP}$.

<details><summary>Esempio: dall'esistenza di una clique ai suoi nodi</summary>

Trovare una clique di $K$ nodi è un problema di FNP: ricevuti i nodi, possiamo controllare in tempo polinomiale che siano $K$ e tutti collegati fra loro.

La funzione $R$ costruisce una formula che descrive le scelte valide dei nodi. Se $\mathrm{P} = \mathrm{NP}$, FSAT trova un'assegnazione $T$ che la soddisfa e $S(T)$ restituisce i nodi della clique. Se la formula è insoddisfacibile, la clique non esiste.

</details>
