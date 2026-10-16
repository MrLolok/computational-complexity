/* Le macchine di Turing della domanda 8 delle tracce, scritte nel formato del simulatore (src/features/turing/machine.ts).
   Ogni macchina ha un controllo automatico: per ogni input di prova, il risultato atteso. */

export type Expected = { result: "yes" | "no" } | { result: "h"; output: string };
export type MachineSpec = {
    id: string;
    title: string;
    kind: "funzione" | "decisione";
    tapes: number;
    nondet?: boolean;
    oracle?: "SAT" | "CLIQUE";
    /** come si scrive l'input, per l'utente */
    inputHint: string;
    samples: string[];
    source: string;
    /** righe di partenza per chi prova da solo */
    skeleton: string;
    expected: (input: string) => Expected | null;
    tests: () => string[];
};

const bits = (max: number, min = 1) => {
    const out: string[] = [];
    for (let n = min; n <= max; n++) for (let i = 0; i < 1 << n; i++) out.push(i.toString(2).padStart(n, "0"));
    if (min === 0) out.unshift("");
    return out;
};
const yes = (ok: boolean): Expected => ({ result: ok ? "yes" : "no" });
const fn = (output: string): Expected => ({ result: "h", output });
const isBits = (s: string) => /^[01]+$/.test(s);
const twoBits = (max: number) => bits(max).flatMap((x) => bits(max).map((y) => `${x};${y}`));

const GO_RIGHT = `s ▷ -> s ▷ R      # supera l'inizio del nastro
s b -> s b R      # vai in fondo
`;
const ONE_TAPE_SKELETON = `# Una riga: stato letto -> nuovo_stato scritto mossa   (mosse: R, L, S)
# Jolly: b = un bit qualsiasi, b̄ = il bit opposto, σ = un simbolo qualsiasi
${GO_RIGHT}s ⊔ -> q ⊔ L      # fine input: da qui tocca a te
`;
const TWO_TAPE_SKELETON = `# Una riga: stato letto1 letto2 -> nuovo_stato scritto1 mossa1 scritto2 mossa2
# Jolly: b = un bit qualsiasi, b̄ = il bit opposto, σ = un simbolo qualsiasi
s ▷ ▷ -> s ▷ R ▷ R   # supera l'inizio dei due nastri
`;

