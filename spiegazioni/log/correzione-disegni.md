# Correzione dei disegni, 16 ottobre 2026

Applicate tutte le correzioni di [DISEGNI-DA-CORREGGERE.md](../DISEGNI-DA-CORREGGERE.md): 41 pannelli dei teoremi e 8 immagini dei problemi, in 25 tavole e 8 file singoli.

Immagini corrette con il tool integrato `image_gen`. Prompt e interventi successivi sono registrati in [theorems/refinements.json](../../public/illustrations/theorems/refinements.json) e [problems/refinements.json](../../public/illustrations/problems/refinements.json), nelle voci con `source: spiegazioni/DISEGNI-DA-CORREGGERE.md`. Le posizioni `panels` partono da zero, nell'ordine della griglia.

Nelle tavole sono stati sostituiti solo i pannelli interessati; gli altri provengono dalle immagini originali. Separazione sui bordi effettivi e ricomposizione in una griglia esatta 3 × 4 di pannelli quadrati da 362 px, con margine interno: risolti anche i ritagli dei teoremi 41, 42, 62, 63, 79, 82, 91 e 92. Gli URL restano quelli già usati dal sito.

## Teoremi

| Percorso            | Slide corrette | Tavola                                                                                           |
| ------------------- | -------------- | ------------------------------------------------------------------------------------------------ |
| linear-speedup      | 4              | [proofs-02-storyboard.webp](../../public/illustrations/theorems/proofs-02-storyboard.webp)       |
| mdt-io              | 2              | [proofs-02-storyboard.webp](../../public/illustrations/theorems/proofs-02-storyboard.webp)       |
| reach-nl            | 3              | [proofs-03-storyboard.webp](../../public/illustrations/theorems/proofs-03-storyboard.webp)       |
| gap-theorem         | 2, 3           | [proofs-04-storyboard-v2.webp](../../public/illustrations/theorems/proofs-04-storyboard-v2.webp) |
| soluzioni-precise   | 3              | [proofs-04-storyboard-v2.webp](../../public/illustrations/theorems/proofs-04-storyboard-v2.webp) |
| hf-lower            | 2, 3           | [proofs-05-storyboard-v2.webp](../../public/illustrations/theorems/proofs-05-storyboard-v2.webp) |
| space-hierarchy     | 4              | [proofs-06-storyboard-v2.webp](../../public/illustrations/theorems/proofs-06-storyboard-v2.webp) |
| time-in-space       | 2              | [proofs-07-storyboard-v2.webp](../../public/illustrations/theorems/proofs-07-storyboard-v2.webp) |
| t7-4c               | 2              | [proofs-08-storyboard.webp](../../public/illustrations/theorems/proofs-08-storyboard.webp)       |
| catena-classi       | 3              | [proofs-09-storyboard-v2.webp](../../public/illustrations/theorems/proofs-09-storyboard-v2.webp) |
| cook-levin          | 6              | [proofs-12-storyboard-v2.webp](../../public/illustrations/theorems/proofs-12-storyboard-v2.webp) |
| clique-nodecover    | 4              | [proofs-15-storyboard-v2.webp](../../public/illustrations/theorems/proofs-15-storyboard-v2.webp) |
| tsp-d               | 1              | [proofs-15-storyboard-v2.webp](../../public/illustrations/theorems/proofs-15-storyboard-v2.webp) |
| tripartite-matching | 2, 3           | [proofs-16-storyboard-v2.webp](../../public/illustrations/theorems/proofs-16-storyboard-v2.webp) |
| integer-programming | 3              | [proofs-17-storyboard.webp](../../public/illustrations/theorems/proofs-17-storyboard.webp)       |
| validity-conp       | 3              | [proofs-18-storyboard-v2.webp](../../public/illustrations/theorems/proofs-18-storyboard-v2.webp) |
| prop-a              | 3              | [proofs-19-storyboard.webp](../../public/illustrations/theorems/proofs-19-storyboard.webp)       |
| altri-dp-completi   | 2              | [proofs-21-storyboard.webp](../../public/illustrations/theorems/proofs-21-storyboard.webp)       |
| pl-psat             | 3              | [proofs-21-storyboard.webp](../../public/illustrations/theorems/proofs-21-storyboard.webp)       |
| t17-8               | 3              | [proofs-22-storyboard-v3.webp](../../public/illustrations/theorems/proofs-22-storyboard-v3.webp) |
| t17-8-cor1          | 2, 3           | [proofs-23-storyboard-v2.webp](../../public/illustrations/theorems/proofs-23-storyboard-v2.webp) |
| t17-8-cor2          | 3              | [proofs-23-storyboard-v2.webp](../../public/illustrations/theorems/proofs-23-storyboard-v2.webp) |
| cor-collasso-primo  | 2              | [proofs-24-storyboard-v2.webp](../../public/illustrations/theorems/proofs-24-storyboard-v2.webp) |
| circ                | 4              | [proofs-24-storyboard-v2.webp](../../public/illustrations/theorems/proofs-24-storyboard-v2.webp) |
| qsat-pspace         | 5              | [proofs-27-storyboard-v2.webp](../../public/illustrations/theorems/proofs-27-storyboard-v2.webp) |
| geography           | 4              | [proofs-28-storyboard-v2.webp](../../public/illustrations/theorems/proofs-28-storyboard-v2.webp) |
| fsat-fnp            | 2              | [proofs-29-storyboard-v2.webp](../../public/illustrations/theorems/proofs-29-storyboard-v2.webp) |
| t20-1               | 2, 3           | [proofs-30-storyboard-v2.webp](../../public/illustrations/theorems/proofs-30-storyboard-v2.webp) |
| nexp-completi       | 1, 2, 6        | [proofs-31-storyboard-v2.webp](../../public/illustrations/theorems/proofs-31-storyboard-v2.webp) |
| pp-pspace           | 3              | [proofs-33-storyboard-v3.webp](../../public/illustrations/theorems/proofs-33-storyboard-v3.webp) |
| bqp                 | 3, 4           | [proofs-34-storyboard-v2.webp](../../public/illustrations/theorems/proofs-34-storyboard-v2.webp) |
| bqp-2exp            | 2, 3           | [proofs-34-storyboard-v2.webp](../../public/illustrations/theorems/proofs-34-storyboard-v2.webp) |

