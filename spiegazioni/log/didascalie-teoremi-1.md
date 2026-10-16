# Didascalie delle dimostrazioni illustrate: gruppo teoremi-1

Teoremi: 01-ricorsivo-re, 02-speedup-multinastro, 03-ram-mdt, 04-linear-speedup, 05-mdt-io, 06-space-compression, 07-p-sub-np, 08-ndet-det, 09-reach-nl, 10-gap-theorem, 11-soluzioni-precise, 12-terminazione-space, 13-chiusura-det-complemento, 14-hf-upper, 15-hf-lower, 16-time-hierarchy. In tutto 60 slide, tutte riscritte.

Output: `scratchpad/illustrate/out/teoremi-1.json` (stesso numero e ordine di slide del manifesto, JSON validato con `json.load`, ogni formula renderizzata con KaTeX senza errori).

## Invocazione di humanizer

| skill       | invocazioni                                                   | caricata |
| ----------- | ------------------------------------------------------------- | -------- |
| `humanizer` | 1, con lo strumento Skill (base `/home/lore/.claude/skills/humanizer`) | sì       |

Per ogni teorema ho seguito i quattro passi della skill sulle didascalie: segnare i difetti, scrivere la bozza, ricontrollarla (fatti aggiunti o persi, poi §1, §2, §6, §8, §19), scrivere la versione finale. Ogni pannello è stato guardato con Read prima di scrivere la didascalia. Controlli automatici sulla versione finale: niente `—`, `–`, `**`, virgolette o apostrofi curvi, `$` bilanciati, da 33 a 73 parole per didascalia, titoli da 2 a 6 parole, nessun "Attenzione" né rimando a lezioni, slide o dispensa.

Difetti comuni a quasi tutte le didascalie di partenza, non ripetuti sotto:

- formule in testo semplice o Unicode (`M′`, `O(f(n)²)`, `R ⊆ RE`) invece che in LaTeX con `$…$` e classi in `\mathrm{}`: tutte convertite;
- §21 apostrofi curvi (`l’input`, `un’operazione`): sostituiti con apostrofi dritti, anche nei titoli 04/2, 05/1, 08/3;
- nessun collegamento con il disegno: la didascalia ripeteva il passo della prova senza dire che cosa si vede (nodi, frecce, colori, etichette). In tutte le slide ora c'è almeno un elemento del disegno legato al passo.

## Difetti segnati e modifiche, per teorema

### 01-ricorsivo-re

- §11 slide 2, "Le computazioni accettanti restano identiche" non dice perché → "Sugli input di $L$ non ci passa mai, quindi fa le stesse mosse di $M$".
- Slide 3, "decidibile/riconoscibile" non coincideva con la spiegazione (ricorsivo, accetta) → "linguaggio ricorsivo qualsiasi", "$M'$ accetta $L$".
- Aggiunto: gli stati $q_{\text{acc}}$ e $q_{\text{rej}}$ del disegno, lo stato $q_\infty$ come cerchio rosso con il cappio, il cerchio di $\mathrm{R}$ dentro l'ovale di $\mathrm{RE}$; perché $M$ da sola non accetta ancora $L$ (contrasto §1 tenuto: corregge l'errore tipico); l'inclusione stretta con il problema dell'arresto.

### 02-speedup-multinastro

- §2 slide 3, chiusa "la configurazione simulata resta corretta" senza contenuto → descritto come si inserisce la cella (spostamento a destra e blank nella cella liberata).
- Aggiunto: separatori $\#$ e marcatori $\wedge$ del disegno, frecce che portano $a, b, c$ nel riquadro, $\delta(q, a, b, c)$, perché gli stati di $M'$ restano finiti, la cella tratteggiata, l'origine dei due fattori $f(n)$.

### 03-ram-mdt

- §8 slide 2, trattino lungo in "indirizzo–contenuto" → "coppie (indirizzo, contenuto)".
- Aggiunto: lettura dei tre conti del disegno, ricontrollati ($1011 + 1101 = 11000$, cioè $11 + 13 = 24$; $1101 - 0011 = 1010$, cioè $13 - 3 = 10$; $\lfloor 1010/2 \rfloor = 101$); il limite $t + \ell + b$; perché manca la moltiplicazione; lettura di $\langle 2, 1101 \rangle$; da dove vengono i tre fattori $f(n)$.

### 04-linear-speedup

- §2 slide 5, "L'output rimane lo stesso" come chiusa → legata ai due riquadri $u$ del disegno, più il termine $n + 2$ che resta.
- Slide 1, "scelta in base alla velocità desiderata" vago → "dipende solo da $\varepsilon$ e si sceglie alla fine".
- Aggiunto: $\Sigma' = \Sigma \cup \Sigma^m$, la freccia "$q, i$", i 4 passi di lettura, i $3m$ simboli, perché si scrive su al più un vicino, il conto $6/m \le \varepsilon$.

### 05-mdt-io