export const MACHINES: MachineSpec[] = [
    {
        id: "incremento",
        title: "Incremento di 1",
        kind: "funzione",
        tapes: 1,
        inputHint: "un numero binario, per esempio 1011",
        samples: ["1011", "11", "0"],
        source: `${GO_RIGHT}s ⊔ -> q ⊔ L      # fine input, inizia il riporto
q 1 -> q 0 L      # 1 + riporto = 0, il riporto continua
q 0 -> h 1 S      # riporto assorbito, fine
q ▷ -> o ▷ R      # overflow
o 0 -> o' 1 R     # la prima cifra diventa 1
o' 0 -> o' 0 R    # scorre le altre cifre
o' ⊔ -> h 0 S     # aggiunge lo 0 in coda`,
        skeleton: ONE_TAPE_SKELETON,
        expected: (x) => {
            if (!isBits(x)) return null;
            if (!x.includes("0")) return fn("1" + "0".repeat(x.length));
            return fn((parseInt(x, 2) + 1).toString(2).padStart(x.length, "0"));
        },
        tests: () => bits(7),
    },
    {
        id: "per-2",
        title: "Moltiplicazione per 2",
        kind: "funzione",
        tapes: 1,
        inputHint: "un numero binario, per esempio 101",
        samples: ["101", "1"],
        source: `${GO_RIGHT}s ⊔ -> h 0 S      # fine input: scrive 0 e si ferma`,
        skeleton: ONE_TAPE_SKELETON,
        expected: (x) => (isBits(x) ? fn(x + "0") : null),
        tests: () => bits(7),
    },
    {
        id: "per-4",
        title: "Moltiplicazione per 4",
        kind: "funzione",
        tapes: 1,
        inputHint: "un numero binario, per esempio 101",
        samples: ["101", "0"],
        source: `${GO_RIGHT}s ⊔ -> q 0 R      # fine input: scrive il primo 0
q ⊔ -> h 0 S      # scrive il secondo 0 e si ferma`,
        skeleton: ONE_TAPE_SKELETON,
        expected: (x) => (isBits(x) ? fn(x + "00") : null),
        tests: () => bits(7),
    },
    {
        id: "diviso-2",
        title: "Divisione intera per 2",
        kind: "funzione",
        tapes: 1,
        inputHint: "un numero binario, per esempio 101",
        samples: ["101", "1"],
        source: `${GO_RIGHT}s ⊔ -> q ⊔ L      # fine input
q b -> r ⊔ L      # cancella l'ultima cifra
r b -> h b S      # è rimasta almeno una cifra
r ▷ -> z ▷ R      # non è rimasto niente…
z ⊔ -> h 0 S      # …quindi scrive 0`,
        skeleton: ONE_TAPE_SKELETON,
        expected: (x) => (isBits(x) ? fn(x.length > 1 ? x.slice(0, -1) : "0") : null),
        tests: () => bits(7),
    },
    {
        id: "diviso-4",
        title: "Divisione intera per 4",
        kind: "funzione",
        tapes: 1,
        inputHint: "un numero binario, per esempio 10110",
        samples: ["10110", "11", "1"],
        source: `${GO_RIGHT}s ⊔ -> q ⊔ L      # fine input, torna sull'ultima cifra
q b -> r ⊔ L      # cancella l'ultima cifra
r b -> t ⊔ L      # cancella la penultima cifra
r ▷ -> z ▷ R      # l'input aveva una sola cifra
t b -> h b S      # è rimasta almeno una cifra: fine
t ▷ -> z ▷ R      # non è rimasto niente…
z ⊔ -> h 0 S      # …quindi scrive 0`,
        skeleton: ONE_TAPE_SKELETON,
        expected: (x) => (isBits(x) ? fn(x.length > 2 ? x.slice(0, -2) : "0") : null),
        tests: () => bits(7),
    },
    {
        id: "resto-2",
        title: "Resto della divisione per 2",
        kind: "funzione",
        tapes: 1,
        inputHint: "un numero binario, per esempio 101",
        samples: ["101", "110"],
        source: `${GO_RIGHT}s ⊔ -> q ⊔ L      # fine input
q 0 -> c0 ⊔ L     # ricorda 0
q 1 -> c1 ⊔ L     # ricorda 1
c0 b -> c0 ⊔ L    # cancella le altre cifre
c1 b -> c1 ⊔ L
c0 ▷ -> w0 ▷ R    # inizio del nastro
c1 ▷ -> w1 ▷ R
w0 ⊔ -> h 0 S     # scrive il resto
w1 ⊔ -> h 1 S`,
        skeleton: ONE_TAPE_SKELETON,
        expected: (x) => (isBits(x) ? fn(x.slice(-1)) : null),
        tests: () => bits(7),
    },
    {
        id: "meno-x",
        title: "Calcolare −x in complemento a due",
        kind: "funzione",
        tapes: 1,
        inputHint: "un numero binario in complemento a due, per esempio 0110",
        samples: ["0110", "0001", "0000"],
        source: `${GO_RIGHT}s ⊔ -> c ⊔ L      # fine input
c 0 -> c 0 L      # copia gli 0 finali
c 1 -> i 1 L      # copia il primo 1, poi inverte
c ▷ -> h ▷ R      # x = 0, quindi −x = 0
i 0 -> i 1 L      # inverte
i 1 -> i 0 L
i ▷ -> h ▷ R      # fine`,
        skeleton: ONE_TAPE_SKELETON,
        expected: (x) => {
            if (!isBits(x)) return null;
            const k = x.lastIndexOf("1");
            if (k < 0) return fn(x);
            return fn([...x.slice(0, k)].map((c) => (c === "0" ? "1" : "0")).join("") + x.slice(k));
        },
        tests: () => bits(7),
    },
    {
        id: "dispari",
        title: "Interi positivi dispari in complemento a due",
        kind: "decisione",
        tapes: 1,
        inputHint: "un numero binario in complemento a due, per esempio 011",
        samples: ["011", "110", "010"],
        source: `s ▷ -> s ▷ R
s 0 -> a 0 R      # segno positivo
s 1 -> no 1 S     # negativo
s ⊔ -> no ⊔ S     # stringa vuota
a b -> a b R      # va in fondo
a ⊔ -> t ⊔ L      # torna sull'ultimo bit
t 1 -> yes 1 S    # dispari
t 0 -> no 0 S     # pari (o zero)`,
        skeleton: `# Una riga: stato letto -> nuovo_stato scritto mossa   (mosse: R, L, S)
# Stati finali per decidere: yes e no
s ▷ -> s ▷ R      # supera l'inizio del nastro
`,
        expected: (x) => (/^[01]*$/.test(x) ? yes(x[0] === "0" && x.endsWith("1")) : null),
        tests: () => bits(7, 0),
    },
    {
        id: "non-palindrome",
        title: "Stringhe non palindrome: macchina nondeterministica",
        kind: "decisione",
        tapes: 2,
        nondet: true,
        inputHint: "una stringa di bit, per esempio 100",
        samples: ["100", "101", "0110"],
        source: `s ▷ ▷ -> s ▷ R ▷ R
s 0 ⊔ -> s 0 R I R      # scelta 1: salta la cifra 0
s 0 ⊔ -> g0 0 R ⊔ S     # scelta 2: confronta la cifra 0
s 1 ⊔ -> s 1 R I R      # scelta 1: salta la cifra 1
s 1 ⊔ -> g1 1 R ⊔ S     # scelta 2: confronta la cifra 1
s ⊔ ⊔ -> no ⊔ S ⊔ S     # nessuna cifra scelta
g0 b ⊔ -> g0 b R ⊔ S    # va in fondo
g1 b ⊔ -> g1 b R ⊔ S
g0 ⊔ ⊔ -> c0 ⊔ L ⊔ L    # torna indietro su entrambi
g1 ⊔ ⊔ -> c1 ⊔ L ⊔ L
c0 b I -> c0 b L I L    # consuma una tacca per passo
c1 b I -> c1 b L I L
c0 1 ▷ -> yes 1 S ▷ R   # cifre simmetriche diverse
c1 0 ▷ -> yes 0 S ▷ R
c0 0 ▷ -> no 0 S ▷ R    # questo ramo rigetta
c1 1 ▷ -> no 1 S ▷ R`,
        skeleton: TWO_TAPE_SKELETON,
        expected: (x) => (/^[01]*$/.test(x) ? yes(x !== [...x].reverse().join("")) : null),
        tests: () => bits(7, 0),
    },
    {
        id: "palindrome-nd",
        title: "Palindrome: macchina nondeterministica a 2 nastri",
        kind: "decisione",
        tapes: 2,
        nondet: true,
        inputHint: "una stringa di bit, per esempio 0110",
        samples: ["101", "0110", "011"],
        source: `s ▷ ▷ -> s ▷ R ▷ R
s b ⊔ -> s b R b R      # scelta 1: copia b, la prima metà continua
s b ⊔ -> m b R ⊔ L      # scelta 2: b è il centro (lunghezza dispari), lo salta
s b ⊔ -> m b S ⊔ L      # scelta 3: la prima metà finisce prima di b (lunghezza pari)
s ⊔ ⊔ -> m ⊔ S ⊔ L      # fine dell'input senza scelte
m b b -> m b R b L      # cifre simmetriche uguali
m ⊔ ▷ -> yes ⊔ S ▷ R    # finite insieme: palindroma`,
        skeleton: TWO_TAPE_SKELETON,
        expected: (x) => (/^[01]*$/.test(x) ? yes(x === [...x].reverse().join("")) : null),
        tests: () => bits(7, 0),
    },
    {
        id: "palindrome",
        title: "Palindrome: macchina deterministica a 2 nastri",
        kind: "decisione",
        tapes: 2,
        inputHint: "una stringa di bit, per esempio 010",
        samples: ["010", "011", "0110"],
        source: `s ▷ ▷ -> s ▷ R ▷ R
s b ⊔ -> s b R b R      # copia l'input
s ⊔ ⊔ -> r ⊔ L ⊔ S      # fine dell'input: la testina 2 resta dopo la copia
r b ⊔ -> r b L ⊔ S      # riavvolge il 1° nastro
r ▷ ⊔ -> c ▷ R ⊔ L      # testina 1 sulla prima cifra, testina 2 sull'ultima
c b b -> c b R b L      # cifre simmetriche uguali
c b b̄ -> no b S b̄ S     # cifre simmetriche diverse
c ⊔ ▷ -> yes ⊔ S ▷ R    # finite insieme: palindroma`,
        skeleton: TWO_TAPE_SKELETON,
        expected: (x) => (/^[01]*$/.test(x) ? yes(x === [...x].reverse().join("")) : null),
        tests: () => bits(7, 0),
    },
    {
        id: "confronto",
        title: "Confronto tra numeri binari: x ≤ y",
        kind: "decisione",
        tapes: 2,
        inputHint: "due numeri binari separati da ;, per esempio 01;10",
        samples: ["01;10", "10;01", "01;100"],
        source: `s ▷ ▷ -> s ▷ R ▷ R
s b ⊔ -> s b R b R      # copia x
s ; ⊔ -> r ; R ⊔ L      # testina 1 sulla prima cifra di y
r σ b -> r σ S b L      # riavvolge il 2° nastro
r σ ▷ -> e σ S ▷ R      # pronto a confrontare
e b b -> e b R b R      # cifre uguali
e 1 0 -> l 1 R 0 R      # x minore di y
e 0 1 -> no 0 S 1 S     # x maggiore di y
l b b' -> l b R b' R    # ormai conta solo la lunghezza
e ⊔ ⊔ -> yes ⊔ S ⊔ S    # stessa lunghezza e x ≤ y
l ⊔ ⊔ -> yes ⊔ S ⊔ S
e b ⊔ -> no b S ⊔ S     # y più lungo
l b ⊔ -> no b S ⊔ S
e ⊔ b -> no ⊔ S b S     # x più lungo
l ⊔ b -> no ⊔ S b S`,
        skeleton: TWO_TAPE_SKELETON,
        expected: (s) => {
            const m = s.match(/^([01]+);([01]+)$/);
            return m ? yes(m[1].length === m[2].length && parseInt(m[1], 2) <= parseInt(m[2], 2)) : null;
        },
        tests: () => twoBits(4),
    },
    {
        id: "somma",
        title: "Somma binaria senza overflow",
        kind: "funzione",
        tapes: 2,
        inputHint: "due numeri binari della stessa lunghezza separati da ;, per esempio 01;10",
        samples: ["01;10", "11;01", "011;01"],
        source: `s ▷ ▷ -> s ▷ R ▷ R
s b ⊔ -> s b R b R      # copia x
s ; ⊔ -> m ; R ⊔ S      # x copiato: la testina 2 aspetta qui
m b ⊔ -> m b R ⊔ S      # scorre y
m ⊔ ⊔ -> c0 ⊔ L ⊔ L     # fine di y: entrambe sull'ultima cifra
c0 0 0 -> c0 0 L 0 L    # 0 + 0 = 0
c0 0 1 -> c0 0 L 1 L    # 0 + 1 = 1
c0 1 0 -> c0 1 L 1 L    # 1 + 0 = 1
c0 1 1 -> c1 1 L 0 L    # 1 + 1 = 10: scrive 0, riporto 1
c1 0 0 -> c0 0 L 1 L    # 0 + 0 + 1 = 1: il riporto si esaurisce
c1 0 1 -> c1 0 L 0 L    # 0 + 1 + 1 = 10
c1 1 0 -> c1 1 L 0 L    # 1 + 0 + 1 = 10
c1 1 1 -> c1 1 L 1 L    # 1 + 1 + 1 = 11: scrive 1, riporto 1
c0 ; ▷ -> h ; S ▷ R     # stessa lunghezza, nessun riporto: x + y è sul 2° nastro
c1 ; ▷ -> no ; S ▷ S    # overflow
c0 ; b -> no ; S b S    # x più lungo
c1 ; b -> no ; S b S
c0 b ▷ -> no b S ▷ S    # y più lungo
c1 b ▷ -> no b S ▷ S`,
        skeleton: TWO_TAPE_SKELETON,
        expected: (s) => {
            const m = s.match(/^([01]+);([01]+)$/);
            if (!m) return null;
            const [, x, y] = m;
            const sum = parseInt(x, 2) + parseInt(y, 2);
            if (x.length !== y.length || sum >= 2 ** x.length) return { result: "no" };
            return fn(sum.toString(2).padStart(x.length, "0"));
        },
        tests: () => twoBits(4),
    },
    {
        id: "chiave",
        title: "Chiave assente dalla lista",
        kind: "decisione",
        tapes: 2,
        inputHint: "key e gli elementi, ognuno seguito da una virgola: per esempio 01,1,011,",
        samples: ["01,00,01,", "01,1,", "1,"],
        source: `s ▷ ▷ -> c ▷ R ▷ R
c b ⊔ -> c b R b R      # copia key
c , ⊔ -> r , R ⊔ L      # fine di key
r σ b -> r σ S b L      # riavvolge il 2° nastro
r σ ▷ -> m σ S ▷ R      # pronto a confrontare
m ⊔ σ -> yes ⊔ S σ S    # lista finita (dopo l'ultima virgola)
m b b -> m b R b R      # finora uguali
m b b̄ -> k b R b̄ S      # cifre diverse
m b ⊔ -> k b R ⊔ S      # elemento più lungo di key
m , b -> r , R b L      # elemento più corto: diverso
m , ⊔ -> no , S ⊔ S     # elemento uguale a key
k b σ -> k b R σ S      # salta il resto dell'elemento
k , σ -> r , R σ L      # passa al prossimo elemento`,
        skeleton: TWO_TAPE_SKELETON,
        expected: (s) => {
            if (!/^([01]+,)+$/.test(s)) return null;
            const [key, ...els] = s.slice(0, -1).split(",");
            return yes(!els.includes(key));
        },
        tests: () => {
            const words = bits(2);
            const out: string[] = [];
            for (const key of bits(3)) {
                out.push(`${key},`);
                for (const a of words) {
                    out.push(`${key},${a},`);
                    for (const b of words) out.push(`${key},${a},${b},`);
                }
            }
            return out;
        },
    },
    {
        id: "sat-unsat",
        title: "SAT-UNSAT con un oracolo SAT",
        kind: "decisione",
        tapes: 2,
        oracle: "SAT",
        inputHint:
            "due formule separate da ;, con variabili e i connettivi ! & | e le parentesi: per esempio (x|y)&!x;x&!x",
        samples: ["(x|y)&!x;x&!x", "x&!x;y", "x;y"],
        source: `s ▷ ▷ -> s ▷ R ▷ R
s σ ⊔ -> s σ R σ R          # copia x
s ; ⊔ -> q? ; S ⊔ S         # "x ∈ SAT?"
s ⊔ ⊔ -> no ⊔ S ⊔ S         # manca ";" (qui σ non comprende ⊔)
qNO ; ⊔ -> no ; S ⊔ S       # x insoddisfacibile
qYES ; ⊔ -> r ; S ⊔ L       # x soddisfacibile: si passa a y
r ; σ -> r ; S ⊔ L          # cancella la query
r ; ▷ -> a ; R ▷ R          # query cancellata
a σ ⊔ -> a σ R σ R          # copia y
a ⊔ ⊔ -> q? ⊔ S ⊔ S         # "y ∈ SAT?"
qYES ⊔ ⊔ -> no ⊔ S ⊔ S      # y soddisfacibile
qNO ⊔ ⊔ -> yes ⊔ S ⊔ S      # x sì, y no`,
        skeleton: `# Una riga: stato letto1 letto2 -> nuovo_stato scritto1 mossa1 scritto2 mossa2
# Il 2° nastro è il nastro di query: nello stato q? l'oracolo risponde e la macchina passa in qYES o qNO
s ▷ ▷ -> s ▷ R ▷ R   # supera l'inizio dei due nastri
`,
        expected: (s) => {
            const parts = s.split(";");
            if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
            return yes(satisfiableRef(parts[0]) && !satisfiableRef(parts[1]));
        },
        tests: () => {
            const f = ["x", "!x", "x&!x", "x|y", "(x|y)&!x&!y", "(x|!y)&y", "x&y&!y", "!(x|!x)"];
            return f.flatMap((a) => f.map((b) => `${a};${b}`));
        },
    },
    {
        id: "independent-set",
        title: "INDEPENDENT SET con un oracolo CLIQUE",
        kind: "decisione",
        tapes: 2,
        oracle: "CLIQUE",
        inputHint:
            'matrice di adiacenza ("," tra gli elementi, ";" tra le righe), poi ":" e K in binario: per esempio 0,1,0;1,0,1;0,1,0:10',
        samples: ["0,1,0;1,0,1;0,1,0:10", "0,1;1,0:10", "0,1,0;1,0,1;0,1,0:11"],
        source: `s ▷ ▷ -> s ▷ R ▷ R
s 0 ⊔ -> s 0 R 1 R      # inverte il bit: c'è un arco nel complemento
s 1 ⊔ -> s 1 R 0 R      # inverte il bit: niente arco nel complemento
s , ⊔ -> s , R , R      # copia il separatore
s ; ⊔ -> s ; R ; R
s : ⊔ -> k : R : R      # fine della matrice
k b ⊔ -> k b R b R      # copia K senza cambiarlo
k ⊔ ⊔ -> q? ⊔ S ⊔ S     # "il complemento ha una cricca di almeno K nodi?"
qYES ⊔ ⊔ -> yes ⊔ S ⊔ S # c'è un independent set di almeno K nodi
qNO ⊔ ⊔ -> no ⊔ S ⊔ S   # non c'è`,
        skeleton: `# Una riga: stato letto1 letto2 -> nuovo_stato scritto1 mossa1 scritto2 mossa2
# Il 2° nastro è il nastro di query: nello stato q? l'oracolo risponde e la macchina passa in qYES o qNO
s ▷ ▷ -> s ▷ R ▷ R   # supera l'inizio dei due nastri
`,
        expected: (s) => {
            const m = s.match(/^([01,;]+):([01]+)$/);
            if (!m) return null;
            const rows = m[1].split(";").map((r) => r.split(","));
            const n = rows.length;
            const K = parseInt(m[2], 2);
            for (let mask = 0; mask < 1 << n; mask++) {
                const nodes = [...Array(n).keys()].filter((i) => mask & (1 << i));
                if (nodes.length >= K && nodes.every((a) => nodes.every((b) => a === b || rows[a][b] === "0")))
                    return yes(true);
            }
            return yes(false);
        },
        tests: () => {
            const out: string[] = [];
            for (let n = 1; n <= 3; n++) {
                const pairs: [number, number][] = [];
                for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) pairs.push([i, j]);
                for (let mask = 0; mask < 1 << pairs.length; mask++) {
                    const m = Array.from({ length: n }, () => Array(n).fill("0"));
                    pairs.forEach(([i, j], k) => {
                        if (mask & (1 << k)) m[i][j] = m[j][i] = "1";
                    });
                    for (let K = 0; K <= 4; K++) out.push(`${m.map((r) => r.join(",")).join(";")}:${K.toString(2)}`);
                }
            }
            return out;
        },
    },
];

