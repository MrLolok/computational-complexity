import { Fragment } from "react";
import ClassChip from "@/components/ClassChip";
import Rich from "@/components/Rich";
import Tex from "@/components/Tex";
import { C, PAIRNOTES, PLAIN, TEX, type ClassId } from "@/data/classes";
import { answerLabel, compare, isStrictStep, type Answer, type Edge } from "@/lib/engine";
import { ui } from "@/lib/ui";
import { texHtml } from "@/lib/tex";

const Html = ({ html, className }: { html: string; className?: string }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: texHtml(html) }} />
);
/** nome di una classe nella frase: testo, o formula se ha pedici o operatori (Σ₂ᴾ, NP ∩ coNP) */
const N = ({ id }: { id: ClassId }) => (/[_^]|\\cap/.test(TEX[id]) ? <Tex>{TEX[id]}</Tex> : <>{PLAIN[id]}</>);
/** simbolo della relazione in testa al confronto */
const OP = { "=": "=", "⊊": String.raw`\subsetneq`, "⊆": String.raw`\subseteq`, "≠": String.raw`\neq`, "?": String.raw`\mathrel{?}` } as const;
const readit = "text-base text-muted";
const tone = { si: "text-ok", no: "text-proved", altro: "text-open" } as const;
const pillOf = { ok: ui.pillOk, proved: ui.pillProved, open: ui.pillOpen } as const;

/** catena di inclusioni con i gettoni delle classi */
function Chain({ steps, start }: { steps: Edge[]; start: ClassId }) {
  return (
    <div className="font-mono text-sm leading-loose [overflow-wrap:anywhere]">
      {!steps.length ? (
        <ClassChip id={start} />
      ) : (
        <>
          <ClassChip id={steps[0].a} />
          {steps.map((e) => {
            const hyp = e.kind === "hyp";
            const strict = !hyp && isStrictStep(e.a, e.b);
            return (
              <Fragment key={e.a + ">" + e.b}>
                <span className={`px-0.5 ${hyp ? "font-bold text-open" : strict ? "font-bold text-proved" : "text-muted"}`}>
                  <Tex>{hyp ? String.raw`\overset{?}{\subseteq}` : strict ? String.raw`\subsetneq` : String.raw`\subseteq`}</Tex>
                </span>
                <ClassChip id={e.b} />
              </Fragment>
            );
          })}
        </>
      )}
    </div>
  );
}

/** il motivo di ogni passo della catena */
function WhyList({ steps }: { steps: Edge[] }) {
  if (!steps.length) return null;
  return (
    <details>
      <summary className="cursor-pointer font-ui text-sm font-semibold text-accent">Perché ogni passo</summary>
      <ol className="mt-2 flex list-decimal flex-col gap-1 pl-5 text-sm">
        {steps.map((e) => (
          <li key={e.a + ">" + e.b}>
            <Tex>{`${TEX[e.a]} \\subseteq ${TEX[e.b]}`}</Tex>: <Html html={e.why} />
            {e.src && <Html className="text-sm text-muted" html={` (${e.src})`} />}
          </li>
        ))}
      </ol>
    </details>
  );
}

function AnswerCard({ q, r, a, b }: { q: string; r: Answer; a: ClassId; b: ClassId }) {
  let body;
  if (r.ans === "si") {
    body = (
      <>
        <Chain steps={r.chain} start={a} />
        {r.strict ? (
          <p className={readit}>
            Stretta perché <Tex>{`${TEX[r.strict.s[0]]} \\subsetneq ${TEX[r.strict.s[1]]}`}</Tex> (<Html html={r.strict.s[2]} />).
          </p>
        ) : r.revNo ? (
          <p className={readit}>Ed è stretta: l&apos;inclusione opposta è esclusa (vedi la risposta accanto).</p>
        ) : (
          <p className={readit}>Se sia stretta non si sa.</p>
        )}
        <WhyList steps={r.chain} />
      </>
    );
  } else if (r.ans === "no") {
    const [x, y, why, src] = r.contra.s;
    body = (
      <>
        <p className={readit}>
          Se fosse <Tex>{`${TEX[a]} \\subseteq ${TEX[b]}`}</Tex>, si avrebbe:
        </p>
        <Chain steps={r.contra.p} start={y} />
        <p className={readit}>
          cioè <Tex>{`${TEX[y]} \\subseteq ${TEX[x]}`}</Tex>, contro{" "}
          <b>
            <Tex>{`${TEX[x]} \\subsetneq ${TEX[y]}`}</Tex>
          </b>{" "}
          (<Html html={why} />; <Html html={src} />).
        </p>
        <WhyList steps={r.contra.p} />
      </>
    );
  } else {
    body = (
      <>
        <Html className={`${readit} block`} html={r.text} />
        {r.groups.length > 0 && (
          <>
            <p className={readit}>Ne seguirebbe:</p>
            <ul className="m-0 flex list-disc flex-col gap-1.5 pl-4">
              {r.groups.map((g) => (
                <li key={g.join()} className="text-sm">
                  <Tex>{g.map((x) => TEX[x]).join(" = ")}</Tex>
                </li>
              ))}
            </ul>
          </>
        )}
        {r.flags.map((f) => (
          <div key={f} className={ui.note}>
            <Html html={f} />
          </div>
        ))}
      </>
    );
  }
  return (
    <div className={ui.card}>
      <Html className="font-semibold" html={q} />
      <div className={`font-ui text-base font-bold ${tone[r.ans]}`}>
        <Html html={answerLabel(r, a, b)} />
      </div>
      {body}
    </div>
  );
}

