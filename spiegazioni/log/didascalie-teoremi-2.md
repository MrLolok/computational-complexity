# Didascalie delle dimostrazioni illustrate, gruppo 2 (teoremi 17-32)

Teoremi: 17-p-neq-exp, 18-space-hierarchy, 19-ndet-hierarchy, 20-time-in-space, 21-space-in-time, 22-t7-4a, 23-t7-4b, 24-t7-4c, 25-catena-classi, 26-savitch, 27-savitch-cor, 28-pspace-npspace, 29-composizione-riduzioni, 30-chiusura-riduzioni, 31-completo-per-due-classi, 32-completo-classe-piccola. In tutto 59 slide, tutte riscritte.

Output: `scratchpad/illustrate/out/teoremi-2.json` (JSON validato con `json.load`; 470 formule rese con KaTeX in modalità `throwOnError`, nessun errore).

## Invocazione di humanizer

- `humanizer` invocata una volta con lo strumento Skill all'inizio del lavoro: caricata sì (istruzioni complete, base directory `/home/lore/.claude/skills/humanizer`; la stessa skill è anche in `.claude/skills/humanizer/` del progetto). Le istruzioni sono rimaste caricate per tutto il gruppo.
- Per ogni teorema ho seguito i quattro passi: segnati i difetti delle didascalie del manifesto, scritta la riscrittura guardando ogni disegno, ricontrollata (fatti aggiunti o persi, nuova ricerca di §1, §2, §6, §8, §19), scritta la versione finale.
- Controlli automatici sulla versione finale: niente `—`, `–`, `**`, apostrofi o virgolette curve; `$` bilanciati; nessuna delle parole vietate da STRATEGIA.md; titoli fra 2 e 6 parole; didascalie fra 1 e 4 frasi (31-74 parole, contando una formula come una parola).

Difetti comuni a quasi tutte le slide, non ripetuti sotto:

- le didascalie non nominavano niente del disegno (curve, frecce, colori, riquadri), quindi il collegamento fra immagine e passo della dimostrazione restava allo studente;
- §21: apostrofi curvi (’) in titoli e didascalie, sostituiti con quelli dritti;
- regola del sito: classi e formule scritte in testo semplice o in Unicode (TIME($2^n$), P ⊊ EXP, C₁, ⊆): ora sono in LaTeX con `\mathrm{}`;
- notazione: dove il disegno usa nomi diversi dalla spiegazione (H invece di L, $c$ invece di $k$, A, B, C invece di $L_1, L_2, L_3$), la didascalia usa quelli del disegno, che lo studente ha davanti.

## 17-p-neq-exp

- Slide 1: nessuna traccia forte; buco: perché i valori prima di $n_0$ non contano. Aggiunti la lettura del grafico (curva verde $2^n$, linea $n^k$, incrocio in $n_0$ col tratteggio) e lo speedup lineare che assorbe la costante.
- Slide 2: "budget esponenziale più grande" vago (§14, connessione senza dire quale): scritto $2^{cn}$ come nel disegno, con il conto preciso $2^{6n+3} \le 2^{9n}$ e il motivo della freccia verde ($2^{cn} \le 2^{n^2}$ per $n \ge c$); spiegata la freccia rosa $H \notin \mathrm{TIME}(2^n)$.
- Slide 3: aggiunta la lettura degli ovali annidati e della posizione del punto $H$.

## 18-space-hierarchy

- Slide 1: §11 soggetto mancante ("Delimita ... celle"), gergo non spiegato ("simulazione universale con contatore di arresto"): ora è $D$ che segna il recinto (la fila verde) e rifiuta se ne esce; aggiunto perché serve $f(n) \ge \log n$. "Costruibile" del disegno reso con "propria", il termine dell'enunciato.
- Slide 2: "opportunamente allungata" vago (§9): detto che la coda serve solo ad allungare la descrizione, che $M$ si simula sull'intera stringa $\langle M\rangle\#x$ e che il contatore gestisce le macchine che ciclano; spiegate le due uscite 0 e 1.
- Slide 3: titolo "Distingui la macchina piccola" non diceva il passo, diventato "Il margine logaritmico basta"; "il margine logaritmico paga la codifica" (§3, figura al posto del conto): ora la somma del disegno, $c_M f(n)$ più $O(f(n))$ del contatore, contro il fattore $\log f(n)$ del recinto.
- Slide 4: §2 chiusura "L'inclusione di spazio è stretta." fusa nella conclusione con la formula; spiegati $b$ e $1-b$ come le due risposte che $M$ dovrebbe dare.

