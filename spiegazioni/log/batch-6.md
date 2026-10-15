# Batch 6: log della riscrittura

File: 59-altri-dp-completi, 60-pl-psat, 61-cd-cocd, 62-oracoli-inutili, 63-t17-8, 64-t17-8-cor1, 65-t17-8-cor2, 66-t17-9, 67-cor-collasso-primo, 68-circ, 69-t17-10.

Metodo: `spiegazioni/STRATEGIA.md`, modello `26-savitch.md`. Fonti lette per ogni teorema: `src/data/theorems.ts`, `src/data/theoremProofs.json`, `src/data/theoremWalkthroughs.json`; definizioni da `src/data/classes.ts` (DP, DELTA2, SIGMA2, SIGMAi, PIi, PH) e `src/data/problems.ts` (SATUNSAT, EXACT, QSATi, COQSATi, CIRC, COSAT, CIRCUITSAT). Non ho usato `spiegazioni/prima-passata/`.

## Invocazioni delle skill

| skill | invocazioni | caricata |
|---|---|---|
| `anthropic-skills:learn` | 1, all'inizio del batch, con l'argomento "spiegazioni statiche in Markdown, adattate come dice STRATEGIA.md, niente domande all'utente" | sì |
| `humanizer` (modalità file) | 11, una per file, dopo la bozza: 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69 | sì, tutte e 11 (skill di progetto in `.claude/skills/humanizer/`) |

Di learn ho tenuto quello che STRATEGIA prevede per un testo statico: domande di controllo con risposta in `<details>`, spiegazione diretta, un esempio piccolo svolto, tabelle dove c'è una struttura, "Dove si inciampa di solito". Per humanizer ho seguito i quattro passi (segnare, riscrivere, ricontrollare, versione finale) e nel file c'è solo la versione finale.

## Per file: difetti segnati da humanizer e modifiche

### 59-altri-dp-completi

