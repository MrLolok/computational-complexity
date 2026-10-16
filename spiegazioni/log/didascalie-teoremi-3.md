# Didascalie delle dimostrazioni illustrate, gruppo 3 (teoremi 33-47)

## Invocazione di humanizer

La skill `humanizer` è stata invocata con lo strumento Skill e si è caricata (istruzioni complete, paragrafi §1-§26). I quattro passi sono stati applicati alle didascalie di ogni teorema: segnare i difetti, riscrivere, ricontrollare (contrasti §1, chiusure §2, triadi §6, trattini §8, grassetti §19), scrivere la versione finale.

Output: `scratchpad/illustrate/out/teoremi-3.json`, 15 teoremi, 62 slide riscritte, JSON validato con `json.load`. Ogni disegno è stato guardato prima di scrivere la didascalia. Controlli automatici sul file: nessun trattino lungo, nessun grassetto, nessuna virgoletta o apostrofo curvo, `$` bilanciati, titoli da 2 a 6 parole, didascalie da 2 a 4 frasi.

Difetti comuni a tutto il gruppo, non ripetuti sotto: §21 apostrofi curvi (’) in titoli e didascalie, sostituiti con apostrofi dritti; formule scritte in Unicode (`a ∨ b`, `aᵢ`, `n − K`), riscritte in LaTeX come vuole il sito; didascalie che ripetevano il passo della dimostrazione senza dire che cosa c'è nel disegno. In ogni slide è stato aggiunto il collegamento esplicito fra gli elementi del disegno (nodi, frecce, colori, riquadri, etichette) e il passo.

## 33 · cook-levin

Difetti segnati: §11 "Clausole impongono una descrizione coerente" (soggetto senza articolo, chi impone cosa resta vago); §14 "descrizione coerente", "si generano con pochi contatori" senza dire quali; §2 chiusura "questo prova la completezza", che nomina il risultato senza aggiungere niente.

Cambiamenti: slide 1 legge l'assegnamento del disegno e spiega le coppie di bit con le spunte (verificate a mano: (1∨1), (0∨1), (0∨1)). Slide 2 spiega righe e colonne della tabella, la riga iniziale con l'input e l'ultima con $q_{acc}$, e perché bastano $T$ colonne. Slide 3 descrive le tre righe del disegno come le tre famiglie di variabili (senza usare i nomi del disegno, vedi discrepanze) e dice a che cosa servono le clausole "esattamente uno". Slide 4 lega le tre righe "inizio", "mossa lecita", "fine" ai tre gruppi di clausole e spiega il passaggio da $q$ a $q'$ con $a$ e $b$ fermi. Slide 5 legge le due frecce come i due versi. Slide 6 dà i conteggi giusti e da dove vengono.

## 34 · 3sat

Difetti segnati: §11 passivo "può essere trasformata"; §14 "La variabile collega le due parti" e "quelle corte si adattano", che non dicono come; §2 la frase sul collegamento ripeteva la formula appena scritta. Il titolo "Verifica l'equivalenza" contraddiceva la prova (la formula nuova non è equivalente, è solo equisoddisfacibile): diventato "Controlla i due casi".

Cambiamenti: slide 1 dice che $\phi'$ non è equivalente ma conserva la soddisfacibilità (contrasto tenuto perché corregge un errore che lo studente fa davvero, è nel "Dove si inciampa" della spiegazione). Slide 2 spiega che cosa "dice" $z$. Slide 3 legge i due casi del disegno, compreso il residuo $(z)$, $(\neg z)$. Slide 4 conta clausole ($m-2$) e variabili nuove ($m-3$) della catena disegnata e dice come si trattano le clausole corte.

## 35 · 2sat-p

Difetti segnati: §14 "l'ordine del grafo delle componenti permette di assegnare valori" (non dice la regola); §2 "Quindi 2-SAT ∈ P." isolato in fondo, fuso con la frase precedente.

Cambiamenti: slide 1 spiega perché la clausola dà due implicazioni e collega le frecce del disegno. Slide 2 spiega che cos'è l'ovale e perché $a$ e $\neg a$ insieme danno l'insoddisfacibilità. Slide 3 spiega la regola del riquadro, $x$ vera se la componente di $x$ sta più a destra di quella di $\neg x$, e perché funziona (nessun arco da vero a falso; verificato: da $u \to v$ e dal contronominale $\neg v \to \neg u$ segue $\mathrm{ord}(C_v) \ge \mathrm{ord}(C_u) > \mathrm{ord}(C_{\neg u}) \ge \mathrm{ord}(C_{\neg v})$). Slide 4 conta nodi e archi.

