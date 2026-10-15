# Proposizione (algoritmo di Grover sui problemi in NP)

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Come si descrive un problema di NP con i certificati?
2. Quanti certificati candidati ci sono, se un certificato è lungo $n^k$ e usa un alfabeto di $c$ simboli?

<details><summary>Risposte</summary>

1. $x \in L$ sse esiste un certificato $y$, lungo al più polinomialmente in $|x|$, tale che $(x, y) \in R_L$, e la relazione $R_L$ si controlla in tempo polinomiale.
2. Circa $c^{n^k}$: per ognuna delle $n^k$ posizioni ci sono $c$ simboli possibili. La ricerca esaustiva li prova tutti.

</details>

Se la seconda risposta non ti tornava, rifai il conto: il teorema prende la radice quadrata proprio di quel numero.

## Il problema

Un problema di NP è la ricerca di un certificato in un insieme enorme di candidati, e una macchina classica, nel caso peggiore, li prova tutti. L'algoritmo di Grover cerca in un insieme non ordinato di $m$ elementi con circa $\sqrt{m}$ valutazioni invece di $m$. Applicato a NP, mette sotto radice quadrata il tempo della ricerca esaustiva.

## L'idea

Sia $L \in \mathrm{NP}$, con certificati lunghi al più $n^k$ su $c$ simboli e verifica in tempo polinomiale $q(n)$. L'insieme $S$ dei candidati ha circa $c^{n^k}$ elementi, e si pone $f(y) = 1$ sse $(x, y) \in R_L$.

La forza bruta prova tutti i candidati, in tempo $O(q(n) \cdot c^{n^k})$.

Grover trova un $y$ con $f(y) = 1$, se esiste, con errore limitato e $O(\sqrt{|S|})$ valutazioni di $f$. Il tempo è

$$O\big(q(n) \cdot \sqrt{c^{n^k}}\big) = O\big(q(n) \cdot c^{n^k/2}\big).$$

Poi si controlla classicamente $f$ sul $y$ restituito. Se $f(y) = 1$ la risposta è "sì", e non è mai sbagliata, perché $y$ è un certificato vero. Altrimenti la risposta è "no". Se $x \notin L$ il "no" è sempre giusto; l'errore c'è solo se $x \in L$ e Grover non trova il certificato. Ripetendo $k_\varepsilon$ volte l'errore scende sotto $\varepsilon$, e $k_\varepsilon$ è una costante che dipende solo da $\varepsilon$.

Resta il fattore $q(n)$. Lo si assorbe prendendo una base un po' più grande $c' \gt c$: il rapporto $(c'/c)^{n^k/2}$ cresce in modo esponenziale e prima o poi supera il polinomio $q(n)$, quindi per $n$ grande $q(n) \cdot c^{n^k/2} \le c'^{\,n^k/2}$. Il tempo totale è $O(c'^{\,n^k/2})$, la radice quadrata di $c'^{\,n^k}$. La $c$ dell'enunciato va letta così, come una costante opportuna.

## Un esempio: KNAPSACK

Gli oggetti sono $n$ e i candidati sono i loro sottoinsiemi, quindi $|S| = 2^n$. $f(y) = 1$ sse il sottoinsieme $y$ ha peso totale al più $W$ e valore totale almeno $V$, e lo si calcola in $O(n)$. Il costo con Grover è $k_\varepsilon \cdot O(n) \cdot \sqrt{2^n} = O(n \cdot 2^{n/2})$.

Con $n = 60$ la ricerca esaustiva valuta $2^{60} \approx 1{,}15 \cdot 10^{18}$ sottoinsiemi, Grover circa $2^{30} \approx 1{,}07 \cdot 10^9$. Con un budget di circa un miliardo di valutazioni, quindi, la ricerca esaustiva arriva a 30 oggetti e Grover a 60.

## Dove si inciampa di solito

Grover non mette NP in tempo polinomiale quantistico: dimezza l'esponente, e $c^{n^k/2} = (\sqrt{c})^{n^k}$ è ancora un esponenziale, con base $\sqrt{c} \gt 1$.

Il computer quantistico viene spesso immaginato mentre prova tutti i certificati in parallelo e legge quello giusto. Una misura restituisce un solo candidato, scelto con probabilità data dalle ampiezze. Grover aumenta poco a poco l'ampiezza dei certificati validi, e gli servono circa $\sqrt{m}$ passi per farlo.
