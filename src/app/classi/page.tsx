import type { Metadata } from "next";
import ClassesView from "@/components/classes/ClassesView";
export const metadata: Metadata = { title: "Classi di complessità" };
export default function Page() { return <ClassesView sel={null} />; }
