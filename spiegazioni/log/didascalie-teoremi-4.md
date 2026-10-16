# Didascalie della dimostrazione illustrata, gruppo 4 (teoremi 48-64)

## Esito dell'invocazione di humanizer

La skill `humanizer` è stata invocata con lo strumento Skill e si è caricata (istruzioni da `/home/lore/.claude/skills/humanizer`). Ho seguito i suoi quattro passi su ogni teorema: difetti segnati sulle didascalie del manifesto, riscrittura, ricontrollo (contrasti §1, chiusure §2, triadi §6, trattini §8, grassetti §19, fatti aggiunti o persi), versione finale. Le regole di STRATEGIA.md (humanizer e regole del sito) sono applicate anche qui.

Output: `/tmp/claude-1000/-home-lore-computational-complexity/c31ad5e9-eb2d-47cb-ab3f-3dadb59db58c/scratchpad/illustrate/out/teoremi-4.json`, 17 teoremi, 57 slide, stesso ordine del manifesto. Controlli fatti: JSON valido, nessun `—`, `–`, `**`, virgolette curve o "Attenzione"; `$` bilanciati; didascalie fra 39 e 73 parole; titoli fra 2 e 6 parole.

Difetti comuni a tutto il gruppo, non ripetuti sotto:

- §21: apostrofi curvi (’) in quasi tutte le didascalie e in alcuni titoli; sostituiti con apostrofi dritti.
- Formule scritte con caratteri Unicode (pesoᵢ, Σᵢᴾ, Pᴺᴾ, φₓ) o in testo semplice (O(nW), P = NP) invece che in LaTeX; riscritte con `$…$` come vuole il sito.
- Didascalie che enunciano il passo senza dire che cosa c'è nel disegno: in ogni slide ho aggiunto il riferimento agli elementi visibili (riquadri, frecce, colori, tabelle, etichette) e il loro ruolo nella prova.

## 48 knapsack-pseudopoly

Difetti: §21; titolo "Leggi bene il limite" è un'apertura a effetto senza contenuto (§4); slide 4 con contrasto "non polinomiale nella lunghezza binaria" (§1, qui la correzione è vera e l'ho tenuta in forma diretta).
Collegamento al disegno: notazione del disegno ($D[i,w]$, $v_i$, $p_i$); slide 1 spiega righe, colonne e la riga 0 evidenziata; slide 2 lega riquadro blu e verde ai due casi, con la condizione $p_i \le w$ che mancava; slide 3 legge le frecce verdi fra riga $i-1$ (blu) e riga $i$ (verde) e il conto $(n+1)(W+1)$; slide 4 spiega il segno $\ne$ e l'esempio $W = 2^{m-1}$ con $m$ bit e $2^{m-1}+1$ colonne. Nuovo titolo: "Perché è solo pseudopolinomiale".

## 49 strong-np

Difetti: §21; slide 3 chiude con "Un tale algoritmo richiede dunque questa uguaglianza", frase che ripete la precedente (§2); "davvero polinomiale" (riempitivo).
Collegamento: slide 1 legge il riquadro $\le p(|I|)$ e la dimensione combinatoria $|I|$; slide 2 dà il tempo $q(|I|, M)$ del riquadro in alto e il conto $q(|I|, p(|I|))$; slide 3 sostituisce la chiusura ripetitiva con la lettura al contrario e il caso KNAPSACK. Titolo slide 2 accorciato: "Supponi un algoritmo pseudopolinomiale".

## 50 validity-conp

Difetti: §21; "collega VALIDITY al complemento di SAT" è un collegamento vago (§14) e rischia di far credere che VALIDITY sia il complemento di SAT; slide 3 "Lo stesso principio applicato a" vago (§14) e salta il passo da SAT a VALIDITY.
Collegamento: slide 1 legge il riquadro rosso $\varphi(\alpha) = 0$ e quello verde; slide 2 aggiunge la riduzione $R'(x) = \neg R(x)$ e l'avvertenza vera (la formula $x$); slide 3 spiega che $\neg$SAT nel disegno indica il complemento e aggiunge la riduzione $\varphi \mapsto \neg\varphi$.

## 51 prop-a

Difetti: §21 (anche nel titolo); "La trasformazione è identica" ambiguo (sembra la funzione identità); slide 1 troppo corta per dire che cosa mostrano i cerchi.
Collegamento: cerchi blu e verde, freccia $R$, riga sotto prima blu-verde e poi rossa con l'equivalenza negata; slide 3 legge il riquadro del costo e aggiunge che il verso della riduzione non si inverte (errore tipico della spiegazione).

