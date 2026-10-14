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
      <details className={ui.card}><summary className="cursor-pointer font-semibold">Che cosa significa Δ? E dove sta DP?</summary><p>Δᵢᴾ è tempo polinomiale deterministico con un oracolo Σ del livello i − 1. Al primo livello Δ₁ᴾ = P; al secondo Δ₂ᴾ = P con oracolo NP.</p><div className={ui.formula}>NP ∪ coNP ⊆ DP ⊆ Δ₂ᴾ ⊆ Σ₂ᴾ ∩ Π₂ᴾ</div><p className="text-sm text-muted">DP combina un controllo NP e uno coNP sulla stessa istanza. Non è un piano autonomo della gerarchia.</p><Link href="/classi/DP" className="self-start text-accent underline">La scheda sintetica di DP →</Link></details>
      <TowerDisclosure><PianiTower /></TowerDisclosure>
      <details className={ui.card}><summary className="cursor-pointer font-semibold">Come riconoscere un collasso</summary><p>Se Σᵢᴾ = Πᵢᴾ per un i ≥ 1, allora PH = Σᵢᴾ: i livelli superiori non aggiungono potenza (Teorema 17.9).</p><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-lg bg-sunk p-4"><b>P = NP ⇒ PH = P</b><p className="mt-2 text-sm text-muted">Il controllo deterministico basta per tutti i livelli.</p></div><div className="rounded-lg bg-sunk p-4"><b>NP = coNP ⇒ PH = NP</b><p className="mt-2 text-sm text-muted">Collassa al primo livello; non implica da solo P = NP.</p></div></div><p className="text-sm text-muted">Se un problema completo per un livello superiore entra in un livello inferiore, scrivi prima l&apos;inclusione che ne segue. Poi cerca l&apos;uguaglianza Σᵢᴾ = Πᵢᴾ.</p><Link href="/teoremi#teorema-t17-9" className="text-accent underline">Cerca i teoremi sul collasso →</Link></details>
      <details className={ui.card}><summary className="cursor-pointer font-semibold">Riduzioni tra problemi dei livelli</summary><Reductions /></details>
    </section>
    <details className={ui.card}><summary className="cursor-pointer font-semibold">Verifica nelle tracce: {questions.length} domande su PH</summary><div>{questions.map((q, i) => <ExamQA key={i} t={q} />)}</div></details>
    <p className="text-xs text-muted">Fonti: dispensa cap. 16–17; slide Lez. 9; appunti Lez. 9 e 11.</p>
  </section>;
}
