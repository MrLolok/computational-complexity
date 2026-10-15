# Revisione dei file 01–23

Revisore indipendente dei file `spiegazioni/teoremi/01-*.md` … `23-*.md`. Riferimenti usati: `STRATEGIA.md`, il modello `26-savitch.md`, `src/data/theorems.ts`, `theoremProofs.json`, `theoremWalkthroughs.json`, i log `batch-1.md` e `batch-2.md`.

## Invocazione di humanizer

`humanizer` invocata una volta con lo strumento Skill all'inizio della revisione: caricata correttamente da `.claude/skills/humanizer/` (regole §1–§26). Le modifiche di forma qui sotto seguono quelle regole e sono minime.

## Modifiche per file

Su tutti i 23 file: nessun trattino lungo, nessun grassetto, nessuna virgoletta curva, `$` bilanciati (controllati anche dopo le modifiche). Ogni numero degli esempi ricontrollato a mano.

- 01-ricorsivo-re: nessuna modifica.
- 02-speedup-multinastro: nessuna modifica (esempio con due nastri e spostamento del blank verificato).
- 03-ram-mdt: nessuna modifica ($2^{11}$ ha 12 bit, $2^{1024}$ ne ha 1025, codifica dei registri 0:110, 10:11, 101:1100 verificate).
- 04-linear-speedup: nessuna modifica ($m = 900$, 540 000 passi, 600 fasi, 3662 $= n^2 + n + 2$, $4^{900} = 2^{1800}$ verificati).
- 05-mdt-io: nessuna modifica.
- 06-space-compression: nessuna modifica (blocchi con $m = 3$, 9 contro 4 celle, 101 contro 102 verificati).
- 07-p-sub-np: nessuna modifica.
- 08-ndet-det: secondo inciampo, "L'esponenziale non è dimostrato necessario." seguito dalla stessa cosa detta di nuovo ("nessuno ha dimostrato che non si possa fare di meglio") → tolta la prima frase (humanizer, ripetizione e chiusura §2). Numeri verificati (dodicesima sequenza, 11 e 14 tentativi, $2^{101} - 2 > 10^{30}$).
- 09-reach-nl: nessuna modifica.
- 10-gap-theorem: nessuna modifica (intervalli $[2,4]$, $[5,32]$, $[33, 2^{33}]$ e $f(1) = 33$ verificati).
- 11-soluzioni-precise: "la simulazione finisce sempre prima del metro" (impreciso: se $M$ usa esattamente $f(|x|)$ passi finisce alla fine del metro, non prima) → "finisce sempre entro la fine del metro" (precisione).
- 12-terminazione-space: nessuna modifica ($3 \cdot 2^{20} \cdot 21 = 66.060.288$ e 42 celle verificati).
- 13-chiusura-det-complemento: nessuna modifica.
- 14-hf-upper:
    - tabella dei fattori, "al più $\log^3 n \le f(n)$" → "$\log^3 n = O(f(n))$" (errore matematico: la disuguaglianza è falsa per $n$ piccoli, per esempio $n = 100$, $f(n) = n$ dà $\log_2^3 100 \approx 293 > 100$; vale solo asintoticamente, come dice già la formula a blocco);
    - aggiunta una parentesi sull'origine del quadrato su $k_M$ (una passata per ognuno dei $k_M$ nastri lungo un nastro che li contiene tutti, come nello speedup multinastro): buco minimo segnalato dagli autori stessi (dubbio 7 di batch-2).
