import type { ClassId } from "@/data/classes/classes";
import type { ExamQuestion } from "@/data/classes/examQuestions";

import Link from "next/link";

import Arrow from "@/components/Arrow";
import ClassChip from "@/components/ClassChip";
import MathHtml from "@/components/MathHtml";
import RichHtml from "@/components/RichHtml";
import Tex from "@/components/Tex";
import { ALIAS_TEX, CLASS_CONTENT, CLASS_PROBLEMS, TEX } from "@/data/classes/classes";
import { EXAM_QUESTIONS } from "@/data/classes/examQuestions";
import { TOWER_OF } from "@/data/hierarchy/tower";
import { THEOREMS } from "@/data/theorems/theorems";
import ExactTsp from "@/features/classes/dp/ExactTsp";
import SatUnsat from "@/features/classes/dp/SatUnsat";
import TrueFalse from "@/features/classes/dp/TrueFalse";
import { texHtml } from "@/lib/tex";
import { classColor, ui } from "@/lib/tokens";
import N from "./ClassName";
import ClassSteps from "./ClassSteps";
import { relGroups } from "./inclusions";

const h4 = "mb-1.5 font-ui text-xs font-medium uppercase tracking-widest text-muted";
const link = "text-accent underline underline-offset-2 decoration-1";
const relList = "flex flex-wrap gap-1.5";
const relItem = "inline-flex items-center gap-1";
const mk = "font-mono text-sm font-medium";

function QA({ t }: { t: ExamQuestion }) {
    return (
        <details className="border-line border-b py-2">
            <summary className="marker:text-muted cursor-pointer text-base">
                <RichHtml as="span" html={t.q} />
            </summary>
            <div className="mt-2 flex flex-col gap-1 text-base">
                <RichHtml html={t.a} />
                <RichHtml html={t.e} />
            </div>
        </details>
    );
}

