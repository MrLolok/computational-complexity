# Revisione dei file 24-46

Revisore indipendente. Letti per intero `STRATEGIA.md`, `26-savitch.md`, i log `batch-3.md` e `batch-4.md`; ogni file confrontato con `src/data/theorems.ts`, `theoremProofs.json`, `theoremWalkthroughs.json` e, dove serviva, con `problems.ts` e `classes.ts`.

## Invocazione di humanizer

`humanizer` invocata una volta con lo strumento Skill, all'inizio della revisione: caricata (da `.claude/skills/humanizer`), regole §1-§26 disponibili durante tutta la revisione.

## File per file

### 24-t7-4c
Nessuna modifica. Conti verificati: $k = 4 \Rightarrow n^4$; $3^{\log n} = n^{\log 3} \approx n^{1{,}58}$, $3^{10} = 59049$; $k = c_1^2$; condizione $f(n) \ge \log n$ per togliere $\log n$.

### 25-catena-classi
Nessuna modifica. $k = 8 \Rightarrow n^{2 \log 8} = n^6$ corretto; tabella delle quattro inclusioni coerente con il Teorema 7.4 (a), (b), (c).

### 26-savitch (solo controllo matematico, non modificato)
Nessun errore. Verificati: $z = 1, 2, 3$ falliscono sulla seconda metà (7, 6, 5 archi contro 4 permessi), $z = 4$ dà 3 e 4 archi; pila $(1,8,3), (1,4,2), (1,2,1), (1,1,0)$ e profondità $\lceil \log 8 \rceil + 1 = 4$; tempo $(2n)^{\log n}$.

### 27-savitch-cor
Nessuna modifica.

### 28-pspace-npspace
- §2, chiusura che ripete la frase prima: tolta l'ultima frase "A differenza dei polinomi, i budget logaritmici non assorbono il quadrato.", che ridiceva "$\log^2 n$ non è $O(\log n)$" e la sezione sul quadrato.

### 29-composizione-riduzioni
- Testo che si regge da solo: "Che cos'è una riduzione da $L_1$ a $L_2$ in questo corso?" → "Che cos'è una riduzione da $L_1$ a $L_2$?" (la risposta dice già che è in spazio logaritmico).

### 30-chiusura-riduzioni
- Errore di ragionamento: "$\mathrm{TIME}(n^2)$ non è chiusa rispetto alle riduzioni, perché ha un budget fisso: nell'esempio sopra l'algoritmo quadratico ... impiega $n^6$". L'esempio mostra che la costruzione non funziona, non che la classe non è chiusa (la non chiusura è vera, ma si dimostra con gerarchia e padding). Corretto in "Per $\mathrm{TIME}(n^2)$, che ha un budget fisso, questo ragionamento non funziona: ...", come dicono i dati ("Il ragionamento non si applica a classi con budget fisso").

### 31-completo-per-due-classi
Nessuna modifica. L'affermazione "una classe non chiusa, come $\mathrm{TIME}(n^2)$" è vera (risultato standard) e qui non è presentata come dimostrata.

### 32-completo-classe-piccola
Nessuna modifica.

### 33-cook-levin
- Errore di uno: "Bastano $T$ colonne perché in $T$ passi la testina non va oltre la cella $T$" (in $T$ passi, partendo dalla cella 1, arriva fino alla cella $T+1$). Corretto in "perché la testina parte dalla cella 1 e a ogni passo si sposta di al più una cella, quindi nelle $T$ righe non va oltre la cella $T$" ($T$ righe sono $T-1$ passi). Non si contraddice la scelta $T = p(n)$ dei dati.
- Resto verificato: esempio $x = ab$, $T = 3$ (5 variabili vere per riga, 15 in tutto; $27 + 9 + 9 = 45$ variabili); clausole $O(T^3)$ dominate da "non due posizioni"; $T = 100 \Rightarrow 10^6$; il salto di cinque celle non viola nessuna clausola vietata.

### 34-3sat
- Affermazione falsa: "il pezzo 3 è falso qualunque valore si dia alle $y$". Con $y_2$ falsa il pezzo 3 è vero (è il pezzo 2 a cadere). Corretto in "e il pezzo 3 è falso. Quindi nessun valore delle $y$ rende veri tutti e tre i pezzi."
- Tabella $k = 5$ e regola $h \le j - 2$ verificate riga per riga.

### 35-2sat-p
Nessuna modifica. Archi dell'esempio, cammini $x \to z \to \neg x$ e $\neg x \to y \to x$, raggiungibili da $\neg x$ e assegnazione finale verificati. Lunghezza al limite alto per un teorema medio (circa 820 parole contando una formula come una parola), giustificata dalla prova costruttiva.

### 36-horn-sat
Nessuna modifica. Giri dell'esempio e insoddisfacibilità con $(\neg x \lor \neg z)$ verificati.

### 37-prop-9-1
Nessuna modifica. $|y| = O(|x|^{2k})$, $2^{50} \approx 1{,}13 \cdot 10^{15}$ verificati.

### 38-max2sat
- Ripetizione fra sezioni (STRATEGIA, humanizer "ogni frase aggiunge qualcosa"): tolto il primo paragrafo di "Dove si inciampa" ("Viene da pensare che MAX2SAT sia facile come 2-SAT ... toglie le scelte obbligate"), che ripeteva la risposta alla seconda domanda di controllo.
- Tabella 7/6 per $t = 0..3$ (con $w$ vera $1 + t$, con $w$ falsa 3), conteggio 3, 4, 4, 3 senza $w$, gruppo dell'esempio e totali 14 e 13 verificati.

