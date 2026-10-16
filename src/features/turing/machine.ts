/* Simulatore di macchine di Turing con la notazione del corso: k nastri, ▷ a inizio nastro, ⊔ cella vuota,
   stati finali h / yes / no, nondeterminismo e stati d'oracolo q? → qYES / qNO.

   Una riga del programma: stato letto₁ … letto_k -> nuovo scritto₁ mossa₁ … scritto_k mossa_k   # commento
   Jolly nei simboli: b e b' (un bit qualsiasi), b̄ (il bit opposto a b), σ (un simbolo qualsiasi tranne ▷).
   Scritto come jolly vale il simbolo letto (b, b', σ; σ scritto su un altro nastro copia quello letto) o l'opposto (b̄).
   Una riga con più simboli esatti ha la precedenza su una con più jolly; se più righe restano valide,
   la macchina è nondeterministica e ogni riga è una scelta. */

export const START = "▷";
export const BLANK = "⊔";
export type Move = -1 | 0 | 1;
export type Rule = {
    line: number;
    from: string;
    read: string[];
    to: string;
    write: string[];
    move: Move[];
    note: string;
};
export type Program = { tapes: number; rules: Rule[] };
export type ParseError = { line: number; message: string };
export type Oracle = { name: string; test: (query: string) => boolean };

const SYM: Record<string, string> = {
    ">": START,
    "|>": START,
    _: BLANK,
    "␣": BLANK,
    "!b": "b̄",
    "~b": "b̄",
    "*": "σ",
    sigma: "σ",
};
export const MOVES: Record<string, Move> = { R: 1, "→": 1, ">": 1, L: -1, "←": -1, "<": -1, S: 0, "-": 0, "=": 0 };
const WILD = new Set(["b", "b'", "b̄", "σ"]);
export const HALT = new Set(["h", "yes", "no"]);
export const QUERY = "q?";

export const sym = (t: string) => SYM[t] ?? t;

export function parseProgram(source: string): { program: Program | null; errors: ParseError[] } {
    const rules: Rule[] = [];
    const errors: ParseError[] = [];
    let tapes = 0;
    source.split("\n").forEach((raw, i) => {
        const line = i + 1;
        const [code, ...rest] = raw.split("#");
        const note = rest.join("#").trim();
        if (!code.trim()) return;
        const [left, right, extra] = code.split("->").map((s) => s.trim());
        if (right === undefined || extra !== undefined) {
            errors.push({ line, message: "serve una sola freccia ->, per esempio: s 0 -> q 1 R" });
            return;
        }
        const l = left.split(/\s+/).filter(Boolean);
        const r = right.split(/\s+/).filter(Boolean);
        const k = l.length - 1;
        if (k < 1) {
            errors.push({ line, message: "a sinistra della freccia servono lo stato e almeno un simbolo letto" });
            return;
        }
        if (r.length !== 1 + 2 * k) {
            errors.push({
                line,
                message: `con ${k} nastr${k === 1 ? "o" : "i"} a destra servono il nuovo stato e ${k === 1 ? "una coppia" : `${k} coppie`} simbolo scritto e mossa`,
            });
            return;
        }
        if (tapes && k !== tapes) {
            errors.push({ line, message: `questa riga usa ${k} nastri, le precedenti ${tapes}` });
            return;
        }
        tapes = k;
        const write: string[] = [];
        const move: Move[] = [];
        for (let t = 0; t < k; t++) {
            const m = MOVES[r[2 + 2 * t]];
            if (m === undefined) {
                errors.push({ line, message: `mossa "${r[2 + 2 * t]}" sconosciuta: usa R (→), L (←) oppure S (-)` });
                return;
            }
            write.push(sym(r[1 + 2 * t]));
            move.push(m);
        }
        const read = l.slice(1).map(sym);
        for (let t = 0; t < k; t++) {
            const w = write[t];
            if (w === "b̄" && !read.includes("b"))
                errors.push({ line, message: "b̄ si può scrivere solo se la riga legge anche b" });
            if ((w === "b" || w === "b'") && !read.includes(w))
                errors.push({ line, message: `${w} si può scrivere solo se la riga legge ${w}` });
            if (w === "σ" && !read.includes("σ"))
                errors.push({ line, message: "σ si può scrivere solo se la riga legge σ" });
        }
        rules.push({ line, from: l[0], read, to: r[0], write, move, note });
    });
    if (!rules.length && !errors.length) errors.push({ line: 0, message: "il programma è vuoto" });
    return { program: errors.length ? null : { tapes, rules }, errors };
}

