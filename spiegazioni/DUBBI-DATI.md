# Dubbi sui dati del sito

Problemi nei file di `src/data/` trovati da chi ha scritto le spiegazioni e confermati dalla revisione. I dettagli e le motivazioni sono nei log `spiegazioni/log/revisione-*.md`.

Stato al 16 ottobre 2026:

- Il sito non mostra più il campo `dimostrazione` di `theorems/proofs.json`: al suo posto c'è la spiegazione di `spiegazioni/teoremi/`. Gli errori che stavano solo in quel campo (hamilton-path passo 4, ndet-hierarchy, esempio di knapsack, rimandi alla dispensa nelle prove) non sono più visibili. Il campo è stato poi cancellato dal file.
- Corretto, perché sicuramente sbagliato: l'enunciato di soluzioni-precise in `theorems/theorems.ts` ("si ferma dopo esattamente $f(\lvert x\rvert)$ passi" diventa "dopo un numero di passi che dipende solo da $\lvert x\rvert$").
- Il resto dell'elenco non è stato toccato: sono imprecisioni, convenzioni o affermazioni non dimostrate, non errori certi.

## Errori che cambiano il contenuto

| Teorema            | Dove                                 | Problema                                                                                                                                                                                                                       | Correzione                                                                                      |
| ------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| hamilton-path      | `theorems/proofs.json`, passo 4        | Il lato del letterale $x_i$ è legato con lo XOR al collegamento "$x_i$ falsa", poi si conclude che è attraversato quando il letterale è falso. Con lo XOR succede il contrario.                                                | Legare $x_i$ a "$x_i$ vera" e $\neg x_i$ a "$x_i$ falsa".                                       |
| ndet-hierarchy     | `theorems/proofs.json`                 | La macchina $D$ simula $M_i$ su $1^{n+1}$ per $n^c$ passi, ma su quell'input $M_i$ ne ha $(n+1)^c$: la simulazione può tagliare un ramo che accetta.                                                                           | Simulare per $(n+1)^c$ passi.                                                                   |
| ndet-hierarchy     | `theorems/proofs.json`, intuizione     | La condizione $f(n+1) = O(g(n))$ è attribuita alla strada di Immerman e Szelepcsényi, dove basta $f = o(g)$. "Molto più fitte delle deterministiche" non regge per il tempo se il confronto è con $\mathrm{TIME}(f \log^2 f)$. | Attribuire la condizione alla strada di Seiferas, Fischer e Meyer; ridimensionare il confronto. |
| soluzioni-precise  | `theorems/theorems.ts`, enunciato             | Dice che la macchina si ferma dopo esattamente $f(\lvert x\rvert)$ passi; la dimostrazione dà i passi di $M_f$ più $f(\lvert x\rvert)$ più una costante.                                                                       | "Si ferma dopo un numero di passi $O(f(n))$ che dipende solo da $\lvert x\rvert$".              |
| terminazione-space | `theorems/theorems.ts`, `theorems/proofs.json`  | Il conto delle configurazioni non ha il fattore $n+1$ della testina di input, e l'enunciato non chiede $f(n) \ge \log n$ (lo storyboard sì).                                                                                   | Aggiungere il fattore e l'ipotesi.                                                              |
| db-queries         | `theorems/theorems.ts`, enunciato             | "L-completa" per l'algebra relazionale non regge: una query fissa del primo ordine sta in $\mathrm{AC}^0$, e con riduzioni logaritmiche ogni problema non banale di L è L-completo.                                            | "In L, anzi in $\mathrm{AC}^0$".                                                                |
| bqp-2exp           | `theorems/proofs.json`, frase da esame | Il ragionamento in OWL 2 DL (SROIQ) è N2EXPTIME-completo, non 2-EXP-completo. La conclusione "non sta in BQP" resta vera.                                                                                                      | Correggere la classe.                                                                           |
| t17-8-cor2, t17-10 | `theorems/theorems.ts` / `theorems/proofs.json` | "Il livello è il numero di alternanze": $\Sigma_i^{\mathrm{P}}$ ha $i$ blocchi di quantificatori e $i-1$ alternanze.                                                                                                           | "Numero di blocchi".                                                                            |
| max2sat            | `theorems/theorems.ts`, `problems.ts`         | "Clausole con 2 letterali", ma il gruppo da dieci usa clausole di un solo letterale.                                                                                                                                           | "Al più 2 letterali", come lo storyboard.                                                       |
| grover-np          | `theorems/theorems.ts`, enunciato             | Il tempo $O(c^{n^k/2})$ richiede una base più grande $c'$ per assorbire il costo del verificatore.                                                                                                                             | Usare $c'$ o $2^{O(n^k)}$.                                                                      |
| knapsack           | `theorems/proofs.json`, passo 4        | L'esempio in base 2 usa insiemi di 2 e 3 elementi: non è un'istanza di EXACT COVER BY 3-SETS.                                                                                                                                  | Esempio con insiemi di 3 elementi.                                                              |

