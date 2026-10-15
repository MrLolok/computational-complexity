import type { Metadata } from "next";

import { notFound } from "next/navigation";

import ClassesView from "@/components/classes/ClassesView";
import { C, IDS, PLAIN } from "@/data/classes";
import { isClassId } from "@/lib/engine";
import { plainMath } from "@/lib/mathNotation";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
    return IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    if (!isClassId(id)) return {};
    return { title: PLAIN[id], description: plainMath(C[id].full) };
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    if (!isClassId(id)) notFound();
    return <ClassesView sel={id} />;
}
