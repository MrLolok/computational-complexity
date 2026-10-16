# Didascalie illustrate, gruppo teoremi-6 (teoremi 79-93)

Teoremi: fsat-fnp, fsat-sat, fp-fnp, t20-1, nexp-completi, fo-indecidibile, 2sat-p-completo, riepilogo-p, np-pp, pp-pspace, bpp-inclusioni, bpp-errore, bqp, bqp-2exp, grover-np. 59 slide, tutte riscritte (titolo rivisto, didascalia riscritta).

Output: `scratchpad/illustrate/out/teoremi-6.json` (JSON valido, stesso numero e ordine di slide del manifesto, 395 formule rese con KaTeX senza errori).

## Invocazione di humanizer

`humanizer` invocata con lo strumento Skill all'inizio del lavoro: caricata sì, con le istruzioni complete (§1-§26, i quattro passi, le modalità di uscita). Usata in modalità incorporata (si restituisce solo il testo finale), un teorema alla volta: segnati i difetti delle didascalie esistenti, scritta la bozza, ricontrollata (fatti aggiunti o persi, nuova ricerca di §1, §2, §6, §8, §19), scritta la versione finale. Valgono anche le regole del sito in STRATEGIA.md.

Difetti comuni a tutto il gruppo, non ripetuti sotto:

- §21 apostrofi curvi (’) in quasi tutte le didascalie e in alcuni titoli: sostituiti con quelli dritti;
- §8 trattini lunghi in "Cook–Levin" e "Schönfinkel–Bernays": diventati trattini normali;
- formule scritte in Unicode (P ⊆ BPP, x₁ = 0, ⇔): riscritte in LaTeX con `$...$` e classi in `\mathrm{}`;
- nessuna didascalia nominava qualcosa del disegno: ora ognuna dice che cosa sono i riquadri, le frecce, i colori o le etichette e a quale passo della prova corrispondono.

## Per teorema

### 79 fsat-fnp

- §14 "Il verificatore controlla l'assegnamento" (quale verificatore, che cosa controlla) e "descrive un certificato valido" (come): sostituiti con i fatti, cioè valutazione di $\varphi$ e variabili libere di $y$.
- §9/§14 "La trasformazione dell'input e la decodifica dell'output sono efficienti": diventato "in spazio logaritmico", detto per $R$ e per la funzione di ritorno.
- Titolo 1 "Definisci il certificato cercato" cambiato in "FSAT sta in FNP", che è il passo mostrato.
- Collegamenti: riquadro verde = assegnamento, riquadro blu con spunta = valutazione; riquadro tratteggiato = verificatore $M$ deterministico; le due frecce finali separano input fissato e certificato.

### 80 fsat-sat

- §14 "la procedura segnala il fallimento": sostituito con il percorso della croce rossa (nessun $a$ passa il controllo).
- Errore di accordo "servono un numero polinomiale" e §14 numero di chiamate vago: ora "$n + 1$ chiamate, contando quella iniziale", con il motivo per cui le formule non si allungano.
- Buco colmato: perché con "no" si può fissare $x_1 = 1$ senza un'altra domanda.
- Collegamenti: riquadro rosso, riquadro blu, spunta e croce; riquadro verde "la formula resta soddisfacibile"; catena $\varphi_0, \dots, \varphi_n$; spunta sotto $\varphi[a_1, \dots, a_n]$.

### 81 fp-fnp

- §14 "si trovano efficientemente" e passo saltato (da SAT in P a tutta NP): aggiunta la NP-completezza di SAT.
- §2 slide 4: la frase e la formula dicevano la stessa cosa due volte; ora la didascalia spiega i due lati della freccia doppia e l'inclusione $\mathrm{FP} \subseteq \mathrm{FNP}$ che vale sempre.
- Buchi colmati: lunghezza del certificato al più $p(|x|)$, prefisso vuoto per sapere se una soluzione esiste, perché "prova l'altro" va bene per forza, condizione di arresto.
- Collegamenti: striscia con $z$ = 1 0 1 colorato e $y$ = celle con il punto di domanda; freccia "scegli il bit", ritorno alla striscia, ramo "prova l'altro".

### 82 t20-1

