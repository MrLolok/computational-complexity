# Teorema di gerarchia per lo spazio (Teorema 7.2)

## Prima di leggere

1. Che cosa dice il teorema di terminazione per le macchine con budget di spazio?
2. Che cosa dice il teorema di compressione dello spazio?

<details><summary>Risposte</summary>

1. Se $M$ decide $L$ in spazio $f(n)$, con $f$ propria, c'è una $M'$ che decide $L$ in spazio $O(f(n))$ e si ferma sempre. $M'$ conta i passi: oltre $|K| \cdot |\Sigma|^{f(n)} \cdot (f(n)+1)$, il numero delle configurazioni, la macchina è in un ciclo e $M'$ la ferma. Il contatore occupa $O(f(n))$ celle.
2. Le costanti moltiplicative nello spazio non contano: $\mathrm{SPACE}(c \cdot f(n)) = \mathrm{SPACE}(f(n))$.

</details>

Se il primo teorema non ti è chiaro, rileggilo prima: qui lo si usa due volte.

## Il problema

L'enunciato è $\mathrm{SPACE}(f(n)) \subsetneq \mathrm{SPACE}(f(n) \cdot \log f(n))$ per $f$ propria. Il gradino è molto più basso di quello per il tempo, dove si passa da $f(n)$ a $f(2n+1)^3$, perché simulare una macchina in spazio costa poco: lo spazio si riusa, e la codifica dei simboli costa solo un fattore costante.

L'enunciato sottintende che $f$ cresca almeno come $\log n$. Con $f$ costante anche $f(n) \cdot \log f(n)$ è solo una costante volte $f(n)$, e per la compressione dello spazio le due classi coincidono.

La prova usa la stessa diagonalizzazione del teorema per il tempo, con una macchina diversa.

## La macchina diagonale $D$

Su un input $w$ lungo $n$, $D$ fa così:

1. segna un recinto di $f(n) \cdot \log f(n)$ celle, che può calcolare perché $f$ è propria; se in seguito deve uscirne, rifiuta;
2. controlla che $w$ sia la descrizione di una macchina $M$ seguita da un numero qualsiasi di zeri, altrimenti rifiuta;
3. simula $M$ sull'input $w$ stesso, scrivendo ogni simbolo di $M$ in binario;
4. conta i passi simulati come nel teorema di terminazione; se il contatore trabocca, $M$ è in un ciclo e $D$ rifiuta;
5. se la simulazione finisce, risponde il contrario di $M$.

$D$ non esce mai dal recinto e si ferma sempre, quindi il suo linguaggio $L(D)$ sta in $\mathrm{SPACE}(f(n) \cdot \log f(n))$. Senza il contatore del punto 4, $D$ potrebbe girare per sempre sulla descrizione di una macchina che cicla, e non deciderebbe niente.

## Perché $L(D)$ non sta in $\mathrm{SPACE}(f(n))$

Supponiamo che una macchina $M$ decida $L(D)$ in spazio $f(n)$. Per il teorema di terminazione possiamo supporre che si fermi sempre.

Per simulare $M$, $D$ scrive ogni simbolo di $M$ con $\ell_M$ bit, quindi i nastri di $M$ le occupano $\ell_M \cdot f(n)$ celle, e il contatore altre $O(f(n))$. In tutto $C_M \cdot f(n)$, con una costante $C_M$ che dipende solo da $M$. Il recinto è $f(n) \cdot \log f(n)$, e $\log f(n)$ cresce senza limite: per $n$ abbastanza grande supera $C_M$, e la simulazione ci sta.

La descrizione di $M$ però ha una lunghezza fissata, e su un input così corto il recinto potrebbe non bastare. Per questo il punto 2 accetta zeri in coda: aggiungendone abbastanza si ottiene un input $w$ lungo quanto serve, che descrive sempre la stessa $M$. Su quel $w$, $D$ completa la simulazione e risponde il contrario di $M$. Ma $M$ decide $L(D)$, quindi $M(w) = D(w)$. Assurdo.

## Un esempio con i numeri

Poniamo che simulare una certa $M$ costi $8 f(n)$ celle in tutto, cioè $C_M = 8$. La simulazione sta nel recinto quando $\log_2 f(n) > 8$, cioè $f(n) > 256$.

- Con $f(n) = n$ basta allungare la descrizione di $M$ con zeri fino a più di 256 simboli.
- Con $f(n) = \log_2 n$ serve $\log_2 n > 256$, cioè $n > 2^{256}$: un input astronomico, ma finito, e alla prova basta che esista.

Per avere un'idea del gradino con $f(n) = \log_2 n$: a $n = 2^{16}$ il budget piccolo è di 16 celle, il recinto di $16 \cdot \log_2 16 = 64$.

## Dove si inciampa di solito

Si pensa che $D$ debba dare la risposta opposta a quella di $M$ su tutti gli input. Basta un input su cui le due macchine differiscono, e la stringa allungata con gli zeri è quell'input.
