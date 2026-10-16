# Didascalie delle dimostrazioni illustrate: gruppo teoremi-5

Teoremi: 65-t17-8-cor2, 66-t17-9, 67-cor-collasso-primo, 68-circ, 69-t17-10, 70-strategic-companies, 71-t17-11, 72-ph-pspace, 73-cor-ph-pspace, 74-qsat-pspace, 75-co-hamilton-pi2, 76-db-queries, 77-geography, 78-go. In tutto 60 slide, tutte riscritte.

Output: `scratchpad/illustrate/out/teoremi-5.json` (stesso numero e ordine di slide del manifesto, JSON validato con `json.load`, 343 formule renderizzate con KaTeX senza errori).

## Invocazione di humanizer

| skill       | invocazioni                                                            | caricata |
| ----------- | ---------------------------------------------------------------------- | -------- |
| `humanizer` | 1, con lo strumento Skill (base `/home/lore/.claude/skills/humanizer`) | sì       |

Per ogni teorema ho seguito i quattro passi della skill sulle didascalie: segnare i difetti, scrivere la bozza, ricontrollarla (fatti aggiunti o persi, poi §1, §2, §6, §8, §19), scrivere la versione finale. Ogni pannello è stato guardato con Read prima di scrivere la didascalia, e ogni didascalia è stata confrontata con la spiegazione approvata del teorema. Controlli automatici sulla versione finale: niente `—`, `–`, `**`, virgolette o apostrofi curvi, `$` bilanciati, da 33 a 80 parole per didascalia (tre sopra 75: 70/4, 77/3, 78/2, dove il passo ha due versi o un gadget da spiegare), titoli da 2 a 6 parole, nessun "Attenzione" né rimando a lezioni, slide o dispensa.

Difetti comuni a quasi tutte le didascalie di partenza, non ripetuti sotto:

- formule in Unicode (`Σᵢᴾ`, `Πᵢ₋₁ᴾ`, `QSAT₂`, `AC⁰`) invece che in LaTeX con `$…$` e classi in `\mathrm{}`: tutte convertite, anche nei titoli (67/0, 68/2, 69/2, 73/0, 75/1);
- §21 apostrofi curvi (`l’uguaglianza`, `un’alternanza`, `T′`): sostituiti con apostrofi dritti;
- nessun collegamento con il disegno: la didascalia ripeteva il passo senza dire che cosa si vede. In tutte le slide ora c'è almeno un elemento del disegno (riquadro, colore, freccia, etichetta) legato al passo.

## Difetti segnati e modifiche, per teorema

### 65-t17-8-cor2

- Slide 0, "La caratterizzazione di Σᵢᴾ" non dice quale: ora "Per il Teorema 17.8", con la lunghezza $|y| \le p(|x|)$ del disegno.
- §1 slide 2, coda negativa "non rimangono oracoli": in questo argomento non ci sono oracoli, tolta; al suo posto perché in fondo c'è $\mathrm{P}$ ($\Sigma_0^{\mathrm{P}} = \Pi_0^{\mathrm{P}} = \mathrm{P}$).
- Slide 3, il titolo promette il verso inverso ma la didascalia non lo spiegava ("si valuta usando un livello per blocco"): aggiunto il passo all'indietro (tolto $\exists y_1$, forma di $i-1$ blocchi in $\Pi_{i-1}^{\mathrm{P}}$ per induzione, poi Teorema 17.8).
- Aggiunto: riquadro verde $\exists y$ e viola $R_1$, il $\forall z$ viola davanti a $R_2$ di $\Sigma_{i-2}^{\mathrm{P}}$, la parità di $Q_i$, perché le $y_j$ restano polinomiali, le due righe $\Sigma$/$\Pi$ dell'ultimo pannello.

### 66-t17-9

- Titolo slide 0, "piano" al posto di "livello" (la spiegazione dice livello): corretto.
- §2 slide 0, "la dimostrazione parte da questa ipotesi" ripete la frase prima: sostituita con il fatto che l'uguaglianza non si sa se valga, quindi il risultato è condizionale.
- Titolo slide 1 "Riscrivi il blocco residuo", vago: ora "Riscrivi il controllo interno".
- Slide 3, "il piano universale superiore coincide con essa" senza conto: aggiunta la lettura della barra (classe dei complementi) e la catena $\Pi_{i+1}^{\mathrm{P}} = \mathrm{co}\Sigma_{i+1}^{\mathrm{P}} = \mathrm{co}\Sigma_i^{\mathrm{P}} = \Pi_i^{\mathrm{P}} = \Sigma_i^{\mathrm{P}}$.
- Aggiunto: le due righe del pannello 2 (stesso controllo con etichetta $\Pi_i^{\mathrm{P}}$ e poi $\Sigma_i^{\mathrm{P}}$), il secondo $\exists z$ e la fusione sulla coppia $(y, z)$, l'inclusione $\Sigma_i^{\mathrm{P}} \subseteq \Sigma_{i+1}^{\mathrm{P}}$ che serve per l'uguaglianza, le frecce della catena come passi dell'induzione, il collasso solo verso l'alto (errore tipico della spiegazione).

