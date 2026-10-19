# Teorema (CIRC SAT e CIRC VALIDITY)

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Che cosa chiede $\mathrm{QSAT}_2$, e per quale classe è completo?
2. Una macchina NP con oracolo NP deve controllare che non esista nessun oggetto con una certa proprietà verificabile in tempo polinomiale. Come fa?

<details><summary>Risposte</summary>

1. Data $\Phi = \exists x_1 \ldots x_n\, \forall y_1 \ldots y_m\, \varphi$, chiede se esiste un assegnamento delle $x$ tale che $\varphi$ sia vera per ogni assegnamento delle $y$. È $\Sigma_2^{\mathrm{P}}$-completo.
2. Chiede all'oracolo "esiste un oggetto con quella proprietà?", che è una domanda NP, e legge la risposta al contrario. È il modo in cui $\mathrm{NP}^{\mathrm{NP}} = \Sigma_2^{\mathrm{P}}$ realizza un "per ogni".

</details>

Se la prima risposta non ti tornava, ripassa $\mathrm{QSAT}_2$: la difficoltà di CIRC SAT si dimostra riducendo proprio quel problema.

## L'idea: regole con eccezioni

Nel ragionamento di tutti i giorni usiamo regole che valgono "di solito". Gli uccelli volano, ma i pinguini sono uccelli e non volano. In logica proposizionale un'eccezione si scrive con un atomo che segnala un'anomalia, per esempio $\mathit{ab}$ (da _abnormal_):

$$\mathit{bird} \land \neg\mathit{ab} \to \mathit{fly}$$

Si legge: "se è un uccello e non c'è niente di anormale, vola". La logica classica però non sa che le anomalie sono rare. Se sappiamo solo che l'animale è un uccello, resta possibile un assegnamento con $\mathit{ab}$ vero e $\mathit{fly}$ falso, quindi la conclusione "vola" non segue.

La circoscrizione aggiunge la regola di buon senso che manca: fra gli assegnamenti che rendono vera la base di conoscenza, si tengono solo quelli con meno anomalie possibile, e si ragiona soltanto su quelli. Le slide lo dicono così: CIRC SAT è SAT più una minimizzazione degli atomi anormali, e questa ottimizzazione fa salire la complessità di un livello, da NP a $\Sigma_2^{\mathrm{P}}$.

Proviamo con l'esercizio delle slide. La base è

$$\mathit{KB} = \{\mathit{bird} \land \neg\mathit{ab} \to \mathit{fly},\ \ \mathit{penguin} \to \mathit{bird},\ \ \mathit{penguin} \to \neg\mathit{fly}\}$$

e l'unico atomo anormale è $\mathit{ab}$. Scriviamo $\models$ per la conseguenza classica (vera in tutti gli assegnamenti che soddisfano la base) e $\models_M$ per quella della circoscrizione (vera in tutti gli assegnamenti tenuti).

| domanda                                                             | risposta | perché                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| $\mathit{KB} \cup \{\mathit{bird}\} \models \mathit{fly}$?          | no       | l'assegnamento con $\mathit{bird}$ e $\mathit{ab}$ veri, $\mathit{fly}$ e $\mathit{penguin}$ falsi soddisfa tutte le formule                                                                                                                              |
| $\mathit{KB} \cup \{\mathit{penguin}\} \models \neg\mathit{fly}$?   | sì       | $\mathit{penguin} \to \neg\mathit{fly}$ con $\mathit{penguin}$ vero dà subito $\neg\mathit{fly}$                                                                                                                                                          |
| $\mathit{KB} \cup \{\mathit{bird}\} \models_M \mathit{fly}$?        | sì       | esiste un assegnamento senza anomalie ($\mathit{bird}$ e $\mathit{fly}$ veri, $\mathit{ab}$ e $\mathit{penguin}$ falsi), quindi quelli con $\mathit{ab}$ vero si scartano; in quelli tenuti $\mathit{ab}$ è falso e la prima regola dà $\mathit{fly}$     |
| $\mathit{KB} \cup \{\mathit{penguin}\} \models_M \neg\mathit{fly}$? | sì       | $\mathit{penguin}$ dà $\mathit{bird}$ e $\neg\mathit{fly}$; con $\mathit{bird}$ vero e $\mathit{fly}$ falso la prima regola è soddisfatta solo se $\mathit{ab}$ è vero, quindi ogni assegnamento ha l'anomalia, nessuno ne ha meno e vengono tenuti tutti |