### 39-independent-set
Nessuna modifica. Sei archi (b), 15 archi totali, insieme indipendente $\{x_{C_1}, z_{C_2}, x_{C_3}\}$ verificati.

### 40-clique-nodecover
Nessuna modifica. Complementare $AC, AD, BD$; $\{B, D\}$ copre $G$ e lascia scoperto $AC$ in $\bar G$.

### 41-hamilton-path
- Testo che si regge da solo (humanizer §25): "La prova completa è omessa, e qui se ne vede lo schema." → "..., e qui se ne vede lo schema."
- Gadget di clausola: la spiegazione lega il lato del letterale al collegamento che lo rende vero; con lo XOR il lato è attraversato esattamente quando il letterale è falso. Corretto (vedi dubbio 1 del batch 4).

### 42-tsp-d
Nessuna modifica. Matrice, costi 4 e 5, limite 5 dopo aver tolto $[4, 1]$ verificati.

### 43-3-coloring
Nessuna modifica. Gadget OR nei due casi, controesempio $a = N$, $b = V$, $o = F$, tabella dell'esempio, conteggi $3 + 2n + 6m$ nodi e $3 + 3n + 12m$ archi verificati.

### 44-tripartite-matching
- Stessa modifica di 41: "; la prova completa è omessa, e qui se ne vede lo schema." → ", e qui se ne vede lo schema."
- Anello: con $b_1$ sulla prima terna $g_2$ resta solo a $b_2$, all'indietro da $g_1$ per la seconda; terne per $k = 2$, combinazioni miste e conto $6m$ / $3m$ / $m$ / $2m$ verificati.

### 45-set-problems
Nessuna modifica. Coperture da 6, 5 e 4 elementi dell'esempio verificate.

### 46-integer-programming
Nessuna modifica. Sistema dell'esempio con $B = 2$ e $B = 1$, $x_n \ge 2^{n-1}$ con $n$ cifre binarie, controesempio $3/2$ contro 2 verificati.

## Verdetti sui dubbi dei log

### Batch 3
1. t7-4c, $k$ usato per i nastri e per la costante: fondato come ambiguità di notazione, non è un errore; la spiegazione lo tratta fra gli errori tipici.
2. t7-4c passo 3, esponente $(2k-2) f(n)$ contro $2(k-2)$ stringhe: fondato come incoerenza di conteggio; la maggiorazione resta valida (assorbe anche il $+1$ delle lunghezze), quindi il risultato non cambia.
3. cook-levin passo 2, $T$ righe per $T$ passi e $T \ge n$: fondato; $T$ righe descrivono $T - 1$ passi, e serve $p(n) \ge n$ per scrivere l'input. Scarto irrilevante per il teorema. Nella spiegazione ho corretto la frase che riprendeva l'errore di uno.
4. 3-SAT, definizione non uniforme: fondato. `theorems.ts` dice "clausole di 3 letterali", `problems.ts` "al più 3 letterali"; la riduzione va bene per entrambe.
5. savitch-cor, "f costruibile" nello storyboard contro "funzione propria" nell'enunciato: non fondato come errore; è lo stesso requisito con un altro nome, solo una differenza di lessico.

### Batch 4
1. hamilton-path passo 4 (lato di $x_i$ legato con XOR a "$x_i$ falsa"): fondato. Lo XOR fa attraversare esattamente uno dei due archi; il collegamento "$x_i$ falsa" è usato solo se $x_i$ è falsa, quindi il lato verrebbe attraversato quando $x_i$ è vera, cioè quando il letterale è vero, l'opposto della conclusione del passo. Per avere "lato attraversato ⇔ letterale falso" (che serve al passo 6) il lato di $x_i$ va legato a "$x_i$ vera" e quello di $\neg x_i$ a "$x_i$ falsa". La spiegazione usa già la versione coerente.
2. hamilton-path, terza slide ("visitare i vertici delle clausole attraverso letterali resi veri"): fondato come ambiguità. Descrive bene una costruzione diversa (quella con le deviazioni dai letterali veri), non quella a triangoli della prova, dove i lati attraversati sono i letterali falsi.
3. max2sat, enunciato "clausole con 2 letterali" contro le clausole di un letterale del gruppo: fondato. Correzione di dettaglio al log: anche `problems.ts` dice "clausole di 2 letterali"; "al più due" compare solo nello storyboard. $(x) = (x \lor x)$ risolve la differenza.
4. `problems.ts`, NODE COVER "esistono $K$ nodi" contro "al più $B$" della prova: fondato solo come differenza di forma e di lettera; le due versioni sono equivalenti (aggiungere nodi a una copertura la lascia copertura).
5. set-problems, $B$ per i ragazzi e per il budget: fondato, collisione di notazione nello stesso passaggio.
6. prop-9-1, la stessa $k$ per il tempo della macchina e per il bilanciamento, con certificato $O(|x|^{2k})$: fondato come collisione di notazione; la costante del bilanciamento va presa diversa (circa $2k$). Il passo 5 dice "polinomiale" e resta corretto.
7. integer-programming, storyboard da 3-SAT contro prova da SET COVERING: non fondato come contraddizione (sono due riduzioni valide). Fondato invece il rilievo sull'ultima slide, che dà per scontato il certificato corto: è un'omissione, non un errore.
8. `problems.ts`, INDEPENDENT SET "almeno $K$" contro "$K$ nodi": non fondato; le due forme sono equivalenti, perché un sottoinsieme di un insieme indipendente è indipendente.

## Controlli finali

- `grep -n '[—–]\|\*\*'` sui file 24-46: nessun risultato. Nessuna virgoletta curva.
- `$` bilanciati in tutti i file modificati.
- Nessun riferimento a lezioni, capitoli, dispensa, slide o "corso" rimasto nei file 24-46.