export type Config = { state: string; tapes: string[][]; heads: number[]; steps: number };
export type Step = { rule: Rule | null; config: Config };

export function initial(program: Program, input: string, tapes = program.tapes): Config {
    const first = [START, ...splitInput(input)];
    return {
        state: "s",
        tapes: [first, ...Array.from({ length: tapes - 1 }, () => [START])],
        heads: Array(tapes).fill(0),
        steps: 0,
    };
}
/** l'input è una stringa di simboli di un carattere; gli spazi vengono ignorati */
export const splitInput = (input: string) => [...input.replace(/\s+/g, "")];
const cell = (tape: string[], i: number) => tape[i] ?? BLANK;
const isBit = (s: string) => s === "0" || s === "1";

function bind(rule: Rule, c: Config): Record<string, string> | null {
    const env: Record<string, string> = {};
    for (let t = 0; t < rule.read.length; t++) {
        const p = rule.read[t];
        const s = cell(c.tapes[t], c.heads[t]);
        if (p === "σ") {
            if (s === START) return null;
            continue;
        }
        if (p === "b" || p === "b'") {
            if (!isBit(s) || (env[p] !== undefined && env[p] !== s)) return null;
            env[p] = s;
        } else if (p !== "b̄" && p !== s) return null;
    }
    for (let t = 0; t < rule.read.length; t++) {
        if (rule.read[t] !== "b̄") continue;
        const s = cell(c.tapes[t], c.heads[t]);
        if (env.b === undefined || !isBit(s) || s === env.b) return null;
    }
    return env;
}
const exact = (r: Rule) => r.read.filter((p) => !WILD.has(p)).length;

/** righe applicabili alla configurazione (più di una: scelta nondeterministica) */
export function applicable(program: Program, c: Config): Rule[] {
    const ok = program.rules.filter((r) => r.from === c.state && bind(r, c));
    const best = Math.max(...ok.map(exact));
    return ok.filter((r) => exact(r) === best);
}

export function apply(rule: Rule, c: Config): Config {
    const env = bind(rule, c)!;
    const tapes = c.tapes.map((t) => [...t]);
    const heads = [...c.heads];
    rule.write.forEach((w, t) => {
        /* σ riscrive il simbolo letto su quel nastro; su un altro nastro copia quello letto come σ */
        const sigma = c.tapes.map((tp, i) => (rule.read[i] === "σ" ? cell(tp, c.heads[i]) : null));
        const out =
            w === "σ"
                ? (sigma[t] ?? sigma.find((x) => x !== null)!)
                : w === "b" || w === "b'"
                  ? env[w]
                  : w === "b̄"
                    ? env.b === "0"
                        ? "1"
                        : "0"
                    : w;
        while (tapes[t].length <= heads[t]) tapes[t].push(BLANK);
        tapes[t][heads[t]] = out;
        heads[t] = heads[t] + rule.move[t];
    });
    return { state: rule.to, tapes, heads, steps: c.steps + 1 };
}

/** nello stato q? l'oracolo risponde sul contenuto del nastro di query (l'ultimo) */
export function ask(c: Config, oracle: Oracle): Config {
    return { ...c, state: oracle.test(content(c.tapes[c.tapes.length - 1])) ? "qYES" : "qNO", steps: c.steps + 1 };
}

/** contenuto di un nastro senza ▷ e senza le celle vuote ai bordi */
export function content(tape: string[]) {
    const s = tape.filter((x, i) => !(i === 0 && x === START));
    let a = 0,
        b = s.length;
    while (a < b && s[a] === BLANK) a++;
    while (b > a && s[b - 1] === BLANK) b--;
    return s.slice(a, b).join("");
}

export type Outcome = {
    result: "yes" | "no" | "h" | "limit";
    output: string;
    steps: number;
    reason?: string;
    path: Step[];
};

