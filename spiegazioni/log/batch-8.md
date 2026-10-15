# Batch 8 (teoremi 82-93)

File: 82-t20-1, 83-nexp-completi, 84-fo-indecidibile, 85-2sat-p-completo, 86-riepilogo-p, 87-np-pp, 88-pp-pspace, 89-bpp-inclusioni, 90-bpp-errore, 91-bqp, 92-bqp-2exp, 93-grover-np.

## Invocazioni delle skill

- `anthropic-skills:learn`: invocata una volta all'inizio con lo strumento Skill, caricata sì. Argomento: spiegazioni statiche in Markdown per uno studente, adattate come in STRATEGIA.md, senza domande all'utente. Dalla skill ho tenuto: diagnosi dei prerequisiti (domande di controllo con risposte in `<details>`), spiegazione diretta per concetti nuovi, esempio svolto parallelo, visuale (tabella o blocco di codice) solo dove c'è una struttura, errori tipici; controllo passo per passo della matematica.
- `humanizer` (v3.1.0, `.claude/skills/humanizer/`): invocata 12 volte con lo strumento Skill, una per file, in modalità file (argomento = percorso del file). Caricata sì tutte le volte (la prima con le istruzioni complete, le altre come re-invocazione con le stesse istruzioni e il nuovo argomento). Per ogni file: segnati i difetti, scritta la riscrittura, ricontrollata (fatti aggiunti o persi, ricerca di §1, §2, §6, §8, §19), scritta nel file solo la versione finale.

## Difetti segnati da humanizer e modifiche

### 82-t20-1
- §1 contrasto "Il trucco non è cambiare la macchina, ma cambiare il linguaggio" (Il problema): riscritto come affermazione, "Si lascia quindi la macchina com'è e si cambia il linguaggio".
- §2 chiusura "Il numero di passi è identico, è cambiato il metro" (risposta 2): tolta.
- §3 "tutto il teorema sta in quel cambio di metro": diventato "La dimostrazione usa solo questo: contare gli stessi passi rispetto a una lunghezza diversa".
- §2 chiusura dopo la tabella "Le stesse computazioni cambiano classe a seconda di quale lunghezza si guarda": sostituita con una frase che indica a quali righe si applica l'ipotesi.
- §25 "La dimostrazione fa tre passi.": tolta.
- §7 tre paragrafi di "Dove si inciampa" aperti con "Si ...": aperture variate. "fase 1 di M", mai definita nel testo, riscritta ("far lavorare $M'$ direttamente su $x$"); "siamo in EXP" (chiusura) diventato "che in EXP è permesso".

### 83-nexp-completi
- §25 "La dimostrazione completa è omessa; qui si segue lo schema": tolta.
- §2 chiusure "C_x lavora su numeri di 20 bit, non su un milione di celle" (anche §1, coda negativa), "Il modello di un elemento basta.", "È proprio lì che sta il costo.": fuse nelle frasi precedenti o tolte.
- §2 frammento "Si sa: no.": fuso in una frase con la motivazione.
- §19 (forma senza grassetto) e §7: paragrafi aperti a etichetta "Sta in NEXP." / "È NEXP-difficile." in tutte e due le sezioni: riformulati ("Per stare in NEXP basta...", "La difficoltà viene da Cook-Levin", "Un algoritmo in NEXP...", "Per la difficoltà si riduce...").
- "I due problemi vengono da mondi diversi..., ma": spezzato in due frasi senza contrasto.

### 84-fo-indecidibile
- §25 e regola del sito: "La dimostrazione è omessa nel corso; qui si segue lo schema" (rimando al corso): tolta.
- §1 contrasto diviso "'Indecidibile' non vuol dire che... Vuol dire che...": riscritto come affermazione diretta più un fatto ("Di molte formule particolari si sa benissimo se sono valide").
- §11 (debole) "Si mette Ax come premessa": riscritto con soggetto esplicito. "La soddisfacibilità ha la situazione rovesciata" reso concreto ("con i ruoli di sì e no scambiati").

### 85-2sat-p-completo
- §12 "Inoltre 2-SAT è NL-completo" (frase appiccicata): fusa nel paragrafo.
- §4 "Un caso concreto:": tolto, la frase su PRIMES comincia dal fatto.
- §2 chiusura "e niente di più": tolta.
- Ripetizione fra sezioni: il discorso sulle riduzioni polinomiali era già nella risposta 1; nella sezione finale ora rimanda a quella risposta.
- §7 due paragrafi aperti con "Si ...": riscritti. Il blocco di codice è rimasto invariato.
- Dopo humanizer, per lunghezza (era 638 parole): i due paragrafi di "Dove si inciampa" fusi in uno, senza cambiare contenuto.

