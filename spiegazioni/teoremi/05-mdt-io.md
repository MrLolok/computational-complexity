# Proposizione (MdT con input e output)

## Prima di leggere

Perché, per misurare lo spazio, non si vuole contare il nastro che contiene l'input?

<details><summary>Risposta</summary>

L'input occupa già $n$ celle. Se si contassero, ogni macchina userebbe spazio almeno $n$, e non avrebbe senso parlare di problemi risolubili in spazio $\log n$, come quelli di L e NL.

</details>

## Il problema

Per non contare l'input bisogna essere sicuri che la macchina non lo usi come memoria di lavoro. Una MdT con input e output rispetta tre vincoli:

- non modifica mai il primo nastro, che contiene l'input (sola lettura);
- sull'ultimo nastro, quello dell'output, non sposta mai il cursore a sinistra (sola scrittura);
- sul nastro di input il cursore non va oltre il primo $\sqcup$ dopo l'input.

Senza il terzo vincolo la macchina potrebbe usare la posizione del cursore come contatore, spostandolo nei blank di tante celle quanto vale il numero da ricordare, e avere memoria gratis. Con il vincolo, la posizione del cursore di input assume al più $n + 2$ valori.

La proposizione dice che questi vincoli non tolgono potenza: ogni MdT a $k$ nastri che lavora in tempo $f(n)$ si trasforma in una MdT con input e output a $k + 2$ nastri che dà lo stesso output in tempo $O(f(n))$.

## La costruzione

$M$ può scrivere sul suo primo nastro e muoversi liberamente sull'ultimo. $M'$ quindi le prepara una copia dell'input su cui lavorare e tiene da parte il nastro di output: i due nastri in più sono il primo, per l'input, e l'ultimo, per l'output, e quelli di $M$ stanno in mezzo.

| fase              | nastro 1 (input)             | nastri da 2 a $k+1$      | nastro $k+2$ (output)    | passi         |
| ----------------- | ---------------------------- | ------------------------ | ------------------------ | ------------- |
| copia dell'input  | letto fino al primo $\sqcup$ | $x$ copiato sul nastro 2 | fermo                    | $O(n)$        |
| simulazione       | fermo                        | $M$ lavora qui           | fermo                    | al più $f(n)$ |
| copia dell'output | fermo                        | si legge il nastro $k+1$ | scritto andando a destra | $O(f(n))$     |

Nella simulazione ogni passo di $M$ diventa un passo di $M'$, con il nastro $i+1$ di $M'$ al posto del nastro $i$ di $M$. Quando $M$ si ferma, il suo output sta sul suo ultimo nastro, cioè sul nastro $k+1$ di $M'$, e $M'$ lo ricopia sull'ultimo andando solo verso destra. $M'$ finisce nello stesso stato di $M$ ("yes", "no" o $h$) e con lo stesso output.

## Il conto del tempo

La prima fase costa $O(n)$, compreso il ritorno del cursore all'inizio del nastro 2. La seconda costa al più $f(n)$ passi. Nella terza l'output è lungo al più $f(n)$ celle, perché in $f(n)$ passi $M$ non ne scrive di più. In tutto

$$O(n) + f(n) + O(f(n)) = O(f(n)),$$

perché un budget di tempo è sempre almeno $n$: la macchina deve poter leggere l'input.

## Dove si inciampa di solito

La proposizione parla di tempo. Come spazio, la $M'$ costruita qui non risparmia niente: la copia dell'input occupa $n$ celle di un nastro di lavoro. Una macchina che deve stare in spazio $\log n$ va progettata in modo da leggere l'input dove si trova, senza copiarlo.