/** riferimento indipendente dall'oracolo del simulatore: valuta la formula su tutte le assegnazioni */
function satisfiableRef(formula: string): boolean {
    const vars = [...new Set(formula.match(/[A-Za-z][A-Za-z0-9]*/g) ?? [])];
    for (let m = 0; m < 1 << vars.length; m++) {
        const js = formula
            .replace(/[A-Za-z][A-Za-z0-9]*/g, (v) => String(Boolean(m & (1 << vars.indexOf(v)))))
            .replace(/&/g, "&&")
            .replace(/\|/g, "||");
        if (evalBool(js)) return true;
    }
    return false;
}
function evalBool(expr: string): boolean {
    let i = 0;
    const t = expr.match(/true|false|&&|\|\||!|\(|\)/g) ?? [];
    const or = (): boolean => {
        let v = and();
        while (t[i] === "||") {
            i++;
            const w = and();
            v = v || w;
        }
        return v;
    };
    const and = (): boolean => {
        let v = not();
        while (t[i] === "&&") {
            i++;
            const w = not();
            v = v && w;
        }
        return v;
    };
    const not = (): boolean => {
        const x = t[i++];
        if (x === "!") return !not();
        if (x === "(") {
            const v = or();
            i++;
            return v;
        }
        return x === "true";
    };
    return or();
}

export const MACHINE_BY: Record<string, MachineSpec> = Object.fromEntries(MACHINES.map((m) => [m.id, m]));