### 86-riepilogo-p
- §13 "due risultati famosi": tolto l'aggettivo.
- §25 "Qui si segue lo schema delle prove, senza i dettagli" e regola del sito ("il corso usa senza dimostrarli"): riscritto senza rimando al corso.
- §1 "sembra polinomiale, ma lo è in N, non nella lunghezza": il contrasto corregge un errore vero, quindi tenuto ma asciugato ("è polinomiale in N, e quindi esponenziale nella lunghezza dell'input").
- §19 (forma) e §7: aperture a etichetta "Sta in P." / "È P-difficile": riformulate. Tre paragrafi di "Dove si inciampa" aperti con "Si ...": variati.
- Correzione di contenuto: "Per PRIMES la riduzione non c'è" diceva troppo; ora "una riduzione del genere non è nota".

### 87-np-pp
- §3 "la dimostrazione si gioca tutta su quel 'più della metà'": sostituito con il fatto ("il caso esattamente metà è quello in cui la nuova macchina rifiuta").
- §1 coda negativa "metà precisa, non di più": tolta.
- §2 chiusura "Solo a metà esatta 'almeno uno' diventa 'più della metà'": tolta.
- §7 aperture "Non si capisce", "Si pensa", "Si dà per scontato": variate.

### 88-pp-pspace
- §2 chiusura "si risparmia spazio pagando in tempo" (ripeteva la frase prima): tolta.
- Ripetizione fra sezioni: il primo errore tipico ridiceva l'idea; ridotto a "Servono soltanto i due conteggi".
- §7 aperture "Si pensa" / "Si conclude": variate. §11 "quelle celle si cancellano" diventato attivo ("$M$ cancella quelle celle").

### 89-bpp-inclusioni
- §25 "Conviene mettere le condizioni in fila" (descrive la tabella): tolta.
- §7 e §6 tre paragrafi di "Dove si inciampa" aperti con "Si ...": il primo ("Si cerca una costruzione. Non ce n'è") ripeteva la sezione sull'idea ed è stato tolto; gli altri due riformulati.

### 90-bpp-errore
- §4 aperture "Conviene dare un nome al margine." e "Il motivo è questo:": tolte, le frasi partono dal contenuto.
- §3 "Per la teoria conta altro:": riscritto ("Per la classe BPP interessa che...").
- §1 "in PP 'ripetere non serve'. Serve, ma...": corregge un errore vero, riscritto senza la messa in scena.
- §7 e §6 tre paragrafi aperti con "Si ...": variati. La nota sulla lettera $\varepsilon$ è rimasta (§25 ammette una convenzione che il lettore non può dedurre).
- Dopo la scrittura ho corretto una svista della riscrittura: "lo diventa anche il tempo" (avrebbe detto tempo esponenzialmente piccolo) è ora "il tempo diventa esponenziale".

### 91-bqp
- §25 "La prova è omessa; qui si segue lo schema": tolta.
- §3 e §1 "L'inclusione dà un tetto, non dice che il tetto sia basso": riscritto ("l'inclusione limita BQP dall'alto, senza dire quanto in basso stia").
- §7 e §6 tre paragrafi aperti con "Si ...": variati.
- Correzioni di contenuto: "PP è molto più grande di BPP" non è dimostrato, ora "si pensa che sia molto più grande"; "divisa per un fattore enorme, il numero di tutte le coppie" era vago, ora "lo scarto tra run yes e no è una frazione esponenzialmente piccola del numero totale di run".
- "Se la prima risposta non ti tornava, fermati:": "fermati" tolto.

### 92-bqp-2exp
- §1 "Non è una congettura, è dimostrato": riscritto come affermazione; il confronto con la congettura su NP resta solo in "Dove si inciampa".
- §20 titolo a effetto "Gli anelli della catena" (e la stessa metafora in "i primi anelli"): diventato "Le inclusioni una per una"; la frase finale dice quale inclusione è stretta.
- §7 aperture "Si confonde" / "Si pensa": variate.

### 93-grover-np
- §2 chiusure "e niente di più", "Si risolvono istanze circa doppie." (ripeteva 30 contro 60), "L'esponente si dimezza, la forma resta la stessa.": tolte o fuse nella frase precedente.
- §7 e §6 tre paragrafi aperti con "Si conclude" / "Si immagina" / "Ci si preoccupa": variati.

## Buchi minimi colmati

