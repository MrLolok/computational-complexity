# Computational Complexity · ripasso interattivo

Sito di ripasso per il corso di Computational Complexity: la gerarchia delle classi, i problemi del corso sistemati classe
per classe, i teoremi che li collegano e una libreria con tutte le tracce d'esame risolte, da svolgere una per una.
Tutto viene da dispensa, slide e appunti del corso; quello che viene da fuori è marcato con ✱.

Nasce dalla pagina interattiva "Gerarchia delle classi" (un solo file HTML) e ne è il porting in Next.js.

## Avvio

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build di produzione (tutte le pagine sono prerenderizzate)
```

## Struttura

| Rotta                              | Contenuto                                                  |
| ---------------------------------- | ---------------------------------------------------------- |
| `/`, `/classi/[id]`                | mappa delle inclusioni e scheda della classe               |
| `/problemi`, `/problemi/[id]`      | i problemi del corso, scala delle classi e dettaglio       |
| `/teoremi`                         | elenco dei teoremi per capitolo (`#teorema-<id>`)          |
| `/confronta`, `/confronta/[a]/[b]` | confronto tra due classi                                   |
| `/dp`, `/piani`                    | focus su DP e piani della gerarchia polinomiale            |
| `/esercizi`                        | domande d'esame per classe, quiz sui problemi, flashcard   |
| `/tracce`, `/tracce/[code]`        | libreria delle tracce d'esame ed esecuzione di una traccia |
| `/fonti`                           | come sono state verificate le affermazioni                 |

Il codice è diviso per area del sito; le dipendenze vanno in un verso solo: `app → features → components / lib → data`.

- `src/app/`: le rotte, che compongono le pagine.
- `src/features/<area>/`: logica pura (`.ts`) e componenti (`.tsx`) di un'area: `classes`, `problems`, `theorems`,
  `traces`, `hierarchy` (piani di PH), `turing` (MdT), `probabilistic-quantum` (Lezione 6), `exercises`, `sources`.
  Un'area importa da un'altra solo per mostrarne i contenuti (es. un problema elenca i teoremi che lo citano).
- `src/components/`: solo componenti condivisi da più aree (formule, Markdown, gettoni delle classi, glossario, frecce).
- `src/lib/`: solo funzioni condivise (formule e testo, glossario, `#hash`, classi Tailwind in `tokens.ts`).
- `src/data/<area>/`: i testi del corso, senza logica (classi, problemi, teoremi, domande, `traces/traces.json`
  esportato dalle pagine Notion delle tracce).
- `src/store/`: Redux Toolkit. Lo slice `progress` tiene le risposte date nelle tracce e negli esercizi e viene salvato
  in `localStorage` (chiave `cc-progress:v1`), quindi resta solo nel browser di chi studia.
- Stile: solo Tailwind CSS v4. `src/app/globals.css` contiene unicamente l'import di Tailwind e i token del tema
  (palette shadow-grey, ghost-white, periwinkle, twilight-indigo, space-indigo); le classi ricorrenti stanno in `src/lib/tokens.ts`.
  L'unico CSS importato è quello della libreria KaTeX per le formule.