## 19-ndet-hierarchy

- Slide 1: §1 "non basta scambiare le uscite: negare..." (contrasto tenuto nel contenuto perché corregge un errore vero, ma riscritto come fatto): ora si segue l'albero del disegno, con il ramo rosso che dopo lo scambio diventa accettante, e si dice quanto costa controllare tutti i rami.
- Slide 2: §11 soggetto mancante ("copia la risposta"): ora è $D$; spiegato perché copiare è facile per una macchina nondeterministica e che cosa collegano le frecce verdi.
- Slide 3: "molto più grande" vago: detto "esponenzialmente più grande" e perché ($2^{n^c}$ passi restano polinomiali in $m$).
- Slide 4: "si usa anche la chiusura nondeterministica per complemento" (§14 vago, e "anche" fuorviante): nominato il teorema di Immerman e Szelepcsényi e detto che per lo spazio il ritardo non serve; letta la riga di $b$ e la casella rossa $1-b$.

## 20-time-in-space

- Slide 1: nessuna traccia forte; aggiunti la cella verde, le frecce "≤ 1" e l'esempio dei 50 passi e 51 celle.
- Slide 2: "Questo prova" lasciato; aggiunti il conto per nastro, perché $k$ è costante e la compressione lineare.
- Slide 3: titolo "Comprendi il raffinamento" vago, diventato "Dividi in blocchi e ricalcola"; §1 "invece dell'intera storia" (contrasto X invece di Y) tolto; gergo "simulazione a blocchi e ricalcolo delle dipendenze" spiegato con blocchi di $b$ celle, intervalli di $b$ passi e circa $N/\log N$ risultati tenuti in memoria (il riquadro tratteggiato).

## 21-space-in-time

- Slide 1: aggiunta la lettura della tupla (stato $q$, nastro con testina, puntini per il resto) e perché la posizione sull'input sta in $O(f(n))$.
- Slide 2: "il futuro si ripete identico" (figura leggera) sostituito dalla catena $C_0 \to C_3$ e dalla freccia rossa che torna a $C_1$.
- Slide 3: aggiunto che la macchina resta $M$, senza contatori (corregge la confusione con il teorema di terminazione, presente nella spiegazione).
- Slide 4: aggiunto il passaggio $c^{n^k} = 2^{n^k \log c} \le 2^{n^{k+1}}$ per $n \ge \log c$, che mancava fra $c^{f(n)}$ ed EXP.

## 22-t7-4a

- Slide 1: aggiunte la testina sotto la $b$, il budget $f(n)$ dall'alto e il significato della terna $(q', \tau, D)$.
- Slide 2: §2 enfasi "è proprio lo stesso programma": tolta; spiegata la differenza fra $\delta$ e $\Delta$ e la terna unica nel riquadro sotto $N$.
- Slide 3: aggiunta la doppia freccia (un solo ramo identico) e che l'inclusione dice solo che il nondeterminismo non perde problemi (errore di lettura segnalato nella spiegazione).

## 23-t7-4b

- Slide 1: aggiunti la barra "≤ f(n)" e il numero di rami $d^{f(n)}$.
- Slide 2: §1 coda negativa "senza conservare tutto l'albero": riscritta come fatto ("I rami grigi non vengono mai salvati") con il motivo; letti cammino verde, pila e freccia grigia di ritorno alla radice.
- Slide 3: aggiunto il conto delle due parti del disegno, scelte del ramo e configurazione simulata ($f(n)+1$ celle per nastro).

