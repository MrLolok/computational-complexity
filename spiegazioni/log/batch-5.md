# Batch 5: log della riscrittura

File: 47-knapsack, 48-knapsack-pseudopoly, 49-strong-np, 50-validity-conp, 51-prop-a, 52-prop-b, 53-prop-c, 54-prop-d, 55-p-np-conp, 56-p-in-np-conp, 57-exact-tsp-np-hard, 58-sat-unsat-dp.

## Invocazioni delle skill

| Skill                                                   | Invocazioni                                                                                                                  | Caricata       |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `anthropic-skills:learn`                                | 1, all'inizio, con l'argomento "spiegazioni statiche in Markdown adattate come dice STRATEGIA.md, niente domande all'utente" | sì             |
| `humanizer` (`.claude/skills/humanizer`, modalità file) | 12, una per file, nell'ordine 47 → 58                                                                                        | sì, tutte e 12 |

Da learn ho tenuto quello che STRATEGIA.md chiede per il testo statico: domande di controllo con risposte in `<details>` (omesse in 51 e 56, dove non ci sono prerequisiti veri da verificare), spiegazione diretta, esempio piccolo svolto quando rende visibile il meccanismo (47, 48, 50, 51, 52, 53, 57, 58), tabella o blocco di codice dove c'è una struttura (47 cifre degli insiemi, 48 tabella della programmazione dinamica, 57 varianti di TSP e costi dei giri), sezione "Dove si inciampa di solito".

Per ogni file humanizer è stato eseguito nei quattro passi (segnare, riscrivere, ricontrollare, versione finale); nel file c'è solo la versione finale.

## Difetti segnati da humanizer e modifiche

### 47-knapsack.md

- §4 apertura a effetto "La parte nuova è la difficoltà." → frase diretta su che cosa serve ("una somma deve fare il lavoro di un vincolo combinatorio").
- §4 domanda retorica "Perché basta?" → "Basta perché queste sono istanze di KNAPSACK".
- Rimando implicito al corso ("Le riduzioni viste finora") → tolto (regola del sito, testo che si regge da solo).
- §19 etichette all'inizio dei punti in "Dove si inciampa" ("Confondere lunghezza e valore.") → frasi complete.
- Ripetizioni fra sezioni: la differenza valore/lunghezza stava nella risposta, nella frase dopo, nel conto e negli errori → tolta dalla risposta e dagli errori, dove ora resta solo il rapporto con l'algoritmo $O(nW)$.
- Formula di $K$ riscritta come nei dati ($(n+1)^0 + \dots + (n+1)^{3m-1}$); titolo dell'esempio da "perché non la base 2" (a effetto) a "in base 5 e in base 2".

### 48-knapsack-pseudopoly.md

- §4/§25 "Bisogna capire come funziona e perché..." (il testo annuncia sé stesso) → la sezione dice subito la tensione: se fosse polinomiale avremmo P = NP.
- §3 "Il punto è a che cosa si confronta questo tempo." → "L'input però è lungo circa $n \log W$...".
- §4 "Un numero dà l'idea." → tolto, l'esempio numerico parte direttamente.
- §19 etichette negli errori → frasi complete.
- §1 coda negativa "non con $W$" e ripetizione del conto nel primo errore → l'errore ora dice una cosa nuova: $n$ e $W$ hanno lo stesso ruolo nella formula ma pesano diversamente nella lunghezza.

### 49-strong-np.md

- §19 etichette negli errori → frasi complete.
- §2 chiusura vaga "E anche questo vale sotto l'ipotesi..." (referente ambiguo) → riscritta: con numeri piccoli KNAPSACK è facile senza ipotesi, che non sia forte vale a meno che P = NP (sistemato anche nella rilettura finale).
- Ripetizione "dove sta la difficoltà" fra definizione ed errori → la definizione dice "è difficile anche quando nessun numero è enorme", l'errore dice solo che cosa misura la definizione.

### 50-validity-conp.md