- 15-hf-lower: nessuna modifica.
- 16-time-hierarchy: nessuna modifica.
- 17-p-neq-exp: definizioni di P ed EXP con `k > 0` → `k \gt 0`, come in `classes.ts` (STRATEGIA: le formule riprese devono essere quelle dei dati). Tabelle e conti ($729 > 512$, $1000 < 1024$, $39 > 36$, $45 \le 49$) verificati.
- 18-space-hierarchy: "Il corso non dà la prova; qui c'è lo schema standard, la stessa diagonalizzazione del tempo con una macchina diversa." → "La prova usa la stessa diagonalizzazione del teorema per il tempo, con una macchina diversa." (STRATEGIA: niente rimandi al corso; humanizer §25, frase sul testo invece che sul contenuto).
- 19-ndet-hierarchy:
    - "Il corso enuncia questi risultati senza prova; qui c'è lo schema delle prove standard." → tolta; "teoremi deterministici visti" → "teoremi di gerarchia deterministici" (rimando al corso; i gradini restano nominati esplicitamente, quindi il confronto resta vero);
    - "simula [$M_i$ su $1^{n+1}$] per $n^c$ passi" → "per $(n+1)^c$ passi, il budget di $M_i$ su un input lungo $n+1$" (errore matematico: con $n^c$ passi la simulazione può tagliare un ramo accettante di $M_i$ su $1^{n+1}$, e la copia non è più corretta);
    - "ogni macchina compare infinite volte nell'elenco, quindi riceve intervalli lunghi quanto serve" → "riceve anche intervalli che cominciano da lunghezze grandi quanto serve" (precisione: per assorbire la costante serve che $a_i$ sia grande, non che l'intervallo sia lungo).
- 20-time-in-space:
    - "Nel corso è citata senza prova; questo è lo schema." → tolta (rimando al corso);
    - inciampo finale, "il tempo può arrivare all'ordine di $k^{f(n)}$" con $k$ mai definito nel file → "$c^{f(n)}$, con $c$ costante" (chiarezza).
- 21-space-in-time: nessuna modifica (base $8|K||\Sigma|$, $5 \cdot 1001 \cdot 1024 \cdot 10 = 51.251.200$, $80^{10} \approx 1{,}07 \cdot 10^{19}$ verificati).
- 22-t7-4a: nessuna modifica.
- 23-t7-4b: nessuna modifica.

Aderenza a STRATEGIA: nessun esercizio, nessuna parte d'esame, nessuna spiegazione di corollari; dopo le modifiche nessun rimando a corso, lezioni, dispensa o slide. Lunghezze nelle fasce previste (12 e 14 al limite alto dei teoremi medi, giustificate dagli esempi).

## Dubbi sui dati segnalati dagli autori

### batch-1

1. `soluzioni-precise`, "precisa vuol dire esattamente $f(|x|)$ passi": fondato. La dimostrazione dà i passi di $M_f$ più $f(|x|)$ più una costante, che dipendono solo da $|x|$ ma non valgono $f(|x|)$; nella definizione standard le funzioni che fissano durata e spazio di una macchina precisa non coincidono con il budget.
2. `speedup-multinastro`, codifica $\triangleright' w_i u_i$: fondato, imprecisione minore. Nella codifica standard $\triangleright'$ prende il posto del primo simbolo di $w_i$ (che è $\triangleright$) e può essere esso stesso marcato; scritto fuori da $w_i$, il cursore su $\triangleright$ resta senza rappresentazione. Nessun effetto sul teorema.
3. `ram-mdt`, $\ell \le f(n)$ implicito: fondato ma convenzionale. Il sito usa altrove la convenzione "un budget di tempo è almeno $n$" (prove di `soluzioni-precise` e `mdt-io`); per una RAM è un'ipotesi ($f(n) \ge n$), non un fatto. La spiegazione la dichiara.
4. `gap-theorem`, "non propria" contro "non necessariamente costruibile": non fondato come contraddizione (lo storyboard dice meno, le due frasi sono compatibili). "Non propria" è vero: siccome $f(n) \ge 2n$, se $f$ fosse propria la forma forte della gerarchia, $\mathrm{TIME}(f(n)) \subsetneq \mathrm{TIME}(f(n) \log^2 f(n)) \subseteq \mathrm{TIME}(2^{f(n)})$, separerebbe le due classi. Manca solo la giustificazione nei dati.
5. `linear-speedup`, arrotondamento delle fasi: fondato, imprecisione minore (le fasi sono $\lceil f/m \rceil$, il limite può essere superato di al più 6 passi). Si assorbe prendendo $m$ un po' più grande e trattando a tabella gli input corti.
6. `ndet-det`, sequenze scartate non nominate nella regola di rifiuto: fondato, lacuna minore; il completamento della spiegazione è corretto.

### batch-2

1. `terminazione-space`, fattore del cursore di input e $f(n) \ge \log n$: fondato. Le configurazioni vanno moltiplicate per le posizioni sull'input, e contarle richiede circa $\log n$ celle, che stanno in $O(f(n))$ solo se $f(n) \ge \log n$; l'enunciato non lo chiede, lo storyboard sì.
2. `terminazione-space`, caso deterministico che cicla: fondato ma innocuo. Una deterministica che decide si ferma per definizione, quindi l'osservazione del punto 2 è vuota; il teorema dice qualcosa solo per le nondeterministiche.
3. Posizioni del cursore contate in modi diversi ($f(n)+1$ contro $f(n)$): fondato, solo notazione, nessun effetto. Lo stesso vale per il cursore di input: 05 conta $n+2$ posizioni ($\triangleright$, $n$ simboli, primo blank, il conto esatto), 12 e 21 seguono i dati con $n+1$.
4. `t7-4b`, $f$ propria non enunciata: fondato per la prova dei dati, che deve conoscere $f(n)$. L'enunciato senza ipotesi resta comunque vero: basta provare lunghezze crescenti con la regola di arresto del teorema da nondeterministico a deterministico, in spazio $O(t) \le O(f(n))$.
5. `space-in-time`, $k$ usato per i nastri e per la base: fondato, solo notazione; la spiegazione lo evita.
6. `ndet-hierarchy`, condizione $f(n+1) = O(g(n))$ attribuita alla strada di Immerman e Szelepcsényi: fondato. Con la chiusura per complemento basta $f = o(g)$ ($g$ almeno logaritmica e costruibile); la condizione su $f(n+1)$ viene dal risultato traslazionale precedente (Seiferas). Il gradino $2^{2^{n+1}}$ è un risultato vero ma non il più fine. Sull'intuizione "molto più fitte": per lo spazio è vera solo contro la forma $f(n) \log f(n)$; per il tempo è vera solo contro $f(2n+1)^3$, non contro $\mathrm{TIME}(f) \subsetneq \mathrm{TIME}(f \log^2 f)$, che il sito stesso cita ed è più fine di $n^c$ contro $n^d$. La spiegazione nomina esplicitamente i due gradini deterministici, quindi non lo contraddice.
7. `hf-upper`, $k_M^2$ non spiegato: fondato (lacuna, non errore). Colmato nella spiegazione con una parentesi.

### Nuovi rilievi del revisore sui dati

- `ndet-hierarchy`, punto 2 della dimostrazione: $D$ simula $M_i$ su $1^{n+1}$ "per $n^c$ passi"; il budget di $M_i$ su quell'input è $(n+1)^c$. Fondato, imprecisione; corretta nella spiegazione 19.
- `soluzioni-precise` (definizione di funzione propria nei dati): "passi e spazio di $M_f$ dipendono solo da $|x|$" non fa parte della definizione standard; si ottiene facendo lavorare $M_f$ su una stringa di $|x|$ simboli uguali. Da verificare; non cambia la spiegazione.
