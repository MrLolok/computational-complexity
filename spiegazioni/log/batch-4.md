# Batch 4: log

Teoremi: 35-2sat-p, 36-horn-sat, 37-prop-9-1, 38-max2sat, 39-independent-set, 40-clique-nodecover, 41-hamilton-path, 42-tsp-d, 43-3-coloring, 44-tripartite-matching, 45-set-problems, 46-integer-programming.

## Invocazioni delle skill

| skill | invocazioni | caricata |
|---|---|---|
| `anthropic-skills:learn` | 1, all'inizio del batch, con l'argomento "spiegazioni statiche in Markdown adattate come dice STRATEGIA.md, nessun dialogo" | sì |
| `humanizer` (da `.claude/skills/humanizer`) | 12, una per file, in modalità file con il percorso come argomento | sì, tutte e 12 |

Da learn ho tenuto, come dice STRATEGIA.md: domande di controllo con risposta in `<details>` solo sui prerequisiti veri, spiegazione diretta (niente domande socratiche al posto della spiegazione), un esempio piccolo svolto, tabelle o blocchi quando c'è una struttura, la sezione degli errori tipici. Per ogni file humanizer è stato eseguito nei quattro passi (segnare, riscrivere, ricontrollare, versione finale) e nel file c'è solo la versione finale.

## Difetti segnati da humanizer e modifiche, file per file

