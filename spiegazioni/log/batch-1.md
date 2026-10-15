# Batch 1: log della riscrittura

Teoremi: 01-ricorsivo-re, 02-speedup-multinastro, 03-ram-mdt, 04-linear-speedup, 05-mdt-io, 06-space-compression, 07-p-sub-np, 08-ndet-det, 09-reach-nl, 10-gap-theorem, 11-soluzioni-precise.

## Invocazioni delle skill

| skill                                                    | invocazioni                                                      | caricata       |
| -------------------------------------------------------- | ---------------------------------------------------------------- | -------------- |
| `anthropic-skills:learn`                                 | 1, all'inizio, con l'adattamento a testo statico di STRATEGIA.md | sì             |
| `humanizer` (`.claude/skills/humanizer/`, modalità file) | 11, una per file, nell'ordine 01 → 11                            | sì, tutte e 11 |

Da learn ho tenuto quello che STRATEGIA prevede per un testo statico: domande di controllo con risposta in `<details>`, spiegazione diretta (il teorema è un concetto nuovo), un esempio parallelo svolto dove mostra il meccanismo, tabelle o blocchi di codice per le strutture, gli errori veri in "Dove si inciampa di solito".

Per ogni file humanizer ha fatto i quattro passi: segnare i difetti, riscrivere, ricontrollare (fatti aggiunti o persi, poi §1, §2, §6, §8, §19), versione finale. Nel file c'è solo la versione finale. I blocchi di codice sono rimasti invariati.

## Difetti segnati da humanizer e modifiche

### 01-ricorsivo-re

- §3 "la proposizione sta tutta lì" (frase a effetto) → indicazione concreta: che cosa chiede l'accettazione sugli input fuori da $L$.
- §11 "Ogni istruzione ... viene cambiata" → forma attiva: "Le istruzioni che in $M$ portano nello stato "no", in $M'$ portano invece in $q_\infty$".
- Passo 3: "Per questo l'inclusione non si rovescia" presentava la costruzione mancata come prova dell'inclusione stretta → frase separata ("Anche l'inclusione vale in un verso solo").
- Tenuti due contrasti §1 ("Non basta: la definizione chiede...", "$M'$ non risponde mai no") perché correggono convinzioni che il lettore ha davvero.

### 02-speedup-multinastro

- §19 elenco con etichette "Lettura." / "Scrittura." in testa ai punti → prosa ("Nella prima... Nella seconda...").
- §4 aperture "Le difficoltà sono due." e "C'è un caso speciale." → tolte, il contenuto parte subito.
- §1 "$M'$ non è più veloce di $M$, è più lenta" → "Il nome inganna: $M'$ è più lenta di $M$" (la correzione resta perché il nome trae in inganno, ma detta in positivo).
- §2 chiusa "Tutto ciò che cresce con l'input sta sul nastro" → tolta.
- Ripetizioni fra sezioni: il numero finito di stati e l'origine del fattore $f(n)$ tornavano negli inciampi → inciampi ridotti a uno; "il numero di nastri entra solo nella costante $k^2$" spostato nel conto.
- §11 "La posizione di ogni cursore si scrive sul nastro" → "$M'$ le segna sul nastro stesso".

### 03-ram-mdt

- §3 "è proprio il punto delicato" → "tienila a mente", più una frase su a che cosa serve il lemma.
- §3 "Tutto si regge su un lemma" → tolta, la sezione comincia dal lemma.
- Ripetizione del "7" in due sezioni → una volta sola, nella simulazione.
- Passo 3: "Con un altro numero costante di nastri il conto resterebbe $O(f(n)^3)$" non era sostenuto (con meno nastri la costruzione cambia) → "conta che sia fissato e non dipenda dall'input". "crescerebbe come $2^t$" → "potrebbe crescere".
- Tenuta la terna "istruzioni, coppie, lunghezza" (§6): il cubo ha davvero tre fattori.

