"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";

import { plainMath } from "@/lib/mathNotation";
import { ui } from "@/lib/tokens";
import Arrow from "./Arrow";
import MathHtml from "./MathHtml";

export type IllustratedWalkthrough = {
    outcome?: string;
    note?: string;
    slides: {
        title: string;
        caption: string;
        alt: string;
        src: string;
        crop?: { columns: number; rows: number; index: number };
    }[];
};

export default function Walkthrough({
    lesson,
    name,
    title,
    heading = "h3",
    side = false,
}: {
    lesson: IllustratedWalkthrough;
    name: string;
    title: string;
    heading?: "h3" | "h4";
    /** da desktop testo a sinistra e immagine a destra */
    side?: boolean;
}) {
    const Title = heading;
    const StepTitle = heading === "h3" ? "h4" : "h5";
    const [step, setStep] = useState(0);
    const viewport = useRef<HTMLDivElement>(null);
    const label = useId();
    useEffect(() => {
        const el = viewport.current;
        if (!el) return;
        let width = el.clientWidth;
        const observer = new ResizeObserver(() => {
            if (!el.clientWidth) {
                width = 0;
                return;
            }
            if (el.clientWidth === width) return;
            width = el.clientWidth;
            el.scrollTo({ left: step * width, behavior: "instant" });
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, [step]);
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
            aria-label={`${title}: ${plainMath(name)}`}
            className="border-line min-w-0 overflow-hidden rounded-xl border"
            onKeyDown={(e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    e.preventDefault();
                    go(step + (e.key === "ArrowRight" ? 1 : -1));
                }
            }}
        >
            <div className="border-line flex items-baseline justify-between gap-3 border-b px-4 py-3">
                <Title id={label} className="font-medium">
                    {title}
                </Title>
                <span aria-live="polite" className="text-muted text-xs whitespace-nowrap">
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
                    if (!el.clientWidth) return;
                    setStep(
                        Math.max(0, Math.min(lesson.slides.length - 1, Math.round(el.scrollLeft / el.clientWidth))),
                    );
                }}
            >
                {lesson.slides.map((slide, i) => (
                    <figure
                        key={`${slide.src}-${i}`}
                        aria-hidden={i !== step}
                        className={`w-full min-w-0 flex-none snap-start snap-always ${side ? "lg:flex lg:flex-row-reverse" : ""}`}
                    >
                        <div
                            className={`bg-surface flex h-56 max-h-[40svh] min-h-44 items-center justify-center sm:h-80 ${side ? "lg:w-1/2 lg:flex-none" : ""}`}
                        >
                            {slide.crop ? (
                                <div className="relative aspect-square w-full max-w-[min(14rem,40svh)] overflow-hidden sm:max-w-[min(20rem,40svh)]">
                                    <Image
                                        src={slide.src}
                                        width={1536}
                                        height={(1536 * slide.crop.rows) / slide.crop.columns}
                                        sizes="(width < 64rem) 672px, 960px"
                                        alt={plainMath(slide.alt)}
                                        loading="lazy"
                                        className="absolute max-w-none"
                                        style={{
                                            width: `${slide.crop.columns * 100}%`,
                                            height: `${slide.crop.rows * 100}%`,
                                            left: `${-(slide.crop.index % slide.crop.columns) * 100}%`,
                                            top: `${-Math.floor(slide.crop.index / slide.crop.columns) * 100}%`,
                                        }}
                                    />
                                </div>
                            ) : (
                                <Image
                                    src={slide.src}
                                    width={960}
                                    height={640}
                                    sizes="(width < 64rem) 90vw, 640px"
                                    alt={plainMath(slide.alt)}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                />
                            )}
                        </div>
                        <figcaption
                            className={`border-line flex flex-col gap-2 border-t p-4 ${side ? "lg:min-w-0 lg:flex-1 lg:justify-center lg:border-t-0 lg:border-r lg:p-6" : ""}`}
                        >
                            <StepTitle className="font-medium">
                                {i + 1}. <MathHtml html={slide.title} />
                            </StepTitle>
                            <MathHtml
                                as="p"
                                className={`text-muted text-sm leading-relaxed ${side ? "lg:text-base" : ""}`}
                                html={slide.caption}
                            />
                        </figcaption>
                    </figure>
                ))}
            </div>
            <div className="border-line grid grid-cols-2 items-center gap-3 border-t px-4 py-3 sm:grid-cols-[auto_1fr_auto]">
                <button
                    type="button"
                    className={`${ui.btn} justify-self-start`}
                    aria-label="Immagine precedente"
                    disabled={step === 0}
                    onClick={() => go(step - 1)}
                >
                    <Arrow shape="left" /> Indietro
                </button>
                <div
                    role="group"
                    aria-label="Scegli il passo"
                    className="col-span-2 row-start-2 flex flex-wrap justify-center gap-1 sm:col-span-1 sm:col-start-2 sm:row-start-1"
                >
                    {lesson.slides.map((slide, i) => (
                        <button
                            key={`${slide.src}-${i}`}
                            type="button"
                            aria-label={`Passo ${i + 1}: ${plainMath(slide.title)}`}
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
                    className={`${ui.btn} col-start-2 row-start-1 justify-self-end sm:col-start-3`}
                    aria-label="Immagine successiva"
                    disabled={step === lesson.slides.length - 1}
                    onClick={() => go(step + 1)}
                >
                    Avanti <Arrow />
                </button>
            </div>
            {step === lesson.slides.length - 1 && (lesson.outcome || lesson.note) && (
                <div className="border-line bg-ok-soft/25 flex flex-col gap-2 border-t p-4">
                    {lesson.outcome && <MathHtml as="p" className="text-ok font-medium" html={lesson.outcome} />}
                    {lesson.note && (
                        <MathHtml as="p" className="text-muted text-xs leading-relaxed" html={lesson.note} />
                    )}
                </div>
            )}
            <p className="border-line text-muted border-t px-4 py-2 text-xs sm:hidden">
                Scorri l&apos;immagine o usa Avanti.
            </p>
        </section>
    );
}
