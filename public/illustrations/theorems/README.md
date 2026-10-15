# Dimostrazioni illustrate

93 percorsi, uno per ogni scheda del catalogo, con 3–6 passaggi ciascuno. Le due affermazioni condizionali hanno percorsi di ragionamento, non dimostrazioni di risultati aperti.

Le figure sono generate con il tool integrato GPT-Image. I prompt iniziali e i file selezionati sono in [prompts.json](prompts.json); i prompt delle revisioni sono in [refinements.json](refinements.json). Titoli, didascalie, testi alternativi e coordinate sono in `src/data/theoremWalkthroughs.json`.

Ogni tavola ha 3 colonne e 4 righe di riquadri indipendenti. Il carosello mostra un solo riquadro alla volta attraverso una finestra CSS, con la didascalia fuori dall’immagine. Il numero di passaggi varia con la dimostrazione; le caselle inutilizzate non vengono mostrate. L’ultimo passaggio contiene la conclusione, senza un riepilogo duplicato. Nessun avanzamento automatico.

I passaggi seguono le dimostrazioni in `src/data/theoremProofs.json`; gli schemi restano distinti dalle dimostrazioni complete. Riferimenti di controllo: [Arora e Barak](https://theory.cs.princeton.edu/complexity/) e [Watrous, Quantum Computational Complexity](https://cs.uwaterloo.ca/~watrous/Papers/QuantumComputationalComplexity.pdf). La variante di GO considerata richiede un limite polinomiale alla durata delle partite.

Verifica copertura, coordinate, file ed esempi con `node scripts/check-theorem-walkthroughs.mjs`.
