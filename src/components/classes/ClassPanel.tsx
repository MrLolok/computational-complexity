import Link from "next/link";
import ClassChip from "@/components/ClassChip";
import Rich from "@/components/Rich";
import { ALIAS, C, CLASS_PROBLEMS, NAME, PLAIN, type ClassId } from "@/data/classes";
import { EXAM_QUESTIONS, type ExamQuestion } from "@/data/examQuestions";
import { THEOREMS } from "@/data/theorems";
import { relGroups } from "@/lib/engine";
import { classColor, ui } from "@/lib/ui";
import StepTabs from "./StepTabs";

/** nodo dei piani di PH che corrisponde alla classe (/piani#<nodo>) */
const TOWER_OF: Partial<Record<ClassId, string>> = {
  P: "L0",
  NP: "S1",
  coNP: "P1",
  DP: "DP",
  DELTA2: "D2",
  SIGMA2: "S2",
  PI2: "P2",
  SIGMAi: "S3",
  PIi: "P3",
  PH: "PH",
  PSPACE: "PSPACE",
};

const h4 = "mb-1.5 font-ui text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted";
const link = "text-accent underline underline-offset-2 decoration-1";
const relList = "flex flex-wrap gap-1.5";
const relItem = "inline-flex items-center gap-1";
const mk = "font-mono text-[0.8rem] font-bold";

const Html = ({ html, className }: { html: string; className?: string }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

/** scheda iniziale, senza classe scelta */
export function PanelIntro() {
  return (
    <>
      <span className={ui.eyebrow}>Come si usa</span>
      <h2 className={`${ui.h2} mt-[0.3rem]`}>Tocca una classe nella mappa</h2>
      <div className="mt-[0.8rem] flex min-h-36 flex-col gap-[0.7rem] [&_p]:max-w-[66ch]">
        <p>
          Per ogni classe la scheda va per gradi: <b>intuizione</b>, <b>definizione</b>, un <b>esempio</b> svolto e il{" "}
          <b>collegamento con l&apos;esame</b>, con le domande vere delle tracce.
        </p>
        <p>
          Nella mappa la classe scelta si accende: in pieno quelle che contiene, con il bordo spesso quelle che la contengono; sbiadite
          quelle con cui il rapporto non è noto.
        </p>
        <p>La catena da sapere a memoria:</p>
        <div className={ui.formula}>L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXP ⊆ NEXP</div>
        <p className="text-[0.92rem] text-muted">
          con, dimostrate strette, solo <b>P ⊊ EXP</b>, <b>L ⊊ PSPACE</b>, <b>NL ⊊ PSPACE</b> e <b>NP ⊊ NEXP</b>. Tutto il resto, se
          non segue da queste quattro, è &quot;altro: solo se…&quot;.
        </p>
        <p>
          Per cominciare: <ClassChip id="DP" /> <ClassChip id="NP" /> <ClassChip id="PH" /> <ClassChip id="PSPACE" />
        </p>
      </div>
    </>
  );
}

function QA({ t }: { t: ExamQuestion }) {
  return (
    <details className="border-b border-line py-[0.55rem]">
      <summary className="cursor-pointer text-[0.95rem] marker:text-muted">
        <Rich as="span" html={t.q} />
      </summary>
      <div className="mt-[0.4rem] flex flex-col gap-[0.2rem] text-[0.93rem]">
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
  const alias = ALIAS[id];
  const cmpB: ClassId = id === "NPcapcoNP" ? "NP" : "NPcapcoNP";
  const stepBody = "flex flex-col gap-[0.7rem]";

  const bodies = [
    <Rich key="intu" as="p" html={c.intu} />,
    <Rich key="def" className={stepBody} html={c.def} />,
    <Rich key="ex" className={stepBody} html={c.ex} />,
    <div key="exam" className={stepBody}>
      <Rich className={stepBody} html={c.exam} />
      {tr.length > 0 && (
        <p className={ui.hint}>
          {tr.length} domand{tr.length === 1 ? "a" : "e"} delle tracce su {PLAIN[id]}: le trovi qui sotto e in Esercitati.
        </p>
      )}
    </div>,
  ];

  return (
    <div style={classColor(id)}>
      <div className="flex flex-wrap items-start justify-between gap-3.5">
        <div>
          <Html html={NAME[id]} className="block font-mono text-[1.9rem] font-semibold leading-[1.1] text-(--c)" />
          <div className="mt-[0.2rem] font-ui text-[0.95rem] font-medium text-muted">{c.full}</div>
          <div className="mt-[0.55rem] flex flex-wrap gap-1.5">
            {alias?.startsWith("=") && <span className={ui.pillOk}>{alias}</span>}
            <span className={`${ui.pill} whitespace-normal!`}>chiusa per complemento: {c.closed}</span>
          </div>
        </div>
        <Link className={ui.btn} href={`/confronta/${id}/${cmpB}`}>
          Confronta con…
        </Link>
      </div>

      <StepTabs bodies={bodies} />

      {tower && (
        <p className="mt-[0.7rem]">
          <Link className={`${ui.btn} inline-block`} href={`/piani#${tower}`}>
            Vedi {PLAIN[id]} nei piani di PH →
          </Link>
        </p>
      )}

      <div className={ui.sec}>
        <h3 className={ui.h3}>Dove sta</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3">
          <div>
            <h4 className={h4}>È contenuta in</h4>
            <div className={relList}>
              {rg.sup.length ? (
                rg.sup.map(([o, s]) => (
                  <span key={o} className={relItem}>
                    <span className={`${mk} ${s ? "text-proved" : ""}`}>{s ? "⊊" : "⊆"}</span>
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
                    <span className={`${mk} ${s ? "text-proved" : ""}`}>{s ? "⊋" : "⊇"}</span>
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
                    <span className={`${mk} ${m === "≠" ? "text-proved" : "text-open"}`}>{m}</span>
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
          ⊊ in rosso: inclusione stretta dimostrata (anche quando segue dal fatto che l&apos;inclusione opposta è esclusa). ⊆ senza
          colore: dimostrata, non si sa se stretta. ? : non si sa nemmeno se una contenga l&apos;altra. ≠ : diverse, ma nessuna contiene
          l&apos;altra.
        </p>
      </div>

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
          <p className="mt-[0.6rem] text-[0.92rem] leading-[1.8]">
            <b className="font-ui font-semibold">Problemi:</b>{" "}
            {probs.map(([k, t], i) => (
              <span key={k}>
                {i > 0 && " · "}
                <Link href={`/problemi/${k}`} className={`${link} whitespace-nowrap`} dangerouslySetInnerHTML={{ __html: t }} />
              </span>
            ))}
          </p>
        )}
      </div>

      {ths.length > 0 && (
        <div className={ui.sec}>
          <h3 className={ui.h3}>Teoremi su {PLAIN[id]}</h3>
          <p className="text-[0.92rem] leading-[1.8]">
            {ths.map((t, i) => (
              <span key={t.id}>
                {i > 0 && " · "}
                <Link href={`/teoremi#teorema-${t.id}`} className={link} dangerouslySetInnerHTML={{ __html: t.nome }} />
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

      <p className="mt-4 text-[0.82rem] text-muted">
        <b className="font-ui font-semibold">Fonti:</b> <Rich as="span" html={c.src} />
      </p>
    </div>
  );
}
