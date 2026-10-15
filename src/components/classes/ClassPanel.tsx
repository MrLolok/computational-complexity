import Link from "next/link";
import ClassChip from "@/components/ClassChip";
import Rich from "@/components/Rich";
import Tex from "@/components/Tex";
import { ALIAS_TEX, C, CLASS_PROBLEMS, TEX, type ClassId } from "@/data/classes";
import { EXAM_QUESTIONS, type ExamQuestion } from "@/data/examQuestions";
import { TOWER_OF } from "@/data/piani";
import { THEOREMS } from "@/data/theorems";
import { relGroups } from "@/lib/engine";
import { classColor, ui } from "@/lib/ui";
import StepTabs from "./StepTabs";
import ExactTsp from "@/components/dp/ExactTsp";
import SatUnsat from "@/components/dp/SatUnsat";
import TrueFalse from "@/components/dp/TrueFalse";
import { texHtml } from "@/lib/tex";
import { ClassName as N, Html } from "@/components/problems/bits";

const h4 = "mb-1.5 font-ui text-xs font-semibold uppercase tracking-widest text-muted";
const link = "text-accent underline underline-offset-2 decoration-1";
const relList = "flex flex-wrap gap-1.5";
const relItem = "inline-flex items-center gap-1";
const mk = "font-mono text-sm font-bold";


/** scheda iniziale, senza classe scelta */
export function PanelIntro() {
  return (
    <>
      <h2 className={ui.h3}>Scegli una classe nella mappa</h2>
      <div className="mt-3 flex flex-col gap-3 text-sm text-muted">
        <p>Leggi le inclusioni dal basso verso l&apos;alto. Apri una classe per intuizione, definizione ed esempio.</p>
        <p><Tex>{String.raw`\subseteq`}</Tex> = contenuta; <Tex>{String.raw`\subsetneq`}</Tex> = contenuta e diversa. Attiva le opzioni per separazioni e questioni aperte.</p>
        <p>Un buon punto di partenza: <ClassChip id="P" /> <ClassChip id="NP" /> <ClassChip id="coNP" /></p>
      </div>
    </>
  );
}

function QA({ t }: { t: ExamQuestion }) {
  return (
    <details className="border-b border-line py-2">
      <summary className="cursor-pointer text-base marker:text-muted">
        <Rich as="span" html={t.q} />
      </summary>
      <div className="mt-2 flex flex-col gap-1 text-base">
        <Rich html={t.a} />
        <Rich html={t.e} />
      </div>
    </details>
  );
}

