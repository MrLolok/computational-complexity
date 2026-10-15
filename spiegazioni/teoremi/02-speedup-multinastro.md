# Teorema dello speedup multinastro (da $k$ nastri a 1)

## Prima di leggere

1. Che cosa fa, in un singolo passo, una MdT a $k$ nastri?
2. Che cosa vuol dire che $M$ lavora in tempo $f(n)$?

<details><summary>Risposte</summary>

1. Ha $k$ cursori, uno per nastro. In base allo stato e ai $k$ simboli sotto i cursori sceglie il nuovo stato, scrive un simbolo su ogni nastro e sposta ogni cursore (a sinistra, a destra o fermo), ciascuno per conto suo.
2. Che su ogni input $x$ la macchina si ferma entro $f(|x|)$ passi.

</details>

Se la prima risposta non ti tornava, ripassa la definizione di MdT a $k$ nastri: il teorema consiste nel rifare quel singolo passo con un cursore solo.

## Il problema

Una macchina con un nastro e un cursore deve simularne una con $k$ nastri, ognuno con il suo cursore. I $k$ cursori stanno in posti diversi nello stesso momento, mentre $M'$ guarda una cella alla volta; in più i nastri di $M$ si allungano ognuno per conto suo. Il teorema dice che si può fare perdendo al più un quadrato nel tempo: da $f(n)$ a $O(f(n)^2)$.

## L'idea: i nastri in fila

$M'$ scrive i $k$ nastri uno dopo l'altro sul suo unico nastro. Ogni nastro comincia con $\triangleright'$, una copia di $\triangleright$ che il cursore può scavalcare, e finisce con un separatore $\triangleleft$; un $\triangleleft$ doppio chiude tutto. Le posizioni dei cursori $M'$ le segna sul nastro stesso: la cella su cui sta il cursore $i$-esimo contiene una versione sottolineata del suo simbolo. L'alfabeto di $M'$ ha quindi, oltre ai simboli di $M$, le loro copie sottolineate e i due segni nuovi.

Un passo di $M$ diventa due passate sul nastro di $M'$. Nella prima $M'$ scorre il nastro da sinistra a destra e raccoglie i $k$ simboli sottolineati, cioè quelli che i cursori di $M$ stanno leggendo. Li tiene nello stato: $M'$ ha uno stato per ogni stato di $M$ combinato con ogni sequenza di al più $k$ simboli, tanti ma in numero finito, perché $K$, $\Sigma$ e $k$ non dipendono dall'input. Dopo la prima passata $M'$ sa da $\delta$ che cosa farebbe $M$. Nella seconda scorre di nuovo il nastro e, a ogni simbolo sottolineato, scrive il simbolo nuovo e sposta la sottolineatura nella cella accanto, a sinistra o a destra come dice $\delta$.

Se un cursore di $M$ va a destra oltre la fine del suo nastro, finirebbe sul $\triangleleft$. Serve una cella nuova: $M'$ sposta di una posizione a destra tutto ciò che segue e scrive un blank $\sqcup$ nella cella liberata.

Quando $M$ si ferma, $M'$ cancella i nastri simulati tranne l'ultimo, che contiene l'output, e lo rimette nel formato normale. Quindi $M'(x) = M(x)$.

## Un esempio con due nastri

Supponi che $M$ abbia due nastri: il primo contiene $\triangleright\, a\, b\, b$ con il cursore sulla prima $b$, il secondo $\triangleright\, 1\, 0$ con il cursore sullo $0$. Sul nastro di $M'$ c'è

$$\triangleright' \, a \, \underline{b} \, b \triangleleft \triangleright' \, 1 \, \underline{0} \triangleleft \triangleleft$$

La passata di lettura trova $\underline{b}$ e $\underline{0}$. Supponi che, nello stato corrente e leggendo $(b, 0)$, $\delta$ dica: scrivi $a$ sul primo nastro e $1$ sul secondo, sposta entrambi i cursori a destra. Il primo cursore finisce sulla seconda $b$. Il secondo esce dalla fine del suo nastro, quindi nella passata di scrittura $M'$ sposta di una cella a destra i due $\triangleleft$ finali e nella cella liberata scrive un blank sottolineato:

$$\triangleright' \, a \, a \, \underline{b} \triangleleft \triangleright' \, 1 \, 1 \, \underline{\sqcup} \triangleleft \triangleleft$$

## Il conto del tempo

Un nastro si allunga solo quando il cursore va oltre la sua fine, e in $f(|x|)$ passi un cursore che parte dall'inizio arriva al più alla cella $f(|x|)$. L'input sta dentro lo stesso limite, perché un budget di tempo è sempre almeno $n$. Quindi ogni nastro di $M$ resta lungo al più $f(|x|) + 1$ celle, e il nastro di $M'$ al più $k(f(|x|) + 1) + 1$: è $O(f(n))$, perché $k$ è una costante.

Simulare un passo costa una passata avanti e indietro per leggere, più una passata per ognuno dei $k$ nastri da modificare, spostamenti compresi: $O(k^2 \cdot f(|x|))$ passi. Per tutti gli $f(|x|)$ passi di $M$:

$$f(n) \cdot O(k^2 \cdot f(n)) = O(f(n)^2).$$

I due fattori $f(n)$ hanno origini diverse. Il primo conta i passi di $M$, il secondo è la lunghezza del nastro che $M'$ percorre per simularne uno. Il numero di nastri entra solo nella costante $k^2$. Se $M$ fa 1000 passi, $M'$ ne fa dell'ordine di $1000^2$, un milione, a meno di costanti.

## Dove si inciampa di solito

Il nome inganna: $M'$ è più lenta di $M$, fino a un fattore $f(n)$. Il teorema serve a dire che il numero di nastri cambia il tempo al più polinomialmente, quindi classi come P non dipendono da quanti nastri si usano.
