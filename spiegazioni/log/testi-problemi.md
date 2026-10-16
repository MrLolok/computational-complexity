# Humanizer sui testi dei problemi

File: `src/data/problems/problems.ts`, 36 problemi. Campi rivisti: `def`, `brief`, `why`, `comp`, `compl` e, nelle trappole, `e` e `n`. Gli altri campi non sono stati toccati.

## Invocazione di humanizer

`humanizer` invocata una volta con lo strumento Skill all'inizio del lavoro: caricata correttamente da `/home/lore/.claude/skills/humanizer` (regole da §1 a §26, quattro passi). Voce neutra e piana, come chiede la skill per i testi tecnici. Per ogni problema: difetti segnati, riscrittura, ricontrollo dei fatti e delle tracce che sopravvivono più spesso (§1, §2, §6, §8, §19), versione finale.

## Modifiche comuni

- Apostrofi tipografici (’) sostituiti con quelli dritti in tutti i campi rivisti, come nel resto del file (§21). In 6 campi è l'unica modifica: SAT `n`, INDEPENDENT SET `n`, HAMILTON PATH `e` di F03#7, EXACT TSP `why`, CIRC SAT `def`, SUCCINCT CIRCUIT SAT `why`.
- Virgolette «» sostituite con virgolette dritte (§21) o tolte riscrivendo la frase.
- Trattini lunghi tolti (§8): "Cook–Levin" e "Schönfinkel–Bernays" con il trattino normale; i cammini $A$—$B$—$C$—$D$ scritti $A$-$B$-$C$-$D$.
- Grassetti `<b>` tolti tutti (§19); le etichette in grassetto diventate frasi.
- Rimandi a dispensa, slide, lezioni e appunti tolti dai campi rivisti (regola del sito).

Controlli finali: nessun `’ « » — – <b> **` nei campi rivisti; `$` bilanciati in ogni campo; delimitatori delle stringhe coerenti con prettier; `npx tsc --noEmit` senza errori.

## Per problema

- REACHABILITY
  - `why`: "Questo dà un algoritmo in spazio logaritmico nondeterministico", frase che nomina ciò che la precedente ha appena mostrato (§2) → unita alla prima ("quindi lavora in spazio logaritmico nondeterministico").
  - `n` (costo della riduzione): apertura "Il costo della riduzione conta:" (§2/§3) → una sola frase condizionale con lo stesso contenuto.
- 2-SAT: nessun difetto da correggere, nessuna modifica.
- 2-COL
  - `why`: "Un conflitto si verifica esattamente in presenza di un ciclo dispari", giro di parole al posto di un verbo semplice (§18) → "incontra un conflitto esattamente quando il grafo ha un ciclo dispari", unita alla frase prima.
  - `e` di ND#1: "non lo è (non è noto)", autocorrezione in parentesi → "ma non è noto che lo sia" (vedi anche gli errori di contenuto).
- MAX FLOW
  - `comp`: tolto "Il corso lo enuncia senza prova (riepilogo della dispensa)" (rimando, regola del sito; §25).
- LINEAR PROGRAMMING
  - `why`: etichetta in grassetto "L'idea:" (§19), "richiede tempo polinomiale" detto in modo indiretto, "Algoritmi come..." → frasi piane, esempio e numeri invariati ($x = 2, y = 1$ e $x = 1{,}5, y = 0{,}5$ ricontrollati).
- PRIMES
  - `why`: "Non è nota la P-completezza di PRIMES" (nominalizzazione) → "Non si sa se PRIMES sia P-completo"; prime due frasi riordinate.
  - `comp`: tolta la citazione della dispensa (rimando); resta "Non è noto P-completo."
- HORNSAT
  - `why`: tre frasi di fila che aprono con "Si..." (§7) e passivo "può essere implementata" (§11) → frasi unite, forma attiva.
- SAT
  - `why`: trattino lungo in "Cook–Levin" (§8).
  - `n`: solo apostrofi.
