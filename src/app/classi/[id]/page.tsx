import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { CLASS_CONTENT, IDS, PLAIN } from "@/data/classes/classes";
import ClassesView from "@/features/classes/ClassesView";
import { isClassId } from "@/features/classes/inclusions";
import { plainMath } from "@/lib/mathNotation";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
    return IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    if (!isClassId(id)) return {};
    return { title: PLAIN[id], description: plainMath(CLASS_CONTENT[id].full) };
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    if (!isClassId(id)) notFound();
    return <ClassesView sel={id} />;
}