## 52 prop-b

Difetti: §21; slide 3 "Quindi quest'ultimo è anche coNP-hard, e dunque coNP-completo" con connettivi accumulati e "quest'ultimo" (§2, debole).
Collegamento: slide 1 le due frecce dal riquadro verde; slide 2 freccia verticale e freccia orizzontale con la riduzione scritta; slide 3 la riga in basso ottenuta negando i due lati. Titolo slide 2 accorciato.

## 53 prop-c

Difetti: §21; slide 3 chiude con "Questo prova che anche coC è chiusa" (§2); manca il passo in cui la chiusura di $C$ dà $\overline{A} \in C$.
Collegamento: slide 1 distingue freccia in alto (definizione di co$C$) e riga in basso (la riduzione); slide 2 aggiunge il passo mancante con la chiusura di $C$; slide 3 legge il riquadro come risultato del passo prima e chiude con l'esempio coNP. Il titolo "Applica la chiusura di C" non corrispondeva al disegno (che mostra solo la definizione): ora "Torna ad $A$".

## 54 prop-d

Difetti: §21; nessun tell forte.
Collegamento: slide 1 aggiunge l'ipotesi che $C$ sia chiusa, che il disegno non mostra; slide 2 lega la freccia che scende alla Proposizione C e aggiunge perché serve un problema completo; slide 3 legge la colonna di quattro riquadri e la freccia curva.

## 55 p-np-conp

Difetti: §21; slide 3 chiude con "L'uguaglianza P = NP implica dunque NP = coNP", che ripete l'enunciato (§2).
Collegamento: ellisse con l'ipotesi e decisore $D$; tabella $b$, $1-b$ e decisore $D'$; la catena del disegno letta da destra, con l'origine di ogni uguale. Aggiunta la nota vera sul verso opposto non noto.

## 56 p-in-np-conp

Difetti: §21; "Non stiamo dimostrando che l'inclusione sia stretta" (§5, difesa senza interlocutore) diventa il fatto "Non si sa se l'inclusione sia stretta".
Collegamento: catena di stati $q_0, q_1$ come unico ramo; tabella dello scambio; le due frecce da P. Titolo slide 3 "Interseca le proprietà" diventa "Unisci le due inclusioni".

## 57 exact-tsp-np-hard

Difetti: §21; "provando NP-hardness" (inglese misto); titolo slide 1 "Parti da un ciclo hamiltoniano" non descriveva la costruzione.
Collegamento: linee piene e tratteggiate rosa con i costi 1 e 2; etichette $\ge 1$ sulle tratte; i due giri della slide 3; la freccia della slide 4 come costruzione con $B = n$. Titoli nuovi: "Dal grafo alle città", "Quando l'ottimo vale $n$".

## 58 sat-unsat-dp

Difetti: §8 (trattino lungo in "Cook–Levin"); §21.
Collegamento: notazione del disegno ($\psi$, $A$, $B$, $\varphi_x$, $\psi_x$); slide 1 le due frecce come le due condizioni; slide 3 le due scatole Cook-Levin e le equivalenze scritte sotto; slide 4 la riduzione e l'appartenenza che chiude la completezza.

## 59 altri-dp-completi

Difetti: §21; slide 2 "Questo prova l'appartenenza, non ancora la difficoltà" (§1 debole); slide 1 "Per una criticità servono" vago.
Collegamento: slide 1 descrive i due riquadri (nodo verde $B$, divieto, croce rossa, grafo modificato); slide 2 dice quale condizione va in NP e quale in coNP per ciascun tipo di problema; slide 3 la parte che codifica $\varphi$ e quella che codifica $\psi$ con la scelta di $B$; slide 4 i riquadri verde e rosso e lo stato aperto della DP-completezza.

## 60 pl-psat

Difetti: §8 ("Cook–Levin"); §21; titoli in forma "domande a L" poco chiari.
Collegamento: slide 1 e 2 dicono quale inclusione dà ciascuna traduzione; slide 3 aggiunge il conto $p(n) + p(n) \cdot q(p(n))$, che mancava. Titoli: "Traduci le domande verso $L$", "Traduci le domande verso SAT".

## 61 cd-cocd

Difetti: §21; "Scambiando i collegamenti sì e no" vago; slide 3 chiude con "Le due classi con oracolo coincidono" (§2).
Collegamento: le due macchine con frecce $x$ e yes/no; $D(x) = b$, $\overline{D}(x) = 1-b$ e il riquadro rosa "inverti" come scambio di $q_{\mathrm{YES}}$ e $q_{\mathrm{NO}}$; le due frecce della slide 3 come le due inclusioni, con il passaggio da singolo oracolo a classe.

