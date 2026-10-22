# Problemi NEXP-completi

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Nella dimostrazione di Cook-Levin, che oggetto si costruisce a partire da una macchina $N$ e da un input $x$?
2. Che cosa serve per dire che un problema è NEXP-completo?

<details><summary>Risposte</summary>

1. Una tabella (tableau) con una riga per ogni passo del calcolo e una colonna per ogni cella del nastro, e un circuito (o una formula) soddisfacibile sse si può riempire la tabella in modo che descriva un run accettante di $N$ su $x$. Ogni cella dipende solo dalle tre celle vicine della riga precedente.
2. Che il problema stia in NEXP, e che ogni problema di NEXP si riduca a lui con una riduzione in spazio logaritmico.

</details>

Se la prima risposta non ti tornava, ripassa Cook-Levin: qui lo si usa in versione ingrandita.

## Il problema

Uno dei due problemi viene dai circuiti, l'altro dalla logica. Sono NEXP-completi per lo stesso motivo: l'input è piccolo e descrive un oggetto esponenzialmente grande.

## SUCCINCT CIRCUIT SAT

L'input è un circuito $C$ con $n$ ingressi. Gli si dà il numero binario $i$ di una porta di un circuito enorme $C'$, che può avere fino a $2^n$ porte, e $C$ restituisce il tipo della porta $i$ e i numeri delle porte che la alimentano. La domanda è se $C'$ sia soddisfacibile.

Per stare in NEXP basta ricostruire $C'$, interrogando $C$ per ogni numero di porta ($2^n$ volte, ciascuna in tempo polinomiale), indovinare un input di $C'$ e valutarlo. Tutto richiede tempo nondeterministico esponenziale.

La difficoltà viene da Cook-Levin. Sia $L$ deciso da $N$ nondeterministica in tempo $2^{n^k}$. Applicato a $N$ e a $x$, Cook-Levin dà un circuito $C'_x$ grande quanto una tabella $2^{n^k} \times 2^{n^k}$, soddisfacibile sse $x \in L$. Scriverlo tutto richiede tempo esponenziale, quindi così non è una riduzione. Però $C'_x$ è molto regolare: la porta che calcola la cella (riga $r$, colonna $j$) prende i suoi ingressi dalle porte delle celle $(r-1, j-1)$, $(r-1, j)$, $(r-1, j+1)$, sempre con la stessa regola, quella delle transizioni di $N$. Dal numero di una porta, cioè riga, colonna e ruolo scritti in binario, i predecessori si ottengono sottraendo 1 alla riga e sommando $-1$, $0$ o $+1$ alla colonna, e per la prima riga guardando $x$. Un circuito $C_x$ di dimensione polinomiale fa questi conti, e una macchina lo scrive in spazio logaritmico. La riduzione manda $x$ in $C_x$.

Con $|x| = 10$ e $k = 1$, per esempio, la tabella ha $1024 \times 1024$ celle, circa un milione, e il numero di una cella si scrive con $10 + 10 = 20$ bit. $C_x$ deve solo fare aritmetica su numeri di 20 bit.

## SCHÖNFINKEL-BERNAYS SAT

Le formule hanno la forma

$$\varphi = \exists x_1 \dots \exists x_k\, \forall y_1 \dots \forall y_h\, \psi,$$

con $\psi$ senza quantificatori, senza simboli di funzione e senza uguaglianza. La domanda è se $\varphi$ abbia un modello.

Bastano modelli piccoli. Gli $\exists$ stanno tutti prima dei $\forall$, quindi i testimoni scelti per $x_1, \dots, x_k$ non dipendono dalle $y$: si possono sostituire con $k$ costanti nuove, e la formula resta soddisfacibile o no come prima. Se c'è un modello, restringerlo agli elementi nominati dalle costanti dà ancora un modello, perché una formula con soli $\forall$ vera per tutti gli elementi resta vera per tutti gli elementi di un sottoinsieme. Si cercano quindi modelli con al più $k$ elementi (almeno uno).

Prendi $\exists x\, \forall y\, \mathrm{Conosce}(x, y)$, "esiste una persona che conosce tutti", in un mondo di tre persone in cui Ada conosce tutti. Se restringi il mondo alla sola Ada, resta da verificare $\mathrm{Conosce}(\mathrm{Ada}, \mathrm{Ada})$, che era già vero, e hai un modello di un elemento.

Un algoritmo in NEXP indovina il modello: per ogni predicato di arietà $r$ (numero di argomenti), la sua tabella su $k^r$ tuple. L'arietà può crescere con la formula, quindi una tabella può avere fino a $|\varphi|^{|\varphi|} = 2^{|\varphi| \log |\varphi|}$ righe. Poi controlla $\psi$ su tutte le $k^h$ scelte delle $y$, anche queste in numero esponenziale.

Per la difficoltà si riduce SUCCINCT CIRCUIT SAT. Due costanti fanno da bit 0 e 1, e un predicato $G(z_1, \dots, z_n)$ significa "la porta numero $z_1 \dots z_n$ di $C'$ vale 1". La parte con i $\forall$ impone la correttezza locale: per ogni numero di porta $z$, per ogni $z', z''$ e per ogni valore $w$ delle porte interne di $C$, se $w$ è il calcolo corretto di $C$ su $z$ e $C$ dice che $z$ è un AND con predecessori $z'$ e $z''$, allora $G(z) \iff G(z') \land G(z'')$. Lo stesso vale per OR e NOT, e la porta d'uscita deve valere 1. La formula ha dimensione polinomiale in $C$ e prefisso $\exists \dots \exists \forall \dots \forall$, e ha un modello sse $C'$ è soddisfacibile.

## Dove si inciampa di solito

"I modelli sono piccoli, quindi il problema è facile." Sono piccoli in numero di elementi, al più $k$, ma le tabelle dei predicati crescono come $k^r$ e i controlli come $k^h$, entrambi esponenziali nella lunghezza della formula.

Schönfinkel-Bernays viene confuso con la soddisfacibilità del primo ordine in generale, che è indecidibile. Sono le restrizioni a renderlo decidibile: con un $\forall$ prima di un $\exists$ il testimone dipenderebbe dalla variabile universale e diventerebbe una funzione, e con le funzioni i modelli non sono più limitati.

Alla domanda se un problema NEXP-completo si riduca a uno in P viene da rispondere "non si sa". La risposta è no: tutto NEXP, e quindi anche EXP, starebbe in P, mentre $\mathrm{P} \subsetneq \mathrm{EXP}$ per il teorema di gerarchia del tempo.