/** esegue fino alla fine; con il nondeterminismo cerca un ramo che accetta (o che termina in h) */
export function run(
    program: Program,
    input: string,
    opts: { oracle?: Oracle; limit?: number; tapes?: number } = {},
): Outcome {
    const limit = opts.limit ?? 5000;
    const start = initial(program, input, opts.tapes);
    type Node = { config: Config; path: Step[] };
    let frontier: Node[] = [{ config: start, path: [{ rule: null, config: start }] }];
    let rejected: Outcome | null = null;
    let budget = limit * 4;
    while (frontier.length) {
        const next: Node[] = [];
        for (const n of frontier) {
            const c = n.config;
            const halt = halted(program, c, opts.oracle);
            if (halt) {
                const out: Outcome = {
                    result: halt.result,
                    output: content(c.tapes[c.tapes.length - 1]),
                    steps: c.steps,
                    reason: halt.reason,
                    path: n.path,
                };
                if (halt.result !== "no") return out;
                rejected ??= out;
                continue;
            }
            if (c.steps >= limit || --budget < 0)
                return {
                    result: "limit",
                    output: "",
                    steps: c.steps,
                    reason: `oltre ${limit} passi: forse la macchina non si ferma`,
                    path: n.path,
                };
            if (c.state === QUERY && opts.oracle) {
                const a = ask(c, opts.oracle);
                next.push({ config: a, path: [...n.path, { rule: null, config: a }] });
                continue;
            }
            for (const r of applicable(program, c)) {
                const a = apply(r, c);
                next.push({ config: a, path: [...n.path, { rule: r, config: a }] });
            }
        }
        frontier = next;
    }
    return rejected ?? { result: "no", output: "", steps: 0, path: [] };
}

/** la configurazione è finale? (stato h / yes / no, testina fuori dal nastro, nessuna riga applicabile) */
export function halted(
    program: Program,
    c: Config,
    oracle?: Oracle,
): { result: "yes" | "no" | "h"; reason?: string } | null {
    if (HALT.has(c.state)) return { result: c.state as "yes" | "no" | "h" };
    if (c.heads.some((h) => h < 0)) return { result: "no", reason: "la testina è uscita a sinistra di ▷" };
    if (c.state === QUERY) return oracle ? null : { result: "no", reason: "manca l'oracolo" };
    if (!applicable(program, c).length)
        return { result: "no", reason: "nessuna riga per questa coppia (stato, simboli letti): rigetta" };
    return null;
}

/* Oracoli usati nelle tracce. */

/** formula proposizionale: variabili (lettere e cifre), ¬ ! ~, ∧ &, ∨ |, parentesi */
export function satisfiable(formula: string): boolean {
    const toks = formula.match(/[A-Za-z][A-Za-z0-9]*|[()!~¬&∧|∨]/g) ?? [];
    if (!toks.length) return false;
    const vars = [...new Set(toks.filter((t) => /^[A-Za-z]/.test(t)))];
    if (vars.length > 12) return false;
    for (let m = 0; m < 1 << vars.length; m++) {
        let i = 0;
        const val = (v: string) => Boolean(m & (1 << vars.indexOf(v)));
        const or = (): boolean => {
            let v = and();
            while (toks[i] === "|" || toks[i] === "∨") {
                i++;
                v = and() || v;
            }
            return v;
        };
        const and = (): boolean => {
            let v = not();
            while (toks[i] === "&" || toks[i] === "∧") {
                i++;
                v = not() && v;
            }
            return v;
        };
        const not = (): boolean => {
            const t = toks[i++];
            if (t === "!" || t === "~" || t === "¬") return !not();
            if (t === "(") {
                const v = or();
                i++;
                return v;
            }
            return val(t);
        };
        try {
            if (or() && i === toks.length) return true;
        } catch {
            return false;
        }
    }
    return false;
}

/** matrice di adiacenza "r,r,r;r,r,r;…" e soglia K in binario dopo ":": esiste una cricca di almeno K nodi? (la diagonale non conta) */
export function hasClique(query: string): boolean {
    const [m, k] = query.split(":");
    const K = parseInt(k || "0", 2) || 0;
    const rows = m.split(";").map((r) => r.split(","));
    const n = rows.length;
    if (K <= 1) return K === 0 || n > 0;
    for (let mask = 0; mask < 1 << n; mask++) {
        const nodes = [...Array(n).keys()].filter((i) => mask & (1 << i));
        if (nodes.length < K) continue;
        if (nodes.every((a) => nodes.every((b) => a === b || rows[a]?.[b] === "1"))) return true;
    }
    return false;
}

export const ORACLES: Record<string, Oracle> = {
    SAT: { name: "SAT", test: satisfiable },
    CLIQUE: { name: "CLIQUE", test: hasClique },
};
