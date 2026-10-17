import { type ClassId } from "@/data/classes/classes";
import { LESSON_ANCHORS, QuantumTab, RandomTab } from "@/features/probabilistic-quantum/ProbabilisticQuantumTabs";
import { ui } from "@/lib/tokens";
import ClassExplorer from "./ClassExplorer";
import ClassMap from "./ClassMap";
import ClassPanel from "./ClassPanel";
import ClassPanelIntro from "./ClassPanelIntro";

const badgeText = "text-xs font-medium [text-anchor:middle] [dominant-baseline:central]";

function Legend() {
    return (
        <div className="border-line font-ui text-muted mt-1.5 grid grid-cols-1 gap-x-4 gap-y-2 border-t pt-3 text-sm [&_svg]:flex-none [&>div]:flex [&>div]:items-center [&>div]:gap-2">
            <div>
                <svg width="34" height="14" aria-hidden="true">
                    <line x1="2" y1="7" x2="32" y2="7" className="stroke-line-strong stroke-1.5" />
                    <circle cx="17" cy="7" r="6" className="fill-surface stroke-open" />
                    <text x="17" y="7.5" className={`${badgeText} fill-open`}>
                        ?
                    </text>
                </svg>
                inclusione dimostrata, non si sa se stretta
            </div>
            <div>
                <svg width="34" height="14" aria-hidden="true">
                    <line x1="2" y1="7" x2="32" y2="7" className="stroke-proved stroke-2" />
                    <circle cx="17" cy="7" r="6" className="fill-surface stroke-proved" />
                    <text x="17" y="7.5" className={`${badgeText} fill-proved text-xs`}>
                        ⊊
                    </text>
                </svg>
                inclusione stretta dimostrata
            </div>
            <div>
                <svg width="34" height="14" aria-hidden="true">
                    <path d="M4 2 H14 V12 H4" className="stroke-proved stroke-1.5 fill-none" />
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

/** scheda Classi: mappa delle inclusioni e scheda della classe scelta */
export default function ClassesView({ sel }: { sel: ClassId | null }) {
    return (
        <section className="flex flex-col gap-5">
            <header>
                <p className={`${ui.eyebrow} mb-2`}>Le risorse del calcolo</p>
                <h1 className={ui.h2}>Classi di complessità</h1>
            </header>
            <ClassExplorer
                key={sel ?? "overview"}
                random={<RandomTab />}
                quantum={<QuantumTab />}
                anchors={LESSON_ANCHORS}
            >
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
                    <div className={ui.card}>
                        <ClassMap sel={sel} />
                        <Legend />
                    </div>
                    <aside
                        id="panel"
                        aria-live="polite"
                        className={`${ui.card} scroll-mt-16 lg:sticky lg:top-[calc(env(safe-area-inset-top)+var(--spacing)*16)] lg:max-h-[calc(100svh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-var(--spacing)*20)] lg:overflow-auto`}
                    >
                        {sel ? <ClassPanel id={sel} /> : <ClassPanelIntro />}
                    </aside>
                </div>
            </ClassExplorer>
        </section>
    );
}
