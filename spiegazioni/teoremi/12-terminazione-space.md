# Teorema (terminazione delle MdT space-bounded)

## Prima di leggere

1. Che cosa contiene una configurazione di una MdT con un nastro di input e dei nastri di lavoro?
2. Una MdT nondeterministica decide $L$. Che cosa si chiede ai suoi rami quando $x \in L$, e che cosa quando $x \notin L$?

<details><summary>Risposte</summary>

1. Lo stato, la posizione del cursore sull'input e, per ogni nastro di lavoro, il contenuto e la posizione del cursore. È una fotografia completa: da lì la macchina sa come proseguire senza guardare il passato.
2. Se $x \in L$ almeno un ramo deve arrivare in "yes"; se $x \notin L$ nessun ramo deve arrivarci. Il budget di spazio limita le celle che ogni ramo usa, non il numero dei suoi passi.

</details>

Se la seconda risposta non ti tornava, rileggila: il teorema serve a togliere i rami che restano dentro le loro celle e non si fermano mai.

## Il problema

Un budget di tempo obbliga la macchina a fermarsi dopo $f(n)$ passi. Un budget di spazio limita solo le celle, e una macchina può andare avanti e indietro su tre celle all'infinito senza uscire dal limite. Una macchina deterministica che decide $L$ non lo fa, perché per definizione si ferma su ogni input. In una nondeterministica invece un ramo può accettare mentre un altro cicla, e la macchina decide comunque $L$.

Il teorema dice che i rami infiniti si possono eliminare: esiste $M'$ che decide lo stesso $L$, in spazio $O(f(n))$, e in cui ogni computazione termina.

## L'idea: contare le configurazioni

Con un nastro di lavoro lungo al più $f(n)$ le configurazioni diverse si contano:

| componente | valori possibili |
|---|---|
| stato | $\lvert K \rvert$ |
| contenuto del nastro | $\lvert \Sigma \rvert^{f(n)}$, un simbolo per cella |
| posizione del cursore | $f(n)+1$ |

In tutto sono al più $c = |K| \cdot |\Sigma|^{f(n)} \cdot (f(n)+1)$. Un ramo che fa più di $c$ passi attraversa più di $c$ configurazioni, quindi per il principio dei cassetti ne incontra una due volte.

Una ripetizione dentro un ramo che accetta si può tagliare. Dalla seconda occorrenza la macchina ha fatto certe mosse fino a "yes", e quelle mosse sono lecite anche dalla prima occorrenza, perché la configurazione è la stessa. Togliendo il tratto fra le due occorrenze resta un ramo più corto che accetta. Ripetendo il taglio finché ci sono ripetizioni si arriva a un ramo che accetta in al più $c$ passi.

$M'$ allora simula $M$ e conta i passi. Se il conto arriva a $c$ e il ramo non si è fermato, $M'$ lo chiude in "no". Il linguaggio non cambia: se $x \in L$, un ramo che accetta entro $c$ passi c'è comunque, e i rami chiusi in "no" non tolgono niente, perché a una macchina nondeterministica basta un ramo che accetta.

Il conto vale per un solo nastro di lavoro e ignora il cursore di input. Ogni nastro in più aggiunge un fattore dello stesso tipo. Il cursore di input aggiunge un fattore $n+1$, e per contarlo servono circa $\log n$ celle: stanno in $O(f(n))$ se $f(n) \ge \log n$, l'ipotesi che si fa di solito per lo spazio.

## Un esempio di taglio

Un ramo di $M$ che accetta, con la configurazione $C_1$ ripetuta:

```
ramo originale:   C0 → C1 → C2 → C3 → C1 → C2 → C4 ("yes")
dopo il taglio:   C0 → C1 → C2 → C4 ("yes")
```

Il tratto $C_1 \to C_2 \to C_3 \to C_1$ è un giro e si toglie. Il passo finale $C_2 \to C_4$ resta lecito, perché parte dalla stessa configurazione $C_2$.

## Il conto dello spazio

Il numero $c$ è esponenziale in $f(n)$, quindi il contatore non può scriverlo in unario. Funziona come un contachilometri con ruote di misure diverse: una cella con $|K|$ simboli possibili, $f(n)$ celle che formano un numero in base $|\Sigma|$, e $f(n)+1$ celle usate in unario. I valori che può assumere sono esattamente $|K| \cdot |\Sigma|^{f(n)} \cdot (f(n)+1) = c$, perché il contatore ha la stessa forma di una configurazione.

Per sapere dove finiscono le $f(n)$ celle serve un metro lungo $f(n)$, e qui entra l'ipotesi che $f$ sia propria: la macchina $M_f$ costruisce il metro in spazio $O(f(n))$.

Con $|K| = 3$, $|\Sigma| = 2$ e $f(n) = 20$ si ha $c = 3 \cdot 2^{20} \cdot 21 = 66.060.288$: circa 66 milioni di passi contati con $1 + 20 + 21 = 42$ celle.

Metro e contatore occupano $O(f(n))$ celle, la simulazione di $M$ al più $f(n)$: in tutto $O(f(n))$.

## Dove si inciampa di solito

Si pensa che $M'$ debba accorgersi del ciclo, per esempio ricordando le configurazioni già viste. Le configurazioni da ricordare potrebbero essere $c$, e lo spazio esploderebbe. $M'$ invece non riconosce nessun ciclo: sa che un ramo più lungo di $c$ passi ne contiene per forza uno, e lo chiude.
