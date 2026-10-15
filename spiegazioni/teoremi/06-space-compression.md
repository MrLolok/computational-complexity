# Teorema di compressione dello spazio

## Prima di leggere

Su una MdT con input e output, quali celle conta lo spazio?

<details><summary>Risposta</summary>

Solo quelle dei nastri di lavoro. Il nastro di input, in sola lettura, e quello di output, in sola scrittura, non entrano nel conto.

</details>

Il teorema usa lo stesso trucco del Teorema dello speedup lineare: se non lo ricordi, conviene rileggerlo prima.

## Il problema

Le costanti moltiplicative non contano nemmeno per lo spazio: se $L \in \mathrm{SPACE}(f(n))$, allora $L \in \mathrm{SPACE}(2 + \varepsilon \cdot f(n))$ per ogni $\varepsilon \gt 0$. Una macchina che usa 1000 celle di lavoro si può sostituire con una che ne usa al più 102, o al più 12, scegliendo $\varepsilon = 1/10$ o $\varepsilon = 1/100$.

## L'idea: un blocco per cella

$M'$ ha gli stessi nastri di $M$. Sul nastro di input lavora esattamente come $M$. Sul nastro di lavoro ogni sua cella contiene un blocco di $m$ celle consecutive di $M$: l'alfabeto di lavoro di $M'$ è $\Sigma^m$, con $m$ intero e $m \ge 1/\varepsilon$. Con più nastri di lavoro si fa lo stesso su ciascuno.

Lo stato di $M'$ ricorda lo stato di $M$ e in quale delle $m$ posizioni del blocco si trova il cursore di $M$. Per simulare un passo, $M'$ sa dallo stato quale simbolo del blocco sta leggendo $M$, riscrive il blocco con quel simbolo cambiato e aggiorna la posizione interna. Il suo cursore passa al blocco vicino solo quando il cursore di $M$ esce dal blocco.

Con $m = 3$ e un nastro di lavoro che contiene $\triangleright\, a\, b\, b\, a\, \sqcup\, b\, b\, a$:

```
M   : ▷ | a b b | a ⊔ b | b a
M'  : ▷ | (a,b,b) | (a,⊔,b) | (b,a,⊔)
```

Se il cursore di $M$ sta sulla quinta cella dopo $\triangleright$, il $\sqcup$, il cursore di $M'$ sta sul secondo blocco e lo stato ricorda "posizione 2". L'ultimo blocco è completato con un $\sqcup$. $M$ usa 9 celle, $M'$ ne usa 4.

## Il conto dello spazio

Il nastro di lavoro di $M$ ha al più $f(n)$ celle. Tolta la prima, con $\triangleright$, che $M'$ tiene com'è, le altre si dividono in al più $\lceil f(n)/m \rceil \le f(n)/m + 1$ blocchi. In tutto

$$1 + \frac{f(n)}{m} + 1 = 2 + \frac{f(n)}{m} \le 2 + \varepsilon \cdot f(n),$$

perché $m \ge 1/\varepsilon$ vuol dire $1/m \le \varepsilon$. Il 2 conta la cella di $\triangleright$ e l'arrotondamento dell'ultimo blocco, che può essere pieno solo in parte. Con 1000 celle e $m = 10$ i blocchi sono $\lceil 999/10 \rceil = 100$, e con la cella di $\triangleright$ fanno 101, una in meno del limite 102.

## Dove si inciampa di solito

Lo speedup lineare dà tempo $\varepsilon \cdot f(n) + n + 2$, la compressione dello spazio dà $2 + \varepsilon \cdot f(n)$, senza $n$. Là il termine $n$ veniva dalla compressione dell'input, che qui non serve perché il nastro di input non si conta.

$m$ è una costante. Non si può prendere $m = f(n)$ e ridurre tutto a una cella, perché l'alfabeto dipenderebbe dall'input e non sarebbe più quello di una MdT fissata.
