import type { Metadata } from "next";
import TheoremsView from "@/components/theorems/TheoremsView";

export const metadata: Metadata = { title: "Teoremi" };

export default function Page() {
  return <TheoremsView />;
}