Cook–Levin: verificata la codifica della spiegazione, con variabili distinte per la posizione della testina e clausole di esclusione per ogni coppia di celle. Con T istanti e O(T²) coppie a ogni istante il conteggio è O(T³); aggiornato il pannello 6, mantenendo O(T²) variabili.

GEOGRAPHY: tre rombi consecutivi, ciascuno con entrata, due scelte e uscita comune; l'uscita porta all'entrata del rombo successivo. Il prefisso termina con un esistenziale, eventualmente fittizio. Lo schema delle clausole è separato.

Gerarchia dello spazio: inclusione stretta espressa a parole. CIRC: candidato distinto dal controesempio, con inclusione propria degli atomi anormali esplicita.

BQP: fattori (1/√2)^h e 2^(−h); conservata la sommatoria originale della probabilità, con lo stesso indice per ampiezza e somma. BQP–2EXP: cammino deterministico e inclusione stretta espressa anche a parole.

## Problemi

- [sat-2.webp](../../public/illustrations/problems/sat-2.webp)
- [sat-3.webp](../../public/illustrations/problems/sat-3.webp)
- [validity-3.webp](../../public/illustrations/problems/validity-3.webp)
- [cosat-3.webp](../../public/illustrations/problems/cosat-3.webp)
- [cotsp-3.webp](../../public/illustrations/problems/cotsp-3.webp)
- [succ-1.webp](../../public/illustrations/problems/succ-1.webp)
- [succ-2.webp](../../public/illustrations/problems/succ-2.webp)
- [knap-3.webp](../../public/illustrations/problems/knap-3.webp)

## Didascalie e verifiche

Raccordate solo tre didascalie e i rispettivi alt: `nexp-completi` s2 (indici fino a 2^(n^k)−1), `cor-collasso-primo` s2 (riquadri in colonna) e `geography` s4 (ultimo quantificatore esistenziale). Le altre modifiche preesistenti ai testi sono conservate.

- Controllo visivo di tutti i pannelli corretti e dei ritagli finali.
- Decodifica delle 33 immagini WebP; dimensioni 1086 × 1448 per le tavole, 960 × 640 per i problemi.
- Verifica dei riferimenti alle immagini, delle coordinate dei ritagli e delle formule delle tre didascalie aggiornate.
- `npm run build`: completata, 441 pagine statiche generate.
- Nessun test nel browser; componente del carosello invariato.

## Seconda correzione dei tre residui

Applicate le tre segnalazioni della verifica successiva, con il tool integrato `image_gen`:

- [NEXP s6](../../public/illustrations/theorems/proofs-31-storyboard-v2.webp): ultimo indice della colonna R(i) riportato a 2^n−1. La tabella di s2 conserva 2^(n^k)−1.
- [Matching tripartito s2](../../public/illustrations/theorems/proofs-16-storyboard-v2.webp): ogni terna scelta è racchiusa in un riquadro con tre nodi etichettati. Per x vera: (a₁,b₁,c₁), (a₂,b₂,c₃), con c₂,c₄ liberi. Per x falsa: (a₁,b₂,c₂), (a₂,b₁,c₄), con c₁,c₃ liberi. I nodi liberi sono cerchi vuoti e non hanno collegamenti.
- [TSP s3](../../public/illustrations/theorems/proofs-15-storyboard-v2.webp): eliminate tutte le punte di freccia dal giro; mantenuti città, costi e puntini.

I prompt esatti sono nelle ultime tre voci di [theorems/refinements.json](../../public/illustrations/theorems/refinements.json). Inseriti solo i tre pannelli, con codifica WebP senza perdita: verificato pixel per pixel che gli altri undici pannelli di ciascuna tavola siano identici a prima di questa seconda correzione.

Applicate le nove proposte di didascalia dei file `esito-*.json`, con i rispettivi alt: soluzioni-precise s3, catena-classi s3, tripartite-matching s2 e s3, validity-conp s3, prop-a s3, pl-psat s3, bqp-2exp s2 e KNAPSACK s3. Nessun altro campo dei due manifesti è cambiato in questa passata.

Controlli: confronto visivo dei tre pannelli estratti dalle tavole finali a 362 px; decodifica e dimensioni delle tre WebP; confronto esatto dei pixel fuori dai tre riquadri; formule delle nove didascalie renderizzate con KaTeX senza errori; `git diff --check`. Nessuna nuova build o prova nel browser: questa passata modifica immagini e testi.