/** scheda di una classe */
export default function ClassPanel({ id }: { id: ClassId }) {
    const c = CLASS_CONTENT[id];
    const rg = relGroups(id);
    const tr = EXAM_QUESTIONS.filter((t) => t.c.includes(id));
    const probs = CLASS_PROBLEMS[id];
    const ths = THEOREMS.filter((t) => t.classi.includes(id));
    const tower = TOWER_OF[id];
    const alias = ALIAS_TEX[id];
    const cmpB: ClassId = id === "NPcapcoNP" ? "NP" : "NPcapcoNP";
    const stepBody = "flex flex-col gap-3";

    const bodies = [
        <RichHtml key="intu" as="p" html={c.intu} />,
        <RichHtml key="def" className={stepBody} html={c.def} />,
        <RichHtml key="ex" className={stepBody} html={c.ex} />,
        <div key="exam" className={stepBody}>
            <RichHtml className={stepBody} html={c.exam} />
            {tr.length > 0 && (
                <p className={ui.hint}>
                    {tr.length} domand{tr.length === 1 ? "a" : "e"} delle tracce su <N id={id} />: le trovi qui sotto e
                    in Esercitati.
                </p>
            )}
        </div>,
    ];

    return (
        <div style={classColor(id)}>
            <div className="flex flex-wrap items-start justify-between gap-3.5">
                <div>
                    <Tex className="block text-3xl leading-tight font-medium text-(--c)">{TEX[id]}</Tex>
                    <MathHtml html={c.full} className="font-ui text-muted mt-1 block text-base font-medium" />
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {alias && <MathHtml className={ui.pillOk} html={alias} />}
                        <MathHtml
                            className={`${ui.pill} whitespace-normal!`}
                            html={`chiusa per complemento: ${c.closed}`}
                        />
                    </div>
                </div>
                <Link className={ui.btn} href={`/confronta/${id}/${cmpB}`}>
                    Confronta con…
                </Link>
            </div>

            <ClassSteps bodies={bodies} />

            {tower && (
                <p className="mt-3">
                    <Link className={`${ui.btn} inline-block`} href={`/piani#${tower}`}>
                        <span>
                            Vedi <N id={id} /> nei piani di PH <Arrow />
                        </span>
                    </Link>
                </p>
            )}

            {id === "DP" && (
                <details className={ui.sec}>
                    <summary className="text-accent cursor-pointer font-medium">Prova i due controlli di DP</summary>
                    <div className="mt-3 flex flex-col gap-5">
                        <section>
                            <h3 className={`${ui.h3} mb-2`}>EXACT TSP: l&apos;ottimo è B?</h3>
                            <ExactTsp />
                        </section>
                        <section>
                            <h3 className={`${ui.h3} mb-2`}>SAT-UNSAT: una sì, l&apos;altra no</h3>
                            <SatUnsat />
                        </section>
                        <section>
                            <h3 className={`${ui.h3} mb-2`}>Verifica quello che sai</h3>
                            <TrueFalse />
                        </section>
                    </div>
                </details>
            )}

            <details className={ui.sec}>
                <summary className="cursor-pointer font-medium">Dove sta: inclusioni e questioni aperte</summary>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                        <h4 className={h4}>È contenuta in</h4>
                        <div className={relList}>
                            {rg.sup.length ? (
                                rg.sup.map(([o, s]) => (
                                    <span key={o} className={relItem}>
                                        <span className={`${mk} ${s ? "text-proved" : ""}`}>
                                            <Tex>{s ? String.raw`\subsetneq` : String.raw`\subseteq`}</Tex>
                                        </span>
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
                                        <span className={`${mk} ${s ? "text-proved" : ""}`}>
                                            <Tex>{s ? String.raw`\supsetneq` : String.raw`\supseteq`}</Tex>
                                        </span>
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
                                        <span className={`${mk} ${m === "≠" ? "text-proved" : "text-open"}`}>
                                            <Tex>{m === "≠" ? String.raw`\neq` : "?"}</Tex>
                                        </span>
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
                    <Tex>{String.raw`\subsetneq`}</Tex> in rosso: inclusione stretta dimostrata (anche quando segue dal
                    fatto che l&apos;inclusione opposta è esclusa). <Tex>{String.raw`\subseteq`}</Tex> senza colore:
                    dimostrata, non si sa se stretta. ? : non si sa nemmeno se una contenga l&apos;altra.{" "}
                    <Tex>{String.raw`\neq`}</Tex> : diverse, ma nessuna contiene l&apos;altra.
                </p>
            </details>

            <div className={ui.sec}>
                <h3 className={ui.h3}>Problemi completi</h3>
                <RichHtml as="p" html={c.complete} />
                {c.trap && (
                    <div className={ui.noteTrap}>
                        <b className="font-ui font-medium">Trappola.</b> <RichHtml as="span" html={c.trap} />
                    </div>
                )}
                {c.extra && <RichHtml className="flex flex-col gap-2" html={c.extra} />}
                {probs && (
                    <p className="mt-2.5 text-base leading-relaxed">
                        <b className="font-ui font-medium">Problemi:</b>{" "}
                        {probs.map(([k, t], i) => (
                            <span key={k}>
                                {i > 0 && " · "}
                                <Link
                                    href={`/problemi/${k}`}
                                    data-term={`problem:${k}`}
                                    className={`${link} whitespace-nowrap`}
                                    dangerouslySetInnerHTML={{ __html: texHtml(t, false) }}
                                />
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
                                <Link
                                    href={`/teoremi#teorema-${t.id}`}
                                    className={link}
                                    dangerouslySetInnerHTML={{ __html: texHtml(t.nome, false) }}
                                />
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
                                Altre {tr.length - 6} nel quiz <Arrow />
                            </Link>
                        </p>
                    )}
                </div>
            )}

            <p className="text-muted mt-4 text-sm">
                <b className="font-ui font-medium">Fonti:</b> <RichHtml as="span" html={c.src} />
            </p>
        </div>
    );
}