- 82: perché serve un simbolo nuovo $\sqcap$ (distinguere $x$ dal riempimento); perché lo si legge come blank; perché la lunghezza è proprio il budget di $N$; il cambio di metro (domanda 2); tabella numerica con $|x| = 10$, $k = 1$, $l = 2$; perché il controllo della forma è necessario; perché l'argomento non va "verso il basso".
- 83: perché $C'_x$ è regolare (ogni cella dipende da tre celle della riga precedente, i predecessori si ottengono sottraendo 1); misura concreta ($1024 \times 1024$ celle, numeri di 20 bit); perché gli $\exists$ diventano costanti (vengono prima dei $\forall$); perché restringere il modello conserva le formule universali; esempio "Ada conosce tutti"; perché le tabelle sono esponenziali (arietà che cresce con la formula, $2^{20}$); perché il prefisso conta; perché un problema NEXP-completo non si riduce a uno in P.
- 84: perché il controllo di una dimostrazione è meccanico; perché $\mathit{Ax}$ va come premessa; perché non basta cercare un modello o un contromodello (modelli solo infiniti); tabella "sì arriva / no arriva".
- 85: perché le riduzioni in spazio logaritmico e non polinomiali; perché NL è chiuso per queste riduzioni (ricalcolo dei simboli); esempio del grafo delle implicazioni con quattro clausole; perché $\mathrm{NL} \subseteq \mathrm{P}$.
- 86: perché la divisione per tentativi è esponenziale (100 cifre decimali = 333 bit, circa $10^{50}$ divisori); verifica dell'identità con $N = 5$ e $N = 4$; perché ridurre modulo $X^r - 1$; quadrati ripetuti ($\log N$ moltiplicazioni); perché Ford-Fulkerson con cammini qualsiasi non è polinomiale (capacità in binario); direzione delle riduzioni.
- 87: perché si standardizza (contare i run = misurare probabilità); "esattamente metà" non è maggioranza; tabella con $p(n) = 3$; perché il blocco deve essere esattamente metà; margine $1/2 + 1/2^{p(n)+1}$ e perché PP non serve a risolvere SAT a caso.
- 88: $2^m$ ha $m + 1$ cifre; un run è deterministico fissate le scelte; perché il lavoro sta in $n^c$ celle; esempio con $n^c = 3$ e contatori binari; ordine di grandezza con $n^c = 100$.
- 89: tabella delle soglie P, BPP, PP; macchina deterministica che fa le scelte e le ignora; variante con $2/3$ e $1/3$.
- 90: probabilità di esecuzioni indipendenti (domanda 2); tabella degli errori esatti con 1, 3, 5, 7 esecuzioni e conto per 3; perché il numero è dispari; Chernoff è largo (bastano 19 ripetizioni per l'1%, con 75 l'errore vero è circa $1{,}6 \cdot 10^{-6}$); $\delta$ contro $\varepsilon$; perché le ripetizioni devono essere indipendenti.
- 91: ampiezze che prima si sommano e poi si elevano al quadrato (domanda 1); perché $Q$ tiene le scelte (reversibilità, niente interferenza); verifica numerica di $(P_c - M_c)^2$ con $P_c = 2$, $M_c = 1$; perché la costruzione porta in PP e non in BPP.
- 92: definizione di 2-EXP; perché una macchina che si ferma non ripete configurazioni; $n^3 \le 2^n$ da $n = 10$; perché un problema 2-EXP-completo non sta in BQP; quale inclusione della catena è stretta.
- 93: numero di candidati $c^{n^k}$; errore unilaterale (il "sì" non sbaglia mai); come si assorbe $q(n)$ in $c'$; radice di un esponenziale ancora esponenziale; esempio KNAPSACK con $n = 60$ ($2^{60}$ contro $2^{30}$, 30 contro 60 oggetti a parità di budget); caso senza certificato.

## Dubbi ed errori nei dati del sito (non corretti)

