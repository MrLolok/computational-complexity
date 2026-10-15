# Lemma 2 (limite inferiore per $H_f$)

## Prima di leggere

1. Nella prova che il problema della fermata è indecidibile, che cosa fa la macchina che porta alla contraddizione?
2. Se la descrizione $M$ è lunga $n$, quanto è lunga la stringa $M;M$?

<details><summary>Risposte</summary>

1. Riceve la descrizione di una macchina, chiede al presunto decisore se quella macchina si ferma sulla propria descrizione e fa il contrario. Data in pasto a se stessa, non può comportarsi in nessuno dei due modi.
2. $2n+1$: due copie di $M$ più il separatore.

</details>

Se la prima risposta non ti è familiare, ripassa quella prova: questo lemma usa la stessa idea, con in più un limite di tempo.

## Che cosa dice

$H_f$ contiene le coppie $M;x$ tali che $M$ accetta $x$ in al più $f(|x|)$ passi. Il lemma dice che nessuna macchina lo decide in tempo $f(\lfloor n/2 \rfloor)$, dove $n = |M;x|$ e $\lfloor n/2 \rfloor$ è la parte intera di $n/2$. Detto in modo informale: per sapere che cosa fa $M$ in $f(|x|)$ passi non si può fare molto meglio che simulare quei passi.

## L'idea: la macchina che fa il contrario

Supponiamo per assurdo che una macchina $M_H$ decida $H_f$ in tempo $f(\lfloor n/2 \rfloor)$. Con $M_H$ si costruisce $D_f$:

> $D_f$, su input la descrizione $M$ di una macchina, esegue $M_H$ su $M;M$ e risponde il contrario: "no" se $M_H$ dice "yes", "yes" altrimenti.

In pratica $D_f$ chiede "$M$ accetta la propria descrizione entro $f(|M|)$ passi?" e risponde l'opposto.

Conta il tempo di $D_f$. Se $|M| = n$, l'input $M;M$ è lungo $2n+1$, e $M_H$ impiega $f(\lfloor (2n+1)/2 \rfloor) = f(n)$ passi. A parte il tempo lineare per scrivere due volte l'input, che qui si trascura, $D_f$ si ferma sempre entro $f(n)$ passi. Il $\lfloor n/2 \rfloor$ dell'enunciato compensa il raddoppio dell'input: così $D_f$ sta esattamente nel budget $f(n)$ che $H_f$ controlla quando la macchina è $D_f$ e l'input è la sua descrizione.

## I due casi

Si esegue $D_f$ sulla propria descrizione, lunga $n$. Siccome $D_f$ si ferma sempre, risponde "yes" oppure "no":

| se $D_f(D_f)$ è | allora $M_H(D_f;D_f)$ è | cioè | quindi |
|---|---|---|---|
| yes | no | $D_f$ non accetta $D_f$ entro $f(n)$ passi | $D_f$ si ferma entro $f(n)$ passi, dunque rifiuta: $D_f(D_f) = $ no |
| no | yes | $D_f$ accetta $D_f$ entro $f(n)$ passi | $D_f(D_f) = $ yes |

Uno dei due casi deve valere, e tutti e due si contraddicono. Quindi $M_H$ non esiste, e $H_f \notin \mathrm{TIME}(f(\lfloor n/2 \rfloor))$.

## Dove si inciampa di solito

Si sottovaluta il ruolo del tempo nella prima riga. In generale "non accetta entro $f(n)$ passi" non vuol dire "rifiuta", perché una macchina potrebbe accettare più tardi. Qui le due cose coincidono solo perché $D_f$ si ferma comunque entro $f(n)$ passi, e questo dipende dalla velocità di $M_H$. Se $M_H$ fosse lenta quanto la macchina del Lemma 1, sull'input $D_f;D_f$, lungo $2n+1$, impiegherebbe $f(2n+1)^3$ passi: $D_f$ uscirebbe dal budget $f(n)$ e la prima riga non darebbe nessuna contraddizione. Per questo i due lemmi non si contraddicono.

Sembra un trucco dare a $D_f$ la propria descrizione. $D_f$ è una macchina come le altre e la sua descrizione è una stringa fissata: se $M_H$ esistesse, dovrebbe rispondere correttamente anche su quella.