- Slide 2, "restano separati" vago → "restano fermi" e la corrispondenza nastro $i$ → nastro $i+1$.
- Aggiunto: perché serve la copia ($M$ scrive sul suo primo nastro), costo $O(n)$, nastro verde, output sul nastro $k+1$, somma $O(n) + f(n) + O(f(n))$.

### 06-space-compression

- §11 slide 2, "La posizione interna della testina si ricorda nello stato" → forma attiva "lo stato di $M'$ ricorda".
- Titolo slide 3 "Simula senza perdere informazione" generico → "Simula dentro il blocco".
- §2 slide 4, chiusa "con la stessa risposta" → sostituita con il perché manca il termine $n$ (errore tipico della spiegazione).
- Aggiunto: le due parentesi $f(n)$ e $m$, la freccia "$q, i$", $\hat\delta$, $X'$, le frecce di uscita a sinistra e a destra, il conto $\lceil f(n)/m \rceil \le f(n)/m + 1$, perché $m$ deve essere costante.

### 07-p-sub-np

- §1 slide 2, coda negativa "senza creare rami alternativi" → detto in positivo: $\Delta$ contiene solo $\delta(q, \sigma)$, il cerchio "scelta unica".
- §11 slide 3, soggetto mancante in "Accetta gli stessi input" → "$N$ risponde 1 sugli stessi $x$".
- Aggiunto: sigle DTM/NTM e uscita 0/1 del disegno, perché $N$ è una MdT nondeterministica legittima, il segno $=$ fra le macchine, il passaggio per $\mathrm{NTIME}(p(n))$.

### 08-ndet-det

- §1 slide 2, coda negativa "senza saltarne nessuno" → l'ordine reale delle sequenze, come nell'elenco del disegno, e la simulazione da capo.
- Slide 3, "Se tutte le computazioni sono terminate senza accettare, rifiuta" nascondeva come $D$ lo sa → regola sulla lunghezza $t$, con il contrasto (tenuto) che un "no" su un ramo non dice niente.
- Slide 4, "Il costo di simularle si assorbe" vago → $f(n) \cdot d^{f(n)} \le (2d)^{f(n)}$, $c = 2d \gt d$ come nel disegno.

### 09-reach-nl

- Aggiunto: colori di $s$ e $t$, perché non si segnano i nodi visitati, freccia tratteggiata e domanda $(u, v) \in E$, un ramo che rifiuta ha solo scelto male, contatore in binario, circa 60 bit per un milione di nodi.
- Chiarito nel testo il doppio uso di $v$ nel disegno (vedi discrepanze).

### 10-gap-theorem

- Slide 4, "Gli input rimasti sono finiti" ellittico → la tabella negli stati per gli input corti e la conclusione $\mathrm{TIME}(f(n)) = \mathrm{TIME}(2^{f(n)})$.
- Slide 2, intervalli scritti come "[k, $2^k$]" a metà fra testo e LaTeX → $[k_j, 2^{k_j}]$ con $k_1 = 2n$, $k_{j+1} = 2^{k_j} + 1$.
- Aggiunto: perché si guardano solo $n+1$ macchine, crocette come tempi di arresto, $f(n) = k_2$ con l'intervallo tratteggiato in verde, perché $f$ è ricorsiva ma non propria, la fascia rossa della slide 4.

### 11-soluzioni-precise

- Slide 3, "le celle inutilizzate restano segnate" senza conseguenza → ogni nastro di lavoro finisce lungo esattamente $f(n)$.
- Aggiunto: definizione di macchina precisa, $\#$ come quasi-blank, il triangolo come cursore sul metro, durata esatta $f(n)$ della seconda fase, il conto di tempo e spazio, l'errore di far fermare $M'$ con $M$.

### 12-terminazione-space

- Titolo slide 2 "Evita ripetizioni inutili" ("inutili" vago) → "Taglia i cicli".
- Aggiunto: $q, a_1 \ldots a_s$ del disegno, perché serve $s \ge \log n$ (cursore di input), il ciclo rosso e il cammino in basso, perché le mosse restano lecite, il contatore che scende, l'uscita "accetta" che il diagramma non mostra, perché serve il metro di una funzione propria.

### 13-chiusura-det-complemento

- Slide 3, "Le classi deterministiche considerate" vago → $C = \mathrm{TIME}(f(n))$ o $\mathrm{SPACE}(f(n))$, $C = \mathrm{co}C$, $\mathrm{P} = \mathrm{coP}$.
- Aggiunto: perché serve "$M$ termina sempre" (scritta del disegno), uscite scambiate, stesse mosse, perché lo scambio fallisce sulle macchine nondeterministiche.

### 14-hf-upper

- Slide 4, "Il limite uniforme" non spiegato → il fattore $\ell_M \cdot k_M^2 \le \log^3 n$ e perché va limitato con $n$.
- Aggiunto: $\langle M \rangle$ e $x$, $n = |\langle M \rangle; x|$ contro $f(|x|)$, la sveglia come conto alla rovescia, la freccia "passo", l'esempio $|x| = 3$, $f(n) = n^2$ (passo 7 sì, passo 12 no).