- §4 "Per la difficoltà basta ancora meno." → "Qui la riduzione non va nemmeno modificata."
- §2 chiusure brevi "Non serve altro spazio." e "VALIDITY e SAT sono legati dalla negazione della formula." → fuse nelle frasi precedenti.
- §3 metafora debole "Il ponte con SAT" → "VALIDITY e SAT sono collegati da un'equivalenza".
- Ripetizione fra la sezione HAMILTON PATH COMPLEMENT e il primo errore (VALIDITY non è il complemento di SAT) → tenuta solo nell'errore, con il confronto con HAMILTON PATH COMPLEMENT.
- §19 e §7 tre errori aperti dalla stessa etichetta all'infinito ("Credere...", "Preoccuparsi...", "Concludere...") → frasi complete con aperture diverse.

### 51-prop-a.md

- §2 paragrafo di chiusura dopo la prova ("Il motivo è che...") che ripeteva l'argomento a parole → spostato in alto come risposta al dubbio "sembra troppo comodo".
- §19 etichetta nell'errore ("Invertire la direzione.") → frase completa.

### 52-prop-b.md

- §3 leggero "trasforma questa intuizione in una prova" → "permette di dimostrarlo".
- §4 annuncio "Ci sono due cose da mostrare." → fuso con le due affermazioni da provare.
- §19 etichette negli errori → frasi complete.

### 53-prop-c.md

- §2 paragrafo dopo i passi ("Il passo 2 porta il problema...") che ripeteva il piano già detto → tolto; il piano resta in una frase prima della prova.
- §19 etichette negli errori → frasi complete.

### 54-prop-d.md

- Ripetizione fra "Che cosa dice" ("porta con sé tutta la classe", anche §3 come metafora) e il secondo errore → tenuta solo nell'errore, detta in modo preciso (la prima inclusione richiede che tutta la classe si riduca a quel problema).
- §19 etichette negli errori → frasi complete.

### 55-p-np-conp.md

- Ripetizione fra sezioni: la catena $\mathrm{NP} = \mathrm{P} = \mathrm{coP} = \mathrm{coNP}$ con la spiegazione di ogni uguale era già la prova, e "Le due inclusioni" la ripeteva → sezione tolta.
- §4 "Con SAT si vede bene." → "Prendi la macchina per SAT che...".
- §4 leggero "Il 'si ferma sempre' conta:" → "Serve che $M$ si fermi sempre".
- §19 etichetta nell'errore → frase completa.

### 56-p-in-np-conp.md

- §2 chiusura "Mettendo insieme le due parti..." che ripeteva l'enunciato → tolta.
- §19, §6 e §7: tre errori paralleli aperti da etichette all'infinito → tenuti tutti e tre (contenuti distinti) ma con struttura e aperture diverse.

### 57-exact-tsp-np-hard.md

