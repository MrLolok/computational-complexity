# Revisione dei file 70-93

Revisore indipendente dei batch 7 e 8. Letti per intero `STRATEGIA.md` e `26-savitch.md`; ogni file confrontato con `theorems.ts`, `theoremProofs.json`, `theoremWalkthroughs.json` (e, dove serviva, `problems.ts`, `lezione6.json`). Modifiche mirate, nessuna riscrittura.

## Invocazione di humanizer

`humanizer` invocata una volta con lo strumento Skill: caricata (v3.1.0, `.claude/skills/humanizer/`, istruzioni complete). Le regole usate per la revisione sono le sue (§1 contrasti, §2 chiusure, §6 triadi, §8 trattini, §19 grassetti, ripetizioni fra sezioni) più quelle di STRATEGIA.

## Per file

### 70-strategic-companies
- "Un sottoinsieme senza $w$ ne può tenere uno solo per variabile" si leggeva come "può tenerne al massimo uno", falso (lo stesso esempio elenca $\{x, y, \neg y\}$) → "può tenerne anche uno solo per variabile". Motivo: correttezza.
- Matematica ricontrollata: le due direzioni della riduzione, l'esempio ($C' = \{x, y, \neg y, w\}$ minimo, i tre candidati, il caso $x$ falsa con $\{\neg x, y\}$) e il controesempio con $\varphi = x \land y$ ($\{x, \neg y\}$ va bene, nessuna rimozione singola funziona). Tutto giusto.
- Lunghezza 1159 parole, sopra l'indicazione di 1000: lasciata, perché la prova ha due direzioni, la tabella del gadget e un esempio che servono tutti.

### 71-t17-11
Nessuna modifica. Conto $|x|^2$, $|y|^3 \Rightarrow |x|^6$ e la strada alternativa con il Teorema 17.9 corretti.

### 72-ph-pspace
- Chiusura "la proposizione non dice niente di buono sul tempo" dopo "Il tempo invece è esponenziale": tolta (§2, ripete la frase prima).
- "L'inclusione non è nota come stretta. Se PH = PSPACE oppure no è una domanda aperta." (due frasi con lo stesso contenuto, §2) → una frase che dice l'errore che si corregge: "La proposizione non dice che l'inclusione sia stretta: se PH = PSPACE è una domanda aperta."
- Esempio ricontrollato: 2 + 3 + 4 + 4 = 13 controlli.

### 73-cor-ph-pspace
Nessuna modifica.

### 74-qsat-pspace
- "come nel Teorema di Cook" → "come nel Teorema di Cook-Levin", il nome con cui il sito cita il teorema (regola del sito: teoremi citati per nome).
- Matematica ricontrollata: valutazione di $\forall p\, \exists q$ (XOR), $2^m$ copie della formula ingenua, 300 variabili e 400 equivalenze per livello con $m = 100$, circa $2m$ alternanze. Corretta.

### 75-co-hamilton-pi2
Nessuna modifica. Le due direzioni dell'equivalenza e la riga della tabella su QSAT corrette.

### 76-db-queries
- Definizione di $\mathrm{AC}^0$ senza negazioni: con sole porte "e"/"oppure" si ottengono solo funzioni monotone → aggiunte "porte di negazione". Motivo: correttezza della definizione.
- "la completezza dipende dal tipo di riduzioni" lasciava aperto il "perché?" → aggiunta la ragione: con riduzioni in spazio logaritmico ogni problema di L con almeno un'istanza sì e una no è L-completo, perché la riduzione risolve da sola il problema di partenza; quindi il dato che conta è l'appartenenza a L. Non contraddice la tabella dei dati (vedi il dubbio sotto).
- Esempi ricontrollati: 6 coppie ordinate di colori diversi, triangolo sì, quattro nodi no.

