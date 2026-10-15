# Revisione dei file 47-69

Revisione indipendente di `spiegazioni/teoremi/47-*.md` … `69-*.md` (23 file), scritti nei batch 5 e 6. Riferimenti: `spiegazioni/STRATEGIA.md`, il modello `26-savitch.md`, i dati in `src/data/theorems.ts`, `theoremProofs.json`, `theoremWalkthroughs.json`, `classes.ts`, `problems.ts`.

## Invocazione di humanizer

`humanizer` invocata una volta con lo strumento Skill, all'inizio della revisione: caricata correttamente (skill di progetto in `.claude/skills/humanizer/`, regole §1-§26 disponibili). Le regole sono state applicate come controllo sui testi già passati da humanizer dagli autori, con modifiche minime.

## Controlli automatici (dopo le modifiche)

- `grep -n '[—–]\|\*\*'` sui 23 file: nessun risultato.
- Virgolette curve: nessuna. Rimandi a lezioni, capitoli, dispensa, slide, corso: nessuno.
- `$` bilanciati (fuori dai blocchi di codice) e `$$` in numero pari in tutti i file.
- Contrasti "non X ma Y" rimasti: tutti in "Dove si inciampa" o in risposta a un errore reale dello studente (VALIDITY non è il complemento di SAT, coNP non è "fuori da NP", si contano i blocchi e non i quantificatori, inclusione e non conteggio in CIRC). Nessuna chiusura a effetto residua.

## Per file

### 47-knapsack.md

- §4, apertura che annuncia: "Per la difficoltà serve un'idea nuova. L'istanza di arrivo contiene solo numeri, quindi una somma deve..." → "Per la difficoltà, l'istanza di arrivo contiene solo numeri: una somma deve...".
- Imprecisione: "I numeri da scrivere sono $n + 1$ (...; i valori $v_i$ sono copie dei pesi)" → "I numeri diversi sono $n + 1$ (...; i valori $v_i$ e il limite $W$ ne sono copie)". L'istanza contiene $2n + 2$ numeri, e $W = K$ non era nominato.
- Errore nella giustificazione dello spazio: "La macchina lo scrive cifra per cifra guardando un insieme alla volta, con due contatori: la riduzione sta in spazio logaritmico" → "la riduzione si calcola in tempo polinomiale, anzi in spazio logaritmico". Con base $n + 1$, che in generale non è una potenza di 2, la scrittura binaria di $w_i$ non si ottiene scrivendo le cifre in base $n + 1$ una alla volta con due contatori. L'affermazione dei dati (spazio logaritmico) resta, il meccanismo sbagliato no.
- Imprecisione: "Il 3 limita le cifre di un singolo numero, che sono 0 o 1" → "Il 3 limita quante cifre di un singolo numero valgono 1".
- Numeri ricontrollati: cifre di $S_2 + S_3 + S_4$ = 1 1 0 2 2 3; in base 2 $7 + 37 + 19 = 63 = 111111_2$ con i riporti descritti; $K \approx 1{,}01 \cdot 10^{58}$, $\log_2 K \approx 192{,}7$, quindi 193 bit; $2^{100}$ ha 101 bit.

### 48-knapsack-pseudopoly.md

Nessuna modifica. Tabella ricalcolata (righe 000000, 003333, 003447, 003457; $V(5,2) = 7$); $10^{18}$ ha 60 bit; $101 \cdot 10^{18} \approx 10^{20}$ caselle, $10^{11}$ s, circa 3170 anni.

### 49-strong-np.md

Nessuna modifica. Esempio $q(a,b) = ab$, $p(n) = n^2$ dà $|x|^3$: corretto.

### 50-validity-conp.md

- Affermazione troppo forte: "con $k$ variabili bisognerebbe guardarli tutti e $2^k$" → "con $k$ variabili il controllo diretto deve guardarli tutti e $2^k$". Che servano tutti non è noto, e lo stesso file dice più sotto che non si sa se VALIDITY stia in NP.

### 51-prop-a.md

Nessuna modifica. L'esempio HAMILTON CYCLE → TSP(D) con $B = n$ coincide con la voce TSPD di `problems.ts`.

### 52-prop-b.md

- Calco dall'inglese e frase poco chiara: "Il complemento di un NP-completo non è noto essere NP-completo." → "Non si sa se il complemento di un NP-completo sia NP-completo."

### 53-prop-c.md

Nessuna modifica.

### 54-prop-d.md

Nessuna modifica. La seconda inclusione segue lo storyboard (prima inclusione applicata ai complementi): verificata corretta.

### 55-p-np-conp.md

