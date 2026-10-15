# HAMILTON PATH è NP-completo

## Prima di leggere

1. Che differenza c'è fra un cammino hamiltoniano e un ciclo hamiltoniano?
2. E fra un cammino hamiltoniano e un cammino euleriano?

<details><summary>Risposte</summary>

1. Il cammino passa per ogni nodo esattamente una volta e non deve tornare al nodo di partenza. Il ciclo invece si chiude sul primo nodo.
2. Il cammino euleriano passa per ogni arco esattamente una volta, quello hamiltoniano per ogni nodo. Il primo si decide facilmente guardando i gradi dei nodi e la connessione del grafo; il secondo è il problema di questo teorema.

</details>

## Il problema

Che HAMILTON PATH stia in NP è immediato. Il certificato è una sequenza di $n$ nodi, con $n$ il numero di nodi del grafo, e si controlla in tempo lineare che ogni nodo compaia una volta e che due nodi consecutivi siano collegati da un arco.

La difficoltà si dimostra riducendo 3SAT, e qui se ne vede lo schema. Un cammino hamiltoniano non ha valori né clausole: di un cammino si controlla solo da quali archi passa. Servono quindi pezzi di grafo, i gadget, in cui la scelta di un arco equivale a una scelta nella formula.

## Lo schema della riduzione

Data una formula $\varphi$, il grafo si costruisce con tre gadget e una chiusura.

- Gadget di scelta. Per ogni variabile $x_i$ ci sono due nodi uniti da due collegamenti alternativi: uno significa "$x_i$ vera", l'altro "$x_i$ falsa". I gadget stanno in fila in una catena, e un cammino hamiltoniano che la percorre usa per ogni variabile uno solo dei due collegamenti, cioè sceglie un valore.
- Gadget XOR. È un piccolo sottografo che lega due archi in modo che ogni cammino hamiltoniano ne attraversi esattamente uno.
- Gadget di clausola. Ogni clausola è un triangolo, con un lato per ciascuno dei suoi tre letterali. Il lato di un letterale è legato con uno XOR al collegamento della catena che rende vero quel letterale: per $x_i$ il collegamento "$x_i$ vera", per $\neg x_i$ il collegamento "$x_i$ falsa". Se il letterale è vero, il cammino percorre quel collegamento e, per lo XOR, non attraversa il lato; se è falso, attraversa il lato.
- Chiusura. I nodi di tutti i triangoli e l'ultimo nodo della catena sono collegati tutti fra loro, e due nodi di estremità obbligano il cammino a partire dall'inizio della catena e a finire nella zona dei triangoli.

Il grafo ha dimensione polinomiale in $\varphi$ e si costruisce in spazio logaritmico.

| nel grafo                                     | nella formula        |
| --------------------------------------------- | -------------------- |
| collegamento usato nel gadget di $x_i$        | valore di $x_i$      |
| lato di un triangolo attraversato             | letterale falso      |
| lato di un triangolo non attraversato         | letterale vero       |
| triangolo con almeno un lato non attraversato | clausola soddisfatta |

## Perché funziona

Se c'è un cammino hamiltoniano, percorrendo la catena fissa un'assegnazione. Il cammino non può attraversare tutti e tre i lati di un triangolo, perché chiuderebbe un ciclo, e un cammino non contiene cicli. Quindi in ogni triangolo almeno un lato non è attraversato, cioè almeno un letterale della clausola è vero.

Viceversa, se $\varphi$ è soddisfacibile, si percorre la catena scegliendo i collegamenti secondo l'assegnazione. Gli XOR fissano quali lati dei triangoli vanno attraversati, e in ogni triangolo almeno un lato resta libero, quello di un letterale vero. I nodi dei triangoli si visitano usando i lati attraversati e gli archi della chiusura, che permettono di passare da un triangolo al successivo fino al nodo finale. Senza la chiusura il cammino non avrebbe modo di spostarsi fra triangoli diversi.

## Dove si inciampa di solito

Viene spontaneo associare il lato attraversato al letterale vero, invece corrisponde al letterale falso. In questo modo il vincolo naturale di un cammino, "non tutti e tre i lati", diventa "non tutti e tre i letterali falsi", cioè la clausola.

Il cammino hamiltoniano non torna al nodo di partenza, e per questo la riduzione aggiunge i nodi di estremità, che fissano dove il cammino comincia e dove finisce.
