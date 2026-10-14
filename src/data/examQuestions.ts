/* 56 domande delle tracce già verificate negli appunti, etichettate per classe (q, a e e in HTML). */
import type { ClassId } from "./classes";
export type ExamQuestion = { q: string; a: string; e: string; c: ClassId[] };
export const EXAM_QUESTIONS: ExamQuestion[] = [
 {
  "q": "È falso che <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE ⊆ NEXP</span>? (F01)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE ⊆ EXP ⊆ NEXP</span>",
  "c": [
   "NEXP",
   "PSPACE"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">4-EXP ≠ L</span>? (F01)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">L ⊆ P ⊊ EXP ⊆ 4-EXP</span>",
  "c": [
   "EXP",
   "L"
  ]
 },
 {
  "q": "coNP non è strettamente contenuto in L? (F02)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">L ⊆ P ⊆ coNP</span>: coNP non può stare strettamente dentro L",
  "c": [
   "L",
   "coNP"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">EXP = Π<sub>1</sub><sup>P</sup></span>? (F02)",
  "a": "<b>altro</b>: solo se <span class=\"font-mono text-[0.86em] whitespace-nowrap\">EXP = coNP</span>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">coNP ⊆ PSPACE ⊆ EXP</span>; nessuna separazione nota tra coNP ed EXP (sappiamo solo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">P ⊊ EXP</span>). Se fosse vero: <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NP = coNP = PSPACE = EXP</span>",
  "c": [
   "EXP",
   "coNP"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>4</sub><sup>P</sup></span> non è strettamente contenuto in 3-EXP? (F06)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>4</sub><sup>P</sup> ⊆ PH ⊆ PSPACE ⊆ EXP ⊊ 2-EXP ⊊ 3-EXP</span>: è strettamente contenuto",
  "c": [
   "EXP",
   "SIGMAi"
  ]
 },
 {
  "q": "È falso che <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE ⊆ 3-EXP</span>? (F06)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE ⊆ EXP ⊊ 3-EXP</span>",
  "c": [
   "EXP",
   "PSPACE"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">P ≠ 4-EXP</span>? (F06)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">P ⊊ EXP ⊆ 4-EXP</span> (gerarchia di tempo)",
  "c": [
   "EXP",
   "P"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">2-EXP ⊆ Σ<sub>2</sub><sup>P</sup></span>? (F07)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>2</sub><sup>P</sup> ⊆ PSPACE ⊆ EXP ⊊ 2-EXP</span>",
  "c": [
   "EXP",
   "SIGMA2"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">NEXP ⊆ PSPACE</span>? (F13)",
  "a": "<b>altro</b>: solo se <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NEXP = PSPACE</span>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE ⊆ NEXP</span>; il contrario darebbe l'uguaglianza, questione aperta",
  "c": [
   "NEXP",
   "PSPACE"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE ⊂ NPSPACE</span>? (F13)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE = NPSPACE</span> (Savitch)",
  "c": [
   "PSPACE"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">NPSPACE ⊂ Π<sub>1</sub><sup>P</sup></span>? (F14)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Π<sub>1</sub><sup>P</sup> ⊆ PH ⊆ PSPACE = NPSPACE</span>",
  "c": [
   "PSPACE",
   "coNP"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">3-EXP = PH</span>? (E26)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH ⊆ PSPACE ⊆ EXP ⊊ 3-EXP</span>",
  "c": [
   "EXP",
   "PH"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>1</sub><sup>P</sup> ⊆ 2-EXP</span>? (E26)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>1</sub><sup>P</sup> = NP ⊆ PSPACE ⊆ EXP ⊆ 2-EXP</span>",
  "c": [
   "EXP",
   "NP"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>4</sub><sup>P</sup> ⊂ Σ<sub>3</sub><sup>P</sup></span>? (G16)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>3</sub><sup>P</sup> ⊆ Σ<sub>4</sub><sup>P</sup></span>, il contenimento stretto opposto è impossibile",
  "c": [
   "SIGMAi"
  ]
 },
 {
  "q": "È falso che <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>3</sub><sup>P</sup> ⊆ Π<sub>4</sub><sup>P</sup></span>? (G16)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>3</sub><sup>P</sup> ⊆ Δ<sub>4</sub><sup>P</sup> ⊆ Π<sub>4</sub><sup>P</sup></span>",
  "c": [
   "PIi",
   "SIGMAi"
  ]
 },
 {
  "q": "È falso che <span class=\"font-mono text-[0.86em] whitespace-nowrap\">P ⊆ PH</span>? (L18)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">P = Σ<sub>0</sub><sup>P</sup> ⊆ PH</span>",
  "c": [
   "P",
   "PH"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Π<sub>4</sub><sup>P</sup> ⊆ L</span>? (L18)",
  "a": "<b>altro</b>: solo se <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Π<sub>4</sub><sup>P</sup> = L</span>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">L ⊆ P ⊆ Π<sub>4</sub><sup>P</sup></span>; il contrario farebbe collassare <span class=\"font-mono text-[0.86em] whitespace-nowrap\">L = NL = P = PH</span>, questione aperta",
  "c": [
   "L",
   "PIi"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">EXP ⊂ DP</span>? (MA23)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">DP ⊆ Δ<sub>2</sub><sup>P</sup> ⊆ PH ⊆ PSPACE ⊆ EXP</span>",
  "c": [
   "DP",
   "EXP"
  ]
 },
 {
  "q": "È falso che <span class=\"font-mono text-[0.86em] whitespace-nowrap\">P ⊆ NPSPACE</span>? (FE23)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">P ⊆ PSPACE = NPSPACE</span>",
  "c": [
   "P",
   "PSPACE"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE ⊆ 2-EXP</span>? (SE23)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE ⊆ EXP ⊆ 2-EXP</span>",
  "c": [
   "EXP",
   "PSPACE"
  ]
 },
 {
  "q": "È vero che CLIQUE non appartiene a NEXP? (F02)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">CLIQUE ∈ NP ⊆ NEXP</span>",
  "c": [
   "NEXP",
   "NP"
  ]
 },
 {
  "q": "È vero che 2-SAT non appartiene a DP? (F01)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">2-SAT ∈ NL ⊆ P ⊆ NP ⊆ DP</span>",
  "c": [
   "DP",
   "NL"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">CLIQUE ∈ Σ<sub>1</sub><sup>P</sup></span>? (F07)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>1</sub><sup>P</sup> = NP</span> e CLIQUE è NP-completo",
  "c": [
   "NP"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT ∈ Π<sub>2</sub><sup>P</sup></span>? (F07)",
  "a": "<b>altro</b>: solo se <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE = Π<sub>2</sub><sup>P</sup></span>",
  "e": "QSAT PSPACE-completo; collasso di PH al livello 2",
  "c": [
   "PI2",
   "PSPACE"
  ]
 },
 {
  "q": "È vero che <span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>1</sub></span> non appartiene a <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>4</sub><sup>P</sup></span>? (F14)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>1</sub> ∈ Σ<sub>1</sub><sup>P</sup> ⊆ Σ<sub>4</sub><sup>P</sup></span>",
  "c": [
   "NP",
   "SIGMAi"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT ∈ EXP</span>? (L18)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT ∈ PSPACE ⊆ EXP</span>",
  "c": [
   "EXP",
   "PSPACE"
  ]
 },
 {
  "q": "È vero che <span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>1</sub> ∉ 2-EXP</span>? (L18)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>1</sub> ∈ NP ⊆ 2-EXP</span>",
  "c": [
   "EXP",
   "NP"
  ]
 },
 {
  "q": "CLIQUE si può risolvere in <span class=\"font-mono text-[0.86em] whitespace-nowrap\">O(2<sup>n/2</sup>)</span>? (L18)",
  "a": "<b>SÌ</b>",
  "e": "<b>m è il numero di nodi; n è la lunghezza dell’intero input in bit.</b> Il limite richiesto usa n, non m.<br><br><b>1. Quanto è grande l’input?</b> Con la codifica tramite matrice di adiacenza, un grafo di m nodi richiede m righe e m colonne: almeno m² bit, uno per ogni cella. Quindi n ≥ m² e m ≤ √n.<br><br><b>2. Che algoritmo usiamo?</b> Proviamo tutti i 2<sup>m</sup> gruppi di nodi. Per ogni gruppo controlliamo che contenga almeno K nodi e che ogni coppia sia collegata. Il controllo richiede tempo polinomiale, quindi il totale è al più 2<sup>√n</sup> · poly(n).<br><br><b>3. Perché basta?</b> Per n abbastanza grande, √n cresce molto più lentamente di n/2. Anche includendo il costo polinomiale dei controlli, il tempo rimane entro O(2<sup>n/2</sup>): infatti √n + k log₂ n ≤ n/2 per ogni k fissato, da un certo n in poi.<br><br><b>Esempio:</b> con 10 nodi, la sola matrice ha 100 celle. I gruppi da provare sono 2<sup>10</sup> = 1.024, mentre 2<sup>n/2</sup> è almeno 2<sup>50</sup>. La differenza nasce dal fatto che n conta i bit della descrizione.",
  "c": [
   "NP"
  ]
 },
 {
  "q": "È vero che 2-SAT non può essere deciso da una MdT nondeterministica in spazio polinomiale? (MA23)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">2-SAT ∈ P ⊆ PSPACE = NPSPACE</span>",
  "c": [
   "NL"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">co-QSAT<sub>1</sub> ∈ Σ<sub>3</sub><sup>P</sup></span>? (SE23)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">co-QSAT<sub>1</sub> ∈ Π<sub>1</sub><sup>P</sup> ⊆ Π<sub>2</sub><sup>P</sup> ⊆ Σ<sub>3</sub><sup>P</sup></span>",
  "c": [
   "SIGMAi",
   "coNP"
  ]
 },
 {
  "q": "È vero che MAX FLOW non è EXP-hard? (F02)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">MAX FLOW ∈ P</span>; se fosse EXP-hard <span class=\"font-mono text-[0.86em] whitespace-nowrap\">EXP ⊆ P</span>, contro <span class=\"font-mono text-[0.86em] whitespace-nowrap\">P ⊊ EXP</span>",
  "c": [
   "EXP",
   "P"
  ]
 },
 {
  "q": "Supponiamo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Π<sub>2</sub><sup>P</sup> ⊂ EXP</span>. È vero che PRIMES non è EXP-hard? (F01)",
  "a": "<b>SÌ</b>",
  "e": "ipotesi irrilevante: <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PRIMES ∈ P ⊊ EXP</span>",
  "c": [
   "EXP",
   "P",
   "PI2"
  ]
 },
 {
  "q": "È vero che PRIMES non è 4-EXP-hard? (GE23)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PRIMES ∈ P ⊊ EXP ⊊ … ⊊ 4-EXP</span>",
  "c": [
   "EXP",
   "P"
  ]
 },
 {
  "q": "È vero che 3-COL non è 3-EXP-hard? (F14)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">3-COL ∈ NP ⊆ EXP ⊊ 3-EXP</span>; se fosse 3-EXP-hard <span class=\"font-mono text-[0.86em] whitespace-nowrap\">3-EXP ⊆ NP</span>",
  "c": [
   "EXP",
   "NP"
  ]
 },
 {
  "q": "TSP(D) è <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Π<sub>1</sub><sup>P</sup></span>-hard? (F14)",
  "a": "<b>altro</b>: solo se <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NP = coNP</span> (<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH = NP</span>)",
  "e": "TSP(D) NP-completo; se fosse coNP-hard <span class=\"font-mono text-[0.86em] whitespace-nowrap\">coNP ⊆ NP</span>, cioè <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NP = coNP</span>",
  "c": [
   "NP",
   "PH",
   "coNP"
  ]
 },
 {
  "q": "È vero che <span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>1</sub></span> non è NP-completo? (F13)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>1</sub></span> è <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>1</sub><sup>P</sup></span>-completo e <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>1</sub><sup>P</sup> = NP</span> (<span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>1</sub> = SAT</span>)",
  "c": [
   "NP"
  ]
 },
 {
  "q": "QSAT è 2-EXP-completo? (F13)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT ∈ PSPACE ⊆ EXP ⊊ 2-EXP</span>; se fosse 2-EXP-completo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">2-EXP ⊆ PSPACE</span>",
  "c": [
   "EXP",
   "PSPACE"
  ]
 },
 {
  "q": "È vero che SCHÖNFINKEL-BERNAYS SAT non è NEXP-completo? (E26)",
  "a": "<b>NO</b>",
  "e": "è NEXP-completo (Lezione 10)",
  "c": [
   "NEXP"
  ]
 },
 {
  "q": "SCHÖNFINKEL-BERNAYS SAT è PSPACE-completo? (FE23)",
  "a": "<b>altro</b>: solo se <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE = NEXP</span>",
  "e": "è NEXP-completo; se fosse in PSPACE allora <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NEXP ⊆ PSPACE</span>",
  "c": [
   "NEXP",
   "PSPACE"
  ]
 },
 {
  "q": "È vero che <span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>3</sub></span> non è coNP-hard? (G16)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>3</sub></span> è <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>3</sub><sup>P</sup></span>-completo e <span class=\"font-mono text-[0.86em] whitespace-nowrap\">coNP = Π<sub>1</sub><sup>P</sup> ⊆ Σ<sub>3</sub><sup>P</sup></span>",
  "c": [
   "SIGMAi",
   "coNP"
  ]
 },
 {
  "q": "2-COL è PH-hard? (MA23)",
  "a": "<b>altro</b>: solo se <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH = P</span>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">2-COL ∈ P</span>; PH-hard implicherebbe <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH ⊆ P</span> (collasso al piano 0, <span class=\"font-mono text-[0.86em] whitespace-nowrap\">P = NP</span>; a rigore anche <span class=\"font-mono text-[0.86em] whitespace-nowrap\">= L</span>)",
  "c": [
   "P",
   "PH"
  ]
 },
 {
  "q": "GEOGRAPHY è NL-hard? (MA23)",
  "a": "<b>SÌ</b>",
  "e": "PSPACE-completo e <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NL ⊆ PSPACE</span>",
  "c": [
   "NL",
   "PSPACE"
  ]
 },
 {
  "q": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>2</sub></span> è <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>2</sub><sup>P</sup></span>-hard? (GE23)",
  "a": "<b>SÌ</b>",
  "e": "è <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>2</sub><sup>P</sup></span>-completo",
  "c": [
   "SIGMA2"
  ]
 },
 {
  "q": "EXACT TSP è <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>2</sub><sup>P</sup></span>-hard? (GE23)",
  "a": "<b>altro</b>: solo se <span class=\"font-mono text-[0.86em] whitespace-nowrap\">DP = Σ<sub>2</sub><sup>P</sup></span>",
  "e": "EXACT TSP è DP-completo e <span class=\"font-mono text-[0.86em] whitespace-nowrap\">DP ⊆ Δ<sub>2</sub><sup>P</sup> ⊆ Σ<sub>2</sub><sup>P</sup></span>; <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>2</sub><sup>P</sup></span>-hard darebbe <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>2</sub><sup>P</sup> ⊆ DP</span>",
  "c": [
   "DP",
   "SIGMA2"
  ]
 },
 {
  "q": "Supponiamo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH = EXP</span>. MAX FLOW è PH-completo? (G16)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">MAX FLOW ∈ P</span>; PH-completo darebbe <span class=\"font-mono text-[0.86em] whitespace-nowrap\">P = PH = EXP</span>, contro <span class=\"font-mono text-[0.86em] whitespace-nowrap\">P ⊊ EXP</span>",
  "c": [
   "EXP",
   "P",
   "PH"
  ]
 },
 {
  "q": "Se <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH = EXP</span>, PH collassa a un livello finito? (L18)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH ⊆ PSPACE ⊆ EXP = PH</span>, quindi <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH = PSPACE</span>; <span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT ∈ PH</span> sta in qualche <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>i</sub><sup>P</sup></span>, quindi <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH = Σ<sub>i</sub><sup>P</sup></span>",
  "c": [
   "EXP",
   "PH"
  ]
 },
 {
  "q": "Supponiamo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH = EXP</span>. <span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT ∈ PH</span>? (SE23)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT ∈ PSPACE ⊆ EXP = PH</span>",
  "c": [
   "EXP",
   "PH",
   "PSPACE"
  ]
 },
 {
  "q": "Supponiamo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>4</sub><sup>P</sup> = Π<sub>4</sub><sup>P</sup></span>. <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>4</sub><sup>P</sup></span> non è strettamente contenuto in <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Π<sub>4</sub><sup>P</sup></span>? (F06)",
  "a": "<b>SÌ</b>",
  "e": "sono uguali, quindi nessun contenimento stretto",
  "c": [
   "PIi",
   "SIGMAi"
  ]
 },
 {
  "q": "Supponiamo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Π<sub>1</sub><sup>P</sup> = Π<sub>4</sub><sup>P</sup></span>. <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NEXP ⊆ Π<sub>1</sub><sup>P</sup></span>? (F07)",
  "a": "<b>NO</b>",
  "e": "l'ipotesi fa collassare <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH = coNP = NP</span>, quindi servirebbe <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NEXP ⊆ NP</span>, contro <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NP ⊊ NEXP</span> (gerarchia nondeterministica). L'ipotesi non serve nemmeno: <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NP ⊆ NEXP ⊆ coNP</span> darebbe comunque <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NP = coNP</span> e di nuovo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NEXP ⊆ NP</span>",
  "c": [
   "NEXP",
   "PIi",
   "coNP"
  ]
 },
 {
  "q": "Supponete che <span class=\"font-mono text-[0.86em] whitespace-nowrap\">co-QSAT<sub>2</sub></span> non sia PH-hard. <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE = Π<sub>2</sub><sup>P</sup></span>? (F02)",
  "a": "<b>NO</b>",
  "e": "se <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE = Π<sub>2</sub><sup>P</sup></span> allora <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH = Π<sub>2</sub><sup>P</sup></span> e il <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Π<sub>2</sub><sup>P</sup></span>-completo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">co-QSAT<sub>2</sub></span> sarebbe PH-hard, contro l'ipotesi",
  "c": [
   "PH",
   "PI2",
   "PSPACE"
  ]
 },
 {
  "q": "Supponiamo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Π<sub>2</sub><sup>P</sup> = PH</span>. È vero che non esistono riduzioni da <span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>4</sub></span> a <span class=\"font-mono text-[0.86em] whitespace-nowrap\">co-QSAT<sub>4</sub></span>? (F13)",
  "a": "<b>NO</b>",
  "e": "collasso al livello 2: <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>4</sub><sup>P</sup> = Π<sub>4</sub><sup>P</sup></span>, quindi <span class=\"font-mono text-[0.86em] whitespace-nowrap\">QSAT<sub>4</sub> ∈ Π<sub>4</sub><sup>P</sup></span> si riduce al <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Π<sub>4</sub><sup>P</sup></span>-completo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">co-QSAT<sub>4</sub></span>",
  "c": [
   "PH",
   "PI2",
   "PIi",
   "SIGMAi"
  ]
 },
 {
  "q": "Supponiamo VALIDITY riducibile a TSP(D). È vero che EXACT TSP non è <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>2</sub><sup>P</sup></span>-completo? (F14)",
  "a": "<b>NO</b>",
  "e": "VALIDITY coNP-completo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">≤</span> <span class=\"font-mono text-[0.86em] whitespace-nowrap\">TSP(D) ∈ NP ⇒ NP = coNP ⇒ PH = NP</span>; allora <span class=\"font-mono text-[0.86em] whitespace-nowrap\">DP = NP = Σ<sub>2</sub><sup>P</sup></span> e il DP-completo EXACT TSP è <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>2</sub><sup>P</sup></span>-completo",
  "c": [
   "DP",
   "NP",
   "SIGMA2",
   "coNP"
  ]
 },
 {
  "q": "Assumiamo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH = NEXP</span>. È vero che PRIMES non è NPSPACE-hard? (E26)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">PH ⊆ PSPACE ⊆ NEXP = PH</span>, quindi <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE = NEXP</span>. <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PRIMES ∈ P</span>: se fosse NPSPACE-hard <span class=\"font-mono text-[0.86em] whitespace-nowrap\">P = PSPACE = NEXP ⊇ EXP</span>, contro <span class=\"font-mono text-[0.86em] whitespace-nowrap\">P ⊊ EXP</span>",
  "c": [
   "NEXP",
   "P",
   "PH",
   "PSPACE"
  ]
 },
 {
  "q": "Supponiamo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">co-QSAT<sub>4</sub> ∈ Σ<sub>3</sub><sup>P</sup></span>. <span class=\"font-mono text-[0.86em] whitespace-nowrap\">Σ<sub>3</sub><sup>P</sup> ≠ Σ<sub>4</sub><sup>P</sup></span>? (FE23)",
  "a": "<b>NO</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">Π<sub>4</sub><sup>P</sup> ⊆ Σ<sub>3</sub><sup>P</sup></span> <span class=\"font-mono text-[0.86em] whitespace-nowrap\">⇒</span> collasso al livello 3 <span class=\"font-mono text-[0.86em] whitespace-nowrap\">⇒ Σ<sub>3</sub><sup>P</sup> = Σ<sub>4</sub><sup>P</sup></span>",
  "c": [
   "PIi",
   "SIGMAi"
  ]
 },
 {
  "q": "Supponiamo SCHÖNFINKEL-BERNAYS SAT <span class=\"font-mono text-[0.86em] whitespace-nowrap\">∈ BPP</span>. È vero che GEOGRAPHY non è riducibile a 2-SAT? (GE23)",
  "a": "<b>SÌ</b>",
  "e": "L'ipotesi non serve: GEOGRAPHY è PSPACE-completo e <span class=\"font-mono text-[0.86em] whitespace-nowrap\">2-SAT ∈ NL</span>; con riduzioni in spazio logaritmico avremmo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">PSPACE ⊆ NL</span>, contro <span class=\"font-mono text-[0.86em] whitespace-nowrap\">NL ⊊ PSPACE</span>.",
  "c": [
   "NEXP",
   "NL",
   "PSPACE"
  ]
 },
 {
  "q": "La validità di una formula del primo ordine è in RE? (F06, SE23)",
  "a": "<b>SÌ</b>",
  "e": "<span class=\"font-mono text-[0.86em] whitespace-nowrap\">RE ∖ R</span>: semidecidibile (si enumerano le dimostrazioni) ma non decidibile",
  "c": [
   "R",
   "RE"
  ]
 }
];
