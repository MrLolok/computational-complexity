# Lemma 1 (limite superiore per $H_f$)

## Prima di leggere

1. Che cosa fa una macchina di Turing universale?
2. Che cosa vuol dire che $f$ è una funzione propria?

<details><summary>Risposte</summary>

1. Riceve la descrizione di una macchina $M$ e un input $x$, e simula $M$ su $x$ passo per passo, leggendo il programma di $M$ dalla descrizione.
2. $f$ non decresce ed esiste una MdT $M_f$ che, su ogni input $x$, scrive esattamente $f(|x|)$ simboli in tempo $O(|x| + f(|x|))$ e spazio $O(f(|x|))$. Quei simboli fanno da metro: si possono usare come sveglia o come recinto di memoria.

</details>

Se la seconda risposta non ti tornava, rileggila: la sveglia di questa prova è il metro costruito da $M_f$.

## Il linguaggio $H_f$

$$H_f = \{M;x : M \text{ accetta } x \text{ in al più } f(|x|) \text{ passi}\}.$$

È il problema della fermata con un limite di tempo, e il limite lo rende decidibile: basta simulare $M$ per $f(|x|)$ passi e vedere che cosa succede. Il lemma dice quanto costa farlo, misurando il tempo sulla lunghezza $n$ dell'intero input $M;x$. Siccome $|x| \le n$ e $f$ non decresce, $f(|x|) \le f(n)$.

## L'idea: una macchina universale con la sveglia

La macchina $U_f$ ha quattro nastri:

| nastro | contenuto                                                 |
| ------ | --------------------------------------------------------- |
| 1      | i nastri di $M$, codificati e scritti uno dopo l'altro    |
| 2      | lo stato corrente di $M$ e i simboli sotto i suoi cursori |
| 3      | la descrizione di $M$, cioè il suo programma              |
| 4      | la sveglia: $f(\lvert x \rvert)$ simboli scritti da $M_f$ |

Prima $U_f$ costruisce la sveglia e prepara gli altri nastri, controllando anche che $M$ sia la descrizione corretta di una MdT (se non lo è rifiuta). Poi simula un passo di $M$ alla volta: una scansione del primo nastro raccoglie i simboli sotto i cursori di $M$, una ricerca sul terzo nastro trova la transizione giusta, una seconda scansione applica le modifiche. Dopo ogni passo il cursore della sveglia avanza di una cella.

Se $M$ arriva in "yes" prima che la sveglia finisca, $U_f$ accetta. Se $M$ rifiuta, o se la sveglia arriva in fondo, $U_f$ rifiuta. Con $|x| = 3$ e $f(n) = n^2$, per esempio, la sveglia è lunga 9: se $M$ accetta al passo 7, $U_f$ accetta; se accetterebbe al passo 12, $U_f$ si ferma al passo 9 e rifiuta.

## Il conto: da dove viene il cubo

Costruire la sveglia e preparare i nastri costa $O(n + f(n))$ passi, cioè $O(f(n))$ perché $f(n) \ge n$.

Ogni passo simulato costa di più. $M$ ha $k_M$ nastri lunghi al più $f(|x|)$, e ogni suo stato o simbolo è codificato con $\ell_M$ bit. Le due scansioni del primo nastro costano $O(\ell_M \cdot k_M^2 \cdot f(n))$ (come nel Teorema dello speedup multinastro, il quadrato su $k_M$ viene da una passata per ognuno dei $k_M$ nastri, spostamenti compresi, lungo un nastro che li contiene tutti), la ricerca nel programma $O(n)$, che è al più $O(f(n))$.

Il fattore $\ell_M \cdot k_M^2$ dipende da $M$. Con $M$ fissata sarebbe una costante e la simulazione costerebbe $O(f(n)^2)$. Ma $H_f$ contiene coppie con macchine di ogni tipo, e $U_f$ deve rispettare un unico limite su tutti gli input, quindi quel fattore va limitato con $n$. Stati e simboli compaiono tutti nella descrizione, quindi bastano $\ell_M \le \log n$ bit per codificarli. Il programma ha almeno una riga per ogni combinazione di $k_M$ simboli letti, quindi la descrizione è lunga almeno $2^{k_M}$, e $k_M \le \log n$. Allora

$$\ell_M \cdot k_M^2 \le \log^3 n = O(n) = O(f(n)).$$

Con $n = 1024$, per esempio, una descrizione non può avere più di 10 nastri né simboli di più di 10 bit, e $\ell_M \cdot k_M^2 \le 1000 \le n$.

I tre fattori di $f(n)^3$ vengono da tre cose diverse:

| fattore | da dove viene                                                                    |
| ------- | -------------------------------------------------------------------------------- |
| $f(n)$  | i passi simulati, al più $f(\lvert x \rvert) \le f(n)$                           |
| $f(n)$  | la lunghezza dei nastri di $M$ da scorrere a ogni passo                          |
| $f(n)$  | il sovraccarico $\ell_M \cdot k_M^2$ della codifica, al più $\log^3 n = O(f(n))$ |

Il terzo è il prezzo dell'uniformità su tutte le $M$. Preparazione e ricerca restano sotto questo totale, che è $O(f(n)^3)$, e lo speedup lineare toglie la costante: $H_f \in \mathrm{TIME}(f(n)^3)$.

## Dove si inciampa di solito

Si confondono $f(|x|)$ e $f(n)$. La sveglia conta $f(|x|)$ passi, perché così è definito $H_f$; il tempo di $U_f$ si misura invece su $n = |M;x|$, che comprende anche la descrizione di $M$.

Si prende il cubo per il costo vero di $H_f$. È il costo di questa simulazione, un limite superiore: il lemma non dice che con meno tempo $H_f$ sia impossibile da decidere.