### 77-geography
- Risposta 2 del "Prima di leggere": spiegava come far finire la QBF con $\exists$ ma non come farla cominciare con $\exists$ → "in testa e in fondo, se serve, si aggiunge un $\exists$ fittizio". Motivo: buco nella giustificazione.
- Parità ricontrollate mossa per mossa: rombo $i$ occupa le mosse $3i-2$, $3i-1$, $3i$; il lato di $x_i$ lo sceglie il primo per $i$ dispari e il secondo per $i$ pari; con $n$ dispari la mossa dal fondo $B_n$ è del primo, quindi il raccordo $R$ serve davvero e fa scegliere la clausola al secondo. Tabella delle 12 mosse, varianti con $C_1$ e con $F_1$: corrette.

### 78-go
Nessuna modifica.

### 79-fsat-fnp
Nessuna modifica.

### 80-fsat-sat
Nessuna modifica. Le quattro chiamate dell'esempio e $T = (\text{vero}, \text{falso}, \text{vero})$ ricontrollate.

### 81-fp-fnp
- "Le due righe non usano FSAT allo stesso modo, e chi le ripete tende a trattarle allo stesso modo" (ripetizione goffa) → "Le due righe usano FSAT in modi diversi, e chi le ripete tende a confonderli".

### 82-t20-1
- "all'esame serve di solito la contronominale": rimando all'esame, escluso da STRATEGIA → "cioè, per contronominale, se ...".
- Numeri ricontrollati: 1014 simboli $\sqcap$, $1024^2 = 2^{20}$.

