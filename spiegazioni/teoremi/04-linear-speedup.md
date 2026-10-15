# Teorema dello speedup lineare

## Prima di leggere

1. Che cosa vuol dire $L \in \mathrm{TIME}(f(n))$?
2. Una MdT può avere un alfabeto con un miliardo di simboli?

<details><summary>Risposte</summary>

1. Che esiste una MdT, anche a più nastri, che decide $L$ e che su ogni input $x$ si ferma entro $f(|x|)$ passi.
2. Sì. L'alfabeto deve solo essere finito e fissato insieme alla macchina, cioè non dipendere dall'input. Lo stesso vale per gli stati.

</details>

Il teorema usa la seconda risposta: un alfabeto enorme, ma fissato una volta per tutte, permette di fare più lavoro in un passo.

## Il problema

Se $L \in \mathrm{TIME}(f(n))$, allora $L \in \mathrm{TIME}(\varepsilon \cdot f(n) + n + 2)$ per ogni $\varepsilon \gt 0$, piccolo quanto si vuole. Per esempio da $\mathrm{TIME}(150 n^2)$ si scende a $\mathrm{TIME}(n^2 + n + 2)$. Non è ovvio, perché il passo di una MdT è già la mossa più piccola possibile: per fare meno passi, ogni passo deve fare più lavoro.

## L'idea: blocchi di $m$ simboli

$M'$ usa un solo simbolo per un blocco di $m$ simboli consecutivi di $M$. Il suo alfabeto contiene, oltre ai simboli di $M$, tutte le $m$-uple di simboli: $\Sigma' = \Sigma \cup \Sigma^m$. Il numero $m$ dipende solo da $\varepsilon$ e si fissa alla fine.

Per prima cosa $M'$ comprime l'input. Lo legge un simbolo alla volta, tiene nello stato i simboli del blocco corrente e ogni $m$ simboli scrive un blocco su un altro nastro, completando l'ultimo con dei $\sqcup$. Questo costa $n + 2$ passi e non si può accelerare, perché per comprimere l'input bisogna leggerlo, un simbolo per passo. È il termine $n + 2$ dell'enunciato. Spiega anche il nastro in più quando $M$ ne ha uno solo: i blocchi vanno scritti da qualche parte mentre si legge l'originale.

Poi $M'$ simula $M$ a fasi, e ogni fase rifà $m$ passi di $M$. Lo stato di $M'$ contiene lo stato di $M$ e, per ogni nastro, la posizione del cursore di $M$ dentro il suo blocco; il cursore di $M'$ sta sul blocco che contiene quella cella.

Una fase comincia con 4 passi di lettura: su ogni nastro $M'$ va un blocco a sinistra, due a destra e uno a sinistra, e tiene nello stato i due blocchi vicini. Ora conosce i $3m$ simboli intorno a ogni cursore di $M$. In $m$ passi il cursore di $M$ si sposta al più di $m$ celle, quindi resta dentro quei $3m$ simboli, e l'effetto dei prossimi $m$ passi di $M$ è già determinato da ciò che $M'$ ha nello stato. Il programma di $M'$ lo applica direttamente in 2 passi di scrittura, che riscrivono il blocco centrale e uno dei vicini.

Cambia uno solo dei vicini perché, per toccarli entrambi, il cursore di $M$ dovrebbe attraversare tutto il blocco centrale, da un vicino all'altro: servono più di $m$ passi. Se $M$ si ferma durante una fase, $M'$ si ferma con la stessa risposta.

## Il conto

$M'$ spende $n + 2$ passi per comprimere l'input e poi al più 6 passi per ogni gruppo di $m$ passi di $M$. In tutto circa

$$n + 2 + \frac{6}{m} \cdot f(n).$$

Basta scegliere $m$ con $6/m \le \varepsilon$, cioè $m = \lceil 6/\varepsilon \rceil$, e il tempo diventa $\varepsilon \cdot f(n) + n + 2$.

Con i numeri di prima: per passare da $150 n^2$ a $n^2 + n + 2$ serve $\varepsilon = 1/150$, quindi $m = 900$. Per $n = 60$, $M$ fa fino a $150 \cdot 3600 = 540\,000$ passi. $M'$ ne fa 62 per comprimere e poi $6 \cdot 540\,000 / 900 = 3600$, in tutto 3662. Il prezzo è l'alfabeto: con 4 simboli di partenza, i blocchi possibili sono $4^{900} = 2^{1800}$.

## Dove si inciampa di solito

Il termine $n + 2$ non sparisce. Se $f(n)$ è già lineare, per esempio $f(n) = 5n$, il teorema dà $\varepsilon \cdot 5n + n + 2$, che resta almeno $n$: sotto il tempo di lettura dell'input non si scende. Il guadagno vero è sulla parte di $f(n)$ che cresce più di $n$.

La macchina più veloce è un'altra macchina, con un alfabeto e un programma molto più grandi. Quello che il teorema stabilisce riguarda le classi: $\mathrm{TIME}$ non distingue due budget che differiscono per una costante moltiplicativa, e per questo conta solo la notazione $O(\cdot)$.