## 36 · horn-sat

Difetti segnati: §1 coda tronca ": tempo lineare"; §11 "Code e contatori aggiornano ogni occorrenza" (agente sbagliato: aggiorna l'algoritmo); "atomi" al posto di "variabili", diverso dalla spiegazione; "clausola di Horn positiva", impreciso. Il titolo della slide 4, "Leggi il modello minimo", non corrispondeva al disegno (coda e contatori): diventato "Contatori e tempo lineare".

Cambiamenti: slide 1 lega la regola e il divieto ai due disegni (frecce verso $c$, barra fra $a$ e $b$). Slide 2 segue il disegno ($a$ e $b$ fatti, poi $c$) e aggiunge perché si parte da tutto falso. Slide 3 lega "attivato al più una volta" al conto dei giri e il riquadro "insoddisfacibile" all'invariante. Slide 4 legge i due contatori del disegno (0 per $a \land b \Rightarrow c$, 1 per $d \land e \Rightarrow f$ perché $e$ è falsa) e conserva l'informazione sull'assegnazione minima.

## 37 · prop-9-1

Difetti segnati: §2 chiusura "Questa è la caratterizzazione di NP tramite verificatori", che nomina il risultato invece di aggiungere un fatto; slide 3 senza il "perché" del limite su $|y|$ (buco).

Cambiamenti: slide 1 legge l'albero, il ramo verde e la graffa, e dice quante scelte servono. Slide 2 spiega che cosa fa il verificatore e i due riquadri rosa. Slide 3 aggiunge perché serve il bilanciamento. Slide 4 lega $V(x, y) = 1$ del disegno alla relazione $R$ dell'enunciato.

## 38 · max2sat

Difetti segnati: "successi" come gergo per "clausole vere"; aggettivi accumulati "nuova variabile ausiliaria locale"; titolo vago "Conta il vantaggio", diventato "Conta le clausole vere".

Cambiamenti: slide 1 legge l'esempio del disegno (verificato: $(x_1 \lor x_2)$ vera, $(\neg x_1 \lor \neg x_3)$ falsa, $(x_2 \lor x_3)$ vera, due vere). Slide 2 descrive le tre righe del gruppo di dieci clausole e la variabile nuova $a$ a sinistra, con il motivo per cui ogni clausola ha la sua. Slide 3 aggiunge un conto svolto (un letterale vero, $a$ falsa: $1 + 3 + 3 = 7$; tutti falsi: massimo 6, ricontrollato con la tabella della spiegazione). Le slide 4 e 5 legano graffa e frecce all'obiettivo $7m$ e ai due versi.

## 39 · independent-set

Difetti segnati: §2 nella slide 3 la seconda frase ripeteva la prima ("Non si possono selezionare insieme due letterali incompatibili"); "vertici" al posto di "nodi" come nella spiegazione.

Cambiamenti: slide 1 lega i nodi verdi e l'elenco di coppie al controllo. Slide 2 spiega perché un triangolo ammette un solo nodo. Slide 3 lega il tratteggio rosso all'arco fra opposti e aggiunge l'errore tipico (stesso letterale, nessun arco). Slide 4 legge un nodo verde per triangolo e la graffa $K = m$.

## 40 · clique-nodecover

Difetti segnati: §4 / §25 "Useremo due trasformazioni che conservano la risposta" (annuncia invece di dire); "lì" vago; "clique" al posto di "cricca" come nella spiegazione; "gruppo" al posto di "insieme" nel titolo della slide 3.

Cambiamenti: slide 1 legge l'esempio del ciclo di 4 nodi. Slide 2 spiega il complementare con le due diagonali verdi (verificato: il complementare del ciclo 1-2-3-4 ha solo $[1,3]$ e $[2,4]$). Slide 3 spiega $C = V \setminus S$ in verde e il budget $4 - 2$. Slide 4 dice che cosa si controlla per i due problemi, senza descrivere gli insiemi colorati del disegno (vedi discrepanze).

## 41 · hamilton-path

Difetti segnati: §14 "Appositi collegamenti", "attraversamenti incoerenti", che non dicono quali collegamenti né quale incoerenza.

Cambiamenti: slide 1 lega le due spunte alle due condizioni. Slide 2 descrive il gadget del disegno (fila percorsa a destra in blu o a sinistra in rosa) senza contraddire quello della spiegazione. Slide 3 spiega il riquadro $C_j$ e le tre frecce in termini validi per entrambe le costruzioni. Slide 4 dà i due versi.

## 42 · tsp-d

Difetti segnati: ridondanza "soltanto usando esclusivamente"; titolo della slide 3 di 7 parole, diventato "Ogni tratta deve costare 1".

Cambiamenti: slide 1 spiega la somma del disegno e aggiunge $v_{n+1} = v_1$ per la tratta di ritorno. Slide 2 lega tabella e budget e aggiunge perché si parte da HAMILTON CYCLE. Slide 3 legge le tratte da 1 del disegno e fa il conto con una tratta da 2. Slide 4 dà i due versi e lo spazio logaritmico.

## 43 · 3-coloring

Difetti segnati: §15 coda in gerundio "collegandoli anche al colore di base"; anglicismo "NP-hardness"; "questo certifica l'appartenenza" (verbo improprio).

Cambiamenti: slide 2 spiega che cosa vuol dire "colore $T$" e perché i letterali sono solo $T$ o $F$. Slide 3 lega il triangolo $B$, $x$, $\neg x$ al vincolo. Slide 4 legge i colori in ingresso del disegno e spiega l'uscita obbligata. Slide 5 lega quadrato e triangolo ai due casi.

## 44 · tripartite-matching

Difetti segnati: §14 "porte", "coperture coerenti", "terne di completamento", gergo vago che non compare nella spiegazione.

Cambiamenti: slide 1 legge le tre terne orizzontali. Slide 2 lega terne dritte e incrociate a vero e falso e dice quali elementi di $C$ restano liberi. Slide 3 descrive la struttura giusta della clausola e le coppie di raccolta. Slide 4 legge le due frecce come i due versi.

## 45 · set-problems

Difetti segnati: pochi; frase che comincia con una variabile minuscola ("m terne disgiunte..."); "SET COVER" nel titolo, diverso dal nome del teorema (SET COVERING).

Cambiamenti: slide 1 spiega come le terne del disegno diventano insiemi. Slide 2 lega i blocchi di tre elementi al conto $3m$. Slide 3 lega la graffa "3m elementi" alla copertura. Slide 4 lega le tre spunte ai controlli del verificatore e dice la catena di riduzioni.

## 46 · integer-programming

Difetti segnati: §2 chiusura ": il problema è NP-completo"; slide 3 che dava per scontata l'appartenenza a NP, che la spiegazione indica come la parte delicata.

Cambiamenti: slide 1 aggiunge che sui reali $x_i$ potrebbe valere $1/2$ (LINEAR PROGRAMMING sta in P). Slide 2 spiega $1 - y$ e quando la somma fa 0. Slide 3 dà la ragione giusta dell'appartenenza a NP.

## 47 · knapsack

Difetti segnati: §14 / §2 "Questo trasferisce la difficoltà a KNAPSACK" (vago, chiude ripetendo); ": è un certificato polinomiale" (impreciso: polinomiale è il controllo). Il titolo "Parti da SUBSET SUM" è cambiato in "Peso uguale al valore" (vedi discrepanze).

Cambiamenti: slide 1 legge le due somme del riquadro. Slide 2 descrive la trasformazione disegnata come caso particolare di KNAPSACK e dice da dove vengono i numeri. Slide 3 lega "stessa somma" all'uguaglianza e aggiunge perché la base $n + 1$ evita i riporti e che i numeri hanno valore esponenziale.

## Discrepanze fra disegno e matematica

Errori nel disegno, che le didascalie non descrivono:

- cook-levin, slide 6: il riquadro dice "# clausole: $O(T^2)$"; la spiegazione dice $O(T^3)$ (una clausola per coppia di celle a ogni tempo). La didascalia dice $O(T^3)$.
- clique-nodecover, slide 4: i nodi verdi di NODE COVER lasciano scoperto l'arco fra i due nodi grigi in basso, quindi non sono una copertura. Il pentagono di CLIQUE non è una cricca: il nodo in alto non è collegato ai due in basso (c'è solo un tratto verticale che si ferma al centro).
- tsp-d, slide 1: le etichette $v_{n-1}$ e $v_n$ sono scambiate lungo il giro ($v_{n-1}$ è accanto a $v_1$), e le frecce non hanno un verso coerente ($v_{n-1}$ ha due frecce in uscita, $v_n$ punta verso "..."). La didascalia non usa le etichette.
- tripartite-matching, slide 2: il gadget disegnato ha tanti elementi di $C$ quanti di $A$; nella costruzione sono il doppio, e gli elementi lasciati liberi, quelli che codificano il valore, non si vedono.
- tripartite-matching, slide 3: il disegno mette i tre letterali $x$, $y$, $z$ come tre elementi di $A$ legati a un solo elemento di $B$ e a un solo elemento di $C$. Nella costruzione ogni clausola ha un solo elemento di $A$ e uno di $B$, e le tre terne vanno a tre elementi diversi di $C$. La didascalia descrive la costruzione giusta.
- integer-programming, slide 3: il diagramma fa derivare "certificato intero di lunghezza polinomiale" dall'equivalenza fra assegnamenti e soluzioni. Per un sistema qualsiasi serve il risultato sulle soluzioni piccole (al più esponenziali in valore, quindi con un numero polinomiale di bit). La didascalia lo dice.
- knapsack, slide 2: il titolo originale riduceva da SUBSET SUM, che non compare nei dati. `theorems.ts` (intuizione), `proofs.json` (frase d'esame) e la spiegazione riducono da EXACT COVER BY 3-SETS, passando per il caso $v_i = w_i$, $K = W$. Il disegno ($a_i$ che diventa un oggetto con peso e valore $a_i$, $W = K = B$) è proprio quel caso, quindi la didascalia lo tiene e indica EXACT COVER BY 3-SETS come origine dei numeri.

Notazione diversa dalla spiegazione (la matematica del disegno è giusta):

- cook-levin, slide 3: le variabili del disegno sono $S_{t,i,\sigma}$ (simbolo), $H_{t,i}$ (testina), $Q_{t,q}$ (stato); la spiegazione usa $P^i_{s,t}$, $S_{s,t}$, $Q^i_t$. La lettera $S$ indica il simbolo nel disegno e la testina nella spiegazione, quindi la didascalia descrive le famiglie senza nominarle. Il disegno numera righe e colonne da 0, la spiegazione da 1.
- max2sat, slide 2: la variabile nuova si chiama $a$ nel disegno e $w$ nella spiegazione.
- 3-coloring: il disegno usa $T$, $F$, $B$, la spiegazione $V$, $F$, $N$; la slide 4 mescola le due ($y = T$ e "$= V$").
- tripartite-matching e set-problems: gli insiemi sono $A$, $B$, $C$ nel disegno e $B$, $G$, $H$ nella spiegazione ($B$ indica due insiemi diversi); la famiglia è $S$ nel disegno ed $F$ nella spiegazione.
- hamilton-path, slide 2 e 3: i gadget disegnati (fila percorsa in un verso o nell'altro, nodo di clausola raggiunto dai letterali) sono quelli di un'altra costruzione standard; la spiegazione usa due collegamenti alternativi per variabile e un triangolo con XOR per clausola. Le didascalie restano valide per entrambe.
- 2sat-p, slide 3: il disegno assegna i valori con l'ordine topologico delle componenti; la spiegazione costruisce l'assegnazione propagando da un letterale. È un risultato standard e non contraddice la spiegazione; la didascalia spiega la regola disegnata.
- cook-levin slide 6 e set-problems slide 4 scrivono $\le_p$; nel corso le riduzioni sono in spazio logaritmico (non è un errore, una riduzione in spazio logaritmico è anche polinomiale).
- 3sat: il disegno usa $k$ (slide 1) per il numero di clausole prodotte e $m$ (slide 4) per il numero di letterali, mentre la spiegazione usa $k$ per i letterali.

Nota sul ritaglio: i pannelli `t-41-hamilton-path-3/4` e `t-42-tsp-d-1/2/3/4` mostrano sul bordo un pezzo del pannello vicino (cifre "2", "3", "4" tagliate). Va controllato se la griglia di ritaglio del sito (`crop`) mostra lo stesso difetto.