- Affermazione troppo forte: "Da $\mathrm{NP} = \mathrm{coNP}$ non segue $\mathrm{P} = \mathrm{NP}$: il viceversa non è noto, e..." → "da $\mathrm{NP} = \mathrm{coNP}$ non si sa ricavare $\mathrm{P} = \mathrm{NP}$, e...". "Non segue" afferma una non-implicazione che non è dimostrata; la frase si contraddiceva con "non è noto" subito dopo.

### 56-p-in-np-conp.md

Nessuna modifica.

### 57-exact-tsp-np-hard.md

Nessuna modifica. Costi dei tre giri rifatti: $G_1$ 4, 6, 6; $G_2$ 5, 6, 7.

### 58-sat-unsat-dp.md

- Affermazione troppo forte: "un certificato corto ce l'ha solo il caso opposto, quando $\varphi'$ è soddisfacibile" → "un certificato corto si conosce solo per il caso opposto". Che le formule insoddisfacibili non abbiano certificati corti è aperto (equivale a $\mathrm{NP} \ne \mathrm{coNP}$).

### 59-altri-dp-completi.md

- Imprecisione rispetto alle definizioni del sito: "due riduzioni polinomiali in fila danno ancora una riduzione polinomiale" → "due riduzioni in fila danno ancora una riduzione". Sul sito una riduzione si calcola in spazio logaritmico (vedi 51, 58), e la composizione resta tale.
- Errore: "Un giro da $B$ da solo non dice niente sull'ottimo: bisogna anche escludere..." → "Un giro da $B$ dice solo che l'ottimo è al più $B$: escludere i giri più economici è la parte coNP." Il giro dice che l'ottimo è $\le B$; la frase originale lo negava e ripeteva la frase prima.
- Collisione di nomi: nell'esempio di CRITICAL SAT la seconda formula si chiamava $\varphi'$, lo stesso nome della seconda formula di SAT-UNSAT usata nella sezione sulla difficoltà → $\psi$.
- Tabella $+0, +1, +2, +3$ e scelta di $B$ ricontrollate; esempio $(x) \land (\neg x)$ con la lista $(x = 0, x = 1)$ corretto.

### 60-pl-psat.md

Nessuna modifica. $n^2 + n^2 \cdot (n^2)^3 = n^8 + n^2$ corretto.

### 61-cd-cocd.md

- Imprecisione: "non cambia quello che la macchina sa decidere" → "non cambia i linguaggi che si riescono a decidere". Una macchina fissata con oracolo $\overline{A}$ al posto di $A$ decide in generale un altro linguaggio: serve la macchina modificata, come spiega la sezione dopo.

### 62-oracoli-inutili.md

- Affermazione troppo forte: "un oracolo NP, a differenza di uno in P, non si può togliere" → "non si sa togliere". $\mathrm{NP}^{\mathrm{NP}} = \mathrm{NP}$ è aperto, come dice il file stesso.
- Esempio $\varphi = x \lor y$ (soddisfatta da $x = 1$), $\psi = x \land \neg x$: corretto.

### 63-t17-8.md

- Collisione di nomi nell'esempio: $\varphi = x \lor y$ con l'assegnamento "$x = 1, y = 0$", in un teorema dove $x$ è l'input e $y$ il certificato → $\varphi = a \lor b$, $\psi = a \land \neg a$, assegnamento $a = 1, b = 0$.
- Affermazione troppo forte: "Il controllo è polinomiale solo per $i = 1$" → "Solo per $i = 1$ il teorema garantisce un controllo polinomiale". Per $i \ge 2$ il controllo sta in $\Pi_{i-1}^{\mathrm{P}}$, e non si sa che non sia in P.

### 64-t17-8-cor1.md

Nessuna modifica. Relazione di co-SAT ("$|y| \le |\varphi|$ e $y$ non è un assegnamento che soddisfa $\varphi$") corretta, e corretto il ruolo del limite nel "per ogni".

### 65-t17-8-cor2.md

- Errore nella tabella dello srotolamento per $i = 3$: all'ultima riga il Teorema 17.8 applicato a $\Sigma_1^{\mathrm{P}}$ lascia un controllo in $\Pi_0^{\mathrm{P}}$, non in $\Sigma_0^{\mathrm{P}}$ (le due classi coincidono con P, ma la colonna deve dire quello che dà il teorema) → "$\Pi_0^{\mathrm{P}} = \mathrm{P}$".
- Esempio $\exists p\, \forall q\, \exists r$ ricontrollato: vero con $p = 1$ e $r = \neg q$.

### 66-t17-9.md

