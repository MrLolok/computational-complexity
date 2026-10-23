# Proposizione (FSAT e SAT)

## Che cosa afferma

SAT chiede se esiste un'assegnazione che rende vera una formula; FSAT chiede di trovarne una, oppure di rispondere "no" se non esiste. La proposizione afferma che **FSAT si risolve in tempo polinomiale se e solo se SAT si risolve in tempo polinomiale**.

## Da FSAT a SAT: basta sapere se troviamo una soluzione

Un verso è immediato: se sappiamo risolvere FSAT, sappiamo anche risolvere SAT. Se FSAT restituisce un'assegnazione rispondiamo "sì", altrimenti "no". Se FSAT è polinomiale, lo è anche questa procedura.

## Da SAT a FSAT: scegliamo una variabile alla volta

Supponiamo di avere un algoritmo deterministico polinomiale $A$ per SAT. Gli chiediamo se la formula $\varphi(x_1, \dots, x_n)$ è soddisfacibile. Se $A(\varphi)$ risponde "no", anche FSAT deve rispondere "no". Se risponde "sì", sappiamo che almeno una soluzione esiste.

Proviamo a fissare $x_1$ a vero e chiediamo a SAT: «Con questa scelta, esiste ancora un modo di assegnare le altre variabili che renda vera la formula?». Se risponde "sì", manteniamo $x_1$ vera. Se risponde "no", fissiamo $x_1$ a falso: **una soluzione esisteva, ma nessuna ha $x_1$ vera**.

Passiamo poi a $x_2$, mantenendo la scelta fatta per $x_1$, e ripetiamo lo stesso ragionamento per tutte le variabili. In simboli, se $a_1, \dots, a_{i-1}$ sono i valori già scelti, chiediamo ad $A$ se è soddisfacibile

$$
\varphi(a_1, \dots, a_{i-1}, \text{vero}, x_{i+1}, \dots, x_n).
$$

Se sì, scegliamo $a_i = \text{vero}$; altrimenti $a_i = \text{falso}$. Ogni domanda riguarda dunque la formula con tutte le scelte precedenti già fissate.

<details><summary>Esempio: costruiamo un'assegnazione</summary>

Per esempio, prendiamo $\varphi = (x_1 \lor x_2) \land \neg x_1$. SAT ci dice che è soddisfacibile. Proviamo $x_1$ vera: la formula diventa falsa, quindi SAT risponde "no" e scegliamo $x_1$ falsa. Con questa scelta la formula si riduce a $x_2$. Proviamo allora $x_2$ vera: SAT risponde "sì". Abbiamo così trovato la soluzione $(\text{falso}, \text{vero})$.

</details>

## Perché il tempo resta polinomiale

Il tempo resta polinomiale: facciamo una chiamata iniziale a SAT e una per ciascuna delle $n$ variabili, quindi $n+1$ chiamate. Le formule ottenute sostituendo le variabili con vero o falso non crescono e si costruiscono in tempo polinomiale. Poiché $n \le |\varphi|$ e ogni chiamata costa tempo polinomiale nella lunghezza della formula, anche il tempo totale è polinomiale. L'argomento presuppone un algoritmo polinomiale per SAT, non dimostra che tale algoritmo esista.
