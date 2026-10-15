# Corollario di Savitch (spazio nondeterministico)

## Prima di leggere

Prova a rispondere a mente prima di andare avanti.

1. Che cosa dice il Teorema di Savitch, e che cosa contiene una riga della sua pila?
2. Che cos'è il grafo delle configurazioni di una macchina $N$ su un input $x$?

<details><summary>Risposte</summary>

1. $\mathrm{REACHABILITY} \in \mathrm{SPACE}(\log^2 n)$. La pila contiene al più $\lceil \log n \rceil + 1$ triple $(x, y, i)$: due nodi e un intero, $O(\log n)$ bit.
2. I nodi sono le configurazioni di $N$ su $x$, e c'è un arco da $C$ a $C'$ quando $N$ passa da $C$ a $C'$ con una mossa. $N$ accetta $x$ se e solo se dalla configurazione iniziale si raggiunge una configurazione che accetta.

</details>

## L'idea

Sia $N$ una macchina nondeterministica che decide $L$ in spazio $f(n)$, con $f(n) \ge \log n$ funzione propria. $N$ accetta $x$ se e solo se nel grafo delle configurazioni $G(N, x)$ c'è un cammino dalla configurazione iniziale $C_0$ a una che accetta. È un'istanza di REACHABILITY, e l'algoritmo di Savitch la risolve in spazio pari al quadrato del logaritmo del numero di nodi.

Si può anche supporre che $N$, prima di accettare, cancelli i nastri e riporti le testine all'inizio. Questo non costa spazio in più, e lascia un'unica configurazione che accetta, $C_{\text{yes}}$: basta una sola istanza di REACHABILITY, da $C_0$ a $C_{\text{yes}}$.

## Quanti nodi ha il grafo

Una configurazione è fatta dallo stato, dalla posizione della testina sull'input e dal contenuto dei nastri di lavoro: $O(\log n + f(n))$ simboli. Siccome $f(n) \ge \log n$, sono $O(f(n))$ simboli. Il numero di configurazioni è al più $c^{\log n + f(n)} \le (c^2)^{f(n)}$ per una costante $c$, e il suo logaritmo è $O(f(n))$.

## Che cosa cambia rispetto a un grafo sull'input

Nel Teorema di Savitch il grafo è scritto sul nastro di input come matrice di adiacenza. Qui il grafo ha $(c^2)^{f(n)}$ nodi e non lo si scrive mai, perché occuperebbe uno spazio esponenziale. Quando il caso base chiede se $(C, C')$ è un arco, la macchina controlla se $C'$ segue da $C$ con una mossa di $N$: legge il simbolo di $x$ sotto la testina, la cui posizione è scritta in $C$, e consulta la relazione di transizione. Questo controllo usa spazio $O(f(n))$.

I nodi $z$ da provare come punto di mezzo diventano tutte le stringhe lunghe $O(f(n))$. Alcune non sono configurazioni valide, ma non fanno danni: nessun arco entra in una stringa che non è una configurazione, quindi nessun cammino da $C_0$ passa di lì.

Per enumerare queste stringhe, e per fissare il valore iniziale $i = \lceil \log(\text{numero di configurazioni}) \rceil = O(f(n))$, bisogna conoscere $f(n)$. Per questo $f$ deve essere propria: si può calcolare in spazio $O(f(n))$.

## Il conto dello spazio

La ricorsione parte da $i = O(f(n))$ e scende di 1 a ogni chiamata, quindi la pila contiene $O(f(n))$ triple. Ogni tripla contiene due configurazioni e un intero, cioè $O(f(n))$ simboli. Il totale è $O(f(n)) \cdot O(f(n)) = O(f(n)^2)$; in formula, $\log^2(c^{f(n)}) = (f(n) \log c)^2 = O(f(n)^2)$. Lo spazio per il controllo degli archi, $O(f(n))$, è più piccolo e non cambia il conto.

Con $f(n) = \log n$ si ottiene $\mathrm{NL} \subseteq \mathrm{SPACE}(\log^2 n)$.

## Dove si inciampa di solito

L'ipotesi $f(n) \ge \log n$ serve per la testina di input. La sua posizione occupa $\log n$ bit anche se lo spazio di lavoro è minuscolo, e solo con $f(n) \ge \log n$ si può scrivere $O(\log n + f(n)) = O(f(n))$.

Nel tempo la situazione è diversa. Togliere il nondeterminismo nello spazio costa al più un quadrato; nel tempo, per quanto si sa, costa un esponenziale, come nel Teorema 7.4 (c).
