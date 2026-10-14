"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";

import walkthroughs from "@/data/problemWalkthroughs.json";
import { ui } from "@/lib/ui";

export default function ProblemSlideshow({ id, name }: { id: keyof typeof walkthroughs; name: string }) {
    const lesson = walkthroughs[id];
    const [step, setStep] = useState(0);
    const viewport = useRef<HTMLDivElement>(null);
    const label = useId();
    const go = (next: number) => {
        const el = viewport.current;
        if (!el) return;
        el.scrollTo({
            left: Math.max(0, Math.min(lesson.slides.length - 1, next)) * el.clientWidth,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
    };
    return (
        <section
            aria-roledescription="carosello"
            aria-label={`Esempio guidato: ${name}`}
            className="border-line min-w-0 overflow-hidden rounded-xl border"
            onKeyDown={(e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    e.preventDefault();
                    go(step + (e.key === "ArrowRight" ? 1 : -1));
                }
            }}
        >
            <div className="border-line flex items-baseline justify-between gap-3 border-b px-4 py-3">
                <h3 id={label} className="font-semibold">
                    Un esempio, passo dopo passo
                </h3>
                <span aria-live="polite" className="text-muted font-mono text-xs whitespace-nowrap">
                    {step + 1} / {lesson.slides.length}
                </span>
            </div>
            <div
                ref={viewport}
                role="group"
                aria-labelledby={label}
                className="flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain"
                onScroll={(e) => {
                    const el = e.currentTarget;
                    setStep(
                        Math.max(0, Math.min(lesson.slides.length - 1, Math.round(el.scrollLeft / el.clientWidth))),
                    );
                }}
            >
                {lesson.slides.map((slide, i) => (
                    <figure
                        key={slide.src}
                        aria-hidden={i !== step}
                        className="w-full min-w-0 flex-none snap-start snap-always"
                    >
                        <div className="bg-surface h-[clamp(180px,38svh,340px)]">
                            <Image
                                src={slide.src}
                                width={960}
                                height={640}
                                sizes="(max-width: 900px) 90vw, 640px"
                                alt={slide.alt}
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <figcaption className="border-line flex flex-col gap-2 border-t p-4">
                            <h4 className="font-semibold">
                                {i + 1}. {slide.title}
                            </h4>
                            <p className="text-muted text-sm leading-relaxed">{slide.caption}</p>
                        </figcaption>
                    </figure>
                ))}
            </div>
            <div className="border-line flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3">
                <button
                    type="button"
                    className={ui.btn}
                    aria-label="Immagine precedente"
                    disabled={step === 0}
                    onClick={() => go(step - 1)}
                >
                    ← Indietro
                </button>
                <div role="group" aria-label="Scegli il passo" className="flex gap-1">
                    {lesson.slides.map((slide, i) => (
                        <button
                            key={slide.src}
                            type="button"
                            aria-label={`Passo ${i + 1}: ${slide.title}`}
                            aria-pressed={step === i}
                            onClick={() => go(i)}
                            className={`flex size-9 cursor-pointer items-center justify-center rounded-full border text-xs ${step === i ? "border-accent bg-accent text-accent-ink" : "border-line text-muted hover:border-accent"}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <button
                    type="button"
                    className={ui.btn}
                    aria-label="Immagine successiva"
                    disabled={step === lesson.slides.length - 1}
                    onClick={() => go(step + 1)}
                >
                    Avanti →
                </button>
            </div>
            {step === lesson.slides.length - 1 && (
                <div className="border-line bg-ok-soft/25 flex flex-col gap-2 border-t p-4">
                    <p className="text-ok font-semibold">{lesson.outcome}</p>
                    <p className="text-muted text-xs leading-relaxed">{lesson.note}</p>
                </div>
            )}
            <p className="border-line text-muted border-t px-4 py-2 text-xs sm:hidden">
                Scorri l&apos;immagine o usa Avanti.
            </p>
        </section>
    );
}
