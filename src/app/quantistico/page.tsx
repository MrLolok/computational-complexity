import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import GroverDemo from "@/components/learning/GroverDemo";
import { TRACES } from "@/data/traces";
import { ui } from "@/lib/ui";

export const metadata: Metadata = { title: "Quantistico e crittografia" };
const TOPICS = [
  { id: "macchine", title: "1. Che cosa cambia nella macchina", body: "Una **macchina di Turing quantistica** evolve una sovrapposizione di configurazioni tramite trasformazioni unitarie. La misura restituisce un risultato probabilistico. L’interferenza può favorire certi esiti: non si leggono tutti i rami contemporaneamente.", test: /quantistic|BQP/ },
  { id: "bqp", title: "2. BQP: tempo polinomiale, errore limitato", body: "**BQP** raccoglie i problemi di decisione risolvibili in tempo quantistico polinomiale con errore al più 1/3. La catena utile è **P ⊆ BPP ⊆ BQP ⊆ PP ⊆ PSPACE**. Quindi basta spazio classico polinomiale per simularli; questo non garantisce tempo classico polinomiale.\n\nNon sappiamo se NP ⊆ BQP né se PH ⊆ BQP. Un computer quantistico non è un oracolo per SAT.", test: /BQP|quantistic.*errore limitato/ },
  { id: "grover", title: "3. Grover e le chiavi simmetriche", body: "Tra N candidati, **Grover** usa O(√N) interrogazioni. Con una chiave di n bit si passa da circa 2ⁿ tentativi classici a 2ⁿ⁄² interrogazioni quantistiche. Il raddoppio della chiave riporta l’esponente a n, nel modello ideale della traccia.\n\nIl numero di interrogazioni non è il costo completo di un attacco reale: [NIST, domande sul quantistico](https://csrc.nist.gov/Projects/post-quantum-cryptography/faqs).", test: /crittografia simmetrica|forza bruta/ },
  { id: "one-way", title: "4. One-way functions: facile andare, difficile tornare", body: "Calcolare f(x) è facile; trovare una preimmagine di y = f(x) è difficile. **P = NP** permetterebbe l’inversione e ne escluderebbe l’esistenza. **P ≠ NP**, da solo, non ne dimostra l’esistenza.\n\nNelle tracce si usa la nozione worst-case legata a P ≠ UP. In crittografia serve invece difficoltà su input casuali: non confondere le due nozioni. Una funzione candidata, come l’esponenziazione modulare, non è una funzione dimostrata one-way. ✱ [Goldreich: difficoltà worst-case e average-case](https://www.wisdom.weizmann.ac.il/~/oded/PSX/aggm2.pdf).", test: /one-way|f_\{\\mathrm\{EXP/ },
];
export default function Page() {
  return <section className="flex flex-col gap-7">
    <header><p className={`${ui.eyebrow} mb-2`}>Lezioni 6 e 10–11 · supporto alle tracce</p><h1 className={ui.h2}>Quantistico e crittografia, quanto serve all&apos;esame</h1><p className={`${ui.lede} mt-3`}>Quattro idee da riconoscere nelle domande: modello di calcolo, classi, ricerca della chiave e funzioni one-way.</p></header>
    <nav aria-label="Argomenti quantistici" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">{TOPICS.map(t => <a key={t.id} href={`#${t.id}`} className="text-accent underline underline-offset-4">{t.title.slice(3)}</a>)}</nav>
    {TOPICS.map(t => {
      const questions = TRACES.flatMap(trace => trace.questions.filter(q => t.test.test(q.text)).map(q => ({ code: trace.code, n: q.n })));
      return <section key={t.id} id={t.id} className="flex scroll-mt-16 flex-col gap-4 border-t border-line pt-6"><h2 className={ui.h3}>{t.title}</h2><Markdown>{t.body}</Markdown>{t.id === "grover" && <GroverDemo />}
        {t.id === "bqp" && <Link href="/classi#quantistiche" className={`${ui.btn} self-start`}>Vedi BQP nella mappa delle inclusioni →</Link>}
        <details className="rounded-lg border border-line p-4 text-sm"><summary className="cursor-pointer text-accent">Prova nelle tracce · {questions.length} domande</summary><div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">{questions.map(q => <Link key={`${q.code}-${q.n}`} href={`/tracce/${q.code}#d${q.n}`} className="text-muted underline underline-offset-4">{q.code}, domanda {q.n}</Link>)}</div></details>
      </section>;
    })}
    <p className="text-xs text-muted">Riferimenti del corso: Lezioni 6 e 10–11 e tracce collegate. ✱ Contesto sulle classi quantistiche: <a href="https://cs.uwaterloo.ca/~watrous/Papers/QuantumComputationalComplexity.pdf" className="text-accent underline">Watrous, Quantum Computational Complexity</a>.</p>
  </section>;
}