### 04-linear-speedup

- §19 elenco "Lettura, 4 passi." / "Scrittura, 2 passi." → prosa.
- §7 "Da qui viene... Da qui viene anche..." → "È il termine $n + 2$... Spiega anche...".
- §1 "Il teorema non rende più veloce un algoritmo dato: dice che..." → "Quello che il teorema stabilisce riguarda le classi".
- §2 chiusa "È un numero assurdo, ma non dipende dall'input" → tolta (ripeteva la risposta iniziale).

### 05-mdt-io

- §4 apertura "Il terzo vincolo chiude una scappatoia." → "Senza il terzo vincolo la macchina potrebbe...".
- §2 frammento "Due nastri in più: ..." → frase intera.
- Tenuto l'elenco dei tre vincoli (§6): sono davvero tre, presi dai dati.

### 06-space-compression

- §2 chiusa "Lo spazio si riduce di un fattore costante e basta" → tolta.
- Ripetizione dell'esempio con 1000 celle in due sezioni → nel conto resta solo il dettaglio nuovo, l'arrotondamento (101 contro 102).
- Primo inciampo accorciato: "e $M'$ lo legge com'è" ripeteva la sezione sull'idea.

### 07-p-sub-np

- Ripetizione: la frase iniziale ("una MdT deterministica è una nondeterministica con una sola mossa") tornava nel paragrafo su $\Delta$ ("per caso è una funzione... a tutti gli effetti") → paragrafo ridotto alla parte nuova (la definizione chiede una relazione, una funzione lo è).
- Nessun altro difetto segnato.

### 08-ndet-det

- Ripetizione fra sezioni: "per rifiutare bisogna escluderle tutte" compariva tre volte (dopo le risposte, in "Il problema", negli inciampi) → dopo le risposte un rimando alla definizione, nell'inciampo solo l'errore.
- §1 "non può dire 'ho provato tutte le sequenze...'. Usa un'altra regola" → "non può fermarsi dopo aver provato le sequenze lunghe $f(n)$. Rifiuta con questa regola". Il contrasto è tenuto in forma ridotta, perché il lettore si aspetta davvero uno stop a $f(n)$.
- Ultimo inciampo con due formulazioni dello stesso fatto ("È il costo che si conosce; per quanto si sa oggi...") → una sola.

### 09-reach-nl

- §11 "Il cammino non viene mai scritto da nessuna parte" → "$N$ non scrive mai il cammino".
- §4 apertura "Altre computazioni vanno diversamente." → tolta.
- Primo inciampo: la seconda frase ripeteva "basta una computazione" → tolta.
- Secondo inciampo: ripeteva "Il problema" (visita deterministica) e "la definizione lo permette" sui cicli → riscritto sull'errore vero, cioè voler ricordare i nodi visitati.
- Passo 3: "circa 60 bit" → "contatore compreso" (il 60 conta tre numeri da 20 bit).

### 10-gap-theorem

- §2 chiusa "Mostra che l'ipotesi 'propria' serve davvero" → tolta.
- Ripetizione "ricorsiva ma non propria" (dopo le risposte e in fondo) → in fondo resta solo l'intuizione ("Che questa $f$ non sia propria lo si intuisce...").
- Secondo inciampo: ripeteva due passaggi del testo ($M_i$ coperta solo per $n \ge i$) → sostituito con l'errore di lettura vero, prendere l'enunciato esistenziale per una legge generale.
- Tenuto il contrasto "non serve sapere se si ferma: basta simularla", perché risponde al dubbio reale sul problema dell'arresto.

### 11-soluzioni-precise