Confronta la terza riga con la quarta: con il solo $\mathit{bird}$ la circoscrizione conclude che l'animale vola, e aggiungendo $\mathit{penguin}$ quella conclusione cade, perché ora $\mathit{ab}$ è obbligato. Un'informazione in più ha tolto una conclusione: per questo la circoscrizione si chiama logica non monotona.

## Il problema: la circoscrizione

Ora le stesse cose in modo preciso. Una base di conoscenza $\mathit{KB}$ è un insieme di formule proposizionali, e $M$ è l'insieme delle proposizioni anormali, quelle da rendere false quando possibile. Fra due assegnamenti $T$ e $T'$, si scrive $T' \lt_M T$ ($T'$ strettamente più normale di $T$) se ogni $p \in M$ falsa in $T$ è falsa anche in $T'$ e almeno una $p \in M$ vera in $T$ è falsa in $T'$. In altre parole, gli atomi anormali veri in $T'$ formano un sottoinsieme proprio di quelli veri in $T$. Gli atomi fuori da $M$ non entrano nel confronto e possono cambiare liberamente.

Un modello di $\mathit{KB}$, nel senso della circoscrizione, è un $T$ che soddisfa $\mathit{KB}$ e per cui nessun $T'$ che soddisfa $\mathit{KB}$ è strettamente più normale. Sono gli assegnamenti "tenuti" del paragrafo precedente.

Un esempio ancora più piccolo: $\mathit{KB} = \{p \lor q\}$ e $M = \{p, q\}$. Gli assegnamenti che soddisfano $\mathit{KB}$ rendono veri $\{p\}$, $\{q\}$ oppure $\{p, q\}$. I primi due sono modelli; il terzo no, perché $\{p\}$ è più normale. "$p$ vale in qualche modello?" ha risposta sì, grazie a $\{p\}$. "$p$ vale in tutti i modelli?" ha risposta no, per colpa di $\{q\}$.

Il teorema dice che la prima domanda (CIRC SAT: un modello di $\mathit{KB}$ soddisfa $\varphi$?) è $\Sigma_2^{\mathrm{P}}$-completa, e la seconda (CIRC VALIDITY: $\mathit{KB} \models_M \varphi$, cioè $\varphi$ vale in tutti i modelli?) è $\Pi_2^{\mathrm{P}}$-completa.

## Appartenenza: un "esiste" e un "per ogni"

"$T$ non è un modello" sta in NP: si indovina $T'$ e si verifica in tempo polinomiale che $T'$ soddisfi $\mathit{KB}$ e che $T' \lt_M T$. La macchina per CIRC SAT indovina $T$, verifica in tempo polinomiale che soddisfi $\mathit{KB}$ e $\varphi$, chiede all'oracolo se $T$ non è un modello e accetta se la risposta è "no". L'"esiste" è la scelta di $T$; il "per ogni" (nessun $T'$ più normale) sta nella risposta "no" dell'oracolo. Quindi CIRC SAT sta in $\mathrm{NP}^{\mathrm{NP}} = \Sigma_2^{\mathrm{P}}$.

## Difficoltà: la riduzione da $\mathrm{QSAT}_2$

Data $\Phi = \exists x_1 \ldots x_n\, \forall y_1 \ldots y_m\, \varphi$, la riduzione introduce proposizioni nuove $x'_i$ e $y'_j$ e costruisce

