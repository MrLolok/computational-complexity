# Teorema ($\mathrm{PP} \subseteq \mathrm{PSPACE}$)

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Quando un linguaggio $L$ sta in PP?
2. Quante cifre binarie servono per scrivere il numero $2^m$?

<details><summary>Risposte</summary>

1. Quando una MdT nondeterministica polinomiale, su ogni input $x$, ha più della metà dei run che terminano con "yes" esattamente quando $x \in L$.
2. $m + 1$: un 1 seguito da $m$ zeri. Un numero esponenziale in $m$ occupa solo $m + 1$ cifre.

</details>

Se la seconda risposta ti sembra ovvia, tienila a mente lo stesso: è il motivo per cui i contatori della prova sono piccoli.

## Il problema

Una macchina di PP con tempo $n^c$ ha $2^{n^c}$ run. Per sapere se la maggioranza dice "yes", una macchina deterministica deve contarli, e per quanto se ne sa le serve tempo esponenziale. Il teorema dice che lo spazio invece resta polinomiale.

## L'idea: un run alla volta, sullo stesso spazio

Sia $N$ la macchina standardizzata per $L$: ogni run fa esattamente $n^c$ scelte binarie, quindi i run sono $2^{n^c}$, e una volta fissate le scelte il run è deterministico. La macchina deterministica $M$ tiene sul nastro la sequenza delle scelte del run corrente, esegue quel run, aggiorna il contatore dei "yes" o quello dei "no", cancella lo spazio di lavoro e fa avanzare la sequenza come un contatore binario per passare al run successivo. Esauriti i run, accetta sse i "yes" sono più dei "no", che è proprio l'accettazione a maggioranza di $N$.

| sul nastro              | spazio                                            |
| ----------------------- | ------------------------------------------------- |
| input $x$               | $n$                                               |
| contatore dei "yes"     | $n^c + 1$ cifre, perché arriva al più a $2^{n^c}$ |
| contatore dei "no"      | $n^c + 1$ cifre                                   |
| scelte del run corrente | $n^c$ simboli                                     |
| lavoro del run          | al più $n^c$ celle                                |

Il lavoro di un run sta in $n^c$ celle perché il run fa al più $n^c$ passi e ogni passo tocca al più una cella nuova. Finito un run, $M$ cancella quelle celle e le riusa per il successivo. In totale $M$ usa spazio $O(n^c)$, quindi $L \in \mathrm{SPACE}(n^c) \subseteq \mathrm{PSPACE}$.

## Un esempio con $n^c = 3$

I run sono gli 8 della sequenza di scelte $000, 001, \dots, 111$. Supponi che 5 dicano "yes" e 3 "no". Alla fine il contatore dei "yes" contiene $101$ e quello dei "no" $011$; $5 \gt 3$, quindi $M$ accetta. Il valore più grande che un contatore può raggiungere è 8, cioè $1000$: quattro cifre, $n^c + 1$.

Su scala più grande, con $n^c = 100$ i run sono $2^{100}$, circa $1{,}27 \cdot 10^{30}$, e ogni contatore occupa 101 cifre.

## Dove si inciampa di solito

Viene spontaneo voler conservare tutti i run, o almeno l'esito di ciascuno. Servono soltanto i due conteggi.

Da $\mathrm{PP} \subseteq \mathrm{PSPACE}$ non segue che PP stia in tempo polinomiale. Il tempo di $M$ è circa $2^{n^c} \cdot n^c$, esponenziale.