- Affermazione troppo forte: "$\mathrm{PH} = \Sigma_i^{\mathrm{P}}$, che in generale non è P" → "che non è detto sia P". Che $\Sigma_i^{\mathrm{P}} \ne \mathrm{P}$ è aperto.
- Tabella per $i = 1$ verificata.

### 67-cor-collasso-primo.md

Nessuna modifica.

### 68-circ.md

Nessuna modifica. Tabella dell'esempio verificata a mano: $\{x, y, y'\}$ minimale (spenta $x$ si viola $x \lor x'$, spenta $y$ o $y'$ si viola l'implicazione); $\{x', y'\} \subset \{x', y, y'\}$ soddisfa $\mathit{KB}$; $\{x', y'\}$ minimale. I due versi della riduzione coincidono con `theoremProofs.json`. Lunghezza alta (circa 860 parole di prosa) ma giustificata dalla riduzione con gadget.

### 69-t17-10.md

Nessuna modifica. Tabella dei blocchi e esempio $\exists x\, \forall y\, (x \land y)$ verificati.

## Dubbi sui dati elencati dagli autori

### batch-5.md

1. `knapsack`, storyboard da SUBSET SUM contro EXACT COVER BY 3-SETS nella prova. Fondato come incoerenza di fonte, non come errore: SUBSET SUM è il caso $v_i = w_i$, $K = W$, ma lo storyboard salta la costruzione in base $n + 1$ e SUBSET SUM non ha una voce in `problems.ts`.
2. `knapsack`, passo 4: esempio dei riporti con insiemi di 2 e 3 elementi su un universo di 4. Fondato: l'aritmetica è giusta ($3 + 5 + 7 = 15 = 1111_2$) ma non è un'istanza di EXACT COVER BY 3-SETS.
3. Commenti sulla dispensa in `knapsack-pseudopoly` (passo 5) e `prop-d` (paragrafo finale). Fondato: i due testi ci sono ancora in `theoremProofs.json`.
4. `knapsack-pseudopoly`: $V(w, i)$ e "colonna precedente" nella prova, $D[i,w]$ e "riga precedente" nello storyboard. Fondato ma minore: ciascuno è coerente con sé stesso, cambia solo l'orientamento della tabella.
5. `prop-c`, `prop-d`: $C$ nel nome, $\mathcal{C}$ nella prova. Fondato, solo notazione.
6. `prop-d`: percorsi diversi fra prova e storyboard. Non fondato come errore: ho verificato entrambi i percorsi, sono corretti.
7. `sat-unsat-dp`: "3 letterali" contro "al più 3" di 3-SAT; $\psi$ al posto di $\varphi'$ e nessuna CNF in SATUNSAT. Fondato, minore: non cambia la completezza.
8. `strong-np`, enunciato "Tutti gli NP-completi del capitolo". Fondato: è un rimando a un capitolo nel testo mostrato (anche al passo 4 della prova).

### batch-6.md

1. `altri-dp-completi`: CRITICAL HAMILTON PATH e CRITICAL 3-COLORING non definiti, $N$ non definito. Fondato: `problems.ts` non ha voci per i problemi CRITICAL né per UNIQUE SAT, e la prova non dice quale modifica è ammessa. $N$ non definito è accettabile in uno schema.
2. `altri-dp-completi`, prova: "Il corso dà solo gli enunciati; ... (Papadimitriou, cap. 17)". Fondato: rimando a corso e capitolo nel testo mostrato.
3. `EXACT` in `problems.ts` ("riduzione da HAMILTON CYCLE") contro 3-SAT → HAMILTON PATH nella prova. Non fondato: "da HAMILTON CYCLE" è nella nota delle fonti e riguarda la NP-difficoltà (teorema 57); la voce `comp` dice correttamente "riduzione da SAT-UNSAT". Sono due risultati diversi.
4. `cd-cocd`: $C^D$ contro $\mathcal{C}^{\mathcal{D}}$. Fondato, solo notazione.
5. `pl-psat`, storyboard: "Cook–Levin" con trattino lungo. Fondato (tipografico); lo stesso trattino c'è nello storyboard di `sat-unsat-dp`.
6. `t17-10`: "Teorema di Cook" nella prova e nell'intuizione, "Teorema di Cook-Levin" come nome sul sito (`theorems.ts`). Fondato.

### Altri dubbi trovati in revisione

- `t17-8-cor2` (intuizione e frase da esame) e `t17-10` (intuizione) dicono che il livello è "il numero di alternanze" dei quantificatori. Fondato, imprecisione: $\Sigma_i^{\mathrm{P}}$ ha $i$ blocchi e $i - 1$ alternanze. I file 65 e 69 parlano di blocchi, che è corretto, e si discostano dai dati per questo motivo.