- 3-SAT
  - `why`: frase finale che ripete la conclusione (§2) → unita alla precedente con "quindi".
- MAX2SAT: nessun difetto da correggere, nessuna modifica.
- CIRCUIT SAT
  - `why`: passivo "può essere rappresentata da" (§11) → "si può scrivere come".
- CLIQUE
  - `why`: due grassetti, uno come etichetta "Grafo complementare:" (§19) → tolti, definizione in una frase.
  - `e` di L18#6: grassetti ed etichette a domanda "1. Quanto è grande l'input?", "2. Che algoritmo usiamo?", "3. Perché basta?", "Esempio:" (§19, §4) → paragrafi in prosa con la stessa sequenza; tolta la chiusura "La differenza nasce dal fatto che $n$ conta i bit della descrizione", che ripete la prima frase (§2). Conti ricontrollati ($n \ge m^2$, $2^{10} = 1.024$, $2^{n/2} \ge 2^{50}$).
- INDEPENDENT SET
  - `why`: cinque etichette in grassetto (§19), trattini lunghi nei cammini (§8) → paragrafi in prosa; "Indipendente non vuol dire isolato" tenuto perché corregge un errore che lo studente fa davvero. Esempio ricontrollato (con $K = 3$ ogni terna del cammino contiene un arco).
  - `n`: solo apostrofi.
- NODE COVER
  - `why`: grassetti (§19), «complemento di $S$» (§21), trattini lunghi (§8), apertura a domanda "Perché funziona?" (§4) → tolti; la precisazione che il grafo resta invariato è rimasta. Esempio $T = \{B, D\}$ ricontrollato.
- HAMILTON PATH
  - `why`: "Una riduzione da 3-SAT mostra la difficoltà del problema" → "La difficoltà si dimostra con una riduzione da 3-SAT"; prime due frasi unite.
  - `e` di F03#7: solo apostrofi.
- TSP(D): nessun difetto da correggere, nessuna modifica.
- 3-COL: nessun difetto da correggere, nessuna modifica.
- INTEGER PROGRAMMING
  - `why`: passivo "possono essere rappresentate da" (§11) → forma attiva.
  - `n`: etichetta "Contrasto da ricordare:" (§4/§19) → tolta.
- KNAPSACK: nessun difetto da correggere, nessuna modifica.
- VALIDITY
  - `why`: ultima frase con il complemento anticipato e "non è sufficiente" → "Un solo assegnamento che la rende vera non basta a provarne la validità" (contenuto invariato: corregge un errore reale).
  - `comp`: tolto "(dispensa cap. 14)" (rimando).
- co-SAT: nessun difetto da correggere, nessuna modifica.
- co-HAMILTON PATH
  - `why`: "escludere l'esistenza di ogni cammino" (giro di parole) → "escludere ogni cammino"; due frasi unite.
  - `n`: etichetta "Distinguere:" (§4/§19) → tolta.
- co-TSP(D): nessun difetto da correggere, nessuna modifica.
- SAT-UNSAT: nessun difetto da correggere, nessuna modifica.
- EXACT TSP
  - `why`: solo apostrofi.
  - `comp`: tolto "(slide Lezione 9)" (rimando).
- $\mathrm{QSAT}_i$
  - `why`: cinque grassetti, due etichette "$\mathrm{QSAT}_1$:" e "$\mathrm{QSAT}_2$:" (§19), domanda all'oracolo tra «» (§21), "Esempio:" → prosa; esempio $\exists x\, \forall y\, (x \lor y)$ ricontrollato.
  - `comp`: etichetta "Casi da ricordare:" (§4/§19) → tolta.
- co-$\mathrm{QSAT}_i$
  - `why`: grassetto (§19), "Esempio:" e frase breve finale "Il complemento risponde quindi sì." (§2) → unita all'esempio. "Non vuol dire semplicemente mettere $\forall$ davanti" tenuto: corregge un errore reale.
