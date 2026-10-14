import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROBLEMS, PROBLEM_BY } from "@/data/problems";
import ProblemsView from "@/components/problems/ProblemsView";

export function generateStaticParams() {
  return PROBLEMS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = PROBLEM_BY[id];
  return p ? { title: p.name, description: p.def.replace(/<[^>]+>/g, "") } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!PROBLEM_BY[id]) notFound();
  return <ProblemsView />;
}
