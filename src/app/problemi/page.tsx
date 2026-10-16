import type { Metadata } from "next";

import ProblemsView from "@/features/problems/ProblemsView";
import { PROBLEM_TRACE_REFS } from "@/features/problems/traceRefs";

export const metadata: Metadata = { title: "Problemi" };

export default function Page() {
    return <ProblemsView traceRefs={PROBLEM_TRACE_REFS} />;
}