- §25 (il testo parla di sé): "La dimostrazione completa non serve: qui si segue lo schema" → sostituita con la frase sul contenuto: la prova ha due parti, appartenenza per tutti e schema della difficoltà per EXACT TSP.
- §7 (aperture ripetute): tre paragrafi di fila cominciavano con "Per EXACT TSP", "Per CRITICAL SAT", "Per i due problemi sui grafi" → aperture variate.
- §2 (chiusa dopo l'esempio): ""Critica" chiede che ogni clausola serva..." dopo l'esempio di CRITICAL SAT → fusa nella spiegazione dell'esempio come definizione del termine.
- §1 (contrasti): "UNIQUE SAT non è 'non DP-completo'" e "DP non è NP ∩ coNP" → riscritte come affermazioni dirette.
- §11: "Si parte da una coppia" → "La riduzione parte da una coppia".
- Al ricontrollo finale: il primo errore tipico ripeteva la spiegazione del "per ogni" di CRITICAL SAT (regola "niente ripetizioni") → ora dice solo il fatto nuovo, perché "per ogni assegnamento" non si può trattare allo stesso modo; tolto il paragrafo DP contro NP ∩ coNP per lunghezza.

### 60-pl-psat

- §4 (preambolo): "fa esattamente quello che fa $M$, tranne un punto:" → "copia $M$ passo per passo. Quando...".
- §1 + §2: ultimo paragrafo "La traduzione non cambia il numero di domande... Cambia solo la stringa" era un contrasto spezzato che ripeteva "Il conto" → tolto.
- Tenuti di proposito due contrasti che correggono errori reali: "l'argomento di $q$ è $p(n)$ e non $n$", "NP-completo, non solo in NP".

### 61-cd-cocd

- §2 + §3 (chiusa a effetto): "Con l'oracolo, quella difficoltà sparisce dentro la scatola" → tolta; "sarebbe tutt'altra cosa" sostituito con il fatto preciso (servirebbe decidere un problema coNP con una macchina NP).
- §3 (aforisma): "Il 'co' sull'oracolo non è il 'co' sulla classe" → "Complementare l'oracolo e complementare la classe sono operazioni diverse".
- §2 (ripetizione): ultimo paragrafo sulla chiusura per complemento di $D$ ripeteva l'enunciato → tolto.
- §2: "Passo dopo passo le due computazioni coincidono" dopo la tabella → fusa nella frase successiva.
- Al ricontrollo: la mia riscrittura aveva introdotto "non solo sulla prima domanda" (§1) → corretto in "su ogni domanda"; il secondo errore tipico ripeteva l'uguaglianza dell'esempio → ridotto a $\mathrm{coNP}^{\mathrm{NP}} = \Pi_2^{\mathrm{P}}$.
- Fuori da humanizer: "UNSAT" → "co-SAT", il nome del problema sul sito.

### 62-oracoli-inutili

- §6 (triade annunciata): "La proposizione mette insieme tre fatti." → tolta, i tre fatti restano.
- §3 (formula vaga): "Con un oracolo NP la situazione cambia" → "Per un oracolo NP la stessa domanda è aperta".
- §11 (soggetto mancante): "In totale fanno ... passi" → "In totale $M'$ fa al più ... passi".
- §2 + ripetizione: ultimo paragrafo degli errori ("L'oracolo è NP e la macchina è NP...") ripeteva la sezione sull'oracolo NP e chiudeva con "Con un oracolo NP le risposte 'no' sono il problema" → tolto.
- Al ricontrollo: "accetterebbe anche quando la risposta vera è sì" (troppo forte) → "potrebbe accettare proseguendo con una risposta sbagliata"; "non sa fare questa esclusione, a meno che NP = coNP" → "sa farla solo se NP = coNP", che è esatto.

### 63-t17-8

- §2 (chiusa che ripete): "Il livello sale proprio perché dopo l'esiste viene un controllo di tipo per ogni" → tolta, il punto era già nella frase prima.
- Verso "se": mancava la conclusione esplicita → aggiunto "e dunque $L \in \Sigma_i^{\mathrm{P}}$".
- Affermazione troppo forte: "di una frase con 'nessuno' non esiste una prova corta" → "non si conosce in generale una prova corta".
- Prima di humanizer: corretto un refuso LaTeX (`\mataslrm`).

### 64-t17-8-cor1

- §25 + §2: "Il corollario è il Teorema 17.8 letto sul complemento, quindi le due risposte bastano." → "Se una delle due non ti tornava, rileggi l'enunciato del Teorema 17.8: il corollario lo applica al complemento."
- Formula vaga: "Con 'per ogni' succede il contrario" → "Con 'per ogni' quelle coppie contano".
- Al ricontrollo ho trovato un errore matematico nell'esempio di co-SAT: la relazione della bozza ("$y$ è un assegnamento che non soddisfa $\varphi$") escludeva anche le stringhe corte che non sono assegnamenti, quindi il "per ogni" sarebbe fallito anche con il limite. Ora l'esempio usa la relazione che dà davvero la costruzione: "$|y| \le |\varphi|$ e $y$ non è un assegnamento che soddisfa $\varphi$".
- "il controllo scende da $\Pi_{i-1}^{\mathrm{P}}$ a $\Sigma_{i-1}^{\mathrm{P}}$" → "passa da": il livello è lo stesso.

### 65-t17-8-cor2

- §2: il paragrafo di una frase "In pratica il livello di un problema è il numero di blocchi..." ripeteva l'enunciato → fuso nel paragrafo precedente, senza "In pratica".
- Il resto non aveva difetti da segnare: la tabella per $i = 3$ e i due errori tipici aggiungono ciascuno un fatto.

### 66-t17-9

- §2 (chiusa a effetto): "L'ipotesi riguarda un solo livello, la conclusione infiniti livelli." → tolta.
- §4 (preambolo): "L'ipotesi cambia le cose:" → "Con l'ipotesi $\Pi_i^{\mathrm{P}} = \Sigma_i^{\mathrm{P}}$ il controllo su $R$ sta anche in $\Sigma_i^{\mathrm{P}}$".
- §25: "Con $i = 1$ i passi sono questi:" → "Con $i = 1$, cioè con l'ipotesi $\mathrm{NP} = \mathrm{coNP}$:".
- §1 (coda negativa) e imprecisione: "La gerarchia non diventa P, a meno che il livello sia 0" (il teorema vale per $i \ge 1$) → "che in generale non è P: con $i = 1$, per esempio, PH diventa NP".

### 67-cor-collasso-primo

- §7 e tono drammatico: "Finché nessuno dimostra..., nessuno può dimostrare..." → "Dimostrare che PH è una vera gerarchia vorrebbe dire dimostrare anche queste due disuguaglianze, che sono aperte".
- §1 (coda negativa) e autocorrezione: "non segue P = NP, o almeno non si sa ... diventa NP, e non P" → "non si sa ricavare P = NP ... dà PH = NP, e PH = P resta aperto".
- Al ricontrollo: "quindi" ripetuto due volte nella stessa frase → corretto.

### 68-circ

- §3 (frase a effetto): "Il 'per ogni $y$' lo fa la minimalità." → "è affidato alla minimalità".
- Paragrafo troppo lungo con i due versi della riduzione → diviso in due.
- Al ricontrollo: il verso "ogni $y$ soddisfa $\varphi$ ⇒ $T$ è un modello" parlava di "un $T'$ più normale" e poi concludeva $T' = T$; ora prende un $T'$ che accende solo atomi già accesi in $T$, e la conclusione è corretta.
- Prima di humanizer: nella tabella dell'esempio la giustificazione di $\{x, y, y'\}$ era incompleta (spegnere $y$ e $y'$ insieme viola $y \lor y'$, non l'implicazione) → "spegnendo uno o più atomi si viola una formula di $\mathit{KB}$"; descrizione di CIRCUIT SAT allineata a `problems.ts`.

### 69-t17-10

- §25: la tabella dei blocchi stava dopo il paragrafo che la spiegava e faceva da riassunto → spostata prima, come struttura da leggere ("Resta da contare i blocchi, e qui conta la parità di $i$").
- Rimando sbagliato: "per il paragrafo precedente" (la sezione sul complemento è più su) → "per quanto visto sul complemento".
- Prima di humanizer: avevo scritto che QSAT "non sta in un livello fissato della gerarchia, a meno che la gerarchia collassi", fatto non supportato dai dati → "è PSPACE-completo, e non si sa se stia in PH", come in `classes.ts`.
- Fuori da humanizer: "Teorema di Cook" → "Teorema di Cook-Levin", il nome sul sito.

## Buchi minimi colmati

- 59: perché basta ridurre SAT-UNSAT (le riduzioni si compongono); perché "togliendo una qualsiasi clausola" sta in NP ($m$ casi, lista di $m$ assegnamenti); perché un giro di costo $B$ non certifica l'ottimo; perché si raddoppiano le distanze per $\varphi'$ (quattro casi distinti, scarto come numero binario di due cifre); perché "per ogni assegnamento" resta nella parte coNP ($2^n$ casi); esempio $(x) \land (\neg x)$ contro $(x) \land (\neg x) \land (y)$.
- 60: perché al più $p(n)$ domande lunghe al più $p(n)$; perché $q(p(n))$ e non $q(n)$; conto con $p(n) = n^2$, $q(m) = m^3$ ($n^8 + n^2$); perché serve la completezza e non solo l'appartenenza a NP.
- 61: perché lo scambio non costa niente (risposta in un passo, scambio nella tabella di transizione); perché non equivale a complementare un calcolo NP; differenza fra $\mathrm{NP}^{\mathrm{coNP}}$ e $\mathrm{coNP}^{\mathrm{NP}}$.
- 62: perché in $\mathrm{NP}^{\mathrm{P}}$ il sottoprogramma va bene su ogni ramo; perché l'esecuzione in linea fallisce con un oracolo NP (le risposte "no"); perché $\mathrm{P}^{\mathrm{NP}} \subseteq \Pi_2^{\mathrm{P}}$ (chiusura per complemento); differenza fra le due domande di DP e le domande polinomiali e adattive di $\mathrm{P}^{\mathrm{NP}}$; esempio con $\varphi = x \lor y$, $\psi = x \land \neg x$.
- 63: che cosa vuol dire $x;y$; perché si interroga il complemento $\overline{A}$; perché il certificato non contiene niente per le risposte "no"; perché una congiunzione polinomiale di controlli $\Pi_{i-1}^{\mathrm{P}}$ resta in $\Pi_{i-1}^{\mathrm{P}}$; perché il controllo è $\Pi$ e non $\Sigma$; esempio con $i = 2$ su SAT-UNSAT, con la tabella risposta/certificato/controllo.
- 64: perché con "per ogni" il limite $|y| \le |x|^k$ va scritto; esempio su co-SAT; perché il controllo passa a $\Sigma_{i-1}^{\mathrm{P}}$.
- 65: tabella dello srotolamento per $i = 3$; perché $Q$ dipende dalla parità; come si rileggono gli argomenti $(x;y_1, \ldots)$; perché le lunghezze restano polinomiali ($(|x|^{k_1})^{k_2}$); si contano i blocchi, non i quantificatori; esempio $\exists p\, \forall q\, \exists r$ verificato.
- 66: una sola inclusione basta (complementando); perché senza ipotesi non si semplifica; perché $S'$ ha lo stesso controllo; lunghezza di $y;z$; perché $\Delta_{i+1}^{\mathrm{P}}$ collassa; perché l'induzione sale; tabella per $i = 1$; il collasso va solo verso l'alto.
- 67: perché "anche solo"; perché P è chiusa per complemento e lo scambio non funziona con il nondeterminismo; la catena $\mathrm{coNP} = \mathrm{coP} = \mathrm{P} = \mathrm{NP}$; la lettura al contrario.
- 68: $\lt_M$ come inclusione propria, con l'esempio $\mathit{KB} = \{p \lor q\}$ di `problems.ts`; dove stanno l'"esiste" e il "per ogni" nell'appartenenza; perché esattamente una fra $x_i$ e $x'_i$; perché un modello con $\varphi$ tiene accese tutte le $y$, $y'$; come la minimalità realizza il "per ogni $y$"; esempio $\exists x\, \forall y\, (x \lor y)$ con tabella di tre assegnamenti; CIRC VALIDITY tramite $\neg\varphi$.
- 69: perché $V$ va sotto un "esiste"; problema della parità e tabella dei blocchi; perché una difficoltà dà l'altra (stessa funzione di riduzione); esempio di negazione $\exists x\, \forall y\, (x \land y)$; $i$ fissato in $\mathrm{QSAT}_i$ contro QSAT.

## Dubbi ed errori nei dati (non corretti)

- `altri-dp-completi`: né `theoremProofs.json` né `problems.ts` definiscono CRITICAL HAMILTON PATH e CRITICAL 3-COLORING (dicono solo "dopo ogni modifica permessa", con al più $n^2$ modifiche). Non ho specificato quale modifica (aggiungere un arco, togliere un nodo...) per non inventare. Nella prova la quantità $N$ (costo ottimo $N$ o $N + 1$) non è definita; l'ho lasciata come simbolo.
- `altri-dp-completi`, `theoremProofs.json`: la dimostrazione dice "Il corso dà solo gli enunciati; qui c'è lo schema della prova standard (Papadimitriou, cap. 17)", un rimando a corso e capitolo nel testo mostrato.
- `EXACT` in `problems.ts`: la fonte dice "riduzione da HAMILTON CYCLE", mentre `theoremProofs.json` usa la riduzione da 3-SAT a HAMILTON PATH. Non è una contraddizione vera (sono due passi della stessa catena), ma i due testi non si richiamano.
- `cd-cocd`: `theorems.ts` scrive $C^D$, `theoremProofs.json` scrive $\mathcal{C}^{\mathcal{D}}$. Ho usato la notazione di `theorems.ts`.
- `pl-psat`, `theoremWalkthroughs.json`: la didascalia "Poiché L ∈ NP, Cook–Levin trasforma..." ha un trattino lungo (–) al posto del trattino del nome sul sito ("Cook-Levin").
- `t17-10`: `theoremProofs.json` e il resto dei dati scrivono "Teorema di Cook", mentre il nome del teorema sul sito è "Teorema di Cook-Levin". Nei file ho usato il nome del sito.

## Controlli finali (sezione "Controlli prima di consegnare")

- `grep -n '[—–]\|\*\*'` su tutti gli 11 file: nessun risultato.
- `$` bilanciati: controllati riga per riga con uno script (nessuna riga con un numero dispari di `$` fuori dai `$$`); `$$` in numero pari in ogni file. Le formule riprese dai dati (enunciati, catene di inclusioni, KB della riduzione) sono quelle di `theorems.ts` e `theoremProofs.json`.
- Numeri degli esempi ricontrollati a mano: 59 ($(x) \land (\neg x)$ con la lista $x = 0$, $x = 1$; tabella $+0, +1, +2, +3$); 60 ($(n^2)^3 = n^6$, totale $n^8 + n^2$); 62 e 63 ($x \lor y$ soddisfatta da $x = 1$, $x \land \neg x$ insoddisfacibile); 64 ($x \land \neg x$ falsificata da entrambi gli assegnamenti); 65 ($p = 1$; $q = 0, r = 1$ e $q = 1, r = 0$ rendono vere tutte e tre le parti); 68 (tutti i sottoinsiemi di $\{x, y, y'\}$ e di $\{x', y'\}$ violano $\mathit{KB}$; $\{x', y'\} \subset \{x', y, y'\}$ soddisfa $\mathit{KB}$); 69 ($\exists x\, \forall y\, (x \land y)$ falsa con $y = 0$, $\forall x\, \exists y\, \neg(x \land y)$ vera con $y = 0$).
- Riletti cercando le tracce che sopravvivono: contrasti, chiusure, elenchi di tre, grassetti. I contrasti rimasti correggono errori che lo studente fa davvero (per esempio "$p(n)$ e non $n$", "si contano i blocchi, non i quantificatori", "per inclusione e non contando gli atomi").
- Lunghezze (parole di prosa, formule escluse): 59: 888, 60: 478, 61: 489, 62: 620, 63: 771, 64: 429, 65: 613, 66: 536, 67: 304, 68: 947, 69: 760. Il 59 supera la fascia dei teoremi medi perché copre cinque problemi più lo schema della riduzione di EXACT TSP; 60 e 61 stanno un po' sopra le 450 parole delle proposizioni brevi.