## 24-t7-4c

- Slide 1: nessuna traccia forte; spiegate le tre componenti di $v = (q, i, w)$ e da dove vengono i due addendi della graffa.
- Slide 2: aggiunto che il grafo non si scrive e gli archi si calcolano simulando una mossa.
- Slide 3: aggiunti start, acc, il cammino in alto con le frecce verdi e il tempo della visita.
- Slide 4: aggiunto l'esempio numerico con tre simboli ($3^{\log_2 n} = n^{\log_2 3}$, circa $n^{1{,}58}$) per far vedere perché l'esponenziale diventa polinomio.

## 25-catena-classi

- Slide 1: nessuna traccia forte; letti i riquadri annidati e la catena di configurazioni, citato il Teorema 7.4 (a).
- Slide 2: aggiunti $s$, $t$, $|C| = \mathrm{poly}(n)$ e il conto $k^{2\log n} = n^{2\log k}$ con l'esempio $k = 8$.
- Slide 3: spiegati la catena in alto, il ramo verde e i rami grigi tratteggiati.
- Slide 4: aggiunta la barra "≤ poly(n)" e lo spazio $O(n^j)$ riusato fra i rami; citato il Teorema 7.4 (b).

## 26-savitch

- Slide 1: aggiunte la curva lilla e le curve verdi, e il buco "perché $2^i$" (si dimezza senza arrotondamenti, $i$ conta i dimezzamenti).
- Slide 2: nessuna traccia forte; aggiunte le due righe come chiamate ricorsive in sequenza.
- Slide 3: §2 chiusura "Questo rende il test di base esatto.": tolta; spiegato perché i casi sono solo zero o un arco e letti doppio cerchio e arco.
- Slide 4: "L'induzione su i giustifica la ricorsione" detto in astratto: ora le due direzioni dell'induzione lette nel disegno (dal basso in alto e dall'alto in basso), con l'esempio 5 = 3 + 2 per il "al più".
- Slide 5: §1 e §2, chiusura negativa "Non memorizzare tutti i rami contemporaneamente.": tolta; spiegati i riquadri tratteggiati vuoti (spazio liberato) e che basta l'ultimo $z$ provato.
- Slide 6: §2 chiusura "il risparmio riguarda lo spazio": tolta; aggiunta l'origine diversa dei due $\log v$.

## 27-savitch-cor

- Slide 1: titolo "Costruisci il grafo implicito" in contrasto con il grafo che non si scrive, diventato "Il grafo implicito delle configurazioni"; aggiunti la nuvola tratteggiata, $s$, $t$ unico (con il motivo) e il conto $(c^2)^{f(n)}$. "Costruibile" reso con "propria".
- Slide 2: §1 "Non scrivere il grafo intero: ..." riscritto come fatto; spiegato il controllo locale del disegno ($a$ che diventa $b$) con $\Delta$.
- Slide 3: aggiunti la freccia tratteggiata come domanda di raggiungibilità e i candidati $z$ (stringhe di lunghezza $O(f(n))$, scorribili perché $f$ è propria).
- Slide 4: aggiunti il conto $\log V \le 2 f(n) \log c$, lo spazio per gli archi e il caso $f(n) = \log n$.

## 28-pspace-npspace

- Slide 1: nessuna traccia forte; letti gli ovali e citato il Teorema 7.4 (a).
- Slide 2: aggiunte le ipotesi del corollario di Savitch ($n^k$ propria, $n^k \ge \log n$) e il riquadro verde.
- Slide 3: aggiunto l'esempio $n^3 \to n^6$ e perché lo stesso argomento non dice niente su P e NP.

## 29-composizione-riduzioni