- §4 apertura "Vogliamo sfruttare l'ipotesi su un input più lungo": tolta. Titolo 1 "Assumi P = NP" non corrispondeva al disegno (un linguaggio dentro NEXP): ora "Prendi $L$ in NEXP".
- "l'altra inclusione è immediata": aggiunto il perché.
- Buco colmato: il riempimento usa un simbolo nuovo.
- Collegamenti: cerchio NEXP con $L$, rami tratteggiati di $M$; striscia e graffa $N$; le frecce del passo 3 lette in ordine; riquadro $N^k$, riquadro verde e riquadro "ovvia".

### 83 nexp-completi

- "verificarlo" senza referente chiaro (slide 1): riscritto in tre azioni esplicite.
- §14 "La versione succinta della codifica della computazione" (slide 3): sostituita con la riduzione $x \mapsto$ circuito piccolo, scritto in spazio logaritmico.
- §18 "fornisce" e l'inglese "NEXP-hardness" (slide 6): riscritto con la condizione $R(z) \iff R(i) \land R(j)$.
- Titoli "Trasferisci Cook–Levin" e "Considera Schönfinkel–Bernays" (vaghi, con §8) cambiati in "SUCCINCT CIRCUIT SAT è NEXP-completo" e "Modelli piccoli per Schönfinkel-Bernays".
- Buchi colmati: perché bastano i testimoni e le costanti (formula universale vera su un sottoinsieme), perché le tabelle sono esponenziali ($k^r$ con arietà che cresce).
- Collegamenti: circuito $C$ e riquadro tratteggiato da $2^n$ porte; griglia e riquadro "regola locale" con tre frecce; graffa che unisce i due riquadri; punti verdi e costanti nel dominio; blocco rosso di $R$; colonna $R(i)$ e porta con ingressi $i$, $j$.

### 84 fo-indecidibile

