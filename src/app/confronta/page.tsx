import type { Metadata } from "next";

import ComparePicker from "@/features/classes/ComparePicker";

export const metadata: Metadata = { title: "Confronta" };
export default function Page() {
    return <ComparePicker />;
}
