import type { Metadata } from "next";

import ExercisesView from "@/features/exercises/ExercisesView";

export const metadata: Metadata = { title: "Esercitati" };

export default function Page() {
    return <ExercisesView />;
}