/** scheda di una classe */
export default function ClassPanel({ id }: { id: ClassId }) {
  const c = C[id];
  const rg = relGroups(id);
  const tr = EXAM_QUESTIONS.filter((t) => t.c.includes(id));
  const probs = CLASS_PROBLEMS[id];
  const ths = THEOREMS.filter((t) => t.classi.includes(id));
  const tower = TOWER_OF[id];
  const alias = ALIAS_TEX[id];
  const cmpB: ClassId = id === "NPcapcoNP" ? "NP" : "NPcapcoNP";
  const stepBody = "flex flex-col gap-3";

  const bodies = [
    <Rich key="intu" as="p" html={c.intu} />,
    <Rich key="def" className={stepBody} html={c.def} />,
    <Rich key="ex" className={stepBody} html={c.ex} />,
    <div key="exam" className={stepBody}>
      <Rich className={stepBody} html={c.exam} />
      {tr.length > 0 && (
        <p className={ui.hint}>
          {tr.length} domand{tr.length === 1 ? "a" : "e"} delle tracce su <N id={id} />: le trovi qui sotto e in Esercitati.
        </p>
      )}
    </div>,
  ];

  return (
    <div style={classColor(id)}>
      <div className="flex flex-wrap items-start justify-between gap-3.5">
        <div>
          <Tex className="block text-3xl font-semibold leading-tight text-(--c)">{TEX[id]}</Tex>
          <Html html={c.full} className="mt-1 block font-ui text-base font-medium text-muted" />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {alias && <Html className={ui.pillOk} html={alias} />}
            <Html className={`${ui.pill} whitespace-normal!`} html={`chiusa per complemento: ${c.closed}`} />
          </div>
        </div>
        <Link className={ui.btn} href={`/confronta/${id}/${cmpB}`}>
          Confronta con…
        </Link>
      </div>

      <StepTabs bodies={bodies} />

      {tower && (
        <p className="mt-3">
          <Link className={`${ui.btn} inline-block`} href={`/piani#${tower}`}>
            <span>Vedi <N id={id} /> nei piani di PH →</span>
          </Link>
        </p>
      )}

      {id === "DP" && <details className={ui.sec}><summary className="cursor-pointer font-semibold text-accent">Prova i due controlli di DP</summary><div className="mt-3 flex flex-col gap-5"><section><h3 className={`${ui.h3} mb-2`}>EXACT TSP: l&apos;ottimo è B?</h3><ExactTsp /></section><section><h3 className={`${ui.h3} mb-2`}>SAT-UNSAT: una sì, l&apos;altra no</h3><SatUnsat /></section><section><h3 className={`${ui.h3} mb-2`}>Verifica quello che sai</h3><TrueFalse /></section></div></details>}

      <details className={ui.sec}>
        <summary className="cursor-pointer font-semibold">Dove sta: inclusioni e questioni aperte</summary>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <h4 className={h4}>È contenuta in</h4>
            <div className={relList}>
              {rg.sup.length ? (
                rg.sup.map(([o, s]) => (
                  <span key={o} className={relItem}>
                    <span className={`${mk} ${s ? "text-proved" : ""}`}><Tex>{s ? String.raw`\subsetneq` : String.raw`\subseteq`}</Tex></span>
                    <ClassChip id={o} />
                  </span>
                ))
              ) : (
                <span className={ui.hint}>nessuna classe della mappa</span>
              )}
            </div>
          </div>
          <div>
            <h4 className={h4}>Contiene</h4>
            <div className={relList}>
              {rg.sub.length ? (
                rg.sub.map(([o, s]) => (
                  <span key={o} className={relItem}>
                    <span className={`${mk} ${s ? "text-proved" : ""}`}><Tex>{s ? String.raw`\supsetneq` : String.raw`\supseteq`}</Tex></span>
                    <ClassChip id={o} />
                  </span>
                ))
              ) : (
                <span className={ui.hint}>nessuna classe della mappa</span>
              )}
            </div>
          </div>
          <div>
            <h4 className={h4}>Rapporto non noto</h4>
            <div className={relList}>
              {rg.open.length ? (
                rg.open.map(([o, m]) => (
                  <span key={o} className={relItem}>
                    <span className={`${mk} ${m === "≠" ? "text-proved" : "text-open"}`}><Tex>{m === "≠" ? String.raw`\neq` : "?"}</Tex></span>
                    <ClassChip id={o} />
                  </span>
                ))
              ) : (
                <span className={ui.hint}>nessuna</span>
              )}
            </div>
          </div>
        </div>
        <p className={ui.hint}>
          <Tex>{String.raw`\subsetneq`}</Tex> in rosso: inclusione stretta dimostrata (anche quando segue dal fatto che l&apos;inclusione opposta è esclusa). <Tex>{String.raw`\subseteq`}</Tex> senza
          colore: dimostrata, non si sa se stretta. ? : non si sa nemmeno se una contenga l&apos;altra. <Tex>{String.raw`\neq`}</Tex> : diverse, ma nessuna contiene
          l&apos;altra.
        </p>
      </details>

      <div className={ui.sec}>
        <h3 className={ui.h3}>Problemi completi</h3>
        <Rich as="p" html={c.complete} />
        {c.trap && (
          <div className={ui.noteTrap}>
            <b className="font-ui font-semibold">Trappola.</b> <Rich as="span" html={c.trap} />
          </div>
        )}
        {c.extra && <Rich className="flex flex-col gap-2" html={c.extra} />}
        {probs && (
          <p className="mt-2.5 text-base leading-relaxed">
            <b className="font-ui font-semibold">Problemi:</b>{" "}
            {probs.map(([k, t], i) => (
              <span key={k}>
                {i > 0 && " · "}
                <Link href={`/problemi/${k}`} data-term={`problem:${k}`} className={`${link} whitespace-nowrap`} dangerouslySetInnerHTML={{ __html: texHtml(t, false) }} />
              </span>
            ))}
          </p>
        )}
      </div>

      {ths.length > 0 && (
        <div className={ui.sec}>
          <h3 className={ui.h3}>
            Teoremi su <N id={id} />
          </h3>
          <p className="text-base leading-relaxed">
            {ths.map((t, i) => (
              <span key={t.id}>
                {i > 0 && " · "}
                <Link href={`/teoremi#teorema-${t.id}`} className={link} dangerouslySetInnerHTML={{ __html: texHtml(t.nome, false) }} />
              </span>
            ))}
          </p>
        </div>
      )}

      {tr.length > 0 && (
        <div className={ui.sec}>
          <h3 className={ui.h3}>Dalle tracce d&apos;esame</h3>
          <div>
            {tr.slice(0, 6).map((t, i) => (
              <QA key={i} t={t} />
            ))}
          </div>
          {tr.length > 6 && (
            <p>
              <Link className={`${ui.btn} inline-block`} href="/esercizi">
                Altre {tr.length - 6} nel quiz →
              </Link>
            </p>
          )}
        </div>
      )}

      <p className="mt-4 text-sm text-muted">
        <b className="font-ui font-semibold">Fonti:</b> <Rich as="span" html={c.src} />
      </p>
    </div>
  );
}
