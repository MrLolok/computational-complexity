import type { Metadata } from "next";
import Link from "next/link";
import { EXAM_QUESTIONS } from "@/data/examQuestions";
import { PH_CLASSES } from "@/data/piani";
import { ui } from "@/lib/ui";
import { ExamQA } from "@/components/piani/ExamQA";
import PianiTower from "@/components/piani/PianiTower";
import PhLevels from "@/components/piani/PhLevels";
import TowerDisclosure from "@/components/piani/TowerDisclosure";
import PrefixBuilder from "@/components/piani/PrefixBuilder";
import QbfEval from "@/components/piani/QbfEval";
import Reductions from "@/components/piani/Reductions";

export const metadata: Metadata = { title: "Gerarchia polinomiale" };
export default function Page() {
  const questions = EXAM_QUESTIONS.filter(q => q.c.some(c => PH_CLASSES.includes(c)));
  return <section className="flex flex-col gap-6">
    <header><p className={`${ui.eyebrow} mb-2`}>Esiste · per ogni · esiste</p><h1 className={ui.h2}>La gerarchia polinomiale, un piano alla volta</h1><p className={`${ui.lede} mt-3`}>Parti da NP: «esiste una soluzione verificabile». Ogni nuovo livello aggiunge un&apos;alternanza tra «esiste» e «per ogni».</p></header>
    <PhLevels />
    <section className="flex flex-col gap-3"><h2 className={ui.h3}>2. Prova con i quantificatori</h2><p className={ui.hint}>Scegli un esercizio: prima costruisci il prefisso, poi valuta una formula.</p>
      <details className={ui.card}><summary className="cursor-pointer font-semibold">Costruisci un prefisso e trova il livello</summary><PrefixBuilder /></details>
      <details className={ui.card}><summary className="cursor-pointer font-semibold">Valuta una QBF: ∃ è OR, ∀ è AND</summary><QbfEval /></details>
    </section>
    <section className="flex flex-col gap-3"><h2 className={ui.h3}>3. Collega i livelli</h2>
      <details className={ui.card}><summary className="cursor-pointer font-semibold">Che cosa significa Δ? E dove sta DP?</summary><p>Δᵢ₊₁ᴾ = P<sup>Σᵢᴾ</sup>: tempo polinomiale <b>deterministico</b> con un oracolo Σ del piano sotto. Al piano 1 Δ₁ᴾ = P<sup>P</sup> = P; al piano 2 Δ₂ᴾ = P<sup>NP</sup>. Non ha quantificatori suoi: sta tra due piani.</p><div className={ui.formula}>Σᵢᴾ ∪ Πᵢᴾ ⊆ Δᵢ₊₁ᴾ ⊆ Σᵢ₊₁ᴾ ∩ Πᵢ₊₁ᴾ</div><ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm"><li><b>Σᵢᴾ ⊆ Δᵢ₊₁ᴾ</b>: una domanda all&apos;oracolo, e si copia la risposta.</li><li><b>Πᵢᴾ ⊆ Δᵢ₊₁ᴾ</b>: una domanda sul complemento, e si inverte la risposta.</li><li><b>Δᵢ₊₁ᴾ ⊆ Σᵢ₊₁ᴾ = NP<sup>Σᵢᴾ</sup></b>: stesso oracolo; una macchina deterministica è una nondeterministica che non usa le scelte.</li><li><b>Δᵢ₊₁ᴾ ⊆ Πᵢ₊₁ᴾ</b>: Δ è chiusa per complemento, quindi se L ∈ Δᵢ₊₁ᴾ anche co-L ∈ Σᵢ₊₁ᴾ.</li></ul><p>DP sta sotto Δ₂ᴾ: bastano due domande all&apos;oracolo, una per la parte NP e una per la parte coNP. Non è un piano autonomo della gerarchia.</p><div className={ui.formula}>NP ∪ coNP ⊆ DP ⊆ Δ₂ᴾ ⊆ Σ₂ᴾ ∩ Π₂ᴾ</div><p className="text-sm text-muted">Esempio (F07): SAT-UNSAT si riduce a co-QSAT₃? SÌ: SAT-UNSAT ∈ DP ⊆ Δ₂ᴾ ⊆ Π₂ᴾ ⊆ Δ₃ᴾ ⊆ Π₃ᴾ, e co-QSAT₃ è Π₃ᴾ-completo.</p><Link href="/classi/DP" className="self-start text-accent underline">La scheda sintetica di DP →</Link></details>
      <TowerDisclosure><PianiTower /></TowerDisclosure>
      <details className={ui.card}><summary className="cursor-pointer font-semibold">Come riconoscere un collasso</summary><p>Se Σᵢᴾ = Πᵢᴾ per un i ≥ 1, allora PH = Σᵢᴾ: i livelli superiori non aggiungono potenza (Teorema 17.9).</p><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-lg bg-sunk p-4"><b>P = NP ⇒ PH = P</b><p className="mt-2 text-sm text-muted">Il controllo deterministico basta per tutti i livelli.</p></div><div className="rounded-lg bg-sunk p-4"><b>NP = coNP ⇒ PH = NP</b><p className="mt-2 text-sm text-muted">Collassa al primo livello; non implica da solo P = NP.</p></div></div><p className="text-sm text-muted">Se un problema completo per un livello superiore entra in un livello inferiore, scrivi prima l&apos;inclusione che ne segue. Poi cerca l&apos;uguaglianza Σᵢᴾ = Πᵢᴾ.</p><Link href="/teoremi#teorema-t17-9" className="text-accent underline">Cerca i teoremi sul collasso →</Link></details>
      <details className={ui.card}><summary className="cursor-pointer font-semibold">Riduzioni tra problemi dei livelli</summary><Reductions /></details>
    </section>
    <details className={ui.card}><summary className="cursor-pointer font-semibold">Verifica nelle tracce: {questions.length} domande su PH</summary><div>{questions.map((q, i) => <ExamQA key={i} t={q} />)}</div></details>
    <p className="text-xs text-muted">Fonti: dispensa cap. 16–17; slide Lez. 9; appunti Lez. 9 e 11.</p>
  </section>;
}
