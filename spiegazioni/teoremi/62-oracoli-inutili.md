# Oracoli inutili e $\mathrm{DP} \subseteq \mathrm{P}^{\mathrm{NP}}$

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Quando un linguaggio $L$ sta in DP?
2. Una macchina nondeterministica decide SAT in tempo polinomiale. Perché non può decidere co-SAT allo stesso modo?

<details><summary>Risposte</summary>

1. Quando $L = L_1 \cap L_2$ con $L_1 \in \mathrm{NP}$ e $L_2 \in \mathrm{coNP}$. L'esempio tipico è SAT-UNSAT: data una coppia $(\varphi, \psi)$, $\varphi$ è soddisfacibile e $\psi$ no?
2. Per SAT un ramo indovina un assegnamento e controlla che soddisfi la formula: se la formula è soddisfacibile, almeno un ramo accetta. Per co-SAT bisognerebbe escludere tutti i $2^n$ assegnamenti, e la macchina accetta quando almeno un ramo accetta: nessun ramo, da solo, vede abbastanza per escluderli tutti. Non si sa se co-SAT stia in NP.

</details>

Se la seconda risposta non ti tornava, rileggila: spiega perché un oracolo NP, a differenza di uno in P, non si sa togliere.

## Che cosa dice

Un oracolo in P non aggiunge niente: $\mathrm{P}^{\mathrm{P}} = \mathrm{P}$ e $\mathrm{NP}^{\mathrm{P}} = \mathrm{NP}$. Un problema di DP si decide con due domande a un oracolo NP, quindi $\mathrm{DP} \subseteq \mathrm{P}^{\mathrm{NP}}$. Per un oracolo NP la stessa domanda è aperta: non si sa se $\mathrm{NP}^{\mathrm{NP}} = \mathrm{NP}$.

## Un oracolo in P si esegue in linea

Sia $M^A$ una macchina deterministica con budget $p(n)$ e oracolo $A \in \mathrm{P}$, deciso da una macchina $M_A$ con budget $q(n)$. La macchina $M'$, senza oracolo, fa come $M$; quando $M$ farebbe una domanda $w$, $M'$ esegue $M_A$ su $w$ come sottoprogramma e prosegue con la risposta ottenuta.

Le domande sono al più $p(n)$, ognuna lunga al più $p(n)$, e ognuna costa al più $q(p(n))$ passi, perché $M_A$ lavora su $w$ e non sull'input. In totale $M'$ fa al più $p(n) + p(n) \cdot q(p(n))$ passi, un polinomio. L'inclusione opposta è immediata: una macchina con oracolo può non usarlo.

Per $\mathrm{NP}^{\mathrm{P}}$ la costruzione è la stessa con $M$ nondeterministica. Il sottoprogramma $M_A$ è deterministico, quindi dà la risposta giusta su ogni ramo, e ogni ramo resta polinomiale.

## Perché il trucco non funziona con un oracolo NP

Eseguire in linea un oracolo NP vuol dire indovinare un certificato. Per una risposta "sì" va bene: il ramo indovina il certificato e lo controlla. Per una risposta "no" il ramo dovrebbe escludere tutti i certificati, ed è lo stesso ostacolo di co-SAT nella domanda di controllo. Se il ramo potesse rispondere "no" a piacere, potrebbe accettare proseguendo con una risposta sbagliata. Una macchina NP sa fare questa esclusione in tempo polinomiale solo se $\mathrm{NP} = \mathrm{coNP}$, ed è per questo che $\mathrm{NP}^{\mathrm{NP}} = \mathrm{NP}$ resta aperto.

## Due domande bastano per DP

Sia $L = L_1 \cap L_2$ con $L_1 \in \mathrm{NP}$ e $L_2 \in \mathrm{coNP}$. Come per SAT-UNSAT ci sono due riduzioni: $R_1$ da $L_1$ a SAT e $R_2$ dal complemento di $L_2$ a SAT. La macchina deterministica con oracolo SAT calcola $R_1(x)$ e chiede; se la risposta è "no" rifiuta. Altrimenti calcola $R_2(x)$, chiede di nuovo e accetta se e solo se la risposta è "no". Accetta esattamente quando $x \in L_1$ e $x \in L_2$, con due domande e tempo polinomiale.

Con SAT-UNSAT le riduzioni non servono. Sulla coppia $\varphi = x \lor y$, $\psi = x \land \neg x$ la macchina chiede a SAT di $\varphi$ e riceve "sì" (basta $x = 1$), poi chiede di $\psi$ e riceve "no", quindi accetta.

## Dove sta $\mathrm{P}^{\mathrm{NP}}$

Per definizione $\Delta_2^{\mathrm{P}} = \mathrm{P}^{\mathrm{NP}}$. Una macchina deterministica è una macchina nondeterministica che non usa le scelte, quindi $\mathrm{P}^{\mathrm{NP}} \subseteq \mathrm{NP}^{\mathrm{NP}} = \Sigma_2^{\mathrm{P}}$. Inoltre $\mathrm{P}^{\mathrm{NP}}$ è chiusa per complemento: basta scambiare accettazione e rifiuto della macchina deterministica, lasciando com'è l'oracolo. Quindi sta anche in $\mathrm{coNP}^{\mathrm{NP}} = \Pi_2^{\mathrm{P}}$, e la catena completa è

$$\mathrm{DP} \subseteq \Delta_2^{\mathrm{P}} \subseteq \Sigma_2^{\mathrm{P}} \cap \Pi_2^{\mathrm{P}}.$$

## Dove si inciampa di solito

Due domande sono quelle che servono a DP, e $\mathrm{P}^{\mathrm{NP}}$ ne permette molte di più: un numero polinomiale, ognuna scelta in base alle risposte precedenti. Per questo $\mathrm{P}^{\mathrm{NP}}$ potrebbe essere più grande di DP, anche se non si sa se l'inclusione sia stretta.
