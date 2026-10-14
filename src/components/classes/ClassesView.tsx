import { IDS, type ClassId } from "@/data/classes";
import { EXAM_QUESTIONS } from "@/data/examQuestions";
import { PROBLEMS } from "@/data/problems";
import { THEOREMS } from "@/data/theorems";
import ClassMap from "./ClassMap";
import ClassPanel, { PanelIntro } from "./ClassPanel";

const badgeText = "text-[9px] font-bold [text-anchor:middle] [dominant-baseline:central]";

function Legend() {
  return (
    <div className="mt-1.5 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-x-4 gap-y-2 border-t border-line px-1.5 pb-0.5 pt-2.5 font-ui text-[0.82rem] text-muted [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&_svg]:flex-none">
      <div>
        <svg width="34" height="14" aria-hidden="true">
          <line x1="2" y1="7" x2="32" y2="7" className="stroke-line-strong [stroke-width:1.6]" />
          <circle cx="17" cy="7" r="6" className="fill-surface stroke-open" />
          <text x="17" y="7.5" className={`${badgeText} fill-open`}>
            ?
          </text>
        </svg>
        inclusione dimostrata, non si sa se stretta
      </div>
      <div>
        <svg width="34" height="14" aria-hidden="true">
          <line x1="2" y1="7" x2="32" y2="7" className="stroke-proved [stroke-width:1.8]" />
          <circle cx="17" cy="7" r="6" className="fill-surface stroke-proved" />
          <text x="17" y="7.5" className={`${badgeText} fill-proved text-[10px]`}>
            ⊊
          </text>
        </svg>
        inclusione stretta dimostrata
      </div>
      <div>
        <svg width="34" height="14" aria-hidden="true">
          <path d="M4 2 H14 V12 H4" className="fill-none stroke-proved [stroke-width:1.6]" />
        </svg>
        separazione dimostrata tra classi lontane
      </div>
      <div>
        <svg width="34" height="14" aria-hidden="true">
          <circle cx="17" cy="7" r="6" className="fill-surface stroke-open" />
          <text x="17" y="7.5" className={`${badgeText} fill-open`}>
            =?
          </text>
        </svg>
        non si sa nemmeno se una contiene l&apos;altra
      </div>
    </div>
  );
}

/** scheda Classi: contatori, mappa delle inclusioni e scheda della classe scelta */
export default function ClassesView({ sel }: { sel: ClassId | null }) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-ui text-[0.84rem] text-muted [&_b]:font-semibold [&_b]:tabular-nums [&_b]:text-ink">
        <span>
          <b>{IDS.length}</b> classi
        </span>
        <span>
          <b>{PROBLEMS.length}</b> problemi
        </span>
        <span>
          <b>{THEOREMS.length}</b> teoremi
        </span>
        <span>
          <b>{EXAM_QUESTIONS.length}</b> domande dalle tracce
        </span>
      </div>
      <div className="grid grid-cols-1 items-start gap-7 min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="min-w-0 rounded-xl border border-line bg-surface p-2.5">
          <ClassMap sel={sel} />
          <Legend />
        </div>
        <aside
          id="panel"
          aria-live="polite"
          className="min-w-0 scroll-mt-16 border-t border-line pt-5 min-[900px]:sticky min-[900px]:top-16 min-[900px]:max-h-[calc(100vh-80px)] min-[900px]:overflow-auto min-[900px]:border-l min-[900px]:border-t-0 min-[900px]:py-1 min-[900px]:pl-6 min-[900px]:pr-0.5"
        >
          {sel ? <ClassPanel id={sel} /> : <PanelIntro />}
        </aside>
      </div>
    </section>
  );
}
