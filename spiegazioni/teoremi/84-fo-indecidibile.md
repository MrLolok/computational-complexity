# Indecidibilità del primo ordine

## Prima di leggere, due domande di controllo

Prova a rispondere a mente prima di andare avanti.

1. Che differenza c'è tra un problema in R e un problema in RE?
2. Che differenza c'è tra una formula valida e una formula soddisfacibile?

<details><summary>Risposte</summary>

1. Per un problema in R esiste una MdT che si ferma sempre e risponde sì o no. Per un problema in RE esiste una MdT che si ferma con "sì" sulle istanze sì, mentre sulle istanze no può girare per sempre. coRE contiene i complementi dei problemi di RE, e $\mathrm{R} = \mathrm{RE} \cap \mathrm{coRE}$.
2. Valida vuol dire vera in ogni modello, soddisfacibile vera in almeno un modello. $\exists x\, R(x)$ è soddisfacibile (basta il dominio $\{a\}$ con $R(a)$ vera) ma non valida (con $R$ sempre falsa è falsa).

</details>

Se la prima risposta non ti tornava, ripassa le definizioni di R e RE: il teorema colloca due problemi rispetto a queste classi.

## Che cosa dice

La validità del primo ordine è semidecidibile: una procedura dice "sì" sulle formule valide, ma nessuna procedura si ferma sempre. Per la soddisfacibilità vale lo stesso con i ruoli di "sì" e "no" scambiati.

## Validità in RE: cercare le dimostrazioni

Per il teorema di completezza di Gödel, $\varphi$ è valida sse ha una dimostrazione in un sistema di regole fissato. Una dimostrazione è una stringa finita, e controllare se una stringa è una dimostrazione corretta di $\varphi$ è meccanico: ogni riga deve essere un assioma o seguire dalle righe precedenti con una regola. Una MdT elenca quindi tutte le stringhe, una dopo l'altra, e le controlla. Se $\varphi$ è valida, prima o poi trova la sua dimostrazione e si ferma con "sì". Se non lo è, cerca per sempre.

## Validità non in R: simulare una macchina

Si riduce il problema dell'arresto. Data una MdT $M$ e un input $x$, si scrive

$$\varphi_{M,x} = \mathit{Ax} \to H.$$

$\mathit{Ax}$ sono assiomi che descrivono il calcolo di $M$ su $x$: un predicato dice "al passo $t$ la macchina è nello stato $q$, con la testina in posizione $p$, e sul nastro c'è...", e altri assiomi legano il passo $t$ al successivo secondo le transizioni di $M$. $H$ dice "in qualche passo si raggiunge lo stato di arresto". Da sola $H$ non ha niente a che fare con $M$; con $\mathit{Ax}$ come premessa, l'implicazione chiede che ogni modello che rispetta le regole di $M$ arrivi all'arresto.

- Se $M$ si ferma su $x$, in ogni modello di $\mathit{Ax}$ le configurazioni seguono passo passo quelle vere, quindi arrivano anche a quella di arresto, dopo un numero finito di passi: $\varphi_{M,x}$ è valida.
- Se $M$ non si ferma, il modello "vero", in cui i passi sono i numeri naturali e le configurazioni sono quelle reali del calcolo, rende veri gli assiomi e falsa $H$: $\varphi_{M,x}$ non è valida.

Quindi $M$ si ferma su $x$ sse $\varphi_{M,x}$ è valida. L'arresto non è decidibile, e allora non lo è nemmeno la validità.

## Soddisfacibilità: il complemento

$\varphi$ è soddisfacibile sse $\neg\varphi$ non è valida. A meno di tradurre $\varphi$ in $\neg\varphi$, la soddisfacibilità è il complemento della validità, quindi sta in coRE. Non sta in R, perché R è chiuso per complemento e la validità non è in R. Non sta neppure in RE: altrimenti starebbe in $\mathrm{RE} \cap \mathrm{coRE} = \mathrm{R}$.

| problema | il "sì" arriva? | il "no" arriva? | classe |
|---|---|---|---|
| validità | sì, trovando la dimostrazione | no | RE, non R |
| soddisfacibilità | no | sì, trovando la dimostrazione di $\neg\varphi$ | coRE, non R |

## Dove si inciampa di solito

"Per la soddisfacibilità basta cercare un modello." Funzionerebbe se i modelli fossero sempre finiti, ma alcune formule hanno soltanto modelli infiniti, e un modello infinito non si può scrivere né controllare. Per lo stesso motivo la validità non si decide cercando in parallelo un contromodello.

Questo risultato viene confuso con Schönfinkel-Bernays SAT. Quel frammento, con prefisso $\exists \dots \exists \forall \dots \forall$, senza funzioni e senza uguaglianza, ha modelli piccoli ed è decidibile (NEXP-completo). Senza quelle restrizioni il problema diventa indecidibile.

Indecidibile si riferisce a un unico algoritmo che dovrebbe fermarsi con la risposta giusta su tutte le formule. Di molte formule particolari si sa benissimo se sono valide.