### 83-nexp-completi
- "i predecessori si ottengono sottraendo 1": vale per la riga, non per le colonne $j-1$, $j$, $j+1$ → "sottraendo 1 alla riga e sommando $-1$, $0$ o $+1$ alla colonna". Motivo: correttezza.
- "All'esame, alla domanda ... si risponde spesso" (rimando all'esame) → "Alla domanda ... viene da rispondere".

### 84-fo-indecidibile
Nessuna modifica.

### 85-2sat-p-completo
- Risposta 1: "ogni problema di P si ridurrebbe a qualunque altro" è falso per i due problemi banali (nessuna istanza sì, o nessuna istanza no) → "a qualunque altro che abbia almeno un'istanza sì e una no". Motivo: correttezza.
- Grafo delle implicazioni dell'esempio ricontrollato (8 archi, cammini $x \to y \to \neg x$ e $\neg x \to y \to x$).
- Lunghezza 622 parole per una proposizione (indicazione 200-450): lasciata, l'argomento $2\text{-}\mathrm{SAT} \in \mathrm{NL}$ fa parte dell'enunciato.

### 86-riepilogo-p
Nessuna modifica. 333 bit, $10^{50}$, espansioni di $(X+1)^5$ e $(X+1)^4$ modulo 5 e 4 ricontrollati.

### 87-np-pp
- "scegliendo le scelte a caso" → "facendo le scelte a caso" (forma). $9/16 = 1/2 + 1/2^{p(n)+1}$ con $p(n) = 3$ ricontrollato.

### 88-pp-pspace
Nessuna modifica. Contatori 101, 011, 1000 e $2^{100} \approx 1{,}27 \cdot 10^{30}$ ricontrollati.

### 89-bpp-inclusioni
Nessuna modifica. Soglie coerenti con enunciato e prova ($3/4$), variante $2/3$ gestita nell'ultima riga.

### 90-bpp-errore
Nessuna modifica. Ricalcolati con Python: $10/64$, $106/1024$, $1156/16384$; 19 ripetizioni bastano per l'1% (errore 0,0089, con 17 è 0,0124); con 75 l'errore è $1{,}57 \cdot 10^{-6}$; $-8 \ln 0{,}01 \approx 36{,}8$; $k \ge \ln 2/\delta^2$; $k \ge \ln(1/\varepsilon) \cdot 2^{2p(n)+1}$ per PP.

### 91-bqp
Nessuna modifica. Soglie BQP $2/3$ e $1/3$ come nei dati, $P(\text{yes}) = 2^{-h} \sum (P_c - M_c)^2$, esempio $9 = 5 + 4$ e $5 - 4 = 1$, frazione esponenzialmente piccola dello scarto ricontrollati.

### 92-bqp-2exp
Nessuna modifica. $n^3 \le 2^n$ da $n = 10$, $f(2n+1)^3 = 2^{3 \cdot 2^{2n+1}}$ in 2-EXP, "una sola inclusione stretta dimostrata" corretti.

### 93-grover-np
- "$(\sqrt{c})^{n^k}$ ... con base $\sqrt{c} \gt 1$ ed esponente dimezzato" mescolava le due scritture (base $\sqrt{c}$ con esponente dimezzato darebbe $c^{n^k/4}$) → "dimezza l'esponente, e $c^{n^k/2} = (\sqrt{c})^{n^k}$ è ancora un esponenziale, con base $\sqrt{c} \gt 1$". Motivo: correttezza.
- Ultimo paragrafo ("Quando il certificato non c'è ... la risposta è "no", quella giusta") tolto: ripeteva il paragrafo dell'idea ("Se $x \notin L$ il "no" è sempre giusto").
- $2^{60} \approx 1{,}15 \cdot 10^{18}$, $2^{30} \approx 1{,}07 \cdot 10^9$ ricontrollati.

### Controlli finali
- `grep -n '[—–]\|\*\*'` e virgolette curve sui 24 file: nessun risultato.
- `$` bilanciati in tutti i file (blocchi di codice esclusi).
- Lasciati: i rimandi generici agli "esercizi" in 85 e 86 (descrivono dove nasce l'errore o riprendono l'intuizione dei dati, non sono esercizi); i contrasti in 78 ($n \times n$ e non $19 \times 19$; la variante e non ogni insieme di regole), 80 e 73, che correggono letture reali.

## Dubbi sui dati elencati dagli autori

### Batch 7
1. db-queries, data complexity "L-completa" per l'algebra relazionale: fondato. Una query fissa del primo ordine si valuta con un circuito di profondità costante ($\exists$ come "oppure", $\forall$ come "e", negazioni), quindi sta in $\mathrm{AC}^0$; poiché PARITY sta in L ma non in $\mathrm{AC}^0$, con riduzioni $\mathrm{AC}^0$ o del primo ordine non può essere L-completa, e con riduzioni in spazio logaritmico la L-completezza è banale (vale per ogni problema non banale di L, comprese le query congiuntive, che la tabella dice $\mathrm{AC}^0$-complete). La tabella non regge con nessuna nozione unica di riduzione; il risultato standard (Vardi 1982, Immerman) è "in L, anzi in $\mathrm{AC}^0$". La spiegazione riporta la tabella come nei dati e ora dice perché conta solo il limite superiore.
2. go, ipotesi sulla durata polinomiale: fondato. La prova dice "come nella formulazione del teorema", ma l'enunciato in `theorems.ts` non la contiene; la contiene solo lo storyboard ("Precisa la variante").
3. go, GEOGRAPHY planare: fondato come semplificazione. Lichtenstein e Sipser ottengono la versione planare con un gadget di incrocio; "i rombi si possono disegnare in questa forma" lo tace. La conclusione resta vera e la spiegazione usa una formula neutra.
4. geography, "dal fondo dell'ultimo rombo il secondo giocatore va su un nodo-clausola": fondato. Con tre mosse per rombo e $n$ dispari la mossa da $B_n$ tocca al primo, quindi serve un nodo di raccordo che i dati citano solo in generale. La spiegazione lo mette ($R$) e le parità tornano.
5. co-hamilton-pi2, `prova: "omessa"` contro `tipo_dimostrazione: "completa"` e rimandi "Proposizione B, cap. 14; riepilogo del cap. 22" nella prova: fondato (incoerenza di metadati e rimandi ai materiali; la matematica non cambia).
6. qsat-pspace, $|\psi_m| = O(m^2)$ senza $|\psi_0|$: non fondato nella sostanza. Con la tabella di due righe $\psi_0$ ha un vincolo di dimensione costante per cella, quindi $|\psi_0| = O(m)$ (a meno dei fattori logaritmici per i nomi delle variabili) e il totale $O(m^2)$ dei dati è giusto. La scrittura $|\psi_0| + O(m^2)$ del testo resta corretta.
7. fsat-sat, storyboard che prova prima falso e prova che prova prima vero: fondato come incoerenza, innocua (entrambe le versioni sono corrette).
8. fp-fnp, definizione di FP: fondato come imprecisione. Con "function problem risolti in tempo polinomiale" senza restringerli a quelli di FNP, $\mathrm{FP} \subseteq \mathrm{FNP}$ non è immediato; lo è con la definizione di FP come parte di FNP, che la spiegazione usa. Lo storyboard con l'argomento bit per bit non contraddice la prova.
9. t17-11, due strade (Teorema 17.9 contro conclusione diretta): non fondato come errore; sono entrambe corrette.

### Batch 8
1. Soglia di BPP $3/4$ contro $2/3$: fondato. Enunciati e prove di `bpp-inclusioni` e `bpp-errore` usano $3/4$, gli storyboard ("Confronta le soglie"; "Ogni esecuzione sbaglia con probabilità al più 1/3") usano $2/3$. Le due definizioni danno la stessa classe (lo mostra proprio `bpp-errore`), ma lo studente ne vede due; 89 lo dice in una riga.
2. `bpp-errore`, $k$ usato sia per le ripetizioni sia per l'esponente in $k \ge \ln(1/\varepsilon) \cdot 2^{2n^k+1}$: fondato (collisione di notazione nel punto 6 della prova).
3. `bqp-2exp`, frase d'esame su OWL 2 come esempio 2-EXP-completo: fondato. Il ragionamento in OWL 2 DL (logica SROIQ) è N2EXPTIME-completo (Kazakov 2008), e i profili OWL 2 EL, QL e RL sono trattabili; nessuno è 2-EXP-completo. La conclusione "non sta in BQP" resta vera, perché un problema N2EXPTIME-completo in BQP darebbe $2\text{-}\mathrm{EXP} \subseteq \mathrm{N2EXP} \subseteq \mathrm{BQP} \subseteq \mathrm{EXP}$. La spiegazione non usa l'esempio.
4. Rimandi a lezioni e materiali nei dati ("della Lezione 6", "slide Lez. 6", "dispensa cap. 12", "Le slide chiamano $\varepsilon$..." in prima persona, enunciato di `riepilogo-p` "Il riepilogo della dispensa elenca"): fondato, verificati tutti. Nelle spiegazioni non compaiono.
5. KNAPSACK, obiettivo di valore $K$ in `problems.ts` e $V$ nella prova di `grover-np`: fondato (solo notazione).
6. `grover-np`, $c$ dell'enunciato contro $c' \gt c$ della prova: fondato come imprecisione dell'enunciato; con $c$ letta come costante opportuna è corretto, come dice 93.
7. `nexp-completi`, valori 0/1 delle variabili universali e costanti distinte senza uguaglianza: fondato come lacuna dello schema, non come errore. Si colma restringendo il modello alla sottostruttura delle due costanti (la parte universale resta vera) e imponendo che siano distinte con un predicato unario, per esempio $B(c_1) \land \neg B(c_0)$.
8. `t20-1`, $2^{p(n)}$ e $N^k$ nello storyboard contro $2^{n^k}$ e $|y|^l$ nella prova: fondato, solo notazione.
9. `2sat-p-completo`, "solo se" che sarebbe un "se e solo se": l'osservazione è giusta (se $\mathrm{PRIMES} \in \mathrm{NL}$ si riduce a 2-SAT, che è NL-completo), ma l'enunciato non è sbagliato: non è un errore.

### La spiegazione contro i dati
Nessuna spiegazione contraddice i dati senza motivo. Gli scostamenti voluti sono: il raccordo $R$ in 77 (colma la lacuna del dubbio 4 del batch 7), $|\psi_0| + O(m^2)$ in 74, $2^{p(n)}$ al posto di $2^{n^k}$ per i run in 90 (evita la collisione del dubbio 2), la riga sulla variante $2/3$ in 89, la $c$ "costante opportuna" in 93, la frase sulle riduzioni in spazio logaritmico in 76.
