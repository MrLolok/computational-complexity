# Riduzione dell'errore in BPP

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Una macchina di BPP con soglia $3/4$: con che probabilità sbaglia un singolo run scelto a caso?
2. Se un algoritmo sbaglia con probabilità $1/4$ e lo esegui tre volte con scelte indipendenti, con che probabilità sbaglia tutte e tre le volte?

<details><summary>Risposte</summary>

1. Al più $1/4$, sia quando $x \in L$ sia quando $x \notin L$.
2. $(1/4)^3 = 1/64$: con esecuzioni indipendenti le probabilità si moltiplicano. Il voto di maggioranza però sbaglia già quando sbagliano due esecuzioni su tre, quindi il conto vero è un po' più alto.

</details>

Se la seconda risposta non ti tornava, ripassa l'indipendenza: tutta la prova la usa.

## Il problema

La soglia $3/4$ di BPP sembra una scelta arbitraria, e un errore di $1/4$ sembra alto. Il teorema dice che la soglia non conta: ripetendo l'algoritmo un numero costante di volte l'errore scende sotto qualunque $\varepsilon$ fissato. In PP lo stesso metodo può richiedere un numero esponenziale di ripetizioni.

Ogni esecuzione dà la risposta giusta con probabilità almeno $1/2 + \delta$, e il margine $\delta \gt 0$ si chiama vantaggio; con la soglia $3/4$, $\delta = 1/4$. In altri testi la lettera $\varepsilon$ indica il vantaggio; qui $\varepsilon$ è sempre l'errore che si vuole raggiungere.

## L'idea: votare a maggioranza

La macchina $N_k$ esegue $N$ per $2k + 1$ volte, con scelte indipendenti, e risponde come la maggioranza. Il numero è dispari perché non ci siano pareggi. $N_k$ sbaglia solo se sbagliano almeno $k + 1$ esecuzioni su $2k + 1$.

Con errore $1/4$ per esecuzione, gli errori della maggioranza si calcolano a mano:

| esecuzioni | la maggioranza sbaglia se sbagliano almeno | probabilità di errore |
|---|---|---|
| 1 | 1 | $1/4 = 0{,}25$ |
| 3 | 2 | $10/64 \approx 0{,}156$ |
| 5 | 3 | $106/1024 \approx 0{,}104$ |
| 7 | 4 | $1156/16384 \approx 0{,}071$ |

Per 3 esecuzioni: due errori, in uno dei 3 modi possibili, danno $3 \cdot (1/4)^2 \cdot (3/4) = 9/64$; tre errori danno $1/64$; in tutto $10/64$.

Quanto in fretta scende l'errore lo dice il limite di Chernoff: se ogni esecuzione è giusta con probabilità $1/2 + \delta$, la maggioranza di $2k + 1$ esecuzioni sbaglia con probabilità al più

$$e^{-2\delta^2 k}.$$

In media le risposte giuste superano la metà di circa $\delta \cdot (2k + 1)$, che cresce come $k$, mentre le oscillazioni casuali crescono solo come $\sqrt{k}$. Uno scarto abbastanza grande da ribaltare la maggioranza diventa quindi esponenzialmente improbabile.

## Il conto

Partendo da $3/4$, $\delta = 1/4$ e il limite diventa $e^{-2 \cdot (1/16) \cdot k} = e^{-k/8}$. Si vuole $e^{-k/8} \le \varepsilon$; passando ai logaritmi, $-k/8 \le \ln \varepsilon$, cioè $k \ge -8 \ln \varepsilon$. Basta

$$k = \lceil -8 \ln \varepsilon \rceil.$$

Per $\varepsilon = 1/100$: $-8 \ln(0{,}01) \approx 36{,}8$, quindi $k = 37$ e 75 ripetizioni. Chernoff è un limite largo: il conto esatto mostra che per scendere sotto l'1% bastano 19 ripetizioni, e con 75 l'errore vero è circa $1{,}6 \cdot 10^{-6}$. Per la classe BPP interessa che $k$ dipenda solo da $\varepsilon$ e da $\delta$, e non dalla lunghezza dell'input: il tempo viene moltiplicato per la costante $2k + 1$ e resta polinomiale.

Lo stesso conto mostra che $3/4$ è una convenzione. Da un vantaggio $\delta$ qualsiasi, per arrivare a errore $1/4$ serve $e^{-2\delta^2 k} \le 1/4$, cioè $k \ge \ln 2 / \delta^2$, un'altra costante. Qualunque soglia $s$ con $1/2 \lt s \le 1$ dà la stessa classe BPP.

## Perché in PP non funziona

In PP il vantaggio può dipendere dall'input e diventare minuscolo. Con $2^{p(n)+1}$ run, $2^{p(n)} + 1$ "yes" e $2^{p(n)} - 1$ "no" bastano per la maggioranza; la probabilità di risposta giusta è $1/2 + 1/2^{p(n)+1}$, cioè $\delta = 2^{-(p(n)+1)}$. Il limite $e^{-2\delta^2 k} \le \varepsilon$ chiede allora

$$k \ge \frac{\ln(1/\varepsilon)}{2\delta^2} = \ln(1/\varepsilon) \cdot 2^{2p(n)+1},$$

un numero esponenziale di ripetizioni. Non si conosce un altro modo di ridurre l'errore in PP in tempo polinomiale.

## Dove si inciampa di solito

Viene da pensare che le ripetizioni debbano crescere con $n$. Per un $\varepsilon$ fissato sono una costante.

Le ripetizioni devono usare scelte nuove e indipendenti. Rieseguendo con le stesse scelte si otterrebbe $2k + 1$ volte la stessa risposta, e l'errore resterebbe quello di partenza.

In PP ripetere aiuta ancora, ma il numero di ripetizioni dipende da $\delta$: quando $\delta$ è esponenzialmente piccolo, il tempo diventa esponenziale.
