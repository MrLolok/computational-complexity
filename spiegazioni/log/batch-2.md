# Batch 2: log della riscrittura

Teoremi: 12-terminazione-space, 13-chiusura-det-complemento, 14-hf-upper, 15-hf-lower, 16-time-hierarchy, 17-p-neq-exp, 18-space-hierarchy, 19-ndet-hierarchy, 20-time-in-space, 21-space-in-time, 22-t7-4a, 23-t7-4b.

## Invocazioni delle skill

| skill | invocazioni | caricata |
|---|---|---|
| `anthropic-skills:learn` | 1, all'inizio, con l'adattamento a testo statico di STRATEGIA.md (nessuna domanda all'utente) | sì |
| `humanizer` (`.claude/skills/humanizer/`, modalità file) | 12, una per file, nell'ordine 12 → 23 | sì, tutte e 12 |

Da learn ho tenuto quello che STRATEGIA prevede per un testo statico: domande di controllo con risposta in `<details>` e una frase su cosa rileggere, spiegazione diretta, un esempio piccolo svolto dove mostra il meccanismo, tabelle o blocchi di codice per le strutture (configurazioni, catena della diagonalizzazione ritardata, albero delle computazioni, sequenze di scelte), gli errori veri in "Dove si inciampa di solito".

Per ogni file humanizer ha fatto i quattro passi: segnare i difetti, riscrivere, ricontrollare (fatti aggiunti o persi, poi §1, §2, §6, §8, §19), versione finale. Nel file c'è solo la versione finale. I blocchi di codice sono rimasti invariati.

## Difetti segnati da humanizer e modifiche

### 12-terminazione-space

- §2/§4 frase dopo le risposte "Se la seconda risposta ti sembra incompleta, hai già visto il problema" → indicazione su cosa rileggere e perché.
- §2 frammento "Un budget di spazio no." → fuso nella frase che dice che cosa limita il budget di spazio.
- §20 titolo "L'idea: le fotografie possibili sono poche" → "L'idea: contare le configurazioni".
- §25 "La tabella guarda un solo nastro" → "Il conto vale per un solo nastro".
- §2 ripetizione: dopo l'esempio la spiegazione del taglio ripeteva il paragrafo generale → ridotta a una frase.
- Ripetizione fra sezioni: la seconda voce di "Dove si inciampa" (chiudere i rami in "no" non cambia il linguaggio) ripeteva "L'idea" → fusa lì e tolta dagli inciampi.
- Notazione: $C1 \to C2$ nel testo → $C_1 \to C_2$ come nel resto.
- Tenuto il contrasto §1 "$M'$ invece non riconosce nessun ciclo": corregge un'idea che lo studente ha davvero.

### 13-chiusura-det-complemento

- §1 contrasto ripetuto tre volte (nella risposta "Non è l'insieme dei linguaggi che stanno fuori da $C$", poi "sono un'altra cosa", poi la frase dopo le risposte) → la correzione resta una volta, dopo le risposte, con il motivo concreto ($C = \mathrm{co}C$ sarebbe impossibile).
- §13 chiusura "Per questo non si sa se $\mathrm{NP} = \mathrm{coNP}$" (causalità gonfiata) → "l'argomento non si estende a NP, e se $\mathrm{NP} = \mathrm{coNP}$ è una domanda aperta".
- Precisione: "con gli stessi $n$ passi" → "facendo gli stessi passi".

### 14-hf-upper

- §2 chiusura dopo l'esempio della sveglia "È esattamente la definizione di $H_f$" → tolta.
- §6/§26 frase riassuntiva "L'ipotesi $f(n) \ge n$ serve in tre punti: ..." che ripeteva il paragrafo → tolta; ogni uso resta nel punto in cui nasce.
- Ripetizione fra "Il conto" e la seconda voce di "Dove si inciampa" (la costante non può dipendere da $M$) → fusa nel conto con il dato nuovo ($O(f(n)^2)$ con $M$ fissata); al suo posto un errore diverso (prendere il cubo per il costo vero di $H_f$).
- §12/§13 enfasi "è proprio il metro" → "è il metro".

### 15-hf-lower

- §3 "questo lemma ne è la versione con il cronometro" → "usa la stessa idea, con in più un limite di tempo".
- §3 "Il tempo di $D_f$ decide tutto" → "Conta il tempo di $D_f$".
- §2 chiusura dopo la tabella "Ogni riga arriva al contrario di dove parte" → conclusione logica esplicita (uno dei due casi deve valere, entrambi si contraddicono).
- §4 apertura "Nella prima riga il tempo conta." → "Si sottovaluta il ruolo del tempo nella prima riga."
- Precisione: l'esempio "se $M_H$ impiegasse $f(n)^3$ passi" → "$f(2n+1)^3$ passi sull'input $D_f;D_f$, lungo $2n+1$".

### 16-time-hierarchy

- §4 apertura con domanda retorica "Con più tempo si risolvono più problemi? Non è scontato." → frase dichiarativa.
- §4 "Ora la conclusione." → tolto.
- §2 frammento "mai meno di $n$" → "quindi sempre almeno $n$".
- Ripetizioni fra sezioni: la voce "Si usa $H_f$ invece di $H_g$" ripeteva "L'idea", la voce "un po' di tempo in più" ripeteva "Il problema" → tolte; il punto "non separa $\mathrm{TIME}(n)$ da $\mathrm{TIME}(n^2)$" spostato dall'esempio a "Dove si inciampa".
- "il testimone" → "il linguaggio che separa le due classi".
- Precisione: "$f(n) \ge n \ge 1$" (falso per $n = 0$) → "$f(2n+1) \ge 2n+1 \ge 1$".

### 17-p-neq-exp

- §3 frase dopo la risposta "è l'unico ostacolo della prova" → indicazione su cosa fissare prima di proseguire.
- §7 aperture ripetute "Primo anello. / Secondo anello. / Terzo anello. / Quarto anello." → elenco numerato che apre ogni punto con l'inclusione.
- Ripetizione: la seconda voce di "Dove si inciampa" (applicare la gerarchia a ogni $n^k$) ripeteva "Il problema" → tolta.

### 18-space-hierarchy

- §4 domanda retorica "Quanto spazio serve a $D$ per simulare $M$?" → frase con soggetto $D$.
- §4 apertura "Qui servono gli zeri del punto 2." → frase che dice perché il punto 2 accetta zeri in coda.
- §25 "Il corso non dà la prova. Quello che segue è lo schema standard" → una frase sola.
- Ripetizione: la seconda voce di "Dove si inciampa" (il teorema di terminazione serve due volte) ripeteva la sezione sulla macchina $D$ e la prova → tolta.

### 19-ndet-hierarchy

- Frase dopo le risposte "La prima risposta è l'ostacolo di tutto il teorema" → riformulata senza enfasi.
- §24 titolo "Spazio: il complemento si fa" seguito da "Per lo spazio l'ostacolo non c'è." → frase tolta.
- Ripetizione: la sezione "perché la diagonalizzazione solita non funziona" ripeteva la risposta 1 → tenuta solo la parte nuova (NP contro coNP, costo esponenziale).
- §2 "Per questo $b_i$ deve essere..." frase finale staccata → integrata nella frase precedente.
- Precisione: "Ogni uguaglianza della catena è una copia" era falso (metà vengono dall'ipotesi su $M_i$) → "Dei passaggi che dipendono da $D$, tutti tranne uno sono copie".
- Ripetizioni: le due voci di "Dove si inciampa" (rovesciamento una sola volta, perché $b_i$ è enorme) ripetevano il testo → sostituite da un errore diverso (leggere "gerarchie più fitte" come confronto con il determinismo).
- Esempio $n^{1,1}$ (virgola decimale ambigua in LaTeX) → $n^{3/2}$.
- Ricontrollo finale: "è proprio la sua regola" → "accettare quando esiste un ramo che accetta è la sua regola".

### 20-time-in-space

- Ripetizione: la seconda voce di "Dove si inciampa" ("Si pensa che servano più macchine o una simulazione") ripeteva l'apertura dell'idea → tolta.
- §2 "è un passo che non porta spazio nuovo" alleggerita.
- §11 "gli stessi blocchi vengono ricalcolati" → "la macchina ricalcola molte volte gli stessi blocchi".
- Precisione: "un contatore su 10 celle conta fino a 1024" → "passa per tutti i $2^{10} = 1024$ valori".
- Aggiunta la frase su cosa rileggere dopo la risposta (struttura di STRATEGIA).

### 21-space-in-time

- §2 frase dopo le risposte "Se la seconda risposta ti torna, hai già metà della prova" → indicazione su cosa rileggere.
- §4 "Adesso la parte deterministica." → tolto.
- Struttura: la frase sul perché serve $f(n) \ge \log n$ stava nell'esempio → spostata dove l'ipotesi si usa.
- §1 contrasto generico "Si cerca una simulazione. Non ce n'è bisogno" → reso specifico (confusione con il teorema di terminazione, che costruisce una macchina nuova).

### 22-t7-4a

- §3/§20 titolo a effetto "L'idea: una sola scelta è ancora una scelta" → "L'idea: una macchina con una sola scelta".
- Precisione: "con un costo che per il tempo diventa esponenziale" → "per il tempo, con i metodi noti, questo costa un esponenziale".
- Aggiunta la frase su cosa rileggere dopo la risposta.
- Tenuto il contrasto §1 "dice solo che il nondeterminismo non perde problemi": corregge una lettura sbagliata reale.

### 23-t7-4b

- §2/§16 frase dopo le risposte con iperbole ("un'infinità pratica") → indicazione su cosa rileggere; il dato $d^{f(n)}$ spostato in "Il problema".
- §14 formula vaga "come negli altri teoremi di questo tipo" → tolta.
- §11 "le celle del suo ramo vengono cancellate e riusate" → "$M$ cancella le celle del suo ramo e le riusa".
- §2 chiusura "È il riuso a tenere lo spazio a $O(f(n))$" e seconda voce di "Dove si inciampa" che ripeteva l'esempio → fuse nella prima voce; il riuso è detto nel conto.
- "non si sa fare di meglio" → "non si conosce un modo più veloce".

## Buchi minimi colmati

- 12: perché da una configurazione ripetuta si può tagliare il giro (stessa configurazione, stesse mosse lecite); perché il teorema conta per le macchine nondeterministiche (una deterministica che decide si ferma già); fattore $n+1$ del cursore di input e ipotesi $f(n) \ge \log n$; perché serve $f$ propria (il metro per il contatore); perché il contatore a ruote miste ha esattamente $c$ valori; numero concreto ($f(n) = 20$: 66 milioni di passi con 42 celle).
- 13: che cosa contiene $\mathrm{co}C$; perché serve che $M$ si fermi sempre; esempio della parità; controesempio nondeterministico con 8 assegnamenti.
- 14: perché $f(|x|) \le f(n)$; perché il fattore $\ell_M k_M^2$ va limitato con $n$ (un solo limite per tutte le $M$); perché $\ell_M, k_M \le \log n$; esempio con $n = 1024$; da dove vengono i tre fattori del cubo; dove si usa $f(n) \ge n$; esempio della sveglia lunga 9.
- 15: perché $\lfloor n/2 \rfloor$ ($|M;M| = 2n+1$, il raddoppio va compensato); perché "non accetta entro $f(n)$ passi" vuol dire "rifiuta" solo grazie al tempo di $D_f$; perché il lemma non contraddice il Lemma 1.
- 16: perché si usa $g$ e non $f$; perché $2\lfloor n/2 \rfloor + 1 \ge n$ (tabella pari/dispari); perché $g$ è propria e $g(n) \ge n$; origine del cubo e del $2n+1$; esempio $f(n) = n$.
- 17: perché non basta applicare la gerarchia a ogni $n^k$; tabella $n^3$ contro $2^n$; verifica di $6n+3 \le n^2$ da $n = 7$; costanti per gli $n$ piccoli.
- 18: perché l'enunciato richiede $f$ almeno logaritmica (compressione dello spazio); a cosa servono gli zeri in coda; perché il fattore $\log f(n)$ basta (supera ogni costante $C_M$); perché $D$ ha bisogno del contatore; numeri ($C_M = 8$: $n > 256$, o $n > 2^{256}$ con $f = \log n$).
- 19: perché la diagonalizzazione deterministica non funziona; perché copiare è facile e rovesciare no; perché $b_i$ è esponenzialmente più grande di $a_i$; catena su un intervallo giocattolo; perché ogni macchina compare infinite volte; verifica delle due condizioni sugli esempi e motivo del gradino $2^{2^{n+1}}$.
- 20: da dove viene $t+1$; perché un blocco dipende da pochi blocchi; da dove viene il $\log$ (pebbling, $N/\log N$); conto $b \cdot (f/b)/\log(f/b)$; controesempio per la direzione opposta (contatore su 10 celle).
- 21: dove serve $f(n) \ge \log n$ e controesempio con $f$ costante; derivazione esplicita di $k = 8|K||\Sigma|$; numeri con $n = 1000$; perché $k^{n^j}$ resta in EXP ($n^j \log k \le n^{j+1}$).
- 22: caso "no" (l'unico ramo rifiuta, nessuno accetta); tempo e spazio di una macchina nondeterministica con un solo ramo.
- 23: sequenze che non descrivono un ramo e rami più corti di $f(n)$; perché ogni cifra costa $\lceil \log d \rceil$ bit; come $M$ conosce $f(n)$ (vedi dubbio 4); esempio con $d = 2$, $f(n) = 3$.

## Dubbi ed errori nei dati (non corretti)

1. `terminazione-space`: enunciato, intuizione e frase d'esame contano le configurazioni come $|K| \cdot |\Sigma|^{f(n)} \cdot (f(n)+1)$, senza il fattore $n+1$ del cursore di input. La dimostrazione dice che "si aggiungono fattori dello stesso tipo", ma contare le posizioni sull'input richiede circa $\log n$ celle, che stanno in $O(f(n))$ solo se $f(n) \ge \log n$. L'enunciato non chiede questa ipotesi; lo storyboard sì ("assumendo $s \ge \log n$"). Nel testo l'ho scritta come "l'ipotesi che si fa di solito per lo spazio".
2. `terminazione-space`, punto 2 della dimostrazione: tratta come possibile il caso di una $M$ deterministica che decide $L$ e cicla. Se "decide" implica la terminazione, per le deterministiche il teorema non aggiunge niente; nel testo ho detto che il caso interessante è quello nondeterministico.
3. Posizioni del cursore contate in modo diverso: $f(n)+1$ in `terminazione-space`, $f(n)$ in `space-in-time`. In `t7-4b` un ramo usa "al più $f(n)$ celle per nastro", mentre `time-in-space` dà $t+1$ celle dopo $t$ passi, cioè $f(n)+1$. Nessun effetto sui risultati; nel testo di 23 ho scritto $f(n)+1$, coerente con `time-in-space`.
4. `t7-4b`: l'enunciato non dice "$f$ propria", ma la prova genera sequenze di $f(n)$ scelte (contatore con $f(n)$ cifre), quindi deve calcolare $f(n)$; il Teorema 7.4 del Papadimitriou suppone $f$ propria. Nel testo ho aggiunto una frase con questa ipotesi.
5. `space-in-time`: la dimostrazione usa $k$ sia per il numero di nastri (punto 1) sia per la base della costante (punto 6, "$k = k_1$"). Nel testo ho evitato la lettera per i nastri.
6. `ndet-hierarchy`, punto 4 dello schema: la condizione "$f(n) = o(g(n))$ e $f(n+1) = O(g(n))$" è attribuita alla strada di Immerman e Szelepcsényi. Con la chiusura per complemento basta $f = o(g)$ (come nella gerarchia deterministica nella forma di Sipser); la condizione $f(n+1) = O(g(n))$ è quella del teorema di Seiferas, Fischer e Meyer, precedente. Ne dipende anche la giustificazione del gradino $2^{2^{n+1}}$ al punto 5. Inoltre l'intuizione "molto più fitte di quelle deterministiche" è vera per il tempo; per lo spazio lo è solo rispetto alla forma $f(n) \log f(n)$ enunciata nel corso. Nel testo ho riportato le condizioni come nei dati e ho scritto "più piccoli di quelli dei teoremi deterministici visti".
7. `hf-upper`: il costo per passo $O(\ell_M \cdot k_M^2 \cdot f(n))$ è dato senza spiegare il quadrato su $k_M$; non l'ho derivato neanche nel testo.

## Controlli prima di consegnare

- `grep -n '[—–]\|\*\*'` su tutti e 12 i file: nessun risultato.
- `$` bilanciati: numero pari in ogni paragrafo (blocchi di codice e `$$` esclusi), `$$` in coppie. Nessuna virgoletta curva.
- H1 di ogni file uguale al campo `nome` di `theorems.ts`; nessun rimando a lezioni, capitoli o pagine.
- Numeri degli esempi ricontrollati a mano: $3 \cdot 2^{20} \cdot 21 = 66.060.288$; $n = 1024 \Rightarrow \ell_M k_M^2 \le 1000$; $\lfloor (2n+1)/2 \rfloor = n$; tabella $2\lfloor n/2 \rfloor + 1$ per $n = 6, 7, 8$; $9^3 = 729 > 512$, $10^3 = 1000 < 1024$, $(11/10)^3 \approx 1{,}33$; $6n+3$ contro $n^2$ a $n = 6, 7$; $\log_2 f > 8 \iff f > 256$; $16 \cdot \log_2 16 = 64$; catena da $1^3$ a $1^7$; $(2^{2^n})^2 = 2^{2^{n+1}}$; $5 \cdot 1001 \cdot 1024 \cdot 10 = 51.251.200$, $80^{10} \approx 1{,}07 \cdot 10^{19}$, $\log_2 1000 \approx 9{,}97$; $2^3 = 8$ sequenze, la quinta è 211.
- Tracce di humanizer ricercate di nuovo (contrasti, chiusure, elenchi di tre, grassetti, parole gonfiate): rimasti solo i contrasti che correggono errori reali, segnati sopra.

Parole (wc): 12: 818, 13: 490, 14: 768, 15: 551, 16: 641, 17: 394, 18: 687, 19: 781, 20: 493, 21: 600, 22: 334, 23: 578. La 12 supera di poco la fascia dei teoremi medi (da 450 a 750) per l'esempio del taglio e il conto del contatore; la 13 supera di 40 parole quella delle proposizioni brevi.