### 15-hf-lower

- §8 slide 1, trattino lungo in "programma–input" → tolto.
- §4 slide 1, annuncio "Costruiremo una macchina che lo contraddice" → tolto.
- Slide 2, "Il budget ipotizzato consente la diagonalizzazione" diceva che funziona senza dire perché → conto $f(\lfloor (2n+1)/2 \rfloor) = f(n)$.
- Titolo slide 3 con $D$ in LaTeX.
- Aggiunto: $M_H$ come riquadro rosso, perché per $D$ "accetta entro $f(n)$ passi" e "accetta" coincidono, i due casi della slide 4, perché un decisore lento non darebbe contraddizione.

### 16-time-hierarchy

- Slide 1, il disegno usa $g(n)^3$ ma la didascalia parlava di $f(2n+1)^3$ senza definire $g$ → $g$ definita subito.
- Slide 2, "il lemma superiore" → "il Lemma 1", nome del teorema sul sito.
- Aggiunto: i due ovali, $2\lfloor n/2 \rfloor + 1 \ge n$ per $n$ pari e dispari, il punto $H_g$, l'esempio $f(n) = n$, il fatto che il gradino non separa $\mathrm{TIME}(n)$ da $\mathrm{TIME}(n^2)$.

## Discrepanze fra disegno e matematica

Le didascalie riportano la matematica giusta e non descrivono gli elementi sbagliati.

- 04-linear-speedup, slide 4: il disegno mostra aggiornati tutti e tre i blocchi ($Y'$, $X'$, $Z'$); nella prova una fase riscrive il blocco centrale e al più un vicino.
- 04-linear-speedup, slide 1 e 3: il blocco $X$ vale $a\,b\,a$ nella slide 1 e si apre in $a\,b\,c\ldots$ nella slide 3 (incoerenza interna, senza effetti sulla prova).
- 05-mdt-io, slide 2: le frecce dal nastro di input verso $M$ e da $M$ verso il nastro di output fanno pensare che $M$ li usi durante la simulazione; nella costruzione restano fermi (l'input è già copiato sul nastro 2, l'output si copia alla fine).
- 09-reach-nl, slide da 2 a 4: $v$ è sia il nome di un nodo sia il numero dei nodi (nella slide 4 compaiono tutti e due); la didascalia lo chiarisce. Nella slide 3 il contatore è disegnato come una fila di celle $0, 1, 2, \ldots, v$, che si può leggere come contatore unario; il contatore è in binario, $O(\log v)$ bit.
- 10-gap-theorem, slide 2: gli intervalli sono disegnati con spazi vuoti fra l'uno e l'altro; con $k_{j+1} = 2^{k_j} + 1$ ognuno comincia subito dopo il precedente.
- 10-gap-theorem, slide 2 e 3: nella slide 2 alcune crocette cadono sotto il secondo intervallo; nella slide 3 due di quelle crocette spariscono, ma una resta sotto l'intervallo segnato come vuoto ($f(n) = k_2$). I tempi di arresto sono fissati: l'intervallo scelto deve essere già vuoto prima.
- 10-gap-theorem, slide 1: le macchine sono $M_1, \ldots, M_{n+1}$, nella spiegazione $M_0, \ldots, M_n$ (il numero, $n+1$, coincide).
- 11-soluzioni-precise, slide 3: sullo stesso nastro compaiono celle "solo input" e, fuori dalla parentesi $f(n)$, celle "inutilizzate (restano segnate)". L'input sta su un nastro a parte, e le celle non usate che restano quasi-blank stanno dentro il metro di $f(n)$ celle: è per questo che ogni nastro di lavoro finisce lungo esattamente $f(n)$.
- 15-hf-lower, slide 2 e 3: la freccia "sì" esce direttamente dal riquadro del decisore, mentre "no" esce dal riquadro "inverte la risposta"; si può leggere come se $D$ rispondesse sì quando il decisore dice sì. Il riquadro del decisore è etichettato $H_f$, il nome del linguaggio, invece di $M_H$.
- 03-ram-mdt, slide 3: la parentesi $O(f(n))$ sotto il nastro dei registri si può leggere come lunghezza del nastro, che è $O(f(n)^2)$; la didascalia la legge come numero di coppie. Nella slide 2 l'indirizzo $2$ è scritto in decimale e il contenuto in binario.

Differenze di notazione, non errori: 01 usa $w$, $q_{\text{acc}}$, $q_{\text{rej}}$ (spiegazione: $x$, "yes", "no"); 02 marca i cursori con una casella $\wedge$ e separa con $\#$ (spiegazione: simbolo sottolineato, $\triangleleft$); 07 usa DTM/NTM, $p(n)$ e 0/1; 08 chiama $D$ la macchina deterministica (spiegazione: $M$); 11 usa $\#$ per i quasi-blank $\sqcap$; 12 e 14 disegnano contatore e sveglia come conti alla rovescia; 16, slide 2, mette in input $x$ invece della coppia $M;x$.
