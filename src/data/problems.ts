/* Problemi del corso (dalla Mappa dei problemi v3, verificata su dispensa e slide). Testo in HTML. */
export type LadderId = "L" | "NL" | "P" | "NP" | "coNP" | "DP" | "SIGMAi" | "PIi" | "PSPACE" | "NEXP" | "RE" | "coRE";
export type Trap = { c?: string; q?: string; a?: "SÌ" | "NO" | "altro"; ac?: string; e?: string; n?: string };
export type Problem = { id: string; name: string; al?: string; b: LadderId; c?: string; lv?: string; lab: string; full?: boolean; ext?: boolean; def: string; brief: string; why: string; comp: string; compl?: string; complLab?: string; cpl?: string; ext_t?: string; fix?: string; traps: Trap[]; src: ["d" | "s" | "a" | "x", string][] };
/** gradini della scala: n nome (HTML), t nome Unicode, d descrizione */
export const LADDER: Record<LadderId, { n: string; t?: string; d: string }> = {
 "L": {
  "n": "L",
  "d": "Spazio di lavoro logaritmico, macchina deterministica."
 },
 "NL": {
  "n": "NL",
  "d": "Spazio logaritmico con nondeterminismo. Le classi di spazio nondeterministico sono chiuse per complemento: NL = coNL."
 },
 "P": {
  "n": "P",
  "d": "Tempo polinomiale deterministico: i problemi trattabili."
 },
 "NP": {
  "n": "NP",
  "d": "Il sì ha un certificato corto, controllabile in tempo polinomiale."
 },
 "coNP": {
  "n": "coNP",
  "d": "Il no ha un certificato corto (un disqualifier). Contiene i complementi dei problemi di NP."
 },
 "DP": {
  "n": "DP",
  "d": "Intersezioni A ∩ B con A in NP e B in coNP. Non è NP ∩ coNP."
 },
 "SIGMAi": {
  "t": "Σᵢᴾ",
  "n": "Σ<sub>i</sub><sup>P</sup>",
  "d": "Livello i della gerarchia polinomiale (PH): blocchi ∃∀∃… che iniziano con ∃. Σ<sub>1</sub><sup>P</sup> = NP."
 },
 "PIi": {
  "t": "Πᵢᴾ",
  "n": "Π<sub>i</sub><sup>P</sup>",
  "d": "Complementi dei problemi di Σ<sub>i</sub><sup>P</sup>: blocchi che iniziano con ∀. Π<sub>1</sub><sup>P</sup> = coNP."
 },
 "PSPACE": {
  "n": "PSPACE",
  "d": "Spazio polinomiale. PSPACE = NPSPACE (Savitch) e contiene tutta PH."
 },
 "NEXP": {
  "n": "NEXP",
  "d": "Tempo esponenziale nondeterministico. NP ⊊ NEXP ✱ (gerarchia nondeterministica, dagli appunti)."
 },
 "RE": {
  "n": "RE ∖ R",
  "d": "Semidecidibili: se la risposta è sì, una MdT prima o poi lo dice; se è no può non fermarsi mai."
 },
 "coRE": {
  "n": "coRE ∖ R",
  "d": "Complementi dei problemi di RE: si scopre il no, il sì può non arrivare mai."
 }
};
export const ROWS: LadderId[][] = [
 [
  "L"
 ],
 [
  "NL"
 ],
 [
  "P"
 ],
 [
  "NP",
  "coNP"
 ],
 [
  "DP"
 ],
 [
  "SIGMAi",
  "PIi"
 ],
 [
  "PSPACE"
 ],
 [
  "NEXP"
 ],
 [
  "RE",
  "coRE"
 ]
];
/** connettori tra un gradino e il successivo: [simbolo, testo, taglio R] */
export const CONN: [string, string, boolean?][] = [
 [
  "⊆",
  "L ⊆ NL. Se l'inclusione sia stretta non si sa."
 ],
 [
  "⊆",
  "NL ⊆ P. Stretta non si sa (ma NL ⊊ PSPACE)."
 ],
 [
  "⊆",
  "P ⊆ NP ∩ coNP. P = NP e NP = coNP sono domande aperte."
 ],
 [
  "⊆",
  "NP ∪ coNP ⊆ DP: un problema NP è A ∩ Σ*, uno coNP è Σ* ∩ B."
 ],
 [
  "⊆",
  "DP ⊆ Δ<sub>2</sub><sup>P</sup> ⊆ Σ<sub>2</sub><sup>P</sup> ∩ Π<sub>2</sub><sup>P</sup>. Poi Σ<sub>i</sub><sup>P</sup> ∪ Π<sub>i</sub><sup>P</sup> ⊆ Σ<sub>i+1</sub><sup>P</sup> ∩ Π<sub>i+1</sub><sup>P</sup>."
 ],
 [
  "⊆",
  "PH ⊆ PSPACE. Se coincidono, PH collassa a un livello finito."
 ],
 [
  "⊆",
  "PSPACE ⊆ EXP ⊆ NEXP. Separazioni note: P ⊊ EXP e NP ⊊ NEXP ✱."
 ],
 [
  "⊊",
  "Fin qui tutto è decidibile (sta in R). Da qui in su no.",
  true
 ]
];
/** classificazioni in ordine, per le risposte sbagliate del quiz */
export const ORDER: string[] = [
 "NL-completo",
 "in P",
 "P-completo",
 "NP-completo",
 "coNP-completo",
 "DP-completo",
 "Σ<sub>i</sub><sup>P</sup>-completo",
 "Π<sub>i</sub><sup>P</sup>-completo",
 "Σ<sub>2</sub><sup>P</sup>-completo",
 "Π<sub>2</sub><sup>P</sup>-completo",
 "PSPACE-completo",
 "NEXP-completo",
 "RE ∖ R",
 "coRE ∖ R"
];
export const PROBLEMS: Problem[] = [
 {
  "id": "REACH",
  "name": "REACHABILITY",
  "al": "raggiungibilità cammino grafo",
  "b": "NL",
  "lab": "NL-completo",
  "full": true,
  "ext": true,
  "def": "Dato un grafo orientato con n nodi e due nodi x e y: esiste un cammino da x a y?",
  "brief": "Una MdT nondeterministica ricorda solo il nodo corrente e il prossimo: spazio O(log n).",
  "why": "Una MdT nondeterministica tiene sul nastro di lavoro solo il nodo corrente e il successivo, scelto a caso tra 1 e n: due numeri da log n bit. Quindi REACHABILITY ∈ NL. Una visita del grafo lo risolve anche in tempo polinomiale, e il teorema di Savitch lo risolve deterministicamente in spazio O(log² n).",
  "comp": "NL-completo: decidere un qualsiasi problema di NL equivale a cercare un cammino nel grafo delle configurazioni della macchina, quindi ogni problema di NL si riduce a REACHABILITY in spazio logaritmico.",
  "compl": "Il complemento (y non raggiungibile da x) è un esempio delle slide della Lezione 4. Sta in coNL = NL.",
  "complLab": "NL-completo",
  "ext_t": "La NL-completezza non compare né nella dispensa né nelle slide: viene dal libro di riferimento del corso (Papadimitriou) ed è riportata negli appunti (Lezione 8 §9). Dalle fonti risulta solo REACHABILITY ∈ NL e ∈ SPACE(log² n).",
  "traps": [
   {
    "n": "Il teorema di Savitch, NSPACE(f) ⊆ SPACE(f²), si dimostra proprio risolvendo REACHABILITY sul grafo delle configurazioni. È la domanda di E26#1 e FE23#6 (NSPACE(log n) contro SPACE((log n)²))."
   },
   {
    "n": "La dispensa (cap. 12) avverte che con riduzioni di costo illimitato si potrebbe \"ridurre\" TSP(D) a REACHABILITY: per questo le riduzioni del corso devono stare in spazio logaritmico."
   }
  ],
  "src": [
   [
    "s",
    "Slide Lezione 3, \"Reachability in spazio logaritmico\""
   ],
   [
    "s",
    "Slide Lezione 5 e dispensa cap. 7: REACHABILITY ∈ SPACE(log² n)"
   ],
   [
    "s",
    "Slide Lezione 1: algoritmo polinomiale"
   ],
   [
    "x",
    "NL-completezza: libro di riferimento"
   ]
  ]
 },
 {
  "id": "SAT2",
  "name": "2-SAT",
  "al": "2sat due letterali",
  "b": "NL",
  "lab": "NL-completo",
  "full": true,
  "ext": true,
  "def": "Formula in forma normale congiuntiva (CNF) in cui ogni clausola ha al più 2 letterali: è soddisfacibile?",
  "brief": "Ogni clausola diventa due implicazioni; basta cercare cammini x → ¬x → x nel grafo delle implicazioni.",
  "why": "Ogni clausola (a ∨ b) equivale a due implicazioni, ¬a ⇒ b e ¬b ⇒ a. La formula è insoddisfacibile se e solo se, per qualche variabile x, il grafo delle implicazioni ha un cammino da x a ¬x e uno da ¬x a x. Basta quindi cercare cammini: 2-SAT sta in NL e quindi in P. La dispensa lo dice così: si riduce \"alla ricerca di cicli in un grafo di dimensione lineare\".",
  "comp": "NL-completo, come REACHABILITY. Per questo, anche se sta in P, non lo si usa come problema \"più difficile di P\".",
  "compl": "Il complemento (2-CNF insoddisfacibili) sta in coNL = NL, quindi è anch'esso NL-completo.",
  "complLab": "NL-completo",
  "ext_t": "Dispensa e slide dicono solo \"2-SAT is in P\" (cap. 12). La NL-completezza viene dal libro di riferimento ed è negli appunti (Lezione 8 §3 e §9).",
  "fix": "Il riepilogo della dispensa (cap. 22) scrive \"2-SAT is P-complete\": non è dimostrato. Con le riduzioni in spazio logaritmico varrebbe se e solo se P = NL, problema aperto. Anche \"2-SAT non è NP-completo\" non è un fatto dimostrato: lo sarebbe se NP = NL, che darebbe anche P = NP.",
  "traps": [
   {
    "c": "F01#7",
    "q": "È vero che 2-SAT non appartiene a DP?",
    "a": "NO",
    "e": "2-SAT ∈ NL ⊆ P ⊆ NP ⊆ DP."
   },
   {
    "c": "F06#2",
    "q": "Esiste una riduzione da co-QSAT<sub>2</sub> a 2-SAT?",
    "a": "altro",
    "ac": "solo se Π<sub>2</sub><sup>P</sup> = P",
    "e": "co-QSAT<sub>2</sub> è Π<sub>2</sub><sup>P</sup>-completo e 2-SAT sta in P: la riduzione porterebbe Π<sub>2</sub><sup>P</sup> in P, e PH collasserebbe a P."
   },
   {
    "c": "GE23#3",
    "q": "GEOGRAPHY è riducibile a 2-SAT?",
    "a": "NO",
    "e": "GEOGRAPHY è PSPACE-completo e 2-SAT ∈ NL: avremmo PSPACE ⊆ NL, contro NL ⊊ PSPACE."
   },
   {
    "c": "G17#2",
    "q": "Supponiamo P ⊂ Σ<sub>3</sub><sup>P</sup>. È vero che 2-SAT non è Σ<sub>3</sub><sup>P</sup>-completo?",
    "a": "SÌ",
    "e": "Se lo fosse, Σ<sub>3</sub><sup>P</sup> ⊆ P, contro l'ipotesi."
   },
   {
    "n": "PRIMES → 2-SAT: la dispensa risponde sì perché crede 2-SAT P-completo. La risposta corretta è \"altro: solo se PRIMES ∈ NL\"."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 12: \"2-SAT is in P\""
   ],
   [
    "d",
    "Cap. 22: \"2-SAT is P-complete\" (non dimostrato)"
   ],
   [
    "a",
    "Lezione 8 §3 e §9"
   ],
   [
    "x",
    "NL-completezza: libro di riferimento"
   ]
  ]
 },
 {
  "id": "COL2",
  "name": "2-COL",
  "al": "2-coloring due colori bipartito colorabilità",
  "b": "P",
  "lab": "in P",
  "full": false,
  "def": "Si possono colorare i nodi di un grafo con 2 colori in modo che due nodi collegati abbiano sempre colori diversi?",
  "brief": "Colorato un nodo, i vicini sono obbligati: una visita trova il conflitto (ciclo dispari) in tempo polinomiale.",
  "why": "Appena si colora un nodo, il colore di tutti i suoi vicini è obbligato. Una visita del grafo propaga i colori e trova un conflitto se c'è; il conflitto c'è esattamente quando il grafo ha un ciclo di lunghezza dispari. Tempo polinomiale. La dispensa lo dice nella prova di 3-COLORING: \"The 2-COLORING problem is in P\".",
  "comp": "Non è noto completo per nessuna classe del corso.",
  "ext_t": "\"Anzi in L\" non sta nelle fonti del corso. È un risultato della letteratura (la raggiungibilità su grafi non orientati sta in L, Reingold 2005), riportato negli appunti (Lezione 8 §9). All'esame basta 2-COL ∈ P.",
  "traps": [
   {
    "c": "MA23#2",
    "q": "2-COL è PH-hard?",
    "a": "altro",
    "ac": "solo se PH = P",
    "e": "2-COL sta in P: se fosse PH-hard, tutta PH starebbe in P."
   },
   {
    "c": "ND#1",
    "q": "È vero che 2-COL non può essere deciso da una MdT nondeterministica in spazio polinomiale?",
    "a": "NO",
    "e": "2-COL ∈ P ⊆ PSPACE = NPSPACE. Nella soluzione dello studente 2-COL è trattato come P-completo: non lo è (non è noto)."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 13, prova di 3-COLORING: \"2-COLORING is in P\""
   ],
   [
    "a",
    "Lezione 8 §4 e §9"
   ],
   [
    "x",
    "2-COL ∈ L: letteratura"
   ]
  ]
 },
 {
  "id": "MAXFLOW",
  "name": "MAX FLOW",
  "al": "flusso massimo rete decisionale",
  "b": "P",
  "lab": "P-completo",
  "full": true,
  "def": "Data una rete con capacità intere sugli archi, una sorgente s, un pozzo t e un intero K: esiste un flusso da s a t di valore almeno K?",
  "brief": "Si migliora il flusso con cammini nella rete residua; la versione furba costa O(n⁵).",
  "why": "Il flusso si migliora lungo cammini dalla sorgente al pozzo nella rete residua (una ricerca alla REACHABILITY). La versione base costa O(n³C), con C la capacità massima: non è polinomiale, perché C è esponenziale rispetto alla lunghezza della sua codifica in binario. Una versione più furba costa O(n⁵), che è polinomiale.",
  "comp": "P-completo: ogni problema di P si riduce a MAX FLOW in spazio logaritmico. Il corso lo enuncia senza prova (riepilogo della dispensa).",
  "traps": [
   {
    "c": "F02#1",
    "q": "È vero che MAX FLOW non è EXP-hard?",
    "a": "SÌ",
    "e": "MAX FLOW ∈ P ⊊ EXP: se fosse EXP-hard avremmo EXP ⊆ P."
   },
   {
    "c": "G16#1",
    "q": "Supponiamo PH = EXP. MAX FLOW è PH-completo?",
    "a": "NO",
    "e": "Darebbe P = PH = EXP, contro P ⊊ EXP."
   },
   {
    "c": "E26#5",
    "q": "Esiste una riduzione da co-QSAT<sub>3</sub> a MAX FLOW?",
    "a": "altro",
    "ac": "solo se PH = P",
    "e": "Π<sub>3</sub><sup>P</sup> ⊆ P farebbe collassare PH a P."
   },
   {
    "c": "MZ22#7",
    "q": "È vero che MAX FLOW non può essere deciso da una MdT deterministica in spazio polinomiale?",
    "a": "NO",
    "e": "MAX FLOW ∈ P ⊆ PSPACE."
   }
  ],
  "src": [
   [
    "s",
    "Slide Lezione 1: algoritmo, costo O(n³C) e versione O(n⁵)"
   ],
   [
    "d",
    "Cap. 22: \"MAX-FLOW is P-complete\""
   ]
  ]
 },
 {
  "id": "LP",
  "name": "LINEAR PROGRAMMING",
  "al": "programmazione lineare lp",
  "b": "P",
  "lab": "P-completo",
  "full": true,
  "ext": true,
  "def": "Dato un sistema di disequazioni lineari, con soluzioni reali (non per forza intere): esiste una soluzione?",
  "brief": "Come INTEGER PROGRAMMING ma con soluzioni reali: si risolve in tempo polinomiale.",
  "why": "La dispensa lo contrappone a INTEGER PROGRAMMING: \"LINEAR PROGRAMMING, the same problem without the requirement that the solutions be integers, is in P\". Le slide della Lezione 1 citano l'algoritmo dell'ellissoide, polinomiale (il simplesso è esponenziale nel caso peggiore ma veloce in pratica).",
  "comp": "P-completo.",
  "ext_t": "La P-completezza non sta nelle fonti del corso, che dicono solo \"in P\". È un risultato della letteratura (Dobkin, Lipton, Reiss, 1979) riportato negli appunti (Lezione 8 §9).",
  "traps": [
   {
    "n": "Non confonderlo con INTEGER PROGRAMMING: chiedendo soluzioni intere diventa NP-completo."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 13: \"LINEAR PROGRAMMING … is in P\""
   ],
   [
    "s",
    "Slide Lezione 1: ellissoide e simplesso"
   ],
   [
    "x",
    "P-completezza: letteratura"
   ]
  ]
 },
 {
  "id": "PRIMES",
  "name": "PRIMES",
  "al": "primalità numero primo",
  "b": "P",
  "lab": "in P",
  "full": false,
  "def": "Dato un intero N scritto in binario: N è primo?",
  "brief": "In P, ma non è noto P-completo. L'input è lungo log N cifre: provare i divisori è esponenziale.",
  "why": "Il riepilogo della dispensa dice \"PRIMES ∈ P\". Attenzione alla misura: l'input è lungo circa log N cifre, quindi provare tutti i divisori fino a √N richiede tempo esponenziale nella lunghezza dell'input. Serve un algoritmo polinomiale in log N.",
  "comp": "Non è noto P-completo. La dispensa, negli esercizi: \"would be true if PRIMES were P-complete, but we don't know that\".",
  "ext_t": "Il nome dell'algoritmo (AKS, Agrawal, Kayal e Saxena, 2002) non compare nelle fonti del corso.",
  "traps": [
   {
    "c": "GE23#4",
    "q": "È vero che PRIMES non è 4-EXP-hard?",
    "a": "SÌ",
    "e": "PRIMES ∈ P ⊊ EXP ⊊ … ⊊ 4-EXP. Uguale F01#2 con EXP."
   },
   {
    "c": "E26#7",
    "q": "Assumiamo PH = NEXP. È vero che PRIMES non è NPSPACE-hard?",
    "a": "SÌ",
    "e": "L'ipotesi dà PSPACE = NEXP. Se PRIMES fosse NPSPACE-hard, P = PSPACE ⊇ EXP, contro P ⊊ EXP."
   },
   {
    "c": "F03#2",
    "q": "PRIMES è riducibile a TSP(D)?",
    "a": "SÌ",
    "e": "PRIMES ∈ P ⊆ NP e TSP(D) è NP-completo."
   },
   {
    "n": "Due problemi in P non si riducono per forza uno all'altro: PRIMES → MAX FLOW sì (MAX FLOW è P-completo), PRIMES → 2-SAT solo se PRIMES ∈ NL, CLIQUE → PRIMES solo se P = NP e PRIMES fosse P-hard."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 22: \"PRIMES ∈ P\""
   ],
   [
    "d",
    "Cap. 13.6, esercizi sulle riduzioni"
   ],
   [
    "x",
    "Nome dell'algoritmo AKS"
   ]
  ]
 },
 {
  "id": "HORN",
  "name": "HORNSAT",
  "al": "horn clausole",
  "b": "P",
  "lab": "P-completo",
  "full": true,
  "ext": true,
  "def": "Formula CNF in cui ogni clausola ha al più un letterale positivo (clausole di Horn): è soddisfacibile?",
  "brief": "Si parte da tutto falso e si rende vero solo ciò che è obbligatorio: tempo lineare.",
  "why": "Si parte con tutte le variabili false e si rende vero solo ciò che una clausola obbliga a rendere vero; se a un certo punto una clausola resta falsa, la formula è insoddisfacibile. La dispensa: una formula di Horn, se soddisfacibile, ha un assegnamento calcolabile in tempo lineare.",
  "comp": "P-completo.",
  "ext_t": "La P-completezza non sta nelle fonti del corso: viene dal libro di riferimento ed è negli appunti (Lezione 8 §9).",
  "traps": [
   {
    "n": "Come 2-SAT, è una restrizione di SAT che diventa facile: la difficoltà dipende dalla forma delle clausole."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 12: \"Horn clauses\", tempo lineare"
   ],
   [
    "x",
    "P-completezza: libro di riferimento"
   ]
  ]
 },
 {
  "id": "SAT",
  "name": "SAT",
  "al": "soddisfacibilità qsat1 cook levin",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "Data una formula booleana in CNF: esiste un assegnamento delle variabili che la rende vera?",
  "brief": "Certificato: l'assegnamento. Cook-Levin: ogni problema di NP si riduce a SAT. SAT = QSAT₁.",
  "why": "Il certificato è l'assegnamento, che si controlla in tempo polinomiale. Il teorema di Cook-Levin mostra che ogni problema di NP si riduce a SAT: si scrive una formula che descrive il funzionamento della MdT nondeterministica.",
  "comp": "NP-completo (Cook-Levin). Coincide con QSAT<sub>1</sub>: una QBF con il solo blocco ∃ chiede proprio se esiste un assegnamento che la rende vera.",
  "cpl": "COSAT",
  "traps": [
   {
    "c": "F13#3",
    "q": "È vero che QSAT<sub>1</sub> non è NP-completo?",
    "a": "NO",
    "e": "QSAT<sub>1</sub> = SAT è Σ<sub>1</sub><sup>P</sup>-completo e Σ<sub>1</sub><sup>P</sup> = NP."
   },
   {
    "c": "FE23#2",
    "q": "È vero che SAT non appartiene a PP?",
    "a": "NO",
    "e": "SAT ∈ NP ⊆ PP."
   },
   {
    "c": "F05#6",
    "q": "È vero che QSAT<sub>1</sub> non è L-hard?",
    "a": "NO",
    "e": "Un problema NP-completo è hard per ogni classe contenuta in NP, quindi anche per L."
   },
   {
    "n": "SAT → VALIDITY e VALIDITY → SAT: entrambe \"altro: solo se NP = coNP\" (dispensa, esercizi cap. 14)."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 12: \"SAT is NP-complete\""
   ],
   [
    "s",
    "Slide Lezione 9: definizione di QSAT<sub>i</sub>"
   ]
  ]
 },
 {
  "id": "SAT3",
  "name": "3-SAT",
  "al": "3sat tre letterali",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "SAT in cui ogni clausola ha al più 3 letterali.",
  "brief": "SAT si riduce a 3-SAT spezzando le clausole lunghe con variabili nuove.",
  "why": "Sta in NP come SAT. È NP-completo per riduzione da SAT: una clausola lunga si spezza in clausole di 3 letterali collegate da variabili nuove, senza cambiare la soddisfacibilità.",
  "comp": "NP-completo.",
  "traps": [
   {
    "c": "F03#3",
    "q": "3-SAT ∈ Π<sub>2</sub><sup>P</sup>?",
    "a": "SÌ",
    "e": "3-SAT ∈ NP = Σ<sub>1</sub><sup>P</sup> ⊆ Δ<sub>2</sub><sup>P</sup> ⊆ Π<sub>2</sub><sup>P</sup>."
   },
   {
    "n": "Il salto da 2 a 3 letterali: 2-SAT sta in NL, 3-SAT è NP-completo."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 12: \"3-SAT is NP-complete\""
   ]
  ]
 },
 {
  "id": "MAX2SAT",
  "name": "MAX2SAT",
  "al": "max 2 sat",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "Formula CNF con clausole di 2 letterali e un intero K: si possono rendere vere almeno K clausole?",
  "brief": "Clausole da 2 letterali, ma chiedere \"almeno K vere\" basta a renderlo NP-completo.",
  "why": "Il certificato è l'assegnamento. È NP-completo per riduzione da 3-SAT: ogni clausola di 3 letterali diventa un gruppo di 10 clausole di 2 letterali, con una soglia K scelta apposta.",
  "comp": "NP-completo.",
  "traps": [
   {
    "n": "Due letterali non bastano a rendere facile un problema: conta anche la domanda. 2-SAT chiede che tutte le clausole siano vere, MAX2SAT che almeno K lo siano."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 12: \"MAX2SAT is NP-complete\""
   ]
  ]
 },
 {
  "id": "CIRCUITSAT",
  "name": "CIRCUIT SAT",
  "al": "circuito booleano",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "Dato un circuito booleano con porte AND, OR e NOT: esiste un input che dà uscita 1?",
  "brief": "La versione a circuito di SAT. Da non confondere con CIRC SAT.",
  "why": "Il certificato è l'input; si valuta il circuito porta per porta in tempo polinomiale. È NP-completo come SAT, di cui è la versione a circuito.",
  "comp": "NP-completo.",
  "traps": [
   {
    "n": "Non confonderlo con CIRC SAT (circoscrizione), che è Σ<sub>2</sub><sup>P</sup>-completo. Compare in F03#5, G20v3#1 e G20v4#2."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 22: \"CIRCUIT SAT is NP-complete\""
   ]
  ]
 },
 {
  "id": "CLIQUE",
  "name": "CLIQUE",
  "al": "cricca",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "Dato un grafo e un intero K: esistono K nodi tutti collegati tra loro?",
  "brief": "Certificato: i K nodi. Una clique in G è un insieme indipendente nel grafo complementare.",
  "why": "Il certificato sono i K nodi: si controlla in tempo polinomiale che ogni coppia sia collegata. Per la difficoltà: S è una clique in G se e solo se S è un insieme indipendente nel grafo complementare (stessi nodi, archi scambiati), quindi INDEPENDENT SET si riduce a CLIQUE.",
  "comp": "NP-completo.",
  "traps": [
   {
    "c": "F02#3",
    "q": "È vero che CLIQUE non appartiene a NEXP?",
    "a": "NO",
    "e": "CLIQUE ∈ NP ⊆ NEXP."
   },
   {
    "c": "F07#6",
    "q": "CLIQUE ∈ Σ<sub>1</sub><sup>P</sup>?",
    "a": "SÌ",
    "e": "Σ<sub>1</sub><sup>P</sup> = NP. Ripetuta in F04#2."
   },
   {
    "c": "L18#6",
    "q": "CLIQUE si può risolvere in O(2^(n/2))?",
    "a": "SÌ",
    "e": "Con m nodi la matrice di adiacenza è lunga n ≥ m², quindi m ≤ √n: provare tutti i 2^m sottoinsiemi costa 2^√n · poly(n). Non vale perché \"ogni problema NP sta in O(2^(n/2))\": non è dimostrato."
   },
   {
    "c": "ND#6",
    "q": "CLIQUE è PH-hard?",
    "a": "altro",
    "ac": "solo se PH = NP",
    "e": "PH-hard darebbe PH ⊆ NP: collasso al primo livello."
   },
   {
    "c": "G20v4#7",
    "q": "È vero che CLIQUE non appartiene a Π<sub>4</sub><sup>P</sup>?",
    "a": "NO",
    "e": "CLIQUE ∈ NP ⊆ Π<sub>2</sub><sup>P</sup> ⊆ Π<sub>4</sub><sup>P</sup>."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 13: \"CLIQUE and NODE COVER are NP-complete\""
   ]
  ]
 },
 {
  "id": "IS",
  "name": "INDEPENDENT SET",
  "al": "insieme indipendente is",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "Dato un grafo e un intero K: esistono K nodi senza archi tra loro?",
  "brief": "Riduzione da 3-SAT: un triangolo per clausola, archi tra letterali opposti.",
  "why": "Il certificato sono i K nodi. È NP-completo per riduzione da 3-SAT: un triangolo per ogni clausola, un arco tra ogni coppia di letterali opposti, e K uguale al numero di clausole. La dispensa nota che sui grafi bipartiti torna in P.",
  "comp": "NP-completo.",
  "traps": [
   {
    "c": "SP",
    "n": "Domanda 8 senza traccia: MdT con oracolo CLIQUE che decide INDEPENDENT SET ≥ K. Si passa all'oracolo il grafo complementare con lo stesso K."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 13: \"INDEPENDENT SET is NP-complete\""
   ]
  ]
 },
 {
  "id": "NC",
  "name": "NODE COVER",
  "al": "vertex cover copertura",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "Dato un grafo e un intero K: esistono K nodi che toccano tutti gli archi?",
  "brief": "S è indipendente se e solo se i nodi fuori da S coprono tutti gli archi.",
  "why": "Il certificato sono i K nodi. Un insieme S è indipendente se e solo se i nodi fuori da S toccano tutti gli archi: INDEPENDENT SET con soglia K diventa NODE COVER con soglia n − K.",
  "comp": "NP-completo.",
  "traps": [
   {
    "n": "NODE COVER → 2-SAT: la dispensa risponde \"no\" ragionando con NP ≠ coNP. Senza ipotesi la risposta d'esame è \"altro: solo se P = NP\"."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 13: \"CLIQUE and NODE COVER are NP-complete\""
   ]
  ]
 },
 {
  "id": "HP",
  "name": "HAMILTON PATH",
  "al": "cammino hamiltoniano",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "Dato un grafo: esiste un cammino che passa per ogni nodo esattamente una volta?",
  "brief": "Certificato: l'ordine dei nodi. Il complemento è coNP-completo, non Π₂ᴾ-completo.",
  "why": "Il certificato è l'ordine in cui visitare i nodi; si controlla in tempo polinomiale. È NP-completo per riduzione da 3-SAT.",
  "comp": "NP-completo.",
  "cpl": "COHP",
  "traps": [
   {
    "c": "F03#7",
    "q": "Supponiamo EXP ⊂ NEXP. È vero che HAMILTON PATH non è Π<sub>2</sub><sup>P</sup>-completo?",
    "a": "altro",
    "ac": "solo se NP ≠ coNP",
    "e": "Sarebbe Π<sub>2</sub><sup>P</sup>-completo se e solo se Π<sub>2</sub><sup>P</sup> ⊆ NP, cioè NP = coNP. L'ipotesi dà solo P ≠ NP. Il file della traccia scrive \"solo se NP = coNP\": è sbagliato."
   },
   {
    "c": "F03#1",
    "q": "co-QSAT<sub>4</sub> è riducibile a HAMILTON PATH?",
    "a": "altro",
    "ac": "solo se NP = coNP",
    "e": "La riduzione darebbe Π<sub>4</sub><sup>P</sup> ⊆ NP, quindi NP = coNP e PH collassa al livello 1."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 13: \"The HAMILTON PATH problem is NP-complete\""
   ]
  ]
 },
 {
  "id": "TSPD",
  "name": "TSP(D)",
  "al": "commesso viaggiatore tsp decisionale",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "Date le distanze intere tra n città e un budget B: esiste un giro che visita tutte le città con lunghezza totale ≤ B?",
  "brief": "Certificato: il giro. Il complemento è coNP-completo; \"= B\" invece di \"≤ B\" dà EXACT TSP.",
  "why": "Il certificato è il giro, di cui si somma la lunghezza in tempo polinomiale. È NP-completo per riduzione da HAMILTON PATH: distanza 1 tra nodi collegati, 2 tra gli altri.",
  "comp": "NP-completo.",
  "cpl": "COTSP",
  "traps": [
   {
    "c": "F14#7",
    "q": "TSP(D) è Π<sub>1</sub><sup>P</sup>-hard?",
    "a": "altro",
    "ac": "solo se NP = coNP",
    "e": "Un NP-completo coNP-hard darebbe coNP ⊆ NP."
   },
   {
    "c": "F08#7",
    "q": "TSP(D) è NL-completo?",
    "a": "altro",
    "ac": "solo se NL = NP",
    "e": "È già NL-hard (NL ⊆ NP); starebbe in NL solo se NP ⊆ NL."
   },
   {
    "c": "F14#4",
    "q": "TSP(D) ammette certificati succinti?",
    "a": "SÌ",
    "e": "Sta in NP: il certificato è il giro."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 13: \"TSP(D) is NP-complete\""
   ]
  ]
 },
 {
  "id": "COL3",
  "name": "3-COL",
  "al": "3-coloring tre colori colorabilità",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "Si possono colorare i nodi di un grafo con 3 colori in modo che due nodi collegati abbiano sempre colori diversi?",
  "brief": "Certificato: la colorazione. Con 2 colori il problema è in P.",
  "why": "Il certificato è la colorazione, controllabile arco per arco. È NP-completo per riduzione da 3-SAT con due gadget (dispensa cap. 13).",
  "comp": "NP-completo.",
  "traps": [
   {
    "c": "F14#1",
    "q": "È vero che 3-COL non è 3-EXP-hard?",
    "a": "SÌ",
    "e": "3-COL ∈ NP ⊆ EXP ⊊ 3-EXP."
   },
   {
    "c": "G20v1#4",
    "q": "3-COL è Π<sub>2</sub><sup>P</sup>-completo?",
    "a": "altro",
    "ac": "solo se NP = coNP",
    "e": "Π<sub>2</sub><sup>P</sup> ⊆ NP darebbe NP = coNP."
   },
   {
    "c": "LU24#2",
    "q": "3-COL è riducibile a GEOGRAPHY?",
    "a": "SÌ",
    "e": "NP ⊆ PSPACE e GEOGRAPHY è PSPACE-completo."
   },
   {
    "c": "F12#2",
    "q": "Esiste una riduzione da co-QSAT<sub>1</sub> a 3-COL?",
    "a": "altro",
    "ac": "solo se NP = coNP",
    "e": "co-QSAT<sub>1</sub> è coNP-completo: la riduzione darebbe coNP ⊆ NP."
   },
   {
    "c": "ND#4",
    "q": "3-COL appartiene a Σ<sub>2</sub><sup>P</sup>?",
    "a": "SÌ",
    "e": "NP = Σ<sub>1</sub><sup>P</sup> ⊆ Σ<sub>2</sub><sup>P</sup>. Simile: F04#3 (non appartiene a Σ<sub>1</sub><sup>P</sup>? NO), SE23#6 (3-COL → QSAT<sub>4</sub>? SÌ)."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 13: \"3-COLORING is NP-complete\""
   ]
  ]
 },
 {
  "id": "IP",
  "name": "INTEGER PROGRAMMING",
  "al": "programmazione intera",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "Dato un sistema di disequazioni lineari: esiste una soluzione intera?",
  "brief": "Con soluzioni intere è NP-completo; con soluzioni reali (LINEAR PROGRAMMING) è in P.",
  "why": "Generalizza SET COVER e molti altri problemi: ogni scelta sì/no diventa una variabile 0/1. La parte difficile della prova è mostrare che sta in NP, cioè che basta cercare soluzioni con numeri non troppo grandi.",
  "comp": "NP-completo.",
  "traps": [
   {
    "n": "Contrasto da ricordare: INTEGER PROGRAMMING è NP-completo, LINEAR PROGRAMMING sta in P."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 13: \"INTEGER PROGRAMMING is NP-complete\""
   ]
  ]
 },
 {
  "id": "KNAP",
  "name": "KNAPSACK",
  "al": "zaino",
  "b": "NP",
  "lab": "NP-completo",
  "full": true,
  "def": "Oggetti con peso e valore, una capacità W e un obiettivo K: si può scegliere un sottoinsieme con peso ≤ W e valore ≥ K?",
  "brief": "NP-completo ma non in senso forte: c'è un algoritmo pseudopolinomiale.",
  "why": "Il certificato è il sottoinsieme. È NP-completo, ma solo perché i numeri possono essere esponenzialmente grandi: esiste un algoritmo pseudopolinomiale, polinomiale nel valore dei numeri. Per questo non è NP-completo in senso forte. Argomento non chiesto all'esame negli appunti.",
  "comp": "NP-completo, ma non in senso forte.",
  "traps": [
   {
    "n": "Nessuna traccia lo chiede direttamente: basta sapere che è NP-completo."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 13: \"KNAPSACK is NP-complete\", §13.5"
   ]
  ]
 },
 {
  "id": "VALIDITY",
  "name": "VALIDITY",
  "al": "validità tautologia",
  "b": "coNP",
  "lab": "coNP-completo",
  "full": true,
  "def": "Data una formula booleana: è vera per ogni assegnamento delle variabili (è una tautologia)?",
  "brief": "Il no ha un certificato corto (un assegnamento che la rende falsa). φ valida ⇔ ¬φ insoddisfacibile.",
  "why": "A non avere un certificato corto è il sì; ce l'ha il no: un assegnamento che rende falsa la formula. φ è valida se e solo se ¬φ è insoddisfacibile, quindi VALIDITY è co-SAT applicato alla formula negata.",
  "comp": "coNP-completo: se L sta in coNP, il suo complemento sta in NP e si riduce a SAT con una riduzione R; allora R′(x) = ¬R(x) riduce L a VALIDITY (dispensa cap. 14).",
  "compl": "Il complemento (esiste un assegnamento che rende falsa φ) è SAT applicato a ¬φ: NP-completo.",
  "complLab": "NP-completo",
  "traps": [
   {
    "c": "G20v2#3",
    "q": "VALIDITY è P-hard?",
    "a": "SÌ",
    "e": "È coNP-completo e P ⊆ coNP: è hard per ogni classe contenuta in coNP."
   },
   {
    "c": "LU22#1",
    "q": "VALIDITY è riducibile a co-QSAT<sub>4</sub>?",
    "a": "SÌ",
    "e": "coNP = Π<sub>1</sub><sup>P</sup> ⊆ Π<sub>4</sub><sup>P</sup> e co-QSAT<sub>4</sub> è Π<sub>4</sub><sup>P</sup>-completo."
   },
   {
    "c": "F14#2",
    "q": "Supponiamo VALIDITY riducibile a TSP(D). È vero che EXACT TSP non è Σ₂ᴾ-completo?",
    "a": "NO",
    "e": "L'ipotesi dà NP = coNP, quindi PH = NP = DP = Σ₂ᴾ, e il DP-completo EXACT TSP diventa Σ₂ᴾ-completo."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 14: \"VALIDITY and HAMILTON PATH COMPLEMENT are coNP-complete\""
   ],
   [
    "d",
    "Cap. 22: \"VALIDITY is coNP-complete\""
   ]
  ]
 },
 {
  "id": "COSAT",
  "name": "co-SAT",
  "al": "unsat insoddisfacibilità sat complement co-qsat1 coqsat1 complemento di sat",
  "b": "coNP",
  "lab": "coNP-completo",
  "full": true,
  "def": "Data una formula booleana in CNF: è insoddisfacibile?",
  "brief": "Complemento di SAT; coincide con co-QSAT₁.",
  "why": "È il complemento di SAT. Il complemento di un problema NP-completo è coNP-completo, perché le riduzioni rispettano i complementi. Coincide con co-QSAT<sub>1</sub>, dato che QSAT<sub>1</sub> = SAT; e Π<sub>1</sub><sup>P</sup> = coNP.",
  "comp": "coNP-completo (cioè Π<sub>1</sub><sup>P</sup>-completo).",
  "cpl": "SAT",
  "fix": "Nella tabella di partenza co-SAT e co-QSAT<sub>1</sub> sono in due voci diverse: sono lo stesso problema.",
  "traps": [
   {
    "c": "SE23#1",
    "q": "co-QSAT<sub>1</sub> ∈ Σ<sub>3</sub><sup>P</sup>?",
    "a": "SÌ",
    "e": "Π<sub>1</sub><sup>P</sup> ⊆ Π<sub>2</sub><sup>P</sup> ⊆ Σ<sub>3</sub><sup>P</sup>."
   },
   {
    "c": "ND#7",
    "q": "Assumiamo NL = BPP. co-QSAT<sub>1</sub> è BPP-hard?",
    "a": "SÌ",
    "e": "Con l'ipotesi BPP = NL ⊆ coNP, e un coNP-completo è hard per ogni classe contenuta in coNP."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 6 e 14: SAT complement"
   ],
   [
    "s",
    "Slide Lezione 9: QSAT<sub>i</sub> e complementi"
   ]
  ]
 },
 {
  "id": "COHP",
  "name": "co-HAMILTON PATH",
  "al": "complemento hamilton path cammino hamiltoniano",
  "b": "coNP",
  "lab": "coNP-completo",
  "full": true,
  "def": "Dato un grafo: è vero che non esiste nessun cammino hamiltoniano?",
  "brief": "Complemento di un NP-completo: coNP-completo. Non è noto Π₂ᴾ-completo.",
  "why": "È il complemento di HAMILTON PATH. Per il no c'è un certificato corto (il cammino); per il sì non se ne conosce uno.",
  "comp": "coNP-completo.",
  "cpl": "HP",
  "fix": "La dispensa (cap. 17) scrive che co-HAMILTON PATH è Π<sub>2</sub><sup>P</sup>-completo: non è dimostrato. È coNP-completo, cioè Π<sub>1</sub><sup>P</sup>-completo, e sarebbe Π<sub>2</sub><sup>P</sup>-completo solo se NP = coNP. Nel riepilogo (cap. 22) \"HAMILTON PATH is coNP-complete\" è invece giusto: la barra di complemento sul nome si perde solo copiando il testo.",
  "traps": [
   {
    "n": "Distinguere: HAMILTON PATH è NP-completo, il suo complemento coNP-completo, e nessuno dei due è noto Π<sub>2</sub><sup>P</sup>-completo (F03#7)."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 14: \"HAMILTON PATH COMPLEMENT\" coNP-completo"
   ],
   [
    "d",
    "Cap. 22 (con la barra)"
   ]
  ]
 },
 {
  "id": "COTSP",
  "name": "co-TSP(D)",
  "al": "complemento tsp commesso viaggiatore",
  "b": "coNP",
  "lab": "coNP-completo",
  "full": true,
  "def": "Date le distanze e un budget B: è vero che nessun giro ha lunghezza ≤ B?",
  "brief": "Complemento di TSP(D). Serve a costruire EXACT TSP.",
  "why": "È il complemento di TSP(D), che è NP-completo. Il no ha un certificato corto: un giro con lunghezza ≤ B.",
  "comp": "coNP-completo.",
  "cpl": "TSPD",
  "traps": [
   {
    "n": "EXACT TSP con budget B si scrive come TSP(D) con budget B (NP) intersecato con co-TSP(D) con budget B − 1 (coNP): per questo sta in DP."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 22: \"TSP(D) is coNP-complete\" (nome barrato)"
   ],
   [
    "s",
    "Slide Lezione 4: esempio di complemento"
   ]
  ]
 },
 {
  "id": "SATUNSAT",
  "name": "SAT-UNSAT",
  "al": "sat unsat dp",
  "b": "DP",
  "lab": "DP-completo",
  "full": true,
  "def": "Data una coppia di formule (φ, ψ): φ è soddisfacibile e ψ è insoddisfacibile?",
  "brief": "Metà domanda NP (φ soddisfacibile), metà coNP (ψ insoddisfacibile): sta in DP.",
  "why": "SAT-UNSAT = L₁ ∩ L₂, con L₁ = {(φ, ψ) : φ soddisfacibile}, che sta in NP, e L₂ = {(φ, ψ) : ψ insoddisfacibile}, che sta in coNP. Quindi sta in DP = {A ∩ B : A ∈ NP, B ∈ coNP}.",
  "comp": "DP-completo: se L = A ∩ B è in DP, si riduce A a SAT con R₁ e B a co-SAT con R₂; allora x ∈ L se e solo se (R₁(x), R₂(x)) ∈ SAT-UNSAT.",
  "traps": [
   {
    "n": "DP non è NP ∩ coNP: le slide della Lezione 9 lo scrivono in rosso. NP ∩ coNP contiene problemi che stanno in entrambe; DP contiene intersezioni di due problemi diversi. <a href=\"/confronta/DP/NPcapcoNP\">Confronto DP e NP ∩ coNP</a>."
   },
   {
    "c": "GE23#5",
    "q": "QSAT<sub>1</sub> è riducibile a SAT-UNSAT?",
    "a": "SÌ",
    "e": "NP ⊆ DP e SAT-UNSAT è DP-completo."
   },
   {
    "c": "F07#2",
    "q": "SAT-UNSAT è riducibile a co-QSAT<sub>3</sub>?",
    "a": "SÌ",
    "e": "DP ⊆ Δ<sub>2</sub><sup>P</sup> ⊆ Π<sub>3</sub><sup>P</sup> e co-QSAT<sub>3</sub> è Π<sub>3</sub><sup>P</sup>-completo."
   },
   {
    "c": "Domanda 8",
    "n": "MdT con oracolo SAT che decide SAT-UNSAT: due domande all'oracolo, una su φ e una su ψ (Lezione 11 §5.10). Uscita in G16, F08 ed E26."
   }
  ],
  "src": [
   [
    "s",
    "Slide Lezione 9: definizione di DP, SAT-UNSAT ∈ DP e DP-hardness"
   ],
   [
    "d",
    "Cap. 22: \"SAT-UNSAT is DP-complete\""
   ]
  ]
 },
 {
  "id": "EXACT",
  "name": "EXACT TSP",
  "al": "tsp esatto",
  "b": "DP",
  "lab": "DP-completo",
  "full": true,
  "def": "Date le distanze tra le città e un intero B: il giro più corto ha lunghezza esattamente B?",
  "brief": "\"Ottimo = B\" = \"esiste un giro ≤ B\" (NP) e \"nessun giro ≤ B − 1\" (coNP).",
  "why": "Dire che l'ottimo vale esattamente B vuol dire due cose: esiste un giro di lunghezza ≤ B (domanda NP) e nessun giro ha lunghezza ≤ B − 1 (domanda coNP). È l'intersezione di un problema NP e di uno coNP, quindi sta in DP. Per il sì non si conosce un certificato corto: bisognerebbe provare anche che nessun giro è più corto.",
  "comp": "DP-completo: riduzione da SAT-UNSAT (slide Lezione 9).",
  "fix": "La dispensa (cap. 15) mostra che EXACT TSP è NP-hard riducendo HAMILTON PATH con B = n + 1: la riduzione non regge, perché se il grafo ha un ciclo hamiltoniano l'ottimo vale n. Quella giusta parte da HAMILTON CYCLE con B = n (appunti, Lezione 9).",
  "traps": [
   {
    "c": "GE23#7",
    "q": "EXACT TSP è Σ<sub>2</sub><sup>P</sup>-hard?",
    "a": "altro",
    "ac": "solo se DP = Σ<sub>2</sub><sup>P</sup>",
    "e": "DP ⊆ Δ<sub>2</sub><sup>P</sup> ⊆ Σ<sub>2</sub><sup>P</sup>: essere Σ<sub>2</sub><sup>P</sup>-hard darebbe Σ<sub>2</sub><sup>P</sup> ⊆ DP."
   },
   {
    "c": "G20v5#7",
    "q": "È vero che EXACT TSP non è Σ<sub>1</sub><sup>P</sup>-hard?",
    "a": "NO",
    "e": "NP ⊆ DP: un DP-completo è anche NP-hard."
   }
  ],
  "src": [
   [
    "s",
    "Slide Lezione 9: analisi di EXACT TSP, \"altri problemi DP-completi\""
   ],
   [
    "d",
    "Cap. 15: EXACT TSP e TSP COST"
   ],
   [
    "a",
    "Lezione 9: riduzione corretta"
   ]
  ]
 },
 {
  "id": "QSATi",
  "name": "QSAT<sub>i</sub>",
  "al": "qsati qsat_i qsat1 qsat2 qsat3 qsat4 qbf quantificata livello",
  "b": "SIGMAi",
  "lv": "Σᵢ",
  "lab": "Σ<sub>i</sub><sup>P</sup>-completo",
  "full": true,
  "def": "Formula booleana quantificata ∃X₁ ∀X₂ ∃X₃ … φ con i blocchi di quantificatori alternati, il primo esistenziale: è vera?",
  "brief": "i blocchi alternati che iniziano con ∃: Σᵢᴾ-completo. QSAT₁ = SAT.",
  "why": "Si indovina il primo blocco (∃) e per il resto si chiede a un oracolo di livello i − 1, quindi sta in Σ<sub>i</sub><sup>P</sup> = NP con oracolo Σ<sub>i-1</sub><sup>P</sup>. Ogni problema di Σ<sub>i</sub><sup>P</sup> si riscrive come una QBF di questa forma.",
  "comp": "Σ<sub>i</sub><sup>P</sup>-completo per ogni i. Casi da ricordare: QSAT<sub>1</sub> = SAT (NP-completo), QSAT<sub>2</sub> è Σ<sub>2</sub><sup>P</sup>-completo.",
  "cpl": "COQSATi",
  "traps": [
   {
    "c": "G16#4",
    "q": "È vero che QSAT<sub>3</sub> non è coNP-hard?",
    "a": "NO",
    "e": "QSAT<sub>3</sub> è Σ<sub>3</sub><sup>P</sup>-completo e coNP = Π<sub>1</sub><sup>P</sup> ⊆ Σ<sub>3</sub><sup>P</sup>."
   },
   {
    "c": "GE23#1",
    "q": "QSAT<sub>2</sub> è Σ<sub>2</sub><sup>P</sup>-hard?",
    "a": "SÌ",
    "e": "È Σ<sub>2</sub><sup>P</sup>-completo."
   },
   {
    "c": "F14#6",
    "q": "È vero che QSAT<sub>1</sub> non appartiene a Σ<sub>4</sub><sup>P</sup>?",
    "a": "NO",
    "e": "Σ<sub>1</sub><sup>P</sup> ⊆ Σ<sub>4</sub><sup>P</sup>."
   },
   {
    "c": "G20v4#1",
    "q": "Supponiamo L ⊂ Σ<sub>2</sub><sup>P</sup>. QSAT<sub>2</sub> è L-completo?",
    "a": "NO",
    "e": "Starebbe in L, quindi Σ<sub>2</sub><sup>P</sup> ⊆ L, contro l'ipotesi. È L-hard, ma non sta in L."
   },
   {
    "n": "Attenzione al testo dei PDF: QSAT con la barra sopra è il complemento. La barra si perde copiando il testo, quindi controlla sempre l'immagine della traccia."
   }
  ],
  "src": [
   [
    "s",
    "Slide Lezione 9: definizione e completezza di QSAT<sub>i</sub>"
   ],
   [
    "d",
    "Cap. 17 e 22"
   ]
  ]
 },
 {
  "id": "COQSATi",
  "name": "co-QSAT<sub>i</sub>",
  "al": "coqsati co-qsati complemento qsat",
  "b": "PIi",
  "lv": "Πᵢ",
  "lab": "Π<sub>i</sub><sup>P</sup>-completo",
  "full": true,
  "def": "Complemento di QSAT<sub>i</sub>: la QBF ∃X₁ ∀X₂ … φ è falsa? Equivale a chiedere se ∀X₁ ∃X₂ … ¬φ è vera.",
  "brief": "Complemento di QSATᵢ: Πᵢᴾ-completo. co-QSAT₁ = co-SAT.",
  "why": "È il complemento di un problema Σ<sub>i</sub><sup>P</sup>-completo, e Π<sub>i</sub><sup>P</sup> è proprio la classe dei complementi dei problemi di Σ<sub>i</sub><sup>P</sup>.",
  "comp": "Π<sub>i</sub><sup>P</sup>-completo. Per i = 1: co-QSAT<sub>1</sub> = co-SAT, coNP-completo.",
  "cpl": "QSATi",
  "traps": [
   {
    "c": "G20v1#1",
    "q": "Assumiamo Σ<sub>3</sub><sup>P</sup> = Π<sub>3</sub><sup>P</sup>. co-QSAT<sub>3</sub> è Σ<sub>3</sub><sup>P</sup>-completo?",
    "a": "SÌ",
    "e": "È Π<sub>3</sub><sup>P</sup>-completo e con l'ipotesi Π<sub>3</sub><sup>P</sup> = Σ<sub>3</sub><sup>P</sup>."
   },
   {
    "c": "G20v2#7",
    "q": "co-QSAT<sub>3</sub> è P-hard?",
    "a": "SÌ",
    "e": "P ⊆ Π<sub>3</sub><sup>P</sup>."
   },
   {
    "c": "F08#5",
    "q": "co-QSAT<sub>3</sub> ∈ Π<sub>3</sub><sup>P</sup>?",
    "a": "SÌ",
    "e": "È Π<sub>3</sub><sup>P</sup>-completo."
   },
   {
    "c": "G16#6",
    "q": "QSAT è riducibile a co-QSAT<sub>3</sub>?",
    "a": "altro",
    "ac": "solo se PSPACE = Π<sub>3</sub><sup>P</sup>",
    "e": "Si porterebbe tutto PSPACE dentro Π<sub>3</sub><sup>P</sup>."
   },
   {
    "c": "FE23#3",
    "q": "co-QSAT<sub>2</sub> è riducibile a QSAT?",
    "a": "SÌ",
    "e": "Π<sub>2</sub><sup>P</sup> ⊆ PSPACE e QSAT è PSPACE-completo."
   },
   {
    "c": "F02#7",
    "q": "Supponete che co-QSAT<sub>2</sub> non sia PH-hard. PSPACE = Π<sub>2</sub><sup>P</sup>?",
    "a": "NO",
    "e": "Se PSPACE = Π<sub>2</sub><sup>P</sup>, PH = Π<sub>2</sub><sup>P</sup> e il Π<sub>2</sub><sup>P</sup>-completo co-QSAT<sub>2</sub> sarebbe PH-hard."
   }
  ],
  "src": [
   [
    "s",
    "Slide Lezione 9: completezza per Πᵢᴾ"
   ],
   [
    "d",
    "Cap. 22: \"QSATi is ΠiP-complete\" (nome barrato)"
   ]
  ]
 },
 {
  "id": "SC",
  "name": "STRATEGIC COMPANIES",
  "al": "società strategiche holding",
  "b": "SIGMAi",
  "c": "SIGMA2",
  "lv": "Σ₂",
  "lab": "Σ<sub>2</sub><sup>P</sup>-completo",
  "full": true,
  "def": "Una holding possiede società che producono merci, e alcune società sono controllate da gruppi di altre società. Una società data è strategica, cioè appartiene a un insieme minimo di società che produce tutte le merci e che include ogni società i cui controllori sono tutti nell'insieme?",
  "brief": "∃ un insieme che va bene, ∀ insieme più piccolo non va: forma ∃∀, livello 2.",
  "why": "Si indovina un insieme che produce tutto e contiene la società (∃), poi si verifica che nessun insieme più piccolo funzioni (∀). È la forma ∃∀ del secondo livello. La difficoltà si mostra per riduzione da QSAT₂ (prova omessa nella dispensa).",
  "comp": "Σ<sub>2</sub><sup>P</sup>-completo.",
  "cpl": "COSC",
  "traps": [
   {
    "c": "G20v5#2",
    "q": "QSAT<sub>2</sub> è riducibile a STRATEGIC COMPANIES?",
    "a": "SÌ",
    "e": "Entrambi Σ<sub>2</sub><sup>P</sup>-completi: la riduzione esiste nei due versi."
   }
  ],
  "src": [
   [
    "s",
    "Slide Lezione 9: definizione, \"strategic companies è Σ2P-completo\""
   ],
   [
    "d",
    "Cap. 17: \"STRATEGIC COMPANIES is Σ2P-complete\""
   ]
  ]
 },
 {
  "id": "COSC",
  "name": "co-STRATEGIC COMPANIES",
  "al": "complemento società strategiche",
  "b": "PIi",
  "c": "PI2",
  "lv": "Π₂",
  "lab": "Π<sub>2</sub><sup>P</sup>-completo",
  "full": true,
  "def": "La società data non è strategica?",
  "brief": "Complemento di un Σ₂ᴾ-completo: Π₂ᴾ-completo.",
  "why": "È il complemento di STRATEGIC COMPANIES, che è Σ<sub>2</sub><sup>P</sup>-completo.",
  "comp": "Π<sub>2</sub><sup>P</sup>-completo.",
  "cpl": "SC",
  "traps": [
   {
    "n": "Nel riepilogo della dispensa \"STRATEGIC COMPANIES is Π<sub>2</sub><sup>P</sup>-complete\" ha la barra sul nome: parla di questo complemento ed è giusto."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 17 e 22: nome barrato, Π2P-completo"
   ]
  ]
 },
 {
  "id": "CIRC",
  "name": "CIRC SAT",
  "al": "circoscrizione circumscription",
  "b": "SIGMAi",
  "c": "SIGMA2",
  "lv": "Σ₂",
  "lab": "Σ<sub>2</sub><sup>P</sup>-completo",
  "full": true,
  "def": "Data una base di conoscenza KB e una formula φ: φ è vera in almeno un modello minimale di KB? (Circoscrizione: i modelli minimali sono quelli con il minor numero possibile di anomalie.)",
  "brief": "∃ un modello di KB che soddisfa φ, ∀ modello più piccolo non lo è: Σ₂ᴾ-completo.",
  "why": "Si indovina un modello di KB in cui φ è vera (∃) e si controlla che nessun modello con meno anomalie lo batta (∀): di nuovo la forma ∃∀ del secondo livello. La versione \"φ vera in tutti i modelli minimali\" (CIRC VALIDITY) è il caso Π₂ᴾ.",
  "comp": "Σ<sub>2</sub><sup>P</sup>-completo.",
  "traps": [
   {
    "c": "G20v3#1",
    "q": "Assumiamo DP = PH. CIRC SAT è Π<sub>3</sub><sup>P</sup>-hard?",
    "a": "SÌ",
    "e": "PH = DP ⊆ Σ<sub>2</sub><sup>P</sup>: PH collassa al livello 2, quindi Π<sub>3</sub><sup>P</sup> = Σ<sub>2</sub><sup>P</sup> e CIRC SAT è Σ<sub>2</sub><sup>P</sup>-completo."
   },
   {
    "c": "G20v4#2",
    "q": "È vero che CIRC SAT non è 4-EXP-completo?",
    "a": "SÌ",
    "e": "Σ<sub>2</sub><sup>P</sup> ⊆ PSPACE ⊆ EXP ⊊ 4-EXP."
   },
   {
    "c": "F03#5",
    "q": "CIRC SAT è riducibile a co-QSAT<sub>3</sub>?",
    "a": "SÌ",
    "e": "Σ<sub>2</sub><sup>P</sup> ⊆ Δ<sub>3</sub><sup>P</sup> ⊆ Π<sub>3</sub><sup>P</sup>."
   },
   {
    "n": "CIRC SAT è la circoscrizione, non CIRCUIT SAT (NP-completo)."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 17: \"CIRC SAT is Σ2P-complete\""
   ],
   [
    "s",
    "Slide Lezione 9: \"Decidere se un modello di KB soddisfa φ è Σ2P-completo\""
   ]
  ]
 },
 {
  "id": "QSAT",
  "name": "QSAT",
  "al": "qbf formule quantificate",
  "b": "PSPACE",
  "lab": "PSPACE-completo",
  "full": true,
  "def": "Formula booleana quantificata con un numero qualsiasi di alternanze di quantificatori: è vera?",
  "brief": "Valutazione ricorsiva che riusa lo spazio. Hard per ogni classe dentro PSPACE.",
  "why": "Si valuta ricorsivamente, un quantificatore alla volta, riusando sempre lo stesso spazio: spazio polinomiale. Ogni problema di PSPACE si scrive come una QBF, con la stessa idea del predicato PATH(a, b, i) del teorema di Savitch.",
  "comp": "PSPACE-completo. Quindi è hard per ogni classe contenuta in PSPACE: P, NP, coNP, DP, ogni Σ<sub>i</sub><sup>P</sup> e Π<sub>i</sub><sup>P</sup>.",
  "traps": [
   {
    "c": "F07#7",
    "q": "QSAT ∈ Π<sub>2</sub><sup>P</sup>?",
    "a": "altro",
    "ac": "solo se PSPACE = Π<sub>2</sub><sup>P</sup>",
    "e": "PH collasserebbe al livello 2."
   },
   {
    "c": "L18#4",
    "q": "QSAT ∈ EXP?",
    "a": "SÌ",
    "e": "PSPACE ⊆ EXP."
   },
   {
    "c": "F13#6",
    "q": "QSAT è 2-EXP-completo?",
    "a": "NO",
    "e": "QSAT ∈ EXP ⊊ 2-EXP."
   },
   {
    "c": "F05#7",
    "q": "QSAT è P-hard?",
    "a": "SÌ",
    "e": "P ⊆ PSPACE."
   },
   {
    "c": "L18#1",
    "q": "Se PH = EXP, PH collassa a un livello finito?",
    "a": "SÌ",
    "e": "PH = PSPACE, e QSAT ∈ PH starebbe in qualche Σᵢᴾ: allora PH = Σᵢᴾ."
   }
  ],
  "src": [
   [
    "s",
    "Slide Lezione 9: \"Definizione di qsat\", PSPACE-completezza"
   ],
   [
    "d",
    "Cap. 22: \"QSAT is PSPACE-complete\""
   ]
  ]
 },
 {
  "id": "GEO",
  "name": "GEOGRAPHY",
  "al": "geografia gioco",
  "b": "PSPACE",
  "lab": "PSPACE-completo",
  "full": true,
  "def": "Gioco su un grafo orientato con un nodo di partenza: due giocatori scelgono a turno un successore dell'ultimo nodo, senza ripetere nodi; chi non può muovere perde. Il primo giocatore ha una strategia vincente?",
  "brief": "\"Esiste una mia mossa tale che per ogni tua mossa…\": l'alternanza ∃∀ di QSAT.",
  "why": "Si esplora l'albero delle partite in profondità; una partita dura al più n mosse, quindi basta spazio polinomiale. Per la difficoltà, QSAT si riduce a GEOGRAPHY: \"esiste una mia mossa tale che per ogni tua risposta…\" è proprio l'alternanza ∃∀.",
  "comp": "PSPACE-completo.",
  "traps": [
   {
    "c": "MA23#3",
    "q": "GEOGRAPHY è NL-hard?",
    "a": "SÌ",
    "e": "PSPACE-completo e NL ⊆ PSPACE."
   },
   {
    "c": "F05#5",
    "q": "GEOGRAPHY appartiene a PP?",
    "a": "altro",
    "ac": "solo se PP = PSPACE",
    "e": "PP ⊆ PSPACE; GEOGRAPHY ∈ PP darebbe PSPACE ⊆ PP."
   },
   {
    "c": "MZ22#2",
    "q": "Supponiamo GEOGRAPHY ∈ DP. Π<sub>2</sub><sup>P</sup> ⊂ Σ<sub>3</sub><sup>P</sup>?",
    "a": "NO",
    "e": "PSPACE ⊆ DP fa collassare tutto: nessun contenimento stretto."
   },
   {
    "c": "GE23#3",
    "q": "Supponiamo SCHÖNFINKEL-BERNAYS SAT ∈ BPP. È vero che GEOGRAPHY non è riducibile a 2-SAT?",
    "a": "SÌ",
    "e": "L'ipotesi non serve: la riduzione darebbe PSPACE ⊆ NL, contro NL ⊊ PSPACE."
   }
  ],
  "src": [
   [
    "s",
    "Slide Lezione 9: \"geography è PSPACE completo\""
   ],
   [
    "d",
    "Cap. 19: \"GEOGRAPHY is PSPACE-complete\""
   ]
  ]
 },
 {
  "id": "SB",
  "name": "SCHÖNFINKEL-BERNAYS SAT",
  "al": "schonfinkel bernays sb-sat sbsat primo ordine",
  "b": "NEXP",
  "lab": "NEXP-completo",
  "full": true,
  "def": "Data una formula del primo ordine senza simboli di funzione, della forma ∃x₁…∃xₖ ∀y₁…∀yₕ φ: è soddisfacibile?",
  "brief": "Bastano modelli con k elementi: si indovina il modello (esponenziale) e si controllano tutte le scelte delle y.",
  "why": "Se la formula ha un modello, ne ha uno con al più k elementi (più le costanti): non ci sono funzioni per costruirne altri. Si indovina quel modello, che può essere esponenziale, e si controllano tutte le kʰ scelte delle y: tempo esponenziale nondeterministico.",
  "comp": "NEXP-completo. Quindi non sta in NP, perché NP ⊊ NEXP ✱ (appunti).",
  "traps": [
   {
    "c": "E26#2",
    "q": "È vero che SCHÖNFINKEL-BERNAYS SAT non è NEXP-completo?",
    "a": "NO",
    "e": "È NEXP-completo (Lezione 10)."
   },
   {
    "c": "FE23#1",
    "q": "SCHÖNFINKEL-BERNAYS SAT è PSPACE-completo?",
    "a": "altro",
    "ac": "solo se PSPACE = NEXP",
    "e": "Starebbe in PSPACE: NEXP ⊆ PSPACE."
   },
   {
    "c": "G20v3#3",
    "q": "È vero che SCHÖNFINKEL-BERNAYS SAT non è Σ<sub>1</sub><sup>P</sup>-hard?",
    "a": "NO",
    "e": "NP ⊆ NEXP: è NP-hard."
   },
   {
    "c": "G20v4#4",
    "q": "SCHÖNFINKEL-BERNAYS SAT è Σ<sub>3</sub><sup>P</sup>-completo?",
    "a": "altro",
    "ac": "solo se Σ<sub>3</sub><sup>P</sup> = NEXP",
    "e": "È già Σ<sub>3</sub><sup>P</sup>-hard; starci darebbe NEXP ⊆ Σ<sub>3</sub><sup>P</sup>."
   },
   {
    "n": "SB-SAT → 2-SAT: NO, perché darebbe NEXP ⊆ P, mentre P ⊊ EXP ⊆ NEXP (dispensa, esercizi cap. 13)."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 13.6: premessa degli esercizi"
   ],
   [
    "d",
    "Cap. 22: \"Schönfinkel-Bernays SAT is NEXP-complete\""
   ],
   [
    "a",
    "Lezione 10 §6"
   ]
  ]
 },
 {
  "id": "SUCC",
  "name": "SUCCINCT CIRCUIT SAT",
  "al": "circuito succinto",
  "b": "NEXP",
  "lab": "NEXP-completo",
  "full": true,
  "def": "Un circuito piccolo descrive un circuito enorme: dato il numero di una porta, ne restituisce il tipo e gli ingressi. Il circuito enorme è soddisfacibile?",
  "brief": "CIRCUIT SAT in forma succinta: l'input è esponenzialmente più corto del circuito, e si sale da NP a NEXP.",
  "why": "Si indovina un assegnamento delle variabili, che può essere esponenziale, e si valuta il circuito enorme porta per porta, chiedendo al circuito piccolo com'è fatta ogni porta: tempo esponenziale nondeterministico.",
  "comp": "NEXP-completo. Negli appunti è fuori esame: basta sapere la classe.",
  "traps": [
   {
    "n": "Il prefisso \"succinct\" fa salire di un esponenziale: CIRCUIT SAT è NP-completo, SUCCINCT CIRCUIT SAT è NEXP-completo."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 22: \"Succinct Circuit sat is NEXP-complete\""
   ],
   [
    "a",
    "Lezione 10 §6"
   ]
  ]
 },
 {
  "id": "FOV",
  "name": "Validità del primo ordine",
  "al": "validità primo ordine logica first-order validity",
  "b": "RE",
  "lab": "RE ∖ R",
  "full": false,
  "def": "Una formula del primo ordine è valida, cioè vera in tutti i modelli?",
  "brief": "Si enumerano le dimostrazioni (Gödel): il sì arriva. Non decidibile (Church-Turing).",
  "why": "Per il teorema di completezza di Gödel ogni formula valida ha una dimostrazione: si elencano tutte le dimostrazioni, dalla più corta in su, e se la formula è valida prima o poi si trova la sua. Se non lo è, la ricerca non finisce mai. Il teorema di Church-Turing dice che non si può fare di meglio: non è decidibile.",
  "comp": "Sta in RE ma non in R (è semidecidibile, non decidibile).",
  "cpl": "FOS",
  "traps": [
   {
    "c": "F06#6",
    "q": "La validità di una formula del primo ordine è in RE?",
    "a": "SÌ",
    "e": "Si enumerano le dimostrazioni. Ripetuta in SE23#2."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 22: \"1st-order validity ∈ RE\\R\""
   ],
   [
    "a",
    "Lezione 10 §7"
   ]
  ]
 },
 {
  "id": "FOS",
  "name": "Soddisfacibilità del primo ordine",
  "al": "soddisfacibilità primo ordine first-order sat",
  "b": "coRE",
  "lab": "coRE ∖ R",
  "full": false,
  "def": "Una formula del primo ordine è soddisfacibile, cioè vera in almeno un modello?",
  "brief": "φ soddisfacibile ⇔ ¬φ non valida: il complemento della validità.",
  "why": "φ è soddisfacibile se e solo se ¬φ non è valida. È quindi il complemento della validità: sta in coRE, e non in R, perché R è chiusa per complemento e allora anche la validità sarebbe decidibile.",
  "comp": "Sta in coRE ma non in R.",
  "cpl": "FOV",
  "traps": [
   {
    "c": "G20v4#6",
    "q": "Il controllo di soddisfacibilità di una formula del primo ordine è in coRE?",
    "a": "SÌ",
    "e": "È il complemento della validità, che sta in RE."
   }
  ],
  "src": [
   [
    "d",
    "Cap. 22: \"1st-order sat ∈ coRE\\R\""
   ],
   [
    "a",
    "Lezione 10 §7"
   ]
  ]
 }
];
export const PROBLEM_BY: Record<string, Problem> = Object.fromEntries(PROBLEMS.map((x) => [x.id, x]));
export const LINKS: [string, string, string][] = [
 [
  "SAT2",
  "SAT3",
  "2 contro 3 letterali: NL-completo contro NP-completo"
 ],
 [
  "SAT2",
  "MAX2SAT",
  "stesse clausole da 2 letterali, ma \"almeno K vere\" è NP-completo"
 ],
 [
  "SAT2",
  "REACH",
  "2-SAT si decide cercando cammini nel grafo delle implicazioni"
 ],
 [
  "SAT2",
  "HORN",
  "due restrizioni di SAT che diventano facili"
 ],
 [
  "COL2",
  "COL3",
  "2 colori in P, 3 colori NP-completo"
 ],
 [
  "SAT",
  "COSAT",
  "complementi: NP-completo e coNP-completo"
 ],
 [
  "SAT",
  "SAT3",
  "SAT si riduce a 3-SAT spezzando le clausole"
 ],
 [
  "SAT",
  "QSATi",
  "SAT = QSAT₁"
 ],
 [
  "SAT",
  "CIRCUITSAT",
  "stesso problema, scritto come circuito"
 ],
 [
  "COSAT",
  "COQSATi",
  "co-SAT = co-QSAT₁"
 ],
 [
  "COSAT",
  "VALIDITY",
  "φ valida se e solo se ¬φ è insoddisfacibile"
 ],
 [
  "SAT",
  "VALIDITY",
  "SAT → VALIDITY solo se NP = coNP"
 ],
 [
  "QSATi",
  "COQSATi",
  "complementi: Σᵢᴾ-completo e Πᵢᴾ-completo"
 ],
 [
  "QSATi",
  "QSAT",
  "con i fissato si sta in Σᵢᴾ; con alternanze libere si arriva a PSPACE"
 ],
 [
  "QSAT",
  "GEO",
  "entrambi PSPACE-completi: una partita è un'alternanza ∃∀"
 ],
 [
  "HP",
  "COHP",
  "complementi: NP-completo e coNP-completo"
 ],
 [
  "TSPD",
  "COTSP",
  "complementi: NP-completo e coNP-completo"
 ],
 [
  "HP",
  "TSPD",
  "HAMILTON PATH si riduce a TSP(D)"
 ],
 [
  "TSPD",
  "EXACT",
  "\"≤ B\" contro \"= B\": NP contro DP"
 ],
 [
  "COTSP",
  "EXACT",
  "EXACT TSP = TSP(D) con B ∩ co-TSP(D) con B − 1"
 ],
 [
  "SATUNSAT",
  "SAT",
  "la metà NP di SAT-UNSAT"
 ],
 [
  "SATUNSAT",
  "COSAT",
  "la metà coNP di SAT-UNSAT"
 ],
 [
  "SATUNSAT",
  "EXACT",
  "EXACT TSP è DP-completo per riduzione da SAT-UNSAT"
 ],
 [
  "CLIQUE",
  "IS",
  "una clique in G è un insieme indipendente nel grafo complementare"
 ],
 [
  "IS",
  "NC",
  "S è indipendente se e solo se il resto dei nodi copre tutti gli archi"
 ],
 [
  "SAT3",
  "COL3",
  "3-SAT si riduce a 3-COL"
 ],
 [
  "SAT3",
  "IS",
  "3-SAT si riduce a INDEPENDENT SET"
 ],
 [
  "MAXFLOW",
  "LP",
  "MAX FLOW è un caso di programmazione lineare"
 ],
 [
  "LP",
  "IP",
  "soluzioni reali: in P; soluzioni intere: NP-completo"
 ],
 [
  "MAXFLOW",
  "REACH",
  "il flusso si migliora cercando cammini nella rete residua"
 ],
 [
  "PRIMES",
  "MAXFLOW",
  "PRIMES → MAX FLOW esiste, perché MAX FLOW è P-completo"
 ],
 [
  "PRIMES",
  "SAT2",
  "PRIMES → 2-SAT solo se PRIMES ∈ NL"
 ],
 [
  "CIRCUITSAT",
  "CIRC",
  "nomi simili, classi diverse: NP contro Σ₂ᴾ"
 ],
 [
  "CIRCUITSAT",
  "SUCC",
  "la versione succinta sale da NP a NEXP"
 ],
 [
  "SC",
  "COSC",
  "complementi: Σ₂ᴾ-completo e Π₂ᴾ-completo"
 ],
 [
  "SC",
  "QSATi",
  "STRATEGIC COMPANIES e QSAT₂ sono entrambi Σ₂ᴾ-completi"
 ],
 [
  "CIRC",
  "QSATi",
  "CIRC SAT e QSAT₂ sono entrambi Σ₂ᴾ-completi"
 ],
 [
  "SB",
  "FOV",
  "restringere la forma delle formule: da indecidibile a NEXP-completo"
 ],
 [
  "SB",
  "SUCC",
  "entrambi NEXP-completi"
 ],
 [
  "FOV",
  "FOS",
  "complementi: RE ∖ R e coRE ∖ R"
 ]
];
/** verifica della tabella di partenza: [riga, esito, cosa dicono le fonti] */
export const VER: [string, "ok" | "part", string][] = [
 [
  "REACHABILITY: NL-completo, in SPACE(log² n) (Savitch)",
  "part",
  "In NL: slide Lezione 3. In SPACE(log² n): slide Lezione 5 e dispensa cap. 7. La NL-completezza non è nelle fonti (viene dal libro di riferimento)."
 ],
 [
  "2-SAT: NL-completo, quindi in P; NL = coNL; 2-SAT non NP-completo, 3-SAT sì",
  "part",
  "In P: dispensa cap. 12. NL = coNL: dispensa cap. 6 e slide Lezione 4 dicono che le classi di spazio nondeterministico sono chiuse per complemento. 3-SAT NP-completo: cap. 12. La NL-completezza non è nelle fonti. \"2-SAT non è NP-completo\" non è dimostrato: lo sarebbe se NP = NL. La dispensa (cap. 22) lo dice P-completo, e anche questo non è dimostrato."
 ],
 [
  "2-COL: in P, anzi in L; 3-COL NP-completo",
  "part",
  "In P e 3-COL NP-completo: dispensa cap. 13. \"In L\" non è nelle fonti (risultato della letteratura)."
 ],
 [
  "MAX FLOW: P-completo; anche LINEAR PROGRAMMING è P-completo",
  "part",
  "MAX FLOW P-completo: dispensa cap. 22. LINEAR PROGRAMMING: la dispensa dice solo che sta in P (cap. 13); la P-completezza non è nelle fonti."
 ],
 [
  "PRIMES: in P (algoritmo AKS)",
  "part",
  "PRIMES ∈ P: dispensa cap. 22. Il nome AKS non compare nelle fonti."
 ],
 [
  "SAT, 3-SAT, CLIQUE, 3-COL, TSP(D), HAMILTON PATH, INDEPENDENT SET, NODE COVER: NP-completi; SAT = QSAT₁",
  "ok",
  "Tutti NP-completi nella dispensa (cap. 12, 13, 22). SAT = QSAT₁ segue dalla definizione di QSATᵢ (slide Lezione 9) ed è la risposta del correttore in F13#3."
 ],
 [
  "VALIDITY, co-SAT, co-QSAT₁, complementi di HAMILTON PATH e TSP(D): coNP-completi",
  "ok",
  "Dispensa cap. 14 e cap. 22 (nomi con la barra). Nota: co-SAT e co-QSAT₁ sono lo stesso problema."
 ],
 [
  "SAT-UNSAT, EXACT TSP: DP-completi; DP = {A ∩ B : A ∈ NP, B ∈ coNP}",
  "ok",
  "Definizione di DP, SAT-UNSAT e EXACT TSP DP-completi: slide Lezione 9; SAT-UNSAT anche nella dispensa cap. 22. La riduzione della dispensa che rende EXACT TSP NP-hard (cap. 15) va corretta."
 ],
 [
  "QSATᵢ: Σᵢᴾ-completo, il complemento Πᵢᴾ-completo",
  "ok",
  "Slide Lezione 9 e dispensa cap. 22."
 ],
 [
  "QSAT, GEOGRAPHY: PSPACE-completi, quindi hard anche per le classi inferiori",
  "ok",
  "Slide Lezione 9, dispensa cap. 19 e 22. Un problema completo per PSPACE è hard per ogni classe contenuta in PSPACE."
 ],
 [
  "SCHÖNFINKEL-BERNAYS SAT, SUCCINCT CIRCUIT SAT: NEXP-completi",
  "ok",
  "Dispensa cap. 13.6 e cap. 22; appunti Lezione 10 §6."
 ],
 [
  "Validità del primo ordine: RE ∖ R",
  "ok",
  "Dispensa cap. 22 (anche la soddisfacibilità: coRE ∖ R); appunti Lezione 10 §7."
 ]
];
