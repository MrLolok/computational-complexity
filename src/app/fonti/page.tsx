import type { Metadata } from "next";

import SourcesView from "@/features/sources/SourcesView";

export const metadata: Metadata = { title: "Fonti" };

export default function Page() {
    return <SourcesView />;
}