- Soggetto sbagliato "Enumerare le prove prima o poi la trova": riscritto con la ricerca che arriva alla spunta.
- §2 frammento finale ": impossibile" (slide 3): sostituito con la catena completa (il decisore deciderebbe l'arresto, che è indecidibile).
- Titolo 3 cambiato in "Riduci l'arresto alla validità", più preciso.
- Collegamenti: elenco $\pi_1, \pi_2, \dots$ e riquadro "verifica prova"; le due frecce (spunta / puntini); riquadri "Validità ∈ RE ≠ decidibile"; frecce tratteggiate dell'ipotesi assurda; doppia freccia "se e solo se" e i due riquadri rossi.

### 85 2sat-p-completo

- §14 "appartiene a P grazie al grafo delle implicazioni": ora il motivo vero (cammini $x \to \neg x$ e ritorno, $\mathrm{NL} = \mathrm{coNL}$) e perché $\mathrm{NL} \subseteq \mathrm{P}$.
- §2 chiusura "La P-completezza non è dunque un risultato noto senza questa uguaglianza": sostituita con l'equivalenza completa, aggiungendo il verso opposto preso dalla spiegazione.
- Buco colmato: come funziona la chiusura di NL (si ricalcola un simbolo alla volta).
- Collegamenti: rettangolo P, ellisse NL, punto verde; riquadro rosa dell'ipotesi, freccia piena e freccia tratteggiata.

### 86 riepilogo-p

- §1 coda negativa "non la sua P-completezza": tenuto il fatto, che corregge un errore vero, scritto come "se PRIMES sia anche P-completo non si sa".
- "Il solo algoritmo di flusso prova soltanto l'appartenenza": ridondante e §2 (ripeteva il titolo); riscritto.
- Buchi colmati: divisori fino a $\sqrt{N}$ sono circa $2^{k/2}$ (con un numero concreto); identità di AKS; perché Edmonds-Karp è polinomiale; com'è fatta la riduzione dal circuito monotono.
- Collegamenti: graffa dei $k$ bit; riquadri di AKS; cammino verde di tre archi contro i grigi; freccia orizzontale e freccia tratteggiata.

### 87 np-pp

- §15 "provando NP ⊆ PP": diventato conclusione esplicita con il tempo $p(n) + 1$.
- Titolo 3 "Supera metà solo se serve" (vago) cambiato in "Più della metà sse $A > 0$".
- Buco colmato: perché il ramo destro fa comunque $p(n)$ scelte.
- Collegamenti: foglie verdi e rosa, $A$; prima moneta e i due sottoalberi; retta con blocco fisso a $2^{p(n)}$ e freccia verde $+A$.

### 88 pp-pspace

- Pochi difetti oltre a quelli comuni. Aggiunto il chiarimento sul tempo, che resta esponenziale (errore tipico).
- Collegamenti: foglie $00\dots0$, $11\dots1$ con i riquadri $M$; ciclo con rombo e riquadro verde $c \gets c + 1$; segno $2^{p(n)-1}$ sulla retta come soglia.

### 89 bpp-inclusioni

- §14 "La separazione garantita da BPP è sufficiente": sostituito con i due confronti espliciti con $1/2$.
- Aggiunto "il contrario non segue", errore tipico della spiegazione.
- Collegamenti: bit casuali barrati; punti verde e rosso sulle due rette; disuguaglianza in rosso.

### 90 bpp-errore

- §14 "L'indipendenza e il margine costante dalla metà fanno diminuire...": ora limite di Chernoff $e^{-2\delta^2 k}$ e motivo ($\delta(2k+1)$ contro $\sqrt{k}$).
- Titolo 3 "Applica la concentrazione" cambiato in "Applica il limite di Chernoff".
- Buchi colmati: perché servono scelte nuove; esempio con tre esecuzioni ($10/64$); da dove viene $O(\log(1/\varepsilon))$, con $k = \lceil -8 \ln \varepsilon \rceil$.
- Collegamenti: copie di $A$; riquadro maggioranza $(2k+1)$; $e^{-\Omega(k)}$ e curva; riquadro $t = O(\log(1/\varepsilon))$ e i due casi.

### 91 bqp

- §15/§14 "conservando i dati necessari": ora "scrive le scelte nei registri", con l'effetto (niente interferenza).
- §14 "divisi per un fattore noto" e "Una costruzione di conteggio con segno": sostituiti con il fattore $(1/\sqrt{2})^h$, il conteggio delle coppie e il blocco che sposta la soglia.
- Titoli 2 e 3 cambiati in "Registra le scelte fatte" e "Conta i cammini con il segno".
- Collegamenti: porta H e misura; albero con registri e foglie acc/rej; fasci verde $N_+$ e rosa $N_-$; termini $N_{++}, N_{+-}, N_{-+}, N_{--}$; tratti verde e rosso della retta; riquadri annidati (con l'avvertenza che non sono dimostrati diversi).

### 92 bqp-2exp

- Pochi difetti. Titolo 1 "Usa il limite di conteggio" (vago) cambiato in "Da BQP a PSPACE".
- Buchi colmati: perché una macchina deterministica in spazio $n^k$ si ferma entro $c^{n^k}$ passi; perché $\mathrm{EXP} \subseteq \mathrm{TIME}(2^{2^n})$.
- Collegamenti: riga in alto e frecce; nodi del grafo delle configurazioni; catena e punto rosa.

### 93 grover-np

- §15 "ripulendo lo spazio ausiliario": riscritto come stato delle uscite del circuito.
- §2 chiusura "Il guadagno è quadratico nella ricerca esaustiva": sostituita con il confronto dei costi e la conseguenza che il tempo resta esponenziale (errore tipico).
- Collegamenti: candidati da $0\dots0$ a $1\dots1$; linee $|y\rangle$, $|0\rangle$, $|-\rangle$ e riquadro verde del segno; barre verde e lilla; diagramma con rombo "accetta?"; catena dei costi.

## Discrepanze fra disegno e matematica

Nelle didascalie c'è la matematica giusta; l'elemento del disegno non viene descritto o viene detto con la notazione corretta.

- fsat-fnp, slide 2: il riquadro dice "L ∈ FNP", ma $L$ è un linguaggio di NP; in FNP sta il problema di ricerca $F_L$. Didascalia con $F_L \in \mathrm{FNP}$.
- fsat-sat, slide 1: il disegno chiama $A$ l'algoritmo per FSAT, mentre nella spiegazione $A$ è il decisore per SAT e $M$ quello per FSAT. La didascalia non usa la lettera.
- fp-fnp, slide 2-3: il disegno prova $\mathrm{FNP} \subseteq \mathrm{FP}$ completando un prefisso del certificato con il verificatore $V$, la spiegazione usa la FNP-completezza di FSAT e la coppia $(R, S)$. Le due prove sono corrette; la didascalia segue il disegno e aggiunge la condizione di arresto che serve con certificati di lunghezza variabile.
- t20-1, slide 2: il riempimento è disegnato con degli 0, simbolo dell'alfabeto di $x$, mentre la prova richiede un simbolo nuovo ($\sqcap$) per riconoscere dove finisce $x$. La graffa dice $N \approx 2^{p(n)}$, ma la lunghezza è esattamente $2^{p(n)}$.
- t20-1, notazione: il disegno chiama $M$ la macchina di NEXP e $N$ la lunghezza allungata, con tempo $2^{p(n)}$ ed esponente $k$; la spiegazione usa $N$ per la macchina, tempo $2^{n^k}$ ed esponente $l$. Le didascalie seguono le etichette del disegno.
- nexp-completi, slide 1: l'ingresso di $C$ è etichettato $x$ e le uscite $g_1(i_1), \dots, g_m(i_m)$; per definizione $C$ riceve il numero binario di una porta e restituisce tipo e predecessori. La didascalia descrive il comportamento corretto.
- nexp-completi, slide 2: la tabella ha indici fino a $2^n - 1$, mentre per tempo $2^{n^k}$ (con $n = |x|$, come nella spiegazione) è $2^{n^k} \times 2^{n^k}$. Torna solo leggendo $n$ come numero di bit di un indice.
- nexp-completi, slide 4: il disegno chiama $\varphi$ la parte senza quantificatori (nella spiegazione è $\psi$) e mette costanti distinte dai testimoni, mentre la spiegazione considera formule senza simboli di funzione e modelli con al più $k$ elementi. Differenza di presentazione, non errore.
- nexp-completi, slide 6: la colonna $R(i)$ ha tutti i valori a 0, anche l'ultima porta, mentre la riduzione impone che la porta d'uscita valga 1. La didascalia non descrive i valori.
- pp-pspace, slide 3: la retta è verde da 0 a $2^{p(n)-1}$ e rosa sopra, ma si accetta proprio sopra la soglia (nel resto del gruppo verde vuol dire accetta). La didascalia non dà significato ai colori. Il disegno usa un solo contatore invece dei due della spiegazione: equivalente.
- bpp-inclusioni, slide 2-3, e bpp-errore, slide 1: soglie $2/3$ e $1/3$ (errore $\le 1/3$), mentre il sito usa $3/4$ e $1/4$ (theorems.ts, glossario, spiegazioni). Le didascalie citano tutte e due le convenzioni.
- bqp, slide 3-4: il fattore dell'ampiezza è $1/2^{p(n)}$ (e $1/2^{2p(n)}$ per il quadrato), mentre con $h$ passi di ampiezza $\pm 1/\sqrt{2}$ è $(1/\sqrt{2})^h$; il disegno torna solo se $h = 2p(n)$. Inoltre $\alpha_x$ e $N_\pm(x)$ indicizzano la configurazione finale con $x$, la stessa lettera dell'input. Didascalie con $(1/\sqrt{2})^h$ e $2^{-h}$, senza indice.
- bqp-2exp, slide 3: l'intestazione dice $\mathrm{EXP} \subseteq 2\text{-}\mathrm{EXP}$, ma il passo usa l'inclusione stretta; la didascalia la dice stretta. Slide 2: il grafo delle configurazioni è disegnato come un albero che si ramifica, mentre per una macchina deterministica ogni configurazione ha un solo successore; la didascalia parla solo dei nodi.
- 2sat-p-completo: i disegni mostrano solo il verso "P-completo ⇒ P = NL". Non è un errore; il verso opposto è aggiunto nella didascalia 3, dalla spiegazione.

## Ritagli

Alcuni pannelli contengono pezzi dei pannelli vicini (fp-fnp 4 in basso; t20-1 1-4 in alto e in basso; bqp e bqp-2exp in basso, con numeri come "10", "11", "12"). Non riguardano la matematica e le didascalie li ignorano.