- Slide 1: nessuna traccia forte; aggiunta la catena completa di equivalenze e che resta da controllare lo spazio.
- Slide 2: spiegato da dove viene $|R(x)| \le n^c$ e perché l'output finale non pesa; la frase sulla strada ovvia è scritta come fatto, senza la forma §5 "si potrebbe pensare di".
- Slide 3: letti i due lati del disegno (ricalcolo di $\sigma_i$ a sinistra, cella verde a destra) e perché tornare indietro obbliga a ripartire da capo.
- Slide 4: titolo "Somma pochi contatori" impreciso (due delle tre voci sono memorie), diventato "Somma contatore e memorie"; aggiunto perché ogni voce è $O(\log n)$.

## 30-chiusura-riduzioni

- Slide 1: nessuna traccia forte; letti $x$, $R$, $\mathrm{dec}_B$ e detti i due costi da pagare.
- Slide 2: "P, NP, PSPACE ed EXP conservano i rispettivi limiti" vago (§14): ora il conto $q(p(n))$ con l'esempio $n^6$ e il caso di EXP.
- Slide 3: aggiunte la freccia tratteggiata di ricalcolo e la catena per coNP fino a $A \in \mathrm{coNP}$.
- Slide 4: aggiunto l'esempio NP-completo in P.

## 31-completo-per-due-classi

- Slide 1 e 2: nessuna traccia forte; aggiunte la freccia $A \le B$ e la frase "vale per ogni $A$", che porta dall'elemento all'inclusione.
- Slide 3: §6 "Servono sia appartenenza sia difficoltà, oltre alla chiusura" appiccicato in fondo: tenuti i tre ingredienti, che sono davvero tre (le colonne della tabella della spiegazione), ma legati a "ognuna" delle due frecce; aggiunto l'esempio NP e coNP.

## 32-completo-classe-piccola

- Slide 1: titolo di 7 parole, diventato "Il problema completo nella classe piccola"; aggiunto perché serve la chiusura di $C_1$ e non quella di $C_2$ (errore vero segnalato nella spiegazione).
- Slide 2: nessuna traccia forte; aggiunto "vale per ogni $A$".
- Slide 3: aggiunto il confronto con la proposizione sul problema completo per due classi (qui basta una completezza) e letto l'esempio sotto il disegno.

## Discrepanze fra disegni e matematica

- 18-space-hierarchy, slide 4: la conclusione del disegno è $\mathrm{SPACE}(f(n)) \subseteq \mathrm{SPACE}(f(n)\log f(n))$, con l'inclusione larga; il teorema dice $\subsetneq$. La didascalia scrive $\subsetneq$ e non parla del simbolo del disegno.
- 20-time-in-space, slide 2: le graffe dicono "≤ f(n) celle" per nastro; con al più $f(n)$ passi le celle sono al più $f(n)+1$ (come nella slide 1, "≤ t + 1 celle", e nella spiegazione). La didascalia dice $f(n)+1$.
- 18-space-hierarchy, slide 2 e 4 (notazione): nella slide 2 l'input è $\langle M\rangle\#x$ con $x$ coda di riempimento, nella slide 4 $x = \langle M\rangle\#0^n$ è l'input intero e $n$ conta gli zeri, mentre altrove $n$ è la lunghezza dell'input; la spiegazione allunga con zeri senza `#`. La didascalia dice che $M$ si simula sull'intera stringa ed evita $0^n$.
- 18-space-hierarchy, slide 1, e manifesto di 27-savitch-cor, slide 1 (terminologia): "costruibile" dove l'enunciato in `theorems.ts` dice "propria". Le didascalie usano "propria".
- 24-t7-4c, slide 2 (notazione): la freccia fra due configurazioni della macchina nondeterministica $N$ è etichettata $\delta$, il simbolo della funzione di transizione deterministica; per $N$ la spiegazione di 22-t7-4a usa la relazione $\Delta$. La didascalia dice solo "una mossa di $N$".
- 25-catena-classi, slide 3 (lettura dubbia): sotto il ramo verde il disegno mette altri rami grigi tratteggiati, mentre la macchina deterministica letta come nondeterministica ha un solo ramo. La didascalia li presenta come i rami che una macchina NP qualsiasi potrebbe avere e che questa non ha; se si preferisce, il disegno andrebbe senza quei rami.
