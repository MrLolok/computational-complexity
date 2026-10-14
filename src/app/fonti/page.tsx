import type { Metadata } from "next";
import SourcesView from "@/components/sources/SourcesView";

export const metadata: Metadata = { title: "Fonti" };

export default function Page() {
  return <SourcesView />;
}
