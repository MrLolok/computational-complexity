"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LADDER, PROBLEMS, PROBLEM_BY } from "@/data/problems";
import { Html, LabPill, SourceBadge, YesNo, codeCls } from "@/components/problems/bits";
import { BANDS, ansKey, colorId, deckIds, plain, trapAnswer } from "@/lib/problems";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFlashKnown } from "@/store/progressSlice";
import { classColor, ui } from "@/lib/ui";

const DECKS = BANDS.filter((b) => PROBLEMS.some((p) => p.b === b));
const face =
  `${ui.card} absolute inset-0 overflow-auto border-t-2 border-t-(--c) backface-hidden transition-transform duration-500 ease-in-out motion-reduce:transition-none`;
const big = "block font-head text-4xl font-semibold leading-tight text-(--c)";

export default function Flashcards() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const known = useAppSelector((s) => s.progress.flashKnown);
  const [deckName, setDeckName] = useState("all");
  const [only, setOnly] = useState(false);
  /** null finché il mazzo non è stato mescolato (solo nel browser) */
  const [deck, setDeck] = useState<string[] | null>(null);
  const [fi, setFi] = useState(0);
  const [flip, setFlip] = useState(false);

  const make = (d: string, o: boolean) => {
    setDeck(deckIds(d, o, known));
    setFi(0);
    setFlip(false);
  };
  /* il mazzo si mescola solo nel browser */
  useEffect(() => {
    const r = requestAnimationFrame(() => setDeck(deckIds("all", false, {})));
    return () => cancelAnimationFrame(r);
  }, []);

  const n = PROBLEMS.length;
  const k = PROBLEMS.filter((p) => known[p.id]).length;
  const cur = deck?.length ? PROBLEM_BY[deck[fi % deck.length]] : null;

  const mark = (v: boolean) => {
    if (!cur || !deck) return;
    dispatch(setFlashKnown({ id: cur.id, known: v }));
    if (only && v) setDeck(deck.filter((_, i) => i !== fi % deck.length));
    else setFi(fi + 1);
    setFlip(false);
  };

  const trap = cur ? cur.traps.find((t) => t.q) || cur.traps[0] : undefined;
  const cp = cur ? (cur.cpl ? `${PROBLEM_BY[cur.cpl].name}: ${PROBLEM_BY[cur.cpl].lab}` : cur.complLab || "nessuno con un nome proprio") : "";

  return (
    <div className="flex max-w-4xl flex-col gap-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <label htmlFor="fdeck" className="font-ui text-base text-muted">
          Mazzo
        </label>
        <select
          id="fdeck"
          className={ui.select}
          value={deckName}
          onChange={(e) => {
            setDeckName(e.target.value);
            make(e.target.value, only);
          }}
        >
          <option value="all">Tutti i problemi ({n})</option>
          {DECKS.map((b) => (
            <option key={b} value={b}>
              {LADDER[b].t || plain(LADDER[b].n)} ({PROBLEMS.filter((p) => p.b === b).length})
            </option>
          ))}
        </select>
        <label className="inline-flex cursor-pointer select-none items-center gap-2 font-ui text-sm text-muted" htmlFor="fonly">
          <input
            id="fonly"
            type="checkbox"
            className="size-4 accent-accent"
            checked={only}
            onChange={(e) => {
              setOnly(e.target.checked);
              make(deckName, e.target.checked);
            }}
          />
          Solo da ripassare
        </label>
        <button className={ui.btn} type="button" onClick={() => make(deckName, only)}>
          Mescola
        </button>
        <span className="ml-auto font-mono text-sm tabular-nums text-muted">
          {k} / {n} sapute
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-sunk" aria-hidden="true">
        <i className="block h-full bg-ok transition-[width] duration-300" style={{ width: `${(100 * k) / n}%` }} />
      </div>
      <button
        type="button"
        aria-label="Gira la carta"
        onClick={() => setFlip(!flip)}
        style={cur ? classColor(colorId(cur)) : undefined}
        className={`relative min-h-80 w-full cursor-pointer text-left text-ink perspective-distant max-sm:min-h-96 ${cur ? "" : deck ? "[--c:var(--color-ok)]" : "[--c:var(--color-accent)]"}`}
      >
        {!cur || !deck ? (
          <span className={`${face} rotate-y-0`}>
            {deck && (
              <>
                <span className={big}>Mazzo finito</span>
                <span className="block">
                  Non ci sono carte da ripassare con questi filtri. Togli &quot;Solo da ripassare&quot; o scegli un altro mazzo.
                </span>
              </>
            )}
          </span>
        ) : (
          <>
            <span className={`${face} ${flip ? "-rotate-y-180" : "rotate-y-0"}`}>
              <span className={codeCls}>
                carta {(fi % deck.length) + 1} di {deck.length}
              </span>
              <Html className={big} html={cur.name} />
              <Html className="block" html={cur.def} terms={false} />
              <span className={`${ui.hint} mt-auto block`}>In quale classe sta? È completo? Qual è il complemento? Tocca per girare.</span>
            </span>
            <span className={`${face} ${flip ? "rotate-y-0" : "rotate-y-180"}`}>
              <span className="flex flex-wrap items-center gap-2">
                <Html className={`${big} text-2xl!`} html={cur.name} />
                <LabPill html={cur.lab} />
                {cur.ext && <SourceBadge kind="x">✱ esterno</SourceBadge>}
              </span>
              <Html className="block" html={cur.brief} terms={false} />
              <span className="block">
                <strong className="font-semibold">Complemento:</strong> <Html html={cp} terms={false} />
              </span>
              {trap && (
                <span className="block text-base">
                  <strong className="font-semibold">Trappola{trap.c ? ` (${trap.c})` : ""}:</strong>{" "}
                  {trap.q ? (
                    <>
                      <Html html={trap.q} terms={false} /> <YesNo k={ansKey(trap.a)}>{trapAnswer(trap)}</YesNo>
                    </>
                  ) : (
                    <Html html={trap.n || ""} terms={false} />
                  )}
                </span>
              )}
            </span>
          </>
        )}
      </button>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <button className={ui.btn} type="button" onClick={() => mark(false)}>
          Da ripassare
        </button>
        <button className={ui.btnPrimary} type="button" onClick={() => mark(true)}>
          La so
        </button>
        <button className={`${ui.linkBtn} ml-auto`} type="button" onClick={() => cur && router.push(`/problemi/${cur.id}`)}>
          Apri la scheda del problema
        </button>
      </div>
    </div>
  );
}
