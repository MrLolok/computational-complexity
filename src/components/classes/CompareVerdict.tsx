import { Fragment } from "react";
import ClassChip from "@/components/ClassChip";
import Rich from "@/components/Rich";
import { C, NAME, PAIRNOTES, PLAIN, type ClassId } from "@/data/classes";
import { answerLabel, compare, isStrictStep, type Answer, type Edge } from "@/lib/engine";
import { ui } from "@/lib/ui";

const Html = ({ html, className }: { html: string; className?: string }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
);
const readit = "text-[0.92rem] text-muted";
const tone = { si: "text-ok", no: "text-proved", altro: "text-open" } as const;
const pillOf = { ok: ui.pillOk, proved: ui.pillProved, open: ui.pillOpen } as const;

/** catena di inclusioni con i gettoni delle classi */
function Chain({ steps, start }: { steps: Edge[]; start: ClassId }) {
  return (
    <div className="font-mono text-[0.86rem] leading-[1.9] [overflow-wrap:anywhere]">
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
                <span className={`px-[0.15em] ${hyp ? "font-bold text-open" : strict ? "font-bold text-proved" : "text-muted"}`}>
                  {hyp ? "⊆?" : strict ? "⊊" : "⊆"}
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
      <summary className="cursor-pointer font-ui text-[0.82rem] font-semibold text-accent">Perché ogni passo</summary>
      <ol className="mt-[0.4rem] flex list-decimal flex-col gap-1 pl-5 text-[0.88rem]">
        {steps.map((e) => (
          <li key={e.a + ">" + e.b}>
            <Html className={ui.mono} html={`${NAME[e.a]} ⊆ ${NAME[e.b]}`} />: {e.why}
            {e.src && <span className="text-[0.82rem] text-muted"> ({e.src})</span>}
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
            Stretta perché {PLAIN[r.strict.s[0]]} ⊊ {PLAIN[r.strict.s[1]]} ({r.strict.s[2]}).
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
          Se fosse <Html html={NAME[a]} /> ⊆ <Html html={NAME[b]} />, si avrebbe:
        </p>
        <Chain steps={r.contra.p} start={y} />
        <p className={readit}>
          cioè <Html html={NAME[y]} /> ⊆ <Html html={NAME[x]} />, contro{" "}
          <b>
            <Html html={NAME[x]} /> ⊊ <Html html={NAME[y]} />
          </b>{" "}
          ({why}; {src}).
        </p>
        <WhyList steps={r.contra.p} />
      </>
    );
  } else {
    body = (
      <>
        <p className={readit}>{r.text}</p>
        {r.groups.length > 0 && (
          <>
            <p className={readit}>Ne seguirebbe:</p>
            <ul className="m-0 flex list-disc flex-col gap-[0.35rem] pl-[1.1rem]">
              {r.groups.map((g) => (
                <li key={g.join()} className="font-mono text-[0.86em]">
                  <Html html={g.map((x) => NAME[x]).join(" = ")} />
                </li>
              ))}
            </ul>
          </>
        )}
        {r.flags.map((f) => (
          <div key={f} className={ui.note}>
            {f}
          </div>
        ))}
      </>
    );
  }
  return (
    <div className="flex min-w-0 flex-col gap-[0.35rem] rounded-[10px] border border-line bg-surface px-[0.9rem] py-3">
      <Html className="font-mono font-semibold" html={q} />
      <div className={`font-ui text-[1.05rem] font-bold ${tone[r.ans]}`}>{answerLabel(r, a, b)}</div>
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
  const th = "border-b border-line px-[0.6rem] py-[0.55rem] text-left align-top";
  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2.5 font-head text-[1.6rem] font-semibold">
        <span className="font-mono font-semibold">
          <Html html={NAME[l]} /> {op} <Html html={NAME[r]} />
        </span>
        <span className={pillOf[v.pill.tone]}>{v.pill.text}</span>
      </div>
      {note && <Rich className={ui.noteInfo} html={note} />}

      <div>
        <h3 className={`${ui.h3} mb-2`}>Come risponderesti all&apos;esame</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-2.5">
          <AnswerCard q={`${NAME[a]} ⊆ ${NAME[b]}?`} r={v.ab} a={a} b={b} />
          <AnswerCard q={`${NAME[b]} ⊆ ${NAME[a]}?`} r={v.ba} a={b} b={a} />
          <div className="flex min-w-0 flex-col gap-[0.35rem] rounded-[10px] border border-line bg-surface px-[0.9rem] py-3">
            <Html className="font-mono font-semibold" html={`${NAME[a]} = ${NAME[b]}?`} />
            <div className={`font-ui text-[1.05rem] font-bold ${tone[v.eq.ans]}`}>{v.eq.text}</div>
            <p className={readit}>{v.eq.why}.</p>
          </div>
        </div>
        <p className={`${ui.hint} mt-2`}>
          Le risposte sono calcolate dalle inclusioni e dalle separazioni della mappa, con le regole del corso: passaggio ai
          complementi, R = RE ∩ coRE, collasso di PH (Teorema 17.9), padding (Teorema 20.1). &quot;Solo se&quot; vuol dire che la
          risposta dipende da una questione aperta.
        </p>
      </div>

      <div>
        <h3 className={`${ui.h3} mb-2`}>Le due classi a confronto</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.92rem]">
            <thead>
              <tr className="font-ui text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-muted">
                <th className={th} />
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
                  <td className={`${th} w-[22%] font-ui text-[0.85rem] font-medium text-muted`}>{label}</td>
                  <Rich as="td" className={th} html={C[a][k]} />
                  <Rich as="td" className={th} html={C[b][k]} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
