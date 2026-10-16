# Disegni da correggere

Correzioni applicate il 16 ottobre 2026, incluso il controllo di Cook–Levin. [Esito, file e verifiche](log/correzione-disegni.md).

Errori trovati nei disegni delle dimostrazioni illustrate (teoremi) e degli esempi passo passo (problemi) mentre si riscrivevano le didascalie. Le didascalie riportano già la matematica giusta e non descrivono l'elemento sbagliato, ma il disegno resta visibile. Restano fuori le sole differenze di notazione. I dettagli sono nei log `spiegazioni/log/didascalie-*.md`; "s3" vuol dire slide 3.

## Teoremi

| Teorema | Slide | Che cosa è sbagliato nel disegno |
|---|---|---|
| 04 linear-speedup | s4 | Tutti e tre i blocchi risultano aggiornati; una fase riscrive il blocco centrale e al più un vicino. |
| 05 mdt-io | s2 | Le frecce suggeriscono che la simulazione usi i nastri di input e di output, che invece restano fermi. |
| 09 reach-nl | s3 | Il contatore è disegnato come una fila di celle (unario); è binario, $O(\log v)$ bit. |
| 10 gap-theorem | s2, s3 | Gli intervalli sono staccati ma sono contigui; alcune crocette spariscono o restano sotto l'intervallo vuoto. |
| 11 soluzioni-precise | s3 | L'input sta sullo stesso nastro del lavoro e le celle inutilizzate sono fuori dal metro di $f(n)$ celle. |
| 15 hf-lower | s2, s3 | La freccia "sì" esce direttamente dal decisore, come se $D$ rispondesse come lui. |
| 18 space-hierarchy | s4 | La conclusione ha $\subseteq$ dove il teorema dice $\subsetneq$. |
| 20 time-in-space | s2 | "$\le f(n)$ celle" per nastro; sono al più $f(n)+1$. |
| 24 t7-4c | s2 | La mossa nondeterministica è etichettata $\delta$ invece di $\Delta$. |
| 25 catena-classi | s3 | Una macchina deterministica è disegnata con rami alternativi. |
| 40 clique-nodecover | s4 | Il NODE COVER verde non copre un arco e il pentagono non è una cricca. |
| 42 tsp-d | s1 | Etichette $v_{n-1}$ e $v_n$ scambiate, frecce in versi diversi. |
| 44 tripartite-matching | s2, s3 | Il gadget non corrisponde alla costruzione (numero di elementi, triple). |
| 46 integer-programming | s3 | Il certificato intero corto è dedotto dall'equivalenza con 3SAT; serve il risultato sulle soluzioni piccole. |
| 50 validity-conp | s3 | "¬SAT" per il complemento, lo stesso simbolo della negazione di formula. |
| 51 prop-a | s3 | "time(R) = time(R)"; le riduzioni si misurano in spazio logaritmico. |
| 59 altri-dp-completi | s2 | Per i problemi critici l'ordine NP / coNP è invertito. |
| 60 pl-psat | s3 | La macchina manda domande sia a $L$ sia a SAT, mescolando le due direzioni. |
| 63 t17-8 | s3 | I testimoni partono da un ramo grigio invece che dal ramo che accetta. |
| 64 t17-8-cor1 | s2, s3 | "$\bar L \in \Sigma_i^{\mathrm{P}} \iff \exists y$" dove serve $x \in \bar L$. |
| 65 t17-8-cor2 | s3 | Il blocco $Q_i$ è colorato come un $\exists$ anche quando $i$ è pari. |
| 67 cor-collasso-primo | s2 | $\Pi_k$ disegnato dentro $\Sigma_k$, inclusione non nota in generale. |
| 68 circ | s4 | $T$ è etichettato minimale ma il disegno mostra un $T'$ più piccolo. |
| 74 qsat-pspace | s5 | $\lvert\varphi_M\rvert = \mathrm{poly}(\lvert M\rvert)$; deve essere polinomiale in $\lvert x\rvert$. |
| 77 geography | s4 | Gadget di scelta ad albero (dimensione esponenziale); l'esempio finisce con $\forall$. |
| 79 fsat-fnp | s2 | "$L \in \mathrm{FNP}$": in FNP sta $F_L$, $L$ sta in NP. |
| 82 t20-1 | s2 | Il riempimento usa 0 invece di un simbolo nuovo. |
| 83 nexp-completi | s1, s2, s6 | Ingressi e uscite di $C$ etichettati male, tabella troppo piccola, colonna di uscita tutta a 0. |
| 88 pp-pspace | s3 | Colori invertiti: si accetta sopra la soglia. |
| 91 bqp | s3, s4 | Fattore d'ampiezza $1/2^{p(n)}$ invece di $(1/\sqrt 2)^h$. |
| 92 bqp-2exp | s2, s3 | Grafo di una macchina deterministica che si ramifica; $\subseteq$ dove serve $\subsetneq$. |

Da verificare: 33 cook-levin s6 conta $O(T^2)$ clausole, la spiegazione $O(T^3)$; dipende da come si codifica la posizione della testina.

## Problemi

| Problema | Slide | Che cosa è sbagliato nel disegno |
|---|---|---|
| SAT | s2, s3 | Colori dei letterali per posizione invece che per valore. |
| VALIDITY | s3 | Ingressi dell'OR etichettati $x_0$, $x_1$ invece di $x$, $\neg x$. |
| co-SAT | s3 | Ingressi dell'AND etichettati $x_0$, $x_1$ invece delle clausole. |
| co-TSP(D) | s3 | Frecce incoerenti con il giro della slide 2. |
| SUCCINCT CIRCUIT SAT | s1, s2 | La NOT ha un ingresso proprio; il filo verso $x$ parte dalla porta sbagliata. |
| KNAPSACK | s3 | Un numero illeggibile sulla carta di C. |

## Ritagli

In alcune tavole il riquadro mostra una striscia del riquadro vicino (teoremi 41, 42, 62, 63, 79, 82, 91, 92): è la griglia dell'immagine, non il testo.

## Verifica dopo la correzione (16 ottobre 2026)

Controllati a confronto prima/dopo i 49 disegni corretti e i 55 riquadri ricomposti che risultavano cambiati: 91 su 104 andavano bene al primo controllo.

Terza verifica, dopo l'ultima correzione: i 3 disegni ancora sbagliati sono stati rifatti e ora sono corretti. In nexp-completi s6 l'indice finale è $2^n-1$; in tripartite-matching s2 le terne sono disegnate su entrambi i lati con etichette leggibili; in tsp-d s3 il giro non ha più frecce. Gli altri riquadri delle tavole 15, 16 e 31 sono identici a prima.

Accettabili così come sono: 65 t17-8-cor2 s3 (resta solo la scritta $Q_i y_i$ in verde chiaro, con la legenda "$\exists$ se $i$ dispari, $\forall$ se $i$ pari"), 91 bqp s4 (la somma usa $x$ come indice muto invece di $z$), co-SAT s2 e s3 (etichette $x_0$, $x_1$ per $x = 0$ e $x = 1$, spiegate dalla didascalia).

Le 9 didascalie che descrivevano il disegno vecchio sono state aggiornate, con i rispettivi alt. Tutte le 3.506 formule delle didascalie passano da KaTeX senza errori.
