import type { Metadata } from "next";
import ClassesView from "@/components/classes/ClassesView";

export const metadata: Metadata = { title: "Classi" };

export default function Page() {
  return <ClassesView sel={null} />;
}
