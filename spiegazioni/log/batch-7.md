# Batch 7: log delle skill

File: 70-strategic-companies, 71-t17-11, 72-ph-pspace, 73-cor-ph-pspace, 74-qsat-pspace, 75-co-hamilton-pi2, 76-db-queries, 77-geography, 78-go, 79-fsat-fnp, 80-fsat-sat, 81-fp-fnp.

## Invocazioni delle skill

| skill | argomento | caricata |
|---|---|---|
| `anthropic-skills:learn` | spiegazioni statiche in Markdown adattate come in STRATEGIA.md (una invocazione all'inizio, per tutto il batch) | sì |
| `humanizer` | `spiegazioni/teoremi/70-strategic-companies.md` | sì |
| `humanizer` | `spiegazioni/teoremi/71-t17-11.md` | sì |
| `humanizer` | `spiegazioni/teoremi/72-ph-pspace.md` | sì |
| `humanizer` | `spiegazioni/teoremi/73-cor-ph-pspace.md` | sì |
| `humanizer` | `spiegazioni/teoremi/74-qsat-pspace.md` | sì |
| `humanizer` | `spiegazioni/teoremi/75-co-hamilton-pi2.md` | sì |
| `humanizer` | `spiegazioni/teoremi/76-db-queries.md` | sì |
| `humanizer` | `spiegazioni/teoremi/77-geography.md` | sì |
| `humanizer` | `spiegazioni/teoremi/78-go.md` | sì |
| `humanizer` | `spiegazioni/teoremi/79-fsat-fnp.md` | sì |
| `humanizer` | `spiegazioni/teoremi/80-fsat-sat.md` | sì |
| `humanizer` | `spiegazioni/teoremi/81-fp-fnp.md` | sì |

Da learn ho preso: domande di controllo con risposta in `<details>`, spiegazione diretta (niente domande socratiche al posto della spiegazione), un esempio piccolo svolto dove rende visibile il meccanismo, tabelle o blocchi di codice dove c'è una struttura da vedere, gli errori tipici. Humanizer è stato eseguito nei suoi quattro passi (segnare, riscrivere, ricontrollare, versione finale) su ciascun file, con una invocazione per file; nel file c'è solo la versione finale. I blocchi di codice sono rimasti invariati (modalità file).

## Per file: difetti segnati da humanizer e modifiche

### 70-strategic-companies

- Ripetizione fra sezioni e §1 (coda negativa): "Minimo per inclusione: non conta quante società ha $C'$" stava sia nel problema sia negli errori. Nel problema è diventato una subordinata nella definizione ("minimo per inclusione: ... anche se magari un altro insieme che va bene ha meno società"); l'errore relativo è stato tolto.
- §3 (debole): "La DNF si adatta bene alla regola di chiusura" diventata "La forma disgiuntiva ricalca la regola di chiusura", seguita dal perché ("e" e "oppure").
- §2: il doppio "per questo ... e per questo serve l'oracolo" in chiusura dell'errore tipico ridotto a una frase sola con il fatto nuovo (serve l'oracolo).
- §7: i paragrafi degli errori iniziavano tutti con "Si ...": variati.
- Errore "direzione della riduzione" tolto: debole e ripeteva la sezione sulla riduzione.
- Passo 4 (accorciare le parti piatte): la bozza aveva 1333 parole; compressi le risposte di controllo, l'appartenenza, le due direzioni della prova e il commento all'esempio. Al ricontrollo (passo 3) la compressione aveva perso un passaggio della prima direzione (per le merci, se $y_j$ manca c'è $\neg y_j$): rimesso. Versione finale 1159 parole (conteggio `wc -w`, formule comprese), sopra l'indicazione di 1000: la prova ha due direzioni e un gadget, e non ho trovato altro da togliere senza perdere passaggi.

### 71-t17-11

- §3: "trovarlo costerebbe caro" sostituito con il fatto ("se lo si trovasse, la gerarchia si fermerebbe a un livello finito").
- §1 (contrasto spezzato): "Il teorema non dice che un problema PH-completo non esiste. Dice che..." tenuto come correzione, perché il titolo "niente problemi PH-completi" induce davvero quella lettura; riscritto partendo dal titolo. Al ricontrollo "ne esiste uno solo se" era ambiguo (uno solo / solo se): riscritto "può esistere solo se".
- §7: aperture "Si ..." variate.
- Ripetizione: il quarto errore ripeteva il punto 1 e il terzo errore; tolto.

### 72-ph-pspace

- §3/§1: "lo spazio si riusa, il tempo no" (sentenza in coda al problema) sostituita con il motivo concreto (lo spazio di un certificato si riusa per il successivo).
- §4: "fermati:" nella frase dopo le risposte, sostituito con il motivo per cui la risposta serve.
- Ripetizione fra sezioni: "un $y_2$ scartato non lascia traccia" stava nell'esempio e negli errori; tenuto solo negli errori. Il tempo esponenziale stava nel conto e negli errori; tenuto solo nel conto, con l'errore assorbito ("la proposizione non dice niente di buono sul tempo").
- §7: aperture "Si ..." variate.
- "classe ragionevole" (vago) sostituito con "problemi che richiedono più di spazio polinomiale".

### 73-cor-ph-pspace

- §4: "Il passo che sembra innocuo è il primo" sostituito con l'affermazione diretta.
- §2: "È questo che fa sembrare l'uguaglianza improbabile" in chiusura, assorbito nella frase d'apertura del paragrafo.
- Ripetizione: il paragrafo d'idea ripeteva l'elenco dei passi; ridotto a due frasi che introducono l'elenco.
- §1: "non dimostra ... Dice che" e "non è impossibile, ma" tenuti come correzioni di letture reali (credere che il corollario provi $\mathrm{PH} \neq \mathrm{PSPACE}$; rispondere "no" alla riduzione da QSAT a $\mathrm{QSAT}_3$), riscritti.

### 74-qsat-pspace

- §7: quattro errori su quattro iniziavano con "Si ...".
- Ripetizione fra sezioni: tre errori ripetevano il testo (la formula ingenua che raddoppia, la tabella del $\forall$, il tempo $2^n$ di Truth). Tolti il primo e il quarto; il secondo è rimasto con un fatto nuovo (letto come "per tutte le coppie", la formula chiederebbe che ogni configurazione porti a ogni altra in al più $2^i$ passi e sarebbe quasi sempre falsa).
- La frase sulle alternanze ($2m$, crescono con l'input) è passata dal conto all'errore su QSAT in PH, dove serve.
- Al ricontrollo (passo 3): "100 livelli di qualche centinaio di simboli" era un numero non verificato; sostituito con il conto esatto per $m = 100$ (300 variabili nuove e 400 equivalenze per livello).

### 75-co-hamilton-pi2

- §1: "Essere $\Pi_2^{\mathrm{P}}$-completo è un'altra cosa" diventata "chiede di più", seguita da che cosa chiede.
- Ripetizione fra sezioni e §7: i tre errori ("Si scambiano", "Si confonde", "Si risponde") ripetevano il problema. Riscritti in due paragrafi con fatti nuovi: che il complemento non sia $\Pi_2^{\mathrm{P}}$-completo non è dimostrato; lo stesso vale per HAMILTON PATH (che sarebbe $\Pi_2^{\mathrm{P}}$-completo solo se $\mathrm{NP} = \mathrm{coNP}$, dalla trappola in `problems.ts`).
- Tabella: cella "Perché" vuota nella seconda riga, riempita.

### 76-db-queries

- §3: "Quello che serve per leggere la tabella è che..." sostituito con l'affermazione diretta.
- §25: "Il teorema dà questa tabella:" tolto (la tabella si vede).
- §19 senza grassetto: paragrafi aperti da etichette ("Combined complexity in PSPACE.", "Data complexity in L.", ...), riscritti come frasi con verbo ("La combined complexity sta in PSPACE: ...").
- §7 e ripetizione: tre errori con "Si ...", il terzo ripeteva la sezione sulle query congiuntive; ridotti a due, con il terzo assorbito nel secondo.

### 77-geography

- §4: "Ecco una partita" (apertura vietata da STRATEGIA) sostituita.
- §19 senza grassetto: paragrafi aperti da "Le variabili.", "Le clausole.", "Chi vince."; riscritti come frasi.
- §7 e ripetizione: errori con "Si ...", il secondo ("chi sceglie la clausola") ripeteva il paragrafo sulle clausole; tolto.
- Al ricontrollo (passo 3) la mia riscrittura del primo errore aveva introdotto un contrasto con enfasi ("sembra un dettaglio ... e invece regge tutta la riduzione", §1/§13); riscritto senza enfasi. Tolta anche una ripetizione interna ("come i quantificatori" seguito da "nell'ordine dei quantificatori").

### 78-go

- §25 (debole): "Qui c'è solo lo schema della prova." spostato dentro la frase sul limite di durata, dove dice anche a quale variante si applica il teorema.
- §7 e ripetizione: il primo errore ripeteva il problema (scacchiera $n \times n$, durata polinomiale); la sua parte nuova ("non per ogni possibile insieme di regole") è passata nel problema.
- §1: "La riduzione non parte da QSAT ma da GEOGRAPHY planare" non correggeva un errore reale ed era già detto nel "Prima di leggere" e nella prova: tolto.
- Regola del sito: "Nelle slide è il nero, nella dispensa il primo giocatore" era un rimando ai materiali; riscritto senza citarli.
- Il contrasto "$n \times n$ e non $19 \times 19$" è rimasto: corregge un'idea reale.

### 79-fsat-fnp

- §19 senza grassetto: paragrafi aperti da "$R$:" e "$S$:"; riscritti come frasi.
- §25: "Qui c'è lo schema della prova." stava fuori posto dopo la definizione di riduzione; sostituito con una frase che dice di quali due parti è fatta la prova.
- §7: errori con "Si ..." variati; il primo, che ripeteva in parte la sezione sulle riduzioni, riscritto con il fatto nuovo (la NP-completezza di SAT dice che $x$ ha soluzione se e solo se $\varphi_x$ è soddisfacibile, non come passare da una soluzione all'altra).

### 80-fsat-sat

- §2: "Alla chiamata 2 il 'no' basta per fissare $x_2$ falsa senza un'altra domanda" spiegava l'esempio appena visto e ripeteva il primo errore; tolta, e l'errore ora rimanda alla chiamata 2.
- §7: le due aperture "Si ..." variate.

### 81-fp-fnp

- §19 senza grassetto: paragrafi aperti da "Prima riga." e "Seconda riga."; riscritti come frasi.
- Ripetizione: l'errore su $\mathrm{FP} \subseteq \mathrm{FNP}$ ripeteva la risposta 1 del "Prima di leggere"; tolto.
- §5: "Si confonde la prima riga con un risultato su tutti i problemi di FNP" rispondeva a una confusione che nessuno fa; assorbito nell'errore rimasto, riscritto come asimmetria fra le due righe (nella prima basta che FSAT stia in FNP, nella seconda serve che sia FNP-completo).
- Al ricontrollo: $T$ compariva senza essere introdotta; ora "se è un'assegnazione $T$ restituisce $S(T)$".

## Buchi minimi colmati

- 70: perché "non minimo" sta in NP (il certificato è il sottoinsieme); perché si parte dalla forma DNF (negazione della forma CNF, e la regola di chiusura fa da "e"/"oppure"); perché un insieme minimo ha un solo letterale per $x_i$; perché ogni letterale vero sta in $C''$ (le merci); perché il controllo una società alla volta non basta (la chiusura non è monotona, esempio con $\varphi = x \land y$).
- 71: perché ogni problema di PH sta in un livello finito (unione di livelli, alternanze fissate); perché $\Sigma_k^{\mathrm{P}}$ è chiusa rispetto alle riduzioni, con il conto $|x|^2$, $|y|^3 \Rightarrow |x|^6$; collegamento fra la strada diretta e quella con il Teorema 17.9.
- 72: perché il tempo polinomiale dà spazio polinomiale (una cella nuova per passo); come si enumerano i certificati (contatore binario, basta l'ultimo); numeri concreti (13 controlli con 4 bit; $2^{200}$ controlli con 200 bit).
- 73: perché $\mathrm{QSAT} \in \mathrm{PH}$ è implausibile (un numero fisso $k$ di blocchi per istanze con alternanze arbitrarie).
- 74: perché basta cercare cammini lunghi al più $2^m$; perché la configurazione accettante unica; perché Savitch non ha il problema del raddoppio e la formula sì; che cosa abbrevia "$A = X$" e perché costa $O(m)$; perché le alternanze crescono; numeri per $m = 100$.
- 75: perché il complemento di un NP-completo è coNP-completo (la stessa riduzione); come si arriva da $\Pi_2^{\mathrm{P}} = \mathrm{coNP}$ a $\mathrm{NP} = \mathrm{coNP}$; perché $\mathrm{PSPACE} \subseteq \mathrm{coNP}$ dà anche $\mathrm{PSPACE} \subseteq \mathrm{NP}$ (chiusura per complemento).
- 76: definizione delle tre misure; che cos'è $\mathrm{AC}^0$ (porte con un numero qualsiasi di ingressi, che serve per l'"oppure" su $n^k$ scelte); esempio di query fissa con due contatori; esempi triangolo e quattro nodi per 3-COLORING; da dove viene l'esponente ($k$ variabili).
- 77: perché si può supporre l'alternanza stretta che finisce con $\exists$ (variabili fittizie); perché i giocatori si alternano nei rombi (tre mosse per rombo, numero dispari); perché non serve un elenco dei nodi usati (sono sulla pila); a che cosa serve il raccordo $R$ (far scegliere la clausola al secondo).
- 78: perché la scacchiera è $n \times n$ (su una scacchiera fissa il problema ha dimensione costante); perché il grafo deve essere planare (la scacchiera è una griglia piana, i corridoi non si incrociano).
- 79: perché una riduzione fra function problems ha bisogno di $S$ e della condizione sul "no"; perché la relazione di FSAT è bilanciata; esempio con il cammino hamiltoniano; perché $M$ qui è deterministica.
- 80: perché si può fissare falso senza chiedere (la proprietà mantenuta); perché le formule chieste non si allungano; esempio a tre variabili con un "no".
- 81: perché $R(x)$ e $T$ hanno lunghezza polinomiale e $R$, $S$ lavorano in tempo polinomiale; perché la prima direzione usa solo FSAT e la seconda la sua completezza.

## Dubbi ed errori nei dati del sito (non corretti)

- db-queries: l'enunciato in `theorems.ts` dice che per l'algebra relazionale la data complexity è L-completa e per le query congiuntive $\mathrm{AC}^0$-completa. La prova in `theoremProofs.json` dà solo il limite superiore e avverte che la completezza dipende dal tipo di riduzioni. Le query congiuntive sono un caso particolare di quelle in algebra relazionale, e l'argomento del punto 6 (un "oppure" di "e") si estende a ogni formula del primo ordine fissata (i $\forall$ diventano "e"): con riduzioni più deboli di L la data complexity dell'algebra relazionale sta in $\mathrm{AC}^0$, quindi difficilmente è L-completa. Nel testo ho riportato la tabella come nei dati e, come la prova, ho detto che lo schema dà il limite superiore e che la completezza dipende dalle riduzioni.
- go: la prova in `theoremProofs.json` dice "Si suppone, come nella formulazione del teorema, che la partita duri un numero di mosse polinomiale", ma l'enunciato in `theorems.ts` non contiene questa ipotesi (la contiene solo lo storyboard). Inoltre la giustificazione "GEOGRAPHY planare resta PSPACE-completo perché i rombi si possono disegnare in questa forma" è semplificata: gli archi verso i nodi-letterale incrociano la catena dei rombi, e la versione planare richiede dei gadget di incrocio. Nel testo ho tenuto la formulazione dei dati ("la costruzione dei rombi si può rifare rispettando questi vincoli").
- geography: la prova dice "Dal fondo dell'ultimo rombo il secondo giocatore va su un nodo-clausola". Con l'alternanza stretta che finisce con $\exists$ (come nei dati) ogni rombo dura tre mosse, e dal fondo dell'ultimo rombo la mossa successiva tocca al primo giocatore; serve un nodo di raccordo, che i dati citano solo in generale ("nodi di raccordo"). Nel testo ho messo esplicitamente il raccordo $R$ e ho verificato le parità mossa per mossa nell'esempio.
- co-hamilton-pi2: in `theorems.ts` il campo `prova` è "omessa", mentre in `theoremProofs.json` `tipo_dimostrazione` è "completa". La prova cita "Proposizione B, cap. 14; riepilogo del cap. 22" (rimandi che non ho usato).
- qsat-pspace: la prova scrive $|\psi_m| = O(m^2)$ senza il termine $|\psi_0|$; è giusto solo se $|\psi_0| = O(m^2)$. Nel testo ho scritto $|\psi_0| + O(m^2)$, che non contraddice i dati.
- fsat-sat: lo storyboard prova prima $x_1 = 0$ (falso), la prova prima vero. Nessuno dei due è sbagliato, ma sono diversi; il testo segue la prova.
- fp-fnp: il richiamo nella prova definisce FP come "i function problem risolti in tempo polinomiale deterministico" e poi dice che $\mathrm{FP} \subseteq \mathrm{FNP}$ vale sempre. L'inclusione è immediata se FP è definito come la parte di FNP risolvibile in tempo polinomiale; nel testo l'ho presentato così. Lo storyboard dimostra la direzione $\Leftarrow$ con un argomento diverso (costruire il certificato bit per bit), che non contraddice la prova.
- t17-11: la prova passa per $\Sigma_{k+1}^{\mathrm{P}} = \Sigma_k^{\mathrm{P}}$ e il Teorema 17.9, lo storyboard conclude direttamente $\mathrm{PH} \subseteq \Sigma_k^{\mathrm{P}}$. Entrambe corrette; nel testo c'è la strada diretta, e la seconda è citata in due righe.

## Controlli prima di consegnare

- `grep -n '[—–]\|\*\*'` su tutti i 12 file: nessun risultato.
- `$` bilanciati in tutti i file (contati fuori dai blocchi di codice), `$$` in numero pari; nessuna virgoletta curva.
- H1 confrontati con il campo `nome` di `theorems.ts`: tutti uguali.
- Nessun rimando a slide, dispensa, capitoli o lezioni (grep).
- Numeri degli esempi ricontrollati a mano: 70 (sottoinsiemi di $\{x, y, \neg y, w\}$ e il controesempio $\{x, \neg y\}$ per $\varphi = x \land y$), 72 (13 controlli: 2 + 3 + 4 + 4), 74 (le quattro valutazioni di $\forall p\, \exists q$; 300 variabili e 400 equivalenze per livello con $m = 100$), 76 (6 coppie ordinate di colori diversi; triangolo sì, quattro nodi no), 77 (le 12 mosse della partita, le parità con tre mosse per rombo e il raccordo, le due varianti), 80 (le quattro chiamate e $T = (\text{vero}, \text{falso}, \text{vero})$).
- Riletti cercando contrasti, chiusure, triadi e grassetti residui: tenuti solo i contrasti che correggono un errore reale (elencati sopra per 71, 73, 78).
- Parole (`wc -w`, formule comprese): 70: 1159, 71: 503, 72: 636, 73: 294, 74: 971, 75: 420, 76: 809, 77: 966, 78: 503, 79: 664, 80: 528, 81: 443.
