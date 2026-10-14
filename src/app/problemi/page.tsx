import type { Metadata } from "next";
import ProblemsView from "@/components/problems/ProblemsView";

export const metadata: Metadata = { title: "Problemi" };

export default function Page() {
  return <ProblemsView />;
}