### 67-cor-collasso-primo

- Poche tracce nel testo di partenza; mancava solo il legame con i disegni e il perché del caso P = NP.
- Aggiunto: le due etichette $\mathrm{NP} = \Sigma_1^{\mathrm{P}}$ e $\mathrm{coNP} = \Pi_1^{\mathrm{P}}$; i riquadri annidati con NP scritto in ognuno; PH come unione dei livelli; la chiusura di P per complemento (scambio di accettazione e rifiuto) che giustifica la prima freccia; il verso opposto aperto (contrasto §1 tenuto: corregge l'errore tipico "NP = coNP implica P = NP").

### 68-circ

- Titolo slide 1 "Escludi un modello più piccolo": "più piccolo" fa pensare a contare gli atomi, mentre l'ordine è per inclusione; ora "Escludi un assegnamento più normale", con $M(T')$ sottoinsieme proprio di $M(T)$ come nel disegno.
- Slide 1, "insieme strettamente minore di atomi minimizzati veri", gergo: riscritto con gli atomi anormali veri.
- §2 slide 4, chiusa "questo trasferisce la difficoltà di QSAT₂", che nomina ciò che la slide ha appena mostrato: tolta, e anche la mia frase di chiusura "Così Φ è vera se e solo se CIRC SAT risponde sì" (ripeteva i due versi).
- Aggiunto: le due spunte del pannello 1; la croce come $\forall T'$; la domanda all'oracolo e $\mathrm{NP}^{\mathrm{NP}} = \Sigma_2^{\mathrm{P}}$; le coppie $x_T, x_F$ e $y_T, y_F$ con il perché di "esattamente uno" (spegnere $x_F$); come si costruisce il $T'$ rosso da una scelta $\alpha$; il riquadro di CIRC VALIDITY letto come complemento.

### 69-t17-10

- Slide 3, "La codifica si integra nell'ultimo blocco, senza introdurre un'ulteriore alternanza" non diceva come: aggiunte le due forme del disegno, $\exists Y, Z\ (T \land o)$ e $\forall Y, Z\ (T \Rightarrow o)$, e perché si equivalgono (macchina deterministica, una sola tabella corretta).
- Slide 1, "puoi negarlo e chiedere il problema Σᵢ₋₁ᴾ": ora dice che la negazione nel riquadro rosso è un'istanza di $\mathrm{QSAT}_{i-1}$ e che la macchina è in $\mathrm{NP}^{\Sigma_{i-1}^{\mathrm{P}}}$.
- Slide 4: aggiunto perché anche il complemento è $\Pi_i^{\mathrm{P}}$-completo (la stessa riduzione sui complementi) e lo spazio logaritmico della costruzione.
- Aggiunto: SAT e Cook-Levin per $i = 1$; la catena di riquadri come prefisso del Corollario 2.

### 70-strategic-companies

- Titolo slide 0 "Scegli una candidata" (il soggetto è un gruppo): ora "Scegli un gruppo candidato".
- Slide 3, "Una società w impone entrambe le scelte universali", vago: ora $w$ controlla da sola $y_j$ e $\neg y_j$, e ogni termine della DNF è un insieme di controllo per $w$.
- Slide 4, "togliere w e parte delle società", vago: ora quali (il letterale falso di ogni $y_j$, il cerchio vuoto del disegno) e perché il gruppo va ancora bene; per il verso destro, perché ogni sottoinsieme proprio fa rientrare $w$.
- Slide 5, "Σ₂ᴾ-hardness" in inglese e coppia parallela "dà ... e ... dà": riscritto, con la dimensione lineare della costruzione.
- Aggiunto: il $G$ del disegno è il $C'$ della definizione; le frecce verso le controllate e le merci; la domanda all'oracolo nel riquadro tratteggiato; le società $a_i$, $\bar a_i$ e la merce $m_i$.

### 71-t17-11

- §2 slide 2, "un problema PH-completo implica il collasso" ripete il teorema: tolta; al suo posto l'errore tipico (il teorema non dice che un problema PH-completo non esiste; contrasto §1 tenuto perché corregge un errore reale).
- Slide 0, "Per appartenere a PH, quel problema B appartiene": ripetizione, riscritta.
- Aggiunto: il punto verde, PH come unione infinita di livelli, le frecce come riduzioni, perché $\Sigma_k^{\mathrm{P}}$ è chiusa (polinomio di un polinomio), le due frecce del pannello 3.

