# Teorema delle soluzioni precise

## Prima di leggere

Che cos'è una funzione di complessità propria?

<details><summary>Risposta</summary>

Una funzione $f$ non decrescente per cui esiste una MdT $M_f$ che, su ogni input $x$, scrive sul suo ultimo nastro esattamente $f(|x|)$ quasi-blank $\sqcap$, in tempo $O(|x| + f(|x|))$ e spazio $O(f(|x|))$. Passi e spazio di $M_f$ dipendono solo da $|x|$, non da quali simboli compongono $x$.

</details>

Se la definizione non ti torna, rileggila: tutta la costruzione si appoggia su $M_f$.

## Il problema

Una macchina che decide $L$ in tempo $f(n)$ si ferma entro $f(|x|)$ passi, ma su due input della stessa lunghezza può durare tempi diversi: 5 passi su uno, 8 sull'altro. Lo stesso vale per lo spazio. Una macchina è precisa quando tutte le sue computazioni su input lunghi $n$ durano lo stesso numero di passi e finiscono con nastri di lavoro della stessa lunghezza.

Il teorema dice che, se $f$ è propria, ogni macchina con budget $f(n)$ si può rendere precisa restando in $O(f(n))$.

## L'idea: un metro

$M'$ lavora in due fasi.

Prima esegue $M_f$ su $x$, su nastri suoi. Il risultato è un "metro": un nastro con esattamente $f(|x|)$ simboli $\sqcap$. Questa fase è deterministica e dura un numero di passi che dipende solo da $|x|$, perché $f$ è propria.

Poi simula $M$ e usa il metro in uno di due modi.

Per il tempo, il metro fa da sveglia. Dopo ogni passo simulato di $M$, $M'$ sposta di una cella a destra il cursore sul metro. Se $M$ si ferma prima della fine del metro, $M'$ si segna la risposta nello stato e continua a scorrere il metro fino al primo $\sqcup$. $M$ si ferma sempre entro $f(|x|)$ passi, quindi la simulazione finisce sempre entro la fine del metro e la risposta è quella di $M$.

Per lo spazio, il metro fa da recinto. $M'$ ne fa una copia per ogni nastro di lavoro di $M$ e simula $M$ scrivendo sopra i quasi-blank, che tratta come blank. $M$ usa al più $f(|x|)$ celle per nastro, quindi non esce dal metro. Le celle che $M$ non usa restano $\sqcap$, e un $\sqcap$ occupa la cella come qualunque altro simbolo: alla fine ogni nastro di lavoro è lungo esattamente $f(|x|)$. Per questo il metro è fatto di quasi-blank e non di blank veri: per $M$ si comportano come blank, ma contano nella lunghezza del nastro.

## Un esempio

Sia $f(n) = n^2$ e siano $x$ e $x'$ due input lunghi 3. Il metro ha 9 quasi-blank. Su $x$ la macchina $M$ si ferma dopo 5 passi, su $x'$ dopo 8.

| input | passi simulati di $M$ | passi a vuoto sul metro | totale della seconda fase |
| ----- | --------------------- | ----------------------- | ------------------------- |
| $x$   | 5                     | 4                       | 9                         |
| $x'$  | 8                     | 1                       | 9                         |

La prima fase dura lo stesso su $x$ e su $x'$, perché dipende solo dalla lunghezza, quindi anche il totale è lo stesso.

## Il conto

Per il tempo: i passi di $M_f$, più $f(|x|)$ passi della seconda fase, più una costante. Sono $O(n + f(n)) + f(n) = O(f(n))$, perché un budget di tempo è almeno $n$.

Per lo spazio: $O(f(n))$ per $M_f$, più $k \cdot f(n)$ per le $k$ copie del metro, cioè $O(f(n))$.

Se $M$ è nondeterministica, la simulazione lo è anche lei, ma i conti valgono per ogni computazione: durata e spazio dipendono solo dalla fase deterministica di $M_f$ e dalla lunghezza del metro, uguali per tutte.

## Dove si inciampa di solito

Chi ricostruisce la prova tende a far fermare $M'$ insieme a $M$. Così la durata torna a dipendere dall'input: per $x$ e $x'$ dell'esempio sarebbe 5 contro 8.

L'ipotesi "$f$ propria" serve a costruire il metro senza uscire dal budget. Con una $f$ che si calcola solo in un tempo molto più lungo di $f(n)$, la prima fase da sola sforerebbe.
