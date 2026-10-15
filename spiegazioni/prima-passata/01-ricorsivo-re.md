# Proposizione 2.1 (ricorsivo ⇒ ricorsivamente enumerabile)

## Prima di leggere, una domanda di controllo

Prova a rispondere a mente prima di andare avanti.

1. Che differenza c'è fra una MdT che decide un linguaggio $L$ e una che lo accetta?

<details><summary>Risposta</summary>

1. Una MdT $M$ decide $L$ se si ferma su ogni input: in "yes" se $x \in L$, in "no" se $x \notin L$. Una MdT accetta $L$ se si ferma in "yes" sugli elementi di $L$ e non si ferma mai sugli altri, cioè $M(x) = \nearrow$ per $x \notin L$. I linguaggi decisi da qualche MdT sono i ricorsivi (R), quelli accettati sono i ricorsivamente enumerabili (RE).

</details>

Tutta la proposizione sta in questa differenza: se la risposta non ti tornava, rileggila prima di proseguire.

## Il problema

L'enunciato sembra ovvio, perché una macchina che risponde sempre dovrebbe a maggior ragione saper accettare. Il punto delicato è la definizione di accettazione, che chiede di non fermarsi sugli input fuori da $L$. Una macchina che si ferma in "no" quindi non accetta $L$ in senso tecnico, anche se dà più informazioni.

## L'idea: trasformare il "no" in un ciclo

Sia $M$ una MdT che decide $L$. Si costruisce $M'$ copiando $M$ e cambiando solo le transizioni che portano nello stato "no": al loro posto $M'$ entra in uno stato nuovo $q$ in cui sposta il cursore a destra per sempre. Basta porre $\delta(q, \sigma) = (q, \sigma, \rightarrow)$ per ogni simbolo $\sigma$: il nastro è infinito a destra, quindi la macchina non arriva mai a fermarsi. Tutte le altre transizioni restano uguali, e $M'$ è ancora una MdT.

Su un input $x \in L$, $M$ arriva in "yes" senza mai passare da "no", e $M'$ fa le stesse mosse: $M'(x) = \text{yes}$. Su un input $x \notin L$, $M$ arriverebbe in "no"; proprio in quel momento $M'$ comincia a scorrere a destra e non si ferma più: $M'(x) = \nearrow$.

Questa è esattamente la definizione di "$M'$ accetta $L$", quindi $L \in \mathrm{RE}$. Siccome $L$ era un linguaggio ricorsivo qualsiasi, $\mathrm{R} \subseteq \mathrm{RE}$.

## Dove si inciampa di solito

Il viceversa è falso: esistono linguaggi in RE che non sono ricorsivi, per esempio quello del problema della fermata. La proposizione dimostra solo l'inclusione $\mathrm{R} \subseteq \mathrm{RE}$.

La modifica tocca solo le transizioni verso "no". Sugli input di $L$ la nuova macchina è identica alla vecchia, quindi non serve ricontrollare che risponda bene su quelli.