### 72-ph-pspace

- Poche tracce nel testo di partenza.
- Aggiunto: $k$ blocchi su stringhe di $p(n)$ bit come nel disegno, con $k$ fissato dal problema; il ramo verde dell'albero e l'ordine del contatore binario; la colonna del pannello 3 letta cella per cella e il conto $k \cdot p(n)$ più un polinomio; il tempo esponenziale.

### 73-cor-ph-pspace

- §2 slide 2, "Quindi PH = PSPACE implicherebbe un collasso" ripete il titolo del corollario: sostituita con il fatto che il corollario non dimostra $\mathrm{PH} \neq \mathrm{PSPACE}$ (errore tipico della spiegazione).
- Aggiunto: riquadro rosa PSPACE uguale a PH, la freccia verso $\Sigma_k^{\mathrm{P}}$, perché il primo passo rende l'ipotesi poco credibile, le frecce del pannello 2 come riduzioni a QSAT.

### 74-qsat-pspace

- Slide 4, "Il numero di alternanze può crescere con l'input: QSAT è PSPACE-completo": i due punti legavano due fatti senza rapporto di causa; separati, e la completezza ora segue dalla dimensione polinomiale.
- Slide 3, "una scelta universale per quale metà controllare": aggiunta la formula con un'unica copia $\phi(u, v)$ e il perché del raddoppio evitato.
- Aggiunto: le foglie T/F del pannello 1 e la combinazione con $\exists$ e $\forall$; ramo pieno e nodi tratteggiati; $m = O(n^c)$ bit per configurazione, $\delta$ fra $C_t$ e $C_{t+1}$, il cammino fino a $2^m$ passi.

### 75-co-hamilton-pi2

- §1 e §2 slide 2, chiusa "La completezza più forte è pertanto una condizione ipotetica, non un risultato noto": tolta; al suo posto l'equivalenza con $\mathrm{NP} = \mathrm{coNP}$, che è aperta.
- Titolo slide 1 "Analizza una completezza più forte", vago: ora "Supponi la $\Pi_2^{\mathrm{P}}$-completezza".
- Aggiunto: il cammino 1, 2, 3, 4, 5 come certificato della risposta no; perché stare in $\Pi_2^{\mathrm{P}}$ è gratis; l'ovale tratteggiato che coinciderebbe con coNP; il passaggio $\mathrm{NP} \subseteq \Pi_2^{\mathrm{P}} = \mathrm{coNP}$ e la complementazione.

### 76-db-queries

- §15 slide 1, rider "dando PSPACE-hardness": sostituito con una frase propria; "hardness" diventato "PSPACE-difficile".
- Aggiunto: l'albero di valutazione del pannello 1; la relazione $\mathit{Vero} = \{1\}$ e la query nel riquadro verde; i contatori $x_1, \ldots, x_k$ di $O(\log n)$ bit; il certificato $(a_1, \ldots, a_k)$; la relazione $\mathit{Diff}$ con le 6 coppie e la colorazione del triangolo ($c_u = r$, $c_v = g$, $c_w = b$, ricontrollata); la porta "oppure" rossa e le porte "e" verdi.

### 77-geography

- §2 slide 0, "È un'alternanza di ∃ e ∀." frase corta che ripete: fusa nella frase sulla strategia vincente.
- Slide 1, "un numero lineare di mosse nei vertici": riscritto ("al più $|V|$ mosse").
- Aggiunto: i nodi rossi del turno di $\forall$; il cammino verde da $s$; il riquadro dei vertici usati, che coincidono con quelli del cammino; lo spazio $O(|V| \log |V|)$; come funzionano il gadget di scelta e quello delle clausole.

### 78-go

- §1 slide 3, coda "non è una prova per tutte le possibili regole di GO": tolta; il limite sulla durata è spiegato nella slide 0 (ko, EXP-completezza) e la slide 3 dice "GO con durata polinomiale".
- Slide 0, "Questo limite è necessario per il ragionamento di appartenenza" senza il perché: aggiunti ko ed EXP-completezza, e perché la scacchiera è $n \times n$.
- Aggiunto: la freccia $T$, i livelli $d$ dell'albero di scacchiere, il pezzo di grafo a sinistra, il corridoio verde, perché serve la planarità, la croce rosa come gruppo catturato, il gruppo enorme che decide il punteggio.

## Discrepanze fra disegno e matematica

