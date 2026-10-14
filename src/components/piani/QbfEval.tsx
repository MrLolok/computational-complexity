"use client";

import { useState } from "react";
import { QBF, QBF_DEFAULT } from "@/data/piani";
import { blocksOf, hPi, hS, qbfLayout, readit, SUBD, type QbfNode } from "@/lib/piani";
import { ui } from "@/lib/ui";
import { final, formulaBtn } from "./styles";

type Guess = "1" | "0" | "x" | null;

export default function QbfEval() {
  const [qf, setQf] = useState(QBF_DEFAULT);
  const [guess, setGuess] = useState<Guess>(null);
  const reveal = guess !== null;
  const F = QBF[qf];
  const { T, W, H, all } = qbfLayout(F);
  const k = blocksOf(F.q),
    isS = F.q[0] === "∃";

  const stroke = (v: boolean) => (reveal ? (v ? "stroke-ok" : "stroke-proved") : "stroke-muted");
  const fill = (v: boolean) => (v ? "fill-ok/16" : "fill-proved/16");
  const right = guess !== null && guess !== "x" && (guess === "1") === T.val;

  const edges: { from: QbfNode; to: QbfNode; i: number; v: string }[] = [];
  all.forEach((nd) => {
    if (!nd.leaf) nd.ch.forEach((c, i) => edges.push({ from: nd, to: c, i, v: nd.v }));
  });

  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {QBF.map((f, i) => (
          <button
            key={f.f}
            type="button"
            aria-pressed={i === qf}
            className={formulaBtn}
            onClick={() => {
              setQf(i);
              setGuess(null);
            }}
          >
            {f.f}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Albero di valutazione della formula" className="block h-auto w-full min-w-104 font-ui">
          {edges.map(({ from, to, i, v }) => {
            const key = reveal && to.key;
            return (
              <g key={`${from.x}-${from.y}-${i}`}>
                <line
                  x1={from.x}
                  y1={from.y + 16}
                  x2={to.x}
                  y2={to.y - 16}
                  className={key ? `${stroke(to.val)} stroke-3` : "stroke-line stroke-1.5"}
                />
                <text
                  x={(from.x + to.x) / 2 + (i ? 8 : -8)}
                  y={(from.y + to.y) / 2 + 4}
                  textAnchor={i ? "start" : "end"}
                  className="fill-muted font-mono text-xs"
                >
                  {v} = {i ? "F" : "V"}
                </text>
              </g>
            );
          })}
          {all.map((nd) =>
            nd.leaf ? (
              <g key={`l${nd.x}-${nd.y}`}>
                <rect
                  x={nd.x - 30}
                  y={nd.y - 15}
                  width={60}
                  height={30}
                  rx={7}
                  className={`${reveal ? fill(nd.val) : "fill-sunk"} ${stroke(nd.val)}`}
                />
                <text x={nd.x} y={nd.y + 5} textAnchor="middle" className="fill-ink font-mono text-xs">
                  {reveal ? "φ = " + (nd.val ? "V" : "F") : "φ = ?"}
                </text>
              </g>
            ) : (
              <g key={`n${nd.x}-${nd.y}`}>
                <circle cx={nd.x} cy={nd.y} r={17} className={`${reveal ? fill(nd.val) : "fill-surface"} ${stroke(nd.val)} stroke-2`} />
                <text x={nd.x} y={nd.y + 5} textAnchor="middle" className="fill-ink font-mono text-sm font-bold">
                  {nd.q + nd.v}
                </text>
                <text x={nd.x + 22} y={nd.y - 10} className="fill-muted font-mono text-xs">
                  {nd.q === "∃" ? "OR" : "AND"}
                </text>
              </g>
            ),
          )}
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        {reveal ? (
          <>
            {guess !== "x" && (
              <p className={right ? ui.noteOk : ui.noteTrap}>
                <b className="font-ui font-semibold">{right ? "Giusto." : "Non proprio."}</b>
              </p>
            )}
            <div className={final(T.val)}>
              La formula è {T.val ? "vera" : "falsa"}.
            </div>
            <p>
              Le linee spesse mostrano il perché. Un ∃ è vero se basta <b>un</b> ramo vero (la scelta giusta); un ∀ è vero solo se lo sono{" "}
              <b>entrambi</b>. Al contrario, a un ∀ falso basta <b>un</b> ramo falso (un controesempio), mentre un ∃ è falso solo se lo sono
              entrambi.
            </p>
          </>
        ) : (
          <>
            <p>Prova a prevederlo: la formula è vera o falsa?</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className={ui.btn} onClick={() => setGuess("1")}>
                Vera
              </button>
              <button type="button" className={ui.btn} onClick={() => setGuess("0")}>
                Falsa
              </button>
              <button type="button" className={ui.btn} onClick={() => setGuess("x")}>
                Mostra subito
              </button>
            </div>
          </>
        )}
      </div>
      <p className={readit}>
        Prefisso con {k} blocc{k === 1 ? "o" : "hi"}, il primo {isS ? "∃" : "∀"}: è un&apos;istanza di {isS ? "QSAT" : "co-QSAT"}
        {SUBD(k)}, che sta in <span dangerouslySetInnerHTML={{ __html: isS ? hS(k) : hPi(k) }} />.{" "}
        <span className="text-sm">Formula da: {F.src}.</span>
      </p>
    </>
  );
}
