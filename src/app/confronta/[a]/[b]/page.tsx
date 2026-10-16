import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { IDS, PLAIN } from "@/data/classes/classes";
import ComparePicker from "@/features/classes/ComparePicker";
import CompareVerdict from "@/features/classes/CompareVerdict";
import { isClassId } from "@/features/classes/inclusions";

type Props = { params: Promise<{ a: string; b: string }> };

export function generateStaticParams() {
    return IDS.flatMap((a) => IDS.filter((b) => b !== a).map((b) => ({ a, b })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { a, b } = await params;
    if (!isClassId(a) || !isClassId(b) || a === b) return {};
    return { title: `Confronta ${PLAIN[a]} e ${PLAIN[b]}` };
}

export default async function Page({ params }: Props) {
    const { a, b } = await params;
    if (!isClassId(a) || !isClassId(b) || a === b) notFound();
    return (
        <ComparePicker key={a + "~" + b} a={a} b={b}>
            <CompareVerdict a={a} b={b} />
        </ComparePicker>
    );
}