## 62 oracoli-inutili

Difetti: §21; "Un numero polinomiale di chiamate costa ancora un polinomio" senza il conto.
Collegamento: $M^A$ e $M'$ senza oracolo; le due colonne P e NP; i due SAT e il riquadro "yes ∧ no"; la catena della slide 4 con la ragione della chiusura di $\mathrm{P}^{\mathrm{NP}}$. Aggiunto perché con un oracolo NP il trucco non si sa fare.

## 63 t17-8

Difetti: §21; didascalie dense senza riferimenti al disegno.
Collegamento: riquadro tratteggiato $y$ e graffa; frecce "guess" e "invert"; ramo verde, risposte $a_1, \dots, a_k$ e testimoni $w_1, \dots, w_m$; i due lati della verifica e il caso $i = 1$.

## 64 t17-8-cor1

Difetti: §21; "come richiesto" riempitivo; titolo "Applica il certificato esistenziale" poco chiaro, ora "Caratterizza il complemento".
Collegamento: $\overline{L}$ dentro $\Sigma_i^{\mathrm{P}}$; la graffa sotto $R$; la negazione che trasforma $\land$ in implicazione, con il ruolo del limite su $|y|$.

## Discrepanze fra disegno e matematica

- 63 t17-8, slide 3: la freccia verso i testimoni $w_1, \dots, w_m$ parte da un ramo grigio diverso dal ramo verde evidenziato. Nella prova i testimoni sono quelli delle risposte sì lungo lo stesso ramo accettante. La didascalia dice la cosa giusta e non descrive da dove parte la freccia.
- 64 t17-8-cor1, slide 2 e 3: il disegno scrive "$\overline{L} \in \Sigma_i^{\mathrm{P}} \iff \exists y(\dots)$" e "$L \in \Pi_i^{\mathrm{P}} \iff \neg\exists y(\dots)$". A destra c'è una condizione su $x$, quindi a sinistra dovrebbe esserci $x \in \overline{L}$ e $x \in L$. La didascalia usa $x \in \overline{L}$ e $x \in L$.
- 60 pl-psat, slide 3: la "Macchina $\mathrm{P}^L$" manda domande tradotte sia a $L$ sia a SAT. Una macchina con oracolo $L$ non ha bisogno di tradurre le domande per $L$: il disegno mescola i due versi della simulazione. La didascalia dice solo che le domande passano per "traduci" e dà le due inclusioni.
- 51 prop-a, slide 3: il riquadro scrive "time(R) = time(R)", mentre nella spiegazione le riduzioni sono in spazio logaritmico. Non è falso, ma misura la cosa sbagliata. La didascalia parla del costo della stessa funzione e dello spazio logaritmico.
- 50 validity-conp, slide 3: il complemento di SAT è scritto "¬SAT", con il simbolo della negazione di formula usato nella slide 2. Può far credere che VALIDITY sia il complemento di SAT, che è proprio l'errore tipico della spiegazione. La didascalia precisa che lì ¬ indica il complemento.
- 59 altri-dp-completi, slide 2: "condizione 1 → certificato NP, condizione 2 → verifica coNP" vale per l'ottimo esatto, ma per i problemi critici la prima condizione della slide 1 (fallimento originale) è la parte coNP. La didascalia rende esplicito l'ordine per ciascun tipo.
- 52 prop-b e 62 oracoli-inutili (frecce "$\le_p$"), 57, 59 e 60 ("trasformazione/riduzione polinomiale"): il disegno parla di riduzioni polinomiali, la spiegazione di riduzioni in spazio logaritmico. Per questi risultati vanno bene entrambe, quindi è solo una differenza di notazione.
- 61 cd-cocd: il disegno usa $D$ come singolo linguaggio oracolo e $\overline{D}$ come suo complemento, mentre l'enunciato usa $D$ come classe di oracoli e $\mathrm{co}D$. La slide 3 passa da un oracolo alla classe.
- 48 e 49, solo notazione: il disegno usa $D[i,w]$ e $p_i$ (la spiegazione $V(w,i)$ e $w_{i+1}$), e "dimensione combinatoria $|I|$" (la spiegazione la lunghezza $|x|$). Le didascalie seguono il disegno.
- Ritagli: i pannelli 62 slide 4, 63 slide 1 e 63 slide 2 mostrano in basso una striscia del pannello vicino (con il suo numero). Non riguarda la matematica, ma è visibile se il sito usa lo stesso ritaglio.