### 35-2sat-p.md
- §4 "La si costruisce così." (annuncio prima del punto): fuso nella frase, con soggetto esplicito ("Per costruirla, ... l'algoritmo sceglie").
- §4 "Servono tre osservazioni." prima dell'elenco: tolto.
- §4 domanda retorica "Perché non nasce una contraddizione?": diventata affermazione ("La propagazione non crea contraddizioni.").
- §2 "In tutti e due i casi si arriva a una contraddizione." (ripete la frase prima): fuso.
- §2 "Servono tutti e due i cammini." in chiusura del primo errore tipico: tolto, ripeteva il terzo punto dell'elenco.
- §2 "Tutta la prova poggia su questa equivalenza." e "Eppure le assegnazioni possibili restano $2^n$.": fusi nella frase precedente.
- §13 "Per questo 3-SAT resta NP-completo." (conclusione più forte di quanto l'argomento mostri): sostituita con "il metodo non si estende a 3-SAT".
- §13 "nessuno sa risolverlo senza esaminare...": ridimensionato.
- §11 "si sceglie ... si rendono veri": soggetto "l'algoritmo".
- Dopo i controlli di lunghezza: tolto il terzo errore tipico (ripeteva la regola di scelta di $\ell$) e accorciato il paragrafo sulle componenti fortemente connesse.

### 36-horn-sat.md
- §4 "Il teorema dice anche di più:": frase diretta.
- §4 "Da qui le due risposte.": tolto.
- §4 domanda retorica "Perché partire da tutto falso?": affermazione, spostata prima dell'invariante.
- §2 "Conviene quindi tenere vere solo le variabili obbligate." (ripete il titolo della sezione): tolto.
- §2 chiusura dell'esempio "La formula è insoddisfacibile.": fusa.
- §1 "non vuol dire che ... sia sfortunata ... non c'è niente da ritentare" (con coda negativa): tenuta la convinzione reale dello studente, tolta la coda; poi accorciato perché ripeteva il paragrafo sulla correttezza.
- §1 diviso fra due frasi "non è l'unica ... È la minima": affermazione diretta.
- §2 "Sono facili per motivi diversi." in chiusura: fuso nella prima frase del paragrafo.
- §11 "Ogni letterale viene toccato": "L'algoritmo tocca ogni letterale".
- Precisione: nel primo errore tipico "che soddisfa le altre clausole" è diventato "che soddisfa i fatti e le regole".

### 37-prop-9-1.md
- §4/§2 frammento "I termini dell'enunciato.": fuso ("Nell'enunciato $R$ è...").
- §4 "Qui si vede a che cosa serve il bilanciamento.": "In questo conto entra il bilanciamento."
- §1 "l'esponente della relazione non è quello della macchina, ma resta una costante": affermazione diretta (circa il doppio, ed è una costante).
- §2 "Il certificato è più corto, l'idea è la stessa.": tolta la seconda metà, "più corta" fuso nella frase.
- §2 "Un verificatore che accetta certificati sbagliati non dimostra niente.": fuso e reso preciso ("non caratterizza $L$").
- Tenuto "Il certificato non lo trova il verificatore": corregge un errore reale.

### 38-max2sat.md
- §2/§3 "Il lavoro sta nella difficoltà.": "Resta da dimostrare la difficoltà, riducendo 3SAT."
- §4 domanda retorica "A che cosa serve $w$?": tolta, il paragrafo parte dal fatto.
- §1 "La difficoltà non viene dalla forma delle clausole ma dalla domanda" subito dopo la convinzione già citata fra virgolette: convinzione resa in forma discorsiva, poi affermazione diretta.
- §1 "Un gruppo con la clausola falsa non dà zero clausole vere: ne dà 6": affermazione diretta.
- Tolto "Che MAX2SAT stia in NP è facile": "MAX2SAT sta in NP".

### 39-independent-set.md
- §3 "Il ponte è questo:" e il contrasto messo in scena "Le due domande sembrano lontane": sostituiti da "Soddisfare una formula 3SAT vuol dire scegliere... La riduzione traduce questa scelta in una scelta di nodi."
- §2 "ed è giusto così": tolto, resta la ragione.
- §1 "solo letterali opposti, non tutte le occorrenze della stessa variabile": affermazione diretta più la conseguenza.
- §11 "Se invece si prendessero ... l'arco lo impedirebbe": forma diretta.
- Tenuto "$K$ è il numero di clausole, non di variabili": corregge una confusione reale.

### 40-clique-nodecover.md
- §1 "non serve una riduzione nuova da 3SAT, perché tutti e due sono INDEPENDENT SET riscritto": affermazione diretta.
- §20 titolo a effetto "Due complementi diversi": "Le due riduzioni".
- §4 frammento "Resta il "al più" del budget.": frase piena.
- Ripetizione fra sezioni (la regola di STRATEGIA, §2 a scala di sezione): "Dove si inciampa" ripeteva la sezione delle riduzioni e l'appartenenza a NP. Riscritto con un controesempio concreto ($\{B, D\}$ copre $G$ ma in $\bar G$ lascia scoperto $AC$); tolto il paragrafo sull'appartenenza a NP, già detto all'inizio.
- §2 "Scambiarli dà riduzioni sbagliate.": tolto.

### 41-hamilton-path.md
- §3 "Il lavoro della costruzione sta nel fatto che...": affermazione diretta.
- §25 "La corrispondenza fra grafo e formula è questa:" (descrive la tabella): tolta, le intestazioni bastano.
- §1 "Il lato attraversato corrisponde al letterale falso, non a quello vero. Sembra rovesciato, ma è ciò che fa funzionare il triangolo": esplicitata la convinzione spontanea, tolta la frase a effetto.
- §19 elenco con etichette all'inizio dei punti (senza grassetto): tenuto, le etichette sono i nomi dei gadget usati dopo.

### 42-tsp-d.md
- §3/§4 "Tutto si regge su un limite dal basso." (annuncio): il limite è enunciato subito, poi "Da questo limite dal basso segue".
- Ripetizione fra sezioni: la ragione "il giro si chiude sulla prima città, quindi si parte dal ciclo" stava sia in "Il problema" sia in "Dove si inciampa": tolta dalla prima.
- §2 "e questo mostra che": "quindi".
- "Tieni a mente la seconda risposta" (§4, debole): tenuta come nel modello di Savitch, legata con "perché".

### 43-3-coloring.md
- §2 "Il triangolo serve proprio a questo": riformulato.
- Ripetizione fra sezioni: l'ultimo errore tipico (i nomi dei colori non sono fissati) ripeteva il primo gadget: tolto, aggiunto "qualunque esso sia" nel gadget.
- §2 "Con quei colori dei letterali il gadget non si completa, e infatti con quei valori la clausola è falsa." (commenta l'esempio appena visto): fuso nella frase iniziale del paragrafo.
- §1 diviso "Il gadget OR non calcola l'OR. Garantisce due cose sole": convinzione reale esplicitata ("Viene da leggere il gadget come una porta OR, ma...").

### 44-tripartite-matching.md
- §13 "Il passaggio dalle coppie alle terne cambia la natura del problema: ... le scelte si intrecciano in modi che un algoritmo per le coppie non sa gestire" (gonfiato e vago): "Con le coppie il problema è facile, con le terne diventa NP-completo."
- §4 "Restano da contare le case.": tolto.
- §1 "Il valore vero corrisponde alle case lasciate libere, non a quelle occupate.": affermazione diretta.
- §1/§13 "Le coppie di raccolta non sono un dettaglio.": sostituito dalla conseguenza ("Senza le coppie di raccolta non ci sarebbe mai un matching.").
- Il blocco di codice con le terne per $k = 2$ è rimasto invariato (regola della modalità file).

### 45-set-problems.md
- §2 "In tutti e due i casi il ragionamento è un conteggio" (chiusura che ripete i due punti): spostata prima dell'elenco.
- §1 e ripetizione: "La difficoltà passa dal caso particolare al problema generale, non al contrario." ripeteva la risposta della domanda iniziale: resta solo l'applicazione concreta.
- Definizione di SET COVERING riscritta (frase contorta).

### 46-integer-programming.md
- §3 "Le due metà della prova hanno difficoltà rovesciate rispetto al solito.": frase piana ("Al contrario del solito, la difficoltà si dimostra quasi subito...").
- §1 ""Al più esponenziali" riguarda il valore, non la lunghezza.": "sembra troppo, ma si riferisce al valore".
- §1 "L'appartenenza a NP sembra ovvia e non lo è.": convinzione reale esplicitata.
- §2 frase breve "Il guaio è la lunghezza del certificato.": fusa.

## Buchi minimi colmati

- 35: clausola di un letterale come $(a \lor a)$; perché gli archi vengono a coppie (contronominale); perché esiste un letterale $\ell$ senza $\ell \leadsto \neg \ell$; perché un solo cammino $x \leadsto \neg x$ non basta; perché il metodo non passa a 3 letterali (implicazione con due premesse); legame fra i due cammini e le componenti fortemente connesse dello storyboard.
- 36: il fatto come regola con $k = 0$; perché si parte da tutto falso; perché il ciclo termina; strutture per il tempo lineare (contatori, elenchi, coda); l'assegnazione trovata è la minima; differenza fra Horn e 2-SAT.
- 37: perché serve il bilanciamento; esponente della relazione circa $2k$ contro il $k$ della macchina; perché il controllo delle configurazioni è locale e lineare; certificato alternativo fatto delle sole scelte (come nello storyboard); esempio delle formule insoddisfacibili ($2^{50}$ righe, più di un milione di miliardi).
- 38: $(x)$ come $(x \lor x)$; conteggio per righe in funzione di $t$; a che cosa serve $w$ (senza $w$: 3, 4, 4, 3); perché una $w_i$ per clausola; perché $K = 7m$ non lascia margine; un gruppo con la clausola falsa dà 6, non 0.
- 39: al più un nodo per triangolo; stesso letterale senza arco; variabili assenti da $I$ con valore qualsiasi; $K = m$; spazio logaritmico con due contatori.
- 40: il "al più" del budget (si aggiungono nodi) e $K > n$; complemento degli archi contro complemento dell'insieme, con controesempio; $\bar G$ in spazio logaritmico negando un bit.
- 41: cammino, ciclo ed euleriano; perché un triangolo non può avere tre lati attraversati; perché lato attraversato vuol dire letterale falso; a che cosa serve la chiusura.
- 42: $n$ tratte ritorno compreso; perché si parte dal ciclo e riduzione da HAMILTON PATH a HAMILTON CYCLE; perché 2 (va bene ogni intero maggiore di 1) e che cosa vuol dire "in senso forte"; perché "al più $n$" equivale a "$= n$".
- 43: perché il triangolo dà un nome ai colori; perché i letterali sono collegati a $N$; perché la propagazione di 2-COLORING non funziona con 3 colori; il gadget OR non è una funzione (controesempio); numero di nodi e archi.
- 44: perché l'anello si sistema solo in due modi, con l'esempio $k = 2$; perché ogni occorrenza ha le sue case; perché servono le coppie di raccolta (conto $6m$, $3m$, $m$, $2m$).
- 45: verso della generalizzazione; argomento di conteggio ($m$ insiemi da 3 coprono $3m$ elementi solo se disgiunti); elementi distinti nell'universo.
- 46: il vincolo di interi cambia la risposta ($2x = 1$); $0 \le x_i \le 1$ dà valori 0/1; valore esponenziale vuol dire numero polinomiale di cifre ($x_{i+1} \ge 2x_i$ obbliga $x_n \ge 2^{n-1}$, che ha $n$ cifre binarie); arrotondare LINEAR PROGRAMMING non basta (tre insiemi da 2 elementi: $3/2$ contro 2); traduzione di una clausola 3SAT presa dallo storyboard.

## Dubbi ed errori nei dati del sito (non corretti)

1. `theoremProofs.json`, hamilton-path, passo 4: il lato del letterale $x_i$ è legato con uno XOR al collegamento "$x_i$ falsa", e se ne conclude che il lato è attraversato esattamente quando il letterale è falso. Le due cose non stanno insieme: con lo XOR (esattamente uno dei due archi attraversato), se il lato è legato a "$x_i$ falsa", il lato è attraversato quando $x_i$ è vera. Perché valga la conclusione (che è quella giusta, ed è ciò che fa funzionare il triangolo), il lato di $x_i$ va legato al collegamento "$x_i$ vera" e quello di $\neg x_i$ a "$x_i$ falsa". Nella spiegazione ho scritto la versione coerente ("il collegamento della catena che rende vero quel letterale") senza commentare.
2. `theoremWalkthroughs.json`, hamilton-path, terza slide: "consentono di visitare i vertici delle clausole attraverso letterali resi veri" si può leggere come l'opposto della prova (i lati attraversati corrispondono ai letterali falsi).
3. `theorems.ts`, max2sat: l'enunciato dice "clausole con 2 letterali", ma il gruppo usa quattro clausole di un solo letterale; `problems.ts` e lo storyboard dicono "al più due". Nel testo ho scritto che $(x)$ è $(x \lor x)$.
4. `problems.ts`, NC: "esistono $K$ nodi che toccano tutti gli archi?", mentre la prova del corollario usa un budget $B$ con "al più $B$". Le due forme sono equivalenti (si aggiungono nodi), ma lettere e formulazione non coincidono.
5. `theoremProofs.json`, set-problems: la lettera $B$ indica sia l'insieme dei ragazzi nell'istanza $(B, G, H, T)$ sia il budget di SET COVERING (passo 1). Nel testo ho chiamato il budget "budget $m$" senza lettera.
6. `theoremProofs.json`, prop-9-1: la stessa $k$ serve per il tempo della macchina ($|x|^k$) e per il bilanciamento ($|y| \le |x|^k$), mentre il certificato costruito è lungo $O(|x|^{2k})$. Il passo 5 dice correttamente "polinomiale", ma la lettera ripetuta può confondere. Lo storyboard usa come certificato la sequenza delle scelte, la prova la sequenza delle configurazioni: entrambe vanno bene, nel testo ho citato tutte e due.
7. `theoremWalkthroughs.json`, integer-programming: la riduzione nello storyboard parte da 3-SAT, quella della prova da SET COVERING (non è una contraddizione). L'ultima slide dice che "un certificato intero di lunghezza polinomiale si verifica sui vincoli" senza dire che l'esistenza di una soluzione corta è proprio la parte difficile, che la prova invece sottolinea.
8. `problems.ts`, IS: "almeno $K$ vertici" contro "$K$ nodi" dell'enunciato; equivalenti, segnalo solo la differenza di forma.

## Controlli finali (sezione "Controlli prima di consegnare")

- `grep -n '[—–]\|\*\*'` su tutti i 12 file: nessun risultato. Nessuna virgoletta curva.
- `$` bilanciati in ogni riga e in ogni file; blocchi `$$` in numero pari. Le formule riprese dai dati (gruppo di MAX2SAT, terne dell'anello, $d_{ij}$, $K = 7m$, $B = n$, $B = n - K$) coincidono con quelle dei dati, salvo il punto 1 dei dubbi.
- Numeri degli esempi ricontrollati a mano: archi e cammini dell'esempio di 2-SAT; giri dell'esempio di Horn; tabella 7/6 di MAX2SAT per $t = 0..3$ e totali 14 e 13 dell'esempio; 6 archi (b) e 15 archi totali in INDEPENDENT SET; complementare $AC$, $AD$, $BD$; matrice e costi 4 e 5 di TSP(D), costo almeno 5 senza $[4, 1]$; colori della tabella di 3-COLORING e conteggi $3 + 2n + 6m$ nodi, $3 + 3n + 12m$ archi; anello con $k = 2$ e conteggio $6m$ di TRIPARTITE MATCHING; coperture da 5 e 4 elementi in SET COVERING; sistema con $B = 2$ e $B = 1$, valori $1/2$ con somma $3/2$, $2^{n-1}$ con $n$ cifre binarie; $2^{50} > 10^{15}$.
- Riletture per le tracce che sopravvivono: contrasti rimasti solo dove correggono un errore reale (verificatore e certificato, $K$ clausole e non variabili, HAMILTON CYCLE e non PATH); nessuna chiusura a effetto; i gruppi di tre rimasti sono elenchi veri (tre tipi di clausole di Horn, tre proprietà del grafo delle implicazioni, tre problemi su insiemi); nessun grassetto.
- Parole (con ogni formula contata come una parola; Savitch così conta 847): 35: 821, 36: 742, 37: 754, 38: 795, 39: 715, 40: 506, 41: 683, 42: 626, 43: 961, 44: 691, 45: 557, 46: 620.
