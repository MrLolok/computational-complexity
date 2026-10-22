# $\mathrm{PRIMES} \in \mathrm{P}$ e MAX-FLOW P-completo (riepilogo)

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Quanto è lungo l'input di PRIMES, se il numero da testare è $N$?
2. Che cosa bisogna dimostrare perché un problema sia P-completo?

<details><summary>Risposte</summary>

1. $N$ è scritto in binario, quindi l'input è lungo circa $\log_2 N$ cifre. Un numero di 100 cifre decimali, per esempio, ha 333 bit.
2. Due cose distinte: che il problema stia in P (un algoritmo polinomiale) e che ogni problema di P si riduca a lui in spazio logaritmico (di solito riducendo un problema già noto come P-completo).

</details>

Se la prima risposta non ti tornava, rileggila: da lì viene tutta la difficoltà di PRIMES.

## Che cosa dice

Sono due risultati citati senza dimostrazione e usati soprattutto negli esercizi sulle riduzioni. Delle prove si vede solo lo schema.

| problema | in P? | P-completo? |
| -------- | ----- | ----------- |
| PRIMES   | sì    | non si sa   |
| MAX FLOW | sì    | sì          |

## PRIMES sta in P

Provare tutti i divisori fino a $\sqrt{N}$ è polinomiale in $N$, e quindi esponenziale nella lunghezza dell'input. Serve un algoritmo polinomiale in $\log N$, e lo hanno trovato Agrawal, Kayal e Saxena nel 2002 (AKS).

Si parte da un'identità tra polinomi. Per $a$ primo con $N$:

$$N \text{ è primo} \iff (X + a)^N = X^N + a \pmod N.$$

Se $N$ è primo, i coefficienti binomiali intermedi $\binom{N}{i}$ con $0 \lt i \lt N$ sono multipli di $N$, e $a^N = a$ modulo $N$ per il piccolo teorema di Fermat. Se $N$ è composto, qualche coefficiente non si annulla. Con $a = 1$:

- $N = 5$: $(X+1)^5 = X^5 + 5X^4 + 10X^3 + 10X^2 + 5X + 1$, e modulo 5 resta $X^5 + 1$;
- $N = 4$: $(X+1)^4 = X^4 + 4X^3 + 6X^2 + 4X + 1$, e modulo 4 resta $X^4 + 2X^2 + 1$, diverso da $X^4 + 1$.

Così com'è il test è lento, perché il polinomio ha $N + 1$ coefficienti, di nuovo un numero esponenziale nella lunghezza. AKS controlla l'identità modulo $X^r - 1$, con $r$ piccolo (polinomiale in $\log N$), così i polinomi hanno al più $r$ coefficienti, e la prova per pochi valori di $a$. La potenza $N$-esima si calcola con i quadrati ripetuti, circa $\log N$ moltiplicazioni invece di $N$. Prima l'algoritmo esclude le potenze perfette e i fattori fino a $r$. Un argomento algebrico sui campi finiti mostra che, se tutti i controlli passano, $N$ è primo.

## MAX FLOW è P-completo

Nella versione di decisione si ha una rete con capacità, una sorgente $s$, un pozzo $t$ e un numero $K$, e si chiede se esista un flusso di valore almeno $K$.

L'algoritmo polinomiale parte dal metodo di Ford-Fulkerson, che aumenta il flusso lungo cammini da $s$ a $t$ nella rete residua. Con cammini scelti male ogni aumento può spostare una sola unità, e il valore del flusso può essere esponenziale nella lunghezza dell'input, perché le capacità sono scritte in binario. Edmonds-Karp sceglie ogni volta il cammino con meno archi, trovato con una visita in ampiezza; così gli aumenti sono $O(|V| \cdot |E|)$ qualunque siano le capacità, e il tempo è polinomiale.

La P-difficoltà è di Goldschlager, Shaw e Staples (1982). Riducono in spazio logaritmico la valutazione di un circuito monotono, con sole porte AND e OR, che è P-completa. Ogni porta diventa un nodo, ogni filo un arco con capacità potenze di 2 scelte in base alla posizione della porta, e un nodo di scarico assorbe il flusso in eccesso delle porte false. Nel flusso massimo un filo è pieno sse la sua porta vale 1, e il circuito dà 1 sse il flusso massimo raggiunge una soglia $K$ che si sa calcolare.

## Dove si inciampa di solito

PRIMES viene misurato in $N$ invece che in $\log N$, e la divisione per tentativi sembra già polinomiale.

Appartenenza e completezza si confondono. L'algoritmo di Edmonds-Karp dimostra solo che MAX FLOW sta in P; la P-completezza richiede in più la riduzione dal circuito. Per PRIMES una riduzione del genere non è nota, quindi non lo si può usare come bersaglio di una riduzione da un problema P-completo.

Con i problemi NP-completi conta la direzione. Da MAX FLOW a 3-COLORING la riduzione esiste: MAX FLOW sta in P, quindi in NP, e 3-COLORING è NP-completo. Da 3-COLORING a MAX FLOW esiste solo se $\mathrm{P} = \mathrm{NP}$, perché metterebbe 3-COLORING in P.
