"use client";

import Link from "next/link";
import { LADDER, PROBLEM_BY, type Problem, type Trap } from "@/data/problems";
import Rich from "@/components/Rich";
import { PI, REL, S, SOURCE_LABEL, ansKey, colorId, trapAnswer } from "@/lib/problems";
import { theoremsForProblem } from "@/lib/theorems";
import { classColor } from "@/lib/ui";
import { Html, LabPill, SourceBadge, YesNo, codeCls } from "./bits";

const dsec = "flex flex-col gap-[5px] border-t border-line pt-3 [&>p]:max-w-[65ch]";
const h3 = "font-ui text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted";
const box = "flex flex-col gap-1 rounded-lg px-3 py-2.5 text-[0.92rem]";
const bt = "font-ui text-[0.7rem] font-semibold uppercase tracking-[0.1em]";

function RelBtn({ id, onGo }: { id: string; onGo: (id: string) => void }) {
  const q = PROBLEM_BY[id];
  return (
    <button
      type="button"
      onClick={() => onGo(id)}
      style={classColor(colorId(q))}
      className="cursor-pointer rounded-md border border-(--c)/60 bg-(--c)/8 px-[7px] font-ui text-[0.84rem] font-semibold text-ink hover:border-(--c)"
    >
      {q.name}
    </button>
  );
}

function TrapItem({ t }: { t: Trap }) {
  const li = "flex flex-col gap-[3px] border-l-2 border-line pl-2.5 text-[0.9rem]";
  if (t.n)
    return (
      <li className={li}>
        {t.c && <span className={codeCls}>{t.c}</span>}
        <Rich as="span" html={t.n} />
      </li>
    );
  return (
    <li className={li}>
      <span className={codeCls}>{t.c}</span>
      <Rich as="span" html={t.q || ""} />
      <span>
        <YesNo k={ansKey(t.a)}>{trapAnswer(t)}</YesNo>
        <Rich as="span" html={t.e || ""} />
      </span>
    </li>
  );
}

export default function ProblemDetail({ p, onGo }: { p: Problem; onGo: (id: string) => void }) {
  const band = LADDER[p.b];
  const cp = p.cpl ? PROBLEM_BY[p.cpl] : null;
  const rels = (REL[p.id] || []).filter((r) => r[0] !== p.cpl);
  const ths = theoremsForProblem(p.id);
  const clsId = p.c || p.b;
  const clsName = p.c ? (p.c === "SIGMA2" ? S(2) : PI(2)) : band.n;

  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5 font-ui text-[0.84rem] text-muted">
        <Link
          href={`/classi/${clsId}`}
          title={`Apri ${clsName.replace(/<[^>]+>/g, "")} nella mappa delle classi`}
          className="border-b border-dotted border-current font-mono text-base font-semibold text-(--c) no-underline hover:border-solid"
          dangerouslySetInnerHTML={{ __html: clsName }}
        />
        <span>tocca la classe per aprirne la scheda</span>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-head text-[2rem] font-semibold leading-tight text-(--c)">{p.name}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <LabPill html={p.lab} />
          {p.ext && <SourceBadge kind="x">✱ completezza fuori dalle fonti</SourceBadge>}
        </div>
      </div>
      <div className={dsec}>
        <h3 className={h3}>Il problema</h3>
        <Rich as="p" html={p.def} />
      </div>
      <div className={dsec}>
        <h3 className={h3}>Perché sta qui</h3>
        <Rich as="p" html={p.why} />
      </div>
      <div className={dsec}>
        <h3 className={h3}>Completezza</h3>
        <Rich as="p" html={p.comp} />
      </div>
      <div className={dsec}>
        <h3 className={h3}>Complemento</h3>
        {cp ? (
          <p>
            <RelBtn id={cp.id} onGo={onGo} /> <Html className="text-[0.86rem] text-muted" html={cp.lab} />
          </p>
        ) : (
          <Rich as="p" html={p.compl || "Nessun complemento con un nome proprio nel corso."} />
        )}
      </div>
      {p.ext_t && (
        <div className={`${box} border border-dashed border-accent bg-accent-soft/45`}>
          <span className={`${bt} text-accent`}>✱ Fuori dalle fonti del corso</span>
          <Rich as="span" html={p.ext_t} />
        </div>
      )}
      {p.fix && (
        <div className={`${box} border border-open/35 bg-open-soft`}>
          <span className={`${bt} text-open`}>Correzione</span>
          <Rich as="span" html={p.fix} />
        </div>
      )}
      {rels.length > 0 && (
        <div className={dsec}>
          <h3 className={h3}>Problemi collegati</h3>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {rels.map(([id, t]) => (
              <li key={id} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.9rem]">
                <RelBtn id={id} onGo={onGo} />
                <span className="text-muted">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {ths.length > 0 && (
        <div className={dsec}>
          <h3 className={h3}>Teoremi che lo usano</h3>
          <p className="text-[0.92rem] leading-[1.8]">
            {ths.map((t, i) => (
              <span key={t.id}>
                {i > 0 && " · "}
                <Link
                  href={`/teoremi#teorema-${t.id}`}
                  className="text-accent underline decoration-1 underline-offset-2 sm:whitespace-nowrap"
                  dangerouslySetInnerHTML={{ __html: t.nome }}
                />
              </span>
            ))}
          </p>
        </div>
      )}
      <div className={dsec}>
        <h3 className={h3}>Trappole d&apos;esame</h3>
        <ul className="m-0 flex list-none flex-col gap-[9px] p-0">
          {p.traps.map((t, i) => (
            <TrapItem key={i} t={t} />
          ))}
        </ul>
      </div>
      <div className={dsec}>
        <h3 className={h3}>Fonti</h3>
        <ul className="m-0 flex list-none flex-col gap-1 p-0 text-[0.86rem]">
          {p.src.map(([k, t], i) => (
            <li key={i} className="flex items-baseline gap-2">
              <SourceBadge kind={k}>{SOURCE_LABEL[k]}</SourceBadge>
              <Html html={t} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
