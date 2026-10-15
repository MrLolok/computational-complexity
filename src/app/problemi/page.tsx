import type { Metadata } from "next";

import ProblemsView from "@/components/problems/ProblemsView";
import { PROBLEM_TRACE_REFS } from "@/lib/problemTraces";

export const metadata: Metadata = { title: "Problemi" };

export default function Page() {
    return <ProblemsView traceRefs={PROBLEM_TRACE_REFS} />;
}