1. 68-circ, pannello 4: il riquadro di $T$ porta la scritta "minimale", ma il pannello mostra un $T'$ con $M(T') \subsetneq M(T)$, cioè proprio il caso in cui $T$ non è minimale. La didascalia chiama $T$ "candidato" e dice che resta minimale solo se il controesempio non esiste.
2. 74-qsat-pspace, pannello 5: "$|\phi_M| = \mathrm{poly}(|M|)$" e "M accetta ⟺ $\phi_M$ è vera". La macchina $M$ è fissata; la riduzione manda ogni input $x$ in una formula di dimensione polinomiale in $|x|$, vera se e solo se $M$ accetta $x$. Il disegno usa anche $\le_p$, mentre la spiegazione costruisce la riduzione in spazio logaritmico. La didascalia usa la versione corretta e non riprende "poly(|M|)".
3. 77-geography, pannello 4: il gadget di scelta è disegnato come un albero binario (i due valori di $x$ portano a due copie distinte del nodo $y$). Come grafo, questo duplicherebbe tutto ciò che segue e avrebbe dimensione esponenziale; la costruzione vera è una catena di rombi i cui lati si ricongiungono, di dimensione lineare. La didascalia non descrive la forma ad albero e dice che i due lati di ogni scelta si ricongiungono. Inoltre l'esempio $\exists x\, \forall y\, \varphi$ finisce con $\forall$, mentre la costruzione suppone che l'ultimo quantificatore sia $\exists$ (si aggiunge una variabile fittizia); non ripreso nella didascalia.
4. 70-strategic-companies, pannelli 1 e 2: il disegno chiama $G$ il gruppo di società candidato e $H$ i suoi sottoinsiemi, mentre nella spiegazione $G$ è l'insieme delle merci e il gruppo è $C'$. La didascalia della slide 0 lo dice esplicitamente. Nel pannello 1 la società $c$ è disegnata dentro il riquadro "controllate", che mescola la società richiesta con quelle imposte dalla chiusura; la didascalia le nomina separatamente.
5. 65-t17-8-cor2, pannello 3: il blocco $Q_i y_i$ è verde come i blocchi $\exists$, ma $Q_i$ è $\exists$ solo per $i$ dispari. La didascalia dà la regola della parità.
6. 67-cor-collasso-primo, pannello 2: i livelli sono disegnati come riquadri annidati ($\Pi_2^{\mathrm{P}}$ dentro $\Sigma_2^{\mathrm{P}}$, e così via). In generale non si sa che $\Pi_k^{\mathrm{P}} \subseteq \Sigma_k^{\mathrm{P}}$; qui va bene solo perché sotto l'ipotesi sono tutti uguali a NP. La didascalia non presenta l'annidamento come inclusione.

Differenze di notazione o di percorso, non errori:

- 66-t17-9, pannelli 2 e 3: le lettere sono scambiate rispetto alla spiegazione ($S(x, y)$ è il controllo riscritto in $\Sigma_i^{\mathrm{P}}$, $R(x, y, z)$ la relazione finale in $\Pi_{i-1}^{\mathrm{P}}$; nella spiegazione $R$ è il controllo in $\Pi_i^{\mathrm{P}}$ e $S$ quello in $\Pi_{i-1}^{\mathrm{P}}$). Le didascalie evitano queste lettere.
- 69-t17-10, pannelli 2 e 4: l'appartenenza passa per l'oracolo ($\mathrm{NP}^{\Sigma_{i-1}^{\mathrm{P}}}$) e l'ultimo blocco $\forall$ si tratta con $\forall Y, Z\ (T \Rightarrow o)$; la spiegazione usa invece il Corollario 2 e, per $i$ pari, passa da $\Pi_i^{\mathrm{P}}$ e dal complemento. Entrambe le strade sono corrette.
- 74-qsat-pspace, pannello 4: la scelta della metà è disegnata come $\forall b \in \{0, 1\}$; la spiegazione la scrive con $\forall A\, \forall B$ e un'implicazione. La didascalia dà la formula con l'implicazione, nella notazione del disegno ($u$, $v$).
- 68-circ, pannello 3, e 70-strategic-companies, pannello 3: nomi diversi dalla spiegazione ($x_T, x_F$ per $x, x'$; $a_i, \bar a_i, m_i$ per i letterali e la merce $g_{x_i}$).
- 72-ph-pspace: il disegno usa $k$ per il numero di blocchi e $p(n)$ per la lunghezza, la spiegazione $i$ e $|x|^k$. Le didascalie seguono il disegno.
- 76-db-queries, pannello 1: la tabella del database ha colonne intestate "R" e "S", mentre la query usa una relazione binaria $R(x, y)$; ambiguo, la didascalia non descrive la tabella.
