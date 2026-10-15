# Come scriviamo le spiegazioni dei teoremi

Questo file raccoglie il metodo deciso dopo il test sul Teorema di Savitch (ottobre 2026). Le spiegazioni stanno in `spiegazioni/teoremi/`, una per teorema, con nome `NN-id.md` dove `NN` è l'ordine in `src/data/theorems.ts` e `id` è l'id del teorema.

Il sito le mostra così come sono: `src/app/teoremi/page.tsx` legge questi file alla build e ognuno compare nel riquadro "Dimostrazione" (o "Schema della dimostrazione") del suo teorema. Modificare un file cambia il sito al deploy successivo. Il formato deve restare questo, perché il sito lo trasforma:

- prima riga `# <nome>` (non viene mostrata, il nome è già nella scheda);
- sezioni con `##` (diventano sottotitoli della scheda);
- risposte nascoste con `<details><summary>Risposte</summary>` su una riga e `</details>` alla fine, senza altro HTML.

## Obiettivo

Far capire il teorema a chi lo studia: perché è vero, da dove vengono le quantità, dove sta il trucco. Non è materiale per esercitarsi e non è la traccia da scrivere all'esame. Quelle cose il sito le ha già altrove (frase da esame, tracce, esercizi).

## La ricetta: bozza con learn e buchi minimi, poi humanizer

Humanizer va per ultimo, così passa anche sulle frasi aggiunte per colmare i buchi.

### 1. learn

