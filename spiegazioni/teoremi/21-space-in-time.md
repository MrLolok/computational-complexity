# Spazio dato il tempo

## Prima di leggere

1. Che cosa contiene una configurazione di una MdT con nastro di input in sola lettura e nastri di lavoro?
2. Perché una macchina deterministica che passa due volte dalla stessa configurazione non si ferma più?

<details><summary>Risposte</summary>

1. Lo stato, la posizione della testina sull'input (il contenuto dell'input non cambia mai) e, per ogni nastro di lavoro, il contenuto e la posizione della testina.
2. In una macchina deterministica ogni configurazione determina la successiva. Dalla seconda occorrenza la macchina rifà le stesse mosse della prima, torna di nuovo lì, e così all'infinito.

</details>

Se la seconda risposta non ti tornava, rileggila: la prova la combina con un conto delle configurazioni.

## L'idea: contare le configurazioni

Sia $M$ una MdT deterministica che decide $L$ usando al più $f(n)$ celle per nastro di lavoro, con $f(n) \ge \log n$. Le sue configurazioni sono fotografie di una memoria limitata, e si possono contare. Con un solo nastro di lavoro:

| componente                     | valori possibili              |
| ------------------------------ | ----------------------------- |
| stato                          | $\lvert K \rvert$             |
| posizione sull'input           | $n+1$                         |
| contenuto del nastro di lavoro | $\lvert \Sigma \rvert^{f(n)}$ |
| posizione sul nastro di lavoro | $f(n)$                        |

Ogni nastro di lavoro in più aggiunge due fattori dello stesso tipo. Il prodotto $N$ va messo nella forma $k^{f(n)}$, e il fattore $n+1$ è l'unico che non dipende da $f(n)$. Qui serve l'ipotesi: da $f(n) \ge \log n$ viene $n \le 2^{f(n)}$, quindi $n+1 \le 2^{f(n)+1}$. Inoltre $f(n) \le 2^{f(n)}$. Allora, con un nastro di lavoro e $f(n) \ge 1$,

$$N \le |K| \cdot 2^{f(n)+1} \cdot |\Sigma|^{f(n)} \cdot 2^{f(n)} = 2|K| \cdot (4|\Sigma|)^{f(n)} \le (8\,|K|\,|\Sigma|)^{f(n)}.$$

La base $k = 8|K||\Sigma|$ dipende solo da $M$, non dall'input. Senza l'ipotesi il conto non regge: con $f$ costante il limite $k^{f(n)}$ sarebbe una costante, mentre una macchina con spazio costante può impiegare $n$ passi anche solo per leggere l'input.

$M$ decide $L$, quindi si ferma su ogni input; se ripetesse una configurazione, non si fermerebbe più. Tutte le configurazioni che attraversa sono quindi diverse, e i passi sono al più $N \le k^{f(n)}$. Dunque $L \in \mathrm{TIME}(k^{f(n)})$.

## Un esempio con i numeri

Prendi $|K| = 5$, $|\Sigma| = 2$, un nastro di lavoro, $n = 1000$ e $f(n) = 10$ (va bene, perché $\log_2 1000 \approx 9{,}97$). Il conto esatto è

$$5 \cdot 1001 \cdot 2^{10} \cdot 10 = 51.251.200,$$

circa 51 milioni di configurazioni, quindi al più 51 milioni di passi. La stima $(8 \cdot 5 \cdot 2)^{10} = 80^{10} \approx 1{,}07 \cdot 10^{19}$ è molto più larga, ma ha la forma $k^{f(n)}$ che serve.

## PSPACE dentro EXP

Con $f(n) = n^j$ si ha $k^{n^j} = 2^{n^j \log k}$. Il fattore $\log k$ nell'esponente è una costante, e per $n \ge \log k$ si ha $n^j \log k \le n^{j+1}$, quindi il tempo sta in $\mathrm{TIME}(2^{n^{j+1}}) \subseteq \mathrm{EXP}$. Ogni classe $\mathrm{SPACE}(n^j)$ sta in EXP, e così la loro unione: $\mathrm{PSPACE} \subseteq \mathrm{EXP}$. Non si sa se l'inclusione è stretta.

## Dove si inciampa di solito

Si confonde questo teorema con quello in direzione opposta. Passare dal tempo allo spazio non costa niente, perché ogni cella nuova richiede un passo. Passare dallo spazio al tempo costa un esponenziale, perché nelle stesse celle la macchina può attraversare moltissime configurazioni diverse.

Lo si confonde anche con il teorema di terminazione, che costruisce una macchina nuova con un contatore. Qui la macchina resta $M$: è deterministica e decide $L$, quindi si ferma già, e il teorema conta soltanto quanti passi può fare prima di essere costretta a ripetersi.
