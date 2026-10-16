# Didascalie degli esempi illustrati dei problemi: log della riscrittura

Problemi: tutti i 36 del manifesto `problemi-illustrati.json`, 108 slide. Output in `scratchpad/illustrate/out/problemi-illustrati.json` (stesso numero e ordine di slide, outcome e note mai null nel manifesto e quindi mai null nell'output). Nessun file in `src/` o `public/` è stato modificato.

## Invocazione della skill

| skill                                    | invocazioni                       | caricata |
| ---------------------------------------- | --------------------------------- | -------- |
| `humanizer` (`~/.claude/skills/humanizer/`) | 1, all'inizio, prima di scrivere | sì       |

Le istruzioni sono rimaste caricate per tutta la sessione. Per ogni problema ho fatto i quattro passi: segnare i difetti nei testi esistenti (titoli, didascalie, outcome, note), riscrivere, ricontrollare (fatti aggiunti o persi, poi §1, §2, §6, §8, §19), versione finale. Ho guardato tutti i 108 disegni con Read, ingrandendo con un ritaglio quelli dubbi (SAT 3, KNAP 3, COTSP 3, SUCC 1 e 2).

Controlli automatici sull'output: JSON valido; nessun —, –, “, ”, ’ (apostrofi resi dritti), `**`, "Attenzione", "Vediamo", "Ecco"; `$` bilanciati; titoli da 2 a 6 parole; didascalie da 26 a 62 parole (media 41), al più 4 frasi; stessi id e stesso numero di slide di `src/data/problems/walkthroughs.json`.

## Difetti ricorrenti nei testi di partenza

- §8 trattini lunghi nei nomi dei cammini ($A$–$B$–$C$) in COL2, IS, COTSP, EXACT: sostituiti da archi $AB$, elenchi $A, B, C, D$ o frecce $\to$.
- §21 apostrofi curvi (’) in titoli, didascalie e note: resi dritti.
- §2 chiuse che ripetono il passo appena descritto ("Entrambi i controlli riescono", "la formula è valida" dopo averlo già detto): tolte o fuse con la frase precedente.
- Didascalie che descrivevano il passo ma non il disegno: in ogni slide ho aggiunto che cosa si vede (nodi, colori, segni di spunta, croci, barre, tabelle, interruttori) e che cosa significa, con i dati esatti dell'istanza.
- Titoli fuori misura: "Concludi" (1 parola), "Prova a passare da una componente all'altra" e "Cerca il valore universale che la smentisce" (7 parole), "Concludi l'assenza" ed "Escludi il budget" (vaghi).

## Per problema

### REACH
- §11/§12 nessuno; manca il collegamento col disegno → S1: arco curvo $A \to C$, bordo blu di partenza e arrivo; S2: il disegno segue la strada verso $D$ ($A$, $C$ e due archi verdi, $B$ grigio); S3: archi grigi non usati.
- Nota: "algoritmo risolutivo" → "per trovarlo basta una visita del grafo".

### SAT2
- S3: la frase sulle componenti del grafo delle implicazioni era contorta e il disegno non mostra il grafo → tolta (la nota già lo dice); in S2 le due frecce del disegno sono indicate come archi del grafo delle implicazioni.
- S2: spiegata la coppia di interruttori spenti barrata in rosso ($x = y = 0$, esclusa dalla prima clausola).

### COL2
- §8 "$A$–$B$–$C$–$D$–$A$" → archi $AB$, $BC$, $CD$, $DA$.
- S2: aggiunto l'ordine della propagazione e perché il ciclo pari si chiude senza conflitti (collega alla nota sui cicli dispari). S3: archi verdi con spunta.

### MAXFLOW
- S2: i due pallini su ogni arco = 2 unità; aggiunta la capacità residua (1 su $s \to a$ e $b \to t$). S3: ellisse tratteggiata = taglio, archi rossi = archi che lo attraversano, perché nessun flusso supera 4.

### LP
- §11 nota "non si impone che i valori siano interi" → forma attiva.
- S1: quale retta è quale vincolo e che $y \ge 0$ ha per bordo l'asse. S2: lati compresi perché le disuguaglianze non sono strette. S3: $(2, 1)$ sta sul lato obliquo e il vincolo ammette l'uguaglianza.

### PRIMES
- Titolo "Concludi" → "Concludi che 7 è primo".
- S1: pallini = unità di 7, input di 3 bit (collega alla nota sulla lunghezza binaria). S2: buco minimo "perché fino a $\sqrt{7}$" e lettura delle tre coppie verdi più il pallino rosso ($7 = 3 \cdot 2 + 1$).

### HORN
- S1: il pallino grigio con la freccia è il fatto $x$, le frecce sono le implicazioni, interruttori spenti = atomi a 0. S3: spunta sotto gli atomi letta clausola per clausola; aggiunto che l'istanza non ha clausole negative (collega alla nota).
- Nota: "segnalerebbe insoddisfacibilità" → "che la formula è insoddisfacibile".

### SAT
- S2: ogni clausola ridisegnata come porta OR con NOT sui letterali negati; interruttori. S3: letterale vero per ogni clausola; tenuta la distinzione fra verifica del candidato e decisione dell'istanza (vincolo del README).

### SAT3
- S2: spiegato perché è evidenziato solo $y$ anche se nella seconda clausola sono veri pure $\neg x$ e $\neg z$. S3 §2: "Entrambe valgono 1, quindi..." fuso in una frase.

### MAX2SAT
- S3: "ciascuno rende vera esattamente una quantità di tre clausole" (frase sgrammaticata) → lettura della tabella: righe = $xy$, colonne = clausole, un cerchio rosso per riga.
- S2: le clausole elencate nell'ordine del disegno, che differisce da S1.

### CIRCUITSAT
- S2: valori che avanzano da sinistra a destra (ordine topologico della nota). S3: l'1 verde all'uscita.

### CLIQUE
- §1 nota "non soltanto la connessione del sottografo": tenuta la correzione (errore reale), detta in forma diretta.
- S2: "$D$ non serve alla soluzione" → perché: è collegato solo a $C$.

### IS
- §8 "$A$–$B$" e "$A$–$B$–$C$" → archi e "percorso che passa per $B$". Tenuto il contrasto di S3 (indipendente non vuol dire isolato: errore reale).

### NC
- §1 nota "non tutti i vertici visitati" (contrasto con un'idea poco chiara, "visitati" non c'entra) → "i vertici non scelti non devono essere coperti a loro volta".
- S1: il numero 1 nel disegno è il budget $K = 1$. S2: perché proprio il centro.

### HP
- S1: arco $AC$ curvo. S2: numeri nei vertici = ordine. S3: arco $AC$ grigio non usato.

### TSPD
- S1: il riquadro "B 10" è il budget, non la città $B$. S3: la barra che si ferma prima della tacca del 10.

### COL3
- S1: i tre pallini colorati a destra sono i colori disponibili; perché due non bastano.

### IP
- §1 nota tenuta (LP contro IP è un errore reale), con "vincoli di interezza".
- S2: elencati i sei punti interi della regione, non solo $(2, 1)$. S3: i tre segni di spunta = i tre vincoli.

### KNAP
- §2 S3 "Entrambi i controlli riescono" → tolto; le due barre lette come peso e valore.
- S2: perché $C$ resta fuori (da solo vale 5, con un altro oggetto supera il peso 5).

### VALIDITY
- Nota riformulata in forma diretta. S2: due copie del circuito per $x = 0$ e $x = 1$. S3: gli ingressi dell'OR sono $x$ e $\neg x$ (vedi discrepanze).

### COSAT
- S1: interruttore, due riquadri, porta AND. S3: uscite rosse = 0; il segno di spunta grande è il sì di co-SAT.

### COHP
- Titoli S2 e S3 accorciati e resi specifici. S2: il tratteggio verso la croce rossa è il passo mancante. S3: perché ogni cammino tocca al più due vertici.

### COTSP
- §8 "$A$–$B$–$C$–$A$" → frecce. S1: tolto "Questa volta", che rimandava all'esempio di un altro problema; chiarito budget $B$ contro città $B$.
- Titolo S3 "Escludi il budget" → "Nessun giro entro il budget".

### SATUNSAT
- S1: i due circuiti. S3: le due copie di $\psi$ con $z = 0$ sopra e $z = 1$ sotto, uscita AND grigia = 0.
- Nota: "entrambe necessarie" → "e servono entrambe".

### EXACT
- §8 nel nome del giro. S1: il 9 fra parentesi quadre è il valore $B$, non la città. S2: le due caselle (NP spuntata, coNP vuota) collegate ai due controlli.

### QSATi
- S1: $x_0$, $x_1$ = rami $x = 0$, $x = 1$; foglie grigie da calcolare. S3: aggiunto perché il ramo $x = 0$ fallirebbe ($y = 0$).

### COQSATi
- Titolo S2 accorciato. S2: foglie di $y_1$ grigie perché non serve calcolarle. S3: da dove viene la foglia 1 ($\neg(x \land 0) = 1$).

### SC
- §1 nota tenuta (minimale per inclusione contro cardinalità minima: errore reale), riformulata.
- S2: doppio bordo verde = insieme scelto. S3: i due riquadri = togliere una società alla volta.

### COSC
- S1/S2: le etichette goods1 e goods2 del disegno collegate alle merci 1 e 2; elencati gli insiemi ammissibili.

### CIRC
- §1 nota "non soltanto il loro numero" → "per inclusione, non per il loro numero".
- S1: i quattro riquadri sono i quattro assegnamenti, quello vuoto barrato perché non soddisfa $p \lor q$. §2 S3: chiusa che ripeteva → "basta un solo modello minimale".

### QSAT
- S1: colori dei livelli ed etichette dei rami. §2 S3: "Quindi la QBF è vera" fuso nella frase precedente.

### GEO
- S1: il pallino verde è la pedina. S3: i due alberi affiancati, con spunta e croce.

### SB
- Nota: "permette la proprietà del modello finito" → detto per esteso.
- S1: il disegno è lo schema generale (dominio da scegliere, tabella di $R$). S2: cappio $R$ e tabella 1 per 1.

### SUCC
- S1: numeri colorati e frecce verso il circuito descritto. S3: aggiunto il caso $x = 1$, che sostiene l'outcome "produce sempre 1".

### FOV
- S1: i riquadri sopra e sotto = modelli con domini di grandezze diverse. §2 S3: tolta la frase finale sul certificato, già nella nota.

### FOS
- S3: $U$ nel disegno è il dominio.

## Discrepanze fra disegni e dati

Le didascalie descrivono l'elemento corretto e non quello sbagliato.

- SAT, slide 3 (`p-SAT-3`): i pallini davanti alle NOT hanno il colore del letterale e non della variabile (secondo riquadro: ingresso $x$ blu con $x = 1$; terzo: ingresso $y$ verde con $y = 0$, $z$ blu); nel terzo riquadro la scritta $\neg y$ è blu anche se $\neg y$ è vero.
- SAT, slide 2 (`p-SAT-2`): nei riquadri i nomi delle variabili sono colorati per posizione (prima verde, seconda blu), così "NOT x" è verde anche se è falso. Ambiguo più che sbagliato.
- VALIDITY, slide 3 (`p-VALIDITY-3`): gli ingressi dell'OR sono etichettati $x_0$ e $x_1$, come se fossero due variabili; sono $x$ e $\neg x$.
- COSAT, slide 3 (`p-COSAT-3`): stesso problema, gli ingressi dell'AND sono etichettati $x_0$ e $x_1$ invece delle clausole $x$ e $\neg x$.
- COTSP, slide 3 (`p-COTSP-3`): nel triangolo di destra l'arco $AB$ ha due punte, $AC$ nessuna e $CB$ una; nella slide 2 lo stesso giro è $A \to C \to B \to A$.
- SUCC, slide 1 (`p-SUCC-1`): la NOT ha un suo pin d'ingresso, non collegato a $x$, quindi il circuito disegnato ha due ingressi indipendenti; i dati dicono $\mathrm{NOT}(x)$.
- SUCC, slide 2 (`p-SUCC-2`): il filo verso l'ingresso $x$ parte dal numero 1, mentre per i dati l'ingresso $x$ è la porta 0.
- KNAP, slide 3 (`p-KNAP-3`): la carta di $C$ mostra un terzo numero illeggibile sotto la croce, oltre a 4 e 5.

Ambiguità minori, gestite nella didascalia:

- TSPD, COTSP, EXACT: il budget si chiama $B$ come la città $B$ (nei dati e nel riquadro "B 10"); la didascalia lo chiarisce.
- COSC: le merci sono etichettate in inglese (goods1, goods2).
- IP, slide 2: i punti interi ammissibili $(1, 1)$ e $(2, 0)$ sono grigi, i vertici verdi; possono sembrare non ammissibili, perciò la didascalia elenca tutti e sei i punti.
- COL2, slide 1: i vertici sono già riempiti dello stesso blu usato come colore nella slide 2; la didascalia della slide 1 non nomina il colore.
- REACH, slide 2: $B$ non è segnato come visitato anche se è un successore di $A$; il disegno mostra la strada verso $D$ e la didascalia la descrive così.
- MAX2SAT, slide 2: le clausole sono in un ordine diverso dalla slide 1 (seconda e terza scambiate); la tabella della slide 3 segue l'ordine della slide 1.