1. Soglie di BPP incoerenti: enunciato e prova di `bpp-inclusioni` e `bpp-errore` usano $3/4$ (errore $1/4$), ma lo storyboard di `bpp-inclusioni` ("Confronta le soglie": $2/3$ e $1/3$) e quello di `bpp-errore` ("sbaglia con probabilità al più $1/3$") usano $2/3$. Non è una contraddizione matematica (la soglia è convenzionale), ma lo studente vede due definizioni; in 89 ho aggiunto una frase sulla variante $2/3$.
2. `bpp-errore`, prova (punto 6) e quindi la formula ripresa: la lettera $k$ indica sia il numero di ripetizioni sia l'esponente di $n^k$ nella stessa formula ($k \ge \ln(1/\varepsilon) \cdot 2^{2n^k+1}$). In 90 ho scritto il numero di run come $2^{p(n)}$ per evitare l'ambiguità.
3. `bqp-2exp`, frase d'esame: il ragionamento su ontologie OWL2 è indicato come problema 2-EXP-completo. Per quanto ne so, il ragionamento in OWL 2 DL (logica SROIQ) è N2EXPTIME-completo (Kazakov, 2008); la conclusione "non sta in BQP" resta vera, ma l'etichetta "2-EXP-completo" andrebbe verificata. Nella spiegazione non ho usato l'esempio.
4. Rimandi a lezioni e materiali dentro i dati: la prova di `bqp-2exp` cita "della Lezione 6" e "slide Lez. 6", quella di `2sat-p-completo` "dispensa cap. 12", quella di `bpp-errore` "Le slide chiamano $\varepsilon$..." (in prima persona), e l'enunciato di `riepilogo-p` comincia con "Il riepilogo della dispensa elenca...". Nelle spiegazioni non compaiono.
5. KNAPSACK: in `problems.ts` l'obiettivo di valore si chiama $K$, nella prova di `grover-np` si chiama $V$. Ho seguito la prova ($V$).
6. `grover-np`: l'enunciato dà tempo $O(c^{n^k/2})$, ma la prova arriva a $O(c'^{\,n^k/2})$ con una base $c' \gt c$ per assorbire il verificatore $q(n)$. In 93 ho detto che la $c$ dell'enunciato va letta come costante opportuna.
7. `nexp-completi`, riduzione da SUCCINCT CIRCUIT SAT a Schönfinkel-Bernays: lo schema non dice come si impone che le variabili universali prendano solo i valori 0 e 1 e che le due costanti siano distinte, visto che manca l'uguaglianza. Probabilmente è un dettaglio lasciato fuori dallo schema; ho seguito lo schema senza aggiungerlo.
8. `t20-1`: lo storyboard usa $2^{p(n)}$ e $N^k$, la prova $2^{n^k}$ e $|y|^l$. Solo notazione.
9. `2sat-p-completo`, enunciato: "PRIMES si riduce a 2-SAT in spazio logaritmico solo se $\mathrm{PRIMES} \in \mathrm{NL}$" è corretto, ma vale anche il viceversa (2-SAT è NL-completo), quindi sarebbe un "se e solo se". Non è un errore.

## Controlli finali (STRATEGIA, "Controlli prima di consegnare")

- `grep -n '[—–]\|\*\*'` su tutti i 12 file: nessun risultato.
- `$` bilanciati: numero pari in ogni file, nessuna riga con `$` in linea spaiato (blocchi `$$` esclusi), blocchi `$$` pari. Virgolette curve: nessuna.
- H1 uguale al campo `nome` di `theorems.ts` e posizione NN uguale all'ordine nel file: verificati con uno script per tutti i 12.
- Nessun rimando a corso, lezioni, dispensa, slide, capitoli o pagine (grep).
- Numeri degli esempi ricontrollati (a mano e con Python): 1014 simboli $\sqcap$ e $1024^2 = 2^{20}$ (82); $2^{20}$ celle e righe di tabella (83); 333 bit e $10^{50}$, espansioni di $(X+1)^4$ e $(X+1)^5$ (86); 9 e 11 su 16, $9/16 = 1/2 + 1/16$ (87); contatori $101$, $011$, $1000$, $2^{100} \approx 1{,}27 \cdot 10^{30}$ (88); errori $10/64$, $106/1024$, $1156/16384$, $k = 37$, 19 ripetizioni esatte, $1{,}57 \cdot 10^{-6}$ con 75 (90); coppie $9 = 5 + 4$ (91); $n^3 \le 2^n$ da $n = 10$ (92); $2^{60} \approx 1{,}15 \cdot 10^{18}$, $2^{30} \approx 1{,}07 \cdot 10^9$ (93).
- Ricerca delle tracce sopravvissute (contrasti, chiusure, parole gonfiate): restano due contrasti in 84 e 91 in cui entrambe le metà portano informazione, lasciati.
- Parole (`wc -w`, come per Savitch): 82: 772, 83: 944, 84: 724, 85: 622, 86: 774, 87: 511, 88: 498, 89: 397, 90: 755, 91: 845, 92: 441, 93: 595. Sopra le indicazioni di STRATEGIA: 85 (proposizione breve, ma include l'argomento $2\text{-}\mathrm{SAT} \in \mathrm{NL}$ con l'esempio), e di poco 87 e 88.
