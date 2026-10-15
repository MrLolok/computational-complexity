"use client";

import LearningSlideshow from "@/components/learning/LearningSlideshow";
import walkthroughs from "@/data/problemWalkthroughs.json";

export default function ProblemSlideshow({ id, name }: { id: keyof typeof walkthroughs; name: string }) {
    return <LearningSlideshow lesson={walkthroughs[id]} name={name} title="Un esempio, passo dopo passo" />;
}