Si parte dalla skill `anthropic-skills:learn`, adattata a un testo statico (la skill è pensata per il dialogo, qui non c'è nessuno che risponde):

- prima i prerequisiti: una o due domande di controllo con la risposta in un `<details>`, solo se il teorema ha prerequisiti veri da verificare;
- poi la spiegazione diretta: il teorema è un concetto nuovo, quindi niente domande socratiche al posto della spiegazione;
- un esempio piccolo svolto quando rende visibile il meccanismo (nel caso di Savitch: un cammino di 8 nodi e la pila delle chiamate nel momento più profondo);
- un blocco di codice o una tabella quando il concetto ha una struttura da vedere (pila, tableau, gadget, tabella di configurazioni);
- una sezione "Dove si inciampa di solito" con gli errori che si fanno davvero (per Savitch: credere che risparmi anche tempo, non capire perché lo spazio si riusa).

### 2. Buchi minimi

Nella bozza, a ogni passaggio, ci si chiede quale "perché?" farebbe uno studente e si risponde con una o due frasi. Esempi tipici dal test:

- da dove viene una quantità ($\log n$, $2^i$, $c^{f(n)}$, una costante);
- perché quella scelta ("perché proprio $2^i$": si dimezza senza arrotondamenti e $i$ conta i dimezzamenti che restano);
- perché c'è un'ipotesi ($f(n) \ge \log n$, "funzione propria", "al più" invece di "esattamente");
- il lemma dato per scontato (un cammino senza nodi ripetuti ha meno di $n$ archi, perché si toglie il giro fra due occorrenze);
- quando due quantità uguali hanno origini diverse, dirlo (i due $\log n$ di $\log^2 n$: livelli della ricorsione e bit per scrivere un nodo);
- un numero concreto quando rende l'ordine di grandezza ($n = 1024$: circa 330 bit contro 1024).

Minimi vuol dire che non si aggiungono corollari (hanno il loro accordion sul sito), storia, dimostrazioni alternative, generalizzazioni o collegamenti ad altri argomenti.

### 3. humanizer, ultima passata

La skill [blader/humanizer](https://github.com/blader/humanizer) (v3.1.0) è installata nel progetto in `.claude/skills/humanizer/`. Si invoca con il comando delle skill sul file della bozza, in modalità file, seguendo i suoi quattro passi: segnare i difetti, riscrivere, ricontrollare, scrivere la versione finale. Le regole che contano di più per questi testi, in italiano:

- niente grassetto decorativo, nemmeno come etichetta all'inizio dei punti di un elenco;
- niente trattini lunghi (— e –): al loro posto virgola, due punti, punto o parentesi;
- titoli in minuscolo tranne la prima lettera e i nomi propri; virgolette dritte;
- niente contrasti "non X ma Y" quando il "non X" non corregge un errore che il lettore farebbe davvero;
- niente aperture e chiusure a effetto: "Attenzione:", "Vediamo", "Ecco", "In sostanza", "Il cuore della questione", frasi finali che ripetono il paragrafo;
- niente parole gonfiate: "fondamentale", "cruciale", "chiave" come aggettivo, "potente", "elegante";
- niente ripetizioni fra sezioni: ogni frase aggiunge qualcosa che il lettore non ha ancora;
- forma attiva quando chiarisce chi fa cosa ("la macchina cancella la tripla" invece di "si cancella la tripla");
- nessun fatto nuovo inventato in questa fase.

## Come si esegue la riscrittura

Le skill si usano davvero, invocandole con il comando delle skill, non riassumendole a memoria. `anthropic-skills:learn` si invoca una volta all'inizio della sessione, perché le sue istruzioni restano caricate; `humanizer` una volta per ogni file. Per ogni teorema:

1. con le istruzioni di learn caricate, scrivere la bozza in `spiegazioni/teoremi/NN-id.md`, con i buchi minimi già colmati;
2. invocare `humanizer` sul file, in modalità file;
3. annotare in `spiegazioni/log/batch-N.md`, per ogni file, i difetti che humanizer ha segnato e che cosa ha cambiato: è la prova che la skill è stata usata;
4. fare i controlli dell'ultima sezione e ricontrollare la matematica.

Se si lavora con più agenti, ogni agente deve invocare le skill da sé e riportare l'esito dell'invocazione nel log. Se una skill non si carica, l'agente si ferma e lo dice, invece di imitarla.

La cartella `spiegazioni/prima-passata/` contiene 19 spiegazioni scritte prima, in un passaggio unico senza invocare humanizer. Non vanno usate come base: servono solo per il confronto.

## Cosa si toglie

Il test ha mostrato che queste parti allungano senza aiutare a capire:

- gli esercizi "Prova tu";
- la spiegazione dei corollari, che sul sito stanno nell'accordion successivo;
- "Come scriverlo all'esame" e "Quando lo hai capito";
- la struttura della skill feynman (tabella dei buchi, due analogie, punti chiave, discorso da 30 secondi).

## Struttura tipo

Le sezioni sono strumenti, non caselle da riempire. Un teorema corto può averne tre.

1. `# <nome del teorema come in theorems.ts>`
2. `## Prima di leggere`: una o due domande di controllo con risposte in `<details>`, più una frase su cosa rileggere se non tornano.
3. `## Il problema` (o un titolo specifico): che cosa dice il teorema e perché non è ovvio.
4. `## L'idea`: la costruzione o l'argomento centrale, con i buchi minimi colmati nel punto in cui nascono.
5. `## Un esempio`: un'istanza piccola svolta, se aiuta.
6. `## Il conto` (spazio, tempo, dimensione della riduzione): da dove viene ogni fattore.
7. `## Dove si inciampa di solito`: gli errori veri.

## Lunghezza

Proporzionata al teorema. Indicativamente:

- proposizioni brevi (dimostrazione di poche righe): 200–450 parole;
- teoremi medi: 450–750 parole;
- teoremi con dimostrazione lunga (Savitch, Cook-Levin, gerarchie, riduzioni con gadget): 700–1000 parole.

La versione approvata di Savitch ha circa 990 parole.

## Regole del sito da rispettare

- Formule in LaTeX come nel resto del sito: `$...$` in linea, `$$...$$` a blocco, classi con `\mathrm{}` (es. `$\mathrm{NSPACE}(f(n))$`).
- Il testo si regge da solo: niente rimandi a lezioni, capitoli, paragrafi o pagine. Un altro teorema si cita per nome ("il Teorema di Savitch"), non per numero di lezione.
- Niente frasi che dicono che la dispensa o le slide sbagliano: le correzioni restano applicate senza commentarle.
- I contenuti vengono da `src/data/theorems.ts` (enunciato, intuizione), `src/data/theoremProofs.json` (dimostrazione, tipo di dimostrazione) e `src/data/theoremWalkthroughs.json` (storyboard). I buchi si colmano con risultati standard di complessità, senza contraddire questi file. Se si trova una contraddizione o un errore nei dati, non lo si corregge in silenzio: lo si segnala a parte.
- Quando la prova è omessa (`"tipo_dimostrazione": "schema"`), la spiegazione arriva al livello dello schema presente nei dati e non ricostruisce la dimostrazione completa.

## Controlli prima di consegnare

- `grep -n '[—–]\|\*\*'` sul file non deve trovare niente;
- i `$` devono essere bilanciati e le formule devono essere le stesse dei dati quando le si riprende;
- ogni numero di un esempio va ricontrollato a mano (per Savitch: lo $z$ trovato a ogni livello, la profondità della pila);
- rileggere cercando le tracce dell'humanizer che sopravvivono più spesso: contrasti, chiusure, elenchi di tre, grassetti.

## Il test che ha portato qui

Backup in `spiegazioni/prove-savitch/`.

| File | Ricetta | Parole | Esito |
|---|---|---|---|
| `1-attuale.md` | testo del sito | 854 | punto di partenza |
| `2-learn-humanizer.md` | learn + humanizer | 1350 | il contenuto migliore, ma con esercizi, corollario e parte d'esame di troppo |
| `3-feynman-learn-humanizer.md` | feynman + learn + humanizer | 1373 | troppo lunga; le analogie aiutano poco |
| `4-humanizer.md` | solo humanizer | 785 | breve e scorrevole, ma lascia i buchi (perché $2^i$, da dove viene $\log n$) |
| `5-humanizer-buchi.md` | 4 + buchi colmati | 1310 | buchi colmati, ma il corollario la allunga |
| `6-learn-humanizer-ridotta.md` | 2 senza le parti di troppo + buchi minimi | 987 | la versione scelta |

Due lezioni dal test. Humanizer da solo migliora la forma ma non la comprensione: non aggiunge esempi né risposte ai "perché". La skill learn rende di più in chat, dove può interrogare; in un testo statico se ne tengono le domande di controllo, l'esempio svolto e gli errori tipici.