- §2 e ripetizione: "Durata e lunghezza dipendono solo da $|x|$" più "Permette quindi di supporre... dipendano solo da $|x|$" (lo stesso concetto tre volte in pochi righi) → una frase.
- §3 "la macchina $M_f$ è l'unico strumento del teorema" → "tutta la costruzione si appoggia su $M_f$".
- §3 "è questo che rende la durata uguale", in un inciampo che ripeteva la costruzione → riscritto con la conseguenza dell'errore (5 contro 8 passi nell'esempio).
- Tenuto il contrasto quasi-blank/blank veri: risponde a una domanda reale e tutte e due le metà dicono qualcosa.

## Buchi minimi colmati

- 01: perché la macchina che decide $L$ non lo accetta già (l'accettazione chiede di non fermarsi fuori da $L$); come si realizza il ciclo infinito (stato $q_\infty$ senza istruzioni di arresto); perché la costruzione non si rovescia.
- 02: perché si marcano i cursori; perché lo stato può ricordare $k$ simboli (stati in numero finito, indipendente dall'input); perché ogni nastro è lungo $O(f(n))$ (si allunga solo oltre la fine; l'input sta nel limite perché un budget di tempo è almeno $n$); da dove viene $k^2$; i due fattori $f(n)$ hanno origini diverse; ordine di grandezza (1000 passi, circa un milione).
- 03: la RAM conta un passo per istruzione qualunque sia la lunghezza dei numeri; perché nel modello manca la moltiplicazione ($2^{11}$ contro $2^{1024}$); perché anche gli indirizzi sono lunghi $O(f(n))$ (indirizzamento indiretto); $\ell \le n \le f(n)$; il 7 conta solo come costante; i tre fattori $f(n)$ del cubo.
- 04: perché c'è il termine $n + 2$ e perché non si accelera; perché un nastro in più se $k = 1$; perché bastano i $3m$ simboli vicini; perché cambia un solo blocco vicino (per toccarli entrambi servono più di $m$ passi); perché $m = \lceil 6/\varepsilon \rceil$; esempio $150 n^2$ con $n = 60$ (540000 contro 3662 passi); dimensione dell'alfabeto $4^{900} = 2^{1800}$; caso $f$ lineare.
- 05: perché l'input non si conta nello spazio; a che cosa serve il terzo vincolo (il cursore come contatore); perché si copiano input e output; perché l'output è lungo al più $f(n)$; perché $O(n)$ si assorbe; la copia occupa $n$ celle di lavoro (inciampo).
- 06: perché manca il termine $n$; da dove viene il 2; esempio con $m = 3$; numeri con 1000 celle (101 contro il limite 102); perché $m$ deve essere costante.
- 07: perché una funzione conta come relazione; perché il viceversa non segue togliendo mosse.
- 08: perché $d$ è finito; sequenze che non corrispondono a computazioni; perché $M$ non può fermarsi a $f(n)$ e come rifiuta; perché la somma geometrica è $O(d^{f(n)})$; perché $c = 2d$ funziona; esempio con $d = 2$; più di $10^{30}$ sequenze con $f(n) = 100$.
- 09: perché un nome di nodo occupa circa $\log n$ celle (20 bit per un milione); perché l'input non si conta; $\log(n^2) = 2 \log n$; perché un cammino senza ripetizioni ha meno di $n$ archi (contatore); esempio con 5 nodi in binario; 60 bit contro $10^{12}$ caselle.
- 10: perché gli intervalli sono disgiunti; perché una computazione cade in al più un intervallo; perché solo $M_0, \ldots, M_n$; perché $f$ è ricorsiva senza decidere l'arresto; esempio con $n = 1$; intuizione del perché $f$ non è propria.
- 11: che cosa vuol dire precisa, con un esempio (5 e 8 passi); perché il metro è di quasi-blank; perché $O(n + f(n)) = O(f(n))$; caso nondeterministico; esempio con $f(n) = n^2$.

## Dubbi ed errori nei dati del sito (non corretti)

1. `soluzioni-precise`, campo `enunciato` in `theorems.ts`: "Precisa vuol dire che ogni computazione si ferma dopo esattamente $f(|x|)$ passi". Contraddice la dimostrazione in `theoremProofs.json`, dove i passi sono "quelli di $M_f$ più $f(|x|)$, più una costante" e il tempo è $O(f(n))$, e anche lo storyboard ("durata o spazio dipendono solo da n"). La spiegazione segue la dimostrazione: precisa vuol dire che durata e lunghezza dei nastri dipendono solo da $|x|$.
2. `speedup-multinastro`, punto 1 della dimostrazione: la codifica è $\triangleright' w_1 u_1 \triangleleft \ldots$ con "in ogni $w_i$ l'ultimo simbolo (quello sotto il cursore) è marcato". Se $w_i$ non comprende $\triangleright$, il caso del cursore su $\triangleright$ resta scoperto (con $w_i$ vuoto non c'è un ultimo simbolo da marcare). È un'imprecisione minore; l'esempio della spiegazione evita quel caso.
3. `ram-mdt`, punto 4: "(l'input e le costanti si contano nel budget)" usa in modo implicito $\ell \le f(n)$, cioè un budget almeno lineare. Per le MdT il sito lo dice esplicitamente; per una RAM, che potrebbe non leggere tutto l'input, non è scontato. Nella spiegazione ho usato la convenzione del sito ("un budget di tempo è sempre almeno $n$").
4. `gap-theorem`: la dimostrazione dice "La $f$ costruita è ricorsiva ma non propria", lo storyboard dice "non necessariamente costruibile entro il proprio budget". Le due formulazioni non coincidono e nessuna delle due è giustificata nei dati. La spiegazione dice solo che lo si intuisce dal modo in cui si calcola $f$.
5. `linear-speedup`, punto 6: il conto è "circa $|x| + 2 + 6 \cdot f(|x|)/m$". Con l'arrotondamento dell'ultima fase ($6 \lceil f/m \rceil \le 6f/m + 6$) il limite esatto $\varepsilon \cdot f(n) + n + 2$ dell'enunciato può essere superato di una costante. L'esempio della spiegazione usa numeri divisibili ($n = 60$, $m = 900$) e non tocca il problema.
6. `ndet-det`, punto 5: la regola per rifiutare non nomina le sequenze scartate (scelte che non esistono). Nella spiegazione ho aggiunto "vengono scartate o portano a computazioni già ferme"; è un completamento, non una contraddizione.

## Controlli finali (sezione "Controlli prima di consegnare")

- `grep -n '[—–]\|\*\*'`: nessun risultato su tutti e 11 i file; nessuna virgoletta curva.
- `$` e `$$` bilanciati in tutti i file (blocchi di codice esclusi). Formule riprese dai dati: uguali; in 04, 06 e 08 ho sostituito `>` con `\gt` dentro le formule, come nei dati.
- Numeri degli esempi ricontrollati a mano: codifiche e spostamento del blank (02); $2^{11}$ ha 12 bit, $2^{1024}$ ne ha 1025, registri in binario (03); $150 \cdot 3600 = 540000$, $540000/900 = 600$ fasi, $6 \cdot 600 = 3600$, $3600 + 62 = 3662 = n^2 + n + 2$, $4^{900} = 2^{1800}$ (04); 9 celle contro 4, $\lceil 999/10 \rceil + 1 = 101 \le 102$ (06); dodicesima sequenza, $2+4+5 = 11$, $2+4+8 = 14$, $2^{101} - 2 > 10^{30}$ (08); 001, 011, 100, 101; $2^{20} \ge 10^6$; $3 \cdot 20 = 60$ (09); $k_1 = 2$, $k_2 = 5$, $k_3 = 33$, 4 computazioni e 5 intervalli (10); $5 + 4 = 8 + 1 = 9$ (11).
- Riletti cercando contrasti, chiusure, terne e grassetti: i contrasti rimasti correggono convinzioni reali (01, 02, 08, 09, 10, 11); le terne rimaste hanno davvero tre elementi (03, 05).