const ROWS: [string, "full" | "form" | "closed" | "complete" | "src"][] = [
  ["Che cos'è", "full"],
  ["Forma della risposta sì", "form"],
  ["Chiusa per complemento", "closed"],
  ["Problemi completi", "complete"],
  ["Fonti", "src"],
];

/** verdetto del confronto tra due classi diverse */
export default function CompareVerdict({ a, b }: { a: ClassId; b: ClassId }) {
  const v = compare(a, b);
  const [l, op, r] = v.head;
  const note = PAIRNOTES[[a, b].sort().join("|")];
  const th = "border-b border-line p-2 text-left align-top";
  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2.5 font-head text-2xl font-semibold">
        <Tex>{`${TEX[l]} ${OP[op]} ${TEX[r]}`}</Tex>
        <span className={pillOf[v.pill.tone]}>{v.pill.text}</span>
      </div>
      <p className="max-w-prose text-muted">{op === "⊆" ? <><N id={l} /> è contenuta in <N id={r} />. Non sappiamo se le due classi siano uguali.</> : op === "⊊" ? <><N id={l} /> è contenuta in <N id={r} />, e le due classi sono diverse.</> : op === "=" ? "Le due classi coincidono." : op === "≠" ? "Le due classi sono diverse e nessuna contiene l’altra." : "Non conosciamo un’inclusione tra queste due classi. Questo non dimostra che siano diverse."}</p>
      {note && <details className="border-b border-line pb-3"><summary className="cursor-pointer text-sm text-accent">Una precisazione su questa coppia</summary><Rich className={`${ui.noteInfo} mt-3`} html={note} /></details>}

      <details>
        <summary className="cursor-pointer font-semibold">Perché: le risposte da dare all&apos;esame</summary>
        <div className="mt-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <AnswerCard q={`$${TEX[a]} \\subseteq ${TEX[b]}$?`} r={v.ab} a={a} b={b} />
          <AnswerCard q={`$${TEX[b]} \\subseteq ${TEX[a]}$?`} r={v.ba} a={b} b={a} />
          <div className={ui.card}>
            <Html className="font-semibold" html={`$${TEX[a]} = ${TEX[b]}$?`} />
            <div className={`font-ui text-base font-bold ${tone[v.eq.ans]}`}>{v.eq.text}</div>
            <p className={readit}>{v.eq.why}.</p>
          </div>
        </div>
        <p className={`${ui.hint} mt-2`}>
          Le risposte sono calcolate dalle inclusioni e dalle separazioni della mappa, con le regole del corso: passaggio ai
          complementi, <Tex>{String.raw`\mathrm{R} = \mathrm{RE} \cap \mathrm{coRE}`}</Tex>, collasso di PH (Teorema 17.9), padding (Teorema 20.1). &quot;Solo se&quot; vuol dire che la
          risposta dipende da una questione aperta.
        </p>
        </div>
      </details>

      <details>
        <summary className="cursor-pointer font-semibold">Definizioni e problemi delle due classi</summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-140 border-collapse text-base">
            <thead>
              <tr className="font-ui text-xs font-semibold uppercase tracking-wide text-muted">
                <th className={th} scope="col">Aspetto</th>
                <th className={th}>
                  <span className="normal-case tracking-normal">
                    <ClassChip id={a} />
                  </span>
                </th>
                <th className={th}>
                  <span className="normal-case tracking-normal">
                    <ClassChip id={b} />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, k]) => (
                <tr key={k}>
                  <td className={`${th} w-1/4 font-ui text-sm font-medium text-muted`}>{label}</td>
                  <Rich as="td" className={th} html={C[a][k]} />
                  <Rich as="td" className={th} html={C[b][k]} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
