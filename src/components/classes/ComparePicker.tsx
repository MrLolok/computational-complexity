"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { IDS, NAME, PLAIN, QUICK, type ClassId } from "@/data/classes";
import { ui } from "@/lib/ui";

const label = "flex min-w-0 max-w-full flex-col gap-1 font-ui text-[0.78rem] font-semibold text-muted";
const select = `${ui.select} min-w-[150px]`;

/** scelta delle due classi da confrontare; il verdetto (children) arriva già calcolato dal server */
export default function ComparePicker({ a, b, children }: { a: ClassId; b: ClassId; children: ReactNode }) {
  const router = useRouter();
  const [pa, setPa] = useState<ClassId>(a);
  const [pb, setPb] = useState<ClassId>(b);
  const go = (x: ClassId, y: ClassId) => {
    setPa(x);
    setPb(y);
    if (x !== y && (x !== a || y !== b)) router.push(`/confronta/${x}/${y}`, { scroll: false });
  };
  return (
    <section>
      <div className="flex flex-wrap items-end gap-3 border-b border-line pb-4">
        <label className={label} htmlFor="cmpA">
          Prima classe
          <select id="cmpA" className={select} value={pa} onChange={(e) => go(e.target.value as ClassId, pb)}>
            {IDS.map((id) => (
              <option key={id} value={id}>
                {PLAIN[id]}
              </option>
            ))}
          </select>
        </label>
        <button className={ui.btn} type="button" aria-label="Scambia le due classi" onClick={() => go(pb, pa)}>
          ⇄
        </button>
        <label className={label} htmlFor="cmpB">
          Seconda classe
          <select id="cmpB" className={select} value={pb} onChange={(e) => go(pa, e.target.value as ClassId)}>
            {IDS.map((id) => (
              <option key={id} value={id}>
                {PLAIN[id]}
              </option>
            ))}
          </select>
        </label>
        <div className="basis-full" />
        <div className="mt-1 flex flex-wrap gap-1.5" aria-label="Confronti frequenti">
          {QUICK.map(([x, y]) => (
            <Link
              key={x + "~" + y}
              href={`/confronta/${x}/${y}`}
              scroll={false}
              onClick={() => {
                setPa(x);
                setPb(y);
              }}
              className="rounded-full border border-line px-[0.7rem] py-[0.22rem] font-mono text-[0.8rem] text-ink hover:border-accent hover:text-accent"
              dangerouslySetInnerHTML={{ __html: `${NAME[x]} · ${NAME[y]}` }}
            />
          ))}
        </div>
      </div>
      {pa === pb ? <p className="mt-5">Scegli due classi diverse.</p> : children}
    </section>
  );
}
