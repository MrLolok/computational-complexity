# Teorema (da nondeterministico a deterministico)

## Prima di leggere

1. Quando una MdT nondeterministica $N$ accetta l'input $x$? E quando lo rifiuta?
2. Quante sono le sequenze lunghe $t$ di numeri fra 1 e $d$?

<details><summary>Risposte</summary>

1. Lo accetta se almeno una computazione su $x$ arriva in "yes". Lo rifiuta se nessuna ci arriva: per rifiutare bisogna escluderle tutte.
2. $d^t$: $d$ possibilità per ognuna delle $t$ posizioni.

</details>

Se la prima risposta non ti tornava, rileggi la definizione di accettazione nondeterministica: il costo del teorema viene da lì.

## Il problema

Per sapere se $N$ accetta, una macchina deterministica deve esplorare le computazioni di $N$ una per una, e per rifiutare deve averle escluse tutte. Il teorema dice che se $N$ decide $L$ in tempo $f(n)$, una MdT deterministica a 3 nastri decide $L$ in tempo $O(c^{f(n)})$, con $c \gt 1$ costante che dipende da $N$.

## L'idea: numerare le scelte

Sia $d$ (numero finito) il massimo numero di mosse possibili, il grado di nondeterminismo. Se $d = 1$, $N$ è già deterministica, quindi si suppone $d \gt 1$. Le mosse di ogni situazione si numerano da 1 a $d$.

Una computazione di $t$ passi è allora una sequenza $(c_1, \ldots, c_t)$ di numeri fra 1 e $d$: $c_i$ dice quale mossa fare al passo $i$. Alcune sequenze non corrispondono a nessuna computazione, perché in qualche situazione le mosse sono meno di $d$; quelle si scartano.

La macchina deterministica $M$ ha tre nastri: l'input, la sequenza corrente, la simulazione di $N$. Genera le sequenze in ordine di lunghezza, come un contatore in base $d$: $1, 2, \ldots, d, 11, 12, \ldots$. Per ognuna rimette sul terzo nastro la configurazione iniziale di $N$ e simula $N$ seguendo quelle scelte. Se arriva in "yes", si ferma in "yes".

## Quando rifiutare

$M$ non conosce $f(n)$, quindi esplora tutte le possibili sequenze di scelte di lunghezza crescente $t$. Se trova un ramo accettante, accetta; altrimenti rifiuta quando tutte le sequenze vengono scartate o portano a computazioni terminate senza accettare. Poiché $N$ decide in tempo $f(n)$, tutti i rami terminano entro tale limite, quindi anche $M$ termina.

## Un esempio

Supponi $d = 2$ e che l'unica computazione accettante di $N$ su $x$ faccia le scelte $2, 1, 2$. $M$ prova:

```
lunghezza 1:  1   2
lunghezza 2:  11  12  21  22
lunghezza 3:  111 112 121 122 211 212   <- "yes"
```

La trova alla dodicesima sequenza, dopo $2 + 4 + 5 = 11$ tentativi andati a vuoto. Se invece nessuna computazione accettasse e la più lunga facesse 3 passi, $M$ proverebbe tutte le $2 + 4 + 8 = 14$ sequenze e poi si fermerebbe in "no".

## Il conto del tempo

Le sequenze lunghe al più $f(n)$ sono $d + d^2 + \cdots + d^{f(n)} = O(d^{f(n)})$. Per ognuna $M$ genera la sequenza, rimette l'input sul terzo nastro e simula al più $f(n)$ passi. In tutto $O(f(n) \cdot d^{f(n)}) = O(c^{f(n)})$ con, per esempio, $c = 2d$: siccome $f(n) \le 2^{f(n)}$, vale $f(n) \cdot d^{f(n)} \le 2^{f(n)} \cdot d^{f(n)} = (2d)^{f(n)}$. La costante $c$ dipende da $d$, cioè da $N$, e non dall'input; per questo l'enunciato prende l'unione su tutti i $c \gt 1$:

$$\mathrm{NTIME}(f(n)) \subseteq \bigcup_{c \gt 1} \mathrm{TIME}(c^{f(n)}).$$

## Dove si inciampa di solito

$M$ non può rifiutare alla prima computazione che finisce in "no". Un "no" su un ramo non dice niente su $x$.

Per quanto si sa oggi, togliere il nondeterminismo dal tempo costa un esponenziale, ma nessuno ha dimostrato che non si possa fare di meglio.
