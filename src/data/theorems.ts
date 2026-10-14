/* 92 teoremi del corso (dispensa e slide; senza i risultati esterni). Testo in HTML. */
import type { ClassId } from "./classes";
export type Theorem = { id: string; nome: string; tipo: string; enunciato: string; intuizione: string; uso_esame: string; capitolo: string; pagina: number | null; lezione: number | null; fonti: string[]; classi: ClassId[]; prova: string; esterno: boolean; nota_fonte: string; correzione: string };
export const THEOREMS: Theorem[] = [
 {
  "id": "ricorsivo-re",
  "nome": "Proposizione 2.1 (ricorsivo ⇒ ricorsivamente enumerabile)",
  "tipo": "proposizione",
  "enunciato": "Se un linguaggio L è ricorsivo (esiste una MdT che lo decide), allora è anche ricorsivamente enumerabile (esiste una MdT che lo accetta): R ⊆ RE.",
  "intuizione": "Si prende la macchina che decide L e, invece di fermarsi in \"no\", la si fa andare a destra all'infinito.",
  "uso_esame": "Giustifica R ⊆ RE quando si colloca un problema nella scala R, RE, coRE.",
  "capitolo": "1 · Macchina di Turing",
  "pagina": 7,
  "lezione": 2,
  "fonti": [
   "dispensa cap. 1, p. 7",
   "slide Lez. 2"
  ],
  "classi": [
   "R",
   "RE"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "Le slide della Lez. 5 richiamano anche che i ricorsivi e i ricorsivamente enumerabili sono separati per diagonalizzazione (dal corso di Elementi di Informatica Teorica): l'inclusione stretta non è dimostrata in questo corso.",
  "correzione": ""
 },
 {
  "id": "speedup-multinastro",
  "nome": "Teorema dello speedup multinastro (da k nastri a 1)",
  "tipo": "teorema",
  "enunciato": "Per ogni MdT M a k nastri che lavora in tempo f(n) esiste una MdT M′ a un solo nastro che lavora in tempo O(f(n)<sup>2</sup>) e dà lo stesso risultato: M(x) = M′(x) per ogni input x.",
  "intuizione": "I k nastri si concatenano su un solo nastro con dei marcatori per le testine; ogni passo di M costa due scansioni di un nastro lungo O(f(n)).",
  "uso_esame": "Il numero di nastri cambia il tempo al più di un fattore quadratico, quindi P e le classi polinomiali non dipendono dal numero di nastri.",
  "capitolo": "2 · MdT multinastro",
  "pagina": 13,
  "lezione": 2,
  "fonti": [
   "dispensa cap. 2, p. 13",
   "slide Lez. 2"
  ],
  "classi": [
   "P"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "ram-mdt",
  "nome": "Teorema 2.5 (le RAM si simulano con le MdT)",
  "tipo": "teorema",
  "enunciato": "Se una RAM calcola una funzione φ in tempo f(n), esiste una MdT a 7 nastri che calcola φ in tempo O(f(n)<sup>3</sup>).",
  "intuizione": "Un modello molto vicino ai calcolatori reali risolve gli stessi problemi delle MdT, con una perdita di efficienza solo polinomiale.",
  "uso_esame": "Giustifica l'uso delle MdT come modello: un problema in tempo polinomiale su RAM resta in P.",
  "capitolo": "2 · MdT multinastro",
  "pagina": null,
  "lezione": 2,
  "fonti": [
   "slide Lez. 2"
  ],
  "classi": [
   "P"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "Solo nelle slide della Lez. 2 (Teorema 2.5 del Papadimitriou); la dispensa non lo riporta.",
  "correzione": ""
 },
 {
  "id": "linear-speedup",
  "nome": "Teorema dello speedup lineare",
  "tipo": "teorema",
  "enunciato": "Se L ∈ TIME(f(n)), allora per ogni ε > 0 vale L ∈ TIME(ε·f(n) + n + 2).",
  "intuizione": "Raggruppando più simboli in uno solo la macchina fa più lavoro a ogni passo: le costanti moltiplicative si possono sempre eliminare.",
  "uso_esame": "Spiega perché conta solo la notazione O(): per esempio, se L ∈ TIME(150n<sup>2</sup>) allora L ∈ TIME(n<sup>2</sup> + n + 2).",
  "capitolo": "2 · MdT multinastro",
  "pagina": 14,
  "lezione": 2,
  "fonti": [
   "dispensa cap. 2, p. 14",
   "slide Lez. 2"
  ],
  "classi": [],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "La dispensa enuncia il teorema senza prova; le slide della Lez. 2 lo dimostrano.",
  "correzione": ""
 },
 {
  "id": "mdt-io",
  "nome": "Proposizione (MdT con input e output)",
  "tipo": "proposizione",
  "enunciato": "Per ogni MdT M a k nastri che lavora in tempo f(n) esiste una MdT con input e output a k + 2 nastri che dà lo stesso output e lavora in tempo O(f(n)).",
  "intuizione": "Si copia l'input sul secondo nastro, si simula M sui nastri centrali e alla fine si copia l'output sull'ultimo nastro.",
  "uso_esame": "Il nastro di input in sola lettura non toglie potenza: per questo lo spazio si misura senza contare input e output, e si possono definire L e NL.",
  "capitolo": "2 · MdT multinastro",
  "pagina": 16,
  "lezione": 2,
  "fonti": [
   "dispensa cap. 2, p. 16",
   "slide Lez. 2"
  ],
  "classi": [
   "L",
   "NL"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "space-compression",
  "nome": "Teorema di compressione dello spazio",
  "tipo": "teorema",
  "enunciato": "Se L ∈ SPACE(f(n)), allora per ogni ε > 0 vale L ∈ SPACE(2 + ε·f(n)).",
  "intuizione": "Come per lo speedup lineare, più celle si codificano in un solo simbolo: le costanti non contano nemmeno per lo spazio.",
  "uso_esame": "Le costanti moltiplicative non contano nemmeno nelle classi di spazio.",
  "capitolo": "2 · MdT multinastro",
  "pagina": 16,
  "lezione": 2,
  "fonti": [
   "dispensa cap. 2, p. 16",
   "slide Lez. 2"
  ],
  "classi": [],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "Le slide dicono solo: prova simile al linear speedup (Problema 2.8.14 del Papadimitriou).",
  "correzione": ""
 },
 {
  "id": "p-sub-np",
  "nome": "Proposizione P ⊆ NP",
  "tipo": "proposizione",
  "enunciato": "Ogni problema che una MdT deterministica risolve in tempo polinomiale sta in NP: P ⊆ NP.",
  "intuizione": "Una MdT deterministica è un caso particolare di MdT nondeterministica, in cui la relazione Δ è una funzione.",
  "uso_esame": "È il primo anello di ogni catena di inclusioni; il viceversa NP ⊆ P è la questione aperta P = NP.",
  "capitolo": "3 · MdT nondeterministiche",
  "pagina": 18,
  "lezione": 3,
  "fonti": [
   "dispensa cap. 3, p. 18",
   "slide Lez. 3"
  ],
  "classi": [
   "P",
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "ndet-det",
  "nome": "Teorema (da nondeterministico a deterministico)",
  "tipo": "teorema",
  "enunciato": "Se L è deciso da una MdT nondeterministica N in tempo f(n), allora è deciso da una MdT deterministica a 3 nastri in tempo O(c<sup>f(n)</sup>), con c > 1 costante che dipende da N. In breve: NTIME(f(n)) ⊆ ⋃<sub>c>1</sub> TIME(c<sup>f(n)</sup>).",
  "intuizione": "La macchina deterministica prova una dopo l'altra tutte le sequenze di scelte, che sono al più d<sup>f(n)</sup> (d è il grado di nondeterminismo).",
  "uso_esame": "Dà NP ⊆ EXP: togliere il nondeterminismo dal tempo, per quanto si sa oggi, costa un esponenziale.",
  "capitolo": "3 · MdT nondeterministiche",
  "pagina": 20,
  "lezione": 3,
  "fonti": [
   "dispensa cap. 3, p. 20",
   "slide Lez. 3"
  ],
  "classi": [
   "NP",
   "EXP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": "Le slide della Lez. 3 danno come costo complessivo O(d<sup>f(n)</sup>), ma il prodotto di O(d<sup>f(n)</sup>) simulazioni per O(n + f(n)) passi ciascuna è O(f(n)·d<sup>f(n)</sup>). Per stare in O(c<sup>f(n)</sup>) basta prendere c > d, per esempio c = 2d."
 },
 {
  "id": "reach-nl",
  "nome": "REACHABILITY in spazio logaritmico nondeterministico",
  "tipo": "proposizione",
  "enunciato": "REACHABILITY si decide con una MdT nondeterministica in spazio O(log n): REACHABILITY ∈ NL.",
  "intuizione": "La macchina ricorda solo il nodo corrente e il prossimo, scelto nondeterministicamente: due numeri tra 1 e n, cioè O(log n) celle.",
  "uso_esame": "Esempio tipico di problema in NL; è anche il punto di partenza del Teorema di Savitch.",
  "capitolo": "3 · MdT nondeterministiche",
  "pagina": null,
  "lezione": 3,
  "fonti": [
   "slide Lez. 3",
   "appunti Lez. 3"
  ],
  "classi": [
   "NL"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "Presentato nelle slide della Lez. 3 (algoritmo a 3 nastri); la dispensa non lo enuncia come risultato a sé.",
  "correzione": ""
 },
 {
  "id": "gap-theorem",
  "nome": "Gap Theorem (Teorema 7.3)",
  "tipo": "teorema",
  "enunciato": "Esiste una funzione ricorsiva f tale che TIME(f(n)) = TIME(2<sup>f(n)</sup>).",
  "intuizione": "Con funzioni \"strane\" come budget anche un aumento esponenziale delle risorse può non dare problemi nuovi: per questo il corso usa solo funzioni di complessità proprie.",
  "uso_esame": "Motiva l'ipotesi \"f propria\" nei teoremi di gerarchia.",
  "capitolo": "4 · Funzioni di complessità proprie",
  "pagina": null,
  "lezione": 4,
  "fonti": [
   "slide Lez. 4",
   "appunti Lez. 4"
  ],
  "classi": [],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "Solo nelle slide della Lez. 4 (Teorema 7.3 del Papadimitriou); gli appunti lo segnano come non chiesto all'esame.",
  "correzione": ""
 },
 {
  "id": "soluzioni-precise",
  "nome": "Teorema delle soluzioni precise",
  "tipo": "teorema",
  "enunciato": "Se M decide L in tempo o spazio f(n), con f propria, allora esiste una MdT precisa M′ che decide L in tempo o spazio O(f(n)). Precisa vuol dire che ogni computazione si ferma dopo esattamente f(|x|) passi e i nastri di lavoro hanno lunghezza fissata.",
  "intuizione": "Prima si calcola il \"metro\" lungo f(|x|) con la macchina M<sub>f</sub>, poi lo si usa come sveglia (tempo) o come limite di memoria (spazio).",
  "uso_esame": "",
  "capitolo": "4 · Funzioni di complessità proprie",
  "pagina": 21,
  "lezione": 4,
  "fonti": [
   "dispensa cap. 4, p. 21",
   "slide Lez. 4"
  ],
  "classi": [],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "terminazione-space",
  "nome": "Teorema (terminazione delle MdT space-bounded)",
  "tipo": "teorema",
  "enunciato": "Se M decide L in spazio f(n), con f propria, allora esiste M′ che decide L in spazio O(f(n)) e tale che ogni sua computazione termina.",
  "intuizione": "Le configurazioni possibili sono al più |K|·|Σ|<sup>f(n)</sup>·(f(n)+1): se la macchina fa più passi di così è in un ciclo, e la si può fermare in \"no\".",
  "uso_esame": "È l'idea dietro SPACE(f(n)) ⊆ TIME(k<sup>f(n)</sup>) e quindi PSPACE ⊆ EXP.",
  "capitolo": "4 · Funzioni di complessità proprie",
  "pagina": 22,
  "lezione": 4,
  "fonti": [
   "dispensa cap. 4, p. 22",
   "slide Lez. 4"
  ],
  "classi": [
   "PSPACE",
   "EXP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "chiusura-det-complemento",
  "nome": "Proposizione (le classi deterministiche sono chiuse per complemento)",
  "tipo": "proposizione",
  "enunciato": "Se C è una classe deterministica TIME(f(n)) o SPACE(f(n)), allora C = coC; per esempio P = coP.",
  "intuizione": "Basta scambiare gli stati \"yes\" e \"no\" della macchina deterministica.",
  "uso_esame": "Serve a dire che P ⊆ coNP e che, se P = NP, allora anche NP = coNP.",
  "capitolo": "6 · Classi complementari",
  "pagina": 25,
  "lezione": 4,
  "fonti": [
   "dispensa cap. 6, p. 25",
   "slide Lez. 4"
  ],
  "classi": [
   "P",
   "L",
   "PSPACE",
   "EXP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "hf-upper",
  "nome": "Lemma 1 (limite superiore per H<sub>f</sub>)",
  "tipo": "lemma",
  "enunciato": "Per f(n) ≥ n propria, il linguaggio H<sub>f</sub> = {M;x : M accetta x in al più f(|x|) passi} sta in TIME(f(n)<sup>3</sup>).",
  "intuizione": "Una macchina universale con una \"sveglia\" lunga f(|x|) simula M passo per passo, e ogni passo costa O(f(n)<sup>2</sup>).",
  "uso_esame": "",
  "capitolo": "7 · Teorema di gerarchia",
  "pagina": 26,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 7, p. 26",
   "slide Lez. 5"
  ],
  "classi": [],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "hf-lower",
  "nome": "Lemma 2 (limite inferiore per H<sub>f</sub>)",
  "tipo": "lemma",
  "enunciato": "H<sub>f</sub> ∉ TIME(f(⌊n/2⌋)).",
  "intuizione": "Diagonalizzazione: se una macchina decidesse H<sub>f</sub> così in fretta, la macchina D<sub>f</sub> che \"fa il contrario\" sulla propria descrizione porterebbe a una contraddizione.",
  "uso_esame": "",
  "capitolo": "7 · Teorema di gerarchia",
  "pagina": 27,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 7, p. 27",
   "slide Lez. 5"
  ],
  "classi": [],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "time-hierarchy",
  "nome": "Teorema di gerarchia per il tempo (Teorema 7.1)",
  "tipo": "teorema",
  "enunciato": "Se f(n) ≥ n è una funzione propria, allora TIME(f(n)) ⊊ TIME(f(2n+1)<sup>3</sup>). È stato dimostrato anche il risultato più forte TIME(f(n)) ⊊ TIME(f(n)·log<sup>2</sup> f(n)).",
  "intuizione": "Con abbastanza tempo in più si risolvono problemi nuovi: con g(n) = f(2n+1), H<sub>g</sub> sta nella classe grande (Lemma 1) ma non in quella piccola (Lemma 2).",
  "uso_esame": "Serve a separare classi di tempo, per esempio a dimostrare P ⊊ EXP.",
  "capitolo": "7 · Teorema di gerarchia",
  "pagina": 28,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 7, p. 28",
   "slide Lez. 5"
  ],
  "classi": [
   "P",
   "EXP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "La versione con log<sup>2</sup> f(n) è citata senza prova (Problema 7.4.8 del Papadimitriou).",
  "correzione": "Nella dispensa (p. 28) l'ultima riga della prova scrive TIME(f((2n + 1)<sup>3</sup>)): va letto TIME(f(2n + 1)<sup>3</sup>), come nell'enunciato."
 },
 {
  "id": "p-neq-exp",
  "nome": "Teorema (separazione di P ed EXP)",
  "tipo": "teorema",
  "enunciato": "P ⊊ EXP.",
  "intuizione": "P ⊆ TIME(2<sup>n</sup>) e, per la gerarchia, TIME(2<sup>n</sup>) ⊊ TIME((2<sup>2n+1</sup>)<sup>3</sup>) ⊆ TIME(2<sup>n<sup>2</sup></sup>) ⊆ EXP.",
  "uso_esame": "Serve a rispondere NO a \"P = EXP?\" e a escludere riduzioni da problemi completi per EXP (o classi più grandi, come NEXP) verso problemi in P.",
  "capitolo": "7 · Teorema di gerarchia",
  "pagina": 28,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 7, p. 28",
   "slide Lez. 5"
  ],
  "classi": [
   "P",
   "EXP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "space-hierarchy",
  "nome": "Teorema di gerarchia per lo spazio (Teorema 7.2)",
  "tipo": "teorema",
  "enunciato": "Se f è una funzione propria, allora SPACE(f(n)) ⊊ SPACE(f(n)·log f(n)).",
  "intuizione": "Stessa diagonalizzazione del tempo, con versioni dei due lemmi per lo spazio; il gradino è più basso perché simulare costa poca memoria in più.",
  "uso_esame": "Serve a separare classi di spazio: per esempio da SPACE(log n) ⊊ SPACE(log n·log log n) ⊆ PSPACE si ricava L ⊊ PSPACE.",
  "capitolo": "7 · Teorema di gerarchia",
  "pagina": 29,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 7, p. 29",
   "slide Lez. 5"
  ],
  "classi": [
   "L",
   "PSPACE"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "Né la dispensa né le slide danno la prova (rimandano al Teorema 7.2 e al Problema 7.4.9 del Papadimitriou). La conseguenza L ⊊ PSPACE è ricavata negli appunti della Lez. 5.",
  "correzione": ""
 },
 {
  "id": "ndet-hierarchy",
  "nome": "Gerarchie nondeterministiche",
  "tipo": "teorema",
  "enunciato": "NTIME(n<sup>c</sup>) ⊊ NTIME(n<sup>d</sup>) per ogni coppia di costanti 1 ≤ c < d. Per lo spazio, per ogni funzione crescente h (anche lentissima): NSPACE(log n) ⊊ NSPACE(log n·h(n)), NSPACE(n<sup>k</sup>) ⊊ NSPACE(n<sup>k</sup>·h(n)), NSPACE(2<sup>n</sup>) ⊊ NSPACE(2<sup>n</sup>·h(n)), NSPACE(2<sup>2<sup>n</sup></sup>) ⊊ NSPACE(2<sup>2<sup>n+1</sup></sup>).",
  "intuizione": "Le gerarchie nondeterministiche sono molto più fitte di quelle deterministiche: basta pochissimo in più per avere problemi nuovi.",
  "uso_esame": "",
  "capitolo": "8 · Gerarchie nondeterministiche",
  "pagina": 29,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 8, p. 29",
   "slide Lez. 5"
  ],
  "classi": [
   "NL",
   "NP"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "time-in-space",
  "nome": "Tempo dato lo spazio (Hopcroft, Paul e Valiant)",
  "tipo": "teorema",
  "enunciato": "TIME(f(n)) ⊆ SPACE(f(n)); più precisamente TIME(f(n)) ⊆ SPACE(f(n) / log f(n)).",
  "intuizione": "Ogni cella usata è costata almeno un passo per raggiungerla, quindi lo spazio non supera mai il tempo.",
  "uso_esame": "Dà P ⊆ PSPACE; se un problema non si risolve in spazio polinomiale non si risolve neanche in tempo polinomiale.",
  "capitolo": "9 · Tempo dato lo spazio",
  "pagina": 29,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 9, p. 29",
   "slide Lez. 5"
  ],
  "classi": [
   "P",
   "PSPACE"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "TIME(f) ⊆ SPACE(f) è giustificato nelle slide; il raffinamento con log f(n) è citato senza prova (Problema 7.4.17 del Papadimitriou).",
  "correzione": ""
 },
 {
  "id": "space-in-time",
  "nome": "Spazio dato il tempo",
  "tipo": "teorema",
  "enunciato": "SPACE(f(n)) ⊆ TIME(k<sup>f(n)</sup>) per una costante k; in particolare PSPACE ⊆ EXP.",
  "intuizione": "Una macchina con spazio f(n) ha un numero di configurazioni esponenziale in f(n): se fa più passi di così è in un ciclo.",
  "uso_esame": "Dà PSPACE ⊆ EXP (non si sa se l'inclusione è stretta).",
  "capitolo": "10 · Spazio dato il tempo",
  "pagina": 29,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 10, p. 29",
   "slide Lez. 5"
  ],
  "classi": [
   "PSPACE",
   "EXP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "t7-4a",
  "nome": "Teorema 7.4 (a)",
  "tipo": "proposizione",
  "enunciato": "TIME(f(n)) ⊆ NTIME(f(n)) e SPACE(f(n)) ⊆ NSPACE(f(n)).",
  "intuizione": "Le MdT deterministiche sono casi particolari di quelle nondeterministiche.",
  "uso_esame": "Inclusioni di base come P ⊆ NP, L ⊆ NL e PSPACE ⊆ NPSPACE.",
  "capitolo": "11 · Deterministico vs nondeterministico (Savitch)",
  "pagina": 32,
  "lezione": 5,
  "fonti": [
   "slide Lez. 5",
   "dispensa cap. 11, p. 32 (usato nel corollario PSPACE = NPSPACE)"
  ],
  "classi": [
   "P",
   "NP",
   "L",
   "NL"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "t7-4b",
  "nome": "Teorema 7.4 (b)",
  "tipo": "teorema",
  "enunciato": "NTIME(f(n)) ⊆ SPACE(f(n)).",
  "intuizione": "Si provano le sequenze di scelte una alla volta riusando lo stesso spazio: ogni computazione è lunga al più f(n).",
  "uso_esame": "Dà NP ⊆ PSPACE.",
  "capitolo": "11 · Deterministico vs nondeterministico (Savitch)",
  "pagina": 30,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 11, p. 30",
   "slide Lez. 5"
  ],
  "classi": [
   "NP",
   "PSPACE"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "t7-4c",
  "nome": "Teorema 7.4 (c)",
  "tipo": "teorema",
  "enunciato": "NSPACE(f(n)) ⊆ TIME(k<sup>log n + f(n)</sup>).",
  "intuizione": "Si risolve REACHABILITY sul grafo delle configurazioni, che ha un numero di nodi esponenziale in log n + f(n).",
  "uso_esame": "Con f(n) = log n dà NL ⊆ P.",
  "capitolo": "11 · Deterministico vs nondeterministico (Savitch)",
  "pagina": 30,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 11, p. 30",
   "slide Lez. 5"
  ],
  "classi": [
   "NL",
   "P"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "La dispensa omette la prova; le slide della Lez. 5 la svolgono.",
  "correzione": "Nelle slide della Lez. 5, \"data l'ipotesi che il tempo utilizzato è f(n)\" va letto \"lo spazio utilizzato\": l'ipotesi del punto (c) è sullo spazio."
 },
 {
  "id": "catena-classi",
  "nome": "Corollario (catena L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE)",
  "tipo": "corollario",
  "enunciato": "L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE.",
  "intuizione": "Si ottiene mettendo insieme il Teorema 7.4 (a), (b) e (c).",
  "uso_esame": "È la catena da citare nelle risposte SÌ \"per inclusione\".",
  "capitolo": "11 · Deterministico vs nondeterministico (Savitch)",
  "pagina": 30,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 11, p. 30",
   "slide Lez. 5"
  ],
  "classi": [
   "L",
   "NL",
   "P",
   "NP",
   "PSPACE"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "Nelle slide è lasciato come esercizio.",
  "correzione": ""
 },
 {
  "id": "savitch",
  "nome": "Teorema di Savitch (Teorema 7.5)",
  "tipo": "teorema",
  "enunciato": "REACHABILITY ∈ SPACE(log<sup>2</sup> n).",
  "intuizione": "Un cammino lungo al più 2<sup>i</sup> da x a y ha un punto di mezzo z: si prova ogni z ricorsivamente riusando lo spazio; la ricorsione è profonda log n e ogni livello usa O(log n) celle.",
  "uso_esame": "È la base dei corollari NSPACE(f(n)) ⊆ SPACE(f(n)<sup>2</sup>) e PSPACE = NPSPACE.",
  "capitolo": "11 · Deterministico vs nondeterministico (Savitch)",
  "pagina": 30,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 11, p. 30",
   "slide Lez. 5"
  ],
  "classi": [
   "NL",
   "PSPACE"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "savitch-cor",
  "nome": "Corollario di Savitch (spazio nondeterministico)",
  "tipo": "corollario",
  "enunciato": "Per ogni funzione propria f(n) ≥ log n: NSPACE(f(n)) ⊆ SPACE(f(n)<sup>2</sup>).",
  "intuizione": "Si applica l'algoritmo di Savitch al grafo delle configurazioni, che ha c<sup>f(n)</sup> nodi: log<sup>2</sup>(c<sup>f(n)</sup>) = O(f(n)<sup>2</sup>).",
  "uso_esame": "Togliere il nondeterminismo costa solo un quadrato nello spazio, mentre nel tempo (per quanto si sa) costa un esponenziale.",
  "capitolo": "11 · Deterministico vs nondeterministico (Savitch)",
  "pagina": 31,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 11, p. 31",
   "slide Lez. 5"
  ],
  "classi": [
   "NL",
   "PSPACE"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": "Nella dispensa (p. 32) il corollario è scritto PSPACE = NSPACE: va letto PSPACE = NPSPACE."
 },
 {
  "id": "pspace-npspace",
  "nome": "Corollario: PSPACE = NPSPACE",
  "tipo": "corollario",
  "enunciato": "PSPACE = NPSPACE: il nondeterminismo non aggiunge problemi risolubili in spazio polinomiale.",
  "intuizione": "Il quadrato di un polinomio è ancora un polinomio.",
  "uso_esame": "Serve a rispondere SÌ a \"NPSPACE ⊆ PSPACE?\" e a dire che un problema PSPACE-completo e uno NPSPACE-completo si riducono l'uno all'altro.",
  "capitolo": "11 · Deterministico vs nondeterministico (Savitch)",
  "pagina": 32,
  "lezione": 5,
  "fonti": [
   "dispensa cap. 11, p. 32",
   "dispensa cap. 14, p. 57 (esercizio 3)",
   "slide Lez. 5"
  ],
  "classi": [
   "PSPACE"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "composizione-riduzioni",
  "nome": "Proposizione (composizione di riduzioni)",
  "tipo": "proposizione",
  "enunciato": "Se R è una riduzione da L<sub>1</sub> a L<sub>2</sub> e R′ è una riduzione da L<sub>2</sub> a L<sub>3</sub>, allora R′∘R è una riduzione da L<sub>1</sub> a L<sub>3</sub> (ancora in spazio logaritmico).",
  "intuizione": "R(x) non si scrive per intero: ogni volta che serve un suo simbolo lo si ricalcola, tenendo solo un contatore di O(log n) bit.",
  "uso_esame": "Le riduzioni sono transitive: per mostrare che B è NP-completo basta ridurre a B un problema già NP-completo.",
  "capitolo": "12 · Riduzioni (Cook-Levin)",
  "pagina": 34,
  "lezione": 7,
  "fonti": [
   "dispensa cap. 12, p. 34",
   "appunti Lez. 7"
  ],
  "classi": [],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "chiusura-riduzioni",
  "nome": "Chiusura delle classi rispetto alle riduzioni",
  "tipo": "proposizione",
  "enunciato": "P, NP, coNP, L, NL, PSPACE ed EXP sono chiuse rispetto alle riduzioni: se L sta nella classe e L′ si riduce a L, anche L′ sta nella classe.",
  "intuizione": "Le riduzioni lavorano in spazio logaritmico, quindi in tempo polinomiale: premetterle a un algoritmo non fa uscire dalla classe.",
  "uso_esame": "È la mossa base delle risposte \"solo se\": se un problema completo per C stesse in D (chiusa), allora C ⊆ D.",
  "capitolo": "12 · Riduzioni (Cook-Levin)",
  "pagina": 35,
  "lezione": 7,
  "fonti": [
   "dispensa cap. 12, p. 35",
   "appunti Lez. 7"
  ],
  "classi": [
   "L",
   "NL",
   "P",
   "NP",
   "coNP",
   "PSPACE",
   "EXP"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "completo-per-due-classi",
  "nome": "Proposizione (un problema completo per due classi)",
  "tipo": "proposizione",
  "enunciato": "Se C<sub>1</sub> e C<sub>2</sub> sono chiuse rispetto alle riduzioni e un linguaggio L è completo per entrambe, allora C<sub>1</sub> = C<sub>2</sub>.",
  "intuizione": "Ogni problema di C<sub>1</sub> si riduce a L, che sta in C<sub>2</sub>, quindi sta in C<sub>2</sub>; e viceversa.",
  "uso_esame": "Per esempio: un problema sia NP-completo sia coNP-completo darebbe NP = coNP.",
  "capitolo": "12 · Riduzioni (Cook-Levin)",
  "pagina": 35,
  "lezione": 7,
  "fonti": [
   "dispensa cap. 12, p. 35",
   "appunti Lez. 7"
  ],
  "classi": [
   "NP",
   "coNP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "completo-classe-piccola",
  "nome": "Corollario (classe piccola con un problema completo per la grande)",
  "tipo": "corollario",
  "enunciato": "Se C<sub>1</sub> ⊆ C<sub>2</sub>, C<sub>1</sub> è chiusa rispetto alle riduzioni e contiene un problema C<sub>2</sub>-completo, allora C<sub>1</sub> = C<sub>2</sub>.",
  "intuizione": "Tutto C<sub>2</sub> si riduce a quel problema, e la chiusura di C<sub>1</sub> porta tutto dentro C<sub>1</sub>.",
  "uso_esame": "Per esempio: un problema NP-completo sta in P solo se P = NP; QSAT sta in NP solo se NP = PSPACE.",
  "capitolo": "12 · Riduzioni (Cook-Levin)",
  "pagina": 36,
  "lezione": 7,
  "fonti": [
   "dispensa cap. 12, p. 36",
   "appunti Lez. 7"
  ],
  "classi": [
   "P",
   "NP",
   "PSPACE"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "cook-levin",
  "nome": "Teorema di Cook-Levin",
  "tipo": "teorema",
  "enunciato": "SAT è NP-completo.",
  "intuizione": "Una computazione nondeterministica polinomiale si descrive con una tabella p(n)×p(n), e la tabella si scrive come una formula in CNF che è soddisfacibile se e solo se esiste una computazione che accetta.",
  "uso_esame": "È il primo problema NP-completo: tutte le altre prove di NP-completezza partono da SAT con catene di riduzioni.",
  "capitolo": "12 · Riduzioni (Cook-Levin)",
  "pagina": 36,
  "lezione": 7,
  "fonti": [
   "dispensa cap. 12, p. 36",
   "appunti Lez. 7"
  ],
  "classi": [
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "La dispensa dà anche la versione con i circuiti (ogni L ∈ NP si riduce a CIRCUIT SAT, che si riduce a SAT); il riepilogo del cap. 22 elenca anche CIRCUIT SAT come NP-completo.",
  "correzione": "Nella dispensa (p. 37) la clausola che vieta le mosse fuori da Δ è scritta come congiunzione: deve essere una disgiunzione. Mancano anche la clausola che obbliga la testina a spostarsi di al più una cella per passo e la convenzione che, arrivata in \"yes\", la macchina resti ferma fino al passo T."
 },
 {
  "id": "3sat",
  "nome": "3-SAT è NP-completo",
  "tipo": "teorema",
  "enunciato": "3-SAT (SAT con clausole di 3 letterali) è NP-completo.",
  "intuizione": "Si riduce SAT a 3-SAT, spezzando le clausole lunghe con variabili nuove.",
  "uso_esame": "È il punto di partenza più comodo per le riduzioni ai problemi su grafi e insiemi.",
  "capitolo": "12 · Riduzioni (Cook-Levin)",
  "pagina": 39,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 12, p. 39",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "La dispensa dice solo che si riduce SAT a 3-SAT; la tecnica di spezzare le clausole è descritta negli appunti.",
  "correzione": ""
 },
 {
  "id": "2sat-p",
  "nome": "2-SAT ∈ P",
  "tipo": "proposizione",
  "enunciato": "2-SAT (SAT con clausole di 2 letterali) si risolve in tempo polinomiale.",
  "intuizione": "Si riduce alla ricerca di cicli in un grafo di dimensione lineare: con due letterali per clausola le scelte sono obbligate.",
  "uso_esame": "Contrasto classico con 3-SAT; per esempio la riduzione da 2-SAT a CLIQUE esiste perché 2-SAT ∈ P e CLIQUE è NP-completo.",
  "capitolo": "12 · Riduzioni (Cook-Levin)",
  "pagina": 39,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 12, p. 39",
   "dispensa cap. 13, p. 51 (esercizio 2)",
   "appunti Lez. 8"
  ],
  "classi": [
   "P"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "horn-sat",
  "nome": "HORN-SAT in tempo lineare",
  "tipo": "proposizione",
  "enunciato": "Una formula di Horn (clausole con al più un letterale positivo) è soddisfacibile se e solo se ha un'assegnazione che la soddisfa calcolabile in tempo lineare; quindi HORN-SAT ∈ P.",
  "intuizione": "Si rendono veri solo i letterali obbligati dalle clausole.",
  "uso_esame": "Altro caso di SAT ristretto che diventa facile.",
  "capitolo": "12 · Riduzioni (Cook-Levin)",
  "pagina": 39,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 12, p. 39",
   "appunti Lez. 8"
  ],
  "classi": [
   "P"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "prop-9-1",
  "nome": "Proposizione 9.1 (certificati succinti)",
  "tipo": "proposizione",
  "enunciato": "L ∈ NP se e solo se esiste una relazione R decidibile in tempo polinomiale e polinomialmente bilanciata (|y| ≤ |x|<sup>k</sup>) tale che L = {x : (x, y) ∈ R per qualche y}.",
  "intuizione": "Il certificato y è la registrazione di una computazione che accetta: è corto e si controlla in tempo polinomiale.",
  "uso_esame": "Serve a dimostrare che un problema sta in NP (\"indovina e verifica\") e a scrivere un certificato succinto negli esercizi.",
  "capitolo": "13 · Problemi in NP",
  "pagina": 40,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 40",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "max2sat",
  "nome": "MAX2SAT è NP-completo",
  "tipo": "teorema",
  "enunciato": "Dato un insieme di clausole con 2 letterali e un intero K, decidere se si possono soddisfare almeno K clausole è NP-completo.",
  "intuizione": "Ogni clausola di 3SAT diventa un gruppo di 10 clausole di 2 letterali: se ne soddisfano al più 7, e 7 esattamente quando la clausola originale è vera (obiettivo K = 7m).",
  "uso_esame": "Mostra che 2-SAT è facile ma la sua versione di massimizzazione è difficile.",
  "capitolo": "13 · Problemi in NP",
  "pagina": 41,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 41",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "independent-set",
  "nome": "INDEPENDENT SET è NP-completo",
  "tipo": "teorema",
  "enunciato": "Dato un grafo G e un intero K, decidere se G ha un insieme indipendente di K nodi è NP-completo.",
  "intuizione": "Riduzione da 3SAT: un triangolo per ogni clausola e un arco tra letterali opposti; un insieme indipendente di m nodi sceglie un letterale vero per clausola.",
  "uso_esame": "È il punto di partenza per CLIQUE e NODE COVER.",
  "capitolo": "13 · Problemi in NP",
  "pagina": 42,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 42",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "clique-nodecover",
  "nome": "Corollario: CLIQUE e NODE COVER sono NP-completi",
  "tipo": "corollario",
  "enunciato": "CLIQUE e NODE COVER sono NP-completi.",
  "intuizione": "Una cricca di G è un insieme indipendente del grafo complementare; I è indipendente se e solo se V − I è una copertura dei nodi.",
  "uso_esame": "CLIQUE è il problema NP-completo più usato negli esercizi sulle riduzioni.",
  "capitolo": "13 · Problemi in NP",
  "pagina": 44,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 44",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "hamilton-path",
  "nome": "HAMILTON PATH è NP-completo",
  "tipo": "teorema",
  "enunciato": "Decidere se un grafo ha un cammino che passa per ogni nodo esattamente una volta è NP-completo.",
  "intuizione": "Sta in NP perché un cammino proposto si controlla in tempo lineare; la difficoltà si mostra riducendo 3SAT.",
  "uso_esame": "Problema NP-completo ricorrente; il suo complemento è coNP-completo.",
  "capitolo": "13 · Problemi in NP",
  "pagina": 44,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 44",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "La dispensa mostra solo l'appartenenza a NP; per la difficoltà dice soltanto \"si riduce 3SAT\".",
  "correzione": "Il riquadro della dispensa definisce il problema come un cammino che visita ogni nodo una volta \"e termina nel nodo di partenza\": questa è la definizione di ciclo hamiltoniano. Il cammino hamiltoniano non deve tornare all'inizio, come nella riduzione HAMILTON PATH → SAT del cap. 12."
 },
 {
  "id": "tsp-d",
  "nome": "TSP(D) è NP-completo",
  "tipo": "teorema",
  "enunciato": "Data una matrice delle distanze tra n città e un budget B, decidere se esiste un giro di tutte le città di costo al più B è NP-completo.",
  "intuizione": "Ogni nodo del grafo diventa una città, a distanza 1 se c'è l'arco e 2 se non c'è: un giro di costo n esiste se e solo se il grafo ha un ciclo hamiltoniano.",
  "uso_esame": "Problema NP-completo ricorrente; servono solo distanze 1 e 2, quindi è NP-completo in senso forte.",
  "capitolo": "13 · Problemi in NP",
  "pagina": 44,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 44",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": "La dispensa scrive \"we can reduce TSP(D) to HAMILTON PATH\", ma la riduzione descritta va nel verso opposto (dal problema sul grafo verso TSP(D)). Inoltre parte da HAMILTON PATH ma chiede un ciclo di lunghezza n: la versione corretta parte da HAMILTON CYCLE con B = n."
 },
 {
  "id": "3-coloring",
  "nome": "3-COLORING è NP-completo (2-COLORING ∈ P)",
  "tipo": "teorema",
  "enunciato": "Decidere se un grafo si colora con 3 colori senza nodi adiacenti dello stesso colore è NP-completo; con 2 colori il problema è in P.",
  "intuizione": "Riduzione da 3SAT con due gadget: uno codifica il valore vero/falso dei letterali, l'altro l'OR di una clausola.",
  "uso_esame": "Esempio classico del salto da 2 a 3: 2-COLORING in P, 3-COLORING NP-completo.",
  "capitolo": "13 · Problemi in NP",
  "pagina": 44,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 44",
   "appunti Lez. 8"
  ],
  "classi": [
   "P",
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "Che 2-COLORING sia in P è solo affermato, senza prova.",
  "correzione": ""
 },
 {
  "id": "tripartite-matching",
  "nome": "TRIPARTITE MATCHING è NP-completo",
  "tipo": "teorema",
  "enunciato": "Dati tre insiemi B, G, H di n elementi e una relazione T ⊆ B × G × H, decidere se esistono n terne di T senza componenti in comune è NP-completo.",
  "intuizione": "Con le coppie (matching bipartito) il problema è facile; con le terne diventa difficile.",
  "uso_esame": "È il punto di partenza per i problemi su insiemi.",
  "capitolo": "13 · Problemi in NP",
  "pagina": 47,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 47",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "set-problems",
  "nome": "Corollario: EXACT COVER BY 3-SETS, SET COVERING e SET PACKING sono NP-completi",
  "tipo": "corollario",
  "enunciato": "EXACT COVER BY 3-SETS, SET COVERING e SET PACKING sono NP-completi.",
  "intuizione": "Sono tutti generalizzazioni di TRIPARTITE MATCHING: se un caso particolare è difficile, lo è anche il problema generale.",
  "uso_esame": "",
  "capitolo": "13 · Problemi in NP",
  "pagina": 47,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 47",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "integer-programming",
  "nome": "INTEGER PROGRAMMING è NP-completo",
  "tipo": "proposizione",
  "enunciato": "Decidere se un sistema di disuguaglianze lineari a coefficienti interi ha una soluzione intera è NP-completo; senza il vincolo di interi (LINEAR PROGRAMMING) il problema è in P.",
  "intuizione": "Tutti i problemi visti si scrivono come disuguaglianze lineari sugli interi (per esempio SET COVERING); la parte difficile è dimostrare che il problema sta in NP.",
  "uso_esame": "",
  "capitolo": "13 · Problemi in NP",
  "pagina": 47,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 47",
   "appunti Lez. 8"
  ],
  "classi": [
   "P",
   "NP"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "La dispensa mostra solo la difficoltà; l'appartenenza a NP è rimandata alle note del libro.",
  "correzione": "Nella dispensa (p. 47) i vettori di bit degli insiemi sono le righe della matrice A. Perché Ax ≥ 1 dica che ogni elemento di U è coperto devono essere le colonne: una riga per elemento, una colonna per insieme."
 },
 {
  "id": "knapsack",
  "nome": "KNAPSACK è NP-completo",
  "tipo": "teorema",
  "enunciato": "Dati n oggetti con peso e valore interi, un limite di peso W e un obiettivo K, decidere se si possono scegliere oggetti di peso totale ≤ W e valore ≥ K è NP-completo.",
  "intuizione": "Riduzione da EXACT COVER BY 3-SETS: ogni insieme diventa un numero scritto in base n+1, così le somme non hanno riporti; servono però numeri esponenzialmente grandi.",
  "uso_esame": "È l'unico NP-completo del capitolo che non lo è in senso forte.",
  "capitolo": "13 · Problemi in NP",
  "pagina": 48,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 48",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "knapsack-pseudopoly",
  "nome": "Proposizione (KNAPSACK in tempo O(nW))",
  "tipo": "proposizione",
  "enunciato": "Ogni istanza di KNAPSACK si risolve in tempo O(nW), dove n è il numero di oggetti e W il limite di peso.",
  "intuizione": "Programmazione dinamica su una tabella n × W; ma W può essere esponenziale nella lunghezza dell'input (circa n log W), quindi l'algoritmo è solo pseudopolinomiale.",
  "uso_esame": "Non dimostra P = NP: il tempo è polinomiale nel valore dei numeri, non nella loro lunghezza.",
  "capitolo": "13 · Problemi in NP",
  "pagina": 49,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 49",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "strong-np",
  "nome": "NP-completezza in senso forte",
  "tipo": "proposizione",
  "enunciato": "Un problema che resta NP-completo anche quando i numeri nell'input hanno valore polinomiale (strongly NP-complete) non ha algoritmi pseudopolinomiali, a meno che P = NP. Tutti gli NP-completi del capitolo lo sono in senso forte, tranne KNAPSACK.",
  "intuizione": "Se i numeri sono piccoli, un algoritmo pseudopolinomiale diventa polinomiale.",
  "uso_esame": "",
  "capitolo": "13 · Problemi in NP",
  "pagina": 50,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 13, p. 50",
   "appunti Lez. 8"
  ],
  "classi": [
   "P",
   "NP"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "validity-conp",
  "nome": "VALIDITY è coNP-completo",
  "tipo": "teorema",
  "enunciato": "VALIDITY (la formula è vera per ogni assegnazione?) è coNP-completo; lo è anche HAMILTON PATH COMPLEMENT (il grafo non ha cammini hamiltoniani?).",
  "intuizione": "Se L ∈ coNP, il suo complemento si riduce a SAT con una R; allora R′(x) = ¬R(x) riduce L a VALIDITY.",
  "uso_esame": "È il coNP-completo di riferimento: per esempio una riduzione da SAT a VALIDITY esiste solo se NP = coNP.",
  "capitolo": "14 · coNP",
  "pagina": 53,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 14, p. 53",
   "appunti Lez. 8"
  ],
  "classi": [
   "coNP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "prop-a",
  "nome": "Proposizione A (riduzioni e complementi)",
  "tipo": "proposizione",
  "enunciato": "Se R è una riduzione da L a L′, allora R è anche una riduzione dal complemento di L al complemento di L′.",
  "intuizione": "x ∈ L ⇔ R(x) ∈ L′ equivale a x ∉ L ⇔ R(x) ∉ L′.",
  "uso_esame": "Strumento per dimostrare le Proposizioni B, C e D.",
  "capitolo": "14 · coNP",
  "pagina": 53,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 14, p. 53",
   "appunti Lez. 8"
  ],
  "classi": [],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "prop-b",
  "nome": "Proposizione B (complemento di un NP-completo)",
  "tipo": "proposizione",
  "enunciato": "Se L è NP-completo, allora il suo complemento è coNP-completo (e viceversa).",
  "intuizione": "Per la Proposizione A le stesse riduzioni funzionano sui complementi.",
  "uso_esame": "Dà subito problemi coNP-completi: UNSAT, HAMILTON PATH COMPLEMENT, il complemento di TSP(D) e così via.",
  "capitolo": "14 · coNP",
  "pagina": 54,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 14, p. 54",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP",
   "coNP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "prop-c",
  "nome": "Proposizione C (chiusura dei complementi)",
  "tipo": "proposizione",
  "enunciato": "Se una classe C è chiusa rispetto alle riduzioni, anche coC lo è.",
  "intuizione": "Si applica la chiusura di C ai complementi, usando la Proposizione A.",
  "uso_esame": "Per esempio coNP è chiusa rispetto alle riduzioni perché lo è NP.",
  "capitolo": "14 · coNP",
  "pagina": 54,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 14, p. 54",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP",
   "coNP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "prop-d",
  "nome": "Proposizione D (un C-completo in coC)",
  "tipo": "proposizione",
  "enunciato": "Se C è chiusa rispetto alle riduzioni e un problema C-completo sta in coC, allora C = coC.",
  "intuizione": "Tutto C si riduce a quel problema, che sta in coC, chiusa per la Proposizione C: quindi C ⊆ coC, e per simmetria coC ⊆ C.",
  "uso_esame": "Se un problema NP-completo stesse in coNP (o un coNP-completo in NP), allora NP = coNP.",
  "capitolo": "14 · coNP",
  "pagina": 54,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 14, p. 54",
   "appunti Lez. 8"
  ],
  "classi": [
   "NP",
   "coNP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": "La prova della dispensa (p. 54) applica la Proposizione B, enunciata solo per NP, a una classe C qualsiasi. Il passo si ottiene direttamente dalle Proposizioni A e C, come nella dimostrazione qui sotto."
 },
 {
  "id": "p-np-conp",
  "nome": "Se P = NP allora NP = coNP",
  "tipo": "proposizione",
  "enunciato": "Se P = NP, allora anche NP = coNP.",
  "intuizione": "P è chiusa per complemento: NP = P = coP = coNP.",
  "uso_esame": "Le risposte \"solo se P = NP\" portano con sé anche NP = coNP; il viceversa non è noto.",
  "capitolo": "14 · coNP",
  "pagina": 54,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 14, p. 54",
   "appunti Lez. 4"
  ],
  "classi": [
   "P",
   "NP",
   "coNP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "p-in-np-conp",
  "nome": "Proposizione P ⊆ NP ∩ coNP",
  "tipo": "proposizione",
  "enunciato": "P ⊆ NP ∩ coNP.",
  "intuizione": "Se L ∈ P anche il suo complemento è in P ⊆ NP, quindi L ∈ coNP; e L ∈ P ⊆ NP.",
  "uso_esame": "Un problema in P ha sia certificati succinti sia squalifiche succinte; esistono problemi in NP ∩ coNP non noti in P.",
  "capitolo": "14 · coNP",
  "pagina": 55,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 14, p. 55",
   "appunti Lez. 8"
  ],
  "classi": [
   "P",
   "NPcapcoNP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "exact-tsp-np-hard",
  "nome": "EXACT TSP è NP-hard (varianti di TSP)",
  "tipo": "proposizione",
  "enunciato": "Le quattro varianti TSP(D), EXACT TSP, TSP COST e TSP si riducono ciascuna alla successiva; in particolare EXACT TSP è NP-hard. La dispensa lo mostra riducendo HAMILTON PATH a EXACT TSP (il grafo ha un cammino hamiltoniano se e solo se il giro ottimo ha lunghezza esattamente n + 1).",
  "intuizione": "Chi sa trovare il giro ottimo sa anche dire quanto costa, e quindi se costa esattamente B o al più B.",
  "uso_esame": "EXACT TSP non sembra stare né in NP né in coNP: è il problema che motiva la classe DP.",
  "capitolo": "15 · Problemi di ottimizzazione (DP)",
  "pagina": 58,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 15, p. 58",
   "slide Lez. 9"
  ],
  "classi": [
   "NP",
   "DP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": "La riduzione così come è scritta non è corretta. La versione corretta parte da HAMILTON CYCLE con B = n (distanza 1 sugli archi del grafo e 2 altrove): il grafo ha un ciclo hamiltoniano se e solo se il giro ottimo costa esattamente n. Anche le slide della Lez. 9 scrivono \"stessa riduzione da HAMILTON PATH\" con B = n."
 },
 {
  "id": "sat-unsat-dp",
  "nome": "SAT-UNSAT è DP-completo",
  "tipo": "teorema",
  "enunciato": "Date due formule φ e φ′ in CNF con 3 letterali per clausola, decidere se φ è soddisfacibile e φ′ no è DP-completo.",
  "intuizione": "Sta in DP perché è l'intersezione di un problema NP (φ soddisfacibile) e di uno coNP (φ′ insoddisfacibile); per la difficoltà, se L = L<sub>1</sub> ∩ L<sub>2</sub> si usa R(x) = (R<sub>1</sub>(x), R<sub>2</sub>(x)) con le riduzioni a SAT.",
  "uso_esame": "È il DP-completo di riferimento: per esempio SAT-UNSAT si riduce a QSAT<sub>3</sub> perché DP ⊆ Δ<sub>2</sub><sup>P</sup> ⊆ Σ<sub>2</sub><sup>P</sup> ⊆ Σ<sub>3</sub><sup>P</sup>.",
  "capitolo": "15 · Problemi di ottimizzazione (DP)",
  "pagina": 59,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 15, p. 59",
   "slide Lez. 9"
  ],
  "classi": [
   "DP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "altri-dp-completi",
  "nome": "Altri problemi DP-completi",
  "tipo": "proposizione",
  "enunciato": "Sono DP-completi anche EXACT TSP (la difficoltà si ottiene riducendo SAT-UNSAT), CRITICAL SAT, CRITICAL HAMILTON PATH e CRITICAL 3-COLORING. UNIQUE SAT sta in DP, ma non si sa se sia DP-completo.",
  "intuizione": "Sono tutte domande \"esatte\" o \"critiche\" che combinano una parte sì (NP) e una parte no (coNP) sulla stessa istanza.",
  "uso_esame": "",
  "capitolo": "15 · Problemi di ottimizzazione (DP)",
  "pagina": 60,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 15, p. 60",
   "slide Lez. 9"
  ],
  "classi": [
   "DP"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "pl-psat",
  "nome": "Proposizione (oracoli NP-completi equivalenti)",
  "tipo": "proposizione",
  "enunciato": "Per ogni linguaggio L NP-completo, P<sup>L</sup> = P<sup>SAT</sup>.",
  "intuizione": "Ogni domanda all'oracolo L si traduce con una riduzione in una domanda a SAT, e viceversa, con costo polinomiale.",
  "uso_esame": "Per questo si scrive P<sup>NP</sup>, NP<sup>NP</sup>, EXP<sup>NP</sup> invece di P<sup>SAT</sup>, NP<sup>TSP(D)</sup>, EXP<sup>CLIQUE</sup>.",
  "capitolo": "16 · Macchine con oracolo",
  "pagina": 63,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 16, p. 63",
   "slide Lez. 9"
  ],
  "classi": [
   "DELTA2"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "cd-cocd",
  "nome": "Proposizione C<sup>D</sup> = C<sup>coD</sup>",
  "tipo": "proposizione",
  "enunciato": "Per ogni classe C e ogni classe di oracoli D: C<sup>D</sup> = C<sup>coD</sup>.",
  "intuizione": "Basta scambiare gli stati q<sub>YES</sub> e q<sub>NO</sub>: l'oracolo è una scatola nera che risponde in un passo.",
  "uso_esame": "Per questo non si scrivono P<sup>coNP</sup> o NP<sup>coNP</sup>: per esempio NP<sup>coNP</sup> = NP<sup>NP</sup> = Σ<sub>2</sub><sup>P</sup>.",
  "capitolo": "16 · Macchine con oracolo",
  "pagina": 63,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 16, p. 63",
   "slide Lez. 9"
  ],
  "classi": [
   "DELTA2",
   "SIGMA2"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "oracoli-inutili",
  "nome": "Oracoli inutili e DP ⊆ P<sup>NP</sup>",
  "tipo": "proposizione",
  "enunciato": "P<sup>P</sup> = P e NP<sup>P</sup> = NP; inoltre DP ⊆ P<sup>NP</sup>. Non si sa se NP<sup>NP</sup> = NP.",
  "intuizione": "Un oracolo in P si esegue \"in linea\" con costo polinomiale; una domanda NP e una coNP si risolvono con due chiamate a un oracolo NP.",
  "uso_esame": "Colloca DP dentro Δ<sub>2</sub><sup>P</sup> = P<sup>NP</sup>, per esempio per le riduzioni da SAT-UNSAT verso i livelli più alti di PH.",
  "capitolo": "16 · Macchine con oracolo",
  "pagina": 63,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 16, p. 63",
   "slide Lez. 9"
  ],
  "classi": [
   "P",
   "NP",
   "DP",
   "DELTA2"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "t17-8",
  "nome": "Teorema 17.8 (certificati per Σ<sub>i</sub><sup>P</sup>)",
  "tipo": "teorema",
  "enunciato": "Per ogni i ≥ 1, L ∈ Σ<sub>i</sub><sup>P</sup> se e solo se esiste una relazione R polinomialmente bilanciata, con {x;y : (x, y) ∈ R} in Π<sub>i−1</sub><sup>P</sup>, tale che L = {x : esiste y con (x, y) ∈ R}.",
  "intuizione": "Ogni livello aggiunge un \"esiste\" davanti a un controllo del livello di sotto; per i = 1 è la Proposizione 9.1 su NP.",
  "uso_esame": "È la base della prova del collasso (Teorema 17.9) e dell'appartenenza di QSAT<sub>i</sub> a Σ<sub>i</sub><sup>P</sup>.",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 64,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 64",
   "slide Lez. 9"
  ],
  "classi": [
   "SIGMAi",
   "PIi"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "La dispensa omette la prova; le slide della Lez. 9 la danno per induzione su i.",
  "correzione": ""
 },
 {
  "id": "t17-8-cor1",
  "nome": "Corollario 1 del Teorema 17.8 (certificati per Π<sub>i</sub><sup>P</sup>)",
  "tipo": "corollario",
  "enunciato": "Per ogni i ≥ 1, L ∈ Π<sub>i</sub><sup>P</sup> se e solo se esiste una relazione R polinomialmente bilanciata, con {x;y : (x, y) ∈ R} in Σ<sub>i−1</sub><sup>P</sup>, tale che L = {x : per ogni y con |y| ≤ |x|<sup>k</sup>, (x, y) ∈ R}.",
  "intuizione": "Π<sub>i</sub><sup>P</sup> = coΣ<sub>i</sub><sup>P</sup>: complementando, \"esiste\" diventa \"per ogni\".",
  "uso_esame": "",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 64,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 64",
   "slide Lez. 9"
  ],
  "classi": [
   "SIGMAi",
   "PIi"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "t17-8-cor2",
  "nome": "Corollario 2 del Teorema 17.8 (forma con i quantificatori)",
  "tipo": "corollario",
  "enunciato": "Per ogni i ≥ 1, L ∈ Σ<sub>i</sub><sup>P</sup> se e solo se esiste una relazione R polinomialmente bilanciata e decidibile in tempo polinomiale tale che L = {x : ∃y<sub>1</sub> ∀y<sub>2</sub> ∃y<sub>3</sub> … Qy<sub>i</sub> con (x, y<sub>1</sub>, …, y<sub>i</sub>) ∈ R}, dove Q è ∃ se i è dispari e ∀ se i è pari.",
  "intuizione": "Il livello di un problema nella gerarchia è il numero di alternanze di quantificatori davanti a un controllo polinomiale.",
  "uso_esame": "Si usa per collocare un problema in Σ<sub>i</sub><sup>P</sup> contando i quantificatori, e per mostrare che QSAT<sub>i</sub> ∈ Σ<sub>i</sub><sup>P</sup>.",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 65,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 65",
   "slide Lez. 9"
  ],
  "classi": [
   "SIGMAi",
   "PIi",
   "PH"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": "Nelle slide della Lez. 9 il corollario dice \"per ogni i ≤ 1\": va letto i ≥ 1."
 },
 {
  "id": "t17-9",
  "nome": "Teorema 17.9 (collasso di PH)",
  "tipo": "teorema",
  "enunciato": "Se per qualche i ≥ 1 vale Σ<sub>i</sub><sup>P</sup> = Π<sub>i</sub><sup>P</sup>, allora per ogni j > i: Σ<sub>j</sub><sup>P</sup> = Π<sub>j</sub><sup>P</sup> = Δ<sub>j</sub><sup>P</sup> = Σ<sub>i</sub><sup>P</sup>, cioè la gerarchia polinomiale collassa al livello i.",
  "intuizione": "Basta mostrare Σ<sub>i+1</sub><sup>P</sup> = Σ<sub>i</sub><sup>P</sup>: due \"esiste\" consecutivi si fondono in uno solo, poi si ripete salendo.",
  "uso_esame": "È lo strumento delle risposte \"solo se PH collassa\": per esempio una riduzione da QSAT<sub>i</sub> al suo complemento esiste solo se PH collassa al livello i.",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 65,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 65",
   "slide Lez. 9"
  ],
  "classi": [
   "SIGMAi",
   "PIi",
   "PH"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "cor-collasso-primo",
  "nome": "Corollario (collasso al primo livello)",
  "tipo": "corollario",
  "enunciato": "Se P = NP, o anche solo NP = coNP, la gerarchia polinomiale collassa al primo livello.",
  "intuizione": "È il Teorema 17.9 con i = 1.",
  "uso_esame": "Senza una prova di P ≠ NP non si può dimostrare che PH sia davvero una gerarchia; serve per le risposte \"solo se NP = coNP\".",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 66,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 66",
   "slide Lez. 9"
  ],
  "classi": [
   "P",
   "NP",
   "coNP",
   "PH"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "circ",
  "nome": "Teorema (CIRC SAT e CIRC VALIDITY)",
  "tipo": "teorema",
  "enunciato": "Nella logica della Circumscription, decidere se un modello di KB soddisfa φ (CIRC SAT) è Σ<sub>2</sub><sup>P</sup>-completo; decidere se KB ⊨<sub>M</sub> φ (CIRC VALIDITY) è Π<sub>2</sub><sup>P</sup>-completo.",
  "intuizione": "È SAT più una minimizzazione degli \"anormali\": esiste un modello tale che nessun altro modello è più normale, cioè ∃∀, secondo livello.",
  "uso_esame": "Esempio di problema completo al 2° livello: CLIQUE si riduce a CIRC SAT, mentre il contrario farebbe collassare PH al primo livello.",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 69,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, pp. 69–70",
   "slide Lez. 9"
  ],
  "classi": [
   "SIGMA2",
   "PI2"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "La dispensa omette la prova (riduzione da QSAT<sub>2</sub>); le slide della Lez. 9 la svolgono per CIRC SAT.",
  "correzione": ""
 },
 {
  "id": "t17-10",
  "nome": "Teorema 17.10 (QSAT<sub>i</sub> è Σ<sub>i</sub><sup>P</sup>-completo)",
  "tipo": "teorema",
  "enunciato": "Decidere se è vera una QBF ∃X<sub>1</sub> ∀X<sub>2</sub> ∃X<sub>3</sub> … QX<sub>i</sub> φ con i blocchi alternati di quantificatori (QSAT<sub>i</sub>) è Σ<sub>i</sub><sup>P</sup>-completo; il suo complemento è Π<sub>i</sub><sup>P</sup>-completo.",
  "intuizione": "Il numero di alternanze di quantificatori coincide con il livello della gerarchia; la difficoltà si mostra come nel Teorema di Cook.",
  "uso_esame": "Dà un problema completo per ogni livello: QSAT<sub>2</sub> → QSAT<sub>4</sub> sì; QSAT<sub>4</sub> → QSAT<sub>2</sub> solo se PH collassa al 2° livello.",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 70,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 70",
   "slide Lez. 9"
  ],
  "classi": [
   "SIGMAi",
   "PIi"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "La dispensa lo chiama solo \"Theorem\" e omette la prova; il numero 17.10 e la prova vengono dalle slide della Lez. 9. Il riepilogo del cap. 22 elenca anche il complemento di QSAT<sub>i</sub> come Π<sub>i</sub><sup>P</sup>-completo (la barra del complemento si perde nell'estrazione del testo).",
  "correzione": "Nelle slide della Lez. 9, \"espressione booleana φ in tempo O(log n)\" va letto spazio O(log n): la riduzione è in spazio logaritmico."
 },
 {
  "id": "strategic-companies",
  "nome": "STRATEGIC COMPANIES è Σ<sub>2</sub><sup>P</sup>-completo",
  "tipo": "teorema",
  "enunciato": "Una società è strategica se appartiene ad almeno un gruppo che produce tutte le merci, include le società controllate dalle società scelte e non può essere ridotto mantenendo queste condizioni. Decidere se una società è strategica è Σ<sub>2</sub><sup>P</sup>-completo; il suo complemento è Π<sub>2</sub><sup>P</sup>-completo.",
  "intuizione": "\"Esiste un insieme C′ che contiene la società e tale che nessun suo sottoinsieme proprio va bene\": un ∃ seguito da un ∀, come QSAT<sub>2</sub>.",
  "uso_esame": "Altro problema completo al 2° livello negli esercizi di riduzione (per esempio CLIQUE si riduce al complemento di STRATEGIC COMPANIES perché Σ<sub>1</sub><sup>P</sup> ⊆ Π<sub>2</sub><sup>P</sup>).",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 70,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 70",
   "dispensa cap. 22, p. 85",
   "slide Lez. 9"
  ],
  "classi": [
   "SIGMA2",
   "PI2"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "La dispensa omette la prova (riduzione da QSAT<sub>2</sub>); le slide della Lez. 9 la svolgono. Nell'esercizio 3 del cap. 17 e nel riepilogo del cap. 22 la versione Π<sub>2</sub><sup>P</sup>-completa è il complemento (barra persa nell'estrazione del testo).",
  "correzione": ""
 },
 {
  "id": "t17-11",
  "nome": "Teorema 17.11 (niente problemi PH-completi)",
  "tipo": "teorema",
  "enunciato": "Se esistesse un problema PH-completo, la gerarchia polinomiale collasserebbe a un livello finito.",
  "intuizione": "Un problema PH-completo starebbe in qualche Σ<sub>i</sub><sup>P</sup>; tutto Σ<sub>i+1</sub><sup>P</sup> si ridurrebbe a lui e, poiché ogni livello è chiuso rispetto alle riduzioni, Σ<sub>i+1</sub><sup>P</sup> = Σ<sub>i</sub><sup>P</sup>.",
  "uso_esame": "Serve per le risposte \"solo se PH collassa\" sui problemi completi per tutta PH.",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 70,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 70",
   "slide Lez. 9"
  ],
  "classi": [
   "PH",
   "SIGMAi"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "ph-pspace",
  "nome": "Proposizione 17.1 (PH ⊆ PSPACE)",
  "tipo": "proposizione",
  "enunciato": "PH ⊆ PSPACE.",
  "intuizione": "Per ogni livello si provano tutti i certificati y<sub>1</sub>, …, y<sub>i</sub> uno alla volta riusando lo spazio: sono di lunghezza polinomiale.",
  "uso_esame": "Ogni problema di PH si riduce a QSAT; non si sa se PH = PSPACE.",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 71,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 71",
   "slide Lez. 9"
  ],
  "classi": [
   "PH",
   "PSPACE"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "La dispensa la enuncia senza prova; le slide della Lez. 9 danno la prova (cenni).",
  "correzione": ""
 },
 {
  "id": "cor-ph-pspace",
  "nome": "Corollario di 17.11 (PH = PSPACE ⇒ collasso)",
  "tipo": "corollario",
  "enunciato": "Se PH = PSPACE, allora la gerarchia polinomiale collassa a un livello finito.",
  "intuizione": "PSPACE ha problemi completi (QSAT): se PH fosse uguale a PSPACE ne avrebbe anche lei, e per il Teorema 17.11 collasserebbe.",
  "uso_esame": "Per questo si pensa che PH ≠ PSPACE; per esempio QSAT si riduce a QSAT<sub>3</sub> solo se PH collassa.",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 71,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 71",
   "slide Lez. 9"
  ],
  "classi": [
   "PH",
   "PSPACE"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "qsat-pspace",
  "nome": "QSAT è PSPACE-completo",
  "tipo": "teorema",
  "enunciato": "Decidere se una QBF qualsiasi (senza limite alle alternanze di quantificatori) è vera è PSPACE-completo.",
  "intuizione": "Sta in PSPACE con una valutazione ricorsiva che riusa lo spazio; per la difficoltà si codifica la raggiungibilità sul grafo delle configurazioni con QBF piccole, come il predicato PATH di Savitch.",
  "uso_esame": "È il PSPACE-completo di riferimento: per esempio QSAT<sub>3</sub> si riduce a QSAT perché Σ<sub>3</sub><sup>P</sup> ⊆ PSPACE.",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 71,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 71",
   "slide Lez. 9"
  ],
  "classi": [
   "PSPACE"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "La dispensa omette la prova; le slide della Lez. 9 la svolgono.",
  "correzione": "Nelle slide della Lez. 9, \"O(log m) = O(log n<sup>c</sup>) = O(n)\" va letto O(log n<sup>c</sup>) = O(log n)."
 },
 {
  "id": "co-hamilton-pi2",
  "nome": "Complemento di HAMILTON PATH Π<sub>2</sub><sup>P</sup>-completo (affermazione della dispensa)",
  "tipo": "proposizione",
  "enunciato": "Nell'esercizio 3 del cap. 17 la dispensa afferma che il complemento di HAMILTON PATH è Π<sub>2</sub><sup>P</sup>-completo, e ne deduce che QSAT si riduce a esso solo se PH collassa al 2° livello.",
  "intuizione": "L'esercizio usa questa affermazione come se fosse un risultato noto.",
  "uso_esame": "Non usarla all'esame: il complemento di HAMILTON PATH va trattato come coNP-completo.",
  "capitolo": "17 · Gerarchia polinomiale",
  "pagina": 74,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 17, p. 74 (esercizio 3)"
  ],
  "classi": [
   "coNP",
   "PI2"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "",
  "correzione": "Non è dimostrato nel corso e contrasta con il resto della dispensa: il complemento di HAMILTON PATH è coNP-completo (Proposizione B, cap. 14, e riepilogo del cap. 22), quindi sta in coNP = Π<sub>1</sub><sup>P</sup>. Se fosse anche Π<sub>2</sub><sup>P</sup>-completo si avrebbe Π<sub>2</sub><sup>P</sup> = coNP, cioè un collasso di PH. Per lo stesso motivo, nell'esercizio 3 del cap. 17 (p. 74) una riduzione da QSAT al complemento di HAMILTON PATH farebbe collassare PH al primo livello, non al secondo."
 },
 {
  "id": "db-queries",
  "nome": "Teorema (complessità delle query ai database relazionali)",
  "tipo": "teorema",
  "enunciato": "Per le query booleane in algebra relazionale la combined complexity e la expression complexity sono PSPACE-complete, la data complexity è L-completa. Per le query congiuntive (senza unioni né negazioni) combined ed expression complexity sono NP-complete, la data complexity è AC<sup>0</sup>-completa.",
  "intuizione": "Se la query è fissa e varia solo il database, il problema diventa molto più facile.",
  "uso_esame": "",
  "capitolo": "18 · Query su database",
  "pagina": 75,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 18, p. 75",
   "slide Lez. 9"
  ],
  "classi": [
   "L",
   "NP",
   "PSPACE"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "Le slide precisano che questi risultati non sono nel libro di riferimento.",
  "correzione": ""
 },
 {
  "id": "geography",
  "nome": "Teorema 19.3 (GEOGRAPHY è PSPACE-completo)",
  "tipo": "teorema",
  "enunciato": "Dato un grafo, decidere se il primo giocatore ha una strategia vincente a GEOGRAPHY a partire dal nodo 1 è PSPACE-completo.",
  "intuizione": "Le mosse alternate dei due giocatori corrispondono ai quantificatori alternati ∃∀∃… di una QBF.",
  "uso_esame": "Esercizio d'esame: GEOGRAPHY si riduce a QSAT; un unico k che limiti le alternanze per tutte le istanze esisterebbe solo se PH e PSPACE collassassero a Σ<sub>k</sub><sup>P</sup>.",
  "capitolo": "19 · Giochi",
  "pagina": 76,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 19, p. 76",
   "slide Lez. 9"
  ],
  "classi": [
   "PSPACE"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "Il numero 19.3 viene dalle slide; la dispensa lo chiama solo \"Theorem\".",
  "correzione": "La definizione della dispensa (p. 76) non dice che una città non si può ripetere. La regola serve: senza di essa la partita potrebbe non finire."
 },
 {
  "id": "go",
  "nome": "Teorema 19.4 (GO è PSPACE-completo)",
  "tipo": "teorema",
  "enunciato": "Data una scacchiera n × n e una configurazione, decidere se un giocatore ha una strategia vincente a GO è PSPACE-completo.",
  "intuizione": "Come per GEOGRAPHY, le strategie di gioco corrispondono all'alternanza dei quantificatori.",
  "uso_esame": "",
  "capitolo": "19 · Giochi",
  "pagina": 77,
  "lezione": 9,
  "fonti": [
   "dispensa cap. 19, p. 77",
   "slide Lez. 9"
  ],
  "classi": [
   "PSPACE"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "Il numero 19.4 viene dalle slide (che parlano del nero); la dispensa parla del primo giocatore.",
  "correzione": ""
 },
 {
  "id": "fsat-fnp",
  "nome": "FSAT è FNP-completo",
  "tipo": "proposizione",
  "enunciato": "FSAT (trovare un'assegnazione che soddisfa una formula, oppure rispondere \"no\") è completo per FNP rispetto alle riduzioni tra function problems (coppie R, S calcolabili in spazio logaritmico).",
  "intuizione": "È la versione \"trova la soluzione\" di SAT.",
  "uso_esame": "",
  "capitolo": "20 · Crittografia e function problems",
  "pagina": 80,
  "lezione": 10,
  "fonti": [
   "dispensa cap. 20, p. 80",
   "appunti Lez. 10"
  ],
  "classi": [
   "NP"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "fsat-sat",
  "nome": "Proposizione (FSAT e SAT)",
  "tipo": "proposizione",
  "enunciato": "FSAT si risolve in tempo polinomiale se e solo se SAT si risolve in tempo polinomiale.",
  "intuizione": "Con un algoritmo per SAT si fissano le variabili una alla volta: si prova x<sub>i</sub> = vero e si chiede se la formula resta soddisfacibile.",
  "uso_esame": "Trovare una soluzione costa quanto decidere se esiste.",
  "capitolo": "20 · Crittografia e function problems",
  "pagina": 81,
  "lezione": 10,
  "fonti": [
   "dispensa cap. 20, p. 81",
   "appunti Lez. 10"
  ],
  "classi": [
   "P",
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "fp-fnp",
  "nome": "Teorema FP = FNP ⇔ P = NP",
  "tipo": "teorema",
  "enunciato": "FP = FNP se e solo se P = NP.",
  "intuizione": "Se FP = FNP, FSAT è polinomiale, quindi anche SAT e allora P = NP; se P = NP i function problems di NP e di P coincidono.",
  "uso_esame": "Le risposte \"solo se FP = FNP\" equivalgono a \"solo se P = NP\".",
  "capitolo": "20 · Crittografia e function problems",
  "pagina": 81,
  "lezione": 10,
  "fonti": [
   "dispensa cap. 20, p. 81",
   "appunti Lez. 10"
  ],
  "classi": [
   "P",
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "t20-1",
  "nome": "Teorema 20.1 (padding: P = NP ⇒ EXP = NEXP)",
  "tipo": "teorema",
  "enunciato": "Se P = NP, allora EXP = NEXP.",
  "intuizione": "Si allunga ogni input x fino a lunghezza 2<sup>|x|<sup>k</sup></sup> con simboli di riempimento: il tempo esponenziale diventa polinomiale nella nuova lunghezza, si usa P = NP e poi si torna indietro.",
  "uso_esame": "Nella forma contronominale: se EXP ≠ NEXP allora P ≠ NP.",
  "capitolo": "21 · Oltre PSPACE",
  "pagina": 83,
  "lezione": 10,
  "fonti": [
   "dispensa cap. 21, p. 83",
   "appunti Lez. 10"
  ],
  "classi": [
   "P",
   "NP",
   "EXP",
   "NEXP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "",
  "correzione": "Nella dispensa (p. 83) il tempo della seconda fase è scritto O(2<sup>|x|<sup>k</sup> + l</sup>): il conto giusto è (2<sup>|x|<sup>k</sup></sup>)<sup>l</sup> = 2<sup>l·|x|<sup>k</sup></sup>. Resta esponenziale, quindi la conclusione non cambia."
 },
 {
  "id": "nexp-completi",
  "nome": "Problemi NEXP-completi",
  "tipo": "proposizione",
  "enunciato": "SUCCINCT CIRCUIT SAT e SCHÖNFINKEL-BERNAYS SAT (soddisfacibilità di formule del primo ordine senza simboli di funzione, senza uguaglianza e in forma normale prenessa) sono NEXP-completi.",
  "intuizione": "Per Schönfinkel-Bernays bastano modelli piccoli, ma i controlli da fare sono in numero esponenziale.",
  "uso_esame": "Un problema NEXP-completo non si riduce a un problema in P, perché P ⊊ EXP ⊆ NEXP.",
  "capitolo": "22 · Riepilogo della complessità dei problemi",
  "pagina": 85,
  "lezione": 10,
  "fonti": [
   "dispensa cap. 13, p. 51 (esercizio 2)",
   "dispensa cap. 22, p. 85",
   "appunti Lez. 10"
  ],
  "classi": [
   "NEXP"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "Gli appunti precisano il prefisso dei quantificatori (∃…∃∀…∀) del frammento di Schönfinkel-Bernays, che la dispensa non indica.",
  "correzione": ""
 },
 {
  "id": "fo-indecidibile",
  "nome": "Indecidibilità del primo ordine",
  "tipo": "proposizione",
  "enunciato": "La validità delle formule del primo ordine sta in RE ma non in R; la soddisfacibilità del primo ordine sta in coRE ma non in R.",
  "intuizione": "Si possono elencare tutte le dimostrazioni e prima o poi si trova quella di una formula valida, ma nessun algoritmo si ferma sempre; la soddisfacibilità è il complemento della validità (φ soddisfacibile ⇔ ¬φ non valida).",
  "uso_esame": "Sono i problemi indecidibili in cima alla scala, sopra ogni classe di complessità del corso.",
  "capitolo": "22 · Riepilogo della complessità dei problemi",
  "pagina": 85,
  "lezione": 10,
  "fonti": [
   "dispensa cap. 22, p. 85",
   "appunti Lez. 10"
  ],
  "classi": [
   "R",
   "RE",
   "coRE"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "La dispensa lo riporta solo nel riepilogo del cap. 22. Il collegamento con il teorema di completezza di Gödel (validità in RE) e il nome \"teorema di Church-Turing\" (validità non in R) vengono dagli appunti della Lez. 10.",
  "correzione": ""
 },
 {
  "id": "2sat-p-completo",
  "nome": "2-SAT è P-completo (affermazione della dispensa)",
  "tipo": "proposizione",
  "enunciato": "Il riepilogo del cap. 22 e l'esercizio 1 del cap. 14 affermano che 2-SAT è P-completo (per esempio per dire che PRIMES si riduce a 2-SAT).",
  "intuizione": "La dispensa lo usa negli esercizi senza prova.",
  "uso_esame": "Non usarla all'esame: di 2-SAT si può dire solo che sta in P.",
  "capitolo": "22 · Riepilogo della complessità dei problemi",
  "pagina": 84,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 22, p. 84",
   "dispensa cap. 14, p. 55 (esercizio 1)"
  ],
  "classi": [
   "P",
   "NL"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "",
  "correzione": "Non è dimostrato: 2-SAT sta in NL (è NL-completo), quindi è P-completo se e solo se P = NL, che è una questione aperta. Una riduzione da un problema qualsiasi di P (come PRIMES) a 2-SAT non è garantita."
 },
 {
  "id": "riepilogo-p",
  "nome": "PRIMES ∈ P e MAX-FLOW P-completo (riepilogo)",
  "tipo": "proposizione",
  "enunciato": "Il riepilogo della dispensa elenca PRIMES ∈ P e MAX-FLOW P-completo.",
  "intuizione": "Sono fatti citati senza prova e usati negli esercizi sulle riduzioni.",
  "uso_esame": "Per esempio: da MAX FLOW a 3-COLORING la riduzione esiste (MAX FLOW ∈ P, 3-COLORING NP-completo); da 3-COLORING a MAX FLOW solo se P = NP.",
  "capitolo": "22 · Riepilogo della complessità dei problemi",
  "pagina": 84,
  "lezione": 8,
  "fonti": [
   "dispensa cap. 22, p. 84",
   "dispensa cap. 13, p. 51 (esercizio 2)",
   "dispensa cap. 14, pp. 55–57 (esercizi)"
  ],
  "classi": [
   "P"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "",
  "correzione": ""
 },
 {
  "id": "np-pp",
  "nome": "Teorema 11.3 (NP ⊆ PP)",
  "tipo": "teorema",
  "enunciato": "NP ⊆ PP, dove PP è la classe dei problemi decisi in tempo polinomiale da MdT che accettano a maggioranza dei run.",
  "intuizione": "Si trasforma la macchina nondeterministica per L in una che accetta a maggioranza e risponde come lei.",
  "uso_esame": "Si pensa che il contrario non valga.",
  "capitolo": "Extra · Algoritmi probabilistici e quantistici (Lez. 6, solo slide)",
  "pagina": null,
  "lezione": 6,
  "fonti": [
   "slide Lez. 6"
  ],
  "classi": [
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "Solo nelle slide della Lez. 6 (algoritmi probabilistici), non nella dispensa. PP non è tra le classi della mappa: si indica la classe collegata.",
  "correzione": ""
 },
 {
  "id": "pp-pspace",
  "nome": "Teorema (PP ⊆ PSPACE)",
  "tipo": "teorema",
  "enunciato": "PP ⊆ PSPACE.",
  "intuizione": "Una macchina deterministica esegue uno alla volta tutti i 2<sup>n<sup>c</sup></sup> run, riusando lo spazio, e conta i \"yes\" e i \"no\" con contatori di n<sup>c</sup> bit.",
  "uso_esame": "Insieme agli altri risultati dà BQP ⊆ PSPACE.",
  "capitolo": "Extra · Algoritmi probabilistici e quantistici (Lez. 6, solo slide)",
  "pagina": null,
  "lezione": 6,
  "fonti": [
   "slide Lez. 6"
  ],
  "classi": [
   "PSPACE"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "Solo nelle slide della Lez. 6, non nella dispensa.",
  "correzione": ""
 },
 {
  "id": "bpp-inclusioni",
  "nome": "Proposizioni P ⊆ BPP e BPP ⊆ PP",
  "tipo": "proposizione",
  "enunciato": "P ⊆ BPP e BPP ⊆ PP.",
  "intuizione": "Una MdT deterministica ha un solo run, quindi la risposta giusta ha il 100% dei voti; la maggioranza qualificata di BPP è in particolare una maggioranza semplice.",
  "uso_esame": "",
  "capitolo": "Extra · Algoritmi probabilistici e quantistici (Lez. 6, solo slide)",
  "pagina": null,
  "lezione": 6,
  "fonti": [
   "slide Lez. 6"
  ],
  "classi": [
   "P"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "Solo nelle slide della Lez. 6, non nella dispensa. BPP e PP non sono tra le classi della mappa.",
  "correzione": ""
 },
 {
  "id": "bpp-errore",
  "nome": "Riduzione dell'errore in BPP",
  "tipo": "proposizione",
  "enunciato": "In BPP la soglia 3/4 è convenzionale: con 2k + 1 ripetizioni e voto di maggioranza l'errore scende sotto qualunque ε, con k che dipende solo da ε (per esempio, partendo da 3/4, k = ⌈−8 ln ε⌉). In PP invece le ripetizioni necessarie possono essere esponenziali.",
  "intuizione": "Con una maggioranza \"chiara\" ogni ripetizione rende sempre più improbabile che vinca la risposta sbagliata.",
  "uso_esame": "Distingue BPP (errore riducibile con poche ripetizioni) da PP (nessun metodo noto in tempo polinomiale).",
  "capitolo": "Extra · Algoritmi probabilistici e quantistici (Lez. 6, solo slide)",
  "pagina": null,
  "lezione": 6,
  "fonti": [
   "slide Lez. 6",
   "appunti Lez. 11"
  ],
  "classi": [],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "Solo nelle slide della Lez. 6, non nella dispensa.",
  "correzione": ""
 },
 {
  "id": "bqp",
  "nome": "Teoremi BPP ⊆ BQP ⊆ PP",
  "tipo": "teorema",
  "enunciato": "BPP ⊆ BQP e BQP ⊆ PP; di conseguenza P ⊆ BQP e BQP ⊆ PSPACE.",
  "intuizione": "Le macchine quantistiche generalizzano le distribuzioni di probabilità di BPP, e la condizione di accettazione di PP è ancora più debole.",
  "uso_esame": "Simulare un algoritmo quantistico richiede al più spazio polinomiale; si pensa che NP ⊄ BQP.",
  "capitolo": "Extra · Algoritmi probabilistici e quantistici (Lez. 6, solo slide)",
  "pagina": null,
  "lezione": 6,
  "fonti": [
   "slide Lez. 6",
   "appunti Lez. 11"
  ],
  "classi": [
   "P",
   "PSPACE"
  ],
  "prova": "omessa",
  "esterno": false,
  "nota_fonte": "Solo nelle slide della Lez. 6, non nella dispensa. BQP non è tra le classi della mappa.",
  "correzione": ""
 },
 {
  "id": "grover-np",
  "nome": "Proposizione (algoritmo di Grover sui problemi in NP)",
  "tipo": "proposizione",
  "enunciato": "Ogni problema in NP si risolve con un algoritmo quantistico con errore limitato in tempo O(c<sup>n<sup>k</sup>/2</sup>), cioè circa la radice quadrata del tempo della ricerca esaustiva.",
  "intuizione": "Grover cerca in una lista non ordinata di m elementi in circa √m passi; si applica alla ricerca del certificato.",
  "uso_esame": "L'accelerazione è solo quadratica: non mette i problemi NP-completi in tempo polinomiale.",
  "capitolo": "Extra · Algoritmi probabilistici e quantistici (Lez. 6, solo slide)",
  "pagina": null,
  "lezione": 6,
  "fonti": [
   "slide Lez. 6"
  ],
  "classi": [
   "NP"
  ],
  "prova": "nel corso",
  "esterno": false,
  "nota_fonte": "Solo nelle slide della Lez. 6 (prova accennata per KNAPSACK), non nella dispensa.",
  "correzione": "Le slide della Lez. 6 concludono O(4<sup>n/2</sup>) per KNAPSACK. È vero, ma O(4<sup>n/2</sup>) = O(2<sup>n</sup>) è il costo della forza bruta: il conto preciso è O(n·2<sup>n/2</sup>)."
 }
];
