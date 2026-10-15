# Proposizione 2.1 (ricorsivo ⇒ ricorsivamente enumerabile)

## Prima di leggere

Che differenza c'è fra una MdT che *decide* un linguaggio $L$ e una che lo *accetta*?

<details><summary>Risposta</summary>

Una macchina che decide $L$ si ferma su ogni input: in "yes" se $x \in L$, in "no" se $x \notin L$. Una macchina che accetta $L$ si ferma in "yes" se $x \in L$ e non si ferma mai se $x \notin L$; in quel caso si scrive $M(x) = \nearrow$. $L$ è ricorsivo se qualche MdT lo decide, ricorsivamente enumerabile se qualche MdT lo accetta.

</details>

Se la risposta ti sorprende, rileggi che cosa chiede l'accettazione sugli input che non stanno in $L$: è l'unico punto su cui la dimostrazione lavora.

## Perché serve una dimostrazione

Verrebbe da dire che la macchina $M$ che decide $L$ lo accetta già, visto che risponde "yes" proprio sugli elementi di $L$. Non basta: la definizione chiede che sugli altri input la macchina non si fermi, e $M$ invece si ferma in "no". Bisogna modificare $M$ in modo che il rifiuto diventi un ciclo infinito.

## La costruzione

$M'$ ha gli stessi stati e le stesse istruzioni di $M$, più uno stato nuovo, che chiamiamo $q_\infty$. Le istruzioni che in $M$ portano nello stato "no", in $M'$ portano invece in $q_\infty$. In $q_\infty$, qualunque simbolo legga, la macchina lo lascia com'è, sposta il cursore a destra e resta in $q_\infty$. Da $q_\infty$ nessuna istruzione porta a uno stato di arresto, quindi la macchina va avanti per sempre sul nastro, che a destra non finisce.

| input | $M$ | $M'$ |
|---|---|---|
| $x \in L$ | "yes" | "yes" |
| $x \notin L$ | "no" | $\nearrow$ |

Prima riga: $M$ non passa mai da "no", quindi le istruzioni modificate non entrano in gioco e $M'$ fa esattamente le stesse mosse di $M$. Seconda riga: nel punto in cui $M$ si fermerebbe in "no", $M'$ entra in $q_\infty$ e non si ferma più. Le due righe insieme sono la definizione di "$M'$ accetta $L$". Siccome $L$ era un linguaggio ricorsivo qualsiasi, $\mathrm{R} \subseteq \mathrm{RE}$.

## Dove si inciampa di solito

La costruzione va in un verso solo. Per trasformare un ciclo infinito in un "no" bisognerebbe accorgersi che la macchina non si fermerà mai, e in generale non c'è modo di farlo. Anche l'inclusione vale in un verso solo: ci sono linguaggi accettati da una MdT che nessuna MdT decide (il caso classico è il problema dell'arresto).

Un altro errore è pensare che $M'$ rifiuti gli input fuori da $L$. $M'$ non risponde mai "no": su quegli input non dà nessuna risposta, e chi la osserva non può sapere, a un certo momento, se più avanti si fermerà.
