/* Dati delle classi, generati dalla pagina interattiva "Gerarchia delle classi" (v9). Testo in HTML: i segnaposto {{ID}} diventano link alla classe. */
export const IDS = [
 "L",
 "NL",
 "P",
 "NPcapcoNP",
 "NP",
 "coNP",
 "DP",
 "DELTA2",
 "SIGMA2",
 "PI2",
 "SIGMAi",
 "PIi",
 "PH",
 "PSPACE",
 "EXP",
 "NEXP",
 "R",
 "RE",
 "coRE"
] as const;
export type ClassId = (typeof IDS)[number];
/** nome con pedici in HTML */
export const NAME: Record<ClassId, string> = {
 "L": "L",
 "NL": "NL",
 "P": "P",
 "NPcapcoNP": "NP ∩ coNP",
 "NP": "NP",
 "coNP": "coNP",
 "DP": "DP",
 "DELTA2": "Δ<sub>2</sub><sup>P</sup>",
 "SIGMA2": "Σ<sub>2</sub><sup>P</sup>",
 "PI2": "Π<sub>2</sub><sup>P</sup>",
 "SIGMAi": "Σ<sub>i</sub><sup>P</sup>",
 "PIi": "Π<sub>i</sub><sup>P</sup>",
 "PH": "PH",
 "PSPACE": "PSPACE",
 "EXP": "EXP",
 "NEXP": "NEXP",
 "R": "R",
 "RE": "RE",
 "coRE": "coRE"
};
/** nome in testo semplice (Unicode) */
export const PLAIN: Record<ClassId, string> = {
 "L": "L",
 "NL": "NL",
 "P": "P",
 "NPcapcoNP": "NP ∩ coNP",
 "NP": "NP",
 "coNP": "coNP",
 "DP": "DP",
 "DELTA2": "Δ₂ᴾ (P^NP)",
 "SIGMA2": "Σ₂ᴾ (NP^NP)",
 "PI2": "Π₂ᴾ (coNP^NP)",
 "SIGMAi": "Σᵢᴾ (i ≥ 3)",
 "PIi": "Πᵢᴾ (i ≥ 3)",
 "PH": "PH",
 "PSPACE": "PSPACE",
 "EXP": "EXP",
 "NEXP": "NEXP",
 "R": "R",
 "RE": "RE",
 "coRE": "coRE"
};
/** posizione del centro del riquadro nella mappa SVG (viewBox 760 × 1250) */
export const POS: Record<ClassId, [number, number]> = {
 "RE": [
  275,
  60
 ],
 "coRE": [
  465,
  60
 ],
 "R": [
  370,
  150
 ],
 "NEXP": [
  370,
  240
 ],
 "EXP": [
  370,
  320
 ],
 "PSPACE": [
  370,
  400
 ],
 "PH": [
  370,
  480
 ],
 "SIGMAi": [
  285,
  560
 ],
 "PIi": [
  455,
  560
 ],
 "SIGMA2": [
  285,
  640
 ],
 "PI2": [
  455,
  640
 ],
 "DELTA2": [
  370,
  720
 ],
 "DP": [
  370,
  800
 ],
 "NP": [
  285,
  880
 ],
 "coNP": [
  455,
  880
 ],
 "NPcapcoNP": [
  370,
  960
 ],
 "P": [
  370,
  1040
 ],
 "NL": [
  370,
  1120
 ],
 "L": [
  370,
  1200
 ]
};
/** larghezza del riquadro nella mappa */
export const NODE_W: Record<ClassId, number> = {
 "L": 170,
 "NL": 170,
 "P": 170,
 "NPcapcoNP": 170,
 "NP": 150,
 "coNP": 150,
 "DP": 170,
 "DELTA2": 170,
 "SIGMA2": 150,
 "PI2": 150,
 "SIGMAi": 150,
 "PIi": 150,
 "PH": 170,
 "PSPACE": 170,
 "EXP": 170,
 "NEXP": 170,
 "R": 170,
 "RE": 150,
 "coRE": 150
};
export const NODE_H = 52;
export const ALIAS: Partial<Record<ClassId, string>> = {
 "P": "= Σ₀ᴾ = Δ₁ᴾ",
 "NP": "= Σ₁ᴾ",
 "coNP": "= Π₁ᴾ",
 "NL": "= coNL",
 "PSPACE": "= NPSPACE",
 "DELTA2": "= P^NP",
 "SIGMA2": "= NP^NP",
 "PI2": "= coNP^NP",
 "SIGMAi": "piani i ≥ 3",
 "PIi": "piani i ≥ 3",
 "R": "decidibili",
 "RE": "semidecidibili",
 "coRE": "complementi di RE",
 "NPcapcoNP": "prove corte in entrambi i versi",
 "DP": "NP ∧ coNP",
 "PH": "⋃ Σᵢᴾ",
 "EXP": "tempo 2^poly",
 "NEXP": "nondet. 2^poly",
 "L": "spazio log n"
};
export const CO: Record<ClassId, ClassId | null> = {
 "NP": "coNP",
 "coNP": "NP",
 "SIGMA2": "PI2",
 "PI2": "SIGMA2",
 "SIGMAi": "PIi",
 "PIi": "SIGMAi",
 "RE": "coRE",
 "coRE": "RE",
 "L": "L",
 "NL": "NL",
 "P": "P",
 "NPcapcoNP": "NPcapcoNP",
 "DELTA2": "DELTA2",
 "PH": "PH",
 "PSPACE": "PSPACE",
 "EXP": "EXP",
 "R": "R",
 "DP": null,
 "NEXP": null
};
/** inclusioni dimostrate A ⊆ B, come [A, B, motivo, fonte] */
export const INC: [ClassId, ClassId, string, string][] = [
 [
  "L",
  "NL",
  "una macchina deterministica è una nondeterministica con una sola scelta",
  "Lez. 5 §9, Teorema 7.4(a); dispensa cap. 11"
 ],
 [
  "NL",
  "P",
  "NSPACE(log n) ⊆ TIME(k^(log n + log n)): reachability method sul grafo delle configurazioni, che ha un numero polinomiale di nodi",
  "Teorema 7.4(c), dispensa cap. 11; slide Lez. 5"
 ],
 [
  "P",
  "NPcapcoNP",
  "P ⊆ NP e P è chiusa per complemento, quindi P ⊆ coNP",
  "dispensa cap. 14, Proposizione"
 ],
 [
  "NPcapcoNP",
  "NP",
  "per definizione di intersezione",
  ""
 ],
 [
  "NPcapcoNP",
  "coNP",
  "per definizione di intersezione",
  ""
 ],
 [
  "NP",
  "DP",
  "si prende L₂ = Σ* (tutte le stringhe), che sta in coNP",
  "appunti Lez. 9 §1"
 ],
 [
  "coNP",
  "DP",
  "si prende L₁ = Σ*, che sta in NP",
  "appunti Lez. 9 §1"
 ],
 [
  "DP",
  "DELTA2",
  "bastano due domande all'oracolo NP: x ∈ L₁? e x ∈ L₂?",
  "dispensa cap. 16: «Obviously DP ⊆ P^NP»"
 ],
 [
  "DELTA2",
  "SIGMA2",
  "una macchina deterministica è un caso particolare di nondeterministica",
  "dispensa cap. 17; appunti Lez. 9 §3"
 ],
 [
  "DELTA2",
  "PI2",
  "Δ₂ᴾ è chiusa per complemento ed è contenuta in Σ₂ᴾ",
  "appunti Lez. 9 §3"
 ],
 [
  "SIGMA2",
  "SIGMAi",
  "ogni piano contiene i piani precedenti",
  "dispensa cap. 17"
 ],
 [
  "SIGMA2",
  "PIi",
  "ogni piano contiene i piani precedenti",
  "dispensa cap. 17"
 ],
 [
  "PI2",
  "SIGMAi",
  "ogni piano contiene i piani precedenti",
  "dispensa cap. 17"
 ],
 [
  "PI2",
  "PIi",
  "ogni piano contiene i piani precedenti",
  "dispensa cap. 17"
 ],
 [
  "SIGMAi",
  "PH",
  "PH è l'unione di tutti i piani",
  "dispensa cap. 17"
 ],
 [
  "PIi",
  "PH",
  "PH è l'unione di tutti i piani (Πᵢᴾ ⊆ Σᵢ₊₁ᴾ)",
  "dispensa cap. 17"
 ],
 [
  "PH",
  "PSPACE",
  "ogni piano si decide in spazio polinomiale",
  "dispensa cap. 17.1, Proposizione «PH ⊆ PSPACE»"
 ],
 [
  "PSPACE",
  "EXP",
  "SPACE(f) ⊆ TIME(k^f): si contano le configurazioni",
  "dispensa cap. 10; slide Lez. 5"
 ],
 [
  "EXP",
  "NEXP",
  "deterministico ⊆ nondeterministico",
  "appunti Lez. 10 §4"
 ],
 [
  "NEXP",
  "R",
  "una macchina con un budget di tempo si ferma sempre, quindi decide il suo linguaggio",
  "appunti Lez. 10 §4 («ogni k-EXP sta in R»)"
 ],
 [
  "R",
  "RE",
  "se M decide L, la si modifica perché diverga invece di rispondere no",
  "dispensa cap. 1.5, Proposizione"
 ],
 [
  "R",
  "coRE",
  "R è chiusa per complemento e R ⊆ RE",
  "appunti Lez. 10 §7 (R = RE ∩ coRE)"
 ]
];
/** inclusioni strette dimostrate: [A, B, motivo, fonte, ricavata] */
export const STRICT: [ClassId, ClassId, string, string, boolean][] = [
 [
  "P",
  "EXP",
  "teorema di gerarchia per il tempo",
  "dispensa cap. 7 «Separation of P and EXP»; slide Lez. 5",
  false
 ],
 [
  "L",
  "PSPACE",
  "teorema di gerarchia per lo spazio: SPACE(log n) ⊊ SPACE(log n · log log n) ⊆ PSPACE",
  "appunti Lez. 5 §6 (dalla dispensa cap. 7)",
  false
 ],
 [
  "NL",
  "PSPACE",
  "Savitch: NL ⊆ SPACE(log² n), e per la gerarchia di spazio SPACE(log² n) ⊊ PSPACE",
  "appunti Lez. 5, Mappa riassuntiva",
  false
 ],
 [
  "NP",
  "NEXP",
  "gerarchia nondeterministica: NP ⊆ NTIME(2ⁿ) ⊊ NTIME(2^(n²)) ⊆ NEXP",
  "appunti Lez. 5 §7 e Lez. 10 §4 ✱: la dispensa (cap. 8) e le slide danno la gerarchia nondeterministica solo tra polinomi, NTIME(n^c) ⊊ NTIME(n^d); il passo NTIME(2ⁿ) ⊊ NTIME(2^(n²)) viene dagli appunti",
  false
 ],
 [
  "R",
  "RE",
  "la validità del primo ordine sta in RE ma non in R",
  "dispensa cap. 22; appunti Lez. 10 §7",
  false
 ],
 [
  "R",
  "coRE",
  "la soddisfacibilità del primo ordine sta in coRE ma non in R",
  "dispensa cap. 22; appunti Lez. 10 §7",
  false
 ],
 [
  "NEXP",
  "R",
  "NEXP ⊆ EXPSPACE ⊆ 2-EXP ⊊ 3-EXP ⊆ R, e la gerarchia di tempo separa 2-EXP da 3-EXP",
  "ricavata dagli appunti Lez. 10 §4",
  true
 ]
];
/** parentesi laterali nella mappa: [A, B, lato, x, dA, dB] */
export const SEP_DRAW: [ClassId, ClassId, "left" | "right", number, number, number][] = [
 [
  "L",
  "PSPACE",
  "left",
  62,
  0,
  10
 ],
 [
  "NL",
  "PSPACE",
  "left",
  100,
  0,
  -10
 ],
 [
  "NP",
  "NEXP",
  "left",
  150,
  0,
  0
 ],
 [
  "P",
  "EXP",
  "right",
  612,
  0,
  0
 ]
];
export const HASSE_STRICT = new Set<string>([
 "NEXP>R",
 "R>RE",
 "R>coRE"
]);
export const NOBADGE = new Set<string>([
 "SIGMA2>PIi",
 "PI2>SIGMAi"
]);
export type ClassContent = { full: string; intu: string; def: string; ex: string; exam: string; complete: string; trap?: string; extra?: string; closed: string; form: string; src: string };
export const C: Record<ClassId, ClassContent> = {
 "L": {
  "full": "Spazio logaritmico deterministico",
  "intu": "Una macchina <b>deterministica</b> che può rileggere l'input quante volte vuole, ma non scriverci, e che come memoria di lavoro ha solo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">O(log n)</span> celle. Bastano per tenere un numero fisso di contatori o di posizioni nell'input, non per copiarlo. Con un input di un milione di simboli, <span class=\"font-mono text-[0.86em] whitespace-nowrap\">log₂ n ≈ 20</span>: una ventina di bit per contatore.",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">L = SPACE(log n)</div><p class=\"text-[0.92rem] text-muted\">Si usa la MdT <i>con input e output</i>: il nastro di input è di sola lettura, quello di output di sola scrittura, e lo spazio si conta solo sui nastri di lavoro (dispensa §2.6). Il budget è <span class=\"font-mono text-[0.86em] whitespace-nowrap\">f(n) = log n</span>.</p>",
  "ex": "<p><b>PALINDROMI sta in L</b> (dispensa §2.6). La macchina tiene due contatori in binario: la posizione <span class=\"font-mono text-[0.86em] whitespace-nowrap\">i</span> e la sua posizione a specchio <span class=\"font-mono text-[0.86em] whitespace-nowrap\">n+1−i</span>. Confronta <span class=\"font-mono text-[0.86em] whitespace-nowrap\">x<sub>i</sub></span> con <span class=\"font-mono text-[0.86em] whitespace-nowrap\">x<sub>n+1−i</sub></span> per <span class=\"font-mono text-[0.86em] whitespace-nowrap\">i = 1, 2, …</span></p><p>Su <span class=\"font-mono text-[0.86em] whitespace-nowrap\">x = 0110</span>: confronta <span class=\"font-mono text-[0.86em] whitespace-nowrap\">x₁ = 0</span> con <span class=\"font-mono text-[0.86em] whitespace-nowrap\">x₄ = 0</span>, poi <span class=\"font-mono text-[0.86em] whitespace-nowrap\">x₂ = 1</span> con <span class=\"font-mono text-[0.86em] whitespace-nowrap\">x₃ = 1</span>, e risponde sì. Ogni contatore arriva al più a <span class=\"font-mono text-[0.86em] whitespace-nowrap\">n</span>, quindi occupa <span class=\"font-mono text-[0.86em] whitespace-nowrap\">log n + 1</span> celle.</p>",
  "exam": "<p>L sta in fondo alla catena {{L}} ⊆ {{NL}} ⊆ {{P}} ⊆ {{NP}} ⊆ {{PSPACE}}. L'unica separazione nota che la riguarda è <b>L ⊊ PSPACE</b>. Se L = NL o L = P non si sa.</p><p>Domanda tipica: «coNP non è strettamente contenuto in L?». SÌ: L ⊆ P ⊆ coNP, quindi coNP non può stare <i>strettamente</i> dentro L.</p>",
  "complete": "Data complexity delle query (query fissata, input = database): L-completa (dispensa cap. 18).",
  "closed": "sì (classe deterministica)",
  "form": "nessuna forma a quantificatori; macchina deterministica in spazio log n",
  "src": "dispensa §2.6 e cap. 5; slide Lez. 4; appunti Lez. 2–3"
 },
 "NL": {
  "full": "Spazio logaritmico nondeterministico",
  "intu": "Come L, ma la macchina può fare <b>scelte nondeterministiche</b> e risponde sì se almeno un run accetta. In memoria tiene solo dove si trova e indovina dove andare. È la classe tipica della raggiungibilità in un grafo.",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">NL = NSPACE(log n)</div><p class=\"text-[0.92rem] text-muted\">MdT nondeterministica con input e output, budget di spazio <span class=\"font-mono text-[0.86em] whitespace-nowrap\">log n</span> sui nastri di lavoro: <span class=\"font-mono text-[0.86em] whitespace-nowrap\">x</span> sta nel linguaggio se e solo se almeno un run accetta.</p>",
  "ex": "<p><b>REACHABILITY sta in NL</b> (appunti Lez. 3). Grafo con archi 1→2, 1→3, 2→4: c'è un cammino da 1 a 4?</p><p>La macchina tiene sul nastro il nodo corrente (1), indovina il prossimo (2) e controlla nella matrice che l'arco ci sia, poi indovina 4 e accetta. In ogni momento ha in memoria due numeri tra 1 e <span class=\"font-mono text-[0.86em] whitespace-nowrap\">n</span>: <span class=\"font-mono text-[0.86em] whitespace-nowrap\">O(log n)</span> celle.</p>",
  "exam": "<p>{{L}} ⊆ NL ⊆ {{P}}, e <b>NL ⊊ PSPACE</b>. Per Savitch NL ⊆ SPACE(log² n). Le domande su riduzioni con 2-SAT si risolvono sapendo che 2-SAT è NL-completo (dagli appunti ✱: la dispensa dice solo che sta in P).</p><p>Esempio (GE23, soluzione negli appunti): GEOGRAPHY non si riduce a 2-SAT, perché darebbe PSPACE ⊆ NL, contro NL ⊊ PSPACE.</p>",
  "complete": "REACHABILITY e 2-SAT sono NL-completi (appunti Lez. 8 §3; Lez. 10 §8). <span class=\"inline-block rounded-full px-2.5 py-0.5 font-ui text-xs font-semibold bg-accent-soft text-accent\" title=\"Negli appunti delle lezioni, non in dispensa né nelle slide disponibili\">✱ solo appunti</span> La dispensa dà solo REACHABILITY ∈ NL e, per Savitch, ∈ SPACE(log² n).",
  "closed": "sì: NL = coNL",
  "form": "un run che accetta, con memoria log n",
  "trap": "La dispensa (cap. 14 e 22) scrive «2-SAT is P-complete»: non è dimostrato. Il cap. 12 dice solo «2-SAT is in P»; la NL-completezza viene dagli appunti ✱, non da dispensa o slide. Con riduzioni in spazio logaritmico 2-SAT sarebbe P-completo solo se P = NL, che è aperto: all'esame «2-SAT è P-completo?» ha risposta «altro: solo se P = NL».",
  "extra": "<div class=\"border-l-2 border-ok bg-ok-soft px-3 py-2 rounded-r-lg text-[0.93rem]\"><b>NL = coNL.</b> Le slide della Lez. 4 dicono che per lo spazio nondeterministico la chiusura per complemento si dimostra; per il tempo nondeterministico (NP contro coNP) è aperta.</div><div class=\"border-l-2 border-accent bg-accent-soft/50 px-3 py-2 rounded-r-lg text-[0.93rem]\"><b>Aggiunta esterna.</b> Il risultato si chiama Teorema di Immerman–Szelepcsényi (Papadimitriou, Teorema 7.6): il nome non è nelle slide.</div>",
  "src": "dispensa cap. 5 e 11; slide Lez. 4–5; appunti Lez. 3, 5 §10, 8 §3"
 },
 "P": {
  "full": "Tempo polinomiale deterministico",
  "intu": "I problemi <b>trattabili</b>: una macchina deterministica li risolve in un numero di passi che cresce come un polinomio nella lunghezza dell'input. Raddoppiando l'input, un algoritmo in tempo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">n³</span> diventa 8 volte più lento, non \"al quadrato\".",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">P = ⋃<sub>k&gt;0</sub> TIME(n<sup>k</sup>)</div><p class=\"text-[0.92rem] text-muted\">In parole: P raccoglie i problemi che hanno un algoritmo con budget di tempo <span class=\"font-mono text-[0.86em] whitespace-nowrap\">n<sup>k</sup></span> per qualche costante <span class=\"font-mono text-[0.86em] whitespace-nowrap\">k</span> (dispensa cap. 5).</p>",
  "ex": "<p><b>2-COLORING sta in P</b> (dispensa cap. 13, nella prova di 3-COLORING: «The 2-COLORING problem is in P»). Si colora un nodo; i suoi vicini sono obbligati ad avere l'altro colore, i loro vicini il primo, e così via. Si fallisce solo se si trova un ciclo di lunghezza dispari.</p><p>Un triangolo non è 2-colorabile (il terzo nodo tocca entrambi i colori), un quadrato sì. Con 3 colori le scelte non sono più obbligate e il problema diventa NP-completo.</p>",
  "exam": "<p>P è chiusa per complemento, P ⊆ {{NPcapcoNP}} e <b>P ⊊ EXP</b>, l'unica separazione dimostrata tra classi di tempo deterministico vicine a P.</p><p>Domanda tipica: «MAX FLOW è EXP-hard?» NO: darebbe EXP ⊆ P, contro P ⊊ EXP (Lez. 11 §3).</p>",
  "complete": "MAX FLOW è P-completo (dispensa cap. 22). CIRCUIT VALUE e HORNSAT P-completi stanno negli appunti Lez. 7 §8 e Lez. 8 <span class=\"inline-block rounded-full px-2.5 py-0.5 font-ui text-xs font-semibold bg-accent-soft text-accent\" title=\"Negli appunti delle lezioni, non in dispensa né nelle slide disponibili\">✱ solo appunti</span>. PRIMES ∈ P (dispensa cap. 22), ma non è noto se sia P-completo.",
  "closed": "sì (classe deterministica)",
  "form": "P = Σ₀ᴾ = Δ₁ᴾ: nessun quantificatore, solo un controllo polinomiale",
  "src": "dispensa cap. 5, 7, 22; slide Lez. 4–5; appunti Lez. 1, 7, 8"
 },
 "NPcapcoNP": {
  "full": "NP ∩ coNP: problemi con una prova corta in entrambi i versi",
  "intu": "Ogni istanza ha una prova corta: un <b>certificato</b> se la risposta è sì, una <b>squalifica</b> se è no. Non è definita da un tipo di macchina: è l'intersezione di due classi, cioè i problemi che stanno <i>sia</i> in NP <i>sia</i> in coNP.",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">L ∈ NP ∩ coNP ⇔ L ∈ NP e L ∈ coNP</div><p class=\"text-[0.92rem] text-muted\">Si interseca a livello di <b>classi</b>: è il problema stesso a stare in tutte e due (dispensa cap. 14).</p>",
  "ex": "<p><b>2-COLORING</b> (che sta in P): se il grafo è 2-colorabile, il certificato è la colorazione; se non lo è, la squalifica è un ciclo dispari. Entrambi si controllano in tempo polinomiale.</p><p>Per il quadrato a–b–c–d il certificato è \"a, c rossi; b, d blu\"; per il triangolo la squalifica è il ciclo a–b–c, lungo 3.</p>",
  "exam": "<p>Serve soprattutto per non confonderla con {{DP}}: NP ∩ coNP sta <b>sotto</b> {{NP}} e {{coNP}}, DP sta <b>sopra</b>. La dispensa dice che esistono problemi in NP ∩ coNP non noti in P; non se ne conoscono di completi.</p>",
  "complete": "Non se ne conoscono: NP ∩ coNP non è una classe \"sintattica\" come DP.",
  "closed": "sì (l'intersezione di una classe con la sua co-classe)",
  "form": "sia ∃y R(x,y) sia ∀y R'(x,y), con due relazioni diverse",
  "src": "dispensa cap. 14; appunti Lez. 4 §7, Lez. 8 §8, Lez. 9 §1"
 },
 "NP": {
  "full": "Tempo polinomiale nondeterministico",
  "intu": "I problemi in cui una risposta sì ha un <b>certificato corto</b>, che si controlla in tempo polinomiale. Trovare il certificato può essere difficile, controllarlo è facile: come la combinazione di una cassaforte, che si verifica subito se qualcuno te la dice.",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">NP = ⋃<sub>k&gt;0</sub> NTIME(n<sup>k</sup>)</div><div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">L ∈ NP ⇔ L = { x : ∃y (x, y) ∈ R }</div><p class=\"text-[0.92rem] text-muted\">con R decidibile in tempo polinomiale e bilanciata (|y| polinomiale in |x|): \"esiste un certificato y che supera il controllo\" (Proposizione 9.1, dispensa cap. 13).</p>",
  "ex": "<p><b>SAT</b>: <span class=\"font-mono text-[0.86em] whitespace-nowrap\">φ = (p ∨ q) ∧ ¬p</span>. Il certificato è l'assegnamento \"p falsa, q vera\". Il controllo: <span class=\"font-mono text-[0.86em] whitespace-nowrap\">(falso ∨ vero) ∧ vero = vero</span>, in tempo lineare nella lunghezza della formula.</p>",
  "exam": "<p>{{P}} ⊆ NP ⊆ {{PSPACE}} e <b>NP ⊊ NEXP</b>. P = NP? e NP = coNP? sono aperte. Se P = NP allora NP = coNP, PH = P ed EXP = NEXP (padding, Lez. 10 §5).</p><p>Domanda tipica (F07): «CLIQUE ∈ Σ₁ᴾ?» SÌ, perché Σ₁ᴾ = NP e CLIQUE è NP-completo.</p>",
  "complete": "SAT = QSAT₁ (Cook-Levin), 3-SAT, CLIQUE, INDEPENDENT SET, NODE COVER, HAMILTON PATH, TSP(D), 3-COLORING, KNAPSACK e gli altri della Lez. 8.",
  "closed": "non si sa (NP = coNP è aperto)",
  "form": "NP = Σ₁ᴾ: ∃y R(x,y)",
  "src": "dispensa cap. 3, 5, 12–13, 22; appunti Lez. 3, 7, 8"
 },
 "coNP": {
  "full": "Complementi dei problemi NP",
  "intu": "I complementi dei problemi di NP: qui è la risposta <b>no</b> ad avere una prova corta (una squalifica). Per dire sì bisogna escludere <i>tutti</i> i possibili certificati. Attenzione: coNP non vuol dire \"fuori da NP\".",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">coNP = { L : il complemento di L sta in NP }</div><div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">L ∈ coNP ⇔ L = { x : ∀y (x, y) ∈ R }</div><p class=\"text-[0.92rem] text-muted\">con R polinomiale e bilanciata: \"ogni candidato y supera il controllo\" (dispensa cap. 14, Corollario 1 del cap. 17).</p>",
  "ex": "<p><b>VALIDITY</b>: <span class=\"font-mono text-[0.86em] whitespace-nowrap\">p ∨ ¬p</span> è valida, vera sia con p vera sia con p falsa. <span class=\"font-mono text-[0.86em] whitespace-nowrap\">p ∨ q</span> non è valida: la squalifica è \"p falsa, q falsa\", che la rende falsa.</p>",
  "exam": "<p>{{P}} ⊆ coNP ⊆ {{PSPACE}}. Se un problema NP-completo stesse in coNP, avremmo NP = coNP (Prop. D, dispensa cap. 14), e PH collasserebbe al primo livello.</p><p>Domanda tipica (F14): «TSP(D) è Π₁ᴾ-hard?» altro: solo se NP = coNP.</p>",
  "complete": "VALIDITY, UNSAT (= co-QSAT₁), i complementi di HAMILTON PATH e TSP(D): coNP-completi (Prop. B: il complemento di un NP-completo è coNP-completo).",
  "closed": "è la co-classe di NP",
  "form": "coNP = Π₁ᴾ: ∀y R(x,y)",
  "trap": "Nel cap. 22 della dispensa «HAMILTON PATH / TSP(D) is coNP-complete» ha la barra di complemento sopra il nome, che si perde copiando il testo: lì è giusto.",
  "src": "dispensa cap. 6, 14, 22; slide Lez. 4; appunti Lez. 4 §7, Lez. 8 §8"
 },
 "DP": {
  "full": "Intersezione di un problema NP e di un problema coNP",
  "intu": "Rispondere sì richiede di superare <b>due controlli insieme</b> sulla stessa istanza: uno di tipo NP (\"esiste…\") e uno di tipo coNP (\"non esiste…\"). È la classe naturale delle versioni <i>esatte</i> dei problemi di ottimizzazione. <b>Non</b> vuol dire \"deterministic polynomial\".",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">L ∈ DP ⇔ esistono L₁ ∈ NP e L₂ ∈ coNP con L = L₁ ∩ L₂</div><p class=\"text-[0.92rem] text-muted\">Qui si intersecano due <b>linguaggi</b>: le istanze sì di L sono quelle che stanno sia in L₁ sia in L₂ (dispensa cap. 15).</p>",
  "ex": "<p><b>EXACT TSP</b>: l'ottimo vale esattamente B? Con tre giri possibili di costo 10, 12 e 15:</p><ul class=\"list-disc pl-5 flex flex-col gap-1.5\"><li>B = 10: c'è un giro di costo ≤ 10 (controllo NP) e nessuno sotto 10 (controllo coNP), quindi <b>sì</b>;</li><li>B = 12: c'è un giro ≤ 12, ma il giro da 10 costa meno di 12, quindi <b>no</b>.</li></ul><p>Apri «Prova i due controlli di DP» per cambiare B.</p>",
  "exam": "<p>{{NP}} ∪ {{coNP}} ⊆ DP ⊆ {{DELTA2}}; nessuna di queste inclusioni è dimostrata stretta. Le slide dicono che è plausibile che DP non stia nemmeno in NP ∪ coNP.</p><p>Domanda tipica (GE23): «EXACT TSP è Σ₂ᴾ-hard?» altro: solo se DP = Σ₂ᴾ.</p>",
  "complete": "SAT-UNSAT ed EXACT TSP sono DP-completi.",
  "closed": "non si sa (il complemento di L₁ ∩ L₂ è un'unione)",
  "form": "∃y R₁(x,y) e insieme ∀z R₂(x,z)",
  "trap": "DP interseca due linguaggi; NP ∩ coNP interseca due classi. NP e coNP sono contenute in DP.",
  "src": "dispensa cap. 15–16; slide Lez. 9; appunti Lez. 9 §1–§2"
 },
 "DELTA2": {
  "full": "Tempo polinomiale con un oracolo NP (P^NP)",
  "intu": "Un algoritmo deterministico polinomiale che può fare domande a un <b>oracolo</b> per SAT: ogni risposta arriva in un passo. Può farne molte (un numero polinomiale) e scegliere ogni domanda in base alle risposte precedenti.",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">Δ<sub>2</sub><sup>P</sup> = P<sup>Σ<sub>1</sub><sup>P</sup></sup> = P<sup>NP</sup> = P<sup>SAT</sup></div><div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">in generale: Δ<sub>i+1</sub><sup>P</sup> = P<sup>Σ<sub>i</sub><sup>P</sup></sup></div><p class=\"text-[0.92rem] text-muted\">Per ogni oracolo NP-completo L vale P<sup>L</sup> = P<sup>SAT</sup>, e un oracolo coNP vale quanto uno NP (dispensa cap. 16).</p>",
  "ex": "<p>\"Il giro ottimo costa un numero pari?\" (appunti Lez. 9 §3). Si trova l'ottimo per bisezione, chiedendo a TSP(D) \"c'è un giro di costo ≤ B?\" con B dimezzato a ogni passo, poi si guarda se è pari. Le domande sono logaritmiche nel costo massimo, quindi polinomiali.</p><p>Anche ogni problema di DP sta qui: bastano due domande, \"x ∈ L₁?\" e \"x ∈ L₂?\".</p>",
  "exam": "<p>Δ₂ᴾ sta <b>tra il piano 1 e il piano 2</b>: {{NP}} ∪ {{coNP}} ⊆ {{DP}} ⊆ Δ₂ᴾ ⊆ {{SIGMA2}} ∩ {{PI2}}. Ogni inclusione ha un motivo semplice:</p><ul class=\"list-disc pl-5 flex flex-col gap-1.5\"><li><b>NP ⊆ Δ₂ᴾ</b>: si fa una sola domanda all'oracolo e si copia la risposta.</li><li><b>coNP ⊆ Δ₂ᴾ</b>: si chiede all'oracolo il complemento (un problema NP) e si inverte la risposta.</li><li><b>DP ⊆ Δ₂ᴾ</b>: bastano due domande, una per la parte NP e una per la parte coNP.</li><li><b>Δ₂ᴾ ⊆ Σ₂ᴾ = NP<sup>NP</sup></b>: l'oracolo è lo stesso, e una macchina deterministica è una macchina nondeterministica che non usa le scelte.</li><li><b>Δ₂ᴾ ⊆ Π₂ᴾ</b>: Δ₂ᴾ è chiusa per complemento. Se L ∈ Δ₂ᴾ, anche co-L ∈ Δ₂ᴾ ⊆ Σ₂ᴾ, quindi L ∈ Π₂ᴾ.</li></ul><p>Lo schema si ripete a ogni piano: Σᵢᴾ ∪ Πᵢᴾ ⊆ Δᵢ₊₁ᴾ ⊆ Σᵢ₊₁ᴾ ∩ Πᵢ₊₁ᴾ. Quindi una classe di un piano sta in <b>tutte</b> le classi dei piani sopra, sia Σ sia Π.</p><p>Domanda tipica (F07): «SAT-UNSAT si riduce a co-QSAT₃?» SÌ. SAT-UNSAT ∈ DP ⊆ Δ₂ᴾ ⊆ Π₂ᴾ ⊆ Δ₃ᴾ ⊆ Π₃ᴾ, e co-QSAT₃ è Π₃ᴾ-completo: ogni problema di Π₃ᴾ si riduce a lui, SAT-UNSAT compreso.</p>",
  "complete": "Il corso non presenta problemi Δ₂ᴾ-completi.",
  "closed": "sì (macchina deterministica: si scambiano yes e no)",
  "form": "nessuna forma a quantificatori: sta tra due piani",
  "src": "dispensa cap. 16–17; slide Lez. 9; appunti Lez. 9 §2–§3"
 },
 "SIGMA2": {
  "full": "Secondo piano di PH, lato ∃ (NP^NP)",
  "intu": "\"Esiste una scelta tale che, <b>per ogni</b> contromossa, il controllo passa\": un certificato che deve resistere a tutti i controesempi. La macchina NP indovina il certificato, l'oracolo NP verifica che non esistano controesempi.",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">Σ<sub>2</sub><sup>P</sup> = NP<sup>NP</sup></div><div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">L ∈ Σ<sub>2</sub><sup>P</sup> ⇔ L = { x : ∃y₁ ∀y₂ (x, y₁, y₂) ∈ R }</div><p class=\"text-[0.92rem] text-muted\">con R polinomiale e bilanciata (Teorema 17.8 e Corollario 2, dispensa cap. 17).</p>",
  "ex": "<p><span class=\"font-mono text-[0.86em] whitespace-nowrap\">∃p ∀q. p ∨ q</span> è vera: con p vera la formula è vera per ogni q.</p><p>La macchina NP<sup>NP</sup> indovina p, poi chiede all'oracolo SAT se <span class=\"font-mono text-[0.86em] whitespace-nowrap\">¬(p ∨ q)</span> è soddisfacibile. Con p vera la risposta è no, e il ramo accetta.</p>",
  "exam": "<p>{{DELTA2}} ⊆ Σ₂ᴾ ⊆ {{PH}} ⊆ {{PSPACE}}. Se Σ₂ᴾ = Π₂ᴾ, PH collassa al secondo livello (Teorema 17.9).</p><p>Domanda tipica (F07): «2-EXP ⊆ Σ₂ᴾ?» NO: Σ₂ᴾ ⊆ PSPACE ⊆ EXP ⊊ 2-EXP.</p>",
  "complete": "QSAT₂, CIRC SAT (circoscrizione) e STRATEGIC COMPANIES sono Σ₂ᴾ-completi.",
  "closed": "non si sa (il complemento è Π₂ᴾ)",
  "form": "∃y₁ ∀y₂ R",
  "src": "dispensa cap. 17; slide Lez. 9; appunti Lez. 9 §3–§5"
 },
 "PI2": {
  "full": "Secondo piano di PH, lato ∀ (coNP^NP)",
  "intu": "\"Per ogni scelta dell'avversario <b>esiste</b> una risposta che fa passare il controllo\". Sono i complementi dei problemi di Σ₂ᴾ.",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">Π<sub>2</sub><sup>P</sup> = coNP<sup>NP</sup> = coΣ<sub>2</sub><sup>P</sup></div><div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">L ∈ Π<sub>2</sub><sup>P</sup> ⇔ L = { x : ∀y₁ ∃y₂ (x, y₁, y₂) ∈ R }</div>",
  "ex": "<p><span class=\"font-mono text-[0.86em] whitespace-nowrap\">∀p ∃q. ¬p ∨ q</span> è vera: qualunque sia p, basta prendere q vera.</p>",
  "exam": "<p>{{DELTA2}} ⊆ Π₂ᴾ ⊆ {{PH}}. Domanda tipica (F07): «QSAT ∈ Π₂ᴾ?» altro: solo se PSPACE = Π₂ᴾ, perché QSAT è PSPACE-completo.</p>",
  "complete": "co-QSAT₂, CIRC VALIDITY e il complemento di STRATEGIC COMPANIES sono Π₂ᴾ-completi.",
  "closed": "è la co-classe di Σ₂ᴾ",
  "form": "∀y₁ ∃y₂ R",
  "trap": "La dispensa (cap. 17.2.3) dice «HAMILTON PATH (complemento) è Π₂ᴾ-completo»: non è dimostrato. È coNP-completo; sarebbe Π₂ᴾ-completo solo se NP = coNP. Le risposte SÌ/NO di quell'esercizio restano giuste.",
  "src": "dispensa cap. 17; appunti Lez. 9 §3–§5"
 },
 "SIGMAi": {
  "full": "Un piano qualsiasi di PH sopra il secondo, lato ∃",
  "intu": "Ogni piano aggiunge un blocco di quantificatori: Σᵢᴾ ha <span class=\"font-mono text-[0.86em] whitespace-nowrap\">i</span> blocchi alternati che cominciano con \"esiste\". Nella mappa questo riquadro rappresenta i piani <span class=\"font-mono text-[0.86em] whitespace-nowrap\">i = 3, 4, …</span>",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">Σ<sub>i+1</sub><sup>P</sup> = NP<sup>Σ<sub>i</sub><sup>P</sup></sup></div><div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">L ∈ Σ<sub>i</sub><sup>P</sup> ⇔ L = { x : ∃y₁ ∀y₂ ∃y₃ … Q yᵢ  (x, y₁, …, yᵢ) ∈ R }</div><p class=\"text-[0.92rem] text-muted\">Q è ∃ se i è dispari, ∀ se è pari (Corollario 2, dispensa cap. 17).</p>",
  "ex": "<p><span class=\"font-mono text-[0.86em] whitespace-nowrap\">∃p ∀q ∃r. p ∧ (q ∨ r) ∧ (¬q ∨ ¬r)</span> è vera: si sceglie p vera e, per ogni q, si prende r opposta a q. È un'istanza di QSAT₃.</p>",
  "exam": "<p>I piani sono annidati: Σᵢᴾ ∪ Πᵢᴾ ⊆ Δᵢ₊₁ᴾ ⊆ Σᵢ₊₁ᴾ ∩ Πᵢ₊₁ᴾ. Domanda tipica (G16): «Σ₄ᴾ ⊂ Σ₃ᴾ?» NO: Σ₃ᴾ ⊆ Σ₄ᴾ, e il contenimento stretto opposto è impossibile.</p>",
  "complete": "QSATᵢ è Σᵢᴾ-completo (Teorema 17.10).",
  "closed": "non si sa (il complemento è Πᵢᴾ)",
  "form": "i blocchi ∃∀∃…",
  "src": "dispensa cap. 17; appunti Lez. 9 §3, §5"
 },
 "PIi": {
  "full": "Un piano qualsiasi di PH sopra il secondo, lato ∀",
  "intu": "Come Σᵢᴾ, ma la descrizione comincia con \"per ogni\". Sono i complementi dei problemi di Σᵢᴾ.",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">Π<sub>i</sub><sup>P</sup> = coΣ<sub>i</sub><sup>P</sup></div><div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">L ∈ Π<sub>i</sub><sup>P</sup> ⇔ L = { x : ∀y₁ ∃y₂ ∀y₃ … (x, y₁, …, yᵢ) ∈ R }</div>",
  "ex": "<p><span class=\"font-mono text-[0.86em] whitespace-nowrap\">∀p ∃q ∀r. (p ∨ q ∨ r) ∧ (¬p ∨ ¬q ∨ r)</span> è vera: per ogni p si sceglie q opposta a p, e allora le due clausole sono vere per ogni r.</p>",
  "exam": "<p>Domanda tipica (FE23): «Supponiamo co-QSAT₄ ∈ Σ₃ᴾ. Σ₃ᴾ ≠ Σ₄ᴾ?» NO: Π₄ᴾ ⊆ Σ₃ᴾ fa collassare PH al livello 3, quindi Σ₃ᴾ = Σ₄ᴾ.</p>",
  "complete": "co-QSATᵢ è Πᵢᴾ-completo.",
  "closed": "è la co-classe di Σᵢᴾ",
  "form": "i blocchi ∀∃∀…",
  "src": "dispensa cap. 17; appunti Lez. 9 §3, §5"
 },
 "PH": {
  "full": "Gerarchia polinomiale",
  "intu": "La torre intera: al piano 1 ci sono P, NP e coNP; ogni piano usa come oracolo la classe Σ del piano sotto. Un problema sta in PH se sta in <b>qualche</b> piano, con un numero di alternanze fissato che non dipende dall'input.",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">PH = ⋃<sub>i≥0</sub> Σ<sub>i</sub><sup>P</sup></div><p class=\"text-[0.92rem] text-muted\">con Δ₀ᴾ = Σ₀ᴾ = Π₀ᴾ = P e Δᵢ₊₁ᴾ = P<sup>Σᵢᴾ</sup>, Σᵢ₊₁ᴾ = NP<sup>Σᵢᴾ</sup>, Πᵢ₊₁ᴾ = coNP<sup>Σᵢᴾ</sup> (dispensa cap. 17).</p>",
  "ex": "<p>QSAT₂ sta in PH (piano 2), QSAT₇ pure (piano 7). QSAT, che ammette un numero qualsiasi di alternanze, sta in PSPACE: non si sa se stia in PH.</p>",
  "exam": "<p>{{SIGMAi}} ⊆ PH ⊆ {{PSPACE}}; PH = PSPACE è aperto. La torre è fragile (Teorema 17.9): se Σᵢᴾ = Πᵢᴾ per qualche i, tutto collassa al piano i; NP = coNP darebbe PH = NP.</p><p>Se esistesse un problema PH-completo, o se PH = PSPACE, PH collasserebbe a un livello finito (Teorema 17.11). Domanda tipica (L18): «Se PH = EXP, PH collassa?» SÌ.</p>",
  "complete": "Nessun problema PH-completo noto: se ce ne fosse uno, PH collasserebbe (Teorema 17.11).",
  "closed": "sì (unione dei Σᵢᴾ, che contiene anche tutti i Πᵢᴾ)",
  "form": "un numero fissato (qualsiasi) di blocchi alternati",
  "src": "dispensa cap. 17; slide Lez. 9; appunti Lez. 9 §3, §6"
 },
 "PSPACE": {
  "full": "Spazio polinomiale (= NPSPACE)",
  "intu": "La memoria è polinomiale ma <b>si riusa</b>, quindi il tempo può essere esponenziale. È la classe dei giochi a due giocatori e delle formule quantificate con alternanze illimitate. Il nondeterminismo qui non aggiunge niente (Savitch).",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">PSPACE = ⋃<sub>k&gt;0</sub> SPACE(n<sup>k</sup>) = NPSPACE</div><p class=\"text-[0.92rem] text-muted\">L'uguaglianza viene dal corollario di Savitch: NSPACE(f) ⊆ SPACE(f²), e il quadrato di un polinomio è un polinomio (dispensa cap. 11.1).</p>",
  "ex": "<p><b>QSAT</b>: <span class=\"font-mono text-[0.86em] whitespace-nowrap\">∀p ∃q. (p ∨ q) ∧ (¬p ∨ ¬q)</span>. Si valuta ricorsivamente: per p vera si prova q falsa (vera), per p falsa si prova q vera (vera), quindi la formula è vera.</p><p>La ricorsione è profonda quanto il numero di variabili e riusa lo stesso spazio per ogni ramo: spazio polinomiale, tempo fino a <span class=\"font-mono text-[0.86em] whitespace-nowrap\">2ⁿ</span>.</p>",
  "exam": "<p>{{PH}} ⊆ PSPACE ⊆ {{EXP}}, e <b>L ⊊ PSPACE</b>, <b>NL ⊊ PSPACE</b>. PSPACE = EXP è aperto (molti credono di no).</p><p>Domanda tipica (F13): «PSPACE ⊂ NPSPACE?» NO, sono uguali (Savitch).</p>",
  "complete": "QSAT, GEOGRAPHY e GO sono PSPACE-completi; anche la combined complexity delle query (dispensa cap. 18–19).",
  "closed": "sì (classe deterministica)",
  "form": "alternanze in numero qualsiasi (QSAT)",
  "src": "dispensa cap. 5, 10, 11.1, 17–19; slide Lez. 5, 9; appunti Lez. 5 §10, Lez. 9 §6–§7"
 },
 "EXP": {
  "full": "Tempo esponenziale deterministico",
  "intu": "Tempo esponenziale: abbastanza per provare uno per uno tutti i <span class=\"font-mono text-[0.86em] whitespace-nowrap\">2<sup>poly(n)</sup></span> candidati. Sopra EXP la scala continua (NEXP, EXPSPACE, 2-EXP, …).",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">EXP = ⋃<sub>k&gt;0</sub> TIME(2<sup>n<sup>k</sup></sup>)</div>",
  "ex": "<p>SAT con n variabili si decide provando tutti i <span class=\"font-mono text-[0.86em] whitespace-nowrap\">2ⁿ</span> assegnamenti: con 20 variabili, circa un milione di prove. In generale NTIME(f) ⊆ TIME(k<sup>f</sup>), quindi NP ⊆ EXP.</p>",
  "exam": "<p>{{PSPACE}} ⊆ EXP ⊆ {{NEXP}}, e <b>P ⊊ EXP</b>. Da qui il \"trucco della separazione\": in P ⊆ NP ⊆ PSPACE ⊆ EXP almeno un'inclusione è stretta, ma non si sa quale.</p><p>Domande con k-EXP: EXP ⊊ 2-EXP ⊊ 3-EXP ⊊ … (gerarchia di tempo). Esempio (E26): «3-EXP = PH?» NO.</p>",
  "complete": "Il corso non presenta problemi EXP-completi.",
  "closed": "sì (classe deterministica)",
  "form": "nessuna",
  "src": "dispensa cap. 5, 7, 10; slide Lez. 5; appunti Lez. 5 §5, Lez. 10 §4"
 },
 "NEXP": {
  "full": "Tempo esponenziale nondeterministico",
  "intu": "Certificati lunghi in modo esponenziale, controllati in tempo esponenziale. Succede quando l'input descrive in modo compatto un oggetto enorme, per esempio un circuito piccolo che descrive un grafo di un milione di nodi.",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">NEXP = ⋃<sub>k&gt;0</sub> NTIME(2<sup>n<sup>k</sup></sup>)</div>",
  "ex": "<p><b>SCHÖNFINKEL-BERNAYS SAT</b>: <span class=\"font-mono text-[0.86em] whitespace-nowrap\">∃x ∀y (R(x,y) ∨ x = y)</span> ha solo predicati e i quantificatori ∃ prima dei ∀. Per soddisfarla basta un modello con un elemento a: l'unico y è a, e a = a rende vera la formula.</p>",
  "exam": "<p>{{EXP}} ⊆ NEXP, e <b>NP ⊊ NEXP</b>: un problema NEXP-completo non sta in NP. EXP = NEXP è aperto; se P = NP allora EXP = NEXP (padding, Teorema 20.1).</p><p>Ricetta (Lez. 10 §6) per «un NEXP-completo sta in C?»: SÌ se C contiene NEXP; NO se C sta dentro NP o coNP; altro se C sta dentro NEXP con separazione aperta (PSPACE, EXP, PH).</p>",
  "complete": "SCHÖNFINKEL-BERNAYS SAT e SUCCINCT CIRCUIT SAT sono NEXP-completi.",
  "closed": "non si sa",
  "form": "∃ certificato esponenziale",
  "src": "dispensa cap. 21–22; appunti Lez. 10 §4–§6"
 },
 "R": {
  "full": "Linguaggi ricorsivi (decidibili)",
  "intu": "Esiste una MdT che su ogni input <b>si ferma</b> e risponde sì o no. Tutte le classi sotto, fino a NEXP e oltre, contengono solo problemi decidibili, perché le loro macchine si fermano entro il budget.",
  "def": "<p>L è ricorsivo se esiste una MdT M che lo <i>decide</i>: M(x) = \"yes\" se x ∈ L e M(x) = \"no\" se x ∉ L (dispensa cap. 1.5).</p><div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">R = RE ∩ coRE</div>",
  "ex": "<p>PALINDROMI: la macchina della Lez. 2 si ferma sempre. Il motivo di R = RE ∩ coRE: se un problema sta in entrambe, si fanno girare a turno, un passo ciascuna, la macchina che trova il sì e quella che trova il no; una delle due prima o poi si ferma.</p>",
  "exam": "<p>{{NEXP}} ⊆ R ⊊ {{RE}} e R ⊊ {{coRE}}. All'esame compare con la validità del primo ordine (F06, SE23).</p>",
  "complete": "Non si parla di completezza in R nel corso.",
  "closed": "sì",
  "form": "macchina che si ferma sempre",
  "extra": "<div class=\"border-l-2 border-ok bg-ok-soft px-3 py-2 rounded-r-lg text-[0.93rem]\"><b>Ricavata.</b> NEXP ⊊ R non è scritta così nelle fonti. Segue dagli appunti Lez. 10 §4: NEXP ⊆ EXPSPACE ⊆ 2-EXP ⊊ 3-EXP ⊆ R, dove 2-EXP ⊊ 3-EXP è la gerarchia di tempo.</div>",
  "src": "dispensa cap. 1.5, 22; appunti Lez. 10 §4, §7"
 },
 "RE": {
  "full": "Linguaggi ricorsivamente enumerabili (semidecidibili)",
  "intu": "Esiste una MdT che, <b>se la risposta è sì</b>, prima o poi si ferma e lo dice; se la risposta è no può girare per sempre. Come cercare un oggetto in un magazzino infinito: se c'è prima o poi lo trovi, se non c'è non puoi mai essere sicuro di aver finito.",
  "def": "<p>L è ricorsivamente enumerabile se esiste una MdT M che lo <i>accetta</i>: M(x) = \"yes\" se x ∈ L, e M(x) diverge (↗) se x ∉ L (dispensa cap. 1.5).</p>",
  "ex": "<p><b>Validità del primo ordine</b>: per il teorema di completezza di Gödel ogni formula valida ha una dimostrazione. Si elencano tutte le dimostrazioni, dalla più corta in su: se la formula è valida prima o poi si trova la sua. Non sta in R (teorema di Church-Turing).</p>",
  "exam": "<p>Domanda (F06, SE23): «La validità di una formula del primo ordine è in RE?» SÌ: sta in RE ∖ R.</p>",
  "complete": "Validità del primo ordine ∈ RE ∖ R (dispensa cap. 22).",
  "closed": "no: RE ≠ coRE",
  "form": "una macchina che si ferma sulle istanze sì",
  "extra": "<div class=\"border-l-2 border-ok bg-ok-soft px-3 py-2 rounded-r-lg text-[0.93rem]\"><b>Ricavata: RE ≠ coRE.</b> Se fossero uguali, ogni problema di RE starebbe in RE ∩ coRE = R, compresa la validità del primo ordine, che invece non sta in R.</div>",
  "src": "dispensa cap. 1.5, 22; appunti Lez. 10 §7"
 },
 "coRE": {
  "full": "Complementi dei linguaggi RE",
  "intu": "I complementi dei problemi di RE: qui prima o poi si scopre il <b>no</b>, mentre il sì può non arrivare mai.",
  "def": "<div class=\"font-mono bg-sunk rounded-lg px-3 py-2 text-[0.9rem] overflow-x-auto whitespace-nowrap\">coRE = { L : il complemento di L sta in RE }</div>",
  "ex": "<p><b>Soddisfacibilità del primo ordine</b>: φ è soddisfacibile se e solo se ¬φ <i>non</i> è valida. È il complemento della validità, quindi sta in coRE ∖ R.</p>",
  "exam": "<p>Stessa logica di NP e coNP, un piano più in alto: RE e coRE si incontrano in {{R}}.</p>",
  "complete": "Soddisfacibilità del primo ordine ∈ coRE ∖ R (dispensa cap. 22).",
  "closed": "è la co-classe di RE",
  "form": "una macchina che si ferma sulle istanze no",
  "src": "dispensa cap. 22; appunti Lez. 10 §7"
 }
};
/** problemi della classe, per i link alla scheda del problema: [id problema, etichetta HTML] */
export const CLASS_PROBLEMS: Partial<Record<ClassId, [string, string][]>> = {
 "NL": [
  [
   "REACH",
   "REACHABILITY"
  ],
  [
   "SAT2",
   "2-SAT"
  ]
 ],
 "P": [
  [
   "COL2",
   "2-COL"
  ],
  [
   "MAXFLOW",
   "MAX FLOW"
  ],
  [
   "LP",
   "LINEAR PROGRAMMING"
  ],
  [
   "PRIMES",
   "PRIMES"
  ],
  [
   "HORN",
   "HORNSAT"
  ]
 ],
 "NP": [
  [
   "SAT",
   "SAT"
  ],
  [
   "SAT3",
   "3-SAT"
  ],
  [
   "MAX2SAT",
   "MAX2SAT"
  ],
  [
   "CIRCUITSAT",
   "CIRCUIT SAT"
  ],
  [
   "CLIQUE",
   "CLIQUE"
  ],
  [
   "IS",
   "INDEPENDENT SET"
  ],
  [
   "NC",
   "NODE COVER"
  ],
  [
   "HP",
   "HAMILTON PATH"
  ],
  [
   "TSPD",
   "TSP(D)"
  ],
  [
   "COL3",
   "3-COL"
  ],
  [
   "IP",
   "INTEGER PROGRAMMING"
  ],
  [
   "KNAP",
   "KNAPSACK"
  ]
 ],
 "coNP": [
  [
   "VALIDITY",
   "VALIDITY"
  ],
  [
   "COSAT",
   "co-SAT"
  ],
  [
   "COHP",
   "co-HAMILTON PATH"
  ],
  [
   "COTSP",
   "co-TSP(D)"
  ]
 ],
 "DP": [
  [
   "SATUNSAT",
   "SAT-UNSAT"
  ],
  [
   "EXACT",
   "EXACT TSP"
  ]
 ],
 "SIGMA2": [
  [
   "SC",
   "STRATEGIC COMPANIES"
  ],
  [
   "CIRC",
   "CIRC SAT"
  ],
  [
   "QSATi",
   "QSAT<sub>i</sub> (con i = 2)"
  ]
 ],
 "PI2": [
  [
   "COSC",
   "co-STRATEGIC COMPANIES"
  ],
  [
   "COQSATi",
   "co-QSAT<sub>i</sub> (con i = 2)"
  ]
 ],
 "SIGMAi": [
  [
   "QSATi",
   "QSAT<sub>i</sub>"
  ]
 ],
 "PIi": [
  [
   "COQSATi",
   "co-QSAT<sub>i</sub>"
  ]
 ],
 "PSPACE": [
  [
   "QSAT",
   "QSAT"
  ],
  [
   "GEO",
   "GEOGRAPHY"
  ]
 ],
 "NEXP": [
  [
   "SB",
   "SCHÖNFINKEL-BERNAYS SAT"
  ],
  [
   "SUCC",
   "SUCCINCT CIRCUIT SAT"
  ]
 ],
 "RE": [
  [
   "FOV",
   "Validità del primo ordine"
  ]
 ],
 "coRE": [
  [
   "FOS",
   "Soddisfacibilità del primo ordine"
  ]
 ]
};
export const PAIRNOTES: Record<string, string> = {
 "DP|NPcapcoNP": "<b>L'errore classico.</b> In NP ∩ coNP si intersecano due <i>classi</i>: il problema stesso sta in NP e in coNP, e ogni istanza ha <i>una</i> prova corta (certificato o squalifica). In DP si intersecano due <i>linguaggi</i>: l'istanza deve superare <i>due</i> controlli, uno NP e uno coNP. Per questo NP ∩ coNP sta sotto NP e coNP, mentre DP sta sopra entrambe.",
 "NP|coNP": "NP e coNP hanno una parte in comune, che contiene P. Non si sa se siano uguali. Se lo fossero, PH collasserebbe al primo livello; se un problema NP-completo stesse in coNP, sarebbero uguali (Prop. D).",
 "PH|PSPACE": "PH ⊆ PSPACE è dimostrata, l'uguaglianza è aperta. Se PH = PSPACE, PH avrebbe un problema completo (QSAT), e per il Teorema 17.11 collasserebbe a un livello finito.",
 "EXP|NEXP": "EXP ⊆ NEXP; l'uguaglianza è aperta. Con il padding: se P = NP allora EXP = NEXP. Letto al contrario, EXP ≠ NEXP implicherebbe P ≠ NP.",
 "R|RE": "R ⊊ RE: la validità del primo ordine è semidecidibile ma non decidibile. R = RE ∩ coRE.",
 "L|NL": "L ⊆ NL; se siano uguali non si sa. Si sa invece NL ⊆ SPACE(log² n) (Savitch) e NL ⊊ PSPACE.",
 "PI2|SIGMA2": "Stesso schema di NP e coNP al piano 2: Σ₂ᴾ comincia con ∃, Π₂ᴾ con ∀, e sono una il complemento dell'altra. Se fossero uguali, PH collasserebbe al piano 2 (Teorema 17.9).",
 "DELTA2|DP": "DP ⊆ P^NP: un problema DP si risolve con due domande all'oracolo. P^NP può farne un numero polinomiale e sceglierle in base alle risposte, quindi sembra più potente, ma non si sa se l'inclusione sia stretta.",
 "NP|P": "P ⊆ NP. P = NP è la domanda aperta più famosa. Se fosse vera: NP = coNP, PH = P, EXP = NEXP.",
 "NEXP|NP": "NP ⊊ NEXP per la gerarchia nondeterministica (✱ nella forma esponenziale è negli appunti, non in dispensa o slide). Quindi un problema NEXP-completo non sta in NP (e nemmeno in coNP).",
 "EXP|P": "P ⊊ EXP per la gerarchia di tempo: è la separazione da cui partono quasi tutte le risposte NO."
};
export const QUICK: [ClassId, ClassId][] = [
 [
  "DP",
  "NPcapcoNP"
 ],
 [
  "NP",
  "coNP"
 ],
 [
  "DP",
  "DELTA2"
 ],
 [
  "SIGMA2",
  "PI2"
 ],
 [
  "PH",
  "PSPACE"
 ],
 [
  "P",
  "EXP"
 ],
 [
  "EXP",
  "NEXP"
 ],
 [
  "NP",
  "NEXP"
 ],
 [
  "L",
  "NL"
 ],
 [
  "R",
  "RE"
 ],
 [
  "RE",
  "coRE"
 ]
];