- STRATEGIC COMPANIES
  - `def`: apertura "La domanda è:" (§4) → tolta, resta la domanda.
  - `why`: domanda d'apertura in grassetto con "davvero" (§4, §19) → frase che definisce "strategica" (stessa definizione del `brief`); grassetto "Minimale per inclusione" tolto; frase finale "Questo porta al secondo livello della PH" (§2) unita alla precedente. Esempio ricontrollato.
- co-STRATEGIC COMPANIES: nessuna modifica di forma (vedi errori di contenuto).
- CIRC SAT
  - `def`: solo apostrofi.
  - `why`: grassetto (§19), due domande tra «» (§21), "Esempio:" → prosa; modelli minimali di $p \lor q$ ricontrollati.
- QSAT
  - `why`: frase d'apertura tutta in grassetto (§19) → tolto; "$\exists$ significa che... $\forall$ significa che..." accorciato; "La formula è vera." frase isolata (§2) unita alla precedente. Esempio con $x = 0$, $z = y$ ricontrollato.
- GEOGRAPHY
  - `why`: "Poiché..." riformulato, soggetto di "richiede spazio polinomiale" reso esplicito (la visita, non la partita).
- SCHÖNFINKEL-BERNAYS SAT
  - `def`: virgolette «» (§21) → dritte; nessun'altra modifica.
  - `brief`: «» (§21) e frammento "Esempio: ..." (§2) → una sola frase.
  - `why`: domande in grassetto "Di che cosa parliamo?", "Che cosa escludiamo?", etichette "Esempio:", "Come si legge la notazione:" (§4, §19), «» (§21) → prosa; tolta la ripetizione fra apertura e chiusura del paragrafo sulle funzioni.
  - `comp`: tolto "(appunti)" (rimando); il segno ✱ resta.
- SUCCINCT CIRCUIT SAT
  - `why`: solo apostrofi.
  - `comp`: "Negli appunti è fuori esame" → "È fuori esame" (rimando).
- Validità del primo ordine
  - `why`: "permette di trovare" (§18) → "Enumerando le dimostrazioni, prima o poi si trova".
- Soddisfacibilità del primo ordine
  - `why`: grassetto (§19), «» (§21), trattino lungo in "Schönfinkel–Bernays" (§8) → tolti; definizioni di soddisfacibile e valida in una frase.

Totale: 45 campi modificati in 27 problemi; 9 problemi invariati.

## Errori di contenuto notati (non corretti)

- HAMILTON PATH, `brief`: "Il complemento è coNP-completo, non $\Pi_2^{\mathrm{P}}$-completo". Non è dimostrato: lo sarebbe se e solo se $\mathrm{NP} = \mathrm{coNP}$ (come dicono la trappola F03#7 e il `brief` di co-HAMILTON PATH, "Non è noto").
- co-STRATEGIC COMPANIES, `why`: "non appartenga ad alcun insieme strategico". "Strategica" è una proprietà delle società; gli insiemi sono "ammissibili minimali", come dice la trappola dello stesso problema.
- PRIMES, `n` delle trappole: la frase parla di "due problemi in P", ma il terzo esempio è CLIQUE → PRIMES, e CLIQUE è NP-completo. La condizione "solo se P = NP e PRIMES fosse P-hard" dipende poi dal tipo di riduzione (con riduzioni polinomiali la P-hardness non serve).
- 2-COL, `e` di ND#1: l'originale diceva "non lo è (non è noto)"; "non lo è" va oltre quello che si sa. Ho tenuto solo la versione della parentesi ("non è noto che lo sia"), senza aggiungere altro.
- 2-COL, `comp`: "Non è noto completo per nessuna classe del corso". 2-COL sta in L e, con riduzioni in spazio logaritmico, ogni problema non banale di L è L-completo; la frase regge solo con riduzioni più deboli. Ho lasciato "del corso", che delimita l'affermazione.
