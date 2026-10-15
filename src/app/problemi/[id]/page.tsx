import type { Metadata } from "next";

import { notFound } from "next/navigation";

import ProblemsView from "@/components/problems/ProblemsView";
import { PROBLEM_BY, PROBLEMS } from "@/data/problems";
import { stripHtml } from "@/lib/glossary";
import { PROBLEM_TRACE_REFS } from "@/lib/problemTraces";

export function generateStaticParams() {
    return PROBLEMS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const p = PROBLEM_BY[id];
    return p ? { title: stripHtml(p.name), description: stripHtml(p.def) } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!PROBLEM_BY[id]) notFound();
    return <ProblemsView traceRefs={PROBLEM_TRACE_REFS} />;
}
