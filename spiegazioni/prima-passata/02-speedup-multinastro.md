# Teorema dello speedup multinastro (da $k$ nastri a 1)

## Prima di leggere, una domanda di controllo

Prova a rispondere a mente prima di andare avanti.

1. Che cosa fa una MdT a $k$ nastri in un singolo passo?

<details><summary>Risposta</summary>

1. Legge i $k$ simboli sotto i suoi $k$ cursori e, in base allo stato e a quei simboli, cambia stato, scrive un simbolo su ogni nastro e sposta ogni cursore di una cella (o lo lascia fermo). Una macchina con un nastro solo, per fare la stessa cosa, deve andare a cercare quei $k$ simboli uno per uno.

</details>

## Il problema

Con più nastri una macchina lavora più comoda: può copiare una stringa, confrontare due parti dell'input o tenere un contatore a parte. Il teorema misura quanto si perde tornando a un nastro solo: al più un quadrato. Tempo $f(n)$ con $k$ nastri diventa $O(f(n)^2)$ con un nastro. Per questo la classe P non dipende dal numero di nastri, perché il quadrato di un polinomio è ancora un polinomio.

## L'idea: i nastri in fila

$M'$ scrive i $k$ nastri di $M$ uno dopo l'altro sul suo unico nastro. Ogni nastro simulato comincia con $\triangleright'$ e finisce con $\triangleleft$, e il simbolo sotto ciascun cursore di $M$ è marcato, cioè sostituito da una sua versione sottolineata $\underline{\sigma}$. Con $k = 2$, se il primo nastro di $M$ contiene $abc$ con il cursore su $b$ e il secondo contiene $01$ con il cursore su $1$, il nastro di $M'$ è

$$\triangleright'\; a\; \underline{b}\; c\; \triangleleft\; \triangleright'\; 0\; \underline{1}\; \triangleleft\; \triangleleft$$

Il doppio $\triangleleft$ segna la fine di tutto. Serve un $\triangleright'$ diverso dal vero inizio-nastro $\triangleright$ perché $\triangleright$ fa sempre rimbalzare il cursore verso destra, mentre $M'$ deve poter passare sopra l'inizio di ogni nastro simulato in entrambe le direzioni.

All'inizio $M'$ sposta l'input di una cella, scrive $\triangleright'$ davanti e aggiunge in fondo i $k - 1$ nastri vuoti. Poi ogni passo di $M$ diventa due scansioni:

1. Lettura. $M'$ scorre il nastro e raccoglie i $k$ simboli marcati, ricordandoli nello stato. Gli stati di $M'$ sono coppie (stato di $M$, sequenza di al più $k$ simboli): sono in numero finito perché $K$, $\Sigma$ e $k$ sono fissati.
2. Scrittura. Ora $M'$ conosce lo stato di $M$ e i $k$ simboli letti, quindi sa da $\delta$ che cosa farebbe $M$. Scorre di nuovo il nastro e, a ogni simbolo marcato, scrive il nuovo simbolo e sposta la marcatura sulla cella vicina nella direzione indicata da $\delta$.

C'è un caso speciale. Se un cursore di $M$ deve andare oltre la fine del suo nastro, cioè finirebbe su un $\triangleleft$, serve una cella nuova: $M'$ sposta di una posizione a destra tutto ciò che segue e scrive un blank $\sqcup$ al posto del vecchio $\triangleleft$.

Quando $M$ si ferma, $M'$ cancella i nastri simulati tranne l'ultimo, che contiene l'output, e lo riporta nel formato normale. Quindi $M'(x) = M(x)$.

## Il conto del tempo

In $f(|x|)$ passi ogni nastro di $M$ cresce al più di una cella per passo, quindi è lungo al più $f(|x|) + 1$. Il nastro di $M'$ è lungo al più $k(f(|x|) + 1) + 1$, cioè $O(f(n))$ perché $k$ è una costante.

Simulare un passo costa una scansione avanti e indietro per leggere, più al più $k$ scansioni per scrivere e fare gli eventuali spostamenti, uno per nastro. Ogni scansione percorre $O(k \cdot f(n))$ celle, quindi un passo costa $O(k^2 \cdot f(n))$. Per $f(n)$ passi:

$$f(n) \cdot O(k^2 \cdot f(n)) = O(k^2 \cdot f(n)^2) = O(f(n)^2).$$

Il primo fattore $f(n)$ conta i passi di $M$, il secondo la lunghezza del nastro che $M'$ deve percorrere per simularne uno.

## Dove si inciampa di solito

Nonostante il nome, $M'$ è più lenta di $M$: il teorema dice di quanto, al più un quadrato.

$k$, gli stati e l'alfabeto di $M$ finiscono nel numero di stati di $M'$ e nella costante dell'$O$, non nell'esponente, perché non dipendono dall'input.
