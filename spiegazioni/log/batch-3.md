# Batch 3: log delle skill

File: 24-t7-4c, 25-catena-classi, 27-savitch-cor, 28-pspace-npspace, 29-composizione-riduzioni, 30-chiusura-riduzioni, 31-completo-per-due-classi, 32-completo-classe-piccola, 33-cook-levin, 34-3sat. 26-savitch non è stato toccato.

## Invocazioni delle skill

| skill                    | argomento                                                                                                       | caricata |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- | -------- |
| `anthropic-skills:learn` | spiegazioni statiche in Markdown adattate come in STRATEGIA.md (una invocazione all'inizio, per tutto il batch) | sì       |
| `humanizer`              | `spiegazioni/teoremi/24-t7-4c.md`                                                                               | sì       |
| `humanizer`              | `spiegazioni/teoremi/25-catena-classi.md`                                                                       | sì       |
| `humanizer`              | `spiegazioni/teoremi/27-savitch-cor.md`                                                                         | sì       |
| `humanizer`              | `spiegazioni/teoremi/28-pspace-npspace.md`                                                                      | sì       |
| `humanizer`              | `spiegazioni/teoremi/29-composizione-riduzioni.md`                                                              | sì       |
| `humanizer`              | `spiegazioni/teoremi/30-chiusura-riduzioni.md`                                                                  | sì       |
| `humanizer`              | `spiegazioni/teoremi/31-completo-per-due-classi.md`                                                             | sì       |
| `humanizer`              | `spiegazioni/teoremi/32-completo-classe-piccola.md`                                                             | sì       |
| `humanizer`              | `spiegazioni/teoremi/33-cook-levin.md`                                                                          | sì       |
| `humanizer`              | `spiegazioni/teoremi/34-3sat.md`                                                                                | sì       |

Da learn ho preso: domande di controllo con risposta in `<details>`, spiegazione diretta (niente domande socratiche al posto della spiegazione), un esempio piccolo svolto, una tabella dove c'è una struttura da vedere, gli errori tipici. Humanizer è stato eseguito nei suoi quattro passi (segnare, riscrivere, ricontrollare, versione finale) e nel file c'è solo la versione finale.

## Per file: difetti segnati da humanizer e modifiche

### 24-t7-4c

- §1 e ripetizione fra sezioni: "Il $k$ è una costante che dipende dalla macchina, non da $n$" tornava identica in "Dove si inciampa". Nel primo punto è diventata una subordinata ("dove $k$ è una costante della macchina"); il "non dipende da $n$" è rimasto solo nell'errore tipico.
- §1: "La dimostrazione smette di contare i rami e conta le configurazioni, che restano poche" diventata un'affermazione diretta con il limite esplicito. Al controllo (passo 3) "i rami sono infiniti" ripetuto due volte e non sostenuto dai dati: riscritto come "un ramo può fare molti più di $f(n)$ passi".
- §24: "Le configurazioni si contano un pezzo alla volta." annunciava solo la tabella; sostituita con una frase che dice che il numero è il prodotto delle possibilità.
- §4: "Si vede anche da dove viene il polinomio." diventata "Il polinomio compare già nel conto delle configurazioni."
- §2: tolta la chiusura "In spazio logaritmico le configurazioni sono un numero polinomiale.", che ripeteva l'esempio $3^{10}$.
- Errore tipico sul $k$: il contrasto "non è il numero di nastri. È una costante..." è rimasto perché corregge una confusione reale (vedi dubbi sui dati), riscritto in una frase sola.

### 25-catena-classi

- §2/§4: "La riga con (c) è quella che chiede un conto." diventata "Per la riga con (c) serve un passaggio in più."
- §1: "ma $\log n$ non è $n$" riscritto come "ci compare sotto un logaritmo" e spostato nel paragrafo su (c), con l'esempio $k = 8 \Rightarrow n^6$.
- Ripetizione fra sezioni: il primo errore tipico ripeteva che $k^{2\log n}$ è polinomiale. Sostituito con un errore diverso: citare il corollario di Savitch per $\mathrm{NL} \subseteq \mathrm{P}$.
- Al controllo: il paragrafo su P e NP stava dopo quello su (c); spostato vicino alle righe (a) e (b) che riguarda.

### 27-savitch-cor

- §2: "La dimostrazione esegue Savitch su un grafo che non esiste da nessuna parte sul nastro." chiusura a effetto, ripresa anche nel primo errore tipico. Fusa nella frase precedente ("quindi la dimostrazione esegue Savitch senza scriverlo").
- §18: "fa da nodo di arrivo" diventato "è il nodo di arrivo che serve al predicato PATH".
- §4: "Rispetto al grafo dato in input cambiano due cose." diventata una frase che nomina le due cose (candidati e caso base).
- §1: coda "non $O(f(n)^2)$" riscritta come "più di $O(f(n)^2)$".
- Al controllo: il primo errore tipico non diceva quale fosse l'errore; ora dice che una visita normale (come nel Teorema 7.4 (c)) esce dal budget di spazio. Tolto "nemmeno un pezzo per volta", impreciso.

### 28-pspace-npspace

- §2: "Una macchina nondeterministica in spazio $n^3$ si simula in spazio $n^6$ senza nondeterminismo." ripeteva la frase prima; fuse in una.
- §20: titolo "Perché funziona proprio qui" scritto per effetto, diventato "Perché il quadrato non fa uscire dalla classe".
- Affermazione causale gonfiata: "Per questo PSPACE = NPSPACE è dimostrato, mentre P = NP è aperto" diceva che l'argomento spiega perché P = NP è aperto. Riscritta: l'argomento non dice niente su P e NP.
- §2: chiusura "Il trucco funziona solo per famiglie di budget chiuse rispetto al quadrato" ripeteva il paragrafo sui polinomi; ridotta a "A differenza dei polinomi, i budget logaritmici non assorbono il quadrato."
- Al controllo: "se P = NP resta una domanda aperta" era ambiguo; diventato "la domanda se P = NP resta aperta".

### 29-composizione-riduzioni

- §3: "Tutto il lavoro sta nello spazio." diventata "Resta da controllare lo spazio."; il secondo errore tipico, che ripeteva la stessa cosa e la catena di equivalenze, è stato tolto.
- §1 nel titolo: "ricalcolare invece di ricordare" diventato "ricalcolare i simboli di $R(x)$".
- §2: tolta la frase dopo la tabella dell'esempio ("In nessuna riga $M$ tiene in memoria più di un simbolo"), che diceva cosa mostrava la tabella.
- §3/§13: "È questo che permette di dimostrare l'NP-completezza a catena" diventata "La composizione si usa nelle prove di NP-completezza".
- Errore tipico: "Una memoria tampone non basta. Tenere gli ultimi simboli prodotti non risolve" (frammento più ripetizione) fuso in una frase.

### 30-chiusura-riduzioni

- Ripetizione fra sezioni: il secondo errore tipico ripeteva il paragrafo su L e NL; tolto.
- §2/§4: "È la mossa delle risposte 'solo se'." diventata "Le risposte 'solo se' usano la proposizione così: ...".
- Errore tipico sul budget fisso: tolta l'apertura "Non tutte le classi sono chiuse."; corretta la frase "Le classi della lista sono unioni su tutti i polinomi", falsa per L e NL, ora "P, NP, PSPACE ed EXP sono unioni...".
- Al controllo: l'esempio $q(m) = m^2$, $|R(x)| \le n^3 \Rightarrow n^6$ e l'errore tipico usavano gli stessi numeri due volte; l'errore ora rimanda all'esempio. "Un polinomio di un polinomio è un polinomio" non è più ripetuto fuori dalla tabella.

### 31-completo-per-due-classi

- §7: due frasi di fila aperte da "Siccome"; riscritte.
- §1: "non mette $L'$ in $C_2$: è proprio la chiusura a dirlo", con l'apertura "Senza la chiusura non si conclude nulla.", diventata "porta $L'$ in $C_2$ solo se $C_2$ è chiusa".
- Ripetizione: il secondo errore tipico ripeteva la tabella delle due inclusioni; tolto.
- Al controllo: "un pezzo da ciascuna completezza, incrociati" poco chiaro; diventato "usa la difficoltà rispetto a una classe e l'appartenenza all'altra".

### 32-completo-classe-piccola

- §2/§3: "Una classe piccola che contiene un problema completo per la classe grande la inghiotte tutta." immagine che ripeteva l'enunciato; tolta.
- §7: due "Siccome" di fila; fusi in una frase.
- §1: contrasto spezzato "non si può dire... Si può dire solo..." riscritto partendo dalla domanda d'esame: la risposta è "solo se P = NP", non un no (il "non un no" resta perché corregge un errore reale di risposta).

### 33-cook-levin

- §1: "Il nondeterminismo non sparisce: passa all'assegnamento." diventata "Il nondeterminismo passa all'assegnamento: ...".
- §2: frammento "tante, ma un polinomio" riscritto ("dell'ordine di $10^6$, grande ma polinomiale in $n$").
- Ripetizione fra sezioni: l'ultima frase del primo errore tipico ("Trovare il ramo resta compito di chi cerca un assegnamento") ripeteva il paragrafo sul nondeterminismo; tolta.
- §2: apertura "La direzione conta." tolta; §1: coda "non che lo è SAT" riscritta ("non aggiunge niente su SAT").
- Lunghezza: tolta la frase che introduceva solo la tabella ("Le clausole impongono che..."). Il file resta a circa 1050 parole contate con `wc -w`, che conta anche i token LaTeX delle formule in tabella; di prosa sono meno di 1000.

### 34-3sat

- §4: "Da qui si vede anche perché proprio 3" diventata "Il numero 3 viene da qui".
- §2: chiusura "Nessuna scelta delle $y$ salva la formula." fusa nella frase precedente ("il pezzo 3 è falso qualunque valore si dia alle $y$").
- Fine debole "..., che funziona." diventata "La costruzione giusta, con $k = 4$, usa una sola variabile nuova: ...".
- Al controllo: "la tabella dice come scegliere le $y$" valeva solo per $k = 5$, ora cita la regola $h \le j-2$; uniformato "assegnazione" in "assegnamento"; "l'argomento della catena" reso esplicito ("il ragionamento fatto sopra con tutti i letterali falsi").

## Buchi minimi colmati

- 24: perché c'è $\log n$ nell'esponente (posizione della testina sull'input, che non entra nello spazio); da dove viene $k$ ($k = c_1^2$, dal costo $O(m^2)$ della visita); perché non si provano i rami uno a uno; perché $k^{2\log n}$ è un polinomio ($n^{2\log k}$, con $k = 4$ viene $n^4$); un numero concreto ($3^{10} = 59049 \approx 1024^{1{,}58}$); quando si può togliere $\log n$ ($f(n) \ge \log n$).
- 25: perché le due inclusioni (a) sono gratis; perché per (b) basta lo spazio $n^j$ (un ramo di $n^j$ passi tocca al più $n^j$ celle); perché $k^{2\log n}$ è polinomiale, con $k = 8 \Rightarrow n^6$; perché basta ragionare su un esponente alla volta (P e NP sono unioni).
- 27: perché si suppone un'unica configurazione che accetta (PATH ha un solo arrivo); dove serve che $f$ sia propria (scorrere i candidati $z$ lunghi $O(f(n))$); come si decide un arco senza matrice; dove entra due volte $f(n) \ge \log n$; perché $i = O(f(n))$; tabella di confronto con Savitch su REACHABILITY.
- 28: perché il quadrato non fa uscire dai polinomi ($n^3 \to n^6$); perché per il tempo lo stesso argomento non funziona; perché non dà $\mathrm{L} = \mathrm{NL}$.
- 29: perché $|R(x)| \le n^c$ (spazio log, quindi tempo polinomiale, un simbolo per passo); perché l'output finale non dà problemi e la stringa intermedia sì; perché per tornare indietro bisogna ripartire da capo; perché $M_{R'}$ usa $O(\log n)$ anche se il suo input è lungo $n^c$ ($\log n^c = c \log n$); esempio svolto con $R(x) = \texttt{abba}$.
- 30: perché la riduzione costa poco (tempo polinomiale, output polinomiale); un polinomio di un polinomio con numeri ($m^2$ su $n^3$ dà $n^6$); perché per NL i ricalcoli non rompono il nondeterminismo; perché la stessa $R$ funziona sui complementi; perché $\mathrm{TIME}(n^2)$ non è chiusa.
- 31: tabella di quale ipotesi serve per quale inclusione; perché senza chiusura il ragionamento si ferma.
- 32: perché basta una sola completezza (l'altra inclusione è un'ipotesi); quale chiusura serve e perché; perché la risposta d'esame è "solo se" e non "no".
- 33: come un'implicazione diventa clausola (domanda di controllo); perché bastano $T$ colonne; perché $M$ resta in yes fino a $T$; perché si vietano le mosse illecite invece di permettere quelle lecite (un "or" di "and" non è CNF); perché serve la clausola sullo spostamento di al più una cella; dove finisce il nondeterminismo; esempio con $x = ab$, $T = 3$ (15 variabili vere su 45); perché le clausole sono $O(T^3)$ e un numero concreto ($n = 10$, $p(n) = n^2$, circa $10^6$); perché i contatori hanno $O(\log n)$ bit.
- 34: perché la NP-hardness non è scontata (un caso particolare può essere facile); lettura di $y_h$ come "il letterale vero sta più avanti"; perché servono proprio 3 posti; perché le $y$ devono essere nuove per ogni clausola; tabella con $k = 5$ delle scelte delle $y$; quanti pezzi e quante variabili ($k-2$ e $k-3$).

## Dubbi ed errori nei dati del sito (non corretti)

- `theoremProofs.json`, t7-4c, passo 1 e 5: la lettera $k$ indica sia il numero di nastri di $N$ sia la costante dell'enunciato $\mathrm{TIME}(k^{\log n + f(n)})$. Nel testo ho evitato di chiamare $k$ il numero di nastri e ho messo l'avvertenza fra gli errori tipici.
- `theoremProofs.json`, t7-4c, passo 3: con i nastri di lavoro numerati da 2 a $k-1$ le stringhe $w_i, u_i$ sono $2(k-2) = 2k-4$, mentre la formula usa l'esponente $(2k-2) f(n)$. È una maggiorazione e resta corretta, ma il conteggio non torna con la descrizione della configurazione. Nel testo non ho ripreso l'esponente esatto.
- `theoremProofs.json`, cook-levin, passo 2: "in $T$ passi la testina tocca al più $T$ celle, quindi bastano $T$ righe". Una tabella di $T$ righe descrive $T-1$ passi. Lo scarto di uno non cambia nulla, ma a rigore servirebbero $p(n)+1$ righe o $T = p(n)+1$. Serve anche $T \ge n$ per scrivere l'input nella riga iniziale (vale se $p(n) \ge n$), cosa che il testo non dice.
- 3-SAT, definizione non uniforme: `theorems.ts` dice "SAT con clausole di 3 letterali", `problems.ts` dice "al più 3 letterali", la dimostrazione produce clausole di esattamente 3 letterali. La riduzione va bene per tutte e due le definizioni, ma le tre formulazioni non coincidono.
- `theoremWalkthroughs.json`, savitch-cor: la prima slide dice "assumendo f costruibile", l'enunciato dice "funzione propria". È lo stesso concetto con un nome diverso.
