# Proposizione (le classi deterministiche sono chiuse per complemento)

## Prima di leggere

Se $C$ è una classe di linguaggi, che cosa contiene $\mathrm{co}C$?

<details><summary>Risposta</summary>

I complementi dei linguaggi di $C$: $L \in \mathrm{co}C$ se e solo se $\overline{L} \in C$, dove $\overline{L}$ contiene le stringhe che non stanno in $L$. Per esempio $\mathrm{coNP}$ contiene il complemento di SAT.

</details>

Se avevi in mente "i linguaggi che non stanno in $C$", rileggi la risposta: con quella lettura $C = \mathrm{co}C$ sarebbe impossibile, perché una classe non può coincidere con ciò che le sta fuori.

## L'idea: scambiare le due uscite

Sia $C = \mathrm{TIME}(f(n))$ oppure $\mathrm{SPACE}(f(n))$, e sia $L \in C$. C'è una MdT deterministica $M$ che decide $L$ entro il budget: su ogni input si ferma, in "yes" se $x \in L$ e in "no" se $x \notin L$.

Costruiamo $M'$ copiando il programma di $M$ e scambiando gli stati "yes" e "no": ogni transizione che portava in "yes" ora porta in "no", e viceversa. $M$ è deterministica, quindi su ogni input ha una sola computazione, e $M'$ ripete le stesse mosse. Usa lo stesso tempo e lo stesso spazio e si ferma nello stato opposto. Perciò $M'$ decide $\overline{L}$ entro lo stesso budget, e $\overline{L} \in C$.

Serve che $M$ si fermi sempre. Se su qualche input girasse all'infinito, lo scambio non le farebbe accettare quell'input, che pure sta in $\overline{L}$. "Decide" garantisce che non succeda.

Da "$L \in C$ implica $\overline{L} \in C$" vengono le due inclusioni. Se $L \in \mathrm{co}C$, allora $\overline{L} \in C$, e il complemento di $\overline{L}$, cioè $L$, sta in $C$. Se $L \in C$, allora $\overline{L} \in C$, quindi $L \in \mathrm{co}C$. Dunque $C = \mathrm{co}C$. P è l'unione delle classi $\mathrm{TIME}(n^k)$, ognuna chiusa per complemento, quindi $\mathrm{P} = \mathrm{coP}$.

## Un esempio

$M$ legge una stringa binaria tenendo nello stato la parità degli 1 visti. Al primo blank va in "yes" se gli 1 sono pari, in "no" se sono dispari. Con le uscite scambiate:

| input | numero di 1 | $M$ | $M'$ |
|---|---|---|---|
| 0110 | 2 | yes | no |
| 111 | 3 | no | yes |

$M'$ decide le stringhe con un numero dispari di 1, facendo gli stessi passi di $M$.

## Dove si inciampa di solito

Lo stesso scambio su una macchina nondeterministica non decide il complemento. Prendi una formula con 3 variabili soddisfatta da uno solo degli 8 assegnamenti, e una macchina $N$ che sceglie un assegnamento e accetta se soddisfa la formula. $N$ accetta grazie a un ramo. Dopo lo scambio i 7 rami che rifiutavano accettano, e la nuova macchina accetta una formula che nel complemento non sta. Per il complemento bisognerebbe accettare solo quando tutti i rami di $N$ rifiutano, mentre una macchina nondeterministica accetta appena un ramo accetta. Per questo l'argomento non si estende a NP, e se $\mathrm{NP} = \mathrm{coNP}$ è una domanda aperta.