$$\mathit{KB} = \{x_i \lor x'_i\} \cup \{y_j \lor y'_j\} \cup \{\varphi \to (y_j \land y'_j)\},$$

con $M$ uguale a tutte le proposizioni e domanda $\varphi$. Ogni modello $T$ ha due proprietà.

- Esattamente una fra $x_i$ e $x'_i$ è vera. Almeno una lo è per la clausola. Se lo fossero entrambe, spegnendo $x'_i$, che compare solo nella sua clausola, $\mathit{KB}$ resterebbe soddisfatta e si otterrebbe un assegnamento più normale. Così i modelli scelgono un valore per ogni $x_i$.
- Se $T$ soddisfa $\varphi$, tutte le $y_j$ e $y'_j$ sono vere, per le implicazioni $\varphi \to (y_j \land y'_j)$. Un modello in cui vale $\varphi$ non sceglie le $y$: le tiene tutte accese, insieme alle $y'$.

Il "per ogni $y$" è affidato alla minimalità. Sia $T$ un assegnamento con le $x$ fissate, $x'_i = \neg x_i$ e tutte le $y$, $y'$ vere. Se qualche assegnamento delle $y$ falsifica $\varphi$, si costruisce $T'$ con le stesse $x$ e $x'$, quelle $y$ e $y'_j = \neg y_j$. $T'$ soddisfa le clausole, e le implicazioni sono vere perché $\varphi$ è falsa; ha una sola proposizione accesa per coppia di $y$, mentre $T$ le ha accese entrambe, quindi $T' \lt_M T$ e $T$ non è un modello.

Se invece ogni assegnamento delle $y$ soddisfa $\varphi$, prendi un $T'$ che soddisfa $\mathit{KB}$ e accende solo atomi già accesi in $T$. Non può spegnere l'atomo acceso di una coppia $x_i, x'_i$ (violerebbe la clausola), quindi ha le stesse $x$ di $T$; allora soddisfa $\varphi$ qualunque siano le sue $y$, e per le implicazioni ha tutte le $y$, $y'$ accese. Coincide con $T$, quindi nessun assegnamento è strettamente più normale di $T$, che è un modello. Mettendo insieme, $\Phi$ è vera se e solo se qualche modello di $\mathit{KB}$ soddisfa $\varphi$.

## Un esempio

Prendi $\Phi = \exists x\, \forall y\, (x \lor y)$, vera con $x = 1$. La base è $\mathit{KB} = \{x \lor x',\ y \lor y',\ (x \lor y) \to (y \land y')\}$. Tre assegnamenti che soddisfano $\mathit{KB}$, scritti con gli atomi veri:

| atomi veri      | $\varphi = x \lor y$ | è un modello?                                                       |
| --------------- | -------------------- | ------------------------------------------------------------------- |
| $\{x, y, y'\}$  | vera                 | sì: spegnendo uno o più atomi si viola una formula di $\mathit{KB}$ |
| $\{x', y, y'\}$ | vera                 | no: $\{x', y'\}$ soddisfa $\mathit{KB}$ ed è più normale            |
| $\{x', y'\}$    | falsa                | sì                                                                  |

La seconda riga è la scelta $x = 0$, e il modello più normale $\{x', y'\}$ è il controesempio $y = 0$: con $x = 0$ e $y = 0$ la formula $x \lor y$ è falsa. La scelta $x = 1$ non ha controesempi, e $\{x, y, y'\}$ resta un modello in cui vale $\varphi$: CIRC SAT risponde sì, come $\mathrm{QSAT}_2$.

## CIRC VALIDITY

$\varphi$ vale in tutti i modelli se e solo se nessun modello soddisfa $\neg\varphi$, cioè se e solo se $(\mathit{KB}, \neg\varphi)$ non sta in CIRC SAT. Sostituire $\varphi$ con $\neg\varphi$ costa tempo polinomiale, quindi CIRC VALIDITY è il complemento di CIRC SAT a meno di questa traduzione, ed è $\Pi_2^{\mathrm{P}}$-completo perché $\Pi_2^{\mathrm{P}} = \mathrm{co}\Sigma_2^{\mathrm{P}}$.

## Dove si inciampa di solito

"Più normale" si decide per inclusione e non contando gli atomi veri. $\{p\}$ e $\{q\}$ hanno un atomo vero ciascuno, ma nessuno dei due è più normale dell'altro, e infatti sono modelli entrambi. Nella riduzione $T'$ batte $T$ perché ha le stesse $x$ e $x'$ e un sottoinsieme delle $y$, $y'$.

CIRC SAT è la circoscrizione, non CIRCUIT SAT. Il secondo chiede se un circuito booleano ha un input che dà uscita 1, ed è NP-completo.
