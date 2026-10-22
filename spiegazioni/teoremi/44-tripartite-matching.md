# TRIPARTITE MATCHING è NP-completo

## Prima di leggere

1. Nel matching bipartito ci sono $n$ ragazzi, $n$ ragazze e un elenco di coppie compatibili; si chiede se tutti si possono sistemare in $n$ coppie dell'elenco. Si sa risolvere in tempo polinomiale?
2. Che cosa cambia in TRIPARTITE MATCHING?

<details><summary>Risposte</summary>

1. Sì, per esempio trasformandolo in un problema di flusso massimo.
2. Gli insiemi sono tre: $B$ (ragazzi), $G$ (ragazze) e $H$ (case), di $n$ elementi ciascuno, con un elenco $T \subseteq B \times G \times H$ di terne compatibili. Si chiede se esistono $n$ terne di $T$ senza componenti in comune, cioè una sistemazione in cui ogni ragazzo, ragazza e casa compare in una sola terna.

</details>

## Il problema

Che TRIPARTITE MATCHING stia in NP è immediato: il certificato sono le $n$ terne, e si controlla che stiano in $T$ e che non abbiano componenti in comune. Con le coppie il problema è facile, con le terne diventa NP-completo. La difficoltà si dimostra riducendo 3SAT, e qui se ne vede lo schema.

Sia $\varphi$ una formula 3SAT con $m$ clausole di tre letterali, quindi con $3m$ occorrenze di letterali. Ogni occorrenza di una variabile riceve due case: una che resta libera quando la variabile è vera, l'altra quando è falsa.

## Il gadget della variabile

Se $x$ compare $k$ volte, si mettono $k$ ragazzi $b_1, \dots, b_k$, $k$ ragazze $g_1, \dots, g_k$ e le sue $2k$ case $h_1, \dots, h_{2k}$ ad anello, con le terne

$$(b_j, g_j, h_{2j-1}) \quad \text{e} \quad (b_j, g_{j+1}, h_{2j}), \qquad \text{dove } g_{k+1} = g_1.$$

Questi ragazzi e ragazze non compaiono altrove. Se $b_1$ usa la prima terna, resta da sistemare $g_2$, che compare solo con $b_1$ e con $b_2$; $b_1$ è già occupato, quindi $b_2$ usa anche lui la prima terna, e così via lungo l'anello. Se $b_1$ usa la seconda terna, lo stesso ragionamento vale all'indietro partendo da $g_1$. I modi di sistemare il gadget sono quindi due: occupare tutte le case dispari, e restano libere le pari ("$x$ vera"), oppure occupare tutte le pari, e restano libere le dispari ("$x$ falsa").

Con $k = 2$ le terne sono quattro:

```
(b1, g1, h1)   (b1, g2, h2)
(b2, g2, h3)   (b2, g1, h4)
```

"$x$ vera" usa la colonna di sinistra e lascia libere $h_2$ e $h_4$; "$x$ falsa" usa quella di destra e lascia libere $h_1$ e $h_3$. Ogni combinazione mista ripete una ragazza: $(b_1, g_1, h_1)$ con $(b_2, g_1, h_4)$ usa due volte $g_1$, $(b_1, g_2, h_2)$ con $(b_2, g_2, h_3)$ usa due volte $g_2$.

## Clausole e raccolta

Per ogni clausola si aggiungono un ragazzo e una ragazza, con tre terne: una per ogni letterale, verso la casa della sua occorrenza che è libera quando il letterale è vero. Per un letterale $x$ è una casa pari, per $\neg x$ una dispari. La coppia trova casa solo se almeno un suo letterale è vero.

Le case sono $2 \cdot 3m = 6m$. I gadget delle variabili ne occupano $3m$, una per ragazzo, e le clausole $m$, quindi ne avanzano $2m$. Si aggiungono allora $2m$ coppie di raccolta, ognuna con una terna verso ogni casa. Ora ragazzi, ragazze e case sono $6m$ ciascuno, e la costruzione ha dimensione polinomiale.

## Perché funziona

Se $\varphi$ è soddisfacibile, si sistema ogni gadget secondo l'assegnazione, e ogni clausola prende la casa libera di un suo letterale vero. Clausole diverse usano occorrenze diverse, quindi case diverse. Le coppie di raccolta prendono le $2m$ case rimaste.

Se c'è un matching, da come è sistemato ogni gadget si legge il valore della variabile. Ogni coppia di clausola ha una casa, e quella casa è libera solo se il letterale corrispondente è vero: ogni clausola è soddisfatta.

## Dove si inciampa di solito

Il valore vero si legge nelle case lasciate libere. Quando $x$ è vera i ragazzi di $x$ occupano le case dispari, e le pari restano a disposizione delle clausole che contengono $x$.

Ogni occorrenza ha le sue due case. Se due clausole che contengono $x$ puntassero alla stessa casa, se la contenderebbero anche con $x$ vera, e una delle due resterebbe senza.

Senza le coppie di raccolta non ci sarebbe mai un matching. Il problema chiede di sistemare tutti, case comprese, e le $2m$ case avanzate resterebbero vuote anche con $\varphi$ soddisfacibile.