## Imprecisioni minori

- cook-levin: $T$ righe descrivono $T-1$ passi, e serve $p(n) \ge n$ per la riga iniziale.
- 3sat, sat-unsat-dp: "3 letterali" in `theorems/theorems.ts`, "al più 3" in `problems.ts`.
- t7-4b: la dimostrazione deve calcolare $f(n)$, quindi usa $f$ propria senza dirlo.
- t7-4c: l'esponente $(2k-2) f(n)$ non torna con le $2(k-2)$ stringhe dei nastri di lavoro (il limite resta valido).
- go: l'ipotesi di durata polinomiale della partita è nella dimostrazione e nello storyboard, non nell'enunciato; per GEOGRAPHY planare servono gadget di incrocio.
- nexp-completi: lo schema non dice come le variabili prendano solo 0 e 1 e come le due costanti restino distinte.
- altri-dp-completi: CRITICAL HAMILTON PATH, CRITICAL 3-COLORING e UNIQUE SAT non sono definiti da nessuna parte.
- co-hamilton-pi2: `prova` è "omessa" in `theorems/theorems.ts`, `tipo_dimostrazione` è "completa".
- Storyboard diversi dalla dimostrazione: soglia di BPP 2/3 contro 3/4 (bpp-inclusioni, bpp-errore), knapsack parte da SUBSET SUM che non è in `problems.ts`, la terza slide di hamilton-path descrive un'altra riduzione, l'ultima slide di integer-programming dà per scontato il certificato corto.
- hf-upper: il fattore $k_M^2$ nel costo di un passo non è giustificato.

## Rimandi al materiale del corso nel testo mostrato

- knapsack-pseudopoly (passo 5) e prop-d (ultimo paragrafo): commenti sulla dispensa.
- strong-np: "del capitolo" nell'enunciato e nel passo 4.
- altri-dp-completi: "Il corso dà solo gli enunciati … (Papadimitriou, cap. 17)".
- bqp-2exp: "Lezione 6", "slide Lez. 6".
- 2sat-p-completo: "dispensa cap. 12".
- bpp-errore: "Le slide chiamano ε…", in prima persona.
- riepilogo-p: l'enunciato comincia con "Il riepilogo della dispensa elenca…".
- pl-psat, sat-unsat-dp: "Cook–Levin" con il trattino lungo negli storyboard; t17-10 dice "Teorema di Cook".

## Solo notazione

- La stessa lettera con due significati: $k$ in bpp-errore, space-in-time, prop-9-1, t7-4c; $B$ in set-problems.
- $C$ contro $\mathcal{C}$ in prop-c, prop-d, cd-cocd; $V(w,i)$ contro $D[i,w]$ in knapsack-pseudopoly; $K$ contro $V$ per KNAPSACK in grover-np; $2^{p(n)}$ contro $2^{n^k}$ in t20-1.

## Segnalati ma non fondati

gap-theorem ("non propria" e "non costruibile" sono compatibili), qsat-pspace ($\lvert\psi_m\rvert = O(m^2)$ è giusto), prop-d (due strade entrambe corrette), EXACT TSP (due risultati diversi), t17-11, 2sat-p-completo ("solo se"), "costruibile" contro "propria", INDEPENDENT SET "almeno $K$".