- §2 leggero "L'esempio mostra anche perché..." (frase che nomina ciò che l'esempio ha mostrato) → riscritta come affermazione diretta su HAMILTON CYCLE contro HAMILTON PATH.
- §19 etichetta nell'errore ("Chiamarlo NP-completo.") → frase completa.
- §8: il grafo "$a$–$b$–$c$" dei dati non è stato ripreso; l'esempio usa due grafi su 4 nodi senza trattini.

### 58-sat-unsat-dp.md

- §19 etichette negli errori → frasi complete.
- Ripetizione: il secondo errore (segno della seconda formula) ripeteva quasi alla lettera il paragrafo su $R_2$ → tolto, e il paragrafo su $R_2$ ora termina dicendo esplicitamente che la seconda formula deve essere quella insoddisfacibile.
- Ripetizione fra la seconda risposta di controllo e il primo errore ("non si sa se stia in NP o in coNP") → resta solo nell'errore, riferita a SAT-UNSAT.

## Buchi minimi colmati

- 47: perché basta il caso particolare $v_i = w_i$, $K = W$ (è un insieme di istanze di KNAPSACK); perché proprio la base $n+1$ (una cifra della somma conta insiemi scelti, al più $n$) e perché non basta una base piccola anche se gli insiemi hanno 3 elementi; esempio con riporti in base 2 su insiemi di 3 elementi ($7 + 37 + 19 = 63 = K$, elemento 3 scoperto); perché la riduzione è polinomiale pur con numeri esponenziali; numero concreto ($m = 10$, $n = 99$: $K \approx 10^{58}$, 193 bit); perché non contraddice l'algoritmo $O(nW)$.
- 48: lunghezza dell'input $\approx n \log W$; perché la ricorrenza è corretta (un resto non ottimo si sostituisce con uno migliore); $V(w,0) = 0$ per ogni $w$ (zero oggetti, qualunque limite); esempio con tabella completa; numero concreto ($W = 10^{18}$, 60 bit, circa $10^{20}$ caselle, più di tremila anni a $10^9$ caselle al secondo); perché $n$ e $W$ pesano diversamente nella lunghezza.
- 49: perché un polinomio calcolato in un polinomio resta un polinomio (esempio $q(a,b) = ab$, $p(n) = n^2$ dà $|x|^3$); perché nei problemi su grafi e formule la restrizione con $p(n) = n$ non toglie istanze; lettura per contrapposizione dell'enunciato.
- 50: perché una formula valida non ha un certificato corto ovvio ($2^k$ assegnamenti); perché $\varphi$ valida $\iff \neg\varphi$ insoddisfacibile; perché $R'$ sta in spazio logaritmico; esempio con UNSAT e riduzione identità; perché la negazione serve per VALIDITY e non per HAMILTON PATH COMPLEMENT (la formula $x$ non sta né in VALIDITY né in UNSAT); perché la perdita della CNF non è un problema.
- 51: perché la stessa $R$ funziona (una riduzione manda i NO in NO); il costo resta lo stesso; esempio HAMILTON CYCLE / TSP(D) e complementi.
- 52: il complemento del complemento è il linguaggio di partenza; esempi UNSAT e HAMILTON PATH COMPLEMENT; perché coNP non è "fuori da NP".
- 53: definizioni di chiusura e di $\mathrm{co}C$; perché non è immediato (ipotesi su $C$, tesi su $\mathrm{co}C$); esempio con UNSAT/SAT; differenza fra chiusura rispetto alle riduzioni e chiusura per complemento.
- 54: dove entra l'ipotesi che $C$ sia chiusa; perché la seconda inclusione segue dalla prima applicata ai complementi; perché serve un problema completo (P sta in $\mathrm{NP} \cap \mathrm{coNP}$ senza conseguenze).
- 55: perché ogni uguale della catena vale; perché serve che la macchina si fermi sempre; perché lo scambio di risposte fallisce per NP, con la macchina per SAT che diventa una macchina per le formule non valide; uso per contrapposizione.
- 56: lettura con i certificati della prima inclusione; perché lo scambio vale solo per macchine deterministiche; differenza fra $\mathrm{NP} \cap \mathrm{coNP}$ e DP.
- 57: perché il passaggio da TSP(D) a EXACT TSP non è banale (una risposta NO non dice se l'ottimo è sopra o sotto $B$); perché il valore 2 (basta qualunque valore maggiore di 1); esempio su 4 nodi con i tre giri e i loro costi, che mostra anche perché HAMILTON PATH non funziona; perché NP-hard e non NP-completo.
- 58: perché bisogna ridurre il complemento di $L_2$ (le riduzioni a 3-SAT esistono per NP); perché $R$ sta in spazio logaritmico; esempio con EXACT TSP scritto come intersezione di TSP(D) con budget $B$ e del complemento con budget $B - 1$.

## Numeri degli esempi ricontrollati

- 47: cifre di $S_2 + S_3 + S_4$ = 1 1 0 2 2 3; in base 2 $\{4,5,6\} = 7$, $\{1,4,6\} = 37$, $\{2,5,6\} = 19$, somma 63 = $111111_2$; trovato con una ricerca esaustiva sulle terne di $\{1,\dots,6\}$. $K$ per $m = 10$, $n = 99$: $1{,}01 \cdot 10^{58}$, 193 bit (calcolato).
- 48: tabella calcolata con uno script: righe 000000, 003333, 003447, 003457; $V(5,2) = 7$, $V(4,3) = 5$, $V(5,3) = 7$.
- 57: costi dei tre giri su 4 città rifatti a mano per $G_1$ (4, 6, 6) e $G_2$ (5, 6, 7).

## Lunghezze finali (parole, `wc -w`, formule incluse)

47: 851 · 48: 665 · 49: 442 · 50: 621 · 51: 337 · 52: 362 · 53: 363 · 54: 312 · 55: 336 · 56: 247 · 57: 717 · 58: 582.

47 supera la fascia dei teoremi medi: l'ho trattato come riduzione con gadget numerico (fascia 700-1000).

## Controlli prima di consegnare

- `grep -n '[—–]\|\*\*'`: nessun risultato su tutti i 12 file.
- `$` bilanciati riga per riga (fuori dai blocchi di codice): sì su tutti i file.
- Virgolette curve: nessuna.
- Nessun rimando a dispensa, slide, lezioni o capitoli.
- Riletti cercando contrasti, chiusure, elenchi di tre e grassetti: i contrasti rimasti correggono errori reali (VALIDITY non è il complemento di SAT, coNP non è "fuori da NP", il teorema non va al contrario).

## Dubbi ed errori nei dati (non corretti)

1. `theoremWalkthroughs.json`, `knapsack`: le slide 2 e 3 riducono da SUBSET SUM, mentre `theorems.ts` (intuizione) e `theoremProofs.json` riducono da EXACT COVER BY 3-SETS. Non è una contraddizione (SUBSET SUM è il caso particolare $v_i = w_i$, $K = W$), ma lo storyboard salta il passaggio dagli insiemi ai numeri, che è il cuore della prova, e SUBSET SUM non compare fra i problemi del sito.
2. `theoremProofs.json`, `knapsack`, passo 4: l'esempio dei riporti in base 2 usa insiemi di 2 e 3 elementi su un universo di 4, quindi non un'istanza di EXACT COVER BY 3-SETS. Come illustrazione dei riporti funziona; nella spiegazione ho usato un esempio con insiemi di 3 elementi.
3. `theoremProofs.json`, `knapsack-pseudopoly`, passo 5, e `prop-d`, paragrafo finale: contengono commenti sulla dispensa ("La dispensa parla di peso 'esattamente $w$'...", "La dispensa ottiene il passo 3 passando per la Proposizione B..."), in contrasto con la regola di non commentare le correzioni alle fonti.
4. `knapsack-pseudopoly`: la prova usa $V(w, i)$ e "colonna precedente", lo storyboard usa $D[i,w]$ e "riga precedente". Ho seguito la notazione $V(w,i)$ della prova, con la tabella a righe $i$.
5. `prop-c`, `prop-d`: nome ed enunciato usano $C$, la prova e la frase da esame usano $\mathcal{C}$. Ho usato $C$, come nel titolo.
6. `prop-d`: la prova ottiene $\mathrm{co}C \subseteq C$ con la Proposizione A e la chiusura di $C$; lo storyboard applica la prima inclusione ai complementi. Sono entrambe corrette; ho usato la seconda, più breve.
7. `sat-unsat-dp`: l'enunciato chiede "3 letterali per clausola", la definizione di 3-SAT in `problems.ts` dice "al più 3 letterali"; la voce SATUNSAT di `problems.ts` chiama la seconda formula $\psi$ invece di $\varphi'$ e non menziona la CNF. Differenze minori.
8. `strong-np`, enunciato: "Tutti gli NP-completi del capitolo" contiene un rimando a un capitolo. Nella spiegazione non l'ho ripreso.
