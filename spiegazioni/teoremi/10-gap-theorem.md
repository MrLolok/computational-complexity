# Gap Theorem (Teorema 7.3)

## Prima di leggere

1. Che cosa vuol dire che una funzione $f$ è ricorsiva?
2. Che cosa chiede, in più, una funzione di complessità propria?

<details><summary>Risposte</summary>

1. Che esiste una MdT che, dato $n$, calcola $f(n)$ e si ferma.
2. Che $f$ sia non decrescente e che una MdT la calcoli entro le risorse che $f$ stessa misura: scrivere $f(|x|)$ simboli in tempo $O(|x| + f(|x|))$ e spazio $O(f(|x|))$. Ricorsiva vuol dire solo calcolabile, in un tempo qualsiasi.

</details>

Tieni presente la differenza fra le due risposte: il teorema costruisce una $f$ che soddisfa la prima definizione ma non la seconda.

## Il problema

Ci si aspetta che più tempo permetta di risolvere più problemi. Il Gap Theorem dice che, se il budget è una funzione ricorsiva qualsiasi, non è sempre così: esiste una $f$ ricorsiva con

$$\mathrm{TIME}(f(n)) = \mathrm{TIME}(2^{f(n)}).$$

Un aumento esponenziale del tempo non porta nessun problema nuovo. Per questo i teoremi di gerarchia chiedono che il budget sia una funzione propria.

## L'idea: un intervallo in cui nessuno si ferma

Si costruisce $f$ in modo che, per ogni lunghezza $n$, nessuna delle macchine considerate si fermi su input lunghi $n$ dopo un numero di passi compreso fra $f(n)$ e $2^{f(n)}$. Allora chi si ferma entro $2^{f(n)}$ passi si ferma già prima di $f(n)$.

1. Si elencano tutte le MdT: $M_0, M_1, M_2, \ldots$
2. Fissato $n$, si definiscono $k_1 = 2n$ e $k_{j+1} = 2^{k_j} + 1$. Ogni intervallo $[k_j, 2^{k_j}]$ comincia subito dopo la fine del precedente, quindi gli intervalli sono disgiunti.
3. Si considerano le macchine $M_0, \ldots, M_n$ su tutti gli input lunghi $n$: sono un numero finito $N$ di computazioni. Una computazione che si ferma lo fa dopo un numero preciso di passi, quindi cade in al più un intervallo; una che non si ferma non cade in nessuno. Con $N + 1$ intervalli, almeno uno resta libero. $f(n)$ è il $k_j$ del primo intervallo libero.

Per calcolare $f(n)$ non serve sapere se una computazione si ferma, cosa che in generale non si può decidere: basta simularla per $2^{k_j}$ passi e guardare se si è fermata dentro l'intervallo. Sono simulazioni finite, quindi $f$ è ricorsiva.

Si guardano solo $M_0, \ldots, M_n$ perché le computazioni da controllare devono essere un numero finito, altrimenti l'intervallo libero potrebbe non esistere. In cambio ogni macchina $M_i$ entra nel conto solo da $n = i$ in poi.

## Un esempio con $n = 1$

Gli intervalli sono $[2, 4]$, $[5, 32]$, $[33, 2^{33}]$, e così via. Con input binari le computazioni da guardare sono 4: due macchine, $M_0$ e $M_1$, su due input, 0 e 1. Supponi che vadano così:

| computazione | si ferma dopo | intervallo |
| ------------ | ------------- | ---------- |
| $M_0$ su 0   | 3 passi       | $[2, 4]$   |
| $M_0$ su 1   | 7 passi       | $[5, 32]$  |
| $M_1$ su 0   | non si ferma  | nessuno    |
| $M_1$ su 1   | 1 passo       | nessuno    |

Il primo intervallo libero è il terzo, quindi $f(1) = 33$. Tutte le computazioni che si fermano entro $2^{33}$ passi lo fanno in meno di 33.

## Perché le due classi coincidono

$\mathrm{TIME}(f(n)) \subseteq \mathrm{TIME}(2^{f(n)})$ è ovvio. Per l'altra inclusione sia $L \in \mathrm{TIME}(2^{f(n)})$, deciso da una macchina $M_i$. Per ogni $n \ge i$, $M_i$ è fra le macchine considerate per $n$. Su un input lungo $n$ si ferma entro $2^{f(n)}$ passi, ma non dentro $[f(n), 2^{f(n)}]$, che è libero: quindi si ferma in meno di $f(n)$ passi.

Restano gli input più corti di $i$. Sono un numero finito, e una macchina può avere le risposte in una tabella scritta negli stati e darle in pochissimi passi. Quindi $L \in \mathrm{TIME}(f(n))$.

Che questa $f$ non sia propria lo si intuisce da come si calcola: per trovare $f(n)$ si simulano macchine fino a $2^{f(n)}$ passi, molto più del tempo $O(n + f(n))$ che una funzione propria concede.

## Dove si inciampa di solito

Il teorema non contraddice i teoremi di gerarchia, che valgono solo per funzioni proprie.

L'enunciato dice che esiste una $f$ ricorsiva fatta così, costruita apposta. Non dice che il tempo in più non serva mai.
