# Altri problemi DP-completi

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Quando un linguaggio $L$ sta in DP?
2. Hai un problema di DP e vuoi dimostrare che è DP-completo. Perché ti basta ridurgli SAT-UNSAT?

<details><summary>Risposte</summary>

1. Quando si scrive come $L = L_1 \cap L_2$ con $L_1 \in \mathrm{NP}$ e $L_2 \in \mathrm{coNP}$. Per rispondere sì un'istanza deve superare due controlli: uno di tipo "esiste" e uno di tipo "non esiste".
2. SAT-UNSAT è DP-completo, quindi ogni problema di DP si riduce a lui. Componendo quella riduzione con la tua, da SAT-UNSAT al nuovo problema, ogni problema di DP si riduce al nuovo problema, perché due riduzioni in fila danno ancora una riduzione.

</details>

Se la prima risposta non ti tornava, rileggi la definizione di DP prima di proseguire: tutta la proposizione consiste nello spezzare una domanda in due controlli.

## Che cosa dice

La proposizione elenca alcune domande "esatte" e "critiche":

- EXACT TSP: il giro più corto costa esattamente $B$?
- CRITICAL SAT: la formula $\varphi$ è insoddisfacibile, ma togliendo una qualsiasi clausola diventa soddisfacibile?
- CRITICAL HAMILTON PATH e CRITICAL 3-COLORING: il grafo non ha la proprietà (un cammino hamiltoniano, una 3-colorazione), ma la acquista dopo ognuna delle modifiche ammesse?

Sono tutti DP-completi. UNIQUE SAT ("la formula ha esattamente un assegnamento che la soddisfa?") sta in DP, ma non si sa se sia DP-completo. La prova ha due parti: l'appartenenza a DP, che si mostra per tutti, e la difficoltà, di cui basta lo schema per EXACT TSP.

## Appartenenza: due controlli sulla stessa istanza

"L'ottimo di EXACT TSP vale esattamente $B$" equivale a due frasi. "Esiste un giro di costo $\le B$" sta in NP, con il giro come certificato. "Non esiste un giro di costo $\lt B$" sta in coNP, perché il suo complemento ha come certificato un giro più corto. Un giro da $B$ dice solo che l'ottimo è al più $B$: escludere i giri più economici è la parte coNP.

In CRITICAL SAT, "$\varphi$ è insoddisfacibile" sta in coNP. La seconda metà, "togliendo una qualsiasi clausola diventa soddisfacibile", contiene un "per ogni", eppure sta in NP, perché i casi da coprire sono pochi. Se $\varphi$ ha $m$ clausole, il certificato è una lista di $m$ assegnamenti, uno per ogni clausola tolta: è lunga un polinomio e si verifica controllando $m$ formule.

I due problemi sui grafi seguono lo stesso schema. "Il grafo non ha la proprietà" sta in coNP. Le modifiche possibili sono al più $n^2$, con $n$ il numero di nodi, quindi "dopo ogni modifica la proprietà vale" sta in NP: per ogni modifica basta un certificato, un cammino o una colorazione.

UNIQUE SAT si spezza in "almeno un assegnamento la soddisfa", che sta in NP, e "al più uno la soddisfa", che sta in coNP perché il complemento, "almeno due", ha come certificato due assegnamenti diversi.

## Un esempio con CRITICAL SAT

Prendi $\varphi = (x) \land (\neg x)$. È insoddisfacibile, quindi la parte coNP passa. Togliendo $(x)$ resta $(\neg x)$, soddisfatta da $x = 0$; togliendo $(\neg x)$ resta $(x)$, soddisfatta da $x = 1$. Il certificato per la parte NP è la lista $(x = 0,\ x = 1)$, e la risposta è sì.

Aggiungi una clausola: $\psi = (x) \land (\neg x) \land (y)$. È ancora insoddisfacibile, ma togliendo $(y)$ resta $(x) \land (\neg x)$, che non si soddisfa, quindi alla lista manca un elemento e la risposta è no. La clausola $(y)$ non contribuisce a rendere la formula insoddisfacibile, mentre "critica" chiede che ogni clausola contribuisca.

## Difficoltà: lo schema per EXACT TSP

La riduzione parte da una coppia $(\varphi, \varphi')$ di SAT-UNSAT. Usa la riduzione da 3-SAT a HAMILTON PATH, modificata in modo che il grafo abbia sempre un cammino che "salta" al più un arco. Nell'istanza di TSP le distanze valgono 1 sugli archi del grafo e 2 altrove, quindi il costo ottimo è $N$ se $\varphi$ è soddisfacibile e $N + 1$ se non lo è. Con $\varphi'$ si fa lo stesso raddoppiando le distanze, e il costo ottimo diventa $2N'$ oppure $2N' + 2$. Unendo le due istanze in una sola, il costo ottimo è la somma più una costante fissa $c$ per il collegamento.

| $\varphi$ | $\varphi'$ | costo ottimo |
|---|---|---|
| soddisfacibile | soddisfacibile | $N + 2N' + c$ |
| insoddisfacibile | soddisfacibile | $N + 2N' + c + 1$ |
| soddisfacibile | insoddisfacibile | $N + 2N' + c + 2$ |
| insoddisfacibile | insoddisfacibile | $N + 2N' + c + 3$ |

Si sceglie $B = N + 2N' + c + 2$, il valore del caso "$\varphi$ soddisfacibile, $\varphi'$ no". Il raddoppio tiene distinti i quattro casi. Senza, "$\varphi$ insoddisfacibile" e "$\varphi'$ insoddisfacibile" aggiungerebbero entrambi 1, e il caso sì di SAT-UNSAT costerebbe quanto un caso no. Con il raddoppio lo scarto da $N + 2N' + c$ è un numero binario di due cifre: le unità dicono se fallisce $\varphi$, la cifra del 2 se fallisce $\varphi'$.

CRITICAL SAT, CRITICAL HAMILTON PATH e CRITICAL 3-COLORING richiedono riduzioni da SAT-UNSAT più tecniche, dello stesso tipo: una parte dell'istanza codifica $\varphi$ e deve dare sì, l'altra codifica $\varphi'$ e deve dare no.

## Dove si inciampa di solito

Il "per ogni" di CRITICAL SAT sta in NP solo perché i casi sono polinomiali. "Per ogni assegnamento" ha $2^n$ casi, e una lista con un certificato per caso sarebbe esponenziale: per questo l'insoddisfacibilità resta nella parte coNP.

Per UNIQUE SAT la DP-completezza è una questione aperta: si sa che sta in DP, ma nessuno conosce una riduzione da SAT-UNSAT. Rispondere "non è DP-completo" è sbagliato quanto rispondere "è DP-completo".
