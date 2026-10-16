import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { PROBLEM_BY, PROBLEMS } from "@/data/problems/problems";
import ProblemsView from "@/features/problems/ProblemsView";
import { PROBLEM_TRACE_REFS } from "@/features/problems/traceRefs";
import { htmlToPlain } from "@/lib/plainText";

export function generateStaticParams() {
    return PROBLEMS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const p = PROBLEM_BY[id];
    return p ? { title: htmlToPlain(p.name), description: htmlToPlain(p.def) } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!PROBLEM_BY[id]) notFound();
    return <ProblemsView traceRefs={PROBLEM_TRACE_REFS} />;
}
